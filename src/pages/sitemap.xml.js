import Maindata from '@/constants';
import { client } from '@/lib/contentful';
import removeSpaces from '@/utils/removeSpaces';

const staticPages = [
    { path: '', priority: '1.0', changefreq: 'daily' },
    { path: '/shibari', priority: '0.9', changefreq: 'daily' },
    { path: '/tags', priority: '0.6', changefreq: 'weekly' },
    { path: '/models', priority: '0.6', changefreq: 'weekly' },
    { path: '/photographers', priority: '0.6', changefreq: 'weekly' },
    { path: '/muahs', priority: '0.6', changefreq: 'weekly' },
    { path: '/contact', priority: '0.5', changefreq: 'monthly' },
];

const urlEntry = (loc, lastmod, changefreq, priority) => `
        <url>
            <loc>${loc}</loc>
            <lastmod>${lastmod}</lastmod>
            <changefreq>${changefreq}</changefreq>
            <priority>${priority}</priority>
        </url>`;

const generateSiteMap = (posts) => {
    const date = new Date().toISOString();

    // Collect unique models, photographers, muahs, tags from posts
    const models = {};
    const photographers = {};
    const muahs = {};
    const tags = {};

    posts.forEach(post => {
        post.fields.model?.forEach(m => {
            if (m?.fields?.name) models[m.fields.name] = post.sys.updatedAt;
        });
        if (post.fields.photographer?.fields?.name) {
            photographers[post.fields.photographer.fields.name] = post.sys.updatedAt;
        }
        if (post.fields.muah?.fields?.name) {
            muahs[post.fields.muah.fields.name] = post.sys.updatedAt;
        }
        post.fields.tags?.forEach(tag => {
            if (!tags[tag] || tags[tag] < post.sys.updatedAt) tags[tag] = post.sys.updatedAt;
        });
    });

    return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
            xmlns:xhtml="http://www.w3.org/1999/xhtml">
        ${staticPages.map(({ path, priority, changefreq }) => `
        <url>
            <loc>${Maindata.url}${path}</loc>
            <lastmod>${date}</lastmod>
            <changefreq>${changefreq}</changefreq>
            <priority>${priority}</priority>
            <xhtml:link rel="alternate" hreflang="en" href="${Maindata.url}${path}"/>
            <xhtml:link rel="alternate" hreflang="ru" href="${Maindata.url}/ru${path}"/>
            <xhtml:link rel="alternate" hreflang="sr" href="${Maindata.url}/sr${path}"/>
        </url>`).join('')}
        ${posts.map(post => `
        <url>
            <loc>${Maindata.url}/shibari${post.fields.link}</loc>
            <lastmod>${post.sys.updatedAt}</lastmod>
            <changefreq>monthly</changefreq>
            <priority>0.8</priority>
            <xhtml:link rel="alternate" hreflang="en" href="${Maindata.url}/shibari${post.fields.link}"/>
            <xhtml:link rel="alternate" hreflang="ru" href="${Maindata.url}/ru/shibari${post.fields.link}"/>
            <xhtml:link rel="alternate" hreflang="sr" href="${Maindata.url}/sr/shibari${post.fields.link}"/>
        </url>`).join('')}
        ${Object.entries(models).map(([name, lastmod]) => `
        <url>
            <loc>${Maindata.url}/model/${removeSpaces(name)}</loc>
            <lastmod>${lastmod}</lastmod>
            <changefreq>weekly</changefreq>
            <priority>0.6</priority>
            <xhtml:link rel="alternate" hreflang="en" href="${Maindata.url}/model/${removeSpaces(name)}"/>
            <xhtml:link rel="alternate" hreflang="ru" href="${Maindata.url}/ru/model/${removeSpaces(name)}"/>
            <xhtml:link rel="alternate" hreflang="sr" href="${Maindata.url}/sr/model/${removeSpaces(name)}"/>
        </url>`).join('')}
        ${Object.entries(photographers).map(([name, lastmod]) => `
        <url>
            <loc>${Maindata.url}/photographer/${removeSpaces(name)}</loc>
            <lastmod>${lastmod}</lastmod>
            <changefreq>weekly</changefreq>
            <priority>0.5</priority>
            <xhtml:link rel="alternate" hreflang="en" href="${Maindata.url}/photographer/${removeSpaces(name)}"/>
            <xhtml:link rel="alternate" hreflang="ru" href="${Maindata.url}/ru/photographer/${removeSpaces(name)}"/>
            <xhtml:link rel="alternate" hreflang="sr" href="${Maindata.url}/sr/photographer/${removeSpaces(name)}"/>
        </url>`).join('')}
        ${Object.entries(muahs).map(([name, lastmod]) => `
        <url>
            <loc>${Maindata.url}/muah/${removeSpaces(name)}</loc>
            <lastmod>${lastmod}</lastmod>
            <changefreq>weekly</changefreq>
            <priority>0.5</priority>
            <xhtml:link rel="alternate" hreflang="en" href="${Maindata.url}/muah/${removeSpaces(name)}"/>
            <xhtml:link rel="alternate" hreflang="ru" href="${Maindata.url}/ru/muah/${removeSpaces(name)}"/>
            <xhtml:link rel="alternate" hreflang="sr" href="${Maindata.url}/sr/muah/${removeSpaces(name)}"/>
        </url>`).join('')}
        ${Object.entries(tags).map(([tag, lastmod]) => `
        <url>
            <loc>${Maindata.url}/tag/${removeSpaces(tag)}</loc>
            <lastmod>${lastmod}</lastmod>
            <changefreq>weekly</changefreq>
            <priority>0.5</priority>
            <xhtml:link rel="alternate" hreflang="en" href="${Maindata.url}/tag/${removeSpaces(tag)}"/>
            <xhtml:link rel="alternate" hreflang="ru" href="${Maindata.url}/ru/tag/${removeSpaces(tag)}"/>
            <xhtml:link rel="alternate" hreflang="sr" href="${Maindata.url}/sr/tag/${removeSpaces(tag)}"/>
        </url>`).join('')}
    </urlset>`;
};

const SiteMap = () => {
    // getServerSideProps will do the heavy lifting
};

export async function getServerSideProps({ res }) {
    const request = await client.getEntries({
        content_type: 'post',
        order: '-fields.date',
        limit: 1000
    });
    const posts = request.items;

    const sitemap = generateSiteMap(posts);

    res.setHeader('Content-Type', 'text/xml');
    res.write(sitemap);
    res.end();

    return {
        props: {},
    };
}

export default SiteMap;