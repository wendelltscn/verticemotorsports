
import React from 'react';
import type { Page } from '../../types';
import { FilmIcon, DroneIcon, MicIcon, EditIcon } from '../icons/MediaIcons';
import { useLanguage } from '../../context/LanguageContext';
import { vrtcMediaData } from '../../data/vrtcMediaData';

interface VrtcMediaProps {
    onNavigate: (page: Page) => void;
}

const CapabilityCard: React.FC<{ icon: React.ReactNode; title: string; children: React.ReactNode }> = ({ icon, title, children }) => (
    <div className="border border-gray-800 p-6 bg-gray-900/20 text-center flex flex-col items-center">
        <div className="text-orange-400 mb-4">{icon}</div>
        <h3 className="font-editorial text-xl text-white tracking-wider mb-3">{title}</h3>
        <p className="text-gray-400 leading-relaxed flex-grow">{children}</p>
    </div>
);

const VrtcMedia: React.FC<VrtcMediaProps> = ({ onNavigate }) => {
    const { language, t } = useLanguage();
    const videos = vrtcMediaData[language];

    return (
        <div className="bg-black text-gray-300">
            {/* Hero Section */}
            <div className="relative h-[70vh] w-full flex flex-col items-center justify-center text-center text-white overflow-hidden">
                <div 
                  className="absolute inset-0 bg-cover bg-center z-0" 
                  style={{ backgroundImage: "url(https://i.imgur.com/Zg0fkVA.png)" }}
                >
                  <div className="absolute inset-0 bg-black opacity-60"></div>
                </div>
                <div className="relative z-10 p-6 flex flex-col items-center animate-fade-in-up">
                    <img src="https://i.imgur.com/LJaOS15.png" alt="VrTC Media Logo" className="h-16 w-auto mb-4 invert" />
                    <h1 className="font-editorial text-4xl md:text-6xl lg:text-7xl text-white tracking-wider">{t('vrtcmedia.title')}</h1>
                    <p className="font-technical uppercase text-orange-400 tracking-[0.4em] text-sm mt-2">{t('vrtcmedia.subtitle')}</p>
                </div>
            </div>

            <div className="py-20 sm:py-28">
                <div className="container mx-auto px-6">
                    {/* Mission Section */}
                    <section className="max-w-4xl mx-auto text-center mb-20 md:mb-28">
                        <p className="font-technical text-lg md:text-xl leading-relaxed text-gray-300">
                           {t('vrtcmedia.intro')}
                        </p>
                    </section>

                    {/* Capabilities Section */}
                    <section className="mb-20 md:mb-28">
                        <header className="text-center mb-12">
                            <h2 className="font-editorial text-3xl md:text-4xl text-white tracking-wider">{t('vrtcmedia.capabilities_title')}</h2>
                            <div className="w-20 h-px bg-orange-400 mx-auto mt-3"></div>
                        </header>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
                            <CapabilityCard icon={<FilmIcon className="w-10 h-10" />} title={t('vrtcmedia.capabilities.cinematography')}>
                                {t('vrtcmedia.capabilities.cinematography_desc')}
                            </CapabilityCard>
                            <CapabilityCard icon={<DroneIcon className="w-10 h-10" />} title={t('vrtcmedia.capabilities.aerial')}>
                                {t('vrtcmedia.capabilities.aerial_desc')}
                            </CapabilityCard>
                             <CapabilityCard icon={<MicIcon className="w-10 h-10" />} title={t('vrtcmedia.capabilities.sound')}>
                               {t('vrtcmedia.capabilities.sound_desc')}
                            </CapabilityCard>
                            <CapabilityCard icon={<EditIcon className="w-10 h-10" />} title={t('vrtcmedia.capabilities.editing')}>
                                {t('vrtcmedia.capabilities.editing_desc')}
                            </CapabilityCard>
                        </div>
                    </section>
                    
                    {/* Gallery Section */}
                    <section className="mb-20 md:mb-28">
                        <header className="text-center mb-12">
                            <h2 className="font-editorial text-3xl md:text-4xl text-white tracking-wider">{t('vrtcmedia.portfolio_title')}</h2>
                             <p className="font-technical text-gray-500 max-w-2xl mx-auto mt-2">
                                {t('vrtcmedia.portfolio_subtitle')}
                            </p>
                        </header>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                           {videos.map((video) => {
                                if (video.isComingSoon) {
                                    return (
                                        <div key={video.title} className="group relative block overflow-hidden aspect-video">
                                            <img src={video.thumbnail} alt={`Thumbnail for ${video.title}`} className="w-full h-full object-cover" />
                                            <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center p-4 text-center">
                                                <h3 className="font-editorial text-xl md:text-2xl text-white">{video.displayTitle || video.title}</h3>
                                                <p className="font-technical text-yellow-300 uppercase tracking-widest text-sm mt-2">{t('shared.coming_soon')}</p>
                                            </div>
                                        </div>
                                    );
                                } else {
                                    return (
                                        <a key={video.title} href={video.link} target="_blank" rel="noopener noreferrer" className="group relative block overflow-hidden aspect-video">
                                            <img src={video.thumbnail} alt={`Thumbnail for ${video.title}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                            {video.displayTitle ? (
                                                <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-colors flex flex-col items-center justify-center p-4 text-center">
                                                    <h3 className="font-editorial text-xl md:text-2xl text-white">{video.displayTitle}</h3>
                                                </div>
                                            ) : (
                                                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex flex-col items-center justify-center p-4 text-center">
                                                    <svg className="w-16 h-16 text-white opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd"></path></svg>
                                                    <h3 className="font-editorial text-xl md:text-2xl text-white mt-2 opacity-0 group-hover:opacity-100 transition-opacity">{video.title}</h3>
                                                </div>
                                            )}
                                        </a>
                                    );
                                }
                           })}
                        </div>
                         <div className="text-center mt-12">
                            <a href="https://www.youtube.com/@VerticeMotorsports" target="_blank" rel="noopener noreferrer" className="font-editorial uppercase tracking-widest text-lg border-2 border-orange-400 text-orange-400 px-10 py-3 hover:bg-orange-400 hover:text-black transition-all duration-300 ease-in-out">
                                {t('vrtcmedia.button_watch')}
                            </a>
                        </div>
                    </section>

                    {/* CTA Section */}
                    <section className="bg-gray-900/50 border border-gray-800 py-16 px-6 text-center">
                         <h2 className="font-editorial text-3xl md:text-4xl text-white tracking-wider">{t('vrtcmedia.cta_title')}</h2>
                         <p className="text-gray-400 max-w-2xl mx-auto mt-4 mb-8 leading-relaxed">
                           {t('vrtcmedia.cta_text')}
                         </p>
                         <a 
                            href="https://wa.link/o3621o"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-editorial uppercase tracking-widest text-lg border-2 border-yellow-300 text-black bg-yellow-300 px-10 py-4 hover:bg-transparent hover:text-yellow-300 transition-all duration-300 ease-in-out inline-block"
                        >
                            {t('vrtcmedia.cta_button')}
                        </a>
                    </section>

                </div>
            </div>
        </div>
    );
};

export default VrtcMedia;
