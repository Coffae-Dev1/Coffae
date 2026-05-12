// Components for the Coffaé site
// All components attach to window at the end for cross-script access

const { useState, useEffect, useRef, useMemo } = React;

const USD = (n) => `$${n.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;

const PRODUCT = {
  id: 'coffae-01',
  name: 'The Coffaé Table',
  sub: '№ 001 — The original space-saving coffee table.',
  price: 1480,
  year: '2026',
  edition: 'First Edition',
};

// ---------- tiny icons ----------
const Icon = {
  plus: () => <svg width="12" height="12" viewBox="0 0 12 12"><path d="M6 1v10M1 6h10" stroke="currentColor" fill="none" strokeWidth="1"/></svg>,
  arrow: () => <svg width="16" height="10" viewBox="0 0 16 10"><path d="M0 5h15M11 1l4 4-4 4" stroke="currentColor" fill="none" strokeWidth="1"/></svg>,
  bean: () => (
    <svg viewBox="0 0 24 34" width="14" height="20">
      <ellipse cx="12" cy="17" rx="10" ry="15" fill="currentColor"/>
      <path d="M12 4 Q8 17 12 30 Q16 17 12 4" stroke="rgba(0,0,0,0.35)" strokeWidth="1" fill="none"/>
    </svg>
  ),
};

// ---------- Product SVG views (stylized tech-drawing) ----------
function TableDiagram({ view = 'front' }) {
  // Each view is a line diagram of the table set
  if (view === 'front') {
    return (
      <svg viewBox="0 0 600 500" fill="none" stroke="#2E2218" strokeWidth="1.2" strokeLinecap="round">
        {/* table main */}
        <rect x="60" y="180" width="360" height="180" fill="#D4B896" fillOpacity="0.35"/>
        <rect x="60" y="180" width="360" height="180"/>
        {/* glass top line */}
        <line x1="60" y1="196" x2="420" y2="196" strokeWidth="0.6"/>
        <rect x="60" y="180" width="360" height="16" fill="#B8C4CC" fillOpacity="0.3"/>
        {/* shelf */}
        <line x1="60" y1="300" x2="420" y2="300"/>
        {/* books on shelf */}
        <rect x="90" y="310" width="50" height="14"/>
        <rect x="140" y="310" width="50" height="10"/>
        <rect x="196" y="310" width="60" height="16"/>
        {/* items on top */}
        <rect x="140" y="148" width="70" height="32" fill="#D4B896" fillOpacity="0.6"/>
        <circle cx="260" cy="160" r="16" fill="#6b6459" fillOpacity="0.5"/>
        <path d="M280 160 Q285 140 300 145 Q310 130 320 145 Q330 135 335 160" strokeWidth="1"/>
        {/* ottoman pulled out */}
        <rect x="440" y="240" width="120" height="120" fill="#54504a" fillOpacity="0.7"/>
        <rect x="440" y="240" width="120" height="120"/>
        <line x1="440" y1="256" x2="560" y2="256" strokeWidth="0.6"/>
        {/* floor */}
        <line x1="20" y1="380" x2="580" y2="380" strokeWidth="0.6" strokeDasharray="2 4"/>
        {/* dimension lines */}
        <g opacity="0.4" fontFamily='sans-serif' fontSize="10" fill="#2E2218">
          <line x1="60" y1="400" x2="420" y2="400" strokeWidth="0.5"/>
          <line x1="60" y1="395" x2="60" y2="405" strokeWidth="0.5"/>
          <line x1="420" y1="395" x2="420" y2="405" strokeWidth="0.5"/>
          <text x="240" y="418" textAnchor="middle" stroke="none">1100 mm</text>

          <line x1="30" y1="180" x2="30" y2="360" strokeWidth="0.5"/>
          <line x1="25" y1="180" x2="35" y2="180" strokeWidth="0.5"/>
          <line x1="25" y1="360" x2="35" y2="360" strokeWidth="0.5"/>
          <text x="18" y="275" textAnchor="middle" stroke="none" transform="rotate(-90 18 275)">420 mm</text>
        </g>
      </svg>
    );
  }
  if (view === 'top') {
    return (
      <svg viewBox="0 0 600 500" fill="none" stroke="#2E2218" strokeWidth="1.2" strokeLinecap="round">
        <rect x="100" y="120" width="300" height="260" fill="#B8C4CC" fillOpacity="0.35"/>
        <rect x="100" y="120" width="300" height="260"/>
        <rect x="110" y="130" width="280" height="240" strokeWidth="0.5" opacity="0.5"/>
        {/* ottoman outline inside */}
        <rect x="420" y="160" width="120" height="120" fill="#54504a" fillOpacity="0.5"/>
        <rect x="420" y="160" width="120" height="120"/>
        <path d="M425 165 L535 275 M535 165 L425 275" strokeWidth="0.4" opacity="0.4"/>
        {/* items on top seen from above */}
        <rect x="160" y="200" width="80" height="40" fill="#D4B896" fillOpacity="0.6"/>
        <circle cx="290" cy="250" r="20" fill="#6b6459" fillOpacity="0.5"/>
        <g opacity="0.4" fontFamily='sans-serif' fontSize="10" fill="#2E2218">
          <text x="250" y="420" textAnchor="middle" stroke="none">TOP · GLASS · 10MM TEMPERED</text>
        </g>
      </svg>
    );
  }
  if (view === 'side') {
    return (
      <svg viewBox="0 0 600 500" fill="none" stroke="#2E2218" strokeWidth="1.2" strokeLinecap="round">
        <rect x="180" y="200" width="200" height="140" fill="#D4B896" fillOpacity="0.35"/>
        <rect x="180" y="200" width="200" height="140"/>
        <line x1="180" y1="216" x2="380" y2="216" strokeWidth="0.6"/>
        <line x1="180" y1="268" x2="380" y2="268"/>
        {/* ottoman under */}
        <rect x="200" y="280" width="80" height="60" fill="#54504a" fillOpacity="0.6"/>
        <line x1="100" y1="360" x2="500" y2="360" strokeWidth="0.6" strokeDasharray="2 4"/>
        <g opacity="0.4" fontFamily='sans-serif' fontSize="10" fill="#2E2218">
          <line x1="500" y1="200" x2="500" y2="340" strokeWidth="0.5"/>
          <line x1="495" y1="200" x2="505" y2="200" strokeWidth="0.5"/>
          <line x1="495" y1="340" x2="505" y2="340" strokeWidth="0.5"/>
          <text x="515" y="275" stroke="none">420</text>
        </g>
      </svg>
    );
  }
  // detail
  return (
    <svg viewBox="0 0 600 500" fill="none" stroke="#2E2218" strokeWidth="1.2" strokeLinecap="round">
      <rect x="140" y="140" width="320" height="220" fill="#54504a" fillOpacity="0.6"/>
      <rect x="140" y="140" width="320" height="220"/>
      {/* stitching detail */}
      <g strokeDasharray="3 4" strokeWidth="0.6" opacity="0.7">
        <rect x="150" y="150" width="300" height="200"/>
      </g>
      {/* texture lines */}
      <g opacity="0.25" strokeWidth="0.4">
        {Array.from({length: 30}).map((_, i) => (
          <line key={i} x1={140 + i*11} y1="140" x2={140 + i*11} y2="360" />
        ))}
      </g>
      <g opacity="0.4" fontFamily='sans-serif' fontSize="10" fill="#2E2218">
        <text x="300" y="395" textAnchor="middle" stroke="none">OTTOMAN · WOOL-LINEN BLEND · CHARCOAL</text>
      </g>
    </svg>
  );
}

// Little icon previews for view tabs
function ProductMedia({ finish, fabric, variant = 'photo' }) {
  const vRef = React.useRef(null);
  const [playing, setPlaying] = React.useState(false);
  const key = (finish || 'walnut').toLowerCase();
  const fabricKey = (fabric || '').toLowerCase();

  // Finish + ottoman swap: only applies to the first gallery tab (photo).
  // Tabs 2 and 3 always show the angle/detail shots so each tab is visually distinct.
  const ottomanSwap = ['birch','walnut','oak'].includes(key) && ['oat','rust','moss'].includes(fabricKey);
  const isVideo = variant === 'photo';
  const hasOttomanPhoto2 = ottomanSwap;
  const imgSrc = ottomanSwap && variant === 'photo'
    ? `assets/${key}-${fabricKey}.png?v=4`
    : hasOttomanPhoto2 && variant === 'photo2'
    ? `assets/${key}-${fabricKey}-2.png?v=1`
    : variant === 'photo3'
    ? `assets/${key}-3.png?v=4`
    : variant === 'photo2'
    ? `assets/${key}-2.png?v=4`
    : `assets/${key}.png?v=4`;

  React.useEffect(() => {
    const v = vRef.current;
    if (!v) return;
    v.load();
    v.currentTime = 0;
    setPlaying(false);
  }, [key, variant]);

  const enter = () => {
    if (!isVideo) return;
    const v = vRef.current;
    if (!v) return;
    v.currentTime = 0;
    const p = v.play();
    if (p && p.then) p.then(() => setPlaying(true)).catch(() => {});
  };
  const leave = () => {
    if (!isVideo) return;
    const v = vRef.current;
    if (!v) return;
    v.pause();
    v.currentTime = 0;
    setPlaying(false);
  };

  return (
    <div
      onMouseEnter={enter}
      onMouseLeave={leave}
      onFocus={enter}
      onBlur={leave}
      tabIndex={0}
      className="product-media"
      style={{position:'absolute', inset:0, cursor: isVideo ? 'none' : 'default'}}
    >
      <img
        src={imgSrc}
        alt={`The Coffaé Table in ${finish}`}
        className="product-media__img"
        style={{
          position:'absolute', inset:0, width:'100%', height:'100%',
          objectFit:'cover',
          opacity: playing ? 0 : 1,
          transition: 'opacity 0.45s ease'
        }}
      />
      {isVideo && (
        <video
          ref={vRef}
          className="product-media__video"
          muted
          playsInline
          loop
          preload="metadata"
          style={{
            position:'absolute', inset:0, width:'100%', height:'100%',
            objectFit:'cover',
            opacity: playing ? 1 : 0,
            transition: 'opacity 0.45s ease'
          }}
        >
          <source src={`assets/${key}.mp4?v=2`} type="video/mp4" />
        </video>
      )}
      {isVideo && (
        <span className="product-media__hint" style={{
          position:'absolute', left:20, top:20,
          fontFamily:'var(--sans)', fontSize: 10, letterSpacing:'0.3em', textTransform:'uppercase',
          color:'#FFFFFF',
          textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000',
          opacity: playing ? 0 : 1,
          transition:'opacity 0.35s',
          display:'flex', alignItems:'center', gap: 10,
        }}>
          <span style={{
            display:'inline-flex', alignItems:'center', justifyContent:'center',
          }}>
            <svg width="5" height="7" viewBox="0 0 7 9"><path d="M0 0 L7 4.5 L0 9 Z" fill="currentColor"/></svg>
          </span>
          Hover to play
        </span>
      )}
    </div>
  );
}

function ViewIcon({ kind, finish }) {
  if (kind === 'photo') return (
    <img src={`assets/${(finish||'walnut').toLowerCase()}.png`} alt="" style={{width:'100%', height:'100%', objectFit:'cover', position:'absolute', inset:0}} />
  );
  if (kind === 'photo2') return (
    <img src={`assets/${(finish||'walnut').toLowerCase()}-2.png`} alt="" style={{width:'100%', height:'100%', objectFit:'cover', position:'absolute', inset:0}} />
  );
  if (kind === 'photo3') return (
    <img src={`assets/${(finish||'walnut').toLowerCase()}-3.png`} alt="" style={{width:'100%', height:'100%', objectFit:'cover', position:'absolute', inset:0}} />
  );
  if (kind === 'front') return <svg viewBox="0 0 40 30"><rect x="4" y="12" width="22" height="12" fill="none" stroke="#2E2218" strokeWidth="1"/><rect x="28" y="16" width="10" height="8" fill="none" stroke="#2E2218" strokeWidth="1"/></svg>;
  if (kind === 'top') return <svg viewBox="0 0 40 30"><rect x="6" y="6" width="20" height="18" fill="none" stroke="#2E2218" strokeWidth="1"/><rect x="28" y="8" width="8" height="8" fill="none" stroke="#2E2218" strokeWidth="1"/></svg>;
  if (kind === 'side') return <svg viewBox="0 0 40 30"><rect x="8" y="10" width="22" height="12" fill="none" stroke="#2E2218" strokeWidth="1"/><rect x="10" y="22" width="10" height="4" fill="none" stroke="#2E2218" strokeWidth="1"/></svg>;
  return <svg viewBox="0 0 40 30"><rect x="10" y="8" width="20" height="14" fill="none" stroke="#2E2218" strokeWidth="1"/><line x1="12" y1="12" x2="28" y2="12" stroke="#2E2218" strokeWidth="0.5"/><line x1="12" y1="16" x2="28" y2="16" stroke="#2E2218" strokeWidth="0.5"/></svg>;
}

// ---------- Nav ----------
function Nav({ cartCount, onCartOpen }) {
  return (
    <nav className="nav">
      <a href="index.html" className="nav-logo">COFFAÉ</a>
      <div className="nav-links">
        <a href="product.html">Products</a>
        <a href="about.html">Our Story</a>
        <a href="opportunity.html">Opportunity</a>
        <button className="nav-cart" onClick={onCartOpen} aria-label="Open cart">{cartCount}</button>
      </div>
    </nav>
  );
}

// ---------- Hero ----------
function Hero() {
  return (
    <section className="hero" id="top">
      <video
        className="hero-video"
        src="assets/coffae-hero-animation1.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      />
    </section>
  );
}

// ---------- Ticker ----------
function Ticker() {
  const row = (
    <span>
Space-saving <span className="bullet" /> Walnut <span className="bullet" /> Glass <span className="bullet" /> Ottoman <span className="bullet" /> Made in small batches <span className="bullet" /> Ships in 4 weeks <span className="bullet" />
    </span>
  );
  return (
    <div className="ticker" aria-hidden="true">
      <div className="ticker-track">
        {row}{row}
      </div>
    </div>
  );
}

// ---------- Product ----------
function ProductSection({ onAdd }) {
  const [view, setView] = useState('photo');
  const [qty, setQty] = useState(1);
  const [finish, setFinish] = useState('Walnut');
  const [fabric, setFabric] = useState('Charcoal');

  return (
    <section className="product" id="product">
      <div className="product-left">
        <div className="product-visual">
          <ProductMedia finish={finish} fabric={fabric} variant={view} />
          <span className="caption">{finish} · {fabric}{view === 'photo2' ? ' · styled' : view === 'photo3' ? ' · detail' : ''}</span>
          <span className="index-num" style={{color:'#F2EDE4', mixBlendMode:'difference'}}>
            {view === 'photo' ? '01' : view === 'photo2' ? '02' : '03'}
          </span>
        </div>
        <div className="view-tabs">
          {[
            { key: 'photo',  img: fabric !== 'Charcoal' ? `assets/${finish.toLowerCase()}-${fabric.toLowerCase()}.png` : `assets/${finish.toLowerCase()}.png` },
            { key: 'photo2', img: fabric !== 'Charcoal' ? `assets/${finish.toLowerCase()}-${fabric.toLowerCase()}-2.png` : `assets/${finish.toLowerCase()}-2.png` },
            { key: 'photo3', img: `assets/${finish.toLowerCase()}-3.png` },
          ].map(t => (
            <button
              key={t.key}
              className={`view-tab ${view === t.key ? 'active' : ''}`}
              onClick={() => setView(t.key)}
            >
              <img src={t.img} alt={t.key} style={{position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover'}} />
            </button>
          ))}
        </div>
      </div>

      <div className="product-right">
        <div className="section-label">№ 001 · First Edition</div>
        <h2>The <em>Coffaé</em><br/>Table.</h2>
        <p className="product-sub">
          <span className="ticker-emphasis">Three things in one. Walnut, glass, a pull-out ottoman.</span>
        </p>
        <div className="product-desc">
          <p>Built in small batches. Made for first apartments and long mornings.</p>
        </div>

        <div className="section-label" style={{marginBottom: 12}}>Finish</div>
        <div style={{display:'flex', gap: 10, marginBottom: 32}}>
          {['Walnut', 'Oak', 'Birch'].map(f => (
            <button key={f} onClick={() => { setFinish(f); setView('photo'); }} style={{
              padding: '10px 18px',
              border: `1px solid ${finish===f?'#1A120B':'rgba(26,18,11,0.2)'}`,
              fontFamily: 'sans-serif',
              fontSize: 10,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              background: finish===f ? '#1A120B' : 'transparent',
              color: finish===f ? '#F2EDE4' : '#1A120B',
              transition: 'all 0.3s'
            }}>{f}</button>
          ))}
        </div>

        <div className="section-label" style={{marginBottom: 12}}>Ottoman</div>
        <div style={{display:'flex', gap: 10, marginBottom: 40}}>
          {[
            {n:'Charcoal', key: 'charcoal'},
            {n:'Oat',      key: 'oat'},
            {n:'Rust',     key: 'rust'},
            {n:'Moss',     key: 'moss'},
          ].map(o => (
            <button key={o.n} onClick={() => setFabric(o.n)} title={o.n} style={{
              width: 44, height: 44,
              position: 'relative', overflow: 'hidden', padding: 0,
              border: fabric===o.n ? '2px solid #1A120B' : '1px solid rgba(26,18,11,0.15)',
              outline: fabric===o.n ? '1px solid rgba(26,18,11,0.3)' : 'none',
              outlineOffset: 3,
              transition: 'all 0.25s',
            }}>
              <img src={`assets/${o.key}-fabric-texture.png`} alt={o.n} style={{position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover', transform:'scale(2.5)', transformOrigin:'center'}} />
            </button>
          ))}
        </div>

        <dl className="spec-grid">
          <div><dt>Dimensions</dt><dd>1100 × 600 × 420</dd></div>
          <div><dt>Weight</dt><dd>38 kg</dd></div>
          <div><dt>Top</dt><dd>Tempered glass</dd></div>
          <div><dt>Frame</dt><dd>{finish}</dd></div>
          <div><dt>Ottoman</dt><dd>{fabric}</dd></div>
          <div><dt>Lead time</dt><dd>4 weeks</dd></div>
        </dl>

        <div className="buy-row">
          <div className="qty">
            <button onClick={() => setQty(Math.max(1, qty-1))}>−</button>
            <span>{qty}</span>
            <button onClick={() => setQty(qty+1)}>+</button>
          </div>
          <button className="add-btn" onClick={() => onAdd({ qty, finish, fabric })}>
            <span>Add to cart</span>
            <span className="price">{USD(PRODUCT.price * qty)}</span>
          </button>
        </div>
        <div className="finance-note">or from $124/mo · Free shipping in the U.S.</div>
      </div>
    </section>
  );
}

function NestingMedia({ shade }) {
  const vRef = React.useRef(null);
  const [playing, setPlaying] = React.useState(false);
  const key = (shade || 'walnut').toLowerCase();
  const hasVideo = key === 'walnut' || key === 'birch' || key === 'oak';
  const videoSrc = `assets/nesting-${key}-animation.mp4`;

  React.useEffect(() => {
    const v = vRef.current;
    if (!v) return;
    v.load();
    v.currentTime = 0;
    setPlaying(false);
  }, [key]);

  const enter = () => {
    if (!hasVideo) return;
    const v = vRef.current;
    if (!v) return;
    v.currentTime = 0;
    const p = v.play();
    if (p && p.then) p.then(() => setPlaying(true)).catch(() => {});
  };
  const leave = () => {
    if (!hasVideo) return;
    const v = vRef.current;
    if (!v) return;
    v.pause();
    v.currentTime = 0;
    setPlaying(false);
  };

  return (
    <div
      onMouseEnter={enter}
      onMouseLeave={leave}
      onFocus={enter}
      onBlur={leave}
      tabIndex={0}
      style={{position:'absolute', inset:0, cursor: hasVideo ? 'none' : 'default'}}
    >
      <img
        key={key}
        src={`assets/table2-${key}.png`}
        alt={`Nesting tables in ${shade}`}
        style={{
          position:'absolute', inset:0, width:'100%', height:'100%',
          objectFit:'cover',
          objectPosition: (key === 'oak' || key === 'walnut') ? 'center top' : 'center center',
          opacity: playing ? 0 : 1,
          transition:'opacity 0.45s ease',
        }}
      />
      {hasVideo && (
        <video
          ref={vRef}
          muted
          playsInline
          loop
          preload="metadata"
          style={{
            position:'absolute', inset:0, width:'100%', height:'100%',
            objectFit:'cover',
            opacity: playing ? 1 : 0,
            transition:'opacity 0.45s ease',
          }}
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      )}
      {hasVideo && (
        <span style={{
          position:'absolute', left:20, top:20,
          fontFamily:'var(--sans)', fontSize:10, letterSpacing:'0.3em', textTransform:'uppercase',
          color:'#FFFFFF',
          textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000',
          opacity: playing ? 0 : 1,
          transition:'opacity 0.35s',
          display:'flex', alignItems:'center', gap:10,
        }}>
          <span style={{display:'inline-flex', alignItems:'center', justifyContent:'center'}}>
            <svg width="5" height="7" viewBox="0 0 7 9"><path d="M0 0 L7 4.5 L0 9 Z" fill="currentColor"/></svg>
          </span>
          Hover to play
        </span>
      )}
    </div>
  );
}

// ---------- Nesting Intro Video ----------
function NestingIntro() {
  return (
    <section className="nesting-hero" aria-label="Nesting tables in motion">
      <video
        className="nesting-hero__video"
        src="assets/nesting-introductory-animation.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      />
      <div className="nesting-hero__overlay">
        <div className="section-label">№ 002 · Companion Series</div>
        <h2 className="nesting-hero__title">
          One table.<br/><em>Then three.</em>
        </h2>
        <p className="nesting-hero__sub">
          Three tables that live as one. Pull apart for guests; tuck back for quiet mornings.
        </p>
      </div>
    </section>
  );
}

// ---------- Nesting Tables Section (Product № 002) ----------
function NestingTableSection({ onAdd }) {
  const [shade, setShade] = React.useState('Oak');
  const [qty, setQty] = React.useState(1);
  const key = shade.toLowerCase();

  const PRICE = 1480;

  return (
    <section className="product nesting" id="nesting" style={{borderTop:'0.5px solid var(--rule)'}}>
      <div className="product-left">
        <div className="product-visual nesting-visual">
          <NestingMedia shade={shade} />
          <span className="caption">{shade} · set of three</span>
          <span className="index-num" style={{color:'#F2EDE4', mixBlendMode:'difference'}}>02</span>
        </div>

        {/* Shade selector tabs — 3 square swatches mirroring main product tabs */}
        <div className="view-tabs">
          {['Walnut','Oak','Birch'].map(s => (
            <button
              key={s}
              className={`view-tab ${shade===s?'active':''}`}
              onClick={() => setShade(s)}
              aria-label={s}
              style={{position:'relative'}}
            >
              <img
                src={`assets/table2-${s.toLowerCase()}.png`}
                alt=""
                style={{position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover'}}
              />
            </button>
          ))}
        </div>
      </div>

      <div className="product-right">
        <div className="section-label">№ 002 · Companion Series</div>
        <h2>The <em>Nesting</em><br/>Trio.</h2>
        <p className="product-sub">
          <span className="ticker-emphasis">Three tables that live as one. Steam-bent plywood, softened corners.</span>
        </p>
        <div className="product-desc">
          <p>Pull them apart for guests; tuck them back for quiet mornings. Sized to nest perfectly beside the Coffaé Table.</p>
        </div>

        <div className="section-label" style={{marginBottom: 12}}>Shade</div>
        <div style={{display:'flex', gap: 10, marginBottom: 40}}>
          {['Walnut', 'Oak', 'Birch'].map(s => (
            <button key={s} onClick={() => setShade(s)} style={{
              padding: '10px 18px',
              border: `1px solid ${shade===s?'#1A120B':'rgba(26,18,11,0.2)'}`,
              fontFamily: 'sans-serif',
              fontSize: 10,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              background: shade===s ? '#1A120B' : 'transparent',
              color: shade===s ? '#F2EDE4' : '#1A120B',
              transition: 'all 0.3s',
              cursor:'pointer',
            }}>{s}</button>
          ))}
        </div>

        <dl className="spec-grid">
          <div><dt>Large</dt><dd>620 × 420 × 480</dd></div>
          <div><dt>Medium</dt><dd>520 × 360 × 420</dd></div>
          <div><dt>Small</dt><dd>420 × 300 × 360</dd></div>
          <div><dt>Material</dt><dd>Steam-bent ply</dd></div>
          <div><dt>Finish</dt><dd>{shade}, oil-waxed</dd></div>
          <div><dt>Lead time</dt><dd>3 weeks</dd></div>
        </dl>

        <div className="buy-row">
          <div className="qty">
            <button onClick={() => setQty(Math.max(1, qty-1))}>−</button>
            <span>{qty}</span>
            <button onClick={() => setQty(qty+1)}>+</button>
          </div>
          <button className="add-btn" onClick={() => onAdd({ qty, finish: shade, fabric: '—', product: 'Nesting Trio', price: PRICE })}>
            <span>Add to cart</span>
            <span className="price">{USD(PRICE * qty)}</span>
          </button>
        </div>
        <div className="finance-note">or from $98/mo · Free shipping in the U.S.</div>
      </div>
    </section>
  );
}

// ---------- Manifesto ----------
function Manifesto() {
  const ref = useRef(null);
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    function onScroll() {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = rect.height + window.innerHeight;
      const p = Math.max(0, Math.min(1, (window.innerHeight - rect.top) / total));
      setProgress(p);
    }
    window.addEventListener('scroll', onScroll);
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const text = "Because your space should adapt to you—not the other way around.";
  const words = text.split(' ');
  const lit = Math.floor(progress * words.length * 1.6);

  return (
    <section className="manifesto" ref={ref}>
      <div className="section-label" style={{maxWidth: 1400, margin: '0 auto 40px'}}>A manifesto · № 002</div>
      <p className="pullquote">
        {words.map((w, i) => {
          const isItalic = /adapt|space|around/.test(w.toLowerCase());
          return (
            <React.Fragment key={i}>
              <span className={`word ${i < lit ? 'lit' : ''}`}>{isItalic ? <em>{w}</em> : w}</span>
              {' '}
            </React.Fragment>
          );
        })}
      </p>
      <div className="byline">— Written at the studio, 2026</div>
    </section>
  );
}

// ---------- Materials ----------
const WOOD_FINISHES = [
  {
    key: 'walnut',
    name: 'American Walnut',
    img: 'assets/material-walnut.png',
    blurb: 'Kiln-dried, oil-waxed. Deepens with time.',
    meta: ['FSC certified', 'North America'],
    detail: [
      { label: 'Origin', value: 'Eastern US — FSC-certified.' },
      { label: 'Finish', value: 'Hand-rubbed oil and hard wax. Food-safe, repairable.' },
      { label: 'Patina', value: 'Warms and deepens within 6 months.' },
      { label: 'Care', value: 'Wipe dry. Re-oil yearly.' },
    ],
  },
  {
    key: 'oak',
    name: 'European Oak',
    img: 'assets/material-oak.png',
    blurb: 'Open grain, golden tone. Classic, calm.',
    meta: ['PEFC certified', 'Northern Europe'],
    detail: [
      { label: 'Origin', value: 'PEFC-certified woodland, Poland & Germany.' },
      { label: 'Finish', value: 'White-pigmented hardwax oil. Resists yellowing.' },
      { label: 'Patina', value: 'Slow amber shift over 5+ years.' },
      { label: 'Care', value: 'Re-oil every 12–18 months.' },
    ],
  },
  {
    key: 'birch',
    name: 'Baltic Birch',
    img: 'assets/material-birch.png',
    blurb: 'Pale, smooth, almost glowing. Studio-light.',
    meta: ['FSC certified', 'Baltic states'],
    detail: [
      { label: 'Origin', value: 'FSC-certified mills, Latvia & Estonia.' },
      { label: 'Finish', value: 'Clear hardwax oil with UV inhibitor.' },
      { label: 'Patina', value: 'The most stable — stays pale.' },
      { label: 'Care', value: 'Wipe damp. Re-oil every two years.' },
    ],
  },
];

const GLASS_OPTIONS = [
  {
    key: 'walnut',
    name: 'Glass on Walnut',
    img: 'assets/glass-walnut.png',
    blurb: '10mm low-iron tempered. Mitred into a recessed walnut frame.',
    meta: ['10mm · CE', 'Low-iron · Tempered'],
    detail: [
      { label: 'Material', value: '10mm low-iron tempered. Made in Northern Italy.' },
      { label: 'Edge', value: 'Flat-polished, lightly chamfered.' },
      { label: 'Inset', value: 'Recessed 6mm — flush surface, no lip.' },
      { label: 'Care', value: 'Microfibre cloth only. No abrasives.' },
    ],
  },
  {
    key: 'birch',
    name: 'Glass on Birch',
    img: 'assets/glass-birch.png',
    blurb: 'The same pane, set in the palest of the three frames.',
    meta: ['10mm · CE', 'Low-iron · Tempered'],
    detail: [
      { label: 'Material', value: '10mm low-iron tempered. Same pane across all finishes.' },
      { label: 'Edge', value: 'Flat-polished, lightly chamfered.' },
      { label: 'Inset', value: 'Recessed 6mm — flush surface, no lip.' },
      { label: 'Care', value: 'Microfibre cloth only. No abrasives.' },
    ],
  },
  {
    key: 'oak',
    name: 'Glass on Oak',
    img: 'assets/glass-oak.png',
    blurb: 'The deepest frame. The glass disappears into shadow.',
    meta: ['10mm · CE', 'Low-iron · Tempered'],
    detail: [
      { label: 'Material', value: '10mm low-iron tempered. Same pane across all finishes.' },
      { label: 'Edge', value: 'Flat-polished, lightly chamfered.' },
      { label: 'Inset', value: 'Recessed 6mm — flush surface, no lip.' },
      { label: 'Care', value: 'Microfibre cloth only. No abrasives.' },
    ],
  },
];

const FABRIC_OPTIONS = [
  {
    key: 'charcoal',
    name: 'Charcoal',
    img: 'assets/fabric-charcoal.png',
    blurb: 'Deep, mineral grey-brown. The quietest of the four.',
    meta: ['68% wool · 32% linen', 'Woven in Portugal'],
    detail: [
      { label: 'Blend', value: '68% wool · 32% linen.' },
      { label: 'Tone', value: 'Warm anthracite — edges toward brown in afternoon light.' },
      { label: 'Wear', value: '60,000 Martindale rubs.' },
      { label: 'Care', value: 'Zip-cover removable. Machine-wash cold, air-dry flat.' },
    ],
  },
  {
    key: 'rust',
    name: 'Rust',
    img: 'assets/fabric-rust.png',
    blurb: 'Burnt sienna. Warmth without weight.',
    meta: ['68% wool · 32% linen', 'Woven in Portugal'],
    detail: [
      { label: 'Blend', value: '68% wool · 32% linen. Plant-dyed.' },
      { label: 'Tone', value: 'Sun-baked terracotta — coral in sun, brick at dusk.' },
      { label: 'Wear', value: '60,000 Martindale rubs.' },
      { label: 'Care', value: 'Zip-cover removable. Machine-wash cold. Avoid direct sunlight.' },
    ],
  },
  {
    key: 'oat',
    name: 'Oat',
    img: 'assets/fabric-oat.png',
    blurb: 'Undyed, ungroomed. Honest cream.',
    meta: ['68% wool · 32% linen', 'Woven in Portugal'],
    detail: [
      { label: 'Blend', value: '68% wool · 32% linen. Undyed.' },
      { label: 'Tone', value: 'Warm oat — between bone and biscuit.' },
      { label: 'Wear', value: '60,000 Martindale rubs.' },
      { label: 'Care', value: 'Zip-cover removable. Machine-wash cold. Treat spills promptly.' },
    ],
  },
  {
    key: 'moss',
    name: 'Moss',
    img: 'assets/fabric-moss.png',
    blurb: 'Olive-green with a soft, mineral cast.',
    meta: ['68% wool · 32% linen', 'Woven in Portugal'],
    detail: [
      { label: 'Blend', value: '68% wool · 32% linen. Plant-dyed.' },
      { label: 'Tone', value: 'Grounded olive — earthier than sage, warmer than forest.' },
      { label: 'Wear', value: '60,000 Martindale rubs.' },
      { label: 'Care', value: 'Zip-cover removable. Machine-wash cold, air-dry flat.' },
    ],
  },
];

let _dropWord = -1; // shared between MaterialsIntro → Materials

function MaterialModal({ active, options, label, onClose, onSelect }) {
  React.useEffect(() => {
    if (!active) return;
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [active, onClose]);

  if (!active) return null;
  const titleParts = active.name.split(' ');
  const titleHead = titleParts.length > 1 ? titleParts.slice(0, -1).join(' ') : '';
  const titleTail = titleParts[titleParts.length - 1];

  return (
    <div className="wood-modal" onClick={onClose}>
      <div className="wood-modal__inner" onClick={(e) => e.stopPropagation()}>
        <button className="wood-modal__close" onClick={onClose} aria-label="Close">×</button>
        <div className="wood-modal__media">
          <img src={`${active.img}?v=1`} alt={active.name} key={active.key} />
          <div className="wood-modal__media-tabs">
            {options.map(o => (
              <button
                key={o.key}
                className={`wood-modal__tab ${active.key === o.key ? 'is-active' : ''}`}
                onClick={() => onSelect(o.key)}
              >
                {o.name.split(' ').slice(-1)[0]}
              </button>
            ))}
          </div>
        </div>
        <div className="wood-modal__body">
          <div className="section-label">№ 003 · {label}</div>
          <h3 className="wood-modal__title">
            {titleHead && <>{titleHead} </>}<em>{titleTail}</em>
          </h3>
          <p className="wood-modal__lede">{active.blurb}</p>
          <dl className="wood-modal__specs">
            {active.detail.map((d, i) => (
              <div key={i} className="wood-modal__row">
                <dt>{d.label}</dt>
                <dd>{d.value}</dd>
              </div>
            ))}
          </dl>
          <div className="wood-modal__meta">
            {active.meta.map(m => <span key={m}>{m}</span>)}
          </div>
        </div>
      </div>
    </div>
  );
}

function MaterialBrowser({ idx, label, options, onExpand }) {
  const [key, setKey] = React.useState(options[0].key);
  const [scrolled, setScrolled] = React.useState(false);
  const scrollRef = React.useRef(null);
  const active = options.find(o => o.key === key) || options[0];

  const onScroll = (e) => {
    setScrolled(e.target.scrollTop > 8);
  };

  const scrollDown = () => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ top: 220, behavior: 'smooth' });
  };

  return (
    <article className="material-card material-card--browser" data-idx={idx}>
      <div className="mb-media">
        <img
          src={`${active.img}?v=2`}
          alt={active.name}
          key={active.key}
          className="mb-media__img"
        />
        <button
          type="button"
          className="mb-expand"
          onClick={(e) => { e.stopPropagation(); onExpand(active.key); }}
          aria-label="Expand details"
          title="Expand"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.4">
            <path d="M2 5V2h3M12 9v3H9M9 2h3v3M5 12H2V9" />
          </svg>
        </button>
      </div>

      <div className="mb-tabs" role="tablist" aria-label={label}>
        {options.map(o => (
          <button
            key={o.key}
            type="button"
            role="tab"
            aria-selected={key === o.key}
            className={`mb-tab ${key === o.key ? 'is-active' : ''}`}
            onClick={() => setKey(o.key)}
          >
            <span className="mb-tab__swatch">
              <img src={`${o.img}?v=2`} alt="" />
            </span>
            <span className="mb-tab__label">{o.name.split(' ').slice(-1)[0]}</span>
          </button>
        ))}
      </div>

      <div className="mb-body">
        <div className="section-label" style={{marginBottom: 6}}>{label} · {active.name}</div>
        <h4 className="mb-title">
          {(() => {
            const parts = active.name.split(' ');
            const head = parts.length > 1 ? parts.slice(0, -1).join(' ') : '';
            const tail = parts[parts.length - 1];
            return <>{head && <>{head} </>}<em>{tail}</em></>;
          })()}
        </h4>
        <p className="mb-blurb">{active.blurb}</p>

        <div className="mb-scroll-wrap">
          <div
            className="mb-scroll"
            ref={scrollRef}
            onScroll={onScroll}
            tabIndex={0}
          >
            <dl className="mb-specs">
              {active.detail.map((d, i) => (
                <div key={i} className="mb-row">
                  <dt>{d.label}</dt>
                  <dd>{d.value}</dd>
                </div>
              ))}
            </dl>
            <div className="mb-meta">
              {active.meta.map(m => <span key={m}>{m}</span>)}
            </div>
          </div>
          <button
            type="button"
            className={`mb-scroll-btn ${scrolled ? 'is-hidden' : ''}`}
            onClick={scrollDown}
            aria-label="Scroll details"
          >
            <span>Scroll</span>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M3 5l3 3 3-3" />
            </svg>
          </button>
        </div>

        <button
          type="button"
          className="mb-expand-link"
          onClick={() => onExpand(active.key)}
        >
          Open full detail →
        </button>
      </div>
    </article>
  );
}

// ---------- Materials scroll intro ----------
function MaterialsIntro() {
  const containerRef = React.useRef(null);
  const titleRef = React.useRef(null);
  const wordsBarRef = React.useRef(null);
  const prevWordRef = React.useRef(-1);
  const [activeWord, setActiveWord] = React.useState(-1);


  React.useEffect(() => {
    const onScroll = () => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      const p = Math.max(0, Math.min(1, -rect.top / total));

      // Word bar — fall downward and fade as section ends
      if (wordsBarRef.current) {
        const fo = Math.max(0, Math.min(1, 1 - (p - 0.86) / 0.11));
        wordsBarRef.current.style.opacity = fo;
        wordsBarRef.current.style.transform = `translateY(${(1 - fo) * 60}px)`;
      }

      // Word highlight — setState only when it changes
      const wi = p < 0.25 ? -1 : p < 0.55 ? 0 : p < 0.80 ? 1 : 2;
      if (wi !== prevWordRef.current) {
        prevWordRef.current = wi;
        _dropWord = wi;
        setActiveWord(wi);
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const WORDS = [
    { label: 'Wood',   sub: 'American Walnut · FSC' },
    { label: 'Fabric', sub: 'Wool-linen · Portugal' },
    { label: 'Glass',  sub: '10mm Tempered · Low-iron' },
  ];

  return (
    <div ref={containerRef} style={{ height: '500vh', position: 'relative' }} id="materials">
      <div style={{
        position: 'sticky', top: 0, height: '100vh',
        overflow: 'hidden', display: 'flex',
        flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start',
        paddingTop: '18vh',
      }}>
        {/* Full-bleed video */}
        <video
          src="assets/three-materials-animation1.mp4"
          autoPlay muted loop playsInline preload="auto"
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%', objectFit: 'cover',
          }}
        />

        {/* Vignette */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 1,
          background: 'radial-gradient(ellipse 75% 65% at 50% 50%, rgba(26,18,11,0.05) 0%, rgba(26,18,11,0.68) 100%)',
        }} />

        {/* Title — in flow, sits at paddingTop position */}
        <div style={{
          position: 'relative', zIndex: 2, textAlign: 'center',
          userSelect: 'none', pointerEvents: 'none', width: '100%',
        }}>
          <h3 style={{
            fontFamily: "'Schoolbell', cursive",
            fontSize: 42, fontWeight: 700,
            color: '#F2EDE4',
            textShadow: '0 0 32px rgba(242,237,228,0.3), 0 2px 20px rgba(26,18,11,0.4)',
            margin: 0, lineHeight: 1,
          }}>Three materials.</h3>
        </div>

        {/* Word bar — 80px below the title, in flow */}
        <div ref={wordsBarRef} style={{
          position: 'relative', zIndex: 2,
          marginTop: 80, width: '100%',
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32,
          padding: '0 36px',
          userSelect: 'none', pointerEvents: 'none',
        }}>
          {WORDS.map((w, i) => {
            const on = activeWord === i;
            return (
              <div key={w.label} style={{ textAlign: 'center' }}>
                <div style={{
                  fontFamily: "'Schoolbell', cursive", fontSize: 42,
                  fontWeight: 700,
                  color: on ? '#F2EDE4' : 'rgba(242,237,228,0.15)',
                  transition: 'color 0.55s ease',
                  textShadow: on ? '0 0 32px rgba(242,237,228,0.45)' : 'none',
                  lineHeight: 1,
                }}>{w.label}</div>
                <div style={{
                  height: 1.5, background: '#F2EDE4',
                  width: on ? 36 : 0, margin: '9px auto 0',
                  transition: 'width 0.6s cubic-bezier(0.25,1,0.5,1)',
                }} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function Materials() {
  const [activeWood, setActiveWood] = React.useState(null);
  const [activeFabric, setActiveFabric] = React.useState(null);
  const [activeGlass, setActiveGlass] = React.useState(null);
  const wood = WOOD_FINISHES.find(w => w.key === activeWood);
  const fabric = FABRIC_OPTIONS.find(f => f.key === activeFabric);
  const glass = GLASS_OPTIONS.find(g => g.key === activeGlass);

  const [dropped, setDropped] = React.useState(false);
  const sectionRef = React.useRef(null);

  React.useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes wordsDrop {
        0%   { transform: translateY(-120px); opacity: 0; }
        25%  { opacity: 1; }
        72%  { transform: translateY(14px);  animation-timing-function: ease-out; }
        85%  { transform: translateY(-6px);  }
        93%  { transform: translateY(3px);   }
        100% { transform: translateY(0);     opacity: 1; }
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  React.useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) setDropped(true);
    }, { threshold: 0.05 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const MAT_WORDS = [
    { word: 'Wood',   delay: '0s' },
    { word: 'Fabric', delay: '0.18s' },
    { word: 'Glass',  delay: '0.36s' },
  ];

  return (
    <section className="materials" ref={sectionRef}>
      <div className="materials-grid">
        {MAT_WORDS.map(({ word, delay }) => (
          <div key={word} style={{
            fontFamily: "'Schoolbell', cursive", fontSize: 42,
            fontWeight: 700,
            color: '#1A120B',
            textAlign: 'center',
            paddingBottom: 12,
            lineHeight: 1,
            opacity: dropped ? undefined : 0,
            animation: dropped ? `wordsDrop 1.1s cubic-bezier(0.4, 0, 0.6, 1) ${delay} both` : 'none',
            willChange: 'transform, opacity',
          }}>{word}</div>
        ))}

        <MaterialBrowser
          idx="01"
          label="Wood"
          options={WOOD_FINISHES}
          onExpand={(key) => setActiveWood(key)}
        />
        <MaterialBrowser
          idx="02"
          label="Fabric"
          options={FABRIC_OPTIONS}
          onExpand={(key) => setActiveFabric(key)}
        />
        <MaterialBrowser
          idx="03"
          label="Glass"
          options={GLASS_OPTIONS}
          onExpand={(key) => setActiveGlass(key)}
        />
      </div>

      <MaterialModal
        active={wood}
        options={WOOD_FINISHES}
        label="Wood"
        onClose={() => setActiveWood(null)}
        onSelect={setActiveWood}
      />
      <MaterialModal
        active={fabric}
        options={FABRIC_OPTIONS}
        label="Fabric"
        onClose={() => setActiveFabric(null)}
        onSelect={setActiveFabric}
      />
      <MaterialModal
        active={glass}
        options={GLASS_OPTIONS}
        label="Glass"
        onClose={() => setActiveGlass(null)}
        onSelect={setActiveGlass}
      />
    </section>
  );
}

// ---------- Gallery ----------
function Gallery() {
  return (
    <section className="gallery" id="gallery">
      <figure className="gallery-feature">
        <img src="assets/gallery-hero.png" alt="" />
      </figure>
    </section>
  );
}

function PlaceholderImg({ tone, note }) {
  return (
    <div style={{
      width:'100%', height:'100%',
      background: `linear-gradient(135deg, ${tone} 0%, #3b2817 100%)`,
      position:'relative',
      display:'flex',
      alignItems:'center',
      justifyContent:'center',
    }}>
      <div style={{
        position:'absolute', inset: 0,
        background: 'repeating-linear-gradient(45deg, rgba(201,166,119,0.05) 0 20px, transparent 20px 40px)'
      }}/>
      <div style={{
        fontFamily: 'sans-serif',
        fontSize: 10,
        letterSpacing: '0.24em',
        color: 'rgba(242,237,228,0.4)',
        textAlign: 'center',
        padding: '0 20px',
      }}>
        <div style={{marginBottom: 10, fontSize: 32, fontFamily:'Instrument Serif, serif', color:'rgba(201,166,119,0.8)', fontStyle:'italic', letterSpacing:0}}>☕</div>
        [ PRODUCT RENDER<br/>PLACEHOLDER ]<br/>
        <span style={{opacity: 0.6}}>{note}</span>
      </div>
    </div>
  );
}

