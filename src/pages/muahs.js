import Layout from "@/components/layout/layout"
import Link from "next/link"
import { FormattedMessage } from "react-intl"
import removeSpaces from "@/utils/removeSpaces"
import { client } from '@/lib/contentful'

import * as classes from '@/components/layout/layout.module.scss'
import * as tagsClasses from '@/styles/tags.module.scss'

const ModelsPage = ({
    muahs
}) => (
    <Layout hero isFooterAbsolute
        pageNsfw={false}>
        <section className={classes.heroWrapper}>
            <div className={classes.heroContent}>
                <div>
                    <h1 className={classes.heroTitle}>
                        <FormattedMessage id="muahs.h1"/>
                    </h1>
                    <div className={classes.heroDescription}>
                        <p>
                            <FormattedMessage id="muahs.description"/>
                        </p>
                        <div className={tagsClasses.root}>
                            {Object.keys(muahs).map(muah => {
                                return (
                                    <Link href={'/muah/'+ removeSpaces(muah)}
                                        key={muah}>
                                        {`${muah} (${muahs[muah].count})`}
                                    </Link>
                                )
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
)

export default ModelsPage

export const getStaticProps = async ({ locale }) => {
    const res = await client.getEntries({
        content_type: 'post',
        locale: locale === 'ru' ? 'ru' : 'en-US'
    });
    const muahs = {}
    res.items.map(node => {
        // if muah exists - update counter
        if(node.fields.muah?.fields?.name && muahs[node.fields.muah.fields.name]) {
            muahs[node.fields.muah.fields.name].count = muahs[node.fields.muah.fields.name].count + 1
        }// if no such muah - add them
        if(node.fields.muah?.fields?.name && !muahs[node.fields.muah.fields.name]) {
            muahs[node.fields.muah.fields.name] = {
                url: node.fields.muah.fields.url || '',
                count: 1
            }
        }
    })

    return {
        props: {
            muahs,
            revalidate: 70,
            locale
        }
    }
};