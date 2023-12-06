import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
    return (
        <Html lang="en">
            <Head>
                <link rel="manifest" href="/manifest.json"/>
                <link rel="manifest" href="/site.webmanifest"/>
                <link rel="shortcut icon" href="/favicon-32x32.png"/>
                <meta name="viewport"
                    content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=no"
                />
            </Head>
            <body>
                <Main/>
                <NextScript/>
            </body>
        </Html>
    );
}
