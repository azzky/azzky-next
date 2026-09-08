import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

import * as classes from './reviews.module.scss';

const ReviewCard = ({ review }) => {
    const { text, author } = review.fields;
    return (
        <li className={classes.item}>
            <blockquote className={classes.text}>
                {text && documentToReactComponents(text)}
            </blockquote>
            <footer className={classes.meta}>
                {author && <cite className={classes.author}>{author}</cite>}
            </footer>
        </li>
    );
};

export default ReviewCard;
