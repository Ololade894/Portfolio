(function () {
  const header = document.querySelector(".site-header");
  const navToggle = document.querySelector(".nav-toggle");
  const navMenu = document.querySelector(".nav-menu");
  const navLinks = document.querySelectorAll(".nav-menu a");
  const form = document.getElementById("contact-form");
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }
  function onScroll() {
    if (!header) return;
    header.classList.toggle("scrolled", window.scrollY > 24);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
  function closeMenu() {
    if (!navToggle || !navMenu) return;
    navToggle.setAttribute("aria-expanded", "false");
    navMenu.classList.remove("is-open");
  }
  if (navToggle && navMenu) {
    navToggle.addEventListener("click", function () {
      const open = navToggle.getAttribute("aria-expanded") === "true";
      navToggle.setAttribute("aria-expanded", String(!open));
      navMenu.classList.toggle("is-open", !open);
    });
  }
  navLinks.forEach(function (link) {
    link.addEventListener("click", closeMenu);
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeMenu();
  });
  function validateEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }
  function setFieldError(id, message) {
    const input = document.getElementById(id);
    const errorEl = document.getElementById(id + "-error");
    if (input) input.classList.toggle("error", Boolean(message));
    if (errorEl) errorEl.textContent = message || "";
  }
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const status = document.getElementById("form-status");
      const name = document.getElementById("name");
      const email = document.getElementById("email");
      const message = document.getElementById("message");
      let valid = true;
      if (!name.value.trim()) {
        setFieldError("name", "Please enter your name.");
        valid = false;
      } else {
        setFieldError("name", "");
      }
      if (!email.value.trim()) {
        setFieldError("email", "Please enter your email.");
        valid = false;
      } else if (!validateEmail(email.value.trim())) {
        setFieldError("email", "Please enter a valid email address.");
        valid = false;
      } else {
        setFieldError("email", "");
      }
      if (!message.value.trim()) {
        setFieldError("message", "Please write a message.");
        valid = false;
      } else {
        setFieldError("message", "");
      }
      if (!valid) {
        if (status) {
          status.textContent = "";
          status.classList.remove("success");
        }
        return;
      }
      if (status) {
        status.textContent =
          "Thanks! Your message was sent (demo — connect a backend to go live).";
        status.classList.add("success");
      }
      form.reset();
    });
  }
})();
