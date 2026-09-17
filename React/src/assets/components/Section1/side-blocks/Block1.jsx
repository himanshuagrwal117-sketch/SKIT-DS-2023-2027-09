import React from 'react'
import Counter from '../../Effects/Counter';
import { motion } from "framer-motion";

const Block1 = () => {
  return (
    <motion.div
        className='bg-white h-37 w-60 rounded-[13px] absolute left-30 top-100 p-4'
        initial={{ opacity: 0, x: -150 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}>
         <p className='text-[#ac3d3d] font-extrabold  font-sans  text-[20px] text-center leading-5.5'>Numbers of Students Registered in Club</p>
        <p className='text-[#ac3d3d] font-extrabold font-sans text-[52px] text-center '><Counter end={1250} duration={2000}/></p>
    </motion.div>
  )
}

export default Block1

