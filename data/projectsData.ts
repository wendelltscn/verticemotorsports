import type { Project } from '../types';

type Language = 'pt' | 'en';

export const projectsData: Record<Language, Project[]> = {
    pt: [
        {
            id: 1,
            title: "Projeto 001",
            image: "https://i.imgur.com/XBj922H.png",
            status: 'Em Andamento',
            concept: "Precisão e modernidade para um clássico. A missão deste projeto é a substituição do sistema de carburação original por uma injeção eletrônica programável, garantindo confiabilidade, performance e a dirigibilidade que a VERTICE exige.",
            problem: "O veículo chegou à oficina com o objetivo claro de aposentar o sistema de carburação original, que apresentava limitações de acerto e confiabilidade, impedindo o motor de atingir seu potencial máximo de eficiência.",
            solution: "Implementação de um sistema de injeção eletrônica totalmente novo, gerenciado por uma ECU programável T4000. O serviço envolve a fabricação de um chicote elétrico customizado, instalação de novos sensores e um acerto fino para otimizar a performance e a resposta do motor.",
            specs: ["Conversão Carburação > Injeção", "ECU Programável T4000", "Chicote Elétrico Customizado", "Acerto de motor"],
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
            concept: "Precision and modernity for a classic. This project's mission is to replace the original carburetor system with a programmable electronic fuel injection, ensuring the reliability, performance, and drivability that VERTICE demands.",
            problem: "The vehicle arrived at the workshop with the clear objective of retiring the original carburetor system, which had tuning and reliability limitations, preventing the engine from reaching its maximum efficiency potential.",
            solution: "Implementation of a brand-new electronic fuel injection system, managed by a T4000 programmable ECU. The service includes fabricating a custom wiring harness, installing new sensors, and a fine-tune to optimize engine performance and response.",
            specs: ["Carburetor to EFI Conversion", "T4000 Programmable ECU", "Custom Wiring Harness", "Engine Tuning"],
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