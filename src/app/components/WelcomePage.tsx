import { useNavigate } from 'react-router';

export function WelcomePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-8">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl mb-8">¡Feliz 22 Cumpleaños!</h1>
        <p className="text-lg md:text-xl leading-relaxed mb-12">
          Al ser tu 22 cumpleaños, tenía que hacer algo especial y no me podía quedar atrás con los otros regalos que te he hecho. Así que, aquí encontrarás un poco de qué son cada uno, pero... paciencia porque no podrás verlos hasta 1 día antes.
        </p>
        <button
          onClick={() => navigate('/regalos')}
          className="px-8 py-4 bg-black text-white text-lg hover:bg-gray-800 transition-colors"
        >
          Tus regalos
        </button>
      </div>
    </div>
  );
}
