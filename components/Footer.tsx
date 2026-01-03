
import React from 'react';
import { InstagramIcon, YoutubeIcon } from './icons/SocialIcons';

const Footer: React.FC = () => {
    return (
        <footer className="bg-black border-t border-gray-900">
            <div className="container mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center text-center md:text-left">
                <div className="mb-4 md:mb-0">
                     <img src="https://i.imgur.com/BHt2WyD.png" alt="VERTICE Motorsports Logo" className="h-8 w-auto mb-2 mx-auto md:mx-0" />
                    <p className="text-gray-500 text-xs font-technical">© {new Date().getFullYear()} VERTICE MOTORSPORTS. Todos os direitos reservados.</p>
                </div>
                <div className="flex space-x-6 mb-4 md:mb-0">
                    <a href="https://www.instagram.com/verticemotorsports/" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-yellow-300 transition-colors duration-300">
                        <InstagramIcon className="w-6 h-6" />
                    </a>
                    <a href="https://www.youtube.com/@VerticeMotorsports" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-yellow-300 transition-colors duration-300">
                        <YoutubeIcon className="w-6 h-6" />
                    </a>
                </div>
                <div>
                    <p className="font-editorial text-gray-600 tracking-wider">Die Never.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;