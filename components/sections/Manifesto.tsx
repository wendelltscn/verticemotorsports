
import React from 'react';

const ValueCard: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="border border-gray-800 p-6 bg-gray-900/20">
        <h3 className="font-editorial text-xl text-yellow-300 tracking-wider mb-3">{title}</h3>
        <p className="text-gray-400 leading-relaxed">{children}</p>
    </div>
);

const Manifesto: React.FC = () => {
    return (
        <div className="bg-black text-gray-300 py-20 sm:py-28">
            <div className="container mx-auto px-6">
                
                <header className="text-center mb-16 md:mb-24">
                    <h1 className="font-editorial text-4xl md:text-6xl text-white tracking-wider mb-4">MANIFESTO</h1>
                    <div className="w-20 h-px bg-yellow-300 mx-auto"></div>
                </header>

                <div className="max-w-3xl mx-auto space-y-10 text-lg leading-loose text-gray-400 font-light">
                    <p>
                        Nascemos da fuligem e da paixão. Em um mundo de plástico e presets, escolhemos o caminho do metal, do óleo e da alma. VERTICE existe para desafiar a efemeridade, para resgatar a conexão visceral entre homem e máquina. Não seguimos tendências; construímos legado.
                    </p>
                    <p>
                        Um carro não é um objeto. É um diário de asfalto, uma extensão do corpo, um catalisador de liberdade. Cada motor tem uma pulsação, cada chassi uma memória. Nossa missão é ouvir essas histórias e dar a elas a voz que merecem, seja através de uma restauração purista ou de uma preparação que desafia a física. A cultura automotiva é uma forma legítima de arte, e nosso ateliê é seu santuário.
                    </p>
                     <p>
                        Conectamos a tradição da mecânica artesanal com a precisão da inovação prática. Respeitamos os mestres do passado enquanto forjamos as ferramentas do futuro. Para nós, performance não é apenas sobre números. É sobre a sinfonia de um motor perfeitamente ajustado, a confiança em uma suspensão que conversa com a estrada, a beleza em uma linha que corta o vento.
                    </p>
                    <p className="text-white font-normal italic">
                        Somos engenheiros, artistas, filósofos da estrada. Somos a resistência contra o descartável. Somos VERTICE.
                    </p>
                </div>

                <div className="my-20 md:my-28">
                    <div className="w-full h-px bg-gray-800"></div>
                </div>

                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-12">
                         <h2 className="font-editorial text-3xl md:text-4xl text-white tracking-wider mb-4">Nossa Visão</h2>
                         <p className="text-gray-400 max-w-3xl mx-auto leading-relaxed">
                            Transformar a experiência automotiva através de serviços técnicos de excelência, conteúdo digital autêntico e produtos que representem a verdadeira paixão por carros, proporcionando aos entusiastas soluções integradas que unem tradição mecânica e inovação.
                         </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <ValueCard title="Excelência Técnica">Comprometimento com o mais alto padrão de qualidade em cada serviço realizado.</ValueCard>
                        <ValueCard title="Autenticidade">Comunicação genuína e transparente em todas as interações.</ValueCard>
                        <ValueCard title="Inovação Prática">Soluções que realmente agregam valor, sem modismos vazios.</ValueCard>
                        <ValueCard title="Comunidade">Valorização da cultura automotiva e de seus entusiastas.</ValueCard>
                        <ValueCard title="Sustentabilidade">Práticas responsáveis com impacto ambiental consciente.</ValueCard>
                         <div className="border border-dashed border-gray-700 p-6 flex items-center justify-center">
                            <p className="font-editorial text-gray-600">Die Never.</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Manifesto;
