/*
// Start of sorting buttons' javascript

var sort_btns = document.getElementsByClassName("sorting-btn");

// Add a click event listener to each element
for (var i = 0; i < sort_btns.length; i++) {
    sort_btns[i].addEventListener("click", function() {
        // Toggle the "sort_active" class
        this.classList.toggle("sort_active");
    });
}
*/

// End of sorting buttons' javascript

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
let scrollY = 0;

function menuArrowRotation() {
  if (rotation === 0) {
    rotation = -180;
    menuArrow.style.transform = `rotate(${rotation}deg)`;
    dropdownMenu.style.marginTop = "0";

    // Lock scroll without jump
    scrollY = window.scrollY;
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.width = "100%";
    document.body.classList.add("menu-open");

    // ✅ Move menu out of scroll context
    dropdownMenu.style.position = "absolute";
    const navbarHeight = document.querySelector("header .navbar").offsetHeight;
    dropdownMenu.style.top = `${scrollY + navbarHeight}px`;
  } else {
    rotation = 0;
    menuArrow.style.transform = `rotate(${rotation}deg)`;
    dropdownMenu.style.marginTop = "-1000px";

    // Restore scroll
    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.left = "";
    document.body.style.right = "";
    document.body.style.width = "";
    document.body.classList.remove("menu-open");
    window.scrollTo(0, scrollY);

    // Reset menu position
    dropdownMenu.style.position = "";
    dropdownMenu.style.top = "";
  }
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