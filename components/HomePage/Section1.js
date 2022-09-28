import React from 'react'

const Section1 = () => {
  return (
    <div className="section1__container">
            <div className="section1__header">
                <h1>Manage all of Your Investments in one Place</h1>
                <p>
                MarketValue is the easiest, safest and fastest way for you to control all of your assets. 
                    <br/>
                Our goal is to give you a way to have your investments in one place. 
                </p>
            </div>
            <div className="section1__search">
                <div className="section1__search__container">
                    <i className='pi pi-search' />
                    <input type='text' placeholder='Search a Stock, ETF or a Crypto Currency'/>
                </div>
                <div className="section1__powered_section">
                    <img src="/images/coingecko.png" alt=""/>
                    <p>Powered by Coingecko</p>
                </div>
            </div>
            <div className='section1__row__container'>
                <a href="">
                    <h1> Crypto</h1>
                </a>
                <a href="">
                    <h1> Stocks</h1>
                </a>
                <a href="">
                    <h1> ETF's</h1>
                </a>
            </div>
    </div>
  )
}

export default Section1