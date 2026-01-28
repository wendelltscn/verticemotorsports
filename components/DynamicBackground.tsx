

import React from 'react';
import GridBackground from './GridBackground';

// Preload images to prevent flicker on first hover
const preloadImage = (src: string) => {
    const img = new Image();
    img.src = src;
};

interface DynamicBackgroundProps {
    activeImage: string | null;
    allImages: string[];
    isVisible: boolean;
}

const DynamicBackground: React.FC<DynamicBackgroundProps> = ({ activeImage, allImages, isVisible }) => {
    
    React.useEffect(() => {
        allImages.forEach(preloadImage);
    }, [allImages]);

    const backgroundImages = React.useMemo(() => allImages.map(src => (
        <div
            key={src}
            className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
            style={{ 
                backgroundImage: `url(${src})`,
                opacity: activeImage === src ? 0.3 : 0,
            }}
        />
    )), [allImages, activeImage]);

    return (
        <div className={`fixed inset-0 z-[-1] bg-black transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            {/* Default Grid */}
            <div className="absolute inset-0 transition-opacity duration-1000" style={{ opacity: activeImage ? 0 : 0.2 }}>
                <GridBackground />
            </div>
            {/* Image Layers */}
            {backgroundImages}
            {/* Black overlay to keep things dark */}
            <div className="absolute inset-0 bg-black transition-opacity duration-1000" style={{ opacity: activeImage ? 0.7 : 0 }} />
        </div>
    );
};

export default DynamicBackground;