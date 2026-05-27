import { useParams, useNavigate } from 'react-router';
import { ArrowLeft, Calendar, Clock, Lock } from 'lucide-react';
import { events } from './HomePage';
import { useEffect, useState, useRef } from 'react';

const sendEmailNotification = async (eventTitle: string, message: string) => {
  console.log(`[EMAIL NOTIFICATION] To: rubendelpo@gmail.com`);
  console.log(`[EMAIL NOTIFICATION] Event: ${eventTitle}`);
  console.log(`[EMAIL NOTIFICATION] Message: ${message}`);

  // NOTA: Para enviar emails reales, necesitarías un backend con un servicio como:
  // - Supabase Edge Functions con Resend/SendGrid
  // - API endpoint propio con nodemailer
  // - Servicio de terceros como EmailJS
};

export function EventDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isUnlocked, setIsUnlocked] = useState(false);
  const notificationSent = useRef(false);

  const event = events.find((e) => e.id === id);

  useEffect(() => {
    if (!event) return;

    const checkUnlock = () => {
      const now = new Date().getTime();
      const distance = event.targetDate.getTime() - now;
      const oneDayMs = 24 * 60 * 60 * 1000;

      if (distance <= oneDayMs) {
        setIsUnlocked(true);

        if (!notificationSent.current) {
          sendEmailNotification(
            event.title,
            `¡La descripción del regalo "${event.title}" ya está disponible!`
          );
          notificationSent.current = true;
        }
      }
    };

    checkUnlock();
    const interval = setInterval(checkUnlock, 1000);

    return () => clearInterval(interval);
  }, [event]);

  if (!event) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl mb-4">Regalo no encontrado</h2>
          <button
            onClick={() => navigate('/regalos')}
            className="px-6 py-3 bg-black text-white hover:bg-gray-800 transition-colors"
          >
            Volver
          </button>
        </div>
      </div>
    );
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate('/regalos')}
          className="flex items-center gap-2 mb-8 hover:underline"
        >
          <ArrowLeft size={20} />
          <span>Volver</span>
        </button>

        <div className="border-2 border-black p-8">
          <div className="mb-8">
            <h1 className="text-3xl mb-4 border-b border-black pb-2">{event.title}</h1>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <Calendar size={16} />
                <span>{formatDate(event.targetDate)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={16} />
                <span>{formatTime(event.targetDate)}</span>
              </div>
            </div>
          </div>

          <div className="border-t border-black pt-6">
            <h2 className="text-xl mb-4">Descripción</h2>
            {isUnlocked ? (
              <p className="leading-relaxed">
                {event.description}
              </p>
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-gray-500">
                <Lock size={48} className="mb-4" />
                <p className="text-center">
                  La descripción de este regalo estará disponible 1 día antes de la fecha.
                </p>
                <p className="text-center mt-2">
                  ¡Ten paciencia!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
