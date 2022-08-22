import React from 'react'
import Head from 'next/head'

export default function MetaData(props) {
  const d =
    props.language === 'en' ? props?.data?.data_en : props?.data?.data_fr

  return (
    <>
      <Head>
        <title className="capitalize">{d?.title}</title>
        <meta charSet="utf-8" />
        <meta name="description" content={d?.desc} />
        <meta name="author" content={d?.author} />
        <meta name="keywords" content={d?.keywords} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          httpEquiv="Content-Security-Policy"
          content="script-src 'nonce-{script value}' 'strict-dynamic' https: 'unsafe-eval'; img-src 'self' https://*.openstreetmap.org; frame-src *.openstreetmap.org; connect-src 'self' https://*.openstreetmap.org data: blob:"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </>
  )
}

/* istanbul ignore next */
export async function getStaticProps({ locale }) {
  return {
    props: { locale },
  }
}
