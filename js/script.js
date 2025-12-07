// Main JavaScript for Internship Tracker

document.addEventListener("DOMContentLoaded", function () {
  // Universal Theme Toggle (handles checkbox inputs and button toggles)
  function applyTheme(isDark) {
    if (isDark) {
      document.body.classList.add("dark-mode");
      document.body.classList.remove("light-mode");
    } else {
      document.body.classList.remove("dark-mode");
      document.body.classList.add("light-mode");
    }

    // Update all theme toggle controls on the page (checkboxes or buttons)
    const toggles = document.querySelectorAll("#themeToggle");
    toggles.forEach((el) => {
      if (el.tagName === "INPUT" && el.type === "checkbox") {
        el.checked = isDark;
      } else if (el.tagName === "BUTTON" || el.tagName === "A") {
        el.innerHTML = isDark
          ? '<i class="fas fa-sun"></i>'
          : '<i class="fas fa-moon"></i>';
      }
    });

    // Update any theme labels (elements with id 'themeLabel') to reflect current theme
    const labels = document.querySelectorAll("#themeLabel");
    labels.forEach((l) => {
      l.textContent = isDark ? "Light Mode" : "Dark Mode";
    });
  }

  // Initialize theme from localStorage (accept both 'dark'/'light' and legacy 'dark-mode'/'light-mode')
  (function initTheme() {
    const saved = localStorage.getItem("theme");
    let isDark = false;
    if (saved) {
      isDark =
        saved === "dark" || saved === "dark-mode" || saved === "darkMode";
    }
    applyTheme(isDark);
  })();

  // Wire up listeners for any theme toggle element with id 'themeToggle'
  const themeToggleEls = Array.from(document.querySelectorAll("#themeToggle"));
  themeToggleEls.forEach((el) => {
    if (el.tagName === "INPUT" && el.type === "checkbox") {
      el.addEventListener("change", () => {
        const isDark = !!el.checked;
        applyTheme(isDark);
        localStorage.setItem("theme", isDark ? "dark" : "light");
      });
    } else {
      // treat as button/link
      el.addEventListener("click", () => {
        const isDark = !document.body.classList.contains("dark-mode");
        applyTheme(isDark);
        localStorage.setItem("theme", isDark ? "dark" : "light");

        // small pulse animation for feedback
        el.classList.add("animate__animated", "animate__pulse");
        setTimeout(
          () => el.classList.remove("animate__animated", "animate__pulse"),
          500,
        );
      });
    }
  });

  // Login/Register functionality
  const showRegisterLink = document.getElementById("showRegister");
  const showLoginLink = document.getElementById("showLogin");
  const loginForm = document.getElementById("loginForm");
  const registerForm = document.getElementById("registerForm");
  const errorAlert = document.getElementById("errorAlert");
  const successAlert = document.getElementById("successAlert");

  if (showRegisterLink && showLoginLink) {
    showRegisterLink.addEventListener("click", function (e) {
      e.preventDefault();
      loginForm.classList.add("d-none");
      registerForm.classList.remove("d-none");
      errorAlert.classList.add("d-none");
      successAlert.classList.add("d-none");
    });

    showLoginLink.addEventListener("click", function (e) {
      e.preventDefault();
      registerForm.classList.add("d-none");
      loginForm.classList.remove("d-none");
      errorAlert.classList.add("d-none");
      successAlert.classList.add("d-none");
    });
  }

  // Login form submission
  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;

      // Hardcoded credentials for simulation
      if (username === "student" && password === "12345") {
        // Show loading animation
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML =
          '<i class="fas fa-spinner fa-spin"></i> Logging in...';
        submitBtn.disabled = true;

        // Simulate API call delay
        setTimeout(() => {
          // Redirect to dashboard
          window.location.href = "dashboard.html";
        }, 1000);
      } else {
        // Show error message with animation
        errorAlert.classList.remove("d-none");
        errorAlert.classList.add("animate__animated", "animate__shakeX");
        setTimeout(() => {
          errorAlert.classList.remove("animate__animated", "animate__shakeX");
        }, 1000);
      }
    });
  }

  // Register form submission
  if (registerForm) {
    registerForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const username = document.getElementById("regUsername").value;
      const email = document.getElementById("regEmail").value;
      const password = document.getElementById("regPassword").value;
      const confirmPassword = document.getElementById("confirmPassword").value;

      // Simple validation
      if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
      }

      if (password.length < 6) {
        alert("Password must be at least 6 characters long!");
        return;
      }

      // Simulate registration
      const submitBtn = this.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML =
        '<i class="fas fa-spinner fa-spin"></i> Registering...';
      submitBtn.disabled = true;

      setTimeout(() => {
        // Show success message
        successAlert.classList.remove("d-none");
        successAlert.classList.add("animate__animated", "animate__fadeIn");

        // Reset form and show login
        setTimeout(() => {
          registerForm.reset();
          registerForm.classList.add("d-none");
          loginForm.classList.remove("d-none");
          successAlert.classList.add("d-none");
          submitBtn.innerHTML = originalText;
          submitBtn.disabled = false;
        }, 2000);
      }, 1500);
    });
  }

  // Filter functionality for internships page
  const statusFilter = document.getElementById("statusFilter");
  const companyFilter = document.getElementById("companyFilter");
  const resetFilters = document.getElementById("resetFilters");

  if (statusFilter && companyFilter && resetFilters) {
    statusFilter.addEventListener("change", filterInternships);
    companyFilter.addEventListener("input", filterInternships);

    resetFilters.addEventListener("click", function () {
      statusFilter.value = "";
      companyFilter.value = "";
      filterInternships();
      // Add animation
      this.classList.add("animate__animated", "animate__pulse");
      setTimeout(() => {
        this.classList.remove("animate__animated", "animate__pulse");
      }, 1000);
    });
  }

  // Add internship functionality
  const saveInternshipBtn = document.getElementById("saveInternship");
  if (saveInternshipBtn) {
    saveInternshipBtn.addEventListener("click", function () {
      const companyName = document.getElementById("companyName").value;
      const position = document.getElementById("position").value;

      if (!companyName || !position) {
        alert("Please fill in all required fields");
        return;
      }

      // Show success message
      const modal = bootstrap.Modal.getInstance(
        document.getElementById("addInternshipModal"),
      );
      modal.hide();

      // Show toast notification
      showToast("Internship application added successfully!", "success");

      // Reset the form
      document.getElementById("addInternshipForm").reset();
    });
  }

  // Add animation to all cards on page load
  const cards = document.querySelectorAll(".card");
  cards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
  });

  // Add hover effects to table rows
  const tableRows = document.querySelectorAll("tbody tr");
  tableRows.forEach((row) => {
    row.addEventListener("mouseenter", () => {
      row.style.transform = "translateX(5px)";
      row.style.transition = "transform 0.3s";
    });

    row.addEventListener("mouseleave", () => {
      row.style.transform = "translateX(0)";
    });
  });
});

