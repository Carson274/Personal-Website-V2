'use client';

import React, { useState, useEffect } from 'react';
import Image from "next/legacy/image";
import { motion, useAnimation, AnimationControls } from 'framer-motion';
import './CustomCursor.css';
import { ArrowUpRight, Link } from 'lucide-react';
import { useCursor } from './CursorContext';

let globalCursorControls: AnimationControls | null = null;
let globalLinkControls: AnimationControls | null = null;

export const getCursorControls = () => globalCursorControls;
export const getLinkControls = () => globalLinkControls;

const CustomCursor = () => {
  const { linkType } = useCursor();
  const cursorControls = useAnimation();
  const linkControls = useAnimation();
  const [hasMoved, setHasMoved] = useState(false);
  
  globalCursorControls = cursorControls;
  globalLinkControls = linkControls;

  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (!hasMoved) setHasMoved(true);
  
      cursorControls.set({ 
        x: e.clientX - 10,
        y: e.clientY - 10
      });
      
      linkControls.set({
        x: e.clientX + 15,
        y: e.clientY - 30
      });
    };
  
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [cursorControls, linkControls, hasMoved]);

  return (
    <>
      {hasMoved && (
        <>
          <motion.div
            className="custom-cursor fixed top-0 left-0 w-4 h-4 bg-light-cream pointer-events-none z-40 flex items-center justify-center"
            animate={cursorControls}
            initial={{ opacity: 0 }}
          >
            <ArrowUpRight color="#403E3A" strokeWidth={1.5} size={12} />
          </motion.div>
          {linkType && (
            <motion.div
              className="cursor-link fixed top-0 left-0 w-4 h-4 bg-light-cream pointer-events-none z-50 flex items-center justify-center"
              animate={linkControls}
              initial={{ opacity: 0, x: -100, y: -100 }}
            >
              {linkType === 'github' && (
                <Image
                  src="/images/GitHub_Brown.svg"
                  alt="GitHub logo"
                  width={8}
                  height={8}
                />
              )}
              {linkType === 'devpost' && (
                <Image
                  src="/images/Devpost_Brown.svg"
                  alt="Devpost logo"
                  width={8}
                  height={8}
                />
              )}
              {linkType === 'site' && (
                <Link color="#403E3A" strokeWidth={2} size={8} />
              )}
            </motion.div>
          )}
        </>
      )}
    </>
  );
};

export default CustomCursor;
