
export type Page = 'Home' | 'Manifesto' | 'Works' | 'Projetos' | 'Run' | 'Conceito' | 'Podcast' | 'Contato' | 'Movimento' | 'VrtcMedia' | 'Lifestyle';

export interface Project {
    id: number;
    title: string;
    image: string;
    status: 'Finalizado' | 'Em Andamento' | 'Finished' | 'In Progress';
    concept: string;
    problem: string;
    solution: string;
    specs: string[];
    logbook?: {
        date: string;
        update: string;
        image?: string;
    }[];
    hotspots?: {
        x: string; // percentage
        y: string; // percentage
        text: string;
    }[];
}

export interface VrtcMediaVideo {
    title: string;
    displayTitle?: string;
    thumbnail: string;
    link?: string;
    description: string;
    isComingSoon: boolean;
}