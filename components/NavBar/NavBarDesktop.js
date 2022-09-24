import React from 'react'

const NavBarDesktop = () => {
  return (
    <div className='navBar__content'>
        <div className='navBar__logo'>
            <img src="/images/favicon.svg" alt='Logo' />
        </div>
        <div className='navBar__links'>
          <a href="#" className="activeDesktop">
            <i className='pi pi-th-large'></i>
          </a>
          <a href="#">
          <i className="pi pi-heart"></i>
          </a>
          <a href="#">
          <i className="pi pi-chart-pie"></i>
          </a>
          <a href="#">
            <i className="pi pi-chart-line"></i>
          </a>
          <a href="#">
            <i className="pi pi-bitcoin"></i>
          </a>
        </div>
        <div className="navBar__Responsivive">
          <a href="#" className="activeTopBar">
              <i className="pi pi-user"></i>
            </a>
            <a href="#">
              <i className='pi pi-cog'></i>
            </a>
        </div>
    </div>
  )
}

export default NavBarDesktop