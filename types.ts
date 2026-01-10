
export type Page = 'Home' | 'Manifesto' | 'Works' | 'Projetos' | 'Run' | 'Lifestyle' | 'Podcast' | 'Contato' | 'Movimento' | 'VrtcMedia';

export interface Project {
    id: number;
    title: string;
    image: string;
    // FIX: Expanded the status type to include English values to support internationalization and fix type errors.
    status: 'Finalizado' | 'Em Andamento' | 'Finished' | 'In Progress';
    concept: string;
    problem: string;
    solution: string;
    specs: string[];
}

export interface VrtcMediaVideo {
    title: string;
    displayTitle?: string;
    thumbnail: string;
    link?: string;
    isComingSoon: boolean;
}
