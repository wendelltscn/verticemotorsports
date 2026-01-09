
import React from 'react';
import { ShoppingBagIcon } from '../icons/SocialIcons';
import { useLanguage } from '../../context/LanguageContext';

const Lifestyle: React.FC = () => {
    const { t } = useLanguage();

    return (
        <div className="bg-black py-20 sm:py-28">
            <div className="container mx-auto px-6">
                <header className="text-center mb-16 md:mb-24">
                    <h1 className="font-editorial text-4xl md:text-6xl text-white tracking-wider mb-4">{t('lifestyle.title')}</h1>
                    <p className="font-technical uppercase text-gray-500 tracking-[0.3em] text-sm">{t('lifestyle.subtitle')}</p>
                </header>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6 text-lg text-gray-400 leading-relaxed">
                        <p>{t('lifestyle.p1')}</p>
                        <p>{t('lifestyle.p2')}</p>
                        <p className="text-white">{t('lifestyle.p3')}</p>
                        <a 
                            href="https://wa.link/kvm96u"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-4 inline-flex items-center gap-3 font-editorial uppercase tracking-widest text-base border border-yellow-300 text-yellow-300 px-8 py-3 hover:bg-yellow-300 hover:text-black transition-all duration-300 ease-in-out"
                        >
                            <ShoppingBagIcon className="w-5 h-5" />
                            <span>{t('lifestyle.button')}</span>
                        </a>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="overflow-hidden">
                            <img src="https://i.imgur.com/Pfelu7u.jpeg" alt="VERTICE Apparel" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"/>
                        </div>
                        <div className="overflow-hidden">
                             <img src="https://i.imgur.com/4bzpSbj.png" alt="VERTICE Workwear" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Lifestyle;
