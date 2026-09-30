/* =========================================================
   VALENTINEE — CONFIGURACIÓN
   Reemplazar con los datos reales de la marca.
========================================================= */
const CONFIG = {
  brand: "Valentinee",
  slogan: "Diseño de Experiencias y Celebraciones",
  tagline: "Regalos de Autor & Eventos",
  // TODO: reemplazar por el número real, formato internacional sin '+' ni espacios (ej. 521XXXXXXXXXX)
  whatsappNumber: "000000000000",
  email: "hola@valentinee.example", // TODO: correo real
  social: { instagram: "#", facebook: "#", tiktok: "#" }, // TODO: enlaces reales
  location: "Ciudad — dirección por confirmar", // TODO

  products: [
    { id: "p1", name: "Caja de autor — Ritual de Rosas", price: 890, category: "Regalos de autor", desc: "Composición floral y objetos seleccionados para una ocasión íntima.", featured: true },
    { id: "p2", name: "Experiencia — Cena Privada", price: 2400, category: "Experiencias", desc: "Montaje de cena para dos con ambientación completa a domicilio.", featured: true },
    { id: "p3", name: "Detalle — Carta y Aromas", price: 450, category: "Regalos de autor", desc: "Set de correspondencia escrita a mano y vela de autor.", featured: true },
    { id: "p4", name: "Montaje — Aniversario", price: 3200, category: "Celebraciones", desc: "Decoración temática completa para celebrar una fecha especial.", featured: false },
    { id: "p5", name: "Caja Curada — Momentos", price: 1150, category: "Regalos de autor", desc: "Selección de piezas de autor empacadas en edición limitada.", featured: false },
    { id: "p6", name: "Experiencia — Atardecer Privado", price: 1980, category: "Experiencias", desc: "Locación reservada con montaje sutil para una propuesta o sorpresa.", featured: false },
  ],

  services: [
    { name: "Diseño de Experiencias", desc: "Conceptualización y montaje de momentos únicos, de inicio a fin.", },
    { name: "Celebraciones a Medida", desc: "Producción de celebraciones íntimas o eventos con dirección de detalle.", },
    { name: "Regalos de Autor", desc: "Piezas y composiciones diseñadas exclusivamente para la ocasión.", },
  ],

  testimonials: [
    { name: "Testimonio de cliente", text: "Testimonio de cliente — reemplazar con reseña real.", rating: 5 },
    { name: "Testimonio de cliente", text: "Testimonio de cliente — reemplazar con reseña real.", rating: 5 },
    { name: "Testimonio de cliente", text: "Testimonio de cliente — reemplazar con reseña real.", rating: 5 },
  ],

  // Preguntas de encuesta configurables — reemplazar por las definitivas
  surveyQuestions: [
    { id: "q1", type: "scale", label: "¿Cómo calificarías tu experiencia con Valentinee?" },
    { id: "q2", type: "text", label: "¿Qué fue lo que más te gustó?" },
    { id: "q3", type: "text", label: "¿Qué podríamos mejorar?" },
  ],
};

/* =========================================================
   VALENTINEE — LÓGICA DEL SITIO (catálogo, carrito, WhatsApp,
   formularios, encuesta)
========================================================= */
/* ---------- helpers ---------- */
const money = n => '$' + n.toLocaleString('es-MX');
const waBase = () => `https://wa.me/${CONFIG.whatsappNumber}`;
document.getElementById('year').textContent = new Date().getFullYear();

function svgPlaceholder(){
  return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1"><rect x="3" y="3" width="18" height="18" rx="1"/><circle cx="9" cy="9" r="2"/><path d="M21 15l-5-5L5 21"/></svg>';
}

