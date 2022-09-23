import Head from 'next/head'
import NavBarDesktop from '../components/NavBar/NavBarDesktop';
import NavBarMobile from '../components/NavBar/NavBarMobile';
import 'primeicons/primeicons.css';

export default function Home() {
  return (
    <div>

      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.svg" />
      </Head>

      <div className='App__Header'>
          <NavBarDesktop />
          <NavBarMobile />
      </div>
      <div className="App__Content"></div>

      
    </div>
  )
}
