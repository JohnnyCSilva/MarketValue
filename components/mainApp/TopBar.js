import React from 'react'

const TopBar = () => {

    function triggerSearchIcon(){
        document.getElementById('searchIcon').style.backgroundColor = 'var(--mainColorHover)';
        document.getElementById('searchIcon').style.color = 'var(--mainColor)';
    }

  return (
    <div className='topBar__main'>
        <div className='topBar__container'>
            <div className='topBar__search'>
                <i className='pi pi-search' id="searchIcon"></i>
                <input type='text' placeholder='Search...' id="searchBoxNav" onClick={triggerSearchIcon}/>
            </div>
            <div className='topBar__icons'>
                <a href="" className='activeTopBar'>
                    <i className='pi pi-user'></i>
                </a>
                <a href="">
                    <i className='pi pi-cog'></i>
                </a>
                
            </div>  
        </div>
    </div>
  )
}

export default TopBar