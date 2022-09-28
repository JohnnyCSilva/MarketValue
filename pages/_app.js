import '../styles/App.css'
import '../styles/navbar.css'
import '../styles/contentMain.css'
import '../styles/crypto.css'
import '../styles/signin.css'
import '../config/Firebase.js'

import 'primeicons/primeicons.css';
import "primereact/resources/primereact.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import { AuthProvider } from '../config/AuthContext';


function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  )
}

export default MyApp
