
import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

const ValueCard: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="border border-gray-800 p-6 bg-gray-900/20">
        <h3 className="font-editorial text-xl text-yellow-300 tracking-wider mb-3">{title}</h3>
        <p className="text-gray-400 leading-relaxed">{children}</p>
    </div>
);

const Manifesto: React.FC = () => {
    const { t } = useLanguage();

    return (
        <div className="bg-black text-gray-300 py-20 sm:py-28">
            <div className="container mx-auto px-6">
                
                <header className="text-center mb-16 md:mb-24">
                    <h1 className="font-editorial text-4xl md:text-6xl text-white tracking-wider mb-4">{t('manifesto.title')}</h1>
                    <div className="w-20 h-px bg-yellow-300 mx-auto"></div>
                </header>

                <div className="max-w-3xl mx-auto space-y-10 text-lg leading-loose text-gray-400 font-light">
                    <p>{t('manifesto.p1')}</p>
                    <p>{t('manifesto.p2')}</p>
                    <p>{t('manifesto.p3')}</p>
                    <p className="text-white font-normal italic">{t('manifesto.p4')}</p>
                </div>

                <div className="my-20 md:my-28">
                    <div className="w-full h-px bg-gray-800"></div>
                </div>

                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-12">
                         <h2 className="font-editorial text-3xl md:text-4xl text-white tracking-wider mb-4">{t('manifesto.vision_title')}</h2>
                         <p className="text-gray-400 max-w-3xl mx-auto leading-relaxed">
                            {t('manifesto.vision_text')}
                         </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <ValueCard title={t('manifesto.values.excellence')}>{t('manifesto.values.excellence_desc')}</ValueCard>
                        <ValueCard title={t('manifesto.values.authenticity')}>{t('manifesto.values.authenticity_desc')}</ValueCard>
                        <ValueCard title={t('manifesto.values.innovation')}>{t('manifesto.values.innovation_desc')}</ValueCard>
                        <ValueCard title={t('manifesto.values.community')}>{t('manifesto.values.community_desc')}</ValueCard>
                        <ValueCard title={t('manifesto.values.sustainability')}>{t('manifesto.values.sustainability_desc')}</ValueCard>
                         <div className="border border-dashed border-gray-700 p-6 flex items-center justify-center">
                            <p className="font-editorial text-gray-600">{t('manifesto.values.motto')}</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Manifesto;
