
import React, { useState } from 'react';
import type { Page } from '../types';
import { useLanguage } from '../context/LanguageContext';

const LanguageSwitcher: React.FC = () => {
    const { language, setLanguage } = useLanguage();
    return (
        <div className="flex space-x-1 border border-gray-700 rounded-full p-0.5">
            <button
                onClick={() => setLanguage('pt')}
                className={`px-3 py-1 text-xs rounded-full transition-colors duration-300 ${language === 'pt' ? 'bg-yellow-300 text-black' : 'text-gray-400 hover:bg-gray-800'}`}
                aria-pressed={language === 'pt'}
            >
                PT
            </button>
            <button
                onClick={() => setLanguage('en')}
                className={`px-3 py-1 text-xs rounded-full transition-colors duration-300 ${language === 'en' ? 'bg-yellow-300 text-black' : 'text-gray-400 hover:bg-gray-800'}`}
                aria-pressed={language === 'en'}
            >
                EN
            </button>
        </div>
    );
};


const NavLink: React.FC<{
    page: Page;
    activePage: Page;
    onNavigate: (page: Page) => void;
    children: React.ReactNode;
}> = ({ page, activePage, onNavigate, children }) => {
    const isActive = activePage === page;
    return (
        <button
            onClick={() => onNavigate(page)}
            className={`font-editorial uppercase tracking-widest text-sm transition-colors duration-300 relative py-2 
            ${isActive ? 'text-yellow-300' : 'text-gray-400 hover:text-white'}`}
        >
            {children}
            <span className={`absolute bottom-0 left-0 w-full h-px bg-yellow-300 transform scale-x-0 ${isActive ? 'scale-x-100' : ''} transition-transform duration-300 ease-out`}></span>
        </button>
    );
};

// FIX: Added HeaderProps interface definition to resolve TypeScript error.
interface HeaderProps {
    activePage: Page;
    onNavigate: (page: Page) => void;
}

const Header: React.FC<HeaderProps> = ({ activePage, onNavigate }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { t } = useLanguage();

    const menuItems: Page[] = ['Manifesto', 'Works', 'Projetos', 'Run', 'VrtcMedia', 'Lifestyle', 'Podcast', 'Contato'];

    const handleNavAndClose = (page: Page) => {
        onNavigate(page);
        setIsMenuOpen(false);
    };

    return (
        <header className="sticky top-0 z-50 bg-black bg-opacity-80 backdrop-blur-md">
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                 <button onClick={() => onNavigate('Home')} className="group flex items-center space-x-4 group-hover:opacity-80 transition-opacity duration-300">
                    <img src="https://i.imgur.com/BHt2WyD.png" alt="VERTICE Motorsports Logo" className="h-10 w-auto" />
                     <span className="font-technical text-white uppercase tracking-[0.2em] text-sm hidden md:block">
                        {t('header.brand')}
                    </span>
                </button>
                <nav className="hidden lg:flex items-center space-x-8">
                    {menuItems.map(page => (
                        <NavLink key={page} page={page} activePage={activePage} onNavigate={onNavigate}>
                            {t(`header.nav.${page.toLowerCase()}`)}
                        </NavLink>
                    ))}
                    <LanguageSwitcher />
                </nav>
                <div className="lg:hidden flex items-center gap-4">
                    <LanguageSwitcher />
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white focus:outline-none">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}></path>
                        </svg>
                    </button>
                </div>
            </div>
            {isMenuOpen && (
                <div className="lg:hidden bg-black absolute top-full left-0 w-full">
                    <nav className="flex flex-col items-center py-4 space-y-4">
                        {menuItems.map(page => (
                           <button
                                key={page}
                                onClick={() => handleNavAndClose(page)}
                                className={`font-editorial uppercase tracking-widest text-lg transition-colors duration-300
                                ${activePage === page ? 'text-yellow-300' : 'text-gray-400 hover:text-white'}`}
                            >
                                {t(`header.nav.${page.toLowerCase()}`)}
                            </button>
                        ))}
                    </nav>
                </div>
            )}
        </header>
    );
};

export default Header;