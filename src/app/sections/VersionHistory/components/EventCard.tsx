'use client'

import React from 'react';
import Image from "next/image";
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import AwardText from '@/app/components/AwardText';

interface Tag {
    name: string;
    linkedin: string;
    nickname?: string;
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
    careerColor?: string;
}

const SPINE_CREAM = '#f5f0e6';

// The small icon badge beside the cursor is off for now; set to true to bring it back.
const SHOW_CURSOR_BADGE = false;

function cursorBadge(type: string) {
    return SHOW_CURSOR_BADGE ? { 'data-cursor-link': type, 'data-cursor-size': 'small' } : {};
}

function cursorTypeFor(url: string) {
    if (url.includes('github.com')) return 'github';
    if (url.includes('devpost.com')) return 'devpost';
    if (url.includes('linkedin.com')) return 'linkedin';
    return 'site';
}

/**
 * Links each tagged person where the caption mentions them, by full name,
 * nickname, or first name. People the caption doesn't mention stay unlinked.
 */
function CaptionWithNames({ caption, tags }: { caption: string; tags: Tag[] }) {
    const mentions = tags
        .map((tag) => {
            const options = [tag.name, tag.nickname, tag.name.split(' ')[0]].filter((text): text is string => Boolean(text));
            for (const text of options) {
                const match = new RegExp(`\\b${text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`).exec(caption);
                if (match) return { start: match.index, end: match.index + text.length, tag };
            }
            return null;
        })
        .filter((mention): mention is NonNullable<typeof mention> => mention !== null)
        .sort((a, b) => a.start - b.start);

    const parts: React.ReactNode[] = [];
    let cursor = 0;
    mentions.forEach(({ start, end, tag }) => {
        if (start < cursor) return;
        parts.push(<AwardText key={`text-${cursor}`} text={caption.slice(cursor, start)} />);
        parts.push(
            <a
                key={tag.linkedin}
                href={tag.linkedin}
                target='_blank'
                rel='noopener noreferrer'
                {...cursorBadge('linkedin')}
                className='pointer-events-auto underline decoration-white/50 underline-offset-2 hover:decoration-white'
            >
                {caption.slice(start, end)}
            </a>
        );
        cursor = end;
    });
    parts.push(<AwardText key={`text-${cursor}`} text={caption.slice(cursor)} />);
    return <>{parts}</>;
}

const EventCard = ({ month, caption, imagePath, tags, links, careerColor }: EventCardProps) => {
    const [inViewRef, inView] = useInView({
        triggerOnce: true,
        rootMargin: '0px 200px',
    });
    const mainLink = links[0];

    return (
        <motion.div
            ref={inViewRef}
            className='event-card'
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.3, delay: 0, ease: [0.45, 0.8, 0.5, 0.95] }}
        >
            <div
                className={`relative overflow-hidden rounded-xl bg-grey ${careerColor ? '' : 'border-2'}`}
                style={
                    careerColor
                        ? { border: `2px solid ${careerColor}` }
                        : { borderColor: SPINE_CREAM, borderStyle: 'solid' }
                }
            >
                <div className='relative aspect-[4/5] w-full'>
                    <Image
                        className='object-cover'
                        src={imagePath}
                        alt={caption ? caption.replace(/\*\*/g, '') : month}
                        fill
                        sizes="(min-width: 768px) 250px, 240px"
                    />
                    {caption && (
                        // Clicks pass through to the card link, except on the linked names.
                        <p className='event-caption pointer-events-none absolute inset-x-0 bottom-0 z-20 px-3.5 pb-3.5 pt-14 text-[13px] leading-snug text-white'>
                            <CaptionWithNames caption={caption} tags={tags} />
                        </p>
                    )}
                </div>
                {/* A separate layer rather than a wrapper, since links can't contain the name links. */}
                {mainLink && (
                    <a
                        href={mainLink.url}
                        target='_blank'
                        rel='noopener noreferrer'
                        aria-label={mainLink.name}
                        {...cursorBadge(cursorTypeFor(mainLink.url))}
                        className='absolute inset-0 z-10'
                    />
                )}
            </div>
        </motion.div>
    );
};

export default EventCard;
