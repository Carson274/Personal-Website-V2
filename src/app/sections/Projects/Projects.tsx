'use client'

import React, { useEffect } from 'react';
import Image from 'next/image';
import './Projects.css';
import { motion, useAnimation, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Open_Sans } from 'next/font/google';

const openSans = Open_Sans({ subsets: ['latin'], display: 'swap', });

const Projects = () => {
  const controls = useAnimation();

  const [ref, inView] = useInView({
    triggerOnce: true,
    rootMargin: '-400px 0px',
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
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 }
    },
  };

  return (
    <motion.section
      ref={ref}
      id="projects"
      className='flex flex-col min-h-screen bg-black w-full rounded-b-3xl z-10 -mt-1'
      initial="hidden"
      animate={controls}
      variants={containerVariants}
    >
      <section className='z-0 relative about w-full h-1/5 mt-20 text-center'>
        <div className='absolute top-full left-0 w-full h-full bg-black'></div>
        <motion.div
          className='text-white flex flex-row items-center justify-center sm:text-6xl md:text-6xl lg:text-8xl font-bold mb-12'
          variants={containerVariants}
        >
          {"MY PROJECTS".split("").map((letter, index) => (
            <motion.div key={index} className={letter === " " ? "mx-4" : ""} variants={letterVariants}>
              {letter}
            </motion.div>
          ))}
        </motion.div>
      </section>
      <section className='grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-8'>
        <div className='relative w-full h-full'>
          <div className='flex flex-col items-center justify-center mx-10'>
            <h2 className='text-white text-2xl my-8 font-bold text-center'>Slumped Stats</h2>
            <a href="https://github.com/Carson274/Sleep-App" target="_blank">
              <Image className='project-image founded-lg border-2 border-brown rounded-xl' src='/images/Slumped_Stats.png' alt='Slumped Stats' width={400} height={400} />
            </a>
          </div>
        </div>
        <div className='relative w-full h-full'>
          <div className='flex flex-col items-center justify-center mx-10'>
            <h2 className='text-white text-2xl my-8 font-bold text-center'>Box Office Battles</h2>
            <a href="https://github.com/Carson274/Box-Office-Battles" target="_blank">
              <Image className='project-image founded-lg border-2 border-brown rounded-xl' src='/images/Box_Office_Battles.png' alt='Box Office Battles' width={400} height={400} />
            </a>
          </div>
        </div>
        <div className='relative w-full h-full'>
          <div className='flex flex-col items-center justify-center mx-10'>
            <h2 className='text-white text-2xl my-8 font-bold text-center'>Playlist Polyglot</h2>
            <a href="https://github.com/Carson274/Playlist-Polyglot" target="_blank">
              <Image className='project-image founded-lg border-2 border-brown rounded-xl' src='/images/Playlist_Polyglot.png' alt='Playlist Polyglot' width={400} height={400} />
            </a>
          </div>
        </div>
      </section>
    </motion.section>
  )
}

export default Projects