import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { classNames } from 'primereact/utils';

import { Sparklines, SparklinesLine } from 'react-sparklines';

const Section1 = () => {

    var randonPhraseString = [
        "Its the perfect time to buy some Bitcoin! ⭐",
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
    const [filters1, setFilters1] = useState(null);
    const [globalFilterValue1, setGlobalFilterValue1] = useState('');
    
    useEffect(() => {
      axios
        .get(
          'https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&order=market_cap_desc&per_page=150&page=1&sparkline=true'
          )
        .then(res => {
            setCoins(res.data);
        })
            .catch(error => console.log(error));
    }, []);

    useEffect(() => {
        initFilters1();
    }, []);

    const initFilters1 = () => {
        setFilters1({
            'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
            'name': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            'current_price': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            'representative': { value: null, matchMode: FilterMatchMode.IN },
            'price_change_percentage_24h': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }] },
            'market_cap': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
            'total_volume': { operator: FilterOperator.OR, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
        });
        setGlobalFilterValue1('');
    }

    const onGlobalFilterChange1 = (e) => {
        const value = e.target.value;
        let _filters1 = { ...filters1 };
        _filters1['global'].value = value;

        setFilters1(_filters1);
        setGlobalFilterValue1(value);
    }

    const imageBodyTemplate = (rowData) => {
        return <img src={`${rowData.image}`} style={{width: '25px', borderRadius: '50px'}} onError={(e) => e.target.src='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={rowData.image} className="product-image" />;
    }
    const formatCurrency = (value) => {
        return value.toLocaleString('pt-PT', { style: 'currency', currency: 'EUR' });
    }
    const priceBodyTemplate = (rowData) => {
        return formatCurrency(rowData.current_price);
    }
    const market_capBodyTemplate = (rowData) => {
        return formatCurrency(rowData.market_cap);
    }
    const volumeBodyTemplate = (rowData) => {
        return formatCurrency(rowData.total_volume);
    }
        
    const cryptocurrencyTemplate = (rowData) => {

        return rowData.name + " - " +  rowData.symbol;
    }

    const percentageBodyTemplate = (rowData) => {
        const percentageChanged = classNames({
            'negative': rowData.price_change_percentage_24h < 0,
            'positive': rowData.price_change_percentage_24h > 0
        });

        rowData.price_change_percentage_24h

        return (
            <div className={percentageChanged}>
                {(rowData.price_change_percentage_24h).toFixed(2)}%
            </div>
        );
    }

    
    const renderSparkLine = (rowData) => {
        
        var chartColor = "";
        if (rowData.price_change_percentage_24h < 0) {
            chartColor = "var(--colorRed)";
        }else {
            chartColor = "var(--colorGreen)";
        }

        return <Sparklines data={rowData.sparkline_in_7d.price} >
                <SparklinesLine color={chartColor} />
               </Sparklines>;
    }

    const [selectedProduct, setSelectedProduct] = useState(null);


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
                    <input type='text' placeholder='Search for a Crypto Currency' value={globalFilterValue1} onChange={onGlobalFilterChange1}/>
                </div>
                <div className="crypto__section1__powered_section">
                    <img src="/images/coingecko.png" alt=""/>
                    <p>Powered by Coingecko</p>
                </div>
            </div>
            <div className='crypto__section1__row__container'>
            <DataTable value={coins}
             style={{ fontFamily: 'var(--appFont)', border: 'none'}}
             removableSort
             responsiveLayout="scroll"
             paginator
             rows={15}
             selectionMode="single" 
             selection={selectedProduct} 
             onSelectionChange={e => setSelectedProduct(e.value)} dataKey="name"
             filters={filters1}
             emptyMessage="Crypto Currency not Found"
             globalFilterFields={['name','current_price','price', 'change_percentage_24h', 'market_cap', 'total_volume']}
            > 

                <Column body={imageBodyTemplate} header=""></Column>
                <Column field="name" header="Name" body={cryptocurrencyTemplate} sortable></Column>
                <Column field="current_price" body={priceBodyTemplate} header="Price" sortable></Column>
                <Column header="24h" body={percentageBodyTemplate} sortable></Column>
                <Column field="total_volume" body={volumeBodyTemplate} header="Volume"></Column>
                <Column field="market_cap" body={market_capBodyTemplate} header="MarketCap" sortable></Column>
                <Column body={renderSparkLine} header="Last 7 days"></Column>
                
                
            </DataTable>
            </div>
    </div>
  )
}

export default Section1