/* ════════════════════════════════════════
   LUXE — JavaScript Application
   ════════════════════════════════════════ */

'use strict';

// ─────────────────────────────────────────
// STATE
// ─────────────────────────────────────────
let cart = JSON.parse(localStorage.getItem('luxe_cart') || '[]');
let wishlist = JSON.parse(localStorage.getItem('luxe_wishlist') || '[]');
let currentPage = 'home';
let filteredProducts = [];
let displayedCount = 0;
const ITEMS_PER_PAGE = 12;

let filters = {
  category: [],
  maxPrice: 50000,
  minRating: 0,
  inStock: false,
  onSale: false,
  sort: 'default',
};

// ─────────────────────────────────────────
// PRODUCT DATA
// ─────────────────────────────────────────
const PRODUCTS = [
  {
    id: 1, name: 'Noir Leather Tote Bag', category: 'Bags', price: 4999, originalPrice: 7999,
    image: 'assets/product_bag.png', rating: 4.8, reviews: 342, badge: 'sale',
    stock: 12, description: 'Crafted from premium full-grain leather, this tote bag features spacious compartments, gold-finish hardware, and a sleek minimal design perfect for the modern professional.',
    sizes: ['S', 'M', 'L'], isNew: false, isSale: true,
  },
  {
    id: 2, name: 'Veloce Leather Runner', category: 'Shoes', price: 5499, originalPrice: 8499,
    image: 'assets/product_shoes.png', rating: 4.7, reviews: 218, badge: 'hot',
    stock: 8, description: 'Premium leather upper with a breathable mesh lining and cushioned sole for all-day comfort. Where performance meets luxury.',
    sizes: ['39', '40', '41', '42', '43', '44'], isNew: false, isSale: true,
  },
  {
    id: 3, name: 'Aurum Chronograph Watch', category: 'Watches', price: 24999, originalPrice: 34999,
    image: 'assets/product_watch.png', rating: 4.9, reviews: 87, badge: 'limited',
    stock: 3, description: 'Swiss-inspired movement with sapphire crystal glass, 100m water resistance, and premium stainless steel bracelet with gold PVD coating.',
    sizes: ['One Size'], isNew: false, isSale: true,
  },
  {
    id: 4, name: 'Velours Eau de Parfum', category: 'Fragrances', price: 3299, originalPrice: 4999,
    image: 'assets/product_perfume.png', rating: 4.6, reviews: 503, badge: 'new',
    stock: 30, description: 'A sophisticated blend of bergamot, oud, and vanilla. Inspired by the French Riviera, this fragrance lasts 12+ hours on skin.',
    sizes: ['50ml', '100ml'], isNew: true, isSale: true,
  },
  {
    id: 5, name: 'Moto Leather Jacket', category: 'Jackets', price: 8999, originalPrice: 13999,
    image: 'assets/product_jacket.png', rating: 4.8, reviews: 156, badge: 'sale',
    stock: 6, description: 'Premium buffalo leather biker jacket with asymmetric zipper, YKK zippers, and quilted shoulder panels. A timeless wardrobe essential.',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'], isNew: false, isSale: true,
  },
  {
    id: 6, name: 'Obsidian Mini Crossbody', category: 'Bags', price: 2499, originalPrice: 3999,
    image: 'assets/product_bag.png', rating: 4.5, reviews: 289, badge: 'new',
    stock: 18, description: 'Compact and elegant, this crossbody bag features adjustable straps, a hidden pocket, and premium vegan leather in a stunning obsidian finish.',
    sizes: ['One Size'], isNew: true, isSale: false,
  },
  {
    id: 7, name: 'Glacier Dress Watch', category: 'Watches', price: 15999, originalPrice: 21999,
    image: 'assets/product_watch.png', rating: 4.7, reviews: 64, badge: 'sale',
    stock: 5, description: 'Ultra-thin quartz movement with a mother-of-pearl dial, genuine leather strap, and a timeless round case. Elegance at its finest.',
    sizes: ['One Size'], isNew: false, isSale: true,
  },
  {
    id: 8, name: 'Soleil Sport Runner', category: 'Shoes', price: 3999, originalPrice: 5999,
    image: 'assets/product_shoes.png', rating: 4.4, reviews: 412, badge: 'hot',
    stock: 22, description: 'Engineered knit upper with responsive foam cushioning. Lightweight at just 240g, perfect for both casual wear and light training.',
    sizes: ['38', '39', '40', '41', '42', '43', '44', '45'], isNew: false, isSale: true,
  },
  {
    id: 9, name: 'Mystique Oriental Parfum', category: 'Fragrances', price: 4799, originalPrice: 6499,
    image: 'assets/product_perfume.png', rating: 4.8, reviews: 198, badge: 'limited',
    stock: 7, description: 'An opulent oriental blend of saffron, rose absolute, and warm amber. A rare olfactive journey bottled in a luxurious crystal flacon.',
    sizes: ['30ml', '50ml', '100ml'], isNew: false, isSale: false,
  },
  {
    id: 10, name: 'Heritage Blazer Jacket', category: 'Jackets', price: 6499, originalPrice: 9999,
    image: 'assets/product_jacket.png', rating: 4.6, reviews: 93, badge: 'sale',
    stock: 11, description: 'Italian-woven fabric with a structured shoulder, single-button closure, and two-button cuffs. The perfect power blazer for any occasion.',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'], isNew: false, isSale: true,
  },
  {
    id: 11, name: 'Lune Suede Ankle Boot', category: 'Shoes', price: 6999, originalPrice: 9999,
    image: 'assets/product_shoes.png', rating: 4.7, reviews: 178, badge: 'new',
    stock: 9, description: 'Soft Italian suede upper with stacked heel, YKK side zip, and leather-lined interior. A sophisticated choice for any season.',
    sizes: ['36', '37', '38', '39', '40', '41', '42'], isNew: true, isSale: false,
  },
  {
    id: 12, name: 'Velvet Evening Clutch', category: 'Bags', price: 1899, originalPrice: 2799,
    image: 'assets/product_bag.png', rating: 4.5, reviews: 223, badge: 'sale',
    stock: 25, description: 'Luxurious velvet exterior with a magnetic snap closure, detachable chain strap, and satin lining. Perfect for evening occasions.',
    sizes: ['One Size'], isNew: false, isSale: true,
  },
  {
    id: 13, name: 'Summit Diver Watch', category: 'Watches', price: 32999, originalPrice: 44999,
    image: 'assets/product_watch.png', rating: 4.9, reviews: 41, badge: 'limited',
    stock: 2, description: '300m water-resistant professional dive watch with rotating ceramic bezel, helium escape valve, and super-LumiNova luminous markers.',
    sizes: ['One Size'], isNew: false, isSale: false,
  },
  {
    id: 14, name: 'Bloom Floral Eau de Toilette', category: 'Fragrances', price: 2499, originalPrice: 3299,
    image: 'assets/product_perfume.png', rating: 4.3, reviews: 634, badge: 'hot',
    stock: 45, description: 'A fresh, airy floral with top notes of pink pepper, heart of jasmine, and a base of white musk. Light and uplifting for everyday wear.',
    sizes: ['50ml', '100ml', '200ml'], isNew: false, isSale: true,
  },
  {
    id: 15, name: 'Urban Commuter Backpack', category: 'Bags', price: 3799, originalPrice: 5499,
    image: 'assets/product_bag.png', rating: 4.6, reviews: 387, badge: 'new',
    stock: 16, description: 'Waxed canvas exterior, padded laptop compartment (up to 16"), ergonomic shoulder straps, and 26L capacity. Built for the modern nomad.',
    sizes: ['One Size'], isNew: true, isSale: false,
  },
  {
    id: 16, name: 'Carbon Racer Oxford', category: 'Shoes', price: 8499, originalPrice: 12999,
    image: 'assets/product_shoes.png', rating: 4.8, reviews: 92, badge: 'limited',
    stock: 4, description: 'Handcrafted Goodyear welted oxford with carbon-fiber toe cap and full-grain calfskin upper. A masterpiece of cobblery.',
    sizes: ['39', '40', '41', '42', '43', '44', '45'], isNew: false, isSale: false,
  },
];

