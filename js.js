function toggleNav() {
  let margin = (document.getElementById("side-bar-nav").style.width == '0px') ? '200px' : '0px';
  let marginToggle = (document.getElementById("side-bar-nav").style.width == '0px') ? '160px' : '0px';
  document.getElementById("side-bar-nav").style.setProperty("width", margin, "important")
  document.getElementById("main-body-cont").style.setProperty("margin-left", margin, "important");
  document.getElementById("menu-toggle").style.setProperty("margin-left", marginToggle, "important"); 
}

