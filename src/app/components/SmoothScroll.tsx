'use client'

import React, { useRef, useState, useCallback, useLayoutEffect, ReactNode } from "react"
import ResizeObserver from "resize-observer-polyfill"
import {
  useScroll,
  useTransform,
  useSpring,
  motion
} from "framer-motion"
import { useMdUp } from "@/app/hooks/useMdUp"

interface SmoothScrollProps {
  children: ReactNode;
}

const STATIC_WRAPPER_CLASSES = 'flex flex-col items-center bg-light-cream'

const SmoothScroll: React.FC<SmoothScrollProps> = ({ children }) => {
  const mdUp = useMdUp()

  // scroll container
  const scrollRef = useRef(null)

  // page scrollable height based on content length
  const [pageHeight, setPageHeight] = useState(0)

  // update scrollable height when browser is resizing
  const resizePageHeight = useCallback((entries: ResizeObserverEntry[]) => {
    for (let entry of entries) {
      setPageHeight(entry.contentRect.height)
    }
  }, [])

  // ResizeObserver only feeds the smooth-scroll transform (`md` and up).
  useLayoutEffect(() => {
    if (!mdUp) {
      return
    }

    const resizeObserver = new ResizeObserver(entries =>
      resizePageHeight(entries)
    )

    const node = scrollRef.current
    if (node) {
      resizeObserver.observe(node)
    }
    return () => resizeObserver.disconnect()
  }, [mdUp, resizePageHeight])

  const { scrollY } = useScroll() // measures how many pixels user has scrolled vertically
  // as scrollY changes between 0px and the scrollable height, create a negative scroll value...
  // ... based on current scroll position to translateY the document in a natural way
  const transform = useTransform(scrollY, [0, pageHeight], [0, -pageHeight])
  const physics = { damping: 15, mass: 0.27, stiffness: 55, bounce: 0 } // no overshoot past scroll ends
  const spring = useSpring(transform, physics)

  // Native scroll on small viewports (`md`-down): no sprung translate — avoids odd touch scrolling + layout overlap.
  return (
      <motion.div
        ref={scrollRef}
        style={mdUp ? { y: spring } : undefined}
        className={STATIC_WRAPPER_CLASSES}
      >
        {children}
      </motion.div>
  )
}

export default SmoothScroll
