```javascript
if (sessionStorage.getItem("raisaAdminLoggedIn") !== "true") {
  window.location.href = "login.html";
}

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

let shopData;

try {
  const saved = localStorage.getItem("raisaShopData");
  shopData = saved ? JSON.parse(saved) : JSON.parse(JSON.stringify(defaultData));
} catch (error) {
  shopData = JSON.parse(JSON.stringify(defaultData));
}

if (!Array.isArray(shopData.productImages)) {
  shopData.productImages = [];
}

if (!Array.isArray(shopData.descriptionImages)) {
  shopData.descriptionImages = [];
}

const shopName = document.getElementById("shopName");
const heroTitle = document.getElementById("heroTitle");
const heroText = document.getElementById("heroText");
const footerText = document.getElementById("footerText");
const productName = document.getElementById("productName");
const oldPrice = document.getElementById("oldPrice");
const newPrice = document.getElementById("newPrice");
const description = document.getElementById("description");
const whatsappNumber = document.getElementById("whatsappNumber");
const productImages = document.getElementById("productImages");
const descriptionImages = document.getElementById("descriptionImages");
const productVideo = document.getElementById("productVideo");
const productImagePreview = document.getElementById("productImagePreview");
const descriptionImagePreview = document.getElementById("descriptionImagePreview");
const videoPreview = document.getElementById("videoPreview");
const saveBtn = document.getElementById("saveBtn");
const saveMessage = document.getElementById("saveMessage");
const logoutBtn = document.getElementById("logoutBtn");

function saveData() {
  localStorage.setItem("raisaShopData", JSON.stringify(shopData));
}

function loadForm() {
  shopName.value = shopData.shopName || "";
  heroTitle.value = shopData.heroTitle || "";
  heroText.value = shopData.heroText || "";
  footerText.value = shopData.footerText || "";
  productName.value = shopData.productName || "";
  oldPrice.value = shopData.oldPrice ?? "";
  newPrice.value = shopData.newPrice ?? "";
  description.value = shopData.description || "";
  whatsappNumber.value = shopData.whatsappNumber || "";

  showProductImages();
  showDescriptionImages();
  showVideo();
}

function showProductImages() {
  productImagePreview.innerHTML = "";

  shopData.productImages.forEach(function(image, index) {
    const box = document.createElement("div");
    box.className = "preview-item";

    const img = document.createElement("img");
    img.src = image;
    img.alt = "Product Image";

    const button = document.createElement("button");
    button.type = "button";
    button.textContent = "✕";

    button.addEventListener("click", function() {
      shopData.productImages.splice(index, 1);
      saveData();
      showProductImages();
    });

    box.appendChild(img);
    box.appendChild(button);
    productImagePreview.appendChild(box);
  });
}

function showDescriptionImages() {
  descriptionImagePreview.innerHTML = "";

  shopData.descriptionImages.forEach(function(image, index) {
    const box = document.createElement("div");
    box.className = "preview-item";

    const img = document.createElement("img");
    img.src = image;
    img.alt = "Description Image";

    const button = document.createElement("button");
    button.type = "button";
    button.textContent = "✕";

    button.addEventListener("click", function() {
      shopData.descriptionImages.splice(index, 1);
      saveData();
      showDescriptionImages();
    });

    box.appendChild(img);
    box.appendChild(button);
    descriptionImagePreview.appendChild(box);
  });
}

function readFile(file) {
  return new Promise(function(resolve, reject) {
    const reader = new FileReader();

    reader.onload = function() {
      resolve(reader.result);
    };

    reader.onerror = function() {
      reject(reader.error);
    };

    reader.readAsDataURL(file);
  });
}

productImages.addEventListener("change", async function() {
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

      const image = await readFile(file);
      shopData.productImages.push(image);
    }

    saveData();
    showProductImages();
  } catch (error) {
    console.error(error);
    alert("Could not upload product image.");
  }

  productImages.value = "";
});

descriptionImages.addEventListener("change", async function() {
  const files = Array.from(descriptionImages.files);

  if (!files.length) {
    return;
  }

  if (shopData.descriptionImages.length + files.length > 5) {
    alert("Maximum 5 description images are allowed.");
    descriptionImages.value = "";
    return;
  }

  try {
    for (const file of files) {
      if (!file.type.startsWith("image/")) {
        continue;
      }

      const image = await readFile(file);
      shopData.descriptionImages.push(image);
    }

    saveData();
    showDescriptionImages();
  } catch (error) {
    console.error(error);
    alert("Could not upload description image.");
  }

  descriptionImages.value = "";
});

productVideo.addEventListener("change", async function() {
  const file = productVideo.files[0];

  if (!file) {
    return;
  }

  if (!file.type.startsWith("video/")) {
    alert("Please select a video file.");
    productVideo.value = "";
    return;
  }

  try {
    const video = await readFile(file);
    shopData.video = video;
    saveData();
    showVideo();
  } catch (error) {
    console.error(error);
    alert("Could not upload video.");
  }

  productVideo.value = "";
});

function showVideo() {
  videoPreview.innerHTML = "";

  if (!shopData.video) {
    return;
  }

  const video = document.createElement("video");
  video.src = shopData.video;
  video.controls = true;
  video.muted = true;
  video.playsInline = true;

  const deleteButton = document.createElement("button");
  deleteButton.type = "button";
  deleteButton.className = "delete-video";
  deleteButton.textContent = "✕ Delete Video";

  deleteButton.addEventListener("click", function() {
    shopData.video = "";
    saveData();
    showVideo();
  });

  videoPreview.appendChild(video);
  videoPreview.appendChild(deleteButton);
}

saveBtn.addEventListener("click", function() {
  shopData.shopName = shopName.value.trim();
  shopData.heroTitle = heroTitle.value.trim();
  shopData.heroText = heroText.value.trim();
  shopData.footerText = footerText.value.trim();

  shopData.productName = productName.value.trim();
  shopData.oldPrice = Number(oldPrice.value) || 0;
  shopData.newPrice = Number(newPrice.value) || 0;

  shopData.description = description.value.trim();
  shopData.whatsappNumber = whatsappNumber.value.replace(/\D/g, "");

  try {
    saveData();

    saveMessage.textContent = "✓ All changes saved successfully!";
    saveMessage.style.color = "green";

    setTimeout(function() {
      saveMessage.textContent = "";
    }, 3000);
  } catch (error) {
    console.error(error);

    saveMessage.textContent = "✕ Could not save changes.";
    saveMessage.style.color = "red";
  }
});

logoutBtn.addEventListener("click", function() {
  sessionStorage.removeItem("raisaAdminLoggedIn");
  window.location.href = "login.html";
});

loadForm();
```
