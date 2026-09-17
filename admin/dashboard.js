document.addEventListener("DOMContentLoaded", () => {

  if (localStorage.getItem("raisaAdminLoggedIn") !== "true") {
    window.location.href = "login.html";
    return;
  }

  const defaultData = {
    shopName: "Raisa Shopy",
    heroTitle: "Face and Neck Beauty Device",
    heroText: "Revitalize your skin with advanced LED therapy",
    productName: "Face and Neck Beauty Device",
    oldPrice: 249,
    newPrice: 179,
    description: "Advanced LED face and neck massager designed to help lift, smooth and tighten the skin.",
    whatsappNumber: "+966 56 374 7461",
    footerText: "Premium beauty products from Raisa Shopy.",
    productImages: [],
    descriptionImages: [],
    video: ""
  };

  let shopData = { ...defaultData };

  try {
    const saved = localStorage.getItem("raisaShopData");

    if (saved) {
      shopData = {
        ...defaultData,
        ...JSON.parse(saved)
      };
    }
  } catch (error) {
    console.error(error);
  }


  // =========================
  // LOAD TEXT DATA
  // =========================

  const fields = [
    "shopName",
    "heroTitle",
    "heroText",
    "productName",
    "oldPrice",
    "newPrice",
    "description",
    "whatsappNumber",
    "footerText"
  ];

  fields.forEach((id) => {
    const element = document.getElementById(id);

    if (element && shopData[id] !== undefined) {
      element.value = shopData[id];
    }
  });


  // =========================
  // FILE TO BASE64
  // =========================

  function fileToBase64(file) {
    return new Promise((resolve, reject) => {

      if (!file) {
        resolve(null);
        return;
      }

      const reader = new FileReader();

      reader.onload = () => resolve(reader.result);

      reader.onerror = () =>
        reject(new Error("File could not be read."));

      reader.readAsDataURL(file);
    });
  }


  // =========================
  // SAVE BUTTON
  // =========================

  const saveBtn = document.getElementById("saveBtn");
  const saveMessage = document.getElementById("saveMessage");

  if (saveBtn) {

    saveBtn.addEventListener("click", async () => {

      saveBtn.disabled = true;
      saveBtn.textContent = "Saving...";

      try {

        // TEXT DATA

        fields.forEach((id) => {

          const element = document.getElementById(id);

          if (element) {
            shopData[id] = element.value.trim();
          }

        });


        // PRODUCT IMAGES

        const productImages = [
          ...shopData.productImages
        ];

        for (let i = 1; i <= 6; i++) {

          const input =
            document.getElementById(`productImage${i}`);

          if (input && input.files && input.files[0]) {

            productImages[i - 1] =
              await fileToBase64(input.files[0]);
          }
        }

        shopData.productImages =
          productImages.filter(Boolean);


        // DESCRIPTION IMAGES

        const descriptionImages = [
          ...shopData.descriptionImages
        ];

        for (let i = 1; i <= 5; i++) {

          const input =
            document.getElementById(`descriptionImage${i}`);

          if (input && input.files && input.files[0]) {

            descriptionImages[i - 1] =
              await fileToBase64(input.files[0]);
          }
        }

        shopData.descriptionImages =
          descriptionImages.filter(Boolean);


        // VIDEO

        const videoInput =
          document.getElementById("productVideo");

        if (
          videoInput &&
          videoInput.files &&
          videoInput.files[0]
        ) {

          shopData.video =
            await fileToBase64(videoInput.files[0]);
        }


        // SAVE TO LOCAL STORAGE

        localStorage.setItem(
          "raisaShopData",
          JSON.stringify(shopData)
        );


        // SUCCESS

        if (saveMessage) {
          saveMessage.textContent =
            "✓ All changes saved successfully!";
          saveMessage.style.color = "#16803c";
        }

        saveBtn.textContent = "Saved ✓";

        setTimeout(() => {
          saveBtn.textContent = "Save All Changes";
          saveBtn.disabled = false;
        }, 2000);

      } catch (error) {

        console.error(error);

        if (saveMessage) {
          saveMessage.textContent =
            "Unable to save. The selected file may be too large.";
          saveMessage.style.color = "#d00000";
        }

        saveBtn.textContent = "Save All Changes";
        saveBtn.disabled = false;
      }

    });

  }


  // =========================
  // LOGOUT
  // =========================

  const logoutBtn =
    document.getElementById("logoutBtn");

  if (logoutBtn) {

    logoutBtn.addEventListener("click", () => {

      localStorage.removeItem("raisaAdminLoggedIn");

      window.location.href = "login.html";

    });

  }

});
