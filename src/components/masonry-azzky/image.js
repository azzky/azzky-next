import Image from 'next/image';
import { bool } from 'prop-types';
import contentfulLoader from '@/components/contentfulImage';

export const SfwOrNsfwImage = ({
    img: {
        nsfw,
        data: {
            url,
            details
        },
        title
    },
    pageNsfw,
    priority
}) => {
    const state = !nsfw || pageNsfw;
    const baseWidth = state ? 400 : 15;
    const real = details?.image;
    const height = real?.width
        ? Math.round(baseWidth * (real.height / real.width))
        : baseWidth;
    const props = {
        itemProp: state ? 'contentUrl' : null,
        src: url,
        width: baseWidth,
        height,
        className: state ? null : 'nsfwImage',
        quality: 95,
        priority: priority ? true : undefined,
        loading: priority ? 'eager' : undefined
    };
    return (
        <Image {...props} loader={contentfulLoader} alt={title}/>
    );
};

SfwOrNsfwImage.propTypes = {
    pageNsfw: bool,
    priority: bool
};