import { injectIntl } from 'react-intl';
import Link from 'next/link';
import { FormattedMessage } from 'react-intl';

import * as classes from './navigation.module.scss';

import { menuItems } from '@/constants';

const Navigation = (props) => {
    const {
        $active,
        toggleMenu,
        intl
    } = props;

    return (
        <nav className={classes.root}>
            <button type="button"
                className={$active ? classes.buttonActive : classes.button}
                aria-controls="menu__list"
                aria-expanded={$active}
                aria-label="menu button"
                title={intl.formatMessage({ id: $active ? 'menu.close' : 'menu.open' })}
                role="button"
                onClick={() => toggleMenu((prev) => !prev)}>
                <span/>
                <span/>
                <span className="visually-hidden">
                    {$active
                        ? <FormattedMessage id="menu.close"/>
                        : <FormattedMessage id="menu.open"/>}
                </span>
                <span/>
            </button>
            <div id="menu__list"
                tabIndex="-1"
                className={$active ? classes.menuActive : classes.menu}>
                <ul role="menubar">
                    {menuItems.map((el, i) => (
                        <li key={i}
                            role="none">
                            <Link href={`/${el.link}`}
                                tabIndex={$active ? 0 : -1}
                                role="menuitem">
                                <svg width="24" height="24">
                                    <use href={`#${el.link}`}/>
                                </svg>
                                <span className={classes.label}>
                                    <FormattedMessage id={el.name}/>
                                </span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
};

export default injectIntl(Navigation);