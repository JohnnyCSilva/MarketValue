import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { LineChart, Line, ResponsiveContainer, Tooltip, YAxis } from 'recharts';
import moment from 'moment';
import { collection, query, where, getDocs, addDoc, serverTimestamp, limit, orderBy  } from "firebase/firestore";
import { db } from '../../config/Firebase'
import { useAuthValue } from '../../config/AuthContext'

const SectionDashboard = () => {

    const { currentUser } = useAuthValue();
    let totalValueCrypto = 0;
    let currentPrice = 0;
    const [cryptoTotalValue, setCryptoTotalValue] = useState();

    const [sparkline, setSparkline] = useState([]);
    const [graphDays, setGraphDays] = useState();
    
    const [intervalDaysGraph, setIntervalDaysGraph] = useState("daily");    

    useEffect(() => {
        if (currentUser) {
            getCryptoCoins();
        }
    },[currentUser])
   
    const getCryptoCoins = async() =>{
        const queryDB = query(collection(db, "coins"), where("userId", "==", currentUser.uid));
        const getCoinsFromUserDB = await getDocs(queryDB);
        getCoinsFromUserDB.forEach((doc) => {
            var currentCoin = doc.data().id;
            axios.get(`https://api.coingecko.com/api/v3/coins/${currentCoin}?tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`).then(res => {

                // soma o valor atual para apresentar na variavel CryptoTotalValue
                totalValueCrypto += res.data.market_data.current_price.eur;
                setCryptoTotalValue((totalValueCrypto).toFixed(2));   

            })      
                  
        }); 
        
        //getCoinsToMakeGraph();
        
    }

    useEffect(() => {
        if (cryptoTotalValue) {
            console.log(cryptoTotalValue, "value");
            /*addDoc(collection(db, "makeGraph"), {
                userId: currentUser.uid, 
                //id: res.data.id,
                //symbol: res.data.symbol,
                //name: res.data.name,
                //current_price: res.data.market_data.current_price.eur,
                totalPrice: cryptoTotalValue,
                timestamp: serverTimestamp(),
            }); */
            getCoinsToMakeGraph();
        }
    },[cryptoTotalValue])

    const getCoinsToMakeGraph = async() => {

        let tempArray = [];

        const queryGraph = query(collection(db, "makeGraph"), where("userId", "==", currentUser.uid), orderBy("timestamp"));
        const makeGraphWithTimeStamp = await getDocs(queryGraph);
        makeGraphWithTimeStamp.forEach((doc) => {

            const tempDat = doc.data().timestamp;
            

            tempArray.push({
                x: moment(tempDat.toDate()).format("MMMM Do YYYY, h:mm:ss a"),
                y: doc.data().totalPrice,
            })
        });    

        console.log(tempArray);   
        setSparkline(tempArray);

    }

    const [graphValueDays, setGraphValueDays] = useState();
    const [graphValueEuro, setGraphValueEuro] = useState();


    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            setGraphValueEuro(payload[0].value);
            setGraphValueDays(payload[0].payload.x)
        }
    };

    // função para filtrar a data e apresentar o preço daquele momento

    /*useEffect(() => {
        if (graphDays) {
            axios.get(`https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=eur&days=${value}&interval=${IntervalDaysGraph}`).then(res => {
            setSparkline(res.data.prices.map(value => ({ x: moment(value[0]).format('MMMM Do YYYY, h:mm:ss a'), y: (value[1].toFixed(2))})));
            }).catch(error => console.log(error));
        } else {
            axios.get(`https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=eur&days=24&interval=daily`).then(res => {
                setSparkline(res.data.prices.map(value => ({ x: moment(value[0]).format('MMMM Do YYYY'), y: (value[1].toFixed(2)) })));
            }).catch(error => console.log(error));
        }
    }, [graphDays]);*/
    

    const valuePercentageIcon = "pi pi-arrow-up-right";

    const [cryptoTotalPrevious, setCryptoTotalPrevious] = useState();

    useEffect(() => {
        if(currentUser){
            getMostRecentValue();
        }
    },[currentUser]);
    const dbQuery = collection(db, "makeGraph");
    const getMostRecentValue = async() => {
        const queryDB2 = query(dbQuery, where("userId", "==", currentUser.uid), orderBy("timestamp"), limit(1));
        const RecentCoin = await getDocs(queryDB2);
        RecentCoin.forEach((doc) => {
            setCryptoTotalPrevious(doc.data().totalPrice)
        });
    }
    const cryptoValuePercentage = ((cryptoTotalValue-cryptoTotalPrevious)/100).toFixed(2);
    const cryptoPercentageEur = (cryptoTotalValue-cryptoTotalPrevious).toFixed(2);

    
    const stocksTotalValue = 2324;
    const etfTotalValue = 2324;

    const stocksValuePercentage = 8.2;
    const etfValuePercentage = 12.3;
    
    const stocksPercentageEur = 22.79;
    const etfPercentageEur = 85.34;

    var toggle = 1;

    const toggleValueView = () => {

        const crypto = document.getElementById('cryptoTotalMoney');
        const eye = document.getElementById('viewMoney');

        if (toggle === 1){
            eye.classList.remove("pi-eye");
            eye.classList.add("pi-eye-slash");
            crypto.textContent="*********";
            
            toggle = 0;
        } else {
            eye.classList.remove("pi-eye-slash");
            eye.classList.add("pi-eye");
            crypto.textContent= cryptoTotalValue + " €"
            toggle = 1;
        }

    }

  return (
    <div  className="dashboard__section1__container">
        <div className="dashboard__section1__header">
            <h1>Dashboard</h1>
            <button className="btn__veiwValues" onClick={toggleValueView}><i className="pi pi-eye" id="viewMoney"></i></button>
            <button className="btn__addNew"><p>Add New</p></button>
        </div>

        <div className="dashboard__categories">
            <div className='categories__main'>
                <div className='value__category'>
                    <div className='value__left'>
                        <p>Cryptocurrency</p>
                        <h1 id="cryptoTotalMoney">{cryptoTotalValue} €</h1>
                    </div>
                    <div className='value__icon'>
                        <i className="pi pi-bitcoin"></i>
                    </div>
                    
                </div>
                <div className="value__percentage">
                    <i className={valuePercentageIcon}></i>
                    <h1>{cryptoValuePercentage}%</h1>
                    <p> {cryptoPercentageEur} €</p>
                </div>
            </div>
            <div className='categories__main'>
                <div className='value__category'>
                    <div className='value__left'>
                        <p>Stock Market</p>
                        <h1>{stocksTotalValue} €</h1>
                    </div>
                    <div className='value__icon'>
                        <i className="pi pi-apple"></i>
                    </div>
                    
                </div>
                <div className="value__percentage">
                    <i className={valuePercentageIcon}></i>
                    <h1>{stocksValuePercentage}%</h1>
                    <p> {stocksPercentageEur} €</p>
                </div>
            </div>
            <div className='categories__main'>
                <div className='value__category'>
                    <div className='value__left'>
                        <p>ETF's</p>
                        <h1>{etfTotalValue} €</h1>
                    </div>
                    <div className='value__icon'>
                        <i className="pi pi-slack"></i>
                    </div>
                    
                </div>
                <div className="value__percentage">
                    <i className={valuePercentageIcon}></i>
                    <h1>{etfValuePercentage}%</h1>
                    <p> {etfPercentageEur} €</p>
                </div>
            </div>
        </div>

        <div className="dashboard__graph__container">
            <div className="dashboard__graph__header">
                <div className="dashboard__graph__left">
                    <p>{graphValueDays}</p>
                    <h1>{graphValueEuro}<span> €</span></h1>
                </div>
                <div className='dashboard__graph__right'>
                    <div className="graph__options">
                        <p onClick={(e) => {setGraphDays(1); setIntervalDaysGraph("")}}>24h</p>
                        <p onClick={(e) => {setGraphDays(7); setIntervalDaysGraph("")}}>7d</p>
                        <p onClick={(e) => {setGraphDays(30); setIntervalDaysGraph("daily")}}>30d</p>
                        <p onClick={(e) => {setGraphDays(90); setIntervalDaysGraph("daily")}}>90d</p>
                        <p onClick={(e) => {setGraphDays("max"); setIntervalDaysGraph("yearly")}}>All</p>
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