'use client';

import { useCallback } from 'react';
import { useRouter } from 'next/router';

import * as classes from './langSwitcher.module.scss';

const Switcher = () => {
    const router = useRouter();

    const handler = useCallback(() => {
        const path = router.asPath;
        router.push(path, path, { locale: router.locale === 'ru' ? 'en' : 'ru' });
    }, [router]);

    return (
        <>
            <div className={classes.root}>
                <button onClick={handler}
                    className={classes.button}>
                    en/ru
                </button>
            </div>
        </>
    );
};

export default Switcher;