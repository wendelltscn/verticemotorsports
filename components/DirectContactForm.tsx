
import * as React from 'react';
import { useLanguage } from '../context/LanguageContext';

declare const Forminit: any;

interface DirectContactFormProps {
    onClose: () => void;
}

type ResultState = {
    message: string;
    type: 'success' | 'error';
} | null;

const DirectContactForm: React.FC<DirectContactFormProps> = ({ onClose }) => {
    const { language, t } = useLanguage();
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const [result, setResult] = React.useState<ResultState>(null);
    const [countryCode, setCountryCode] = React.useState('');
    const [contactMethod, setContactMethod] = React.useState('WhatsApp');
    const FORM_ID = "u1v5ddm2e7d";

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setResult(null);

        const formElement = e.target as HTMLFormElement;
        const formData = new FormData(formElement);
        
        const phoneInput = formData.get('fi-sender-phone') as string || '';

        setIsSubmitting(true);
        
        if (phoneInput.trim()) {
            if (language === 'en') {
                const fullPhone = `+${countryCode || '1'} ${phoneInput} (Contact via ${contactMethod})`;
                formData.set('fi-sender-phone', fullPhone);
            } else if (language === 'pt') {
                const justDigits = phoneInput.replace(/\D/g, '');
                formData.set('fi-sender-phone', `+55${justDigits}`);
            }
        }

        try {
            const forminit = new Forminit();
            const { data, error } = await forminit.submit(FORM_ID, formData);

            if (error) {
                throw new Error(error.message || t('contato.form.error_submit'));
            }

            setResult({ message: t('contato.form.success_direct'), type: 'success' });
            formElement.reset();
        } catch (err: any) {
            setResult({ message: err.message || t('contato.form.error_submit'), type: 'error' });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/90 z-[120] flex items-center justify-center p-4 animate-fade-in-up-fast" onClick={onClose}>
            <div className="bg-black border border-gray-800 w-full max-w-2xl max-h-[90vh] flex flex-col font-technical" onClick={e => e.stopPropagation()}>
                <header className="flex items-center justify-between p-4 border-b border-gray-800 flex-shrink-0">
                    <h3 className="font-editorial text-xl text-white uppercase tracking-widest">{t('contato.form.direct_title')}</h3>
                    <button onClick={onClose} className="text-gray-600 hover:text-white transition-transform duration-300 hover:rotate-90">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>
                </header>

                <div className="flex-grow p-8 overflow-y-auto">
                    <form id="contact-form" onSubmit={handleSubmit} className="space-y-6">
                        <div className="flex flex-col sm:flex-row gap-6">
                            <div className="flex-1">
                                <label htmlFor="fi-sender-firstName" className="block text-sm text-gray-400 mb-2">{t('contato.form.first_name_label')}</label>
                                <input type="text" name="fi-sender-firstName" id="fi-sender-firstName" placeholder={t('contato.form.first_name_label')} required className="w-full bg-gray-900/50 border border-gray-700 text-white p-3 focus:outline-none focus:ring-2 focus:ring-yellow-300/50" />
                            </div>
                            <div className="flex-1">
                                <label htmlFor="fi-sender-lastName" className="block text-sm text-gray-400 mb-2">{t('contato.form.last_name_label')}</label>
                                <input type="text" name="fi-sender-lastName" id="fi-sender-lastName" placeholder={t('contato.form.last_name_label')} required className="w-full bg-gray-900/50 border border-gray-700 text-white p-3 focus:outline-none focus:ring-2 focus:ring-yellow-300/50" />
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-6">
                           <div className="flex-1">
                                <label htmlFor="fi-sender-email" className="block text-sm text-gray-400 mb-2">{t('contato.form.email_label')}</label>
                                <input type="email" name="fi-sender-email" id="fi-sender-email" placeholder="email@example.com" required className="w-full bg-gray-900/50 border border-gray-700 text-white p-3 focus:outline-none focus:ring-2 focus:ring-yellow-300/50" />
                           </div>
                           {language === 'en' ? (
                                <div className="flex-1 flex gap-2">
                                    <div className="w-1/3">
                                        <label htmlFor="country-code" className="block text-sm text-gray-400 mb-2">{t('contato.form.country_code_label')}</label>
                                        <input type="text" id="country-code" value={countryCode} onChange={e => setCountryCode(e.target.value.replace(/\D/g, ''))} placeholder="+1" className="w-full bg-gray-900/50 border border-gray-700 text-white p-3 focus:outline-none focus:ring-2 focus:ring-yellow-300/50" />
                                    </div>
                                    <div className="flex-1">
                                        <label htmlFor="fi-sender-phone" className="block text-sm text-gray-400 mb-2">{t('contato.form.phone_label')}</label>
                                        <input type="tel" name="fi-sender-phone" id="fi-sender-phone" className="w-full bg-gray-900/50 border border-gray-700 text-white p-3 focus:outline-none focus:ring-2 focus:ring-yellow-300/50" />
                                    </div>
                                </div>
                            ) : (
                                <div className="flex-1">
                                    <label htmlFor="fi-sender-phone" className="block text-sm text-gray-400 mb-2">{t('contato.form.phone_label')}</label>
                                    <input type="tel" name="fi-sender-phone" id="fi-sender-phone" placeholder={t('contato.form.phone_placeholder')} className="w-full bg-gray-900/50 border border-gray-700 text-white p-3 focus:outline-none focus:ring-2 focus:ring-yellow-300/50" />
                                </div>
                            )}
                        </div>
                        
                        {language === 'en' && (
                             <div>
                                <label className="block text-sm text-gray-400 mb-2">{t('contato.form.contact_method_label')}</label>
                                <div className="flex gap-6 items-center">
                                    <label className="flex items-center gap-2 text-gray-300 cursor-pointer">
                                        <input type="radio" name="contactMethod" value="WhatsApp" checked={contactMethod === 'WhatsApp'} onChange={() => setContactMethod('WhatsApp')} className="accent-yellow-300" />
                                        {t('contato.form.contact_method_whatsapp')}
                                    </label>
                                    <label className="flex items-center gap-2 text-gray-300 cursor-pointer">
                                        <input type="radio" name="contactMethod" value="Call" checked={contactMethod === 'Call'} onChange={() => setContactMethod('Call')} className="accent-yellow-300" />
                                        {t('contato.form.contact_method_call')}
                                    </label>
                                </div>
                            </div>
                        )}

                        <div>
                            <label htmlFor="fi-text-message" className="block text-sm text-gray-400 mb-2">{t('contato.form.message_label')}</label>
                            <textarea name="fi-text-message" id="fi-text-message" placeholder={t('contato.form.message_label')} required rows={5} className="w-full bg-gray-900/50 border border-gray-700 text-white p-3 focus:outline-none focus:ring-2 focus:ring-yellow-300/50"></textarea>
                        </div>
                        
                        <button type="submit" disabled={isSubmitting} className="w-full font-editorial uppercase tracking-widest text-lg border-2 border-yellow-300 text-black bg-yellow-300 px-10 py-4 hover:bg-transparent hover:text-yellow-300 transition-all duration-300 ease-in-out disabled:bg-gray-600 disabled:border-gray-600 disabled:text-gray-400 disabled:cursor-not-allowed">
                            {isSubmitting ? t('contato.form.submitting') : t('contato.form.send')}
                        </button>
                    </form>
                    
                    {result && (
                        <div id="result" className={`mt-6 text-center p-3 text-sm ${result.type === 'success' ? 'bg-green-500/10 text-green-300' : 'bg-red-500/10 text-red-300'}`}>
                            {result.message}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DirectContactForm;