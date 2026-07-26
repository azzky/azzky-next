import Head from 'next/head';
import { FormattedMessage, useIntl } from 'react-intl';

import { client } from '@/lib/contentful';
import useCenzorship from '@/hooks/useCenzorship';
import { Layout } from '@/components';
import { PostsGallery } from '@/components/gallery/gallery';
import MainSchema from '@/components/meta/meta';
import { metaPreviewSetting } from '@/constants';
import * as classes from '@/styles/works.module.scss';

const Works = ({ posts, locale }) => {
    const intl = useIntl();
    const { pageNsfw, toggleNsfw, showNsfwPopup, setShowNsfwPopup, setNsfw, setToggle } = useCenzorship();

    return (
        <>
            <Head>
                <meta property="og:title" content={intl.formatMessage({ id: 'works.seoTitle' })}/>
                <meta property="og:description" content={intl.formatMessage({ id: 'works.seoDescription' })}/>
            </Head>
            <MainSchema
                locale={locale}
                edges={posts}
                data={{
                    title: intl.formatMessage({ id: 'works.seoTitle' }),
                    metadescription: intl.formatMessage({ id: 'works.seoDescription' }),
                    breadCrumbTitle: intl.formatMessage({ id: 'works.h1' }),
                    thumbnail: posts?.[0]?.fields?.preview?.fields?.file?.url + metaPreviewSetting
                }}
            />
            <Layout
                pageNsfw={pageNsfw}
                showNsfwPopup={showNsfwPopup}
                setShowNsfwPopup={setShowNsfwPopup}
                setNsfw={setNsfw}
                setToggle={setToggle}
                toggleNsfw={toggleNsfw}
            >
                <header className={classes.header}>
                    <h1 className={classes.title}>
                        <FormattedMessage id="works.h1"/>
                    </h1>
                    <p className={classes.description}>
                        <FormattedMessage id="works.description"/>
                    </p>
                </header>
                <PostsGallery pageNsfw={pageNsfw}
                    edges={posts}
                    lang={locale}
                />
            </Layout>
        </>
    );
};

export default Works;

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
