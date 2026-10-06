import { useState, useEffect } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isStuck, setIsStuck] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsStuck(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`nav ${isStuck ? 'stuck' : ''}`} id="nav">
      <div className="in">
        <a className="logo" href="#top" aria-label="SlyceUp home">
          <img src="/src/assets/img/logo.png" width="133" height="34" alt="SlyceUp" />
        </a>
        <nav aria-label="Primary">
          <ul id="menu" className={isMenuOpen ? 'open' : ''}>
            <li><a href="#philosophy" onClick={() => setIsMenuOpen(false)}>SlyceUp Philosophy</a></li>
            <li><a href="#how" onClick={() => setIsMenuOpen(false)}>How it works</a></li>
            <li><a href="#early" onClick={() => setIsMenuOpen(false)}>For early users</a></li>
          </ul>
        </nav>
        <a className="pill" href="#early">Request early access</a>
        <button 
          className="burger" 
          aria-expanded={isMenuOpen} 
          aria-controls="menu" 
          aria-label="Menu"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <i></i>
        </button>
      </div>
    </header>
  );
}
