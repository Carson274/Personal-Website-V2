'use client'

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface PresentCareerCardProps {
    name: string;
    role: string;
    color: string;
    logo: string;
    url: string | null;
}

const PresentCareerCard = ({ name, role, color, logo, url }: PresentCareerCardProps) => {
    const [ref, inView] = useInView({
        triggerOnce: true,
        rootMargin: '0px 200px',
    });

    const content = (
        <div
            className='bg-grey rounded-xl p-3 h-full flex flex-col items-center gap-2'
            style={{ border: `2px solid ${color}`, boxShadow: `0 0 0 1px ${color}40` }}
        >
            <div className='relative w-12 h-12'>
                <Image
                    src={logo}
                    alt={`${name} logo`}
                    fill
                    style={{ objectFit: 'contain' }}
                    sizes="48px"
                />
            </div>
            <p className='text-cream text-xs font-semibold text-center'>{name}</p>
            <p className='text-cream/60 text-[10px] text-center'>{role}</p>
            <span
                className='text-[10px] font-semibold uppercase tracking-widest rounded-full px-2 py-0.5 text-center'
                style={{ color: '#000', background: color }}
            >
                Present
            </span>
        </div>
    );

    return (
        <motion.div
            ref={ref}
            className='event-card'
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.3, delay: 0, ease: [0.45, 0.8, 0.5, 0.95] }}
        >
            {url ? (
                <a href={url} target='_blank' rel='noopener noreferrer' className='block'>
                    {content}
                </a>
            ) : content}
        </motion.div>
    );
};

export default PresentCareerCard;
