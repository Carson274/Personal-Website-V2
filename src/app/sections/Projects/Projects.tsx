'use client'

import React, { useEffect } from 'react';
import Image from 'next/image';
import './Projects.css';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { cubicBezier } from 'framer-motion';
import Project from './components/Project';
import projectsJson from './data/projects.json';

export interface ProjectDetails {
  name: string;
  imagePath: string;
  liveSite?: string;
  devpost?: string;
  github?: string;
}

const Projects = () => {
  const controls = useAnimation();
  const githubControls = useAnimation();
  const projects: ProjectDetails[] = projectsJson;

  const [ref, inView] = useInView({
    triggerOnce: true,
    rootMargin: '-400px 0px',
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const [githubRef, githubInView] = useInView({
    triggerOnce: true,
    rootMargin: '-200px 0px',
  });

  useEffect(() => {
    if (githubInView) {
      githubControls.start('visible');
    }
  }, [githubControls, githubInView]);

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
        duration: 0.2,
        ease: [0.45, 0.8, 0.5, 0.95],
        type: 'spring',
        stiffness: 120,
        damping: 14,
        mass: 1.3,
        delay: index * 0.05 + 0.55,
      },
    }),
  };

  const githubVariants = {
    hidden: { 
      x: '-60vw',
      rotate: 0
    },
    visible: {
      x: 0,
      rotate: 360 * 9,
      transition: { 
        duration: 1.0,
        ease: cubicBezier(0.33, 0, 0.2, 1),
      }
    },
    hop: {
      y: [0, -20, 0, -12, 0, -3, 0],
      scaleX: [1, 0.97, 1.08, 0.99, 1.03, 1],
      scaleY: [1, 1.05, 0.92, 1.02, 0.97, 1],
      transition: {
        duration: 1.5,
        ease: "easeInOut",
      }
    }
  };

  return (
    <motion.section
      ref={ref}
      id="projects"
      className='flex flex-col bg-black w-full rounded-b-3xl z-10 -mt-1 pb-20'
      initial="hidden"
      animate={controls}
      variants={containerVariants}
    >
      <section className='z-0 relative about w-full h-1/5 mt-20 md:mt-32 text-center'>
        <div className='absolute top-full left-0 w-full h-full bg-black'></div>
        <motion.div
          className='text-white flex flex-row items-center justify-center text-5xl sm:text-6xl md:text-6xl lg:text-8xl font-bold mb-2 sm:mb-12'
          variants={containerVariants}
        >
          {"MY PR".split("").map((letter, index) => (
            <motion.div key={index} custom={index} className={letter === " " ? "mx-1 sm:mx-4" : ""} variants={letterVariants}>
              {letter}
            </motion.div>
          ))}
          <motion.div className='flex justify-center' ref={githubRef} variants={githubVariants}
            onAnimationComplete={() => {
              githubControls.start("visible");
            }}
            onMouseEnter={() => {
              controls.start("hop");
            }}>
            <a className='flex justify-end' href='https://github.com/Carson274' target='_blank'>
              <Image 
                className='github-rolling-icon' 
                src='/images/GitHub.svg' 
                alt='GitHub' 
                width={60} 
                height={60} 
                style={{ 
                  height: "1em",
                  width: "auto",
                  verticalAlign: "middle"
                }}
              />
            </a>
          </motion.div>
          {"JECTS".split("").map((letter, index) => (
            <motion.div key={index + 5} custom={index + 5} className={letter === " " ? "mx-1 sm:mx-4" : ""} variants={letterVariants}>
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