const CATEGORIES = [
  { name: 'Bags', icon: '👜', count: 5, color: '#a855f7' },
  { name: 'Shoes', icon: '👟', count: 5, color: '#f59e0b' },
  { name: 'Watches', icon: '⌚', count: 3, color: '#10b981' },
  { name: 'Fragrances', icon: '🧴', count: 4, color: '#ec4899' },
  { name: 'Jackets', icon: '🧥', count: 2, color: '#3b82f6' },
  { name: 'Electronics', icon: '🎧', count: 0, color: '#6366f1' },
  { name: 'Jewellery', icon: '💍', count: 0, color: '#f97316' },
  { name: 'Sunglasses', icon: '🕶️', count: 0, color: '#14b8a6' },
];

// ─────────────────────────────────────────
// UTILITY FUNCTIONS
// ─────────────────────────────────────────
function formatPrice(n) {
  return '₹' + n.toLocaleString('en-IN');
}

function getDiscount(orig, curr) {
  return Math.round(((orig - curr) / orig) * 100);
}

function renderStars(rating) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  let stars = '';
  for (let i = 0; i < full; i++) stars += '★';
  if (half) stars += '½';
  for (let i = Math.ceil(rating); i < 5; i++) stars += '☆';
  return stars;
}

function saveState() {
  localStorage.setItem('luxe_cart', JSON.stringify(cart));
  localStorage.setItem('luxe_wishlist', JSON.stringify(wishlist));
}

function isInCart(id) { return cart.some(i => i.id === id); }
function isInWishlist(id) { return wishlist.some(i => i.id === id); }

