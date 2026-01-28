

import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { WhatsappIcon } from '../icons/SocialIcons';
import { runData } from '../../data/runData';

const Run: React.FC = () => {
    const { t, language } = useLanguage();
    const [activeInfo, setActiveInfo] = React.useState<'rules' | 'refund' | 'checklist' | 'faq' | null>(null);
    const [showEndgame, setShowEndgame] = React.useState(false);

    // Easter Egg States
    const [ctaClicks, setCtaClicks] = React.useState(0);
    const [showCtaSpam, setShowCtaSpam] = React.useState(false);
    const ctaTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null);
    const [packageSecret, setPackageSecret] = React.useState<number | null>(null);

    const { runRules, codeOfConduct, refundPolicy, whatToBring, faqData } = runData[language];

    React.useEffect(() => {
        const handleScroll = () => {
            const isAtBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 50;
            if (isAtBottom && !showEndgame) {
                setShowEndgame(true);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [showEndgame]);
    
    const handleCtaClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (ctaTimer.current) clearTimeout(ctaTimer.current);

        const newCount = ctaClicks + 1;
        setCtaClicks(newCount);

        if (newCount >= 7) {
            e.preventDefault(); // Prevent navigation
            setShowCtaSpam(true);
            setTimeout(() => setShowCtaSpam(false), 4000);
            setCtaClicks(0);
        } else {
            ctaTimer.current = setTimeout(() => setCtaClicks(0), 2000);
        }
    };
    
    const handlePackageDoubleClick = (index: number) => {
        setPackageSecret(index);
        setTimeout(() => setPackageSecret(null), 3000);
    };

    const ctaLink = language === 'pt'
        ? "https://wa.me/5584991334144?text=Oi%20Wendell!%20Vim%20do%20site%20e%20gostaria%20de%20fazer%20parte%20do%20Vertice%20Run.%20"
        : "https://wa.me/5584991334144?text=Hi%20Wendell!%20I've%20come%20from%20the%20website%20and%20I%20would%20like%20more%20info%20regarding%20the%20Vertice%20Run.";
        
    const packages = [
        { key: 'option1', recommended: false },
        { key: 'option3', recommended: true },
        { key: 'option2', recommended: false },
    ];

    return (
        <div className="relative min-h-screen w-full flex flex-col items-center justify-center text-white overflow-hidden py-20 md:py-28">
            <div 
              className="absolute inset-0 bg-cover bg-center bg-fixed z-0" 
              style={{ backgroundImage: "url(https://i.imgur.com/oszZB03.png)" }}
            >
              <div className="absolute inset-0 bg-black opacity-90"></div>
            </div>

            <div className="relative z-10 p-6 flex flex-col items-center max-w-5xl mx-auto w-full">
                <header className="mb-12 md:mb-16 animate-fade-in-up-dynamic text-center">
                    <p className="font-technical uppercase text-yellow-300 tracking-[0.3em] text-sm mb-4">{t('run.event.block_title')}</p>
                    <h1 className="font-editorial text-4xl sm:text-5xl md:text-6xl text-white tracking-wider leading-tight">
                        {t('run.event.title_line1')}
                        <br />
                        <span className="text-gray-500">{t('run.event.title_line2')}</span>
                    </h1>
                    <p className="font-technical uppercase text-gray-600 tracking-[0.2em] text-sm mt-4">{t('run.event.subtitle')}</p>
                </header>
                
                <section className="w-full border border-gray-800/50 bg-black/30 p-8 md:p-12 animate-fade-in-up-dynamic delay-200">
                    
                    <div className="text-center text-2xl md:text-3xl font-editorial italic text-gray-300 leading-relaxed mb-10">
                        <p>"{t('run.event.main_text_1')}<br/>{t('run.event.main_text_2')}"</p>
                        <p className="mt-6">"{t('run.event.main_text_3')}<br/>{t('run.event.main_text_4')}"</p>
                    </div>

                    <div className="max-w-2xl mx-auto text-center text-gray-400 space-y-4 mb-12">
                        <p>{t('run.event.complementary_text_1')}</p>
                        <p>{t('run.event.complementary_text_2')}</p>
                        <p className="font-bold mt-6">{t('run.event.secrecy_notice')}</p>
                        <p className="font-editorial italic text-lg text-gray-500 mt-6">{t('run.event.closing_statement')}</p>
                    </div>

                    <div className="mb-12">
                        <img 
                            src="https://i.imgur.com/uq8woxu.png" 
                            alt={t('run.event.gallery_alt')} 
                            className="w-full h-auto object-cover grayscale contrast-125"
                        />
                    </div>

                    <div className="border-t border-gray-800 pt-10 mt-10">
                        <div className="text-center mb-8">
                             <h3 className="font-editorial text-3xl text-yellow-300 mb-2">{t('run.event.inscription_title')}</h3>
                             <p className="font-technical text-sm uppercase tracking-wider text-red-500">{t('run.event.inscription_status')}</p>
                        </div>
                        <div className="grid md:grid-cols-3 gap-6 items-stretch">
                            {packages.map((pkg, index) => (
                                <div 
                                    key={pkg.key} 
                                    onDoubleClick={() => handlePackageDoubleClick(index)}
                                    className={`flex flex-col relative cursor-help ${pkg.recommended ? 'border-2 border-yellow-300 scale-105 bg-black p-6' : 'border border-gray-800 p-6'}`}
                                >
                                    {pkg.recommended && <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-yellow-300 text-black font-technical text-xs uppercase px-3 py-1 tracking-wider">{t('run.event.packages.recommended')}</div>}
                                    <h4 className="font-editorial text-2xl text-white">{t(`run.event.packages.${pkg.key}_title`)}</h4>
                                    <p className="font-editorial text-4xl text-yellow-300 my-4">
                                        {t(`run.event.packages.${pkg.key}_price`)}
                                        <span className="text-base text-gray-500 font-technical tracking-normal"> / {t('run.event.packages.per_person')}</span>
                                    </p>
                                    <p className="text-gray-400 text-sm flex-grow mb-4">{t(`run.event.packages.${pkg.key}_desc`)}</p>
                                    {pkg.key === 'option3' && (
                                        <>
                                            <p className="font-technical text-xs uppercase tracking-wider text-yellow-300 mb-2 text-center">{t('run.event.packages.option3_extra')}</p>
                                            <p className="font-technical text-xs text-gray-500 mb-6 text-center">{t('run.event.packages.option3_extra2')}</p>
                                            <img src="https://i.imgur.com/4fCk24L.png" alt={t('run.event.shirt_alt')} className="w-40 h-auto mx-auto" />
                                        </>
                                    )}
                                     {packageSecret === index && (
                                        <p className="text-xs text-gray-700 mt-2 animate-fade-in-up text-center">
                                            {t('easter_eggs.run_packages_spam')}
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>
                        <p className="text-center text-sm text-gray-600 mt-8 italic">{t('run.event.inscription_guarantee')}</p>
                        <p className="text-center text-sm text-gray-400 mt-2">{t('run.event.inscription_clarification')}</p>
                    </div>

                    <div className="text-center mt-12">
                        <div className="flex justify-center flex-wrap gap-x-8 gap-y-3 text-sm">
                             <button onClick={() => setActiveInfo(activeInfo === 'rules' ? null : 'rules')} className={`text-gray-500 hover:text-yellow-300 underline transition-colors ${activeInfo === 'rules' ? 'text-yellow-300' : ''}`}>{t('run.event.view_rules')}</button>
                             <button onClick={() => setActiveInfo(activeInfo === 'refund' ? null : 'refund')} className={`text-gray-500 hover:text-yellow-300 underline transition-colors ${activeInfo === 'refund' ? 'text-yellow-300' : ''}`}>{t('run.event.view_refund')}</button>
                             <button onClick={() => setActiveInfo(activeInfo === 'checklist' ? null : 'checklist')} className={`text-gray-500 hover:text-yellow-300 underline transition-colors ${activeInfo === 'checklist' ? 'text-yellow-300' : ''}`}>{t('run.event.view_checklist')}</button>
                             <button onClick={() => setActiveInfo(activeInfo === 'faq' ? null : 'faq')} className={`text-gray-500 hover:text-yellow-300 underline transition-colors ${activeInfo === 'faq' ? 'text-yellow-300' : ''}`}>{t('run.event.view_faq')}</button>
                        </div>

                        <div className={`transition-all duration-700 ease-in-out text-left overflow-hidden ${activeInfo ? 'max-h-[3000px] mt-8 opacity-100' : 'max-h-0 mt-0 opacity-0'}`}>
                            <div className="p-6 md:p-8 bg-black/40 border border-gray-800/50">
                                {activeInfo === 'rules' && (
                                    <div className="space-y-6 text-sm text-gray-400 leading-relaxed font-technical animate-fade-in-up-fast">
                                        <h3 className="font-editorial text-xl text-yellow-300 uppercase tracking-widest text-center mb-6">{t('run.event.modal_rules_title')}</h3>
                                        <p className="text-center italic text-gray-500 mb-6">{t('run.event.modal_rules_subtitle')}</p>
                                        {runRules.map((section, idx) => (
                                            <div key={idx}>
                                                <h4 className="font-editorial text-lg text-white mb-2">{section.title}</h4>
                                                <div className="space-y-1 pl-4">
                                                    {section.points.map((point, pIdx) => <p key={pIdx}>{point}</p>)}
                                                </div>
                                            </div>
                                        ))}
                                         <div className="border-t border-gray-800 pt-6 mt-6">
                                            <h4 className="font-editorial text-lg text-white mb-4 text-center">{t('run.event.modal_conduct_title')}</h4>
                                            <p className="text-center italic whitespace-pre-wrap mb-6">{codeOfConduct.intro}</p>
                                            <div className="grid sm:grid-cols-2 gap-4">
                                                {codeOfConduct.points.map((point, idx) => (
                                                    <div key={idx} className="border border-gray-800 p-3">
                                                        <h5 className="font-bold text-gray-300 mb-1">• {point.title}</h5>
                                                        <p className="whitespace-pre-wrap text-xs">{point.text}</p>
                                                    </div>
                                                ))}
                                            </div>
                                            <p className="text-center italic whitespace-pre-wrap mt-6">{codeOfConduct.outro}</p>
                                        </div>
                                    </div>
                                )}
                                {activeInfo === 'refund' && (
                                     <div className="space-y-6 text-sm text-gray-400 leading-relaxed font-technical animate-fade-in-up-fast">
                                        <h3 className="font-editorial text-xl text-yellow-300 uppercase tracking-widest text-center mb-6">{t('run.event.modal_refund_title')}</h3>
                                        {refundPolicy.map((section, idx) => (
                                            <div key={idx}>
                                                {section.intro && <p className="whitespace-pre-wrap italic text-gray-500 mb-6 text-center">{section.intro}</p>}
                                                {section.title && <h4 className="font-editorial text-lg text-white mb-2 mt-4">{section.title}</h4>}
                                                {section.points && (
                                                    <div className="space-y-4">
                                                        {section.points.map((point, pIdx) => (
                                                            <div key={pIdx}>
                                                                {point.subhead && <p className="font-bold text-gray-200">{point.subhead}</p>}
                                                                {point.text && <p className="whitespace-pre-wrap mt-1">{point.text}</p>}
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}
                                {activeInfo === 'checklist' && (
                                     <div className="space-y-6 text-sm text-gray-400 leading-relaxed font-technical animate-fade-in-up-fast">
                                        <h3 className="font-editorial text-xl text-yellow-300 uppercase tracking-widest text-center mb-6">{t('run.event.modal_checklist_title')}</h3>
                                        <div className="grid sm:grid-cols-3 gap-6">
                                            {whatToBring.map((item, idx) => (
                                                <div key={idx} className="border border-gray-800 p-4">
                                                    <h4 className="font-bold text-gray-200 mb-2">{item.title}</h4>
                                                    <p>{item.text}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                                {activeInfo === 'faq' && (
                                     <div className="space-y-6 text-sm text-gray-400 leading-relaxed font-technical animate-fade-in-up-fast">
                                        <h3 className="font-editorial text-xl text-yellow-300 uppercase tracking-widest text-center mb-6">{t('run.event.modal_faq_title')}</h3>
                                        <div className="space-y-4">
                                            {faqData.map((item, idx) => (
                                                <div key={idx} className="border-b border-gray-800/50 pb-4">
                                                    <p className="font-bold text-gray-200">P: {item.q}</p>
                                                    <p className="mt-2">R: {item.a}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        <a 
                            href={ctaLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={handleCtaClick}
                            className="flex w-full max-w-md mx-auto items-center justify-center gap-3 font-editorial uppercase tracking-widest text-lg border-2 border-yellow-300 text-black bg-yellow-300 px-10 py-4 hover:bg-transparent hover:text-yellow-300 transition-all duration-300 ease-in-out hover:-translate-y-1 active:translate-y-0 mt-8"
                        >
                            <WhatsappIcon className="w-5 h-5" />
                            <span>{t('run.event.cta_button')}</span>
                        </a>
                        {showCtaSpam && (
                            <p className="font-technical text-xs text-gray-700 mt-4 animate-fade-in-up">
                                {t('easter_eggs.run_cta_spam')}
                            </p>
                        )}
                    </div>
                </section>

                <footer className="mt-12 text-center font-technical text-gray-700 animate-fade-in-up-dynamic delay-400">
                    <p className="uppercase tracking-widest text-sm">{t('run.event.status_line_1')}</p>
                    <p className="text-xs tracking-wider">{t('run.event.status_line_2')}</p>
                </footer>

                {showEndgame && (
                    <p className="text-center font-technical text-xs text-gray-800 mt-12 animate-fade-in-up">
                        {t('easter_eggs.run_scroll_to_end')}
                    </p>
                )}
            </div>
        </div>
    );
};

export default Run;