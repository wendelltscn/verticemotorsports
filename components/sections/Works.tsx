
import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import type { Page } from '../../types';

const ServiceItem: React.FC<{ 
    title: string; 
    children: React.ReactNode; 
    isExpanded: boolean;
    onClick: () => void;
    isHoverEffectActive: boolean;
}> = ({ title, children, isExpanded, onClick, isHoverEffectActive }) => (
    <div 
        onClick={onClick}
        className="bg-black/20 border border-gray-900 p-6 group transition-all duration-300 hover:border-yellow-300/50 hover:bg-gray-900/40 cursor-pointer hover:-translate-y-1"
        role="button"
        tabIndex={0}
        onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onClick()}
    >
        <h3 className="font-editorial text-2xl text-white transition-colors duration-300 mb-2 tracking-wider group-hover:text-yellow-300">{title}</h3>
        <p className={`
            text-gray-500 max-w-xl leading-relaxed transition-all duration-500 ease-in-out
            ${isExpanded ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'}
            ${isHoverEffectActive ? 'group-hover:max-h-96 group-hover:opacity-100 group-hover:mt-4' : ''}
        `}>
            {children}
        </p>
    </div>
);

const ProcessStep: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="border-t-2 border-yellow-300/20 pt-4">
        <h3 className="font-editorial text-xl text-yellow-300 tracking-wider mb-2">{title}</h3>
        <p className="text-gray-400 leading-relaxed">{children}</p>
    </div>
);

interface WorksProps {
    onNavigate: (page: Page) => void;
}

