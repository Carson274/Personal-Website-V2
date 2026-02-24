'use client'

import Image from "next/legacy/image"
import { motion, useAnimationControls } from 'framer-motion';

const ToTop = () => {
  const controls = useAnimationControls();

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  const handleHoverStart = () => {
    controls.start('rise');
  }

  const handleHoverEnd = () => {
    controls.start('initial');
  }

  return (
    <motion.div
      className='cursor-pointer relative'
      style={{ width: '75px', height: '80px' }}
      onHoverStart={handleHoverStart}
      onHoverEnd={handleHoverEnd}
    >
      <motion.button 
        className='absolute top-0 left-0 right-0 bottom-0 m-auto'
        onClick={scrollTop}
        variants={{
          initial: {
            y: 0
          },
          rise: {
            y: -100
          }
        }}
        transition={{
          duration: 0.2,
          cubicBezier: '0.16, 1, 0.3, 1'
        }}
        initial={'initial'}
        animate={controls}
      >
        <Image
          src='/images/Arrow_Up.svg'
          width={75}
          height={75}
          alt="Arrow pointing up"
        />
      </motion.button>
      <motion.button 
        className='absolute top-0 left-0 right-0 bottom-0 m-auto'
        onClick={scrollTop}
        variants={{
          initial: {
            y: 100
          },
          rise: {
            y: 0
          }
        }}
        transition={{
          duration: 0.2,
          cubicBezier: '0.16, 1, 0.3, 1'
        }}
        initial={'initial'}
        animate={controls}
      >
        <Image
          src='/images/Arrow_Up.svg'
          width={75}
          height={75}
          alt="Arrow pointing up"
        />
      </motion.button>
    </motion.div>
  )
}

export default ToTop;