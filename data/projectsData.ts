import type { Project } from '../types';

type Language = 'pt' | 'en';

export const projectsData: Record<Language, Project[]> = {
    pt: [
        {
            id: 2,
            title: "Projeto 'Kokota'",
            image: "https://i.imgur.com/t4bSdlB.png",
            status: 'Em Andamento',
            concept: "Restauração e preparação de um dos carros que está no imaginário do fundador desde sua infância.",
            problem: "Restauração total desta máquina que habita a mente do fundador da marca já há alguns anos. Esteve parada por 4 anos antes de ser resgatada por nós.",
            solution: "Substituição completa do motor 2.5 Detroit Diesel original por um MWM Sprint, escape dimensionado direto, restauração dos componentes elétricos e elementos originais do carro para um projeto quase inteiramente purista, mas resolvendo um problema que veio de fábrica: um motor nada confiável.",
            specs: ["Restauração Completa", "Troca de motor", "Pintura Padrão de Fábrica", "Funcionamento de quase todos componentes elétricos originais", "Interior 100% Original"],
            hotspots: [
                { x: '45%', y: '55%', text: "Motor MWM Sprint: Um coração novo e confiável para substituir o problemático Detroit Diesel original." },
                { x: '70%', y: '50%', text: "Restauração da lataria e pintura no padrão de fábrica, preservando a identidade clássica do veículo." },
                { x: '65%', y: '35%', text: "Interior 100% original: Resgate de cada detalhe para manter a alma e a experiência de época." }
            ]
        },
    ],
    en: [
        {
            id: 2,
            title: "Project 'Kokota'",
            image: "https://i.imgur.com/t4bSdlB.png",
            status: 'In Progress',
            concept: "Restoration and tuning of one of the cars that has been in the founder's imagination since his childhood.",
            problem: "Total restoration of this machine that has been on the brand founder's mind for some years. It was stationary for 4 years before we rescued it.",
            solution: "Complete replacement of the original 2.5 Detroit Diesel engine with an MWM Sprint, direct custom exhaust, restoration of electrical components and original car elements for an almost entirely purist project, but solving a factory problem: an unreliable engine.",
            specs: ["Complete Restoration", "Engine Swap", "Factory Standard Paint", "Functionality of almost all original electrical components", "100% Original Interior"],
            hotspots: [
                { x: '45%', y: '55%', text: "MWM Sprint Engine: A new, reliable heart to replace the problematic original Detroit Diesel." },
                { x: '70%', y: '50%', text: "Bodywork restoration and factory-standard paint, preserving the vehicle's classic identity." },
                { x: '65%', y: '35%', text: "100% Original Interior: Every detail was recovered to maintain the soul and period-correct experience." }
            ]
        },
    ],
};