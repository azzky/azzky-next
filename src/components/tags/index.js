import Link from 'next/link'

import * as classes from './tags.module.scss'

const Tags = ({tags, lang}) => {
    if (!tags) return null
    return (
        <div className={classes.root}>
            {tags && tags.map(tag => {
                const formattedTag = tag.replaceAll(' ', '_')
                const prefix = lang === 'ru' ? '/ru' : ''
                return (
                    <Link href={prefix + '/tag/' + formattedTag}
                        key={formattedTag}>
                        {'#'+tag}
                    </Link>
                )
            })}
        </div>
    )
}

export default Tags