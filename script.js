// DADOS DOS PRODUTOS DA MARCA
const products = [
  {
    id: 1,
    name: "Sobretudo Lã Tailored",
    category: "casacos",
    price: 899.00,
    image: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 2,
    name: "Vestido Midi Acetinado",
    category: "vestidos",
    price: 459.00,
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 3,
    name: "Blazer Structure Oversized",
    category: "casacos",
    price: 699.00,
    image: "https://images.unsplash.com/photo-1584273143981-41c073dfe8f8?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 4,
    name: "Calça Wide Leg Alfaiataria",
    category: "calcas",
    price: 399.00,
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 5,
    name: "Bolsa Couro Minimalista",
    category: "acessorios",
    price: 559.00,
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 6,
    name: "Vestido Linho Estruturado",
    category: "vestidos",
    price: 529.00,
    image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=800&auto=format&fit=crop"
  }
];

let cart = [];

// RENDERIZAR PRODUTOS
function renderProducts(items) {
  const grid = document.getElementById('productsGrid');
  grid.innerHTML = '';

  items.forEach(product => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      <div class="product-image-wrap">
        <img src="${product.image}" alt="${product.name}" class="product-image">
      </div>
      <div class="product-info">
        <h3 class="product-title">${product.name}</h3>
        <span class="product-price">R$ ${product.price.toFixed(2).replace('.', ',')}</span>
        <button class="add-to-cart-btn" onclick="addToCart(${product.id})">ADICIONAR À SACOLA</button>
      </div>
    `;
    grid.appendChild(card);
  });
}

// FILTRAR CATEGORIAS
function filterCategory(category) {
  document.querySelectorAll('.cat-btn').forEach(btn => btn.classList.remove('active'));
  event.target.classList.add('active');

  if (category === 'all') {
    renderProducts(products);
  } else {
    const filtered = products.filter(p => p.category === category);
    renderProducts(filtered);
  }
}

// LÓGICA DO CARRINHO
function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  cart.push(product);
  updateCartUI();
  toggleCart(true);
}

function updateCartUI() {
  const cartItemsContainer = document.getElementById('cartItems');
  const cartCount = document.getElementById('cartCount');
  const cartTotal = document.getElementById('cartTotal');

  cartCount.textContent = cart.length;

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = '<p class="empty-msg">Sua sacola está vazia.</p>';
    cartTotal.textContent = 'R$ 0,00';
    return;
  }

  cartItemsContainer.innerHTML = '';
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price;
    const itemEl = document.createElement('div');
    itemEl.className = 'cart-item';
    itemEl.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <div class="cart-item-details">
        <div class="cart-item-title">${item.name}</div>
        <div class="cart-item-price">R$ ${item.price.toFixed(2).replace('.', ',')}</div>
      </div>
    `;
    cartItemsContainer.appendChild(itemEl);
  });

  cartTotal.textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
}

function toggleCart(forceOpen = false) {
  const cartDrawer = document.getElementById('cartDrawer');
  if (forceOpen) {
    cartDrawer.classList.add('open');
  } else {
    cartDrawer.classList.toggle('open');
  }
}

function checkout() {
  if (cart.length === 0) {
    alert("Sua sacola está vazia.");
    return;
  }
  alert("Redirecionando para a página de checkout seguro (PIX, Cartão, Boleto, Apple Pay)...");
}

// INICIALIZAÇÃO
document.addEventListener('DOMContentLoaded', () => {
  renderProducts(products);
});
