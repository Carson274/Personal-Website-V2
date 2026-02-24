import React from 'react'
import Image from "next/legacy/image";
import { motion, useAnimation } from 'framer-motion';
import { shake } from '../../../utils/animations';
import { getCursorControls, getLinkControls } from '../../../components/CustomCursor/CustomCursor';
import { useCursor } from '../../../components/CustomCursor/CursorContext';

function LinkedinIcon() {
  const linkedinControls = useAnimation();
  const { setLinkType } = useCursor();

  const linkedinVariants = {
    hop: shake
  }

  const handleMouseEnter = () => {
    setLinkType('site');

    getCursorControls()?.start({
      opacity: 1,
      scale: 3,
      transition: { duration: 0.1, ease: "easeOut" }
    });
    setTimeout(() => {
      getLinkControls()?.start({ 
        opacity: 1, 
        scale: 2,
        transition: { duration: 0.2, ease: "easeOut" },
      });
    }, 100);
  };

  const handleMouseLeave = () => {
    setLinkType(null);
    const disappearAnimation = {
      opacity: 0, scale: 0.01 
    };
    getCursorControls()?.start(disappearAnimation);
    getLinkControls()?.start(disappearAnimation);
  }

  return (
    <motion.a 
      className='flex justify-end cursor-none'
      href='https://www.linkedin.com/in/carson-secrest'
      target='_blank'
      animate={linkedinControls}
      variants={linkedinVariants}
      whileInView={linkedinVariants.hop}
      style={{ transformOrigin: "bottom center" }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Image className='linkedin-icon inline-block' src='/images/Linkedin.svg' alt='LinkedIn' width={100} height={100} />
    </motion.a>
  )
}

export default LinkedinIcon;