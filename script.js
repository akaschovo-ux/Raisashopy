```javascript
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
  const saved =
    localStorage.getItem("raisaShopData");

  shopData = saved
    ? JSON.parse(saved)
    : {};
} catch (error) {
  shopData = {};
}

shopData = Object.assign(
  {},
  defaultData,
  shopData
);

if (!Array.isArray(shopData.productImages)) {
  shopData.productImages = [];
}

if (!Array.isArray(shopData.descriptionImages)) {
  shopData.descriptionImages = [];
}


function formatPrice(price) {
  return Number(price || 0).toFixed(2);
}


function calculateDiscount(oldPrice, newPrice) {
  const oldP = Number(oldPrice || 0);
  const newP = Number(newPrice || 0);

  if (oldP <= 0 || newP >= oldP) {
    return 0;
  }

  return Math.round(
    ((oldP - newP) / oldP) * 100
  );
}


document.getElementById("shopName").textContent =
  shopData.shopName;

document.getElementById("heroTitle").textContent =
  shopData.heroTitle;

document.getElementById("heroText").textContent =
  shopData.heroText;

document.getElementById("productName").textContent =
  shopData.productName;

document.getElementById("descriptionText").textContent =
  shopData.description;

document.getElementById("footerText").textContent =
  shopData.footerText;


document.getElementById("oldPrice").textContent =
  formatPrice(shopData.oldPrice) + " SAR";

document.getElementById("newPrice").textContent =
  formatPrice(shopData.newPrice) + " SAR";


document.getElementById("discount").textContent =
  calculateDiscount(
    shopData.oldPrice,
    shopData.newPrice
  ) + "% OFF";


const mainImage =
  document.getElementById("mainProductImage");

const thumbnailBox =
  document.getElementById("productThumbnails");


function renderProductGallery() {

  thumbnailBox.innerHTML = "";

  if (!shopData.productImages.length) {

    mainImage.style.display = "none";

    return;
  }

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

  mainImage.src =
    selectedImage;


  shopData.productImages.forEach(
    function(image, index) {

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

      thumb.onclick =
        function() {

          mainImage.src = image;

          document
            .querySelectorAll(".product-thumbnail")
            .forEach(function(item) {

              item.classList.remove("active");
            });

          thumb.classList.add("active");
        };

      thumbnailBox.appendChild(thumb);
    }
  );
}


renderProductGallery();


const descriptionBox =
  document.getElementById(
    "descriptionImages"
  );

descriptionBox.innerHTML = "";

shopData.descriptionImages.forEach(
  function(image) {

    const img =
      document.createElement("img");

    img.src = image;

    img.alt =
      "Product Description";

    descriptionBox.appendChild(img);
  }
);


const videoContainer =
  document.getElementById(
    "videoContainer"
  );

const productVideo =
  document.getElementById(
    "productVideo"
  );


if (shopData.video) {

  videoContainer.style.display =
    "block";

  productVideo.src =
    shopData.video;

} else {

  videoContainer.style.display =
    "none";
}


let quantity = 1;

const quantityInput =
  document.getElementById(
    "quantity"
  );

const totalPrice =
  document.getElementById(
    "totalPrice"
  );


function updateTotal() {

  const price =
    Number(shopData.newPrice || 0);

  const total =
    price * quantity;

  quantityInput.value =
    quantity;

  totalPrice.textContent =
    total.toFixed(2) + " SAR";
}


document.getElementById(
  "minusBtn"
).onclick = function() {

  if (quantity > 1) {
    quantity--;
  }

  updateTotal();
};


document.getElementById(
  "plusBtn"
).onclick = function() {

  quantity++;

  updateTotal();
};


updateTotal();


document.getElementById(
  "orderNow"
).onclick = function() {

  const customerName =
    document.getElementById(
      "customerName"
    ).value.trim();

  const customerPhone =
    document.getElementById(
      "customerPhone"
    ).value.trim();

  const customerAddress =
    document.getElementById(
      "customerAddress"
    ).value.trim();


  if (!customerName ||
      !customerPhone ||
      !customerAddress) {

    alert(
      "Please fill in your name, phone and address."
    );

    return;
  }


  const total =
    Number(shopData.newPrice || 0) *
    quantity;


  const message =
    "Hello Raisa Shopy,%0A%0A" +
    "Product: " +
    encodeURIComponent(
      shopData.productName
    ) +
    "%0A" +
    "Price: " +
    encodeURIComponent(
      formatPrice(shopData.newPrice) +
      " SAR"
    ) +
    "%0A" +
    "Quantity: " +
    quantity +
    "%0A" +
    "Total: " +
    encodeURIComponent(
      total.toFixed(2) +
      " SAR"
    ) +
    "%0A%0A" +
    "Customer Name: " +
    encodeURIComponent(
      customerName
    ) +
    "%0A" +
    "Phone: " +
    encodeURIComponent(
      customerPhone
    ) +
    "%0A" +
    "Address: " +
    encodeURIComponent(
      customerAddress
    );


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


  window.open(
    "https://wa.me/" +
    number +
    "?text=" +
    message,
    "_blank"
  );
};
```
