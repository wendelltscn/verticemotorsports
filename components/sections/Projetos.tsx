
import * as React from 'react';
import type { Project } from '../../types';
import { useLanguage } from '../../context/LanguageContext';
import { projectsData } from '../../data/projectsData';
import AnimatedTitle from '../AnimatedTitle';

const ProjectCard: React.FC<{ project: Project; onClick: () => void; isBlueprintMode: boolean }> = ({ project, onClick, isBlueprintMode }) => {
    const { t } = useLanguage();
    const cardClasses = isBlueprintMode ? 'blueprint-card font-technical' : '';
    const titleClasses = isBlueprintMode ? 'font-technical' : 'font-editorial';
    
    return (
        <div className={`group relative overflow-hidden bg-black cursor-pointer aspect-[4/3] transition-transform duration-500 hover:-translate-y-1 ${cardClasses}`} onClick={onClick}>
            <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-overlay-bottom z-10"></div>
            
            <div className="absolute inset-0 bg-overlay-60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                <span className="font-editorial text-white tracking-widest border border-white px-4 py-2 text-sm">
                    {t('shared.view_details')}
                </span>
            </div>

            <div className="absolute bottom-0 left-0 p-6 md:p-8 w-full z-10">
                <span className={`font-technical text-xs uppercase tracking-widest px-2 py-1 ${project.status === 'Finalizado' || project.status === 'Finished' ? 'bg-green-400/20 text-green-300' : 'bg-yellow-300/20 text-yellow-300'}`}>
                    {project.status}
                </span>
                <h3 className={`${titleClasses} text-2xl md:text-3xl text-white mt-2`}>{project.title}</h3>
            </div>
        </div>
    );
};

