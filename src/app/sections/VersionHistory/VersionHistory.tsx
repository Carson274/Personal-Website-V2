'use client'

import React, { useEffect, useRef, useState } from 'react';
import './VersionHistory.css';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import EventCard from './components/EventCard';
import CareerCard from './components/CareerCard';
import eventsJson from './data/events.json';
import careersJson from './data/careers.json';

interface Tag {
    name: string;
    linkedin: string;
}

interface Link {
    name: string;
    url: string;
}

interface EventDetails {
    month: string;
    caption: string;
    imagePath: string;
    career?: string;
    tags: Tag[];
    links: Link[];
}

interface CareerDetails {
    name: string;
    role: string;
    color: string;
    logo: string;
    startMonth: string;
    endMonth: string | null;
    url: string | null;
}

// Unified timeline item
type TimelineItem =
    | { type: 'event'; data: EventDetails; sortDate: number }
    | { type: 'career-start'; data: CareerDetails; careerIndex: number; sortDate: number }
    | { type: 'career-end'; data: CareerDetails; careerIndex: number; sortDate: number };

function monthToSortDate(month: string): number {
    const months: Record<string, number> = {
        'January': 1, 'February': 2, 'March': 3, 'April': 4,
        'May': 5, 'June': 6, 'July': 7, 'August': 8,
        'September': 9, 'October': 10, 'November': 11, 'December': 12,
    };
    const parts = month.split(' ');
    const m = months[parts[0]] || 1;
    const y = parseInt(parts[1]) || 2024;
    return y * 100 + m;
}

// Build unified sorted timeline (oldest first → left to right)
function buildTimeline(events: EventDetails[], careers: CareerDetails[]): TimelineItem[] {
    const items: TimelineItem[] = [];

    events.forEach((e) => {
        items.push({ type: 'event', data: e, sortDate: monthToSortDate(e.month) });
    });

    careers.forEach((c, ci) => {
        items.push({ type: 'career-start', data: c, careerIndex: ci, sortDate: monthToSortDate(c.startMonth) });
        if (c.endMonth) {
            items.push({ type: 'career-end', data: c, careerIndex: ci, sortDate: monthToSortDate(c.endMonth) });
        } else {
            // "Present" — sort to the far right
            items.push({ type: 'career-end', data: c, careerIndex: ci, sortDate: 999999 });
        }
    });

    // Sort descending (newest first, left to right)
    items.sort((a, b) => b.sortDate - a.sortDate);
    return items;
}

const COLUMN_WIDTH = 260;
const COLUMN_GAP = 24; // 1.5rem
const MD_COLUMN_WIDTH = 300;
const PADDING_LEFT = 32; // 2rem

