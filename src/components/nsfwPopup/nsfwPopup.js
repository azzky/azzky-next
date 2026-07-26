import { FormattedMessage } from 'react-intl';

import { useNsfwPopup } from './useNsfwPopup';
import * as classes from './nsfwPopup.module.scss';

export const NsfwPopup = (props) => {
    const { showNsfwPopup, setShowNsfwPopup, setNsfw, setToggle } = props;
    const {
        handleclose, handleconfirm, confirmed
    } = useNsfwPopup({
        setShowNsfwPopup, setNsfw, setToggle
    });

    return showNsfwPopup ? (
        <div className={classes.root}>
            <div className={classes.content}>
                {confirmed ? (
                    <p className={classes.enjoy}>Enjoy!</p>
                ) : (
                    <>
                        <p>
                            <FormattedMessage id="nwfwPopup.message"/>
                        </p>
                        <div className={classes.buttons}>
                            <button onClick={handleconfirm}
                                className={classes.primaryButton}>
                                <FormattedMessage id="nwfwPopup.proceed"/>
                            </button>
                            <button onClick={handleclose}
                                className={classes.button}>
                                <FormattedMessage id="nwfwPopup.cancel"/>
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    ) : null;
};