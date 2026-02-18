'use client'

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface CareerCardProps {
    name: string;
    color: string;
    logo: string;
    label: string;
    url: string | null;
    index: number;
}

const CareerCard = ({ name, color, logo, label, url, index }: CareerCardProps) => {
    const [ref, inView] = useInView({
        triggerOnce: true,
        rootMargin: '0px 100px',
    });

    const content = (
        <div
            className='bg-grey rounded-xl p-3 h-full flex flex-col items-center gap-2'
            style={{ border: `2px solid ${color}` }}
        >
            <div className='w-12 h-12 relative flex items-center justify-center'>
                <Image
                    src={logo}
                    alt={`${name} logo`}
                    width={48}
                    height={48}
                    style={{ width: 'auto', height: '100%', objectFit: 'contain' }}
                />
            </div>
            <p className='text-cream text-xs font-semibold text-center'>{name}</p>
            <span
                className='text-[10px] font-semibold uppercase tracking-widest rounded-full px-2 py-0.5 text-center'
                style={{ color: '#000', background: color }}
            >
                {label}
            </span>
        </div>
    );

    return (
        <motion.div
            ref={ref}
            className='event-card'
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.5, delay: index * 0.1, ease: [0.45, 0.8, 0.5, 0.95] }}
        >
            {url ? (
                <a href={url} target='_blank' rel='noopener noreferrer' className='block'>
                    {content}
                </a>
            ) : content}
        </motion.div>
    );
};

export default CareerCard;
