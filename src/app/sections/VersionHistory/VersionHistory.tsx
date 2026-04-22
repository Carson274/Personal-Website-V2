'use client'

import React, { useEffect, useRef, useState } from 'react';
import './VersionHistory.css';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import EventCard from './components/EventCard';
import CareerCard from './components/CareerCard';
import PresentCareerCard from './components/PresentCareerCard';
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
    state?: 'active' | 'incoming';
}

type TimelineItem =
    | { type: 'event'; data: EventDetails; sortDate: number }
    | { type: 'career-start'; data: CareerDetails; careerIndex: number; sortDate: number }
    | { type: 'career-end'; data: CareerDetails; careerIndex: number; sortDate: number }
    | { type: 'career-incoming'; data: CareerDetails; careerIndex: number; sortDate: number };

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

function buildTimeline(events: EventDetails[], careers: CareerDetails[]): TimelineItem[] {
    const items: TimelineItem[] = [];
    const now = new Date();
    const presentSortDate = now.getFullYear() * 100 + (now.getMonth() + 1);

    events.forEach((e) => {
        items.push({ type: 'event', data: e, sortDate: monthToSortDate(e.month) });
    });

    careers.forEach((c, ci) => {
        if (c.state === 'incoming') {
            items.push({ type: 'career-incoming', data: c, careerIndex: ci, sortDate: monthToSortDate(c.startMonth) });
            return;
        }
        items.push({ type: 'career-start', data: c, careerIndex: ci, sortDate: monthToSortDate(c.startMonth) });
        if (c.endMonth) {
            items.push({ type: 'career-end', data: c, careerIndex: ci, sortDate: monthToSortDate(c.endMonth) });
        } else {
            items.push({ type: 'career-end', data: c, careerIndex: ci, sortDate: presentSortDate });
        }
    });

    items.sort((a, b) => b.sortDate - a.sortDate);
    return items;
}

const COLUMN_WIDTH = 260;
const COLUMN_GAP = 24;
const MD_COLUMN_WIDTH = 300;
const PADDING_LEFT = 32;
const MAIN_LINE_CENTER_Y = 20;
const BRANCH_BASE_Y = 26;
const BRANCH_LEVEL_STEP = 6;
const NODE_RADIUS = 7;
const MAIN_CONNECTOR_HEIGHT = 30;
const BRANCH_CONNECTOR_HEIGHT = MAIN_CONNECTOR_HEIGHT - (BRANCH_BASE_Y - MAIN_LINE_CENTER_Y);
const SCROLL_EDGE_EPSILON = 2;

