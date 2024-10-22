'use client'

import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import { useScroll, motion, useTransform, useInView } from 'framer-motion';

const NavBar = () => {
  const ref = useRef(null);
  const isInView = useInView(ref);
  const { scrollYProgress } = useScroll();

  // useEffect(() => {
  //   console.log("Element is in view: ", isInView)
  //   console.log("Scroll Y Progress: ", scrollYProgress)
  // }, [isInView])

  const borderRadius = useTransform(scrollYProgress, [0, 0.2], [60, 0]);

  return (
    <>
      <motion.div 
        ref={ref}
        style={{
          borderTopLeftRadius: borderRadius,
          borderTopRightRadius: borderRadius
        }}
        className='bg-black sticky z-30 flex w-full items-center justify-between px-12 py-8 text-cream'
      >
        <Image src="/images/Logo_Light.svg" width={60} height={60} alt="CS Logo" />
        <div className='flex items-center space-x-12 px-4 text-lg'>
          <a href="#about" className='hover:text-brown'>about</a>
          <a href="#projects" className='hover:text-brown'>projects</a>
        </div>
      </motion.div>
    </>
  )
}

export default NavBar;