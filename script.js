let __particlesTheme = null;
async function loadParticlesForTheme(theme) {
  const next = theme === "light" ? "light" : "dark";
  if (__particlesTheme === next) return;
  __particlesTheme = next;

  const color = "#ffffff";
  try {
    await tsParticles.load("tsparticles", {
      particles: {
        number: { value: 80 },
        size: { value: 1 },
        move: {
          enable: true,
          speed: 0.2,
        },
        color: {
          value: color,
        },
      },
      background: {
        color: "transparent",
      },
    });
  } catch {}
}

function setTheme(nextTheme) {
  const theme = nextTheme === "light" ? "light" : "dark";
  document.body.setAttribute("data-theme", theme);
  loadParticlesForTheme(theme);
  try {
    localStorage.setItem("theme", theme);
  } catch {}
}

function getPreferredTheme() {
  try {
    const saved = localStorage.getItem("theme");
    if (saved === "light" || saved === "dark") return saved;
  } catch {}
  return window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: light)").matches
    ? "light"
    : "dark";
}

setTheme(getPreferredTheme());

const themeToggle = document.getElementById("themeToggle");
const themeToggleDesktop = document.getElementById("themeToggleDesktop");
function toggleTheme() {
  const current = document.body.getAttribute("data-theme") || "dark";
  setTheme(current === "light" ? "dark" : "light");
}
if (themeToggle) themeToggle.addEventListener("click", toggleTheme);
if (themeToggleDesktop)
  themeToggleDesktop.addEventListener("click", toggleTheme);

const typeTarget = document.getElementById("type-target");
if (typeTarget) {
  const texts = [
    "Full Stack .NET Developer",
    "ASP.NET Core | Laravel",
    "Backend Engineer",
    "Problem Solver",
  ];

  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;
  let deletingSpeed = 50;
  let pauseTime = 2000;

  function typeText() {
    const currentText = texts[textIndex];

    if (isDeleting) {
      typeTarget.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = deletingSpeed;
    } else {
      typeTarget.textContent = currentText.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 100;
    }

    if (!isDeleting && charIndex === currentText.length) {
      typingSpeed = pauseTime;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      textIndex = (textIndex + 1) % texts.length;
      typingSpeed = 500;
    }

    setTimeout(typeText, typingSpeed);
  }

  typeText();
}

const revealTargets = document.querySelectorAll(
  "section, .box, .experience-item, .service-card, .skills-block, .other-skills",
);

if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          io.unobserve(entry.target);
        }
      }
    },
    { root: null, threshold: 0.14, rootMargin: "0px 0px -12% 0px" },
  );
  revealTargets.forEach((el) => io.observe(el));
} else {
  revealTargets.forEach((el) => el.classList.add("show"));
}

if (!window.__SIDEBAR_INIT__) {
  window.__SIDEBAR_INIT__ = true;

  const sidebar = document.getElementById("mySidebar");
  const openBtn = document.getElementById("openSidebar");
  const closeBtn = document.getElementById("closeSidebar");
  const backdrop = document.getElementById("navBackdrop");

  function setBackdropVisible(visible) {
    if (!backdrop) return;
    backdrop.hidden = !visible;
  }

  function setScrollLocked(locked) {
    document.documentElement.style.overflow = locked ? "hidden" : "";
  }

  function openNav(e) {
    if (e) e.preventDefault();
    if (!sidebar) return;

    sidebar.classList.add("open");
    setBackdropVisible(true);
    setScrollLocked(true);
  }

  function closeNav(e) {
    if (e) e.preventDefault();
    if (!sidebar) return;

    sidebar.classList.remove("open");
    setBackdropVisible(false);
    setScrollLocked(false);
  }
  window.openNav = openNav;
  window.closeNav = closeNav;
  if (openBtn) openBtn.addEventListener("click", openNav);
  if (closeBtn) closeBtn.addEventListener("click", closeNav);
  if (backdrop) backdrop.addEventListener("click", closeNav);

  if (sidebar) {
    sidebar.addEventListener("click", (ev) => {
      const link = ev.target && ev.target.closest && ev.target.closest("a");
      if (link) closeNav();
    });
  }

  window.addEventListener("keydown", (ev) => {
    if (ev.key === "Escape") closeNav();
  });

  const profilePicContainer = document.querySelector(".profile-pic");
  if (profilePicContainer) {
    profilePicContainer.addEventListener("mousemove", (e) => {
      const rect = profilePicContainer.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const rotateX = (y / rect.height) * 10;
      const rotateY = (x / rect.width) * 10;
      profilePicContainer.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    profilePicContainer.addEventListener("mouseleave", () => {
      profilePicContainer.style.transform = "";
    });
  }
}
