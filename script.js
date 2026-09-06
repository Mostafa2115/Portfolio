let __particlesKey = null;

function isMobileViewport() {
  return window.matchMedia("(max-width: 768px)").matches;
}

function isSmallMobileViewport() {
  return window.matchMedia("(max-width: 480px)").matches;
}

function getParticleCount() {
  if (isSmallMobileViewport()) return 110;
  if (isMobileViewport()) return 160;
  return 240;
}

async function loadParticlesForTheme(theme) {
  const mobile = isMobileViewport();
  const small = isSmallMobileViewport();
  const next = `${theme}-${small ? "sm" : mobile ? "md" : "lg"}`;
  if (__particlesKey === next) return;
  __particlesKey = next;

  const colors =
    theme === "light"
      ? ["#000000", "#171717", "#404040", "#737373", "#555555"]
      : ["#ffffff", "#e5e5e5", "#a3a3a3", "#d4d4d4", "#fafafa"];

  try {
    await tsParticles.load("tsparticles", {
      particles: {
        number: { value: getParticleCount() },
        size: { 
          value: { min: 0.25, max: 1.3 },
          animation: {
            enable: true,
            speed: 1,
            minimumValue: 0.2,
            sync: false
          }
        },
        move: { 
          enable: true, 
          speed: { min: 0.35, max: 0.9 }, 
          direction: "right", 
          random: false,
          straight: false,
          outModes: { default: "out" }
        },
        opacity: { 
          value: { min: 0.15, max: 0.8 },
          animation: {
            enable: true,
            speed: 0.8,
            minimumValue: 0.1,
            sync: false
          }
        },
        color: { value: colors },
        links: {
          enable: false
        },
      },
      interactivity: {
        events: {
          onHover: { enable: true, mode: "bubble" },
        },
        modes: {
          bubble: { 
            distance: 120, 
            duration: 1.5, 
            size: 2.2, 
            opacity: 0.9 
          },
        },
      },
      background: { color: "transparent" },
    });
  } catch {}
}

let __particlesResizeTimer;
window.addEventListener(
  "resize",
  () => {
    clearTimeout(__particlesResizeTimer);
    __particlesResizeTimer = setTimeout(() => {
      loadParticlesForTheme(document.body.getAttribute("data-theme") || "dark");
    }, 200);
  },
  { passive: true },
);

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
    "Full-Stack .NET Developer",
    "ASP.NET Core & SQL Server",
    "Scalable API Architect",
    "Software Engineer"
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
  // Add initialization class to enable transitions only if observer is active
  revealTargets.forEach((el) => el.classList.add("reveal-init"));

  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          io.unobserve(entry.target);
        }
      }
    },
    { threshold: 0.01, rootMargin: "0px 0px -4% 0px" },
  );
  revealTargets.forEach((el) => io.observe(el));
}

const navbars = document.querySelectorAll(".navbar, .navbar2");
function onScroll() {
  const scrolled = window.scrollY > 20;
  navbars.forEach((nav) => nav.classList.toggle("scrolled", scrolled));
}
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

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

const timelineProgressBar = document.getElementById("timelineProgress");
const timelineSection = document.querySelector(".timeline");
function updateTimelineProgress() {
  if (!timelineProgressBar || !timelineSection) return;
  const rect = timelineSection.getBoundingClientRect();
  const viewHeight = window.innerHeight;
  const startThreshold = viewHeight * 0.65;
  const endThreshold = viewHeight * 0.35;
  const totalHeight = rect.height;
  const scrolled = startThreshold - rect.top;
  let percentage = (scrolled / (totalHeight - (startThreshold - endThreshold))) * 100;
  percentage = Math.max(0, Math.min(percentage, 100));
  timelineProgressBar.style.height = `${percentage}%`;
}
window.addEventListener("scroll", updateTimelineProgress, { passive: true });
window.addEventListener("resize", updateTimelineProgress, { passive: true });
updateTimelineProgress();

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

