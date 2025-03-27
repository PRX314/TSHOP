
emailjs.init("service_9gg745u");

let cart = [];

function updateProduct(product) {
  document.body.className = product.themeClass;
  document.getElementById("product-name").textContent = product.name;
  document.getElementById("product-description").textContent = product.description;

  const typeSelect = document.getElementById("type-select");
  const colorSelect = document.getElementById("color-select");
  const sizeSelect = document.getElementById("size-select");
  typeSelect.innerHTML = "";
  colorSelect.innerHTML = "";
  sizeSelect.innerHTML = "";

  product.variants.forEach((v, i) => {
    let option = document.createElement("option");
    option.value = i;
    option.text = v.type + " " + v.color;
    typeSelect.appendChild(option);
  });

  typeSelect.onchange = () => {
    const variant = product.variants[typeSelect.value];
    document.getElementById("product-image").src = variant.image;
    document.getElementById("product-price").textContent = "€" + variant.price;
    colorSelect.innerHTML = "<option>" + variant.color + "</option>";
    sizeSelect.innerHTML = "";
    variant.sizes.forEach(s => {
      let opt = document.createElement("option");
      opt.value = s;
      opt.text = s;
      sizeSelect.appendChild(opt);
    });
  };

  typeSelect.dispatchEvent(new Event("change"));
}

function updateCart() {
  const cartItems = document.getElementById("cart-items");
  cartItems.innerHTML = "";
  let total = 0;
  cart.forEach((item, i) => {
    let li = document.createElement("li");
    li.textContent = item.name + " (" + item.size + ") - €" + item.price;
    cartItems.appendChild(li);
    total += item.price;
  });
  document.getElementById("cart-total").textContent = "Totale: €" + total;
}

document.getElementById("collection-select").onchange = function() {
  updateProduct(products[this.value]);
};

document.getElementById("add-to-cart").onclick = () => {
  const prod = products[document.getElementById("collection-select").value];
  const variant = prod.variants[document.getElementById("type-select").value];
  const size = document.getElementById("size-select").value;
  cart.push({ name: prod.name + " " + variant.type + " " + variant.color, size, price: variant.price });
  updateCart();
};

document.getElementById("clear-cart").onclick = () => {
  cart = [];
  updateCart();
};

document.getElementById("send-order").onclick = () => {
  const data = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    address: document.getElementById("address").value,
    cap: document.getElementById("cap").value,
    city: document.getElementById("city").value,
    province: document.getElementById("province").value,
    country: document.getElementById("country").value,
    notes: document.getElementById("notes").value,
    cart: cart.map(item => item.name + " (" + item.size + ") - €" + item.price).join("\n")
  };

  emailjs.send("service_9gg745u", "template_order", data).then(() => {
    document.getElementById("confirmation-message").style.display = "block";
  });
};

document.getElementById("send-contact").onclick = () => {
  const data = {
    name: document.getElementById("contact-name").value,
    email: document.getElementById("contact-email").value,
    message: document.getElementById("contact-message").value
  };

  emailjs.send("service_9gg745u", "template_contact", data).then(() => {
    alert("Messaggio inviato!");
  });
};
