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
          background: '#E5E5E0',
          color: '#403E3A',
        }}
      >
        <div style={{ display: 'flex', position: 'relative', width: 720, height: 352, fontSize: 120, fontWeight: 400, lineHeight: 1, letterSpacing: -2 }}>
          {/* The monogram supplies the first letter of each name, as in the hero. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`data:image/svg+xml;base64,${logo}`} alt='' width={352} height={352} />
          <span style={{ position: 'absolute', left: 358, top: 132 }}>ecrest</span>
          <span style={{ position: 'absolute', left: 210, top: 236 }}>arson</span>
        </div>
      </div>
    ),
    size,
  );
}
