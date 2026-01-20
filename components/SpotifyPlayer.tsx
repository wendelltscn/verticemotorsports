
import * as React from 'react';
import { useLanguage } from '../context/LanguageContext';

interface SpotifyPlayerProps {
    isOpen: boolean;
    onClose: () => void;
    hasBeenLoaded: boolean;
}

// Playlist ID from the Run page
const SPOTIFY_PLAYLIST_ID = '4TyGgx1EwX5pR2W1elF41Q';

const SpotifyPlayer: React.FC<SpotifyPlayerProps> = ({ isOpen, onClose, hasBeenLoaded }) => {
    const { t } = useLanguage();

    React.useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleKeyDown);
        }

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen, onClose]);
    
    // If the iframe has never been loaded, render nothing to save resources.
    if (!hasBeenLoaded) {
        return null;
    }

    return (
        // The backdrop for clicking outside.
        // It becomes non-interactive when hidden to allow clicking through.
        <div
            className={`fixed inset-0 z-[110] bg-black/30 transition-opacity duration-300 ease-in-out ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            onClick={onClose}
            role="dialog"
            aria-modal="true"
        >
            {/* The player modal itself.
                It also becomes non-interactive when hidden. */}
            <div
                className={`fixed bottom-6 right-6 w-[calc(100vw-3rem)] max-w-[360px] bg-black/80 backdrop-blur-md border border-gray-800 rounded-lg shadow-2xl overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-between items-center p-3 border-b border-gray-800">
                    <h4 className="font-technical text-xs uppercase tracking-widest text-gray-400">
                        {t('home.player_title')}
                    </h4>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-white transition-colors"
                        aria-label={t('shared.close')}
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>
                </div>
                {/* The iframe is always rendered after the first load */}
                <>
                    <iframe
                        className="block" // To prevent default iframe bottom margin
                        src={`https://open.spotify.com/embed/playlist/${SPOTIFY_PLAYLIST_ID}?utm_source=generator&theme=0`}
                        width="100%"
                        height="352"
                        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                        loading="lazy"
                        title={t('home.player_title')}
                    ></iframe>
                    <div className="p-3 text-center border-t border-gray-800">
                        <p className="font-technical text-[11px] text-gray-600">
                            {t('home.player_premium_notice')}
                        </p>
                    </div>
                </>
            </div>
        </div>
    );
};

export default SpotifyPlayer;