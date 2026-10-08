import { useState } from 'react';
import bowlImg from '../assets/img/uploaded-hero-bowl.webp';
import phoneImg from '../assets/img/uploaded-hero-phone.webp';

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
        <img className="bowl" src={bowlImg} width="1137" height="1052" alt="Bowl of ramen with shiitake, corn, nori, bok choy and a soft-boiled egg" fetchPriority="high" />
        <img className="phone" src={phoneImg} width="674" height="1400" alt="SlyceUp meal reading for ramen, with context and personal insights" fetchPriority="high" />
      </div>
      
      <div className="hero-copy">
        <p className="eyebrow"><span className="d">The philosophy behind SlyceUp</span><span className="m">Reading your meal</span></p>
        <h1 id="h1">See what your<br className="desktop-break" /> meal may reveal.</h1>
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
      </div>
    </section>
  );
}