(function initCvModal() {
  const CV_URL = "CV/Mostafa-Mahmoud-Resume.pdf";
  const modal = document.getElementById("cvModal");
  const closeBtn = document.getElementById("closeCvModal");
  const backdrop = document.getElementById("cvModalBackdrop");
  const frame = document.getElementById("cvFrame");

  // Links/buttons موجودة في الـ HTML
  const navViewCv = document.getElementById("navViewCv");
  const sidebarViewCv = document.getElementById("sidebarViewCv");
  const openBtns = [navViewCv, sidebarViewCv].filter(Boolean);

  if (!modal || openBtns.length === 0) return;

  let lastFocus = null;

  function openCvModal(e) {
    // يمنع التنقّل إلى href="#"
    if (e) e.preventDefault();

    lastFocus = document.activeElement;
    modal.hidden = false;

    // افتح الـ PDF داخل الـ iframe
    if (frame) frame.src = CV_URL;

    // Lock scroll
    document.documentElement.style.overflow = "hidden";
  }

  function closeCvModal() {
    modal.hidden = true;
    document.documentElement.style.overflow = "";
    if (frame) frame.src = "about:blank";
    lastFocus?.focus?.();
  }

  openBtns.forEach((btn) => btn.addEventListener("click", openCvModal));
  closeBtn?.addEventListener("click", closeCvModal);
  backdrop?.addEventListener("click", closeCvModal);

  window.addEventListener("keydown", (ev) => {
    if (ev.key === "Escape" && !modal.hidden) closeCvModal();
  });
})();

(function initPageLoader() {
  const loader = document.getElementById("pageLoader");
  if (!loader) return;

  const bar = loader.querySelector(".page-loader__bar");
  const barFill = loader.querySelector(".page-loader__bar-fill");
  const status = loader.querySelector(".page-loader__status");
  const minDuration = prefersReducedMotion ? 450 : 1500;
  const start = performance.now();
  let finished = false;
  let progress = 0;

  const progressTimer = setInterval(() => {
    if (finished) return;
    progress = Math.min(progress + 4 + Math.random() * 10, 94);
    if (barFill) barFill.style.width = `${progress}%`;
    if (bar) bar.setAttribute("aria-valuenow", String(Math.round(progress)));
  }, 100);

  function finishLoader() {
    if (finished) return;
    finished = true;
    clearInterval(progressTimer);

    if (barFill) barFill.style.width = "100%";
    if (bar) bar.setAttribute("aria-valuenow", "100");
    if (status) status.textContent = "Ready";

    loader.classList.add("is-done");
    document.body.classList.remove("is-loading");

    const removeDelay = prefersReducedMotion ? 220 : 580;
    setTimeout(() => loader.remove(), removeDelay);
  }

  window.addEventListener("load", () => {
    const elapsed = performance.now() - start;
    setTimeout(finishLoader, Math.max(0, minDuration - elapsed));
  });

  setTimeout(finishLoader, prefersReducedMotion ? 900 : 5000);
})();

/* Certificates Modal & Filtering logic */
(function initCertModal() {
  const modal = document.getElementById("certModal");
  const closeBtn = document.getElementById("closeCertModal");
  const backdrop = document.getElementById("certModalBackdrop");
  const imgContainer = document.getElementById("certImageContainer");
  const img = document.getElementById("certImage");
  const title = document.getElementById("certModalTitle");
  const downloadBtn = document.getElementById("certDownloadBtn");

  if (!modal) return;

  window.openCertModal = function (fileUrl, fileTitle) {
    // If the file is a PDF, dynamically change it to show the image version (.png)
    if (fileUrl.toLowerCase().endsWith(".pdf")) {
      fileUrl = fileUrl.substring(0, fileUrl.length - 4) + ".png";
    }

    title.textContent = fileTitle;
    if (downloadBtn) {
      downloadBtn.href = fileUrl;
    }

    if (img) img.src = fileUrl;
    if (imgContainer) imgContainer.hidden = false;

    modal.hidden = false;
    document.documentElement.style.overflow = "hidden";
  };

  function closeCertModal() {
    modal.hidden = true;
    document.documentElement.style.overflow = "";
    if (img) img.src = "";
  }

  closeBtn?.addEventListener("click", closeCertModal);
  backdrop?.addEventListener("click", closeCertModal);

  window.addEventListener("keydown", (ev) => {
    if (ev.key === "Escape" && !modal.hidden) closeCertModal();
  });
})();

