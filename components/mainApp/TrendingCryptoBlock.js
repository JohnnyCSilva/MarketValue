import React, { useState, useEffect } from 'react'
import axios from 'axios'

import CryptoTrend from './BlocksHelper/CryptoTrend'

const TrendingCryptoBlock = () => {

    const [TrendingCrypto, setTrendingCrypto] = useState()

    useEffect(() => {
      axios
        .get(
          'https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&order=market_cap_desc&per_page=6&page=1&sparkline=false'
          )
        .then(res => {
            setTrendingCrypto(res.data);
            console.log(res.data);
        })
            .catch(error => console.log(error));
    }, []);

    

  return (
    <div className='TrendingCrypto__main'>
        <div className='TrendingCrypto__container'>
            <div className='TrendingCrypto__header'>
                <h1>Trending Crypto</h1>
                <p>Today's crypto market is fire 🔥 (criar frases random para aqui)</p>
            </div>
            <div className='TrendingCrypto__content'>
                {TrendingCrypto?.map((coin) => (
                    <CryptoTrend
                        key={coin.id}
                        name={coin.name}
                        price={coin.current_price}
                        symbol={coin.symbol}
                        marketcap={coin.total_volume}
                        volume={coin.market_cap}
                        image={coin.image}
                        priceChange={coin.price_change_percentage_24h}
                    />
                ))}
            </div>
        </div>
    </div>
  )
}

export default TrendingCryptoBlock