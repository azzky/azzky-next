import { useState, useEffect, useCallback } from 'react';

function useWidth() {
    const [width, setWidth] = useState(null);
    const [isVertical, setIsVertical] = useState(false);

    const updateWidth = useCallback(() => {
        if (typeof window !== 'undefined') {
            const windowWidth = window.innerWidth;
            const height = window.innerHeight;
            
            setWidth(windowWidth);
            localStorage.setItem('window-width', windowWidth.toString());
            
            const vertical = height > windowWidth;
            setIsVertical(vertical);
            localStorage.setItem('window-is-vertical', vertical.toString());
        }
    }, []);

    useEffect(() => {
        updateWidth();
        window.addEventListener('resize', updateWidth);
        window.addEventListener('orientationchange', updateWidth);
        return () => {
            window.removeEventListener('resize', updateWidth);
            window.removeEventListener('orientationchange', updateWidth);
        };
    }, [updateWidth]);

    return {
        width,
        isVertical
    };
}

export default useWidth;