const VersionHistory = () => {
    const controls = useAnimation();
    const events: EventDetails[] = eventsJson;
    const careers: CareerDetails[] = careersJson as CareerDetails[];
    const timeline = buildTimeline(events, careers);

    const scrollRef = useRef<HTMLDivElement>(null);
    const [colWidth, setColWidth] = useState(COLUMN_WIDTH);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);

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

    const handleScroll = () => {
        if (!scrollRef.current) {
            return;
        }
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        const maxScrollLeft = Math.max(0, scrollWidth - clientWidth);
        setCanScrollLeft(scrollLeft > SCROLL_EDGE_EPSILON);
        setCanScrollRight(scrollLeft < maxScrollLeft - SCROLL_EDGE_EPSILON);
    };

    const scrollByAmount = (dir: 1 | -1) => {
        if (scrollRef.current) {
            if (dir === -1 && !canScrollLeft) {
                return;
            }
            scrollRef.current.scrollBy({ left: dir * (colWidth + COLUMN_GAP) * 2, behavior: 'smooth' });
        }
    };

    useEffect(() => {
        const id = window.requestAnimationFrame(handleScroll);
        return () => window.cancelAnimationFrame(id);
    }, [colWidth, timeline]);

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

    const branchLines: { startCol: number; endCol: number; color: string; level: number }[] = [];

    const careerStartCols: Record<number, number> = {};
    const careerEndCols: Record<number, number> = {};

    timeline.forEach((item, idx) => {
        if (item.type === 'career-start') {
            careerStartCols[item.careerIndex] = idx;
        } else if (item.type === 'career-end') {
            careerEndCols[item.careerIndex] = idx;
        }
    });

    const sortedCareerIndices = Object.keys(careerStartCols)
        .map(Number)
        .filter((index) => careerEndCols[index] !== undefined)
        .sort((a, b) => {
            const aLeft = Math.min(careerStartCols[a], careerEndCols[a]);
            const bLeft = Math.min(careerStartCols[b], careerEndCols[b]);
            return aLeft - bLeft;
        });

    const levelRightCols: number[] = [];

    sortedCareerIndices.forEach((ci) => {
        const leftCol = Math.min(careerStartCols[ci], careerEndCols[ci]);
        const rightCol = Math.max(careerStartCols[ci], careerEndCols[ci]);
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
            <section className='w-full mt-12 md:mt-20 text-center'>
                <motion.div
                    className='text-white flex flex-col sm:flex-row items-center justify-center text-5xl sm:text-6xl md:text-6xl lg:text-8xl font-bold mb-2 sm:mb-8'
                    variants={containerVariants}
                >
                    <div className='flex flex-row'>
                        {"VERSION".split("").map((letter, index) => (
                            <motion.div
                                key={index}
                                custom={index}
                                variants={letterVariants}
                            >
                                {letter}
                            </motion.div>
                        ))}
                    </div>
                    <div className='hidden sm:block sm:mx-4' />
                    <div className='flex flex-row'>
                        {"HISTORY".split("").map((letter, index) => (
                            <motion.div
                                key={index + 8}
                                custom={index + 8}
                                variants={letterVariants}
                            >
                                {letter}
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </section>

            <div className='timeline-row mt-4 relative'>
                <button
                    onClick={() => scrollByAmount(-1)}
                    disabled={!canScrollLeft}
                    className={`absolute left-2 top-1/2 -translate-y-1/2 z-20 w-9 h-9 flex items-center justify-center rounded-full border text-cream transition-colors shadow-lg ${
                        !canScrollLeft
                            ? 'bg-coffee/40 border-brown/40 text-cream/40 cursor-not-allowed'
                            : 'bg-coffee border-brown hover:bg-brown'
                    }`}
                    aria-label='Scroll left'
                >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="15 18 9 12 15 6" />
                    </svg>
                </button>
                <button
                    onClick={() => scrollByAmount(1)}
                    disabled={!canScrollRight}
                    className={`absolute right-2 top-1/2 -translate-y-1/2 z-20 w-9 h-9 flex items-center justify-center rounded-full border text-cream transition-colors shadow-lg ${
                        !canScrollRight
                            ? 'bg-coffee/40 border-brown/40 text-cream/40 cursor-not-allowed'
                            : 'bg-coffee border-brown hover:bg-brown'
                    }`}
                    aria-label='Scroll right'
                >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="9 18 15 12 9 6" />
                    </svg>
                </button>

                <div className='timeline-line' />
                <div className='version-scroll' ref={scrollRef} onScroll={handleScroll}>
                    {branchLines.map((branch, i) => {
                        const startX = PADDING_LEFT + branch.startCol * (colWidth + COLUMN_GAP) + colWidth / 2;
                        const endX = PADDING_LEFT + branch.endCol * (colWidth + COLUMN_GAP) + colWidth / 2;
                        const branchY = BRANCH_BASE_Y + branch.level * BRANCH_LEVEL_STEP;
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
                            const careerIndex = e.career ? careers.findIndex((c) => c.name === e.career) : -1;
                            const careerColor = careerIndex >= 0 ? careers[careerIndex]?.color : undefined;
                            const branchForEvent = branchLines.find((branch) => branch.startCol === careerStartCols[careerIndex]);
                            const isBranchEvent = Boolean(branchForEvent);
                            const nodeMarginTop = isBranchEvent
                                ? BRANCH_BASE_Y + (branchForEvent?.level || 0) * BRANCH_LEVEL_STEP - (MAIN_LINE_CENTER_Y + NODE_RADIUS)
                                : -NODE_RADIUS;
                            const connectorHeight = isBranchEvent ? BRANCH_CONNECTOR_HEIGHT : MAIN_CONNECTOR_HEIGHT;
                            return (
                                <div key={`event-${index}`} className='event-column'>
                                    <div
                                        className='event-node'
                                        style={{
                                            ...(careerColor ? { borderColor: careerColor } : {}),
                                            marginTop: `${nodeMarginTop}px`,
                                        }}
                                    />
                                    <div
                                        className='event-connector'
                                        style={{
                                            ...(careerColor ? { background: careerColor } : {}),
                                            height: `${connectorHeight}px`,
                                        }}
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
                            const c = item.data as CareerDetails;
                            const isStart = item.type === 'career-start';
                            const isIncoming = item.type === 'career-incoming';
                            const isPresentMarker = item.type === 'career-end' && !c.endMonth;
                            const isMainLineCareerNode = isStart || isIncoming || item.type === 'career-end';
                            const nodeMarginTop = isMainLineCareerNode ? -NODE_RADIUS : 0;
                            const connectorHeight = isMainLineCareerNode ? MAIN_CONNECTOR_HEIGHT : BRANCH_CONNECTOR_HEIGHT;
                            const label = isStart
                                ? `Started ${c.startMonth}`
                                : isIncoming
                                    ? 'Incoming'
                                    : c.endMonth
                                    ? `Ended ${c.endMonth}`
                                    : 'Present';

                            return (
                                <div key={`career-${index}`} className='event-column'>
                                    <div
                                        className='event-node'
                                        style={{ borderColor: c.color, background: '#000', marginTop: `${nodeMarginTop}px` }}
                                    />
                                    <div
                                        className='event-connector'
                                        style={{ background: c.color, height: `${connectorHeight}px` }}
                                    />
                                    <span
                                        className='event-date'
                                        style={{ background: c.color, color: '#000' }}
                                    >
                                        {isStart ? c.startMonth : isIncoming ? c.startMonth : (c.endMonth || 'Present')}
                                    </span>
                                    {isPresentMarker ? (
                                        <PresentCareerCard
                                            name={c.name}
                                            role={c.role}
                                            color={c.color}
                                            logo={c.logo}
                                            url={c.url}
                                        />
                                    ) : (
                                        <CareerCard
                                            name={c.name}
                                            role={c.role}
                                            color={c.color}
                                            logo={c.logo}
                                            label={label}
                                            url={c.url}
                                            index={index}
                                        />
                                    )}
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