
import React, { useState } from 'react';
import type { Project } from '../../types';

const mockProjects: Project[] = [
    {
        id: 1,
        title: "Projeto 001",
        image: "https://i.imgur.com/tW976Xl.png",
        status: 'Em Andamento',
        concept: "Pragmático sem desafiar o senso comum. Poderíamos até arriscar dizer ser um projeto básico, mas está bem longe disto.",
        problem: "Revisão geral dos componentes elétricos e mecânicos, aliado à pasmem, uma pragmática (e perfeita) Injepro T4000. Simples seria um conceito errado. Arte minimalista.",
        solution: "Instalação da Injepro T4000 com mapas definitivos, revisão geral de motor e demais componentes e instalação elétrica completa.",
        specs: ["Motor 1.6 8v original", "Câmbio manual de 5 marchas", "ECU Programável", "Painel elétrico personalizado"],
    },
    {
        id: 2,
        title: "Projeto 'Kokota'",
        image: "https://i.imgur.com/t4bSdlB.png",
        status: 'Em Andamento',
        concept: "Restauração e preparação de um dos carros que está no imaginário do fundador desde sua infância.",
        problem: "Restauração total desta máquina que habita a mente do fundador da marca já há alguns anos. Esteve parada por 4 anos antes de ser resgatada por nós.",
        solution: "Substituição completa do motor 2.5 Detroit Diesel original por um MWM Sprint, escape dimensionado direto, restauração dos componentes elétricos e elementos originais do carro para um projeto quase inteiramente purista, mas resolvendo um problema que veio de fábrica: um motor nada confiável.",
        specs: ["Restauração Completa", "Troca de motor", "Pintura Padrão de Fábrica", "Funcionamento de quase todos componentes elétricos originais", "Interior 100% Original"],
    },
];

const ProjectCard: React.FC<{ project: Project; onClick: () => void }> = ({ project, onClick }) => (
    <div className="group relative overflow-hidden bg-black cursor-pointer" onClick={onClick}>
        <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-6 md:p-8">
            <span className={`font-technical text-xs uppercase tracking-widest px-2 py-1 ${project.status === 'Finalizado' ? 'bg-green-400/20 text-green-300' : 'bg-yellow-300/20 text-yellow-300'}`}>
                {project.status}
            </span>
            <h3 className="font-editorial text-2xl md:text-3xl text-white mt-2">{project.title}</h3>
        </div>
    </div>
);

const ProjectModal: React.FC<{ project: Project; onClose: () => void }> = ({ project, onClose }) => (
    <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 animate-fade-in" onClick={onClose}>
        <div className="bg-[#111] max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-gray-800" onClick={e => e.stopPropagation()}>
            <div className="relative">
                <img src={project.image} alt={project.title} className="w-full h-64 object-cover" />
                 <button onClick={onClose} className="absolute top-4 right-4 text-white bg-black/50 rounded-full p-2 hover:bg-black">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
            </div>
            <div className="p-8 md:p-12">
                <h2 className="font-editorial text-4xl text-white mb-2">{project.title}</h2>
                <span className={`font-technical text-xs uppercase tracking-widest px-2 py-1 ${project.status === 'Finalizado' ? 'bg-green-400/20 text-green-300' : 'bg-yellow-300/20 text-yellow-300'}`}>
                    {project.status}
                </span>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8 text-gray-400">
                    <div className="md:col-span-1">
                        <h4 className="font-editorial text-lg text-yellow-300 mb-2">Conceito</h4>
                        <p>{project.concept}</p>
                    </div>
                    <div className="md:col-span-1">
                        <h4 className="font-editorial text-lg text-yellow-300 mb-2">Problema</h4>
                        <p>{project.problem}</p>
                    </div>
                     <div className="md:col-span-1">
                        <h4 className="font-editorial text-lg text-yellow-300 mb-2">Solução</h4>
                        <p>{project.solution}</p>
                    </div>
                </div>

                <div className="mt-8 pt-8 border-t border-gray-800">
                     <h4 className="font-editorial text-lg text-yellow-300 mb-4">Especificações Chave</h4>
                     <ul className="list-disc list-inside space-y-2 font-technical text-gray-300">
                        {project.specs.map((spec, i) => <li key={i}>{spec}</li>)}
                     </ul>
                </div>
            </div>
        </div>
    </div>
);


const Projetos: React.FC = () => {
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    return (
        <div className="bg-black py-20 sm:py-28">
            <div className="container mx-auto px-6">
                <header className="text-center mb-16 md:mb-24">
                    <h1 className="font-editorial text-4xl md:text-6xl text-white tracking-wider mb-4">PROJETOS</h1>
                    <p className="font-technical text-gray-500 max-w-2xl mx-auto">
                        Cada projeto é um manifesto em movimento. Uma história contada em metal, borracha e alma.
                    </p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-1 max-w-5xl mx-auto">
                    {mockProjects.map(p => (
                        <ProjectCard key={p.id} project={p} onClick={() => setSelectedProject(p)} />
                    ))}
                </div>
            </div>
            {selectedProject && <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />}
        </div>
    );
};

export default Projetos;