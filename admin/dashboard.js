<!-- admin/dashboard.html -->

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <title>Raisa Shopy - Admin Dashboard</title>

  <link rel="stylesheet" href="admin.css">
</head>

<body>

  <div class="dashboard">

    <header class="dashboard-header">
      <div>
        <h1>Raisa Shopy</h1>
        <p>Admin Dashboard</p>
      </div>

      <button id="logoutBtn" class="logout-btn">
        Logout
      </button>
    </header>

    <main class="dashboard-content">

      <section class="admin-card">

        <h2>Shop Settings</h2>

        <label>Shop Name</label>
        <input type="text" id="shopName" placeholder="Raisa Shopy">

        <label>Hero Title</label>
        <input type="text" id="heroTitle" placeholder="Your main title">

        <label>Hero Text</label>
        <textarea id="heroText" placeholder="Your hero description"></textarea>

        <label>Product Name</label>
        <input
          type="text"
          id="productName"
          placeholder="Face and Neck Beauty Device"
        >

        <label>Old Price (SAR)</label>
        <input type="number" id="oldPrice" placeholder="249">

        <label>New Price (SAR)</label>
        <input type="number" id="newPrice" placeholder="179">

        <label>Product Description</label>
        <textarea
          id="description"
          rows="8"
          placeholder="Product description"
        ></textarea>

        <label>WhatsApp Number</label>
        <input
          type="text"
          id="whatsappNumber"
          placeholder="+966 56 374 7461"
        >

        <label>Footer Text</label>
        <input
          type="text"
          id="footerText"
          placeholder="© 2026 Raisa Shopy"
        >

        <button id="saveBtn" class="save-btn">
          Save Changes
        </button>

        <p id="saveMessage"></p>

      </section>

    </main>

  </div>

  <script src="dashboard.js"></script>

</body>
</html>
