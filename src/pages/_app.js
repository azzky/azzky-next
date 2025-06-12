import { IntlProvider } from 'react-intl';
import { useRouter } from 'next/router';
import Head from 'next/head';

import en from '../lang/en.json';
import ru from '../lang/ru.json';

import '../styles/global.scss';

const messages = {
    ru,
    en
};

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