/* wire up static whatsapp/contact links from CONFIG */
function wireStatic(){
  const genericMsg = encodeURIComponent(`Hola, ${CONFIG.brand}. Quisiera más información.`);
  ['heroWaBtn','ctaWaBtn','contactWaLink','floatWaBtn'].forEach(id=>{
    const el = document.getElementById(id);
    if(el) el.href = `${waBase()}?text=${genericMsg}`;
  });
  document.getElementById('contactEmailLink').textContent = CONFIG.email;
  document.getElementById('contactEmailLink').href = 'mailto:' + CONFIG.email;
  document.getElementById('contactLocation').textContent = CONFIG.location;
  document.getElementById('socialIg').href = CONFIG.social.instagram;
  document.getElementById('socialFb').href = CONFIG.social.facebook;
  document.getElementById('footIg').href = CONFIG.social.instagram;
  document.getElementById('footFb').href = CONFIG.social.facebook;
  document.getElementById('footWa').innerHTML = `<a href="${waBase()}">WhatsApp</a>`;
  document.getElementById('footEmail').innerHTML = `<a href="mailto:${CONFIG.email}">${CONFIG.email}</a>`;
}
wireStatic();

/* ---------- products / services / gallery / reviews render ---------- */
function renderProducts(all){
  const grid = document.getElementById('productGrid');
  const list = all ? CONFIG.products : CONFIG.products.filter(p=>p.featured);
  grid.innerHTML = list.map(p => `
    <div class="card">
      <div class="ph" data-ph="Imagen — reemplazar">${svgPlaceholder()}</div>
      <div class="card-body">
        <h3>${p.name}</h3>
        <p class="desc">${p.desc}</p>
        <p class="price">${money(p.price)}</p>
        <div class="card-actions">
          <button class="btn btn-sm" onclick="openProduct('${p.id}')">Ver detalle</button>
          <button class="btn btn-sm btn-solid" onclick="addToCart('${p.id}',1)">Agregar</button>
        </div>
      </div>
    </div>`).join('');
  document.getElementById('toggleAllBtn').textContent = all ? 'Ver destacados' : 'Ver todo el catálogo';
  document.getElementById('toggleAllBtn').onclick = () => renderProducts(!all);
}
renderProducts(false);

document.getElementById('svcGrid').innerHTML = CONFIG.services.map(s => `
  <div class="svc">
    <div class="ph" data-ph="Imagen — reemplazar">${svgPlaceholder()}</div>
    <div class="svc-body">
      <h3>${s.name}</h3>
      <p>${s.desc}</p>
      <a class="btn btn-sm" href="${waBase()}?text=${encodeURIComponent('Hola, me interesa el servicio: ' + s.name)}" target="_blank" rel="noopener">Consultar por WhatsApp</a>
    </div>
  </div>`).join('');

document.getElementById('galGrid').innerHTML = Array.from({length:8}).map((_,i)=>
  `<div class="ph" data-ph="Foto ${i+1} — reemplazar">${svgPlaceholder()}</div>`).join('');

document.getElementById('revGrid').innerHTML = CONFIG.testimonials.map(t => `
  <div class="rev">
    <div class="stars">${'★'.repeat(t.rating)}${'☆'.repeat(5-t.rating)}</div>
    <p>"${t.text}"</p>
    <div class="who"><div class="avatar">${t.name.charAt(0)}</div><strong>${t.name}</strong></div>
  </div>`).join('');

/* ---------- cart ---------- */
let cart = [];
try{ const saved = localStorage.getItem('valentinee_cart'); if(saved) cart = JSON.parse(saved); }catch(e){ cart = []; }

function saveCart(){ try{ localStorage.setItem('valentinee_cart', JSON.stringify(cart)); }catch(e){} }
function findProduct(id){ return CONFIG.products.find(p=>p.id===id); }

