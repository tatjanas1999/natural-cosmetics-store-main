window.onload = () => {
  if (sessionStorage.user) {
    user = JSON.parse(sessionStorage.user);
    // if (user.email) {
    //   location.replace("/");
    // }
  }
};

let submitBtn = document.querySelector(".submit-btn");
let loader = document.querySelector(".loader");

if (submitBtn) {
  submitBtn.addEventListener("click", () => {
    let name = document.querySelector("#name") || null;
    let email = document.querySelector("#email");
    let password = document.querySelector("#password");
    let number = document.querySelector("#number") || null;
    let tac = document.querySelector("#terms-and-cond") || null;

    if (name != null) {
      // Form Validation
      if (name.value.length < 3) {
        showFormError("Name must be 3 letters long");
      } else if (!email.value.length) {
        showFormError("Enter your email");
      } else if (!password.value.length) {
        showFormError("Password must be 8 letters long");
      } else if (number.value.length < 10) {
        showFormError("Invalid number");
      } else if (!tac.checked) {
        showFormError("You must agree to our terms and conditions");
      } else {
        // Submit Form
        loader.style.display = "block";
        sendData("/signup", {
          name: name.value,
          email: email.value,
          password: password.value,
          number: number.value,
          tac: tac.checked,
        });
      }
    } else {
      // Login Page
      if (!email.value.length || !password.value.length) {
        showFormError("Fill all the inputs");
      } else {
        // Login Form
        loader.style.display = "block";
        sendData("/login", {
          email: email.value,
          password: password.value,
        });
      }
    }
  });
}

// Contact Form
let sendBtn = document.querySelector(".send-btn");

if (sendBtn) {
  sendBtn.addEventListener("click", () => {
    let name = document.querySelector("#name");
    let message = document.querySelector("#message");

    if (user == null) {
      alert("You are not logged in");
    } else {
      loader.style.display = "block";
      sendData("/contact", {
        name: name.value,
        message: message.value,
        email: JSON.parse(sessionStorage.user).email,
      });
      alert("Message sent");

      location.reload();
    }
  });
}

// Send Data
const sendData = (path, data) => {
  // console.log(data);
  fetch(path, {
    method: "post",
    headers: new Headers({ "Content-Type": "application/json" }),
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((data) => processData(data));
};

const processData = (data) => {
  // console.log(data);
  loader.style.display = null;
  if (data.alert) {
    showFormError(data.alert);
  } else if (data.name) {
    sessionStorage.user = JSON.stringify(data);
    location.replace("/");
  } else if (data.contact) {
    let user = JSON.parse(sessionStorage.user);
    user.contact = true;
    sessionStorage.user = JSON.stringify(user);
    location.replace("/contact");
  }
};

// Show Error
const showFormError = (err) => {
  let errorElement = document.querySelector(".error");
  errorElement.innerHTML = err;
  errorElement.classList.add("show");
};