// Filter internships based on selected criteria
function filterInternships() {
  const statusFilter = document
    .getElementById("statusFilter")
    .value.toLowerCase();
  const companyFilter = document
    .getElementById("companyFilter")
    .value.toLowerCase();
  const rows = document.querySelectorAll("table tbody tr");

  let visibleCount = 0;

  rows.forEach((row) => {
    const status = row.cells[3].textContent.toLowerCase();
    const company = row.cells[0].textContent.toLowerCase();

    const statusMatch = !statusFilter || status.includes(statusFilter);
    const companyMatch = !companyFilter || company.includes(companyFilter);

    if (statusMatch && companyMatch) {
      row.style.display = "";
      visibleCount++;
      row.classList.add("animate__animated", "animate__fadeIn");
    } else {
      row.style.display = "none";
    }
  });

  // Show message if no results
  const tableBody = document.querySelector("tbody");
  let noResultsRow = document.getElementById("noResults");

  if (visibleCount === 0) {
    if (!noResultsRow) {
      noResultsRow = document.createElement("tr");
      noResultsRow.id = "noResults";
      noResultsRow.innerHTML = `
                <td colspan="7" class="text-center py-4">
                    <i class="fas fa-search fa-2x text-muted mb-2"></i>
                    <p class="mb-0">No internships match your filters. Try adjusting your search criteria.</p>
                </td>
            `;
      tableBody.appendChild(noResultsRow);
    }
  } else if (noResultsRow) {
    noResultsRow.remove();
  }
}

// Show toast notification
function showToast(message, type = "info") {
  // Remove existing toasts
  const existingToasts = document.querySelectorAll(".toast-container");
  existingToasts.forEach((toast) => toast.remove());

  // Create toast container
  const toastContainer = document.createElement("div");
  toastContainer.className = "toast-container position-fixed top-0 end-0 p-3";

  // Create toast
  const toastId = "toast-" + Date.now();
  const toastHtml = `
        <div id="${toastId}" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="toast-header">
                <i class="fas fa-${type === "success" ? "check-circle text-success" : "info-circle text-info"} me-2"></i>
                <strong class="me-auto">${type === "success" ? "Success" : "Info"}</strong>
                <button type="button" class="btn-close" data-bs-dismiss="toast"></button>
            </div>
            <div class="toast-body">
                ${message}
            </div>
        </div>
    `;

  toastContainer.innerHTML = toastHtml;
  document.body.appendChild(toastContainer);

  // Show toast
  const toastElement = document.getElementById(toastId);
  const toast = new bootstrap.Toast(toastElement, { delay: 3000 });
  toast.show();

  // Remove toast after it hides
  toastElement.addEventListener("hidden.bs.toast", function () {
    toastContainer.remove();
  });
}

