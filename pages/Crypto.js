import React from 'react'
import Head from 'next/head'

import NavBar from '../components/NavBar/NavBar'
import ContentMain from '../components/Crypto/ContentMain'

const Crypto = () => {
  return (
    <div>

      <Head>
        <title>MarketValue</title>
        <meta name="description" content="Your investment's in one place" />
        <link rel="icon" href="/images/favicon.svg" />
      </Head>

        <div className='App__NavBar'>
            <NavBar />
        </div>

        <div className='App__Content'>
            <ContentMain />
        </div>

    </div>
  )
}

export default Crypto