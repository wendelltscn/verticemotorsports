
import type { Project } from '../types';

type Language = 'pt' | 'en';

export const projectsData: Record<Language, Project[]> = {
    pt: [
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
    ],
    en: [
        {
            id: 1,
            title: "Project 001",
            image: "https://i.imgur.com/tW976Xl.png",
            status: 'In Progress',
            concept: "Pragmatic without challenging common sense. We could even risk saying it's a basic project, but it's far from it.",
            problem: "General review of electrical and mechanical components, combined with, believe it or not, a pragmatic (and perfect) Injepro T4000. Simple would be the wrong concept. Minimalist art.",
            solution: "Installation of the Injepro T4000 with definitive maps, general engine and component overhaul, and complete electrical installation.",
            specs: ["Original 1.6 8v engine", "5-speed manual transmission", "Programmable ECU", "Custom electrical panel"],
        },
        {
            id: 2,
            title: "Project 'Kokota'",
            image: "https://i.imgur.com/t4bSdlB.png",
            status: 'In Progress',
            concept: "Restoration and tuning of one of the cars that has been in the founder's imagination since his childhood.",
            problem: "Total restoration of this machine that has been on the brand founder's mind for some years. It was stationary for 4 years before we rescued it.",
            solution: "Complete replacement of the original 2.5 Detroit Diesel engine with an MWM Sprint, direct custom exhaust, restoration of electrical components and original car elements for an almost entirely purist project, but solving a factory problem: an unreliable engine.",
            specs: ["Complete Restoration", "Engine Swap", "Factory Standard Paint", "Functionality of almost all original electrical components", "100% Original Interior"],
        },
    ],
};
