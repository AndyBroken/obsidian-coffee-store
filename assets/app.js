/*! © 2026 Andrey (github.com/AndyBroken). All rights reserved. Concept / demo project, see LICENSE. */
/* ===== Obsidian Coffee — shared app logic (cart, theme, layout) ===== */
const IMG = (id, w = 900) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;
const money = n => '$' + n.toFixed(2);
const store = {
  get(k, d) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch { return d; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} }
};

const PRODUCTS = [
  { id: 'eclipse', name: 'Eclipse', type: 'House Espresso', roast: 'Dark', cat: 'Blends', region: 'South America', origin: 'Brazil · Colombia',
    price: 19, rating: 4.9, reviews: 1284, notes: ['Dark chocolate', 'Toffee', 'Black cherry'], accent: '#b0542f', bg: ['#2a1d16', '#120d0a'],
    process: 'Natural / Washed', altitude: '1,200–1,800 m', varietal: 'Bourbon, Caturra', flavor: { Body: 90, Sweetness: 75, Acidity: 30, Finish: 85 },
    desc: 'Our signature espresso. Syrupy and bold with a long, chocolate-toffee finish that stands up to milk.', badge: 'Best Seller', stock: 48 },
  { id: 'solstice', name: 'Solstice', type: 'Ethiopia Guji Natural', roast: 'Light', cat: 'Single Origin', region: 'Africa', origin: 'Guji, Ethiopia',
    price: 24, rating: 4.9, reviews: 642, notes: ['Blueberry', 'Jasmine', 'Honey'], accent: '#7b6bb0', bg: ['#231f30', '#0f0d15'],
    process: 'Natural', altitude: '2,000–2,300 m', varietal: 'Heirloom', flavor: { Body: 45, Sweetness: 90, Acidity: 80, Finish: 70 },
    desc: 'Explosive blueberry and florals from sun-dried cherries. A showstopper as pour-over.', badge: 'Staff Pick', stock: 32 },
  { id: 'nocturne', name: 'Nocturne', type: 'Sumatra Mandheling', roast: 'Dark', cat: 'Single Origin', region: 'Asia',  origin: 'Aceh, Sumatra',
    price: 21, rating: 4.7, reviews: 418, notes: ['Cedar', 'Molasses', 'Clove'], accent: '#4f6b52', bg: ['#18211a', '#0b0f0c'],
    process: 'Wet-hulled', altitude: '1,100–1,500 m', varietal: 'Typica, Ateng', flavor: { Body: 95, Sweetness: 60, Acidity: 20, Finish: 80 },
    desc: 'Earthy, heavy-bodied and low in acidity. Perfect for French press and cold brew.', stock: 27 },
  { id: 'aurora', name: 'Aurora', type: 'Kenya Kirinyaga AA', roast: 'Light', cat: 'Single Origin', region: 'Africa', origin: 'Kirinyaga, Kenya',
    price: 26, rating: 4.8, reviews: 305, notes: ['Blackcurrant', 'Grapefruit', 'Tomato leaf'], accent: '#a8344e', bg: ['#2b151b', '#120a0c'],
    process: 'Washed', altitude: '1,700–1,900 m', varietal: 'SL28, SL34', flavor: { Body: 60, Sweetness: 75, Acidity: 95, Finish: 80 },
    desc: 'Juicy, vibrant and complex with a wine-like structure. Our roasters’ favorite every season.', stock: 19 },
  { id: 'meridian', name: 'Meridian', type: 'Colombia Huila', roast: 'Medium', cat: 'Single Origin', region: 'South America', origin: 'Huila, Colombia',
    price: 22, rating: 4.8, reviews: 731, notes: ['Red apple', 'Caramel', 'Hazelnut'], accent: '#c48a3a', bg: ['#2b2214', '#120e08'],
    process: 'Washed', altitude: '1,600–1,900 m', varietal: 'Castillo, Caturra', flavor: { Body: 70, Sweetness: 85, Acidity: 60, Finish: 70 },
    desc: 'Sweet, round and balanced — the coffee that converts everyone into a specialty drinker.', stock: 55 },
  { id: 'halo', name: 'Halo', type: 'Swiss Water Decaf', roast: 'Medium', cat: 'Decaf', region: 'South America', origin: 'Cajamarca, Peru',
    price: 21, rating: 4.7, reviews: 289, notes: ['Milk chocolate', 'Almond', 'Orange'], accent: '#5e7f9a', bg: ['#16202a', '#0a0e12'],
    process: 'Swiss Water®', altitude: '1,500–1,900 m', varietal: 'Bourbon, Typica', flavor: { Body: 65, Sweetness: 75, Acidity: 45, Finish: 60 },
    desc: '99.9% caffeine-free, 100% flavor. Chemical-free decaf that tastes like the real thing.', stock: 40 },
  { id: 'gesha', name: 'Gesha Lot 74', type: 'Panama Boquete Gesha', roast: 'Light', cat: 'Reserve', region: 'Central America', origin: 'Boquete, Panama',
    price: 68, rating: 5.0, reviews: 96, notes: ['Bergamot', 'White peach', 'Lychee'], accent: '#c9a86a', bg: ['#2e2716', '#121008'],
    process: 'Washed', altitude: '1,700–1,800 m', varietal: 'Gesha', flavor: { Body: 40, Sweetness: 95, Acidity: 85, Finish: 95 },
    desc: 'A micro-lot from a single hillside in Boquete. Tea-like, impossibly floral — only 120 bags roasted.', badge: 'Reserve', stock: 7 },
  { id: 'cascade', name: 'Cascade', type: 'Cold Brew Blend', roast: 'Medium', cat: 'Blends', region: 'Central America', origin: 'Guatemala · Honduras',
    price: 20, rating: 4.8, reviews: 512, notes: ['Cocoa nib', 'Brown sugar', 'Plum'], accent: '#3f7f86', bg: ['#132326', '#090f10'],
    process: 'Washed', altitude: '1,300–1,700 m', varietal: 'Catuai, Bourbon', flavor: { Body: 80, Sweetness: 80, Acidity: 35, Finish: 65 },
    desc: 'Built for cold brew: smooth, chocolatey and naturally sweet with zero bitterness.', badge: 'New', stock: 36 },
];
const SIZES = [{ k: '12oz', label: '12 oz', mult: 1 }, { k: '2lb', label: '2 lb', mult: 2.4, note: 'Save 10%' }, { k: '5lb', label: '5 lb', mult: 5.4, note: 'Save 18%' }];
const GRINDS = ['Whole Bean', 'Espresso', 'Drip', 'Pour-Over', 'French Press'];
const FREE_SHIP = 50, SUB_OFF = 0.15;
const byId = id => PRODUCTS.find(p => p.id === id);

