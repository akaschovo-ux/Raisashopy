if (sessionStorage.getItem("raisaAdminLoggedIn") !== "true") {
  window.location.href = "login.html";
}

const CLOUD_NAME = "sfz3ergx";
const UPLOAD_PRESET = "raisa_shopy";
const CLOUDINARY_UPLOAD_URL =
  `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/auto/upload`;

const defaultData = {
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
  mainProductImage: "",
  video: ""
};

let shopData = {};

try {
  const saved = localStorage.getItem("raisaShopData");
  shopData = saved ? JSON.parse(saved) : {};
} catch (error) {
  shopData = {};
}

shopData = Object.assign({}, defaultData, shopData);

shopData.productImages = Array.isArray(shopData.productImages)
  ? shopData.productImages.filter(function (item) {
      return typeof item === "string" && item.startsWith("http");
    })
  : [];

shopData.descriptionImages = Array.isArray(shopData.descriptionImages)
  ? shopData.descriptionImages.filter(function (item) {
      return typeof item === "string" && item.startsWith("http");
    })
  : [];

if (
  typeof shopData.mainProductImage !== "string" ||
  !shopData.mainProductImage.startsWith("http")
) {
  shopData.mainProductImage =
    shopData.productImages[0] || "";
}

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

const productImagesInput =
  document.getElementById("productImages");

const descriptionImagesInput =
  document.getElementById("descriptionImages");

const productVideoInput =
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


function saveData() {   try {     const cleanData = {       shopName: shopData.shopName || "",       heroTitle: shopData.heroTitle || "",       heroText: shopData.heroText || "",       footerText: shopData.footerText || "",       productName: shopData.productName || "",       oldPrice: Number(shopData.oldPrice) || 0,       newPrice: Number(shopData.newPrice) || 0,       description: shopData.description || "",       whatsappNumber: shopData.whatsappNumber || "",        productImages: Array.isArray(shopData.productImages)         ? shopData.productImages.filter(function (url) {             return typeof url === "string" &&                    url.startsWith("http");           })         : [],        descriptionImages: Array.isArray(shopData.descriptionImages)         ? shopData.descriptionImages.filter(function (url) {             return typeof url === "string" &&                    url.startsWith("http");           })         : [],        mainProductImage:         typeof shopData.mainProductImage === "string" &&         shopData.mainProductImage.startsWith("http")           ? shopData.mainProductImage           : "",        video:         typeof shopData.video === "string" &&         shopData.video.startsWith("http")           ? shopData.video           : ""     };      localStorage.removeItem("raisaShopData");      localStorage.setItem(       "raisaShopData",       JSON.stringify(cleanData)     );      shopData = cleanData;      return true;    } catch (error) {     console.error(error);      saveMessage.textContent =       "✕ Could not save. Browser storage is full.";      saveMessage.style.color = "red";      return false;   } }
  try {
    localStorage.setItem(
      "raisaShopData",
      JSON.stringify(shopData)
    );
    return true;
  } catch (error) {
    console.error(error);

    saveMessage.textContent =
      "Storage error. Please remove old browser data.";

    saveMessage.style.color = "red";

    return false;
  }
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

  whatsappNumber.value =
    shopData.whatsappNumber || "";

  showProductImages();
  showDescriptionImages();
  showVideo();
}


async function uploadToCloudinary(file) {
  const formData = new FormData();

  formData.append("file", file);
  formData.append(
    "upload_preset",
    UPLOAD_PRESET
  );

  const response =
    await fetch(
      CLOUDINARY_UPLOAD_URL,
      {
        method: "POST",
        body: formData
      }
    );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      "Cloudinary upload failed: " +
      errorText
    );
  }

  const result =
    await response.json();

  if (!result.secure_url) {
    throw new Error(
      "Cloudinary did not return an image URL."
    );
  }

  return result.secure_url;
}


