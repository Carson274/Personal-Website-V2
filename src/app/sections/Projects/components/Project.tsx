import Image from "next/image";
import { useId } from 'react';
import type { ProjectDetails } from '../Projects';
import { getCursorControls, getLinkControls } from '../../../components/CustomCursor/CustomCursor';
import { useCursor } from '../../../components/CustomCursor/CursorContext';

function AwardText({ text }: { text: string }) {
  return text.split(/(Won\s+(?:\d+(?:st|nd|rd|th)\s+place|best use of)|Gemini)/gi).map((part, index) => {
    if (/^Gemini$/i.test(part)) return <span key={index} className='award-gemini'>{part}</span>;
    if (/^Won\s/i.test(part)) return <span key={index} className='award-placement'>{part}</span>;
    return part;
  });
}

const Project = ({ project }: { project: ProjectDetails }) => {
  const { setLinkType } = useCursor();
  const awardId = useId();

  const link = project.liveSite || project.devpost || project.github;

  const getLinkType = () => {
    if (project.liveSite) return 'site';
    if (project.devpost) return 'devpost';
    if (project.github) return 'github';
    return null;
  };
  

  const handleMouseEnter = () => {
    setLinkType(getLinkType());

    getCursorControls()?.start({
      opacity: 1,
      scale: 3,
      transition: { duration: 0.1, ease: "easeOut" }
    });
    getLinkControls()?.start({
      opacity: 1,
      scale: 2,
      transition: { duration: 0.2, ease: 'easeOut' },
    });
  };

  const handleMouseLeave = () => {
    setLinkType(null);
    const disappearAnimation = {
      opacity: 0, scale: 0.01 
    };
    getCursorControls()?.start(disappearAnimation);
    getLinkControls()?.start(disappearAnimation);
  };

  const links = [
    { label: 'Live site', href: project.liveSite },
    { label: 'GitHub', href: project.github },
    { label: 'Demo', href: project.devpost },
  ].filter((item) => item.href);

  return (
    <article className='flex min-w-0 flex-col'>
      <a
        href={link}
        target='_blank'
        rel='noopener noreferrer'
        aria-label={`${project.name} — ${project.liveSite ? 'live demo' : project.devpost ? 'hackathon submission' : 'GitHub'}`}
        aria-describedby={project.hackathon ? awardId : undefined}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className='project-preview relative mb-5 block w-full'
      >
        <div className='relative aspect-video overflow-hidden rounded-xl border border-cream/20'>
          <Image
            className='object-cover'
            src={project.imagePath}
            alt={`${project.name} preview`}
            fill
            sizes='(min-width: 1024px) 340px, (min-width: 640px) 45vw, 90vw'
          />
        </div>
        {project.hackathon && (
          <span className='crown-host absolute -right-3 -top-3 z-20 w-12'>
            <span aria-hidden='true' className='relative block rotate-[25deg]'>
              <Image src='/images/Crown.svg' alt='' width={383} height={190} className='h-auto w-full' />
              <span className='crown-shine' />
            </span>
            <span role='tooltip' id={awardId} className='crown-tooltip'>
              <AwardText text={project.hackathon} />
            </span>
          </span>
        )}
      </a>
      <div className='flex min-w-0 flex-1 flex-col'>
        <h3 className='text-xl font-bold text-white'>{project.name}</h3>
        <p className='mt-2 text-sm leading-relaxed text-cream/90'>{project.description}</p>
        {project.contribution && <p className='mt-3 text-sm leading-relaxed text-cream/75'>{project.contribution}</p>}
        {project.technologies.length > 0 && <p className='mt-3 text-xs leading-relaxed text-cream/65'>{project.technologies.join(' · ')}</p>}
        {project.hackathon && <p className='mt-3 text-xs leading-relaxed text-cream'><AwardText text={project.hackathon} /></p>}
        <div className='mt-auto flex flex-wrap gap-x-5 gap-y-1 pt-3 text-sm font-medium text-white'>
          {links.map(({ label, href }) => (
            <a key={label} href={href} target='_blank' rel='noopener noreferrer' aria-label={`${label} — ${project.name}`} className='nav-link inline-flex min-h-11 items-center'>{label} ↗</a>
          ))}
        </div>
      </div>
    </article>
  );
}

export default Project;
