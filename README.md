# Toca Hierbas · Web de Discord

Web multipágina en español basada en la página de referencia. Incluye inicio, reglas, equipo, FAQ, galería, minijuego, panel del equipo y páginas de privacidad y términos.

## Publicar en Vercel

1. Importa este proyecto en Vercel y despliega la carpeta raíz. La web estática no necesita un comando de build.
2. En **Storage**, crea un almacén de **Vercel Blob** con acceso público para las capturas. Enlázalo al mismo proyecto para que Vercel añada `BLOB_READ_WRITE_TOKEN`.
3. En **Settings → Environment Variables**, añade `GALLERY_ADMIN_PASSWORD` con una contraseña larga (al menos 12 caracteres; se recomienda una frase aleatoria de 24 o más). No pongas esta contraseña en los archivos del proyecto.
4. Despliega otra vez para aplicar las variables. La portada y las páginas informativas también se pueden ver antes de configurar la galería; la subida y la galería compartida necesitan el almacén Blob.

El equipo entra en `/admin.html`, inicia sesión y publica imágenes o vídeos cortos. Se aceptan JPG, PNG, GIF, WebP, AVIF, MP4 y WebM, hasta 3 MB por archivo. Las publicaciones son públicas; el panel permite retirarlas.

El contador de personas conectadas usa el widget público de Discord del servidor. Si el contador no aparece, habilita el widget del servidor en los ajustes de Discord. El minijuego funciona en el navegador y guarda el récord solo en ese dispositivo.

## Probar cambios localmente

Para probar la función de galería hace falta ejecutar las funciones de Vercel en modo desarrollo y enlazar el proyecto con un almacén Blob. No uses el servidor estático simple para las rutas `/api`.

Las credenciales reales van en las variables de entorno de Vercel o en un `.env.local` que no se sube al repositorio.
