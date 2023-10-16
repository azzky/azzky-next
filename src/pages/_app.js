import '@/styles/globals.css'
import { IntlProvider } from "react-intl";
import { useRouter } from "next/router";

import en from "../lang/en.json";
import ru from "../lang/ru.json";

import "../styles/global.scss";

const messages = {
    ru,
    en
};

export default function App({ Component, pageProps }) {
    const { locale } = useRouter();
    return (
        <IntlProvider locale={locale} messages={messages[locale]}>
            <Component {...pageProps} dir="ltr"/>
        </IntlProvider>
    );
}
