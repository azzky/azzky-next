'use client'
import React from 'react'

import * as classes from './toggler.module.scss'

const Toggler = (props) => {
    const {
        $state,
        changeState,
        onStateLabel,
        offStateLabel        
    } = props

    return (
        <label className={$state ? classes.rootActive : classes.root}>
            <input  type="checkbox"
                    role="switch"
                    onChange={changeState}
                    defaultChecked={$state}/>
            {$state ? onStateLabel : offStateLabel}
        </label>
    )
}

export default Toggler