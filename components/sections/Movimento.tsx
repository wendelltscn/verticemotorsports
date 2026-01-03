
import React from 'react';
import { InstagramIcon, YoutubeIcon, WhatsappIcon } from '../icons/SocialIcons';

const Movimento: React.FC = () => {
    return (
        <div className="relative min-h-[80vh] w-full flex flex-col items-center justify-center text-center text-white overflow-hidden py-20">
            <div 
              className="absolute inset-0 bg-cover bg-center bg-fixed z-0" 
              style={{ backgroundImage: "url(https://i.imgur.com/oszZB03.png)" }}
            >
              <div className="absolute inset-0 bg-black opacity-80"></div>
            </div>

            <div className="relative z-10 p-6 flex flex-col items-center max-w-3xl mx-auto">
                <header className="mb-8">
                    <h1 className="font-editorial text-4xl md:text-6xl text-white tracking-wider mb-4">O MOVIMENTO</h1>
                    <p className="font-technical uppercase text-gray-500 tracking-[0.3em] text-sm">A Insurreição Silenciosa</p>
                </header>
                
                <div className="space-y-6 text-lg text-gray-300 leading-relaxed mb-12">
                    <p>
                        Isto não é um clube. É uma conspiração. Um pacto silencioso entre aqueles que ouvem a alma das máquinas. Não estamos aqui para seguir o mapa; estamos aqui para redesenhar a estrada.
                    </p>
                     <p>
                        A VERTICE é o ponto de encontro para os que recusam o comum. Onde a paixão se torna método e a estrada, o nosso manifesto. Siga a jornada. Faça parte da construção.
                    </p>
                </div>

                <div className="flex flex-col gap-4 w-full max-w-md items-center">
                    <a 
                        href="https://wa.link/w4b8ap"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex w-full items-center justify-center gap-3 font-editorial uppercase tracking-widest text-base border-2 border-yellow-300 text-yellow-300 px-8 py-4 hover:bg-yellow-300 hover:text-black transition-all duration-300 ease-in-out"
                    >
                        <WhatsappIcon className="w-5 h-5" />
                        <span>Ouse Fazer Parte</span>
                    </a>
                    <div className="flex flex-col sm:flex-row gap-4 w-full">
                        <a 
                            href="https://www.instagram.com/verticemotorsports/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex flex-1 items-center justify-center gap-3 font-editorial uppercase tracking-widest text-base border border-gray-600 text-gray-400 px-8 py-3 hover:border-white hover:text-white transition-all duration-300 ease-in-out"
                        >
                            <InstagramIcon className="w-5 h-5" />
                            <span>Seguir no Instagram</span>
                        </a>
                         <a 
                            href="https://www.youtube.com/@VerticeMotorsports"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex flex-1 items-center justify-center gap-3 font-editorial uppercase tracking-widest text-base border border-gray-600 text-gray-400 px-8 py-3 hover:border-white hover:text-white transition-all duration-300 ease-in-out"
                        >
                            <YoutubeIcon className="w-5 h-5" />
                            <span>Acompanhar no YouTube</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Movimento;