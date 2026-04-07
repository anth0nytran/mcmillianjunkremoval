'use client';

import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import NextImage from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeftRight, Maximize2, Play, X } from 'lucide-react';

interface ProjectCardProps {
    title: string;
    location: string;
    beforeImage?: string;
    afterImage?: string;
    videoSrc?: string;
    alt: string;
    accentColor: string;
    actionColor: string;
    isSquare?: boolean;
    isVideo?: boolean;
}

export function ProjectCard({
    title,
    location,
    beforeImage,
    afterImage,
    videoSrc,
    alt,
    accentColor,
    actionColor,
    isSquare,
    isVideo
}: ProjectCardProps) {
    const [showAfter, setShowAfter] = useState(!!afterImage);
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (isLightboxOpen) {
            document.body.style.overflow = 'hidden';
            return () => { document.body.style.overflow = ''; };
        }
    }, [isLightboxOpen]);

    // Force ALL previews to exactly the same horizontal aspect to ensure the carousel flows evenly.
    // object-cover handles vertical shots elegantly.
    const aspectClass = 'aspect-[4/3]';

    return (
        <>
            <div className={`snap-center shrink-0 w-[85vw] md:w-auto flex flex-col group relative rounded-sm overflow-hidden shadow-[2px_2px_0_rgba(0,0,0,0.08)] hover:shadow-[4px_4px_0_rgba(0,0,0,0.12)] transition-all hover:-translate-y-2 bg-white`}>
                {/* Image Container */}
                <div 
                    className={`${aspectClass} relative bg-neutral-100 overflow-hidden cursor-pointer`}
                    onClick={() => setIsLightboxOpen(true)}
                >
                    {/* Before Image or Video - Always present, essentially the "background" */}
                    <div className="absolute inset-0">
                        {isVideo && videoSrc ? (
                            <video
                                src={videoSrc}
                                muted
                                playsInline
                                loop
                                preload="metadata"
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                                onMouseEnter={(e) => (e.target as HTMLVideoElement).play()}
                                onMouseLeave={(e) => {
                                    const v = e.target as HTMLVideoElement;
                                    v.pause();
                                    v.currentTime = 0;
                                }}
                            />
                        ) : beforeImage ? (
                            <NextImage
                                src={beforeImage}
                                alt={`Before - ${alt}`}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                                sizes="(max-width: 768px) 100vw, 33vw"
                            />
                        ) : (
                            <div className="w-full h-full bg-neutral-100 flex items-center justify-center">
                                <span className="text-neutral-300 text-6xl font-black opacity-50 select-none">?</span>
                            </div>
                        )}
                    </div>

                    {/* After Image - Layered on top, toggles opacity */}
                    {afterImage && (
                        <div
                            className="absolute inset-0 transition-opacity duration-500 ease-in-out"
                            style={{ opacity: showAfter ? 1 : 0 }}
                        >
                            <NextImage
                                src={afterImage}
                                alt={`After - ${alt}`}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                                sizes="(max-width: 768px) 100vw, 33vw"
                            />
                        </div>
                    )}

                    {/* Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/60 via-transparent to-transparent pointer-events-none z-10 opacity-60 group-hover:opacity-80 transition-opacity" />

                    {/* Expand Icon */}
                    <div className="absolute inset-0 z-[15] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                        <div className="bg-black/40 backdrop-blur-sm p-3 rounded-full">
                            <Maximize2 className="h-6 w-6 text-white" />
                        </div>
                    </div>

                    {/* Video play icon badge */}
                    {isVideo && (
                        <div className="absolute bottom-4 right-4 z-[20] flex items-center gap-1 bg-black/70 backdrop-blur-sm rounded-full px-2 py-1 pointer-events-none">
                            <Play className="h-3 w-3 text-white fill-white" />
                            <span className="text-[10px] font-bold text-white uppercase tracking-wider">Video</span>
                        </div>
                    )}

                    {/* Toggle Button */}
                    {afterImage && (
                        <div className="absolute top-4 right-4 z-[25]">
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setShowAfter(!showAfter);
                                }}
                                className="flex items-center gap-2 px-3 py-1.5 rounded-sm text-xs font-bold uppercase tracking-wider shadow-[2px_2px_0_rgba(0,0,0,0.1)] transition-transform hover:scale-105 active:scale-95"
                                style={{
                                    backgroundColor: showAfter ? 'white' : actionColor,
                                    color: showAfter ? 'black' : 'white',
                                }}
                            >
                                <ArrowLeftRight className="w-3 h-3" />
                                {showAfter ? 'View Before' : 'View After'}
                            </button>
                        </div>
                    )}

                    {/* State Badge */}
                    {afterImage && (
                        <div className="absolute top-4 left-4 z-[20] pointer-events-none">
                            <span
                                className="px-2 py-1 rounded-sm text-[10px] font-black uppercase tracking-widest text-white shadow-sm transition-colors duration-300"
                                style={{ backgroundColor: showAfter ? accentColor : '#525252' }}
                            >
                                {showAfter ? 'After Results' : 'Before Work'}
                            </span>
                        </div>
                    )}
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between bg-white border-t border-neutral-100">
                    <div>
                        <h3 className="text-lg font-black text-neutral-900 mb-1 leading-tight group-hover:text-red-800 transition-colors">
                            {title}
                        </h3>
                        <div className="flex items-center gap-2">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">
                                {location}
                            </span>
                        </div>
                    </div>

                    {/* Minimal indicator */}
                    <div className="mt-4 h-1 w-8 rounded-full" style={{ backgroundColor: actionColor, opacity: 0.3 }} />
                </div>
            </div>

            {/* Lightbox Pop-Out via React Portal */}
            {mounted && createPortal(
                <AnimatePresence>
                    {isLightboxOpen && (beforeImage || videoSrc) && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            className="fixed inset-0 z-[99999] flex items-center justify-center p-4 md:p-10"
                            onClick={() => setIsLightboxOpen(false)}
                        >
                            {/* Backdrop */}
                            <div className="absolute inset-0 bg-black/95 backdrop-blur-md" />

                            {/* Close button */}
                            <button
                                onClick={() => setIsLightboxOpen(false)}
                                className="absolute top-4 right-4 z-[100000] h-10 w-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors border border-white/10"
                                aria-label="Close lightbox"
                                style={{ cursor: 'pointer' }}
                            >
                                <X className="h-5 w-5 text-white" />
                            </button>

                            {/* Content */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.2 }}
                                className="relative z-40 max-w-[100vw] max-h-[100vh] md:max-w-[90vw] md:max-h-[85vh] flex flex-col items-center justify-center"
                                onClick={(e) => e.stopPropagation()}
                            >
                                {isVideo && videoSrc ? (
                                    <video
                                        ref={videoRef}
                                        src={videoSrc}
                                        controls
                                        autoPlay
                                        playsInline
                                        className="max-w-full max-h-[85vh] object-contain rounded-sm shadow-2xl"
                                    />
                                ) : (
                                    <img
                                        src={showAfter && afterImage ? afterImage : beforeImage}
                                        alt={alt}
                                        className="max-w-full max-h-[85vh] object-contain rounded-sm shadow-2xl"
                                    />
                                )}
                                
                                {/* Caption */}
                                <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 z-50 text-center w-full max-w-md pointer-events-none">
                                    <p className="text-white/90 text-sm font-medium">{title}</p>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>,
                document.body
            )}
        </>
    );
}