function addToCart(id, qty){
  const existing = cart.find(c=>c.id===id);
  if(existing) existing.qty += qty; else cart.push({id, qty});
  saveCart(); renderCart(); bumpCartIcon();
}
function bumpCartIcon(){
  const el = document.getElementById('cartCount');
  el.classList.remove('bump'); void el.offsetWidth; el.classList.add('bump');
}
function removeFromCart(id){ cart = cart.filter(c=>c.id!==id); saveCart(); renderCart(); }
function setQty(id, qty){
  if(qty < 1){ removeFromCart(id); return; }
  const c = cart.find(c=>c.id===id); if(c) c.qty = qty;
  saveCart(); renderCart();
}
function cartSubtotal(){ return cart.reduce((sum,c)=>{ const p=findProduct(c.id); return sum + (p?p.price*c.qty:0); },0); }

function renderCart(){
  const wrap = document.getElementById('drawerItems');
  const countEl = document.getElementById('cartCount');
  const totalQty = cart.reduce((s,c)=>s+c.qty,0);
  countEl.style.display = totalQty ? 'flex' : 'none';
  countEl.textContent = totalQty;
  document.getElementById('checkoutBtn').disabled = cart.length === 0;

  if(cart.length===0){ wrap.innerHTML = '<p class="cart-empty">Tu carrito está vacío. Explora la colección para agregar productos.</p>'; }
  else{
    wrap.innerHTML = cart.map(c=>{
      const p = findProduct(c.id); if(!p) return '';
      return `<div class="cart-item">
        <div class="ph" data-ph="">${svgPlaceholder()}</div>
        <div class="ci-body">
          <h4>${p.name}</h4>
          <span style="font-size:13px;color:var(--ink-soft);">${money(p.price)}</span>
          <div class="qty-row">
            <button onclick="setQty('${p.id}', ${c.qty-1})" aria-label="Restar">−</button>
            <span>${c.qty}</span>
            <button onclick="setQty('${p.id}', ${c.qty+1})" aria-label="Sumar">+</button>
            <button onclick="removeFromCart('${p.id}')" aria-label="Eliminar" style="margin-left:auto;color:#B23A3A;">Eliminar</button>
          </div>
        </div>
      </div>`;
    }).join('');
  }
  document.getElementById('cartSubtotal').textContent = money(cartSubtotal());
}
renderCart();

/* ---------- drawers / modals ---------- */
function openCart(){ closeAllPanels(); document.getElementById('cartDrawer').classList.add('open'); document.getElementById('overlay').classList.add('show'); }
function closeAll(){ closeAllPanels(); }
function closeAllPanels(){
  document.getElementById('cartDrawer').classList.remove('open');
  document.getElementById('productModal').classList.remove('open');
  document.getElementById('checkoutModal').classList.remove('open');
  document.getElementById('overlay').classList.remove('show');
}
document.getElementById('overlay').addEventListener('click', closeAllPanels);

function toggleMobile(open){
  document.getElementById('mobileDrawer').classList.toggle('open', open);
}

/* ---------- product detail modal ---------- */
function openProduct(id){
  const p = findProduct(id); if(!p) return;
  document.getElementById('productModalBox').innerHTML = `
    <button class="modal-close" onclick="closeAll()" aria-label="Cerrar"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M6 6l12 12M18 6L6 18"/></svg></button>
    <div class="pd-grid">
      <div class="ph" data-ph="Imagen — reemplazar">${svgPlaceholder()}</div>
      <div class="pd-info">
        <p class="eyebrow">${p.category}</p>
        <h3>${p.name}</h3>
        <p class="price">${money(p.price)}</p>
        <p>${p.desc}</p>
        <div class="pd-qty">
          <button onclick="pdQty(-1)" aria-label="Restar">−</button>
          <span id="pdQtyVal">1</span>
          <button onclick="pdQty(1)" aria-label="Sumar">+</button>
        </div>
        <button class="btn btn-solid" style="width:100%;" onclick="addToCart('${p.id}', window._pdQty||1); window._pdQty=1;">Agregar al carrito</button>
      </div>
    </div>`;
  window._pdQty = 1;
  document.getElementById('productModal').classList.add('open');
  document.getElementById('overlay').classList.add('show');
}
function pdQty(delta){
  window._pdQty = Math.max(1, (window._pdQty||1) + delta);
  document.getElementById('pdQtyVal').textContent = window._pdQty;
}

