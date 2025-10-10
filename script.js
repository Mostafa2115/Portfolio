
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

const elements = document.querySelectorAll(".box, .card");

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

  
  const phrases = [
    "Full Stack .NET Developer",
    "Laravel Enthusiast",
    "Problem Solver",
  ];
  let currentPhraseIndex = 0;
  let currentCharIndex = 0;
  const typingSpeed = 100;
  const erasingSpeed = 50;
  const delayBetweenPhrases = 1000;
  const targetElement = document.getElementById("type-target");
  function type() {
    if (currentCharIndex < phrases[currentPhraseIndex].length) {
      targetElement.textContent +=
        phrases[currentPhraseIndex].charAt(currentCharIndex);
      currentCharIndex++;
      setTimeout(type, typingSpeed);
    } else {
      setTimeout(erase, delayBetweenPhrases);
    }
  }
  function erase() {
    if (currentCharIndex > 0) {
      targetElement.textContent = phrases[currentPhraseIndex].substring(
        0,
        currentCharIndex - 1
      );
      currentCharIndex--;
      setTimeout(erase, erasingSpeed);
    } else {
      currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
      setTimeout(type, typingSpeed);
    }
  }
  document.addEventListener("DOMContentLoaded", () => {
    if (phrases.length) setTimeout(type, delayBetweenPhrases);
  });

  const sidebar  = document.getElementById("mySidebar");
  const openBtn  = document.getElementById("openSidebar");
  const closeBtn = document.getElementById("closeSidebar");

  function openNav(e) {
    if (e) e.preventDefault();
    if (!sidebar) return;

    
    sidebar.style.display    = "block";
    sidebar.style.visibility  = "visible";
    sidebar.style.width      = "250px";          
    sidebar.style.right      = "0";               
    sidebar.style.left       = "";              
    sidebar.style.transform  = "translateX(0)";  
  }

  function closeNav(e) {
    if (e) e.preventDefault();
    if (!sidebar) return;

    
    sidebar.style.transform  = "translateX(-100%)";
    sidebar.style.left       = "-250px";
    sidebar.style.width      = "100px";
    sidebar.style.display    = "block";
    sidebar.style.right      = "-250px";

  }
  window.openNav  = openNav;
  window.closeNav = closeNav;
  if (openBtn)  openBtn.addEventListener("click", openNav);
  if (closeBtn) closeBtn.addEventListener("click", closeNav);
}









