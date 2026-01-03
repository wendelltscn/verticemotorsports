
import React from 'react';
import { ShoppingBagIcon } from '../icons/SocialIcons';

const Lifestyle: React.FC = () => {
    return (
        <div className="bg-black py-20 sm:py-28">
            <div className="container mx-auto px-6">
                <header className="text-center mb-16 md:mb-24">
                    <h1 className="font-editorial text-4xl md:text-6xl text-white tracking-wider mb-4">LIFESTYLE</h1>
                    <p className="font-technical uppercase text-gray-500 tracking-[0.3em] text-sm">Identidade Vestível</p>
                </header>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6 text-lg text-gray-400 leading-relaxed">
                        <p>Sua identidade não termina quando você desce do carro. VERTICE Lifestyle é a extensão da nossa cultura. Roupas forjadas para a jornada, não apenas para o destino.</p>
                        <p>Fundindo a robustez do workwear automotivo com a estética afiada do streetwear, criamos peças limitadas que carregam nossa filosofia em cada costura. Não é merchandise, é equipamento para quem vive e respira esta cultura.</p>
                        <p className="text-white">Drops futuros. Exclusividade garantida. Apenas para os que entendem.</p>
                        <a 
                            href="https://wa.link/kvm96u"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-4 inline-flex items-center gap-3 font-editorial uppercase tracking-widest text-base border border-yellow-300 text-yellow-300 px-8 py-3 hover:bg-yellow-300 hover:text-black transition-all duration-300 ease-in-out"
                        >
                            <ShoppingBagIcon className="w-5 h-5" />
                            <span>Ver Produtos Disponíveis</span>
                        </a>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="overflow-hidden">
                            <img src="https://i.imgur.com/Pfelu7u.jpeg" alt="VERTICE Apparel" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"/>
                        </div>
                        <div className="overflow-hidden">
                             <img src="https://i.imgur.com/4bzpSbj.png" alt="VERTICE Workwear" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Lifestyle;