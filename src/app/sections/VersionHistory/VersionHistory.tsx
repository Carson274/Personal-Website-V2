'use client'

import React, { useEffect } from 'react';
import './VersionHistory.css';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import EventCard from './components/EventCard';
import eventsJson from './data/events.json';

interface Tag {
    name: string;
    linkedin: string;
}

interface EventDetails {
    month: string;
    caption: string;
    imagePath: string;
    tags: Tag[];
}

const VersionHistory = () => {
    const controls = useAnimation();
    const events: EventDetails[] = eventsJson;

    const [ref, inView] = useInView({
        triggerOnce: true,
        rootMargin: '-400px 0px',
    });

    useEffect(() => {
        if (inView) {
            controls.start('visible');
        }
    }, [controls, inView]);

    const containerVariants = {
        hidden: { opacity: 1 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.01,
            },
        },
    };

    const letterVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: (index: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.2,
                ease: [0.45, 0.8, 0.5, 0.95],
                type: 'spring',
                stiffness: 120,
                damping: 14,
                mass: 1.3,
                delay: index * 0.05 + 0.55,
            },
        }),
    };

    return (
        <motion.section
            ref={ref}
            id="version-control"
            className='flex flex-col bg-black w-full rounded-b-3xl z-10 -mt-1 pb-12'
            initial="hidden"
            animate={controls}
            variants={containerVariants}
        >
            {/* Header */}
            <section className='w-full mt-12 md:mt-20 text-center'>
                <motion.div
                    className='text-white flex flex-row items-center justify-center text-5xl sm:text-6xl md:text-6xl lg:text-8xl font-bold mb-2 sm:mb-8'
                    variants={containerVariants}
                >
                    {"VERSION HISTORY".split("").map((letter, index) => (
                        <motion.div
                            key={index}
                            custom={index}
                            className={letter === " " ? "mx-1 sm:mx-4" : ""}
                            variants={letterVariants}
                        >
                            {letter}
                        </motion.div>
                    ))}
                </motion.div>
            </section>

            {/* Horizontal scroll */}
            <div className='version-scroll mt-4'>
                {events.map((event, index) => (
                    <EventCard
                        key={index}
                        month={event.month}
                        caption={event.caption}
                        imagePath={event.imagePath}
                        tags={event.tags}
                        index={index}
                    />
                ))}
            </div>
        </motion.section>
    );
};

export default VersionHistory;
