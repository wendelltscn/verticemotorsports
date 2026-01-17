
import type { Project } from '../types';

type Language = 'pt' | 'en';

export const projectsData: Record<Language, Project[]> = {
    pt: [
        {
            id: 1,
            title: "Projeto 001",
            image: "https://i.imgur.com/XBj922H.png",
            status: 'Em Andamento',
            concept: "A materialização da nossa filosofia: um restomod focado na experiência de dirigir. A base é um ícone nacional, mas a alma será reescrita com tecnologia e precisão.",
            problem: "O veículo chegou para um diagnóstico completo. O objetivo é avaliar a integridade estrutural e mecânica para definir o escopo de um projeto de alta performance para uso em rua e track days.",
            solution: "Fase de diagnóstico em andamento. O plano inicial inclui a instalação de uma ECU programável, modernização completa do sistema elétrico e uma revisão profunda de suspensão e freios para equilibrar a nova potência.",
            specs: ["Motor Suzuki G16A 1.6 8v", "Diagnóstico estrutural", "Planejamento de ECU Programável", "Análise de suspensão e freios"],
            logbook: [
                { date: "02 de Janeiro, 2026", update: "Veículo recebido em nosso ateliê para o início do projeto." },
                { date: "06 de Janeiro, 2026", update: "Análises e projeções iniciais concluídas. O escopo do projeto foi definido e alinhado." },
                { date: "10 de Janeiro, 2026", update: "Início do processo de desmontagem para avaliação detalhada de todos os componentes." },
            ],
            hotspots: [
                { x: '50%', y: '50%', text: 'Motor G16A 1.6 8v: Revisão completa de todos os componentes enquanto projetamos o novo chicote e os módulos da injeção.' },
                { x: '70%', y: '48%', text: 'Baía do Motor: Espaço sendo medido para o novo layout de chicote elétrico e admissão.' },
                { x: '25%', y: '60%', text: 'Interior: O painel será redesenhado para uma instrumentação focada no piloto, sem distrações.' },
            ]
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
            image: "https://i.imgur.com/XBj922H.png",
            status: 'In Progress',
            concept: "The materialization of our philosophy: a restomod focused on the driving experience. The base is a national icon, but its soul will be rewritten with technology and precision.",
            problem: "The vehicle arrived for a complete diagnosis. The goal is to assess its structural and mechanical integrity to define the scope for a high-performance project for street and track day use.",
            solution: "Diagnostic phase underway. The initial plan includes installing a programmable ECU, a complete modernization of the electrical system, and a deep overhaul of suspension and brakes to balance the new power.",
            specs: ["Suzuki G16A 1.6 8v Engine", "Structural Diagnosis", "Programmable ECU Planning", "Suspension & Brake Analysis"],
            logbook: [
                { date: "January 02, 2026", update: "Vehicle received at our atelier to begin the project." },
                { date: "January 06, 2026", update: "Initial analysis and projections completed. The project scope has been defined and aligned." },
                { date: "January 10, 2026", update: "Disassembly process started for a detailed evaluation of all components." },
            ],
            hotspots: [
                { x: '50%', y: '50%', text: 'G16A 1.6 8v Engine: Complete revision of all components while we design the new harness and injection modules.' },
                { x: '70%', y: '48%', text: 'Engine Bay: Space being measured for the new wiring harness and intake layout.' },
                { x: '25%', y: '60%', text: 'Interior: The dashboard will be redesigned for driver-focused instrumentation, without distractions.' },
            ]
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
