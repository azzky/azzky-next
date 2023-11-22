import Layout from "@/components/layout/layout"
import Link from "next/link"
import Image from "next/image"
import { FormattedMessage } from "react-intl"
import removeSpaces from "@/utils/removeSpaces"
import { client } from '@/lib/contentful'

import * as classes from '@/components/layout/layout.module.scss'
import * as tagsClasses from '@/styles/tags.module.scss'

const ModelsPage = ({
    models
}) => (
    <Layout hero isFooterAbsolute
        pageNsfw={false}>
        <section className={classes.heroWrapper}>
            <div className={classes.heroContent}>
                <div>
                    <h1 className={classes.heroTitle}>
                        <FormattedMessage id="models.h1"/>
                    </h1>
                    <div className={classes.heroDescription}>
                        <p>
                            <FormattedMessage id="models.description"/>
                        </p>
                        <div className={tagsClasses.root}>
                            {Object.keys(models).map(model => {
                                return (
                                    <Link href={'/model/'+ removeSpaces(model)}
                                        key={model}>
                                        {model}
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
    const models = {}
    res.items.map(node => {
        node.fields.model && node.fields.model.map(model => {
            if(model?.fields?.name && !models[model.fields.name]) {
                models[model.fields.name] = model.fields.url || ''
            }
        })
    })

    return {
        props: {
            models,
            revalidate: 70,
            locale
        }
    }
};