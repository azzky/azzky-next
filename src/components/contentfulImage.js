'use client';

// Cloudflare Worker proxy для кэширования и экономии трафика.
const IMAGE_PROXY_HOST = 'images.shibaribyazzky.com';

export default function myImageLoader({ src, width, quality }) {
    const url = new URL(`https:${src}`);
    url.hostname = IMAGE_PROXY_HOST;
    url.searchParams.set('fm', 'webp');
    url.searchParams.set('w', width.toString());
    url.searchParams.set('q', (quality || 75).toString());
    return url.href;
}