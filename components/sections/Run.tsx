
import React from 'react';
import type { Page } from '../../types';

interface RunProps {
    onNavigate: (page: Page) => void;
}

const Run: React.FC<RunProps> = ({ onNavigate }) => {
    return (
        <div className="relative min-h-[80vh] w-full flex flex-col items-center justify-center text-center text-white overflow-hidden py-20">
            <div 
              className="absolute inset-0 bg-cover bg-center bg-fixed z-0" 
              style={{ backgroundImage: "url(https://i.imgur.com/oszZB03.png)" }}
            >
              <div className="absolute inset-0 bg-black opacity-80"></div>
            </div>

            <div className="relative z-10 p-6 flex flex-col items-center max-w-4xl mx-auto">
                <header className="mb-8">
                    <h1 className="font-editorial text-4xl md:text-6xl text-white tracking-wider mb-4">VERTICE RUN</h1>
                    <p className="font-technical uppercase text-gray-500 tracking-[0.3em] text-sm">O Movimento na Estrada</p>
                </header>
                
                <div className="space-y-6 text-lg text-gray-300 leading-relaxed">
                    <p>
                        A estrada nos chama. Run não é uma corrida, é um ritual. Uma comunhão de máquinas e mentes que entendem a linguagem do asfalto. É a materialização da nossa cultura, um encontro orgânico que acontece quando faz sentido, sem calendários ou obrigações.
                    </p>
                     <p>
                        É sobre o nascer do sol em uma serra deserta, o som de motores ecoando em um vale, a camaradagem forjada em quilômetros. VERTICE Run é a prova de que a paixão automotiva é uma experiência coletiva, uma celebração do movimento.
                    </p>
                </div>

                <button 
                    onClick={() => onNavigate('Movimento')}
                    className="mt-12 font-editorial uppercase tracking-widest text-lg border-2 border-yellow-300 text-yellow-300 px-10 py-3 hover:bg-yellow-300 hover:text-black transition-all duration-300 ease-in-out"
                >
                    Junte-se ao Movimento
                </button>
            </div>
        </div>
    );
};

export default Run;