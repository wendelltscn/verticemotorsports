
import React, { useState, useEffect, useRef } from 'react';
import type { Page } from '../../types';
import { useLanguage } from '../../context/LanguageContext';

// Central map for hover subtitles for cleaner access and type safety.
const pageSubtitles: Record<Exclude<Page, 'Home' | 'Movimento'>, string> = {
    Manifesto: 'home.hover.manifesto',
    Works: 'home.hover.works',
    Projetos: 'home.hover.projetos',
    Run: 'home.hover.run',
    VrtcMedia: 'home.hover.vrtcmedia',
    Conceito: 'home.hover.conceito',
    Podcast: 'home.hover.podcast',
    Contato: 'home.hover.contato',
    Lifestyle: 'home.hover.lifestyle',
};

// Typography hierarchy map using font weights as per rules.
const pageTypography: Partial<Record<Page, string>> = {
    Manifesto: 'font-black', // 900 weight for emphasis
    Works: 'font-black',     // 900 weight for emphasis
    Podcast: 'font-normal',  // 400 weight for subtlety
    Contato: 'font-normal',  // 400 weight for subtlety
};

const pageBackgrounds: Partial<Record<Page, string>> = {
    Manifesto: 'https://i.imgur.com/oszZB03.png',
    Works: 'https://i.imgur.com/XBj922H.png',
    Projetos: 'https://i.imgur.com/t4bSdlB.png',
    Run: 'https://i.imgur.com/oszZB03.png',
    VrtcMedia: 'https://i.imgur.com/Zg0fkVA.png',
    Conceito: 'https://i.imgur.com/YSuDJBG.png',
    Podcast: 'https://i.imgur.com/NWGRjXa.png',
    Contato: 'https://i.imgur.com/v7QYRwU.png',
    Lifestyle: 'https://i.imgur.com/NWGRjXa.png', // Fallback, will be dynamically replaced
};


interface NavCellProps {
    page: Page;
    onClick: () => void;
    onHover: (page: Page | null) => void;
    isDimmed: boolean;
    onInteraction: () => void;
}

