
import React from 'react';

interface WallpaperGalleryProps {
    onClose: () => void;
}

const wallpapers = [
    { id: 1, src: 'https://i.imgur.com/uyFV56Q.png', alt: 'Vertice Wallpaper 1' },
    { id: 2, src: 'https://i.imgur.com/0aqXlmq.png', alt: 'Vertice Wallpaper 2' },
    { id: 3, src: 'https://i.imgur.com/P5ltp71.png', alt: 'Vertice Wallpaper 3' },
    { id: 4, src: 'https://i.imgur.com/ZcRAHaS.png', alt: 'Vertice Wallpaper 4' },
    { id: 5, src: 'https://i.imgur.com/eUVbhGi.png', alt: 'Vertice Wallpaper 5' },
    { id: 6, src: 'https://i.imgur.com/0Wyw83n.png', alt: 'Vertice Wallpaper 6' },
    { id: 7, src: 'https://i.imgur.com/PbrWp0F.png', alt: 'Vertice Wallpaper 7' },
    { id: 8, src: 'https://i.imgur.com/P3T0eMi.png', alt: 'Vertice Wallpaper 8' },
    { id: 9, src: 'https://i.imgur.com/t46nQaz.png', alt: 'Vertice Wallpaper 9' },
    { id: 10, src: 'https://i.imgur.com/XQTUsaW.png', alt: 'Vertice Wallpaper 10' },
    { id: 11, src: 'https://i.imgur.com/LwWykrT.jpeg', alt: 'Vertice Wallpaper 11' },
    { id: 12, src: 'https://i.imgur.com/51PDlbt.jpeg', alt: 'Vertice Wallpaper 12' },
    { id: 13, src: 'https://i.imgur.com/AF6q8tf.jpeg', alt: 'Vertice Wallpaper 13' },
    { id: 14, src: 'https://i.imgur.com/1ZiMBwE.png', alt: 'Vertice Wallpaper 14' },
    { id: 15, src: 'https://i.imgur.com/gYVwoZz.png', alt: 'Vertice Wallpaper 15' },
    { id: 16, src: 'https://i.imgur.com/Ohyv9hF.png', alt: 'Vertice Wallpaper 16' },
    { id: 17, src: 'https://i.imgur.com/PJ6qriq.png', alt: 'Vertice Wallpaper 17' },
    { id: 18, src: 'https://i.imgur.com/AfdlDKM.png', alt: 'Vertice Wallpaper 18' },
    { id: 19, src: 'https://i.imgur.com/OQ6xqOT.png', alt: 'Vertice Wallpaper 19' },
    { id: 20, src: 'https://i.imgur.com/WBFP0Ur.jpeg', alt: 'Vertice Wallpaper 20' },
    { id: 21, src: 'https://i.imgur.com/9lDo3ah.png', alt: 'Vertice Wallpaper 21' },
    { id: 22, src: 'https://i.imgur.com/vV5Dn5W.png', alt: 'Vertice Wallpaper 22' },
];

const WallpaperGallery: React.FC<WallpaperGalleryProps> = ({ onClose }) => {
    return (
        <div 
            className="fixed inset-0 z-[200] flex flex-col p-4 sm:p-8 bg-black/95 animate-fade-in-up-fast overflow-y-auto"
            onClick={onClose}
        >
            <div className="w-full max-w-7xl mx-auto" onClick={e => e.stopPropagation()}>
                <header className="flex justify-between items-center mb-8">
                    <h1 className="font-editorial text-3xl sm:text-4xl text-white tracking-wider">
                        VERTICE // WALLPAPERS
                    </h1>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onClose();
                        }}
                        className="text-gray-500 border border-gray-700 px-3 py-1 text-sm hover:bg-gray-700 hover:text-white transition-colors font-technical"
                    >
                        [ CLOSE ]
                    </button>
                </header>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {wallpapers.map((wallpaper) => (
                        <a 
                            key={wallpaper.id}
                            href={wallpaper.src}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group block aspect-video overflow-hidden border border-gray-900 hover:border-yellow-300 transition-all duration-300 hover:scale-105"
                        >
                            <img 
                                src={wallpaper.src} 
                                alt={wallpaper.alt} 
                                className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                                loading="lazy"
                            />
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                <span className="font-technical text-white uppercase tracking-widest text-sm">Download</span>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default WallpaperGallery;
