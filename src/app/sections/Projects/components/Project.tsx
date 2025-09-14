import Image from 'next/image';
import { ProjectDetails } from '../Projects';
import { getCursorControls } from '../../CustomCursor/CustomCursor';

const Project = ({ project }: { project: ProjectDetails }) => {
  const link = project.liveSite !== '' ? project.liveSite : project.devpost !== '' ? project.devpost : project.github;

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
            onMouseEnter={() => getCursorControls()?.start({ opacity: 1, scale: 3 })}
            onMouseLeave={() => getCursorControls()?.start({ opacity: 0, scale: 0.01 })}
          />
        </a>
      </div>
    </div>
  )
}

export default Project;