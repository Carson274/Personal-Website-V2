'use client';
import React, { useEffect } from 'react';
import { motion, useAnimation, AnimationControls } from 'framer-motion';
import './CustomCursor.css';

let globalCursorControls: AnimationControls | null = null;
export const getCursorControls = () => globalCursorControls;

const CustomCursor = () => {
  const cursorControls = useAnimation();
  globalCursorControls = cursorControls;

  useEffect(() => {
    const move = (e: MouseEvent) => {
      cursorControls.set({ 
        x: e.clientX - 10,
        y: e.clientY - 10
      });
    };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, [cursorControls]);

  return (
    <motion.div
      className="custom-cursor"
      animate={cursorControls}
      initial={{ opacity: 0 }}
    />
  );
};

export default CustomCursor;
