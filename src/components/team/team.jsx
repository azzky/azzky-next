import React, { Fragment } from "react"
import Maindata from '@/constants'
import Link from 'next/link'
import SocialLink from "@/components/socialIcon/socialIcon"
import { FormattedMessage } from "react-intl"

import * as classes from './team.module.scss'

const me = 'Azzky'

const Models = (props) => {
    const { models, lang } = props
    return(models ?
        <p>
            <FormattedMessage id="team.modelsText"
                values={{ count: models.length }}/>
            {models.map((model,i) => (
                <Fragment key={i}>
                    <Model model={model.fields}
                    lang={lang} />
                    {models.length > 1 && i !== models.length - 1 ?
                        <FormattedMessage id="team.modelsSpacer"
                            values={{count: models.length - i}}/>
                    : ''}
                </Fragment>
                ))}
        </p>
        : null
    )
}

const Model = (props) => {
    const {
        model: {
            name,
            url
        },
        lang
    } = props
    const prefix = lang === 'en' ? '' : '/ru'
    return(
        <>
            <Link href={prefix + '/model/' + name.replaceAll(' ', '_')}>
                {name}
            </Link>
            <SocialLink link={url}/>
        </>
    )
}

const AllByMe = () => {
    return(
        <p>
            <FormattedMessage id="team.allByMe"
                values={{ name: me }}/>
            <SocialLink link={Maindata.socials.instagram}/>
        </p>
    )
}

const Nawashi = (props) => {
    const { nawashi } = props
    const { url, name } = nawashi || {}
    return(
    <p>
        <FormattedMessage id="team.nawashi"
                values={{ name: name || me }}/>
        <SocialLink link={url ? url : Maindata.socials.instagram}/>
    </p>
    )
}

const Photographer = (props) => {
    const { photographer, lang }  = props
    const prefix = lang === 'en' ? '' : '/ru'
    return( photographer ? 
        <p>
            <FormattedMessage id="team.photographer"/>
            <Link href={prefix + '/photographer/' + photographer.name.replaceAll(' ', '_')}>
                {photographer.name}
            </Link>
            <SocialLink link={photographer.url}/>
        </p>
        : null
    )
}

const Muah = (props) => {
    const { muah, lang } = props
    const prefix = lang === 'en' ? '' : '/ru'
    return(muah ? 
        <p>
            <FormattedMessage id="team.muah"/>
            <Link href={prefix + '/muah/' + muah.name.replaceAll(' ', '_')}>
                {muah.name}
            </Link>
            <SocialLink link={muah.url}/>
        </p>
        : null
    )
}

const Team = (props) => {
    const {
        models,
        lang,
        photographer,
        nawashi,
        muah
    } = props
    return(
        <div className={classes.root}>
            <Models models={models} lang={lang} />
            {photographer && photographer.name === Maindata.author ?
                <AllByMe lang={lang} />
            :
                <>
                    {photographer && 
                    <Photographer photographer={photographer}
                                  lang={lang} />}
                    <Muah muah={muah} 
                          lang={lang} />
                    <Nawashi nawashi={nawashi} />
                </>
            }
        </div>
    )
}

export default Team