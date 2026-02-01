/**
 * SadaKappda Premium Theme - JavaScript
 */

// Cart functionality
class CartDrawer {
  constructor() {
    this.drawer = document.getElementById('cart-drawer');
    this.overlay = document.getElementById('cart-drawer-overlay');
    this.openTriggers = document.querySelectorAll('[data-cart-drawer-open]');
    this.closeTriggers = document.querySelectorAll('[data-cart-drawer-close]');
    
    if (!this.drawer) return;
    
    this.init();
  }
  
  init() {
    this.openTriggers.forEach(trigger => {
      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        this.open();
      });
    });
    
    this.closeTriggers.forEach(trigger => {
      trigger.addEventListener('click', () => this.close());
    });
    
    if (this.overlay) {
      this.overlay.addEventListener('click', () => this.close());
    }
    
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.drawer.classList.contains('is-open')) {
        this.close();
      }
    });
  }
  
  open() {
    this.drawer.classList.add('is-open');
    if (this.overlay) this.overlay.classList.add('is-visible');
    document.body.style.overflow = 'hidden';
    this.fetchCart();
  }
  
  close() {
    this.drawer.classList.remove('is-open');
    if (this.overlay) this.overlay.classList.remove('is-visible');
    document.body.style.overflow = '';
  }
  
  async fetchCart() {
    try {
      const response = await fetch('/cart.js');
      const cart = await response.json();
      this.renderCart(cart);
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  }
  
  renderCart(cart) {
    const itemsContainer = document.getElementById('cart-drawer-items');
    const subtotalEl = document.getElementById('cart-drawer-subtotal');
    const countEl = document.querySelectorAll('[data-cart-count]');
    const emptyState = document.getElementById('cart-drawer-empty');
    const filledState = document.getElementById('cart-drawer-filled');
    
    // Update count badges
    countEl.forEach(el => {
      el.textContent = cart.item_count;
      el.style.display = cart.item_count > 0 ? 'flex' : 'none';
    });
    
    if (cart.item_count === 0) {
      if (emptyState) emptyState.style.display = 'block';
      if (filledState) filledState.style.display = 'none';
      return;
    }
    
    if (emptyState) emptyState.style.display = 'none';
    if (filledState) filledState.style.display = 'block';
    
    if (itemsContainer) {
      itemsContainer.innerHTML = cart.items.map(item => this.renderCartItem(item)).join('');
    }
    
    if (subtotalEl) {
      subtotalEl.textContent = this.formatMoney(cart.total_price);
    }
    
    this.updateFreeShippingBar(cart.total_price);
    this.attachItemListeners();
  }
  
  renderCartItem(item) {
    return `
      <div class="cart-item" data-key="${item.key}">
        <div class="cart-item__image">
          <a href="${item.url}">
            <img src="${item.image ? item.image.replace(/(\.[^\.]+)$/, '_small$1') : ''}" 
                 alt="${item.title}" 
                 loading="lazy">
          </a>
        </div>
        <div class="cart-item__content">
          <div class="cart-item__header">
            <a href="${item.url}" class="cart-item__title">${item.product_title}</a>
            <button class="cart-item__remove" data-remove="${item.key}" aria-label="Remove item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
          ${item.variant_title ? `<div class="cart-item__variant">${item.variant_title}</div>` : ''}
          <div class="cart-item__footer">
            <div class="quantity-selector">
              <button class="quantity-selector__button" data-decrease="${item.key}">−</button>
              <input type="number" class="quantity-selector__input" value="${item.quantity}" min="1" data-quantity="${item.key}">
              <button class="quantity-selector__button" data-increase="${item.key}">+</button>
            </div>
            <div class="cart-item__price">
              ${item.original_line_price !== item.final_line_price 
                ? `<span class="cart-item__price-compare">${this.formatMoney(item.original_line_price)}</span>` 
                : ''}
              <span class="cart-item__price-current">${this.formatMoney(item.final_line_price)}</span>
            </div>
          </div>
        </div>
      </div>
    `;
  }
  
  attachItemListeners() {
    document.querySelectorAll('[data-remove]').forEach(btn => {
      btn.addEventListener('click', () => this.updateQuantity(btn.dataset.remove, 0));
    });
    
    document.querySelectorAll('[data-decrease]').forEach(btn => {
      btn.addEventListener('click', () => {
        const input = document.querySelector(`[data-quantity="${btn.dataset.decrease}"]`);
        const newQty = Math.max(0, parseInt(input.value) - 1);
        this.updateQuantity(btn.dataset.decrease, newQty);
      });
    });
    
    document.querySelectorAll('[data-increase]').forEach(btn => {
      btn.addEventListener('click', () => {
        const input = document.querySelector(`[data-quantity="${btn.dataset.increase}"]`);
        const newQty = parseInt(input.value) + 1;
        this.updateQuantity(btn.dataset.increase, newQty);
      });
    });
  }
  
  async updateQuantity(key, quantity) {
    try {
      const response = await fetch('/cart/change.js', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: key, quantity })
      });
      const cart = await response.json();
      this.renderCart(cart);
    } catch (error) {
      console.error('Error updating cart:', error);
    }
  }
  
  updateFreeShippingBar(totalPrice) {
    const bar = document.getElementById('free-shipping-bar');
    const text = document.getElementById('free-shipping-text');
    const threshold = window.freeShippingThreshold * 100; // Convert to cents
    
    if (!bar || !text) return;
    
    const remaining = threshold - totalPrice;
    const percentage = Math.min(100, (totalPrice / threshold) * 100);
    
    bar.style.width = `${percentage}%`;
    
    if (remaining <= 0) {
      text.textContent = '🎉 You\'ve unlocked FREE shipping!';
    } else {
      text.textContent = `Add ₹${(remaining / 100).toFixed(0)} more for FREE shipping`;
    }
  }
  
  formatMoney(cents) {
    return '₹' + (cents / 100).toFixed(0);
  }
}

