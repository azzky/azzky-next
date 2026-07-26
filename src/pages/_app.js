import { IntlProvider } from 'react-intl';
import { useRouter } from 'next/router';
import Head from 'next/head';

import en from '../lang/en.json';
import ru from '../lang/ru.json';
import sr from '../lang/sr.json';

import '../styles/global.scss';

const messages = {
    ru,
    en,
    sr
};

export function reportWebVitals(metric) {
    if (process.env.NODE_ENV !== 'production') {
        console.log(metric);
    }
    // Forward metrics to your analytics endpoint here, e.g.:
    // const body = JSON.stringify(metric);
    // navigator.sendBeacon('/api/vitals', body);
}

export default function App({ Component, pageProps }) {
    const { locale } = useRouter();
    return (
        <IntlProvider locale={locale} messages={messages[locale]}>
            <Head>
                <link rel="manifest" href="/manifest.json"/>
                <link rel="manifest" href="/site.webmanifest"/>
                <link rel="shortcut icon" href="/favicon-32x32.png"/>
                <meta name="viewport"
                    content="width=device-width, initial-scale=1.0"
                />
            </Head>
            <Component {...pageProps} dir="ltr"/>
        </IntlProvider>
    );
}
