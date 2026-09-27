const INVITE_URL = 'https://discord.gg/SHkPny2Z3z';
const DISCORD_WIDGET_URL = 'https://discord.com/api/guilds/1307129882215579749/widget.json';
const MAX_UPLOAD_BYTES = 3 * 1024 * 1024;
const navItems = [
  ['inicio', 'Inicio', '/index.html'],
  ['reglas', 'Reglas', '/reglas.html'],
  ['equipo', 'Equipo', '/equipo.html'],
  ['faq', 'FAQ', '/faq.html'],
  ['galeria', 'Galería', '/galeria.html'],
  ['juego', 'Jugar', '/juego.html'],
];

const admins = [
  { initials: 'HM', name: 'hotweels_mechanic', handle: '@deadspace0131', role: 'Admin' },
  { initials: 'HI', name: 'hierbero', handle: '@turbo_7zn', role: 'Admin' },
];
const members = [
  ['PE', 'PEPE', '@pepe_master109'],
  ['DA', 'Danielon2339', '@danielon33'],
  ['AP', 'Aprroachi', '@aprroachi_76029'],
  ['TH', 'the hackerman', '@yeraypin2011'],
  ['MA', 'Macareno', '@bonbardero'],
  ['BK', 'bAd_KeFir', '@merlin06459'],
  ['MP', 'mister pereira', '@soaringflame808'],
  ['IN', 'Indalecio_42', '@indalecio_42'],
  ['ER', 'ericc', '@galego0005'],
  ['UM', 'uma', '@umitiuxx'],
  ['PM', 'PMaxzito', '@pmaxzito'],
  ['FA', 'Francescaajuu', '@francescaajuu'],
];

const ruleItems = [
  ['Respeta a la gente', 'Insultos, discriminación, acoso o pasar de listo pueden acabar en expulsión. Trata a los demás como te gustaría que te trataran a ti.'],
  ['Spam = fuera', 'Nada de mensajes repetidos, menciones masivas innecesarias ni publicidad sin permiso.'],
  ['Cada canal tiene su tema', 'Memes en #memes, partidas en #busco-partida y charlas en los canales de voz. Así todos encuentran lo que buscan.'],
  ['Contenido apropiado', 'No publiques contenido sexual explícito, gore, ilegal o que vulnere la privacidad de otra persona.'],
  ['Voz con cabeza', 'Si alguien está jugando concentrado, evita gritar, poner música o dejar el micrófono abierto con ruido.'],
  ['Habla con el staff', 'Si no estás de acuerdo con una sanción, escribe a un admin por privado y explícalo con calma.'],
  ['Usa el sentido común', 'Si algo es claramente una mala idea aunque no aparezca escrito, no lo hagas.'],
];

const faqs = [
  ['¿Cómo me uno al servidor?', `Pulsa cualquiera de los botones «Unirse» de la web y acepta la invitación de Discord.`, '/'],
  ['¿Necesito jugar algo en específico?', 'No. Aquí se juega a cosas distintas; entra y pregunta quién anda conectado.', null],
  ['¿Hay reglas?', 'Sí, son pocas y claras. Puedes leerlas completas en la página de Reglas.', '/reglas.html'],
  ['¿Cómo contacto con un admin?', 'Escríbele por mensaje directo a cualquiera de los admins que aparecen en Equipo.', '/equipo.html'],
  ['¿Organizan torneos o eventos?', 'A veces organizamos noches de juego y torneos internos. Los anuncios salen en el servidor.', null],
  ['¿Puedo invitar a mis amigos?', 'Claro. Comparte el enlace de invitación y venid a saludar.', null],
];

const page = document.body.dataset.page || 'inicio';
const titleMap = {
  inicio: 'Toca Hierbas · Discord', reglas: 'Reglas · Toca Hierbas', equipo: 'Equipo · Toca Hierbas',
  faq: 'FAQ · Toca Hierbas', galeria: 'Galería · Toca Hierbas', juego: 'Jugar · Toca Hierbas',
  admin: 'Admin Galería · Toca Hierbas', privacidad: 'Privacidad · Toca Hierbas', terminos: 'Términos · Toca Hierbas',
};
document.title = titleMap[page] || titleMap.inicio;

const header = document.querySelector('#site-header');
const main = document.querySelector('#contenido');
const footer = document.querySelector('#site-footer');

