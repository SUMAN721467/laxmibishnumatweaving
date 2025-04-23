// Product data
const products = [
  {
    id: 1,
    name: "Foldable Mat",
    price: 1599,
    image: "https://m.media-amazon.com/images/I/91tRD6Yzl2L._SX679_.jpg",
    description: "Cotton Cushion Sleeping Foldable Mat, 4x6ft, Brown"
  },
  {
    id: 2,
    name: "Folding Floor Chatai Mat",
    price: 799,
    image: "https://m.media-amazon.com/images/I/816qOWxOB4L._SL1500_.jpg",
    description: "Montelal Store Traditional Folding Floor Chatai Mat (Blue, Madurkathi River Grass Sedge, 4.5 X 6.5 Feet)"
  },
  {
    id: 3,
    name: "Puja Asan",
    price: 149.99,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRX07P1Igm8lhh7uPYaL3FW7VmcAYwxg4d4Vw&s",
    description: "Elegant Puja Asan or Chatai /Pooja Mat For Sankranti"
  },
  {
    id: 4,
    name: "Plastic Mats for Sleeping",
    price: 299.99,
    image: "https://m.media-amazon.com/images/I/81kaAYr3SQL._SL1500_.jpg",
    description: "Plastic Mats for Sleeping On Floor Sitting Reversible Chatai Square Shape Mats for Home Living Room, Bedroom Floor, 4X6 Feet, Assorted."
  }
];

// Cart functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];
const cartCount = document.querySelector('.cart-count');

function updateCartCount() {
  cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
  localStorage.setItem('cart', JSON.stringify(cart));
}

function addToCart(productId, button) {
  const product = products.find(p => p.id === productId);
  if (product) {
    const cartItem = cart.find(item => item.id === productId);
    if (cartItem) {
      cartItem.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    updateCartCount();
    
    // Add animation to button
    button.classList.add('adding');
    setTimeout(() => {
      button.classList.remove('adding');
      showNotification('Product added to cart!');
    }, 300);
  }
}

// Notification system
function showNotification(message) {
  const notification = document.createElement('div');
  notification.className = 'notification';
  notification.textContent = message;
  document.body.appendChild(notification);
  setTimeout(() => {
    notification.classList.add('show');
    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => notification.remove(), 300);
    }, 2000);
  }, 100);
}

// Render products
function createProductCard(product) {
  return `
    <div class="product-card" data-id="${product.id}">
      <img src="${product.image}" alt="${product.name}" class="product-image">
      <div class="product-info">
        <h3 class="product-name">${product.name}</h3>
        <p class="product-price">₹${product.price.toFixed(2)}</p>
        <div class="product-actions">
          <button class="view-details">View Details</button>
          <button class="add-to-cart" onclick="addToCart(${product.id}, this)">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  `;
}

function renderProducts() {
  const featuredProducts = document.getElementById('featured-products');
  const newProducts = document.getElementById('new-products');
  
  if (featuredProducts) {
    featuredProducts.innerHTML = products
      .slice(0, 4)
      .map(createProductCard)
      .join('');
  }
  
  if (newProducts) {
    newProducts.innerHTML = products
      .slice(0, 4)
      .reverse()
      .map(createProductCard)
      .join('');
  }

  // Add event listeners for product details
  document.querySelectorAll('.view-details').forEach(button => {
    button.addEventListener('click', (e) => {
      const productId = e.target.closest('.product-card').dataset.id;
      showProductDetails(productId);
    });
  });
}

// Product details modal
function showProductDetails(productId) {
  const product = products.find(p => p.id === parseInt(productId));
  if (!product) return;

  const modal = document.getElementById('product-modal');
  const modalBody = document.getElementById('modal-body');
  
  modalBody.innerHTML = `
    <div class="modal-product">
      <img src="${product.image}" alt="${product.name}" class="modal-product-image">
      <div class="modal-product-info">
        <h2>${product.name}</h2>
        <p class="modal-product-price">$${product.price.toFixed(2)}</p>
        <p class="modal-product-description">${product.description}</p>
        <button class="modal-add-to-cart" onclick="addToCart(${product.id}, this)">Add to Cart</button>
      </div>
    </div>
  `;
  
  modal.style.display = 'flex';
  setTimeout(() => modal.classList.add('active'), 10);
}

function closeModal() {
  const modal = document.getElementById('product-modal');
  modal.classList.remove('active');
  setTimeout(() => {
    modal.style.display = 'none';
  }, 300);
}

