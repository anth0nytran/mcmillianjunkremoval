'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import NextImage from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Play, Maximize2 } from 'lucide-react';

export interface GalleryItem {
  src: string;
  alt: string;
  type: 'image' | 'video';
  label?: string;
}

interface GalleryGridProps {
  items: GalleryItem[];
  accentColor: string;
  actionColor: string;
}

export function GalleryGrid({ items, accentColor, actionColor }: GalleryGridProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => {
    setLightboxIndex(null);
    if (videoRef.current) videoRef.current.pause();
  };

  const goNext = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % items.length);
  }, [lightboxIndex, items.length]);

  const goPrev = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + items.length) % items.length);
  }, [lightboxIndex, items.length]);

  // Keyboard navigation
  useEffect(() => {
    if (lightboxIndex === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'ArrowLeft') goPrev();
    };
    window.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [lightboxIndex, goNext, goPrev]);

  const currentItem = lightboxIndex !== null ? items[lightboxIndex] : null;

  return (
    <>
      {/* ── Instagram-style Square Grid ── */}
      <div className="gallery-grid">
        {items.map((item, index) => (
          <button
            key={`${item.src}-${index}`}
            onClick={() => openLightbox(index)}
            className="gallery-grid-item group"
            aria-label={`View ${item.alt}`}
          >
            {/* Square container */}
            <div className="gallery-square">
              {item.type === 'image' ? (
                <NextImage
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              ) : (
                <video
                  src={item.src}
                  muted
                  playsInline
                  loop
                  preload="metadata"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  onMouseEnter={(e) => (e.target as HTMLVideoElement).play()}
                  onMouseLeave={(e) => {
                    const v = e.target as HTMLVideoElement;
                    v.pause();
                    v.currentTime = 0;
                  }}
                />
              )}

              {/* Hover overlay */}
              <div className="gallery-overlay">
                <Maximize2 className="h-6 w-6 text-white drop-shadow-lg" />
              </div>

              {/* Video play icon badge */}
              {item.type === 'video' && (
                <div className="absolute bottom-2 right-2 z-10 flex items-center gap-1 bg-black/70 backdrop-blur-sm rounded-full px-2 py-1">
                  <Play className="h-3 w-3 text-white fill-white" />
                  <span className="text-[10px] font-bold text-white uppercase tracking-wider">Video</span>
                </div>
              )}

              {/* Label badge */}
              {item.label && (
                <div
                  className="absolute top-2 left-2 z-10 px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-widest text-white shadow-sm"
                  style={{ backgroundColor: accentColor }}
                >
                  {item.label}
                </div>
              )}
            </div>
          </button>
        ))}
      </div>

      {/* ── Lightbox Modal ── */}
      <AnimatePresence>
        {lightboxIndex !== null && currentItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center"
            onClick={closeLightbox}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/95 backdrop-blur-md" />

            {/* Close button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-50 h-10 w-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors border border-white/10"
              aria-label="Close lightbox"
            >
              <X className="h-5 w-5 text-white" />
            </button>

            {/* Counter */}
            <div className="absolute top-5 left-1/2 -translate-x-1/2 z-50 text-white/60 text-sm font-mono font-bold tracking-wider">
              {lightboxIndex + 1} / {items.length}
            </div>

            {/* Navigation Prev */}
            <button
              onClick={(e) => { e.stopPropagation(); goPrev(); }}
              className="absolute left-3 md:left-6 z-50 h-12 w-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors border border-white/10"
              aria-label="Previous"
            >
              <ChevronLeft className="h-6 w-6 text-white" />
            </button>

            {/* Navigation Next */}
            <button
              onClick={(e) => { e.stopPropagation(); goNext(); }}
              className="absolute right-3 md:right-6 z-50 h-12 w-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors border border-white/10"
              aria-label="Next"
            >
              <ChevronRight className="h-6 w-6 text-white" />
            </button>

            {/* Content */}
            <motion.div
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="relative z-40 max-w-[90vw] max-h-[85vh] flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              {currentItem.type === 'image' ? (
                <img
                  src={currentItem.src}
                  alt={currentItem.alt}
                  className="max-w-full max-h-[85vh] object-contain rounded-sm shadow-2xl"
                />
              ) : (
                <video
                  ref={videoRef}
                  src={currentItem.src}
                  controls
                  autoPlay
                  playsInline
                  className="max-w-full max-h-[85vh] object-contain rounded-sm shadow-2xl"
                />
              )}
            </motion.div>

            {/* Caption */}
            {currentItem.alt && (
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-50 text-center">
                <p className="text-white/80 text-sm font-medium max-w-md">{currentItem.alt}</p>
                {currentItem.label && (
                  <span
                    className="inline-block mt-2 px-3 py-1 rounded text-[10px] font-black uppercase tracking-widest text-white"
                    style={{ backgroundColor: accentColor }}
                  >
                    {currentItem.label}
                  </span>
                )}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