const VersionHistory = () => {
    const controls = useAnimation();
    const events: EventDetails[] = eventsJson;
    const careers: CareerDetails[] = careersJson as CareerDetails[];
    const timeline = buildTimeline(events, careers);

    const scrollRef = useRef<HTMLDivElement>(null);
    const [colWidth, setColWidth] = useState(COLUMN_WIDTH);

    useEffect(() => {
        const updateWidth = () => {
            setColWidth(window.innerWidth >= 768 ? MD_COLUMN_WIDTH : COLUMN_WIDTH);
        };
        updateWidth();
        window.addEventListener('resize', updateWidth);
        return () => window.removeEventListener('resize', updateWidth);
    }, []);

    const [ref, inView] = useInView({
        triggerOnce: true,
        rootMargin: '-400px 0px',
    });

    useEffect(() => {
        if (inView) {
            controls.start('visible');
        }
    }, [controls, inView]);

    // Auto-scroll so "Present" (first item, index 0) is centered
    useEffect(() => {
        if (scrollRef.current) {
            const containerWidth = scrollRef.current.clientWidth;
            // Center of first column
            const targetScroll = 0; // item 0 is already at the left, center it
            const centerOffset = (colWidth / 2) - (containerWidth / 2) + PADDING_LEFT;
            scrollRef.current.scrollLeft = Math.max(0, centerOffset);
        }
    }, [colWidth]);

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

    // Compute branch lines: for each career, find the column index of start and end
    const branchLines: { startCol: number; endCol: number; color: string; level: number }[] = [];

    // Assign levels to avoid overlap
    const careerStartCols: Record<number, number> = {};
    const careerEndCols: Record<number, number> = {};

    timeline.forEach((item, idx) => {
        if (item.type === 'career-start') {
            careerStartCols[item.careerIndex] = idx;
        } else if (item.type === 'career-end') {
            careerEndCols[item.careerIndex] = idx;
        }
    });

    // Sort careers by start column to assign levels
    // Use greedy interval scheduling: careers that don't overlap share the same level
    // With descending sort, endCol < startCol, so use min/max for actual left/right positions
    const sortedCareerIndices = Object.keys(careerStartCols)
        .map(Number)
        .sort((a, b) => {
            const aLeft = Math.min(careerStartCols[a], careerEndCols[a]);
            const bLeft = Math.min(careerStartCols[b], careerEndCols[b]);
            return aLeft - bLeft;
        });

    const levelRightCols: number[] = []; // tracks the rightmost column of each level

    sortedCareerIndices.forEach((ci) => {
        const leftCol = Math.min(careerStartCols[ci], careerEndCols[ci]);
        const rightCol = Math.max(careerStartCols[ci], careerEndCols[ci]);
        // Find a level where this career doesn't overlap
        let assignedLevel = -1;
        for (let l = 0; l < levelRightCols.length; l++) {
            if (levelRightCols[l] < leftCol) {
                assignedLevel = l;
                levelRightCols[l] = rightCol;
                break;
            }
        }
        if (assignedLevel === -1) {
            assignedLevel = levelRightCols.length;
            levelRightCols.push(rightCol);
        }
        branchLines.push({
            startCol: careerStartCols[ci],
            endCol: careerEndCols[ci],
            color: careers[ci].color,
            level: assignedLevel,
        });
    });

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

            {/* Horizontal timeline */}
            <div className='timeline-row mt-4'>
                <div className='timeline-line' />
                <div className='version-scroll' ref={scrollRef}>
                    {/* Branch lines rendered as absolutely positioned divs */}
                    {branchLines.map((branch, i) => {
                        const startX = PADDING_LEFT + branch.startCol * (colWidth + COLUMN_GAP) + colWidth / 2;
                        const endX = PADDING_LEFT + branch.endCol * (colWidth + COLUMN_GAP) + colWidth / 2;
                        const branchY = 26 + branch.level * 6;
                        const leftX = Math.min(startX, endX);
                        const lineWidth = Math.abs(endX - startX);
                        return (
                            <div
                                key={`branch-${i}`}
                                className='branch-line'
                                style={{
                                    position: 'absolute',
                                    top: branchY,
                                    left: leftX,
                                    width: lineWidth,
                                    height: 2,
                                    background: branch.color,
                                    zIndex: 0,
                                    pointerEvents: 'none',
                                }}
                            />
                        );
                    })}

                    {timeline.map((item, index) => {
                        if (item.type === 'event') {
                            const e = item.data as EventDetails;
                            // Look up career color if the event is associated with a career
                            const careerColor = e.career
                                ? careers.find(c => c.name === e.career)?.color
                                : undefined;
                            return (
                                <div key={`event-${index}`} className='event-column'>
                                    <div
                                        className='event-node'
                                        style={careerColor ? { borderColor: careerColor } : undefined}
                                    />
                                    <div
                                        className='event-connector'
                                        style={careerColor ? { background: careerColor } : undefined}
                                    />
                                    <span
                                        className='event-date'
                                        style={careerColor ? { background: careerColor, color: '#000' } : undefined}
                                    >
                                        {e.month}
                                    </span>
                                    <EventCard
                                        month={e.month}
                                        caption={e.caption}
                                        imagePath={e.imagePath}
                                        tags={e.tags}
                                        links={e.links}
                                        index={index}
                                    />
                                </div>
                            );
                        } else {
                            // career-start or career-end
                            const c = item.data as CareerDetails;
                            const isStart = item.type === 'career-start';
                            const label = isStart
                                ? `Started ${c.startMonth}`
                                : c.endMonth
                                    ? `Ended ${c.endMonth}`
                                    : 'Present';

                            // Find the branch level for the connector height
                            const branch = branchLines.find(b =>
                                b.startCol === (isStart ? index : -1) || b.endCol === (!isStart ? index : -1)
                            );
                            const ci = (item as any).careerIndex;
                            const careerBranch = branchLines.find(b => b.startCol === careerStartCols[ci]);
                            const branchY = careerBranch ? 26 + careerBranch.level * 6 : 26;

                            return (
                                <div key={`career-${index}`} className='event-column'>
                                    {/* Colored node on the main timeline */}
                                    <div
                                        className='event-node'
                                        style={{ borderColor: c.color, background: '#000' }}
                                    />
                                    {/* Colored connector from timeline to branch level */}
                                    <div
                                        className='career-connector'
                                        style={{
                                            background: c.color,
                                            height: `${branchY - 20 + 8}px`,
                                        }}
                                    />
                                    {/* Date badge with career color */}
                                    <span
                                        className='event-date'
                                        style={{ background: c.color, color: '#000' }}
                                    >
                                        {isStart ? c.startMonth : (c.endMonth || 'Present')}
                                    </span>
                                    {/* Career card */}
                                    <CareerCard
                                        name={c.name}
                                        role={c.role}
                                        color={c.color}
                                        logo={c.logo}
                                        label={label}
                                        url={c.url}
                                        index={index}
                                    />
                                </div>
                            );
                        }
                    })}
                </div>
            </div>
        </motion.section>
    );
};

export default VersionHistory;