function headerMarkup() {
  const links = navItems.map(([key, label, href]) => `<a class="nav-link" href="${href}"${key === page ? ' aria-current="page"' : ''}>${label}</a>`).join('');
  return `<header class="site-header"><div class="shell nav-inner">
    <a class="brand" href="/index.html" aria-label="Toca Hierbas, inicio"><span class="brand-mark" aria-hidden="true">🌿</span><span>Toca <span class="brand-accent">Hierbas</span></span></a>
    <button class="menu-toggle" id="menu-toggle" type="button" aria-expanded="false" aria-controls="main-nav"><span class="menu-lines" aria-hidden="true"><i></i><i></i><i></i></span><span>Menú</span></button>
    <nav class="main-nav" id="main-nav" aria-label="Navegación principal">${links}<a class="nav-link nav-link-icon" href="/admin.html" aria-label="Administrar galería" title="Administrar galería">⚙️</a><a class="nav-join" href="${INVITE_URL}" target="_blank" rel="noopener noreferrer">Unirse <span aria-hidden="true">↗</span></a></nav>
  </div></header>`;
}

function footerMarkup() {
  const year = new Date().getFullYear();
  return `<footer class="site-footer"><div class="shell footer-inner"><div class="footer-copy"><span class="brand-inline">Toca Hierbas</span> · ${year} · Hecho por la comunidad, para la comunidad.</div><nav class="footer-links" aria-label="Enlaces legales"><a href="/privacidad.html">Privacidad</a><a href="/terminos.html">Términos</a><a href="/admin.html">Administrar galería</a><a href="${INVITE_URL}" target="_blank" rel="noopener noreferrer">Discord ↗</a></nav></div></footer>`;
}

function memberCard([initials, name, handle]) {
  return `<article class="person-card"><span class="avatar" aria-hidden="true">${initials}</span><div><p class="person-name">${name}</p><p class="person-role">Miembro · ${handle}</p></div></article>`;
}

function pageHero(label, heading, description) {
  return `<section class="page-hero"><div class="shell"><p class="eyebrow">${label}</p><h1>${heading}</h1><p class="section-description">${description}</p></div></section>`;
}

function homePage() {
  const adminCards = admins.map(({ initials, name, handle, role }) => `<article class="person-card"><span class="avatar" aria-hidden="true">${initials}</span><div><p class="person-name">${name}</p><p class="person-role">${role} · ${handle}</p></div></article>`).join('');
  return `<section class="hero"><div class="shell hero-grid">
    <div><span class="status-pill"><i class="status-dot" aria-hidden="true"></i><span id="server-status">Comunidad activa ahora mismo</span></span>
      <h1>No preguntes por el nombre.<span>Quédate por la gente.</span></h1>
      <p class="hero-copy">Toca Hierbas es tu server de Discord en español: partidas todos los días, canales de voz siempre vivos y cero dramas.</p>
      <div class="hero-actions"><a class="button button-primary" href="${INVITE_URL}" target="_blank" rel="noopener noreferrer"><span aria-hidden="true">✦</span> Unirse al servidor</a><a class="button button-secondary" href="/reglas.html">Leer reglas primero <span aria-hidden="true">→</span></a></div>
      <div class="hero-stats"><div class="stat"><span class="stat-value" id="online-count">—</span><span class="stat-label">En Discord ahora</span></div><div class="stat"><span class="stat-value">24/7</span><span class="stat-label">Siempre hay plan</span></div><div class="stat"><span class="stat-value">ES</span><span class="stat-label">Comunidad en español</span></div></div>
    </div>
    <div class="chat-scene" aria-label="Vista previa de los canales de Toca Hierbas"><div class="orbit" aria-hidden="true"></div><div class="float-chip float-chip-left"><span class="float-icon">🎮</span><span><strong>¿Quién se apunta?</strong>partidas todos los días</span></div>
      <div class="chat-window"><div class="chat-topbar"><span class="chat-channel"><span>#</span> general</span><span class="chat-live"><i class="status-dot" aria-hidden="true"></i> en directo</span></div>
        <div class="chat-body"><article class="chat-message"><span class="chat-avatar">🪴</span><div><p class="chat-name">carlangs <span class="chat-time">hace 2 min</span></p><p class="chat-text">mira qué capture me salió ayer 😂</p><div class="chat-attachment"><span>📸 captura de la partida</span></div></div></article>
          <article class="chat-message"><span class="chat-avatar">🦝</span><div><p class="chat-name">hierbero <span class="chat-time">hace 1 min</span></p><p class="chat-text">JAJA, esto va directo a la galería</p></div></article>
          <article class="chat-message"><span class="chat-avatar">🎧</span><div><p class="chat-name">hotweels_mechanic <span class="chat-time">ahora</span></p><p class="chat-text">¿una más y nos vamos? 👀</p></div></article>
        </div><div class="chat-bottom"><span># general · # busco-partida · voz</span><span class="chat-reactions">♡ 24 · ☻ 8</span></div>
      </div><div class="float-chip float-chip-right"><span class="float-icon">💬</span><span><strong>Canales de voz vivos</strong>entra cuando quieras</span></div>
    </div>
  </div></section>
  <section class="section-tight"><div class="shell"><div class="section-head"><div><p class="eyebrow">Qué te espera dentro</p><h2 class="section-title">Un servidor para pasarla bien.</h2><p class="section-description">Entra por una partida. Quédate porque siempre hay alguien por ahí.</p></div><a class="text-link" href="/faq.html">Resuelve tus dudas <span aria-hidden="true">→</span></a></div>
    <div class="feature-grid"><article class="feature-card"><span class="feature-icon">🎮</span><h3>Partidas cada día</h3><p>Valorant, LoL, CS, indies o lo que surja. Pregunta y te unes.</p></article><article class="feature-card"><span class="feature-icon">🎙️</span><h3>Voz de verdad</h3><p>Canales con gente charlando, riéndose y pasando el rato.</p></article><article class="feature-card"><span class="feature-icon">🏆</span><h3>Eventos y torneos</h3><p>Noches temáticas, 1v1s, torneos internos y maratones.</p></article><article class="feature-card"><span class="feature-icon">🌱</span><h3>Ambiente sano</h3><p>Moderación activa, reglas claras y sitio para todo el mundo.</p></article></div>
  </div></section>
  <section class="section-tight"><div class="shell"><div class="section-head"><div><p class="eyebrow">La cara detrás del server</p><h2 class="section-title">Una comunidad hecha entre todos.</h2></div><a class="text-link" href="/equipo.html">Conoce al equipo <span aria-hidden="true">→</span></a></div><div class="team-preview">${adminCards}</div></div></section>
  <section class="section-tight"><div class="shell"><div class="cta-banner"><h2>Tu próxima partida empieza aquí.</h2><a class="button button-primary" href="${INVITE_URL}" target="_blank" rel="noopener noreferrer">Unirse al Discord <span aria-hidden="true">↗</span></a></div></div></section>`;
}

