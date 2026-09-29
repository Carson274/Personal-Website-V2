'use client';

import { useEffect, useRef } from 'react';
import { profile } from '@/app/data/profile';

export default function NavBar() {
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const header = headerRef.current;
    const about = document.getElementById('about');
    const footer = document.getElementById('contact');
    if (!header || !about || !footer) return;

    const root = document.documentElement;
    const clamp = (value: number) => Math.min(1, Math.max(0, value));
    let frame = 0;

    // Use the same boundary for the About corners and the header colors.
    // Motion stays in CSS variables instead of re-rendering on every scroll.
    const update = () => {
      frame = 0;
      const height = header.offsetHeight;
      const aboutTop = about.getBoundingClientRect().top;
      const footerTop = footer.getBoundingClientRect().top;
      const isDark = aboutTop <= height + 1 && footerTop > height;
      const radius = 64 * clamp((aboutTop - height) / Math.max(1, window.innerHeight - height));
      root.style.setProperty('--header-height', `${height}px`);
      root.style.setProperty('--nav-dark', isDark ? '100%' : '0%');
      root.style.setProperty('--about-radius', `${radius}px`);
    };
    const scheduleUpdate = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    const observer = new ResizeObserver(scheduleUpdate);
    observer.observe(header);
    observer.observe(document.body);
    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate);
    update();

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
      cancelAnimationFrame(frame);
      ['--header-height', '--nav-dark', '--about-radius'].forEach((name) => root.style.removeProperty(name));
    };
  }, []);

  return (
    <header ref={headerRef} className='site-header sticky top-0 z-40 w-full'>
      <nav aria-label='Main navigation' className='mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-10'>
        <a href='#top' aria-label='Carson Secrest — back to top' className='shrink-0 rounded'>
          <span aria-hidden='true' className='nav-logo block h-9 w-9' />
        </a>
        <div className='flex flex-wrap items-center justify-end gap-x-2 gap-y-1 text-xs font-medium sm:gap-x-7 sm:text-sm'>
          <a className='nav-link' href='#about'>About</a>
          <a className='nav-link' href='#version-control'>Experience</a>
          <a className='nav-link' href='#projects'>Projects</a>
          {profile.resumeUrl && <a className='nav-link' href={profile.resumeUrl} target='_blank' rel='noopener noreferrer'>Resume ↗</a>}
          <a className='nav-link' href='#contact'>Contact</a>
        </div>
      </nav>
    </header>
  );
}
