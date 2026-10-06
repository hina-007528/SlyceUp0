import { useState } from 'react';
import bowlImg from '../assets/img/hero-bowl.webp';
import phoneImg from '../assets/img/hero-phone.webp';

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
    setHint("Thanks — you're on the list.");
    e.target.reset();
  };

  return (
    <section className="hero" id="early" aria-labelledby="h1">
      <div className="layer rays"></div>
      <svg className="layer sprig" viewBox="0 0 300 120" aria-hidden="true"><use href="#sp"/></svg>
      <div className="layer napkin"></div>
      <div className="layer stripe"></div>
      
      <div className="art" aria-hidden="false">
        <div className="layer cast"></div>
        <img className="bowl" src={bowlImg} width="900" height="842" alt="Bowl of ramen with shiitake, corn, nori, bok choy and a soft-boiled egg" fetchPriority="high" />
        <img className="phone" src={phoneImg} width="520" height="1080" alt="SlyceUp app showing a ramen meal: warm, comforting, with layered depth" fetchPriority="high" />
      </div>
      
      <div className="hero-copy">
        <p className="eyebrow">The philosophy behind Slyceup</p>
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
    </section>
  );
}
