import React from "react"
import Sprite from '../svg-sprite'
import Header from "../header/header"
import Footer from '../footer/footer'
import { NsfwPopup } from "../nsfwPopup/nsfwPopup"

import '@fontsource/montserrat/400.css'
import '@fontsource/montserrat/500.css'
import '@fontsource/montserrat/900.css'
import * as classes from './layout.module.scss'

const Layout = (props) => {
    const {
        hero: isHero,
        pageNsfw,
        toggleNsfw,
        showNsfwPopup,
        setShowNsfwPopup,
        setNsfw,
        setToggle,
        isFooterAbsolute
    } = props

    return (
        <>
            <Sprite/>
            <Header pageNsfw={pageNsfw}
                    showNsfwPopup={showNsfwPopup}
                    setShowNsfwPopup={setShowNsfwPopup}
                    isFooterAbsolute={isFooterAbsolute}
                    toggleNsfw={toggleNsfw}/>
            <main className={isHero ? classes.mainHero : classes.main}>
                {props.children}
            </main>
            <Footer $isFooterAbsolute={isFooterAbsolute}/>
            <NsfwPopup showNsfwPopup={showNsfwPopup}
                       setNsfw={setNsfw}
                       setShowNsfwPopup={setShowNsfwPopup}
                       setToggle={setToggle}/>
        </>
    )
}

export default Layout