// Render cart items
function renderCartItems() {
  const cartItemsContainer = document.getElementById('cart-items');
  const cartTotalElement = document.getElementById('cart-total');

  if (!cartItemsContainer) return;

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = '<p class="cart-empty">Your cart is empty.</p>';
    if (cartTotalElement) cartTotalElement.textContent = '0.00';
    return;
  }

  cartItemsContainer.innerHTML = cart.map((item, index) => `
    <div class="cart-item">
      <img src="${item.image}" alt="${item.name}" class="cart-item-image">
      <div class="cart-item-info">
        <h3 class="cart-item-name">${item.name}</h3>
        <p class="cart-item-price">₹${item.price.toFixed(2)}</p>
        <p class="cart-item-description">${item.description}</p>
        <div class="cart-item-quantity">
          <button class="quantity-btn" onclick="updateQuantity(${index}, -1)">-</button>
          <input type="number" class="quantity-input" value="${item.quantity}" min="1" onchange="updateQuantity(${index}, this.value)">
          <button class="quantity-btn" onclick="updateQuantity(${index}, 1)">+</button>
        </div>
      </div>
      <button class="cart-item-remove" onclick="removeFromCart(${index})">Remove</button>
    </div>
  `).join('');

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  if (cartTotalElement) cartTotalElement.textContent = total.toFixed(2);
}

function updateQuantity(index, value) {
  if (typeof value === 'string') value = parseInt(value);
  if (typeof value !== 'number' || isNaN(value)) return;

  if (value <= 0) {
    removeFromCart(index);
    return;
  }

  cart[index].quantity = value;
  updateCartCount();
  renderCartItems();
  showNotification('Cart updated!');
}

function removeFromCart(index) {
  const itemName = cart[index].name;
  cart.splice(index, 1);
  updateCartCount();
  renderCartItems();
  showNotification(`${itemName} removed from cart`);
}

// Purchase functionality
function handlePurchase() {
  const button = document.getElementById('purchase-button');
  if (cart.length === 0) {
    showNotification('Your cart is empty!');
    return;
  }

  button.disabled = true;
  button.textContent = 'Processing...';
  
  setTimeout(() => {
    showNotification('Thank you for your purchase!');
    cart = [];
    updateCartCount();
    renderCartItems();
    button.disabled = false;
    button.textContent = 'Purchase';
  }, 1500);
}

// Newsletter form
const newsletterForm = document.getElementById('newsletter-form');
if (newsletterForm) {
  newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = e.target.querySelector('input').value;
    showNotification(`Thank you for subscribing with: ${email}`);
    e.target.reset();
  });
}

// Mobile menu functionality
const header = document.querySelector('.header');
const navMenu = document.getElementById('nav-menu');
const navToggle = document.createElement('button');
navToggle.className = 'nav-toggle';
navToggle.innerHTML = '☰';

navToggle.addEventListener('click', () => {
  navMenu.classList.toggle('active');
  navToggle.innerHTML = navMenu.classList.contains('active') ? '✕' : '☰';
});

document.querySelector('.nav').appendChild(navToggle);

// Scroll handling
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// Active link handling
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

function updateActiveLink() {
  const scrollY = window.scrollY;

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');

    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(`#${sectionId}`)) {
          link.classList.add('active');
        }
      });
    }
  });
}

window.addEventListener('scroll', updateActiveLink);

// Cart navigation
function setupCartNavigation() {
  const cartIcons = document.querySelectorAll('#cart-icon');
  cartIcons.forEach(icon => {
    icon.addEventListener('click', () => {
      window.location.href = 'cart.php'; // Adjusted for PHP routing
    });
  });
}


// Modal close handler
function setupModal() {
  const modal = document.getElementById('product-modal');
  const closeBtn = document.querySelector('.modal-close');
  
  closeBtn.addEventListener('click', closeModal);
  
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
  
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });
}

// Initialize
window.addToCart = addToCart;
document.addEventListener('DOMContentLoaded', () => {
  updateCartCount();
  renderProducts();
  renderCartItems();
  setupCartNavigation();
  setupModal();
  
  const purchaseButton = document.getElementById('purchase-button');
  if (purchaseButton) {
    purchaseButton.addEventListener('click', handlePurchase);
  }

  // Smooth scroll for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth'
        });
        navMenu.classList.remove('active');
        navToggle.innerHTML = '☰';
      }
    });
  });
});

// Newsletter subscription
document.getElementById("newsletter-form").addEventListener("submit", function (e) {
  e.preventDefault();
  const email = document.getElementById("email").value;

  // Simple email validation
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    alert("Please enter a valid email address.");
    return;
  }

  // Send email via PHP
  fetch("newsletter.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: `email=${encodeURIComponent(email)}`,
  })
    .then(response => response.text())
    .then(data => {
      alert(data); // Will show "Email sent!" or any message from PHP
      document.getElementById("newsletter-form").reset();
    })
    .catch(error => {
      console.error("Error:", error);
      alert("There was an error. Please try again.");
    });
});