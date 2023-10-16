import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="manifest" href="/static/manifest.json" />
        <link rel="manifest" href="/static/site.webmanifest" />
        <link rel="shortcut icon" href="/static/favicon-32x32.png"/>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
