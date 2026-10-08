import { useState } from 'react';
import bowlImg from '../assets/img/slyceup-hero-bowl.webp';
import phoneImg from '../assets/img/slyceup-hero-phone.webp';

export default function Hero() {
  const [hint, setHint] = useState('Be the first to try SlyceUp.');
  const [isInvalid, setIsInvalid] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const emailField = e.target.email;
    if (!emailField.checkValidity() || !emailField.value) {
      setIsInvalid(true);
      setHint('Please enter a valid email address.');
      emailField.focus();
      return;
    }
    setIsInvalid(false);
    setHint("Early access sign-up isn't connected yet. Please check back soon.");
  };

  return (
    <section className="hero" id="early" aria-labelledby="h1">
      <div className="hero-inner">
      <div className="art" aria-label="A meal and SlyceUp meal-reading app">
        <img className="bowl" src={bowlImg} width="1206" height="1135" alt="Bowl of ramen with shiitake, corn, nori, bok choy and a soft-boiled egg" fetchPriority="high" />
        <img className="phone" src={phoneImg} width="825" height="1765" alt="SlyceUp meal reading for ramen, with context and personal insights" fetchPriority="high" />
      </div>
      
      <div className="hero-copy">
        <p className="eyebrow">Reading your meal</p>
        <h1 id="h1"><span>See what your</span><span>meal may reveal.</span></h1>
        <p className="sub"><span>Food, context, and timing shape</span><span>how it may feel.</span></p>
        
        <form className="form" id="form" noValidate onSubmit={handleSubmit}>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <rect x="3" y="5" width="18" height="14" rx="2"/>
            <path d="m3.5 7 8.5 6 8.5-6"/>
          </svg>
          <label className="sr" htmlFor="email">Email address</label>
          <input id="email" name="email" type="email" required autoComplete="email" placeholder="you@yourname.com"
            aria-invalid={isInvalid}
            aria-describedby={hint === 'Be the first to try SlyceUp.' ? undefined : 'hint'}
            onChange={() => {
              if (isInvalid) {
                setIsInvalid(false);
                setHint('Be the first to try SlyceUp.');
              }
            }}
          />
          <button className="pill" type="submit">
            <span className="d b">Request early access</span>
            <span className="m b">Request</span>
          </button>
        </form>
        <p className={`hint ${hint === 'Be the first to try SlyceUp.' ? 'hint-default' : 'hint-response'}`} id="hint" aria-live="polite">{hint}</p>
      </div>

      <div className="benefits" aria-label="SlyceUp benefits">
        <div className="benefit">
          <span className="benefit-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M4 13h16a8 8 0 0 1-16 0Z"/><path d="M7 9c1-2 2-3 4-4M12 9c1-2 2-3 4-4M7 17v2m5-2v2m5-2v2"/></svg></span>
          <span>Real meals, real context</span>
        </div>
        <div className="benefit">
          <span className="benefit-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M12 20s-7-4.3-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.7-7 10-7 10Z"/><path d="M8 12h2l1.2-2.3 1.8 4 1.2-1.7H17"/></svg></span>
          <span>Understand patterns over time</span>
        </div>
        <div className="benefit">
          <span className="benefit-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M4 18h16M6 16l3-4 3 2 5-7 2 2"/><path d="M17 7h2v2"/></svg></span>
          <span>Insights for a more balanced you</span>
        </div>
      </div>
      <p className="hero-caption">MEALS MEAN MORE WITH CONTEXT</p>
      </div>
    </section>
  );
}
