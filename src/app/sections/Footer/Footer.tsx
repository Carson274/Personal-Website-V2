import { profile } from '@/app/data/profile';
import './Footer.css';

export default function Footer() {
  return (
    <footer id='contact' className='w-full bg-light-cream py-12 text-coffee sm:py-16'>
      <div className='mx-auto max-w-6xl px-6 sm:px-10'>
        <div className='flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between'>
          <div className='min-w-0'>
            <h2 className='text-base font-medium sm:text-lg'>Leaving? Say hello :)</h2>
            {profile.email && (
              <a className='nav-link mt-2 inline-block text-[clamp(1.25rem,6.6vw,2.75rem)] font-bold tracking-tight [overflow-wrap:anywhere]' href={`mailto:${profile.email}`}>
                {profile.email}
              </a>
            )}
          </div>
          <div className='flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold'>
            <a className='nav-link' href={profile.linkedin} target='_blank' rel='noopener noreferrer'>LinkedIn</a>
            <a className='nav-link' href={profile.github} target='_blank' rel='noopener noreferrer'>GitHub</a>
          </div>
        </div>
        <div className='mt-10 flex items-center justify-between border-t border-coffee/20 pt-5 text-xs'>
          <p>&copy; Carson Secrest</p>
          <a className='back-to-top nav-link py-2' href='#top'>
            Back to top
            <span aria-hidden='true' className='back-to-top-arrows'>
              <span className='back-to-top-arrow'>↑</span>
              <span className='back-to-top-arrow back-to-top-arrow-incoming'>↑</span>
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
}
