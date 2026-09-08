import Head from 'next/head';
import { useIntl, FormattedMessage } from 'react-intl';

import Layout from '@/components/layout/layout';
import MainSchema from '@/components/meta/meta';
import ReviewCard from '@/components/reviews/reviewCard';
import ReviewForm from '@/components/reviews/reviewForm';
import { buildReviewsJsonLd } from '@/components/reviews/schema';
import useCenzorship from '@/hooks/useCenzorship';
import { client } from '@/lib/contentful';
import * as classes from '@/components/reviews/reviews.module.scss';

const ReviewsPage = ({ reviews, locale }) => {
    const intl = useIntl();
    const { pageNsfw, toggleNsfw, showNsfwPopup, setShowNsfwPopup, setNsfw, setToggle } = useCenzorship();
    const hasReviews = reviews?.length > 0;
    const jsonLd = buildReviewsJsonLd(reviews);

    return (
        <Layout
            pageNsfw={pageNsfw}
            showNsfwPopup={showNsfwPopup}
            setShowNsfwPopup={setShowNsfwPopup}
            setNsfw={setNsfw}
            setToggle={setToggle}
            toggleNsfw={toggleNsfw}
        >
            <MainSchema data={{
                title: intl.formatMessage({ id: 'reviewspage.seoTitle' }),
                metadescription: intl.formatMessage({ id: 'reviewspage.seoDescription' })
            }}
            locale={locale}
            isPage/>
            {hasReviews && (
                <Head>
                    <script
                        type="application/ld+json"
                        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                    />
                </Head>
            )}
            <section className={classes.root}>
                <h1 className={classes.title}>
                    <FormattedMessage id="reviewspage.h1"/>
                </h1>
                <p className={classes.description}><FormattedMessage id="reviewspage.description"/></p>
                <ReviewForm/>
                {hasReviews ? (
                    <ul className={classes.pageGrid}>
                        {reviews.map((review) => (
                            <ReviewCard key={review.sys.id}
                                review={review}/>
                        ))}
                    </ul>
                ) : (
                    <p className={classes.empty}><FormattedMessage id="reviewspage.empty"/></p>
                )}
            </section>
        </Layout>
    );
};

export default ReviewsPage;

export const getStaticProps = async ({ locale }) => {
    const contentfulLocale = locale === 'ru' ? 'ru' : 'en-US';

    let reviews = [];
    try {
        const res = await client.getEntries({
            content_type: 'feedback',
            order: '-fields.date',
            limit: 200,
            locale: contentfulLocale
        });
        reviews = res.items;
    } catch {
        reviews = [];
    }

    return {
        props: {
            reviews,
            revalidate: 70,
            locale
        }
    };
};
