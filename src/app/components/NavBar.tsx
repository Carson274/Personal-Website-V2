import React from 'react';

import Image from 'next/image';

const NavBar = () => {
  return (
  <nav className='bg-black sticky rounded-t-3xl z-30 flex w-full items-center justify-between px-12 py-8 text-cream'>
      <Image src="/images/Logo_Light.svg" width={60} height={60} alt="CS Logo" />
      <div className='flex items-center space-x-12 px-4 text-lg'>
        <a href="#about" className='hover:text-brown'>about</a>
        <a href="#projects" className='hover:text-brown'>projects</a>
      </div>
    </nav>
  )
}

export default NavBar;