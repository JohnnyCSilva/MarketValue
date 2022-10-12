import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { LineChart, Line, ResponsiveContainer } from 'recharts';



const SectionDashboard = () => {

    const [sparkline, setSparkline] = useState([]);
    
    const [value, setValue] = useState(30);

    useEffect(() => {
        axios
          .get(
            `https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=eur&days=30&interval=daily`
            )
          .then(res => {
                setSparkline(res.data.prices);
          })
              .catch(error => console.log(error));
      }, []);

    function makeGraph() {
        axios.get(`https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=eur&days=${value}&interval=daily`).then(res => {
            setSparkline(res.data.prices);
        }).catch(error => console.log(error));
    }

  return (
    <div  className="dashboard__section1__container">
        <div className="dashboard__section1__header">
            <h1>Dashboard</h1>
        </div>
        <div className="dashboard__graph__container">
            <div className="dashboard__graph__header">
                <div className="dashboard__graph__left">
                    <p>Total Invested Value</p>
                    <h1>22<span>€</span></h1>
                </div>
                <div className='dashboard__graph__right'>
                    <div className="graph__options">
                        <p onClick={() => { setValue(1); makeGraph(); console.log(value)}}>1d</p>
                        <p onClick={() => { setValue(7); makeGraph(); console.log(value)}}>7d</p>
                        <p onClick={() => { setValue(30); makeGraph(); console.log(value)}}>1m</p>
                        <p onClick={() => { setValue(90); makeGraph(); console.log(value)}}>3m</p>
                        <p onClick={() => { setValue(180); makeGraph(); console.log(value)}}>6m</p>
                        <p onClick={() => { setValue(365); makeGraph(); console.log(value)}}>1y</p>
                        <p onClick={() => { setValue("max"); makeGraph(); console.log(value)}}>All</p>
                    </div>                
                </div>
            </div>
            <div className='dashboard__graph'>
                <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={sparkline}>
                        <Line type="monotone" dataKey="1" stroke="var(--mainColor)" />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    </div>
  )
}

export default SectionDashboard