import React from 'react';
import LinkedinIcon from './LinkedinIcon';
import messages from '../data/messages.json';

export default function AboutText() {
  return (
    <section className='overflow-hidden border-2 border-brown text relative rounded-2xl flex justify-center md:w-4/5 items-center'>
      <div className='text-normal text-sm sm:text-sm md:text-md lg:text-lg rounded-2xl flex flex-col z-10 justify-start gap-10 px-6 py-4 md:px-8 md:py-6 lg:px-10 lg:py-8 w-full h-full items-center bg-light-cream text-black'>
        <p>{messages.section_1}</p>
        <p>{messages.section_2}</p>
        <div className='flex flex-row gap-2 lg:gap-4 xl:gap-8'>
          <p>{messages.section_3}</p>
          <LinkedinIcon/>
        </div>
      </div>
    </section>
  )
}
