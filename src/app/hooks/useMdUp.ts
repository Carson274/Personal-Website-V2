'use client';

import { useEffect, useState } from 'react';

const QUERY = '(min-width:768px)';

/** True when viewport matches `md` breakpoint. SSR / first paint is `false` for stable hydration; updates after mount. */
export function useMdUp(): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(QUERY);
    const sync = () => setMatches(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  return matches;
}
