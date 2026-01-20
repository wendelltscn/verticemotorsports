
import * as React from 'react';
import { useLanguage } from '../../context/LanguageContext';

const ValueCard: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="bg-gray-900/20 border border-gray-900 p-6 h-full">
        <h3 className="font-editorial text-xl text-yellow-300 tracking-wider mb-3">{title}</h3>
        <p className="text-gray-400 leading-relaxed">{children}</p>
    </div>
);

const Manifesto: React.FC = () => {
    const { t, language } = useLanguage();
    const audioRef = React.useRef<HTMLAudioElement | null>(null);

    // Easter Egg State
    const [symphonyClicks, setSymphonyClicks] = React.useState(0);
    const [showSymphonyEgg, setShowSymphonyEgg] = React.useState(false);
    const symphonyClickTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null);
    const [showMottoSecret, setShowMottoSecret] = React.useState(false);


    const keyPhrases = {
        pt: "a sinfonia de um motor perfeitamente ajustado",
        en: "the symphony of a perfectly tuned engine"
    };
    
    const audioUrl = "https://www.dropbox.com/scl/fi/c2h7lyypgpyvqy3tjgdvt/Amazing-engine-sounds-V8-engine-tuning-powerful-engines-femtophysiker-v8engine-enginesound.mp3?rlkey=7t6hl20xrd4kbcnspb94gfem1&raw=1";

    const handleSymphonyClick = () => {
        if (symphonyClickTimer.current) clearTimeout(symphonyClickTimer.current);

        const newCount = symphonyClicks + 1;
        setSymphonyClicks(newCount);

        if (newCount >= 5) {
            setShowSymphonyEgg(true);
            setTimeout(() => setShowSymphonyEgg(false), 4000);
            setSymphonyClicks(0);
            return; // Prevent audio from playing
        }

        symphonyClickTimer.current = setTimeout(() => setSymphonyClicks(0), 2000);
        
        // Initialize audio on first click for better performance
        if (!audioRef.current) {
            audioRef.current = new Audio(audioUrl);
            audioRef.current.volume = 0.6; // Set a reasonable volume
        }
        
        // Play or pause logic
        if (audioRef.current.paused) {
            audioRef.current.currentTime = 0; // Rewind to start
            audioRef.current.play().catch(e => console.error("Audio playback failed:", e));
        } else {
            audioRef.current.pause();
            audioRef.current.currentTime = 0; // Stop and rewind
        }
    };
    
    const handleMottoDoubleClick = () => {
        setShowMottoSecret(true);
        setTimeout(() => setShowMottoSecret(false), 4000);
    };

    const manifestoParts = [
      t('manifesto.p1'),
      t('manifesto.p2'),
      t('manifesto.p3'),
      t('manifesto.p4'),
    ];

    const valuesKeys = ['excellence', 'authenticity', 'innovation', 'community', 'sustainability', 'motto'];
    
    // Function to render the paragraph containing the clickable phrase
    const renderSpecialParagraph = (part: string) => {
        const keyPhrase = keyPhrases[language];
        if (part.includes(keyPhrase)) {
            const parts = part.split(keyPhrase);
            return (
                <>
                    {parts[0]}
                    <span 
                        onClick={handleSymphonyClick} 
                        className="relative inline-block cursor-pointer hover:text-yellow-300 transition-colors duration-300"
                        title="Play Sound"
                        role="button"
                    >
                        {keyPhrase}
                        {showSymphonyEgg && (
                            <span className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-max font-technical text-xs text-gray-400 animate-fade-in-up bg-black/50 px-3 py-1 border border-gray-800 rounded">
                                {t('easter_eggs.manifesto_spam')}
                            </span>
                        )}
                    </span>
                    {parts[1]}
                </>
            );
        }
        return part;
    };

    return (
        <div className="relative w-full bg-black text-white overflow-hidden">
             <video 
              autoPlay 
              loop 
              muted 
              playsInline
              className="absolute z-0 w-auto min-w-full min-h-full max-w-none object-cover"
              poster="https://i.imgur.com/oszZB03.png"
            >
              <source src="https://i.imgur.com/v2j3j3j.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-overlay-80 z-10"></div>
            
            <div className="relative z-20">
                <header className="h-[70vh] w-full flex flex-col justify-center items-center text-center p-6">
                    <h1 className="font-editorial text-4xl sm:text-5xl md:text-7xl text-white tracking-wider mb-4 animate-fade-in-up-slow animate-text-flicker">{t('manifesto.title')}</h1>
                    <div className="w-20 h-px bg-yellow-300 mx-auto animate-fade-in-up-slow delay-100"></div>
                </header>
                
                <main className="py-20 md:py-28">
                    <article className="container mx-auto px-6 max-w-3xl space-y-8 text-center">
                        {manifestoParts.map((part, index) => (
                            <p 
                                key={index} 
                                className={`text-lg md:text-xl leading-relaxed text-gray-300 animate-fade-in-up-slow ${index === 3 ? 'font-editorial text-white italic text-2xl' : 'font-technical'}`}
                                style={{ animationDelay: `${200 + index * 150}ms` }}
                            >
                                {index === 2 ? renderSpecialParagraph(part) : part}
                            </p>
                        ))}
                    </article>

                    <section className="py-20 md:py-28 mt-20 md:mt-28 bg-overlay-50 animate-fade-in-up-slow delay-400">
                        <div className="container mx-auto px-6 text-center max-w-4xl">
                            <h2 className="font-editorial text-3xl md:text-4xl text-white tracking-wider mb-4">{t('manifesto.vision_title')}</h2>
                            <p className="text-gray-400 leading-relaxed text-lg">
                               {t('manifesto.vision_text')}
                            </p>
                       </div>
                    </section>

                    <section className="container mx-auto px-6 py-20 md:py-28 animate-fade-in-up-slow delay-600">
                         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                            {valuesKeys.map((key, index) => {
                                if (key === 'motto') {
                                    return (
                                        <div key={key} onDoubleClick={handleMottoDoubleClick} className="cursor-help animate-fade-in-up-slow" style={{ animationDelay: `${600 + index * 100}ms` }}>
                                            <ValueCard title={t(`manifesto.values.${key}`)}>
                                                <>
                                                    {t(`manifesto.values.${key}_desc`)}
                                                    {showMottoSecret && (
                                                        <p className="text-xs text-gray-700 mt-4 animate-fade-in-up">
                                                            {t('easter_eggs.manifesto_motto_spam')}
                                                        </p>
                                                    )}
                                                </>
                                            </ValueCard>
                                        </div>
                                    )
                                }
                                return (
                                    <div key={key} className="animate-fade-in-up-slow" style={{ animationDelay: `${600 + index * 100}ms` }}>
                                        <ValueCard title={t(`manifesto.values.${key}`)}>
                                            {t(`manifesto.values.${key}_desc`)}
                                        </ValueCard>
                                    </div>
                                )
                            })}
                        </div>
                    </section>
                </main>
            </div>
        </div>
    );
};

export default Manifesto;