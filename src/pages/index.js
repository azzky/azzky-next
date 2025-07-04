import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { injectIntl, FormattedMessage } from 'react-intl';
import { LazyLoadComponent } from 'react-lazy-load-image-component';
import Head from 'next/head';

import { client } from '@/lib/contentful';
import { Layout } from '@/components';
import { useVideo } from '@/hooks/useVideo';
import useCenzorship from '@/hooks/useCenzorship';
import { PostsGallery } from '@/components';
import config from '@/components/meta/config';
import MainSchema from '@/components/meta/meta';
import * as classes from '@/components/layout/layout.module.scss';

const Home = ({ posts, locale, intl }) => {
    const { pageNsfw, toggleNsfw, showNsfwPopup, setShowNsfwPopup, setNsfw, setToggle } = useCenzorship();
    const { renderVideo, setRenderVideo } = useVideo();
    const [isMounted, setIsMounted] = useState(false);
    
    useEffect(() => {
        // Mark component as mounted
        setIsMounted(true);
        
        const timer = setTimeout(() => {
            setRenderVideo(true);
        }, 1000);
        
        return () => clearTimeout(timer);
    }, [setRenderVideo]);

    return (
        <>
            <Head>
                <link
                    rel="preload"
                    as="image"
                    href={config.videoThumb}
                    type="image/webp"
                    fetchPriority="high"
                />
            </Head>
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
                                fetchPriority="high"
                                poster={config.videoThumb}
                            >
                                {isMounted && renderVideo && config.videoFormats.map(format => {
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
                    {isMounted && !renderVideo && (
                        <button className={classes.videoTrigger}
                            onClick={() => setRenderVideo(true)}>
                            <span className="visually-hidden">
                                <FormattedMessage id="homepage.playVideo"/>
                            </span>
                            <svg width="50" height="50">
                                <use href="#play"/>
                            </svg>
                        </button>
                    )}
                </section>
                <PostsGallery pageNsfw={pageNsfw}
                    edges={posts}
                    lang={locale}
                />
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

    return {
        props: {
            posts: res.items,
            revalidate: 70,
            locale
        }
    };
};