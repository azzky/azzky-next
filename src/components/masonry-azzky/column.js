import { GalleryItem } from "./item"

import * as classes from './column.module.scss'

export const GalleryColumn = ({
    column,
    index,
    settings,
    metaDescription,
    pageNsfw
}) => (
    <div key={index}
        className={classes.root}>
        {column.map((img, imgIndex) => (
            <GalleryItem
                img={img}
                imgIndex={imgIndex}
                index={index}
                metaDescription={metaDescription}
                settings={settings} key={imgIndex} pageNsfw={pageNsfw} />
            ))}
    </div>
)