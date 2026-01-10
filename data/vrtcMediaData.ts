
import type { VrtcMediaVideo } from '../types';

type Language = 'pt' | 'en';

export const vrtcMediaData: Record<Language, VrtcMediaVideo[]> = {
    pt: [
        {
            title: "Projeto 001: O Despertar",
            displayTitle: "Por que postos de gasolina sempre fizeram parte da cultura automotiva",
            thumbnail: "https://i.imgur.com/4GqLcLT.png",
            link: "https://www.youtube.com/watch?v=SeaE4g-fku4",
            isComingSoon: false,
        },
        {
            title: "Staying Alive (PT-BR)",
            thumbnail: "https://i.imgur.com/4m0E8LU.png",
            link: "https://www.youtube.com/watch?v=YhWx7wmPKRc",
            isComingSoon: false,
        },
    ],
    en: [
        {
            title: "Staying Alive (EN)",
            thumbnail: "https://i.imgur.com/4m0E8LU.png",
            link: "https://www.youtube.com/watch?v=F6gujB7c3oI",
            isComingSoon: false,
        },
    ],
};
