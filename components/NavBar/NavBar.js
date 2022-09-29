import React from 'react'

const NavBar = () => {
  return (
    <div className='main__header'>
        <div className='navbar__container'>
            <div className='navbar__brand'>
                <a href='/' className='navbar__brand__link'>
                    <p>MARKET VALUE</p>
                </a>
            </div>
            <div className='navbar__menu'>
                <a href='/Crypto' className='navbar__link'>
                   <p> Crypto </p>
                </a>
                <a href='/' className='navbar__link'>
                   <p> Stocks </p>
                </a>
                <a href='/' className='navbar__link'>
                   <p> ETF's </p>
                </a>
                <a href='/' className='navbar__link'>
                   <p> Portfolio </p>
                </a>
                <a href='/' className='navbar__link'>
                   <p> Learn </p>
                </a>
            </div>
            <div className='navbar__account'>
                <a href="" className='navbar__signIn'>Sign In</a>
                <a href="/SignUp" className='navbar__signUp'>Sign Up</a>
            </div>
        </div>
    </div>
  )
}

export default NavBar