'use client';

import { useCallback } from 'react';
import { useRouter } from 'next/router';

import * as classes from './langSwitcher.module.scss';

const Switcher = () => {
    const router = useRouter();
    const otherLang = router.locale === 'ru' ? 'en' : 'ru';

    const handler = useCallback(() => {
        const path = router.asPath;
        router.push(path, path, { locale: otherLang });
    }, [router, otherLang]);

    return (
        <>
            <div className={classes.root}>
                <button onClick={handler}
                    className={classes.button}>
                    {otherLang}
                </button>
            </div>
        </>
    );
};

export default Switcher;