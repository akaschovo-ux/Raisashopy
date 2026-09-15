```javascript
// ======================================
// Raisa Shopy - Admin Dashboard
// ======================================

// Check admin login
if (sessionStorage.getItem("raisaAdminLoggedIn") !== "true") {
  window.location.href = "login.html";
}


// ======================================
// Default Data
// ======================================

const defaultData = {
  shopName: "Raisa Shopy",

  heroTitle: "Welcome to Raisa Shopy",

  heroText:
    "Discover beautiful products at amazing prices.",

  productName: "Your Product",

  oldPrice: 199,

  newPrice: 149,

  description:
    "Write your product description here.",

  whatsappNumber: "966500000000",

  productImages: [],

  descriptionImages: [],

  video: "",

  footerText:
    "© 2026 Raisa Shopy. All Rights Reserved."
};


// ======================================
// Load Existing Data
// ======================================

let shopData = JSON.parse(
  localStorage.getItem("raisaShopData")
) || defaultData;


// ======================================
// Get Elements
// ======================================

const shopName = document.getElementById("shopName");

const heroTitle = document.getElementById("heroTitle");

const heroText = document.getElementById("heroText");

const footerText = document.getElementById("footerText");

const productName = document.getElementById("productName");

const oldPrice = document.getElementById("oldPrice");

const newPrice = document.getElementById("newPrice");

const description = document.getElementById("description");

const whatsappNumber =
  document.getElementById("whatsappNumber");

const productImages =
  document.getElementById("productImages");

const descriptionImages =
  document.getElementById("descriptionImages");

const productVideo =
  document.getElementById("productVideo");

const productImagePreview =
  document.getElementById("productImagePreview");

const descriptionImagePreview =
  document.getElementById("descriptionImagePreview");

const videoPreview =
  document.getElementById("videoPreview");

const saveBtn =
  document.getElementById("saveBtn");

const saveMessage =
  document.getElementById("saveMessage");

const logoutBtn =
  d
```
