let __particlesTheme = null;

async function loadParticlesForTheme(theme) {
  const next = theme === "light" ? "light" : "dark";
  if (__particlesTheme === next) return;
  __particlesTheme = next;

  const color = theme === "light" ? "#000000" : "#ffffff";

  try {
    await tsParticles.load("tsparticles", {
      particles: {
        number: { value: 40 },
        size: { value: { min: 0.5, max: 3.2 } },
        move: { enable: true, speed: 0.15 },
        opacity: { value: 0.5 },
        color: { value: color },
      },
      background: { color: "transparent" },
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

/* Typing effect */
const typeTarget = document.getElementById("type-target");
if (typeTarget) {
  const texts = [
    "Full Stack .NET Developer",
    "ASP.NET Core & Laravel",
    "Backend Engineer",
    "Problem Solver",
  ];

  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function typeText() {
    const currentText = texts[textIndex];
    let speed = 90;

    if (isDeleting) {
      typeTarget.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;
      speed = 45;
    } else {
      typeTarget.textContent = currentText.substring(0, charIndex + 1);
      charIndex++;
    }

    if (!isDeleting && charIndex === currentText.length) {
      speed = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      textIndex = (textIndex + 1) % texts.length;
      speed = 400;
    }

    setTimeout(typeText, speed);
  }

  typeText();
}

const revealTargets = document.querySelectorAll(".section, .box");

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
    { threshold: 0.1, rootMargin: "0px 0px -8% 0px" },
  );
  revealTargets.forEach((el) => io.observe(el));
} else {
  revealTargets.forEach((el) => el.classList.add("show"));
}

const navbars = document.querySelectorAll(".navbar, .navbar2");
function onScroll() {
  const scrolled = window.scrollY > 20;
  navbars.forEach((nav) => nav.classList.toggle("scrolled", scrolled));
}
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

/* Active nav link */
const navLinks = document.querySelectorAll("[data-nav]");

function setActiveNav(id) {
  navLinks.forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
  });
}

if ("IntersectionObserver" in window && navLinks.length) {
  const navIo = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
      if (visible.length) {
        setActiveNav(visible[0].target.dataset.section || visible[0].target.id);
      }
    },
    { threshold: [0.2, 0.4, 0.6], rootMargin: "-10% 0px -55% 0px" },
  );

  const hero = document.querySelector("header.hero");
  if (hero) {
    hero.dataset.section = "top";
    navIo.observe(hero);
  }

  document.querySelectorAll("section[id]").forEach((s) => navIo.observe(s));
}

if (!window.__SIDEBAR_INIT__) {
  window.__SIDEBAR_INIT__ = true;

  const sidebar = document.getElementById("mySidebar");
  const openBtn = document.getElementById("openSidebar");
  const closeBtn = document.getElementById("closeSidebar");
  const backdrop = document.getElementById("navBackdrop");

  function setBackdropVisible(visible) {
    if (backdrop) backdrop.hidden = !visible;
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

  sidebar?.addEventListener("click", (ev) => {
    const link = ev.target?.closest?.("a");
    if (link) closeNav();
  });

  window.addEventListener("keydown", (ev) => {
    if (ev.key === "Escape") closeNav();
  });
}

const scrollProgress = document.getElementById("scrollProgress");
function updateScrollProgress() {
  if (!scrollProgress) return;
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  scrollProgress.style.width = `${progress}%`;
}
window.addEventListener("scroll", updateScrollProgress, { passive: true });
updateScrollProgress();

const cursorGlow = document.getElementById("cursorGlow");
const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;
const isFinePointer = window.matchMedia("(pointer: fine)").matches;

if (cursorGlow && !prefersReducedMotion && isFinePointer) {
  let glowX = 0;
  let glowY = 0;
  let targetX = 0;
  let targetY = 0;

  document.addEventListener(
    "mousemove",
    (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
      document.body.classList.add("cursor-active");
    },
    { passive: true },
  );

  document.addEventListener("mouseleave", () => {
    document.body.classList.remove("cursor-active");
  });

  function animateGlow() {
    glowX += (targetX - glowX) * 0.12;
    glowY += (targetY - glowY) * 0.12;
    cursorGlow.style.left = `${glowX}px`;
    cursorGlow.style.top = `${glowY}px`;
    requestAnimationFrame(animateGlow);
  }
  animateGlow();
}

const skillItems = document.querySelectorAll(".skill-item[data-stagger]");
const skillsBlock = document.querySelector(".skills-block");

if ("IntersectionObserver" in window && skillsBlock && skillItems.length) {
  const skillIo = new IntersectionObserver(
    (entries) => {
      if (!entries[0].isIntersecting) return;
      skillItems.forEach((item, i) => {
        setTimeout(() => item.classList.add("show"), i * 40);
      });
      skillIo.disconnect();
    },
    { threshold: 0.12 },
  );
  skillIo.observe(skillsBlock);
} else {
  skillItems.forEach((item) => item.classList.add("show"));
}

const statNumbers = document.querySelectorAll(".stat-card h3");
if (
  "IntersectionObserver" in window &&
  statNumbers.length &&
  !prefersReducedMotion
) {
  const countIo = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const raw = el.textContent.trim();
        const match = raw.match(/(\d+)/);
        if (!match) return;
        const target = parseInt(match[1], 10);
        const suffix = raw.replace(match[1], "");
        let current = 0;
        const duration = 1200;
        const start = performance.now();

        function tick(now) {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          current = Math.round(target * eased);
          el.textContent = `${current}${suffix}`;
          if (progress < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
        countIo.unobserve(el);
      });
    },
    { threshold: 0.5 },
  );
  statNumbers.forEach((el) => countIo.observe(el));
}

const tiltEl = document.querySelector("[data-tilt]");
if (tiltEl && !prefersReducedMotion && isFinePointer) {
  tiltEl.addEventListener("mousemove", (e) => {
    const rect = tiltEl.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    tiltEl.style.transform = `perspective(800px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg)`;
  });
  tiltEl.addEventListener("mouseleave", () => {
    tiltEl.style.transform = "";
  });
}

document.querySelectorAll(".box").forEach((card) => {
  if (prefersReducedMotion || !isFinePointer) return;
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `translateY(-6px) perspective(700px) rotateX(${-y * 5}deg) rotateY(${x * 5}deg)`;
  });
  card.addEventListener("mouseleave", () => {
    card.style.transform = "";
  });
});
