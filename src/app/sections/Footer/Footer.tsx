import { profile } from '@/app/data/profile';
import './Footer.css';

export default function Footer() {
  return (
    <footer id='contact' className='w-full bg-light-cream px-6 py-12 text-coffee sm:px-10 sm:py-16'>
      <div className='mx-auto max-w-5xl'>
        <div className='flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between'>
          <div>
            <h2 className='text-3xl font-bold tracking-tight sm:text-4xl'>Leaving? Say hello :)</h2>
          </div>
          <div className='flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold'>
            {profile.email && <a className='nav-link' href={`mailto:${profile.email}`}>Email ↗</a>}
            <a className='nav-link' href={profile.linkedin} target='_blank' rel='noopener noreferrer'>LinkedIn ↗</a>
            <a className='nav-link' href={profile.github} target='_blank' rel='noopener noreferrer'>GitHub ↗</a>
            {profile.resumeUrl && <a className='nav-link' href={profile.resumeUrl} target='_blank' rel='noopener noreferrer'>Resume ↗</a>}
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
