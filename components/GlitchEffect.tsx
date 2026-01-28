

import React from 'react';
import { useEffect, useRef } from 'react';

const GlitchEffect: React.FC = () => {
    const audioRef = useRef<HTMLAudioElement>(null);

    useEffect(() => {
        // Play a subtle static sound
        const audio = new Audio("data:audio/wav;base64,UklGRiYAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQIAAAD//w=="); // Short static noise
        audio.volume = 0.1;
        audio.play().catch(e => console.error("Audio playback failed:", e));

        return () => {
            audio.pause();
        };
    }, []);

    return (
        <div className="fixed inset-0 z-[300] pointer-events-none overflow-hidden">
            <style>{`
                @keyframes glitch-anim-1 {
                    0% { transform: translate(0); }
                    20% { transform: translate(-3px, 3px); }
                    40% { transform: translate(3px, -3px); }
                    60% { transform: translate(-3px, 3px); }
                    80% { transform: translate(3px, -3px); }
                    100% { transform: translate(0); }
                }
                @keyframes glitch-anim-2 {
                    0% { transform: translate(0); }
                    20% { transform: translate(5px, -5px); }
                    40% { transform: translate(-5px, 5px); }
                    60% { transform: translate(5px, -5px); }
                    80% { transform: translate(-5px, 5px); }
                    100% { transform: translate(0); }
                }
                @keyframes glitch-skew {
                    0% { transform: skew(0deg); }
                    25% { transform: skew(1deg); }
                    50% { transform: skew(-1deg); }
                    75% { transform: skew(1deg); }
                    100% { transform: skew(0deg); }
                }
            `}</style>
            <div className="absolute inset-0 animate-[glitch-skew_300ms_cubic-bezier(0.25,0.46,0.45,0.94)_both] bg-black/10">
                <div 
                    className="absolute inset-0 opacity-20"
                    style={{
                        animation: 'glitch-anim-1 300ms cubic-bezier(0.25, 0.46, 0.45, 0.94) both infinite',
                        background: 'red'
                    }}
                ></div>
                <div 
                    className="absolute inset-0 opacity-20"
                    style={{
                        animation: 'glitch-anim-2 300ms cubic-bezier(0.25, 0.46, 0.45, 0.94) both infinite',
                        background: 'blue'
                    }}
                ></div>
            </div>
        </div>
    );
};

export default GlitchEffect;