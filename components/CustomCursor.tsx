import React from 'react';
import { useState, useEffect, useRef } from 'react';

const CustomCursor: React.FC = () => {
    const cursorDotRef = useRef<HTMLDivElement>(null);
    const cursorTracerRef = useRef<HTMLDivElement>(null);

    const [isHovering, setIsHovering] = useState(false);
    const [isPointer, setIsPointer] = useState(false);

    const trailerPos = useRef({ x: 0, y: 0 });
    const lastMousePos = useRef({ x: 0, y: 0 });
    const animationFrameId = useRef<number | null>(null);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            
            if (cursorDotRef.current) {
                cursorDotRef.current.style.transform = `translate3d(${clientX}px, ${clientY}px, 0)`;
            }

            lastMousePos.current = { x: clientX, y: clientY };
            
            const target = e.target as HTMLElement;
            setIsPointer(window.getComputedStyle(target).getPropertyValue('cursor') === 'pointer' || target.closest('button, a, [onclick]') !== null);
        };
        
        const animateTracer = () => {
            const { x: targetX, y: targetY } = lastMousePos.current;
            
            trailerPos.current.x += (targetX - trailerPos.current.x) * 0.18;
            trailerPos.current.y += (targetY - trailerPos.current.y) * 0.18;

            if (cursorTracerRef.current) {
                const dx = targetX - trailerPos.current.x;
                const dy = targetY - trailerPos.current.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                const scale = Math.min(1 + distance / 200, 2);
                const opacity = Math.max(1 - distance / 300, 0.3);

                cursorTracerRef.current.style.transform = `translate3d(${trailerPos.current.x}px, ${trailerPos.current.y}px, 0) scale(${scale})`;
                cursorTracerRef.current.style.opacity = `${opacity}`;
            }

            animationFrameId.current = requestAnimationFrame(animateTracer);
        };

        window.addEventListener('mousemove', handleMouseMove);
        animateTracer();

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            if (animationFrameId.current) {
                cancelAnimationFrame(animationFrameId.current);
            }
        };
    }, []);

    const dotSize = isPointer ? '24px' : '8px';
    const tracerSize = isPointer ? '40px' : '32px';

    return (
        <>
            <style>{`
                .custom-cursor {
                    position: fixed;
                    top: 0;
                    left: 0;
                    pointer-events: none;
                    z-index: 9999;
                    border-radius: 50%;
                    mix-blend-mode: difference;
                }
            `}</style>
            <div 
                ref={cursorTracerRef} 
                className="custom-cursor bg-white/50"
                style={{
                    width: tracerSize,
                    height: tracerSize,
                    transform: 'translate(-50%, -50%)',
                    transition: 'width 0.3s ease, height 0.3s ease',
                }}
            />
            <div 
                ref={cursorDotRef} 
                className="custom-cursor bg-white"
                 style={{
                    width: dotSize,
                    height: dotSize,
                    transform: 'translate(-50%, -50%)',
                    transition: 'width 0.2s ease, height 0.2s ease',
                }}
            />
        </>
    );
};

export default CustomCursor;
