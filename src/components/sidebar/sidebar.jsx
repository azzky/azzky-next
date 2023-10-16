import React from 'react'
import Maindata from '@/constants'
import config from './config'

import * as classes from './sidebar.module.scss'

const Sidebar = (props) => {
    const { $isBig } = props
    const iconSize = $isBig ? 48 : 24
    const socialArray = config.socialArray

    return (
        <div className={$isBig ? classes.rootBig : classes.root}>
            {socialArray.map((item)=>(
                <a key={item}
                href={Maindata.socials[item]}
                rel="me noreferrer"
                target="_blank"
                aria-label={`${item} link`}>
                    <svg width={iconSize}
                        height={iconSize}>
                        <use href={`#${item}`}/>
                    </svg>
                </a>
            ))}
        </div>
    )
}

export { Sidebar }