function bagSVG(p, opts = {}) {
  const uid = p.id + Math.random().toString(36).slice(2, 7);
  return `<svg viewBox="0 0 400 500" preserveAspectRatio="xMidYMid slice" role="img" aria-label="${p.name} coffee bag" style="width:100%;height:100%;display:block">
  <defs>
    <radialGradient id="bg${uid}" cx=".5" cy=".35" r=".8"><stop offset="0" stop-color="${p.bg[0]}"/><stop offset="1" stop-color="${p.bg[1]}"/></radialGradient>
    <linearGradient id="bag${uid}" x1="0" x2="1"><stop offset="0" stop-color="#141312"/><stop offset=".5" stop-color="#2a2826"/><stop offset="1" stop-color="#0f0e0d"/></linearGradient>
    <linearGradient id="au${uid}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f2dca6"/><stop offset=".5" stop-color="#c9a86a"/><stop offset="1" stop-color="#8d6c33"/></linearGradient>
  </defs>
  <rect width="400" height="500" fill="url(#bg${uid})"/>
  <circle cx="200" cy="230" r="150" fill="${p.accent}" opacity=".18"/>
  <ellipse cx="200" cy="418" rx="118" ry="14" fill="#000" opacity=".45"/>
  <path d="M112 92h176l16 300q1 22-20 22H116q-21 0-20-22z" fill="url(#bag${uid})"/>
  <path d="M112 92h176l1.6 30H110.4z" fill="#000" opacity=".35"/>
  <path d="M112 92h176" stroke="url(#au${uid})" stroke-width="1.5" opacity=".6"/>
  <rect x="104" y="300" width="192" height="34" fill="${p.accent}"/>
  <g fill="url(#au${uid})">
    <path d="M200 160l14 24-14 24-14-24z" opacity=".95"/>
    <text x="200" y="236" text-anchor="middle" font-family="Manrope,sans-serif" font-size="10" letter-spacing="5" font-weight="600">OBSIDIAN</text>
    <text x="200" y="280" text-anchor="middle" font-family="Cormorant Garamond,serif" font-size="${p.name.length > 9 ? 30 : 38}" font-style="italic">${p.name}</text>
  </g>
  <text x="200" y="322" text-anchor="middle" font-family="Manrope,sans-serif" font-size="9.5" letter-spacing="2.5" font-weight="700" fill="#fff">${p.type.toUpperCase()}</text>
  <text x="200" y="372" text-anchor="middle" font-family="Manrope,sans-serif" font-size="8.5" letter-spacing="2" fill="#b7aa96">${p.roast.toUpperCase()} ROAST · ${opts.size || '12 OZ'}</text>
</svg>`;
}

