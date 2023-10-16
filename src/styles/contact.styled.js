import styled from "styled-components"
import { MobileWidth } from '@/constants'

export const Form = styled.form`
    display: grid;
`

export const Wrapper = styled.div`
    padding: 0 15px;

    @media (min-width: ${MobileWidth}px) {
        display: grid;
        grid-auto-flow: column;
        justify-content: center;
        gap: 40px;
        grid-template-columns: repeat(2, 450px);
    }
`
export const Column = styled.section`
    inline-size: 100%;
`
export const Links = styled.div`
    display: grid;
    grid-auto-flow: column;
    gap: 40px;
    padding: 30px 10px;
    justify-content: start;
`
export const Hr = styled.hr`
    margin: 1em 0;
`
export const Submit = styled.button`
    background-color: var(--color-black);
    color: var(--color-white);
    text-transform: uppercase;
    padding: 1em;
    margin: 1em 0;
    font-weight: 500;
`
export const Message = styled.textarea`
    padding: 10px;
    resize: vertical;
`
export const Input = styled.input`
    border-radius: 0;
    margin-block-end: 1em;
    border-width: 1px;
    padding: 10px;
`
export const IconGroup = styled.div`
    display: flex;
`