
import * as React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { ShoppingBagIcon } from '../icons/SocialIcons';
import { lifestyleData } from '../../data/lifestyleData';

const Lifestyle: React.FC = () => {
    const { language, t } = useLanguage();
    const product = lifestyleData[language];
    const [activeImage, setActiveImage] = React.useState(product.images[0]);

    // Easter Egg States
    const [thumbnailClicks, setThumbnailClicks] = React.useState(0);
    const [showQAEgg, setShowQAEgg] = React.useState(false);
    const thumbnailClickTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null);

    const [ctaClicks, setCtaClicks] = React.useState(0);
    const [ctaMessage, setCtaMessage] = React.useState('');
    const ctaClickTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null);
    const [detailsSecret, setDetailsSecret] = React.useState<number | null>(null);

    const handleThumbnailClick = (image: typeof product.images[0]) => {
        setActiveImage(image);

        if (thumbnailClickTimer.current) {
            clearTimeout(thumbnailClickTimer.current);
        }

        const newCount = thumbnailClicks + 1;
        setThumbnailClicks(newCount);

        if (newCount >= 10) {
            setShowQAEgg(true);
            setTimeout(() => {
                setShowQAEgg(false);
            }, 4000);
            setThumbnailClicks(0); // Reset after triggering
        } else {
            thumbnailClickTimer.current = setTimeout(() => {
                setThumbnailClicks(0);
            }, 3000); // Reset if user stops clicking for 3 seconds
        }
    };

    const handleCtaClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (ctaClickTimer.current) clearTimeout(ctaClickTimer.current);

        const newCount = ctaClicks + 1;
        setCtaClicks(newCount);

        if (newCount >= 7) {
            e.preventDefault(); // Prevent navigation to show the easter egg
            setCtaMessage(t('easter_eggs.lifestyle_cta_spam'));
            setTimeout(() => {
                setCtaMessage('');
            }, 4000);
            setCtaClicks(0); // Reset after triggering
        } else {
            ctaClickTimer.current = setTimeout(() => {
                setCtaClicks(0);
            }, 2000);
        }
    };

    const handleDetailsDoubleClick = (index: number) => {
        setDetailsSecret(index);
        setTimeout(() => setDetailsSecret(null), 3000);
    };


    return (
        <div className="relative min-h-screen w-full bg-black text-white overflow-hidden py-20 md:py-28">
            <div 
              className="absolute inset-0 bg-cover bg-center bg-fixed z-0 opacity-5" 
              style={{ backgroundImage: "url(https://i.imgur.com/oszZB03.png)" }}
            >
              <div className="absolute inset-0 bg-black"></div>
            </div>

            <div className="relative z-10 container mx-auto px-6">
                <header className="text-center mb-12 md:mb-16 animate-fade-in-up-dynamic">
                    <h1 className="font-editorial text-4xl sm:text-5xl md:text-6xl text-white tracking-wider mb-4">{t('lifestyle.title')}</h1>
                    <p className="font-technical uppercase text-gray-500 tracking-[0.3em] text-sm">{t('lifestyle.subtitle')}</p>
                </header>

                <main className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-5 gap-12 items-start">
                        {/* Image Gallery */}
                        <div className="lg:col-span-3 animate-fade-in-up-dynamic delay-200">
                            <div className="aspect-square bg-black border border-gray-900 mb-4 overflow-hidden">
                                <img 
                                    key={activeImage.src}
                                    src={activeImage.src} 
                                    alt={t(activeImage.altKey)} 
                                    className="w-full h-full object-cover animate-fade-in-up-fast"
                                />
                            </div>
                            <div className="grid grid-cols-4 gap-4">
                                {product.images.map((image, index) => {
                                    const overlayKey = image.altKey.replace('_alt_', '_overlay_');
                                    return (
                                        <button 
                                            key={index} 
                                            onClick={() => handleThumbnailClick(image)}
                                            className={`group relative aspect-square bg-black border overflow-hidden transition-all duration-300 ${activeImage.src === image.src ? 'border-yellow-300' : 'border-gray-800 opacity-60 hover:opacity-100'}`}
                                        >
                                            <img 
                                                src={image.src} 
                                                alt={t(image.altKey)} 
                                                className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-110" 
                                            />
                                            <div className="absolute inset-0 bg-overlay-70 flex items-center justify-center p-1 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
                                                <span className="font-technical text-white text-[10px] leading-tight uppercase tracking-wider">
                                                    {t(overlayKey)}
                                                </span>
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Product Info */}
                        <div className="lg:col-span-2 animate-fade-in-up-dynamic delay-300">
                            <div className="sticky top-28">
                                <h2 className="font-editorial text-3xl md:text-4xl text-white tracking-wider">{product.name}</h2>
                                <p className="font-technical text-yellow-300 uppercase tracking-widest text-sm mt-2">{product.tagline}</p>
                                
                                <div className="flex items-baseline gap-4 my-6">
                                    <span className="font-editorial text-4xl text-white">{product.price}</span>
                                    <span className="font-technical text-sm text-gray-500">{product.shipping}</span>
                                </div>

                                <div className="space-y-6 text-gray-400 text-sm leading-relaxed border-t border-b border-gray-900 py-6">
                                    <div>
                                        <h3 className="font-editorial text-lg text-gray-200 mb-2">{product.philosophyTitle}</h3>
                                        <p>{product.philosophyText}</p>
                                    </div>
                                     <div>
                                        <h3 className="font-editorial text-lg text-gray-200 mb-3">{product.detailsTitle}</h3>
                                        <ul className="space-y-2 font-technical">
                                            {product.detailsList.map((item, index) => (
                                                 <li key={index} onDoubleClick={() => handleDetailsDoubleClick(index)} className="flex items-start cursor-help relative py-1">
                                                    <span className="text-yellow-300 mr-2 mt-1">•</span>
                                                    <span>{item}</span>
                                                    {detailsSecret === index && (
                                                        <span className="absolute left-6 top-full text-gray-700 text-xs animate-fade-in-up">
                                                           {t('easter_eggs.lifestyle_details_spam')}
                                                        </span>
                                                    )}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>

                                <a 
                                    href={product.purchaseLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={handleCtaClick}
                                    className="group mt-8 flex w-full items-center justify-center gap-3 font-editorial uppercase tracking-widest text-lg border-2 border-yellow-300 text-black bg-yellow-300 px-10 py-4 hover:bg-transparent hover:text-yellow-300 transition-all duration-300 ease-in-out hover:-translate-y-1 active:translate-y-0"
                                >
                                    <ShoppingBagIcon className="w-5 h-5 transition-colors duration-300 text-black group-hover:text-yellow-300" />
                                    <span>{ctaMessage || t('lifestyle.cta_button')}</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
             {showQAEgg && (
                <div className="fixed bottom-6 left-1/2 -translate-x-1/2 font-technical text-xs text-center text-gray-500 bg-overlay-50 border border-gray-800 px-3 py-1 animate-fade-in-up z-50">
                    {t('easter_eggs.lifestyle_qa')}
                </div>
            )}
        </div>
    );
};

export default Lifestyle;