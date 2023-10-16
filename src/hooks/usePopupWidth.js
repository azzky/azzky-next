const checkPopupWidth = (popupRatio) => {
    if(typeof document !== 'undefined') {
        const h = document.documentElement.clientHeight
        const w = document.documentElement.clientWidth
        let maximumHeight, popupWidth

        if(h < w || h === w) {
            maximumHeight = h * 0.8
            popupWidth = maximumHeight / (popupRatio.w/popupRatio.h)
        }
        if(h > w) { // mobile
            popupWidth = w
            maximumHeight = w * (popupRatio.w/popupRatio.h)
        }

        return {maximumHeight, popupWidth}
    }
}

export default checkPopupWidth