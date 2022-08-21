//All buttons Add To Cart
const carts = document.querySelectorAll(".add-to-cart");
for (let i = 0; i < carts.length; i++) {
  carts[i].addEventListener("click", () => {
    cartNumbers(products[i]);
    totalCost(products[i]);
  });
}

// Number of Products in Cart - cartNumber
function onLoadCartNumbers() {
  let productNumbers = localStorage.getItem("cartNumbers");
  if (productNumbers) {
    document.querySelector("#cart-count-info").textContent = productNumbers;
  }
}

// Add cartNumber in local storage
function cartNumbers(product) {
  // console.log(product);
  let productNumbers = localStorage.getItem("cartNumbers");

  // typeof productNumber is string
  productNumbers = parseInt(productNumbers);

  if (productNumbers) {
    // In local storage
    localStorage.setItem("cartNumbers", productNumbers + 1);
    // In navbar
    document.querySelector("#cart-count-info").textContent = productNumbers + 1;
  } else {
    localStorage.setItem("cartNumbers", 1);
    document.querySelector("#cart-count-info").textContent = 1;
  }

  setItems(product);
}

// Number of the same products in the Cart - productsInCart

function setItems(product) {
  let cartItems = localStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems);

  if (cartItems != null) {
    // And if it is a different product
    if (cartItems[product.name] == undefined) {
      cartItems = {
        ...cartItems,
        [product.name]: product,
      };
    }
    cartItems[product.name].inCart += 1;
  } else {
    product.inCart = 1;
    cartItems = {
      [product.name]: product,
    };
  }
  // JSON is Object in localStorage
  localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

// Total Cost in local storage - totalCost

function totalCost(product) {
  let cartCost = localStorage.getItem("totalCost");

  if (cartCost != null) {
    cartCost = parseInt(cartCost);
    localStorage.setItem("totalCost", cartCost + product.price);
  } else {
    localStorage.setItem("totalCost", product.price);
  }
}

// Display Cart

function displayCart() {
  let cartItems = localStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems);

  let productContainer = document.querySelector(".cart-items");
  let cartCost = localStorage.getItem("totalCost");
  // console.log(cartItems);

  if (cartItems && productContainer) {
    productContainer.innerHTML = "";

    Object.values(cartItems).map((item) => {
      productContainer.innerHTML += `
      <div class="cart-row font-size">
        <div class="cart-item cart-column">
          <img class="cart-item-image" src="${item.imgSrc}" width="100" height="100">
          <span class="cart-item-title">${item.name}</span>
        </div>
        <span class="cart-price cart-column">$${item.price}</span>
        <div class="cart-quantity cart-column">
          <i class="fas fa-circle-arrow-left"></i>
          <span>${item.inCart}</span>
          <i class="fas fa-circle-arrow-right"></i>
          <button class="btn-dark btn-remove" type="button">REMOVE</button>
        </div>
      </div>
      `;
    });
    productContainer.innerHTML += `
    <div class="cart-total">
      <strong class="cart-total-title">Total</strong>
      <span class="cart-total-price">$${cartCost}</span>
    </div>
    `;
  }

  // Checkout
  // const checkOut = document.querySelector(".btn-checkout");
  // if (checkOut) {
  //   checkOut[0].addEventListener("click", purchaseClicked);
  // }

  // const removeCardItemButtons = document.querySelector(".btn-remove");
  // for (let i = 0; i < removeCardItemButtons.length; i++) {
  //   let button = removeCardItemButtons[i];
  //   button.addEventListener("click", removeCartItem);
  // }
}

// Remove Item in Cart
// function removeCartItem(event) {
//   const buttonClicked = event.target;
//   buttonClicked.parentElement.parentElement.remove();
// }

// Checkout Button and Clear localstorage
function purchaseClicked() {
  let cartItems = localStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems);

  if (cartItems != null) {
    alert("Thank you for your purchase");
    localStorage.clear();
    removeCart();
  }
}

// Remove All From Cart
function removeCart() {
  let productContainer = document.querySelector(".cart-items");
  while (productContainer.hasChildNodes()) {
    productContainer.removeChild(productContainer.firstChild);
  }
}

onLoadCartNumbers();
displayCart();
