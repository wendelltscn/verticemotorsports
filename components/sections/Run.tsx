
import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { WhatsappIcon } from '../icons/SocialIcons';
import { ChevronDownIcon } from '../icons/ChevronDownIcon';

const runRules = [
    { title: "1. Participação", points: [
        "1.1. A RUN 001 é um evento para convidados, com vagas limitadas.",
        "1.2. A inscrição é pessoal e intransferível.",
        "1.3. O participante declara estar apto a conduzir veículo automotor."
    ]},
    { title: "2. Veículos", points: [
        "2.1. O veículo deve estar em condições mínimas de segurança.",
        "2.2. Luzes, freios e pneus devem estar em perfeito funcionamento.",
        "2.3. Não é permitido participar com veículos em situação irregular."
    ]},
    { title: "3. Condução e Segurança", points: [
        "3.1. Não é corrida. Respeito total aos limites da via e às leis de trânsito.",
        "3.2. Formação e distância: Manter distância segura. Nada de ‘colar’.",
        "3.3. Nada de manobra / exibição: Burnout, corte de giro, drift, arrancada: fora.",
        "3.4. Ponto de reagrupamento: Se separar, segue até o ponto X e reagrupa. Nada de caça.",
        "3.5. A RUN não compactua com imprudência ou exibição irresponsável."
    ]},
    { title: "4. Álcool e substâncias", points: [
        "4.1. Tolerância zero para álcool antes ou durante a condução.",
        "4.2. Uso de substâncias ilícitas resulta em exclusão imediata."
    ]},
    { title: "5. Organização e Comunicação", points: [
        "5.1. Instruções da organização devem ser seguidas sem exceção.",
        "5.2. Comunicação: Canal oficial (WhatsApp) + 1 número de emergência do organizador.",
        "5.3. Pax / carona: 1 acompanhante por carro é permitido, mediante inscrição individual.",
        "5.4. Critério de exclusão: Qualquer conduta de risco = retirada imediata do evento (sem reembolso)."
    ]},
    { title: "6. Responsabilidade", points: [
        "6.1. Cada participante é responsável por si, seu veículo e suas ações.",
        "6.2. A organização não se responsabiliza por multas, acidentes ou danos."
    ]}
];

const codeOfConduct = {
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
};

const refundPolicy: { intro?: string; title?: string; points?: { subhead: string; text: string | null }[] }[] = [
    { intro: "A VERTICE RUN #001 encontra-se em fase de organização interna. A confirmação da data e do percurso será comunicada aos inscritos antes da realização do evento.\n\nPor ser um evento de vagas limitadas e com custos operacionais, nossa política de reembolso segue critérios claros:" },
    { title: "1. Cancelamento por parte do participante", points: [
        { subhead: "1.1. Antes da confirmação da data", text: "Enquanto não houver data confirmada, o reembolso integral (100%) é sempre possível." },
        { subhead: "1.2. Após a confirmação da data", text: "Passam a valer os seguintes prazos, contados a partir da data de compra:\n• Reembolso integral (100%): Solicitado em até 7 dias.\n• Reembolso parcial (50%): Solicitado após 7 dias da compra, até 72 horas antes do evento.\n• Sem reembolso: Solicitações feitas com menos de 72 horas de antecedência ou não comparecimento." }
    ]},
    { title: "2. Cancelamento ou alteração por parte da organização", points: [
        { subhead: "2.1. Cancelamento do evento", text: "Em caso de cancelamento total, o participante poderá optar por reembolso integral (100%) ou crédito integral para uma próxima edição." },
        { subhead: "2.2. Alterações de percurso, horário ou programação", text: "A organização se reserva o direito de realizar ajustes por motivos de segurança, clima ou força maior. Nesses casos, não será devido reembolso, desde que o evento seja realizado. Se a alteração for substancial (ex: mudança de data), o participante poderá optar por crédito integral para a próxima edição." }
    ]},
    { title: "3. Itens personalizados", points: [
        { subhead: "3.1. Camisas e materiais exclusivos", text: "Itens personalizados ou produzidos sob demanda não são reembolsáveis, exceto em caso de defeito de fabricação." }
    ]},
    { title: "4. Como solicitar reembolso", points: [
        { subhead: "4.1. Canal", text: "As solicitações devem ser feitas pelo e-mail ou WhatsApp oficial do evento." },
        { subhead: "4.2. Dados necessários", text: "Enviar nome completo, CPF, comprovante de pagamento e pacote adquirido." },
        { subhead: "4.3. Prazo", text: "O reembolso será processado em até 10 dias úteis." }
    ]},
    { title: "5. Aceite", points: [
        { subhead: "Ao efetuar a inscrição, o participante declara estar de acordo com esta política.", text: null }
    ] }
];

