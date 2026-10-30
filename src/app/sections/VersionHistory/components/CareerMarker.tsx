import Image from 'next/image';

export interface CareerMarkerProps {
  label: string;
  role: string;
  color: string;
  logoSrc?: string;
}

// Small marker for where a job starts or ends on the timeline; the date pill above it carries the date.
export default function CareerMarker({ label, role, color, logoSrc }: CareerMarkerProps) {
  return (
    <article className='flex w-full flex-col items-center gap-2 rounded-xl border-2 bg-grey px-3 py-4 text-center' style={{ borderColor: color }}>
      {logoSrc && <Image src={logoSrc} alt='' width={96} height={40} className='h-10 w-24 object-contain' />}
      <h3 className='text-sm font-semibold text-white'>{label}</h3>
      <p className='text-xs leading-snug text-cream/65'>{role}</p>
    </article>
  );
}
