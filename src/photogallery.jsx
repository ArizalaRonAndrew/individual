// src/photogallery.jsx
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { gsap } from 'gsap';

const useMedia = (queries, values, defaultValue) => {
  const get = () => values[queries.findIndex(q => matchMedia(q).matches)] ?? defaultValue;
  const [value, setValue] = useState(get);

  useEffect(() => {
    const handler = () => setValue(get);
    queries.forEach(q => matchMedia(q).addEventListener('change', handler));
    return () => queries.forEach(q => matchMedia(q).removeEventListener('change', handler));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queries]);

  return value;
};

const useMeasure = () => {
  const ref = useRef(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useLayoutEffect(() => {
    if (!ref.current) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize({ width, height });
    });
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);

  return [ref, size];
};

const preloadImages = async urls => {
  await Promise.all(
    urls.map(
      src =>
        new Promise(resolve => {
          // If no src (like the add button), skip preloading
          if (!src) return resolve();
          const img = new Image();
          img.src = src;
          img.onload = img.onerror = () => resolve();
        })
    )
  );
};

const Masonry = ({
  items,
  onItemClick, 
  ease = 'power3.out',
  duration = 0.6,
  stagger = 0.05,
  animateFrom = 'bottom',
  scaleOnHover = true,
  hoverScale = 0.95,
  blurToFocus = true,
  colorShiftOnHover = false
}) => {
  const columns = useMedia(
    ['(min-width:1500px)', '(min-width:1000px)', '(min-width:600px)', '(min-width:400px)'],
    [5, 4, 3, 2],
    1
  );

  const [containerRef, { width }] = useMeasure();
  const [imagesReady, setImagesReady] = useState(false);

  // Filter out items that have images for preloading
  useEffect(() => {
    const imagesToLoad = items.filter(i => i.img).map(i => i.img);
    preloadImages(imagesToLoad).then(() => setImagesReady(true));
  }, [items]);

  const [grid, setGrid] = useState([]);

  // Calculate Grid Positions
  useMemo(() => {
    if (!width) return;
    const colHeights = new Array(columns).fill(0);
    const gap = 16;
    const totalGaps = (columns - 1) * gap;
    const columnWidth = (width - totalGaps) / columns;

    const newGrid = items.map(child => {
      const col = colHeights.indexOf(Math.min(...colHeights));
      const x = col * (columnWidth + gap);
      const height = child.height / 2;
      const y = colHeights[col];

      colHeights[col] += height + gap;
      return { ...child, x, y, w: columnWidth, h: height };
    });
    
    setGrid(newGrid);
  }, [columns, items, width]);

  const hasMounted = useRef(false);

  // Animation Logic
  useLayoutEffect(() => {
    if (!imagesReady || grid.length === 0) return;

    grid.forEach((item, index) => {
      const selector = `[data-key="${item.id}"]`;
      const animProps = { x: item.x, y: item.y, width: item.w, height: item.h };

      // Initial Animation
      if (!hasMounted.current) {
        let startY = item.y + 100; // Default fallback
        if (animateFrom === 'bottom') startY = window.innerHeight + 200;
        
        gsap.fromTo(
          selector,
          {
            opacity: 0,
            x: item.x,
            y: startY,
            width: item.w,
            height: item.h,
            ...(blurToFocus && !item.isAddButton && { filter: 'blur(10px)' })
          },
          {
            opacity: 1,
            ...animProps,
            ...(blurToFocus && { filter: 'blur(0px)' }),
            duration: 0.8,
            ease: 'power3.out',
            delay: index * stagger
          }
        );
      } else {
        // Updates (Re-layout when adding items)
        gsap.to(selector, {
          ...animProps,
          duration,
          ease,
          overwrite: 'auto'
        });
      }
    });

    hasMounted.current = true;
  }, [grid, imagesReady, stagger, animateFrom, blurToFocus, duration, ease]);

  const handleMouseEnter = (id, isAddBtn) => {
    if (scaleOnHover) {
      gsap.to(`[data-key="${id}"]`, {
        scale: hoverScale,
        duration: 0.3,
        ease: 'power2.out'
      });
    }
  };

  const handleMouseLeave = (id, isAddBtn) => {
    if (scaleOnHover) {
      gsap.to(`[data-key="${id}"]`, {
        scale: 1,
        duration: 0.3,
        ease: 'power2.out'
      });
    }
  };

  return (
    <div ref={containerRef} className="relative w-full h-full min-h-screen">
      {grid.map(item => (
        <div
          key={item.id}
          data-key={item.id}
          className="absolute box-content cursor-pointer"
          style={{ willChange: 'transform, width, height, opacity' }}
          onClick={() => onItemClick && onItemClick(item)} 
          onMouseEnter={() => handleMouseEnter(item.id, item.isAddButton)}
          onMouseLeave={() => handleMouseLeave(item.id, item.isAddButton)}
        >
          {/* LOGIC: Check kung ito ay Add Button o Normal Image */}
          {item.isAddButton ? (
             // --- STYLE NG ADD BUTTON ---
             <div className="w-full h-full rounded-[2.5rem] border-4 border-dashed border-gray-300 hover:border-pink-300 bg-gray-50 flex flex-col items-center justify-center transition-colors group">
                <div className="w-16 h-16 rounded-full bg-white shadow-md flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="text-gray-400 group-hover:text-pink-400">
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                  </svg>
                </div>
                <span className="mt-4 text-gray-400 font-bold uppercase tracking-widest text-xs group-hover:text-pink-400">Add New</span>
             </div>
          ) : (
            // --- NORMAL IMAGE ---
            <div
              className="relative w-full h-full bg-cover bg-center rounded-[2.5rem] shadow-[0px_10px_50px_-10px_rgba(0,0,0,0.2)] overflow-hidden"
              style={{ backgroundImage: `url(${item.img})` }}
            >
              {colorShiftOnHover && (
                <div className="color-overlay absolute inset-0 bg-linear-to-tr from-pink-500/50 to-sky-500/50 opacity-0 pointer-events-none" />
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Masonry;