'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { motion, useMotionValue, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Link, Linkedin } from 'lucide-react';
import { useCursor } from './CursorContext';
import './CustomCursor.css';

const CustomCursor = () => {
  const { linkType, setLinkType } = useCursor();
  const reducedMotion = useReducedMotion();
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  useEffect(() => {
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
    let activeTarget: HTMLElement | null = null;

    const clear = () => {
      activeTarget?.removeAttribute('data-cursor-active');
      activeTarget = null;
      setLinkType(null);
    };

    const move = (event: PointerEvent) => {
      if (!finePointer.matches || event.pointerType !== 'mouse') {
        clear();
        return;
      }

      x.set(event.clientX);
      y.set(event.clientY);
      const target = event.target instanceof Element
        ? event.target.closest<HTMLElement>('[data-cursor-link]')
        : null;
      if (target === activeTarget) return;

      clear();
      const type = target?.dataset.cursorLink;
      if (target && (type === 'github' || type === 'devpost' || type === 'site' || type === 'linkedin')) {
        activeTarget = target;
        target.setAttribute('data-cursor-active', 'true');
        setLinkType(type);
      }
    };

    const leaveWindow = (event: PointerEvent) => {
      if (!event.relatedTarget) clear();
    };

    window.addEventListener('pointermove', move, { passive: true });
    window.addEventListener('pointerover', move, { passive: true });
    window.addEventListener('pointerout', leaveWindow);
    window.addEventListener('blur', clear);
    // A scrolled target may no longer be underneath a stationary pointer.
    window.addEventListener('scroll', clear, true);
    finePointer.addEventListener('change', clear);
    return () => {
      clear();
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerover', move);
      window.removeEventListener('pointerout', leaveWindow);
      window.removeEventListener('blur', clear);
      window.removeEventListener('scroll', clear, true);
      finePointer.removeEventListener('change', clear);
    };
  }, [setLinkType, x, y]);

  return (
    <motion.div className='cursor-position' style={{ x, y }} aria-hidden='true'>
      <motion.div
        className='custom-cursor'
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: linkType ? 1 : 0, scale: linkType ? 1 : 0 }}
        transition={{ duration: reducedMotion ? 0 : 0.12, ease: 'easeOut' }}
      >
        <ArrowUpRight color='#403E3A' strokeWidth={1.5} size={28} />
      </motion.div>
      <motion.div
        className='cursor-link'
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: linkType ? 1 : 0, scale: linkType ? 1 : 0 }}
        transition={{ duration: reducedMotion ? 0 : 0.16, ease: 'easeOut' }}
      >
        {linkType === 'github' && <Image src='/images/GitHub_Brown.svg' alt='' width={14} height={14} />}
        {linkType === 'devpost' && <Image src='/images/Devpost_Brown.svg' alt='' width={14} height={14} />}
        {linkType === 'site' && <Link color='#403E3A' strokeWidth={2} size={14} />}
        {linkType === 'linkedin' && <Linkedin color='#403E3A' strokeWidth={2} size={14} />}
      </motion.div>
    </motion.div>
  );
};

export default CustomCursor;
