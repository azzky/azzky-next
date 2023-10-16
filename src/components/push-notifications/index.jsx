import React, {useState} from "react"
import { getToken } from '../../firebase'
import { FormattedMessage } from "react-intl"

import * as classes from './push.module.scss'

const Push = (props) => {
    const { $isVisible } = props
    let savedSubsciption = false
    if(typeof window !== 'undefined' && localStorage !== 'undefined' && localStorage.getItem('subscribed')) {
        savedSubsciption = true
    }
    const [isTokenFound, setTokenFound] = useState(savedSubsciption)
    const allowNotifications = () => {
        localStorage.setItem('subscribed', true)
        getToken(setTokenFound)
    }

    return (
        <div className={$isVisible ? classes.rootVisible : classes.root}>
            {isTokenFound &&
                <p>
                    <FormattedMessage id="push.success"/>
                </p>
            }
            {!isTokenFound &&
                <p>
                    <FormattedMessage id="push.message"/>
                </p>
            }
            {!isTokenFound &&
                <button onClick={() => allowNotifications()}
                    className={classes.button}>
                    <FormattedMessage id="push.button"/>
                </button>
            }
        </div>
    )
}

export default Push