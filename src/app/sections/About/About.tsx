'use client'

import React, { useEffect } from 'react';
import Image from "next/legacy/image";
import './About.css';
import { motion, useAnimation, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import AboutText from './components/AboutText';

const About = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    rootMargin: '-400px 0px',
  });
  const [bottomRef, bottomInView] = useInView({
    rootMargin: '0px 0px',
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
        staggerChildren: 0.01,
      },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.1,
        ease: [0.45, 0.8, 0.5, 0.95],
        type: 'spring',
        stiffness: 120,
        damping: 14,
        mass: 0.5,
        delay: index * 0.05 + 0.2,
      },
    }),
  };

  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [-100, 100]);

  return (
    <motion.section
      ref={ref}
      id="about"
      className='flex flex-col bg-black w-full z-20 min-h-screen border-t-8 border-black'
      initial="hidden"
      animate={controls}
      variants={containerVariants}
    >
      <section className='z-0 relative about w-full h-1/5 sm:mt-20 text-center'>
        <div className='absolute top-full left-0 w-full h-full z-20 bg-black'></div>
        <motion.div
          className='text-white flex flex-row items-center justify-center mb-10 sm:mb-20 md:mb-0 text-5xl sm:text-6xl md:text-6xl lg:text-8xl font-bold my-2'
          variants={containerVariants}
        >
          {"ABOUT ME".split("").map((letter, index) => (
            <motion.div key={index} custom={index}  className={letter === " " ? "mx-1 sm:mx-4" : ""} variants={letterVariants}>
              {letter}
            </motion.div>
          ))}
        </motion.div>
      </section>
      <section className='about-section z-10 flex flex-col my-20 md:my-0 md:flex-row w-full justify-center items-center'>
        <div className='flex w-full md:w-1/2 h-full p-8 justify-center'>
          <motion.div 
            style={{ y }} 
            className='image relative mt-32 w-full rounded-2xl flex justify-center items-center'
          >
            <div style={{ position: 'relative', width: '360px', height: '420px' }}>
              <Image
                className='rounded-2xl border-4 border-cream'
                src='/images/Carson.jpg'
                alt='Picture of Me'
                layout='fill'
                objectFit='cover'
                priority={true}
              />
            </div>
          </motion.div>
        </div>
        <div className='text-div flex w-full md:w-1/2 h-1/2 md:h-full p-8 justify-center items-center'>
          <AboutText/>
        </div>
      </section>
      <section 
        ref={bottomRef} 
        className='bottom-section w-full h-1/5 bg-black'
      />
    </motion.section>
  )
}

export default About;