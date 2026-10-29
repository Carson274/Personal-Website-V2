import Image from 'next/image';

export interface CareerStartMarkerProps {
  name: string;
  role: string;
  color: string;
  logoSrc?: string;
}

// The finished card tells the full story, so a start only needs a small marker on the line.
export default function CareerStartMarker({ name, role, color, logoSrc }: CareerStartMarkerProps) {
  return (
    <article className='flex w-full flex-col items-center gap-2 rounded-xl border-2 bg-grey px-3 py-4 text-center' style={{ borderColor: color }}>
      {logoSrc && <Image src={logoSrc} alt='' width={96} height={40} className='h-10 w-24 object-contain' />}
      <h3 className='text-sm font-semibold text-white'>Started at {name}</h3>
      <p className='text-xs leading-snug text-cream/65'>{role}</p>
    </article>
  );
}
