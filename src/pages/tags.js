import Link from 'next/link';
import { FormattedMessage } from 'react-intl';
import { number, shape, string } from 'prop-types';

import Layout from '@/components/layout/layout';
import removeSpaces from '@/utils/removeSpaces';
import { client } from '@/lib/contentful';
import * as classes from '@/components/layout/layout.module.scss';
import * as tagsClasses from '@/styles/tags.module.scss';

const TagsPage = ({ tags }) => (
    <Layout hero
        isFooterAbsolute
        pageNsfw={false}>
        <section className={classes.heroWrapper}>
            <div className={classes.heroContent}>
                <div>
                    <h1 className={classes.heroTitle}>
                        <FormattedMessage id="tags.h1"/>
                    </h1>
                    <div className={classes.heroDescription}>
                        <p>
                            <FormattedMessage id="tags.description"/>
                        </p>
                        <div className={tagsClasses.root}>
                            {Object.keys(tags).map(tag => {
                                return (
                                    <Link href={'/tag/' + removeSpaces(tag)}
                                        key={tag}>
                                        {`#${tag} (${tags[tag].count})`}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
            <img src="/404.jpg"
                alt=""
                className="heroImage"/>
        </section>
    </Layout>
);

export default TagsPage;

export const getStaticProps = async ({ locale }) => {
    const res = await client.getEntries({
        content_type: 'post',
        locale: locale === 'ru' ? 'ru' : 'en-US'
    });
    let tags = {};
    res.items.map(node => {
        node.fields.tags && node.fields.tags.map(tag => {
            // if tag exists - update counter
            if (tags[tag]) {
                tags[tag].count = tags[tag].count + 1;
            }
            // if no such tag - add it
            if (!tags[tag]) {
                tags[tag] = {
                    count: 1
                };
            }
        });
    });

    return {
        props: {
            tags,
            revalidate: 70,
            locale
        }
    };
};

TagsPage.propTypes = {
    tags: shape({
        url: string,
        count: number
    })
};