document.addEventListener("DOMContentLoaded", function () {
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
    mainProductImage: "",
    video: "",
    footerText: "© 2026 Raisa Shopy. All Rights Reserved."
  };

  let shopData = {};

  try {
    const saved = localStorage.getItem("raisaShopData");
    shopData = saved ? JSON.parse(saved) : {};
  } catch (error) {
    console.error("Could not load shop data:", error);
    shopData = {};
  }

  shopData = Object.assign({}, defaultData, shopData);

  if (!Array.isArray(shopData.productImages)) {
    shopData.productImages = [];
  }

  if (!Array.isArray(shopData.descriptionImages)) {
    shopData.descriptionImages = [];
  }

  function setText(id, value) {
    const el = document.getElementById(id);
    if (el) {
      el.textContent = value || "";
    }
  }

  function formatPrice(value) {
    return Number(value || 0).toFixed(2);
  }

  function getDiscount(oldPrice, newPrice) {
    const oldValue = Number(oldPrice || 0);
    const newValue = Number(newPrice || 0);

    if (oldValue <= 0 || newValue >= oldValue) {
      return 0;
    }

    return Math.round(
      ((oldValue - newValue) / oldValue) * 100
    );
  }

  setText("shopName", shopData.shopName);
  setText("heroTitle", shopData.heroTitle);
  setText("heroText", shopData.heroText);
  setText("productName", shopData.productName);
  setText("descriptionText", shopData.description);
  setText("footerText", shopData.footerText);

  setText(
    "oldPrice",
    formatPrice(shopData.oldPrice) + " SAR"
  );

  setText(
    "newPrice",
    formatPrice(shopData.newPrice) + " SAR"
  );

  setText(
    "discount",
    getDiscount(
      shopData.oldPrice,
      shopData.newPrice
    ) + "% OFF"
  );


  // ======================================
  // Product Gallery
  // ======================================

  const mainImage =
    document.getElementById("mainProductImage");

  const thumbnails =
    document.getElementById("productThumbnails");

  if (mainImage && thumbnails) {
    thumbnails.innerHTML = "";

    if (shopData.productImages.length > 0) {
      mainImage.style.display = "block";

      let selectedImage =
        shopData.mainProductImage;

      if (
        !selectedImage ||
        !shopData.productImages.includes(selectedImage)
      ) {
        selectedImage =
          shopData.productImages[0];
      }

      mainImage.src = selectedImage;

      shopData.productImages.forEach(function (image, index) {
        const thumb =
          document.createElement("img");

        thumb.src = image;
        thumb.alt =
          "Product Image " + (index + 1);

        thumb.className =
          "product-thumbnail";

        if (image === selectedImage) {
          thumb.classList.add("active");
        }

        thumb.addEventListener("click", function () {
          mainImage.src = image;

          document
            .querySelectorAll(".product-thumbnail")
            .forEach(function (item) {
              item.classList.remove("active");
            });

          thumb.classList.add("active");
        });

        thumbnails.appendChild(thumb);
      });
    } else {
      mainImage.style.display = "none";
    }
  }


  // ======================================
  // Description Images
  // ======================================

  const descriptionBox =
    document.getElementById("descriptionImages");

  if (descriptionBox) {
    descriptionBox.innerHTML = "";

    shopData.descriptionImages.forEach(function (image, index) {
      const img =
        document.createElement("img");

      img.src = image;
      img.alt =
        "Description Image " + (index + 1);

      descriptionBox.appendChild(img);
    });
  }


  // ======================================
  // Product Video
  // ======================================

  const videoContainer =
    document.getElementById("videoContainer");

  const productVideo =
    document.getElementById("productVideo");

  if (videoContainer && productVideo) {
    if (shopData.video) {
      videoContainer.style.display = "block";
      productVideo.src = shopData.video;
    } else {
      videoContainer.style.display = "none";
    }
  }


  // ======================================
  // Quantity
  // ======================================

  let quantity = 1;

  const quantityInput =
    document.getElementById("quantity");

  const totalPrice =
    document.getElementById("totalPrice");

  function updateTotal() {
    const price =
      Number(shopData.newPrice || 0);

    const total =
      price * quantity;

    if (quantityInput) {
      quantityInput.value = quantity;
    }

    if (totalPrice) {
      totalPrice.textContent =
        total.toFixed(2) + " SAR";
    }
  }

  const minusBtn =
    document.getElementById("minusBtn");

  if (minusBtn) {
    minusBtn.addEventListener("click", function () {
      if (quantity > 1) {
        quantity--;
      }

      updateTotal();
    });
  }

  const plusBtn =
    document.getElementById("plusBtn");

  if (plusBtn) {
    plusBtn.addEventListener("click", function () {
      quantity++;
      updateTotal();
    });
  }

  updateTotal();


  // ======================================
  // WhatsApp Order
  // ======================================

  const orderButton =
    document.getElementById("orderNow");

  if (orderButton) {
    orderButton.addEventListener("click", function () {
      const customerName =
        document
          .getElementById("customerName")
          .value
          .trim();

      const customerPhone =
        document
          .getElementById("customerPhone")
          .value
          .trim();

      const customerAddress =
        document
          .getElementById("customerAddress")
          .value
          .trim();

      if (
        !customerName ||
        !customerPhone ||
        !customerAddress
      ) {
        alert(
          "Please fill in your name, phone and address."
        );

        return;
      }

      const total =
        Number(shopData.newPrice || 0) *
        quantity;

      const number =
        String(
          shopData.whatsappNumber || ""
        ).replace(/\D/g, "");

      if (!number) {
        alert(
          "WhatsApp number is not configured."
        );

        return;
      }

      const message =
        "Hello Raisa Shopy,\n\n" +
        "Product: " +
        shopData.productName +
        "\n" +
        "Price: " +
        formatPrice(shopData.newPrice) +
        " SAR\n" +
        "Quantity: " +
        quantity +
        "\n" +
        "Total: " +
        total.toFixed(2) +
        " SAR\n\n" +
        "Customer Name: " +
        customerName +
        "\n" +
        "Phone: " +
        customerPhone +
        "\n" +
        "Address: " +
        customerAddress;

      const url =
        "https://wa.me/" +
        number +
        "?text=" +
        encodeURIComponent(message);

      window.open(url, "_blank");
    });
  }
});
