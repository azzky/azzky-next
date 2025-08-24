import { ResponsiveGallery } from '@/components';
import { lightboxSettings } from '@/constants';

// gallery on post page
const PostGallery = (props) => {
    const {
        nsfw: isNsfw,
        gallery,
        pageNsfw,
        metaDescription,
        nsfwarr
    } = props;
    let nsfwArr = [];
    
    if (isNsfw) {
        nsfwArr = nsfwarr.split(',');
        nsfwArr = nsfwArr.map((i) => parseInt(i));
    }
    const images = [];
    gallery.map((item, i) => (        
        images.push({
            nsfw: nsfwArr.includes(i + 1),
            data: item.fields.file,
            full: item.fields.file.url + lightboxSettings,
            number: i + 1,
            title: props.title + ' - gallery image ' + (i + 1)
        })
    ));

    return (
        <ResponsiveGallery pageNsfw={pageNsfw}
            images={images}
            usePopup
            hover={false}
            $isPost
            metaDescription={metaDescription}
            filters={false}
        />
    );
};

//gallery on post type page (shibari, photo etc)
const PostsGallery = (props) => {
    const {
        edges,
        classes,
        lang,
        filter,
        $isPost,
        pageNsfw
    } = props;
    const images = [];

    edges.map((i) => {
        let prefix = '/';
        if (lang === 'ru') {
            prefix = '/ru/';
        }
        images.push(
            {
                nsfw: i.fields.isPrevNsfw === true ? true : false,
                url: prefix + 'shibari' + i.fields.link,
                data: i.fields.preview.fields.file,
                taglist: i.fields.taglist,
                title: i.fields.title
            }
        );
        return null;
    });
    return (
        <ResponsiveGallery pageNsfw={pageNsfw}
            images={images}
            usePopup={false}
            useLinks
            filters
            lang={lang}
            classes={classes}
            hover
            filter={filter}
            $isPost={$isPost}
        />
    );
};

export { PostGallery, PostsGallery };