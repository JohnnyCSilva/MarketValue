import React from 'react'
import $ from 'jquery'

const CryptoTrend = ({ name, price, symbol, marketcap, volume, image, priceChange }) => {

  return (
    <div className='blockCrypto__main'>
        <div className='blockCrypto__header'>
            <a href="#" className="logo_img">
                <img src={image} alt='Logo' />
            </a>
            <div className='blockCrypto__title'>
                <h2>{name}</h2>
                <p>{symbol}</p>
            </div>
        </div>
        <div className='blockCrypto__graph'>
            <img src={chartImage} alt='Graph' className='graph__img'/>
        </div>
        <div className='blockCrypto__info'>
            <div className='blockCrypto__percentage'>
                <p className='percentageP__crypto'>{priceChange.toFixed(2)}%</p>
                <span></span>
            </div>
            <h2>{(price).toFixed(2)}€</h2>
        </div>
    </div>
  )
}

export default CryptoTrend