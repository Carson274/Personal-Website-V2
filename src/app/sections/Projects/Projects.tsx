'use client'

import React, { useEffect } from 'react';
import Image from 'next/image';
import './Projects.css';
import { motion, useAnimation, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Open_Sans } from 'next/font/google';
import { cubicBezier } from 'framer-motion';
import Project from './components/Project';

const openSans = Open_Sans({ subsets: ['latin'], display: 'swap', });

export interface ProjectDetails {
  name: string;
  imagePath: string;
  liveSite: string;
  devpost: string;
  github: string;
}

const Projects = () => {
  const controls = useAnimation();
  const projects: ProjectDetails[] = [
    {
      name: 'Slumped Stats',
      imagePath: '/images/Slumped_Stats.png',
      liveSite: '',
      devpost: 'https://devpost.com/software/slumped-stats',
      github: 'https://github.com/Carson274/Sleep-App'
    },
    {
      name: 'Box Office Battles',
      imagePath: '/images/Box_Office_Battles.png',
      liveSite: '',
      devpost: 'https://devpost.com/software/box-office-battles',
      github: 'https://github.com/Carson274/Box-Office-Battles'
    },
    {
      name: 'Playlist Polyglot',
      imagePath: '/images/Playlist_Polyglot.png',
      liveSite: '',
      devpost: '',
      github: 'https://github.com/Carson274/Playlist-Polyglot'
    },
    {
      name: 'Crowd',
      imagePath: '/images/Crowd.png',
      liveSite: '',
      devpost: 'https://devpost.com/software/crowd-fjct15',
      github: 'https://github.com/sebat2004/crowd'
    },
    {
      name: 'PurSend',
      imagePath: '/images/PurSend.png',
      liveSite: '',
      devpost: 'https://devpost.com/software/pursend',
      github: 'https://github.com/ipoogleduck/PurSend'
    },
    {
      name: 'Personal Website v1',
      imagePath: '/images/Personal_Website_v1.png',
      liveSite: 'https://carson274.github.io/Personal-Website',
      devpost: '',
      github: 'https://github.com/Carson274/Personal-Website'
    }
  ]

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
      transition: { duration: 1.2, ease: cubicBezier(.06,.6,.28,.99) }
    },
  };

  return (
    <motion.section
      ref={ref}
      id="projects"
      className='flex flex-col bg-black w-full rounded-b-3xl z-10 -mt-1 pb-40 -translate-y-6'
      initial="hidden"
      animate={controls}
      variants={containerVariants}
    >
      <section className='z-0 relative about w-full h-1/5 mt-32 md:mt-40 text-center'>
        <div className='absolute top-full left-0 w-full h-full bg-black'></div>
        <motion.div
          className='text-white flex flex-row items-center justify-center text-5xl sm:text-6xl md:text-6xl lg:text-8xl font-bold mb-2 sm:mb-12'
          variants={containerVariants}
        >
          {"MY PROJECTS".split("").map((letter, index) => (
            <motion.div key={index} className={letter === " " ? "mx-1 sm:mx-4" : ""} variants={letterVariants}>
              {letter}
            </motion.div>
          ))}
        </motion.div>
      </section>
      <section className='grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-3'>
        {projects.map((project, index) => (
          <Project key={index} project={project} />
        ))}
      </section>
    </motion.section>
  )
}

export default Projects