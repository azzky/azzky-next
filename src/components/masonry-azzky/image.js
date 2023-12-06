import Image from 'next/image';
import { bool, string } from 'prop-types';

export const SfwOrNsfwImage = ({
    img: {
        nsfw,
        data: {
            url
        },
        title
    },
    pageNsfw
}) => {
    const state = !nsfw || pageNsfw;
    const props = {
        itemProp: state ? 'contentUrl' : null,
        src: url,
        width: state ? 400 : 15,
        height: state ? 400 : 15,
        className: state ? null : 'nsfwImage',
        quality: 100
    };
    return (
        <Image {...props} alt={title}/>
    );
};

SfwOrNsfwImage.propTypes = {
    img: {
        nsfw: bool,
        data: {
            url: string
        },
        title: string
    },
    pageNsfw: bool
};