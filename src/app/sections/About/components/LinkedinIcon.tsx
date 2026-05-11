import React from 'react'
import Image from "next/legacy/image";
import { motion, useAnimation } from 'framer-motion';
import { shake } from '../../../utils/animations';

type LinkedinIconProps = {
  className?: string;
};

function LinkedinIcon({ className }: LinkedinIconProps) {
  const linkedinControls = useAnimation();

  const linkedinVariants = {
    hop: shake
  }

  return (
    <motion.a 
      className={`flex ${className ?? 'justify-end'}`}
      href='https://www.linkedin.com/in/carson-secrest'
      target='_blank'
      animate={linkedinControls}
      variants={linkedinVariants}
      whileInView={linkedinVariants.hop}
      style={{ transformOrigin: "bottom center" }}
    >
      <Image
        className='linkedin-icon inline-block max-h-[40px] max-w-[40px] object-contain lg:max-h-[60px] lg:max-w-[60px]'
        src='/images/Linkedin.svg'
        alt='LinkedIn'
        width={40}
        height={40}
      />
    </motion.a>
  )
}

export default LinkedinIcon;