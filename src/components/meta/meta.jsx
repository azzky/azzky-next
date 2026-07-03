import { injectIntl } from 'react-intl';
import { useRouter } from 'next/router';
import Head from 'next/head';

import config from './config';

import Maindata, { menuItems, metaPreviewSetting } from '@/constants';

const MainSchema = ({
    isHome,
    isPost,
    locale,
    edges,
    data,
    intl
}) => {
    const router = useRouter();
    const localePath = locale && locale !== 'en' ? `/${locale}` : '';
    const href = Maindata.url + localePath + router.asPath;
    const hrefEn = Maindata.url + router.asPath;
    const hrefRu = Maindata.url + '/ru' + router.asPath;
    const hrefSr = Maindata.url + '/sr' + router.asPath;
    const title = data.title;
    const orgTitle = intl.formatMessage({ id: 'homepage.seoTitle' });
    const orgDescription = intl.formatMessage({ id: 'homepage.seoDescription' });
    const description = data.metadescription;
    const thumbnail = isHome ? config.videoThumb : Maindata.imagePrefix + data?.thumbnail;
    const url = href;
    const schemaArticleImages = [];
    const schemaAuthors = [];
    const schemaArticles = [];
    const schemaLogoId = Maindata.url + '/#/schema/logo/image/';
    const schemaOrganisationId = Maindata.url + '/#organization';
    const schemaAuthorAzzkyId = Maindata.url + '/#/schema/author/azzky';
    const schemaAuthorPhotographerId = data.photographer?.fields?.name ? Maindata.url + '/#/schema/author/' + data.photographer.fields.name.replaceAll(' ', '') : null;
    const isAzzkyPhotographer = data.photographer?.fields?.name === Maindata.author;
    const baseKeywords = ['shibari', 'rope bondage'];
    const postKeywords = data?.taglist?.length ? data.taglist : [];
    const schemaTags = [...new Set([...baseKeywords, ...postKeywords])].join(', ');

    const schemaSkeleton = {
        '@context': 'https://schema.org',
        '@graph': []
    };
    const schemaItems = schemaSkeleton['@graph'];
    const schemaWebSite = {
        '@type': 'WebSite',
        '@id': Maindata.url + '/#website',
        'url': Maindata.url,
        'name': orgTitle,
        'description': orgDescription,
        'publisher': {
            '@id': schemaOrganisationId
        },
        'inLanguage': locale
    };
    const schemaVideo = {
        '@type': 'VideoObject',
        'name': config.videoName,
        'description': config.videoDescription,
        'thumbnailUrl': config.videoThumb,
        'uploadDate': config.videoDate,
        'duration': config.videoDuration,
        'contentUrl': config.videoUrl
    };
    const schemaOrganisation = {
        '@type': 'Organization',
        '@id': schemaOrganisationId,
        'name': orgTitle,
        'url': Maindata.url,
        'sameAs': [
            Maindata.socials.instagram,
            Maindata.socials.telegram,
            Maindata.socials.twitter
        ],
        'logo': {
            '@type': 'ImageObject',
            '@id': schemaLogoId,
            'inLanguage': locale,
            'url': Maindata.logoLink,
            'contentUrl': Maindata.logoLink,
            'width': 81,
            'height': 17,
            'caption': orgTitle
        },
        'image': {
            '@id': schemaLogoId
        }
    };
    const schemaBreadcrumb = {
        '@type': 'BreadcrumbList',
        itemListElement: [
            {
                '@type': 'ListItem',
                'position': 1,
                'name': intl.formatMessage({ id: menuItems[0].name })
            }
        ]
    };

    const schemaCollection = {
        '@type': 'CollectionPage',
        '@id': Maindata.url,
        'url': Maindata.url,
        'mainEntity': {
            '@type': 'ItemList',
            'itemListElement': []
        }
    };

    edges && edges.map(article => {
        const articleData = {
            '@type': 'Article',
            'headline': article.fields.metatitle || article.fields.title,
            'inLanguage': locale,
            'isFamilyFriendly': !article.fields.nsfw,
            'mainEntityOfPage': {
                '@type': 'WebPage',
                '@id': Maindata.url + '/shibari' + article.fields.link
            },
            'author': {
                '@type': 'Person',
                '@id': schemaAuthorAzzkyId,
                'name': Maindata.author,
                'jobTitle': intl.formatMessage({ id: 'meta.nawashi' }),
                'url': Maindata.socials.instagram
            },
            'image': Maindata.imagePrefix + article.fields.preview.fields.file.url + metaPreviewSetting,
            'publisher': {
                '@id': schemaOrganisationId
            }
        };
        return schemaArticles.push(articleData);
    });

    data.gallery && data.gallery.map(image => {
        const imageData = {
            '@type': 'ImageObject',
            'contentUrl': Maindata.imagePrefix + image.fields.file.url,
            'url': Maindata.imagePrefix + image.fields.file.url,
            'width': image.fields.file.details.image.width,
            'height': image.fields.file.details.image.height,
            'name': title,
            'description': description,
            'representativeOfPage': thumbnail === Maindata.imagePrefix + image.fields.file.url + metaPreviewSetting,
            'datePublished': data.createdAt
        };

        if (data.photographer) imageData.author = isAzzkyPhotographer ? {
            '@id': schemaAuthorAzzkyId
        } : {
            '@id': schemaAuthorPhotographerId
        };

        return schemaArticleImages.push(imageData);
    });
    schemaAuthors.push({
        '@type': 'Person',
        '@id': schemaAuthorAzzkyId,
        'name': Maindata.author,
        'jobTitle': intl.formatMessage({ id: 'meta.nawashi' }),
        'url': Maindata.socials.instagram
    });
    if (data.photographer) {
        schemaAuthors.push({
            '@type': 'Person',
            '@id': schemaAuthorPhotographerId || schemaAuthorAzzkyId,
            'name': data.photographer.fields.name,
            'jobTitle': intl.formatMessage({ id: 'meta.photographer' }),
            'url': data.photographer.fields.url || Maindata.socials.instagram
        });
    }
    if (data.muah) {
        schemaAuthors.push({
            '@type': 'Person',
            'name': data.muah.name,
            'jobTitle': intl.formatMessage({ id: 'meta.muah' }),
            'url': data.muah.url
        });
    }

    const schemaArticle = isPost ? {
        '@type': 'Article',
        'headline': title,
        'inLanguage': locale,
        'isFamilyFriendly': !data.nsfw,
        'keywords': schemaTags,
        'mainEntityOfPage': {
            '@type': 'WebPage',
            '@id': href
        },
        'author': schemaAuthors,
        'image': schemaArticleImages,
        'datePublished': data.createdAt,
        'publisher': {
            '@id': schemaOrganisationId
        },
        'isPartOf': {
            '@id': Maindata.url
        }
    } : null;

    const schemaPostPage = isPost ? {
        '@type': 'WebPage',
        'headline': title,
        'inLanguage': locale,
        'author': schemaAuthors,
        'image': schemaArticleImages,
        'datePublished': data.createdAt,
        'publisher': {
            '@id': schemaOrganisationId
        },
        'relatedLink': Maindata.url,
        'significantLinks': data.significantLinks
    } : null;

    schemaItems.push(schemaOrganisation);
    schemaItems.push(schemaWebSite);
    schemaItems.push(schemaBreadcrumb);

    if (isHome) {
        schemaItems.push(schemaVideo);
        schemaCollection.mainEntity.itemListElement.push(...schemaArticles);
        schemaItems.push(schemaCollection);
    }
    if (!isHome) {
        schemaBreadcrumb.itemListElement[0].item = Maindata.url;
        schemaBreadcrumb.itemListElement.push({
            '@type': 'ListItem',
            'position': 2,
            'name': data.breadCrumbTitle
        });
    }
    if (isPost) {
        schemaItems.push(schemaArticle);
        schemaItems.push(schemaPostPage);
    }

    let schemaModelName = '';
    if (data.model?.length) for (let i = 0;i < data.model.length;i++) {
        const suffix = i === (data.model.length - 1) ? '' : ' and ';
        schemaModelName = schemaModelName + data.model[i].name + suffix;
    }

    const schemaThumbAlt = `${schemaModelName} tied in rope bondage by Azzky`;

    return (
        <Head>
            <title>{title}</title>
            <link rel="canonical" href={href}/>
            <link rel="alternate" hrefLang="en" href={hrefEn}/>
            <link rel="alternate" hrefLang="ru" href={hrefRu}/>
            <link rel="alternate" hrefLang="sr" href={hrefSr}/>
            <link rel="alternate" hrefLang="x-default" href={hrefEn}/>
            <meta name="description"
                content={description}/>
            <meta property="og:title"
                content={title}/>
            <meta property="og:url"
                content={url}/>
            <meta property="og:type"
                content={isPost ? 'article' : 'website'}/>
            <meta property="og:description"
                content={description}/>
            <meta property="og:image"
                content={thumbnail}/>
            <meta property="og:image:width"
                content="1024"/>
            <meta property="og:image:height"
                content="1024"/>
            {isPost && (
                <meta property="og:image:alt"
                    content={schemaThumbAlt}/>
            )}
            <meta name="twitter:card"
                content="summary_large_image"/>
            <meta name="twitter:site"
                content="@AzzkyDemiurg"/>
            <meta name="twitter:title"
                content={title}/>
            <meta name="twitter:description"
                content={description}/>
            <meta name="twitter:image"
                content={thumbnail}/>
            <meta property="vk:image"
                content={thumbnail}/>
            <meta property="fb:app_id"
                content="966242223397117"/>
            <script type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaSkeleton) }}/>
        </Head>
    );
};

export default injectIntl(MainSchema);