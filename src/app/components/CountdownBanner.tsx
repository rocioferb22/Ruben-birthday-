import { useEffect, useState } from 'react';
import { ChevronDown, ChevronUp, X } from 'lucide-react';
import { events } from './HomePage';

export function CountdownBanner() {
  const [isOpen, setIsOpen] = useState(true);
  const [isVisible, setIsVisible] = useState(true);
  const [nextEvent, setNextEvent] = useState<typeof events[0] | null>(null);
  const [timeRemaining, setTimeRemaining] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const now = new Date().getTime();
    const upcomingEvents = events
      .filter((event) => event.targetDate.getTime() > now)
      .sort((a, b) => a.targetDate.getTime() - b.targetDate.getTime());

    if (upcomingEvents.length > 0) {
      setNextEvent(upcomingEvents[0]);
    }
  }, []);

  useEffect(() => {
    if (!nextEvent) return;

    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = nextEvent.targetDate.getTime() - now;

      if (distance < 0) {
        setTimeRemaining({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeRemaining({ days, hours, minutes, seconds });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [nextEvent]);

  if (!isVisible || !nextEvent) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-gray-100 text-gray-800 shadow-lg border-t border-gray-300">
      {isOpen && (
        <div className="px-4 py-6 md:px-6 md:py-8">
          <h2 className="text-xl md:text-2xl text-center mb-4 md:mb-6">{nextEvent.title}</h2>
          <div className="flex justify-center gap-2 md:gap-4">
            <div className="flex flex-col items-center">
              <div className="bg-gray-200 rounded-lg w-16 h-16 md:w-32 md:h-32 flex items-center justify-center border border-gray-300">
                <span className="text-3xl md:text-6xl">{String(timeRemaining.days).padStart(2, '0')}</span>
              </div>
              <span className="mt-2 md:mt-3 text-xs md:text-sm uppercase tracking-wider">Días</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-gray-200 rounded-lg w-16 h-16 md:w-32 md:h-32 flex items-center justify-center border border-gray-300">
                <span className="text-3xl md:text-6xl">{String(timeRemaining.hours).padStart(2, '0')}</span>
              </div>
              <span className="mt-2 md:mt-3 text-xs md:text-sm uppercase tracking-wider">Horas</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-gray-200 rounded-lg w-16 h-16 md:w-32 md:h-32 flex items-center justify-center border border-gray-300">
                <span className="text-3xl md:text-6xl">{String(timeRemaining.minutes).padStart(2, '0')}</span>
              </div>
              <span className="mt-2 md:mt-3 text-xs md:text-sm uppercase tracking-wider">Min</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-gray-200 rounded-lg w-16 h-16 md:w-32 md:h-32 flex items-center justify-center border border-gray-300">
                <span className="text-3xl md:text-6xl">{String(timeRemaining.seconds).padStart(2, '0')}</span>
              </div>
              <span className="mt-2 md:mt-3 text-xs md:text-sm uppercase tracking-wider">Seg</span>
            </div>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between px-4 py-3 md:px-6 border-t border-gray-300">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 hover:text-gray-600 text-sm md:text-base"
        >
          {isOpen ? <ChevronDown size={18} /> : <ChevronUp size={18} />}
          <span className="hidden sm:inline">{isOpen ? 'Ocultar vista previa' : 'Mostrar vista previa'}</span>
          <span className="sm:hidden">{isOpen ? 'Ocultar' : 'Mostrar'}</span>
        </button>
        <button
          onClick={() => setIsVisible(false)}
          className="hover:text-gray-600"
        >
          <X size={20} />
        </button>
      </div>
    </div>
  );
}
