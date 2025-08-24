import { array, bool, string } from 'prop-types';
import { Gallery } from 'react-photoswipe-gallery';

import Filters from './filters';
import useMasonry from './useMasonry';
import { GalleryColumn } from './column';
import 'photoswipe/style.css';
import * as classes from './gallery.module.scss';

const ResponsiveGallery = ({
    images,
    usePopup,
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
        handleFilterChange,
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
        usePopup
    });
    return (
        <>
            {!$isPost && (
                <Filters uniqueArr={uniqueArr}
                    handleFilterChange={handleFilterChange}
                    lang={lang}
                    activeFilter={activeFilterName}/>
            )}
            <section
                className={$isPost ? classes.postRoot : classes.root}
            >
                <Gallery>
                    {getWidth && imgSubArray.map((column, index) => (
                        <GalleryColumn
                            column={column}
                            settings={settings}
                            key={index}
                            metaDescription={metaDescription}
                            pageNsfw={pageNsfw}/>
                    ))}
                </Gallery>
            </section>
        </>
    );
};

export default ResponsiveGallery;

ResponsiveGallery.propTypes = {
    images: array,
    usePopup: bool,
    useLinks: bool,
    hover: bool,
    filters: bool,
    filter: string,
    lang: string,
    pageNsfw: bool,
    metaDescription: string,
    $isPost: bool
};