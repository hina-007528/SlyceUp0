const iconPaths = {
  meal: (
    <>
      <path d="M5 13.5h22a11 11 0 0 1-22 0Z" />
      <path d="M8 10.5c2-2.6 4.8-3.9 8-3.9s6 1.3 8 3.9M11 20.5h10" />
    </>
  ),
  patterns: (
    <>
      <path d="M5 25V7M5 25h23" />
      <path d="m8 20 5-6 4 3 8-9" />
      <path d="M21 8h4v4" />
    </>
  ),
  balance: (
    <>
      <path d="M16 5v21M8 9h16M10 9l-5 9h10l-5-9ZM22 9l-5 9h10l-5-9ZM10 26h12" />
    </>
  ),
};

export default function FeatureItem({ icon, text }) {
  return (
    <div className="feature-item">
      <span className="feature-icon" aria-hidden="true">
        <svg viewBox="0 0 32 32" focusable="false">
          {iconPaths[icon]}
        </svg>
      </span>
      <span className="feature-text fx">{text}</span>
    </div>
  );
}
