if (sessionStorage.getItem("raisaAdminLoggedIn") !== "true") {
  window.location.href = "login.html";
}

var data = JSON.parse(localStorage.getItem("raisaShopData") || "{}");

var shopName = document.getElementById("shopName");
var heroTitle = document.getElementById("heroTitle");
var heroText = document.getElementById("heroText");
var footerText = document.getElementById("footerText");
var productName = document.getElementById("productName");
var oldPrice = document.getElementById("oldPrice");
var newPrice = document.getElementById("newPrice");
var description = document.getElementById("description");
var whatsappNumber = document.getElementById("whatsappNumber");
var saveBtn = document.getElementById("saveBtn");
var saveMessage = document.getElementById("saveMessage");
var logoutBtn = document.getElementById("logoutBtn");

shopName.value = data.shopName || "Raisa Shopy";
heroTitle.value = data.heroTitle || "Welcome to Raisa Shopy";
heroText.value = data.heroText || "";
footerText.value = data.footerText || "© 2026 Raisa Shopy. All Rights Reserved.";
productName.value = data.productName || "";
oldPrice.value = data.oldPrice || "";
newPrice.value = data.newPrice || "";
description.value = data.description || "";
whatsappNumber.value = data.whatsappNumber || "";

saveBtn.onclick = function () {
  data.shopName = shopName.value.trim();
  data.heroTitle = heroTitle.value.trim();
  data.heroText = heroText.value.trim();
  data.footerText = footerText.value.trim();
  data.productName = productName.value.trim();
  data.oldPrice = Number(oldPrice.value) || 0;
  data.newPrice = Number(newPrice.value) || 0;
  data.description = description.value.trim();
  data.whatsappNumber = whatsappNumber.value.replace(/\D/g, "");

  localStorage.setItem("raisaShopData", JSON.stringify(data));

  saveMessage.textContent = "✓ All changes saved successfully!";
  saveMessage.style.color = "green";
};

logoutBtn.onclick = function () {
  sessionStorage.removeItem("raisaAdminLoggedIn");
  window.location.href = "login.html";
};
