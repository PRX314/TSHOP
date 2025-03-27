
const products = [
  {
    name: "Fijo de’n amore",
    description: "Collezione ufficiale Fijo de’n amore",
    themeClass: "theme-fijo",
    variants: [
      {
        type: "Uomo",
        color: "Bianca",
        image: "images/FijoUomoBianca.png",
        price: 20,
        sizes: ["S", "M", "L", "XL"]
      },
      {
        type: "Uomo",
        color: "Nera",
        image: "images/FijoUomoNera.png",
        price: 20,
        sizes: ["S", "M", "L", "XL"]
      },
      {
        type: "Donna",
        color: "Bianca",
        image: "images/FijoDonnaBianca.png",
        price: 20,
        sizes: ["S", "M", "L"]
      },
      {
        type: "Donna",
        color: "Nera",
        image: "images/FijoDonnaNera.png",
        price: 20,
        sizes: ["S", "M", "L"]
      },
      {
        type: "Felpa",
        color: "Nera",
        image: "images/FijoFelpaUomoNera.png",
        price: 35,
        sizes: ["M", "L", "XL"]
      }
    ]
  },
  {
    name: "G Power",
    description: "Collezione potente e audace",
    themeClass: "theme-gpower",
    variants: [
      {
        type: "Uomo",
        color: "Bianca",
        image: "images/GPowerUomoBianca.png",
        price: 22,
        sizes: ["S", "M", "L", "XL"]
      },
      {
        type: "Uomo",
        color: "Nera",
        image: "images/GPowerUomoNera.png",
        price: 22,
        sizes: ["S", "M", "L", "XL"]
      },
      {
        type: "Donna",
        color: "Bianca",
        image: "images/GPowerDonnaBianca.png",
        price: 22,
        sizes: ["S", "M", "L"]
      },
      {
        type: "Donna",
        color: "Nera",
        image: "images/GPowerDonnaNera.png",
        price: 22,
        sizes: ["S", "M", "L"]
      }
    ]
  }
];

window.onload = function () {
  const select = document.getElementById("collection-select");
  products.forEach((p, i) => {
    let opt = document.createElement("option");
    opt.value = i;
    opt.text = p.name;
    select.appendChild(opt);
  });
  select.dispatchEvent(new Event("change"));
};
