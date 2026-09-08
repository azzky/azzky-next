import { createClient } from 'contentful-management';

// Map the site locale to the Contentful locale code used in the space.
const contentfulLocale = (locale) => (locale === 'ru' ? 'ru' : 'en-US');

// Very small in-memory rate limiter (per server instance).
const RATE_LIMIT = 3; // submissions
const RATE_WINDOW = 10 * 60 * 1000; // per 10 minutes
const hits = new Map();

const isRateLimited = (ip) => {
    const now = Date.now();
    const record = hits.get(ip) || [];
    const recent = record.filter((ts) => now - ts < RATE_WINDOW);
    recent.push(now);
    hits.set(ip, recent);
    return recent.length > RATE_LIMIT;
};

// Build a Contentful rich-text document from a plain text string.
const toRichText = (text) => ({
    nodeType: 'document',
    data: {},
    content: text
        .split(/\n{2,}/)
        .map((block) => block.trim())
        .filter(Boolean)
        .map((block) => ({
            nodeType: 'paragraph',
            data: {},
            content: [{ nodeType: 'text', value: block, marks: [], data: {} }]
        }))
});

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        res.setHeader('Allow', 'POST');
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { author, text, locale, website } = req.body || {};

    // Honeypot: bots fill hidden fields. Pretend success and do nothing.
    if (website) {
        return res.status(201).json({ ok: true });
    }

    const ip =
        (req.headers['x-forwarded-for'] || '').split(',')[0].trim() ||
        req.socket?.remoteAddress ||
        'unknown';

    if (isRateLimited(ip)) {
        return res.status(429).json({ error: 'Too many requests' });
    }

    const cleanAuthor = typeof author === 'string' ? author.trim() : '';
    const cleanText = typeof text === 'string' ? text.trim() : '';

    if (cleanAuthor.length < 1 || cleanAuthor.length > 100) {
        return res.status(400).json({ error: 'Invalid name' });
    }
    if (cleanText.length < 3 || cleanText.length > 2000) {
        return res.status(400).json({ error: 'Invalid review text' });
    }

    const {
        CONTENTFUL_SPACE_ID,
        CONTENTFUL_MANAGEMENT_TOKEN,
        CONTENTFUL_ENVIRONMENT
    } = process.env;

    if (!CONTENTFUL_SPACE_ID || !CONTENTFUL_MANAGEMENT_TOKEN) {
        return res.status(500).json({ error: 'Server not configured' });
    }

    const cfLocale = contentfulLocale(locale);

    try {
        const client = createClient(
            { accessToken: CONTENTFUL_MANAGEMENT_TOKEN },
            {
                type: 'plain',
                defaults: {
                    spaceId: CONTENTFUL_SPACE_ID,
                    environmentId: CONTENTFUL_ENVIRONMENT || 'master'
                }
            }
        );

        // Created without publishing so the entry stays in draft for manual review.
        await client.entry.create(
            { contentTypeId: 'feedback' },
            {
                fields: {
                    author: { [cfLocale]: cleanAuthor },
                    text: { [cfLocale]: toRichText(cleanText) },
                    date: { [cfLocale]: new Date().toISOString() }
                }
            }
        );

        return res.status(201).json({ ok: true });
    } catch (err) {
        console.error('Failed to create feedback draft:', err?.message || err);
        return res.status(500).json({ error: 'Failed to submit review' });
    }
}
