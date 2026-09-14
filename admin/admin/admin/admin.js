// ===============================
// Raisa Shopy - Admin Login
// ===============================

// Temporary demo login
// IMPORTANT:
// This is NOT a secure production login.
// Later we will connect Firebase Authentication.

const ADMIN_EMAIL = "admin@raisashopy.com";
const ADMIN_PASSWORD = "12345678";


const loginForm = document.getElementById("loginForm");
const loginMessage = document.getElementById("loginMessage");


loginForm.addEventListener("submit", function (event) {

  event.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  loginMessage.textContent = "";
  loginMessage.style.color = "";


  // Check login
  if (
    email === ADMIN_EMAIL &&
    password === ADMIN_PASSWORD
  ) {

    loginMessage.textContent = "Login successful!";

    loginMessage.style.color = "green";


    // Save temporary login session
    sessionStorage.setItem(
      "raisaAdminLoggedIn",
      "true"
    );


    // Open dashboard
    setTimeout(function () {

      window.location.href = "dashboard.html";

    }, 700);


  } else {

    loginMessage.textContent =
      "Invalid email or password.";

    loginMessage.style.color = "red";

  }

});
