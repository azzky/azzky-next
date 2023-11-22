import { client } from "@/lib/contentful";
import useCenzorship from '@/hooks/useCenzorship'
import { Layout } from '@/components'
import {PostsGallery} from '@/components/gallery/gallery'
import useWidth from '@/hooks/useWindowSize'
import Image from "next/image";
import { FormattedMessage } from 'react-intl'
import SocialLink from "@/components/socialIcon/socialIcon"

import * as classes from '@/components/layout/layout.module.scss'

const Model = ({ posts, locale, slug, link }) => {
    const { pageNsfw, toggleNsfw, showNsfwPopup, setShowNsfwPopup, setNsfw, setToggle } = useCenzorship()
    const {isVertical} = useWidth()

    if (!posts?.length > 0) return null

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
        <>
        <Layout hero
                dark
                pageNsfw={pageNsfw}
                showNsfwPopup={showNsfwPopup}
                setShowNsfwPopup={setShowNsfwPopup}
                setNsfw={setNsfw}
                setToggle={setToggle}
                toggleNsfw={toggleNsfw}>
             <section className={wrapperClass}>
                <div className={classes.heroContent}>
                    <h1 className={classes.heroTitle}>
                        <FormattedMessage id="model.title"
                            values={{model: slug.replaceAll('_', ' ')}}/>
                        {link && <SocialLink link={link}/>}
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
        </>
    );
};

export default Model;

export const getStaticProps = async ({ params, locale }) => {
    const { slug } = params;    
    const res = await client.getEntries({
        content_type: 'post',
        order: '-fields.date'
    });
    let modelLink = null;
    const filteredPosts = res.items && res.items.filter(p => {
        const models = p.fields.model?.length > 0 && p.fields.model.filter(m=>m.fields.name === slug.replaceAll('_', ' '));
        if (models.length > 0) modelLink = models[0]?.fields?.url;
        return models.length > 0
    });

    return {
        props: {
            posts: filteredPosts || [],
            locale,
            slug,
            link: modelLink || null,
            revalidate: 60
        }
    };
};

export const getStaticPaths = async () => {
    const res = await client.getEntries({
        content_type: 'post'
    });
    const models = {}
    res.items.map(node => {
        node.fields.model && node.fields.model.map(model => {
            if(model?.fields?.name && !models[model.fields.name]) {
                models[model.fields.name] = model.fields.url || ''
            }
        })
    })
    const paths = Object.keys(models).map(item => ({
        params: { slug: item }
    }));

    return {
        paths,
        fallback: true
    }
}