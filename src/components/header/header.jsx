import React, {useCallback, useState} from "react"
import { FormattedMessage } from "react-intl"
import Logo from './Logo'
import Navigation from './Navigation'
import Settings from "./Settings"
import NsfwSwitcher from "../toggler/toggler"
import { Sidebar } from "../sidebar/sidebar"
import { switchLabels } from '@/constants'
import { menuItems } from '@/constants'
import Link from 'next/link'
import LangSwitcher from "../lang-switcher"

import * as classes from './header.module.scss'

const Header = (props) => {
    const {
        pageNsfw,
        toggleNsfw,
        isFooterAbsolute
    } = props

    const [showMenu, toggleMenu] = useState(false)
    const [showSettings, toggleSettings] = useState(false)
    const clickHandler = useCallback(() => {
        if(document?.body) document.body.style.overflow = !showSettings ? 'hidden' : 'auto'; // TODO check
        toggleSettings(prev => !prev)
    }, [showSettings])

    const menuClickHandler = e => {
        e.preventDefault();
        if(document?.body) document.body.style.removeProperty('overflow');
        navigate(e.currentTarget.href);
    }

    return(
    <header className={showMenu || showSettings ? classes.activeRoot : classes.root}>
        <Logo/>
        <Navigation $active={showMenu}
                    toggleMenu={toggleMenu} />
        <Settings showSettings={showSettings}
                  toggleSettings={clickHandler}
                  isFooterAbsolute={isFooterAbsolute}>
            <ul className={classes.mobileMenuItems}>
            {menuItems.map((el, i) => {
                return (
                <li key={i}
                            role="none">
                    <Link href={el.link}
                            onClick={menuClickHandler}
                            role="menuitem">
                        <FormattedMessage id={el.name}/>
                    </Link>
                </li>
            )})}
            </ul>
            <hr />
            <LangSwitcher/>
            <hr />
            <Sidebar />
            <hr />
            <NsfwSwitcher $state={pageNsfw}
                        changeState={toggleNsfw}
                        onStateLabel={switchLabels.on}
                        offStateLabel={switchLabels.off} />
            <hr />
        </Settings>
    </header>
)}

export default Header