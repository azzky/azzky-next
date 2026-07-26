import Link from 'next/link';
import Image from 'next/image';
import { FormattedMessage } from 'react-intl';
import contentfulLoader from '@/components/contentfulImage';

import * as classes from './favorites.module.scss';

const Favorites = ({ posts, lang, pageNsfw }) => {
    if (!posts?.length) return null;
    const prefix = lang === 'ru' ? '/ru/' : '/';
    return (
        <section className={classes.root}>
            <h2 className={classes.title}>
                <FormattedMessage id="homepage.favoritesTitle"/>
            </h2>
            <ul className={classes.grid}>
                {posts.map((post) => {
                    const { link, title, preview, isPrevNsfw } = post.fields;
                    const state = !isPrevNsfw || pageNsfw;
                    return (
                        <li key={link}
                            className={classes.item}>
                            <Link href={prefix + 'shibari' + link}
                                className={classes.link}
                                aria-label={title}>
                                <Image src={preview.fields.file.url}
                                    loader={contentfulLoader}
                                    alt={title}
                                    width={state ? 400 : 15}
                                    height={state ? 400 : 15}
                                    quality={90}
                                    className={state ? classes.image : 'nsfwImage'}/>
                            </Link>
                        </li>
                    );
                })}
            </ul>
            <Link href={prefix + 'shibari'}
                className={classes.cta}>
                <FormattedMessage id="homepage.favoritesCta"/>
            </Link>
        </section>
    );
};

export default Favorites;