function rulesPage() {
  const cards = ruleItems.map(([heading, text]) => `<article class="rule-card"><h2>${heading}</h2><p>${text}</p></article>`).join('');
  return `${pageHero('Convivencia', 'Reglas del servidor', 'Pocas, claras y con sentido común. Léelas antes de liarla.')}
    <section class="page-main"><div class="shell"><div class="rule-grid">${cards}</div><div class="page-cta"><div class="cta-banner"><h2>¿Todo claro? Pasa, saluda y a jugar.</h2><a class="button button-primary" href="${INVITE_URL}" target="_blank" rel="noopener noreferrer">Unirse al servidor <span aria-hidden="true">↗</span></a></div></div></div></section>`;
}

function teamPage() {
  const adminCards = admins.map(({ initials, name, handle, role }) => `<article class="person-card"><span class="avatar" aria-hidden="true">${initials}</span><div><p class="person-name">${name}</p><p class="person-role">${role} · ${handle}</p></div></article>`).join('');
  return `${pageHero('La comunidad', 'Equipo y comunidad', 'El equipo que cuida el servidor y la gente que lo llena de vida.')}
    <section class="page-main"><div class="shell"><div class="section-head"><div><p class="eyebrow">Administradores</p><h2 class="section-title">Aquí estamos para ayudar.</h2></div></div><div class="team-preview">${adminCards}</div>
      <div class="section-head" style="margin-top:64px"><div><p class="eyebrow">Miembros destacados</p><h2 class="section-title">La gente que hace comunidad.</h2><p class="section-description">Gracias por las partidas, las risas y los buenos momentos.</p></div></div><div class="member-grid">${members.map(memberCard).join('')}</div>
    </div></section>`;
}

function faqPage() {
  const items = faqs.map(([question, answer, link]) => `<details class="faq-item"><summary>${question}</summary><div class="faq-answer">${link ? `${answer.replace(/(Reglas|Equipo)/, `<a class="text-link" href="${link}">$1</a>`)}` : answer}</div></details>`).join('');
  return `${pageHero('Dudas comunes', 'Preguntas frecuentes', 'Lo que más nos preguntan quienes están por unirse.')}
    <section class="page-main"><div class="shell"><div class="faq-list">${items}</div><div class="page-cta"><div class="cta-banner"><h2>¿Te queda alguna duda? Ven y pregunta.</h2><a class="button button-primary" href="${INVITE_URL}" target="_blank" rel="noopener noreferrer">Unirse <span aria-hidden="true">↗</span></a></div></div></div></section>`;
}

function galleryPage() {
  return `${pageHero('Historias del server', 'Galería', 'Capturas, momentos y vergüenzas de la comunidad. La galería compartida se actualiza automáticamente.')}
    <section class="page-main"><div class="shell"><div class="gallery-toolbar"><p class="gallery-status" id="gallery-status" role="status" aria-live="polite">Cargando la galería…</p><a class="button button-secondary button-small" href="/admin.html">⚙️ Administrar galería</a></div><div class="gallery-grid" id="gallery-grid"></div></div></section>`;
}

