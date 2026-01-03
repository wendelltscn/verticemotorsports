
import React, { useState } from 'react';

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

const Contato: React.FC = () => {
    const [status, setStatus] = useState<FormStatus>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus('submitting');
        setErrorMessage('');

        const formData = new FormData(e.currentTarget);

        try {
            const response = await fetch('https://getform.io/f/broxglna', {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json',
                },
            });

            if (response.ok) {
                setStatus('success');
            } else {
                const data = await response.json();
                setErrorMessage(data.error || 'Ocorreu um erro. Por favor, tente novamente.');
                setStatus('error');
            }
        } catch (error) {
            setErrorMessage('Falha de conexão. Por favor, verifique sua rede e tente novamente.');
            setStatus('error');
        }
    };


    return (
        <div className="bg-black py-20 sm:py-28">
            <div className="container mx-auto px-6">
                <header className="text-center mb-16 md:mb-24">
                    <h1 className="font-editorial text-4xl md:text-6xl text-white tracking-wider mb-4">CONTATO</h1>
                    <p className="font-technical text-gray-500 max-w-2xl mx-auto">
                        Conversas iniciam revoluções. Projetos constroem o futuro.
                    </p>
                </header>

                <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="text-gray-400">
                        <h3 className="font-editorial text-2xl text-white mb-6">Inicie uma Conversa</h3>
                        <p className="mb-4">Para projetos, consultoria ou parcerias, utilize o formulário ao lado. Nossa equipe técnica retornará o contato para entender a profundidade da sua visão.</p>
                        <p className="mb-6">Para questões gerais ou para se conectar com o movimento, encontre-nos em nossas redes sociais ou envie um e-mail.</p>
                        
                        <div className="space-y-3 font-technical">
                            <p><strong>Email:</strong> <a href="mailto:verticemotorsports@gmail.com" className="text-yellow-300 hover:underline">verticemotorsports@gmail.com</a></p>
                            <p><strong>Telefone:</strong> <span className="text-gray-500">(Reservado para projetos ativos)</span></p>
                        </div>
                    </div>

                    <div>
                        {status === 'success' ? (
                            <div className="h-full flex flex-col justify-center items-center bg-transparent border border-gray-800 p-8 text-center">
                                <h3 className="font-editorial text-2xl text-yellow-300 mb-4">Mensagem Enviada</h3>
                                <p className="text-gray-300">Recebemos sua visão. Nossa equipe técnica retornará o contato em breve. A construção começou.</p>
                            </div>
                        ) : (
                             <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label htmlFor="name" className="sr-only">Nome</label>
                                    <input type="text" id="name" name="name" placeholder="Seu Nome" required className="w-full bg-transparent border border-gray-700 text-white p-3 focus:border-yellow-300 focus:outline-none transition-colors" />
                                </div>
                                <div>
                                    <label htmlFor="email" className="sr-only">Email</label>
                                    <input type="email" id="email" name="email" placeholder="Seu Email" required className="w-full bg-transparent border border-gray-700 text-white p-3 focus:border-yellow-300 focus:outline-none transition-colors" />
                                </div>
                                <div>
                                    <label htmlFor="message" className="sr-only">Mensagem</label>
                                    <textarea id="message" name="message" rows={5} placeholder="Sua Visão..." required className="w-full bg-transparent border border-gray-700 text-white p-3 focus:border-yellow-300 focus:outline-none transition-colors"></textarea>
                                </div>
                                <div>
                                    <button 
                                        type="submit" 
                                        disabled={status === 'submitting'}
                                        className="w-full font-editorial uppercase tracking-widest text-lg border-2 border-yellow-300 text-black bg-yellow-300 px-10 py-4 hover:bg-transparent hover:text-yellow-300 transition-all duration-300 ease-in-out disabled:bg-gray-600 disabled:border-gray-600 disabled:text-gray-400 disabled:cursor-not-allowed"
                                    >
                                        {status === 'submitting' ? 'Enviando...' : 'Construir Algo Eterno'}
                                    </button>
                                </div>
                                {status === 'error' && (
                                    <p className="text-red-500 text-sm text-center">{errorMessage}</p>
                                )}
                            </form>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Contato;
