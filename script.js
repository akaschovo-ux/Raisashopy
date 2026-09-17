document.addEventListener("DOMContentLoaded", () => {
  const defaultData = {
    shopName: "Raisa Shopy",
    heroTitle: "Face and Neck Beauty Device",
    heroText: "Revitalize your skin with advanced LED therapy",
    productName: "Face and Neck Beauty Device",
    oldPrice: 249,
    newPrice: 179,
    description:
      "Advanced LED face and neck massager designed to help lift, smooth and tighten the skin around the face, neck, chin and jawline. LED Photon Therapy supports a fresh, healthy-looking appearance.",
    whatsappNumber: "+966 56 374 7461",
    footerText: "Premium beauty products from Raisa Shopy.",
    productImages: [],
    descriptionImages: [],
    video: ""
  };

  let shopData = defaultData;

  try {
    const savedData = localStorage.getItem("raisaShopData");

    if (savedData) {
      shopData = {
        ...defaultData,
        ...JSON.parse(savedData)
      };
    }
  } catch (error) {
    console.error("Could not load shop data:", error);
  }

  // =========================
  // BASIC SHOP INFORMATION
  // =========================

  const logo = document.querySelector(".logo");
  const heroTitle = document.querySelector(".hero h1");
  const heroText = document.querySelector(".hero p");
  const productTitle = document.querySelector(".product-info h2");
  const oldPriceElement = document.querySelector(".old-price");
  const newPriceElement = document.querySelector(".new-price");
  const discountElement = document.querySelector(".discount");
  const productDescription = document.querySelector(".product-info > p");

  if (logo) {
    logo.textContent = shopData.shopName;
  }

  if (heroTitle) {
    heroTitle.textContent = shopData.heroTitle;
  }

  if (heroText) {
    heroText.textContent = shopData.heroText;
  }

  if (productTitle) {
    productTitle.textContent = shopData.productName;
  }

  if (oldPriceElement) {
    oldPriceElement.textContent = `Old Price: ${shopData.oldPrice} SAR`;
  }

  if (newPriceElement) {
    newPriceElement.textContent = `${shopData.newPrice} SAR`;
  }

  if (discountElement) {
    const oldPrice = Number(shopData.oldPrice);
    const newPrice = Number(shopData.newPrice);

    if (oldPrice > 0 && newPrice < oldPrice) {
      const discount = Math.round(
        ((oldPrice - newPrice) / oldPrice) * 100
      );

      discountElement.textContent = `${discount}% OFF`;
    }
  }

  if (productDescription) {
    productDescription.textContent = shopData.description;
  }

  // =========================
  // PRODUCT IMAGES
  // =========================

  const mainImage = document.getElementById("mainImage");
  const thumbnails = document.querySelectorAll(".thumbnail");

  if (
    Array.isArray(shopData.productImages) &&
    shopData.productImages.length > 0
  ) {
    const images = shopData.productImages.filter(Boolean);

    if (mainImage && images[0]) {
      mainImage.src = images[0];
    }

    thumbnails.forEach((thumbnail, index) => {
      if (images[index]) {
        thumbnail.src = images[index];
        thumbnail.style.display = "block";
      } else {
        thumbnail.style.display = "none";
      }

      thumbnail.addEventListener("click", () => {
        if (images[index] && mainImage) {
          mainImage.src = images[index];
        }
      });
    });
  } else {
    thumbnails.forEach((thumbnail) => {
      thumbnail.addEventListener("click", () => {
        if (mainImage) {
          mainImage.src = thumbnail.src;
        }
      });
    });
  }

  // =========================
  // DESCRIPTION IMAGES
  // =========================

  const descriptionImages = document.querySelectorAll(
    ".description-images img"
  );

  if (
    Array.isArray(shopData.descriptionImages) &&
    shopData.descriptionImages.length > 0
  ) {
    const images = shopData.descriptionImages.filter(Boolean);

    descriptionImages.forEach((image, index) => {
      if (images[index]) {
        image.src = images[index];
        image.style.display = "block";
      } else {
        image.style.display = "none";
      }
    });
  }

  // =========================
  // PRODUCT VIDEO
  // =========================

  const productVideo = document.querySelector("video");

  if (productVideo) {
    if (shopData.video) {
      productVideo.src = shopData.video;
      productVideo.style.display = "block";
      productVideo.controls = true;
    } else {
      productVideo.style.display = "none";
    }
  }

  // =========================
  // QUANTITY & TOTAL
  // =========================

  const quantityInput = document.getElementById("quantity");
  const minusBtn = document.getElementById("minusBtn");
  const plusBtn = document.getElementById("plusBtn");
  const totalPrice = document.getElementById("totalPrice");

  const orderQuantity = document.getElementById("orderQuantity");
  const orderTotal = document.getElementById("orderTotal");

  const price = Number(shopData.newPrice) || 179;

  function updateTotal() {
    let quantity = Number(quantityInput?.value) || 1;

    quantity = Math.max(1, Math.min(3, quantity));

    if (quantityInput) {
      quantityInput.value = quantity;
    }

    const total = price * quantity;

    if (totalPrice) {
      totalPrice.textContent = `${total} SAR`;
    }

    if (orderQuantity) {
      orderQuantity.textContent = quantity;
    }

    if (orderTotal) {
      orderTotal.textContent = `${total} SAR`;
    }
  }

  if (minusBtn) {
    minusBtn.addEventListener("click", () => {
      if (quantityInput) {
        quantityInput.value =
          Math.max(1, Number(quantityInput.value || 1) - 1);

        updateTotal();
      }
    });
  }

  if (plusBtn) {
    plusBtn.addEventListener("click", () => {
      if (quantityInput) {
        quantityInput.value =
          Math.min(3, Number(quantityInput.value || 1) + 1);

        updateTotal();
      }
    });
  }

  if (quantityInput) {
    quantityInput.addEventListener("input", updateTotal);
  }

  // =========================
  // ORDER BUTTON
  // =========================

  const orderButton = document.querySelector(
    'a[href="#order"], button[data-order]'
  );

  if (orderButton) {
    orderButton.addEventListener("click", () => {
      const orderSection = document.getElementById("order");

      if (orderSection) {
        orderSection.scrollIntoView({
          behavior: "smooth"
        });
      }
    });
  }

  // =========================
  // ORDER FORM → WHATSAPP
  // =========================

  const orderForm = document.getElementById("orderForm");

  if (orderForm) {
    orderForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const name =
        document.getElementById("customerName")?.value.trim() || "";

      const phone =
        document.getElementById("customerPhone")?.value.trim() || "";

      const address =
        document.getElementById("customerAddress")?.value.trim() || "";

      const quantity = Number(quantityInput?.value || 1);
      const total = price * quantity;

      const whatsappNumber =
        String(shopData.whatsappNumber || "966563747461")
          .replace(/\D/g, "");

      const message = [
        "Hello Raisa Shopy,",
        "",
        "I want to place an order.",
        "",
        `Product: ${shopData.productName}`,
        `Quantity: ${quantity}`,
        `Total Price: ${total} SAR`,
        "",
        `Customer Name: ${name}`,
        `Phone: ${phone}`,
        `Address: ${address}`
      ].join("\n");

      const whatsappURL =
        `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

      window.open(whatsappURL, "_blank");
    });
  }

  // =========================
  // FOOTER
  // =========================

  const footerParagraphs = document.querySelectorAll("footer p");

  if (footerParagraphs.length > 0) {
    footerParagraphs[0].textContent = shopData.footerText;
  }

  if (footerParagraphs.length > 1) {
    footerParagraphs[1].textContent =
      `WhatsApp: ${shopData.whatsappNumber}`;
  }

  // =========================
  // INITIAL TOTAL
  // =========================

  updateTotal();
});