function gamePage() {
  return `${pageHero('Pausa entre partidas', 'Corta la hierba', '20 segundos. Haz clic o toca las hojas que aparecen. Así de simple.')}
    <section class="page-main"><div class="shell game-wrap"><div class="game-card"><div class="game-head"><div><p class="micro-label" style="margin:0 0 8px">Reto de la comunidad</p><div class="game-score"><div><strong id="game-score">0</strong><small>Puntos</small></div><div><strong id="game-time">20</strong><small>Segundos</small></div><div><strong id="game-best">0</strong><small>Tu récord</small></div></div></div><span class="status-pill">🌿 listo para jugar</span></div>
      <div class="game-body"><div class="game-board" id="game-board" aria-label="Zona de juego"><div class="game-overlay" id="game-overlay"><strong>¿Cuántas hojas alcanzas?</strong><span>Dale a Jugar y empieza a cortar.</span></div></div><div class="game-controls"><span class="game-help" id="game-message" aria-live="polite">Cada hoja suma un punto. ¡A por tu récord!</span><button class="button button-primary" id="game-start" type="button">▶ &nbsp; Jugar</button></div></div>
    </div></div></section>`;
}

function adminPage() {
  return `${pageHero('Solo para el equipo', 'Admin galería', 'Gestiona las capturas que aparecen en la galería de la comunidad.')}
    <section class="page-main"><div class="shell admin-layout"><div class="admin-panel" id="admin-root"><div class="admin-auth"><div class="feature-icon">🔒</div><h2>Acceso del equipo</h2><p>La contraseña se valida en el servidor de Vercel.</p><form class="form-stack" id="admin-login"><div class="field"><label for="admin-password">Contraseña del panel</label><input id="admin-password" name="password" type="password" autocomplete="current-password" required placeholder="Introduce tu contraseña"/></div><div class="notice" id="admin-login-status" aria-live="polite">El panel funciona cuando configuras <code>GALLERY_ADMIN_PASSWORD</code> en Vercel.</div><button class="button button-primary" type="submit">Entrar <span aria-hidden="true">→</span></button></form></div></div>
      <aside class="admin-sidebar"><div class="panel-card"><span class="feature-icon">🖼️</span><h3>La galería de todos</h3><p>Sube capturas del servidor y retira publicaciones cuando haga falta.</p><ul><li>Solo se aceptan imágenes y vídeos cortos.</li><li>Cada archivo puede ocupar hasta 3 MB.</li><li>Lo que publiques será visible para cualquiera.</li><li>La contraseña y las cargas pasan por la API del servidor.</li></ul><p style="margin-top:15px"><a class="text-link" href="/galeria.html">Ver galería <span aria-hidden="true">→</span></a></p></div></aside>
    </div></section>`;
}

const privacySections = [
  ['¿Quiénes somos?', 'Toca Hierbas es una comunidad de videojuegos en español alojada en Discord. Esta web sirve para informar sobre la comunidad, enseñar capturas y ofrecer un pequeño minijuego.'],
  ['Qué datos se usan en esta web', 'Si el equipo sube una captura a la galería, el nombre elegido, el texto de la publicación y el archivo se guardan en Vercel Blob y se muestran públicamente. Discord puede facilitar el número de personas conectadas cuando su widget público está disponible.'],
  ['Servicios externos', `El widget consulta directamente el servicio público de Discord. La galería usa servicios de Vercel para alojar la web, procesar las peticiones y guardar las publicaciones. También se aplica la <a href="https://discord.com/privacy" target="_blank" rel="noopener noreferrer">Política de Privacidad de Discord</a> al usar Discord.`],
  ['Almacenamiento local', 'El navegador guarda tu récord del minijuego. La contraseña del panel solo permanece en la memoria de la página mientras el panel está abierto; no se guarda en el almacenamiento del navegador. No usamos cuentas de usuario, analítica, píxeles publicitarios ni cookies de seguimiento.'],
  ['Tus derechos y contacto', 'Puedes pedir al equipo que retire una publicación de la galería escribiendo a un admin en Discord. Para borrar el récord del juego, limpia el almacenamiento de este sitio desde los ajustes de tu navegador.'],
  ['Menores y cambios', 'Discord exige tener al menos 13 años. Si eres menor, usa Discord conforme a sus condiciones y con la supervisión que corresponda. Si cambia esta política, actualizaremos esta página.'],
];
function privacyPage() {
  const sections = privacySections.map(([heading, text]) => `<section><h2>${heading}</h2><p>${text}</p></section>`).join('');
  return `${pageHero('Tu privacidad', 'Política de privacidad', 'Qué información utiliza la web y cómo se gestionan las capturas compartidas.')}
    <section class="page-main"><div class="shell legal-wrap"><p class="legal-meta">Última actualización: 27 de septiembre de 2026</p><div class="legal-content">${sections}</div></div></section>`;
}

