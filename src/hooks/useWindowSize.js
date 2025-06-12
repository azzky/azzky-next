import { useState, useEffect, useCallback } from 'react';

function useWidth() {
    const [width, setWidth] = useState(() => {
        // Try to get stored value on initial render
        if (typeof window !== 'undefined') {
            const storedWidth = localStorage.getItem('window-width');
            return storedWidth ? parseInt(storedWidth, 10) : null;
        }
        return null;
    });
    
    const [isVertical, setIsVertical] = useState(() => {
        // Try to get stored value on initial render
        if (typeof window !== 'undefined') {
            const storedIsVertical = localStorage.getItem('window-is-vertical');
            return storedIsVertical === 'true';
        }
        return false;
    });

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