function showProductImages() {
  productImagePreview.innerHTML = "";

  shopData.productImages.forEach(
    function(image, index) {

      const box =
        document.createElement("div");

      box.className =
        "preview-item";


      const img =
        document.createElement("img");

      img.src = image;
      img.alt =
        "Product Image " +
        (index + 1);

      box.appendChild(img);


      const label =
        document.createElement("div");

      label.textContent =
        image === shopData.mainProductImage
          ? "★ MAIN PHOTO"
          : "Product Photo " +
            (index + 1);

      label.style.fontSize =
        "12px";

      label.style.fontWeight =
        "700";

      label.style.marginTop =
        "5px";

      box.appendChild(label);


      const mainButton =
        document.createElement("button");

      mainButton.type =
        "button";

      mainButton.textContent =
        image === shopData.mainProductImage
          ? "★ Main"
          : "Set Main";

      mainButton.onclick =
        function() {

          shopData.mainProductImage =
            image;

          saveData();
          showProductImages();
        };


      const upButton =
        document.createElement("button");

      upButton.type =
        "button";

      upButton.textContent =
        "↑";

      upButton.onclick =
        function() {

          if (index > 0) {

            const temp =
              shopData.productImages[index - 1];

            shopData.productImages[index - 1] =
              shopData.productImages[index];

            shopData.productImages[index] =
              temp;

            saveData();
            showProductImages();
          }
        };


      const downButton =
        document.createElement("button");

      downButton.type =
        "button";

      downButton.textContent =
        "↓";

      downButton.onclick =
        function() {

          if (
            index <
            shopData.productImages.length - 1
          ) {

            const temp =
              shopData.productImages[index + 1];

            shopData.productImages[index + 1] =
              shopData.productImages[index];

            shopData.productImages[index] =
              temp;

            saveData();
            showProductImages();
          }
        };


      const deleteButton =
        document.createElement("button");

      deleteButton.type =
        "button";

      deleteButton.textContent =
        "✕";

      deleteButton.onclick =
        function() {

          const deleted =
            shopData.productImages[index];

          shopData.productImages.splice(
            index,
            1
          );

          if (
            shopData.mainProductImage ===
            deleted
          ) {
            shopData.mainProductImage =
              shopData.productImages[0] ||
              "";
          }

          saveData();
          showProductImages();
        };


      box.appendChild(mainButton);
      box.appendChild(upButton);
      box.appendChild(downButton);
      box.appendChild(deleteButton);

      productImagePreview.appendChild(box);
    }
  );
}


function showDescriptionImages() {
  descriptionImagePreview.innerHTML = "";

  shopData.descriptionImages.forEach(
    function(image, index) {

      const box =
        document.createElement("div");

      box.className =
        "preview-item";


      const img =
        document.createElement("img");

      img.src = image;
      img.alt =
        "Description Image " +
        (index + 1);

      box.appendChild(img);


      const label =
        document.createElement("div");

      label.textContent =
        "Description Photo " +
        (index + 1);

      label.style.fontSize =
        "12px";

      label.style.marginTop =
        "5px";

      box.appendChild(label);


      const upButton =
        document.createElement("button");

      upButton.type =
        "button";

      upButton.textContent =
        "↑";

      upButton.onclick =
        function() {

          if (index > 0) {

            const temp =
              shopData.descriptionImages[index - 1];

            shopData.descriptionImages[index - 1] =
              shopData.descriptionImages[index];

            shopData.descriptionImages[index] =
              temp;

            saveData();
            showDescriptionImages();
          }
        };


      const downButton =
        document.createElement("button");

      downButton.type =
        "button";

      downButton.textContent =
        "↓";

      downButton.onclick =
        function() {

          if (
            index <
            shopData.descriptionImages.length - 1
          ) {

            const temp =
              shopData.descriptionImages[index + 1];

            shopData.descriptionImages[index + 1] =
              shopData.descriptionImages[index];

            shopData.descriptionImages[index] =
              temp;

            saveData();
            showDescriptionImages();
          }
        };


      const deleteButton =
        document.createElement("button");

      deleteButton.type =
        "button";

      deleteButton.textContent =
        "✕";

      deleteButton.onclick =
        function() {

          shopData.descriptionImages.splice(
            index,
            1
          );

          saveData();
          showDescriptionImages();
        };


      box.appendChild(upButton);
      box.appendChild(downButton);
      box.appendChild(deleteButton);

      descriptionImagePreview.appendChild(box);
    }
  );
}


