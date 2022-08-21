let popularSets = document.querySelector(".popular-sets");

function renderSets() {
  sets.forEach((product) => {
    popularSets.innerHTML += `
    <div class="product-card">
    <div class="product-img">
      <img src="${product.imgSrc}" alt="">
      <button class="card-btn">Add To Wishlist</button>
    </div>
    <div class="product-info">
      <span class="product-brand">${product.brand}</span>
      <h5 class="product-short-des">${product.shortDescription}</h5>
      <div class="star">
        <i class="fas fa-star"></i>
        <i class="fas fa-star"></i>
        <i class="fas fa-star"></i>
        <i class="fas fa-star"></i>
        <i class="fas fa-star"></i>
      </div>
      <span class="actual-price">$${product.price}</span>
    </div>
    <a href="#"><i class="fa-solid fa-cart-shopping add-to-cart"></i></a>
  </div>
    `;
  });
}
renderSets();