const Works: React.FC<WorksProps> = ({ onNavigate }) => {
    const { t } = useLanguage();
    const [expandedService, setExpandedService] = useState<string | null>(null);
    const [clickTracker, setClickTracker] = useState({ key: '', count: 0 });
    const [showIndecisiveEgg, setShowIndecisiveEgg] = useState(false);
    const clickTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    // Atelier Ignition Easter Egg
    const [ignitionSequence, setIgnitionSequence] = useState<string[]>([]);
    const [showIgnitionEgg, setShowIgnitionEgg] = useState(false);
    const ignitionKeyAudioRef = useRef<HTMLAudioElement | null>(null);
    const ignitionStartAudioRef = useRef<HTMLAudioElement | null>(null);

    // Process Step Easter Egg
    const [processSecret, setProcessSecret] = useState<number | null>(null);

    useEffect(() => {
        // Preload audio for ignition sequence
        ignitionKeyAudioRef.current = new Audio("https://www.dropbox.com/scl/fi/8ctu9afi7f6fsejol1sym/Key-start-engine-sound-effect.mp3?rlkey=vttalgh2f6732nvvc2hzgjqnt&st=w0ijfuwd&dl=1");
        ignitionStartAudioRef.current = new Audio("https://www.dropbox.com/scl/fi/e340i4067i14xzjfw0eap/Car-Engine-Start-Sound-Effect-ProSounds.mp3?rlkey=rv0ph2x5m2aax9glkpn541gd1&st=2izy0jzm&dl=1");
        
        if (ignitionKeyAudioRef.current) {
            ignitionKeyAudioRef.current.onended = () => {
                ignitionStartAudioRef.current?.play().catch(e => console.error(e));
            };
        }
    }, []);

    const handleToggleService = (key: string) => {
        setExpandedService(prevKey => (prevKey === key ? null : key));

        // Indecisive clicks easter egg logic
        if (clickTimer.current) clearTimeout(clickTimer.current);
        if (key === clickTracker.key) {
            const newCount = clickTracker.count + 1;
            if (newCount >= 5) {
                setShowIndecisiveEgg(true);
                setTimeout(() => setShowIndecisiveEgg(false), 4000);
                setClickTracker({ key: '', count: 0 });
            } else {
                setClickTracker({ key, count: newCount });
            }
        } else {
            setClickTracker({ key, count: 1 });
        }
        clickTimer.current = setTimeout(() => setClickTracker({ key: '', count: 0 }), 2000);

        // Atelier Ignition easter egg logic
        const newSequence = [...ignitionSequence, key].slice(-3);
        setIgnitionSequence(newSequence);
        const targetSequence = ['restoration', 'electrical', 'tuning'];
        if (JSON.stringify(newSequence) === JSON.stringify(targetSequence)) {
            setShowIgnitionEgg(true);
            if (ignitionKeyAudioRef.current) {
                ignitionKeyAudioRef.current.currentTime = 0;
                ignitionKeyAudioRef.current.volume = 0.5;
                ignitionStartAudioRef.current!.volume = 0.3;
                ignitionKeyAudioRef.current.play().catch(e => console.error(e));
            }
            setTimeout(() => setShowIgnitionEgg(false), 4000);
            setIgnitionSequence([]);
        }
    };
    
    const handleProcessDoubleClick = (stepIndex: number) => {
        setProcessSecret(stepIndex);
        setTimeout(() => setProcessSecret(null), 3000);
    };

    const services = [
        { key: 'tuning', title: t('works.services.tuning'), desc: t('works.services.tuning_desc') },
        { key: 'restoration', title: t('works.services.restoration'), desc: t('works.services.restoration_desc') },
        { key: 'customization', title: t('works.services.customization'), desc: t('works.services.customization_desc') },
        { key: 'electrical', title: t('works.services.electrical'), desc: t('works.services.electrical_desc') },
        { key: 'full_projects', title: t('works.services.full_projects'), desc: t('works.services.full_projects_desc') },
        { key: 'consulting', title: t('works.services.consulting'), desc: t('works.services.consulting_desc') }
    ];

    const processSteps = [
        { key: 'step1', title: t('works.process.step1_title'), desc: t('works.process.step1_desc') },
        { key: 'step2', title: t('works.process.step2_title'), desc: t('works.process.step2_desc') },
        { key: 'step3', title: t('works.process.step3_title'), desc: t('works.process.step3_desc') },
        { key: 'step4', title: t('works.process.step4_title'), desc: t('works.process.step4_desc') },
    ];

    const isHoverEffectActive = expandedService === null;

    return (
        <div className="relative w-full bg-black py-20 md:py-28">
            <div 
              className="absolute inset-0 bg-cover bg-center z-0 opacity-10" 
              style={{ backgroundImage: "url(https://i.imgur.com/tW976Xl.png)" }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-b from-black via-black/90 to-black z-10"></div>
            
            <div className="relative z-20 container mx-auto px-6">
                 <header className="text-center mb-12 max-w-3xl mx-auto animate-fade-in-up-fast">
                    <h1 className={`font-editorial text-4xl sm:text-5xl md:text-7xl text-white tracking-wider mb-2 animate-text-flicker transition-all duration-300 ${showIgnitionEgg ? 'animate-text-glow' : ''}`}>{t('works.title')}</h1>
                    <p className="font-technical uppercase text-gray-500 tracking-[0.3em] text-sm">{t('works.subtitle')}</p>
                </header>

                <p className="text-lg text-gray-400 leading-relaxed mb-16 max-w-3xl mx-auto text-center animate-fade-in-up-fast delay-100">
                    {t('works.intro')}
                </p>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:items-start max-w-6xl mx-auto mb-20 md:mb-28">
                    {services.map((service, index) => (
                        <div key={service.key} className={`animate-fade-in-up-fast transition-opacity duration-300 ${expandedService && expandedService !== service.key ? 'opacity-50' : 'opacity-100'}`} style={{ animationDelay: `${200 + index * 100}ms` }}>
                            <ServiceItem 
                                title={service.title}
                                isExpanded={expandedService === service.key}
                                onClick={() => handleToggleService(service.key)}
                                isHoverEffectActive={isHoverEffectActive}
                            >
                                {service.desc}
                            </ServiceItem>
                        </div>
                    ))}
                </div>

                <div className="text-center mb-20 md:mb-28 animate-fade-in-up-fast delay-300">
                    <button
                        onClick={() => onNavigate('Projetos')}
                        className="font-editorial uppercase tracking-widest text-lg border-2 border-yellow-300 text-yellow-300 px-10 py-3 hover:bg-yellow-300 hover:text-black transition-all duration-300 ease-in-out hover:-translate-y-1 active:translate-y-0"
                    >
                        {t('works.button_projects')}
                    </button>
                </div>

                <section className="animate-fade-in-up-fast delay-400">
                    <header className="text-center mb-12">
                        <h2 className="font-editorial text-3xl md:text-4xl text-white tracking-wider">{t('works.process_title')}</h2>
                        <p className="font-technical text-gray-500 max-w-2xl mx-auto mt-2">{t('works.process_subtitle')}</p>
                    </header>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
                        {processSteps.map((step, index) => (
                            <div key={step.key} onDoubleClick={() => handleProcessDoubleClick(index)} className="cursor-help">
                                <ProcessStep title={step.title}>{step.desc}</ProcessStep>
                                {processSecret === index && (
                                    <p className="text-xs text-gray-700 mt-2 animate-fade-in-up">
                                        {t('easter_eggs.process_check')}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                </section>
            </div>
             {showIndecisiveEgg && (
                <div className="fixed bottom-6 left-1/2 -translate-x-1/2 font-technical text-xs text-center text-gray-700 bg-black/50 px-3 py-1 animate-fade-in-up">
                    {t('easter_eggs.works_indecisive')}
                </div>
            )}
             {showIgnitionEgg && (
                <div className="fixed bottom-6 left-1/2 -translate-x-1/2 font-technical text-xs text-center text-green-400 bg-black/50 border border-green-800/50 px-3 py-1 animate-fade-in-up z-50">
                    {t('easter_eggs.works_ignition_sequence')}
                </div>
            )}
        </div>
    );
};

export default Works;
