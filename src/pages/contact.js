import { useForm, ValidationError } from '@formspree/react';
import Layout from "@/components/layout/layout"
import MainSchema from '@/components/meta/meta'
import { Sidebar } from "@/components/sidebar/sidebar"
// import Push from "@components/push-notifications"
import useCenzorship from '@/hooks/useCenzorship'
import { injectIntl, FormattedMessage } from "react-intl"

import * as classes from '@/styles/contact.module.scss';

const Form = ({
    state,
    handleSubmit,
    intl
}) => {
    return (
        <form
            className={classes.form}
            onSubmit={handleSubmit}>
            <label className="visually-hidden"
                htmlFor="name">
                <FormattedMessage id="contactpage.nameLabel"/>
            </label>
            <input type="text"
                name="name"
                id="name"
                placeholder={intl.formatMessage({id: 'contactpage.nameLabel'})}
                required
                aria-required="true" />
            <ValidationError 
                prefix="Name" 
                field="name"
                errors={state.errors}
            />
            <label className="visually-hidden"
                htmlFor="contact">
                <FormattedMessage id="contactpage.contactLabel"/>
            </label>
            <input type="text"
                name="contact"
                id="contact"
                placeholder={intl.formatMessage({id: 'contactpage.contactLabel'})}
                required
                aria-required="true" />
            <ValidationError 
                prefix="Contact" 
                field="contact"
                errors={state.errors}
            />
            <label className="visually-hidden"
                htmlFor="message">
                <FormattedMessage id="contactpage.messageLabel"/>
            </label>
            <textarea name="message"
                className={classes.message}
                id="message"
                rows="10"
                placeholder={intl.formatMessage({id: 'contactpage.messageLabel'})}
                required
                aria-required="true" />
            <ValidationError 
                prefix="message" 
                field="message"
                errors={state.errors}
            />
            <button type="submit"
                className={classes.submit}
                disabled={state.submitting}
            >
                <FormattedMessage id="contactpage.sendbutton"/>
            </button>
        </form>
    );
};

const Contact = (props) => {
    const { intl, locale } = props;
    const { pageNsfw, toggleNsfw, showNsfwPopup, setShowNsfwPopup, setNsfw, setToggle } = useCenzorship();
    const [state, handleSubmit] = useForm("mnqklwjp");

    return (
        <Layout
            isFooterAbsolute
            pageNsfw={pageNsfw}
            showNsfwPopup={showNsfwPopup}
            setShowNsfwPopup={setShowNsfwPopup}
            setNsfw={setNsfw}
            setToggle={setToggle}
            toggleNsfw={toggleNsfw}
        >
            <MainSchema data={{
                title: intl.formatMessage({id: 'contactpage.title'}),
                metadescription: intl.formatMessage({id: 'contactpage.seoDescription'})
            }}
                        locale={locale}
                        isPage />
            <h1>
                <FormattedMessage id="contactpage.h1"/>
            </h1>
            <div className={classes.root}>
                <section className={classes.column}>
                    <div>
                        <svg width="24"
                            height="24">
                            <use href="#marker"></use>
                        </svg>
                        <p>
                            <FormattedMessage id="contactpage.regionText"/>
                        </p>
                    </div>
                    <hr/>
                    <p>
                        <FormattedMessage id="contactpage.promoText"/>
                    </p>
                    <hr/>
                    <p>
                        <FormattedMessage id="contactpage.followMeText"/>
                    </p>
                    <Sidebar $isBig/>
                    <hr/>
                    {/* <Push $isVisible/> */}
                </section>
                <section className={classes.column}>
                    {state.succeeded ? (
                        <FormattedMessage id="contactpage.success"/>
                    ) : (<Form
                        state={state}
                        handleSubmit={handleSubmit}
                        intl={intl}
                    />)}
                </section>
            </div>
        </Layout>
    );
};

export default injectIntl(Contact);

export const getStaticProps = ({ locale }) => {
    return {
        props: {
            locale
        }
    }
};