// ─────────────────────────────────────────
// TOAST SYSTEM
// ─────────────────────────────────────────
function showToast(icon, title, subtitle = '', type = '') {
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = `toast ${type ? 'toast-' + type : ''}`;
  toast.innerHTML = `
    <span class="toast-icon">${icon}</span>
    <div class="toast-text">
      <strong>${title}</strong>
      ${subtitle ? `<small>${subtitle}</small>` : ''}
    </div>
  `;
  container.appendChild(toast);
  setTimeout(() => {
    toast.classList.add('hiding');
    setTimeout(() => toast.remove(), 300);
  }, 3200);
}

// ─────────────────────────────────────────
// NAVIGATION / PAGES
// ─────────────────────────────────────────
function showPage(name) {
  // Hide all pages
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));

  const page = document.getElementById('page-' + name);
  if (page) page.classList.add('active');
  currentPage = name;

  // Active nav link
  document.querySelectorAll('.nav-link').forEach(l => {
    if (l.getAttribute('onclick') && l.getAttribute('onclick').includes(`'${name}'`)) {
      l.classList.add('active');
    }
  });

  // Close mobile menu
  document.getElementById('navLinks').classList.remove('mobile-open');
  document.getElementById('hamburger').classList.remove('open');

  window.scrollTo({ top: 0, behavior: 'smooth' });

  // Lazy init pages
  if (name === 'shop') initShopPage();
  if (name === 'categories') renderAllCategories();
  if (name === 'deals') renderDealsPage();
}

// ─────────────────────────────────────────
// PANEL SYSTEM
// ─────────────────────────────────────────
function openPanel(type) {
  document.getElementById(type + 'Overlay').classList.add('active');
  document.getElementById(type + 'Panel').classList.add('open');
  document.body.style.overflow = 'hidden';
  if (type === 'cart') renderCart();
  if (type === 'wishlist') renderWishlist();
}
function closePanel(type) {
  document.getElementById(type + 'Overlay').classList.remove('active');
  document.getElementById(type + 'Panel').classList.remove('open');
  document.body.style.overflow = '';
}

// ─────────────────────────────────────────
// PRODUCT CARD RENDERER
// ─────────────────────────────────────────
function createProductCard(product) {
  const inCart = isInCart(product.id);
  const inWish = isInWishlist(product.id);
  const discount = getDiscount(product.originalPrice, product.price);
  const stockClass = product.stock === 0 ? 'out' : product.stock <= 5 ? 'low' : '';
  const stockText = product.stock === 0 ? 'Out of Stock' : product.stock <= 5 ? `Only ${product.stock} left!` : 'In Stock';

  let badgeHTML = '';
  if (product.badge === 'sale') badgeHTML = `<span class="badge-tag badge-sale">${discount}% OFF</span>`;
  if (product.badge === 'new') badgeHTML = `<span class="badge-tag badge-new">NEW</span>`;
  if (product.badge === 'hot') badgeHTML = `<span class="badge-tag badge-hot">🔥 HOT</span>`;
  if (product.badge === 'limited') badgeHTML = `<span class="badge-tag badge-limited">LIMITED</span>`;

  const card = document.createElement('div');
  card.className = 'product-card';
  card.dataset.id = product.id;
  card.innerHTML = `
    <div class="product-img-wrap">
      <div class="product-badges">${badgeHTML}</div>
      <img src="${product.image}" alt="${product.name}" loading="lazy" />
      <button class="wishlist-quick ${inWish ? 'active' : ''}" onclick="toggleWishlist(${product.id}, event)" title="${inWish ? 'Remove from Wishlist' : 'Add to Wishlist'}" id="wq-${product.id}">
        ${inWish ? '❤️' : '🤍'}
      </button>
      <div class="product-actions-overlay">
        <button class="action-btn" onclick="openProductModal(${product.id})" title="Quick View">👁</button>
        <button class="action-btn" onclick="toggleWishlist(${product.id}, event)" title="Wishlist">💖</button>
        <button class="action-btn" onclick="addToCart(${product.id})" title="Add to Cart">🛒</button>
      </div>
    </div>
    <div class="product-body">
      <div class="product-category">${product.category}</div>
      <h3 class="product-name">${product.name}</h3>
      <div class="product-rating">
        <span class="stars">${renderStars(product.rating)}</span>
        <span class="rating-count">(${product.reviews})</span>
      </div>
      <div class="product-price">
        <span class="price-current">${formatPrice(product.price)}</span>
        ${product.originalPrice !== product.price ? `<span class="price-original">${formatPrice(product.originalPrice)}</span>` : ''}
        ${discount > 0 ? `<span class="price-discount">-${discount}%</span>` : ''}
      </div>
      <button class="add-cart-btn ${inCart ? 'in-cart' : ''}" onclick="addToCart(${product.id})" id="cart-btn-${product.id}" ${product.stock === 0 ? 'disabled' : ''}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
        ${inCart ? 'Added to Cart ✓' : product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
      </button>
      <div class="product-stock ${stockClass}">${stockText}</div>
    </div>
  `;

  card.querySelector('.product-img-wrap img').addEventListener('click', () => openProductModal(product.id));
  card.querySelector('.product-name').addEventListener('click', () => openProductModal(product.id));
  return card;
}

