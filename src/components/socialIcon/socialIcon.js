import { getSocial } from "@/utils"

const SocialLink = ({link}) => {
    let social = getSocial(link)
    if (!link) return null
    return (
        <a href={link}
            rel="me noreferrer"
            target="_blank"
            aria-label={social +' link'}>
            <svg width={24}
                height={24}>
                <use href={'#'+social}/>
            </svg>
        </a>
    )
}

export default SocialLink