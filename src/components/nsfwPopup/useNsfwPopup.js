import { useCallback } from "react"


export const useNsfwPopup = ({
    setShowNsfwPopup, setNsfw, setToggle
}) => {
    const handleclose = useCallback(() => {
        setShowNsfwPopup(false)
    }, [setShowNsfwPopup])
    const handleconfirm = useCallback(() => {
        setNsfw()
        setShowNsfwPopup(false)
        setToggle(true)
    }, [setNsfw, setShowNsfwPopup, setToggle])
    return {
        handleclose,
        handleconfirm
    }
}