// ─────────────────────────────────────────
// CART SYSTEM
// ─────────────────────────────────────────
function addToCart(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product || product.stock === 0) return;

  const existing = cart.find(i => i.id === productId);
  if (existing) {
    if (existing.qty < product.stock) {
      existing.qty++;
      showToast('🛒', 'Quantity Updated', `${product.name} × ${existing.qty}`);
    } else {
      showToast('⚠️', 'Stock Limit Reached', `Only ${product.stock} units available`, 'warning');
      return;
    }
  } else {
    cart.push({ id: productId, qty: 1 });
    showToast('✅', 'Added to Cart!', product.name, 'success');
  }

  saveState();
  updateBadges();
  updateCartButtons(productId);

  // Animate badge
  const badge = document.getElementById('cartBadge');
  badge.classList.remove('show');
  setTimeout(() => badge.classList.add('show'), 10);
}

function removeFromCart(productId) {
  cart = cart.filter(i => i.id !== productId);
  saveState();
  updateBadges();
  renderCart();
  updateCartButtons(productId);
}

function updateCartQty(productId, delta) {
  const item = cart.find(i => i.id === productId);
  if (!item) return;
  const product = PRODUCTS.find(p => p.id === productId);
  const newQty = item.qty + delta;
  if (newQty < 1) { removeFromCart(productId); return; }
  if (newQty > product.stock) {
    showToast('⚠️', 'Stock Limit', `Only ${product.stock} units available`, 'warning');
    return;
  }
  item.qty = newQty;
  saveState();
  updateBadges();
  renderCart();
}

function renderCart() {
  const body = document.getElementById('cartBody');
  const footer = document.getElementById('cartFooter');

  if (cart.length === 0) {
    body.innerHTML = `
      <div class="panel-empty">
        <div class="empty-icon">🛒</div>
        <h3>Your cart is empty</h3>
        <p>Add some amazing products to your cart and they'll appear here.</p>
        <button class="btn-primary" onclick="closePanel('cart'); showPage('shop')">
          <span>Start Shopping</span>
        </button>
      </div>`;
    footer.innerHTML = '';
    return;
  }

  let subtotal = 0;
  body.innerHTML = '';

  cart.forEach(item => {
    const product = PRODUCTS.find(p => p.id === item.id);
    if (!product) return;
    const lineTotal = product.price * item.qty;
    subtotal += lineTotal;

    const el = document.createElement('div');
    el.className = 'cart-item';
    el.innerHTML = `
      <img class="cart-item-img" src="${product.image}" alt="${product.name}" />
      <div class="cart-item-info">
        <div class="cart-item-cat">${product.category}</div>
        <div class="cart-item-name">${product.name}</div>
        <div class="cart-item-price">${formatPrice(lineTotal)}</div>
        <div class="cart-item-controls">
          <button class="qty-btn" onclick="updateCartQty(${product.id}, -1)">−</button>
          <span class="qty-value">${item.qty}</span>
          <button class="qty-btn" onclick="updateCartQty(${product.id}, +1)">+</button>
          <button class="cart-item-delete" onclick="removeFromCart(${product.id})" title="Remove">🗑</button>
        </div>
      </div>`;
    body.appendChild(el);
  });

  const shipping = subtotal >= 999 ? 0 : 99;
  const tax = Math.round(subtotal * 0.18);
  const total = subtotal + shipping + tax;

  footer.innerHTML = `
    <div class="cart-summary">
      <div class="summary-row">
        <span class="label">Subtotal (${cart.reduce((s,i) => s+i.qty, 0)} items)</span>
        <span class="value">${formatPrice(subtotal)}</span>
      </div>
      <div class="summary-row">
        <span class="label">Shipping</span>
        <span class="value ${shipping === 0 ? 'shipping-free' : ''}">${shipping === 0 ? 'FREE' : formatPrice(shipping)}</span>
      </div>
      <div class="summary-row">
        <span class="label">GST (18%)</span>
        <span class="value">${formatPrice(tax)}</span>
      </div>
      <div class="summary-row total">
        <span class="label">Total</span>
        <span class="value">${formatPrice(total)}</span>
      </div>
    </div>
    <button class="checkout-btn" onclick="checkout()">
      🛍 Proceed to Checkout
    </button>
    <button class="continue-btn" onclick="closePanel('cart')">Continue Shopping</button>`;
}

function checkout() {
  showToast('🎉', 'Order Placed!', 'Thank you for shopping with LUXE!', 'success');
  cart = [];
  saveState();
  updateBadges();
  closePanel('cart');
}

