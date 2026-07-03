'use client';
import { injectIntl } from 'react-intl';
import { useCallback, useState } from 'react';
import { useRouter } from 'next/router';

import * as classes from './langSwitcher.module.scss';

const LOCALES = ['en', 'ru', 'sr'];

const Switcher = ({ intl }) => {
    const router = useRouter();
    const currentLocale = router.locale;
    const [open, setOpen] = useState(false);

    const switchTo = useCallback((locale) => {
        const path = router.asPath;
        router.push(path, path, { locale });
        setOpen(false);
    }, [router]);

    return (
        <>
            {/* Mobile: all langs in a row */}
            <div className={classes.mobileRow}>
                {LOCALES.map((locale, i) => (
                    <span key={locale} className={classes.mobileItem}>
                        {i > 0 && <span className={classes.delimiter} aria-hidden="true">|</span>}
                        <button
                            onClick={() => switchTo(locale)}
                            title={intl.formatMessage({ id: `lang.${locale}` })}
                            className={locale === currentLocale ? classes.buttonActive : classes.button}>
                            <span className="visually-hidden">
                                {intl.formatMessage({ id: `lang.${locale}` })}
                            </span>
                            {locale}
                        </button>
                    </span>
                ))}
            </div>
            {/* Desktop: show active, expand on click */}
            <div className={classes.root}>
                <button
                    onClick={() => setOpen(prev => !prev)}
                    title={intl.formatMessage({ id: `lang.${currentLocale}` })}
                    className={classes.button}
                    aria-expanded={open}
                >
                    {currentLocale}
                </button>
                {open && LOCALES.filter(l => l !== currentLocale).map(locale => (
                    <button key={locale}
                        onClick={() => switchTo(locale)}
                        title={intl.formatMessage({ id: `lang.${locale}` })}
                        className={classes.button}>
                        <span className="visually-hidden">
                            {intl.formatMessage({ id: `lang.${locale}` })}
                        </span>
                        {locale}
                    </button>
                ))}
            </div>
        </>
    );
};

export default injectIntl(Switcher);