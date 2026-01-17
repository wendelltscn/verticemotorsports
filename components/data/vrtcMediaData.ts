
import type { VrtcMediaVideo } from '../types';

type Language = 'pt' | 'en';

export const vrtcMediaData: Record<Language, VrtcMediaVideo[]> = {
    pt: [
        {
            title: "Projeto 001: O Despertar",
            displayTitle: "Por que postos de gasolina sempre fizeram parte da cultura automotiva",
            thumbnail: "https://i.imgur.com/4GqLcLT.png",
            link: "https://www.youtube.com/watch?v=SeaE4g-fku4",
            description: "Uma exploração visual da conexão profunda entre a cultura automotiva e o espaço liminar dos postos de gasolina — um tributo aos momentos entre as jornadas.",
            isComingSoon: false,
        },
        {
            title: "Staying Alive (PT-BR)",
            displayTitle: "Ficando Vivo em um Mundo no Piloto Automático",
            thumbnail: "https://i.imgur.com/4m0E8LU.png",
            link: "https://www.youtube.com/watch?v=YhWx7wmPKRc",
            description: "Viver no piloto automático tornou-se o padrão. Este filme é um convite à presença, usando a máquina como uma ferramenta para sentir novamente. Uma filosofia central da VERTICE.",
            isComingSoon: false,
        },
    ],
    en: [
        {
            title: "Project 001: The Awakening",
            displayTitle: "Why gas stations have always been part of car culture",
            thumbnail: "https://i.imgur.com/4GqLcLT.png",
            link: "https://www.youtube.com/watch?v=SeaE4g-fku4",
            description: "A visual exploration of the deep-rooted connection between automotive culture and the liminal space of gas stations—a tribute to the moments between journeys.",
            isComingSoon: false,
        },
        {
            title: "Staying Alive (EN)",
            displayTitle: "Staying Alive on an Autopilot World",
            thumbnail: "https://i.imgur.com/4m0E8LU.png",
            link: "https://www.youtube.com/watch?v=F6gujB7c3oI",
            description: "Living on autopilot has become the default. This film is an invitation to presence, using the machine as a tool to feel again. A core VERTICE philosophy.",
            isComingSoon: false,
        },
    ],
};
