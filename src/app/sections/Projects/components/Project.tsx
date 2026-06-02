import Image from "next/image";
import { ProjectDetails } from '../Projects';
import { getCursorControls, getLinkControls } from '../../../components/CustomCursor/CustomCursor';
import { useCursor } from '../../../components/CustomCursor/CursorContext';

const Project = ({ project }: { project: ProjectDetails }) => {
  const { setLinkType } = useCursor();

  const link = project.liveSite !== '' ? project.liveSite : project.devpost !== '' ? project.devpost : project.github;

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
    setTimeout(() => {
      getLinkControls()?.start({ 
        opacity: 1, 
        scale: 2,
        transition: { duration: 0.2, ease: "easeOut" },
      });
    }, 100);
  };

  const handleMouseLeave = () => {
    setLinkType(null);
    const disappearAnimation = {
      opacity: 0, scale: 0.01 
    };
    getCursorControls()?.start(disappearAnimation);
    getLinkControls()?.start(disappearAnimation);
  };

  return (
    <div className='relative w-full mb-8'>
      <div className='flex flex-col items-center justify-center mx-6'>
        <h2 className='text-white text-xl sm:text-2xl md:text-base lg:text-2xl my-8 font-bold text-center'>{project.name}</h2>
        <a href={link} target="_blank" className='w-full block'>
          <div
            className='relative w-full'
            style={{ aspectRatio: '16 / 9' }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {project.hackathon && (
              <span className='absolute -top-[6%] -right-[6%] z-10 block w-[16%] rotate-[35deg] pointer-events-none drop-shadow-md'>
                <Image
                  src="/images/Crown.svg"
                  alt="Hackathon project"
                  width={383}
                  height={190}
                  className='h-auto w-full'
                />
              </span>
            )}
            <div className='relative h-full w-full border-2 border-brown rounded-xl overflow-hidden'>
              <Image 
                className='rounded-xl object-cover'
                src={project.imagePath} 
                alt={project.name} 
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                priority={project.priority}
              />
            </div>
          </div>
        </a>
      </div>
    </div>
  )
}

export default Project;