function updateCartButtons(productId) {
  const inCart = isInCart(productId);
  document.querySelectorAll(`#cart-btn-${productId}`).forEach(btn => {
    btn.className = `add-cart-btn ${inCart ? 'in-cart' : ''}`;
    btn.textContent = inCart ? 'Added to Cart ✓' : 'Add to Cart';
    btn.insertAdjacentHTML('afterbegin', `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>`);
  });
}

// ─────────────────────────────────────────
// WISHLIST SYSTEM
// ─────────────────────────────────────────
function toggleWishlist(productId, event) {
  if (event) { event.stopPropagation(); event.preventDefault(); }
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const idx = wishlist.findIndex(i => i.id === productId);
  if (idx === -1) {
    wishlist.push({ id: productId });
    showToast('💖', 'Wishlisted!', product.name);
  } else {
    wishlist.splice(idx, 1);
    showToast('💔', 'Removed from Wishlist', product.name);
  }

  saveState();
  updateBadges();
  updateWishlistButtons(productId);

  // Animate badge
  const badge = document.getElementById('wishlistBadge');
  badge.classList.remove('show');
  setTimeout(() => badge.classList.add('show'), 10);
}

function removeFromWishlist(productId) {
  wishlist = wishlist.filter(i => i.id !== productId);
  saveState();
  updateBadges();
  renderWishlist();
  updateWishlistButtons(productId);
}

function moveToCart(productId) {
  addToCart(productId);
  removeFromWishlist(productId);
  renderWishlist();
}

function addAllWishlistToCart() {
  wishlist.forEach(item => addToCart(item.id));
  showToast('🛒', 'All items added to cart!', '', 'success');
}

function renderWishlist() {
  const body = document.getElementById('wishlistBody');
  const footer = document.getElementById('wishlistFooter');

  if (wishlist.length === 0) {
    body.innerHTML = `
      <div class="panel-empty">
        <div class="empty-icon">💖</div>
        <h3>Your wishlist is empty</h3>
        <p>Save products you love and come back to them anytime.</p>
        <button class="btn-primary" onclick="closePanel('wishlist'); showPage('shop')">
          <span>Explore Products</span>
        </button>
      </div>`;
    footer.innerHTML = '';
    return;
  }

  body.innerHTML = '';
  wishlist.forEach(item => {
    const product = PRODUCTS.find(p => p.id === item.id);
    if (!product) return;
    const el = document.createElement('div');
    el.className = 'wishlist-item';
    el.innerHTML = `
      <img class="wishlist-item-img" src="${product.image}" alt="${product.name}" />
      <div class="wishlist-item-info">
        <div class="wishlist-item-cat">${product.category}</div>
        <div class="wishlist-item-name">${product.name}</div>
        <div class="wishlist-item-price">${formatPrice(product.price)}</div>
        <div class="wishlist-item-actions">
          <button class="wish-to-cart-btn" onclick="moveToCart(${product.id})">Add to Cart</button>
          <button class="wish-remove-btn" onclick="removeFromWishlist(${product.id})">Remove</button>
        </div>
      </div>`;
    body.appendChild(el);
  });

  footer.innerHTML = `
    <button class="checkout-btn" onclick="addAllWishlistToCart()">
      🛒 Move All to Cart
    </button>
    <button class="continue-btn" onclick="closePanel('wishlist')">Continue Shopping</button>`;
}

function updateWishlistButtons(productId) {
  const inWish = isInWishlist(productId);
  const btns = document.querySelectorAll(`#wq-${productId}`);
  btns.forEach(btn => {
    btn.className = `wishlist-quick ${inWish ? 'active' : ''}`;
    btn.innerHTML = inWish ? '❤️' : '🤍';
  });
}

// ─────────────────────────────────────────
// BADGE UPDATE
// ─────────────────────────────────────────
function updateBadges() {
  const cartTotal = cart.reduce((s, i) => s + i.qty, 0);
  const wishTotal = wishlist.length;

  const cartBadge = document.getElementById('cartBadge');
  const wishBadge = document.getElementById('wishlistBadge');

  cartBadge.textContent = cartTotal;
  wishBadge.textContent = wishTotal;

  cartBadge.className = `badge ${cartTotal > 0 ? 'show' : ''}`;
  wishBadge.className = `badge ${wishTotal > 0 ? 'show' : ''}`;
}