/* Certificates Filtering & Show More / Show Less */
(function initCertificates() {
  const filterBtns = document.querySelectorAll(".cert-filter-btn");
  const certCards = Array.from(document.querySelectorAll(".cert-card"));
  const showMoreBtn = document.getElementById("showMoreCertsBtn");
  const actionsContainer = showMoreBtn?.closest(".certs-actions");

  if (!certCards.length) return;

  const INITIAL_COUNT = 4;
  let currentFilter = "all";
  let isExpanded = false;

  function updateCertificates() {
    const matchingCards = certCards.filter((card) => {
      return currentFilter === "all" || card.dataset.category === currentFilter;
    });

    // Hide cards that don't match the active filter
    certCards.forEach((card) => {
      if (!matchingCards.includes(card)) {
        card.classList.add("hidden");
        card.classList.remove("is-collapsed");
      }
    });

    const totalMatching = matchingCards.length;

    // Show/hide matching cards based on isExpanded
    matchingCards.forEach((card, index) => {
      card.classList.remove("hidden");
      if (!isExpanded && index >= INITIAL_COUNT) {
        card.classList.add("is-collapsed");
      } else {
        card.classList.remove("is-collapsed");
        if (card.classList.contains("reveal-init")) {
          card.classList.add("show");
        }
      }
    });

    // Update Show More button state
    if (actionsContainer && showMoreBtn) {
      if (totalMatching <= INITIAL_COUNT) {
        actionsContainer.classList.add("is-hidden");
      } else {
        actionsContainer.classList.remove("is-hidden");
        const btnText = showMoreBtn.querySelector(".show-more-text");
        if (isExpanded) {
          showMoreBtn.classList.add("expanded");
          showMoreBtn.setAttribute("aria-expanded", "true");
          if (btnText) btnText.textContent = "Show Less";
        } else {
          showMoreBtn.classList.remove("expanded");
          showMoreBtn.setAttribute("aria-expanded", "false");
          if (btnText) {
            btnText.textContent = `Show More (+${totalMatching - INITIAL_COUNT})`;
          }
        }
      }
    }
  }

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      currentFilter = btn.dataset.filter || "all";
      isExpanded = false;
      updateCertificates();
    });
  });

  if (showMoreBtn) {
    showMoreBtn.addEventListener("click", () => {
      isExpanded = !isExpanded;
      updateCertificates();

      if (!isExpanded) {
        const certSection = document.getElementById("certificates");
        if (certSection) {
          const rect = certSection.getBoundingClientRect();
          if (rect.top < 0) {
            certSection.scrollIntoView({ behavior: "smooth" });
          }
        }
      }
    });
  }

  updateCertificates();
})();

