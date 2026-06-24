const products = [
  { id: 'oreo-cheesecake', name: 'Oreo Burnt Cheesecake', series: 'oreo', description: 'Creamy centre, cookie crumb base', price: 24, badge: 'Best seller', image: 'assets/products/oreo-series.png' },
  { id: 'oreo-brownie', name: 'Cookies & Cream Brownie', series: 'oreo', description: 'Fudgy dark cocoa, Oreo crunch', price: 12, badge: 'New', image: 'assets/products/oreo-series.png' },
  { id: 'nutella-cookie', name: 'Nutella Sea-Salt Cookie', series: 'nutella', description: 'Molten hazelnut middle, sea salt', price: 10, badge: 'Warm favourite', image: 'assets/products/nutella-series.png' },
  { id: 'hazelnut-lava', name: 'Hazelnut Lava Bar', series: 'nutella', description: 'Roasted hazelnut, gooey core', price: 13, badge: 'Limited batch', image: 'assets/products/nutella-series.png' }
];

const storageKey = 'jojo-bakes-cart';
const cart = loadCart();
const productGrid = document.querySelector('#productGrid');
const cartPanel = document.querySelector('#cartPanel');
const overlay = document.querySelector('#overlay');
const cartToggle = document.querySelector('#cartToggle');
const cartItems = document.querySelector('#cartItems');
const cartTotal = document.querySelector('#cartTotal');
const cartCount = document.querySelector('#cartCount');
const checkoutButton = document.querySelector('#checkoutButton');
const toast = document.querySelector('#toast');
let activeFilter = 'all';
let lastTrigger = null;
let toastTimeout;

function money(value) { return `RM ${value.toFixed(2)}`; }

function loadCart() {
  try {
    const savedCart = JSON.parse(localStorage.getItem(storageKey) || '[]');
    return savedCart.flatMap(({ id, quantity }) => {
      const product = products.find((item) => item.id === id);
      return product && Number.isInteger(quantity) && quantity > 0 ? [{ ...product, quantity }] : [];
    });
  } catch { return []; }
}

function saveCart() {
  try { localStorage.setItem(storageKey, JSON.stringify(cart.map(({ id, quantity }) => ({ id, quantity })))); } catch { /* Keep shopping usable if storage is unavailable. */ }
}

function renderProducts(filter = activeFilter) {
  activeFilter = filter;
  const filtered = filter === 'all' ? products : products.filter((product) => product.series === filter);
  productGrid.innerHTML = filtered.map((product) => `
    <article class="product-card">
      <div class="product-image"><img src="${product.image}" alt="${product.name}" loading="lazy"><span class="tag">${product.badge}</span></div>
      <div class="product-info"><h3>${product.name}</h3><strong>${money(product.price)}</strong><p>${product.description}</p><button class="add-button" type="button" data-add-to-cart="${product.id}" aria-label="Add ${product.name} to bag">+</button></div>
    </article>`).join('');
}

function renderCart() {
  const quantity = cart.reduce((sum, item) => sum + item.quantity, 0);
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  cartCount.textContent = quantity;
  cartCount.setAttribute('aria-label', `${quantity} item${quantity === 1 ? '' : 's'} in bag`);
  cartTotal.textContent = money(total);
  checkoutButton.disabled = cart.length === 0;
  checkoutButton.textContent = cart.length ? `Copy order summary · ${money(total)}` : 'Checkout';
  cartItems.innerHTML = cart.length ? cart.map((item) => `
    <div class="cart-item"><h3>${item.name}</h3><strong>${money(item.price * item.quantity)}</strong><p>${item.series === 'oreo' ? 'Oreo series' : 'Nutella series'}</p>
    <div class="quantity"><button type="button" data-quantity="minus" data-id="${item.id}" aria-label="Remove one ${item.name}">&minus;</button><span aria-label="${item.quantity} ${item.name}">${item.quantity}</span><button type="button" data-quantity="plus" data-id="${item.id}" aria-label="Add one ${item.name}">+</button></div></div>`).join('') : '<p class="empty-cart">Your bag is waiting for something lovely.<br />Start with a warm cookie?</p>';
  saveCart();
}

function showToast(message) { toast.textContent = message; toast.classList.add('is-visible'); clearTimeout(toastTimeout); toastTimeout = setTimeout(() => toast.classList.remove('is-visible'), 2600); }
function openCart(trigger = document.activeElement) { lastTrigger = trigger; cartPanel.classList.add('is-open'); cartPanel.setAttribute('aria-hidden', 'false'); cartToggle.setAttribute('aria-expanded', 'true'); overlay.hidden = false; document.querySelector('#cartClose').focus(); }
function closeCart() { cartPanel.classList.remove('is-open'); cartPanel.setAttribute('aria-hidden', 'true'); cartToggle.setAttribute('aria-expanded', 'false'); overlay.hidden = true; if (lastTrigger) lastTrigger.focus(); }
function addToCart(id) { const product = products.find((item) => item.id === id); const existing = cart.find((item) => item.id === id); if (existing) existing.quantity += 1; else cart.push({ ...product, quantity: 1 }); renderCart(); showToast(`${product.name} added to your bag`); }
function changeQuantity(id, amount) { const item = cart.find((entry) => entry.id === id); if (!item) return; item.quantity += amount; if (item.quantity <= 0) cart.splice(cart.indexOf(item), 1); renderCart(); }

async function copyOrderSummary() {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const summary = ['JOJO BAKES ORDER', ...cart.map((item) => `${item.quantity} × ${item.name} — ${money(item.price * item.quantity)}`), `Total: ${money(total)}`].join('\n');
  try { await navigator.clipboard.writeText(summary); showToast('Order summary copied — paste it into your order message.'); }
  catch { showToast('Your browser blocked copying. Please select your order from the bag.'); }
}

document.querySelector('#filterBar').addEventListener('click', (event) => {
  const button = event.target.closest('[data-filter]');
  if (!button) return;
  document.querySelectorAll('[data-filter]').forEach((item) => {
    const isActive = item === button;
    item.classList.toggle('is-active', isActive);
    item.setAttribute('aria-pressed', String(isActive));
  });
  renderProducts(button.dataset.filter);
});
document.querySelectorAll('[data-filter-link]').forEach((button) => button.addEventListener('click', () => { document.querySelector(`[data-filter="${button.dataset.filterLink}"]`).click(); document.querySelector('#menu').scrollIntoView({ behavior: 'smooth' }); }));
productGrid.addEventListener('click', (event) => { const button = event.target.closest('[data-add-to-cart]'); if (button) addToCart(button.dataset.addToCart); });
cartItems.addEventListener('click', (event) => { const button = event.target.closest('[data-quantity]'); if (button) changeQuantity(button.dataset.id, button.dataset.quantity === 'plus' ? 1 : -1); });
cartToggle.addEventListener('click', () => openCart(cartToggle));
document.querySelector('#cartClose').addEventListener('click', closeCart);
overlay.addEventListener('click', closeCart);
document.addEventListener('keydown', (event) => { if (event.key === 'Escape' && cartPanel.classList.contains('is-open')) closeCart(); });
checkoutButton.addEventListener('click', copyOrderSummary);

renderProducts();
renderCart();
