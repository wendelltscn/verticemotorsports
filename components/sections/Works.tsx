
import React from 'react';

const ServiceIcon: React.FC<{ d: string }> = ({ d }) => (
    <svg className="w-10 h-10 text-yellow-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d={d}></path>
    </svg>
);

const ServiceCard: React.FC<{ icon: string; title: string; children: React.ReactNode }> = ({ icon, title, children }) => (
    <div className="bg-gray-900/50 border border-gray-800 p-8 flex flex-col items-center text-center hover:border-yellow-300 transition-colors duration-300">
        <ServiceIcon d={icon} />
        <h3 className="font-editorial text-2xl text-white tracking-wider mb-3">{title}</h3>
        <p className="text-gray-400 leading-relaxed flex-grow">{children}</p>
    </div>
);

const Works: React.FC = () => {
    return (
        <div className="bg-black py-20 sm:py-28">
            <div className="container mx-auto px-6">
                <header className="text-center mb-16 md:mb-24">
                    <h1 className="font-editorial text-4xl md:text-6xl text-white tracking-wider mb-4">VERTICE WORKS</h1>
                    <p className="font-technical uppercase text-gray-500 tracking-[0.3em] text-sm">Laboratório • Atelier • Templo</p>
                </header>
                
                <div className="max-w-3xl mx-auto text-center mb-16">
                    <p className="text-lg text-gray-400 leading-relaxed">
                        Cada parafuso, um verso. Cada solda, uma rima. Nossos serviços são a materialização da nossa filosofia. Não consertamos máquinas; revelamos suas verdadeiras identidades. Do projeto mais simples ao mais complexo, para carros e motos, o nível de cuidado é absoluto.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    <ServiceCard icon="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1.51 1H15a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" title="Preparação">
                        Otimização de performance que respeita a essência da máquina, buscando o equilíbrio perfeito entre potência, dirigibilidade e confiabilidade.
                    </ServiceCard>
                     <ServiceCard icon="M12 6.25278V19.2528M12 6.25278C10.8321 5.47686 9.2464 5.17885 7.6787 5.44027C6.111 5.70168 4.68677 6.5001 3.61071 7.68518C2.53465 8.87026 1.87708 10.3558 1.74991 11.9143C1.62273 13.4727 2.03422 15.0294 2.91928 16.3215" title="Restauração">
                        Resgate da história e da glória original. Um processo meticuloso de pesquisa e execução para devolver a alma a clássicos.
                    </ServiceCard>
                    <ServiceCard icon="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" title="Customização">
                        Projetos autorais que traduzem a identidade do proprietário em metal, criando peças únicas e atemporais.
                    </ServiceCard>
                    <ServiceCard icon="M13 10V3L4 14h7v7l9-11h-7z" title="Elétrica">
                        Modernização e criação de sistemas elétricos complexos, integrando tecnologia de ponta com a arquitetura original do veículo.
                    </ServiceCard>
                    <ServiceCard icon="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3" title="Projetos Completos">
                        Da concepção à entrega. Assumimos a responsabilidade total por projetos 'turn-key', garantindo coerência e excelência em todas as etapas.
                    </ServiceCard>
                    <ServiceCard icon="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9zm-4.27 11a2 2 0 0 1-3.46 0" title="Consultoria">
                        Nossa expertise à sua disposição. Orientação técnica e estratégica para aquisição, desenvolvimento de projetos e otimização.
                    </ServiceCard>
                </div>
            </div>
        </div>
    );
};

export default Works;
