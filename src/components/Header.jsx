import { useState, useEffect, useRef } from 'react';
import logoImg from '../assets/img/logo.png';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isStuck, setIsStuck] = useState(false);
  const headerRef = useRef(null);
  const menuButtonRef = useRef(null);

  useEffect(() => {
    let frame = 0;
    let previousStuck = null;
    const updateScrollState = () => {
      frame = 0;
      const nextStuck = window.scrollY > 20;
      if (nextStuck !== previousStuck) {
        previousStuck = nextStuck;
        setIsStuck(nextStuck);
      }
    };
    const handleScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(updateScrollState);
    };
    updateScrollState();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    if (!isMenuOpen) return undefined;
    const handlePointerDown = (event) => {
      if (headerRef.current && !headerRef.current.contains(event.target)) setIsMenuOpen(false);
    };
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMenuOpen]);

  return (
    <header className={`nav ${isStuck ? 'stuck' : ''}`} id="nav" ref={headerRef}>
      <div className="in">
        <a className="logo" href="#top" aria-label="SlyceUp home">
          <img src={logoImg} width="133" height="34" alt="SlyceUp" />
        </a>
        <nav aria-label="Primary navigation">
          <ul id="menu" className={isMenuOpen ? 'open' : ''}>
            <li><a href="#philosophy" onClick={() => setIsMenuOpen(false)}>SlyceUp Philosophy</a></li>
            <li><a href="#how" onClick={() => setIsMenuOpen(false)}>How it works</a></li>
            <li><a href="#early" onClick={() => setIsMenuOpen(false)}>For early users</a></li>
          </ul>
        </nav>
        <a className="pill" href="#early">Request early access</a>
        <button
          ref={menuButtonRef}
          className="burger"
          aria-expanded={isMenuOpen}
          aria-controls="menu"
          aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          <i></i>
        </button>
      </div>
    </header>
  );
}
