
import * as React from 'react';

interface AnimatedTitleProps {
    text: string;
    className?: string;
}

const AnimatedTitle: React.FC<AnimatedTitleProps> = ({ text, className }) => {
    return (
        <h1 className={`font-editorial text-4xl sm:text-5xl md:text-6xl text-white tracking-wider ${className}`}>
            {text.split('').map((char, index) => (
                <span 
                    key={index}
                    className="inline-block animate-fade-in-up"
                    style={{ animationDelay: `${index * 0.05}s`, animationDuration: '0.8s' }}
                >
                    {char === ' ' ? '\u00A0' : char}
                </span>
            ))}
        </h1>
    );
};

export default AnimatedTitle;