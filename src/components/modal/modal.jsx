import config from "./config"

import * as classes from './modal.module.scss'
import { bool, func, string } from "prop-types"
import { FormattedMessage } from "react-intl"

const Modal = (props) => {
    const {
        showModal,
        isShowModal,
        paddingTopValue,
        size
    } = props

    const style = {
        '--height': paddingTopValue + 'px',
        '--width': size + 'px'
    }

    return (
        <div role="dialog"
            className={isShowModal ? classes.rootActive : classes.root}>
            <div style={style}
                className={classes.content}>
                {props.children}
            </div>
            <button className={classes.closeButton}
                onClick={() => showModal(false)}>
                <span className="visually-hidden">
                    <FormattedMessage id="modal.closeButton"/>
                </span>
            </button>
        </div>
    )
}

const ModalButton = (props) => {
    const { showModal, node_locale } = props
    return (
        <button onClick={() => showModal(true)}
            className={classes.button}>
            {config.buttonText[node_locale]}
        </button>
    )
}

export { Modal, ModalButton }

Modal.propTypes = {
    showModal: func,
    isShowModal: bool,
    paddingTopValue: string,
    size: string
}