
import React, { useState, useEffect } from 'react';

interface TerminalEasterEggProps {
    onClose: () => void;
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
    { text: '> DIE NEVER.', delay: 100, isPrompt: true },
];


const TerminalEasterEgg: React.FC<TerminalEasterEggProps> = ({ onClose }) => {
    const [lines, setLines] = useState<React.ReactNode[]>([]);
    const [showCursor, setShowCursor] = useState(false);

    useEffect(() => {
        let currentDelay = 500;
        bootSequence.forEach((line, index) => {
            currentDelay += line.delay;
            setTimeout(() => {
                let content;
                if (line.isLogo) {
                    content = <pre className="text-green-400 text-[6px] sm:text-[7px] leading-tight" style={{ textShadow: '0 0 5px rgba(132, 204, 22, 0.5)' }}>{line.text}</pre>;
                } else if (line.isPrompt) {
                    content = <span className="flex items-center">{line.text}<span className="w-2 h-4 bg-green-400 ml-2 animate-blinker"></span></span>;
                } else {
                    content = <span>{line.text}</span>;
                }
                setLines(prev => [...prev, content]);
                if (index === bootSequence.length - 1) {
                   setShowCursor(true);
                }
            }, currentDelay);
        });
    }, []);

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
            className="fixed inset-0 bg-black z-[200] flex flex-col p-4 sm:p-8 font-technical text-green-400 animate-fade-in-up-fast"
            style={{ textShadow: '0 0 3px rgba(132, 204, 22, 0.4)' }}
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
            
            <div className="w-full h-full border border-green-900/50 p-4 overflow-y-auto flex flex-col justify-center">
                {lines.map((line, index) => (
                    <div key={index} className="whitespace-pre-wrap animate-fade-in-up" style={{ animationDuration: '0.3s' }}>
                        {line}
                    </div>
                ))}
            </div>
            
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
