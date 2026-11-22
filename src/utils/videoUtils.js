/**
 * Utilidad para transformar enlaces de video (Google Drive, YouTube, Vimeo, etc.)
 * en URLs aptas para incrustar en un iframe.
 */
export const getVideoEmbedUrl = (url) => {
  if (!url || typeof url !== "string") return null;
  const cleanUrl = url.trim();

  // 1. Google Drive (formatos comunes: /file/d/ID/view, /open?id=ID, /uc?id=ID)
  const driveMatch = cleanUrl.match(/\/(?:file\/d\/|open\?id=|uc\?id=)([a-zA-Z0-9_-]+)/);
  if (driveMatch && driveMatch[1]) {
    return `https://drive.google.com/file/d/${driveMatch[1]}/preview`;
  }

  // 2. YouTube (watch?v=ID, youtu.be/ID, embed/ID, shorts/ID)
  const ytMatch = cleanUrl.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/|v\/))([a-zA-Z0-9_-]+)/);
  if (ytMatch && ytMatch[1]) {
    // Parámetros al máximo para limpiar YouTube:
    // modestbranding=1 (reduce logo), rel=0 (sin sugerencias externas), iv_load_policy=3 (sin anotaciones),
    // controls=1 (o controls=0 si prefieres sin barra inferior), disablekb=1 (sin accesos), fs=1 (pantalla completa opcional)
    return `https://www.youtube-nocookie.com/embed/${ytMatch[1]}?modestbranding=1&rel=0&iv_load_policy=3&playsinline=1&controls=0`;
  }

  // 3. Vimeo (vimeo.com/ID)
  const vimeoMatch = cleanUrl.match(/vimeo\.com\/(?:video\/)?([0-9]+)/);
  if (vimeoMatch && vimeoMatch[1]) {
    return `https://player.vimeo.com/video/${vimeoMatch[1]}`;
  }

  // Si ya tiene /preview o es otro embed
  return cleanUrl;
};