// Add to Cart functionality
class AddToCart {
  constructor() {
    this.forms = document.querySelectorAll('form[action="/cart/add"]');
    this.init();
  }
  
  init() {
    this.forms.forEach(form => {
      form.addEventListener('submit', (e) => this.handleSubmit(e, form));
    });
    
    // Quick add buttons
    document.querySelectorAll('[data-quick-add]').forEach(btn => {
      btn.addEventListener('click', (e) => this.quickAdd(e, btn));
    });
  }
  
  async handleSubmit(e, form) {
    e.preventDefault();
    
    const submitBtn = form.querySelector('[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    submitBtn.innerHTML = '<span class="loading-spinner"></span>';
    submitBtn.disabled = true;
    
    try {
      const formData = new FormData(form);
      const response = await fetch('/cart/add.js', {
        method: 'POST',
        body: formData
      });
      
      if (!response.ok) throw new Error('Failed to add to cart');
      
      submitBtn.innerHTML = '✓ Added!';
      
      // Open cart drawer
      setTimeout(() => {
        const cartDrawer = document.getElementById('cart-drawer');
        if (cartDrawer) {
          cartDrawer.classList.add('is-open');
          document.getElementById('cart-drawer-overlay')?.classList.add('is-visible');
          document.body.style.overflow = 'hidden';
          window.cartDrawer?.fetchCart();
        }
      }, 300);
      
      setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
      }, 2000);
      
    } catch (error) {
      console.error('Error adding to cart:', error);
      submitBtn.innerHTML = 'Error - Try Again';
      setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
      }, 2000);
    }
  }
  
  async quickAdd(e, btn) {
    e.preventDefault();
    
    const variantId = btn.dataset.quickAdd;
    const originalText = btn.innerHTML;
    
    btn.innerHTML = '<span class="loading-spinner"></span>';
    btn.disabled = true;
    
    try {
      const response = await fetch('/cart/add.js', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: [{ id: variantId, quantity: 1 }]
        })
      });
      
      if (!response.ok) throw new Error('Failed to add to cart');
      
      btn.innerHTML = '✓ Added';
      
      // Update cart count
      const cartResponse = await fetch('/cart.js');
      const cart = await cartResponse.json();
      document.querySelectorAll('[data-cart-count]').forEach(el => {
        el.textContent = cart.item_count;
        el.style.display = cart.item_count > 0 ? 'flex' : 'none';
      });
      
      setTimeout(() => {
        btn.innerHTML = originalText;
        btn.disabled = false;
      }, 1500);
      
    } catch (error) {
      console.error('Error:', error);
      btn.innerHTML = originalText;
      btn.disabled = false;
    }
  }
}

