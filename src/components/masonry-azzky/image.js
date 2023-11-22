import Image from "next/image"

export const SfwOrNsfwImage = ({
    img: {
        nsfw,
        data,
        title
    },
    pageNsfw
}) => {
    const state = !nsfw || pageNsfw;
    const props = {
        itemProp: state ? "contentUrl" : null,
        src: data.url,
        width: state ? 400 : 15,
        height: state ? 400 : 15,
        className: state ? null : 'nsfwImage'
    };
    return (
        <Image {...props} alt={title}/>
)}