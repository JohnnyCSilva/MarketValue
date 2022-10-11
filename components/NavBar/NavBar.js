import React, { useState, useRef } from 'react'
import { Dialog } from 'primereact/dialog';
import { SlideMenu } from 'primereact/slidemenu';
import { useAuthValue } from '../../config/AuthContext'
import { auth} from '../../config/Firebase'
import { signOut } from 'firebase/auth';
import { Toast } from 'primereact/toast';


const NavBar = () => {

    const {currentUser} = useAuthValue()
    const delay = ms => new Promise(res => setTimeout(res, ms));    

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
            command: async() => {
                console.log('signUserOut', currentUser);
                signOut(auth);
                toast.current.show({ severity: 'info', summary: 'You were logged out!', detail: 'Your account has been logged out! We are redirecting you.', life: 4000 });
                await delay(4000);
                window.location = '/';
            }
        }
    ]

    const toast = useRef(null) ;

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
    <div className='main__header'>~

    <Toast ref={toast} position="bottom-left" baseZIndex="1000"/>

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
            
             {// user is signed-in and has username 
                currentUser && (
                <>
                    <div className='navbar__account'>
                        <i className="pi pi-user" onClick={() => onClick('displayBasic')}></i>
                        
                    </div>
                </>
            )}
            
            {/* user is not signed OR has not created username */
            !currentUser && (
            <div className='navbar__account'>
                <i className='pi pi-user' onClick={() => onClick('displayBasic')}></i>
                <a href="/SignUp" className='navbar__signUp'>Sign Up</a>
            </div>
            )}
        </div>

        <Dialog visible={displayBasic} closable={false} dismissableMask={true}  style={{ minWidth: "350px" }} className="profile__main" draggable={false} breakpoints={{'960px': '75vw', '640px': '100vw'}}  onHide={() => onHide('displayBasic')}>
            {currentUser && (

                <div className="profile__User">
                    <img src="/images/favicon.svg" alt="" />
                    <div className='profile__user__name'>
                        <h3>{currentUser?.email}</h3>
                        <a href="/">View my profile</a>
                    </div>
                </div>
            )}
            {!currentUser && (

                <div className="profile__popup__main">
                    <a href="/SignIn" className="sign__in">Sign In</a>
                    <a href="/SignUp" className="sign__up">Sign Up</a>
                </div>
                )}

            <div className="separator"></div>
            
            <div className='profile__links'>
                <SlideMenu style={{width: "100%", border: "none", fontSize: "15px", fontFamily: "var(--appFont)"}} model={items} menuWidth={300}  viewportHeight={305}/>
            </div>
        </Dialog>    

    </div>
  )
}

export default NavBar