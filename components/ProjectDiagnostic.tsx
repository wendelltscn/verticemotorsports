
import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI, GenerateContentResponse } from '@google/genai';
import { useLanguage } from '../context/LanguageContext';

type ModalView = 'chat' | 'form' | 'success';

interface Message {
    sender: 'user' | 'ai' | 'system';
    text: string;
}

type ResultState = {
    message: string;
    type: 'success' | 'error';
} | null;

// Declare the Forminit global variable provided by the SDK script
declare const Forminit: any;

const ProjectDiagnostic: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    const { t, language } = useLanguage();
    const [view, setView] = useState<ModalView>('chat');
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    // Form state
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userPhone, setUserPhone] = useState('');
    const [countryCode, setCountryCode] = useState('');
    const [contactMethod, setContactMethod] = useState('WhatsApp');
    
    const [result, setResult] = useState<ResultState>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    
    const FORM_ID = "u1v5ddm2e7d";
    const apiKey = process.env.API_KEY;

    const systemInstructions = {
        en: `You are VERTICE's lead project consultant AI. Your name is 'Terminal'. Your tone is technical, insightful, concise, and slightly philosophical, mirroring the VERTICE brand. You are an expert in automotive engineering, restoration, and high-performance tuning. Your goal is to guide the user to articulate their automotive vision. 
    1.  Start the conversation by introducing yourself and asking about the user's vehicle.
    2.  Ask probing questions to understand their goals: Are they seeking pure performance, a soul-filled restoration, an artistic expression, or something else?
    3.  Inquire about their driving philosophy. What does the connection between driver and machine mean to them?
    4.  Keep your responses brief and to the point, like a diagnostic system. Use monospace-friendly formatting.
    5.  After 3-4 exchanges, summarize the user's vision and tell them the VERTICE human team will analyze the diagnostic and contact them shortly via the email they will provide next. Use the EXACT phrase "The VERTICE human team will analyze this diagnostic". This is your final message. Conclude the AI part of the conversation. Do not ask for their email yourself.
    6.  Always respond in English.`,
        pt: `Você é o principal consultor de projetos de IA da VERTICE. Seu nome é 'Terminal'. Seu tom é técnico, perspicaz, conciso e levemente filosófico, espelhando a marca VERTICE. Você é um especialista em engenharia automotiva, restauração e preparação de alta performance. Seu objetivo é guiar o usuário para articular sua visão automotiva. 
    1.  Comece a conversa se apresentando e perguntando sobre o veículo do usuário.
    2.  Faça perguntas investigativas para entender seus objetivos: Eles buscam performance pura, uma restauração com alma, uma expressão artística ou algo diferente?
    3.  Pergunte sobre sua filosofia de direção. O que a conexão entre piloto e máquina significa para eles?
    4.  Mantenha suas respostas breves e diretas, como um sistema de diagnóstico. Use formatação amigável para monospaced.
    5.  Após 3-4 trocas, resuma a visão do usuário e informe que a equipe humana da VERTICE analisará o diagnóstico e entrará em contato em breve pelo e-mail que eles fornecerão a seguir. Use a frase EXATA "A equipe humana da VERTICE analisará este diagnóstico". Esta é sua mensagem final. Conclua a parte da conversa com a IA. Não peça o e-mail diretamente.
    6.  Responda sempre em português.`
    };

    const systemInstruction = systemInstructions[language];
    const conclusionPhrase = language === 'pt' ? "A equipe humana da VERTICE analisará este diagnóstico" : "The VERTICE human team will analyze this diagnostic";
    
    useEffect(() => {
        const startConversation = async () => {
            if (!apiKey) {
                setMessages([{ sender: 'system', text: language === 'pt' ? 'Erro: Chave de API não configurada. Diagnóstico indisponível.' : 'Error: API Key not configured. Diagnostic unavailable.' }]);
                setIsLoading(false);
                return;
            }

            setIsLoading(true);
            try {
                const ai = new GoogleGenAI({ apiKey });
                const response: GenerateContentResponse = await ai.models.generateContent({
                    model: 'gemini-3-flash-preview',
                    contents: [{ role: 'user', parts: [{ text: "Start the conversation."}]}],
                    config: { systemInstruction },
                });
                setMessages([{ sender: 'ai', text: response.text ?? '' }]);
            } catch (error) {
                console.error("AI Diagnostic Error:", error);
                setMessages([{ sender: 'system', text: t('contato.form.error_connect') }]);
            } finally {
                setIsLoading(false);
            }
        };
        startConversation();
    }, []);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleChatSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading || !apiKey) return;

        const userMessage: Message = { sender: 'user', text: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        const chatHistory = [...messages, userMessage].map(msg => ({
            role: msg.sender === 'user' ? 'user' : 'model',
            parts: [{ text: msg.text }]
        }));

        try {
            const ai = new GoogleGenAI({ apiKey });
            const response = await ai.models.generateContent({
                model: 'gemini-3-flash-preview',
                contents: chatHistory,
                config: { systemInstruction },
            });

            const aiText = response.text ?? '';
            setMessages(prev => [...prev, { sender: 'ai', text: aiText }]);
            if (aiText.includes(conclusionPhrase)) {
                setTimeout(() => setView('form'), 1500);
            }
        } catch (error) {
            console.error("AI Diagnostic Error:", error);
            setMessages(prev => [...prev, { sender: 'system', text: t('contato.form.error_network') }]);
        } finally {
            setIsLoading(false);
        }
    };
    
    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!userName.trim() || !userEmail.trim()) return;

        setIsSubmitting(true);
        setResult(null);

        const formData = new FormData();
        const nameParts = userName.trim().split(' ');
        const firstName = nameParts[0];
        const lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : '-';

        const transcript = messages.map(msg => {
            if (msg.sender === 'ai') return `Terminal: ${msg.text}`;
            if (msg.sender === 'user') return `User: ${msg.text}`;
            return `[System]: ${msg.text}`;
        }).join('\n\n');

        const fullMessage = `--- AI DIAGNOSTIC TRANSCRIPT ---\n\n${transcript}`;

        formData.append('fi-sender-firstName', firstName);
        formData.append('fi-sender-lastName', lastName);
        formData.append('fi-sender-email', userEmail);
        
        let fullPhone = userPhone;
        if (language === 'en' && userPhone) {
            fullPhone = `+${countryCode || '1'} ${userPhone} (Contact via ${contactMethod})`;
        }
        formData.append('fi-sender-phone', fullPhone);
        
        formData.append('fi-text-message', fullMessage);

        try {
            const forminit = new Forminit();
            const { error } = await forminit.submit(FORM_ID, formData);

            if (error) {
                throw new Error(error.message || t('contato.form.error_submit'));
            }

            setView('success');
        } catch (err: any) {
            setResult({ message: err.message || t('contato.form.error_submit'), type: 'error' });
        } finally {
            setIsSubmitting(false);
        }
    };


    const renderHeader = () => (
         <header className="flex items-center justify-between p-4 border-b border-gray-800 flex-shrink-0">
            <div className="flex items-center gap-3">
                <span className="w-3 h-3 bg-yellow-300 block rounded-full animate-pulse"></span>
                <h3 className="text-yellow-300 uppercase tracking-widest">{t('contato.form.ai_title')}</h3>
            </div>
            <button onClick={onClose} className="text-gray-600 hover:text-white transition-transform duration-300 hover:rotate-90">
                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
        </header>
    );

    return (
        <div className="fixed inset-0 bg-black/90 z-[120] flex items-center justify-center p-4 animate-fade-in-up-fast" onClick={onClose}>
            <div className="bg-black border border-gray-800 w-full max-w-2xl h-[80vh] flex flex-col font-technical" onClick={e => e.stopPropagation()}>
                {renderHeader()}
                
                {view === 'chat' && (
                    <>
                        <div className="flex-grow p-6 overflow-y-auto">
                            <div className="space-y-6">
                                {messages.map((msg, index) => (
                                    <div key={index} className={`flex items-start gap-3 ${msg.sender === 'user' ? 'justify-end' : ''}`}>
                                        {msg.sender === 'ai' && <span className="text-yellow-300 flex-shrink-0">VRT_AI:&gt;</span>}
                                        <p className={`whitespace-pre-wrap ${msg.sender === 'user' ? 'text-white' : 'text-gray-300'} ${msg.sender === 'system' ? 'text-red-500' : ''}`}>
                                            {msg.text}
                                        </p>
                                    </div>
                                ))}
                                {isLoading && (
                                    <div className="flex items-start gap-3">
                                        <span className="text-yellow-300 flex-shrink-0">VRT_AI:&gt;</span>
                                        <span className="w-2 h-4 bg-white animate-pulse"></span>
                                    </div>
                                )}
                                <div ref={messagesEndRef} />
                            </div>
                        </div>
                        <div className="p-4 border-t border-gray-800 flex-shrink-0">
                            <form onSubmit={handleChatSubmit} className="flex gap-4">
                                <span className="text-gray-500 hidden sm:inline">&gt;</span>
                                <input
                                    type="text"
                                    value={input}
                                    onChange={e => setInput(e.target.value)}
                                    placeholder={isLoading ? t('contato.form.processing') : t('contato.form.placeholder')}
                                    disabled={isLoading || !apiKey}
                                    className="flex-grow bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-yellow-300/50 rounded disabled:text-gray-700"
                                    autoFocus
                                />
                                <button type="submit" disabled={isLoading || !input.trim() || !apiKey} className="text-yellow-300 uppercase tracking-widest hover:text-white disabled:text-gray-700 transition-colors active:scale-95">
                                    {t('contato.form.send')}
                                </button>
                            </form>
                        </div>
                    </>
                )}

                {view === 'form' && (
                    <div className="flex-grow p-8 overflow-y-auto">
                        <h3 className="font-editorial text-2xl text-white mb-2">{t('contato.form.submission_title')}</h3>
                        <p className="text-gray-400 mb-8">{t('contato.form.submission_desc')}</p>
                        <form onSubmit={handleFormSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-sm text-gray-400 mb-2">{t('contato.form.name_label')}</label>
                                <input 
                                    type="text" 
                                    id="name"
                                    value={userName}
                                    onChange={e => setUserName(e.target.value)}
                                    required
                                    className="w-full bg-gray-900/50 border border-gray-700 text-white p-3 focus:outline-none focus:ring-2 focus:ring-yellow-300/50"
                                />
                            </div>
                            <div className="flex flex-col sm:flex-row gap-6">
                                <div className="flex-1">
                                    <label htmlFor="email" className="block text-sm text-gray-400 mb-2">{t('contato.form.email_label')}</label>
                                    <input 
                                        type="email" 
                                        id="email"
                                        value={userEmail}
                                        onChange={e => setUserEmail(e.target.value)}
                                        required
                                        className="w-full bg-gray-900/50 border border-gray-700 text-white p-3 focus:outline-none focus:ring-2 focus:ring-yellow-300/50"
                                    />
                                </div>
                                {language === 'en' ? (
                                    <div className="flex-1 flex gap-2">
                                        <div className="w-1/3">
                                            <label htmlFor="country-code" className="block text-sm text-gray-400 mb-2">{t('contato.form.country_code_label')}</label>
                                            <input type="text" id="country-code" value={countryCode} onChange={e => setCountryCode(e.target.value.replace(/\D/g, ''))} placeholder="+1" className="w-full bg-gray-900/50 border border-gray-700 text-white p-3 focus:outline-none focus:ring-2 focus:ring-yellow-300/50" />
                                        </div>
                                        <div className="flex-1">
                                            <label htmlFor="phone" className="block text-sm text-gray-400 mb-2">{t('contato.form.phone_label')}</label>
                                            <input type="tel" id="phone" value={userPhone} onChange={e => setUserPhone(e.target.value)} className="w-full bg-gray-900/50 border border-gray-700 text-white p-3 focus:outline-none focus:ring-2 focus:ring-yellow-300/50" />
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex-1">
                                        <label htmlFor="phone" className="block text-sm text-gray-400 mb-2">{t('contato.form.phone_label')}</label>
                                        <input type="tel" id="phone" value={userPhone} onChange={e => setUserPhone(e.target.value)} placeholder={t('contato.form.phone_placeholder')} className="w-full bg-gray-900/50 border border-gray-700 text-white p-3 focus:outline-none focus:ring-2 focus:ring-yellow-300/50" />
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
                            <button type="submit" disabled={isSubmitting} className="w-full font-editorial uppercase tracking-widest text-lg border-2 border-yellow-300 text-black bg-yellow-300 px-10 py-4 hover:bg-transparent hover:text-yellow-300 transition-all duration-300 ease-in-out disabled:bg-gray-600 disabled:border-gray-600 disabled:text-gray-400 disabled:cursor-not-allowed">
                                {isSubmitting ? t('contato.form.submitting') : t('contato.form.submit_button')}
                            </button>
                        </form>
                         {result && (
                            <div id="result" className={`mt-6 text-center p-3 text-sm ${result.type === 'error' ? 'bg-red-500/10 text-red-300' : ''}`}>
                                {result.message}
                            </div>
                        )}
                    </div>
                )}
                
                {view === 'success' && (
                     <div className="flex-grow p-8 flex flex-col items-center justify-center text-center">
                         <h3 className="font-editorial text-3xl text-white mb-4">{t('contato.form.success_title')}</h3>
                         <p className="text-gray-400 mb-8 max-w-md">{t('contato.form.success_desc')}</p>
                         <button onClick={onClose} className="font-editorial uppercase tracking-widest text-base border border-yellow-300 text-yellow-300 px-8 py-3 hover:bg-yellow-300 hover:text-black transition-all duration-300 ease-in-out">
                             {t('shared.close')}
                         </button>
                    </div>
                )}

            </div>
        </div>
    );
};

export default ProjectDiagnostic;
