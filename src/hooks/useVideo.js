import { useState } from 'react';

export const useVideo = () => {
    const [renderVideo, setRenderVideo] = useState(false);

    return {
        renderVideo,
        setRenderVideo
    };
};