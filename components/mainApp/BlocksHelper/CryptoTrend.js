import React from 'react'
import $ from 'jquery'

const CryptoTrend = ({ name, price, symbol, marketcap, volume, image, priceChange }) => {
    //pi-arrow-down-right
    //pi-arrow-up-right

    $('.percentageP__crypto').each(function() {
        if (parseFloat($(this).text()) >= 0) {

          $(this).addClass('colorGreen colorGreenLight');
          //$(".chartValue").addClass('pi-arrow-up-right colorRed');

        } else if (parseFloat($(this).text()) < 0) {

          $(this).addClass('colorRed colorRedLight');

          //$(".chartValue").addClass('pi-arrow-down-right');
        }
    });

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
            <img src="/images/stockGreen2.svg" alt='Graph'/>
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