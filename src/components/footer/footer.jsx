import config from './config'
import getDate from '@/hooks/useDate'
import { FormattedMessage } from "react-intl"

import * as classes from './footer.module.scss'

const Footer = (props) => {
    const { $isFooterAbsolute } = props
    const date = getDate()

    return(
        <footer className={$isFooterAbsolute ? classes.absolute : classes.root}>
            <p>
                <FormattedMessage id="footer.copyright" values={{ date }}/>
            </p>
            <div>
                <p className={classes.designer}>
                    <FormattedMessage id="footer.designerText"/>
                    <a href={config.designerLink}
                       rel="noreferrer"
                       target="_blank">
                        {config.designerName}
                    </a>
                </p>
            </div>
        </footer>
)}

export default Footer