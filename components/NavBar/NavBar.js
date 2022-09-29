import React from 'react'

const NavBar = () => {
  return (
    <div className='main__header'>
        <div className='navbar__container'>
            <div className='navbar__brand'>
                <a href='/' className='navbar__brand__link'>
                    <img src="/images/favicon.svg" alt=""/>
                    <p>MARKET VALUE</p>
                </a>
            </div>
            <div className='navbar__menu'>
                <a href='/Crypto' className='navbar__link' id='crypto__nav'>
                   <p> Crypto </p>
                </a>
                <a href='/' className='navbar__link' id='stocks__nav'>
                   <p> Stocks </p>
                </a>
                <a href='/' className='navbar__link' id='etfs__nav'>
                   <p> ETF's </p>
                </a>
                <a href='/' className='navbar__link' id='portfolio__nav'>
                   <p> Portfolio </p>
                </a>
                <a href='/' className='navbar__link' id='learn__nav'>
                   <p> Learn </p>
                </a>
            </div>
            <div className='navbar__account'>
                <i className='pi pi-user'></i>
                {/*<a href="" className='navbar__signIn'>Sign In</a>*/}
                <a href="/SignUp" className='navbar__signUp'>Sign Up</a>
            </div>
            
        </div>
    </div>
  )
}

export default NavBar