let particleNumber = 90;

if (window.innerWidth <= 800) {
  particleNumber = 40;
}
if (window.innerWidth <= 500) {
  particleNumber = 20;
}

tsParticles.load("tsparticles", {
  particles: {
    number: { value: particleNumber },
    size: { value: 3 },
    move: {
      enable: true,
      speed: 1,
    },
    links: {
      enable: true,
      distance: 150,
      color: "#ffffff",
      opacity: 0.4,
      width: 1,
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

  
  (function () {
    const text = "< Full Stack Developer >";
    const target = document.getElementById("type-target");
    if (!target) return;
    let i = 0;
    (function type() {
      if (i < text.length) {
        target.textContent += text.charAt(i++);
        setTimeout(type, 50);
      } else {
        setTimeout(() => { i = 0; target.textContent = ""; type(); }, 500);
      }
    })();
  })();

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



