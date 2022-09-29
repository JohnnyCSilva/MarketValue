import React from 'react'

const MobileNav = () => {
  return (
    <div className='MobileNav__container'>
        <div className='MobileNav__content'>
                <a href='/' className='mobile__link active' id='home__mobile'>
                   <img src="/images/favicon.svg" alt="Markets"/>
                   <p> Home </p>
                </a>
                <a href='/Crypto' className='mobile__link' id='search__mobile'>
                   <i className='pi pi-search'></i>
                   <p> Explore </p>
                </a>
                <a href='/' className='mobile__link' id='portfolio__mobile'>
                   <i className='pi pi-chart-pie'></i>
                   <p> Portfolio </p>
                </a>
        </div>
    </div>
  )
}

export default MobileNav