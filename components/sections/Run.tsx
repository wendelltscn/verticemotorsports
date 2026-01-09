
import React, { useState } from 'react';
import type { Page } from '../../types';
import { useLanguage } from '../../context/LanguageContext';

interface RunProps {
    onNavigate: (page: Page) => void;
}

const VideoModal: React.FC<{
    onClose: () => void;
    title: string;
    description: React.ReactNode;
    link: string;
    linkLabel: string;
    isComingSoon?: boolean;
}> = ({ onClose, title, description, link, linkLabel, isComingSoon }) => {
    const { t } = useLanguage();

    return (
        <div className="fixed inset-0 bg-black/90 z-[100] flex items-center justify-center p-4 animate-fade-in" onClick={onClose}>
            <div className="bg-[#111] max-w-2xl w-full border border-gray-800 relative" onClick={e => e.stopPropagation()}>
                <button onClick={onClose} className="absolute top-3 right-3 text-gray-500 hover:text-white transition-colors z-10">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
                <div className="p-8 md:p-10">
                    <h3 className="font-editorial text-2xl md:text-3xl text-white mb-4 pr-8">{title}</h3>
                    <div className="text-gray-400 leading-relaxed space-y-4 mb-8">
                        {description}
                    </div>
                    {isComingSoon ? (
                         <div className="inline-block font-editorial uppercase tracking-widest text-base border border-gray-600 text-gray-500 px-8 py-3 cursor-not-allowed">
                            {t('shared.coming_soon')}
                        </div>
                    ) : (
                        <a 
                            href={link} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-block font-editorial uppercase tracking-widest text-base border border-yellow-300 text-yellow-300 px-8 py-3 hover:bg-yellow-300 hover:text-black transition-all duration-300 ease-in-out"
                        >
                            {linkLabel}
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
}

const Run: React.FC<RunProps> = ({ onNavigate }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { language, t } = useLanguage();

     const videoData = {
        EN: {
            title: "Staying alive inside in a world on autopilot",
            description: (
                <>
                    <p>Living on autopilot has become the default. Responding, rushing, producing, repeating. This video is an invitation to presence.</p>
                    <p>Here, the car is not portrayed as an escape, but as a tool. A space where the body feels again, the gaze slows down, and the world regains texture. Vertice is made for those who still feel.</p>
                </>
            ),
            link: "https://www.youtube.com/watch?v=F6gujB7c3oI",
            linkLabel: "Watch on YouTube",
            isComingSoon: false,
        },
        PT: {
            title: "Permanecendo vivo em um mundo no piloto automático",
            description: (
                 <>
                    <p>Viver no piloto automático tornou-se o padrão. Responder, correr, produzir, repetir. Este vídeo é um convite à presença.</p>
                    <p>Aqui, o carro não é um escape, mas uma ferramenta. Um espaço onde o corpo volta a sentir, o olhar desacelera e o mundo recupera a textura. Vertice é para aqueles que ainda sentem.</p>
                </>
            ),
            link: "#!",
            linkLabel: t('shared.coming_soon'),
            isComingSoon: true,
        },
    };

    const currentVideoData = videoData[language.toUpperCase() as 'PT' | 'EN'];

    return (
        <>
            <div className="relative w-full flex flex-col items-center justify-center text-center text-white overflow-hidden py-20">
                <div 
                  className="absolute inset-0 bg-cover bg-center bg-fixed z-0" 
                  style={{ backgroundImage: "url(https://i.imgur.com/oszZB03.png)" }}
                >
                  <div className="absolute inset-0 bg-black opacity-80"></div>
                </div>

                <div className="relative z-10 p-6 flex flex-col items-center max-w-4xl mx-auto">
                    <header className="mb-8">
                        <h1 className="font-editorial text-4xl md:text-6xl text-white tracking-wider mb-4">{t('run.title')}</h1>
                        <p className="font-technical uppercase text-gray-500 tracking-[0.3em] text-sm">{t('run.subtitle')}</p>
                    </header>
                    
                    <div className="space-y-6 text-lg text-gray-300 leading-relaxed">
                        <p>
                           {t('run.p1')}
                        </p>
                         <p>
                            {t('run.p2_part1')}
                            <a 
                                href="https://open.spotify.com/playlist/4TyGgx1EwX5pR2W1elF41Q?si=64a5f43bfcdf4c78"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-300 hover:text-yellow-400 transition-colors duration-300 cursor-pointer"
                            >
                                {t('run.p2_link')}
                            </a>
                            {t('run.p2_part2')}
                        </p>
                    </div>

                    <section className="mt-16 w-full">
                        <header className="text-center mb-8">
                            <h2 className="font-editorial text-3xl text-white tracking-wider">{t('run.section_title')}</h2>
                            <div className="w-20 h-px bg-yellow-300 mx-auto mt-3"></div>
                        </header>
                        <div className="max-w-xl mx-auto">
                             <div className="relative group cursor-pointer aspect-video overflow-hidden" onClick={() => setIsModalOpen(true)}>
                                <img src="https://i.imgur.com/4m0E8LU.png" alt="Video thumbnail for Staying alive" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex flex-col items-center justify-center">
                                    <svg className="w-16 h-16 text-white opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd"></path></svg>
                                    <p className="font-editorial text-white mt-2">{t('run.video_title')}</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    <button 
                        onClick={() => onNavigate('Movimento')}
                        className="mt-16 font-editorial uppercase tracking-widest text-lg border-2 border-yellow-300 text-yellow-300 px-10 py-3 hover:bg-yellow-300 hover:text-black transition-all duration-300 ease-in-out"
                    >
                        {t('run.button')}
                    </button>
                </div>
            </div>
            {isModalOpen && <VideoModal 
                onClose={() => setIsModalOpen(false)}
                {...currentVideoData}
            />}
        </>
    );
};

export default Run;
