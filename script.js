// script.js

document.addEventListener("DOMContentLoaded", () => {
  const oldPrice = 249;
  const newPrice = 179;

  const quantityInput = document.getElementById("quantity");
  const minusBtn = document.getElementById("minusBtn");
  const plusBtn = document.getElementById("plusBtn");
  const totalPrice = document.getElementById("totalPrice");

  function updateTotal() {
    const quantity = Math.max(
      1,
      Math.min(3, Number(quantityInput.value) || 1)
    );

    quantityInput.value = quantity;
    totalPrice.textContent = `${newPrice * quantity} SAR`;
  }

  if (minusBtn) {
    minusBtn.addEventListener("click", () => {
      quantityInput.value = Math.max(
        1,
        Number(quantityInput.value || 1) - 1
      );
      updateTotal();
    });
  }

  if (plusBtn) {
    plusBtn.addEventListener("click", () => {
      quantityInput.value = Math.min(
        3,
        Number(quantityInput.value || 1) + 1
      );
      updateTotal();
    });
  }

  if (quantityInput) {
    quantityInput.addEventListener("input", updateTotal);
  }

  // Product image gallery
  const mainImage = document.getElementById("mainImage");
  const thumbnails = document.querySelectorAll(".thumbnail");

  thumbnails.forEach((thumbnail) => {
    thumbnail.addEventListener("click", () => {
      if (mainImage) {
        mainImage.src = thumbnail.src;
      }
    });
  });

  // Order form → WhatsApp
  const orderForm = document.getElementById("orderForm");

  if (orderForm) {
    orderForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const name = document.getElementById("customerName").value.trim();
      const phone = document.getElementById("customerPhone").value.trim();
      const address = document.getElementById("customerAddress").value.trim();
      const quantity = Number(quantityInput.value || 1);
      const total = newPrice * quantity;

      const whatsappNumber = "966563747461";

      const message =
        `Hello Raisa Shopy,%0A%0A` +
        `I want to order:%0A` +
        `Product: Face and Neck Beauty Device%0A` +
        `Quantity: ${quantity}%0A` +
        `Price: ${total} SAR%0A%0A` +
        `Customer Name: ${encodeURIComponent(name)}%0A` +
        `Phone: ${encodeURIComponent(phone)}%0A` +
        `Address: ${encodeURIComponent(address)}`;

      window.open(
        `https://wa.me/${whatsappNumber}?text=${message}`,
        "_blank"
      );
    });
  }

  updateTotal();
});
