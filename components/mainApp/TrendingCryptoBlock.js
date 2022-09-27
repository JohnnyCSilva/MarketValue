import React, { useState, useEffect } from 'react'
import axios from 'axios'

import CryptoTrend from './BlocksHelper/CryptoTrend'

const TrendingCryptoBlock = () => {

    var randonPhraseString = [
      "Its the perfect time to buy some Bitcoin!  🪙",
      "Check some of the Ethereum news to learn more. 📝",
      "Always do your research before investing! 🧠",
      "Today's Crypto Market is fire! 🔥",
      "You should learn some of the DEFI world 😉",
      "Did you know you can play video games and earn crypto? 🤯",
      "Are you IN our OUT of Ethereum the POW? 🤔",
      "We are powered by coingecko, please god don't leed them to bankruptcy 🙏"
    ];

    const [randomPhrase, setRandomPhrase] = useState();
    var randonPhraseText = randonPhraseString[Math.floor(Math.random()*randonPhraseString.length)];
    useEffect(() => {	
      setRandomPhrase(randonPhraseText.toString()); 
    },[]);


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
                <p>{randomPhrase}</p>
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