const NavCell: React.FC<NavCellProps> = ({ page, onClick, onHover, isDimmed, onInteraction }) => {
    const { t } = useLanguage();
    
    const translationKey = `header.nav.${page.toLowerCase()}`;
    // Default to font-bold (700) if no specific weight is defined
    const typographyClass = pageTypography[page] || 'font-bold'; 

    const handleMouseEnter = () => {
        onHover(page);
        onInteraction();
    };
    
    const handleClick = () => {
        onClick();
        onInteraction();
    }

    return (
        <button
            onClick={handleClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={() => onHover(null)}
            className={`group relative flex items-center justify-center h-full w-full border border-gray-900 text-gray-600 hover:text-white hover:border-yellow-300/50 transition-all duration-300 p-4 ${isDimmed ? 'opacity-30' : 'opacity-100'} hover:scale-[1.02] active:scale-100`}
        >
            <span className={`font-editorial uppercase tracking-widest text-base md:text-lg text-center transition-colors duration-300 ${typographyClass}`}>
                {t(translationKey)}
            </span>
        </button>
    );
};

const DefaultCenterContent: React.FC<{ isIgnitionActive: boolean }> = ({ isIgnitionActive }) => {
    const { t } = useLanguage();
    const mottoClasses = `font-technical text-gray-500 text-xs sm:text-sm uppercase tracking-[0.2em] transition-transform duration-200 ${isIgnitionActive ? 'animate-rev-rumble' : ''}`;
    return (
        <>
            <h1 className="font-editorial text-lg md:text-xl text-white tracking-wider whitespace-nowrap uppercase">
                {t('header.brand')}
            </h1>
            <div className="w-16 h-px bg-gray-700 my-3"></div>
            <p className={mottoClasses}>
                Die Never.
            </p>
        </>
    );
};

const GuideCenterContent: React.FC<{ onHoverGuide: (page: Page | null) => void; onNavigate: (page: Page) => void; }> = ({ onHoverGuide, onNavigate }) => {
    const { t } = useLanguage();
    return (
        <>
            <h2 className="font-editorial text-sm sm:text-base text-white tracking-wider whitespace-nowrap uppercase mb-5 text-center">
                {t('home.guide.title')}
            </h2>
            <div className="space-y-3 font-technical text-gray-500 text-[11px] sm:text-xs uppercase tracking-[0.2em] text-center">
                <p onClick={() => onNavigate('Manifesto')} onMouseEnter={() => onHoverGuide('Manifesto')} onMouseLeave={() => onHoverGuide(null)} className="cursor-pointer hover:text-white transition-all duration-300 hover:translate-x-1">
                    {t('home.guide.philosophy')}
                </p>
                <p onClick={() => onNavigate('Projetos')} onMouseEnter={() => onHoverGuide('Projetos')} onMouseLeave={() => onHoverGuide(null)} className="cursor-pointer hover:text-white transition-all duration-300 hover:translate-x-1">
                    {t('home.guide.projects')}
                </p>
                <p onClick={() => onNavigate('Run')} onMouseEnter={() => onHoverGuide('Run')} onMouseLeave={() => onHoverGuide(null)} className="cursor-pointer hover:text-white transition-all duration-300 hover:translate-x-1">
                    {t('home.guide.movement')}
                </p>
            </div>
        </>
    );
};

interface HomeProps {
    onNavigate: (page: Page) => void;
    intentPage: Page | null;
    onBackgroundChange: (imageUrl: string | null) => void;
}

const Home: React.FC<HomeProps> = ({ onNavigate, intentPage, onBackgroundChange }) => {
    const { t, language } = useLanguage();
    const [hoveredPage, setHoveredPage] = useState<Page | null>(null);
    const [isCenterHovered, setIsCenterHovered] = useState(false);
    const [hoveredGuideOption, setHoveredGuideOption] = useState<Page | null>(null);
    const [showFirstTimeHint, setShowFirstTimeHint] = useState(false);
    const [centerClickCount, setCenterClickCount] = useState(0);
    const [easterEggActive, setEasterEggActive] = useState(false);

    // Ignition Sequence Easter Egg
    const [hoverSequence, setHoverSequence] = useState<string[]>([]);
    const [ignitionActive, setIgnitionActive] = useState(false);
    const ignitionKeyAudioRef = useRef<HTMLAudioElement | null>(null);
    const ignitionStartAudioRef = useRef<HTMLAudioElement | null>(null);

    // Impatient Hover Easter Egg
    const [showImpatientEgg, setShowImpatientEgg] = useState(false);
    const hoverTimestamps = useRef<number[]>([]);
    const lastHoveredPage = useRef<Page | null>(null);
    const impatientEggTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
    
    useEffect(() => {
        if (localStorage.getItem('vrt_has_interacted') !== 'true') {
            setShowFirstTimeHint(true);
        }
        // Preload audio files
        ignitionKeyAudioRef.current = new Audio("https://www.dropbox.com/scl/fi/8ctu9afi7f6fsejol1sym/Key-start-engine-sound-effect.mp3?rlkey=vttalgh2f6732nvvc2hzgjqnt&raw=1");
        ignitionStartAudioRef.current = new Audio("https://www.dropbox.com/scl/fi/e340i4067i14xzjfw0eap/Car-Engine-Start-Sound-Effect-ProSounds.mp3?rlkey=rv0ph2x5m2aax9glkpn541gd1&raw=1");
        
        if (ignitionKeyAudioRef.current) {
            ignitionKeyAudioRef.current.onended = () => {
                ignitionStartAudioRef.current?.play().catch(e => console.error("Engine start sound failed:", e));
            };
        }
    }, []);

    useEffect(() => {
        const pageToHighlight = hoveredPage || hoveredGuideOption || intentPage;
        let newBg = pageToHighlight ? pageBackgrounds[pageToHighlight as keyof typeof pageBackgrounds] : null;
        
        if (pageToHighlight === 'Lifestyle') {
            newBg = language === 'pt' 
                ? 'https://i.imgur.com/0jKw5Tw.png' // PT back view model
                : 'https://i.imgur.com/UCsQA80.png'; // EN back view model
        }

        onBackgroundChange(newBg || null);
    }, [hoveredPage, hoveredGuideOption, intentPage, onBackgroundChange, language]);

    useEffect(() => {
        const targetSequence = ['Manifesto', 'Works', 'Projetos', 'Run'];
        if (JSON.stringify(hoverSequence) === JSON.stringify(targetSequence)) {
            setIgnitionActive(true);
            if (ignitionKeyAudioRef.current) {
                ignitionKeyAudioRef.current.currentTime = 0;
                ignitionKeyAudioRef.current.volume = 0.5;
                ignitionStartAudioRef.current!.volume = 0.3;
                ignitionKeyAudioRef.current.play().catch(e => console.error("Key sound failed:", e));
            }
            setTimeout(() => setIgnitionActive(false), 2500); // Duration for animation + sounds
            setHoverSequence([]);
        }
    }, [hoverSequence]);

    const handleHover = (page: Page | null) => {
        setHoveredPage(page);
        if (page) {
            // Ignition Sequence
            if (hoverSequence[hoverSequence.length - 1] !== page) {
                const newSequence = [...hoverSequence, page];
                setHoverSequence(newSequence.slice(-4));
            }

            // Impatient Hover Egg
            if (page !== lastHoveredPage.current) {
                const now = Date.now();
                hoverTimestamps.current.push(now);
                if (hoverTimestamps.current.length > 5) {
                    hoverTimestamps.current.shift();
                }

                if (hoverTimestamps.current.length === 5) {
                    const duration = hoverTimestamps.current[4] - hoverTimestamps.current[0];
                    if (duration < 1500) {
                        setShowImpatientEgg(true);
                        hoverTimestamps.current = []; // Reset
                        if (impatientEggTimer.current) clearTimeout(impatientEggTimer.current);
                        impatientEggTimer.current = setTimeout(() => setShowImpatientEgg(false), 4000);
                    }
                }
            }
            lastHoveredPage.current = page;
        }
    };

    const handleInteraction = () => {
        if (showFirstTimeHint) {
            setShowFirstTimeHint(false);
            localStorage.setItem('vrt_has_interacted', 'true');
        }
    };

    const handleCenterClick = () => {
        if (easterEggActive) return;

        const newCount = centerClickCount + 1;
        setCenterClickCount(newCount);

        if (newCount >= 5) {
            setEasterEggActive(true);
        }
        handleInteraction();
    };
    
    const handleCenterMouseLeave = () => {
        setIsCenterHovered(false);
        setCenterClickCount(0); // Reset count when mouse leaves
    }
    
    const highlightedPage = intentPage || hoveredPage || hoveredGuideOption;
    const isDimmingActive = highlightedPage !== null;
    
    const isGuideActive = isCenterHovered && !intentPage && !hoveredPage;

    const renderCenterContent = () => {
        const isHoveringNav = hoveredPage && pageSubtitles[hoveredPage as keyof typeof pageSubtitles];

        if (easterEggActive) {
            return (
                 <p className="font-technical text-yellow-300 text-xs sm:text-sm uppercase tracking-[0.2em] px-4">
                    {t('home.easter_egg')}
                </p>
            );
        }

        if (isGuideActive) {
            return <GuideCenterContent onHoverGuide={setHoveredGuideOption} onNavigate={onNavigate} />;
        }
        
        if (isHoveringNav) {
            return (
                 <>
                    <h1 className="font-editorial text-lg md:text-xl text-white tracking-wider whitespace-nowrap uppercase">
                        {t(`header.nav.${hoveredPage!.toLowerCase()}`)}
                    </h1>
                    <div className="w-16 h-px bg-gray-700 my-3"></div>
                    <p className="font-technical text-gray-500 text-xs sm:text-sm uppercase tracking-[0.2em]">
                        {t(pageSubtitles[hoveredPage as keyof typeof pageSubtitles])}
                    </p>
                </>
            );
        }

        return <DefaultCenterContent isIgnitionActive={ignitionActive} />;
    };

    const centerCellClasses = `
        flex flex-col items-center justify-center h-full w-full border text-center p-4 transition-all duration-300
        ${easterEggActive ? 'border-yellow-300 shadow-[0_0_15px_rgba(253,224,71,0.5)]' : 'border-gray-800'}
    `;

    return (
        <div className="h-screen w-full bg-transparent flex items-center justify-center p-2 sm:p-6 md:p-8 relative overflow-hidden">
            <div className="relative grid grid-cols-3 grid-rows-3 w-full max-w-5xl aspect-square max-h-[90vh] md:h-[80vh] md:max-h-[800px]">
                <NavCell page="Manifesto" onClick={() => onNavigate('Manifesto')} onHover={handleHover} onInteraction={handleInteraction} isDimmed={isDimmingActive && highlightedPage !== 'Manifesto'} />
                <NavCell page="Works" onClick={() => onNavigate('Works')} onHover={handleHover} onInteraction={handleInteraction} isDimmed={isDimmingActive && highlightedPage !== 'Works'} />
                <NavCell page="Projetos" onClick={() => onNavigate('Projetos')} onHover={handleHover} onInteraction={handleInteraction} isDimmed={isDimmingActive && highlightedPage !== 'Projetos'} />
                
                <NavCell page="Run" onClick={() => onNavigate('Run')} onHover={handleHover} onInteraction={handleInteraction} isDimmed={isDimmingActive && highlightedPage !== 'Run'} />

                {/* Center Cell */}
                <div 
                    className={centerCellClasses}
                    onMouseEnter={() => { setIsCenterHovered(true); handleInteraction(); }}
                    onMouseLeave={handleCenterMouseLeave}
                    onClick={handleCenterClick}
                >
                    <div key={easterEggActive ? 'egg' : (isGuideActive ? 'guide' : (hoveredPage || 'default'))} className="animate-fade-in-up" style={{animationDuration: '0.4s'}}>
                       {renderCenterContent()}
                    </div>
                </div>

                <NavCell page="Lifestyle" onClick={() => onNavigate('Lifestyle')} onHover={handleHover} onInteraction={handleInteraction} isDimmed={isDimmingActive && highlightedPage !== 'Lifestyle'} />
                <NavCell page="VrtcMedia" onClick={() => onNavigate('VrtcMedia')} onHover={handleHover} onInteraction={handleInteraction} isDimmed={isDimmingActive && highlightedPage !== 'VrtcMedia'} />
                <NavCell page="Conceito" onClick={() => onNavigate('Conceito')} onHover={handleHover} onInteraction={handleInteraction} isDimmed={isDimmingActive && highlightedPage !== 'Conceito'} />
                <NavCell page="Contato" onClick={() => onNavigate('Contato')} onHover={handleHover} onInteraction={handleInteraction} isDimmed={isDimmingActive && highlightedPage !== 'Contato'} />
            </div>

            {showImpatientEgg && (
                <div className="fixed bottom-12 left-4 font-technical text-xs text-gray-700 tracking-wider animate-fade-in-up z-50 bg-black/50 px-2 py-1">
                    {t('easter_eggs.home_impatient_hover')}
                </div>
            )}
            {showFirstTimeHint && (
                <div className="fixed bottom-4 left-4 font-technical text-xs text-gray-700 tracking-wider animate-fade-in-up">
                    {t('home.first_time_hint')}
                </div>
            )}
        </div>
    );
};

export default Home;