// Password toggle functionality
document.addEventListener("DOMContentLoaded", function () {
  // Login page password toggle
  const togglePassword = document.getElementById("togglePassword");
  if (togglePassword) {
    togglePassword.addEventListener("click", function () {
      const passwordInput = document.getElementById("password");
      const icon = this.querySelector("i");

      // Toggle the type attribute
      const type =
        passwordInput.getAttribute("type") === "password" ? "text" : "password";
      passwordInput.setAttribute("type", type);

      // Toggle the eye icon
      icon.classList.toggle("fa-eye");
      icon.classList.toggle("fa-eye-slash");

      // Add animation
      this.classList.add("animate__animated", "animate__pulse");
      setTimeout(() => {
        this.classList.remove("animate__animated", "animate__pulse");
      }, 300);
    });
  }

  // Register form password toggle
  const toggleRegPassword = document.getElementById("toggleRegPassword");
  if (toggleRegPassword) {
    toggleRegPassword.addEventListener("click", function () {
      const passwordInput = document.getElementById("regPassword");
      const icon = this.querySelector("i");

      const type =
        passwordInput.getAttribute("type") === "password" ? "text" : "password";
      passwordInput.setAttribute("type", type);

      icon.classList.toggle("fa-eye");
      icon.classList.toggle("fa-eye-slash");
    });
  }

  // Register form confirm password toggle
  const toggleConfirmPassword = document.getElementById(
    "toggleConfirmPassword",
  );
  if (toggleConfirmPassword) {
    toggleConfirmPassword.addEventListener("click", function () {
      const passwordInput = document.getElementById("confirmPassword");
      const icon = this.querySelector("i");

      const type =
        passwordInput.getAttribute("type") === "password" ? "text" : "password";
      passwordInput.setAttribute("type", type);

      icon.classList.toggle("fa-eye");
      icon.classList.toggle("fa-eye-slash");
    });
  }
});

/* -----------------------------
       Notifications dropdown (shared)
       Appends a small dropdown to the page when any #notificationsBtn is clicked.
       Uses static dummy data provided by the user and works on all pages that
       include this shared `js/script.js` file.
       ----------------------------- */
/**
 * Notifications module
 * - Persistent via localStorage
 * - Unread badge synchronized across all #notificationsBtn buttons
 * - Per-item mark-as-read and "Mark all read"
 */