const termsSections = [
  ['Uso de la web', 'Esta web ofrece información de la comunidad, una galería y un minijuego. Úsala con sentido común y no intentes interrumpir su funcionamiento.'],
  ['Publicaciones de la galería', 'Al publicar una imagen o vídeo, confirmas que puedes compartirlo y que no contiene material ilegal, contenido sexual explícito, gore, datos personales de terceros ni material que vulnere sus derechos. El equipo puede retirarlo si incumple estas condiciones.'],
  ['Derechos sobre tus publicaciones', 'Conservas tus derechos sobre tus capturas. Al subirlas, autorizas a Toca Hierbas a mostrarlas en la galería de esta web. Puedes pedir que una publicación se retire contactando con el equipo.'],
  ['Servidor de Discord', `El servidor se rige por sus <a href="/reglas.html">reglas</a> y por los <a href="https://discord.com/terms" target="_blank" rel="noopener noreferrer">Términos de Servicio de Discord</a>. Discord controla su propia plataforma y sus servicios.`],
  ['Disponibilidad', 'La web, la galería y el minijuego se ofrecen tal cual y pueden dejar de estar disponibles temporalmente. El récord del minijuego se conserva en tu navegador y no se sincroniza con otros dispositivos.'],
  ['Cambios y contacto', 'El equipo puede actualizar la web, las funciones y estas condiciones. Si tienes preguntas o quieres solicitar la retirada de una captura, contacta con un admin en Discord.'],
];
function termsPage() {
  const sections = termsSections.map(([heading, text]) => `<section><h2>${heading}</h2><p>${text}</p></section>`).join('');
  return `${pageHero('Uso de la comunidad', 'Términos de servicio', 'Al usar esta web o publicar contenido, aceptas estas condiciones.')}
    <section class="page-main"><div class="shell legal-wrap"><p class="legal-meta">Última actualización: 27 de septiembre de 2026</p><div class="legal-content">${sections}</div></div></section>`;
}

const pageRenderers = {
  inicio: homePage, reglas: rulesPage, equipo: teamPage, faq: faqPage,
  galeria: galleryPage, juego: gamePage, admin: adminPage,
  privacidad: privacyPage, terminos: termsPage,
};

header.innerHTML = headerMarkup();
main.innerHTML = (pageRenderers[page] || homePage)();
footer.innerHTML = footerMarkup();

// When opening index.html directly with file://, turn site-root links into
// local relative links so the preview still works without a web server.
if (window.location.protocol === 'file:') {
  document.querySelectorAll('a[href^="/"]').forEach((link) => {
    link.setAttribute('href', link.getAttribute('href').slice(1));
  });
}

const menuToggle = document.querySelector('#menu-toggle');
const mainNav = document.querySelector('#main-nav');
const skipLink = document.querySelector('.skip-link');
skipLink?.addEventListener('click', (event) => {
  const target = document.querySelector(skipLink.getAttribute('href') || '#contenido');
  if (!target) return;
  event.preventDefault();
  target.focus({ preventScroll: true });
  target.scrollIntoView({ behavior: 'smooth', block: 'start' });
});
menuToggle?.addEventListener('click', () => {
  const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!expanded));
  mainNav?.classList.toggle('is-open', !expanded);
});
mainNav?.addEventListener('click', (event) => {
  if (event.target.closest('a')) {
    mainNav.classList.remove('is-open');
    menuToggle?.setAttribute('aria-expanded', 'false');
  }
});

function updateScrollProgress() {
  const bar = document.querySelector('.scroll-progress');
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const percent = scrollable > 0 ? Math.min(100, (window.scrollY / scrollable) * 100) : 0;
  if (bar) bar.style.width = `${percent}%`;
}
window.addEventListener('scroll', updateScrollProgress, { passive: true });
updateScrollProgress();

async function updateDiscordStatus() {
  const count = document.querySelector('#online-count');
  const status = document.querySelector('#server-status');
  if (!count || !status) return;
  try {
    const response = await fetch(DISCORD_WIDGET_URL, { cache: 'no-store', signal: AbortSignal.timeout(5000) });
    if (!response.ok) throw new Error('Discord widget unavailable');
    const data = await response.json();
    if (typeof data.presence_count === 'number') {
      count.textContent = new Intl.NumberFormat('es-ES').format(data.presence_count);
      status.textContent = data.presence_count > 0 ? 'Gente conectada ahora mismo' : 'El server te espera';
    }
  } catch {
    count.textContent = '—';
    status.textContent = 'Comunidad activa ahora mismo';
  }
}
updateDiscordStatus();

const toast = document.querySelector('#toast');
let toastTimer;
function showToast(message) {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('is-visible');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('is-visible'), 3200);
}

