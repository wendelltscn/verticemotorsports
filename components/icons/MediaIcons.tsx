

import React from 'react';

export function FilmIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"></rect>
            <line x1="7" y1="2" x2="7" y2="22"></line>
            <line x1="17" y1="2" x2="17" y2="22"></line>
            <line x1="2" y1="12" x2="22" y2="12"></line>
            <line x1="2" y1="7" x2="7" y2="7"></line>
            <line x1="2" y1="17" x2="7" y2="17"></line>
            <line x1="17" y1="17" x2="22" y2="17"></line>
            <line x1="17" y1="7" x2="22" y2="7"></line>
        </svg>
    );
}

export function DroneIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <path d="M12 18.5A2.5 2.5 0 0 1 9.5 16a2.5 2.5 0 0 1 5 0 2.5 2.5 0 0 1-2.5 2.5Z"></path>
            <path d="M12 10.41V16"></path>
            <path d="m18.5 7.5-2.22 2.22"></path>
            <path d="m5.5 7.5 2.22 2.22"></path>
            <path d="M18.88 3.52A4.1 4.1 0 0 0 16 2a4.1 4.1 0 0 0-2.88 1.52"></path>
            <path d="M5.12 3.52A4.1 4.1 0 0 1 8 2a4.1 4.1 0 0 1 2.88 1.52"></path>
            <path d="M16 10.5a2.5 2.5 0 1 1 5 0 2.5 2.5 0 0 1-5 0Z"></path>
            <path d="M3 10.5a2.5 2.5 0 1 1 5 0 2.5 2.5 0 0 1-5 0Z"></path>
        </svg>
    );
}

export function MicIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
            <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
            <line x1="12" y1="19" x2="12" y2="23"></line>
            <line x1="8" y1="23" x2="16" y2="23"></line>
        </svg>
    );
}

export function EditIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
         <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
        </svg>
    );
}