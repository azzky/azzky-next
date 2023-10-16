import styled from "styled-components"
import { HeroElement } from '@/styles/globalStyled'
import { MobileWidth } from '@/constants'

export const Main = styled.main`
    min-block-size: 100dvh;
    background-color: ${props => props.$isHome ? 'transparent' : 'var(--color-white)'};
    padding-block-start: ${props => props.$isHero ? '0' : 'var(--header-height)'};
`;

export const HeroWrapper = styled.section`
    position: relative;
    inline-size: 100%;
    block-size: 100dvh;
    z-index: 1;
    top: 0;
    left: 0;
    overflow: hidden;

    &.nsfw {
        &::after {
            content: '';
            ${props=>props.$isVertical ? `
            background-image: url(/holder-small_tr.png);
            ` : `
            background-image: url(/holder-big_tr.png);
            `}
            position: absolute;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            background-size: contain;
            background-position: center;
            background-repeat: no-repeat;
            z-index:-1;
        }
    }

    &::before {
        content: '';
        display: block;
        block-size: 100%;
        background-color: rgba(0,0,0,0.2);
    }

    .gatsby-image-wrapper,
    .nsfwImage {
        z-index: -2;
        position: absolute !important;
        top: 0;
        inline-size: 100%;
        block-size: 100%;
    }

    .nsfwImage {
        object-fit: cover;
    }
`;
export const HeroContent = styled.div`
    position: absolute;
    top: 0;
    padding: 70px 15px 45px;
    max-block-size: 100dvh;
    overflow: hidden;
    row-gap: 20px;
    block-size: 100%;
    ${props=>props.$isPost ? `
        grid-template-areas:
            'description'
            'team'
            'share';
        grid-template-rows: 1fr auto auto; 

    `:`
        grid-template-areas:
            'h1'
            'text'
            'team'
            'share';
        grid-template-rows: repeat(4, min-content);
    `}
    ${props => props.$is404 || props.$isSuccess ? `
        display: flex;
        flex-direction: column;
        align-items: center;
        inline-size: 100%;
    `:`
        display: grid;
    `}

    & > div {
        overflow-x: auto;
    } 

    @media (min-width: ${MobileWidth}px) {
        position: ${props => props.$is404 || props.$isSuccess ? 'absolute' : 'initial'};
        ${props => props.$is404 && `
            right: 204px;
            left: auto;
            inline-size: auto;
            top: 80px;
            text-align: center;
            block-size: auto;
        `}
        ${props => props.$isSuccess && `
            left: auto;
            inline-size: 100%;
            top: 0;
            text-align: center;
        `}
    }
`;
export const HeroTitle = styled.h1`
    grid-area: h1;
    ${props => props.$is404 && `
        font-weight: 900;
        font-size: var(--font-size-150);
        margin-block-end: 30px;
    `}
    ${props => props.isSuccess && `
        font-size: var(--font-size-45);
    `}

    @media (min-width: ${MobileWidth}px) {
        top: 150px;
        font-size: ${props => props.$is404 ? '12.5rem' : '2.125rem'};
        ${HeroElement}
        ${props => props.$is404 || props.$isSuccess ? `
            position: static;
        `: null}
        ${props => props.$is404 && `
            margin-block-end: 6px;
        `}
        ${props => props.$isSuccess && `
            font-size: var(--font-size-70);
            margin-block-start: 100px;
        `}
    }
`;
export const HeroDescription = styled.div`
    grid-area: text;

    a {
        color: inherit;
        text-decoration: underline;
    }

    @media (min-width: ${MobileWidth}px) {
        top: 280px;
        ${HeroElement}
        max-inline-size: 810px;
        ${props => !props.$is404 && !props.$isSuccess && `
            block-size: 100%;
        `}
        ${props => props.$isSuccess && `
            position: static;
        `}
    }
`;
export const HeroVideoWrapper = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    inline-size: 100%;
    block-size: 100%;
    z-index: -2;
    pointer-events: none;
    overflow: hidden;
    background-color: var(--color-white);
`;
export const HeroVideo = styled.video`
    inline-size: 100vw;
    min-block-size: 100dvh;
    block-size: 75.10vw; /* Given actual ratio, 18.7/24.9*100 = 75.10 */
    min-inline-size: 133.15dvh; /* Given actual ratio, 24.9/18.7*100 = 133.15 */
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    object-fit: cover;
    // filter: grayscale(1); /* comment on if wanted color */
`;