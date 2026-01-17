
import React, { useEffect } from 'react';

interface RedlineEffectProps {
    id: string;
}

const RedlineEffect: React.FC<RedlineEffectProps> = ({ id }) => {
    
    useEffect(() => {
        // Base64 encoded short rev limiter sound
        const audio = new Audio("data:audio/wav;base64,UklGRhgMAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQsADAAA//8A/w==");
        audio.volume = 0.2;
        audio.play().catch(e => console.error("Audio playback failed:", e));
    }, []);

    return (
        <div id={id} className="fixed top-0 left-0 w-full h-full pointer-events-none z-[300] overflow-hidden">
            <style>{`
                @keyframes redline-anim {
                    0% { transform: scaleX(0); opacity: 0.7; }
                    50% { transform: scaleX(1); opacity: 1; }
                    100% { transform: scaleX(0); opacity: 0; transform-origin: right; }
                }
            `}</style>
            <div 
                className="absolute top-0 left-0 w-full h-1 bg-red-500"
                style={{
                    boxShadow: '0 0 10px #ef4444, 0 0 20px #ef4444',
                    animation: 'redline-anim 600ms cubic-bezier(0.77, 0, 0.175, 1) forwards',
                    transformOrigin: 'left'
                }}
            ></div>
        </div>
    );
};

export default RedlineEffect;