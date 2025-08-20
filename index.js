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
    sidebar.style.width      = "0";
    sidebar.style.display    = "none";
    sidebar.style.right      = "-250px";

  }
  window.openNav  = openNav;
  window.closeNav = closeNav;
  if (openBtn)  openBtn.addEventListener("click", openNav);
  if (closeBtn) closeBtn.addEventListener("click", closeNav);
}