const allowedTypes = new Set(['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/avif', 'video/mp4', 'video/webm']);
function escapeHTML(value = '') {
  return String(value).replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
}
function safeMediaUrl(value) {
  try {
    const url = new URL(value, window.location.origin);
    return url.protocol === 'https:' ? url.href : '';
  } catch { return ''; }
}
function mediaMarkup(item, className = 'gallery-media') {
  const url = safeMediaUrl(item.url);
  if (!url) return `<div class="${className}"><span>Archivo no disponible</span></div>`;
  const media = String(item.contentType || '').startsWith('video/')
    ? `<video controls preload="metadata" src="${escapeHTML(url)}" aria-label="Vídeo compartido por ${escapeHTML(item.author)}"></video>`
    : `<img loading="lazy" src="${escapeHTML(url)}" alt="${escapeHTML(item.caption || 'Captura de la comunidad')}"/>`;
  return `<div class="${className}">${media}</div>`;
}
function formatDate(value) {
  const date = new Date(value);
  if (Number.isNaN(date.valueOf())) return 'Toca Hierbas';
  return new Intl.DateTimeFormat('es-ES', { day: 'numeric', month: 'short', year: 'numeric' }).format(date);
}
function renderGalleryCards(items, isAdmin = false) {
  if (!items.length) return `<div class="empty-state"><div><span class="empty-icon" aria-hidden="true">🌿</span><h2>Todavía no hay capturas</h2><p>Cuando el equipo publique los primeros momentos, aparecerán aquí.</p></div></div>`;
  return items.map((item) => `<article class="gallery-card" data-gallery-id="${escapeHTML(item.id)}">${mediaMarkup(item)}<div class="gallery-caption"><p>${escapeHTML(item.caption || 'Un momento de la comunidad')}</p><div class="gallery-meta"><span>por ${escapeHTML(item.author || 'Toca Hierbas')}</span><time datetime="${escapeHTML(item.uploadedAt || '')}">${escapeHTML(formatDate(item.uploadedAt))}</time></div></div>${isAdmin ? `<button class="button button-danger button-small admin-delete" type="button" data-id="${escapeHTML(item.id)}">Retirar publicación</button>` : ''}</article>`).join('');
}

async function fetchGallery() {
  const response = await fetch('/api/gallery', { headers: { Accept: 'application/json' }, cache: 'no-store' });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const error = new Error(data.error || 'gallery_unavailable');
    error.code = data.error || 'gallery_unavailable';
    throw error;
  }
  return Array.isArray(data.items) ? data.items : [];
}

async function loadPublicGallery() {
  const grid = document.querySelector('#gallery-grid');
  const status = document.querySelector('#gallery-status');
  if (!grid || !status) return;
  try {
    const items = await fetchGallery();
    grid.innerHTML = renderGalleryCards(items);
    status.textContent = `${items.length} ${items.length === 1 ? 'momento compartido' : 'momentos compartidos'}`;
  } catch (error) {
    if (error.code === 'storage_not_configured') {
      status.textContent = 'La galería compartida aún no está conectada.';
      grid.innerHTML = `<div class="empty-state"><div><span class="empty-icon" aria-hidden="true">🖼️</span><h2>Prepara la galería compartida</h2><p>Conecta un almacén Vercel Blob y configura sus variables de entorno para que las publicaciones se vean en todos los dispositivos.</p><p style="margin-top:15px"><a class="text-link" href="/admin.html">Ir al panel del equipo <span aria-hidden="true">→</span></a></p></div></div>`;
      return;
    }
    status.textContent = 'No se pudo cargar la galería.';
    grid.innerHTML = `<div class="empty-state"><div><span class="empty-icon" aria-hidden="true">🌫️</span><h2>Ahora mismo no carga</h2><p>Vuelve a intentarlo dentro de un momento.</p><button class="button button-secondary button-small" id="gallery-retry" type="button" style="margin-top:16px">Reintentar</button></div></div>`;
    document.querySelector('#gallery-retry')?.addEventListener('click', loadPublicGallery);
  }
}