// ---------- Story ----------
function Story() {
  return (
    <section className="story" id="story">
      <div className="story-img">
        <div className="placeholder-bg" />
        <div style={{
          position:'absolute', inset: 40,
          border: '1px solid rgba(26,18,11,0.15)',
          display:'flex', alignItems:'center', justifyContent:'center',
          fontFamily:'sans-serif',
          fontSize: 10, letterSpacing:'0.24em',
          color:'rgba(26,18,11,0.4)',
          textAlign:'center', padding: 20,
        }}>
          [ STUDIO PORTRAIT<br/>PLACEHOLDER ]
        </div>
        <span className="tag">Coffaé Studio · Brooklyn</span>
      </div>
      <div className="story-content">
        <div className="section-label" style={{marginBottom: 24}}>№ 004 · The Story</div>
        <h3>Started as a <em>joke.</em></h3>
        <p className="drop">Coffaé began between roommates — a table for everyone's coffee, and a second seat when needed.</p>
        <p>Still made by four people, in Brooklyn, about forty tables a month.</p>
        <div className="story-signoff">
          <span className="sig">— Noor &amp; Jae</span>
          <span>Founders · Coffaé Studio</span>
        </div>
      </div>
    </section>
  );
}

// ---------- CTA ----------
function CTA({ onAdd }) {
  return (
    <section className="cta" id="contact">
      <div className="section-label" style={{justifyContent:'center', maxWidth: 400, margin:'0 auto'}}>№ 005 · Bring it home</div>
      <h3>Four weeks <em>away.</em></h3>
      <button className="cta-btn" onClick={() => onAdd({ qty: 1, finish: 'Walnut', fabric: 'Charcoal' })}>
        <span>Order the Coffaé — {USD(PRODUCT.price)}</span>
        <Icon.arrow />
      </button>
    </section>
  );
}

