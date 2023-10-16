import React from "react"
import Link from 'next/link'
import { SfwOrNsfwImage } from "@/components"
import { FormattedMessage } from "react-intl"

import * as classes from './related.module.scss'

const RelatedPost = (props) => {
    const {
        post: {
            title,
            link,
            isPrevNsfw,
            image
        },
        pageNsfw,
        lang
    } = props
    const isVertical = image.height > image.width
    const imageClass = (isPrevNsfw && !pageNsfw) ?
        isVertical ? classes.imageNsfwV : classes.imageNsfw : ''
    const separator = lang === 'ru' ? '/ru' : ''

    return (
        <div className={imageClass}>
            <Link href={`${separator}/shibari${link}`}>
                <SfwOrNsfwImage pageNsfw={pageNsfw}
                    img={{data: image, nsfw: isPrevNsfw && !pageNsfw, title: title}}/>
            </Link>
        </div>
    )
}

const RelatedPosts = ({
    prev,
    next,
    pageNsfw,
    lang
}) => {
    return (
        <>
            <h2 className={classes.title}>
                <FormattedMessage id="related.title"/>
            </h2>
            <div className={classes.root}>
                {prev && <RelatedPost post={prev}
                                      pageNsfw={pageNsfw}
                                      lang={lang} />}
                {next && <RelatedPost post={next}
                                      pageNsfw={pageNsfw}
                                      lang={lang} />}
            </div>
        </>
    )
}

export default RelatedPosts