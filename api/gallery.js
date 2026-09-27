import { createHash, randomUUID, timingSafeEqual } from 'node:crypto';
import { del, list, put } from '@vercel/blob';

const MAX_REQUEST_BYTES = 4_450_000;
const MAX_FILE_BYTES = 3 * 1024 * 1024;
const MIME_TO_EXTENSION = new Map([
  ['image/jpeg', 'jpg'], ['image/png', 'png'], ['image/gif', 'gif'],
  ['image/webp', 'webp'], ['image/avif', 'avif'],
  ['video/mp4', 'mp4'], ['video/webm', 'webm'],
]);

export const config = { api: { bodyParser: false } };

function json(res, status, body) {
  res.setHeader('Cache-Control', 'no-store, max-age=0');
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.statusCode = status;
  res.end(JSON.stringify(body));
}

function isConfigured(res, needsStorage = true) {
  if (!process.env.GALLERY_ADMIN_PASSWORD || process.env.GALLERY_ADMIN_PASSWORD.length < 12) {
    json(res, 503, { error: 'password_not_configured' });
    return false;
  }
  if (needsStorage && !process.env.BLOB_READ_WRITE_TOKEN) {
    json(res, 503, { error: 'storage_not_configured' });
    return false;
  }
  return true;
}

function passwordMatches(candidate) {
  const expected = process.env.GALLERY_ADMIN_PASSWORD || '';
  const actualHash = createHash('sha256').update(String(candidate || '')).digest();
  const expectedHash = createHash('sha256').update(expected).digest();
  return timingSafeEqual(actualHash, expectedHash) && Boolean(candidate) && expected.length >= 12;
}

function readJsonBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    let size = 0;
    let rejected = false;
    req.on('data', (chunk) => {
      if (rejected) return;
      size += chunk.length;
      if (size > MAX_REQUEST_BYTES) {
        rejected = true;
        reject(Object.assign(new Error('payload_too_large'), { statusCode: 413 }));
        req.resume();
        return;
      }
      chunks.push(chunk);
    });
    req.on('end', () => {
      if (rejected) return;
      try {
        resolve(JSON.parse(Buffer.concat(chunks).toString('utf8')));
      } catch {
        reject(Object.assign(new Error('invalid_json'), { statusCode: 400 }));
      }
    });
    req.on('error', (error) => {
      if (!rejected) reject(error);
    });
  });
}

function decodeItem(blob) {
  const filename = blob.pathname.split('/').pop() || '';
  const parts = filename.split('.');
  if (parts.length !== 3) return null;
  try {
    const metadata = JSON.parse(Buffer.from(parts[1], 'base64url').toString('utf8'));
    if (!metadata.id || !metadata.author || !metadata.uploadedAt) return null;
    return {
      id: metadata.id,
      author: metadata.author,
      caption: metadata.caption || '',
      uploadedAt: metadata.uploadedAt,
      url: blob.url,
      contentType: blob.contentType,
      size: blob.size,
    };
  } catch {
    return null;
  }
}

async function getGalleryItems() {
  let cursor;
  const blobs = [];
  for (let page = 0; page < 5; page += 1) {
    const result = await list({ prefix: 'gallery/', limit: 100, ...(cursor ? { cursor } : {}) });
    blobs.push(...result.blobs);
    if (!result.hasMore || !result.cursor) break;
    cursor = result.cursor;
  }
  return blobs.map(decodeItem).filter(Boolean).sort((a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt));
}

export default async function handler(req, res) {
  if (req.method === 'GET') {
    if (!process.env.BLOB_READ_WRITE_TOKEN) return json(res, 503, { error: 'storage_not_configured' });
    try {
      const items = await getGalleryItems();
      return json(res, 200, { items });
    } catch (error) {
      console.error('Gallery read failed:', error?.message || error);
      return json(res, 503, { error: 'gallery_unavailable' });
    }
  }

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'GET, POST');
    return json(res, 405, { error: 'method_not_allowed' });
  }

  let body;
  try {
    body = await readJsonBody(req);
  } catch (error) {
    return json(res, error.statusCode || 400, { error: error.message === 'payload_too_large' ? 'payload_too_large' : 'invalid_json' });
  }

  const action = String(body.action || '');
  if (action === 'login') {
    if (!isConfigured(res, false)) return;
    if (!passwordMatches(body.password)) return json(res, 401, { error: 'invalid_password' });
    return json(res, 200, { ok: true });
  }

  if (!isConfigured(res, true)) return;
  if (!passwordMatches(body.password)) return json(res, 401, { error: 'invalid_password' });

  if (action === 'upload') {
    const author = String(body.author || '').trim().slice(0, 32);
    const caption = String(body.caption || '').trim().slice(0, 180);
    const contentType = String(body.contentType || '').toLowerCase();
    const extension = MIME_TO_EXTENSION.get(contentType);
    const dataUrl = String(body.file || '');
    const match = dataUrl.match(/^data:([a-z0-9.+-]+\/[a-z0-9.+-]+);base64,([a-zA-Z0-9+/=]+)$/);
    if (!author || !extension || !match || match[1].toLowerCase() !== contentType) {
      return json(res, 400, { error: 'invalid_file' });
    }
    const file = Buffer.from(match[2], 'base64');
    if (!file.length || file.length > MAX_FILE_BYTES) return json(res, 413, { error: 'file_too_large' });

    const id = randomUUID();
    const uploadedAt = new Date().toISOString();
    const metadata = Buffer.from(JSON.stringify({ id, author, caption, uploadedAt })).toString('base64url');
    const pathname = `gallery/${id}.${metadata}.${extension}`;
    try {
      const blob = await put(pathname, file, {
        access: 'public',
        addRandomSuffix: false,
        contentType,
        cacheControlMaxAge: 60 * 60 * 24,
      });
      return json(res, 201, { item: { id, author, caption, uploadedAt, url: blob.url, contentType, size: file.length } });
    } catch (error) {
      console.error('Gallery upload failed:', error?.message || error);
      return json(res, 503, { error: 'gallery_unavailable' });
    }
  }

  if (action === 'delete') {
    const id = String(body.id || '');
    if (!/^[0-9a-f-]{36}$/i.test(id)) return json(res, 400, { error: 'invalid_id' });
    try {
      const items = await getGalleryItems();
      const item = items.find((entry) => entry.id === id);
      if (!item) return json(res, 404, { error: 'item_not_found' });
      await del(item.url);
      return json(res, 200, { ok: true });
    } catch (error) {
      console.error('Gallery delete failed:', error?.message || error);
      return json(res, 503, { error: 'gallery_unavailable' });
    }
  }

  return json(res, 400, { error: 'unknown_action' });
}
