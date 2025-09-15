"use client"

import React, { useEffect, useRef, useState } from "react";

type navigationBarProps = {
  children: React.ReactNode;
  className?: string;
  scrollStep?: number;
  showFade?: boolean; 
};

export default function navigationBar({
  children,
  className = "",
  scrollStep = 240,
  showFade = true,
}: navigationBarProps) {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartX = useRef<number | null>(null);
  const scrollStart = useRef<number>(0);


  const updateScrollButtons = () => {
    const el = scrollerRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  };

  useEffect(() => {
    updateScrollButtons();
    const el = scrollerRef.current;
    if (!el) return;

    const onResize = () => updateScrollButtons();
    const onScroll = () => updateScrollButtons();

    window.addEventListener("resize", onResize);
    el.addEventListener("scroll", onScroll);

    // observe changes to children size (dynamic content)
    const ro = new ResizeObserver(() => updateScrollButtons());
    ro.observe(el);

    return () => {
      window.removeEventListener("resize", onResize);
      el.removeEventListener("scroll", onScroll);
      ro.disconnect();
    };
  }, []);

  // arrow handlers
  const scrollBy = (delta: number) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollTo({ left: el.scrollLeft + delta, behavior: "smooth" });
  };

  // mouse drag (desktop) + touch (mobile)
  const onPointerDown = (clientX: number) => {
    const el = scrollerRef.current;
    if (!el) return;
    setIsDragging(true);
    dragStartX.current = clientX;
    scrollStart.current = el.scrollLeft;
  };

  const onPointerMove = (clientX: number) => {
    const el = scrollerRef.current;
    if (!el || !isDragging || dragStartX.current === null) return;
    const dx = clientX - dragStartX.current;
    el.scrollLeft = scrollStart.current - dx;
  };

  const onPointerUp = () => {
    setIsDragging(false);
    dragStartX.current = null;
  };

  // keyboard support
  const onKeyDown: React.KeyboardEventHandler = (e) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      scrollBy(scrollStep);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      scrollBy(-scrollStep);
    } else if (e.key === "Home") {
      e.preventDefault();
      scrollerRef.current?.scrollTo({ left: 0, behavior: "smooth" });
    } else if (e.key === "End") {
      e.preventDefault();
      const el = scrollerRef.current;
      el?.scrollTo({ left: el.scrollWidth, behavior: "smooth" });
    }
  };

  return (
    <div className={`w-full  relative flex items-center ${className}`}>
      {/* Left arrow */}
      {canScrollLeft && (
        <button
          aria-label="Scroll left"
          onClick={() => scrollBy(-scrollStep)}
          className="absolute left-0 z-20 h-full px-2 flex items-center justify-center focus:outline-none"
          style={{ pointerEvents: "auto" }}
        >
          <div className="w-9 h-9 rounded-full flex items-center justify-center shadow-md bg-white/90 dark:bg-gray-800/90">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </div>
        </button>
      )}

      {/* Scroll container */}
      <div
        ref={scrollerRef}
        tabIndex={0}
        role="navigation"
        onKeyDown={onKeyDown}
        className={`no-scrollbar overflow-x-auto whitespace-nowrap py-2 px-6 scroll-smooth`}
       
        onMouseDown={(e) => onPointerDown(e.clientX)}
        onMouseMove={(e) => onPointerMove(e.clientX)}
        onMouseUp={onPointerUp}
        onMouseLeave={onPointerUp}
        // touch events
        onTouchStart={(e) => onPointerDown(e.touches[0].clientX)}
        onTouchMove={(e) => onPointerMove(e.touches[0].clientX)}
        onTouchEnd={onPointerUp}
      >
        {/* children should be inline-block or inline-flex items */}
        <div className="inline-flex items-center gap-3">{children}</div>
      </div>

      {/* Right arrow */}
      {canScrollRight && (
        <button
          aria-label="Scroll right"
          onClick={() => scrollBy(scrollStep)}
          className="absolute right-0 z-20 h-full px-2 flex items-center justify-center focus:outline-none"
          style={{ pointerEvents: "auto" }}
        >
          <div className="w-9 h-9 rounded-full flex items-center justify-center shadow-md bg-white/90 dark:bg-gray-800/90">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </button>
      )}

      {/* optional edge fade */}
      {showFade && (
        <>
          <div className={`pointer-events-none absolute left-0 top-0 h-full w-12 ${canScrollLeft ? "bg-gradient-to-r from-white/90 via-white/40 to-transparent" : ""}`} />
          <div className={`pointer-events-none absolute right-0 top-0 h-full w-12 ${canScrollRight ? "bg-gradient-to-l from-white/90 via-white/40 to-transparent" : ""}`} />
        </>
      )}

      <style jsx>{`
        .no-scrollbar {
          -ms-overflow-style: none; /* IE and Edge */
          scrollbar-width: none; /* Firefox */
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none; /* Chrome, Safari, Opera*/
        }
      `}</style>
    </div>
  );
}
