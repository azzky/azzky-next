import Layout from "@/components/layout/layout"
import Link from "next/link"
import Image from "next/image"
import { FormattedMessage } from "react-intl"
import removeSpaces from "@/utils/removeSpaces"
import { client } from '@/lib/contentful'

import * as classes from '@/components/layout/layout.module.scss'
import * as tagsClasses from '@/styles/tags.module.scss'

const TagsPage = ({
    tags
}) => (
    <Layout hero isFooterAbsolute
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
                            {tags.map(tag => {
                                return (
                                    <Link href={'/tag/'+ removeSpaces(tag)}
                                        key={tag}>
                                        {'#' +tag}
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

export default TagsPage

export const getStaticProps = async ({ locale }) => {
    const res = await client.getEntries({
        content_type: 'post',
        locale: locale === 'ru' ? 'ru' : 'en-US'
    });
    let tags = []
    res.items.map(node => {
        if(node.fields.tags) {
            tags = [...tags, ...node.fields.tags]
        }
    })
    const uniqueTags = [...new Set(tags)];

    return {
        props: {
            tags: uniqueTags,
            revalidate: 70,
            locale
        }
    }
};