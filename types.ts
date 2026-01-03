
export type Page = 'Home' | 'Manifesto' | 'Works' | 'Projetos' | 'Run' | 'Lifestyle' | 'Podcast' | 'Contato' | 'Movimento';

export interface Project {
    id: number;
    title: string;
    image: string;
    status: 'Finalizado' | 'Em Andamento';
    concept: string;
    problem: string;
    solution: string;
    specs: string[];
}