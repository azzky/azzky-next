import Maindata from '@/constants';

const richTextToPlain = (node) => {
    if (!node) return '';
    if (node.nodeType === 'text') return node.value ?? '';
    return (node.content ?? []).map(richTextToPlain).join(' ').replace(/\s+/g, ' ').trim();
};

export const buildReviewsJsonLd = (reviews) => {
    const schemaReviews = (reviews || []).map((review) => {
        const { text, author, date } = review.fields;
        return {
            '@type': 'Review',
            'reviewBody': richTextToPlain(text),
            ...(author && { 'author': { '@type': 'Person', 'name': author } }),
            ...(date && { 'datePublished': date }),
            'itemReviewed': {
                '@type': 'LocalBusiness',
                '@id': Maindata.url + '/#organization',
                'name': Maindata.author,
                'url': Maindata.url
            }
        };
    });

    return {
        '@context': 'https://schema.org',
        '@graph': schemaReviews
    };
};
