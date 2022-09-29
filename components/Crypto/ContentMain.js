import React, {useEffect} from 'react'
import Section1 from './Section1'

const ContentMain = () => {

  useEffect(() => {
        var home = document.getElementById('home__mobile');
        var search = document.getElementById('search__mobile');

        var navCrypto = document.getElementById('crypto__nav');

        navCrypto.classList.add("active");

        search.classList.add("active");
        home.classList.remove("active");

    }, [])

  return (
    <div className='crypto__main__content'>

        <Section1 />
        
    </div>
  )
}

export default ContentMain