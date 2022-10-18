import React from 'react'

const Section1 = () => {
  return (
    <div className="section1__container">
        <div className='main__banner'>
            <div className='section1__header'>
                <h1>Manage All In One Place.</h1>
                <p>Always an informed investment decision. <br/>
                First you prepare, then you go for it.                   
                </p>
            </div>
            <div className="section1__search">
                <div className="section1__search__container">
                    <i className='pi pi-search' />
                    <input type='text' placeholder='Search Markets Here'/>
                </div>
            </div>
            
        </div>
    </div>
  )
}

export default Section1