import React from "react"
import { IntlProvider } from 'react-intl'
import enLang from '../../intl/en.json'
import ruLang from '../../intl/ru.json'

const Intl = ({
    children,
    lang
}) => (
    <IntlProvider locale={lang}
            defaultLocale="en"
            messages={lang === 'en' ? enLang : ruLang}>
        {children}
    </IntlProvider>
)

export default Intl