/* ---------- cart ---------- */
const Cart = {
  items: store.get('obs-cart', []),
  save() { store.set('obs-cart', this.items); renderCart(); updateCount(); },
  key: i => [i.id, i.size, i.grind, i.sub || ''].join('|'),
  unit(i) { const p = byId(i.id), s = SIZES.find(x => x.k === i.size); let u = Math.round(p.price * s.mult * 100) / 100; if (i.sub) u = Math.round(u * (1 - SUB_OFF) * 100) / 100; return u; },
  add(item) { const k = this.key(item), ex = this.items.find(i => this.key(i) === k); if (ex) ex.qty += item.qty; else this.items.push(item); this.save(); },
  setQty(idx, q) { if (q < 1) this.items.splice(idx, 1); else this.items[idx].qty = Math.min(q, 20); this.save(); },
  count() { return this.items.reduce((s, i) => s + i.qty, 0); },
  subtotal() { return this.items.reduce((s, i) => s + this.unit(i) * i.qty, 0); },
  clear() { this.items = []; this.save(); }
};
function itemMeta(i) { return `${SIZES.find(s => s.k === i.size).label} · ${i.grind}${i.sub ? ` · <span style="color:var(--gold)">Every ${i.sub} wks</span>` : ''}`; }

/* ---------- layout injection ---------- */
const LOGO = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M12 2 20 12 12 22 4 12z"/><path d="M12 2v20M4 12h16" opacity=".5"/></svg>`;
const I = {
  cart: '<svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.6" viewBox="0 0 24 24"><path d="M6 7h12l-1 13H7z"/><path d="M9 7a3 3 0 0 1 6 0"/></svg>',
  sun: '<svg width="19" height="19" fill="none" stroke="currentColor" stroke-width="1.6" viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>',
  moon: '<svg width="19" height="19" fill="none" stroke="currentColor" stroke-width="1.6" viewBox="0 0 24 24"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>',
  x: '<svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.6" viewBox="0 0 24 24"><path d="M6 6l12 12M18 6 6 18"/></svg>',
  menu: '<svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.6" viewBox="0 0 24 24"><path d="M3 7h18M3 12h18M3 17h18"/></svg>',
  check: '<svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24"><path d="M5 12l5 5L20 7"/></svg>',
  user: '<svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.6" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></svg>',
};
const page = document.body.dataset.page;
const NAV = [['shop.html', 'Shop', 'shop'], ['subscribe.html', 'Subscriptions', 'subscribe'], ['index.html#process', 'Our Craft', 'craft'], ['index.html#journal', 'Journal', 'journal']];

document.documentElement.dataset.theme = store.get('obs-theme', 'dark');

document.getElementById('header').outerHTML = `
<div class="topbar"><div class="marquee">${Array(2).fill(['Free U.S. shipping over $50', 'Roasted to order · ships in 24h', 'Subscribe & save 15%', 'New: Gesha Lot 74 — only 120 bags', 'Use code WELCOME10 for 10% off'].map(t => `<span>${t}</span>`).join('')).join('')}</div></div>
<header class="site-header" id="siteHeader">
  <div class="container nav">
    <div style="display:flex;align-items:center;gap:.4rem">
      <button class="icon-btn burger" id="burger" aria-label="Menu">${I.menu}</button>
      <ul class="nav-links" id="navLinks">${NAV.map(([h, t, k]) => `<li><a href="${h}" class="${k === page ? 'active' : ''}">${t}</a></li>`).join('')}</ul>
    </div>
    <a href="index.html" class="brand">${LOGO}OBSIDIAN</a>
    <div class="nav-actions">
      <button class="icon-btn" id="themeBtn" aria-label="Toggle light/dark theme"></button>
      <button class="icon-btn" aria-label="Account" onclick="toast('Customer accounts are available in the full build.')">${I.user}</button>
      <button class="icon-btn" id="cartBtn" aria-label="Open cart">${I.cart}<span class="cart-count" id="cartCount">0</span></button>
    </div>
  </div>
</header>`;

