import React from "react"

import * as classes from './settings.module.scss'

const Settings = (props) => {
    const {
        toggleSettings,
        showSettings,
        isFooterAbsolute,
        children
    } = props
    return (
        <section className={classes.root}>
            <button type="button"
                     aria-label="setings button"
                     className={showSettings ? classes.triggerActive : classes.trigger}
                     onClick={() => toggleSettings((prev) => !prev)}>
                <svg width="24" height="24">
                    <use href="#settings"/>
                </svg>
            </button>
            <div className={showSettings ? classes.settingsActive : isFooterAbsolute ? classes.settingsLifted : classes.settings}>
                {children}
            </div>
        </section>
    )
}

export default Settings