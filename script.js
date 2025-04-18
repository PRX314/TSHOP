
const collectionSelect = document.getElementById("collection-select");
const typeSelect = document.getElementById("type-select");
const colorSelect = document.getElementById("color-select");
const sizeSelect = document.getElementById("size-select");
const nameEl = document.getElementById("product-name");
const descEl = document.getElementById("product-description");
const imageEl = document.getElementById("product-image");
const cartContainer = document.createElement("div");
const checkoutButton = document.createElement("form");

let currentProduct = null;
let cart = [];
emailjs.init("JyVULYbhjRGgAq9cb");

cartContainer.id = "cart";
cartContainer.innerHTML = "<h2>Carrello</h2><ul id='cart-items'></ul><div id='cart-total'></div>";
checkoutButton.action = "https://www.paypal.com/cgi-bin/webscr";
checkoutButton.method = "post";
checkoutButton.target = "_blank";
checkoutButton.innerHTML = `
  <input type="hidden" name="cmd" value="_xclick">
  <input type="hidden" name="business" value="paoloandrearepetto@gmail.com">
  <input type="hidden" name="currency_code" value="EUR">
  <input type="hidden" id="paypal-item-name" name="item_name" value="">
  <input type="hidden" id="paypal-amount" name="amount" value="">
  <input type="submit" value="Procedi al pagamento con PayPal">
`;
cartContainer.appendChild(checkoutButton);

function updateCartDisplay() {
  const cartItems = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");
  cartItems.innerHTML = "";
  let total = 0;

  cart.forEach((item, i) => {
    const li = document.createElement("li");
    li.textContent = item.type + " " + item.color + " " + item.size + " - €" + item.price;
    cartItems.appendChild(li);
    total += item.price;
  });

  cartTotal.textContent = "Totale: €" + total.toFixed(2);
  document.getElementById("paypal-item-name").value = "Acquisto collezione";
  document.getElementById("paypal-amount").value = total.toFixed(2);
}

function loadCollections() {
  products.forEach((p, i) => {
    const opt = document.createElement("option");
    opt.value = i;
    opt.textContent = p.name;
    collectionSelect.appendChild(opt);
  });
}


function loadProduct(index) {
  document.body.className = "";
  currentProduct = products[index];
  document.body.classList.add(currentProduct.themeClass);

  document.getElementById("main-title").textContent = currentProduct.name; // AGGIORNATO
  nameEl.textContent = currentProduct.name;
  descEl.textContent = currentProduct.description;
  updateTypeSelect();
}


function updateTypeSelect() {
  const types = [...new Set(currentProduct.variants.map(v => v.type))];
  typeSelect.innerHTML = "";
  types.forEach(t => {
    const opt = document.createElement("option");
    opt.value = t;
    opt.textContent = t;
    typeSelect.appendChild(opt);
  });
  updateColorSelect();
}

function updateColorSelect() {
  const selectedType = typeSelect.value;
  const colors = currentProduct.variants.filter(v => v.type === selectedType);
  colorSelect.innerHTML = "";
  colors.forEach(v => {
    const opt = document.createElement("option");
    opt.value = v.color;
    opt.textContent = v.color;
    colorSelect.appendChild(opt);
  });
  updateSizeAndImage();
}

function updateSizeAndImage() {
  const selectedType = typeSelect.value;
  const selectedColor = colorSelect.value;
  const variant = currentProduct.variants.find(v => v.type === selectedType && v.color === selectedColor);
  sizeSelect.innerHTML = "";
  variant.sizes.forEach(s => {
    const opt = document.createElement("option");
    opt.value = s;
    opt.textContent = s;
    sizeSelect.appendChild(opt);
  });
  imageEl.src = variant.image;
}

document.getElementById("add-to-cart").addEventListener("click", () => {
  const selectedType = typeSelect.value;
  const selectedColor = colorSelect.value;
  const selectedSize = sizeSelect.value;
  const variant = currentProduct.variants.find(v => v.type === selectedType && v.color === selectedColor);
  if (variant) {
    cart.push({ ...variant, size: selectedSize });
    updateCartDisplay();
  }
});

document.getElementById("send-order").addEventListener("click", () => {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const address = document.getElementById("address").value.trim();

  if (!name || !email || !address) {
    alert("Compila tutti i campi!");
    return;
  }

  const orderDetails = cart.map(item =>
    `${item.type} ${item.color} ${item.size} - €${item.price}`
  ).join("\n");

  const total = cart.reduce((sum, item) => sum + item.price, 0).toFixed(2);

  const templateParams = {
    name,
    email,
    address,
    order: orderDetails,
    total
  };

  emailjs.send("service_9gg745u", "template_i4jsjda", templateParams)
    .then(() => {
      document.getElementById("user-form").style.display = "none";
      document.getElementById("confirmation-message").style.display = "block";
      
      // Attiva il form PayPal automaticamente
      document.querySelector("form").submit();
    }, (error) => {
      alert("Errore nell'invio dell'ordine: " + error.text);
    });
});


collectionSelect.addEventListener("change", e => loadProduct(e.target.value));
typeSelect.addEventListener("change", updateColorSelect);
colorSelect.addEventListener("change", updateSizeAndImage);

loadCollections();
loadProduct(0);
