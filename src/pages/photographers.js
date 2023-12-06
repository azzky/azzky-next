import Link from 'next/link';
import { FormattedMessage } from 'react-intl';
import { number, shape, string } from 'prop-types';

import Layout from '@/components/layout/layout';
import removeSpaces from '@/utils/removeSpaces';
import { client } from '@/lib/contentful';
import * as classes from '@/components/layout/layout.module.scss';
import * as tagsClasses from '@/styles/tags.module.scss';

const PhotographersPage = ({
    photographers
}) => (
    <Layout hero
        isFooterAbsolute
        pageNsfw={false}>
        <section className={classes.heroWrapper}>
            <div className={classes.heroContent}>
                <div>
                    <h1 className={classes.heroTitle}>
                        <FormattedMessage id="photographers.h1"/>
                    </h1>
                    <div className={classes.heroDescription}>
                        <p>
                            <FormattedMessage id="photographers.description"/>
                        </p>
                        <div className={tagsClasses.root}>
                            {Object.keys(photographers).map(photographer => (
                                <Link href={'/photographer/' + removeSpaces(photographer)}
                                    key={photographer}>
                                    {`${photographer} (${photographers[photographer].count})`}
                                </Link>
                            ))}
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

export default PhotographersPage;

export const getStaticProps = async ({ locale }) => {
    const res = await client.getEntries({
        content_type: 'post',
        locale: locale === 'ru' ? 'ru' : 'en-US'
    });
    const photographers = {};
    res.items.map(node => {
        // if photographer exists - update counter
        if (node.fields.photographer?.fields?.name && photographers[node.fields.photographer.fields.name]) {
            photographers[node.fields.photographer.fields.name].count =
                photographers[node.fields.photographer.fields.name].count + 1;
        }// if no such photographer - add them
        if (node.fields.photographer?.fields?.name && !photographers[node.fields.photographer.fields.name]) {
            photographers[node.fields.photographer.fields.name] = {
                url: node.fields.photographer.fields.url || '',
                count: 1
            };
        }
    });

    return {
        props: {
            photographers,
            revalidate: 70,
            locale
        }
    };
};

PhotographersPage.propTypes = {
    photographers: shape({
        url: string,
        count: number
    })
};