document.getElementById('footer').outerHTML = `
<footer>
  <div class="container">
    <div class="foot-grid">
      <div><a href="index.html" class="brand">${LOGO}OBSIDIAN</a><p>Rare, traceable coffees roasted in small batches in Brooklyn, New York. Shipped fresh to your door.</p></div>
      <div><h5>Shop</h5><ul><li><a href="shop.html">All Coffee</a></li><li><a href="shop.html?cat=Reserve">Reserve Lots</a></li><li><a href="subscribe.html">Subscriptions</a></li><li><a href="shop.html?cat=Decaf">Decaf</a></li></ul></div>
      <div><h5>Company</h5><ul><li><a href="index.html#process">Our Craft</a></li><li><a href="index.html#journal">Journal</a></li><li><a href="#" onclick="toast('Wholesale portal — coming soon');return false">Wholesale</a></li></ul></div>
      <div><h5>Help</h5><ul><li><a href="#" onclick="toast('Ships within 24h · 2–5 day delivery');return false">Shipping</a></li><li><a href="#" onclick="toast('30-day freshness guarantee');return false">Returns</a></li><li><a href="mailto:hello@obsidian.example">hello@obsidian.example</a></li></ul></div>
    </div>
    <div class="foot-bottom"><span>© ${new Date().getFullYear()} Obsidian Coffee Roasters · Concept website · Demo project · Design &amp; code © 2026 Andrey (AndyBroken)</span><div class="pay-icons"><span>VISA</span><span>MC</span><span>AMEX</span><span>PAY</span></div></div>
  </div>
</footer>
<div class="overlay" id="overlay"></div>
<aside class="drawer" id="drawer" aria-label="Shopping cart">
  <div class="drawer-head"><h3>Your Cart</h3><button class="icon-btn" id="closeCart" aria-label="Close cart">${I.x}</button></div>
  <div class="ship-bar" id="shipBar"></div>
  <div class="drawer-body" id="cartBody"></div>
  <div class="drawer-foot" id="cartFoot"></div>
</aside>
<div class="toast" id="toast"></div>`;