(function () {
  const LS_KEY = "it_notifications_v1";
  const defaultNotifications = [
    {
      id: 1,
      company: "AirAsia",
      role: "Marketing Intern",
      date: "2025-09-28",
      status: "Rejected",
      followUp: "-",
      note: "Portfolio needs improvement",
      read: false,
    },
    {
      id: 2,
      company: "Celcom",
      role: "Network Engineering Intern",
      date: "2025-09-20",
      status: "Interview",
      followUp: "Interview (Sep 30)",
      note: "Studying networking concepts",
      read: false,
    },
    {
      id: 3,
      company: "Gardenia",
      role: "CEO",
      date: "2025-12-02",
      status: "Rejected",
      followUp: "Reapply",
      note: "-",
      read: false,
    },
  ];

  let notifications = loadNotifications();

  function loadNotifications() {
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (!raw) {
        localStorage.setItem(LS_KEY, JSON.stringify(defaultNotifications));
        return JSON.parse(JSON.stringify(defaultNotifications));
      }
      const parsed = JSON.parse(raw);
      // ensure defaults exist (in case schema changed)
      if (!Array.isArray(parsed) || parsed.length === 0) {
        localStorage.setItem(LS_KEY, JSON.stringify(defaultNotifications));
        return JSON.parse(JSON.stringify(defaultNotifications));
      }
      return parsed;
    } catch (e) {
      console.error("Failed to load notifications", e);
      localStorage.removeItem(LS_KEY);
      localStorage.setItem(LS_KEY, JSON.stringify(defaultNotifications));
      return JSON.parse(JSON.stringify(defaultNotifications));
    }
  }

  function saveNotifications() {
    try {
      localStorage.setItem(LS_KEY, JSON.stringify(notifications));
    } catch (e) {
      console.error("Failed to save notifications", e);
    }
  }

  function getUnreadCount() {
    return notifications.filter((n) => !n.read).length;
  }

  function createStyles() {
    if (document.getElementById("notif-styles")) return;
    const style = document.createElement("style");
    style.id = "notif-styles";
    style.innerHTML = `
                #notificationsDropdown { position: absolute; width: 340px; max-width: calc(100% - 20px); background: #fff; color: #222; border-radius: 8px; box-shadow: 0 6px 18px rgba(0,0,0,0.15); z-index: 2100; overflow: hidden; border: 1px solid rgba(0,0,0,0.06); }
                #notificationsDropdown.dark { background: #2b2b2b; color: #eee; border-color: rgba(255,255,255,0.04); }
                #notificationsDropdown .notif-header { padding: 10px 12px; border-bottom: 1px solid rgba(0,0,0,0.06); display:flex; align-items:center; justify-content:space-between; gap:8px; }
                #notificationsDropdown.dark .notif-header { border-bottom-color: rgba(255,255,255,0.04); }
                #notificationsDropdown .notif-list { max-height: 300px; overflow:auto; }
                #notificationsDropdown .notif-item { padding: 10px 12px; border-bottom: 1px dashed rgba(0,0,0,0.04); cursor: default; display:block; }
                #notificationsDropdown.dark .notif-item { border-bottom-color: rgba(255,255,255,0.03); }
                #notificationsDropdown .notif-item:last-child { border-bottom: none; }
                #notificationsDropdown .company { font-weight:700; display:block; }
                #notificationsDropdown .meta { font-size:12px; color: #666; display:block; margin-top:4px; }
                #notificationsDropdown.dark .meta { color: #bfbfbf; }
                #notificationsDropdown .status { float:right; font-size:12px; padding:3px 8px; border-radius:12px; }
                #notificationsDropdown .status.rejected { background:#ffe6e6; color:#b30000; }
                #notificationsDropdown .status.interview { background:#e8f0ff; color:#0b5ed7; }
                #notificationsDropdown.dark .status.rejected { background: rgba(179,0,0,0.12); color: #ff8a8a; }
                #notificationsDropdown.dark .status.interview { background: rgba(11,94,215,0.12); color: #9ec4ff; }
                #notificationsDropdown .small-note { font-size:12px; color:#888; margin-top:6px; }
                #notificationsDropdown.dark .small-note { color:#bdbdbd; }
                #notificationsDropdown .notif-item.read { opacity: 0.65; }
                #notificationsDropdown .mark-read { float:right; font-size:12px; color:#6c757d; background:none; border:none; cursor:pointer; }
                #notificationsDropdown .mark-read:hover { color:#000; }
                .notif-badge { position: absolute; top: 6px; right: 6px; background: #dc3545; color: #fff; padding: 2px 6px; border-radius: 12px; font-size: 12px; min-width: 20px; text-align:center; }
                @media (max-width:480px) { #notificationsDropdown { width: 92%; left: 4% !important; right: 4% !important; } }
            `;
    document.head.appendChild(style);
  }

  function formatStatusClass(status) {
    if (!status) return "";
    const s = status.toLowerCase();
    if (s.includes("reject")) return "rejected";
    if (s.includes("interview")) return "interview";
    return "";
  }

  function escapeHtml(s) {
    if (!s && s !== 0) return "";
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function buildDropdown() {
    createStyles();
    let dd = document.getElementById("notificationsDropdown");
    if (!dd) {
      dd = document.createElement("div");
      dd.id = "notificationsDropdown";
      dd.style.display = "none";
      dd.innerHTML = `
                    <div class="notif-header">
                        <div style="display:flex; gap:8px; align-items:center;"><strong>Notifications</strong><small id="notifCountSmall" style="opacity:.7"></small></div>
                        <div style="display:flex; gap:8px; align-items:center;">
                            <button id="markAllRead" class="btn btn-sm btn-light">Mark all read</button>
                        </div>
                    </div>
                    <div class="notif-list" id="notifList"></div>
                `;
      document.body.appendChild(dd);
    }
    renderList();
    return dd;
  }

  function renderList() {
    const dd = document.getElementById("notificationsDropdown");
    if (!dd) return;
    const list = dd.querySelector("#notifList");
    const countEl = dd.querySelector("#notifCountSmall");
    if (countEl) countEl.textContent = getUnreadCount() + " unread";

    list.innerHTML = "";
    notifications.forEach((n) => {
      const item = document.createElement("div");
      item.className = "notif-item" + (n.read ? " read" : "");
      item.dataset.id = n.id;
      const statusCls = formatStatusClass(n.status);
      item.innerHTML = `
                    <div>
                        <span class="company">${escapeHtml(n.company)}</span>
                        <span class="status ${statusCls}">${escapeHtml(n.status)}</span>
                    </div>
                    <div class="meta">${escapeHtml(n.role)} &middot; <small>${escapeHtml(n.date)}</small></div>
                    <div class="small-note">Follow up: ${escapeHtml(n.followUp)} ${n.note && n.note !== "-" ? "· Note: " + escapeHtml(n.note) : ""}</div>
                `;
      // add a small mark-as-read button
      const btn = document.createElement("button");
      btn.className = "mark-read";
      btn.type = "button";
      btn.title = n.read ? "Mark as unread" : "Mark as read";
      btn.innerHTML = n.read ? "Undo" : "Mark read";
      btn.addEventListener("click", function (ev) {
        ev.stopPropagation();
        toggleRead(n.id);
      });
      item.appendChild(btn);
      // clicking the item marks it read
      item.addEventListener("click", function () {
        if (!n.read) toggleRead(n.id);
      });
      list.appendChild(item);
    });

    // wire up markAllRead
    const markAllBtn = dd.querySelector("#markAllRead");
    if (markAllBtn) {
      markAllBtn.addEventListener("click", function (ev) {
        ev.stopPropagation();
        markAllRead();
      });
    }
  }

  function toggleRead(id) {
    const idx = notifications.findIndex((n) => n.id === id);
    if (idx === -1) return;
    notifications[idx].read = !notifications[idx].read;
    saveNotifications();
    updateBadges();
    renderList();
  }

  function markAllRead() {
    let changed = false;
    notifications.forEach((n) => {
      if (!n.read) {
        n.read = true;
        changed = true;
      }
    });
    if (changed) {
      saveNotifications();
      updateBadges();
      renderList();
    }
  }

  function positionDropdown(btn, dd) {
    const rect = btn.getBoundingClientRect();
    const ddWidth = dd.offsetWidth || 340;
    let left = rect.right - ddWidth; // align right by default
    if (left < 8) left = rect.left;
    const maxLeft = window.innerWidth - ddWidth - 8;
    if (left > maxLeft) left = Math.max(8, maxLeft);
    const top = rect.bottom + 8 + window.scrollY;
    dd.style.left = left + window.scrollX + "px";
    dd.style.top = top + "px";
  }

  function toggleForButton(btn) {
    const dd = buildDropdown();
    const isOpen = dd.style.display === "block";
    if (isOpen) {
      dd.style.display = "none";
      return;
    }
    // set dark class if body has dark-mode
    if (document.body.classList.contains("dark-mode")) dd.classList.add("dark");
    else dd.classList.remove("dark");

    dd.style.display = "block";
    dd.style.visibility = "hidden";
    dd.style.left = "0px";
    dd.style.top = "0px";
    requestAnimationFrame(() => {
      positionDropdown(btn, dd);
      dd.style.visibility = "visible";
    });
  }

  function closeDropdown() {
    const dd = document.getElementById("notificationsDropdown");
    if (dd) dd.style.display = "none";
  }

  document.addEventListener("click", function (e) {
    const dd = document.getElementById("notificationsDropdown");
    if (!dd) return;
    const isBtn =
      e.target && e.target.closest && e.target.closest("#notificationsBtn");
    if (isBtn) return; // click on button handled elsewhere
    if (!dd.contains(e.target)) closeDropdown();
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeDropdown();
  });

  function updateBadges() {
    const count = getUnreadCount();
    const btns = document.querySelectorAll("#notificationsBtn");
    btns.forEach((btn) => {
      let badge = btn.querySelector(".notif-badge");
      if (!badge) {
        badge = document.createElement("span");
        badge.className = "notif-badge";
        // ensure parent is positioned (in case)
        btn.style.position = btn.style.position || "relative";
        btn.appendChild(badge);
      }
      if (count > 0) {
        badge.textContent = count > 99 ? "99+" : String(count);
        badge.style.display = "inline-block";
      } else {
        badge.style.display = "none";
      }
    });
  }

  function initNotifButtons() {
    const btns = document.querySelectorAll("#notificationsBtn");
    if (!btns || btns.length === 0) return;
    btns.forEach((btn) => {
      if (btn._notifBound) return;
      btn.addEventListener("click", function (ev) {
        ev.stopPropagation();
        toggleForButton(btn);
      });
      btn._notifBound = true;
    });
    updateBadges();
  }

  // initialize
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initNotifButtons);
  } else {
    initNotifButtons();
  }
})();
