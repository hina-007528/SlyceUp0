import { useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Philosophy from './components/Philosophy';
import HowItWorks from './components/HowItWorks';
import Sprites from './components/Sprites';

function App() {
  useEffect(() => {
    const initialHash = window.location.hash;
    if (!initialHash) return undefined;
    const initialScroll = window.scrollY;
    let active = true;
    document.fonts.ready.then(() => {
      // Do not interrupt a navigation or manual scroll while fonts are loading.
      if (!active || window.location.hash !== initialHash || Math.abs(window.scrollY - initialScroll) > 2) return;
      // "auto" respects CSS smooth scrolling and the reduced-motion override.
      document.getElementById(initialHash.slice(1))?.scrollIntoView({ behavior: 'auto' });
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
