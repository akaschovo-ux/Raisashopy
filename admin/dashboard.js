
if (sessionStorage.getItem("raisaAdminLoggedIn") !== "true") {
  window.location.href = "login.html";
}

const savedData = localStorage.getItem("raisaShopData");

const shopData = savedData
  ? JSON.parse(savedData)
  : {
      shopName: "Raisa Shopy",
      heroTitle: "Welcome to Raisa Shopy",
      heroText: "Discover beautiful products at amazing prices.",
      footerText: "© 2026 Raisa Shopy. All Rights Reserved.",
      productName: "Your Product",
      oldPrice: 199,
      newPrice: 149,
      description: "Write your product description here.",
      whatsappNumber: "966500000000",
      productImages: [],
      descriptionImages: [],
      video: ""
    };

const shopName = document.getElementById("shopName");
const heroTitle = document.getElementById("heroTitle");
const heroText = document.getElementById("heroText");
const footerText = document.getElementById("footerText");
const productName = document.getElementById("productName");
const oldPrice = document.getElementById("oldPrice");
const newPrice = document.getElementById("newPrice");
const description = document.getElementById("description");
const whatsappNumber = document.getElementById("whatsappNumber");
const saveBtn = document.getElementById("saveBtn");
const saveMessage = document.getElementById("saveMessage");
const logoutBtn = document.getElementById("logoutBtn");

shopName.value = shopData.shopName || "";
heroTitle.value = shopData.heroTitle || "";
heroText.value = shopData.heroText || "";
footerText.value = shopData.footerText || "";
productName.value = shopData.productName || "";
oldPrice.value = shopData.oldPrice || "";
newPrice.value = shopData.newPrice || "";
description.value = shopData.description || "";
whatsappNumber.value = shopData.whatsappNumber || "";

saveBtn.addEventListener("click", function () {
  shopData.shopName = shopName.value.trim();
  shopData.heroTitle = heroTitle.value.trim();
  shopData.heroText = heroText.value.trim();
  shopData.footerText = footerText.value.trim();
  shopData.productName = productName.value.trim();
  shopData.oldPrice = Number(oldPrice.value) || 0;
  shopData.newPrice = Number(newPrice.value) || 0;
  shopData.description = description.value.trim();
  shopData.whatsappNumber = whatsappNumber.value.replace(/\D/g, "");

  localStorage.setItem(
    "raisaShopData",
    JSON.stringify(shopData)
  );

  saveMessage.textContent =
    "✓ All changes saved successfully!";

  saveMessage.style.color = "green";
});

logoutBtn.addEventListener("click", function () {
  sessionStorage.removeItem("raisaAdminLoggedIn");
  window.location.href = "login.html";
});
```
