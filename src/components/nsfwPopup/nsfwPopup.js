import React from "react"
import { useNsfwPopup } from "./useNsfwPopup"
import { FormattedMessage } from "react-intl"

import * as classes from './nsfwPopup.module.scss'

export const NsfwPopup = (props) => {
    const { showNsfwPopup, setShowNsfwPopup, setNsfw, setToggle } = props
    const {
        handleclose, handleconfirm
    } = useNsfwPopup({
        setShowNsfwPopup, setNsfw, setToggle
    })

    return showNsfwPopup ? (
        <div className={classes.root}>
            <div className={classes.content}>
                <p>
                    <FormattedMessage id="nwfwPopup.message"/>
                </p>
                <div className={classes.buttons}>
                    <button onClick={handleconfirm}
                            className={classes.primaryButton}>
                        <FormattedMessage id="nwfwPopup.proceed"/>
                    </button>
                    <button onClick={handleclose}
                        className={classes.button}>
                        <FormattedMessage id="nwfwPopup.cancel"/>
                    </button>
                </div>
            </div>
        </div>
    ) : null
}