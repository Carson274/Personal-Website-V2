'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

type LinkType = 'github' | 'devpost' | 'site' | null;

interface CursorContextType {
  linkType: LinkType;
  setLinkType: (type: LinkType) => void;
}

const CursorContext = createContext<CursorContextType | undefined>(undefined);

export const CursorProvider = ({ children }: { children: ReactNode }) => {
  const [linkType, setLinkType] = useState<LinkType>(null);

  return (
    <CursorContext.Provider value={{ linkType, setLinkType }}>
      {children}
    </CursorContext.Provider>
  );
};

export const useCursor = () => {
  const context = useContext(CursorContext);
  if (!context) throw new Error('useCursor must be used within CursorProvider');
  return context;
};
