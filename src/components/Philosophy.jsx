import bowlImg from '../assets/img/uploaded-philosophy-bowl.webp';

export default function Philosophy() {
  return (
    <section className="philo" id="philosophy" aria-labelledby="ph-h2">
      <div className="philo-inner">
      <div className="philo-copy">
        <p className="eyebrow philo-eyebrow">OUR PHILOSOPHY</p>
          <h2 id="ph-h2">Food is a<br />relationship.</h2>
          <p>Ayurveda looks beyond<br />what is on the plate.</p>
          <p>The same meal is shaped by<br />what it is, how it is prepared,<br />the context around it,<br />and you.</p>

        <hr className="divider" />

          <p className="ph-desc-sub">SlyceUp translates this ancient<br />wisdom into clear, personal<br />understanding for everyday life.</p>
          <p className="ph-foot">SAME FOOD.<br />A DEEPER UNDERSTANDING.</p>
      </div>

      <div className="stage">
        <img className="bowlp" src={bowlImg} width="850" height="730" alt="Bowl of ramen seen from above" loading="lazy" />

        {/* desktop lines (viewBox 100x75) */}
        <svg className="lines lg" viewBox="0 0 100 75" aria-hidden="true">
          <path d="M17 9 Q22 9 28 15" /><circle cx="17" cy="9" r=".55" />
          <path d="M76.5 10 Q70 10 64 17" /><circle cx="76.5" cy="10" r=".55" />
          <path d="M12.4 54 Q17 54 22 50" /><circle cx="12.4" cy="54" r=".55" />
          <path d="M80.4 55.8 Q74 55.8 67 51" /><circle cx="80.4" cy="55.8" r=".55" />
        </svg>

        {/* Mobile diagram lines use the natural 393×363 composition. */}
        <svg className="lines sm" viewBox="0 0 393 363" aria-hidden="true">
          <path d="M111 55 C126 59 141 77 145 97" /><circle cx="111" cy="55" r="1.8" />
          <path d="M274 54 C257 60 244 76 239 92" /><circle cx="274" cy="54" r="1.8" />
          <path d="M97 287 C113 281 126 266 130 251" /><circle cx="97" cy="287" r="1.8" />
          <path d="M292 287 C277 281 270 267 266 253" /><circle cx="292" cy="287" r="1.8" />
        </svg>

        <div className="node n1">
          <span className="ico"><svg viewBox="0 0 48 48" aria-hidden="true"><path d="M24 44V20M24 28c-9 0-13-5-13-13 9 0 13 5 13 13zM24 24c0-7 4-11 13-11 0 8-4 12-13 11" /><path className="sprout-detail" d="M24 20c-7-1-10-5-10-11 7 0 10 4 10 11zM24 17c1-7 5-10 11-10 0 7-4 10-11 10zM24 35c-7 0-10-4-10-10 7 0 10 4 10 10zM24 31c1-7 5-10 11-10 0 7-4 10-11 10z" /></svg></span>
          <b>Food</b>
          <p>Its natural qualities<br />and how it combines<br />with other foods.</p>
        </div>
        <div className="node n2">
          <span className="ico"><svg viewBox="0 0 48 48" aria-hidden="true"><path d="M7 24h34a17 17 0 01-34 0zM17 41h14M18 6c-2 3 2 4 0 8M24 6c-2 3 2 4 0 8M30 6c-2 3 2 4 0 8" /></svg></span>
          <b>Preparation</b>
          <p>How cooking methods<br />change a food's<br />qualities and effects.</p>
        </div>
        <div className="node n3">
          <span className="ico"><svg viewBox="0 0 48 48" aria-hidden="true"><circle cx="24" cy="24" r="8" /><path d="M24 5v6M24 37v6M5 24h6M37 24h6M10.5 10.5l4 4M33.5 33.5l4 4M10.5 37.5l4-4M33.5 14.5l4-4" /></svg></span>
          <b>Context</b>
          <p>The time, season,<br />place and surroundings<br />all matter.</p>
        </div>
        <div className="node n4">
          <span className="ico"><svg viewBox="0 0 48 48" aria-hidden="true"><circle cx="24" cy="14" r="8" /><path d="M8 44v-4a9 9 0 019-9h14a9 9 0 019 9v4z" /></svg></span>
          <b>You</b>
          <p>Your unique nature<br />(prakriti) and current<br />state shape how a meal<br />affects you.</p>
        </div>
      </div>
      </div>
    </section>
  );
}
