import Header from './components/Header';
import Hero from './components/Hero';
import Philosophy from './components/Philosophy';
import HowItWorks from './components/HowItWorks';
import Sprites from './components/Sprites';

function App() {
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
