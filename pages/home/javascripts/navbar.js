

/* When the user scrolls down, hide the navbar. When the user scrolls up, show the navbar */
/*
var isAboutTop = true;
var isBelowTop = false;
var navbar = document.getElementById("navbar");

var prevScrollpos = window.scrollY;


window.addEventListener("scroll", function() {
  if (window.scrollY <= 1000) {
    // User has scrolled back to the top
    isAboutTop = true;
  };
  if (window.scrollY > 100) {
    // User has scrolled back to the top
    isBelowTop = true;
  }
});

window.onscroll = function() {
  var currentScrollPos = window.scrollY;
  if (prevScrollpos > currentScrollPos) {
    if (isAboutTop) {
      navbar.style.zIndex = -1;
      navbar.style.transition = "unset";
      navbar.style.top = "0";
      isBelowTop = false;
    }
  } else {
      if (isBelowTop){
        navbar.style.top = "-80px";
        isAboutTop = false; // User is not at the top
        isBelowTop = true
        navbar.style.transition = "top 0.3s";
      }
  }
  prevScrollpos = currentScrollPos;
}
*/