async function postGallery(payload) {
  const response = await fetch('/api/gallery', {
    method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(payload),
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.error || 'No se pudo completar la acción.');
  return data;
}

function mountAdmin() {
  const root = document.querySelector('#admin-root');
  if (!root) return;
  let items = [];
  let adminSecret = '';

  function showLogin(message = '') {
    root.innerHTML = `<div class="admin-auth"><div class="feature-icon">🔒</div><h2>Acceso del equipo</h2><p>La contraseña se valida en el servidor y solo permanece en memoria mientras esta página está abierta.</p><form class="form-stack" id="admin-login"><div class="field"><label for="admin-password">Contraseña del panel</label><input id="admin-password" name="password" type="password" autocomplete="current-password" required placeholder="Introduce tu contraseña"/></div><div class="notice ${message ? 'error' : ''}" id="admin-login-status" aria-live="polite">${escapeHTML(message || 'Configura GALLERY_ADMIN_PASSWORD en Vercel para activar este panel.')}</div><button class="button button-primary" type="submit">Entrar <span aria-hidden="true">→</span></button></form></div>`;
    root.querySelector('#admin-login')?.addEventListener('submit', async (event) => {
      event.preventDefault();
      const field = root.querySelector('#admin-password');
      const button = root.querySelector('button[type="submit"]');
      const status = root.querySelector('#admin-login-status');
      button.disabled = true;
      button.textContent = 'Comprobando…';
      status.classList.remove('error');
      status.textContent = 'Comprobando el acceso…';
      try {
        await postGallery({ action: 'login', password: field.value });
        adminSecret = field.value;
        await showAdminPanel();
      } catch (error) {
        status.classList.add('error');
        status.textContent = error.message.includes('password_not_configured')
          ? 'Falta configurar GALLERY_ADMIN_PASSWORD en Vercel.'
          : 'No se pudo validar la contraseña. Comprueba el acceso y vuelve a intentarlo.';
        button.disabled = false;
        button.textContent = 'Entrar →';
      }
    });
  }

  function drawAdminList() {
    const list = root.querySelector('#admin-list');
    if (!list) return;
    if (!items.length) {
      list.innerHTML = '<div class="notice">Aún no hay publicaciones. Sube la primera captura de la comunidad.</div>';
      return;
    }
    list.innerHTML = items.map((item) => `<div class="admin-list-row" data-gallery-id="${escapeHTML(item.id)}">${mediaMarkup(item, 'admin-preview')}<div><div class="admin-list-title">${escapeHTML(item.caption || 'Sin descripción')}</div><div class="admin-list-byline">${escapeHTML(item.author)} · ${escapeHTML(formatDate(item.uploadedAt))}</div></div><button class="button button-danger button-small admin-delete" type="button" data-id="${escapeHTML(item.id)}">Retirar</button></div>`).join('');
    root.querySelectorAll('.admin-delete').forEach((button) => button.addEventListener('click', async () => {
      if (!window.confirm('¿Retirar esta publicación de la galería?')) return;
      button.disabled = true;
      button.textContent = 'Retirando…';
      try {
        await postGallery({ action: 'delete', password: adminSecret, id: button.dataset.id });
        items = items.filter((item) => item.id !== button.dataset.id);
        drawAdminList();
        showToast('Publicación retirada de la galería.');
      } catch {
        button.disabled = false;
        button.textContent = 'Retirar';
        showToast('No se pudo retirar. Comprueba el acceso y vuelve a intentarlo.');
      }
    }));
  }

  async function showAdminPanel() {
    root.innerHTML = `<div><div style="display:flex;align-items:center;justify-content:space-between;gap:14px;flex-wrap:wrap"><div><p class="eyebrow" style="margin-bottom:8px">Panel del equipo</p><h2>Gestiona la galería</h2></div><button class="button button-secondary button-small" id="admin-logout" type="button">Cerrar sesión</button></div><p>Añade capturas con el nombre que quieras mostrar. El contenido se verá en la galería pública.</p>
      <form class="form-stack" id="gallery-upload"><div class="field"><label for="gallery-author">Nombre visible</label><input id="gallery-author" name="author" maxlength="32" required placeholder="Por ejemplo, hierbero"/></div><div class="field"><label for="gallery-caption">Texto de la publicación</label><textarea id="gallery-caption" name="caption" maxlength="180" placeholder="Cuenta qué pasó en la captura…"></textarea></div><div class="field"><label for="gallery-file">Imagen o vídeo</label><input id="gallery-file" name="file" type="file" accept="image/jpeg,image/png,image/gif,image/webp,image/avif,video/mp4,video/webm" required/><span class="field-hint">JPG, PNG, GIF, WebP, AVIF, MP4 o WebM · máximo 3 MB</span></div><div class="notice" id="upload-status" aria-live="polite">La publicación será visible para cualquiera que visite la web.</div><button class="button button-primary" type="submit">Publicar en la galería <span aria-hidden="true">↗</span></button></form>
      <div class="admin-list" id="admin-list"></div></div>`;
    root.querySelector('#admin-logout')?.addEventListener('click', () => { adminSecret = ''; showLogin(); });
    root.querySelector('#gallery-upload')?.addEventListener('submit', async (event) => {
      event.preventDefault();
      const form = event.currentTarget;
      const author = form.elements.author.value.trim();
      const caption = form.elements.caption.value.trim();
      const file = form.elements.file.files?.[0];
      const button = form.querySelector('button[type="submit"]');
      const status = root.querySelector('#upload-status');
      if (!file) return;
      if (!allowedTypes.has(file.type)) { status.classList.add('error'); status.textContent = 'Elige una imagen compatible o un vídeo MP4/WebM.'; return; }
      if (file.size > MAX_UPLOAD_BYTES) { status.classList.add('error'); status.textContent = 'El archivo supera el límite de 3 MB.'; return; }
      button.disabled = true;
      button.textContent = 'Subiendo…';
      status.classList.remove('error');
      status.textContent = 'Subiendo el archivo a la galería compartida…';
      try {
        const dataUrl = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result);
          reader.onerror = () => reject(new Error('No se pudo leer el archivo.'));
          reader.readAsDataURL(file);
        });
        await postGallery({ action: 'upload', password: adminSecret, author, caption, file: dataUrl, contentType: file.type });
        form.reset();
        items = await fetchGallery();
        drawAdminList();
        status.textContent = 'La captura ya está publicada en la galería.';
        showToast('Captura publicada.');
      } catch (error) {
        status.classList.add('error');
        status.textContent = error.message.includes('storage_not_configured')
          ? 'Conecta Vercel Blob y configura BLOB_READ_WRITE_TOKEN para habilitar las publicaciones.'
          : error.message.includes('invalid_file') || error.message.includes('file_too_large')
            ? 'El archivo no tiene un formato permitido o supera el límite.'
            : 'No se pudo publicar. Revisa que la galería y la contraseña estén configuradas en Vercel.';
      } finally {
        button.disabled = false;
        button.textContent = 'Publicar en la galería ↗';
      }
    });
    try {
      items = await fetchGallery();
      drawAdminList();
    } catch (error) {
      root.querySelector('#admin-list').innerHTML = '<div class="notice">No se pudo conectar con la galería. Comprueba la configuración de Vercel Blob.</div>';
    }
  }

  showLogin();
}

