import React, { useState } from 'react'
import { Dialog } from 'primereact/dialog';
import { SlideMenu } from 'primereact/slidemenu';



const NavBar = () => {

    const items = [
        {
            label:'Portfolio',
            icon:'pi pi-chart-pie',
        },
        {
            label:'Watchlist',
            icon:'pi pi-star',
        },
        {
            label:'Learn',
            icon:'pi pi-book',
        },
        {
            label:'Tools',
            icon:'pi pi-wrench',
        },
        {
            label:'Settings',
            icon:'pi pi-cog',
            items:[
                {
                    label:'Currency',
                    icon:'pi pi-money-bill',
                    items:[
                        {
                            label:'Euro - EUR',
                            icon:'pi pi-euro',
                        },
                        {
                            label:'United States Dollar - USD',
                            icon:'pi pi-dollar',
                        },
                        {
                            label:'Pound Sterling - GBP',
                            icon:'pi pi-pound',
                        }
                    ]
                },
                {
                    label:'Theme',
                    icon:'pi pi-palette',
                    items:[
                        {
                            label:'Dark Theme',
                            icon:'pi pi-moon',
                        },
                        {
                            label:'Light Theme',
                            icon:'pi pi-sun',
                        }
                    ]
                },
                {
                    label:'Languages',
                    icon:'pi pi-flag',
                    items:[
                        {
                            label:'English',
                            icon:'pi pi-flag',
                        },
                        {
                            label:'Portuguese',
                            icon:'pi pi-flag',
                        }
                    ]
                }
            ]
        },
        {
            label:'Help Center',
            icon:'pi pi-question-circle',
        },
        {
            label:'Log Out',
            icon:'pi pi-sign-out',
        }
    ]

    const [displayBasic, setDisplayBasic] = useState(false);

    const dialogFuncMap = {
        'displayBasic': setDisplayBasic,
    }

    const onClick = (name) => {
        dialogFuncMap[`${name}`](true);
    }

    const onHide = (name) => {
        dialogFuncMap[`${name}`](false);
    }


    


  return (
    <div className='main__header'>
        <div className='navbar__container'>
            <div className='navbar__brand'>
                <a href='/' className='navbar__brand__link'>
                    <img src="/images/favicon.svg" alt=""/>
                    <p>MARKET VALUE</p>
                </a>
            </div>
            <div className='navbar__menu'>
                <a href='/Crypto' className='navbar__link' id='crypto__nav'>
                   <p> Crypto </p>
                </a>
                <a href='/' className='navbar__link' id='stocks__nav'>
                   <p> Stocks </p>
                </a>
                <a href='/' className='navbar__link' id='etfs__nav'>
                   <p> ETF's </p>
                </a>
                <a href='/' className='navbar__link' id='portfolio__nav'>
                   <p> Portfolio </p>
                </a>
                <a href='/' className='navbar__link' id='learn__nav'>
                   <p> Learn </p>
                </a>
            </div>
            <div className='navbar__account'>
                <i className='pi pi-user' onClick={() => onClick('displayBasic')}></i>
                <a href="/SignUp" className='navbar__signUp'>Sign Up</a>
            </div>
        </div>

        <Dialog visible={displayBasic} closable={false} dismissableMask={true}  style={{ minWidth: "350px" }} className="profile__main" draggable={false} breakpoints={{'960px': '75vw', '640px': '100vw'}}  onHide={() => onHide('displayBasic')}>
            <div className='profile__popup'>
                <img src="/images/favicon.svg" alt='' />
                <p>UserName</p>
                <a href="#" className='navbar__signUp'>Sign In</a>
            </div>
            

            <div className='profile__links'>
                <SlideMenu style={{width: "100%", border: "none", fontSize: "15px", fontFamily: "var(--appFont)"}} model={items} menuWidth={300}  viewportHeight={305}/>
            </div>
        </Dialog>    

        {/* 
        <a href="/" className="profile__link">
                    <i className='pi pi-book'></i>
                    <p>Learn</p>
                </a>
                <a href="/" className="profile__link">
                    <i className='pi pi-wrench'></i>
                    <p>Tools</p>
                </a>
                <a href="/" className="profile__link">
                    <i className='pi pi-cog'></i>
                    <p>Settings</p>
                /a>
                <PanelMenu model={items} style={{ width: "22rem" }} />
                
                <a href="/" className="profile__link">
                    <i className='pi pi-question-circle'></i>
                    <p>Help Center</p>
                </a>
                <a href="/" className="profile__link">
                    <i className='pi pi-sign-out'></i>
                    <p>Log Out</p>
                </a>    
        */}

    </div>
  )
}

export default NavBar



/* <a href="/" className="profile__link">
                    <i className='pi pi-chart-pie'></i>
                    <p>Portfolio</p>
                </a>
                <a href="/" className="profile__link">
                    <i className='pi pi-star'></i>
                    <p>Watchlist</p>
                </a>
                <a href="/" className="profile__link">
                    <i className='pi pi-book'></i>
                    <p>Learn</p>
                </a>
                <a href="/" className="profile__link">
                    <i className='pi pi-wrench'></i>
                    <p>Tools</p>
                </a>
                <a href="/" className="profile__link">
                    <i className='pi pi-cog'></i>
                    <p>Settings</p>
                /a>
                <PanelMenu model={items} style={{ width: "22rem" }} />
                
                <a href="/" className="profile__link">
                    <i className='pi pi-question-circle'></i>
                    <p>Help Center</p>
                </a>
                <a href="/" className="profile__link">
                    <i className='pi pi-sign-out'></i>
                    <p>Log Out</p>
                </a>

                */