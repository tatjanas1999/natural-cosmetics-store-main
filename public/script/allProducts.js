// Shop Page
let allProducts = document.querySelector(".all-products");

function renderProducts() {
  products.forEach((product) => {
    allProducts.innerHTML += `
    <div class="product">
            <img src="${product.imgSrc}" alt="">
            <div class="description">
              <span>${product.brand}</span>
              <h5>${product.shortDescription}</h5>
              <div class="star">
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
              </div>
              <h5 class="price">$${product.price}</h5>
            </div>
            <a href="#"><i class="fa-solid fa-cart-shopping add-to-cart"></i></a>
          </div>
    `;
  });
}
renderProducts();
