document.addEventListener("DOMContentLoaded", function () {

  // LOGIN CHECK
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

  let data = { ...defaultData };

  // LOAD SAVED DATA
  try {
    const saved = localStorage.getItem("raisaShopData");

    if (saved) {
      data = {
        ...defaultData,
        ...JSON.parse(saved)
      };
    }
  } catch (error) {
    console.log("Load error:", error);
  }


  // TEXT FIELDS
  const textFields = [
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

  textFields.forEach(function (id) {

    const input = document.getElementById(id);

    if (input) {
      input.value = data[id] ?? "";
    }

  });


  // FILE READER
  function readFile(file) {

    return new Promise(function (resolve, reject) {

      const reader = new FileReader();

      reader.onload = function () {
        resolve(reader.result);
      };

      reader.onerror = function () {
        reject(new Error("File reading failed"));
      };

      reader.readAsDataURL(file);

    });

  }


  // SAVE BUTTON
  const saveBtn = document.getElementById("saveBtn");
  const saveMessage = document.getElementById("saveMessage");

  if (!saveBtn) {
    alert("Save button not found!");
    return;
  }


  saveBtn.addEventListener("click", async function () {

    saveBtn.disabled = true;
    saveBtn.textContent = "Saving...";

    try {

      // GET TEXT DATA
      textFields.forEach(function (id) {

        const input = document.getElementById(id);

        if (input) {
          data[id] = input.value;
        }

      });


      // PRODUCT IMAGES
      data.productImages = data.productImages || [];

      for (let i = 1; i <= 6; i++) {

        const input =
          document.getElementById("productImage" + i);

        if (input && input.files.length > 0) {

          const file = input.files[0];

          data.productImages[i - 1] =
            await readFile(file);
        }

      }


      // DESCRIPTION IMAGES
      data.descriptionImages =
        data.descriptionImages || [];

      for (let i = 1; i <= 5; i++) {

        const input =
          document.getElementById("descriptionImage" + i);

        if (input && input.files.length > 0) {

          const file = input.files[0];

          data.descriptionImages[i - 1] =
            await readFile(file);
        }

      }


      // VIDEO
      const videoInput =
        document.getElementById("productVideo");

      if (
        videoInput &&
        videoInput.files &&
        videoInput.files.length > 0
      ) {

        data.video =
          await readFile(videoInput.files[0]);

      }


      // SAVE
      localStorage.setItem(
        "raisaShopData",
        JSON.stringify(data)
      );


      // SUCCESS
      saveBtn.disabled = false;
      saveBtn.textContent = "Saved ✓";

      if (saveMessage) {
        saveMessage.textContent =
          "✓ Changes saved successfully!";
        saveMessage.style.color = "#16803c";
      }

      alert("Changes saved successfully!");


      setTimeout(function () {
        saveBtn.textContent = "Save All Changes";
      }, 2000);


    } catch (error) {

      console.error(error);

      saveBtn.disabled = false;
      saveBtn.textContent = "Save All Changes";

      if (saveMessage) {
        saveMessage.textContent =
          "Save failed. The file may be too large.";
        saveMessage.style.color = "#d00000";
      }

      alert(
        "Save failed. Try a smaller image/video."
      );

    }

  });


  // LOGOUT
  const logoutBtn =
    document.getElementById("logoutBtn");

  if (logoutBtn) {

    logoutBtn.addEventListener("click", function () {

      localStorage.removeItem(
        "raisaAdminLoggedIn"
      );

      window.location.href = "login.html";

    });

  }

});
