
import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { podcastData } from '../../data/podcastData';

const Episode: React.FC<{ number: string; title: string; description: string; link: string }> = ({ number, title, description, link }) => {
    const { t } = useLanguage();
    return (
        <div className="border-b border-gray-800 py-6 flex flex-col md:flex-row gap-6">
            <div className="flex-shrink-0 text-center md:text-left">
                <span className="font-technical text-4xl text-yellow-300">#{number}</span>
            </div>
            <div className="flex-grow">
                <h3 className="font-editorial text-2xl text-white mb-2">{title}</h3>
                <p className="text-gray-500 mb-4">{description}</p>
                <a href={link} target="_blank" rel="noopener noreferrer" className="font-technical text-sm uppercase tracking-wider text-yellow-300 hover:text-white transition-colors duration-300 inline-block">
                    {t('podcast.button')}
                </a>
            </div>
        </div>
    );
};

const Podcast: React.FC = () => {
    const { language, t } = useLanguage();
    const episodes = podcastData[language];

    return (
        <div className="bg-black py-20 sm:py-28">
            <div className="container mx-auto px-6">
                <header className="text-center mb-16 md:mb-24">
                    <h1 className="font-editorial text-4xl md:text-6xl text-white tracking-wider mb-4">{t('podcast.title')}</h1>
                    <p className="font-technical uppercase text-gray-500 tracking-[0.3em] text-sm">{t('podcast.subtitle')}</p>
                </header>

                <div className="flex flex-col lg:flex-row gap-12 max-w-6xl mx-auto">
                    <div className="lg:w-1/3 flex-shrink-0">
                        <img src="https://i.imgur.com/NWGRjXa.png" alt="Podcast Cover Art" className="w-full h-auto" />
                        <p className="text-gray-400 mt-6 leading-relaxed">
                            {t('podcast.intro')}
                        </p>
                    </div>
                    <div className="lg:w-2/3">
                        <h2 className="font-editorial text-3xl text-white border-b border-gray-800 pb-4 mb-4">{t('podcast.section_title')}</h2>
                        <div className="space-y-4">
                            {episodes.map(episode => (
                                <Episode 
                                    key={episode.number}
                                    number={episode.number}
                                    title={episode.title}
                                    description={episode.description}
                                    link={episode.link}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Podcast;