const ProjectModal: React.FC<{ 
    project: Project; 
    onClose: () => void;
    isBlueprintMode: boolean;
}> = ({ project, onClose, isBlueprintMode }) => {
    const { t } = useLanguage();
    const [activeHotspot, setActiveHotspot] = React.useState<number | null>(null);
    const [logbookClicks, setLogbookClicks] = React.useState(0);
    const [isLogbookGlitched, setIsLogbookGlitched] = React.useState(false);
    const glitchMessages = t('easter_eggs.logbook_glitch').split('|');

    // Hotspot hover easter egg
    const [secretHotspot, setSecretHotspot] = React.useState<number | null>(null);
    const [hoverTracker, setHoverTracker] = React.useState<{ index: number | null, count: number }>({ index: null, count: 0 });
    const hoverTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null);

    // Spec check easter egg
    const [specSecret, setSpecSecret] = React.useState<number | null>(null);

    React.useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);

    const handleLogbookClick = () => {
        const newCount = logbookClicks + 1;
        setLogbookClicks(newCount);
        if (newCount >= 5) {
            setIsLogbookGlitched(true);
            setTimeout(() => {
                setIsLogbookGlitched(false);
                setLogbookClicks(0);
            }, 4000);
        }
    };

    const handleHotspotMouseEnter = (index: number) => {
        setActiveHotspot(index);
        if (secretHotspot !== null) return; // Don't track if egg is active

        if (hoverTimer.current) clearTimeout(hoverTimer.current);

        const newCount = hoverTracker.index === index ? hoverTracker.count + 1 : 1;
        setHoverTracker({ index, count: newCount });

        if (newCount >= 10) {
            setSecretHotspot(index);
            setTimeout(() => {
                setSecretHotspot(null);
            }, 4000);
            setHoverTracker({ index: null, count: 0 });
        }

        hoverTimer.current = setTimeout(() => setHoverTracker({ index: null, count: 0 }), 1500);
    };

    const handleSpecDoubleClick = (index: number) => {
        setSpecSecret(index);
        setTimeout(() => setSpecSecret(null), 3000);
    };
    
    const modalClasses = isBlueprintMode ? 'font-technical blueprint-modal' : '';
    const headingClasses = isBlueprintMode ? 'font-technical' : 'font-editorial';

    return (
        <div className="fixed inset-0 bg-overlay-95 z-[100] flex items-center justify-center p-4 animate-fade-in-up-fast" onClick={onClose} style={{animationDuration: '0.5s'}}>
            
            <div className={`relative bg-modal max-w-6xl w-full max-h-[90vh] overflow-y-auto border border-blue-400/30 ${modalClasses}`} onClick={e => e.stopPropagation()}>
                
                 <button 
                    onClick={onClose} 
                    className="absolute top-4 right-4 z-20 p-2 bg-overlay-50 rounded-full text-gray-400 hover:text-white transition-all duration-300 hover:rotate-90"
                    aria-label="Close"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>

                <div className="grid grid-cols-1 md:grid-cols-7">
                    <div className="md:col-span-4 h-64 md:h-auto relative">
                        <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                         {project.hotspots && project.hotspots.map((hotspot, index) => (
                            <React.Fragment key={index}>
                                <button
                                    onMouseEnter={() => handleHotspotMouseEnter(index)}
                                    onMouseLeave={() => setActiveHotspot(null)}
                                    className="absolute w-6 h-6 -translate-x-1/2 -translate-y-1/2"
                                    style={{ left: hotspot.x, top: hotspot.y }}
                                >
                                    <span className="block w-full h-full bg-yellow-300/80 rounded-full hotspot-pulse border-2 border-black/50"></span>
                                </button>
                                 <div 
                                    className={`absolute p-3 text-sm font-technical bg-overlay-80 backdrop-blur-sm border border-yellow-300/50 text-white rounded-md w-48 transition-all duration-300 pointer-events-none -translate-x-1/2 ${activeHotspot === index ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}`}
                                    style={{ left: hotspot.x, top: `calc(${hotspot.y} - 1.75rem)`, transform: 'translateX(-50%) translateY(-100%)' }}
                                >
                                    {secretHotspot === index ? t('easter_eggs.hotspot_spam') : hotspot.text}
                                </div>
                            </React.Fragment>
                        ))}
                    </div>
                    
                    <div className="md:col-span-3 p-8 md:p-10 flex flex-col">
                         <div className="pb-6 border-b border-blue-400/20">
                            <h2 className={`${headingClasses} text-3xl md:text-4xl text-white`}>{project.title}</h2>
                            <span className={`font-technical text-xs uppercase tracking-widest px-2 py-1 mt-2 inline-block ${project.status === 'Finalizado' || project.status === 'Finished' ? 'bg-green-400/20 text-green-300' : 'bg-yellow-300/20 text-yellow-300'}`}>
                                {project.status}
                            </span>
                        </div>

                        <div className="space-y-6 text-gray-400 my-6 flex-grow">
                            <div>
                                <h4 className={`${headingClasses} text-lg text-yellow-300 mb-2`}>{t('projetos.modal.concept')}</h4>
                                <p className="text-sm leading-relaxed">{project.concept}</p>
                            </div>
                            <div>
                                <h4 className={`${headingClasses} text-lg text-yellow-300 mb-2`}>{t('projetos.modal.problem')}</h4>
                                <p className="text-sm leading-relaxed">{project.problem}</p>
                            </div>
                             <div>
                                <h4 className={`${headingClasses} text-lg text-yellow-300 mb-2`}>{t('projetos.modal.solution')}</h4>
                                <p className="text-sm leading-relaxed">{project.solution}</p>
                            </div>
                        </div>

                        <div className="pt-6 border-t border-blue-400/20">
                             <h4 className={`${headingClasses} text-lg text-yellow-300 mb-4`}>{t('projetos.modal.specs')}</h4>
                             <ul className="list-disc list-inside space-y-2 font-technical text-gray-300 columns-1 sm:columns-2 text-sm">
                                {project.specs.map((spec, i) => (
                                    <li key={i} onDoubleClick={() => handleSpecDoubleClick(i)} className="relative cursor-help py-1">
                                        {spec}
                                        {specSecret === i && (
                                            <span className="absolute left-6 top-full text-gray-700 text-xs animate-fade-in-up">
                                                {t('easter_eggs.spec_check')}
                                            </span>
                                        )}
                                    </li>
                                ))}
                             </ul>
                        </div>
                    </div>
                </div>

                {project.logbook && project.logbook.length > 0 && (
                    <div className="border-t border-blue-400/20 p-8 md:p-10 bg-overlay-30">
                        <h3 onClick={handleLogbookClick} className={`${headingClasses} text-2xl text-white mb-6 cursor-pointer select-none`}>{t('projetos.modal.logbook_title')}</h3>
                        <div className="relative pl-6 space-y-8 border-l-2 border-dashed border-blue-400/30">
                           {isLogbookGlitched ? (
                                <div className="relative">
                                    <div className="absolute -left-[34px] top-1 w-4 h-4 bg-red-500/50 rounded-full border-4 border-modal"></div>
                                    <p className="font-technical text-xs text-red-400 uppercase tracking-widest">DATA CORRUPTION DETECTED</p>
                                    <p className="mt-2 text-red-300 leading-relaxed">{glitchMessages[Math.floor(Math.random() * glitchMessages.length)]}</p>
                                </div>
                           ) : (
                                project.logbook.map((entry, index) => (
                                    <div key={index} className="relative">
                                        <div className="absolute -left-[34px] top-1 w-4 h-4 bg-blue-500/50 rounded-full border-4 border-modal"></div>
                                        <p className="font-technical text-xs text-yellow-300 uppercase tracking-widest">{entry.date}</p>
                                        <p className="mt-2 text-gray-400 leading-relaxed">{entry.update}</p>
                                    </div>
                                ))
                           )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

const Projetos: React.FC<{ isBlueprintMode?: boolean }> = ({ isBlueprintMode = false }) => {
    const [selectedProjectIndex, setSelectedProjectIndex] = React.useState<number | null>(null);
    const { language, t } = useLanguage();
    
    const currentProjects = projectsData[language];

    const handleSelectProject = (index: number) => {
        setSelectedProjectIndex(index);
    };

    const handleCloseModal = React.useCallback(() => {
        setSelectedProjectIndex(null);
    }, []);

    const selectedProject = selectedProjectIndex !== null ? currentProjects[selectedProjectIndex] : null;
    
    const pageClasses = isBlueprintMode ? 'blueprint-active' : '';

    return (
        <div className={`w-full min-h-screen bg-black py-20 md:py-28 transition-colors duration-500 ${pageClasses}`}>
            {isBlueprintMode && (
                <style>{`
                    .blueprint-active {
                        background-color: #0A0F1A;
                        color: #93C5FD;
                    }
                    .blueprint-active::before {
                        content: '';
                        position: fixed;
                        inset: 0;
                        background-image: linear-gradient(rgba(0, 150, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 150, 255, 0.1) 1px, transparent 1px);
                        background-size: 1.5rem 1.5rem;
                        pointer-events: none;
                        z-index: 0;
                        opacity: 0.5;
                    }
                     .blueprint-active::after {
                        content: '';
                        position: fixed;
                        inset: 0;
                        background: radial-gradient(ellipse at center, rgba(0,0,0,0) 50%, rgba(0,0,0,1) 100%);
                        pointer-events: none;
                        z-index: 0;
                    }
                    .blueprint-active .font-editorial, .blueprint-active h3, .blueprint-active p {
                        text-shadow: 0 0 5px rgba(147, 197, 253, 0.5);
                    }
                    .blueprint-card {
                        border: 1px solid rgba(0, 150, 255, 0.3);
                        background: rgba(10, 15, 26, 0.5);
                    }
                    .blueprint-card img {
                        filter: sepia(1) saturate(5) hue-rotate(180deg) brightness(0.8) contrast(1.2);
                        opacity: 0.8;
                    }
                    .blueprint-modal h2, .blueprint-modal h3, .blueprint-modal h4 {
                        font-family: 'Roboto Mono', monospace !important;
                        text-shadow: 0 0 5px rgba(253, 224, 71, 0.6);
                    }
                `}</style>
            )}
            <header className="text-center pb-12 md:pb-16 px-6 relative z-10">
                <AnimatedTitle text={t('projetos.title')} />
                <p className="font-technical text-gray-500 max-w-2xl mx-auto mt-4 animate-fade-in-up-fast delay-300">
                    {t('projetos.subtitle')}
                </p>
            </header>

            <div className="container mx-auto px-6 animate-fade-in-up-fast delay-400 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {currentProjects.map((p, index) => (
                        <ProjectCard key={p.id} project={p} onClick={() => handleSelectProject(index)} isBlueprintMode={isBlueprintMode} />
                    ))}
                </div>
            </div>

            {selectedProject && (
                <ProjectModal 
                    project={selectedProject} 
                    onClose={handleCloseModal}
                    isBlueprintMode={isBlueprintMode}
                />
            )}
        </div>
    );
};

export default Projetos;