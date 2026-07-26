import Head from 'next/head';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { FormattedMessage } from 'react-intl';

import Maindata from '@/constants';
import * as classes from './reviews.module.scss';

const richTextToPlain = (node) => {
    if (!node) return '';
    if (node.nodeType === 'text') return node.value ?? '';
    return (node.content ?? []).map(richTextToPlain).join(' ').replace(/\s+/g, ' ').trim();
};

const localeTags = {
    ru: 'ru-RU',
    sr: 'sr-RS',
    en: 'en-US'
};

const Reviews = ({ reviews, locale }) => {
    if (!reviews?.length) return null;
    const localeTag = localeTags[locale] || localeTags.en;

    const schemaReviews = reviews.map((review) => {
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

    const jsonLd = {
        '@context': 'https://schema.org',
        '@graph': schemaReviews
    };

    return (
        <>
            <Head>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
            </Head>
            <section className={classes.root}>
            <h2 className={classes.title}>
                <FormattedMessage id="homepage.reviewsTitle"/>
            </h2>
            <p className={classes.description}><FormattedMessage id="homepage.reviewsDescription"/></p>
            <ul className={classes.grid}>
                {reviews.map((review) => {
                    const { text, author, date } = review.fields;
                    return (
                        <li key={review.sys.id}
                            className={classes.item}>
                            <blockquote className={classes.text}>
                                {text && documentToReactComponents(text)}
                            </blockquote>
                            <footer className={classes.meta}>
                                {author && <cite className={classes.author}>{author}</cite>}
                                {/* {date && (
                                    <time dateTime={date}
                                        className={classes.date}>
                                        {new Intl.DateTimeFormat(localeTag, {
                                            year: 'numeric',
                                            month: 'long'
                                        }).format(new Date(date))}
                                    </time>
                                )} */}
                            </footer>
                        </li>
                    );
                })}
            </ul>
        </section>
        </>
    );
};

export default Reviews;
