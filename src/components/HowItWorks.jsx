import { useState, useEffect, useRef } from 'react';
import imgCapture from '../assets/img/step-capture.webp';
import imgUnderstand from '../assets/img/step-understand.webp';
import imgLearn from '../assets/img/step-learn.webp';

const content = [
  { 
    titleDesktop: 'Capture what you actually eat.', 
    titleMobile: 'A photo is enough to begin.', 
    lead: 'A photo is enough to begin. SlyceUp reads your meal just as it is \u2014 real, simple and in your everyday life.',
    alt: 'Camera screen framing a bowl of ramen',
    img: imgCapture,
    label: 'Capture'
  },
  { 
    titleDesktop: 'Understand what shaped your meal.', 
    titleMobile: 'Understand what shaped your meal.', 
    lead: 'See how food, preparation, context and you come together to form a personal reading.',
    alt: "Ramen meal detail: this meal's imprint and what shaped it",
    img: imgUnderstand,
    label: 'Understand'
  },
  { 
    titleDesktop: 'See what changes over time.', 
    titleMobile: 'See what changes over time.', 
    lead: 'SlyceUp notices your impact and patterns over time, helping you learn what works for you.',
    alt: 'Insights screen showing the food traditions behind your meals',
    img: imgLearn,
    label: 'Learn'
  }
];

export default function HowItWorks() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const boardRef = useRef(null);

  useEffect(() => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (boardRef.current) boardRef.current.classList.add('ready');
      });
    });
  }, []);

  useEffect(() => {
    let timer;
    const reducedMotion = typeof window !== 'undefined' ? window.matchMedia('(prefers-reduced-motion:reduce)').matches : false;
    
    if (!reducedMotion && !isHovered) {
      timer = setInterval(() => {
        setActiveIdx(prev => (prev + 1) % 3);
      }, 7000);
    }
    
    return () => clearInterval(timer);
  }, [isHovered]);

  const activeContent = content[activeIdx];
  const order = [0, 1, 2].filter(i => i !== activeIdx);
  const positions = [0, 0, 0];
  positions[activeIdx] = 0;
  positions[order[0]] = 1;
  positions[order[1]] = 2;

  return (
    <section className="how" id="how" aria-labelledby="hh">
      <div 
        className="board" 
        id="board" 
        ref={boardRef}
        onPointerEnter={() => setIsHovered(true)}
        onPointerLeave={() => setIsHovered(false)}
        onFocus={() => setIsHovered(true)}
      >
        <svg className="layer leafsh" viewBox="0 0 200 260" aria-hidden="true"><use href="#lf"/></svg>
        <div className="layer rays"></div>
        <div className="layer cast"></div>
        <div className="layer glass"></div>
        <div className="layer napkin"></div>
        <div className="layer stick"></div>
        <p className="hiw-label">HOW IT WORKS</p>
        
        <ol className="steps" aria-label="How it works">
          {content.map((item, idx) => (
            <li key={idx} className={idx < 2 ? "dots-container" : ""} style={idx < 2 ? { display: 'contents' } : {}}>
              <button 
                className="step" 
                aria-current={activeIdx === idx} 
                onClick={() => setActiveIdx(idx)}
              >
                <b>0{idx + 1}</b>{item.label}
              </button>
              {idx < 2 && <span className="dots" aria-hidden="true"></span>}
            </li>
          ))}
        </ol>

        <h2 id="hh" aria-live="polite">
          <span className="d">{activeContent.titleDesktop}</span>
          <span className="m">{activeContent.titleMobile}</span>
        </h2>
        <p className="lead">{activeContent.lead}</p>
        
        {content.map((item, idx) => {
          const pos = positions[idx];
          const isCurrent = pos === 0;
          return (
            <button 
              key={idx}
              className="ph" 
              data-pos={pos}
              tabIndex={isCurrent ? -1 : 0}
              aria-label={isCurrent ? `Current step ${idx + 1}` : `Show step ${idx + 1}: ${item.label}`}
              onClick={() => setActiveIdx(idx)}
            >
              <img src={item.img} width="560" height="1212" alt={item.alt} loading="lazy" />
            </button>
          );
        })}

        {content.map((item, idx) => (
          <div key={`cap-${idx}`} className="cap" data-pos={positions[idx]} aria-hidden={positions[idx] === 0}>
            <h3><i>0{idx + 1}</i>{item.label}</h3>
            <p>{idx === 0 ? 'A photo is enough to begin.' : idx === 1 ? 'See the imprint shaped by food, preparation, context and you.' : 'Notice impact and patterns over time.'}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
