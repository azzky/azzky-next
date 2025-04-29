import Link from 'next/link';
import { injectIntl } from 'react-intl';

import * as classes from './logo.module.scss';

const Logo = ({ intl }) => (
    <Link href="/"
        aria-label={intl.formatMessage({ id: 'header.homepage' })}
        title={intl.formatMessage({ id: 'header.homepage' })}
        className={classes.root}>
        <img src="/logo.svg"
            className={classes.image}
            alt="Shibari by Azzky logo"
            width="81"
            height="17"/>
    </Link>
);

export default injectIntl(Logo);