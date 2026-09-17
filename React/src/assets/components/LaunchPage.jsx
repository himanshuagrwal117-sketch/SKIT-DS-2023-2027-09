import React from 'react'
import Header from './header/Header'
import About from './Section1/About'
import Bg from './Section1/background/Bg'
import Block1 from './Section1/side-blocks/Block1'
import Block2 from './Section1/side-blocks/Block2'
import Section2 from './Section2/Section2'

const LaunchPage = () => {
  return (
    <div className='relative'>
        <Header/>
        <Bg/>
        <About/>
        <Block1/>
        <Block2/>
        <Section2/> 
    </div>
  )
}

export default LaunchPage