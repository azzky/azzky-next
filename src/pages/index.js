import { client } from '@/lib/contentful'
import Link from 'next/link'
import { FormattedMessage } from 'react-intl'
import { Layout } from '@/components'
import { useVideo } from "@/hooks/useVideo"
import useCenzorship from '@/hooks/useCenzorship'
import { PostsGallery } from '@/components/gallery/gallery'
import config from '@/components/meta/config'

import * as classes from '@/components/layout/layout.module.scss'

const Home = ({ posts, locale }) => {
    const { pageNsfw, toggleNsfw, showNsfwPopup, setShowNsfwPopup, setNsfw, setToggle } = useCenzorship()
    const { renderVideo } = useVideo()
    return (
        <>
            <Layout
                toggler
                hero
                dark
                heroType="video"
                pageNsfw={pageNsfw}
                showNsfwPopup={showNsfwPopup}
                setShowNsfwPopup={setShowNsfwPopup}
                setNsfw={setNsfw}
                setToggle={setToggle}
                toggleNsfw={toggleNsfw}
            >
                <section className={classes.heroWrapper}>
                    <div className={classes.heroContent}>
                        <h1 className={classes.heroTitle}>
                            <FormattedMessage id="homepage.h1"/>
                        </h1>
                        <div className={classes.heroDescription}>
                            <p>
                                <FormattedMessage id="homepage.description"
                                    values={{ link: (
                                        <Link href="/contact">
                                            <FormattedMessage id="homepage.ctaButton"/>
                                        </Link>
                                    )}}/>
                            </p>
                        </div>
                    </div>
                    <div className={classes.heroVideoRoot}>
                        <video autoPlay loop className={classes.heroVideo}
                                muted
                                playsInline
                                id="background-video"
                                poster={config.videoThumb}>
                        {renderVideo && config.videoFormats.map(format => {
                            return <source src={`/${config.videoFileName}.${format}`}
                                        type={`video/${format}`}
                                        key={format} />
                        })}
                        </video>
                    </div>
                </section>
                <PostsGallery pageNsfw={pageNsfw}
                            edges={posts}
                            lang={locale} />
            </Layout>
        </>
    )
};

export default Home;

export const getStaticProps = async ({ locale }) => {
    const res = await client.getEntries({
        content_type: 'post',
        order: '-fields.date',
        locale: locale === 'ru' ? 'ru' : 'en-US'
    });

    return {
        props: {
            posts: res.items,
            revalidate: 70,
            locale
        }
    }
};