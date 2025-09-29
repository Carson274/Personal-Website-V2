'use client'

import React, { useRef } from 'react';
import Image from 'next/image';
import { useScroll, motion, useTransform } from 'framer-motion';

const NavBar = () => {
  const ref = useRef(null);
  const { scrollYProgress, scrollY } = useScroll();
  const borderRadius = useTransform(scrollYProgress, [0, 0.2], [60, 0]);

  return (
    <>
      <motion.div 
        style={{
          borderTopLeftRadius: borderRadius,
          borderTopRightRadius: borderRadius
        }}
        className='bg-black sticky z-30 flex w-full items-center'
      >
        <div
          ref={ref}
          className='flex items-center flex-col w-full h-full border-b-8 border-black'
        >
          <div className='flex w-full h-full flex-row justify-between px-12 py-8 text-cream'>
            <Image src="/images/Logo_Light.svg" width={60} height={60} alt="CS Logo" />
            <div className='flex items-center space-x-12 px-4 text-lg'>
              {/* <a href="#about" className='hover:text-brown'>about</a>
              <a href="#projects" className='hover:text-brown'>projects</a> */}
            </div>
          </div>
        </div>
      </motion.div>
    </>
  )
}

export default NavBar;