
import React, { useState, useRef, useEffect } from 'react';
import type { Page } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { SoundOnIcon, SoundOffIcon } from './icons/PlayerIcons';

const LanguageSwitcher: React.FC<{ onSwitchSpam: () => void }> = ({ onSwitchSpam }) => {
    const { language, setLanguage } = useLanguage();
    const tracker = useRef({ count: 0, lastTime: 0 });

    const handleLanguageChange = (lang: 'pt' | 'en') => {
        if (language === lang) return;

        const now = Date.now();
        if (now - tracker.current.lastTime < 1000) { // If switch is within 1 second
            tracker.current.count++;
        } else {
            tracker.current.count = 1;
        }
        tracker.current.lastTime = now;

        if (tracker.current.count >= 6) {
            onSwitchSpam();
            tracker.current.count = 0; // Reset
        }

        setLanguage(lang);
    };

    return (
        <div className="flex space-x-1 border border-gray-700 rounded-full p-0.5 bg-overlay-50">
            <button
                onClick={() => handleLanguageChange('pt')}
                className={`px-3 py-1 text-xs rounded-full transition-colors duration-300 ${language === 'pt' ? 'bg-yellow-300 text-black' : 'text-gray-400 hover:bg-gray-900/50'} active:scale-95`}
                aria-pressed={language === 'pt'}
            >
                PT
            </button>
            <button
                onClick={() => handleLanguageChange('en')}
                className={`px-3 py-1 text-xs rounded-full transition-colors duration-300 ${language === 'en' ? 'bg-yellow-300 text-black' : 'text-gray-400 hover:bg-gray-900/50'} active:scale-95`}
                aria-pressed={language === 'en'}
            >
                EN
            </button>
        </div>
    );
};

const MenuIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <line x1="3" y1="12" x2="21" y2="12"></line>
        <line x1="3" y1="6" x2="21" y2="6"></line>
        <line x1="3" y1="18" x2="21" y2="18"></line>
    </svg>
);

const CloseIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
);


interface CockpitNavProps {
    onNavigate: (page: Page) => void;
    activePage: Page;
    isPlayerOpen: boolean;
    hasPlayerBeenLoaded: boolean;
    onTogglePlayer: () => void;
    isScrolled: boolean;
}

