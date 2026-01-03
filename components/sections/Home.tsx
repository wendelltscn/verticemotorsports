
import React from 'react';
import type { Page } from '../../types';

interface HomeProps {
    onNavigate: (page: Page) => void;
}

const Home: React.FC<HomeProps> = ({ onNavigate }) => {
    return (
        <div className="relative h-screen w-full flex flex-col items-center justify-center text-center text-white overflow-hidden">
            <div 
              className="absolute inset-0 bg-cover bg-center z-0" 
              style={{ backgroundImage: "url(https://i.imgur.com/6ItRQSv.png)" }}
            >
              <div className="absolute inset-0 bg-black opacity-70"></div>
            </div>

            <div className="relative z-10 p-6 flex flex-col items-center animate-fade-in-up">
                <blockquote className="font-editorial text-2xl md:text-4xl lg:text-5xl max-w-4xl italic text-gray-300 mb-8">
                    “Because the ones who are crazy enough to think they can change the world, are the ones who do.”
                </blockquote>
                
                <div className="max-w-3xl mb-12">
                    <p className="font-technical text-md md:text-lg leading-relaxed text-gray-400">
                        Somos a ruptura. A insurreição contra o comum. <span className="text-white font-bold tracking-widest">VERTICE</span> não é um lugar, é um movimento. Uma convicção de que máquinas têm alma e a estrada é nosso templo. Aqui, engenharia e arte colidem para forjar o futuro da cultura automotiva. Um projeto de cada vez.
                    </p>
                </div>

                <button 
                    onClick={() => onNavigate('Movimento')}
                    className="font-editorial uppercase tracking-widest text-lg border-2 border-yellow-300 text-yellow-300 px-10 py-3 hover:bg-yellow-300 hover:text-black transition-all duration-300 ease-in-out"
                >
                    Entrar no Movimento
                </button>
            </div>
        </div>
    );
};

export default Home;