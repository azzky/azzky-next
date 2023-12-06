import Image from 'next/image';
import { FormattedMessage } from 'react-intl';

import { client } from '@/lib/contentful';
import useCenzorship from '@/hooks/useCenzorship';
import { Layout } from '@/components';
import { PostsGallery } from '@/components/gallery/gallery';
import useWidth from '@/hooks/useWindowSize';
import * as classes from '@/components/layout/layout.module.scss';

const Model = ({ posts, locale, tag }) => {
    const { pageNsfw, toggleNsfw, showNsfwPopup, setShowNsfwPopup, setNsfw, setToggle } = useCenzorship();
    const { isVertical } = useWidth();

    if (!posts) return null;
    const wallpaperImg = posts[0].fields.wallpaper || posts[0].fields.mobileWallpaper ? 
        isVertical ? posts[0].fields.mobileWallpaper.fields : posts[0].fields.wallpaper.fields :
        posts[0].fields.preview.fields;
    const wrapperClass = posts[0].fields.isWallNsfw && !pageNsfw ?
        (isVertical ? classes.heroWrapperNsfwV : classes.heroWrapperNsfw) :
        classes.heroWrapper;

    const heroImageProps = !posts[0].fields.isWallNsfw || (posts[0].fields.isWallNsfw && pageNsfw) ? {
        fill: true
    } : {
        width: 15,
        height: 15
    };

    return (
        <Layout hero
            dark
            pageNsfw={pageNsfw}
            showNsfwPopup={showNsfwPopup}
            setShowNsfwPopup={setShowNsfwPopup}
            setNsfw={setNsfw}
            setToggle={setToggle}
            toggleNsfw={toggleNsfw}
        >
            <section className={wrapperClass}>
                <div className={classes.heroContent}>
                    <h1 className={classes.heroTitle}>
                        <FormattedMessage id="tag.title"
                            values={{ tag: tag }}/>
                    </h1>
                </div>
                <Image src={wallpaperImg.file.url}
                    alt={posts[0].fields.title}
                    className="heroImage"
                    {...heroImageProps}
                />
            </section>
            <PostsGallery pageNsfw={pageNsfw}
                edges={posts}
                lang={locale}
                $isPost/>
        </Layout>
    );
};

export default Model;

export const getStaticProps = async ({ params, locale }) => {
    const { slug } = params;
    const lang = locale === 'ru' ? 'ru' : 'en-US';
    const res = await client.getEntries({
        content_type: 'post',
        order: '-fields.date',
        'fields.tags': slug.replaceAll('_', ' '),
        locale: lang
    });

    return {
        props: {
            posts: res?.items,
            tag: slug.replaceAll('_', ' '),
            locale,
            revalidate: 60
        }
    };
};

export const getStaticPaths = async () => {
    const res = await client.getEntries({
        content_type: 'post'
    });
    let tags = [];
    res.items.map(node => {
        if (node.fields.tags) {
            tags = [...tags, ...node.fields.tags];
        }
    });
    const uniqueTags = [...new Set(tags)];
    const paths = uniqueTags.map(item => ({
        params: { slug: item }
    }));

    return {
        paths,
        fallback: true
    };
};