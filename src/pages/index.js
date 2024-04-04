import Link from 'next/link';
import { injectIntl, FormattedMessage } from 'react-intl';
import { LazyLoadComponent } from 'react-lazy-load-image-component';
import Slider from 'react-slick';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

import { client } from '@/lib/contentful';
import { Layout } from '@/components';
import { useVideo } from '@/hooks/useVideo';
import useCenzorship from '@/hooks/useCenzorship';
// import { PostsGallery } from '@/components';
import config from '@/components/meta/config';
import MainSchema from '@/components/meta/meta';
import * as classes from '@/components/layout/layout.module.scss';

const Home = ({ posts, locale, intl, feedback }) => {
    const { pageNsfw, toggleNsfw, showNsfwPopup, setShowNsfwPopup, setNsfw, setToggle } = useCenzorship();
    const { renderVideo } = useVideo();

    console.log(feedback);

    const settings = {
        arrows: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    return (
        <>
            <MainSchema isHome
                locale={locale}
                edges={posts}
                data={{
                    title: intl.formatMessage({ id: 'homepage.seoTitle' }),
                    metadescription: intl.formatMessage({ id: 'homepage.seoDescription' })
                }}
            />
            <Layout
                toggler
                hero
                dark
                heroType="video"
                pageNsfw={pageNsfw}
                showNsfwPopup={showNsfwPopup}
                setShowNsfwPopup={setShowNsfwPopup}
                setNsfw={setNsfw}
                setToggle={setToggle}
                toggleNsfw={toggleNsfw}
            >
                <section className={classes.heroWrapper}>
                    <div className={classes.heroContent}>
                        <h1 className={classes.heroTitle}>
                            <FormattedMessage id="homepage.h1"/>
                        </h1>
                        <div className={classes.heroDescription}>
                            <p>
                                <FormattedMessage id="homepage.description"
                                    values={{ link: (
                                        <Link href="/contact">
                                            <FormattedMessage id="homepage.ctaButton"/>
                                        </Link>
                                    ) }}
                                />
                            </p>
                        </div>
                    </div>
                    <div className={classes.heroVideoRoot}>
                        <LazyLoadComponent>
                            <video autoPlay
                                loop
                                className={classes.heroVideo}
                                muted
                                playsInline
                                id="background-video"
                                poster={config.videoThumb}
                            >
                                {renderVideo && config.videoFormats.map(format => {
                                    return (
                                        <source src={`/${config.videoFileName}.${format}`}
                                            type={`video/${format}`}
                                            key={format}
                                        />
                                    );
                                })}
                            </video>
                        </LazyLoadComponent>
                    </div>
                </section>
                <Slider {...settings}>
                    {feedback.map((el, i) => {
                        return (
                            <div key={el.fields.name + i}>
                                {documentToReactComponents(el.fields.text)}
                            </div>
                        );
                    })}
                </Slider>
                {/* <PostsGallery pageNsfw={pageNsfw}
                    edges={posts}
                    lang={locale}
                /> */}
            </Layout>
        </>
    );
};

export default injectIntl(Home);

export const getStaticProps = async ({ locale }) => {
    const res = await client.getEntries({
        content_type: 'post',
        order: '-fields.date',
        locale: locale === 'ru' ? 'ru' : 'en-US'
    });

    const feedback = await client.getEntries({
        content_type: 'feedback',
        order: '-fields.date',
        // locale: locale === 'ru' ? 'ru' : 'en-US'
    });

    return {
        props: {
            posts: res.items,
            feedback: feedback.items,
            revalidate: 70,
            locale
        }
    };
};