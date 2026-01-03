
import React from 'react';
import type { Page } from '../../types';
import { FilmIcon, DroneIcon, MicIcon, EditIcon } from '../icons/MediaIcons';

interface VrtcMediaProps {
    onNavigate: (page: Page) => void;
}

const CapabilityCard: React.FC<{ icon: React.ReactNode; title: string; children: React.ReactNode }> = ({ icon, title, children }) => (
    <div className="border border-gray-800 p-6 bg-gray-900/20 text-center flex flex-col items-center">
        <div className="text-orange-400 mb-4">{icon}</div>
        <h3 className="font-editorial text-xl text-white tracking-wider mb-3">{title}</h3>
        <p className="text-gray-400 leading-relaxed flex-grow">{children}</p>
    </div>
);

const VrtcMedia: React.FC<VrtcMediaProps> = ({ onNavigate }) => {
    return (
        <div className="bg-black text-gray-300">
            {/* Hero Section */}
            <div className="relative h-[70vh] w-full flex flex-col items-center justify-center text-center text-white overflow-hidden">
                <div 
                  className="absolute inset-0 bg-cover bg-center z-0" 
                  style={{ backgroundImage: "url(https://i.imgur.com/Zg0fkVA.png)" }}
                >
                  <div className="absolute inset-0 bg-black opacity-60"></div>
                </div>
                <div className="relative z-10 p-6 flex flex-col items-center animate-fade-in-up">
                    <img src="https://i.imgur.com/LJaOS15.png" alt="VrTC Media Logo" className="h-16 w-auto mb-4 invert" />
                    <h1 className="font-editorial text-4xl md:text-6xl lg:text-7xl text-white tracking-wider">VrTC MEDIA</h1>
                    <p className="font-technical uppercase text-orange-400 tracking-[0.4em] text-sm mt-2">Onde a Cultura Acelera</p>
                </div>
            </div>

            <div className="py-20 sm:py-28">
                <div className="container mx-auto px-6">
                    {/* Mission Section */}
                    <section className="max-w-4xl mx-auto text-center mb-20 md:mb-28">
                        <p className="font-technical text-lg md:text-xl leading-relaxed text-gray-300">
                            VrTC Media é o núcleo criativo da VERTICE. A lente através da qual capturamos a alma do metal. Produzimos conteúdo audiovisual que transcende o comum, transformando cada frame em um manifesto. Dos bastidores da oficina a documentários que definem a cultura, nossa missão é contar histórias que aceleram o pulso.
                        </p>
                    </section>

                    {/* Capabilities Section */}
                    <section className="mb-20 md:mb-28">
                        <header className="text-center mb-12">
                            <h2 className="font-editorial text-3xl md:text-4xl text-white tracking-wider">Nossas Capacidades</h2>
                            <div className="w-20 h-px bg-orange-400 mx-auto mt-3"></div>
                        </header>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
                            <CapabilityCard icon={<FilmIcon className="w-10 h-10" />} title="Cinematografia">
                                Imagens de alta resolução que capturam cada detalhe, da textura do asfalto ao brilho da pintura.
                            </CapabilityCard>
                            <CapabilityCard icon={<DroneIcon className="w-10 h-10" />} title="Filmagem Aérea">
                                Drones de alta performance para perspectivas impossíveis e tomadas dinâmicas que redefinem a velocidade.
                            </CapabilityCard>
                             <CapabilityCard icon={<MicIcon className="w-10 h-10" />} title="Sound Design Imersivo">
                                Captura e design de som que coloca você dentro do motor. Cada ronco, cada assobio, cada emoção.
                            </CapabilityCard>
                            <CapabilityCard icon={<EditIcon className="w-10 h-10" />} title="Edição Dinâmica">
                                Pós-produção com ritmo, cor e narrativa que refletem a energia bruta da cultura automotiva.
                            </CapabilityCard>
                        </div>
                    </section>
                    
                    {/* Gallery Section */}
                    <section className="mb-20 md:mb-28">
                        <header className="text-center mb-12">
                            <h2 className="font-editorial text-3xl md:text-4xl text-white tracking-wider">Portfólio em Frames</h2>
                             <p className="font-technical text-gray-500 max-w-2xl mx-auto mt-2">
                                Uma seleção do nosso trabalho. Cada imagem, uma história.
                            </p>
                        </header>
                        <div className="max-w-2xl mx-auto">
                             <a href="https://www.youtube.com/watch?v=SeaE4g-fku4" target="_blank" rel="noopener noreferrer" className="group relative block overflow-hidden aspect-video">
                                <img src="https://i.imgur.com/4GqLcLT.png" alt="Thumbnail of a video about gas stations in car culture" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center p-4">
                                    <h3 className="font-editorial text-xl md:text-2xl text-white opacity-0 group-hover:opacity-100 transition-opacity text-center">Postos & Cultura Automotiva</h3>
                                </div>
                            </a>
                        </div>
                         <div className="text-center mt-12">
                            <a href="https://www.youtube.com/@VerticeMotorsports" target="_blank" rel="noopener noreferrer" className="font-editorial uppercase tracking-widest text-lg border-2 border-orange-400 text-orange-400 px-10 py-3 hover:bg-orange-400 hover:text-black transition-all duration-300 ease-in-out">
                                Assista aos Lançamentos
                            </a>
                        </div>
                    </section>

                    {/* CTA Section */}
                    <section className="bg-gray-900/50 border border-gray-800 py-16 px-6 text-center">
                         <h2 className="font-editorial text-3xl md:text-4xl text-white tracking-wider">Conte com nossa produção para seu projeto.</h2>
                         <p className="text-gray-400 max-w-2xl mx-auto mt-4 mb-8 leading-relaxed">
                            Seja para documentar a construção do seu carro, criar conteúdo para sua marca ou produzir um filme automotivo, a VrTC Media é sua parceira criativa.
                         </p>
                         <a 
                            href="https://wa.link/o3621o"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-editorial uppercase tracking-widest text-lg border-2 border-yellow-300 text-black bg-yellow-300 px-10 py-4 hover:bg-transparent hover:text-yellow-300 transition-all duration-300 ease-in-out inline-block"
                        >
                            Vamos Criar Algo
                        </a>
                    </section>

                </div>
            </div>
        </div>
    );
};

export default VrtcMedia;