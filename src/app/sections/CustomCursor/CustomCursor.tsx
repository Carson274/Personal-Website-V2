'use client';
import React, { useEffect } from 'react';
import { motion, useAnimation, AnimationControls } from 'framer-motion';
import './CustomCursor.css';
import { ArrowUpRight, Link } from 'lucide-react';

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
      initial={{ opacity: 0 }}>
      <ArrowUpRight color="#403E3A" strokeWidth={1.5} size={16} />
      <motion.div
        className="cursor-link"
        animate={{ x: 8, y: -8 }}
      >
        <Link color="#403E3A" strokeWidth={1.5} size={4} />
      </motion.div>
    </motion.div>
  );
};

export default CustomCursor;
