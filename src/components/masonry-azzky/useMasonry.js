import { useState, useReducer, useRef, useEffect } from 'react';

import { lightBoxReducer } from './reducers';
import config from './config';

import useWidth from '@/hooks/useWindowSize';

const useMasonry = ({
    useLinks,
    hover,
    filters,
    filter,
    $isPost,
    classes,
    images,
    useLightBox
}) => {
    const allImages = images;
    // start masonry logic here
    const { width } = useWidth();
    let columnNumber = 1;
    let getWidth = false;

    const setWidth  = () => {
        if (allImages.length < columnNumber) columnNumber = allImages.length;
        getWidth = true;
    };

    switch (true) {
        case width > config.deviceXL:
            columnNumber = config.deviceXLcolumncount;
            setWidth();
            break;
        case width > config.deviceL:
            columnNumber = config.deviceLcolumncount;
            setWidth();
            break;
        case width > config.deviceM:
            columnNumber = config.deviceMcolumncount;
            setWidth();
            break;
        default:
            getWidth = true;
    }
    
    // end masonry logic here
    
    // start getting unique filters from all posts collected
    let uniqueArr = [];
    if (filters && getWidth) {
        let filterArr = [];
        for (let i = 0; i < allImages.length; i++) {
            filterArr = [...filterArr, ...allImages[i].taglist];
            uniqueArr = [...new Set(filterArr)];
            uniqueArr = uniqueArr.sort();
        }
    }

    // end getting unique filters from all posts collected
    
    // start filtering logic here
    let localFilter = filter ? filter : 'featured';
    if (typeof window !== 'undefined' && localStorage !== 'undefined') {
        if (localStorage.getItem('filter-' + classes)) {
            localFilter = localStorage.getItem('filter-' + classes);
        }
    }

    const activeFilter = useRef(localFilter);
    const [activeFilterName, setActiveFilter] = useState(activeFilter);

    const handleFilterChange = (filterValue) => {
        setActiveFilter(filterValue);
        localFilter = filterValue;
        localStorage.setItem('filter-' + classes, localFilter);
        if (typeof window !== 'undefined') {
            window.history.replaceState({}, null, 
                filterValue === 'featured' ? window.location.origin : window.location.origin + '?filter=' + filterValue
            );
        }
    };

    if (filters && !$isPost) {
        const tempArr = [...images];
        images = tempArr.filter((node) => node.taglist && node.taglist.includes(activeFilterName));
    }

    // eslint-disable-next-line unused-imports/no-unused-vars
    let imgSubArray = [...Array(columnNumber)].map((_, i) => []);

    for (let i = 0; i < images.length; i++) {
        imgSubArray[(i + columnNumber) % columnNumber].push(images[i]);
    }
    // end filtering logic here

    const [lightBoxVal, lightBoxDispatch] = useReducer(lightBoxReducer, {
        photoIndex: 0,
        isOpen: false,
    });

    const settings = {
        hover, useLightBox, lightBoxDispatch, useLinks, columnNumber
    };

    let root = {};
    if (typeof document !== 'undefined') {
        root = document?.documentElement;
    }
    root?.style?.setProperty('--column-number', columnNumber);

    useEffect(() => {
        setActiveFilter(activeFilter.current);
    }, []);

    return {
        settings,
        lightBoxVal,
        handleFilterChange,
        lightBoxDispatch,
        uniqueArr,
        activeFilterName,
        imgSubArray,
        getWidth
    };
};
export default useMasonry;