"use client"
import React, { useState } from 'react'
import {motion} from 'framer-motion'

const containerVariants = {
  close: {
    width: "90px",
    transition: {
      type: "easeInOut",
      duration: 0.3

    }
  },
  open: {
    width: "220px",
    transition : {
      type: "easeInOut",
      duration: 0.3
    }
  }
}

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.nav animate={isOpen ? "open" : "close"} variants={containerVariants} className={`min-h-[100vh] dark:bg-mainBackgroundDark `}><button onClick={()=>setIsOpen(!isOpen)}>{isOpen ? "Close": "Open"}</button></motion.nav>
  )
}
