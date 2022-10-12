import '../styles/App.css'
import '../styles/navbar.css'
import '../styles/contentMain.css'
import '../styles/crypto.css'
import '../styles/signUp.css'
import '../styles/dashboard.css'

import 'primeicons/primeicons.css';
import "primereact/resources/primereact.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";

import NavBar from '../components/NavBar/NavBar'
import Head from 'next/head'
import MobileNav from '../components/NavBar/MobileNav'

import { AuthProvider } from '../config/AuthContext'
import {useState, useEffect} from 'react'
import {auth} from '../config/Firebase'
import {onAuthStateChanged} from 'firebase/auth'


function MyApp({ Component, pageProps }) {

  const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user)
     })
  }, [])

  return (
    <AuthProvider value={{currentUser}}>

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
    </AuthProvider>
  )
}

export default MyApp
