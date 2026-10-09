import React from 'react';
import bowlImg from '../assets/img/bowl.webp';
import scanImg from '../assets/img/scan.webp';
import detailImg from '../assets/img/detail.webp';

export default function PhoneMockup({ type }) {
  return (
    <div className="ph" aria-hidden="true">
      <div className="fr"></div>
      <i className="bt" style={{ left: '-5px', top: '17%', height: '3.2%' }}></i>
      <i className="bt" style={{ left: '-5px', top: '25%', height: '7%' }}></i>
      <i className="bt" style={{ left: '-5px', top: '34%', height: '7%' }}></i>
      <i className="bt" style={{ right: '-5px', top: '27%', height: '11%' }}></i>

      {type === 's1' && (
        <div className="scr s1">
          <div className="sh"></div>
          <svg className="leaf" viewBox="0 0 230 520">
            <defs>
              <linearGradient id="lg1" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#5c9a49" /><stop offset="1" stopColor="#2e6a33" /></linearGradient>
            </defs>
            <path d="M150 40C120 160 70 300 30 500" stroke="#7a5a2c" strokeWidth="5" fill="none" />
            <g fill="url(#lg1)">
              <path d="M150 40C185 60 196 105 160 130C130 105 128 65 150 40z" /><path d="M125 150C85 140 55 175 70 215C110 225 135 190 125 150z" /><path d="M108 210C150 195 190 225 175 262C135 272 105 245 108 210z" /><path d="M85 300C40 290 10 325 25 362C70 372 95 335 85 300z" /><path d="M62 380C110 365 140 400 122 440C80 448 52 418 62 380z" /><path d="M40 440C10 450 -5 485 15 515C45 505 55 470 40 440z" />
            </g>
          </svg>
          <img className="bowl" src={bowlImg} alt="Ramen bowl" width="900" height="900" loading="lazy" />
          <div className="fade"></div>
          <div className="isl"></div><div className="sb">9:41</div><div className="st"><svg className="a" viewBox="0 0 38 26"><use href="#sig" /></svg><svg className="b2" viewBox="0 0 38 26"><use href="#wifi" /></svg><svg className="c2" viewBox="0 0 54 26"><use href="#bat" /></svg></div>
          <div className="cb" style={{ left: 'calc(var(--u)*31)', top: 'calc(var(--u)*135)' }}><svg className="i" viewBox="0 0 48 48"><path d="M30 8L14 24l16 16" /></svg></div>
          <div className="ib" style={{ left: 'calc(var(--u)*781)', top: 'calc(var(--u)*141)' }}>i</div>
          <h1>Ramen</h1>
          <div className="mr"><svg className="i"><use href="#sun" /></svg><span>Morning</span><i></i><svg className="i"><use href="#wave" /></svg><span>Coastal humidity</span><i></i><svg className="i"><use href="#drop" /></svg><span>Winter</span></div>
          <h2>Warm, comforting,<br />with layered depth</h2>
          <div className="c1">
            <div className="ft">For you</div><div className="ul"></div><div className="lb">DIGESTIVE RHYTHM</div>
            <svg className="cv" viewBox="0 0 790 100" fill="none">
              <g fill="#2f6b3a"><circle cx="14" cy="38" r="3" /><circle cx="26" cy="22" r="3" /><circle cx="14" cy="64" r="2.6" /><circle cx="34" cy="86" r="2.6" /><circle cx="44" cy="14" r="2.6" /></g>
              <circle cx="39" cy="62" r="11" fill="#f4f7f1" stroke="#1e5a36" strokeWidth="4.5" />
              <path d="M52 62C58 52 64 52 70 62C76 72 84 54 94 56C102 58 106 68 114 64C124 58 130 48 144 52C152 55 158 66 168 62C180 56 186 40 208 38C230 36 240 50 256 46C280 40 300 18 346 12C400 6 440 32 490 56C530 74 580 78 640 78L722 78" stroke="#2c6a3a" strokeWidth="5.5" strokeLinecap="round" />
              <path d="M520 70C560 78 600 80 660 78" stroke="#1d5a35" strokeWidth="7" strokeLinecap="round" />
              <circle cx="722" cy="78" r="46" fill="rgba(47,107,58,.1)" /><circle cx="722" cy="78" r="35" fill="none" stroke="rgba(47,107,58,.28)" strokeWidth="3" /><circle cx="722" cy="78" r="26" fill="#f4f7f1" /><circle cx="722" cy="78" r="21" fill="#1f5a35" />
            </svg>
            <h3 style={{ left: 'calc(var(--u)*43)' }}>Starts light</h3><p style={{ left: 'calc(var(--u)*43)', top: 'calc(var(--u)*363)' }}>Fermentation and spice<br />support the early phase.</p>
            <h3 style={{ left: 'calc(var(--u)*560)' }}>Settles slower</h3><p style={{ left: 'calc(var(--u)*560)', top: 'calc(var(--u)*363)' }}>Lentils and oil add<br />density later.</p>
            <div className="ln"></div>
            <div className="ic" style={{ left: 'calc(var(--u)*38)' }}><svg className="i" viewBox="0 0 48 48"><circle cx="24" cy="24" r="4.5" fill="#1e5a36" /><circle cx="24" cy="11" r="1.8" /><circle cx="24" cy="37" r="1.8" /><circle cx="11" cy="24" r="1.8" /><circle cx="37" cy="24" r="1.8" /><circle cx="15" cy="15" r="1.8" /><circle cx="33" cy="15" r="1.8" /><circle cx="15" cy="33" r="1.8" /><circle cx="33" cy="33" r="1.8" /></svg></div>
            <div className="tx" style={{ left: 'calc(var(--u)*158)' }}>Tends to feel slower<br />and slightly heavier</div>
            <div className="vd"></div>
            <div className="ic" style={{ left: 'calc(var(--u)*469)' }}><svg className="i" viewBox="0 0 48 48"><path d="M8 17c4-5 8-5 12 0s8 5 12 0 8-5 8 0M8 25c4-5 8-5 12 0s8 5 12 0 8-5 8 0M8 33c4-5 8-5 12 0s8 5 12 0 8-5 8 0" /></svg></div>
            <div className="tx" style={{ left: 'calc(var(--u)*587)' }}>Spice may register<br />more strongly</div>
          </div>
          <div className="hm"></div>
        </div>
      )}

      {type === 's2' && (
        <div className="scr s2">
          <img src={scanImg} alt="Ramen bowl in camera view" width="633" height="1480" loading="lazy" />
          <div className="isl"></div><div className="gdot"></div>
          <div className="ct" style={{ left: 'calc(var(--u)*30)', top: 'calc(var(--u)*132)' }}><svg className="i" viewBox="0 0 48 48"><path d="M32 6L14 24l18 18" /></svg></div>
          <div className="ct" style={{ left: 'calc(var(--u)*808)', top: 'calc(var(--u)*136)' }}><svg className="i" viewBox="0 0 48 48" style={{ fill: '#fff', strokeWidth: 1.5 }}><use href="#bolt" /></svg></div>
          <div className="br a"></div><div className="br b"></div><div className="br c"></div><div className="br d"></div>
          <div className="gb" style={{ left: 'calc(var(--u)*36)' }}><svg className="i" viewBox="0 0 48 48"><use href="#img" /></svg></div>
          <div className="sh2"></div>
          <div className="gb" style={{ left: 'calc(var(--u)*737)' }}><svg className="i" viewBox="0 0 48 48"><use href="#flip" /></svg></div>
        </div>
      )}

      {type === 's3' && (
        <div className="scr s3">
          <div className="pw"><img src={detailImg} alt="Ramen bowl" width="695" height="627" loading="lazy" /></div>
          <div className="sheet"></div>
          <div className="isl"></div><div className="sb" style={{ color: '#1a1a1a' }}>9:41</div><div className="st"><svg className="a" viewBox="0 0 38 26"><use href="#sig" /></svg><svg className="b2" viewBox="0 0 38 26"><use href="#wifi" /></svg><svg className="c2" viewBox="0 0 54 26"><use href="#bat" /></svg></div>
          <div className="cb" style={{ left: 'calc(var(--u)*35)' }}><svg className="i" viewBox="0 0 48 48"><path d="M30 8L14 24l16 16" /></svg></div>
          <div className="ib2"><svg className="i" viewBox="0 0 48 48"><circle cx="24" cy="24" r="19" /><text x="24" y="33" textAnchor="middle" fontFamily="Source Serif 4,serif" fontStyle="italic" fontWeight="600" fontSize="27" fill="currentColor" stroke="none">i</text></svg></div>
          <h1>Ramen</h1>
          <div className="mt"><svg className="i"><use href="#rise" /></svg><span>Lunch</span><svg className="i"><use href="#pin" /></svg><span>Tokyo, Jpn</span><svg className="i"><use href="#cal" /></svg><span style={{ margin: 0 }}>Mar 12, 2026</span></div>
          <div className="k">This meal’s imprint</div>
          <div className="hl">Rich, savory, warming &amp; satisfying.</div>
          <svg className="cv" viewBox="0 0 806 170" preserveAspectRatio="none">
            <defs><linearGradient id="cg1" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#4f9a86" stopOpacity=".55" /><stop offset="1" stopColor="#4f9a86" stopOpacity="0" /></linearGradient></defs>
            <path d="M0 100C60 80 100 48 160 48C220 48 250 100 316 100C380 100 410 62 480 62C520 62 540 76 570 70C620 60 650 6 700 6C760 6 790 70 806 98L806 170L0 170Z" fill="url(#cg1)" />
            <path d="M0 100C60 80 100 48 160 48C220 48 250 100 316 100C380 100 410 62 480 62C520 62 540 76 570 70C620 60 650 6 700 6C760 6 790 70 806 98" fill="none" stroke="#14604d" strokeWidth="4" strokeLinecap="round" />
          </svg>
          <div className="ln" style={{ top: 'calc(var(--u)*1450)' }}></div>
          <h4>What shaped this</h4>
          <div className="ln" style={{ top: 'calc(var(--u)*1561)' }}></div>
          <div className="rw" style={{ top: 'calc(var(--u)*1561)' }}><b>Substance</b><span>Noodles, broth, egg</span></div>
          <div className="rw" style={{ top: 'calc(var(--u)*1641)' }}><b>Warmth</b><span>Garlic, miso, sesame</span></div>
          <div className="rw" style={{ top: 'calc(var(--u)*1721)' }}><b>Flow</b><span>Steady, balanced</span></div>
          <div className="rw" style={{ top: 'calc(var(--u)*1801)' }}><b>Stimulation</b><span>Umami-rich spices</span></div>
          <div className="hm"></div>
        </div>
      )}

      {type === 's4' && (
        <div className="scr s4">
          <div className="isl"></div><div className="sb">9:41</div><div className="st"><svg className="a" viewBox="0 0 38 26"><use href="#sig" /></svg><svg className="b2" viewBox="0 0 38 26"><use href="#wifi" /></svg><svg className="c2" viewBox="0 0 54 26"><use href="#bat" /></svg></div>
          <h1>Insights</h1>
          <div className="seg"><b className="on">7D</b><b style={{ left: 'calc(var(--u)*162)', width: 'calc(var(--u)*130)' }}>15D</b><b style={{ left: 'calc(var(--u)*292)', width: 'calc(var(--u)*125)' }}>30D</b></div>
          <div className="pg">1 of 5</div><i style={{ left: 'calc(var(--u)*162)', top: 'calc(var(--u)*296)', width: 'calc(var(--u)*40)', height: 'calc(var(--u)*11)', borderRadius: 'calc(var(--u)*6)', background: '#6aa56f' }}></i>
          <i className="dt" style={{ left: 'calc(var(--u)*222)' }}></i><i className="dt" style={{ left: 'calc(var(--u)*251)' }}></i><i className="dt" style={{ left: 'calc(var(--u)*280)' }}></i><i className="dt" style={{ left: 'calc(var(--u)*309)' }}></i>
          <div className="ey"><svg className="i" viewBox="0 0 48 48"><use href="#leaf" /></svg><span style={{ position: 'static' }}>YOUR FOOD INTELLIGENCE</span></div>
          <div className="cd" style={{ top: 'calc(var(--u)*438)', height: 'calc(var(--u)*490)' }}>
            <div className="lbl" style={{ left: 'calc(var(--u)*62)', top: 'calc(var(--u)*46)' }}>WHAT APPEARED IN<br />YOUR FOOD</div>
            <div className="hd" style={{ left: 'calc(var(--u)*62)', top: 'calc(var(--u)*130)' }}>Fibre<br />appeared less<br />consistently<br />this week.</div>
            <div className="rg" style={{ left: 'calc(var(--u)*462)', top: 'calc(var(--u)*100)' }}></div>
            <div className="pb" style={{ left: 'calc(var(--u)*64)', top: 'calc(var(--u)*482)', width: 'calc(var(--u)*204)', height: 'calc(var(--u)*5)' }}></div>
          </div>
          <div className="cd" style={{ top: 'calc(var(--u)*975)', height: 'calc(var(--u)*963)' }}>
            <div className="lbl" style={{ left: 'calc(var(--u)*56)', top: 'calc(var(--u)*46)', fontSize: 'calc(var(--u)*33)' }}>WHERE YOUR MEALS DREW FROM</div>
            <div className="hd" style={{ left: 'calc(var(--u)*56)', top: 'calc(var(--u)*112)', fontSize: 'calc(var(--u)*58)', lineHeight: 'calc(var(--u)*70)' }}>A mix of food traditions<br />shaped your meals.</div>
          </div>
          <div className="rw4" style={{ top: 'calc(var(--u)*1265)' }}><div className="ci" style={{ background: '#f9d8d5', color: '#c8402f' }}><svg className="i" viewBox="0 0 48 48"><use href="#flower" /></svg></div><div className="n">South Indian</div><div className="d">Rice-and-lentil preparations<br />shaped several of your<br />meals.</div><div className="p" style={{ color: '#b8402e' }}>32%</div><div className="c"></div><div className="b" style={{ '--w': 'calc(var(--u)*143)', '--f': '#d9503a' }}></div></div>
          <div className="sp" style={{ top: 'calc(var(--u)*1470)' }}></div>
          <div className="rw4" style={{ top: 'calc(var(--u)*1494)' }}><div className="ci" style={{ background: '#f6e8be', color: '#b88a1e' }}><svg className="i" viewBox="0 0 48 48"><use href="#leaf" /></svg></div><div className="n">Levantine</div><div className="d">Chickpeas, tahini and fresh<br />vegetables added another<br />root.</div><div className="p" style={{ color: '#b0821a' }}>27%</div><div className="c"></div><div className="b" style={{ '--w': 'calc(var(--u)*131)', '--f': '#d4a73c' }}></div></div>
          <div className="sp" style={{ top: 'calc(var(--u)*1700)' }}></div>
          <div className="rw4" style={{ top: 'calc(var(--u)*1723)' }}><div className="ci" style={{ background: '#ddd5f5', color: '#5d49b0' }}><svg className="i" viewBox="0 0 48 48"><use href="#torii" /></svg></div><div className="n">East Asian</div><div className="d">Steamed grains, vegetables<br />and broths appeared in some<br />meals.</div><div className="p" style={{ color: '#5d49b0' }}>22%</div><div className="c"></div><div className="b" style={{ '--w': 'calc(var(--u)*123)', '--f': '#7f6bd0' }}></div></div>
        </div>
      )}
    </div>
  );
}
