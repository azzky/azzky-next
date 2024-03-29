import Link from 'next/link';

import * as classes from './logo.module.scss';

const Logo = () => (
    <Link href="/"
        className={classes.root}>
        <img src="/logo.svg"
            className={classes.image}
            alt="Shibari by Azzky logo"
            width="81"
            height="17"/>
    </Link>
);

export default Logo;