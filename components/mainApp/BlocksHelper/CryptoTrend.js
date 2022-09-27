import React from 'react'
import $ from 'jquery'

const CryptoTrend = ({ name, price, symbol, marketcap, volume, image, priceChange }) => {

    var chartImage = ""

    var randomImagePos = ['/images/stockGreen1.svg','/images/stockGreen2.svg','/images/stockGreen3.svg','/images/stockGreen4.svg','/images/stockGreen5.svg'];
    var chartImagePos = randomImagePos[Math.floor(Math.random()*randomImagePos.length)];
    var randomImageNeg = ['/images/stockRed1.svg','/images/stockRed2.svg','/images/stockRed3.svg','/images/stockRed4.svg','/images/stockRed5.svg'];
    var chartImageNeg = randomImageNeg[Math.floor(Math.random()*randomImagePos.length)];

    if (priceChange > 0) {
        chartImage = chartImagePos;
        $('.percentageP__crypto').css('color', 'var(--colorGreen');
        $('.percentageP__crypto').css('background-color', 'var(--colorGreenLight');
    } else {
        chartImage = chartImageNeg;
        $('.percentageP__crypto').css('color', 'var(--colorRed');
        $('.percentageP__crypto').css('background-color', 'var(--colorRedLight');
    }

    // 🔝 Resolver este problema, colocar esta função na pagina TrendingCryptoBlock.js provavelmente resolve 🔝


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