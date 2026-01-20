
import * as React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { podcastData } from '../../data/podcastData';

const Episode: React.FC<{ number: string; title: string; description: string; link: string; onClick: (e: React.MouseEvent<HTMLAnchorElement>) => void; }> = ({ number, title, description, link, onClick }) => {
    const { t } = useLanguage();
    return (
        <div className="border-b border-gray-800 py-6 flex flex-col md:flex-row gap-6">
            <div className="flex-shrink-0 text-center md:text-left">
                <span className="font-technical text-4xl text-yellow-300">#{number}</span>
            </div>
            <div className="flex-grow">
                <h3 className="font-editorial text-2xl text-white mb-2">{title}</h3>
                <p className="text-gray-500 mb-4">{description}</p>
                <a 
                    href={link} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    onClick={onClick}
                    className="group font-technical text-sm uppercase tracking-wider text-yellow-300 hover:text-white transition-colors duration-300 inline-block">
                    {t('podcast.button')} <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
                </a>
            </div>
        </div>
    );
};

const Podcast: React.FC = () => {
    const { language, t } = useLanguage();
    const episodes = podcastData[language];

    // Easter Egg State
    const [clickData, setClickData] = React.useState({ id: '', count: 0 });
    const [showPodcastEgg, setShowPodcastEgg] = React.useState(false);
    const eggTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null);

    const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, episodeNumber: string) => {
        if (eggTimer.current) clearTimeout(eggTimer.current);

        let newCount;
        if (clickData.id === episodeNumber) {
            newCount = clickData.count + 1;
        } else {
            newCount = 1;
        }

        setClickData({ id: episodeNumber, count: newCount });

        if (newCount >= 5) {
            e.preventDefault(); // Prevent navigation to show easter egg
            setShowPodcastEgg(true);
            setTimeout(() => setShowPodcastEgg(false), 4000);
            setClickData({ id: '', count: 0 }); // Reset
        } else {
            eggTimer.current = setTimeout(() => {
                setClickData({ id: '', count: 0 });
            }, 2000); // Reset after 2s of inactivity
        }
    };

    return (
        <div className="w-full bg-black py-20 sm:py-28 relative">
            <div className="container mx-auto px-6">
                <header className="text-center mb-16 md:mb-24 animate-fade-in-up-elegant">
                    <h1 className="font-editorial text-4xl sm:text-5xl md:text-6xl text-white tracking-wider mb-4">{t('podcast.title')}</h1>
                    <p className="font-technical uppercase text-gray-500 tracking-[0.3em] text-sm">{t('podcast.subtitle')}</p>
                </header>

                <div className="flex flex-col lg:flex-row gap-12 max-w-6xl mx-auto">
                    <div className="lg:w-1/3 flex-shrink-0 animate-fade-in-up-elegant delay-200">
                        <img src="https://i.imgur.com/NWGRjXa.png" alt="Podcast Cover Art" className="w-full h-auto" loading="lazy" />
                        <p className="text-gray-400 mt-6 leading-relaxed">
                            {t('podcast.intro')}
                        </p>
                    </div>
                    <div className="lg:w-2/3 animate-fade-in-up-elegant delay-300">
                        <h2 className="font-editorial text-3xl text-white border-b border-gray-800 pb-4 mb-4">{t('podcast.section_title')}</h2>
                        <div className="space-y-4">
                            {episodes.map(episode => (
                                <Episode 
                                    key={episode.number}
                                    number={episode.number}
                                    title={episode.title}
                                    description={episode.description}
                                    link={episode.link}
                                    onClick={(e) => handleLinkClick(e, episode.number)}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            {showPodcastEgg && (
                <div className="fixed bottom-6 left-1/2 -translate-x-1/2 font-technical text-xs text-center text-gray-500 bg-black/50 border border-gray-800 px-3 py-1 animate-fade-in-up z-50">
                    {t('easter_eggs.podcast_spam')}
                </div>
            )}
        </div>
    );
};

export default Podcast;