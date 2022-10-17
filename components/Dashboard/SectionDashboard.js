import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { LineChart, Line, ResponsiveContainer, Tooltip, YAxis } from 'recharts';
import moment from 'moment';
import { collection, query, where, getDocs, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from '../../config/Firebase'
import { useAuthValue } from '../../config/AuthContext'

const SectionDashboard = () => {

    const { currentUser } = useAuthValue();
    let totalPrice = 0;
    let currentPrice = 0;
    const [portfolioValue, setPortfolioValue] = useState();
    const [sparkline, setSparkline] = useState([]);
    const [total, setTotal] = useState();
    const [value, setValue] = useState(null);
    const [date, setDate] = useState(null);
    const [interval, setInterval] = useState("daily");    

    useEffect(() => {
        if (currentUser) {
            getCoinsFromUser();
        }
    },[currentUser])
   
    const getCoinsFromUser = async() =>{
        const queryDB = query(collection(db, "coins"), where("userId", "==", currentUser.uid));
        const getCoinsFromUserDB = await getDocs(queryDB);
        getCoinsFromUserDB.forEach((doc) => {
            var currentCoin = doc.data().id;
            axios.get(`https://api.coingecko.com/api/v3/coins/${currentCoin}?tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`).then(res => {
                totalPrice += res.data.market_data.current_price.eur;
                setPortfolioValue((totalPrice).toFixed(2));  
                /*addDoc(collection(db, "makeGraph"), {
                    userId: currentUser.uid, 
                    id: res.data.id,
                    symbol: res.data.symbol,
                    name: res.data.name,
                    current_price: res.data.market_data.current_price.eur,
                    timestamp: serverTimestamp(),
                });      */
            })  
        }); 
        
    }

    useEffect((currentUser, totalPrice) => {
        if (currentUser, totalPrice) {
            getCoinsToMakeGraph();
        }
    },[currentUser,totalPrice])
    // NOT WORKING 

    const getCoinsToMakeGraph = async() => {
        console.log("teste");
        const queryGraph = query(collection(db, "makeGraph"), where("userId", "==", currentUser.uid));
        const makeGraphWithTimeStamp = await getDocs(queryGraph);
        makeGraphWithTimeStamp.forEach((doc) => {
            console.log("teste")
            var currentTimeStamp = doc.data().timeStamp;
            // faz array de tempo e coloca no X
            currentPrice += doc.data().current_price;
            // faz array de tempo e coloca no Y
            setSparkline({ x: moment(currentTimeStamp).format('MMMM Do YYYY, h:mm:ss a'), y: (currentPrice).toFixed(2) });
            console.log(sparkline); 
        });
    }

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            setTotal(payload[0].value);
            setDate(payload[0].payload.x)
        }
    };

    /*useEffect(() => {
        if (value) {
            axios.get(`https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=eur&days=${value}&interval=${interval}`).then(res => {
            setSparkline(res.data.prices.map(value => ({ x: moment(value[0]).format('MMMM Do YYYY, h:mm:ss a'), y: (value[1].toFixed(2))})));
            }).catch(error => console.log(error));
        } else {
            axios.get(`https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=eur&days=24&interval=daily`).then(res => {
                setSparkline(res.data.prices.map(value => ({ x: moment(value[0]).format('MMMM Do YYYY'), y: (value[1].toFixed(2)) })));
            }).catch(error => console.log(error));
        }
    }, [value]);*/


  return (
    <div  className="dashboard__section1__container">
        <div className="dashboard__section1__header">
            <h1>Dashboard</h1>
        </div>
        <div className="dashboard__graph__container">
            <div className="dashboard__graph__header">
                <div className="dashboard__graph__left">
                    <p>{date}</p>
                    <h1>{total} total: {portfolioValue}<span> €</span></h1>
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