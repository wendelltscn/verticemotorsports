

import React from 'react';
import type { Page, VrtcMediaVideo } from '../../types';
import { FilmIcon, DroneIcon, MicIcon, EditIcon } from '../icons/MediaIcons';
import { useLanguage } from '../../context/LanguageContext';
import { vrtcMediaData } from '../../data/vrtcMediaData';

interface VrtcMediaProps {
    onNavigate: (page: Page) => void;
}

const CapabilityCard: React.FC<{ icon: React.ReactNode; title: string; children: React.ReactNode; onDoubleClick: () => void; showSecret: boolean; }> = ({ icon, title, children, onDoubleClick, showSecret }) => {
    const { t } = useLanguage();
    return (
        <div onDoubleClick={onDoubleClick} className="border border-gray-800 p-6 bg-gray-900/20 text-center flex flex-col items-center transition-all duration-300 hover:-translate-y-1 hover:border-orange-400/50 cursor-help">
            <div className="text-orange-400 mb-4">{icon}</div>
            <h3 className="font-editorial text-xl text-white tracking-wider mb-3">{title}</h3>
            <p className="text-gray-400 leading-relaxed flex-grow">{children}</p>
            {showSecret && (
                <p className="text-xs text-gray-700 mt-2 animate-fade-in-up">
                    {t('easter_eggs.vrtcmedia_skeptic')}
                </p>
            )}
        </div>
    );
};


