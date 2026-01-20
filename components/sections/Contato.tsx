
import * as React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { InstagramIcon, YoutubeIcon } from '../icons/SocialIcons';
import ProjectDiagnostic from '../ProjectDiagnostic';
import DirectContactForm from '../DirectContactForm';
import { TerminalIcon } from '../icons/TerminalIcon';
import { MailIcon } from '../icons/MailIcon';

const Contato: React.FC = () => {
    const [isDiagnosticOpen, setIsDiagnosticOpen] = React.useState(false);
    const [isDirectFormOpen, setIsDirectFormOpen] = React.useState(false);
    const { t } = useLanguage();
    const year = new Date().getFullYear();

    // Easter Egg States
    const [copyrightClicks, setCopyrightClicks] = React.useState(0);
    const [showCopyrightSecret, setShowCopyrightSecret] = React.useState(false);
    const [mottoClicks, setMottoClicks] = React.useState(0);
    const [showMottoSecret, setShowMottoSecret] = React.useState(false);
    const [phoneClicks, setPhoneClicks] = React.useState(0);
    const [showPhoneSecret, setShowPhoneSecret] = React.useState(false);

    const handleCopyrightClick = () => {
        const newCount = copyrightClicks + 1;
        setCopyrightClicks(newCount);

        if (newCount >= 7) {
            setShowCopyrightSecret(true);
            setCopyrightClicks(0);
            setTimeout(() => {
                setShowCopyrightSecret(false);
            }, 4000);
        }
    };

    const handleMottoClick = () => {
        const newCount = mottoClicks + 1;
        setMottoClicks(newCount);

        if (newCount >= 5) {
            setShowMottoSecret(true);
            setMottoClicks(0);
            setTimeout(() => {
                setShowMottoSecret(false);
            }, 4000);
        }
    };

    const handlePhoneClick = () => {
        const newCount = phoneClicks + 1;
        setPhoneClicks(newCount);

        if (newCount >= 5) {
            setShowPhoneSecret(true);
            setPhoneClicks(0);
            setTimeout(() => {
                setShowPhoneSecret(false);
            }, 4000);
        }
    };


    return (
        <>
            <div className="min-h-screen w-full flex flex-col bg-black">
                <div className="flex-grow flex flex-col items-center justify-center py-20 md:py-28 px-6">
                    <header className="text-center mb-12 md:mb-16 animate-fade-in-up-fast">
                        <h1 className="font-editorial text-4xl sm:text-5xl md:text-6xl text-white tracking-wider mb-4">{t('contato.title')}</h1>
                        <p className="font-technical text-gray-500 max-w-2xl mx-auto">
                           {t('contato.subtitle')}
                        </p>
                    </header>
                    
                    <div className="w-full max-w-4xl mx-auto text-center text-gray-400 mb-12 animate-fade-in-up-fast delay-200">
                        <h3 className="font-editorial text-2xl text-white mb-4">{t('contato.left_title')}</h3>
                        <p className="mb-2">{t('contato.p1')}</p>
                        <p>{t('contato.p2')}</p>
                        <div className="mt-8 text-sm space-y-2">
                            <p>
                                <span className="font-bold text-gray-300">{t('contato.email')}</span>
                                <a href="mailto:verticemotorsports@gmail.com" className="ml-2 text-yellow-300 hover:underline">verticemotorsports@gmail.com</a>
                            </p>
                            <div onClick={handlePhoneClick} className="cursor-pointer inline-block">
                                <p>
                                    <span className="font-bold text-gray-300">{t('contato.phone')}</span>
                                    <span className="ml-2 text-gray-500">{t('contato.phone_note')}</span>
                                </p>
                                {showPhoneSecret && (
                                    <p className="text-xs text-gray-700 mt-1 animate-fade-in-up">
                                        {t('easter_eggs.contact_phone_spam')}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="w-full max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 animate-fade-in-up-fast delay-300">
                        {/* AI Diagnostic CTA */}
                        <div className="flex flex-col text-center p-8 border border-dashed border-gray-800 h-full">
                            <div className="flex-grow flex flex-col items-center justify-center">
                                <TerminalIcon className="w-10 h-10 text-yellow-300 mb-4" />
                                <h3 className="font-editorial text-2xl text-white mb-4">{t('contato.form.ai_title')}</h3>
                                <p className="text-gray-500 mb-6 max-w-xs">{t('contato.form.ai_subtitle')}</p>
                            </div>
                            <button
                                onClick={() => setIsDiagnosticOpen(true)}
                                className="group mt-auto w-full flex items-center justify-center gap-3 font-editorial uppercase tracking-widest text-lg border-2 border-yellow-300 text-black bg-yellow-300 px-10 py-4 hover:bg-transparent hover:text-yellow-300 transition-all duration-300 ease-in-out hover:-translate-y-1 active:translate-y-0"
                            >
                                <TerminalIcon className="w-5 h-5 transition-colors duration-300 text-black group-hover:text-yellow-300" />
                                <span>{t('contato.form.ai_button')}</span>
                            </button>
                        </div>

                        {/* Direct Form CTA */}
                        <div className="flex flex-col text-center p-8 border border-dashed border-gray-800 h-full">
                            <div className="flex-grow flex flex-col items-center justify-center">
                                <MailIcon className="w-10 h-10 text-yellow-300 mb-4" />
                                <h3 className="font-editorial text-2xl text-white mb-4">{t('contato.form.direct_title')}</h3>
                                <p className="text-gray-500 mb-6 max-w-xs">{t('contato.form.direct_subtitle')}</p>
                            </div>
                            <button
                                onClick={() => setIsDirectFormOpen(true)}
                                className="group mt-auto w-full flex items-center justify-center gap-3 font-editorial uppercase tracking-widest text-lg border border-gray-600 text-gray-400 px-10 py-4 hover:border-white hover:text-white transition-all duration-300 ease-in-out hover:-translate-y-1 active:translate-y-0"
                            >
                                <MailIcon className="w-5 h-5" />
                                <span>{t('contato.form.direct_button')}</span>
                            </button>
                        </div>
                    </div>
                </div>
                
                <footer className="w-full mt-auto flex-shrink-0">
                     <div className="container mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center text-center md:text-left border-t border-gray-900">
                        <div className="mb-4 md:mb-0">
                            <p 
                                className="text-gray-500 text-xs font-technical transition-colors duration-300 hover:text-gray-300 cursor-pointer"
                                onClick={handleCopyrightClick}
                            >
                                {showCopyrightSecret 
                                    ? `// ${t('footer.copyright_secret')}`
                                    : t('footer.copyright').replace('{year}', year.toString())
                                }
                            </p>
                        </div>
                        <div className="mb-4 md:mb-0">
                             <p 
                                className="font-editorial text-lg text-gray-700 transition-colors duration-300 hover:text-white cursor-pointer"
                                onClick={handleMottoClick}
                            >
                                {showMottoSecret
                                    ? `// ${t('easter_eggs.ironic_motto')}`
                                    : t('footer.motto')
                                }
                            </p>
                        </div>
                        <div className="flex space-x-6 mb-4 md:mb-0">
                            <a href="https://www.instagram.com/verticemotorsports/" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-yellow-300 transition-all duration-300 hover:-translate-y-1 active:translate-y-0">
                                <InstagramIcon className="w-6 h-6" />
                            </a>
                            <a href="https://www.youtube.com/@VerticeMotorsports" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-yellow-300 transition-all duration-300 hover:-translate-y-1 active:translate-y-0">
                                <YoutubeIcon className="w-6 h-6" />
                            </a>
                        </div>
                    </div>
                </footer>
            </div>
            {isDiagnosticOpen && <ProjectDiagnostic onClose={() => setIsDiagnosticOpen(false)} />}
            {isDirectFormOpen && <DirectContactForm onClose={() => setIsDirectFormOpen(false)} />}
        </>
    );
};

export default Contato;