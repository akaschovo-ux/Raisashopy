```javascript id="p8n4k2"
// admin/dashboard.js

document.addEventListener("DOMContentLoaded", () => {

  // ================================
  // CHECK ADMIN LOGIN
  // ================================

  if (localStorage.getItem("raisaAdminLoggedIn") !== "true") {
    window.location.href = "login.html";
    return;
  }


  // ================================
  // DEFAULT DATA
  // ================================

  const defaultData = {
    shopName: "Raisa Shopy",

    heroTitle: "Face and Neck Beauty Device",

    heroText:
      "Revitalize your skin with advanced LED therapy",

    productName:
      "Face and Neck Beauty Device",

    oldPrice: 249,

    newPrice: 179,

    description:
      "Revitalize your skin with our advanced LED Face and Neck Beauty Device. Designed to massage, smooth and tighten the face, neck, chin and jawline.",

    whatsappNumber:
      "+966563747461",

    productImages: [],

    descriptionImages: [],

    video: "",

    footerText:
      "© 2026 Raisa Shopy. All Rights Reserved."
  };


  // ================================
  // LOAD SAVED DATA
  // ================================

  let shopData;

  try {

    shopData =
      JSON.parse(
        localStorage.getItem("raisaShopData")
      ) || defaultData;

  } catch (error) {

    shopData = defaultData;

  }


  // ================================
  // LOAD TEXT SETTINGS
  // ================================

  document.getElementById("shopName").value =
    shopData.shopName || "";

  document.getElementById("heroTitle").value =
    shopData.heroTitle || "";

  document.getElementById("heroText").value =
    shopData.heroText || "";

  document.getElementById("productName").value =
    shopData.productName || "";

  document.getElementById("oldPrice").value =
    shopData.oldPrice || "";

  document.getElementById("newPrice").value =
    shopData.newPrice || "";

  document.getElementById("description").value =
    shopData.description || "";

  document.getElementById("whatsappNumber").value =
    shopData.whatsappNumber || "";

  document.getElementById("footerText").value =
    shopData.footerText || "";


  // ================================
  // IMAGE TO BASE64
  // ================================

  function fileToBase64(file) {

    return new Promise((resolve, reject) => {

      const reader = new FileReader();

      reader.onload = () => {
        resolve(reader.result);
      };

      reader.onerror = reject;

      reader.readAsDataURL(file);

    });

  }


  // ================================
  // GET IMAGE FILES
  // ================================

  async function getUploadedImages() {

    const images = [];

    for (let i = 1; i <= 6; i++) {

      const input =
        document.getElementById(
          `productImage${i}`
        );

      if (
        input &&
        input.files &&
        input.files[0]
      ) {

        const image =
          await fileToBase64(
            input.files[0]
          );

        images.push(image);

      } else if (
        shopData.productImages &&
        shopData.productImages[i - 1]
      ) {

        images.push(
          shopData.productImages[i - 1]
        );

      }

    }

    return images;
  }


  // ================================
  // GET DESCRIPTION IMAGES
  // ================================

  async function getDescriptionImages() {

    const images = [];

    for (let i = 1; i <= 5; i++) {

      const input =
        document.getElementById(
          `descriptionImage${i}`
        );

      if (
        input &&
        input.files &&
        input.files[0]
      ) {

        const image =
          await fileToBase64(
            input.files[0]
          );

        images.push(image);

      } else if (
        shopData.descriptionImages &&
        shopData.descriptionImages[i - 1]
      ) {

        images.push(
          shopData.descriptionImages[i - 1]
        );

      }

    }

    return images;
  }


  // ================================
  // GET VIDEO
  // ================================

  async function getVideo() {

    const videoInput =
      document.getElementById(
        "productVideo"
      );

    if (
      videoInput &&
      videoInput.files &&
      videoInput.files[0]
    ) {

      return await fileToBase64(
        videoInput.files[0]
      );

    }

    return shopData.video || "";

  }


  // ================================
  // SAVE ALL CHANGES
  // ================================

  document
    .getElementById("saveBtn")
    .addEventListener("click", async () => {

      const saveMessage =
        document.getElementById(
          "saveMessage"
        );

      saveMessage.textContent =
        "Saving...";


      try {

        const productImages =
          await getUploadedImages();

        const descriptionImages =
          await getDescriptionImages();

        const video =
          await getVideo();


        const updatedData = {

          shopName:
            document.getElementById(
              "shopName"
            ).value.trim(),

          heroTitle:
            document.getElementById(
              "heroTitle"
            ).value.trim(),

          heroText:
            document.getElementById(
              "heroText"
            ).value.trim(),

          productName:
            document.getElementById(
              "productName"
            ).value.trim(),

          oldPrice:
            Number(
              document.getElementById(
                "oldPrice"
              ).value
            ),

          newPrice:
            Number(
              document.getElementById(
                "newPrice"
              ).value
            ),

          description:
            document.getElementById(
              "description"
            ).value.trim(),

          whatsappNumber:
            document.getElementById(
              "whatsappNumber"
            ).value.trim(),

          productImages:
            productImages,

          descriptionImages:
            descriptionImages,

          video:
            video,

          footerText:
            document.getElementById(
              "footerText"
            ).value.trim()

        };


        // Save to browser
        localStorage.setItem(
          "raisaShopData",
          JSON.stringify(
            updatedData
          )
        );


        // Update current data
        shopData =
          updatedData;


        saveMessage.textContent =
          "✓ All changes saved successfully!";


      } catch (error) {

        console.error(error);

        saveMessage.textContent =
          "Error saving changes. Please try again.";

      }


      setTimeout(() => {

        saveMessage.textContent = "";

      }, 4000);

    });


  // ================================
  // LOGOUT
  // ================================

  document
    .getElementById("logoutBtn")
    .addEventListener("click", () => {

      localStorage.removeItem(
        "raisaAdminLoggedIn"
      );

      window.location.href =
        "login.html";

    });

});
```
