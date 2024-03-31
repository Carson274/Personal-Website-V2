'use client'

import React from 'react';

const ToTop = () => {
  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <div className="button">
      <button onClick={scrollTop}>Go Back Up</button>
    </div>
  )
}

export default ToTop;