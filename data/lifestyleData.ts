
type Language = 'pt' | 'en';

interface ProductImage {
    src: string;
    altKey: string;
}

interface ProductData {
    name: string;
    tagline: string;
    price: string;
    shipping: string;
    philosophyTitle: string;
    philosophyText: string;
    detailsTitle: string;
    detailsList: string[];
    images: ProductImage[];
    purchaseLink: string;
}

export const lifestyleData: Record<Language, ProductData> = {
    pt: {
        name: "Camisa 'ERA ISSO OU TERAPIA'",
        tagline: "A declaração para quem encontra sanidade na garagem.",
        price: "R$ 129",
        shipping: "Frete a calcular",
        philosophyTitle: "Filosofia",
        philosophyText: "Para alguns, terapia é um divã. Para nós, é uma garagem. Esta camisa não é só uma peça de roupa, é o reconhecimento de que a sanidade, às vezes, se encontra no cheiro de gasolina e no som dos motores. É uma declaração para quem entende que a melhor forma de organizar a mente é acelerando em uma estrada vazia de madrugada, quando só existe você, seu carro e o vento. Veste quem sabe que, entre a loucura do mundo e a paz interior, existe um carro.",
        detailsTitle: "Detalhes Técnicos",
        detailsList: [
            "Camiseta preta de algodão",
            "Estampa branca de alto contraste em silk de alta durabilidade",
            "Frente com assinatura 'VERTICE' no peito",
            "Costas com a declaração 'ERA ISSO OU TERAPIA / VERTICE MOTORSPORTS / EST 2025'",
            "Modelagem clássica com caimento estruturado"
        ],
        images: [
            { src: "https://i.imgur.com/xmvPtca.png", altKey: "lifestyle.image_alt_mockup_front" },
            { src: "https://i.imgur.com/0jKw5Tw.png", altKey: "lifestyle.image_alt_mockup_back" },
            { src: "https://i.imgur.com/vwkM3S7.png", altKey: "lifestyle.image_alt_front_flat" },
            { src: "https://i.imgur.com/q876TTY.png", altKey: "lifestyle.image_alt_back_flat" },
        ],
        purchaseLink: "https://wa.me/5584991334144?text=Oi%20Wendell!%20Vim%20do%20site%20e%20gostaria%20de%20adquirir%20a%20camisa%20'ERA%20ISSO%20OU%20TERAPIA'."
    },
    en: {
        name: "T-Shirt 'EITHER THIS OR THERAPY'",
        tagline: "The statement for those who find sanity in the garage.",
        price: "BRL 129",
        shipping: "Shipping calculated",
        philosophyTitle: "Philosophy",
        philosophyText: "For some, therapy is a couch. For us, it's a garage. This shirt isn't just clothing; it's recognizing that sanity is sometimes found in the smell of gasoline and the sound of engines. It's a statement for those who get that the best way to clear your head is accelerating on an empty road at dawn, when it's just you, your machine, and the wind. It's for those who know that between the world's madness and inner peace, there's a car.",
        detailsTitle: "Technical Details",
        detailsList: [
            "Black cotton t-shirt",
            "High-contrast, durable white silk-screen print",
            "Front with 'VERTICE' signature on the chest",
            "Back with the statement 'EITHER THIS OR THERAPY / VERTICE MOTORSPORTS / EST 2025'",
            "Classic fit with a structured drape"
        ],
        images: [
            { src: "https://i.imgur.com/yftGSv4.png", altKey: "lifestyle.image_alt_mockup_front" },
            { src: "https://i.imgur.com/UCsQA80.png", altKey: "lifestyle.image_alt_mockup_back" },
            { src: "https://i.imgur.com/T02YNgz.png", altKey: "lifestyle.image_alt_front_flat" },
            { src: "https://i.imgur.com/0pcoXBK.png", altKey: "lifestyle.image_alt_back_flat" },
        ],
        purchaseLink: "https://wa.me/5584991334144?text=Hi%20Wendell!%20I've%20come%20from%20the%20website%20and%20I%20want%20to%20purchase%20the%20'EITHER%20THIS%20OR%20THERAPY'%20T-Shirt."
    },
};