import React from 'react';
import ToTop from '../../components/ToTop';;

const Footer = () => {
  return (
    <section className='footer flex flex-row justify-center items-center px-12 w-full bg-light-cream overflow-hidden'>
      <div className='w-1/3'>
        <p>&copy; Carson Secrest</p>
      </div>
      <div className='w-1/3 flex justify-center'>
        <ToTop/>
      </div>
      <div className='w-1/3'></div>
    </section>
  )
}

export default Footer;