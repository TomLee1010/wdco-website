// Start of navigation links 

var navLinks = document.querySelectorAll(".links a")

navLinks.forEach(link => {
    link.addEventListener("click", function(event) {
        navLinks.forEach(link => link.classList.remove("active"));
        this.classList.add("active");
    });
});

// End of navigation links 

// Start of dropdown menu

const menuArrow = document.getElementById("menu-arrow");
const dropdownMenu = document.getElementById("dropdown-menu");
let rotation = 0;

function menuArrowRotation() {
  if (rotation === 0) {
    rotation = -180;
  } else {
    rotation = 0;
  }
  menuArrow.style.transform = `rotate(${rotation}deg)`;
  document.body.classList.toggle('menu-open');
}

// Active link toggle
const menuLinks = document.querySelectorAll(".menu-links div");

menuLinks.forEach(link => {
  link.addEventListener("click", function () {
    menuLinks.forEach(link => link.classList.remove("active"));
    this.classList.add("active");
  });
});

menuLinks.forEach(link => {
  link.addEventListener("click", function () {
    menuLinks.forEach(link => link.classList.remove("active"));
    this.classList.add("active");
  });
});

// End of dropdown menu


var searchArrow = document.getElementById("search-arrow");
var moreOptionsMenu = document.getElementsByClassName("more-options-container")[0];
var arrowRotation = 0;

function searchArrowRotation(){
    if (arrowRotation == 0){
        arrowRotation -= 180;
        searchArrow.style.transform = "rotate(" + String(arrowRotation) + "deg)";
        moreOptionsMenu.style.display = "flex";
        disableScroll()
        
    } else {
        arrowRotation = 0
        searchArrow.style.transform = "rotate(" + String(arrowRotation) + "deg)";
        moreOptionsMenu.style.display = "none";
        enableScroll()
    }
}

function disableScroll() {
    // Get the current page scroll position
    scrollTop =
        window.scrollY ||
        document.documentElement.scrollTop;
    scrollLeft =
        window.scrollX ||
        document.documentElement.scrollLeft,

        // if any scroll is attempted,
        // set this to the previous value
        window.onscroll = function () {
            window.scrollTo(scrollLeft, scrollTop);
        };
}

function enableScroll() {
    window.onscroll = function () { };
}