/* theme */
const themeBtn = document.getElementById('themeBtn');
const paintTheme = () => themeBtn.innerHTML = document.documentElement.dataset.theme === 'dark' ? I.sun : I.moon;
paintTheme();
themeBtn.onclick = () => { const t = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark'; document.documentElement.dataset.theme = t; store.set('obs-theme', t); paintTheme(); };

/* header */
const hdr = document.getElementById('siteHeader');
const onScroll = () => hdr.classList.toggle('scrolled', scrollY > 10); onScroll(); addEventListener('scroll', onScroll, { passive: true });
document.getElementById('burger').onclick = () => document.getElementById('navLinks').classList.toggle('open');

/* drawer */
const drawer = document.getElementById('drawer'), overlay = document.getElementById('overlay');
function openCart() { drawer.classList.add('open'); overlay.classList.add('open'); document.body.classList.add('lock'); }
function closeCart() { drawer.classList.remove('open'); overlay.classList.remove('open'); document.body.classList.remove('lock'); document.querySelector('.sidebar')?.classList.remove('open'); }
document.getElementById('cartBtn').onclick = openCart;
document.getElementById('closeCart').onclick = closeCart;
overlay.onclick = closeCart;
addEventListener('keydown', e => e.key === 'Escape' && closeCart());

function updateCount(bump) {
  const c = document.getElementById('cartCount'), n = Cart.count();
  c.textContent = n; c.classList.toggle('has', n > 0);
  if (bump) { c.classList.remove('bump'); void c.offsetWidth; c.classList.add('bump'); }
}
function renderCart() {
  const body = document.getElementById('cartBody'), foot = document.getElementById('cartFoot'), bar = document.getElementById('shipBar');
  const sub = Cart.subtotal(), left = Math.max(0, FREE_SHIP - sub);
  bar.innerHTML = Cart.items.length ? `${left > 0 ? `You’re <b>${money(left)}</b> away from free shipping` : `<b style="color:var(--gold)">✦ You’ve unlocked free shipping</b>`}<div class="track"><div class="fill" style="width:${Math.min(100, sub / FREE_SHIP * 100)}%"></div></div>` : '';
  bar.style.display = Cart.items.length ? '' : 'none';
  if (!Cart.items.length) {
    body.innerHTML = `<div class="empty"><svg width="56" height="56" fill="none" stroke="currentColor" stroke-width="1.2" viewBox="0 0 24 24"><path d="M6 7h12l-1 13H7z"/><path d="M9 7a3 3 0 0 1 6 0"/></svg><p>Your cart is empty.</p><a href="shop.html" class="btn btn-gold" style="margin-top:1.4rem">Shop Coffee</a></div>`;
    foot.innerHTML = ''; return;
  }
  const inCart = new Set(Cart.items.map(i => i.id)), up = PRODUCTS.find(p => !inCart.has(p.id) && p.id !== 'gesha');
  body.innerHTML = Cart.items.map((i, idx) => { const p = byId(i.id); return `
    <div class="line-item">
      <a class="thumb" href="product.html?id=${p.id}">${bagSVG(p)}</a>
      <div><h4>${p.name}</h4><small>${p.type}</small><small>${itemMeta(i)}</small>
        <div class="qty"><button data-q="${idx}" data-d="-1" aria-label="Decrease">−</button><span>${i.qty}</span><button data-q="${idx}" data-d="1" aria-label="Increase">+</button></div></div>
      <div class="right"><b>${money(Cart.unit(i) * i.qty)}</b><button class="remove" data-r="${idx}">Remove</button></div>
    </div>`; }).join('') + (up ? `<div class="upsell"><div class="thumb">${bagSVG(up)}</div><div><small class="muted">Pairs well with your order</small><b>${up.name}</b>${money(up.price)}</div><button class="btn btn-line" data-up="${up.id}">Add</button></div>` : '');
  foot.innerHTML = `<div class="row"><span class="muted">Subtotal</span><b>${money(sub)}</b></div>
    <div class="row"><span class="muted">Shipping</span><span>${left > 0 ? 'Calculated at checkout' : 'Free'}</span></div>
    <a href="checkout.html" class="btn btn-gold btn-block">Checkout · ${money(sub)}</a>
    <small class="muted" style="text-align:center">Taxes calculated at checkout · Secure demo checkout</small>`;
}
document.addEventListener('click', e => {
  const q = e.target.closest('[data-q]'); if (q) { const i = +q.dataset.q; Cart.setQty(i, Cart.items[i].qty + +q.dataset.d); updateCount(); }
  const r = e.target.closest('[data-r]'); if (r) { Cart.setQty(+r.dataset.r, 0); }
  const u = e.target.closest('[data-up]'); if (u) { Cart.add({ id: u.dataset.up, size: '12oz', grind: 'Whole Bean', qty: 1 }); updateCount(true); toast('Added to cart'); }
  const qa = e.target.closest('[data-quick]'); if (qa) { e.preventDefault(); quickAdd(qa.dataset.quick); }
});
function quickAdd(id) { Cart.add({ id, size: '12oz', grind: 'Whole Bean', qty: 1 }); updateCount(true); openCart(); }

/* toast */
function toast(msg) { const t = document.getElementById('toast'); t.innerHTML = I.check + msg; t.classList.add('show'); clearTimeout(t._t); t._t = setTimeout(() => t.classList.remove('show'), 2600); }

/* product card */
function productCard(p) {
  return `<article class="pcard reveal">
    <a class="media" href="product.html?id=${p.id}">
      <div class="tags">${p.badge ? `<span class="pill ${p.badge === 'Reserve' ? 'gold' : ''}">${p.badge}</span>` : ''}${p.stock < 10 ? `<span class="pill">Only ${p.stock} left</span>` : ''}</div>
      ${bagSVG(p)}
      <button class="btn btn-gold quick" data-quick="${p.id}">Quick Add · ${money(p.price)}</button>
    </a>
    <div class="info"><div><a href="product.html?id=${p.id}"><h3>${p.name}</h3></a><div class="origin">${p.type}</div></div><div style="text-align:right"><div class="price">${money(p.price)}</div><div class="stars">★ <span class="muted" style="font-size:.78rem">${p.rating}</span></div></div></div>
    <div class="notes">${p.notes.join(' · ')}</div>
  </article>`;
}

/* reveal */
const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: .08, rootMargin: '0px 0px -40px 0px' });
function observeReveals() { document.querySelectorAll('.reveal:not(.in)').forEach(el => io.observe(el)); }

renderCart(); updateCount(); observeReveals();
