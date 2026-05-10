import React from 'react';

export default function GitHubIcon() {
  return (
    <a
      className='flex items-center justify-center'
      href='https://github.com/Carson274'
      target='_blank'
    >
      <img
        className='github-rolling-icon'
        src='/images/GitHub.svg'
        alt='GitHub'
        style={{
          height: '1em',
          width: '1em',
          display: 'block',
        }}
      />
    </a>
  )
}