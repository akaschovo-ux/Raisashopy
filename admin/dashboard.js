```javascript
// ======================================
// Raisa Shopy - Admin Dashboard
// ======================================

if (sessionStorage.getItem("raisaAdminLoggedIn") !== "true") {
  window.location.href = "login.html";
}


// ======================================
// Default Data
// ======================================

const defaultData = {
  shopName: "Raisa Shopy",
  heroTitle: "Welcome to Raisa Shopy",
  heroText: "Discover beautiful products at amazing prices.",
  productName: "Your Product",
  oldPrice: 199,
  newPrice: 149,
  description: "Write your product description here.",
  whatsappNumber: "966500000000",
  productImages: [],
  descriptionImages: [],
  video: "",
  footerText: "© 2026 Raisa Shopy. All Rights Reserved."
};


// ======================================
// Load Existing Data
// ======================================

let shopData;

try {
  shopData =
    JSON.parse(localStorage.getItem("raisaShopData")) ||
    JSON.parse(JSON.stringify(defaultData));
} catch (error) {
  shopData = JSON.parse(JSON.stringify(defaultData));
}

shopData.productImages = Array.isArray(shopData.productImages)
  ? shopData.productImages
  : [];

shopData.descriptionImages = Array.isArray(shopData.descriptionImages)
  ? shopData.descriptionImages
  : [];


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
  document.getElementById("logoutBtn");


// ======================================
// Save Data
// ======================================

function saveData() {
  localStorage.setItem(
    "raisaShopData",
    JSON.stringify(shopData)
  );
}


// ======================================
// Load Form
// ======================================

function loadForm() {
  shopName.value = shopData.shopName || "";
  heroTitle.value = shopData.heroTitle || "";
  heroText.value = shopData.heroText || "";
  footerText.value = shopData.footerText || "";

  productName.value = shopData.productName || "";
  oldPrice.value = shopData.oldPrice ?? "";
  newPrice.value = shopData.newPrice ?? "";
  description.value = shopData.description || "";

  whatsappNumber.value =
    shopData.whatsappNumber || "";

  showProductImages();
  showDescriptionImages();
  showVideo();
}


// ======================================
// Product Image Preview
// ======================================

function showProductImages() {
  productImagePreview.innerHTML = "";

  shopData.productImages.forEach(function (image, index) {
    const box = document.createElement("div");
    box.className = "preview-item";

    const img = document.createElement("img");
    img.src = image;
    img.alt = "Product Image";

    const button = document.createElement("button");
    button.type = "button";
    button.textContent = "✕";

    button.addEventListener("click", function () {
      shopData.productImages.splice(index, 1);
      saveData();
      showProductImages();
    });

    box.appendChild(img);
    box.appendChild(button);

    productImagePreview.appendChild(box);
  });
}


// ======================================
// Description Image Preview
// ======================================

function showDescriptionImages() {
  descriptionImagePreview.innerHTML = "";

  shopData.descriptionImages.forEach(function (image, index) {
    const box = document.createElement("div");
    box.className = "preview-item";

    const img = document.createElement("img");
    img.src = image;
    img.alt = "Description Image";

    const button = document.createElement("button");
    button.type = "button";
    button.textContent = "✕";

    button.addEventListener("click", function () {
      shopData.descriptionImages.splice(index, 1);
      saveData();
      showDescriptionImages();
    });

    box.appendChild(img);
    box.appendChild(button);

    descriptionImagePreview.appendChild(box);
  });
}


// ======================================
// Read File As Base64
// ======================================

function readFile(file) {
  return new Promise(function (resolve, reject) {
    const reader = new FileReader();

    reader.onload = function () {
      resolve(reader.result);
    };

    reader.onerror = function () {
      reject(reader.error);
    };

    reader.readAsDataURL(file);
  });
}


// ======================================
// Product Images Upload
// ======================================

productImages.addEventListener("change", async function () {
  const files = Array.from(productImages.files);

  if (!files.length) {
    return;
  }

  if (shopData.productImages.length + files.length > 6) {
    alert("Maximum 6 product images are allowed.");
    productImages.value = "";
    return;
  }

  try {
    for (const file of files) {
      if (!file.type.startsWith("image/")) {
        continue;
      }
```
