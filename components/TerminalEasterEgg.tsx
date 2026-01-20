

// FIX: Changed React import to resolve JSX type issues and removed non-functional reference directive.
import * as React from 'react';
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

const TerminalEasterEgg: React.FC<TerminalEasterEggProps> = ({ onClose }) => {
    const { t, language } = useLanguage();
    const [messages, setMessages] = React.useState<Message[]>([]);
    const [input, setInput] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false);
    const messagesEndRef = React.useRef<HTMLDivElement>(null);
    const inputRef = React.useRef<HTMLInputElement>(null);
    
    const apiKey = process.env.API_KEY;
    const systemInstruction = t('easter_eggs.terminal_ai_prompt');

    React.useEffect(() => {
        const welcomeMessage = language === 'pt' 
            ? 'Conexão estabelecida com VRT_AI [Terminal]. Aguardando comando...'
            : 'Connection established with VRT_AI [Terminal]. Awaiting command...';
        
        setMessages([
            { sender: 'system', text: logoAscii },
            { sender: 'system', text: welcomeMessage }
        ]);
        
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        inputRef.current?.focus();

        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onClose, language]);

    React.useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleCommand = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage: Message = { sender: 'user', text: input };
        const newMessages = [...messages, userMessage];
        setMessages(newMessages);
        setInput('');
        setIsLoading(true);

        if (!apiKey) {
            setMessages(prev => [...prev, { sender: 'system', text: 'ERROR: API_KEY_NOT_FOUND' }]);
            setIsLoading(false);
            return;
        }

        const chatHistory = newMessages
            .filter(msg => msg.sender === 'user' || msg.sender === 'ai')
            .map(msg => ({
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
            setMessages(prev => [...prev, { sender: 'system', text: 'SYSTEM_ERROR: CONNECTION_REFUSED' }]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleClick = () => {
        inputRef.current?.focus();
    };

    return (
        <div 
            className="fixed inset-0 bg-black/90 z-[120] flex items-center justify-center p-4 font-technical text-green-400"
            onClick={onClose}
        >
            <div 
                className="bg-black border border-green-900/50 w-full max-w-4xl h-[90vh] flex flex-col shadow-[0_0_20px_rgba(52,211,153,0.2)]"
                onClick={e => e.stopPropagation()}
            >
                <header className="flex items-center justify-between p-2 border-b border-green-900/50 text-xs">
                    <span>// VRT_AI TERMINAL -- SESSION 0x1A2B3C</span>
                    <button onClick={onClose} className="text-green-400 hover:bg-green-900/50 px-2 py-1">[ CLOSE ]</button>
                </header>

                <div className="flex-grow p-4 overflow-y-auto" onClick={handleClick}>
                    <div className="space-y-4">
                        {messages.map((msg, index) => (
                            <div key={index}>
                                {msg.sender === 'user' && <span className="text-green-400">user@vertice:&gt; </span>}
                                {msg.sender === 'ai' && <span className="text-yellow-300">VRT_AI:&gt; </span>}
                                {msg.sender === 'system' && msg.text.startsWith('ERROR') && <span className="text-red-500">SYS_ERR: </span>}

                                {msg.sender === 'system' && msg.text.includes('#####') ? (
                                    <pre className="text-xs text-yellow-300 leading-tight">{msg.text}</pre>
                                ) : (
                                    <span className={`whitespace-pre-wrap ${msg.sender === 'system' ? 'text-gray-500' : ''}`}>{msg.text}</span>
                                )}
                            </div>
                        ))}
                        {isLoading && (
                            <div>
                                <span className="text-yellow-300">VRT_AI:&gt; </span>
                                <span className="w-2 h-4 bg-green-400 animate-pulse inline-block"></span>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>
                </div>

                <div className="p-2 border-t border-green-900/50">
                    <form onSubmit={handleCommand} className="flex gap-2 items-center">
                        <label htmlFor="terminal-input" className="text-green-400">user@vertice:&gt;</label>
                        <input
                            ref={inputRef}
                            id="terminal-input"
                            type="text"
                            value={input}
                            onChange={e => setInput(e.target.value)}
                            disabled={isLoading}
                            className="flex-grow bg-transparent text-green-400 focus:outline-none"
                            autoComplete="off"
                            autoFocus
                        />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default TerminalEasterEgg;