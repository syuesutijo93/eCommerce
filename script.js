document.addEventListener('DOMContentLoaded', function() {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      parseXML(this);
      addProductClickEvent();
    }
  };
  xmlhttp.open("GET", "products.xml", true);
  xmlhttp.send();
});

function parseXML(xml) {
  var xmlDoc = xml.responseXML;
  var products = Array.from(xmlDoc.getElementsByTagName("product"));

  // Sort the products by name
  products.sort((a, b) => {
    var nameA = a.getElementsByTagName("name")[0].textContent.toUpperCase();
    var nameB = b.getElementsByTagName("name")[0].textContent.toUpperCase();
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  });
  var productList = document.querySelector(".productRow");

  for (var i = 0; i < products.length; i++) {
    var product = products[i];
    var productName = product.getElementsByTagName("name")[0].textContent;
    var productPrice = product.getElementsByTagName("price")[0].textContent;
    var productImage = product.getElementsByTagName("image")[0].textContent;

    var productItem = document.createElement("article");
    productItem.classList.add("productInfo");
    productItem.innerHTML = `
      <div><img src="${productImage}" alt="${productName}"></div>
      <p class="name">${productName}</p>
      <p class="price">RM${productPrice}</p>
      <input type="button" name="button" onclick="addToCart(10)" value="Add to Cart" class="AddtoCartButton">
    `;
    productList.appendChild(productItem);
  }
  }

// Click down content
document.addEventListener("DOMContentLoaded", function() {
    const clickableDiv = document.getElementById("myDiv");
    const contentDiv = document.getElementById("content");

    clickableDiv.addEventListener("click", function() {
        contentDiv.classList.toggle("hidden");
        clickableDiv.classList.toggle("clicked");
    });
});

document.addEventListener("DOMContentLoaded", function() {
    const clickableDiv = document.getElementById("myDiv-1");
    const contentDiv = document.getElementById("content-1");

    clickableDiv.addEventListener("click", function() {
        contentDiv.classList.toggle("hidden-1");
        clickableDiv.classList.toggle("clicked-1");
    });
});

document.addEventListener("DOMContentLoaded", function() {
    const clickableDiv = document.getElementById("myDiv-2");
    const contentDiv = document.getElementById("content-2");

    clickableDiv.addEventListener("click", function() {
        contentDiv.classList.toggle("hidden-2");
        clickableDiv.classList.toggle("clicked-2");
    });
});


// Add Cart function

let cart = [];
let total = 0;

function addToCart(price) {
  cart.push(price);
  total += price;
  displayCart();
}

function displayCart() {
  const cartItemsElement = document.getElementById('cart-items');
  const totalElement = document.getElementById('total');
  cartItemsElement.innerHTML = '';
  cart.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `$${item}`;
    cartItemsElement.appendChild(li);
  });
  totalElement.textContent = total;
}
