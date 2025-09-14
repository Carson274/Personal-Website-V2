import Image from 'next/image';
import { ProjectDetails } from '../Projects';
import { getCursorControls, getLinkControls } from '../../CustomCursor/CustomCursor';

const Project = ({ project }: { project: ProjectDetails }) => {
  const link = project.liveSite !== '' ? project.liveSite : project.devpost !== '' ? project.devpost : project.github;

  const handleMouseEnter = () => {
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
    const disappearAnimation = {
      opacity: 0, scale: 0.01 
    };
    getCursorControls()?.start(disappearAnimation);
    getLinkControls()?.start(disappearAnimation);
  };

  return (
    <div className='relative w-full h-full mb-8'>
      <div className='flex flex-col items-center justify-center mx-6'>
        <h2 className='text-white text-2xl my-8 font-bold text-center'>{project.name}</h2>
        <a href={link} target="_blank">
          <Image 
            className='project-image founded-lg border-2 border-brown rounded-xl' 
            src={project.imagePath} 
            alt={project.name} 
            width={400} 
            height={400} 
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}          
          />
        </a>
      </div>
    </div>
  )
}

export default Project;