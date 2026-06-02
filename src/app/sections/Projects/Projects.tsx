'use client'

import React, { useEffect } from 'react';
import './Projects.css';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { cubicBezier } from 'framer-motion';
import Project from './components/Project';
import projectsJson from './data/projects.json';
import { singleHop } from '@/app/utils/animations';
import GitHubIcon from './components/GitHubIcon';

export interface ProjectDetails {
  name: string;
  imagePath: string;
  liveSite?: string;
  devpost?: string;
  github?: string;
  priority?: boolean;
  hackathon?: string;
}

const Projects = () => {
  const controls = useAnimation();
  const githubControls = useAnimation();
  const projects: ProjectDetails[] = projectsJson;

  const [ref, inView] = useInView({
    triggerOnce: true,
    rootMargin: '-140px 0px',
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const [githubRef, githubInView] = useInView({
    triggerOnce: true,
    rootMargin: '-60px 0px',
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
        delay: index * 0.04 + 0.32,
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
    hop: singleHop
  };

  return (
    <motion.section
      ref={ref}
      id="projects"
      className='flex flex-col bg-black w-full rounded-b-3xl z-10 -mt-1 pb-16 md:pb-28 lg:pb-32 overflow-x-clip'
      initial="hidden"
      animate={controls}
      variants={containerVariants}
    >
      <section className='z-0 relative about w-full h-auto md:h-1/5 mt-2 sm:mt-5 md:mt-12 lg:mt-20 text-center'>
        <div className='absolute top-full left-0 w-full h-full bg-black'></div>
        <motion.div
          className='text-white flex flex-row items-center justify-center text-5xl sm:text-6xl md:text-6xl lg:text-8xl font-bold mb-4 sm:mb-8 lg:mb-12'
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
            <GitHubIcon />
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