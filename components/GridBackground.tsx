
import * as React from 'react';

const GridBackground: React.FC = () => {
    return (
        <div 
            className="absolute inset-0 z-0"
            style={{
                backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
                backgroundSize: '3rem 3rem',
                animation: 'pan-grid 60s linear infinite',
            }}
        />
    );
};

export default GridBackground;