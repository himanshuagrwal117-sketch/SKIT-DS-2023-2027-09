import React from 'react'
import Header from './header/Header'
import Section2 from './Section2/Section2'
import Section1 from './Section1/Section1'

const LaunchPage = () => {
  return (
    <div className='relative'>
        <Header/>
        <Section1/>
        <Section2/> 
    </div>
  )
}

export default LaunchPage