// ─────────────────────────────────────────
// PRODUCT MODAL
// ─────────────────────────────────────────
function openProductModal(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const discount = getDiscount(product.originalPrice, product.price);
  const inWish = isInWishlist(productId);

  const sizesHTML = product.sizes.map((s, i) =>
    `<button class="size-btn ${i === 0 ? 'selected' : ''}" onclick="this.parentNode.querySelectorAll('.size-btn').forEach(b=>b.classList.remove('selected')); this.classList.add('selected')">${s}</button>`
  ).join('');

  document.getElementById('modalContent').innerHTML = `
    <div class="modal-img-section">
      <img class="modal-img" src="${product.image}" alt="${product.name}" />
    </div>
    <div class="modal-info">
      <div class="modal-category">${product.category}</div>
      <h2 class="modal-name">${product.name}</h2>
      <div class="modal-rating">
        <span class="stars">${renderStars(product.rating)}</span>
        <span>${product.rating} (${product.reviews} reviews)</span>
      </div>
      <div class="modal-price">
        <span class="current">${formatPrice(product.price)}</span>
        ${product.originalPrice !== product.price ? `<span class="original">${formatPrice(product.originalPrice)}</span>` : ''}
        ${discount > 0 ? `<span class="discount">-${discount}%</span>` : ''}
      </div>
      <p class="modal-desc">${product.description}</p>
      ${product.sizes.length > 1 ? `
        <div class="modal-options">
          <h4>Select Size</h4>
          <div class="size-options">${sizesHTML}</div>
        </div>` : ''}
      <div class="modal-actions">
        <button class="modal-add-cart" onclick="addToCart(${product.id}); closeProductModal()">
          🛒 Add to Cart
        </button>
        <button class="modal-wishlist-btn ${inWish ? 'active' : ''}" id="modal-wish-${product.id}" onclick="toggleWishlist(${product.id}, event); this.classList.toggle('active')">
          ${inWish ? '❤️' : '🤍'}
        </button>
      </div>
      <div class="product-stock ${product.stock <= 5 ? 'low' : ''}">
        ${product.stock === 0 ? '❌ Out of Stock' : product.stock <= 5 ? `⚠️ Only ${product.stock} left in stock!` : `✅ In Stock (${product.stock} units)`}
      </div>
    </div>`;

  document.getElementById('productModalOverlay').classList.add('active');
  document.getElementById('productModal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeProductModal() {
  document.getElementById('productModalOverlay').classList.remove('active');
  document.getElementById('productModal').classList.remove('open');
  document.body.style.overflow = '';
}

// ─────────────────────────────────────────
// SHOP PAGE / FILTERS
// ─────────────────────────────────────────
function initShopPage() {
  renderCategoryFilters();
  applyFilters();
}

function renderCategoryFilters() {
  const container = document.getElementById('categoryFilters');
  if (!container || container.dataset.rendered) return;
  container.dataset.rendered = 'true';

  const categories = [...new Set(PRODUCTS.map(p => p.category))];
  categories.forEach(cat => {
    const count = PRODUCTS.filter(p => p.category === cat).length;
    const label = document.createElement('label');
    label.className = 'filter-checkbox';
    label.innerHTML = `
      <input type="checkbox" value="${cat}" onchange="toggleCategoryFilter('${cat}')" />
      <span>${cat}</span>
      <span class="filter-count">${count}</span>`;
    container.appendChild(label);
  });
}

function toggleCategoryFilter(cat) {
  const idx = filters.category.indexOf(cat);
  if (idx === -1) filters.category.push(cat);
  else filters.category.splice(idx, 1);
  applyFilters();
}

function updatePriceFilter(val) {
  filters.maxPrice = parseInt(val);
  document.getElementById('priceLabel').textContent = '₹' + parseInt(val).toLocaleString('en-IN');
  applyFilters();
}

function filterByRating(rating, btn) {
  filters.minRating = rating;
  document.querySelectorAll('.rating-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  applyFilters();
}

function applyFilters() {
  const inStockOnly = document.getElementById('inStockOnly')?.checked || false;
  const onSaleOnly = document.getElementById('onSaleOnly')?.checked || false;

  filteredProducts = PRODUCTS.filter(p => {
    if (filters.category.length && !filters.category.includes(p.category)) return false;
    if (p.price > filters.maxPrice) return false;
    if (p.rating < filters.minRating) return false;
    if (inStockOnly && p.stock === 0) return false;
    if (onSaleOnly && !p.isSale) return false;
    return true;
  });

  sortProducts(filters.sort, false);
  displayedCount = 0;
  renderShopGrid(true);
}

function sortProducts(value, render = true) {
  filters.sort = value;
  const s = [...filteredProducts];
  switch (value) {
    case 'price-low': filteredProducts = s.sort((a, b) => a.price - b.price); break;
    case 'price-high': filteredProducts = s.sort((a, b) => b.price - a.price); break;
    case 'rating': filteredProducts = s.sort((a, b) => b.rating - a.rating); break;
    case 'newest': filteredProducts = s.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0)); break;
    case 'name-az': filteredProducts = s.sort((a, b) => a.name.localeCompare(b.name)); break;
    default: break;
  }
  if (render) { displayedCount = 0; renderShopGrid(true); }
}

