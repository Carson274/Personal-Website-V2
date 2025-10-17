import React from 'react';
import Image from 'next/image';
import { getCursorControls, getLinkControls } from '../../../components/CustomCursor/CustomCursor';
import { useCursor } from '../../../components/CustomCursor/CursorContext';

export default function GitHubIcon() {
  const { setLinkType } = useCursor();

  const handleMouseEnter = () => {
    setLinkType('github');

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
    <a
      className='flex justify-end cursor-none'
      href='https://github.com/Carson274'
      target='_blank'
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Image 
        className='github-rolling-icon' 
        src='/images/GitHub.svg' 
        alt='GitHub' 
        width={60} 
        height={60} 
        style={{ 
          height: "1em",
          width: "auto",
          verticalAlign: "middle"
        }}
      />
    </a>
  )
}
