import { FormattedMessage } from "react-intl"

import * as classes from './filters.module.scss'

const Filters = (props) => {
    const uniqueArr = props.uniqueArr.length > 0 ? props.uniqueArr : []
    return(
        <section className={classes.root}>
        {uniqueArr.map((filter, index) => (
            <button type="button"
                        key={index}
                        onClick={() => props.handleFilterChange(filter)}
                        className={classes.item}
                        disabled={props.activeFilter === filter}>
                <FormattedMessage id={'filters.'+filter}/>
            </button>
        ))}
        </section>
    )
}

export default Filters