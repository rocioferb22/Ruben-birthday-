import { CountdownCard } from './CountdownCard';
import { CountdownBanner } from './CountdownBanner';
import { useNavigate } from 'react-router';

const events = [
  {
    id: '1',
    title: 'Un regalo',
    targetDate: new Date('2026-06-22T00:00:00'),
    description: 'Algo pensado para que lo lleves contigo y te acompañe en tu día a día. Un detalle sencillo, que te hará lucir mucho más guapo de lo que ya eres',
  },
  {
    id: '2',
    title: 'Una alegría',
    targetDate: new Date('2026-06-22T00:00:00'),
    description: 'Una sorpresa que despertará todos tus sentidos. Está diseñado exclusivamente para asegurarme de dejarte con una sonrisa imborrable.',
  },
  {
    id: '3',
    title: 'Para disfrutar a largo plazo',
    targetDate: new Date('2026-06-23T18:45:00'),
    description: 'Para que nunca te quedes a medias y puedas compartir amor, alegría y gratitud con tus seres queridos.',
  },
  {
    id: '4',
    title: 'Para disfrutar a corto plazo',
    targetDate: new Date('2026-06-25T21:25:00'),
    description: 'Tendrás que aprovecharlo rápido antes de que se esfume. Un pequeño placer efímero que te dejará un buen sabor de boca.',
  },
  {
    id: '5',
    title: 'Un recuerdo',
    targetDate: new Date('2026-06-26T19:40:00'),
    description: 'Algo que no se gasta, que no caduca y que servirá para seguir construyendo nuestra historia, además de permitirnos viajar al pasado.',
  },
  {
    id: '6',
    title: 'Una sorpresa',
    targetDate: new Date('2026-06-27T12:00:00'),
    description: 'Es broma, de esto no vas a tener pistas porque sino no sería sorpresa!!.',
  },
];

export { events };

export function GiftsPage() {
  const navigate = useNavigate();

  return (
    <>
      <CountdownBanner />
      <div className="min-h-screen bg-white p-8 pb-24">
        <div className="max-w-4xl mx-auto">
          <h1
            className="text-3xl mb-8 text-center cursor-pointer hover:text-gray-600 transition-colors"
            onClick={() => navigate('/')}
          >
            Tus Regalos
          </h1>
          <div>
            {events.map((event) => (
              <CountdownCard
                key={event.id}
                id={event.id}
                title={event.title}
                targetDate={event.targetDate}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
