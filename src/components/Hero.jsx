import { useState } from 'react';
import bowlImg from '../assets/img/hero-bowl.webp';
import phoneImg from '../assets/img/figma-hero-phone.webp';

export default function Hero() {
  const [hint, setHint] = useState('Be the first to try SlyceUp.');

  const handleSubmit = (e) => {
    e.preventDefault();
    const emailField = e.target.email;
    if (!emailField.checkValidity() || !emailField.value) {
      setHint('Please enter a valid email address.');
      emailField.focus();
      return;
    }
    setHint("Early access sign-up isn't connected yet. Please check back soon.");
  };

  return (
    <section className="hero" id="early" aria-labelledby="h1">
      <div className="layer rays"></div>
      <svg className="layer sprig" viewBox="0 0 300 120" aria-hidden="true"><use href="#sp"/></svg>
      <div className="layer glass" aria-hidden="true" />
      <div className="layer napkin"></div>
      <div className="layer stripe"></div>
      
      <div className="hero-inner">
      <div className="art" aria-label="A meal and SlyceUp meal-reading app">
        <div className="layer cast"></div>
        <img className="bowl" src={bowlImg} width="900" height="842" alt="Bowl of ramen with shiitake, corn, nori, bok choy and a soft-boiled egg" fetchPriority="high" />
        <img className="phone" src={phoneImg} width="212" height="453" alt="SlyceUp meal reading for ramen, with context and personal insights" fetchPriority="high" />
      </div>
      
      <div className="hero-copy">
        <p className="eyebrow">Reading your meal</p>
        <h1 id="h1">See what your meal may reveal.</h1>
        <p className="sub">Food, context, and timing shape how it may feel.</p>
        
        <form className="form" id="form" noValidate onSubmit={handleSubmit}>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <rect x="3" y="5" width="18" height="14" rx="2"/>
            <path d="m3.5 7 8.5 6 8.5-6"/>
          </svg>
          <label className="sr" htmlFor="email">Email address</label>
          <input id="email" name="email" type="email" required autoComplete="email" placeholder="you@yourname.com" />
          <button className="pill" type="submit">
            <span className="d b">Request early access</span>
            <span className="m b">Request</span>
          </button>
        </form>
        <p className="hint" id="hint" aria-live="polite">{hint}</p>
      </div>
      <div className="benefits" aria-label="What SlyceUp helps you understand">
        <div className="benefit">
          <span className="benefit-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M4 13h16M6 13c0 4 2 6 6 6s6-2 6-6M8 10c0-2 2-3 4-3s4 1 4 3M12 4v2M5 7l2 2M19 7l-2 2"/></svg></span>
          <span>Real meals,<br />real context</span>
        </div>
        <div className="benefit">
          <span className="benefit-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="8"/><path d="M8.5 12.5c1.5-2 5.5-2 7 0M10 9.5h.01M14 9.5h.01"/></svg></span>
          <span>Understand patterns<br />over time</span>
        </div>
        <div className="benefit">
          <span className="benefit-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M12 4v16M5 7h14M7 7l-3 7h6L7 7ZM17 7l-3 7h6l-3-7ZM8 20h8"/></svg></span>
          <span>Insights for a more<br />balanced you</span>
        </div>
      </div>
      <p className="hero-caption" aria-hidden="true">MEALS MEAN MORE WITH CONTEXT</p>
      </div>
    </section>
  );
}
