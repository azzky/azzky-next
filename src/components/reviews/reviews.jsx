import Head from 'next/head';
import Link from 'next/link';
import { FormattedMessage } from 'react-intl';

import ReviewCard from './reviewCard';
import { buildReviewsJsonLd } from './schema';
import * as classes from './reviews.module.scss';

const Reviews = ({ reviews }) => {
    const hasReviews = reviews?.length > 0;
    const jsonLd = buildReviewsJsonLd(reviews);

    return (
        <>
            {hasReviews && (
                <Head>
                    <script
                        type="application/ld+json"
                        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                    />
                </Head>
            )}
            <section className={classes.root}>
                <h2 className={classes.title}>
                    <FormattedMessage id="homepage.reviewsTitle"/>
                </h2>
                <p className={classes.description}><FormattedMessage id="homepage.reviewsDescription"/></p>
                {hasReviews && (
                    <ul className={classes.grid}>
                        {reviews.map((review) => (
                            <ReviewCard key={review.sys.id}
                                review={review}/>
                        ))}
                    </ul>
                )}
                <div className={classes.links}>
                    <Link href="/reviews"
                        className={classes.link}>
                        <FormattedMessage id="reviews.viewAllLink"/>
                    </Link>
                    <span className={classes.linksSeparator}
                        aria-hidden="true">|</span>
                    <Link href="/reviews?review=1"
                        className={classes.link}>
                        <FormattedMessage id="reviews.leaveButton"/>
                    </Link>
                </div>
            </section>
        </>
    );
};

export default Reviews;
