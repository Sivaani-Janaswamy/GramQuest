import React, { useState, useRef, useEffect, useCallback } from 'react';
import RecommendationSection from './RecommendationSection';
import TrendingSection from './TrendingSection';

const MIN_WIDTH = 240;
const MAX_WIDTH = 450;
const DEFAULT_WIDTH = 320;

const Sidebar = () => {
  const [width, setWidth] = useState(DEFAULT_WIDTH);
  const sidebarRef = useRef(null);
  const isResizing = useRef(false);

  const startResizing = useCallback(() => {
    isResizing.current = true;
    document.addEventListener('mousemove', resize);
    document.addEventListener('mouseup', stopResizing);
    document.body.style.userSelect = 'none';
    document.body.style.cursor = 'ew-resize';
  }, []);

  const resize = useCallback((e) => {
    if (isResizing.current && sidebarRef.current) {
      const newWidth = e.clientX - sidebarRef.current.getBoundingClientRect().left;
      setWidth(Math.min(Math.max(newWidth, MIN_WIDTH), MAX_WIDTH));
    }
  }, []);

  const stopResizing = useCallback(() => {
    isResizing.current = false;
    document.removeEventListener('mousemove', resize);
    document.removeEventListener('mouseup', stopResizing);
    document.body.style.userSelect = '';
    document.body.style.cursor = '';
  }, [resize]);

  useEffect(() => {
    return () => {
      document.removeEventListener('mousemove', resize);
      document.removeEventListener('mouseup', stopResizing);
    };
  }, [resize, stopResizing]);

  return (
    <aside
      ref={sidebarRef}
      className="
        p-4 md:p-6
        space-y-6
        sticky top-0 min-h-screen
        bg-white
        flex flex-col
        overflow-hidden
      "
      style={{
        width: `${width}px`,
        minWidth: `${MIN_WIDTH}px`,
        maxWidth: `${MAX_WIDTH}px`,
        boxShadow: '0 0 20px rgba(0, 0, 0, 0.04)'
      }}
    >
      <RecommendationSection />
      <TrendingSection />

      <div
        className="
          absolute top-0 right-0 w-2 h-full
          cursor-ew-resize
          hover:bg-gray-100 transition-colors duration-150 ease-in-out
        "
        onMouseDown={startResizing}
      />
    </aside>
  );
};

export default Sidebar;