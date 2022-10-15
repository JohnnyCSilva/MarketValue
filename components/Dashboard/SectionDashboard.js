import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { LineChart, Line, ResponsiveContainer, Tooltip, YAxis } from 'recharts';
import moment from 'moment';


const SectionDashboard = () => {

    const [sparkline, setSparkline] = useState([]);
    const [portValue, setPortValue] = useState();
    const [value, setValue] = useState(null);
    const [interval, setInterval] = useState("daily");    

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            setPortValue(payload[0].value);

          return
        }
        return null;
    };

    // Le a base de dados pelas cryptos que ele tem
    // Apresenta valor total das moedas todas que tem
    // Soma o valor de todas as moedas e coloca para fazer um grafico 

    useEffect(() => {
        console.log("rere")
        if (value) {
            console.log(value);
            axios.get(`https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=eur&days=${value}&interval=${interval}`).then(res => {
            setSparkline(res.data.prices.map(value => ({ x: moment(value[0]).format('MMMM Do YYYY'), y: (value[1].toFixed(2)) })));
            }).catch(error => console.log(error));
        } else {
            axios.get(`https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=eur&days=24&interval=daily`).then(res => {
                setSparkline(res.data.prices.map(value => ({ x: moment(value[0]).format('MMMM Do YYYY'), y: (value[1].toFixed(2)) })));
            }).catch(error => console.log(error));
        }
    }, [value]);


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
                        <p onClick={(e) => {setValue(1); setInterval("")}}>24h</p>
                        <p onClick={(e) => {setValue(7); setInterval("")}}>7d</p>
                        <p onClick={(e) => {setValue(30); setInterval("daily")}}>30d</p>
                        <p onClick={(e) => {setValue(90); setInterval("daily")}}>90d</p>
                        <p onClick={(e) => {setValue(356); setInterval("daily")}}>356d</p>
                        <p onClick={(e) => {setValue("max"); setInterval("yearly")}}>All</p>
                    </div>                
                </div>
            </div>
            <div className='dashboard__graph'>
                <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={sparkline}>
                        <YAxis dataKey="y" domain={['auto', 'auto']}  interval="preserveend"/>
                        <Line dot={false} type="monotone" dataKey="y" stroke="var(--mainColor)" />~
                        <Tooltip content={<CustomTooltip />} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    </div>
  )
}

export default SectionDashboard