import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Hero from './components/playScene/HeroScene/Hero';
import MainScene from './components/playScene/MainScene';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/play" element={<MainScene />} />
        <Route path="/" element={<Hero />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
