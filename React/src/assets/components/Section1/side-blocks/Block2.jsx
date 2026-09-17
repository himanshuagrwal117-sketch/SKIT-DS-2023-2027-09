import React from 'react'
import Counter from '../../Effects/Counter'
import { motion } from "framer-motion";

const Block2 = () => {
  return (
      <motion.div
        className="bg-white h-37 w-60 rounded-[13px] absolute right-30 top-100 p-4 text-center"
        initial={{ opacity: 0, x: 150 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}>
        <p className="text-[#ac3d3d] font-extrabold font-sans text-[20px] leading-5.5">
        Numbers of Clubs Registered in College
        </p>
        <p className="text-[#ac3d3d] font-extrabold font-sans text-[52px] inline">
        <Counter end={33} duration={2000} />
        </p>
      </motion.div>

   
  )
}

export default Block2