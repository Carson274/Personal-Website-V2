'use client';
import React, { useEffect } from 'react';
import { motion, useAnimation, AnimationControls } from 'framer-motion';
import './CustomCursor.css';
import { ArrowUpRight, Link } from 'lucide-react';

let globalCursorControls: AnimationControls | null = null;
let globalLinkControls: AnimationControls | null = null;

export const getCursorControls = () => globalCursorControls;
export const getLinkControls = () => globalLinkControls;

const CustomCursor = () => {
  const cursorControls = useAnimation();
  const linkControls = useAnimation();
  
  globalCursorControls = cursorControls;
  globalLinkControls = linkControls;

  useEffect(() => {
    const move = (e: MouseEvent) => {
      cursorControls.set({ 
        x: e.clientX - 10,
        y: e.clientY - 10
      });
      
      linkControls.set({
        x: e.clientX - 5 + 20,
        y: e.clientY - 10 - 20
      });
    };

    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, [cursorControls, linkControls]);

  return (
    <>
      <motion.div
        className="custom-cursor"
        animate={cursorControls}
        initial={{ opacity: 0 }}>
        <ArrowUpRight color="#403E3A" strokeWidth={1.5} size={16} />
      </motion.div>
      <motion.div
        className="cursor-link"
        animate={linkControls}
        initial={{ opacity: 0, x: 15, y: 50 }}>
        <Link color="#403E3A" strokeWidth={2} size={8} />
      </motion.div>
    </>
  );
};

export default CustomCursor;
