import Image from 'next/image';
import './Hero.css';

const Hero = () => {
  return (
    <section aria-labelledby='hero-title' className='hero relative flex w-full flex-col items-center justify-center bg-light-cream px-6 pb-32 pt-12 text-coffee'>
      <h1 id='hero-title' className='sr-only'>Carson Secrest — software developer</h1>
      <div className='flex w-full flex-col items-center'>
        <div aria-hidden='true' className='logo-div relative flex h-44 w-44 scale-[0.8] items-center sm:scale-100'>
          <div className='logo z-10 relative w-44 h-44'>
            <Image src="/images/Logo_Dark.svg" alt="Logo" fill className="object-contain" priority />
          </div>
          <div className='text-div z-0 absolute flex flex-col items-center mb-0'>
            <section className='secrest z-0 flex flex-row' >
              <div className='secrest-cover z-10 flex absolute w-full h-full bg-light-cream'></div>
              <section className='e'>e</section>
              <section className='c'>c</section>
              <section className='r'>r</section>
              <section className='e'>e</section>
              <section className='s'>s</section>
              <section className='t'>t</section>
            </section>
            <section className='carson z-20 flex flex-row' >
              <div className='carson-cover z-30 flex absolute w-full h-full bg-light-cream'></div>
              <section className='a'>a</section>
              <section className='r'>r</section>
              <section className='s'>s</section>
              <section className='o'>o</section>
              <section className='n'>n</section>
            </section>
          </div>
        </div>

        <div className='mt-12 max-w-md text-center sm:mt-16'>
          <p className='text-balance text-sm text-coffee/80'>CS @ Oregon State | Prev @ Netflix</p>
          <div className='mt-7 flex flex-wrap justify-center gap-3'>
            <a href='#projects' className='rounded-full bg-coffee px-6 py-3 text-sm font-medium text-light-cream transition-colors hover:bg-brown'>View projects ↓</a>
            <a href='#contact' className='rounded-full border border-coffee/30 px-6 py-3 text-sm font-medium hover:bg-coffee/5'>Get in touch</a>
          </div>
        </div>
      </div>
      <a href='#about' aria-label='Scroll to About' className='absolute bottom-6 left-1/2 -translate-x-1/2 rounded p-2 text-coffee/60 transition-colors hover:text-coffee'>
        <svg aria-hidden='true' className='hero-scroll-arrow h-6 w-6' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round'>
          <path d='M12 4v16m-6-6 6 6 6-6' />
        </svg>
      </a>
    </section>
  );
}

export default Hero;
