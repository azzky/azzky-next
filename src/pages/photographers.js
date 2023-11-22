import Layout from "@/components/layout/layout"
import Link from "next/link"
import Image from "next/image"
import { FormattedMessage } from "react-intl"
import removeSpaces from "@/utils/removeSpaces"
import { client } from '@/lib/contentful'

import * as classes from '@/components/layout/layout.module.scss'
import * as tagsClasses from '@/styles/tags.module.scss'

const ModelsPage = ({
    photographers
}) => (
    <Layout hero isFooterAbsolute
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
                            {Object.keys(photographers).map(photographer => {
                                return (
                                    <Link href={'/photographer/'+ removeSpaces(photographer)}
                                        key={photographer}>
                                        {photographer}
                                    </Link>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
            <img src="./404.jpg"
                    alt=""/>
        </section>
    </Layout>
)

export default ModelsPage

export const getStaticProps = async ({ locale }) => {
    const res = await client.getEntries({
        content_type: 'post',
        locale: locale === 'ru' ? 'ru' : 'en-US'
    });
    const photographers = {}
    res.items.map(node => {
        if(node.fields.photographer?.fields?.name && !photographers[node.fields.photographer.fields.name]) {
            photographers[node.fields.photographer.fields.name] = node.fields.photographer.fields.url || ''
        }
    })

    return {
        props: {
            photographers,
            revalidate: 70,
            locale
        }
    }
};