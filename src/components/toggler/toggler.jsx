'use client';
import { injectIntl } from 'react-intl';
import { FormattedMessage } from 'react-intl';

import * as classes from './toggler.module.scss';

const Toggler = (props) => {
    const {
        $state,
        changeState,
        onStateLabel,
        offStateLabel,
        intl       
    } = props;

    return (
        <label className={$state ? classes.rootActive : classes.root}
            title={intl.formatMessage({ id: 'toggler.label' }) + ($state ? onStateLabel : offStateLabel)}>
            <input  type="checkbox"
                role="switch"
                onChange={changeState}
                defaultChecked={$state}/>
            <span className="visually-hidden">
                <FormattedMessage id="toggler.label"/>
            </span>
            {$state ? onStateLabel : offStateLabel}
        </label>
    );
};

export default injectIntl(Toggler);