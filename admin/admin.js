// admin/admin.js

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  const loginMessage = document.getElementById("loginMessage");

  const ADMIN_USERNAME = "admin";
  const ADMIN_PASSWORD = "123456";

  if (localStorage.getItem("raisaAdminLoggedIn") === "true") {
    window.location.href = "dashboard.html";
    return;
  }

  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;

    if (
      username === ADMIN_USERNAME &&
      password === ADMIN_PASSWORD
    ) {
      localStorage.setItem("raisaAdminLoggedIn", "true");

      loginMessage.textContent = "Login successful!";

      setTimeout(() => {
        window.location.href = "dashboard.html";
      }, 500);
    } else {
      loginMessage.textContent = "Invalid username or password.";
    }
  });
});