const VrtcMedia: React.FC<VrtcMediaProps> = ({ onNavigate }) => {
    const { language, t } = useLanguage();
    const videos = vrtcMediaData[language];

    // Easter Egg States
    const [comingSoonClicks, setComingSoonClicks] = React.useState<{ id: string; count: number }>({ id: '', count: 0 });
    const [showComingSoonEgg, setShowComingSoonEgg] = React.useState(false);
    const eggTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null);
    const [capabilitySecret, setCapabilitySecret] = React.useState<number | null>(null);

    const handleComingSoonClick = (videoId: string) => {
        if (eggTimer.current) clearTimeout(eggTimer.current);

        const newCount = comingSoonClicks.id === videoId ? comingSoonClicks.count + 1 : 1;
        setComingSoonClicks({ id: videoId, count: newCount });

        if (newCount >= 5) {
            setShowComingSoonEgg(true);
            setTimeout(() => setShowComingSoonEgg(false), 4000);
            setComingSoonClicks({ id: '', count: 0 }); // Reset
        } else {
            eggTimer.current = setTimeout(() => {
                setComingSoonClicks({ id: '', count: 0 });
            }, 2000); // Reset after 2s of inactivity
        }
    };
    
    const handleCapabilityDoubleClick = (index: number) => {
        setCapabilitySecret(index);
        setTimeout(() => setCapabilitySecret(null), 3000);
    };

    const capabilities = [
        { icon: <FilmIcon className="w-10 h-10" />, titleKey: 'vrtcmedia.capabilities.cinematography', descKey: 'vrtcmedia.capabilities.cinematography_desc' },
        { icon: <DroneIcon className="w-10 h-10" />, titleKey: 'vrtcmedia.capabilities.aerial', descKey: 'vrtcmedia.capabilities.aerial_desc' },
        { icon: <MicIcon className="w-10 h-10" />, titleKey: 'vrtcmedia.capabilities.sound', descKey: 'vrtcmedia.capabilities.sound_desc' },
        { icon: <EditIcon className="w-10 h-10" />, titleKey: 'vrtcmedia.capabilities.editing', descKey: 'vrtcmedia.capabilities.editing_desc' },
    ];


    const renderVideoCard = (video: VrtcMediaVideo) => {
        const isClickable = !video.isComingSoon && video.link;
        const CardElement = isClickable ? 'a' : 'div';
        
        const cardProps: any = isClickable ? {
            href: video.link,
            target: '_blank',
            rel: 'noopener noreferrer'
        } : {};

        if (!isClickable && video.isComingSoon) {
            cardProps.onClick = () => handleComingSoonClick(video.title);
        }

        return (
            <CardElement
                key={video.title}
                {...cardProps}
                className={`group relative block overflow-hidden aspect-video transition-transform duration-500 ${isClickable ? 'hover:-translate-y-1 cursor-pointer' : 'cursor-default'}`}
            >
                <img src={video.thumbnail} alt={`Thumbnail for ${video.title}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" loading="lazy" />
                <div className={`absolute inset-0 bg-overlay-40 ${isClickable && 'group-hover:bg-overlay-20'} transition-colors flex flex-col items-center justify-center p-4 text-center`}>
                    {video.isComingSoon ? (
                        <>
                            <h3 className="font-editorial text-xl md:text-2xl text-white">{video.displayTitle || video.title}</h3>
                            <p className="font-technical text-yellow-300 uppercase tracking-widest text-sm mt-2">{t('shared.coming_soon')}</p>
                        </>
                    ) : (
                         isClickable && (
                            <>
                                <svg className="w-16 h-16 text-white opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd"></path></svg>
                                <h3 className="font-editorial text-xl md:text-2xl text-white mt-2 opacity-0 group-hover:opacity-100 transition-opacity">{video.displayTitle || video.title}</h3>
                            </>
                         )
                    )}
                </div>
            </CardElement>
        );
    };

    return (
        <div className="bg-black text-gray-300">
            {/* Hero Section */}
            <div className="relative h-[70vh] w-full flex flex-col items-center justify-center text-center text-white overflow-hidden">
                <div 
                  className="absolute inset-0 bg-cover bg-center z-0" 
                  style={{ backgroundImage: "url(https://i.imgur.com/Zg0fkVA.png)" }}
                >
                  <div className="absolute inset-0 bg-overlay-60"></div>
                </div>
                <div className="relative z-10 p-6 flex flex-col items-center animate-fade-in-up-elegant">
                    <img src="https://i.imgur.com/LJaOS15.png" alt="VrTC Media Logo" className="h-12 md:h-16 w-auto mb-4" />
                    <h1 className="font-editorial text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white tracking-wider">{t('vrtcmedia.title')}</h1>
                    <p className="font-technical uppercase text-orange-400 tracking-[0.4em] text-sm mt-2">{t('vrtcmedia.subtitle')}</p>
                </div>
            </div>

            <div className="py-20 sm:py-28">
                <div className="container mx-auto px-6">
                    {/* Mission Section */}
                    <section className="max-w-4xl mx-auto text-center mb-20 md:mb-28 animate-fade-in-up-elegant">
                        <p className="font-technical text-lg md:text-xl leading-relaxed text-gray-300">
                           {t('vrtcmedia.intro')}
                        </p>
                    </section>

                    {/* Capabilities Section */}
                    <section className="mb-20 md:mb-28 animate-fade-in-up-elegant delay-200">
                        <header className="text-center mb-12">
                            <h2 className="font-editorial text-3xl md:text-4xl text-white tracking-wider">{t('vrtcmedia.capabilities_title')}</h2>
                            <div className="w-20 h-px bg-orange-400 mx-auto mt-3"></div>
                        </header>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
                            {capabilities.map((cap, index) => (
                                <CapabilityCard 
                                    key={cap.titleKey}
                                    icon={cap.icon} 
                                    title={t(cap.titleKey)}
                                    onDoubleClick={() => handleCapabilityDoubleClick(index)}
                                    showSecret={capabilitySecret === index}
                                >
                                    {t(cap.descKey)}
                                </CapabilityCard>
                            ))}
                        </div>
                    </section>
                    
                    {/* Gallery Section */}
                    <section className="mb-20 md:mb-28 animate-fade-in-up-elegant delay-400">
                        <header className="text-center mb-12">
                            <h2 className="font-editorial text-3xl md:text-4xl text-white tracking-wider">{t('vrtcmedia.portfolio_title')}</h2>
                             <p className="font-technical text-gray-500 max-w-2xl mx-auto mt-2">
                                {t('vrtcmedia.portfolio_subtitle')}
                            </p>
                        </header>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                           {videos.map(renderVideoCard)}
                        </div>
                         <div className="text-center mt-12">
                            <a href="https://www.youtube.com/@VerticeMotorsports" target="_blank" rel="noopener noreferrer" className="font-editorial uppercase tracking-widest text-lg border-2 border-orange-400 text-orange-400 px-10 py-3 hover:bg-orange-400 hover:text-black transition-all duration-300 ease-in-out hover:-translate-y-1 active:translate-y-0">
                                {t('vrtcmedia.button_watch')}
                            </a>
                        </div>
                    </section>

                    {/* CTA Section */}
                    <section className="bg-gray-900/50 border border-gray-800 py-16 px-6 text-center animate-fade-in-up-elegant delay-500">
                         <h2 className="font-editorial text-3xl md:text-4xl text-white tracking-wider">{t('vrtcmedia.cta_title')}</h2>
                         <p className="text-gray-400 max-w-2xl mx-auto mt-4 mb-8 leading-relaxed">
                           {t('vrtcmedia.cta_text')}
                         </p>
                         <a 
                            href="https://wa.link/o3621o"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-editorial uppercase tracking-widest text-lg border-2 border-yellow-300 text-black bg-yellow-300 px-10 py-4 hover:bg-transparent hover:text-yellow-300 transition-all duration-300 ease-in-out inline-block hover:-translate-y-1 active:translate-y-0"
                        >
                            {t('vrtcmedia.cta_button')}
                        </a>
                    </section>

                </div>
            </div>
             {showComingSoonEgg && (
                <div className="fixed bottom-6 left-1/2 -translate-x-1/2 font-technical text-xs text-center text-gray-500 bg-overlay-50 border border-gray-800 px-3 py-1 animate-fade-in-up z-50">
                    {t('easter_eggs.vrtcmedia_spam')}
                </div>
            )}
        </div>
    );
};

export default VrtcMedia;