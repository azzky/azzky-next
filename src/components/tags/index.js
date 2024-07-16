import Link from 'next/link';

import * as classes from './tags.module.scss';

const Tags = ({ tags, lang }) => {
    if (!tags) return null;
    return (
        <ul className={classes.root}>
            {tags && tags.map(tag => {
                const formattedTag = tag.replaceAll(' ', '_');
                const prefix = lang === 'ru' ? '/ru' : '';
                return (
                    <li key={formattedTag}>
                        <Link href={prefix + '/tag/' + formattedTag}>
                            {'#' + tag}
                        </Link>
                    </li>
                );
            })}
        </ul>
    );
};

export default Tags;