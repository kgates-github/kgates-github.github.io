function toggleNav() {
  let margin = (document.getElementById("side-bar-nav").style.width == '0px') ? '200px' : '0px';
  let marginToggle = (document.getElementById("side-bar-nav").style.width == '0px') ? '170px' : '0px';
  document.getElementById("side-bar-nav").style.width = margin;
  document.getElementById("main-body-cont").style.marginLeft = margin;
  document.getElementById("menu-toggle").style.marginLeft = marginToggle;
}