
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/sections/Home';
import Manifesto from './components/sections/Manifesto';
import Works from './components/sections/Works';
import Projetos from './components/sections/Projetos';
import Run from './components/sections/Run';
import Lifestyle from './components/sections/Lifestyle';
import Podcast from './components/sections/Podcast';
import Contato from './components/sections/Contato';
import Movimento from './components/sections/Movimento';
import type { Page } from './types';

const App: React.FC = () => {
    const [activePage, setActivePage] = useState<Page>('Home');
    const [isExiting, setIsExiting] = useState(false);
    const [nextPage, setNextPage] = useState<Page | null>(null);

    const handleNavigate = (page: Page) => {
        if (page !== activePage) {
            setNextPage(page);
            setIsExiting(true);
        }
    };

    useEffect(() => {
        if (isExiting && nextPage) {
            const timer = setTimeout(() => {
                setActivePage(nextPage);
                setIsExiting(false);
                setNextPage(null);
                window.scrollTo(0, 0);
            }, 300); // Match animation duration
            return () => clearTimeout(timer);
        }
    }, [isExiting, nextPage, activePage]);

    const renderPage = () => {
        switch (activePage) {
            case 'Home': return <Home onNavigate={handleNavigate} />;
            case 'Manifesto': return <Manifesto />;
            case 'Works': return <Works />;
            case 'Projetos': return <Projetos />;
            case 'Run': return <Run onNavigate={handleNavigate} />;
            case 'Lifestyle': return <Lifestyle />;
            case 'Podcast': return <Podcast />;
            case 'Contato': return <Contato />;
            case 'Movimento': return <Movimento />;
            default: return <Home onNavigate={handleNavigate} />;
        }
    };

    return (
        <div className="bg-black min-h-screen flex flex-col font-technical">
            <Header activePage={activePage} onNavigate={handleNavigate} />
            <main className="flex-grow">
                <div className={`transition-opacity duration-300 ${isExiting ? 'opacity-0' : 'opacity-100'}`}>
                    {renderPage()}
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default App;