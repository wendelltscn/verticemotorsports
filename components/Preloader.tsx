

import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const Preloader: React.FC = () => {
    const { t } = useLanguage();
    const [clicks, setClicks] = React.useState(0);
    const [message, setMessage] = React.useState('');
    const [messageLevel, setMessageLevel] = React.useState(0);

    const handleClick = () => {
        if (messageLevel >= 2) return; // Max messages reached
        
        const newClicks = clicks + 1;
        setClicks(newClicks);

        if (newClicks >= 5) {
            if (messageLevel === 0) {
                setMessage(t('easter_eggs.preloader_spam_1'));
                setMessageLevel(1);
                setClicks(0); // reset for next level
            } else if (messageLevel === 1) {
                setMessage(t('easter_eggs.preloader_spam_2'));
                setMessageLevel(2);
                setClicks(0);
            }
        }
    };

    return (
        <div className="fixed inset-0 bg-black z-[200] flex flex-col items-center justify-center" onClick={handleClick}>
            <div className="relative w-24 h-auto animate-flicker">
                <img 
                    src="https://i.imgur.com/BHt2WyD.png" 
                    alt="VERTICE Logo" 
                    className="w-full h-auto"
                />
            </div>
            <div className="w-32 h-px bg-gray-800 mt-8 overflow-hidden rounded-full">
                <div className="h-full bg-yellow-300 animate-loading-bar rounded-full"></div>
            </div>
            {message && (
                <p className="font-technical text-xs text-gray-700 mt-4 animate-fade-in-up text-center px-4">
                    {message}
                </p>
            )}
            <style>{`
                @keyframes loading-bar {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(0%); }
                }
                .animate-loading-bar {
                    animation: loading-bar 2s cubic-bezier(0.65, 0, 0.35, 1) forwards;
                }
            `}</style>
        </div>
    );
};

export default Preloader;