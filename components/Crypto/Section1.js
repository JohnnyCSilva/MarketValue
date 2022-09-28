import React, { useState, useEffect } from 'react'
import axios from 'axios'
import CryptoTable from './CryptoTable';

const Section1 = () => {

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

    const [coins, setCoins] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
      axios
        .get(
          'https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&order=market_cap_desc&per_page=6&page=1&sparkline=false'
          )
        .then(res => {
            setcoins(res.data);
            console.log(res.data);
        })
            .catch(error => console.log(error));
    }, []);
    const handleChange = e => {
        setSearch(e.target.value);
      };
    
      const filteredCoins = coins.filter(coin =>
        coin.name.toLowerCase().includes(search.toLowerCase())
      );

  return (
    <div className="crypto__section1__container">
            <div className="crypto__section1__header">
                <h1>Crypto Currency</h1>
                <p>
                The list on the bottom has all the crypto assets you can add to your portfolio. 
                <br/>
                {randomPhrase}
                </p>
            </div>
            <div className="crypto__section1__search">
                <div className="crypto__section1__search__container">
                    <i className='pi pi-search' />
                    <input type='text' placeholder='Search for a Crypto Currency' onChange={handleChange}/>
                </div>
                <div className="crypto__section1__powered_section">
                    <img src="/images/coingecko.png" alt=""/>
                    <p>Powered by Coingecko</p>
                </div>
            </div>
            <div className='crypto__section1__row__container'>
                {coins?.map((coin) => (
                    <CryptoTable
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
  )
}

export default Section1