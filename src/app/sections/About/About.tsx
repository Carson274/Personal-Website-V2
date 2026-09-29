'use client'

import React, { useEffect } from 'react';
import Image from "next/image";
import './About.css';
import { motion, useAnimation, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import AboutText from './components/AboutText';
import { useLgUp } from '@/app/hooks/useMdUp';

const About = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    rootMargin: '-140px 0px',
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
        delay: index * 0.04 + 0.12,
      },
    }),
  };

  const lgUp = useLgUp();
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [-100, 100]);

  return (
    <motion.section
      ref={ref}
      id="about"
      className='about-panel flex flex-col bg-black w-full z-20 pb-10 sm:pb-14'
      initial="hidden"
      animate={controls}
      variants={containerVariants}
    >
      <section className='z-0 relative about w-full h-auto mt-12 md:mt-16 text-center'>
        <div className='absolute top-full left-0 w-full h-full z-20 bg-black'></div>
        <h2 className='sr-only'>About me</h2>
        <motion.div
          aria-hidden='true'
          className='text-white flex flex-row items-center justify-center mb-6 text-5xl sm:mb-12 sm:text-6xl md:mb-0 md:text-6xl lg:text-8xl font-bold my-2'
          variants={containerVariants}
        >
          {"ABOUT ME".split("").map((letter, index) => (
            <motion.div key={index} custom={index}  className={letter === " " ? "mx-1 sm:mx-4" : ""} variants={letterVariants}>
              {letter}
            </motion.div>
          ))}
        </motion.div>
      </section>
      <section className='about-section z-10 mx-auto flex w-full max-w-6xl flex-col mt-6 mb-0 gap-6 px-6 justify-center items-center lg:my-0 lg:flex-row lg:gap-0 lg:px-10'>
        <div className='relative z-0 flex h-full w-full pt-2 pb-0 justify-center lg:w-[45%] lg:py-8 lg:pr-8'>
          <motion.div 
            style={lgUp ? { y } : undefined}
            className='image relative z-0 mt-4 lg:mt-12 w-full rounded-2xl flex justify-center items-center'
          >
            <div className='relative h-[320px] w-[280px] max-w-full sm:h-[380px] sm:w-[326px] lg:h-[420px] lg:w-[360px]'>
              <Image
                className='rounded-2xl border-4 border-cream object-cover'
                src='/images/Carson_Portrait.jpg'
                alt='Carson Secrest smiling in front of a patterned doorway'
                fill
                // The landscape source covers a tall frame: request enough pixels
                // for its full width at the displayed height before cropping.
                sizes="(min-width: 1024px) 630px, (min-width: 640px) 570px, 480px"
                quality={90}
                priority
              />
            </div>
          </motion.div>
        </div>
        <div className='text-div relative z-10 flex w-full flex-col items-center justify-start pb-6 pt-2 lg:h-full lg:w-[55%] lg:items-start lg:justify-center lg:pb-14 lg:pl-10 lg:pt-0'>
          <AboutText/>
        </div>
      </section>
    </motion.section>
  )
}

export default About;
