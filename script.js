// Audio (fast + no delay)
function playSound(id) {
  const s = document.getElementById(id);
  if (!s) return;
  s.currentTime = 0;
  s.play().catch(() => { });
}
// Vibration
function vibrate(duration) {
  if (navigator.vibrate) navigator.vibrate(duration);
}
// DARK MODE
function toggleDarkMode() {
  const enabled = document.body.classList.toggle("dark-mode");
  localStorage.setItem("theme", enabled ? "dark" : "light");
}
// SCROLL TO TOP
function handleScrollButton() {
  const btn = document.getElementById("scrollTopBtn");
  if (!btn) return;

  btn.style.display = window.scrollY > 300 ? "block" : "none";
}
// LOGIN MODAL
function openLoginModal() {
  const modal = document.getElementById("loginModal");
  if (modal) modal.style.display = "flex";
}
function closeLoginModal() {
  const modal = document.getElementById("loginModal");
  if (modal) modal.style.display = "none";
}

// PASSWORD STRENGTH
function checkPasswordStrength() {
  const pw = document.getElementById("login-password").value;
  const msg = document.getElementById("password-strength");
  if (!msg) return;
  let cls = "weak",
    txt = "Weak";
  if (
    /.{8,}/.test(pw) &&
    /[A-Z]/.test(pw) &&
    /\d/.test(pw) &&
    /[!@#\$%\^&\*]/.test(pw)
  ) {
    cls = "strong";
    txt = "Strong";
  } else if (/.{6,}/.test(pw) && /[a-z]/.test(pw) && /\d/.test(pw)) {
    cls = "medium";
    txt = "Medium";
  }
  msg.textContent = `Strength: ${txt}`;
  msg.className = `strength-msg ${cls}`;
}

// LOGIN / LOGOUT
function handleLogin() {
  const user = document.getElementById("login-username").value.trim();
  const pw = document.getElementById("login-password").value.trim();
  fetch('https://portfolio-backend-mwbk.onrender.com/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: user, password: pw })
  })
    .then(res => {
      if (!res.ok) throw new Error('Invalid credentials');
      return res.json();
    })
    .then(data => {
      alert(data.message);
      localStorage.setItem('isLoggedIn', 'true');
      playSound('login-sound');
      vibrate(200);
      updateLoginState();
      closeLoginModal();
    })
    .catch(err => {
      alert(err.message);
      vibrate([100, 50, 100]);
    });
}
function handleLogout() {
  localStorage.removeItem("isLoggedIn");
  playSound("logout-sound");
  vibrate(100);
  alert("Logged out");
  updateLoginState();
}

// ADMIN EDIT MODE
let isEditMode = false;
function updateLoginState() {
  const logged = localStorage.getItem("isLoggedIn") === "true";
  const adminBar = document.getElementById("adminBar");
  if (adminBar) adminBar.classList.toggle("hidden", !logged);
  if (!logged) {
    isEditMode = false;
    document.querySelectorAll("[contenteditable]").forEach((el) => {
      el.contentEditable = "false";
      el.classList.remove("editable-highlight");
    });
  }
}
function toggleEditMode() {
  if (localStorage.getItem("isLoggedIn") !== "true") {
    alert("Please login first.");
    return;
  }
  isEditMode = !isEditMode;
  document.querySelectorAll("[contenteditable]").forEach((el) => {
    el.contentEditable = isEditMode;
    el.classList.toggle("editable-highlight", isEditMode);
  });
  alert(isEditMode ? "Edit mode enabled" : "Edit mode disabled");
}
function saveChanges() {
  document.querySelectorAll("[contenteditable]").forEach((el) => {
    if (el.id) localStorage.setItem("edit_" + el.id, el.innerHTML);
  });
  alert("Changes saved");
}
function loadSavedContent() {
  document.querySelectorAll("[contenteditable]").forEach((el) => {
    if (!el.id) return;
    const key = "edit_" + el.id;
    const saved = localStorage.getItem(key);
    if (saved) el.innerHTML = saved;
  });
}
function clearSavedChanges() {
  document.querySelectorAll("[contenteditable]").forEach((el) => {
    if (el.id) localStorage.removeItem("edit_" + el.id);
  });
  location.reload();
}
// NAVBAR TOGGLE 
document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");
  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("show");
      menuToggle.classList.toggle("active");
    });
    // Auto close menu after clicking a link (mobile)
    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("show");
        menuToggle.classList.remove("active");
      });
    });
  }
  // Scroll to top
  const scrollBtn = document.getElementById("scrollTopBtn");
  if (scrollBtn) {
    scrollBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
  // Theme load
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
  }
  // Preload audio for fast login
  ["login-sound", "logout-sound"].forEach((id) => {
    const audio = document.getElementById(id);
    if (audio) audio.load();
  });
  // Init login + content
  updateLoginState();
  loadSavedContent();
  // Init scroll button
  handleScrollButton();
});
// Scroll listener
window.addEventListener("scroll", handleScrollButton);
document.addEventListener("DOMContentLoaded", () => {
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
});
