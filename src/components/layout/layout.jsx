import { SpeedInsights } from '@vercel/speed-insights/next';
import { bool, func, object } from 'prop-types';

import Sprite from '../svg-sprite';
import Header from '../header/header';
import Footer from '../footer/footer';
import { NsfwPopup } from '../nsfwPopup/nsfwPopup';
import '@fontsource/montserrat/400.css';
import '@fontsource/montserrat/500.css';
import '@fontsource/montserrat/900.css';
import * as classes from './layout.module.scss';

const Layout = ({ hero: isHero, pageNsfw, toggleNsfw, showNsfwPopup, setShowNsfwPopup,
    setNsfw, setToggle, isFooterAbsolute, children }
) => (
    <>
        <Sprite/>
        <Header pageNsfw={pageNsfw}
            showNsfwPopup={showNsfwPopup}
            setShowNsfwPopup={setShowNsfwPopup}
            isFooterAbsolute={isFooterAbsolute}
            toggleNsfw={toggleNsfw}/>
        <main className={isHero ? classes.mainHero : classes.main}>
            {children}
        </main>
        <Footer $isFooterAbsolute={isFooterAbsolute}/>
        <SpeedInsights/>
        <NsfwPopup showNsfwPopup={showNsfwPopup}
            setNsfw={setNsfw}
            setShowNsfwPopup={setShowNsfwPopup}
            setToggle={setToggle}/>
    </>
);

export default Layout;

Layout.propTypes = {
    hero: bool,
    pageNsfw: bool,
    toggleNsfw: func,
    showNsfwPopup: bool,
    setShowNsfwPopup: func,
    setNsfw: func,
    setToggle: func,
    isFooterAbsolute: bool,
    children: object
};