'use client';

export default function myImageLoader({ src, width, quality }) {
  return `https:${src}?w=${width}&q=${quality || 100}`
}