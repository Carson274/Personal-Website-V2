'use client'

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface CareerCardProps {
    name: string;
    role: string;
    color: string;
    label: string;
    url: string | null;
    index: number;
}

const CareerCard = ({ name, role, color, label, url }: CareerCardProps) => {
    const [showLinks, setShowLinks] = useState(false);
    const [ref, inView] = useInView({
        triggerOnce: true,
        rootMargin: '0px 200px',
    });

    return (
        <motion.div
            ref={ref}
            className='event-card'
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.3, delay: 0, ease: [0.45, 0.8, 0.5, 0.95] }}
        >
            <div
                className='relative bg-grey rounded-xl px-4 pt-4 pb-3 flex flex-col items-center gap-2'
                style={{ border: `2px solid ${color}` }}
            >
                <p
                    className='font-extrabold text-2xl leading-none tracking-tight uppercase text-center break-words'
                    style={{ color }}
                >
                    {name}
                </p>
                <p className='text-cream text-sm font-semibold text-center leading-snug'>
                    {role}
                </p>

                <span
                    className='text-[10px] font-bold uppercase tracking-widest rounded-full px-2.5 py-1 text-center'
                    style={{ color: '#000', background: color }}
                >
                    {label}
                </span>
                {url && (
                    <div className='absolute bottom-2 right-2'>
                        <button
                            onClick={() => setShowLinks((s) => !s)}
                            className='w-6 h-6 flex items-center justify-center rounded-full bg-coffee hover:bg-brown transition-colors'
                            aria-label={`Open ${name} website`}
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
                                    <a
                                        href={url}
                                        target='_blank'
                                        rel='noopener noreferrer'
                                        className='flex items-center gap-1.5 text-[11px] text-cream px-2 py-1.5 rounded-md hover:bg-brown transition-colors whitespace-nowrap'
                                    >
                                        <svg className='w-3 h-3 flex-shrink-0' viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                                            <polyline points="15 3 21 3 21 9" />
                                            <line x1="10" y1="14" x2="21" y2="3" />
                                        </svg>
                                        {name}
                                    </a>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                )}
            </div>
        </motion.div>
    );
};

export default CareerCard;
