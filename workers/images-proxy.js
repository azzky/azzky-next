// Worker, который проксирует запросы на images.ctfassets.net (Contentful CDN).
// Space ID и остальной путь ассета уже содержатся в URL.

// Базовый URL CDN Contentful, куда мы будем проксировать.
const CONTENTFUL_CDN_BASE_URL = "https://images.ctfassets.net";

// Максимальное время жизни кэша (TTL) в секундах. 1 год = 31536000 секунд.
const CACHE_MAX_AGE_SECONDS = 31536000;

export default {
  async fetch(request) {
    // Handle CORS preflight
    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      });
    }

    const url = new URL(request.url);

    // 1. Извлечение пути: берём всё, что идёт после домена воркера.
    // Например, /{spaceId}/{assetId}/{hash}/image.jpg?fm=webp&w=800&q=75
    const fullPath = url.pathname + url.search;

    // 2. Создание целевого URL Contentful CDN
    const targetUrl = CONTENTFUL_CDN_BASE_URL + fullPath;

    // 3. Создание нового объекта Request для запроса к Contentful CDN
    const newRequest = new Request(targetUrl, request);
    newRequest.headers.delete("Origin");
    newRequest.headers.delete("Referer");

    // 4. Получение ответа от Contentful CDN с принудительным кэшированием Cloudflare
    const response = await fetch(newRequest, {
      cf: {
        // Принудительное кэширование на Edge Cloudflare в течение года
        cacheTtl: CACHE_MAX_AGE_SECONDS,
        // cacheKey остаётся уникальным для каждого URL
        cacheKey: url.toString(),
        cacheEverything: true,
      },
    });

    // 5. Клонирование ответа, чтобы изменить его заголовки
    const newResponse = new Response(response.body, response);
    newResponse.headers.set("Access-Control-Allow-Origin", "*");

    // 6. Установка заголовков кэширования для браузера
    // 'immutable' подходит, так как URL ассета меняется при изменении изображения
    newResponse.headers.set(
      "Cache-Control",
      `public, max-age=${CACHE_MAX_AGE_SECONDS}, immutable`
    );

    // Удаляем Vary: Accept-Encoding, чтобы не плодить варианты кэша
    newResponse.headers.delete("Vary");

    // Не кэшировать ошибки 4xx/5xx
    if (!newResponse.ok) {
      newResponse.headers.set("Cache-Control", "no-store, max-age=0");
    }

    // Очистка потенциально мешающих заголовков
    newResponse.headers.delete("Set-Cookie");
    newResponse.headers.delete("Expires");

    return newResponse;
  },
};
