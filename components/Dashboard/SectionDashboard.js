import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { LineChart, Line, ResponsiveContainer, Tooltip, YAxis } from 'recharts';
import moment from 'moment';


const SectionDashboard = () => {

    const [sparkline, setSparkline] = useState([]);
    const [portValue, setPortValue] = useState([]);
    const [value, setValue] = useState([]);
    const [interval, setInterval] = useState("daily");    

    useEffect(() => {
        axios
          .get(
            `https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=eur&days=24&interval=daily`
            )
          .then(res => {
                setSparkline(res.data.prices.map(value => ({ x: moment(value[0]).format('MMMM Do YYYY'), y: (value[1].toFixed(2)) })));
                //console.log(res.data.prices);
          })
              .catch(error => console.log(error));
      }, []);

    function makeGraph() {
        console.log(value);
        axios.get(`https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=eur&days=${value}&interval=${interval}`).then(res => {
            setSparkline(res.data.prices.map(value => ({ x: moment(value[0]).format('MMMM Do YYYY'), y: (value[1].toFixed(2)) })));
        }).catch(error => console.log(error));
    }

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            setPortValue(payload[0].value);

          return
        }
        return null;
    };


  return (
    <div  className="dashboard__section1__container">
        <div className="dashboard__section1__header">
            <h1>Dashboard</h1>
        </div>
        <div className="dashboard__graph__container">
            <div className="dashboard__graph__header">
                <div className="dashboard__graph__left">
                    <p>Total Invested</p>
                    <h1>{portValue}<span> €</span></h1>
                </div>
                <div className='dashboard__graph__right'>
                    <div className="graph__options">
                        <p onClick={(e) => {setValue(1); setInterval(""); makeGraph()}}>24h</p>
                        <p onClick={(e) => {setValue(7); setInterval(""); makeGraph()}}>7d</p>
                        <p onClick={(e) => {setValue(30); setInterval("daily"); makeGraph()}}>30d</p>
                        <p onClick={(e) => {setValue(90); setInterval("daily"); makeGraph()}}>90d</p>
                        <p onClick={(e) => {setValue(356); setInterval("daily"); makeGraph()}}>356d</p>
                        <p onClick={(e) => {setValue("max"); setInterval("yearly"); makeGraph()}}>All</p>
                    </div>                
                </div>
            </div>
            <div className='dashboard__graph'>
                <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={sparkline}>
                        <YAxis dataKey="y" domain={['auto', 'auto']}  interval="preservend"/>
                        <Line type="monotone" dataKey="y" stroke="var(--mainColor)" />~
                        <Tooltip content={<CustomTooltip />} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    </div>
  )
}

export default SectionDashboard