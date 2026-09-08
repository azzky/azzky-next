import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { FormattedMessage, useIntl } from 'react-intl';

import * as classes from './reviewForm.module.scss';

const ReviewForm = () => {
    const router = useRouter();
    const { locale } = router;
    const intl = useIntl();
    const [isOpen, setIsOpen] = useState(false);
    const [status, setStatus] = useState('idle'); // idle | submitting | success | error

    // Open automatically when linked with ?review=1 (e.g. from the homepage).
    useEffect(() => {
        if (router.query.review) setIsOpen(true);
    }, [router.query.review]);

    const close = () => {
        if (status === 'submitting') return;
        setIsOpen(false);
        if (status !== 'submitting') setStatus('idle');
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        const data = new FormData(form);

        setStatus('submitting');
        try {
            const res = await fetch('/api/reviews', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    author: data.get('author'),
                    text: data.get('text'),
                    website: data.get('website'),
                    locale
                })
            });
            if (!res.ok) throw new Error('Request failed');
            form.reset();
            setStatus('success');
        } catch {
            setStatus('error');
        }
    };

    return (
        <div className={classes.root}>
            <button type="button"
                className={classes.trigger}
                onClick={() => setIsOpen(true)}>
                <FormattedMessage id="reviews.leaveButton"/>
            </button>

            {isOpen && (
                <div className={classes.overlay}
                    role="dialog"
                    aria-modal="true"
                    aria-label={intl.formatMessage({ id: 'reviews.formTitle' })}>
                    <div className={classes.backdrop}
                        onClick={close}/>
                    <div className={classes.dialog}>
                        <button type="button"
                            className={classes.closeButton}
                            onClick={close}>
                            <span className="visually-hidden">
                                <FormattedMessage id="reviews.close"/>
                            </span>
                        </button>

                        {status === 'success' ? (
                            <div className={classes.message}>
                                <h2 className={classes.formTitle}>
                                    <FormattedMessage id="reviews.successTitle"/>
                                </h2>
                                <p><FormattedMessage id="reviews.successText"/></p>
                                <button type="button"
                                    className={classes.submit}
                                    onClick={close}>
                                    <FormattedMessage id="reviews.close"/>
                                </button>
                            </div>
                        ) : (
                            <form className={classes.form}
                                onSubmit={handleSubmit}>
                                <h2 className={classes.formTitle}>
                                    <FormattedMessage id="reviews.formTitle"/>
                                </h2>

                                <label className={classes.label}
                                    htmlFor="review-author">
                                    <FormattedMessage id="reviews.nameLabel"/>
                                </label>
                                <input type="text"
                                    id="review-author"
                                    name="author"
                                    className={classes.input}
                                    maxLength={100}
                                    required
                                    aria-required="true"
                                    placeholder={intl.formatMessage({ id: 'reviews.namePlaceholder' })}/>

                                <label className={classes.label}
                                    htmlFor="review-text">
                                    <FormattedMessage id="reviews.textLabel"/>
                                </label>
                                <textarea id="review-text"
                                    name="text"
                                    className={classes.textarea}
                                    rows="6"
                                    maxLength={2000}
                                    required
                                    aria-required="true"
                                    placeholder={intl.formatMessage({ id: 'reviews.textPlaceholder' })}/>

                                {/* Honeypot: hidden from users, catches bots. */}
                                <input type="text"
                                    name="website"
                                    className={classes.honeypot}
                                    tabIndex={-1}
                                    autoComplete="off"
                                    aria-hidden="true"/>

                                {status === 'error' && (
                                    <p className={classes.error}>
                                        <FormattedMessage id="reviews.error"/>
                                    </p>
                                )}

                                <button type="submit"
                                    className={classes.submit}
                                    disabled={status === 'submitting'}>
                                    <FormattedMessage id={status === 'submitting' ? 'reviews.submitting' : 'reviews.submit'}/>
                                </button>
                                <p className={classes.note}>
                                    <FormattedMessage id="reviews.moderationNote"/>
                                </p>
                            </form>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ReviewForm;
