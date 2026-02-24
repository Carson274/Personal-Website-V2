'use client'

import React, { useEffect } from 'react';
import Image from "next/legacy/image";
import './Hero.css';
import { useScroll, useTransform, motion } from "framer-motion"

const Hero = () => {
  useEffect(() => {
    const logo = document.querySelector<HTMLImageElement>('.logo')!;
    const secrest = document.querySelector<HTMLElement>('.secrest')!;
    const carson = document.querySelector<HTMLElement>('.carson')!;

    logo.style.animation = 'slideLeft 1.2s 0.0s cubic-bezier(0.215, 0.610, 0.355, 1) forwards';

    // make it so that when the animation has ended, the logo will stay in place to the left 100%
    logo.addEventListener('animationend', () => {
      logo.style.left = '-99px';
      logo.style.animation = '';
    }, { once: true });

    setTimeout(() => {
      // make each letter in carson slide up one at a time
      Array.from(carson.children).forEach((letter, index) => {
        if (letter.tagName === 'SECTION') {
          (letter as HTMLElement).style.animation = `slideUp 0.6s ${index * 0.02}s ease forwards`;
        }
      });
      
      setTimeout(() => {
        // make each letter in secrest slide up one at a time
        Array.from(secrest.children).forEach((letter, index) => {
          if (letter.tagName === 'SECTION') {
            (letter as HTMLElement).style.animation = `slideUp 0.6s ${index * 0.02}s ease forwards`;
          }
        });
      }, 400);
    }, 400);

    const scroll = document.querySelector<HTMLElement>('.scroll')!;

    // make the scroll text slideDown infinitely
    scroll.style.animation = 'slideDown 1.5s 1s cubic-bezier(0.87, 0, 0.13, 1) infinite';

  }, []);

  const { scrollYProgress } = useScroll();

  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <section className='hero top-0 flex justify-center items-center min-h-screen bg-light-cream w-full sticky'>
      <motion.div style={{ opacity: opacity }}className='logo-div flex items-center'>
        <div className='logo z-10 relative w-44 h-44'>
          <Image src="/images/Logo_Dark.svg" alt="Logo" layout='fill' objectFit='contain' priority={true} />
        </div>
        <div className='text-div z-0 absolute flex flex-col items-center mb-0'>
          <section className='secrest z-0 flex flex-row' >
            <div className='secrest-cover z-10 flex absolute w-full h-full bg-light-cream'></div>
            <section className='e'>e</section>
            <section className='c'>c</section>
            <section className='r'>r</section>
            <section className='e'>e</section>
            <section className='s'>s</section>
            <section className='t'>t</section>
          </section>
          <section className='carson z-20 flex flex-row' >
            <div className='carson-cover z-30 flex absolute w-full h-full bg-light-cream'></div>
            <section className='a'>a</section>
            <section className='r'>r</section>
            <section className='s'>s</section>
            <section className='o'>o</section>
            <section className='n'>n</section>
          </section>
        </div>  
      </motion.div>
      <div className='absolute bottom-12 right-0 flex flex-col items-center justify-center space-y-8'>
        <div className='scroll-text rotate-90 text-body-3'>scroll</div>
        <div className='relative h-1 w-10 rotate-90 overflow-hidden mr-1'>
          <div className='scroll absolute h-[0.08em] w-10 translate-x-10 bg-coffee'></div>
        </div>
      </div>
    </section>
  )
}

export default Hero;