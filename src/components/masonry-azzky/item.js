import Link from 'next/link';
import { Item } from 'react-photoswipe-gallery';

import config from './config';
import { SfwOrNsfwImage } from './image';
import * as classes from './item.module.scss';

export const GalleryItem = ({
    img,
    settings,
    metaDescription,
    pageNsfw
}) => {
    const isVertical = img.data.details.image.height > img.data.details.image.width;
    const className = img.nsfw && !pageNsfw ?
        isVertical ? classes.vertical : classes.nsfw :
        classes.root;
    return (
        settings.useLinks ? (
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
        ) : (
            <figure itemScope
                itemType="http://schema.org/ImageObject"
                className={className}
            >
                <figcaption itemProp="name"
                    className="visually-hidden">
                    {metaDescription || `${img.title} ${config.galleryImageMiddleText} ${img.number}`}
                </figcaption>
                <Item
                    original={img.full}
                    thumbnail={img.data.url + '?w=400&h=400&q=95&fm=webp'}
                    width={img.data.details.image.width}
                    height={img.data.details.image.height}
                >
                    {({ ref, open }) => (
                        <>
                            <SfwOrNsfwImage img={img}
                                pageNsfw={pageNsfw}
                            />
                            <button className={classes.opener}
                                ref={ref}
                                title={!img.nsfw || pageNsfw ? null : config.nsfwText}
                                onClick={open}>
                                <span className="visually-hidden">
                                    {config.imageOpenText}
                                </span>
                            </button>
                        </>
                    )}
                </Item>
                
            </figure>
        )
    );
};