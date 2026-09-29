'use client'

import React, { useEffect, useId, useState } from 'react';
import './Projects.css';
import { motion, useAnimation, useReducedMotion, type Variants } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { cubicBezier } from 'framer-motion';
import Project from './components/Project';
import projectsJson from './data/projects.json';
import { singleHop } from '@/app/utils/animations';
import GitHubIcon from './components/GitHubIcon';
import { profile } from '@/app/data/profile';

export interface ProjectDetails {
  name: string;
  imagePath: string;
  liveSite?: string;
  devpost?: string;
  github?: string;
  priority?: boolean;
  hackathon?: string;
  description: string;
  contribution?: string;
  technologies: string[];
  featured?: boolean;
}

const Projects = () => {
  const controls = useAnimation();
  const githubControls = useAnimation();
  const projects: ProjectDetails[] = projectsJson;
  const moreProjects = projects.filter((project) => !project.featured);
  const [showMore, setShowMore] = useState(false);
  const [moreSettled, setMoreSettled] = useState(false);
  const morePanelId = useId();
  const reduceMotion = useReducedMotion();

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

  const gentleEase = [0.25, 0.1, 0.25, 1] as const;

  const morePanelVariants: Variants = {
    collapsed: {
      height: 0,
      transition: reduceMotion ? { duration: 0 } : {
        height: { duration: 0.5, ease: gentleEase },
      },
      transitionEnd: { visibility: 'hidden' },
    },
    expanded: {
      height: 'auto',
      visibility: 'visible',
      transition: reduceMotion ? { duration: 0 } : {
        height: { duration: 0.7, ease: gentleEase },
      },
    },
  };

  // The whole grid slides down with the panel like a drawer; cards fade in softly on top of that.
  const moreGridVariants: Variants = {
    collapsed: {
      y: -48,
      transition: reduceMotion ? { duration: 0 } : { duration: 0.5, ease: gentleEase },
    },
    expanded: {
      y: 0,
      transition: reduceMotion ? { duration: 0 } : {
        duration: 0.7,
        ease: gentleEase,
        staggerChildren: 0.04,
      },
    },
  };

  const moreProjectVariants: Variants = {
    collapsed: {
      opacity: 0,
      transition: reduceMotion ? { duration: 0 } : { duration: 0.3, ease: gentleEase },
    },
    expanded: {
      opacity: 1,
      transition: reduceMotion ? { duration: 0 } : { duration: 0.6, ease: gentleEase },
    },
  };

  return (
    <motion.section
      ref={ref}
      id="projects"
      className='flex flex-col bg-black w-full rounded-b-3xl z-10 -mt-1 pb-14 md:pb-20 overflow-x-clip'
      initial="hidden"
      animate={controls}
      variants={containerVariants}
    >
      <section className='z-0 relative about w-full h-auto md:h-1/5 mt-2 sm:mt-5 md:mt-10 text-center'>
        <h2 className='sr-only'>My projects</h2>
        <motion.div
          className='text-white flex flex-row items-center justify-center text-5xl sm:text-6xl md:text-6xl lg:text-8xl font-bold mb-4 sm:mb-8 lg:mb-12'
          variants={containerVariants}
        >
          {"MY PR".split("").map((letter, index) => (
            <motion.div aria-hidden='true' key={index} custom={index} className={letter === " " ? "mx-1 sm:mx-4" : ""} variants={letterVariants}>
              {letter}
            </motion.div>
          ))}
          <motion.a className='flex justify-center' ref={githubRef} variants={githubVariants}
            href={profile.github}
            target='_blank'
            rel='noopener noreferrer'
            aria-label='Carson Secrest on GitHub'
            data-cursor-link='github'
            onAnimationComplete={() => {
              githubControls.start("visible");
            }}
            onMouseEnter={() => {
              controls.start("hop");
            }}>
            <span aria-hidden='true' className='pointer-events-none'><GitHubIcon /></span>
          </motion.a>
          {"JECTS".split("").map((letter, index) => (
            <motion.div aria-hidden='true' key={index + 5} custom={index + 5} className={letter === " " ? "mx-1 sm:mx-4" : ""} variants={letterVariants}>
              {letter}
            </motion.div>
          ))}
        </motion.div>
      </section>
      <div className='mx-auto w-full max-w-6xl px-6 sm:px-10'>
        <div className='mb-7 flex flex-wrap items-center justify-between gap-3 border-b border-cream/20 pb-4 text-sm text-cream'>
          <p>Selected work · Web, mobile & AI</p>
          <a href='https://github.com/Carson274' target='_blank' rel='noopener noreferrer' className='nav-link'>All repositories ↗</a>
        </div>
        <div className='grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3'>
          {projects.filter((project) => project.featured).map((project) => (
            <Project key={project.name} project={project} />
          ))}
        </div>
        <div className='more-projects mt-12 text-cream'>
          <button
            type='button'
            aria-expanded={showMore}
            aria-controls={morePanelId}
            onClick={() => setShowMore((open) => !open)}
            className='more-projects-toggle flex w-full cursor-pointer items-center justify-between gap-4 rounded-xl border border-cream/30 bg-cream/5 px-5 py-5 text-left transition-colors hover:border-cream/60 hover:bg-cream/10 sm:px-6 sm:py-6'
          >
            <span className='flex flex-wrap items-center gap-3 text-2xl font-semibold text-white sm:text-3xl'>
              More projects
              <span className='rounded-full border border-cream/30 px-3 py-1 text-sm font-medium text-cream'>{moreProjects.length}</span>
            </span>
            <span aria-hidden='true' className='flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-cream/30'>
              <svg className='more-projects-chevron h-5 w-5' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round'>
                <path d='m6 9 6 6 6-6' />
              </svg>
            </span>
          </button>
          <motion.div
            id={morePanelId}
            initial='collapsed'
            animate={showMore ? 'expanded' : 'collapsed'}
            variants={morePanelVariants}
            onAnimationStart={() => setMoreSettled(false)}
            onAnimationComplete={(definition) => setMoreSettled(definition === 'expanded')}
            // Let hackathon crowns and tooltips overflow the panel once it is fully open.
            className={moreSettled ? 'overflow-visible' : 'overflow-hidden'}
          >
            <motion.div variants={moreGridVariants} className='grid grid-cols-1 gap-x-8 gap-y-12 pt-10 sm:grid-cols-2 lg:grid-cols-3'>
              {moreProjects.map((project) => (
                <motion.div key={project.name} className='grid' variants={moreProjectVariants}>
                  <Project project={project} />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}

export default Projects;
