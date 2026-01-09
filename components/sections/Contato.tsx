
import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

const Contato: React.FC = () => {
    const [status, setStatus] = useState<FormStatus>('idle');
    const [errorMessage, setErrorMessage] = useState('');
    const { t } = useLanguage();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus('submitting');
        setErrorMessage('');

        const formData = new FormData(e.currentTarget);

        try {
            const response = await fetch('https://getform.io/f/broxglna', {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json',
                },
            });

            if (response.ok) {
                setStatus('success');
            } else {
                const data = await response.json();
                setErrorMessage(data.error || t('contato.form.error_generic'));
                setStatus('error');
            }
        } catch (error) {
            setErrorMessage(t('contato.form.error_network'));
            setStatus('error');
        }
    };


    return (
        <div className="bg-black py-20 sm:py-28">
            <div className="container mx-auto px-6">
                <header className="text-center mb-16 md:mb-24">
                    <h1 className="font-editorial text-4xl md:text-6xl text-white tracking-wider mb-4">{t('contato.title')}</h1>
                    <p className="font-technical text-gray-500 max-w-2xl mx-auto">
                       {t('contato.subtitle')}
                    </p>
                </header>

                <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="text-gray-400">
                        <h3 className="font-editorial text-2xl text-white mb-6">{t('contato.left_title')}</h3>
                        <p className="mb-4">{t('contato.p1')}</p>
                        <p className="mb-6">{t('contato.p2')}</p>
                        
                        <div className="space-y-3 font-technical">
                            <p><strong>{t('contato.email')}</strong> <a href="mailto:verticemotorsports@gmail.com" className="text-yellow-300 hover:underline">verticemotorsports@gmail.com</a></p>
                            <p><strong>{t('contato.phone')}</strong> <span className="text-gray-500">{t('contato.phone_note')}</span></p>
                        </div>
                    </div>

                    <div>
                        {status === 'success' ? (
                            <div className="h-full flex flex-col justify-center items-center bg-transparent border border-gray-800 p-8 text-center">
                                <h3 className="font-editorial text-2xl text-yellow-300 mb-4">{t('contato.form.success_title')}</h3>
                                <p className="text-gray-300">{t('contato.form.success_text')}</p>
                            </div>
                        ) : (
                             <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label htmlFor="name" className="sr-only">{t('contato.form.name')}</label>
                                    <input type="text" id="name" name="name" placeholder={t('contato.form.name')} required className="w-full bg-transparent border border-gray-700 text-white p-3 focus:border-yellow-300 focus:outline-none transition-colors" />
                                </div>
                                <div>
                                    <label htmlFor="email" className="sr-only">{t('contato.form.email')}</label>
                                    <input type="email" id="email" name="email" placeholder={t('contato.form.email')} required className="w-full bg-transparent border border-gray-700 text-white p-3 focus:border-yellow-300 focus:outline-none transition-colors" />
                                </div>
                                <div>
                                    <label htmlFor="message" className="sr-only">{t('contato.form.message')}</label>
                                    <textarea id="message" name="message" rows={5} placeholder={t('contato.form.message')} required className="w-full bg-transparent border border-gray-700 text-white p-3 focus:border-yellow-300 focus:outline-none transition-colors"></textarea>
                                </div>
                                <div>
                                    <button 
                                        type="submit" 
                                        disabled={status === 'submitting'}
                                        className="w-full font-editorial uppercase tracking-widest text-lg border-2 border-yellow-300 text-black bg-yellow-300 px-10 py-4 hover:bg-transparent hover:text-yellow-300 transition-all duration-300 ease-in-out disabled:bg-gray-600 disabled:border-gray-600 disabled:text-gray-400 disabled:cursor-not-allowed"
                                    >
                                        {status === 'submitting' ? t('contato.form.submitting') : t('contato.form.button')}
                                    </button>
                                </div>
                                {status === 'error' && (
                                    <p className="text-red-500 text-sm text-center">{errorMessage}</p>
                                )}
                            </form>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Contato;
