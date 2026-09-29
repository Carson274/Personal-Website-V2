import Image from 'next/image';

export interface CareerCardProps {
  name: string;
  role: string;
  color: string;
  logoSrc?: string;
  status?: 'Started' | 'Finished' | 'Current' | 'Incoming';
  period?: string;
  summary?: string;
}

export default function CareerCard({ name, role, color, logoSrc, status = 'Started', period, summary }: CareerCardProps) {
  return (
    <article className='event-card'>
      <div className='timeline-card-body flex flex-col items-center justify-center gap-3 rounded-xl border-2 bg-grey px-4 py-4 text-center' style={{ borderColor: color }}>
        <p className='text-[10px] font-semibold uppercase tracking-[0.16em] text-cream'>{status}</p>
        {logoSrc && <Image src={logoSrc} alt='' width={160} height={64} className='h-16 w-40 object-contain' />}
        <div>
          <h3 className='text-xl font-extrabold uppercase tracking-tight text-white'>{name}</h3>
          <p className='mt-1 text-sm font-medium leading-snug text-cream'>{role}</p>
        </div>
        {period && <p className='text-xs text-cream/65'>{period}</p>}
        {summary && <p className='text-sm leading-relaxed text-cream/90'>{summary}</p>}
      </div>
    </article>
  );
}
