'use client';

import { useEffect, useState } from 'react';

const MD_QUERY = '(min-width:768px)';
const LG_QUERY = '(min-width:1024px)';

/** True when the viewport matches `query`. SSR / first paint is `false` for stable hydration; updates after mount. */
function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(query);
    const sync = () => setMatches(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, [query]);

  return matches;
}

/** True when viewport matches `md` breakpoint. */
export function useMdUp(): boolean {
  return useMediaQuery(MD_QUERY);
}

/** True when viewport matches `lg` breakpoint. */
export function useLgUp(): boolean {
  return useMediaQuery(LG_QUERY);
}
