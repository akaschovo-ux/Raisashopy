/* =====================================================
   RAISA SHOPY - MAIN SCRIPT
===================================================== */

const defaultData = {

  shopName: "Raisa Shopy",

  heroTitle: "Raisa Shopy",

  heroText: "Quality Products At Special Prices",

  productName: "Your Product",

  oldPrice: 199,

  newPrice: 149,

  description:
    "Your product description will appear here.",

  whatsappNumber: "966500000000",

  productImages: [],

  descriptionImages: [],

  video: "",

  footerText: "© Raisa Shopy"

};


/* =====================================================
   LOAD SAVED DATA
===================================================== */

let shopData =
  JSON.parse(
    localStorage.getItem("raisaShopData")
  ) || defaultData;


/* =====================================================
   SHORT SELECTOR
===================================================== */

function $(id) {
  return document.getElementById(id);
}


/* =====================================================
   CURRENCY
===================================================== */

function formatPrice(price) {

  return "SAR " +
    Number(price || 0).toFixed(2);

}


/* =====================================================
   CALCULATE DISCOUNT
===================================================== */

function calculateDiscount() {

  const oldPrice =
    Number(shopData.oldPrice);

  const newPrice =
    Number(shopData.newPrice);


  if (
    oldPrice <= 0 ||
    newPrice >= oldPrice
  ) {

    return 0;

  }


  return Math.round(
    ((oldPrice - newPrice) / oldPrice) * 100
  );

}


/* =====================================================
   PRODUCT INFORMATION
===================================================== */

function loadProductInformation() {

  $("shopName").textContent =
    shopData.shopName;


  $("heroTitle").textContent =
    shopData.heroTitle;


  $("heroText").textContent =
    shopData.heroText;


  $("productName").textContent =
    shopData.productName;


  $("descriptionText").textContent =
    shopData.description;


  $("footerText").textContent =
    shopData.footerText ||
    "© " + shopData.shopName;


  /* OLD PRICE */

  const oldPrice =
    Number(shopData.oldPrice);


  const newPrice =
    Number(shopData.newPrice);


  if (oldPrice > newPrice) {

    $("oldPrice").textContent =
      formatPrice(oldPrice);

  } else {

    $("oldPrice").textContent = "";

  }


  /* NEW PRICE */

  $("newPrice").textContent =
    formatPrice(newPrice);


  /* DISCOUNT */

  const discount =
    calculateDiscount();


  if (discount > 0) {

    $("discount").textContent =
      discount + "% OFF";

  } else {

    $("discount").textContent = "";

  }

}


/* =====================================================
   PRODUCT IMAGE GALLERY
   MAXIMUM 6 IMAGES
===================================================== */

function loadProductImages() {

  const images =
    (shopData.productImages || [])
      .filter(Boolean)
      .slice(0, 6);


  const mainImage =
    $("mainProductImage");


  const thumbnails =
    $("productThumbnails");


  thumbnails.innerHTML = "";


  /* NO IMAGE */

  if (images.length === 0) {

    mainImage.style.display = "none";

    return;

  }


  mainImage.style.display = "block";


  /* FIRST IMAGE */

  mainImage.src =
    images[0];


  /* THUMBNAILS */

  images.forEach(
    (image, index) => {

      const thumbnail =
        document.createElement("img");


      thumbnail.src =
        image;


      thumbnail.alt =
        "Product Image " +
        (index + 1);


      if (index === 0) {

        thumbnail.classList.add(
          "active"
        );

      }


      thumbnail.addEventListener(
        "click",
        function () {

          mainImage.src =
            image;


          document
            .querySelectorAll(
              ".product-thumbnails img"
            )
            .forEach(
              img =>
                img.classList.remove(
                  "active"
                )
            );


          thumbnail.classList.add(
            "active"
          );

        }
      );


      thumbnails.appendChild(
        thumbnail
      );

    }
  );

}


/* =====================================================
   DESCRIPTION IMAGES
   MAXIMUM 5 IMAGES
===================================================== */

function loadDescriptionImages() {

  const images =
    (shopData.descriptionImages || [])
      .filter(Boolean)
      .slice(0, 5);


  const container =
    $("descriptionImages");


  container.innerHTML = "";


  images.forEach(
    (image, index) => {

      const img =
        document.createElement("img");


      img.src =
        image;


      img.alt =
        "Product Details " +
        (index + 1);


      container.appendChild(
        img
      );

    }
  );

}