// Header scroll behavior
class Header {
  constructor() {
    this.header = document.getElementById('site-header');
    this.announcement = document.querySelector('.announcement-bar');
    this.lastScroll = 0;
    
    if (!this.header) return;
    
    this.init();
  }
  
  init() {
    window.addEventListener('scroll', () => this.onScroll(), { passive: true });
  }
  
  onScroll() {
    const currentScroll = window.pageYOffset;
    const announcementHeight = this.announcement?.offsetHeight || 0;
    
    if (currentScroll > announcementHeight) {
      this.header.classList.add('is-scrolled');
    } else {
      this.header.classList.remove('is-scrolled');
    }
    
    // Hide on scroll down, show on scroll up
    if (currentScroll > this.lastScroll && currentScroll > 200) {
      this.header.classList.add('is-hidden');
    } else {
      this.header.classList.remove('is-hidden');
    }
    
    this.lastScroll = currentScroll;
  }
}

// Mobile Menu
class MobileMenu {
  constructor() {
    this.menu = document.getElementById('mobile-menu');
    this.overlay = document.getElementById('mobile-menu-overlay');
    this.openBtn = document.querySelector('[data-mobile-menu-open]');
    this.closeBtn = document.querySelector('[data-mobile-menu-close]');
    
    if (!this.menu) return;
    
    this.init();
  }
  
  init() {
    this.openBtn?.addEventListener('click', () => this.open());
    this.closeBtn?.addEventListener('click', () => this.close());
    this.overlay?.addEventListener('click', () => this.close());
    
    // Submenu toggles
    this.menu.querySelectorAll('[data-submenu-toggle]').forEach(toggle => {
      toggle.addEventListener('click', (e) => {
        e.preventDefault();
        const submenu = toggle.nextElementSibling;
        toggle.classList.toggle('is-open');
        submenu?.classList.toggle('is-open');
      });
    });
  }
  
  open() {
    this.menu.classList.add('is-open');
    this.overlay?.classList.add('is-visible');
    document.body.style.overflow = 'hidden';
  }
  
  close() {
    this.menu.classList.remove('is-open');
    this.overlay?.classList.remove('is-visible');
    document.body.style.overflow = '';
  }
}

// Search functionality
class Search {
  constructor() {
    this.searchToggle = document.querySelectorAll('[data-search-toggle]');
    this.searchOverlay = document.getElementById('search-overlay');
    this.searchInput = document.getElementById('search-input');
    this.searchResults = document.getElementById('search-results');
    this.searchClose = document.querySelector('[data-search-close]');
    
    if (!this.searchOverlay) return;
    
    this.init();
  }
  
  init() {
    this.searchToggle.forEach(btn => {
      btn.addEventListener('click', () => this.open());
    });
    
    this.searchClose?.addEventListener('click', () => this.close());
    
    this.searchOverlay?.addEventListener('click', (e) => {
      if (e.target === this.searchOverlay) this.close();
    });
    
    this.searchInput?.addEventListener('input', this.debounce(() => this.search(), 300));
    
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.searchOverlay?.classList.contains('is-open')) {
        this.close();
      }
    });
  }
  
  open() {
    this.searchOverlay?.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    setTimeout(() => this.searchInput?.focus(), 100);
  }
  
  close() {
    this.searchOverlay?.classList.remove('is-open');
    document.body.style.overflow = '';
  }
  
  async search() {
    const query = this.searchInput?.value.trim();
    
    if (!query || query.length < 2) {
      if (this.searchResults) this.searchResults.innerHTML = '';
      return;
    }
    
    try {
      const response = await fetch(`/search/suggest.json?q=${encodeURIComponent(query)}&resources[type]=product&resources[limit]=6`);
      const data = await response.json();
      this.renderResults(data.resources.results.products);
    } catch (error) {
      console.error('Search error:', error);
    }
  }
  
  renderResults(products) {
    if (!this.searchResults) return;
    
    if (!products || products.length === 0) {
      this.searchResults.innerHTML = '<p class="search-results__empty">No results found</p>';
      return;
    }
    
    this.searchResults.innerHTML = `
      <div class="search-results__grid">
        ${products.map(product => `
          <a href="${product.url}" class="search-result">
            <div class="search-result__image">
              ${product.image ? `<img src="${product.image.replace(/(\.[^\.]+)$/, '_small$1')}" alt="${product.title}">` : ''}
            </div>
            <div class="search-result__content">
              <h4 class="search-result__title">${product.title}</h4>
              <p class="search-result__price">${product.price}</p>
            </div>
          </a>
        `).join('')}
      </div>
    `;
  }
  
  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }
}

