import React from 'react'
import Image from "next/legacy/image";
import { motion, useAnimation } from 'framer-motion';
import { shake } from '../../../utils/animations';
function LinkedinIcon() {
  const linkedinControls = useAnimation();

  const linkedinVariants = {
    hop: shake
  }

  return (
    <motion.a 
      className='flex justify-end'
      href='https://www.linkedin.com/in/carson-secrest'
      target='_blank'
      animate={linkedinControls}
      variants={linkedinVariants}
      whileInView={linkedinVariants.hop}
      style={{ transformOrigin: "bottom center" }}
    >
      <Image className='linkedin-icon inline-block' src='/images/Linkedin.svg' alt='LinkedIn' width={100} height={100} />
    </motion.a>
  )
}

export default LinkedinIcon;