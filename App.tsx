
import React, { useState, useEffect, useRef } from 'react';
import Home from './components/sections/Home';
import Manifesto from './components/sections/Manifesto';
import Works from './components/sections/Works';
import Projetos from './components/sections/Projetos';
import Run from './components/sections/Run';
import Conceito from './components/sections/Conceito';
import Podcast from './components/sections/Podcast';
import Contato from './components/sections/Contato';
import Movimento from './components/sections/Movimento';
import VrtcMedia from './components/sections/VrtcMedia';
import Lifestyle from './components/sections/Lifestyle';
import Wallpapers from './components/sections/Wallpapers';
import CockpitNav from './components/CockpitNav';
import SpotifyPlayer from './components/SpotifyPlayer';
import type { Page } from './types';
import Preloader from './components/Preloader';
import DynamicBackground from './components/DynamicBackground';
import TerminalEasterEgg from './components/TerminalEasterEgg';
import GlitchEffect from './components/GlitchEffect';
import RedlineEffect from './components/RedlineEffect';
import CustomCursor from './components/CustomCursor';
import { useLanguage } from './context/LanguageContext';

const App: React.FC = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [activePage, setActivePage] = useState<Page>('Home');
    const [transitionState, setTransitionState] = useState<'entering' | 'exiting' | 'initial'>('initial');
    const [intentPage, setIntentPage] = useState<Page | null>(null);
    const [isPlayerOpen, setIsPlayerOpen] = useState(false);
    const [hasPlayerBeenLoaded, setHasPlayerBeenLoaded] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [hoveredBackground, setHoveredBackground] = useState<string | null>(null);
    const [keySequence, setKeySequence] = useState('');
    const [isTerminalMode, setIsTerminalMode] = useState(false);

    // Easter Egg States
    const [isBlueprintMode, setIsBlueprintMode] = useState(false);
    const [konamiSequence, setKonamiSequence] = useState<string[]>([]);
    const [showBlueprintNotification, setShowBlueprintNotification] = useState(false);
    const [glitchSequence, setGlitchSequence] = useState('');
    const [isGlitchActive, setIsGlitchActive] = useState(false);
    const [showRedline, setShowRedline] = useState(false);
    
    // Refs for Redline scroll effect
    const lastScrollY = useRef(0);
    const lastScrollTime = useRef(0);
    const scrollVelocity = useRef(0);
    const redlinePrimed = useRef(false);

    // Collect all possible background images for preloading in DynamicBackground
    const allBackgroundImages = [
        'https://i.imgur.com/oszZB03.png',
        'https://i.imgur.com/XBj922H.png',
        'https://i.imgur.com/t4bSdlB.png',
        'https://i.imgur.com/Zg0fkVA.png',
        'https://i.imgur.com/YSuDJBG.png', // New background for Conceito
        'https://i.imgur.com/NWGRjXa.png', // Background for Podcast
        'https://i.imgur.com/v7QYRwU.png', // Background for Contato
        'https://i.imgur.com/0jKw5Tw.png', // Background for Lifestyle PT
        'https://i.imgur.com/UCsQA80.png', // Background for Lifestyle EN
    ];

    useEffect(() => {
        // Simulate loading time for preloader
        setTimeout(() => setIsLoading(false), 2200);

        // Load blueprint mode from session storage on initial load
        const bpMode = sessionStorage.getItem('vrt_blueprint_mode') === 'true';
        if (bpMode) {
            setIsBlueprintMode(bpMode);
        }
    }, []);

     useEffect(() => {
        // After loading, animate the first page in
        if (!isLoading) {
            setTimeout(() => setTransitionState('entering'), 50);
        }
    }, [isLoading]);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // --- EASTER EGG LISTENERS ---

    // Developer Console Easter Egg
    useEffect(() => {
        const styles = [
            'color: #fde047',
            'font-family: monospace',
            'font-size: 10px',
            'text-shadow: 0 0 5px #fde047'
        ].join(';');
        console.log('%c                        ........                               #####     *######                         \n                         ........                            :#####     #######                          \n                          .......:                          *#####     #######                           \n                           .....---                        #####:     #######                            \n                            ..:------    .                #####     -######:                             \n                              -------     ::             #####     ######%                               \n                               ------     ::::          #####     #%%%%%%                                \n                                ====      ----        .#####     %%%%%%%                                 \n                                 ==      -----       *#####     %%%%%%%                                  \n                                  =    .=====-      ######     %%%%%%%                                   \n                                      ========     #%%%%:    -%%%%%%+                                    \n                                     -=======     %%%%%     *#%%%%%                                      \n                                     --====      +%%%%     **#%%%%                                       \n                                       =+=     :++#%%     **##%%%                                        \n                                        +     ++++#%     #####%%                                         \n                                             +**++#     #######                                          \n                                            *****+     ######:                                           \n                                           *****     -######                                             \n                                            ***     *######                                              \n                                             *     #######                                               \n                                                  #######                                                \n                                                 #######                                                 \n                                                ######-                                                  \n                                                 ####                                                    \n\n> DIE NEVER.\n\n// Saw our code? Maybe you should be building with us.\n// Say hello: verticemotorsports@gmail.com', styles);
    }, []);

    // Terminal Mode ('dienever')
    useEffect(() => {
        const targetSequence = 'dienever';
        const handleKeyDown = (e: KeyboardEvent) => {
             if (isTerminalMode) return;
            if (e.key.length > 1) return; // Ignore control keys
            const newSequence = (keySequence + e.key.toLowerCase()).slice(-targetSequence.length);
            setKeySequence(newSequence);
            if (newSequence === targetSequence) {
                setIsTerminalMode(true);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [keySequence, isTerminalMode]);

    // Glitch Mode ('vortex')
    useEffect(() => {
        const targetSequence = 'vortex';
        const handleKeyDown = (e: KeyboardEvent) => {
            if (isTerminalMode || isGlitchActive) return;
            if (e.key.length > 1) return;
            const newSequence = (glitchSequence + e.key.toLowerCase()).slice(-targetSequence.length);
            setGlitchSequence(newSequence);
            if (newSequence === targetSequence) {
                setIsGlitchActive(true);
                setTimeout(() => setIsGlitchActive(false), 3000);
                setGlitchSequence('');
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [glitchSequence, isTerminalMode, isGlitchActive]);

    // Blueprint Mode (Konami Code)
     useEffect(() => {
        const targetSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
        
        const handleKeyDown = (e: KeyboardEvent) => {
            if (isTerminalMode) return; // Don't trigger while modal is open

            const newSequence = [...konamiSequence, e.key];
            const trimmedSequence = newSequence.slice(-targetSequence.length);
            setKonamiSequence(trimmedSequence);

            if (JSON.stringify(trimmedSequence) === JSON.stringify(targetSequence)) {
                const newBpMode = !isBlueprintMode;
                setIsBlueprintMode(newBpMode);
                sessionStorage.setItem('vrt_blueprint_mode', String(newBpMode));
                
                // Trigger visual/audio feedback
                setIsGlitchActive(true);
                setTimeout(() => setIsGlitchActive(false), 500);
                
                setShowBlueprintNotification(true);
                setTimeout(() => setShowBlueprintNotification(false), 3500);
                setKonamiSequence([]); // Reset after successful entry
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [konamiSequence, isBlueprintMode, isTerminalMode]);
    
    // Redline Scroll Effect
    useEffect(() => {
        const handleScroll = (event: Event) => {
            const currentTime = performance.now();
            const currentScrollY = window.scrollY;

            if (lastScrollTime.current > 0) {
                const deltaTime = currentTime - lastScrollTime.current;
                const deltaY = currentScrollY - lastScrollY.current;
                scrollVelocity.current = Math.abs(deltaY / deltaTime);

                // High velocity scroll down primes the effect
                if (deltaY > 0 && scrollVelocity.current > 3.5) {
                    redlinePrimed.current = true;
                }
                // High velocity scroll up triggers it if primed
                else if (deltaY < 0 && scrollVelocity.current > 3.5 && redlinePrimed.current) {
                    setShowRedline(true);
                    setTimeout(() => setShowRedline(false), 600);
                    redlinePrimed.current = false; // Reset
                }
                // Reset if scroll slows down
                else if (scrollVelocity.current < 1) {
                    redlinePrimed.current = false;
                }
            }

            lastScrollY.current = currentScrollY;
            lastScrollTime.current = currentTime;
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleNavigate = (page: Page) => {
        if (page === activePage || transitionState === 'exiting') return;
        setIntentPage(page);
        setTimeout(() => {
            setTransitionState('exiting');
            setTimeout(() => {
                window.scrollTo({ top: 0, behavior: 'instant' });
                setActivePage(page);
                setIntentPage(null);
                setTransitionState('initial');
                setTimeout(() => setTransitionState('entering'), 50);
            }, 450);
        }, 200); 
    };

    const handleTogglePlayer = () => {
        const opening = !isPlayerOpen;
        if (opening && !hasPlayerBeenLoaded) setHasPlayerBeenLoaded(true);
        setIsPlayerOpen(opening);
    };

    const renderPage = () => {
        switch (activePage) {
            case 'Home': return <Home onNavigate={handleNavigate} intentPage={intentPage} onBackgroundChange={setHoveredBackground} />;
            case 'Manifesto': return <Manifesto />;
            case 'Works': return <Works onNavigate={handleNavigate} />;
            case 'Projetos': return <Projetos isBlueprintMode={isBlueprintMode} />;
            case 'Run': return <Run />;
            case 'VrtcMedia': return <VrtcMedia onNavigate={handleNavigate} />;
            case 'Lifestyle': return <Lifestyle />;
            case 'Wallpapers': return <Wallpapers />;
            case 'Conceito': return <Conceito />;
            case 'Podcast': return <Podcast />;
            case 'Movimento': return <Movimento />;
            case 'Contato': return <Contato />;
            default: return <Home onNavigate={handleNavigate} intentPage={intentPage} onBackgroundChange={setHoveredBackground} />;
        }
    };
    
    return (
        <>
            <CustomCursor />
            {isLoading ? (
                <Preloader />
            ) : (
                <AppContent 
                    activePage={activePage}
                    isScrolled={isScrolled}
                    isPlayerOpen={isPlayerOpen}
                    hasPlayerBeenLoaded={hasPlayerBeenLoaded}
                    onTogglePlayer={handleTogglePlayer}
                    onNavigate={handleNavigate}
                    renderPage={renderPage}
                    hoveredBackground={hoveredBackground}
                    allBackgroundImages={allBackgroundImages}
                    transitionState={transitionState}
                    isTerminalMode={isTerminalMode}
                    closeTerminal={() => setIsTerminalMode(false)}
                    isGlitchActive={isGlitchActive}
                    isBlueprintMode={isBlueprintMode}
                    showBlueprintNotification={showBlueprintNotification}
                    showRedline={showRedline}
                />
            )}
        </>
    );
};

// Separate content to access language context for notification text
const AppContent: React.FC<any> = ({
    activePage, isScrolled, isPlayerOpen, hasPlayerBeenLoaded, onTogglePlayer, onNavigate, renderPage,
    hoveredBackground, allBackgroundImages, transitionState, isTerminalMode, closeTerminal,
    isGlitchActive, isBlueprintMode, showBlueprintNotification, showRedline
}) => {
    const { t } = useLanguage();

    const BlueprintNotification: React.FC<{ active: boolean }> = ({ active }) => (
        <div className="fixed bottom-4 right-4 bg-yellow-300 text-black font-technical text-xs uppercase px-4 py-2 animate-fade-in-up z-[150] flex items-center gap-2">
            <span className="w-2 h-2 bg-blue-500 animate-pulse"></span>
            { active ? t('easter_eggs.blueprint_activated') : t('easter_eggs.blueprint_deactivated') }
        </div>
    );

    return (
        <div className="min-h-screen text-gray-300 font-technical selection:bg-yellow-300 selection:text-black">
            <DynamicBackground 
                activeImage={hoveredBackground} 
                allImages={allBackgroundImages} 
                isVisible={activePage === 'Home'} 
            />
            <CockpitNav 
                onNavigate={onNavigate} 
                activePage={activePage} 
                isPlayerOpen={isPlayerOpen}
                hasPlayerBeenLoaded={hasPlayerBeenLoaded}
                onTogglePlayer={onTogglePlayer}
                isScrolled={isScrolled}
            />
            <main 
                key={activePage}
                className={`page-transition-wrapper ${transitionState}`}
            >
                {renderPage()}
            </main>
            <SpotifyPlayer 
                isOpen={isPlayerOpen} 
                onClose={() => onTogglePlayer()} 
                hasBeenLoaded={hasPlayerBeenLoaded}
            />
            {isTerminalMode && <TerminalEasterEgg onClose={closeTerminal} />}
            {isGlitchActive && <GlitchEffect />}
            {showBlueprintNotification && <BlueprintNotification active={isBlueprintMode} />}
            {showRedline && <RedlineEffect id="redline-effect" />}
        </div>
    );
}

export default App;