import { client } from "@/lib/contentful";
import useCenzorship from '@/hooks/useCenzorship'
import { Layout } from '@/components'
import {PostsGallery} from '@/components/gallery/gallery'
import useWidth from '@/hooks/useWindowSize'
import Image from "next/image";
import { FormattedMessage } from 'react-intl'
import SocialLink from "@/components/socialIcon/socialIcon"

import * as classes from '@/components/layout/layout.module.scss'

const Muah = ({ posts, locale }) => {
    const { pageNsfw, toggleNsfw, showNsfwPopup, setShowNsfwPopup, setNsfw, setToggle } = useCenzorship()
    const {isVertical} = useWidth()

    if (!posts) return null
    const wallpaperImg = posts[0].fields.wallpaper || posts[0].fields.mobileWallpaper ? 
        isVertical ? posts[0].fields.mobileWallpaper.fields : posts[0].fields.wallpaper.fields :
        posts[0].fields.preview.fields
    const wrapperClass = posts[0].fields.isWallNsfw && !pageNsfw ?
        (isVertical? classes.heroWrapperNsfwV : classes.heroWrapperNsfw) :
        classes.heroWrapper

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
                        <FormattedMessage id="muah.title"
                            values={{muah: posts[0].fields.muah.fields.name}}/>
                        <SocialLink link={posts[0].fields.muah.fields.url}/>
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
                        $isPost />
        </Layout>
    );
};

export default Muah;

export const getStaticProps = async ({ params, locale }) => {
    const { slug } = params;
    console.log(slug.replaceAll('_', ' '));
    const lang = locale === 'ru' ? 'ru' : 'en-US'
    const res = await client.getEntries({
        content_type: 'post',
        // order: '-fields.date',
        'fields.muah.sys.contentType.sys.id': 'model',
        "fields.muah.fields.name": slug.replaceAll('_', ' '),
        // locale: lang
    });

    return {
        props: {
            posts: res?.items,
            locale,
            revalidate: 60
        }
    };
};

export const getStaticPaths = async () => {
    const res = await client.getEntries({
        content_type: 'post'
    });
    const muahs = {}
    res.items.map(node => {
        if(node.fields.muah?.fields?.name && !muahs[node.fields.muah.fields.name]) {
            muahs[node.fields.muah.fields.name] = node.fields.muah.fields.url || ''
        }
    })
    const paths = Object.keys(muahs).map(item => ({
        params: { slug: item }
    }));

    return {
        paths,
        fallback: true
    }
}