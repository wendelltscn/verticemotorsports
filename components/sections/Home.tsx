
import React from 'react';
import type { Page } from '../../types';
import { useLanguage } from '../../context/LanguageContext';

interface HomeProps {
    onNavigate: (page: Page) => void;
}

const Home: React.FC<HomeProps> = ({ onNavigate }) => {
    const { t } = useLanguage();

    return (
        <div className="relative h-screen w-full flex flex-col items-center justify-center text-center text-white overflow-hidden">
            <div 
              className="absolute inset-0 bg-cover bg-center z-0" 
              style={{ backgroundImage: "url(https://i.imgur.com/6ItRQSv.png)" }}
            >
              <div className="absolute inset-0 bg-black opacity-70"></div>
            </div>

            <div className="relative z-10 p-6 flex flex-col items-center animate-fade-in-up">
                <blockquote className="font-editorial text-2xl md:text-4xl lg:text-5xl max-w-4xl italic text-gray-300 mb-8">
                    {t('home.quote')}
                </blockquote>
                
                <div className="max-w-3xl mb-12">
                    <p className="font-technical text-md md:text-lg leading-relaxed text-gray-400">
                        {t('home.intro_part1')}
                        <span className="text-white font-bold tracking-widest">{t('home.intro_highlight')}</span>
                        {t('home.intro_part2')}
                    </p>
                </div>

                <button 
                    onClick={() => onNavigate('Movimento')}
                    className="font-editorial uppercase tracking-widest text-lg border-2 border-yellow-300 text-yellow-300 px-10 py-3 hover:bg-yellow-300 hover:text-black transition-all duration-300 ease-in-out"
                >
                    {t('home.button')}
                </button>
            </div>
        </div>
    );
};

export default Home;
