import type { ReactNode } from 'react';

// Keep content in normal document flow so anchors and the scroll height agree.
// Smooth scrolling is handled in CSS, including the reduced-motion preference.
export default function SmoothScroll({ children }: { children: ReactNode }) {
  return <div id='top' className='flex flex-col items-center bg-light-cream'>{children}</div>;
}