function mountGame() {
  const board = document.querySelector('#game-board');
  const start = document.querySelector('#game-start');
  if (!board || !start) return;
  const scoreNode = document.querySelector('#game-score');
  const timeNode = document.querySelector('#game-time');
  const bestNode = document.querySelector('#game-best');
  const overlay = document.querySelector('#game-overlay');
  const message = document.querySelector('#game-message');
  let score = 0;
  let remaining = 20;
  let timerId;
  let spawnId;
  const bestKey = 'toca-hierbas-best';
  const readBest = () => Number(localStorage.getItem(bestKey) || 0);
  bestNode.textContent = String(readBest());

  function finishGame() {
    clearInterval(timerId);
    clearInterval(spawnId);
    board.querySelectorAll('.leaf-target').forEach((leaf) => leaf.remove());
    const previousBest = readBest();
    const best = Math.max(previousBest, score);
    localStorage.setItem(bestKey, String(best));
    bestNode.textContent = String(best);
    overlay.hidden = false;
    overlay.innerHTML = `<strong>¡Has conseguido ${score} ${score === 1 ? 'punto' : 'puntos'}!</strong><span>${score > previousBest ? 'Nuevo récord personal. ¿Otra ronda?' : '¿Puedes superar tu récord de ' + best + ' puntos?'}</span>`;
    start.disabled = false;
    start.textContent = '↻  Jugar otra vez';
    message.textContent = 'Buen intento. ¡La siguiente va mejor!';
  }

  function addLeaf() {
    if (board.querySelectorAll('.leaf-target').length >= 5) return;
    const leaf = document.createElement('button');
    leaf.type = 'button';
    leaf.className = 'leaf-target';
    leaf.setAttribute('aria-label', 'Cortar hoja');
    leaf.textContent = ['🌿', '☘️', '🍃'][Math.floor(Math.random() * 3)];
    const maxX = Math.max(12, board.clientWidth - 70);
    const maxY = Math.max(12, board.clientHeight - 70);
    leaf.style.left = `${12 + Math.random() * Math.max(0, maxX - 12)}px`;
    leaf.style.top = `${12 + Math.random() * Math.max(0, maxY - 12)}px`;
    leaf.addEventListener('click', () => {
      if (!leaf.isConnected) return;
      leaf.remove();
      score += 1;
      scoreNode.textContent = String(score);
    });
    board.append(leaf);
    setTimeout(() => leaf.remove(), 1350);
  }

  start.addEventListener('click', () => {
    clearInterval(timerId);
    clearInterval(spawnId);
    board.querySelectorAll('.leaf-target').forEach((leaf) => leaf.remove());
    score = 0;
    remaining = 20;
    scoreNode.textContent = '0';
    timeNode.textContent = '20';
    overlay.hidden = true;
    message.textContent = '¡Encuentra las hojas y haz clic!';
    start.disabled = true;
    start.textContent = '⏱  En marcha…';
    addLeaf();
    spawnId = setInterval(addLeaf, 510);
    timerId = setInterval(() => {
      remaining -= 1;
      timeNode.textContent = String(remaining);
      if (remaining <= 0) finishGame();
    }, 1000);
  });
}

if (page === 'galeria') {
  loadPublicGallery();
  setInterval(loadPublicGallery, 30_000);
}
if (page === 'admin') mountAdmin();
if (page === 'juego') mountGame();
