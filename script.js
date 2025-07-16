// 🌙 Toggle Dark Mode
function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");

  if (document.body.classList.contains("dark-mode")) {
    localStorage.setItem("theme", "dark");
  } else {
    localStorage.setItem("theme", "light");
  }
}

// 🔝 Scroll to Top Button visibility toggle
window.onscroll = function () {
  const scrollBtn = document.getElementById("scrollTopBtn");
  if (scrollBtn) {
    scrollBtn.style.display = (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300)
      ? "block" : "none";
  }
};

// 🔝 Scroll to Top Action
document.addEventListener("DOMContentLoaded", () => {
  const scrollBtn = document.getElementById("scrollTopBtn");
  if (scrollBtn) {
    scrollBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // Load login state, content, and theme
  updateLoginState();
  loadSavedContent();

  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
  }
});

// Toggle menu on click
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('show');
});

// SKILL SECTION 
document.addEventListener("DOMContentLoaded", () => {
  const skillsData = [
    {
      category: "Programming Languages",
      skills: [
        { name: "C", icon: "c.svg" },
        { name: "Java", icon: "java.svg" },
        { name: "Python", icon: "python.svg" },
        { name: "JavaScript", icon: "javascript.svg" },
        { name: "MySQL", icon: "mysql.svg" }
      ]
    },
    {
      category: "Frontend",
      skills: [
        { name: "HTML", icon: "html.svg" },
        { name: "CSS", icon: "css.svg" }
      ]
    },
    {
      category: "Tools & Technology",
      skills: [
        { name: "Git", icon: "git.svg" },
        { name: "GitHub", icon: "github.svg" },
        { name: "VS Code", icon: "vscode.svg" }
      ]
    },
    {
      category: "Coursework",
      skills: [
        { name: "OOPS", icon: "oops.svg" },
        { name: "DSA", icon: "dsa.svg" },
        { name: "OS", icon: "os.svg" },
        { name: "DBMS", icon: "dbms.svg" },
        { name: "CN", icon: "cn.svg" },
        { name: "TOC", icon: "toc.svg" }
      ]
    },
    {
      category: "Communication",
      skills: [
        { name: "English", icon: "english.svg" },
        { name: "Hindi", icon: "hindi.svg" },
        { name: "Bangla", icon: "bangla.svg" }
      ]
    }
  ];

  const skillsContainer = document.getElementById("skills-container");

  skillsData.forEach(category => {
    const categoryDiv = document.createElement("div");
    categoryDiv.classList.add("skill-category-group");
    categoryDiv.setAttribute("data-aos", "fade-up");

    const title = document.createElement("h3");
    title.classList.add("category-title");
    title.textContent = category.category;

    const skillGrid = document.createElement("div");
    skillGrid.classList.add("skill-grid");

    category.skills.forEach(skill => {
      const card = document.createElement("div");
      card.classList.add("skill-card");
      card.setAttribute("title", skill.name);

      const img = document.createElement("img");
      img.src = `assets/images/skills/${skill.icon}`;
      img.alt = skill.name;

      const label = document.createElement("span");
      label.textContent = skill.name;

      card.appendChild(img);
      card.appendChild(label);
      skillGrid.appendChild(card);
    });

    categoryDiv.appendChild(title);
    categoryDiv.appendChild(skillGrid);
    skillsContainer.appendChild(categoryDiv);
  });
});


// Dark Mode
function toggleDarkMode() {
  const enabled = document.body.classList.toggle('dark-mode');
  localStorage.setItem('theme', enabled ? 'dark' : 'light');
}

// Scroll to top button
window.onscroll = () => {
  const btn = document.getElementById('scrollTopBtn');
  btn.style.display = (window.scrollY > 300) ? 'block' : 'none';
};
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('scrollTopBtn').onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  // Init theme
  if (localStorage.getItem('theme') === 'dark') document.body.classList.add('dark-mode');

  // Load login & editable content
  loadSavedContent(); updateLoginState();
});

// Navbar toggle
document.getElementById('menuToggle').onclick = () => {
  document.getElementById('navLinks').classList.toggle('show');
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('show');
    menuToggle.classList.toggle('active');
  });

};

// Password strength
function checkPasswordStrength() {
  const pw = document.getElementById('login-password').value;
  const msg = document.getElementById('password-strength');
  let cls = 'weak', txt = 'Weak';
  if (/.{8,}/.test(pw) && /[A-Z]/.test(pw) && /\d/.test(pw) && /[!@#\$%\^&\*]/.test(pw)) { cls = 'strong'; txt = 'Strong'; }
  else if (/.{6,}/.test(pw) && /[a-z]/.test(pw) && /\d/.test(pw)) { cls = 'medium'; txt = 'Medium'; }
  msg.textContent = `Strength: ${txt}`; msg.className = `strength-msg ${cls}`;
}

// Audio & vibration
function playSound(id) {
  const s = document.getElementById(id);
  if (s) s.play();
}
function vibrate(duration) {
  if (navigator.vibrate) navigator.vibrate(duration);
}

// Login/Logout
function handleLogin() {
  const user = document.getElementById('login-username').value;
  const pw = document.getElementById('login-password').value;

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
  localStorage.removeItem('isLoggedIn');
  alert('Logged out'); playSound('logout-sound'); vibrate(100);
  updateLoginState();
}

// Modal show/hide
function openLoginModal() { document.getElementById('loginModal').style.display = 'flex'; }
function closeLoginModal() { document.getElementById('loginModal').style.display = 'none'; }

// Admin UI
let isEditMode = false;
function updateLoginState() {
  const logged = localStorage.getItem('isLoggedIn') === 'true';
  document.getElementById('adminBar').classList.toggle('hidden', !logged);
  if (!logged) {
    isEditMode = false;
    document.querySelectorAll('[contenteditable]').forEach(el => {
      el.contentEditable = 'false'; el.classList.remove('editable-highlight');
    });
  }
}
function toggleEditMode() {
  if (!localStorage.getItem('isLoggedIn')) { alert('Please login first.'); return; }
  isEditMode = !isEditMode;
  document.querySelectorAll('[contenteditable]').forEach(el => {
    el.contentEditable = isEditMode; el.classList.toggle('editable-highlight', isEditMode);
  });
  alert(isEditMode ? 'Edit mode enabled' : 'Edit mode disabled');
}
function saveChanges() {
  document.querySelectorAll('[contenteditable]').forEach(el => {
    if (el.id) localStorage.setItem('edit_' + el.id, el.innerHTML);
  });
  alert('Changes saved');
}
function loadSavedContent() {
  document.querySelectorAll('[contenteditable]').forEach(el => {
    const key = 'edit_' + el.id;
    if (el.id && localStorage.getItem(key)) el.innerHTML = localStorage.getItem(key);
  });
}
function clearSavedChanges() {
  document.querySelectorAll('[contenteditable]').forEach(el => {
    if (el.id) localStorage.removeItem('edit_' + el.id);
  });
  location.reload();
}


