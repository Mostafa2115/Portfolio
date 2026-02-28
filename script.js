tsParticles.load("tsparticles", {
  particles: {
    number: { value: 80 },
    size: { value: 1 },
    move: {
      enable: true,
      speed: 0.2,
    },
    color: {
      value: "#ffffff",
    },
  },
  background: {
    color: "transparent",
  },
});

const typeTarget = document.getElementById("type-target");
if (typeTarget) {
  const texts = [
    "Full Stack .NET Developer",
    "ASP.NET Core & Laravel",
    "Backend Engineer",
    "Competitive Programmer",
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

const elements = document.querySelectorAll(".box, .experience-item, .cert-box");

window.addEventListener("scroll", () => {
  elements.forEach((el) => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      el.classList.add("show");
    } else {
      el.classList.remove("show");
    }
  });
});

const sections = document.querySelectorAll("section");

window.addEventListener("scroll", () => {
  sections.forEach((sec) => {
    const rect = sec.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      sec.classList.add("show");
    } else {
      sec.classList.remove("show");
    }
  });
});

if (!window.__SIDEBAR_INIT__) {
  window.__SIDEBAR_INIT__ = true;

  const sidebar = document.getElementById("mySidebar");
  const openBtn = document.getElementById("openSidebar");
  const closeBtn = document.getElementById("closeSidebar");

  function openNav(e) {
    if (e) e.preventDefault();
    if (!sidebar) return;

    sidebar.style.display = "block";
    sidebar.style.visibility = "visible";
    sidebar.style.width = "250px";
    sidebar.style.right = "0";
    sidebar.style.left = "";
    sidebar.style.transform = "translateX(0)";
  }

  function closeNav(e) {
    if (e) e.preventDefault();
    if (!sidebar) return;

    sidebar.style.transform = "translateX(-100%)";
    sidebar.style.left = "-250px";
    sidebar.style.width = "100px";
    sidebar.style.display = "block";
    sidebar.style.right = "-250px";
  }
  window.openNav = openNav;
  window.closeNav = closeNav;
  if (openBtn) openBtn.addEventListener("click", openNav);
  if (closeBtn) closeBtn.addEventListener("click", closeNav);
}