// ---------- Footer ----------
function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <a href="#top" className="footer-logo">COFFAÉ</a>
        <p className="footer-tagline">Small space. Big personality.</p>
      </div>

      <div className="footer-middle">
        <div className="footer-links">
          <p className="footer-links-label">Quick links</p>
          <div className="footer-links-grid">
            <a href="product.html" className="footer-link">Products</a>
            <a href="about.html" className="footer-link">Our Story</a>
            <a href="opportunity.html" className="footer-link">Opportunity</a>
            <a href="contact.html" className="footer-link">Contact</a>
          </div>
        </div>

        <div className="footer-waitlist">
          <p className="footer-waitlist-label">Join the waitlist</p>
          <p className="footer-waitlist-sub">Be the first to know when COFFAÉ drops.</p>
          <div className="footer-form">
            <input type="email" placeholder="Your email" className="footer-input" />
            <button className="footer-btn">Join</button>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2026 COFFAÉ. All rights reserved.</p>
      </div>
    </footer>
  );
}

// ---------- Cart Drawer ----------
function CartDrawer({ open, onClose, items, updateQty, removeItem, onCheckout }) {
  const subtotal = items.reduce((s, i) => s + i.qty * PRODUCT.price, 0);
  const shipping = items.length ? 0 : 0;
  return (
    <>
      <div className={`drawer-scrim ${open?'open':''}`} onClick={onClose}></div>
      <aside className={`drawer ${open?'open':''}`} aria-hidden={!open}>
        <div className="drawer-head">
          <h4>Your <em>cart</em></h4>
          <button className="drawer-close" onClick={onClose}>Close ×</button>
        </div>
        <div className="drawer-body">
          {items.length === 0 ? (
            <div className="cart-empty">Empty. But not for long.</div>
          ) : items.map((it, idx) => (
            <div key={idx} className="cart-line">
              <div className="thumb">
                <img src={`assets/${it.finish.toLowerCase()}.png`} alt={it.finish} style={{width:'100%',height:'100%',objectFit:'cover'}} />
              </div>
              <div>
                <h6>{PRODUCT.name}</h6>
                <div className="meta">{it.finish} · {it.fabric}</div>
                <div className="row-qty">
                  <button onClick={() => updateQty(idx, Math.max(1, it.qty-1))}>−</button>
                  <span>{it.qty}</span>
                  <button onClick={() => updateQty(idx, it.qty+1)}>+</button>
                </div>
                <div><button className="remove" onClick={() => removeItem(idx)}>Remove</button></div>
              </div>
              <div className="price">{USD(PRODUCT.price * it.qty)}</div>
            </div>
          ))}
        </div>
        {items.length > 0 && (
          <div className="drawer-foot">
            <div className="totals">
              <div><span>Subtotal</span><span>{USD(subtotal)}</span></div>
              <div><span>Shipping</span><span>Free</span></div>
              <div className="grand"><span>Total</span><span>{USD(subtotal + shipping)}</span></div>
            </div>
            <button className="primary-btn" onClick={onCheckout}>
              <span>Checkout</span>
              <Icon.arrow />
            </button>
          </div>
        )}
      </aside>
    </>
  );
}

