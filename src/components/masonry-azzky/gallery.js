import { array, bool, func, shape, string } from 'prop-types';

import ImagesLightBox from '../gallery/lightbox';
import Filters from './filters';
import useMasonry from './useMasonry';
import { GalleryColumn } from './column';
import 'react-image-lightbox/style.css';
import * as classes from './gallery.module.scss';

const ResponsiveGallery = ({
    images,
    useLightBox,
    useLinks,
    hover,
    filters,
    filter,
    lang,
    pageNsfw,
    metaDescription,
    $isPost
}) => {
    const {
        settings,
        lightBoxVal,
        handleFilterChange,
        lightBoxDispatch,
        uniqueArr,
        activeFilterName,
        imgSubArray,
        getWidth
    } = useMasonry({
        useLinks,
        hover,
        filters,
        filter,
        $isPost,
        images,
        useLightBox
    });
    return (
        <>
            {useLightBox && lightBoxVal.isOpen && (
                <ImagesLightBox
                    imagesLightbox={images}
                    photoIndex={lightBoxVal.photoIndex}
                    lightBoxDispatch={lightBoxDispatch}
                    pageNsfw={pageNsfw}
                />
            )}
            {!$isPost && (
                <Filters uniqueArr={uniqueArr}
                    handleFilterChange={handleFilterChange}
                    lang={lang}
                    activeFilter={activeFilterName}/>
            )}
            <section
                className={$isPost ? classes.postRoot : classes.root}
            >
                {getWidth && imgSubArray.map((column, index) => (
                    <GalleryColumn
                        column={column}
                        index={index}
                        settings={settings}
                        key={index}
                        metaDescription={metaDescription}
                        pageNsfw={pageNsfw}/>
                ))}
            </section>
        </>
    );
};

export default ResponsiveGallery;

ResponsiveGallery.propTypes = {
    images: array,
    useLightBox: func,
    useLinks: func,
    hover: bool,
    filters: shape([
        string
    ]),
    filter: string,
    lang: string,
    pageNsfw: bool,
    metaDescription,
    $isPost: bool
};