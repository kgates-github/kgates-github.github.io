window.addEventListener("resize", closeMenu);

function closeMenu() {
  if (window.innerWidth > 900) {
    //if (document.getElementById("side-bar-nav").style.left == "0px") document.getElementById("menu").style.left = "-40px";
    document.getElementById("menu").style.left = "-3px";
  } else {
    document.getElementById("menu").style.left = "-40px";
  }
}

function openNav() {
  document.getElementById("side-bar-nav").style.display = "block";
  document.getElementById("side-bar-nav").style.left = "0px";
  document.getElementById("menu").style.left = "-40px";
}

function closeNav() {
  document.getElementById("side-bar-nav").style.left = "-230px";
  if (window.innerWidth > 900) document.getElementById("menu").style.left = "-3px";
}

function seeMore(obj) {
  let elem = obj.parentNode;
  elem.style.display = "none";

  while (true) {
    if (elem.className.includes("collapsable")) {
      Array.from(elem.getElementsByClassName('collapsed')).forEach((el) => {
        el.style.display = "block";
      });
      elem.getElementsByClassName('line-clamped')[0].style.display = "block";
      break;
    } else {
      elem = elem.parentNode;
    }
  }
}