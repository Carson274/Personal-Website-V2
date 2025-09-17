import React from 'react'
import Image from 'next/image';
import { motion, useAnimation } from 'framer-motion';

function LinkedinIcon() {
  const linkedinControls = useAnimation();

  const linkedinVariants = {
    hop: {
      y: [0, -20, 0, -12, 0, -3, 0],
      scaleX: [1, 0.97, 1.08, 0.99, 1.03, 1],
      scaleY: [1, 1.05, 0.92, 1.02, 0.97, 1],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut",
        repeatDelay: 2
      }
    }
  }

  return (
    <motion.a 
      className='flex justify-end'
      href='https://www.linkedin.com/in/carson-secrest'
      target='_blank'
      animate={linkedinControls}
      variants={linkedinVariants}
      whileInView={linkedinVariants.hop}
    >
      <Image className='linkedin-icon inline-block' src='/images/Linkedin.svg' alt='LinkedIn' width={100} height={100} />
    </motion.a>
  )
}

export default LinkedinIcon;