// ---------- Checkout ----------
function Checkout({ open, onClose, items, onComplete }) {
  const [step, setStep] = useState('form');
  const [pay, setPay] = useState('card');
  const [form, setForm] = useState({
    email: '', firstName: '', lastName: '', address: '', city: '', zip: '', country: 'United States',
    card: '', exp: '', cvc: '',
  });
  const subtotal = items.reduce((s, i) => s + i.qty * PRODUCT.price, 0);
  const tax = Math.round(subtotal * 0.0875);
  const total = subtotal + tax;

  const orderNo = useMemo(() => 'CF-' + Math.floor(100000 + Math.random() * 900000), [step === 'done']);

  function update(k, v) { setForm(f => ({...f, [k]: v})); }
  function place() {
    setStep('processing');
    setTimeout(() => setStep('done'), 1200);
  }

  useEffect(() => { if (!open) setStep('form'); }, [open]);

  return (
    <div className={`checkout ${open?'open':''}`}>
      <div className="checkout-head">
        <span className="brand">Coffaé<span className="ticker-emphasis" style={{color:'#A07844', fontSize:'22px'}}> · Checkout</span></span>
        <button className="drawer-close" onClick={() => { onClose(); if (step === 'done') onComplete(); }}>
          {step === 'done' ? 'Done' : 'Close'} ×
        </button>
      </div>

      {step !== 'done' && (
        <div className="checkout-body">
          <div>
            <div className="section-label">№ 006 · Secure checkout</div>
            <h2>Almost <em>yours.</em></h2>
            <div className="sub">Step 1 of 1 · Pay &amp; ship in one</div>

            <div className="step-label">Contact</div>
            <div className="field-grid">
              <div className="field full"><label>Email</label><input value={form.email} onChange={e=>update('email', e.target.value)} placeholder="name@hello.com" /></div>
            </div>

            <div className="step-label">Shipping</div>
            <div className="field-grid">
              <div className="field"><label>First name</label><input value={form.firstName} onChange={e=>update('firstName', e.target.value)} /></div>
              <div className="field"><label>Last name</label><input value={form.lastName} onChange={e=>update('lastName', e.target.value)} /></div>
              <div className="field full"><label>Address</label><input value={form.address} onChange={e=>update('address', e.target.value)} /></div>
              <div className="field"><label>City</label><input value={form.city} onChange={e=>update('city', e.target.value)} /></div>
              <div className="field"><label>ZIP</label><input value={form.zip} onChange={e=>update('zip', e.target.value)} /></div>
              <div className="field full">
                <label>Country</label>
                <select value={form.country} onChange={e=>update('country', e.target.value)}>
                  <option>United States</option><option>Canada</option><option>Mexico</option>
                </select>
              </div>
            </div>

            <div className="step-label">Payment</div>
            <div className="pay-options">
              <button className={`pay-option ${pay==='card'?'selected':''}`} onClick={() => setPay('card')}>
                <span className="radio"></span> Credit card
              </button>
              <button className={`pay-option ${pay==='afterpay'?'selected':''}`} onClick={() => setPay('afterpay')}>
                <span className="radio"></span> Afterpay · 4× {USD(Math.round(total/4))}
              </button>
            </div>
            {pay === 'card' && (
              <div className="field-grid">
                <div className="field full"><label>Card number</label><input value={form.card} onChange={e=>update('card', e.target.value)} placeholder="•••• •••• •••• ••••" /></div>
                <div className="field"><label>Expiry</label><input value={form.exp} onChange={e=>update('exp', e.target.value)} placeholder="MM / YY" /></div>
                <div className="field"><label>CVC</label><input value={form.cvc} onChange={e=>update('cvc', e.target.value)} placeholder="•••" /></div>
              </div>
            )}
          </div>

          <aside className="summary">
            <h4>Order summary</h4>
            {items.map((it, idx) => (
              <div key={idx} className="summary-line">
                <div className="thumb" style={{overflow:'hidden'}}>
                  <img src={`assets/${it.finish.toLowerCase()}.png`} alt={it.finish} style={{width:'100%',height:'100%',objectFit:'cover'}} />
                </div>
                <div>
                  <h6>{PRODUCT.name}</h6>
                  <div className="sm">{it.finish} · {it.fabric} · Qty {it.qty}</div>
                </div>
                <div className="price">{USD(PRODUCT.price * it.qty)}</div>
              </div>
            ))}
            <div className="totals-box">
              <div><span>Subtotal</span><span>{USD(subtotal)}</span></div>
              <div><span>Shipping</span><span>Free</span></div>
              <div><span>Tax (est.)</span><span>{USD(tax)}</span></div>
              <div className="grand"><span>Total</span><span>{USD(total)}</span></div>
            </div>
            <button className="place-btn" onClick={place} disabled={step==='processing'}>
              {step === 'processing' ? 'Processing…' : <>Place order · {USD(total)} <Icon.arrow /></>}
            </button>
            <div style={{marginTop:16, textAlign:'center', fontFamily:'sans-serif', fontSize: 9, letterSpacing:'0.22em', color:'rgba(26,18,11,0.4)', textTransform:'uppercase'}}>
              demo only · no real payment
            </div>
          </aside>
        </div>
      )}

      {step === 'done' && (
        <div className="confirm">
          <div className="ok">✓</div>
          <h2>Thank you, <em>truly.</em></h2>
          <p>Confirmation sent to {form.email || 'your inbox'}. Ships in four weeks.</p>
          <dl className="order-meta">
            <div><dt>Order</dt><dd>№ {orderNo}</dd></div>
            <div><dt>Total</dt><dd>{USD(total)}</dd></div>
            <div><dt>Estimated delivery</dt><dd>May 22 — 29</dd></div>
            <div><dt>Craftsperson</dt><dd>Jae M.</dd></div>
          </dl>
          <button className="place-btn" style={{maxWidth: 320, margin:'40px auto 0'}} onClick={() => { onClose(); onComplete(); }}>
            Back to the studio
          </button>
        </div>
      )}
    </div>
  );
}