function renderShopGrid(reset = false) {
  const grid = document.getElementById('shopGrid');
  if (!grid) return;
  if (reset) grid.innerHTML = '';

  const slice = filteredProducts.slice(displayedCount, displayedCount + ITEMS_PER_PAGE);
  slice.forEach(p => grid.appendChild(createProductCard(p)));
  displayedCount += slice.length;

  const count = document.getElementById('productCount');
  if (count) count.innerHTML = `Showing <strong>${Math.min(displayedCount, filteredProducts.length)}</strong> of <strong>${filteredProducts.length}</strong> products`;

  const loadBtn = document.getElementById('loadMoreBtn');
  if (loadBtn) loadBtn.style.display = displayedCount >= filteredProducts.length ? 'none' : 'inline-flex';
}

function loadMoreProducts() {
  renderShopGrid(false);
}

function clearFilters() {
  filters.category = [];
  filters.maxPrice = 50000;
  filters.minRating = 0;
  filters.sort = 'default';

  document.querySelectorAll('#categoryFilters input[type="checkbox"]').forEach(cb => cb.checked = false);
  const priceRange = document.getElementById('priceRange');
  if (priceRange) { priceRange.value = 50000; document.getElementById('priceLabel').textContent = '₹50,000'; }
  document.getElementById('inStockOnly').checked = false;
  document.getElementById('onSaleOnly').checked = false;
  document.querySelectorAll('.rating-btn').forEach((b, i) => b.classList.toggle('active', i === 0));
  document.getElementById('sortSelect').value = 'default';

  applyFilters();
  showToast('🔄', 'Filters Cleared', 'Showing all products');
}

function filterByCategory(cat) {
  showPage('shop');
  setTimeout(() => {
    initShopPage();
    filters.category = [cat];
    const cb = document.querySelector(`#categoryFilters input[value="${cat}"]`);
    if (cb) cb.checked = true;
    applyFilters();
  }, 100);
}

function setView(type) {
  const grid = document.getElementById('shopGrid');
  if (!grid) return;
  if (type === 'grid') {
    grid.classList.remove('list-view');
    document.getElementById('gridViewBtn').classList.add('active');
    document.getElementById('listViewBtn').classList.remove('active');
  } else {
    grid.classList.add('list-view');
    document.getElementById('listViewBtn').classList.add('active');
    document.getElementById('gridViewBtn').classList.remove('active');
  }
}

// ─────────────────────────────────────────
// FEATURED PRODUCTS (HOME)
// ─────────────────────────────────────────
function renderFeaturedProducts() {
  const grid = document.getElementById('featuredGrid');
  if (!grid) return;
  const featured = PRODUCTS.filter(p => p.rating >= 4.6).slice(0, 4);
  featured.forEach(p => grid.appendChild(createProductCard(p)));
}

// ─────────────────────────────────────────
// DEALS SECTION (HOME + DEALS PAGE)
// ─────────────────────────────────────────
function renderHomeDeals() {
  const grid = document.getElementById('dealsGrid');
  if (!grid) return;
  const deals = PRODUCTS.filter(p => p.isSale).slice(0, 4);
  deals.forEach(p => {
    const discount = getDiscount(p.originalPrice, p.price);
    const el = document.createElement('div');
    el.className = 'deal-card';
    el.innerHTML = `
      <div class="deal-timer">${discount}% OFF</div>
      ${createProductCard(p).outerHTML}`;
    // Re-render properly
    const card = createProductCard(p);
    card.style.borderRadius = '0';
    card.style.border = 'none';
    card.style.background = 'transparent';
    const dealCard = document.createElement('div');
    dealCard.className = 'deal-card';
    dealCard.innerHTML = `<div class="deal-timer">${discount}% OFF</div>`;
    dealCard.appendChild(card);
    grid.appendChild(dealCard);
  });
}

function renderDealsPage() {
  const grid = document.getElementById('dealsPageGrid');
  if (!grid || grid.dataset.rendered) return;
  grid.dataset.rendered = 'true';
  const deals = PRODUCTS.filter(p => p.isSale);
  deals.forEach(p => grid.appendChild(createProductCard(p)));
}

// ─────────────────────────────────────────
// ALL CATEGORIES PAGE
// ─────────────────────────────────────────
function renderAllCategories() {
  const grid = document.getElementById('allCategoriesGrid');
  if (!grid || grid.dataset.rendered) return;
  grid.dataset.rendered = 'true';

  CATEGORIES.forEach(cat => {
    const el = document.createElement('div');
    el.className = 'all-cat-card';
    el.style.setProperty('--cat-color', cat.color);
    el.onclick = () => filterByCategory(cat.name);
    el.innerHTML = `
      <div class="all-cat-icon">${cat.icon}</div>
      <h3>${cat.name}</h3>
      <p>${cat.count} Products</p>`;
    grid.appendChild(el);
  });
}

