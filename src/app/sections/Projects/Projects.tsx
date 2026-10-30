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
  const [githubLanded, setGithubLanded] = useState(false);
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
          className='text-white flex flex-row items-center justify-center text-[min(3rem,11.5vw)] sm:text-6xl md:text-6xl lg:text-8xl font-bold mb-14 sm:mb-16 lg:mb-20'
          variants={containerVariants}
        >
          {"MY PR".split("").map((letter, index) => (
            <motion.div aria-hidden='true' key={index} custom={index} className={letter === " " ? "mx-1 sm:mx-4" : ""} variants={letterVariants}>
              {letter}
            </motion.div>
          ))}
          <span className='relative flex'>
            <motion.a className='flex justify-center' ref={githubRef} variants={githubVariants}
              href={profile.github}
              target='_blank'
              rel='noopener noreferrer'
              aria-label='Carson Secrest on GitHub'
              data-cursor-link='github'
              onAnimationComplete={(definition) => {
                githubControls.start("visible");
                if (definition === 'visible') setGithubLanded(true);
              }}
              onMouseEnter={() => {
                controls.start("hop");
              }}>
              <span aria-hidden='true' className='pointer-events-none'><GitHubIcon /></span>
            </motion.a>
            {/* Sits outside the link so it stays put while the icon hops. */}
            <span
              aria-hidden='true'
              className={`pointer-events-none absolute left-1/2 top-full mt-1 flex items-start gap-0.5 whitespace-nowrap text-xs font-medium leading-tight text-cream/50 transition-opacity duration-700 ${githubLanded ? 'opacity-100' : 'opacity-0'}`}
            >
              <svg className='h-5 w-5 shrink-0' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round'>
                <path d='M19 20c-8-1-12-6-12-15m-3 3 3-3 3 3' />
              </svg>
              <span className='mt-3'>click me for my GitHub</span>
            </span>
          </span>
          {"JECTS".split("").map((letter, index) => (
            <motion.div aria-hidden='true' key={index + 5} custom={index + 5} className={letter === " " ? "mx-1 sm:mx-4" : ""} variants={letterVariants}>
              {letter}
            </motion.div>
          ))}
        </motion.div>
      </section>
      <div className='mx-auto w-full max-w-6xl px-6 sm:px-10'>
        <div className='grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3'>
          {projects.filter((project) => project.featured).map((project) => (
            <Project key={project.name} project={project} />
          ))}
        </div>
        <div className='more-projects mt-12 border-t border-cream/20 pt-4 text-cream'>
          <button
            type='button'
            aria-expanded={showMore}
            aria-controls={morePanelId}
            onClick={() => setShowMore((open) => !open)}
            className='more-projects-toggle inline-flex min-h-11 cursor-pointer items-center gap-2 text-left text-base font-medium text-white'
          >
            <span>{showMore ? 'Show fewer projects' : `Show ${moreProjects.length} more projects`}</span>
            <svg aria-hidden='true' className='more-projects-chevron h-4 w-4' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
              <path d='m6 9 6 6 6-6' />
            </svg>
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
