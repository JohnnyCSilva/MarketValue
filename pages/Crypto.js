import React from 'react'
import NavBar from '../components/NavBar/NavBar'
import ContentMain from '../components/Crypto/ContentMain'

const Crypto = () => {
  return (
    <div>

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