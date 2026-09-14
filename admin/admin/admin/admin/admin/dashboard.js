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
  document.getElementById("logoutBtn");


// ======================================
// Load Data Into Form
// ======================================

function loadForm() {

  shopName.value = shopData.shopName || "";

  heroTitle.value = shopData.heroTitle || "";

  heroText.value = shopData.heroText || "";

  footerText.value = shopData.footerText || "";

  productName.value = shopData.productName || "";

  oldPrice.value = shopData.oldPrice || "";

  newPrice.value = shopData.newPrice || "";

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

  if (!shopData.productImages) return;

  shopData.productImages.forEach(
    function (image, index) {

      const box = document.createElement("div");

      box.className = "preview-item";

      box.innerHTML = `
        <img src="${image}" alt="Product Image">

        <button
          type="button"
          onclick="deleteProductImage(${index})"
        >
          ✕
        </button>
      `;

      productImagePreview.appendChild(box);

    }
  );
}


// ======================================
// Description Image Preview
// ======================================

function showDescriptionImages() {

  descriptionImagePreview.innerHTML = "";

  if (!shopData.descriptionImages) return;

  shopData.descriptionImages.forEach(
    function (image, index) {

      const box = document.createElement("div");

      box.className = "preview-item";

      box.innerHTML = `
        <img src="${image}" alt="Description Image">

        <button
          type="button"
          onclick="deleteDescriptionImage(${index})"
        >
          ✕
        </button>
      `;

      descriptionImagePreview.appendChild(box);

    }
  );
}


// ======================================
// Delete Product Image
// ======================================

window.deleteProductImage = function (index) {

  shopData.productImages.splice(index, 1);

  saveData();

  showProductImages();
};


// ======================================
// Delete Description Image
// ======================================

window.deleteDescriptionImage = function (index) {

  shopData.descriptionImages.splice(index, 1);

  saveData();

  showDescriptionImages();
};


// ======================================
// Read File As Base64
// ======================================

function readFile(file) {

  return new Promise(
    function (resolve, reject) {

      const reader = new FileReader();

      reader.onload = function () {
        resolve(reader.result);
      };

      reader.onerror = function () {
        reject(reader.error);
      };

      reader.readAsDataURL(file);

    }
  );
}


// ======================================
// Product Images Upload
// ======================================

productImages.addEventListener(
  "change",
  async function () {

    const files = Array.from(
      productImages.files
    );

    if (!files.length) return;


    if (
      shopData.productImages.length +
      files.length > 6
    ) {

      alert(
        "Maximum 6 product images are allowed."
      );

      productImages.value = "";

      return;
    }


    for (const file of files) {

      const image =
        await readFile(file);

      shopData.productImages.push(image);

    }


    saveData();

    showProductImages();

    productImages.value = "";

  }
);


// ======================================
// Description Images Upload
// ======================================

descriptionImages.addEventListener(
  "change",
  async function () {

    const files = Array.from(
      descriptionImages.files
    );

    if (!files.length) return;


    if (
      shopData.descriptionImages.length +
      files.length > 5
    ) {

      alert(
        "Maximum 5 description images are allowed."
      );

      descriptionImages.value = "";

      return;
    }


    for (const file of files) {

      const image =
        await readFile(file);

      shopData.descriptionImages.push(image);

    }


    saveData();

    showDescriptionImages();

    descriptionImages.value = "";

  }
);


// ======================================
// Video Upload
// ======================================

productVideo.addEventListener(
  "change",
  async function () {

    const file =
      productVideo.files[0];

    if (!file) return;


    if (!file.type.startsWith("video/")) {

      alert("Please select a video file.");

      productVideo.value = "";

      return;
    }


    // Temporary local storage version
    const video =
      await readFile(file);

    shopData.video = video;

    saveData();

    showVideo();

    productVideo.value = "";

  }
);


// ======================================
// Show Video
// ======================================

function showVideo() {

  videoPreview.innerHTML = "";

  if (!shopData.video) return;


  videoPreview.innerHTML = `
    <video
      src="${shopData.video}"
      controls
      muted
      playsinline
    ></video>

    <button
      type="button"
      onclick="deleteVideo()"
      class="delete-video"
    >
      ✕ Delete Video
    </button>
  `;
}


// ======================================
// Delete Video
// ======================================

window.deleteVideo = function () {

  shopData.video = "";

  saveData();

  showVideo();

};


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
// SAVE ALL CHANGES
// ======================================

saveBtn.addEventListener(
  "click",
  function () {

    shopData.shopName =
      shopName.value.trim();

    shopData.heroTitle =
      heroTitle.value.trim();

    shopData.heroText =
      heroText.value.trim();

    shopData.footerText =
      footerText.value.trim();

    shopData.productName =
      productName.value.trim();

    shopData.oldPrice =
      Number(oldPrice.value) || 0;

    shopData.newPrice =
      Number(newPrice.value) || 0;

    shopData.description =
      description.value.trim();

    shopData.whatsappNumber =
      whatsappNumber.value
        .replace(/\D/g, "");


    saveData();


    saveMessage.textContent =
      "✓ All changes saved successfully!";

    saveMessage.style.color =
      "green";


    setTimeout(
      function () {

        saveMessage.textContent = "";

      },
      3000
    );

  }
);


// ======================================
// LOGOUT
// ======================================

logoutBtn.addEventListener(
  "click",
  function () {

    sessionStorage.removeItem(
      "raisaAdminLoggedIn"
    );

    window.location.href =
      "login.html";

  }
);


// ======================================
// Start
// ======================================

loadForm();
