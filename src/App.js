import './App.css';
import React from'react';
import NavBarDesktop from './Components/NavBar/NavBarDesktop';
import NavBarMobile from './Components/NavBar/NavBarMobile';
import 'primeicons/primeicons.css';

function App() {
  return (
    <div className='App'>
      <div className='App__Body'>

        <div className='App__Header'>
          <NavBarDesktop />
          <NavBarMobile />
        </div>
        <div className="App__Content">

        </div>
      </div>
    </div>
  );
}

export default App;
