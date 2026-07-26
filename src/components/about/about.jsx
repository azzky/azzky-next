import Link from 'next/link';
import Image from 'next/image';
import { FormattedMessage } from 'react-intl';

import * as classes from './about.module.scss';

const About = () => (
    <section className={classes.root}>
        <div className={classes.imageWrapper}>
            <Image src="/in-work.jpg"
                alt="Azzky - shibari master in Belgrade"
                fill
                className={classes.image}
                quality={100}
                sizes="(min-width: 768px) 45vw, 100vw"/>
        </div>
        <div className={classes.content}>
            <h2 className={classes.title}>
                <FormattedMessage id="homepage.aboutTitle"/>
            </h2>
            <div className={classes.text}>
                <p>
                    <FormattedMessage id="homepage.aboutText1"/>
                </p>
                <p>
                    <FormattedMessage id="homepage.aboutText2"/>
                </p>
            </div>
            <Link href="/contact"
                className={classes.cta}>
                <FormattedMessage id="homepage.ctaButton"/>
            </Link>
        </div>
    </section>
);

export default About;
