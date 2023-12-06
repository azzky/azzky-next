import { useCallback, useState, useEffect } from 'react';

const useCenzorship = () => {
    let localState = false;
    let haveLocalState = false;

    const setNsfw = useCallback(() => {
        localStorage.setItem('nsfw', 'true');
    }, []);

    if (typeof window !== 'undefined') {
        localState = localStorage.getItem('nsfw') === 'true';
        haveLocalState = localStorage.getItem('nsfw')?.length > 0;
    }
    const [pageNsfw, setToggle] = useState(false);
    const [showNsfwPopup, setShowNsfwPopup] = useState(false);

    const realToggle = () => {
        setToggle((prev) => {
            localStorage.setItem('nsfw', !prev);
            return !prev;
        });
    };

    const toggleNsfw = () => {
        if (!haveLocalState) {
            setShowNsfwPopup(true);
        } else {
            realToggle();
        }
    };

    useEffect(() => {
        setToggle(localState);
    }, [localState]);

    return { pageNsfw, setToggle, toggleNsfw, showNsfwPopup, haveLocalState, setShowNsfwPopup, setNsfw };
};

export default useCenzorship;