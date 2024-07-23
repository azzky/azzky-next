import Link from 'next/link';
import { FormattedMessage } from 'react-intl';

import * as classes from './navigation.module.scss';

import { menuItems } from '@/constants';

const Navigation = (props) => {
    const {
        $active,
        toggleMenu
    } = props;

    return (
        <nav className={classes.root}>
            <button type="button"
                className={$active ? classes.buttonActive : classes.button}
                aria-controls="menu__list"
                aria-expanded={$active}
                aria-label="menu button"
                onClick={() => toggleMenu((prev) => !prev)}>
                <span/>
                <span/>
                <span/>
            </button>
            <div id="menu__list"
                className={$active ? classes.menuActive : classes.menu}>
                <ul role="menubar">
                    {menuItems.map((el, i) => (
                        <li key={i}
                            role="none">
                            <Link href={`/${el.link}`}
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

export default Navigation;