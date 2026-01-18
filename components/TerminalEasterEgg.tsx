
import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { GoogleGenAI, GenerateContentResponse } from '@google/genai';

interface TerminalEasterEggProps {
    onClose: () => void;
}

interface Message {
    sender: 'user' | 'ai' | 'system';
    text: string;
}

const logoAscii = `
                        ........                               #####     *######                         
                         ........                            :#####     #######                          
                          .......:                          *#####     #######                           
                           .....---                        #####:     #######                            
                            ..:------    .                #####     -######:                             
                              -------     ::             #####     ######%                               
                               ------     ::::          #####     #%%%%%%                                
                                ====      ----        .#####     %%%%%%%                                 
                                 ==      -----       *#####     %%%%%%%                                  
                                  =    .=====-      ######     %%%%%%%                                   
                                      ========     #%%%%:    -%%%%%%+                                    
                                     -=======     %%%%%     *#%%%%%                                      
                                     --====      +%%%%     **#%%%%                                       
                                       =+=     :++#%%     **##%%%                                        
                                        +     ++++#%     #####%%                                         
                                             +**++#     #######                                          
                                            *****+     ######:                                           
                                           *****     -######                                             
                                            ***     *######                                              
                                             *     #######                                               
                                                  #######                                                
                                                 #######                                                 
                                                ######-                                                  
                                                 ####                                                    
`;

const bootSequence = [
    { text: 'VRT_TERMINAL_OS v1.0 ACTIVATED', delay: 100 },
    { text: 'ACCESS CODE: ********', delay: 150 },
    { text: 'AUTHENTICATION SUCCESSFUL.', delay: 300 },
    { text: '', delay: 200 },
    { text: logoAscii, delay: 50, isLogo: true },
    { text: '', delay: 300 },
    { text: 'LOADING CORE DIRECTIVES...', delay: 200 },
    { text: '', delay: 200 },
    { text: '// EXECUTE WITH PRECISION.', delay: 150 },
    { text: '// CHALLENGE THE EPHEMERAL.', delay: 150 },
    { text: '// THE MACHINE HAS A SOUL.', delay: 150 },
    { text: '', delay: 300 },
    { text: '> CONNECTION ESTABLISHED.', delay: 100 },
];

const apiKeyErrorSequence = [
    { text: 'VRT_TERMINAL_OS v1.0 ACTIVATED', delay: 100 },
    { text: 'ACCESS CODE: ********', delay: 150 },
    { text: 'AUTHENTICATION FAILED.', delay: 300 },
    { text: '', delay: 200 },
    { text: '// SYSTEM ERROR: API_KEY NOT CONFIGURED.', delay: 150, isError: true },
    { text: '// CONNECTION REFUSED.', delay: 150, isError: true },
];


const TerminalEasterEgg: React.FC<TerminalEasterEggProps> = ({ onClose }) => {
    const { t, language } = useLanguage();
    const [lines, setLines] = useState<React.ReactNode[]>([]);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(true); // Loading during boot sequence
    const [isBooting, setIsBooting] = useState(true);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const apiKey = process.env.API_KEY;
    const systemInstruction = t('easter_eggs.terminal_ai_prompt');

    useEffect(() => {
        let currentDelay = 500;
        const sequence = apiKey ? bootSequence : apiKeyErrorSequence;

        sequence.forEach((line) => {
            currentDelay += line.delay;
            setTimeout(() => {
                let content;
                if (line.isLogo) {
                    content = <pre className="text-green-400 text-[6px] sm:text-[7px] leading-tight" style={{ textShadow: '0 0 5px rgba(132, 204, 22, 0.5)' }}>{line.text}</pre>;
                } else if (line.isError) {
                     content = <span className="text-red-500">{line.text}</span>;
                } else {
                    content = <span>{line.text}</span>;
                }
                setLines(prev => [...prev, content]);
            }, currentDelay);
        });

        // End of boot sequence
        setTimeout(() => {
            setIsLoading(false);
            setIsBooting(false);
        }, currentDelay + 200);

    }, [apiKey]);

     useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, lines]);

    const handleCommand = async (e: React.FormEvent) => {
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
            const response: GenerateContentResponse = await ai.models.generateContent({
                model: 'gemini-3-flash-preview',
                contents: chatHistory,
                config: { systemInstruction },
            });
            const aiText = response.text ?? '...';
            setMessages(prev => [...prev, { sender: 'ai', text: aiText }]);
        } catch (error) {
            console.error("Terminal AI Error:", error);
            setMessages(prev => [...prev, { sender: 'system', text: '// CONNECTION LOST.' }]);
        } finally {
            setIsLoading(false);
        }
    };


    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);

    return (
        <div 
            className="fixed inset-0 z-[200] flex flex-col p-4 sm:p-8 font-technical text-green-400 animate-fade-in-up-fast"
            style={{ backgroundColor: '#000', textShadow: '0 0 3px rgba(132, 204, 22, 0.4)' }}
        >
            <div className="absolute inset-0 bg-black opacity-40 pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(0,255,0,0.1) 1px, transparent 1px)', backgroundSize: '2px 2px' }}></div>
            <div className="absolute inset-0 opacity-10 pointer-events-none animate-scanline-terminal"></div>
            <style>{`
                @keyframes blinker { 50% { opacity: 0; } }
                .animate-blinker { animation: blinker 1s step-end infinite; }
                @keyframes scanline-terminal { 0% { background-position: 0 0; } 100% { background-position: 0 100%; } }
                .animate-scanline-terminal {
                    background: linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0) 100%);
                    background-size: 100% 5px;
                    animation: scanline-terminal 5s linear infinite;
                }
            `}</style>
            
            <div className="w-full h-full border border-green-900/50 p-4 overflow-y-auto">
                {lines.map((line, index) => (
                    <div key={`boot-${index}`} className="whitespace-pre-wrap">
                        {line}
                    </div>
                ))}

                {!isBooting && (
                    <div className="mt-4">
                        {messages.map((msg, index) => (
                             <div key={`msg-${index}`} className="flex gap-2">
                                <span className={msg.sender === 'user' ? 'text-gray-500' : 'text-green-400'}>
                                    {msg.sender === 'user' ? '>' : (msg.sender === 'ai' ? 'VRT_GHOST:' : 'SYSTEM:')}
                                </span>
                                <p className={`whitespace-pre-wrap ${msg.sender === 'system' ? 'text-red-500' : ''}`}>{msg.text}</p>
                            </div>
                        ))}
                    </div>
                )}
                 <div ref={messagesEndRef} />
            </div>
            
            {!isBooting && (
                <form onSubmit={handleCommand} className="flex gap-2 items-center mt-2 p-2 border-t border-green-900/50">
                    <span>&gt;</span>
                    <input 
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        disabled={isLoading || !apiKey}
                        className="bg-transparent border-none text-green-400 w-full focus:outline-none disabled:text-gray-700"
                        autoFocus
                    />
                     {isLoading && <span className="w-2 h-4 bg-green-400 animate-blinker"></span>}
                </form>
            )}
            
            <button
                onClick={onClose}
                className="absolute bottom-4 right-4 sm:bottom-8 sm:right-8 text-green-700 border border-green-700 px-3 py-1 text-sm hover:bg-green-700 hover:text-black transition-colors"
            >
                [ CLOSE SESSION ]
            </button>
        </div>
    );
};

export default TerminalEasterEgg;
