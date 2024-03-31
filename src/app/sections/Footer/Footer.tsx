import React from 'react';
import ToTop from '../../components/ToTop';

const Footer = () => {
  return (
    <section className='footer flex flex-row justify-between py-8 px-12 w-full bg-light-cream'>
      <p>&copy; Carson Secrest</p>
      <ToTop />
    </section>
  )
}

export default Footer;