// Quantity Selector
class QuantitySelector {
  constructor() {
    this.init();
  }
  
  init() {
    document.querySelectorAll('.quantity-selector').forEach(selector => {
      const decreaseBtn = selector.querySelector('[data-quantity-decrease]');
      const increaseBtn = selector.querySelector('[data-quantity-increase]');
      const input = selector.querySelector('input');
      
      decreaseBtn?.addEventListener('click', () => {
        const min = parseInt(input.min) || 1;
        input.value = Math.max(min, parseInt(input.value) - 1);
        input.dispatchEvent(new Event('change'));
      });
      
      increaseBtn?.addEventListener('click', () => {
        const max = parseInt(input.max) || 999;
        input.value = Math.min(max, parseInt(input.value) + 1);
        input.dispatchEvent(new Event('change'));
      });
    });
  }
}

// Product Image Gallery
class ProductGallery {
  constructor() {
    this.container = document.querySelector('.product-gallery');
    if (!this.container) return;
    
    this.mainImage = this.container.querySelector('.product-gallery__main-image img');
    this.thumbnails = this.container.querySelectorAll('.product-gallery__thumbnail');
    
    this.init();
  }
  
  init() {
    this.thumbnails.forEach(thumb => {
      thumb.addEventListener('click', () => {
        const newSrc = thumb.dataset.src;
        if (this.mainImage && newSrc) {
          this.mainImage.src = newSrc;
          this.thumbnails.forEach(t => t.classList.remove('is-active'));
          thumb.classList.add('is-active');
        }
      });
    });
  }
}

// Variant Selector
class VariantSelector {
  constructor() {
    this.selectors = document.querySelectorAll('[data-variant-selector]');
    this.priceEl = document.querySelector('[data-product-price]');
    this.comparePriceEl = document.querySelector('[data-product-compare-price]');
    this.addToCartBtn = document.querySelector('[data-add-to-cart]');
    this.variantInput = document.querySelector('[name="id"]');
    
    if (this.selectors.length === 0) return;
    
    this.init();
  }
  
  init() {
    this.selectors.forEach(selector => {
      selector.addEventListener('change', () => this.updateVariant());
    });
  }
  
  updateVariant() {
    // This would typically use product JSON to find the matching variant
    // For now, we'll handle this via Shopify's default behavior
  }
}

// Announcement Bar Slider
class AnnouncementSlider {
  constructor() {
    this.slider = document.querySelector('.announcement-slider');
    if (!this.slider) return;
    
    this.slides = this.slider.querySelectorAll('.announcement-slide');
    this.currentIndex = 0;
    this.interval = null;
    
    if (this.slides.length > 1) {
      this.init();
    }
  }
  
  init() {
    this.interval = setInterval(() => this.next(), 4000);
  }
  
  next() {
    this.slides[this.currentIndex].classList.remove('is-active');
    this.currentIndex = (this.currentIndex + 1) % this.slides.length;
    this.slides[this.currentIndex].classList.add('is-active');
  }
}

