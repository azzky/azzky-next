import React from "react"
import { useRouter } from 'next/router'
import {
    FacebookShareButton,
    PinterestShareButton,
    RedditShareButton,
    TelegramShareButton,
    TwitterShareButton,
    VKShareButton
} from "react-share"
import config from "./config"

import * as classes from './share.module.scss'

const Share = (props) => {
    const router = useRouter()
    const { pathname } = router
    const { title, preview: image, lang } = props
    const size = config.iconSize

    return(
        <div className={classes.root}>
            <p>{config.title[lang]}</p>
            <FacebookShareButton quote={title}
                                 url={pathname}>
                <svg width={size}
                     height={size}>
                    <use href="#facebook"/>
                </svg>
            </FacebookShareButton>
            <PinterestShareButton description={config.pinterestText[lang]}
                                  media={image}
                                  url={pathname}>
                <svg width={size}
                     height={size}>
                    <use href="#pinterest"/>
                </svg>
            </PinterestShareButton>
            <RedditShareButton title={title}
                                url={pathname}>
                <svg width={size}
                     height={size}>
                    <use href="#reddit"/>
                </svg>
            </RedditShareButton>
            <TelegramShareButton title={title}
                                 url={pathname}>
                <svg width={size}
                     height={size}>
                    <use href="#telegram"/>
                </svg>
            </TelegramShareButton>
            <TwitterShareButton title={title}
                                related={config.related}
                                hashtags={['shibari', 'bondage']}
                                url={pathname}>
                <svg width={size}
                     height={size}>
                    <use href="#twitter"/>
                </svg>
            </TwitterShareButton>
            <VKShareButton title={title}
                           image={image}
                           url={pathname}
                           noParse>
                <svg width={size}
                     height={size}>
                    <use href="#vk"/>
                </svg>
            </VKShareButton>
        </div>
    )
}

export default Share