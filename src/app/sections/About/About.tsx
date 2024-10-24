'use client'

import React, { useEffect } from 'react';
import Image from 'next/image';
import './About.css';
import { motion, useAnimation, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Open_Sans } from 'next/font/google';
import { cubicBezier } from 'framer-motion';

const openSans = Open_Sans({ subsets: ['latin'], display: 'swap', });

const About = () => {
  const controls = useAnimation();
  const textCsControls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    rootMargin: '-400px 0px',
  });
  const [bottomRef, bottomInView] = useInView({
    rootMargin: '0px 0px',
  });

  const easeOutSlow = cubicBezier(0.215, 0.610, 0.355, 1);

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  useEffect(() => {
    if (bottomInView) {
      textCsControls.start("visible");
    }
  }, [textCsControls, bottomInView]);

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

  const slideRightVariants = {
    hidden: { x: '-100%' },
    visible: {
      x: 0,
      transition: { duration: 0.3, ease: easeOutSlow }
    },
  };

  const slideLeftVariants = {
    hidden: { x: '100%' },
    visible: {
      x: 0,
      transition: { duration: 0.3, ease: easeOutSlow }
    },
  };

  // let width = screen.width;
  // let scrollAmount = 200;
  // if(width < 1024) {
  //   scrollAmount = 200;
  // }

  // useScroll hook to get the scrollYProgress, and move the image up and down based on the scroll
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [-100, 100]);

  return (
    <motion.section
      ref={ref}
      id="about"
      className='flex flex-col bg-black w-full z-20 min-h-screen border-t-8 border-black -translate-y-5'
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
            <motion.div key={index} className={letter === " " ? "mx-1 sm:mx-4" : ""} variants={letterVariants}>
              {letter}
            </motion.div>
          ))}
        </motion.div>
      </section>
      <section className='about-section z-10 flex flex-col my-20 m:my-20 md:flex-row w-full justify-center items-center'>
        <div className='image-div flex w-3/4 md:w-1/2 h-full p-8 justify-center'>
          <motion.div 
            style={{ y }} 
            className='image relative md:mt-8 w-full rounded-2xl flex justify-center items-center'
          >
            <Image
              className='rounded-2xl'
              src='/images/Carson_Sunset.jpeg'
              alt='Picture of Me'
              width={350}
              height={100}
            />
          </motion.div>
        </div>
        <div className='text-div flex w-3/4 md:w-1/2 h-1/2 md:h-full justify-center items-center'>
          <section className='overflow-hidden border-2 border-brown text relative rounded-2xl flex justify-center w-4/5 items-center'>
            <div className='text-normal text-sm sm:text-sm md:text-md lg:text-lg rounded-2xl flex flex-col z-10 justify-start gap-10 px-6 py-4 md:px-8 md:py-6 lg:px-10 lg:py-8 w-full h-full items-center bg-light-cream text-black'>
              <p>
                Hi! I&apos;m a rising Junior computer science student
                with a focus on web development and AI.
              </p>
              <p>
                I&apos;m from Oregon, and I&apos;m currently based in
                Corvallis, OR, where I&apos;m pursuing a Bachelor of
                Science in Computer Science at
                Oregon State University. Both of my parents
                went here, so I had to continue the legacy!
              </p>
              <div className='flex flex-row gap-2 lg:gap-4 xl:gap-8'>
                <p>
                  Feel free to connect with me on
                  LinkedIn! I love meeting new people🤝
                </p>
                <a className='flex justify-end' href='https://www.linkedin.com/in/carson-secrest' target='_blank'>
                  <Image className='linkedin-icon' src='/images/Linkedin.svg' alt='LinkedIn' width={100} height={100} />
                </a>
              </div>
            </div>
            {/* <motion.div
              initial="hidden" 
              animate={textCsControls} 
              variants={slideRightVariants} 
              className='text-cs absolute text-lg rounded-2xl flex flex-col justify-start z-20 p-10 w-full h-full items-center bg-grey text-white'
            >
              <pre>
                {
  `class Carson {
    private:
      int schoolYear = 2;
    public:
      vector<string> focuses = {"web dev",
                                "AI"};
};`
                }
              </pre>

            </motion.div> */}
          </section>
        </div>
      </section>
      <section 
        ref={bottomRef} 
        className='bottom-section w-full h-1/5 bg-black'
      ></section>
    </motion.section>
  )
}

export default About;