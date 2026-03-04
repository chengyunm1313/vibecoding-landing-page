const fallbackSiteUrl = 'http://localhost:3000';

function getBasePath() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? fallbackSiteUrl;

  try {
    const pathname = new URL(siteUrl).pathname.replace(/\/$/, '');
    return pathname === '/' ? '' : pathname;
  } catch {
    return '';
  }
}

export function withPublicPath(path: string) {
  if (!path.startsWith('/')) {
    return path;
  }

  if (/^(https?:)?\/\//.test(path)) {
    return path;
  }

  const basePath = getBasePath();

  if (!basePath || path.startsWith(`${basePath}/`)) {
    return path;
  }

  return `${basePath}${path}`;
}
