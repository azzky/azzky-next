import Link from 'next/link';
import { FormattedMessage } from 'react-intl';

import * as classes from './related.module.scss';

import { SfwOrNsfwImage } from '@/components';

const RelatedPost = (props) => {
    const {
        post: {
            title,
            link,
            isPrevNsfw,
            preview
        },
        pageNsfw
    } = props;
    const isVertical = preview.fields.file.details.image.height > preview.fields.file.details.image.width;
    const imageClass = (isPrevNsfw && !pageNsfw) ?
        isVertical ? classes.imageNsfwV : classes.imageNsfw : '';

    return (
        <div className={imageClass}>
            <Link href={'/shibari' + link}>
                <SfwOrNsfwImage pageNsfw={pageNsfw}
                    img={{ data: preview.fields.file, nsfw: isPrevNsfw && !pageNsfw, title: title }}/>
            </Link>
        </div>
    );
};

const RelatedPosts = ({
    prev,
    next,
    pageNsfw
}) => {
    return (
        <>
            <h2 className={classes.title}>
                <FormattedMessage id="related.title"/>
            </h2>
            <div className={classes.root}>
                {prev && (
                    <RelatedPost post={prev}
                        pageNsfw={pageNsfw}
                        title="prev"
                    />
                )}
                {next && (
                    <RelatedPost post={next}
                        pageNsfw={pageNsfw}
                        title="next"
                    />
                )}
            </div>
        </>
    );
};

export default RelatedPosts;