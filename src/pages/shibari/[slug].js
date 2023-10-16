import { useState } from "react";
import { client } from "@/lib/contentful";
import useCenzorship from '@/hooks/useCenzorship'
import { Layout } from '@/components'
import {PostGallery} from '@/components/gallery/gallery'
// import MainSchema from '@/components/meta/meta'
import Share from '@/components/share/share'
import Tags from '@/components/tags'
import Team from '@/components/team/team'
import { Modal, ModalButton } from '@/components/modal/modal'
import checkPopupWidth from '@/hooks/usePopupWidth'
import prepareContent from '@/hooks/useHtmlContent'
import RelatedPosts from '@/components/related-posts/related'
import useWidth from '@/hooks/useWindowSize'
import Image from "next/image";

import * as classes from '@/components/layout/layout.module.scss'

const Post = ({ post, locale }) => {
    const { pageNsfw, toggleNsfw, showNsfwPopup, setShowNsfwPopup, setNsfw, setToggle } = useCenzorship()
    const [isShowModal, showModal] = useState(false)
    const {isVertical} = useWidth()

    if (!post) return null;
    const {
        content,
        wallpaper,
        mobileWallpaper,
        popupRatio,
        preview,
        popup,
        isWallNsfw,
        title,
        model,
        nawashi,
        photographer,
        muah,
        tags,
        nsfw,
        nsfwarr,
        gallery,
        metadescription
    } = post;

    let readyData,
        paddingTopValue,
        popupSize,
        popupRatioLocal

    if(popup) {
        const rawData = popup
        const a = JSON.stringify(rawData)
        readyData = JSON.parse(a).content[0].content[0].value

        popupRatioLocal = popupRatio ? {
            h: popupRatio.split('/')[0],
            w: popupRatio.split('/')[1]
        } : 0

        popupSize = checkPopupWidth(popupRatioLocal)

        paddingTopValue = popupRatio && popupSize?.maximumHeight ? popupSize.maximumHeight : 0
    }

    const textData = content ? prepareContent(content) : null

    const wallpaperImg = wallpaper || mobileWallpaper ? 
        isVertical ? mobileWallpaper.fields : wallpaper.fields :
        preview.fields

    const wrapperClass = isWallNsfw && !pageNsfw ?
        (isVertical? classes.heroWrapperNsfwV : classes.heroWrapperNsfw) :
        classes.heroWrapper

    const heroImageProps = !isWallNsfw || (isWallNsfw && pageNsfw) ? {
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
                toggleNsfw={toggleNsfw}>
            <section className={wrapperClass}>
                <div className={classes.heroContentPost}>
                    <div>
                        <h1 className={classes.heroTitle}>{title}</h1>
                        {content && (
                            <div className={classes.heroDescription}>
                                <p>
                                    <span dangerouslySetInnerHTML={{ __html: textData }}/>
                                    {popup && <ModalButton showModal={showModal} node_locale={locale} />}
                                </p>
                            </div>
                        )}
                    </div>
                    <Team models={model}
                            nawashi={nawashi}
                            photographer={photographer?.fields}
                            muah={muah?.fields}
                            lang={locale} />
                    <Share preview={preview?.file?.url}
                            title={title + ' shibari by Azzky'}
                            lang={locale}/>
                </div>
                <Image src={wallpaperImg.file.url}
                    alt={title}
                    className="heroImage"
                    {...heroImageProps}
                />
            </section>
            <Tags tags={tags}
                lang={locale}/>
            <PostGallery pageNsfw={pageNsfw}
                        nsfw={nsfw}
                        title={title}
                        gallery={gallery}
                        metaDescription={metadescription}
                        nsfwarr={nsfwarr} />
            {popup && (
                <Modal isShowModal={isShowModal}
                        showModal={showModal}
                        paddingTopValue={paddingTopValue?.toFixed(0) || 0}
                        size={popupSize?.popupWidth?.toFixed(0) || 0}
                        pageNsfw={pageNsfw} >
                    {isShowModal && <div dangerouslySetInnerHTML={{ __html: readyData }}/>}
                </Modal>
            )}
            {/* {(prev || next) &&
                <RelatedPosts next={next}
                              prev={prev}
                              pageNsfw={pageNsfw}
                              lang={lang} />
            } */}
        </Layout>
    );
};

export default Post;

export const getStaticProps = async ({ params, locale }) => {
    const { slug } = params;
    const lang = locale === 'ru' ? 'ru' : 'en-US'
    const res = await client.getEntries({
        content_type: 'post',
        'fields.link': '/'+slug,
        locale: lang
    });

    return {
        props: {
            post: res?.items?.[0]?.fields || {},
            locale,
            revalidate: 60
        }
    };
};

export const getStaticPaths = async () => {
    const res = await client.getEntries({ content_type: 'post' });
    const paths = res.items.map(item => ({
        params: { slug: item.fields.link }
    }));

    return {
        paths,
        fallback: true
    }
}