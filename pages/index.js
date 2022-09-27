import Head from 'next/head'
import NavBarDesktop from '../components/NavBar/NavBarDesktop';
import NavBarMobile from '../components/NavBar/NavBarMobile';
import TopBar from '../components/mainApp/TopBar';
import TrendingCryptoBlock from '../components/mainApp/TrendingCryptoBlock';

export default function Home() {
  return (
    <div>

      <Head>
        <title>MarketValue</title>
        <meta name="description" content="Your investment's in one place" />
        <link rel="icon" href="/images/favicon.svg" />
      </Head>

      <div className='App__Header'>
          <NavBarDesktop />
          <NavBarMobile />
      </div>
      <div className="App__Content">

          <TopBar />
          <TrendingCryptoBlock />

      </div>
    </div>
  )
}