/* Projects Show More / Show Less */
(function initProjectsShowMore() {
  const projectCards = Array.from(
    document.querySelectorAll("#projects .project-card, #projects .box"),
  );
  const showMoreBtn = document.getElementById("showMoreProjectsBtn");
  const actionsContainer = showMoreBtn?.closest(".projects-actions");

  if (!projectCards.length) return;

  const INITIAL_COUNT = 2;
  let isExpanded = false;

  function updateProjects() {
    const totalProjects = projectCards.length;

    projectCards.forEach((card, index) => {
      if (!isExpanded && index >= INITIAL_COUNT) {
        card.classList.add("is-collapsed");
      } else {
        card.classList.remove("is-collapsed");
        if (card.classList.contains("reveal-init")) {
          card.classList.add("show");
        }
      }
    });

    if (actionsContainer && showMoreBtn) {
      if (totalProjects <= INITIAL_COUNT) {
        actionsContainer.classList.add("is-hidden");
      } else {
        actionsContainer.classList.remove("is-hidden");
        const btnText = showMoreBtn.querySelector(".show-more-text");
        if (isExpanded) {
          showMoreBtn.classList.add("expanded");
          showMoreBtn.setAttribute("aria-expanded", "true");
          if (btnText) btnText.textContent = "Show Less";
        } else {
          showMoreBtn.classList.remove("expanded");
          showMoreBtn.setAttribute("aria-expanded", "false");
          if (btnText) {
            btnText.textContent = `Show More (+${totalProjects - INITIAL_COUNT})`;
          }
        }
      }
    }
  }

  if (showMoreBtn) {
    showMoreBtn.addEventListener("click", () => {
      isExpanded = !isExpanded;
      updateProjects();

      if (!isExpanded) {
        const projSection = document.getElementById("projects");
        if (projSection) {
          const rect = projSection.getBoundingClientRect();
          if (rect.top < 0) {
            projSection.scrollIntoView({ behavior: "smooth" });
          }
        }
      }
    });
  }

  updateProjects();
})();

/* Contact Form Submission Handler */
(function initContactForm() {
  const form = document.getElementById("contactForm");
  const statusDiv = document.getElementById("contactFormStatus");
  const submitBtn = document.getElementById("contactSubmitBtn");

  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const nameInput = form.querySelector('[name="name"]');
    const emailInput = form.querySelector('[name="email"]');
    const subjectInput = form.querySelector('[name="subject"]');
    const messageInput = form.querySelector('[name="message"]');

    const name = nameInput?.value.trim() || "";
    const email = emailInput?.value.trim() || "";
    const subject = subjectInput?.value.trim() || "New Portfolio Inquiry";
    const message = messageInput?.value.trim() || "";

    if (!name || !email || !message) {
      if (statusDiv) {
        statusDiv.className = "form-status is-error";
        statusDiv.innerHTML = `<iconify-icon icon="solar:danger-circle-bold"></iconify-icon> Please fill out all required fields.`;
      }
      return;
    }

    // Set loading state
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<span>Sending...</span> <iconify-icon icon="solar:refresh-circle-linear" class="spin-icon"></iconify-icon>`;
    }
    if (statusDiv) {
      statusDiv.className = "form-status is-loading";
      statusDiv.innerHTML = `Sending message...`;
    }

    try {
      const response = await fetch(
        "https://formsubmit.co/ajax/mostafaamahmoud075@gmail.com",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            name: name,
            email: email,
            subject: subject,
            message: message,
            _subject: `Portfolio message from ${name}: ${subject}`,
          }),
        },
      );

      const data = await response.json().catch(() => ({}));

      if (response.ok) {
        if (statusDiv) {
          statusDiv.className = "form-status is-success";
          statusDiv.innerHTML = `<iconify-icon icon="solar:check-circle-bold"></iconify-icon> Thank you! Your message has been sent successfully.`;
        }
        form.reset();
      } else {
        throw new Error(data.message || "Submission failed");
      }
    } catch (err) {
      if (statusDiv) {
        statusDiv.className = "form-status is-error";
        statusDiv.innerHTML = `<iconify-icon icon="solar:danger-circle-bold"></iconify-icon> Oops! Could not send message. You can reach me directly at <a href="mailto:mostafaamahmoud075@gmail.com">mostafaamahmoud075@gmail.com</a>`;
      }
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = `<span class="btn-text">Send Message</span> <iconify-icon icon="solar:plain-bold" class="btn-icon"></iconify-icon>`;
      }
    }
  });
})();

