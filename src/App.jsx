import { useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Philosophy from './components/Philosophy';
import HowItWorks from './components/HowItWorks';
import Sprites from './components/Sprites';
import useSmoothScroll from './hooks/useSmoothScroll';
import useTextFade from './hooks/useTextFade';

function App() {
  const scrollRef = useSmoothScroll();
  useTextFade(scrollRef);
  useEffect(() => {
    document.documentElement.classList.add('js');
    return () => document.documentElement.classList.remove('js');
  }, []);
  useEffect(() => {
    const initialHash = window.location.hash;
    if (!initialHash) return undefined;
    const initialScroll = window.scrollY;
    let active = true;
    document.fonts.ready.then(() => {
      // Do not interrupt a navigation or manual scroll while fonts are loading.
      if (!active || window.location.hash !== initialHash || Math.abs(window.scrollY - initialScroll) > 2) return;
      const target = document.getElementById(initialHash.slice(1));
      if (!target) return;
      if (scrollRef.current) {
        scrollRef.current.resize();
        scrollRef.current.scrollTo(window.scrollY + target.getBoundingClientRect().top);
      }
      else target.scrollIntoView({ behavior: 'auto' });
    });
    return () => { active = false; };
  }, [scrollRef]);

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