// ---------- Root App ----------
function App() {
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [toast, setToast] = useState(null);

  // Reveal on scroll
  useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in'); });
    }, { threshold: 0.12 });
    document.querySelectorAll('.reveal').forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  function addToCart(cfg) {
    setCart(prev => {
      // merge if same finish+fabric
      const i = prev.findIndex(p => p.finish === cfg.finish && p.fabric === cfg.fabric);
      if (i >= 0) {
        const next = [...prev];
        next[i] = {...next[i], qty: next[i].qty + cfg.qty};
        return next;
      }
      return [...prev, cfg];
    });
    setToast(`${PRODUCT.name} · ${cfg.finish} · added`);
    setTimeout(() => setToast(null), 2200);
  }
  function updateQty(idx, qty) {
    setCart(prev => prev.map((p, i) => i === idx ? {...p, qty} : p));
  }
  function removeItem(idx) {
    setCart(prev => prev.filter((_, i) => i !== idx));
  }
  function openCheckout() { setCartOpen(false); setCheckoutOpen(true); }
  function onComplete() { setCart([]); }

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  return (
    <>
      <div className="grain" aria-hidden="true"></div>
      <Nav cartCount={cartCount} onCartOpen={() => setCartOpen(true)} />
      <Hero />
      <Ticker />
      <ProductSection onAdd={addToCart} />
      <NestingIntro />
      <NestingTableSection onAdd={addToCart} />
      <Manifesto />
      <MaterialsIntro />
      <Materials />
      <Gallery />
      <CTA onAdd={addToCart} />
      <Footer />

      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cart}
        updateQty={updateQty}
        removeItem={removeItem}
        onCheckout={openCheckout}
      />
      <Checkout
        open={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        items={cart}
        onComplete={onComplete}
      />

      <div className={`toast ${toast?'show':''}`}>
        <span className="bean"><Icon.bean /></span>
        <span>{toast || ''}</span>
      </div>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
