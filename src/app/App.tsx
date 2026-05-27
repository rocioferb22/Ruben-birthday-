import { BrowserRouter, Routes, Route } from 'react-router';
import { WelcomePage } from './components/WelcomePage';
import { GiftsPage } from './components/HomePage';
import { EventDetail } from './components/EventDetail';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/regalos" element={<GiftsPage />} />
        <Route path="/event/:id" element={<EventDetail />} />
      </Routes>
    </BrowserRouter>
  );
}