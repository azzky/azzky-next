import Maindata from "@/constants";
import { client } from '@/lib/contentful';

const generateSiteMap = (posts) => `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        <!--We manually set the URLs we know already-->
        <url>
            <loc>${Maindata.url}</loc>
        </url>
        ${posts.map(post => `
            <url>
                <loc>${`${Maindata.url}/shibari${post.fields.link}`}</loc>
                <lastmod>2023-09-16T00:00:00.000Z${post.sys.updatedAt}</lastmod>
                <changefreq>daily</changefreq>
                <priority>0.7</priority>
            </url>
            <url>
                <loc>${`${Maindata.url}/ru/shibari${post.fields.link}`}</loc>
                <lastmod>2023-09-16T00:00:00.000Z${post.sys.updatedAt}</lastmod>
                <changefreq>daily</changefreq>
                <priority>0.7</priority>
            </url>
        `).join('')
        }
    </urlset>
`;

const SiteMap = () => {
  // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({ res }) {
    // We make an API call to gather the URLs for our site
    const request = await client.getEntries({
        content_type: 'post',
        order: '-fields.date'
    });
    const posts = request.items;

    // We generate the XML sitemap with the posts data
    const sitemap = generateSiteMap(posts);

    res.setHeader('Content-Type', 'text/xml');
    // we send the XML to the browser
    res.write(sitemap);
    res.end();

    return {
        props: {},
    };
}

export default SiteMap;