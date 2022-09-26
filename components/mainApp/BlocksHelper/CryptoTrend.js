import React, { useState, useEffect } from 'react'
import $ from 'jquery'

const CryptoTrend = ({ name, price, symbol, marketcap, volume, image, priceChange }) => {

    const [chartImage, setChartImage] = useState();

    var randomImagePos = ['/images/stockGreen1.svg','/images/stockGreen2.svg','/images/stockGreen3.svg','/images/stockGreen4.svg','/images/stockGreen5.svg'];
    var chartImagePos = randomImagePos[Math.floor(Math.random()*randomImagePos.length)];
    var randomImageNeg = ['/images/stockRed1.svg','/images/stockRed2.svg','/images/stockRed3.svg','/images/stockRed4.svg','/images/stockRed5.svg'];
    var chartImageNeg = randomImageNeg[Math.floor(Math.random()*randomImagePos.length)];

    useEffect(() => {	
        $('.percentageP__crypto').each(function() {
            //console.log(name + ": " + parseFloat($(this).text()));
            if (parseFloat($(this).text()) >= 0) {
                $(this).addClass('colorGreen colorGreenLight');
                setChartImage( chartImagePos );
            } else if (parseFloat($(this).text()) <= 0) {
                $(this).addClass('colorRed colorRedLight');
                setChartImage( chartImageNeg );
            }
            
        });     
        console.log(chartImage); 
    },[]);

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