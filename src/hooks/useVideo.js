import { useEffect, useState } from 'react';

export const testRobots = () => {
    let userAgent = '';
    if (typeof window !== 'undefined') {
        userAgent = navigator.userAgent;
    }
    const robots = new RegExp([
        /bot/,/spider/,/crawl/,                            // GENERAL TERMS
        /APIs-Google/,/AdsBot/,/Googlebot/,                // GOOGLE ROBOTS
        /mediapartners/,/Google Favicon/,
        /FeedFetcher/,/Google-Read-Aloud/,
        /DuplexWeb-Google/,/googleweblight/,
        /bing/,/yandex/,/baidu/,/duckduck/,/yahoo/,        // OTHER ENGINES
        /ecosia/,/ia_archiver/,
        /facebook/,/instagram/,/pinterest/,/reddit/,       // SOCIAL MEDIA
        /slack/,/twitter/,/whatsapp/,/youtube/,
        /semrush/,                                         // OTHER
        /Lighthouse/
    ].map((r) => r.source).join('|'),'i');               // BUILD REGEXP + "i" FLAG

    return robots.test(userAgent);
};

export const useVideo = () => {
    const isARobot = testRobots();
    const [renderVideo, setRenderVideo] = useState(false);

    useEffect(() => {
        if (!renderVideo && !isARobot) setRenderVideo(true);
    }, [setRenderVideo, renderVideo, isARobot]);

    return {
        renderVideo
    };
};