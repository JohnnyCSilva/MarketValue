import Head from 'next/head'
import NavBar from '../components/NavBar/NavBar'
import ContentMain from '../components/HomePage/ContentMain'
import MobileNav from '../components/NavBar/MobileNav'



export default function Home() {
  return (
    <div>

      <Head>
        <title>MarketValue</title>
        <meta name="description" content="Your investment's in one place" />
        <link rel="icon" href="/images/favicon.svg" />
      </Head>

      <div className='App__NavBar'>
        <NavBar />
        <MobileNav />
      </div>

      <div className='App__Content'>
        <ContentMain />
      </div>
      
    </div>
  )
}
