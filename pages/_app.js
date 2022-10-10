import '../styles/App.css'
import '../styles/navbar.css'
import '../styles/contentMain.css'
import '../styles/crypto.css'
import '../styles/signUp.css'
import '../config/Firebase.js'

import 'primeicons/primeicons.css';
import "primereact/resources/primereact.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";

import NavBar from '../components/NavBar/NavBar'
import Head from 'next/head'
import MobileNav from '../components/NavBar/MobileNav'

function MyApp({ Component, pageProps }) {


  return (
    <>
        <Head>
          <title>MarketValue</title>
          <meta name="description" content="Your investment's in one place" />
          <link rel="icon" href="/images/favicon.svg" />
        </Head>

        <div className='App__NavBar'>
          <NavBar />
          <MobileNav />
        </div>

        <Component {...pageProps} />
        </>
  )
}

export default MyApp