// Hero Slider
class HeroSlider {
  constructor() {
    this.slider = document.querySelector('.hero-slider');
    if (!this.slider) return;
    
    this.slides = this.slider.querySelectorAll('.hero-slide');
    this.dots = this.slider.querySelectorAll('.hero-slider__dot');
    this.prevBtn = this.slider.querySelector('.hero-slider__prev');
    this.nextBtn = this.slider.querySelector('.hero-slider__next');
    this.currentIndex = 0;
    this.autoplayInterval = null;
    
    if (this.slides.length > 1) {
      this.init();
    }
  }
  
  init() {
    this.prevBtn?.addEventListener('click', () => this.prev());
    this.nextBtn?.addEventListener('click', () => this.next());
    
    this.dots.forEach((dot, index) => {
      dot.addEventListener('click', () => this.goTo(index));
    });
    
    // Touch support
    let touchStartX = 0;
    this.slider.addEventListener('touchstart', (e) => {
      touchStartX = e.touches[0].clientX;
    }, { passive: true });
    
    this.slider.addEventListener('touchend', (e) => {
      const touchEndX = e.changedTouches[0].clientX;
      const diff = touchStartX - touchEndX;
      if (Math.abs(diff) > 50) {
        diff > 0 ? this.next() : this.prev();
      }
    }, { passive: true });
    
    // Autoplay
    this.startAutoplay();
    this.slider.addEventListener('mouseenter', () => this.stopAutoplay());
    this.slider.addEventListener('mouseleave', () => this.startAutoplay());
  }
  
  startAutoplay() {
    this.autoplayInterval = setInterval(() => this.next(), 5000);
  }
  
  stopAutoplay() {
    clearInterval(this.autoplayInterval);
  }
  
  goTo(index) {
    this.slides[this.currentIndex].classList.remove('is-active');
    this.dots[this.currentIndex]?.classList.remove('is-active');
    this.currentIndex = index;
    this.slides[this.currentIndex].classList.add('is-active');
    this.dots[this.currentIndex]?.classList.add('is-active');
  }
  
  next() {
    this.goTo((this.currentIndex + 1) % this.slides.length);
  }
  
  prev() {
    this.goTo((this.currentIndex - 1 + this.slides.length) % this.slides.length);
  }
}

// Lazy Loading Images
class LazyLoad {
  constructor() {
    if ('IntersectionObserver' in window) {
      this.observer = new IntersectionObserver(this.handleIntersection.bind(this), {
        rootMargin: '200px 0px'
      });
      
      document.querySelectorAll('[data-lazy]').forEach(img => {
        this.observer.observe(img);
      });
    } else {
      // Fallback for older browsers
      document.querySelectorAll('[data-lazy]').forEach(img => {
        img.src = img.dataset.lazy;
      });
    }
  }
  
  handleIntersection(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.lazy;
        img.removeAttribute('data-lazy');
        this.observer.unobserve(img);
      }
    });
  }
}

// Collection Filters
class CollectionFilters {
  constructor() {
    this.filtersForm = document.getElementById('collection-filters-form');
    this.filtersMobile = document.getElementById('filters-mobile');
    this.filtersToggle = document.querySelector('[data-filters-toggle]');
    this.filtersClose = document.querySelector('[data-filters-close]');
    this.sortSelect = document.getElementById('sort-by');
    
    if (!this.filtersForm) return;
    
    this.init();
  }
  
  init() {
    this.filtersToggle?.addEventListener('click', () => {
      this.filtersMobile?.classList.add('is-open');
      document.body.style.overflow = 'hidden';
    });
    
    this.filtersClose?.addEventListener('click', () => {
      this.filtersMobile?.classList.remove('is-open');
      document.body.style.overflow = '';
    });
    
    this.sortSelect?.addEventListener('change', () => {
      this.filtersForm?.submit();
    });
  }
}

// Initialize all components when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.cartDrawer = new CartDrawer();
  new AddToCart();
  new Header();
  new MobileMenu();
  new Search();
  new QuantitySelector();
  new ProductGallery();
  new VariantSelector();
  new AnnouncementSlider();
  new HeroSlider();
  new LazyLoad();
  new CollectionFilters();
});

// Expose cart drawer for external access
window.openCartDrawer = () => {
  window.cartDrawer?.open();
};
