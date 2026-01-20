
type Language = 'pt' | 'en';

interface RunRule {
    title: string;
    points: string[];
}

interface CodeOfConductPoint {
    title: string;
    text: string;
}

interface CodeOfConduct {
    intro: string;
    points: CodeOfConductPoint[];
    outro: string;
}

interface RefundPolicyPoint {
    subhead: string;
    text: string | null;
}

interface RefundPolicySection {
    intro?: string;
    title?: string;
    points?: RefundPolicyPoint[];
}

interface WhatToBringItem {
    title: string;
    text: string;
}

interface FaqItem {
    q: string;
    a: string;
}

interface RunDetailsData {
    runRules: RunRule[];
    codeOfConduct: CodeOfConduct;
    refundPolicy: RefundPolicySection[];
    whatToBring: WhatToBringItem[];
    faqData: FaqItem[];
}

export const runData: Record<Language, RunDetailsData> = {
    pt: {
        runRules: [
            { title: "1. Participação", points: ["1.1. A RUN 001 é um evento para convidados, com vagas limitadas.", "1.2. A inscrição é pessoal e intransferível.", "1.3. O participante declara estar apto a conduzir veículo automotor."] },
            { title: "2. Veículos", points: ["2.1. O veículo deve estar em condições mínimas de segurança.", "2.2. Luzes, freios e pneus devem estar em perfeito funcionamento.", "2.3. Não é permitido participar com veículos em situação irregular."] },
            { title: "3. Condução e Segurança", points: ["3.1. Não é corrida. Respeito total aos limites da via e às leis de trânsito.", "3.2. Formação e distância: Manter distância segura. Nada de ‘colar’.", "3.3. Nada de manobra / exibição: Burnout, corte de giro, drift, arrancada: fora.", "3.4. Ponto de reagrupamento: Se separar, segue até o ponto X e reagrupa. Nada de caça.", "3.5. A RUN não compactua com imprudência ou exibição irresponsável."] },
            { title: "4. Álcool e substâncias", points: ["4.1. Tolerância zero para álcool antes ou durante a condução.", "4.2. Uso de substâncias ilícitas resulta em exclusão imediata."] },
            { title: "5. Organização e Comunicação", points: ["5.1. Instruções da organização devem ser seguidas sem exceção.", "5.2. Comunicação: Canal oficial (WhatsApp) + 1 número de emergência do organizador.", "5.3. Pax / carona: 1 acompanhante por carro é permitido, mediante inscrição individual.", "5.4. Critério de exclusão: Qualquer conduta de risco = retirada imediata do evento (sem reembolso)."] },
            { title: "6. Responsabilidade", points: ["6.1. Cada participante é responsável por si, seu veículo e suas ações.", "6.2. A organização não se responsabiliza por multas, acidentes ou danos."] }
        ],
        codeOfConduct: {
            intro: "Este não é um passeio comum.\nÉ uma travessia com propósito.",
            points: [
                { title: "Presença", text: "Esteja ali de verdade.\nNada de dispersão, nada de ego inflado." },
                { title: "Respeito", text: "Respeite a estrada.\nRespeite os outros.\nRespeite quem veio antes e quem vem atrás." },
                { title: "Disciplina", text: "Liberdade só existe com controle.\nQuem não entende isso, não pertence à RUN." },
                { title: "Silêncio quando necessário", text: "Nem todo momento pede barulho.\nAlguns pedem atenção." },
                { title: "Estilo", text: "Não é sobre ostentar.\nÉ sobre postura." },
                { title: "Espírito", text: "A RUN começa antes da partida\ne continua depois da chegada." }
            ],
            outro: "Quem não busca isso, talvez esta RUN não seja o lugar certo."
        },
        refundPolicy: [
            { intro: "A VERTICE RUN #001 encontra-se em fase de organização interna. A confirmação da data e do percurso será comunicada aos inscritos antes da realização do evento.\n\nPor ser um evento de vagas limitadas e com custos operacionais, nossa política de reembolso segue critérios claros:" },
            { title: "1. Cancelamento por parte do participante", points: [{ subhead: "1.1. Antes da confirmação da data", text: "Enquanto não houver data confirmada, o reembolso integral (100%) é sempre possível." }, { subhead: "1.2. Após a confirmação da data", text: "Passam a valer os seguintes prazos, contados a partir da data de compra:\n• Reembolso integral (100%): Solicitado em até 7 dias.\n• Reembolso parcial (50%): Solicitado após 7 dias da compra, até 72 horas antes do evento.\n• Sem reembolso: Solicitações feitas com menos de 72 horas de antecedência ou não comparecimento." }] },
            { title: "2. Cancelamento ou alteração por parte da organização", points: [{ subhead: "2.1. Cancelamento do evento", text: "Em caso de cancelamento total, o participante poderá optar por reembolso integral (100%) ou crédito integral para uma próxima edição." }, { subhead: "2.2. Alterações de percurso, horário ou programação", text: "A organização se reserva o direito de realizar ajustes por motivos de segurança, clima ou força maior. Nesses casos, não será devido reembolso, desde que o evento seja realizado. Se a alteração for substancial (ex: mudança de data), o participante poderá optar por crédito integral para a próxima edição." }] },
            { title: "3. Itens personalizados", points: [{ subhead: "3.1. Camisas e materiais exclusivos", text: "Itens personalizados ou produzidos sob demanda não são reembolsáveis, exceto em caso de defeito de fabricação." }] },
            { title: "4. Como solicitar reembolso", points: [{ subhead: "4.1. Canal", text: "As solicitações devem ser feitas pelo e-mail ou WhatsApp oficial do evento." }, { subhead: "4.2. Dados necessários", text: "Enviar nome completo, CPF, comprovante de pagamento e pacote adquirido." }, { subhead: "4.3. Prazo", text: "O reembolso será processado em até 10 dias úteis." }] },
            { title: "5. Aceite", points: [{ subhead: "Ao efetuar a inscrição, o participante declara estar de acordo com esta política.", text: null }] }
        ],
        whatToBring: [
            { title: "Documentação", text: "CNH e documento do veículo válidos." },
            { title: "Veículo", text: "Revisado, especialmente freios e pneus. Tanque com mais da metade da capacidade." },
            { title: "Pessoal", text: "Água para hidratação e uma blusa de frio para a madrugada." },
        ],
        faqData: [
            { q: "É uma corrida?", a: "Não. É um passeio de estrada focado em direção e presença, não em velocidade. As leis de trânsito devem ser rigorosamente seguidas." },
            { q: "Posso levar acompanhante?", a: "Sim, um acompanhante é bem-vindo. Ele(a) deve adquirir um dos pacotes de inscrição individualmente para garantir sua participação." },
            { q: "Qual o ponto de encontro?", a: "O ponto de encontro exato e o horário são compartilhados apenas com os participantes inscritos, no grupo oficial do evento." },
            { q: "Como é feito o pagamento?", a: "As inscrições são solicitadas via WhatsApp e o pagamento é processado por link de pagamento ou PIX." },
            { q: "E se chover?", a: "O evento ocorre com chuva leve. Em caso de condições climáticas severas que comprometam a segurança, a organização poderá adiar o evento, e os participantes serão notificados." },
        ],
    },
    en: {
        runRules: [
            { title: "1. Participation", points: ["1.1. RUN 001 is an invitation-only event with limited spots.", "1.2. Registration is personal and non-transferable.", "1.3. The participant declares they are fit to operate a motor vehicle."] },
            { title: "2. Vehicles", points: ["2.1. The vehicle must be in minimum safe operating condition.", "2.2. Lights, brakes, and tires must be in perfect working order.", "2.3. Participation with vehicles in an irregular situation is not permitted."] },
            { title: "3. Driving and Safety", points: ["3.1. This is not a race. Full respect for road limits and traffic laws.", "3.2. Formation and distance: Maintain a safe distance. No tailgating.", "3.3. No maneuvers / show-offs: Burnouts, rev-bombing, drifting, drag racing are forbidden.", "3.4. Regrouping point: If separated, proceed to point X and regroup. No chasing.", "3.5. The RUN does not condone recklessness or irresponsible showmanship."] },
            { title: "4. Alcohol and Substances", points: ["4.1. Zero tolerance for alcohol before or during driving.", "4.2. Use of illicit substances results in immediate exclusion."] },
            { title: "5. Organization and Communication", points: ["5.1. Instructions from the organization must be followed without exception.", "5.2. Communication: Official channel (WhatsApp) + 1 emergency number for the organizer.", "5.3. Passenger / ride-along: 1 companion per car is allowed, upon individual registration.", "5.4. Exclusion criteria: Any risky behavior = immediate removal from the event (no refund)."] },
            { title: "6. Responsibility", points: ["6.1. Each participant is responsible for themselves, their vehicle, and their actions.", "6.2. The organization is not responsible for fines, accidents, or damages."] }
        ],
        codeOfConduct: {
            intro: "This is not an ordinary drive.\nIt is a journey with purpose.",
            points: [
                { title: "Presence", text: "Be truly there.\nNo distractions, no inflated egos." },
                { title: "Respect", text: "Respect the road.\nRespect others.\nRespect those who came before and those who come after." },
                { title: "Discipline", text: "Freedom only exists with control.\nThose who don't understand this do not belong in the RUN." },
                { title: "Silence when necessary", text: "Not every moment calls for noise.\nSome call for attention." },
                { title: "Style", text: "It's not about showing off.\nIt's about posture." },
                { title: "Spirit", text: "The RUN begins before the start\nand continues after the finish." }
            ],
            outro: "Those not seeking this, perhaps this RUN is not the right place for them."
        },
        refundPolicy: [
            { intro: "VERTICE RUN #001 is currently in the internal organization phase. The confirmation of the date and route will be communicated to registered participants before the event.\n\nAs this is an event with limited spots and operational costs, our refund policy follows clear criteria:" },
            { title: "1. Cancellation by the participant", points: [{ subhead: "1.1. Before date confirmation", text: "As long as there is no confirmed date, a full refund (100%) is always possible." }, { subhead: "1.2. After date confirmation", text: "The following deadlines, calculated from the date of purchase, will apply:\n• Full refund (100%): Requested within 7 days.\n• Partial refund (50%): Requested after 7 days from purchase, up to 72 hours before the event.\n• No refund: Requests made less than 72 hours in advance or no-shows." }] },
            { title: "2. Cancellation or changes by the organization", points: [{ subhead: "2.1. Event cancellation", text: "In case of total cancellation, the participant may choose a full refund (100%) or full credit for a future edition." }, { subhead: "2.2. Changes to route, schedule, or program", text: "The organization reserves the right to make adjustments for safety, weather, or force majeure reasons. In such cases, no refund will be due, provided the event is held. If the change is substantial (e.g., date change), the participant may opt for full credit for the next edition." }] },
            { title: "3. Personalized items", points: [{ subhead: "3.1. Shirts and exclusive materials", text: "Personalized or on-demand items are non-refundable, except in case of manufacturing defects." }] },
            { title: "4. How to request a refund", points: [{ subhead: "4.1. Channel", text: "Requests must be made through the official event email or WhatsApp." }, { subhead: "4.2. Required information", text: "Send full name, ID number (CPF), proof of payment, and the purchased package." }, { subhead: "4.3. Timeline", text: "The refund will be processed within 10 business days." }] },
            { title: "5. Acceptance", points: [{ subhead: "By registering, the participant declares to agree with this policy.", text: null }] }
        ],
        whatToBring: [
            { title: "Documentation", text: "Valid driver's license and vehicle registration." },
            { title: "Vehicle", text: "Serviced, especially brakes and tires. Fuel tank more than half full." },
            { title: "Personal", text: "Water for hydration and a warm jacket for the early morning." },
        ],
        faqData: [
            { q: "Is it a race?", a: "No. It is a road drive focused on driving and presence, not speed. Traffic laws must be strictly followed." },
            { q: "Can I bring a companion?", a: "Yes, one companion is welcome. They must purchase one of the individual registration packages to guarantee their participation." },
            { q: "What is the meeting point?", a: "The exact meeting point and time are shared only with registered participants in the official event group." },
            { q: "How is payment made?", a: "Registrations are requested via WhatsApp, and payment is processed through a payment link or PIX." },
            { q: "What if it rains?", a: "The event will proceed in light rain. In case of severe weather conditions that compromise safety, the organization may postpone the event, and participants will be notified." },
        ],
    },
};
