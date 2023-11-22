import Link from 'next/link'
import config from "./config"
import { SfwOrNsfwImage } from "./image"

import * as classes from './item.module.scss'

export const GalleryItem = ({
    img,
    imgIndex,
    index,
    settings,
    metaDescription,
    pageNsfw
}) => {
    const isVertical = img.data.details.image.height > img.data.details.image.width
    const className = img.nsfw && !pageNsfw ?
        isVertical ? classes.vertical : classes.nsfw :
        classes.root
    return (
    settings.useLinks ?
        <figure itemScope
              itemType="http://schema.org/ImageObject"
            className={`${classes.hover} ${className}`}
            >
            <figcaption itemProp="name">
                <Link href={img.url}
                      className={classes.opener}
                      title={!img.nsfw || pageNsfw ? null : config.nsfwText}
                      aria-label={`link to post ${img.title}`}>
                    <span className="visually-hidden">
                        {img.title}
                    </span>
                </Link>
            </figcaption>
            <SfwOrNsfwImage img={img}
                            pageNsfw={pageNsfw}/>
        </figure>
        :
        <figure itemScope
              itemType="http://schema.org/ImageObject"
              className={className}
              >
            <figcaption itemProp="name"
                        className="visually-hidden">
                {metaDescription || `${img.title} ${config.galleryImageMiddleText} ${img.number}`}
            </figcaption>
            <SfwOrNsfwImage img={img}
                            pageNsfw={pageNsfw}/>
            <button className={classes.opener}
                    title={!img.nsfw || pageNsfw ? null : config.nsfwText}
                    onClick={() =>
                        settings.useLightBox &&
                        settings.lightBoxDispatch({
                            type: "photoIndex_Open",
                            photoIndex:
                                imgIndex === 0
                                    ? index
                                    : index + imgIndex * settings.columnNumber,
                    })}>
                <span className="visually-hidden">
                    {config.imageOpenText}
                </span>
            </button>
        </figure>
    )
}