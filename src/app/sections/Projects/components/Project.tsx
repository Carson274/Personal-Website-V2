import React from 'react';
import Image from 'next/image';
import { ProjectDetails } from '../Projects';

const Project = ({ project }: { project: ProjectDetails }) => {
  return (
  <div className='relative w-full h-full'>
      <div className='flex flex-col items-center justify-center mx-10'>
        <h2 className='text-white text-2xl my-8 font-bold text-center'>{project.name}</h2>
        <a href={project.liveSite != '' ? project.liveSite : project.github} target="_blank">
          <Image className='project-image founded-lg border-2 border-brown rounded-xl' src={project.imagePath} alt={project.name} width={400} height={400} />
        </a>
      </div>
    </div>
  )
}

export default Project;