const whatToBring = [
    { title: "Documentação", text: "CNH e documento do veículo válidos." },
    { title: "Veículo", text: "Revisado, especialmente freios e pneus. Tanque com mais da metade da capacidade." },
    { title: "Pessoal", text: "Água para hidratação e uma blusa de frio para a madrugada." },
];

const faqData = [
    { q: "É uma corrida?", a: "Não. É um passeio de estrada focado em direção e presença, não em velocidade. As leis de trânsito devem ser rigorosamente seguidas." },
    { q: "Posso levar acompanhante?", a: "Sim, um acompanhante é bem-vindo. Ele(a) deve adquirir um dos pacotes de inscrição individualmente para garantir sua participação." },
    { q: "Qual o ponto de encontro?", a: "O ponto de encontro exato e o horário são compartilhados apenas com os participantes inscritos, no grupo oficial do evento." },
    { q: "Como é feito o pagamento?", a: "As inscrições são solicitadas via WhatsApp e o pagamento é processado por link de pagamento ou PIX." },
    { q: "E se chover?", a: "O evento ocorre com chuva leve. Em caso de condições climáticas severas que comprometam a segurança, a organização poderá adiar o evento, e os participantes serão notificados." },
];


const Run: React.FC = () => {
    const { t, language } = useLanguage();
    const [activeInfo, setActiveInfo] = useState<'rules' | 'refund' | 'checklist' | 'faq' | null>(null);
    const [showEndgame, setShowEndgame] = useState(false);

    // Easter Egg States
    const [ctaClicks, setCtaClicks] = useState(0);
    const [showCtaSpam, setShowCtaSpam] = useState(false);
    const ctaTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
    const [packageSecret, setPackageSecret] = useState<number | null>(null);

    useEffect(() => {
        const handleScroll = () => {
            const isAtBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 50;
            if (isAtBottom && !showEndgame) {
                setShowEndgame(true);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [showEndgame]);
    
    const handleCtaClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (ctaTimer.current) clearTimeout(ctaTimer.current);

        const newCount = ctaClicks + 1;
        setCtaClicks(newCount);

        if (newCount >= 7) {
            e.preventDefault(); // Prevent navigation
            setShowCtaSpam(true);
            setTimeout(() => setShowCtaSpam(false), 4000);
            setCtaClicks(0);
        } else {
            ctaTimer.current = setTimeout(() => setCtaClicks(0), 2000);
        }
    };
    
    const handlePackageDoubleClick = (index: number) => {
        setPackageSecret(index);
        setTimeout(() => setPackageSecret(null), 3000);
    };

    const ctaLink = language === 'pt'
        ? "https://wa.me/5584991334144?text=Oi%20Wendell!%20Vim%20do%20site%20e%20gostaria%20de%20fazer%20parte%20do%20Vertice%20Run.%20"
        : "https://wa.me/5584991334144?text=Hi%20Wendell!%20I've%20come%20from%20the%20website%20and%20I%20would%20like%20more%20info%20regarding%20the%20Vertice%20Run.";
        
    const packages = [
        { key: 'option1', recommended: false },
        { key: 'option3', recommended: true },
        { key: 'option2', recommended: false },
    ];

    return (
        <div className="relative min-h-screen w-full flex flex-col items-center justify-center text-white overflow-hidden py-20 md:py-28">
            <div 
              className="absolute inset-0 bg-cover bg-center bg-fixed z-0" 
              style={{ backgroundImage: "url(https://i.imgur.com/oszZB03.png)" }}
            >
              <div className="absolute inset-0 bg-black opacity-90"></div>
            </div>

            <div className="relative z-10 p-6 flex flex-col items-center max-w-5xl mx-auto w-full">
                <header className="mb-12 md:mb-16 animate-fade-in-up-dynamic text-center">
                    <p className="font-technical uppercase text-yellow-300 tracking-[0.3em] text-sm mb-4">{t('run.event.block_title')}</p>
                    <h1 className="font-editorial text-4xl sm:text-5xl md:text-6xl text-white tracking-wider leading-tight">
                        {t('run.event.title_line1')}
                        <br />
                        <span className="text-gray-500">{t('run.event.title_line2')}</span>
                    </h1>
                    <p className="font-technical uppercase text-gray-600 tracking-[0.2em] text-sm mt-4">{t('run.event.subtitle')}</p>
                </header>
                
                <section className="w-full border border-gray-800/50 bg-black/30 p-8 md:p-12 animate-fade-in-up-dynamic delay-200">
                    
                    <div className="text-center text-2xl md:text-3xl font-editorial italic text-gray-300 leading-relaxed mb-10">
                        <p>"{t('run.event.main_text_1')}<br/>{t('run.event.main_text_2')}"</p>
                        <p className="mt-6">"{t('run.event.main_text_3')}<br/>{t('run.event.main_text_4')}"</p>
                    </div>

                    <div className="max-w-2xl mx-auto text-center text-gray-400 space-y-4 mb-12">
                        <p>{t('run.event.complementary_text_1')}</p>
                        <p>{t('run.event.complementary_text_2')}</p>
                        <p className="font-bold mt-6">{t('run.event.secrecy_notice')}</p>
                        <p className="font-editorial italic text-lg text-gray-500 mt-6">{t('run.event.closing_statement')}</p>
                    </div>

                    <div className="mb-12">
                        <img 
                            src="https://i.imgur.com/uq8woxu.png" 
                            alt={t('run.event.gallery_alt')} 
                            className="w-full h-auto object-cover grayscale contrast-125"
                        />
                    </div>

                    <div className="border-t border-gray-800 pt-10 mt-10">
                        <div className="text-center mb-8">
                             <h3 className="font-editorial text-3xl text-yellow-300 mb-2">{t('run.event.inscription_title')}</h3>
                             <p className="font-technical text-sm uppercase tracking-wider text-red-500">{t('run.event.inscription_status')}</p>
                        </div>
                        <div className="grid md:grid-cols-3 gap-6 items-stretch">
                            {packages.map((pkg, index) => (
                                <div 
                                    key={pkg.key} 
                                    onDoubleClick={() => handlePackageDoubleClick(index)}
                                    className={`flex flex-col relative cursor-help ${pkg.recommended ? 'border-2 border-yellow-300 scale-105 bg-black p-6' : 'border border-gray-800 p-6'}`}
                                >
                                    {pkg.recommended && <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-yellow-300 text-black font-technical text-xs uppercase px-3 py-1 tracking-wider">{t('run.event.packages.recommended')}</div>}
                                    <h4 className="font-editorial text-2xl text-white">{t(`run.event.packages.${pkg.key}_title`)}</h4>
                                    <p className="font-editorial text-4xl text-yellow-300 my-4">
                                        {t(`run.event.packages.${pkg.key}_price`)}
                                        <span className="text-base text-gray-500 font-technical tracking-normal"> / {t('run.event.packages.per_person')}</span>
                                    </p>
                                    <p className="text-gray-400 text-sm flex-grow mb-4">{t(`run.event.packages.${pkg.key}_desc`)}</p>
                                    {pkg.key === 'option3' && (
                                        <>
                                            <p className="font-technical text-xs uppercase tracking-wider text-yellow-300 mb-2 text-center">{t('run.event.packages.option3_extra')}</p>
                                            <p className="font-technical text-xs text-gray-500 mb-6 text-center">{t('run.event.packages.option3_extra2')}</p>
                                            <img src="https://i.imgur.com/4fCk24L.png" alt={t('run.event.shirt_alt')} className="w-40 h-auto mx-auto" />
                                        </>
                                    )}
                                     {packageSecret === index && (
                                        <p className="text-xs text-gray-700 mt-2 animate-fade-in-up text-center">
                                            {t('easter_eggs.run_packages_spam')}
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>
                        <p className="text-center text-sm text-gray-600 mt-8 italic">{t('run.event.inscription_guarantee')}</p>
                        <p className="text-center text-sm text-gray-400 mt-2">{t('run.event.inscription_clarification')}</p>
                    </div>

                    <div className="text-center mt-12">
                        <div className="flex justify-center flex-wrap gap-x-8 gap-y-3 text-sm">
                             <button onClick={() => setActiveInfo(activeInfo === 'rules' ? null : 'rules')} className={`text-gray-500 hover:text-yellow-300 underline transition-colors ${activeInfo === 'rules' ? 'text-yellow-300' : ''}`}>{t('run.event.view_rules')}</button>
                             <button onClick={() => setActiveInfo(activeInfo === 'refund' ? null : 'refund')} className={`text-gray-500 hover:text-yellow-300 underline transition-colors ${activeInfo === 'refund' ? 'text-yellow-300' : ''}`}>{t('run.event.view_refund')}</button>
                             <button onClick={() => setActiveInfo(activeInfo === 'checklist' ? null : 'checklist')} className={`text-gray-500 hover:text-yellow-300 underline transition-colors ${activeInfo === 'checklist' ? 'text-yellow-300' : ''}`}>{t('run.event.view_checklist')}</button>
                             <button onClick={() => setActiveInfo(activeInfo === 'faq' ? null : 'faq')} className={`text-gray-500 hover:text-yellow-300 underline transition-colors ${activeInfo === 'faq' ? 'text-yellow-300' : ''}`}>{t('run.event.view_faq')}</button>
                        </div>

                        <div className={`transition-all duration-700 ease-in-out text-left overflow-hidden ${activeInfo ? 'max-h-[3000px] mt-8 opacity-100' : 'max-h-0 mt-0 opacity-0'}`}>
                            <div className="p-6 md:p-8 bg-black/40 border border-gray-800/50">
                                {activeInfo === 'rules' && (
                                    <div className="space-y-6 text-sm text-gray-400 leading-relaxed font-technical animate-fade-in-up-fast">
                                        <h3 className="font-editorial text-xl text-yellow-300 uppercase tracking-widest text-center mb-6">{t('run.event.modal_rules_title')}</h3>
                                        <p className="text-center italic text-gray-500 mb-6">As regras abaixo aplicam-se a qualquer edição da VERTICE RUN, independentemente de data ou percurso.</p>
                                        {runRules.map((section, idx) => (
                                            <div key={idx}>
                                                <h4 className="font-editorial text-lg text-white mb-2">{section.title}</h4>
                                                <div className="space-y-1 pl-4">
                                                    {section.points.map((point, pIdx) => <p key={pIdx}>{point}</p>)}
                                                </div>
                                            </div>
                                        ))}
                                         <div className="border-t border-gray-800 pt-6 mt-6">
                                            <h4 className="font-editorial text-lg text-white mb-4 text-center">🧭 CÓDIGO DE CONDUTA — VERTICE RUN</h4>
                                            <p className="text-center italic whitespace-pre-wrap mb-6">{codeOfConduct.intro}</p>
                                            <div className="grid sm:grid-cols-2 gap-4">
                                                {codeOfConduct.points.map((point, idx) => (
                                                    <div key={idx} className="border border-gray-800 p-3">
                                                        <h5 className="font-bold text-gray-300 mb-1">• {point.title}</h5>
                                                        <p className="whitespace-pre-wrap text-xs">{point.text}</p>
                                                    </div>
                                                ))}
                                            </div>
                                            <p className="text-center italic whitespace-pre-wrap mt-6">{codeOfConduct.outro}</p>
                                        </div>
                                    </div>
                                )}
                                {activeInfo === 'refund' && (
                                     <div className="space-y-6 text-sm text-gray-400 leading-relaxed font-technical animate-fade-in-up-fast">
                                        <h3 className="font-editorial text-xl text-yellow-300 uppercase tracking-widest text-center mb-6">{t('run.event.modal_refund_title')}</h3>
                                        {refundPolicy.map((section, idx) => (
                                            <div key={idx}>
                                                {section.intro && <p className="whitespace-pre-wrap italic text-gray-500 mb-6 text-center">{section.intro}</p>}
                                                {section.title && <h4 className="font-editorial text-lg text-white mb-2 mt-4">{section.title}</h4>}
                                                {section.points && (
                                                    <div className="space-y-4">
                                                        {section.points.map((point, pIdx) => (
                                                            <div key={pIdx}>
                                                                {point.subhead && <p className="font-bold text-gray-200">{point.subhead}</p>}
                                                                {point.text && <p className="whitespace-pre-wrap mt-1">{point.text}</p>}
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}
                                {activeInfo === 'checklist' && (
                                     <div className="space-y-6 text-sm text-gray-400 leading-relaxed font-technical animate-fade-in-up-fast">
                                        <h3 className="font-editorial text-xl text-yellow-300 uppercase tracking-widest text-center mb-6">{t('run.event.modal_checklist_title')}</h3>
                                        <div className="grid sm:grid-cols-3 gap-6">
                                            {whatToBring.map((item, idx) => (
                                                <div key={idx} className="border border-gray-800 p-4">
                                                    <h4 className="font-bold text-gray-200 mb-2">{item.title}</h4>
                                                    <p>{item.text}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                                {activeInfo === 'faq' && (
                                     <div className="space-y-6 text-sm text-gray-400 leading-relaxed font-technical animate-fade-in-up-fast">
                                        <h3 className="font-editorial text-xl text-yellow-300 uppercase tracking-widest text-center mb-6">{t('run.event.modal_faq_title')}</h3>
                                        <div className="space-y-4">
                                            {faqData.map((item, idx) => (
                                                <div key={idx} className="border-b border-gray-800/50 pb-4">
                                                    <p className="font-bold text-gray-200">P: {item.q}</p>
                                                    <p className="mt-2">R: {item.a}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        <a 
                            href={ctaLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={handleCtaClick}
                            className="flex w-full max-w-md mx-auto items-center justify-center gap-3 font-editorial uppercase tracking-widest text-lg border-2 border-yellow-300 text-black bg-yellow-300 px-10 py-4 hover:bg-transparent hover:text-yellow-300 transition-all duration-300 ease-in-out hover:-translate-y-1 active:translate-y-0 mt-8"
                        >
                            <WhatsappIcon className="w-5 h-5" />
                            <span>{t('run.event.cta_button')}</span>
                        </a>
                        {showCtaSpam && (
                            <p className="font-technical text-xs text-gray-700 mt-4 animate-fade-in-up">
                                {t('easter_eggs.run_cta_spam')}
                            </p>
                        )}
                    </div>
                </section>

                <footer className="mt-12 text-center font-technical text-gray-700 animate-fade-in-up-dynamic delay-400">
                    <p className="uppercase tracking-widest text-sm">{t('run.event.status_line_1')}</p>
                    <p className="text-xs tracking-wider">{t('run.event.status_line_2')}</p>
                </footer>

                {showEndgame && (
                    <p className="text-center font-technical text-xs text-gray-800 mt-12 animate-fade-in-up">
                        {t('easter_eggs.run_scroll_to_end')}
                    </p>
                )}
            </div>
        </div>
    );
};

export default Run;
