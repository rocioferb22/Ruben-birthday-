import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router';

interface CountdownCardProps {
  id: string;
  title: string;
  targetDate: Date;
}

const sendEmailNotification = async (eventTitle: string, message: string) => {
  console.log(`[EMAIL NOTIFICATION] To: rubendelpo@gmail.com`);
  console.log(`[EMAIL NOTIFICATION] Event: ${eventTitle}`);
  console.log(`[EMAIL NOTIFICATION] Message: ${message}`);

  // NOTA: Para enviar emails reales, necesitarías un backend con un servicio como:
  // - Supabase Edge Functions con Resend/SendGrid
  // - API endpoint propio con nodemailer
  // - Servicio de terceros como EmailJS

  // Ejemplo de llamada a un backend:
  // await fetch('/api/send-notification', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({
  //     to: 'rubendelpo@gmail.com',
  //     subject: `Notificación: ${eventTitle}`,
  //     message: message
  //   })
  // });
};

export function CountdownCard({ id, title, targetDate }: CountdownCardProps) {
  const navigate = useNavigate();
  const [timeRemaining, setTimeRemaining] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    totalMs: 0,
  });
  const [isRed, setIsRed] = useState(false);
  const notificationsSent = useRef({
    oneDayNotified: false,
    oneHourNotified: false,
    finishedNotified: false,
    oneDayRedShown: false,
    oneHourRedShown: false,
  });

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance < 0) {
        setTimeRemaining({ days: 0, hours: 0, minutes: 0, seconds: 0, totalMs: 0 });

        if (!notificationsSent.current.finishedNotified) {
          sendEmailNotification(title, 'La cuenta atrás ha terminado');
          notificationsSent.current.finishedNotified = true;
        }
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeRemaining({ days, hours, minutes, seconds, totalMs: distance });

      // Notificación cuando queda exactamente 1 día
      const oneDayMs = 24 * 60 * 60 * 1000;
      if (distance <= oneDayMs && distance > oneDayMs - 1000 && !notificationsSent.current.oneDayNotified) {
        sendEmailNotification(title, 'Queda 1 día para el evento');
        notificationsSent.current.oneDayNotified = true;
        notificationsSent.current.oneDayRedShown = false;
      }

      // Notificación cuando queda exactamente 1 hora
      const oneHourMs = 60 * 60 * 1000;
      if (distance <= oneHourMs && distance > oneHourMs - 1000 && !notificationsSent.current.oneHourNotified) {
        sendEmailNotification(title, 'Queda 1 hora para el evento');
        notificationsSent.current.oneHourNotified = true;
        notificationsSent.current.oneHourRedShown = false;
      }

      // Mostrar en rojo durante 5 minutos cuando queda 1 día
      const fiveMinutesMs = 5 * 60 * 1000;
      if (distance <= oneDayMs && distance > oneDayMs - fiveMinutesMs && !notificationsSent.current.oneDayRedShown) {
        setIsRed(true);
        setTimeout(() => {
          setIsRed(false);
          notificationsSent.current.oneDayRedShown = true;
        }, fiveMinutesMs);
      }

      // Mostrar en rojo durante 5 minutos cuando queda 1 hora
      if (distance <= oneHourMs && distance > oneHourMs - fiveMinutesMs && !notificationsSent.current.oneHourRedShown) {
        setIsRed(true);
        setTimeout(() => {
          setIsRed(false);
          notificationsSent.current.oneHourRedShown = true;
        }, fiveMinutesMs);
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [targetDate, title]);

  return (
    <div
      onClick={() => navigate(`/event/${id}`)}
      className="flex justify-between items-center py-4 cursor-pointer hover:bg-gray-100"
    >
      <div className="text-left">
        <span className="text-lg">{title}</span>
      </div>
      <div className="text-right">
        <span className={`font-mono ${isRed ? 'text-red-600' : ''}`}>
          {timeRemaining.days}d {timeRemaining.hours}h {timeRemaining.minutes}m {timeRemaining.seconds}s
        </span>
      </div>
    </div>
  );
}
