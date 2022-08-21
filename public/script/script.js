// Header
const createNav = () => {
  let nav = document.querySelector("#header");

  nav.innerHTML = `
  <a href="home.html" class="logo"><img src="./img/logo.png" alt="">Natural</a>

  <div>
    <ul id="navbar">
      <li><a href="home.html" class="bottom-line">Home</a></li>
      <li><a href="shop.html" class="bottom-line">Shop</a></li>
      <li><a href="about.html" class="bottom-line">About</a></li>
      <li><a href="contact.html" class="bottom-line">Contact</a></li>
      <li class="bag rem-bag"><a href="cart.html"><i class="fa-solid fa-bag-shopping"></i></a><span id="cart-count-info">0</span></li>
      <li><a href="#" class="logout"><i class="fa-solid fa-user"></i>
      <div class="login-popup">
        <p class="text-popup"></p>
        <a href="login.html" class="login-btn">Login</a>
      </div>
      </a></li>
      <a href="#" id="close"><i class="fas fa-times"></i></a>
    </ul>
  </div>

  <div id="mobile">
    <a href="cart.html"><i class="fa-solid fa-bag-shopping"></i></a>
    <i id="bar" class="fas fa-outdent"></i>
  </div>
  `;
};

createNav();

// Popup

const logOut = document.querySelector(".logout");
let loginPopup = document.querySelector(".login-popup");

logOut.addEventListener("click", () => loginPopup.classList.toggle("active"));

let text = document.querySelector(".text-popup");
let actionBtn = document.querySelector(".login-btn");
let user = JSON.parse(sessionStorage.user || null);
if (user != null) {
  text.innerHTML = `Log in as, ${user.name}`;
  actionBtn.innerHTML = "Log Out";
  actionBtn.addEventListener("click", () => logout());
} else {
  text.innerHTML = "Login to your account";
  actionBtn.innerHTML = "Login";
  actionBtn.addEventListener("click", () => (location.href = "/login"));
}

const logout = () => {
  sessionStorage.clear();
  location.reload();
};

// Footer

const createFooter = () => {
  let footer = document.querySelector("#footer");
  if (footer) {
    footer.innerHTML = `
  <div class="col">
      <a href="index.html" class="logo"><img src="./img/logo.png" alt="">Natural</a>
      <h4>Contact</h4>
      <p><strong>Adress:</strong> Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas porro, aut.
      </p>
      <p><strong>Phone:</strong> Lorem ipsum dolor sit amet consectetur adipisicing elit</p>
      <p><strong>Hours:</strong> Lorem ipsum dolor sit amet.</p>
      <div class="media">
        <h4>Follow Us</h4>
        <div class="icon">
          <i class="fab fa-facebook"></i>
          <i class="fab fa-instagram"></i>
          <i class="fab fa-youtube"></i>
          <i class="fab fa-pinterest"></i>
        </div>
      </div>
    </div>

    <div class="col">
      <h4>About</h4>
      <a href="#">About Us</a>
      <a href="#">Delivery Information</a>
      <a href="#">Privacy Policy</a>
      <a href="#">Terms & Conditions</a>
      <a href="#">Contact Us</a>
    </div>

    <div class="col">
      <h4>My Account</h4>
      <a href="#">Sign In</a>
      <a href="#">View Cart</a>
      <a href="#">My Wishlist</a>
      <a href="#">Track My Order</a>
      <a href="#">Help</a>
    </div>

    <div class="col install">
      <h4>Install App</h4>
      <p>Lorem ipsum dolor sit amet consectetur.</p>
      <div class="row">
        <img src="./img/row-1.png" alt="">
        <img src="./img/row-2.png" alt="">
      </div>
      <p>Secured Payment Gateways</p>
      <img src="./img/payments.png" alt="">
    </div>
  `;
  }
};

createFooter();

const createFooterTwo = () => {
  let footerTwo = document.querySelector("#footer-2");
  if (footerTwo) {
    footerTwo.innerHTML = `
    <div class="copyright">
    <p>Copyright © 2022. All Rights Reserved</p>
  </div>
  `;
  }
};

createFooterTwo();

// Slider

const prContainer = [...document.querySelectorAll(".product-container")];
const preBtn = [...document.querySelectorAll(".pre-btn")];
const nxtBtn = [...document.querySelectorAll(".nxt-btn")];

prContainer.forEach((item, i) => {
  let containerDim = item.getBoundingClientRect();
  let containerWidth = containerDim.width;

  preBtn[i].addEventListener("click", () => {
    item.scrollLeft -= containerWidth;
  });
  nxtBtn[i].addEventListener("click", () => {
    item.scrollLeft += containerWidth;
  });
});

// Swiper

var swiper = new Swiper(".gallery-slider", {
  spaceBetween: 6,
  loop: true,
  centeredSlides: true,
  autoplay: {
    delay: 9500,
    disableOnInteraction: false,
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    450: {
      slidesPerView: 2,
    },
    768: {
      slidesPerView: 3,
    },
    1024: {
      slidesPerView: 4,
    },
  },
});

// Media Query Navbar
const bar = document.querySelector("#bar");
const close = document.querySelector("#close");
const nav = document.querySelector("#navbar");

if (bar) {
  bar.addEventListener("click", () => {
    nav.classList.add("active");
  });
}

if (close) {
  close.addEventListener("click", () => {
    nav.classList.remove("active");
  });
}