productImagesInput.addEventListener(
  "change",
  async function() {

    const files =
      Array.from(
        productImagesInput.files
      );

    if (!files.length) {
      return;
    }

    if (
      shopData.productImages.length +
      files.length >
      6
    ) {

      alert(
        "Maximum 6 product images are allowed."
      );

      productImagesInput.value =
        "";

      return;
    }

    try {

      for (const file of files) {

        if (
          !file.type.startsWith("image/")
        ) {
          continue;
        }

        saveMessage.textContent =
          "Uploading product image...";

        saveMessage.style.color =
          "black";

        const url =
          await uploadToCloudinary(file);

        shopData.productImages.push(
          url
        );

        if (
          !shopData.mainProductImage
        ) {
          shopData.mainProductImage =
            url;
        }
      }

      saveData();
      showProductImages();

      saveMessage.textContent =
        "✓ Product image uploaded!";

      saveMessage.style.color =
        "green";

    } catch (error) {

      console.error(error);

      saveMessage.textContent =
        "✕ Image upload failed.";

      saveMessage.style.color =
        "red";
    }

    productImagesInput.value =
      "";
  }
);


descriptionImagesInput.addEventListener(
  "change",
  async function() {

    const files =
      Array.from(
        descriptionImagesInput.files
      );

    if (!files.length) {
      return;
    }

    if (
      shopData.descriptionImages.length +
      files.length >
      5
    ) {

      alert(
        "Maximum 5 description images are allowed."
      );

      descriptionImagesInput.value =
        "";

      return;
    }

    try {

      for (const file of files) {

        if (
          !file.type.startsWith("image/")
        ) {
          continue;
        }

        saveMessage.textContent =
          "Uploading description image...";

        saveMessage.style.color =
          "black";

        const url =
          await uploadToCloudinary(file);

        shopData.descriptionImages.push(
          url
        );
      }

      saveData();
      showDescriptionImages();

      saveMessage.textContent =
        "✓ Description image uploaded!";

      saveMessage.style.color =
        "green";

    } catch (error) {

      console.error(error);

      saveMessage.textContent =
        "✕ Description image upload failed.";

      saveMessage.style.color =
        "red";
    }

    descriptionImagesInput.value =
      "";
  }
);


productVideoInput.addEventListener(
  "change",
  async function() {

    const file =
      productVideoInput.files[0];

    if (!file) {
      return;
    }

    if (
      !file.type.startsWith("video/")
    ) {

      alert(
        "Please select a video file."
      );

      productVideoInput.value =
        "";

      return;
    }

    try {

      saveMessage.textContent =
        "Uploading video...";

      saveMessage.style.color =
        "black";

      const url =
        await uploadToCloudinary(file);

      shopData.video =
        url;

      saveData();
      showVideo();

      saveMessage.textContent =
        "✓ Video uploaded!";

      saveMessage.style.color =
        "green";

    } catch (error) {

      console.error(error);

      saveMessage.textContent =
        "✕ Video upload failed.";

      saveMessage.style.color =
        "red";
    }

    productVideoInput.value =
      "";
  }
);


function showVideo() {

  videoPreview.innerHTML = "";

  if (!shopData.video) {
    return;
  }

  const video =
    document.createElement("video");

  video.src =
    shopData.video;

  video.controls =
    true;

  video.muted =
    true;

  video.playsInline =
    true;

  video.style.width =
    "100%";

  video.style.maxWidth =
    "500px";

  video.style.borderRadius =
    "12px";


  const deleteButton =
    document.createElement("button");

  deleteButton.type =
    "button";

  deleteButton.className =
    "delete-video";

  deleteButton.textContent =
    "✕ Delete Video";

  deleteButton.onclick =
    function() {

      shopData.video =
        "";

      saveData();
      showVideo();
    };


  videoPreview.appendChild(
    video
  );

  videoPreview.appendChild(
    deleteButton
  );
}


saveBtn.addEventListener(
  "click",
  function() {

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
      whatsappNumber.value.replace(
        /\D/g,
        ""
      );

    if (saveData()) {

      saveMessage.textContent =
        "✓ All changes saved successfully!";

      saveMessage.style.color =
        "green";

      setTimeout(function() {

        saveMessage.textContent =
          "";

      }, 3000);
    }
  }
);


logoutBtn.addEventListener(
  "click",
  function() {

    sessionStorage.removeItem(
      "raisaAdminLoggedIn"
    );

    window.location.href =
      "login.html";
  }
);


loadForm();