/* =====================================================
   PRODUCT VIDEO
===================================================== */

function loadVideo() {

  const video =
    $("productVideo");


  const container =
    $("videoContainer");


  if (
    shopData.video &&
    shopData.video !== ""
  ) {

    video.src =
      shopData.video;


    container.style.display =
      "block";


    /*
      Mobile browsers normally allow
      autoplay when video is muted.
    */

    video.muted = true;

    video.autoplay = true;

    video.loop = true;

    video.playsInline = true;


    video.play()
      .catch(
        () => {
          /*
            Browser may block autoplay.
            User can still press play.
          */
        }
      );

  } else {

    container.style.display =
      "none";

  }

}


/* =====================================================
   QUANTITY
===================================================== */

function getQuantity() {

  let quantity =
    parseInt(
      $("quantity").value
    );


  if (
    isNaN(quantity) ||
    quantity < 1
  ) {

    quantity = 1;

  }


  $("quantity").value =
    quantity;


  return quantity;

}


/* =====================================================
   TOTAL PRICE
===================================================== */

function updateTotalPrice() {

  const quantity =
    getQuantity();


  const price =
    Number(shopData.newPrice);


  const total =
    price * quantity;


  $("totalPrice").textContent =
    formatPrice(total);

}


/* =====================================================
   MINUS BUTTON
===================================================== */

$("minusBtn").addEventListener(
  "click",
  function () {

    let quantity =
      getQuantity();


    if (quantity > 1) {

      quantity--;

    }


    $("quantity").value =
      quantity;


    updateTotalPrice();

  }
);


/* =====================================================
   PLUS BUTTON
===================================================== */

$("plusBtn").addEventListener(
  "click",
  function () {

    let quantity =
      getQuantity();


    quantity++;


    $("quantity").value =
      quantity;


    updateTotalPrice();

  }
);


/* =====================================================
   QUANTITY INPUT
===================================================== */

$("quantity").addEventListener(
  "input",
  function () {

    updateTotalPrice();

  }
);


/* =====================================================
   WHATSAPP ORDER
===================================================== */

$("orderNow").addEventListener(
  "click",
  function () {

    /* CUSTOMER DATA */

    const customerName =
      $("customerName")
        .value
        .trim();


    const customerPhone =
      $("customerPhone")
        .value
        .trim();


    const customerAddress =
      $("customerAddress")
        .value
        .trim();


    /* QUANTITY */

    const quantity =
      getQuantity();


    /* PRICE */

    const price =
      Number(shopData.newPrice);


    const total =
      price * quantity;


    /* VALIDATION */

    if (!customerName) {

      alert(
        "Please enter your name."
      );

      $("customerName").focus();

      return;

    }


    if (!customerPhone) {

      alert(
        "Please enter your phone number."
      );

      $("customerPhone").focus();

      return;

    }


    if (!customerAddress) {

      alert(
        "Please enter your delivery address."
      );

      $("customerAddress").focus();

      return;

    }


    /* =================================================
       WHATSAPP MESSAGE
    ================================================= */

    const message =

`🛍️ *RAISA SHOPY ORDER*

━━━━━━━━━━━━━━━━

📦 Product:
${shopData.productName}

💰 New Price:
${formatPrice(price)}

🔢 Quantity:
${quantity}

💵 Total:
${formatPrice(total)}

━━━━━━━━━━━━━━━━

👤 Customer Name:
${customerName}

📱 Phone Number:
${customerPhone}

📍 Address:
${customerAddress}

━━━━━━━━━━━━━━━━

Thank you for your order!`;


    /* =================================================
       WHATSAPP NUMBER
    ================================================= */

    const whatsappNumber =
      String(
        shopData.whatsappNumber || ""
      ).replace(
        /\D/g,
        ""
      );


    if (!whatsappNumber) {

      alert(
        "WhatsApp number is not configured."
      );

      return;

    }


    /* =================================================
       CREATE WHATSAPP URL
    ================================================= */

    const whatsappURL =
      "https://wa.me/" +
      whatsappNumber +
      "?text=" +
      encodeURIComponent(
        message
      );


    /* OPEN WHATSAPP */

    window.open(
      whatsappURL,
      "_blank"
    );

  }
);


/* =====================================================
   INITIALIZE WEBSITE
===================================================== */

function initializeShop() {

  loadProductInformation();

  loadProductImages();

  loadDescriptionImages();

  loadVideo();

  updateTotalPrice();

}


/* =====================================================
   START
===================================================== */

initializeShop();
