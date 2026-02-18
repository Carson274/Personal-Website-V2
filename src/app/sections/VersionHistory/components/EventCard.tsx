'use client'

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface Tag {
    name: string;
    linkedin: string;
}

interface Link {
    name: string;
    url: string;
}

interface EventCardProps {
    month: string;
    caption: string;
    imagePath: string;
    tags: Tag[];
    links: Link[];
    index: number;
}

const EventCard = ({ month, caption, imagePath, tags, links, index }: EventCardProps) => {
    const [showTags, setShowTags] = useState(false);
    const [showLinks, setShowLinks] = useState(false);
    const [ref, inView] = useInView({
        triggerOnce: true,
        rootMargin: '0px 100px',
    });

    return (
        <motion.div
            ref={ref}
            className='event-card'
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.5, delay: index * 0.1, ease: [0.45, 0.8, 0.5, 0.95] }}
        >
            <div className='bg-grey rounded-xl p-3 border border-brown h-full flex flex-col'>
                <div className='overflow-hidden rounded-lg mb-2'>
                    <Image
                        className='event-card-image rounded-lg border-2 border-cream'
                        src={imagePath}
                        alt={caption || month}
                        width={300}
                        height={225}
                        style={{ width: '100%', height: 'auto' }}
                    />
                </div>
                {caption && <p className='text-cream text-s mb-2'>{caption}</p>}

                <div className='mt-auto flex items-end justify-between relative'>
                    <span className='inline-block text-[10px] font-semibold uppercase tracking-widest text-black bg-cream rounded-full px-2 py-0.5'>
                        {month}
                    </span>

                    <div className='flex items-center gap-1.5'>
                        {links.length > 0 && (
                            <div className='relative'>
                                <button
                                    onClick={() => { setShowLinks(!showLinks); setShowTags(false); }}
                                    className='w-6 h-6 flex items-center justify-center rounded-full bg-coffee hover:bg-brown transition-colors'
                                    aria-label='Show related links'
                                >
                                    <svg className='w-3.5 h-3.5 text-cream' viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                                        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                                    </svg>
                                </button>

                                <AnimatePresence>
                                    {showLinks && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 4, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: 4, scale: 0.95 }}
                                            transition={{ duration: 0.15 }}
                                            className='absolute bottom-8 right-0 bg-coffee border border-brown rounded-lg shadow-lg py-1 px-1 min-w-[140px] z-50'
                                        >
                                            {links.map((link, i) => (
                                                <a
                                                    key={i}
                                                    href={link.url}
                                                    target='_blank'
                                                    rel='noopener noreferrer'
                                                    className='flex items-center gap-1.5 text-[11px] text-cream px-2 py-1.5 rounded-md hover:bg-brown transition-colors whitespace-nowrap'
                                                >
                                                    <svg className='w-3 h-3 flex-shrink-0' viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                                                        <polyline points="15 3 21 3 21 9" />
                                                        <line x1="10" y1="14" x2="21" y2="3" />
                                                    </svg>
                                                    {link.name}
                                                </a>
                                            ))}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        )}

                        {tags.length > 0 && (
                            <div className='relative'>
                                <button
                                    onClick={() => { setShowTags(!showTags); setShowLinks(false); }}
                                    className='w-6 h-6 flex items-center justify-center rounded-full bg-coffee hover:bg-brown transition-colors'
                                    aria-label='Show tagged people'
                                >
                                    <svg className='w-3.5 h-3.5 text-cream' viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                                        <circle cx="9" cy="7" r="4" />
                                        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                                        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                                    </svg>
                                </button>

                                <AnimatePresence>
                                    {showTags && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 4, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: 4, scale: 0.95 }}
                                            transition={{ duration: 0.15 }}
                                            className='absolute bottom-8 right-0 bg-coffee border border-brown rounded-lg shadow-lg py-1 px-1 min-w-[140px] z-50'
                                        >
                                            {tags.map((tag, i) => (
                                                <a
                                                    key={i}
                                                    href={tag.linkedin}
                                                    target='_blank'
                                                    rel='noopener noreferrer'
                                                    className='flex items-center gap-1.5 text-[11px] text-cream px-2 py-1.5 rounded-md hover:bg-brown transition-colors whitespace-nowrap'
                                                >
                                                    <svg className='w-3 h-3 flex-shrink-0' viewBox="0 0 24 24" fill="currentColor">
                                                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                                    </svg>
                                                    {tag.name}
                                                </a>
                                            ))}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default EventCard;
