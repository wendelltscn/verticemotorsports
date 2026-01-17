
import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

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

const Wallpapers: React.FC = () => {
    const { t } = useLanguage();

    return (
        <div className="w-full min-h-screen bg-black py-20 md:py-28">
            <header className="text-center pb-12 md:pb-16 px-6">
                <h1 className="font-editorial text-4xl sm:text-5xl md:text-6xl text-white tracking-wider animate-fade-in-up-fast">
                    {t('header.nav.wallpapers')}
                </h1>
                <p className="font-technical text-gray-500 max-w-2xl mx-auto mt-4 animate-fade-in-up-fast delay-200">
                    {t('wallpapers.subtitle')}
                </p>
            </header>
            
            <div className="container mx-auto px-6 animate-fade-in-up-fast delay-400">
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

export default Wallpapers;
