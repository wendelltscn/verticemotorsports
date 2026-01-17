
type Language = 'pt' | 'en';

interface EpisodeData {
    number: string;
    title: string;
    description: string;
    link: string;
}

export const podcastData: Record<Language, EpisodeData[]> = {
    pt: [
        { 
            number: "002", 
            title: "A Recusa em Pedir Permissão",
            description: "Algumas ideias não sobrevivem a validações. Falamos sobre proteger visões frágeis, a teimosia de começar sozinho e por que os movimentos reais raramente pedem permissão para nascer.",
            link: "https://youtu.be/IOM9MoH3ees?si=BQjWhm7i8-KE13Ef"
        },
        { 
            number: "001", 
            title: "A Faísca: Gênese e o Projeto Zero", 
            description: "No episódio inaugural, o fundador conta a história da VERTICE: a frustração que virou combustível, a visão e os bastidores do primeiro projeto que definiu tudo.",
            link: "https://youtu.be/qChZlsR6efU?si=87e8lea3hrI2M1pE"
        }
    ],
    en: [
        { 
            number: "002", 
            title: "The Refusal to Ask for Permission",
            description: "Some ideas don't survive validation. We talk about protecting fragile visions, the stubbornness of starting alone, and why real movements rarely ask for permission to be born.",
            link: "https://youtu.be/IOM9MoH3ees?si=BQjWhm7i8-KE13Ef"
        },
        { 
            number: "001", 
            title: "The Spark: Genesis and Project Zero", 
            description: "In the inaugural episode, the founder tells the story of VERTICE: the frustration that turned into fuel, the vision, and the behind-the-scenes of the first project that defined everything.",
            link: "https://youtu.be/qChZlsR6efU?si=87e8lea3hrI2M1pE"
        }
    ]
};
