import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { LineChart, Line, ResponsiveContainer, Tooltip, YAxis } from 'recharts';
import moment from 'moment';


const SectionDashboard = () => {

    const [sparkline, setSparkline] = useState([]);
    const [portValue, setPortValue] = useState([]);
    const [value, setValue] = useState();

    const interval = "&interval=daily";
    

    useEffect(() => {
        axios
          .get(
            `https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=eur&days=24${interval}`
            )
          .then(res => {
                setSparkline(res.data.prices.map(value => ({ x: moment(value[0]).format('MMMM Do YYYY'), y: (value[1].toFixed(2)) })));
                console.log(res.data.prices);
          })
              .catch(error => console.log(error));
      }, []);

    /*function makeGraph() {
        axios.get(`https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=eur&days=${value}`).then(res => {
            setSparkline(res.data.prices);
        }).catch(error => console.log(error));
    }*/

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            setPortValue(payload[0].value);
          return (
            <div className="custom-tooltip">
            </div>
          );
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
                    <p>Total Invested Value</p>
                    <h1>{portValue}<span> €</span></h1>
                </div>
                <div className='dashboard__graph__right'>
                    <div className="graph__options">
                        <p>1d</p>
                        <p>7d</p>
                        <p>1m</p>
                        <p>3m</p>
                        <p>6m</p>
                        <p>1y</p>
                        <p>All</p>
                    </div>                
                </div>
            </div>
            <div className='dashboard__graph'>
                <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={sparkline}>
                        <YAxis dataKey="y" domain={[18500, 20500]} tickLine={false} interval="preserveStartEnd"/>
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