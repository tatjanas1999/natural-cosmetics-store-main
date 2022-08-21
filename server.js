import express from "express";
import bcrypt from "bcrypt";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  doc,
  collection,
  setDoc,
  getDoc,
  updateDoc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDTWxzf28Y8CGD1WkI5FospV9GoxcXti5U",
  authDomain: "ncosmetics-3d5e9.firebaseapp.com",
  projectId: "ncosmetics-3d5e9",
  storageBucket: "ncosmetics-3d5e9.appspot.com",
  messagingSenderId: "574239164839",
  appId: "1:574239164839:web:e09c4772ec047b80610e82",
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
const db = getFirestore();

// Init server
const app = express();

// Middlewares
app.use(express.static("public"));
app.use(express.json());

// Routes
// Home Route
app.get("/", (req, res) => {
  res.sendFile("home.html", { root: "public" });
});

// Signup route
app.get("/signup", (req, res) => {
  res.sendFile("signup.html", { root: "public" });
});

app.post("/signup", (req, res) => {
  const { name, email, password, number, tac } = req.body;

  // Form Validations
  if (name.length < 3) {
    res.json({ alert: "Name must be 3 letters long" });
  } else if (!email.length) {
    res.json({ alert: "Enter your email" });
  } else if (!password.length) {
    res.json({ alert: "Password must be 8 letters long" });
  } else if (number.length < 10) {
    res.json({ alert: "Invalid number" });
  } else if (!tac) {
    res.json({ alert: "You must agree to our terms and conditions" });
  } else {
    // Store data in db
    const users = collection(db, "users");

    getDoc(doc(users, email)).then((user) => {
      if (user.exists()) {
        return res.json({ alert: "Email already exists" });
      } else {
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(password, salt, (err, hash) => {
            req.body.password = hash;
            req.body.saller = false;

            // Set the doc
            setDoc(doc(users, email), req.body).then((data) => {
              res.json({
                name: req.body.name,
                email: req.body.email,
                seller: req.body.seller,
              });
            });
          });
        });
      }
    });
  }
});

// Login route
app.get("/login", (req, res) => {
  res.sendFile("login.html", { root: "public" });
});

app.post("/login", (req, res) => {
  let { email, password } = req.body;
  if (!email.length || !password.length) {
    res.json({ alert: "Fill all the inputs" });
  }

  const users = collection(db, "users");
  getDoc(doc(users, email)).then((user) => {
    if (!user.exists()) {
      return res.json({ alert: "Email doesn't exists" });
    } else {
      bcrypt.compare(password, user.data().password, (err, result) => {
        if (result) {
          let data = user.data();
          return res.json({
            name: data.name,
            email: data.email,
            seller: data.seller,
          });
        } else {
          return res.json({ alert: "Password is incorrect" });
        }
      });
    }
  });
});

// Contact route
app.get("/contact", (req, res) => {
  res.sendFile("contact.html", { root: "public" });
});

app.post("/contact", (req, res) => {
  let { name, message, email } = req.body;

  if (!name.length || !message.length) {
    return res.json({ alert: "Fill in all the fields" });
  } else {
    const messages = collection(db, "messages");
    setDoc(doc(messages, email), req.body).then((data) => {
      const users = collection(db, "users");
      updateDoc(doc(users, email), {
        contact: true,
      }).thern((data) => {
        res.json({ contact: true });
      });
    });
  }
});

// 404 route
app.get("/404", (req, res) => {
  res.sendFile("404.html", { root: "public" });
});

app.use((req, res) => {
  res.redirect("/404");
});

app.listen(3000, () => {
  console.log("Listening on port 3000...");
});
