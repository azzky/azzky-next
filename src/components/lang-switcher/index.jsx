'use client';
import { injectIntl } from 'react-intl';
import { useCallback } from 'react';
import { useRouter } from 'next/router';
import { FormattedMessage } from 'react-intl';

import * as classes from './langSwitcher.module.scss';

const Switcher = ({ intl }) => {
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
                    title={intl.formatMessage({ id: `lang.${otherLang}` })}
                    className={classes.button}>
                    <span className="visually-hidden">
                        <FormattedMessage id={`lang.${otherLang}`}/>
                    </span>
                    {otherLang}
                </button>
            </div>
        </>
    );
};

export default injectIntl(Switcher);