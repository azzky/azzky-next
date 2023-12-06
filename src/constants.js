const Maindata = {
    url: 'https://shibaribyazzky.com',
    author: 'Azzky',
    socials: {
        instagram: 'https://www.instagram.com/shibari.by.azzky/',
        linkedin: 'https://www.linkedin.com/u/azzky',
        telegram: 'https://t.me/shibaribyazzky',
        twitter: 'https://twitter.com/AzzkyDemiurg',
        fetlife: 'https://fetlife.com/users/15166387'
    },
    logoLink: 'https://shibaribyazzky.com/logo.svg',
    imagePrefix: 'https:'
};

export default Maindata;

export const HolderSmall = {
    'images': {
        'sources': [
            {
                'srcSet': '/holder-small.webp',
                'sizes': '(min-width: 1920px) 1920px, 100vw',
                'type': 'image/webp'
            }
        ],
        'fallback': {
            'src': '/holder-small.webp',
        }
    },
    'layout': 'constrained',
    'width': 400,
    'height': 600,
    'placeholder': {
        'fallback': '/holder-small.webp'
    }
};

export const MobileWidth = 768;

export const menuItems = [
    {
        name: 'menu.home',
        link: ''
    },
    {
        name: 'menu.tags',
        link: 'tags'
    },
    {
        name: 'menu.models',
        link: 'models'
    },
    {
        name: 'menu.photographers',
        link: 'photographers'
    },
    {
        name: 'menu.muahs',
        link: 'muahs'
    },
    {
        name: 'menu.contacts',
        link: 'contact'
    }
];

export const switchLabels = {
    on: 'NSFW',
    off: 'SFW'
};

export const lightboxSettings = '?w=2048&h=2048&q=100&fm=webp';
export const metaPreviewSetting = '?w=1024&h=1024&q=90';
