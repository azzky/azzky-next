import { useCallback, useState } from 'react';

export const useNsfwPopup = ({
    setShowNsfwPopup, setNsfw, setToggle
}) => {
    const [confirmed, setConfirmed] = useState(false);
    const handleclose = useCallback(() => {
        setShowNsfwPopup(false);
    }, [setShowNsfwPopup]);
    const handleconfirm = useCallback(() => {
        setNsfw();
        setConfirmed(true);
        setTimeout(() => {
            setShowNsfwPopup(false);
            setToggle(true);
        }, 1500);
    }, [setNsfw, setShowNsfwPopup, setToggle]);
    return {
        handleclose,
        handleconfirm,
        confirmed
    };
};