import { useState } from 'react';
import useClientReady from '../hooks/useClientReady';
import imgCapture from '../assets/img/hi-res-hero.png';
import imgUnderstand from '../assets/img/hi-res-capture.png';
import imgLearn from '../assets/img/insights-phone.webp';
import mobileCapture from '../assets/img/hi-res-hero.png';
import mobileUnderstand from '../assets/img/hi-res-capture.png';
import mobileLearn from '../assets/img/insights-phone.webp';

const steps = [
  {
    title: 'Capture what you actually eat.',
    titleMobile: 'A photo\nis enough to begin.',
    lead: 'A photo is enough to begin. SlyceUp reads your meal\njust as it is — real, simple and in your everyday life.',
    caption: 'A photo is enough to begin.',
    alt: 'SlyceUp camera view framing a bowl of ramen',
    image: imgCapture,
    mobileImage: mobileCapture,
    label: 'Capture',
  },
  {
    title: 'Understand what shaped your meal.',
    titleMobile: 'Understand what\nshaped your meal.',
    lead: 'See how food, preparation, context and you\ncome together to form a personal reading.',
    caption: 'See the imprint shaped by food, preparation, context and you.',
    alt: 'SlyceUp meal reading with context and details for ramen',
    image: imgUnderstand,
    mobileImage: mobileUnderstand,
    label: 'Understand',
  },
  {
    title: 'See what changes over time.',
    titleMobile: 'See what changes\nover time.',
    lead: 'SlyceUp notices your impact and patterns\nover time, helping you learn what works for you.',
    caption: 'Notice impact and patterns over time.',
    alt: 'SlyceUp insights screen showing meal patterns over time',
    image: imgLearn,
    mobileImage: mobileLearn,
    label: 'Learn',
  },
];

export default function HowItWorks() {
  const isReady = useClientReady();
  const [activeIndex, setActiveIndex] = useState(0);
  const activeStep = steps[activeIndex];
  const otherSteps = steps.filter((_, index) => index !== activeIndex);

  return (
    <section className="how" id="how" aria-labelledby="how-heading">
      <div className="how-inner">
        <div className="phone-feature">
          <picture className="main-phone" data-step={activeIndex}>
            <source media="(max-width: 760px)" srcSet={activeStep.mobileImage} />
            <img
            src={activeStep.image}
            width={280}
            height={576}
            alt={activeStep.alt}
            key={activeStep.image}
            loading="lazy"
          />
          </picture>
        </div>

        <div className="how-copy">
          <p className="hiw-label fx">How it works</p>
          <ol className="steps" aria-label="How it works">
            {steps.map((step, index) => (
              <li key={step.label}>
                <button
                  disabled={!isReady}
                  className="step"
                  type="button"
                  aria-current={activeIndex === index ? 'step' : undefined}
                  aria-pressed={activeIndex === index}
                  onClick={() => setActiveIndex(index)}
                >
                  <b>0{index + 1}</b>
                  {step.label}
                </button>
                {index < steps.length - 1 && <span className="dots" aria-hidden="true" />}
              </li>
            ))}
          </ol>
          <h2 id="how-heading" className="fx" aria-live="polite">
            <span className="desktop-title">{activeStep.title}</span>
            <span className="mobile-title">{activeStep.titleMobile}</span>
          </h2>
          <p className="lead fx">{activeStep.lead}</p>

          <div className="previews" aria-label="Explore the other steps">
            {otherSteps.map((step) => {
              const number = steps.indexOf(step);
              return (
                <button
                  disabled={!isReady}
                  className="preview"
                  type="button"
                  key={step.label}
                  onClick={() => setActiveIndex(number)}
                  aria-label={`Show step ${number + 1}: ${step.label}. ${step.caption}`}
                >
                  <span className="preview-phone">
                    <picture>
                      <source media="(max-width: 760px)" srcSet={step.mobileImage} />
                      <img src={step.image} width={280} height={576} alt="" loading="lazy" />
                    </picture>
                  </span>
                  <span className="preview-caption">
                    <strong><i>0{number + 1}</i>{step.label}</strong>
                    <span>{step.caption}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
