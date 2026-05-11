import React from 'react';
import LinkedinIcon from './LinkedinIcon';
import messages from '../data/messages.json';

export default function AboutText() {
  return (
    <section
      aria-labelledby='about-intro'
      className='flex w-full max-w-xl flex-col items-start gap-0 text-left lg:max-w-[26rem]'
    >
      <div
        id='about-intro'
        className='flex w-full flex-col gap-7 text-base leading-[1.7] tracking-[-0.01em] sm:gap-[1.35rem] sm:text-[1.02rem]'
      >
        <p className='text-pretty font-medium text-white sm:text-[1.07rem] md:text-[1.1rem] md:leading-[1.6]'>
          {messages.section_1}
        </p>
        <p className='text-pretty text-cream/95 md:text-[1.03rem] md:leading-[1.72]'>
          {messages.section_2}
        </p>
      </div>

      <div className='mt-8 w-full border-t border-cream/20 pt-7 sm:mt-9 sm:pt-8'>
        <div className='grid w-full grid-cols-[minmax(0,1fr)_auto] items-center gap-x-3 gap-y-3 lg:gap-x-4 xl:gap-x-8'>
          <p className='max-w-none min-w-0 text-[0.95rem] leading-relaxed text-cream md:text-[1rem]'>
            {messages.section_3}
          </p>
          <LinkedinIcon className='shrink-0' />
        </div>
      </div>
    </section>
  );
}