// ─────────────────────────────────────────
// SEARCH SYSTEM
// ─────────────────────────────────────────
let searchTimeout;
function setupSearch() {
  const input = document.getElementById('searchInput');
  const results = document.getElementById('searchResults');
  const toggle = document.getElementById('searchToggle');
  const bar = document.getElementById('searchBar');
  const closeBtn = document.getElementById('searchClose');

  toggle.addEventListener('click', () => {
    bar.classList.toggle('open');
    if (bar.classList.contains('open')) input.focus();
    else { results.innerHTML = ''; results.classList.remove('has-results'); }
  });

  closeBtn.addEventListener('click', () => {
    bar.classList.remove('open');
    results.innerHTML = '';
    results.classList.remove('has-results');
    input.value = '';
  });

  input.addEventListener('input', () => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      const q = input.value.trim().toLowerCase();
      if (!q) { results.innerHTML = ''; results.classList.remove('has-results'); return; }

      const matches = PRODUCTS.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
      ).slice(0, 6);

      if (!matches.length) {
        results.innerHTML = '<div class="search-result-item"><div class="search-result-info"><strong>No results found</strong><small>Try a different search term</small></div></div>';
        results.classList.add('has-results');
        return;
      }

      results.innerHTML = matches.map(p => `
        <div class="search-result-item" onclick="openProductModal(${p.id}); document.getElementById('searchBar').classList.remove('open')">
          <img src="${p.image}" alt="${p.name}" />
          <div class="search-result-info">
            <strong>${p.name}</strong>
            <small>${p.category} • ${formatPrice(p.price)}</small>
          </div>
        </div>`).join('');
      results.classList.add('has-results');
    }, 250);
  });
}

// ─────────────────────────────────────────
// COUNTDOWN TIMER
// ─────────────────────────────────────────
function startCountdown() {
  function update() {
    const now = new Date();
    const midnight = new Date();
    midnight.setHours(24, 0, 0, 0);
    const diff = midnight - now;
    const h = Math.floor(diff / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    const fmt = n => String(n).padStart(2, '0');
    const hEl = document.getElementById('countHours');
    const mEl = document.getElementById('countMins');
    const sEl = document.getElementById('countSecs');
    if (hEl) hEl.textContent = fmt(h);
    if (mEl) mEl.textContent = fmt(m);
    if (sEl) sEl.textContent = fmt(s);
  }
  update();
  setInterval(update, 1000);
}

// ─────────────────────────────────────────
// HERO PARTICLES
// ─────────────────────────────────────────
function createParticles() {
  const container = document.getElementById('heroParticles');
  if (!container) return;
  for (let i = 0; i < 30; i++) {
    const p = document.createElement('div');
    const size = Math.random() * 4 + 1;
    p.style.cssText = `
      position: absolute;
      width: ${size}px; height: ${size}px;
      background: rgba(168,85,247,${Math.random() * 0.5 + 0.1});
      border-radius: 50%;
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      animation: particleFloat ${Math.random() * 10 + 8}s ease-in-out infinite;
      animation-delay: ${Math.random() * 5}s;
    `;
    container.appendChild(p);
  }

  const style = document.createElement('style');
  style.textContent = `
    @keyframes particleFloat {
      0%, 100% { transform: translateY(0) translateX(0); opacity: 0.3; }
      25% { transform: translateY(-30px) translateX(15px); opacity: 0.8; }
      50% { transform: translateY(-15px) translateX(-10px); opacity: 0.5; }
      75% { transform: translateY(-40px) translateX(5px); opacity: 0.9; }
    }
  `;
  document.head.appendChild(style);
}

// ─────────────────────────────────────────
// NAVBAR SCROLL
// ─────────────────────────────────────────
function setupNavbar() {
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  });

  // Hamburger
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('mobile-open');
    hamburger.classList.toggle('open');
  });

  // User dropdown
  document.getElementById('userToggle').addEventListener('click', (e) => {
    e.stopPropagation();
    document.getElementById('userDropdown').classList.toggle('open');
  });

  document.addEventListener('click', () => {
    document.getElementById('userDropdown').classList.remove('open');
  });

  // Cart / Wishlist toggles
  document.getElementById('cartToggle').addEventListener('click', () => openPanel('cart'));
  document.getElementById('wishlistToggle').addEventListener('click', () => openPanel('wishlist'));
}

function closeDropdown() {
  document.getElementById('userDropdown').classList.remove('open');
}

// ─────────────────────────────────────────
// NEWSLETTER
// ─────────────────────────────────────────
function subscribeNewsletter(e) {
  e.preventDefault();
  const email = document.getElementById('newsletterEmail').value;
  showToast('🎉', 'Successfully Subscribed!', `Welcome to LUXE, ${email}`, 'success');
  e.target.reset();
}

// ─────────────────────────────────────────
// INIT
// ─────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  // Copy product images to assets folder (handled via relative paths)
  setupNavbar();
  setupSearch();
  createParticles();
  renderFeaturedProducts();
  renderHomeDeals();
  startCountdown();
  updateBadges();

  // Keyboard shortcuts
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeProductModal();
      closePanel('cart');
      closePanel('wishlist');
    }
  });

  // Animate sections on scroll
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.opacity = '1';
        e.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.feature-card, .cat-card, .all-cat-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
  });
});
