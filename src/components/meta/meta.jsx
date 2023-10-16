import React from "react"
import { useLocation } from "@reach/router"
import Maindata, { menuItems, metaPreviewSetting } from "@/constants"
import config from './config'
import en from '../../intl/en.json'
import ru from '../../intl/ru.json'

const langs = {
    en,
    ru
}

const MainSchema = ({
    isHome,
    isPost,
    locale,
    edges,
    data
}) => {
    const { href } = useLocation()

    const title = data.title
    const orgTitle = langs[locale]['homepage.seoTitle']
    const orgDescription = langs[locale]['homepage.seoDescription']
    const description = data.metadescription
    const thumbnail = isHome ? config.videoThumb : Maindata.imagePrefix + data?.thumbnail
    const url = isHome ? Maindata.url : href
    const schemaArticleImages = []
    const schemaAuthors = []
    const schemaArticles = []
    const schemaLogoId = Maindata.url + "/#/schema/logo/image/"
    const schemaOrganisationId = Maindata.url + "/#organization"
    const schemaAuthorAzzkyId = Maindata.url + "/#/schema/author/azzky"
    const schemaAuthorPhotographerId = data.photographer?.name ? Maindata.url + "/#/schema/author/" + data.photographer.name.replaceAll(' ', '') : null
    const isAzzkyPhotographer = data.photographer?.name === Maindata.author
    const schemaTags = "shibari, rope bondage" + (data?.taglist?.includes('suspension') ? ', shibari suspension' : '')

    const schemaSkeleton = {
        "@context": "https://schema.org",
        "@graph":[]
    }
    const schemaItems = schemaSkeleton["@graph"]
    const schemaWebSite = {
        "@type": "WebSite",
        "@id": Maindata.url + "/#website",
        "url": Maindata.url,
        "name": orgTitle,
        "description": orgDescription,
        "publisher":{
            "@id": schemaOrganisationId
        },
        "inLanguage": locale
    }
    const schemaVideo = {
        "@type": "VideoObject",
        "name": config.videoName,
        "description": config.videoDescription,
        "thumbnailUrl": config.videoThumb,
        "uploadDate": config.videoDate,
        "duration": config.videoDuration,
        "contentUrl": config.videoUrl
    }
    const schemaOrganisation = {
        "@type": "Organization",
        "@id": schemaOrganisationId,
        "name": orgTitle,
        "url": Maindata.url,
        "sameAs": [
            Maindata.socials.instagram,
            Maindata.socials.telegram,
            Maindata.socials.twitter
        ],
        "logo":{
            "@type": "ImageObject",
            "@id": schemaLogoId,
            "inLanguage": locale === 'ru' ? 'ru-RU' : locale,
            "url": Maindata.logoLink,
            "contentUrl": Maindata.logoLink,
            "width": 81,
            "height": 17,
            "caption": orgTitle
        },
        "image":{
            "@id": schemaLogoId
        }
    }
    const schemaBreadcrumb = {
        "@type": "BreadcrumbList",
        itemListElement: [
            {
                "@type": "ListItem",
                "position": 1,
                "name": menuItems[0].name[locale]
            }
        ]
    }

    const schemaCollection = {
        "@type": "CollectionPage",
        "@id": Maindata.url,
        "url": Maindata.url,
        "mainEntity": {
            "@type": "ItemList",
            "itemListElement": []
        }
    }

    edges && edges.map(article => {
        const articleData = {
            "@type": "Article",
            "headline": article.node.metatitle || article.node.title,
            "inLanguage": locale,
            "isFamilyFriendly": !article.node.nsfw,
            "mainEntityOfPage": {
                "@type": "WebPage",
                "@id": Maindata.url + 'shibari' + article.node.link
            },
            "author": {
                "@type": "Person",
                "@id": schemaAuthorAzzkyId,
                "name": Maindata.author,
                "jobTitle": locale === 'en' ? 'Shibari master' : 'Мастер шибари',
                "url": Maindata.socials.instagram
            },
            "image": Maindata.imagePrefix + article.node.preview.file.url + metaPreviewSetting,
            "publisher": {
                "@id": schemaOrganisationId
            }
        }
        return schemaArticles.push(articleData)
    })

    data.gallery && data.gallery.map(image => {
        const imageData = {
            "@type": "ImageObject",
            "contentUrl": Maindata.imagePrefix + image.file.url,
            "url": Maindata.imagePrefix + image.file.url,
            "width": image.width,
            "height": image.height,
            "name": title,
            "description": description,
            "representativeOfPage": thumbnail === Maindata.imagePrefix + image.file.url + metaPreviewSetting,
            "datePublished": data.createdAt
        }

        if (data.photographer) imageData.author = isAzzkyPhotographer ? {
            "@id": schemaAuthorAzzkyId
        } : {
            "@id": schemaAuthorPhotographerId
        }

        return schemaArticleImages.push(imageData)
    })
    schemaAuthors.push({
        "@type": "Person",
        "@id": schemaAuthorAzzkyId,
        "name": Maindata.author,
        "jobTitle": locale === 'en' ? 'Shibari Master' : 'Шибари мастер',
        "url": Maindata.socials.instagram
    })
    if(data.photographer) {
        schemaAuthors.push({
            "@type": "Person",
            "@id": schemaAuthorPhotographerId || schemaAuthorAzzkyId,
            "name": data.photographer.name,
            "jobTitle": locale === 'en' ? 'Photographer' : 'Фотограф',
            "url": data.photographer.url || Maindata.socials.instagram
        })
    }
    if(data.muah) {
        schemaAuthors.push({
            "@type": "Person",
            "name": data.muah.name,
            "jobTitle": locale === 'en' ? 'Visagist' : 'Визажист',
            "url": data.muah.url
        })
    }

    const schemaArticle = isPost ? {
        "@type": "Article",
        "headline": title,
        "inLanguage": locale,
        "isFamilyFriendly": !data.nsfw,
        "keywords": schemaTags,
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": href
        },
        "author": schemaAuthors,
        "image": schemaArticleImages,
        "datePublished": data.createdAt,
        "publisher": {
            "@id": schemaOrganisationId
        },
        "isPartOf": {
            "@id": Maindata.url
        },
        "significantLinks": data.significantLinks
    } : null

    schemaItems.push(schemaOrganisation)
    schemaItems.push(schemaWebSite)
    schemaItems.push(schemaBreadcrumb)

    if (isHome) {
        schemaItems.push(schemaVideo)
        schemaCollection.mainEntity.itemListElement.push(schemaArticles)
        schemaItems.push(schemaCollection)
    }
    if (!isHome) {
        schemaBreadcrumb.itemListElement[0].item = Maindata.url
        schemaBreadcrumb.itemListElement.push({
            "@type": "ListItem",
            "position": 2,
            "name": data.breadCrumbTitle
        })
    }
    if (isPost) schemaItems.push(schemaArticle)

    let schemaModelName = ''
    if(data.model?.length) for(let i = 0;i < data.model.length;i++) {
        const suffix = i === (data.model.length - 1) ? '' : ' and '
        schemaModelName = schemaModelName + data.model[i].name + suffix
    }

    const schemaThumbAlt = `${schemaModelName} tied in rope bondage by Azzky`

    return (
        <>
            <title>{title}</title>
            <meta name="og:title"
                  property="og:title"
                  content={title} />
            <meta name="og:url"
                  property="og:url"
                  content={url}/>
            <meta name="ia:markup_url"
                  property="ia:markup_url"
                  content={url}/>
            <meta name="ia:rules_url"
                  property="ia:rules_url"
                  content={url}/>
            {isPost && <meta name="og:image:alt"
                  property="og:image:alt"
                  content={schemaThumbAlt}/>}
            <meta name="twitter:title"
                  property="twitter:title"content={title} />
            <meta property="og:type"
                  content="website"></meta>
            <meta name="description"
                  property="description"
                  content={description} />
            <meta name="og:description"
                  property="og:description"
                  content={description} />
            <meta name="twitter:description"
                  property="twitter:description"
                  content={description}/>
            <meta name="og:image"
                  property="og:image"
                  content={thumbnail}/>
            <meta name="twitter:image"
                  property="twitter:image"content={thumbnail}/>
            <meta name="vk:image"
                  property="vk:image"
                  content={thumbnail}/>
            <meta name="fb:app_id"
                  property="fb:app_id"
                  content="966242223397117"/>
            <meta name="twitter:card"
                  property="twitter:card"
                  content="summary_large_image"/>
            <script type="application/ld+json">{JSON.stringify(schemaSkeleton)}</script>
        </>
    )
}

export default MainSchema