/* ---------- checkout / WhatsApp order flow ---------- */
function openCheckout(){
  if(cart.length===0) return;
  closeAllPanels();
  document.getElementById('waPreviewBox').style.display = 'none';
  document.getElementById('checkoutForm').style.display = 'flex';
  document.getElementById('checkoutModal').classList.add('open');
  document.getElementById('overlay').classList.add('show');
}

document.getElementById('checkoutForm').addEventListener('submit', function(e){
  e.preventDefault();
  const name = document.getElementById('oName').value.trim();
  const phone = document.getElementById('oPhone').value.trim();
  let ok = true;
  toggleFieldError('oName', !name);
  toggleFieldError('oPhone', !phone);
  if(!name || !phone) return;

  const email = document.getElementById('oEmail').value.trim();
  const addr = document.getElementById('oAddr').value.trim();
  const note = document.getElementById('oNote').value.trim();

  let lines = [`Hola, ${CONFIG.brand}. Quiero realizar el siguiente pedido:`, '', 'PRODUCTOS', ''];
  cart.forEach(c=>{
    const p = findProduct(c.id); if(!p) return;
    lines.push(`Producto: ${p.name}`);
    lines.push(`Cantidad: ${c.qty}`);
    lines.push(`Precio: ${money(p.price)}`);
    lines.push('');
  });
  lines.push('RESUMEN', `Subtotal: ${money(cartSubtotal())}`, '', 'DATOS DEL CLIENTE',
    `Nombre: ${name}`, `Teléfono: ${phone}`, `Correo: ${email||'—'}`, `Dirección: ${addr||'—'}`, '',
    'Información adicional:', note || '—', '', 'Quedo atento/a para continuar con mi pedido.');
  const message = lines.join('\n');

  document.getElementById('waPreview').textContent = message;
  document.getElementById('waSendBtn').href = `${waBase()}?text=${encodeURIComponent(message)}`;
  document.getElementById('checkoutForm').style.display = 'none';
  document.getElementById('waPreviewBox').style.display = 'block';
});

function toggleFieldError(id, invalid){
  document.getElementById(id).closest('.field').classList.toggle('invalid', invalid);
}

/* ---------- contact form ---------- */
document.getElementById('contactForm').addEventListener('submit', function(e){
  e.preventDefault();
  const name = document.getElementById('cName').value.trim();
  const email = document.getElementById('cEmail').value.trim();
  const phone = document.getElementById('cPhone').value.trim();
  const msg = document.getElementById('cMsg').value.trim();
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  toggleFieldError('cName', !name);
  toggleFieldError('cEmail', !emailOk);
  toggleFieldError('cPhone', !phone);
  toggleFieldError('cMsg', !msg);
  if(!name || !emailOk || !phone || !msg) return;

  document.getElementById('contactConfirm').classList.add('show');
  this.reset();
});

/* ---------- survey (built from CONFIG.surveyQuestions) ---------- */
function renderSurvey(){
  const form = document.getElementById('surveyForm');
  form.innerHTML = CONFIG.surveyQuestions.map(q=>{
    if(q.type === 'scale'){
      return `<div class="field" style="margin-bottom:20px;">
        <label>${q.label}</label>
        <div class="likert">
          ${[1,2,3,4,5].map(v=>`<label><input type="radio" name="${q.id}" value="${v}">${v}</label>`).join('')}
        </div>
      </div>`;
    }
    return `<div class="field" style="margin-bottom:20px;">
      <label for="${q.id}">${q.label}</label>
      <textarea id="${q.id}" name="${q.id}"></textarea>
    </div>`;
  }).join('') + '<button class="btn btn-solid" type="submit">Enviar respuestas</button>';
}
renderSurvey();

document.getElementById('surveyForm').addEventListener('submit', function(e){
  e.preventDefault();
  document.getElementById('surveyConfirm').classList.add('show');
  this.reset();
});
