document.addEventListener('DOMContentLoaded', function() {
  // Load XML data
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      parseXML(this);
    }
  };
  xmlhttp.open("GET", "products.xml", true);
  xmlhttp.send();

  // Add event listener for view cart button
  document.getElementById("view-cart").addEventListener("click", function() {
    document.getElementById("cart-modal").style.display = "block";
  });

  // Close modal when clicking on close button
  document.getElementsByClassName("close")[0].addEventListener("click", function() {
    document.getElementById("cart-modal").style.display = "none";
  });

  // Close modal when clicking outside the modal
  window.addEventListener("click", function(event) {
    if (event.target == document.getElementById("cart-modal")) {
      document.getElementById("cart-modal").style.display = "none";
    }
  });
});

var cartItems = [];

function parseXML(xml) {
  var xmlDoc = xml.responseXML;
  var products = xmlDoc.getElementsByTagName("product");
  var productList = document.getElementById("product-list");

  for (var i = 0; i < products.length; i++) {
    var product = products[i];
    var productName = product.getElementsByTagName("name")[0].childNodes[0].nodeValue;
    var productDescription = product.getElementsByTagName("description")[0].childNodes[0].nodeValue;
    var productPrice = product.getElementsByTagName("price")[0].childNodes[0].nodeValue;
    var productImage = product.getElementsByTagName("image")[0].childNodes[0].nodeValue;

    var productItem = document.createElement("div");
    productItem.classList.add("product");
    productItem.innerHTML = `
      <img src="${productImage}" alt="${productName}">
      <div class="product-content">
        <h2>${productName}</h2>
        <p>${productDescription}</p>
        <p><strong>$${productPrice}</strong></p>
        <button onclick="addToCart('${productName}', ${productPrice})">Add to Cart</button>
      </div>
    `;

    productList.appendChild(productItem);
  }
}

function addToCart(name, price) {
  cartItems.push({ name: name, price: price });
  updateCart();
}

function updateCart() {
  var cartItemsList = document.getElementById("cart-items");
  cartItemsList.innerHTML = "";
  var totalPrice = 0;

  for (

    var i = 0; i < cartItems.length; i++) {
    var item = cartItems[i];
    var listItem = document.createElement("li");
    listItem.textContent = `${item.name} - $${item.price}`;
    cartItemsList.appendChild(listItem);
    totalPrice += item.price;
  }

  document.getElementById("cart-total").textContent = totalPrice.toFixed(2);
  document.getElementById("cart-count").textContent = cartItems.length;
}
