import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

export const alt = 'Carson Secrest with the CS monogram';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function SocialPreview() {
  const logo = await readFile(join(process.cwd(), 'public/images/Logo_Dark.svg'), 'base64');

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          width: '100%',
          height: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 56,
          background: '#E5E5E0',
          color: '#403E3A',
        }}
      >
        {/* ImageResponse renders this image directly into the preview PNG. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`data:image/svg+xml;base64,${logo}`} alt='' width={200} height={200} />
        <div style={{ display: 'flex', flexDirection: 'column', fontSize: 86, fontWeight: 600, lineHeight: 1.08, letterSpacing: -3 }}>
          <span>Carson</span>
          <span>Secrest</span>
        </div>
      </div>
    ),
    size,
  );
}
