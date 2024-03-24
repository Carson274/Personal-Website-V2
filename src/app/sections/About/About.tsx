'use client'

import React, { useEffect } from 'react';
import Image from 'next/image';
import './About.css';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const About = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    rootMargin: '-100px 0px',
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.02,
      },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <motion.section
    ref={ref}
    className='flex flex-col min-h-screen bg-black w-full rounded-3xl z-10'
    initial="hidden"
    animate={controls}
    variants={containerVariants}
    >
      <section className='z-0 relative about w-full h-1/5 mt-20 text-center'>
        <div className='absolute top-full left-0 w-full h-full z-20 bg-black'></div>
        <motion.div
          className='text-white flex flex-row items-center justify-center text-8xl font-bold'
          variants={containerVariants}
        >
          {"ABOUT ME".split("").map((letter, index) => (
            <motion.div key={index} className={letter === " " ? "mx-4" : ""} variants={letterVariants}>
              {letter}
            </motion.div>
          ))}
        </motion.div>
      </section>
      <section className='z-10 flex flex-row w-full h-full'>
        <section className='image flex w-1/2 h-full justify-center'>
          <Image className='rounded-2xl' src='/images/Carson.jpg' alt='Profile' width={500} height={500} />
        </section>
        <section className='text flex w-1/2 h-full justify-center'>
        </section>
      </section>
    </motion.section>
  )
}

export default About;