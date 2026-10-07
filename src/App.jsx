import { useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Philosophy from './components/Philosophy';
import HowItWorks from './components/HowItWorks';
import Sprites from './components/Sprites';

function App() {
  useEffect(() => {
    let active = true;
    document.fonts.ready.then(() => {
      if (!active || !window.location.hash) return;
      document.getElementById(window.location.hash.slice(1))?.scrollIntoView({ behavior: 'instant' });
    });
    return () => { active = false; };
  }, []);

  return (
    <>
      <Sprites />
      <Header />
      <main id="top">
        <Hero />
        <Philosophy />
        <HowItWorks />
      </main>
    </>
  );
}

export default App;