const CockpitNav: React.FC<CockpitNavProps> = ({ onNavigate, activePage, isPlayerOpen, hasPlayerBeenLoaded, onTogglePlayer, isScrolled }) => {
    const [isOpen, setIsOpen] = useState(false);
    const { t } = useLanguage();

    // Easter Egg States
    const [isGhostActive, setIsGhostActive] = useState(false);
    const [ghostMessage, setGhostMessage] = useState('');
    const [showFrequencyEgg, setShowFrequencyEgg] = useState(false);
    const holdTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
    const frequencyAudioRef = useRef<HTMLAudioElement | null>(null);
    const [showLangEgg, setShowLangEgg] = useState(false);
    
    // Logo multi-click handler state
    const [logoClicks, setLogoClicks] = useState(0);
    const logoClickTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        frequencyAudioRef.current = new Audio("data:audio/wav;base64,UklGRiYAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQIAAAD//wA/AD8APwA/AD8A");
        frequencyAudioRef.current.volume = 0.1;
    }, []);

    const menuItems: Page[] = ['Home', 'Manifesto', 'Works', 'Projetos', 'Run', 'Lifestyle', 'VrtcMedia', 'Wallpapers', 'Conceito', 'Podcast', 'Movimento', 'Contato'];
    
    const handleNav = (page: Page) => {
        onNavigate(page);
        setIsOpen(false);
    }
    
    const handleToggleMenu = () => {
        setIsOpen(!isOpen);
    }
    
    const handleTogglePlayerWithSound = () => {
        onTogglePlayer();
    }

    const handleLogoDoubleClick = () => {
        if (isGhostActive) return;

        const messages = t('easter_eggs.ghost_messages').split('|');
        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        setGhostMessage(randomMessage);
        setIsGhostActive(true);
        setTimeout(() => setIsGhostActive(false), 4000);
    };

    const handlePlayerButtonDown = () => {
        holdTimer.current = setTimeout(() => {
            setShowFrequencyEgg(true);
            frequencyAudioRef.current?.play().catch(e => console.error(e));
            setTimeout(() => setShowFrequencyEgg(false), 4000);
        }, 3000);
    };

    const handlePlayerButtonUp = () => {
        if (holdTimer.current) {
            clearTimeout(holdTimer.current);
        }
    };
    
    const handleLogoInteraction = () => {
        if (logoClickTimer.current) clearTimeout(logoClickTimer.current);
    
        const newCount = logoClicks + 1;
        setLogoClicks(newCount);
    
        if (newCount === 1) { // Wait for more clicks
            logoClickTimer.current = setTimeout(() => {
                handleNav('Home');
                setLogoClicks(0);
            }, 250); // 250ms window for multi-click
        } else if (newCount === 2) { // Double click
            handleLogoDoubleClick();
            setLogoClicks(0);
        }
    };

    const handleLangSwitchSpam = () => {
        setShowLangEgg(true);
        setTimeout(() => setShowLangEgg(false), 3000);
    };

    const soundIcon = hasPlayerBeenLoaded ? <SoundOnIcon className="w-6 h-6" /> : <SoundOffIcon className="w-6 h-6" />;
    const soundButtonClasses = `w-12 h-12 bg-overlay-50 backdrop-blur-sm border rounded-full flex items-center justify-center transition-all duration-300 active:scale-95 hover:-translate-y-0.5 active:translate-y-0 ${
        isPlayerOpen 
        ? 'border-yellow-300 text-yellow-300' 
        : 'border-gray-800 text-white hover:border-yellow-300'}`;

    const logoClasses = `w-8 h-auto transition-all duration-500 group-hover:rotate-[360deg] ${
        isGhostActive ? 'opacity-50 saturate-200 hue-rotate-90' : ''
    }`;

    return (
        <>
            <header className={`fixed top-0 left-0 right-0 z-[100] flex items-center justify-between p-6 transition-all duration-300 ${isScrolled ? 'bg-overlay-50 backdrop-blur-md border-b border-gray-900/50' : ''}`}>
                <button 
                    onClick={handleLogoInteraction}
                    className="flex items-center gap-3 text-white group transition-transform active:scale-95"
                    aria-label="Go to Home"
                >
                    <img 
                        src="https://i.imgur.com/BHt2WyD.png" 
                        alt="VERTICE Logo" 
                        className={logoClasses}
                        style={{ animation: 'subtle-pulse 8s infinite ease-in-out' }}
                    />
                     <style>{`
                        @keyframes subtle-pulse { 0% { opacity: 0.85; } 50% { opacity: 1; } 100% { opacity: 0.85; } }
                    `}</style>
                    <span className="font-editorial uppercase tracking-widest text-lg hidden sm:block group-hover:text-yellow-300 transition-colors">
                        {t('header.brand')}
                    </span>
                </button>

                <div className="flex items-center gap-4">
                    <LanguageSwitcher onSwitchSpam={handleLangSwitchSpam} />
                    <button 
                        onClick={handleTogglePlayerWithSound} 
                        onMouseDown={handlePlayerButtonDown}
                        onMouseUp={handlePlayerButtonUp}
                        onTouchStart={handlePlayerButtonDown}
                        onTouchEnd={handlePlayerButtonUp}
                        className={soundButtonClasses} 
                        aria-label="Toggle Soundtrack"
                    >
                        {soundIcon}
                    </button>
                    <button onClick={handleToggleMenu} className="w-12 h-12 bg-overlay-50 backdrop-blur-sm border border-gray-800 rounded-full flex items-center justify-center text-white hover:border-yellow-300 transition-all duration-300 active:scale-95 hover:-translate-y-0.5 active:translate-y-0" aria-label="Toggle Navigation" aria-expanded={isOpen}>
                        {isOpen ? <CloseIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
                    </button>
                </div>
            </header>

            <div
                className={`fixed inset-0 z-[99] bg-overlay-90 backdrop-blur-lg transition-opacity duration-500 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
                onClick={() => setIsOpen(false)}
            >
                <nav className="w-full h-full flex flex-col items-center justify-center gap-6">
                    {menuItems.map((page, i) => (
                        <button
                            key={page}
                            onClick={() => handleNav(page)}
                            className={`font-editorial uppercase tracking-widest text-3xl md:text-4xl transition-all duration-300 ${activePage === page ? 'text-yellow-300' : 'text-gray-600 hover:text-white'} hover:scale-105 active:scale-100`}
                            style={{ animation: isOpen ? `fade-in-up 0.6s cubic-bezier(0.22, 1, 0.36, 1) ${i * 0.05}s both` : 'none' }}
                        >
                            {page === 'Home' ? t('header.brand') : t(`header.nav.${page.toLowerCase()}`)}
                        </button>
                    ))}
                </nav>
            </div>
            
            {isGhostActive && (
                <div className="fixed bottom-6 left-1/2 -translate-x-1/2 font-technical text-sm text-center text-green-400 bg-overlay-50 px-4 py-2 border border-green-900/50 animate-fade-in-up z-[101]">
                    &gt; {ghostMessage}
                </div>
            )}
            
            {showFrequencyEgg && (
                 <div className="fixed bottom-6 left-1/2 -translate-x-1/2 font-technical text-xs text-center text-gray-500 bg-overlay-50 border border-gray-800 px-3 py-1 animate-fade-in-up z-[101]">
                    {t('easter_eggs.secret_frequency')}
                </div>
            )}

            {showLangEgg && (
                <div className="fixed bottom-6 left-1/2 -translate-x-1/2 font-technical text-xs text-center text-gray-500 bg-overlay-50 border border-gray-800 px-3 py-1 animate-fade-in-up z-[101]">
                    {t('easter_eggs.language_spam')}
                </div>
            )}
        </>
    );
};

export default CockpitNav;