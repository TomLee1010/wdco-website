var move_left_btn = document.getElementById("move_left");
var move_right_btn = document.getElementById("move_right");
var scroll_section = document.getElementById("job-scroll");

function getScrollAmount() {
  const job_container = scroll_section.querySelector('.job-container');
  if (job_container) {
    const style = window.getComputedStyle(job_container);
    const marginRight = parseInt(style.marginRight, 10);
    return job_container.offsetWidth + marginRight;
  }
  return scroll_section.clientWidth; 
}

move_right_btn.addEventListener("click", function(){
  const scrollAmount = getScrollAmount();
  scroll_section.scrollBy({ left: scrollAmount, behavior: 'smooth' });
});

move_left_btn.addEventListener("click", function(){
  const scrollAmount = getScrollAmount();
  scroll_section.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
});

function checkScrollButtons() {
  // Add a small tolerance to prevent floating point inaccuracies
  const tolerance = 1;
  const scrollAmount = scroll_section.scrollLeft;
  const maxScroll = scroll_section.scrollWidth - scroll_section.clientWidth;

  if (scrollAmount <= tolerance) {
    move_left_btn.style.opacity = "0.5";
    move_left_btn.disabled = true;
  } else {
    move_left_btn.style.opacity = "1";
    move_left_btn.disabled = false;
  }

  if (scrollAmount >= maxScroll - tolerance) {
    move_right_btn.style.opacity = "0.5";
    move_right_btn.disabled = true;
  } else {
    move_right_btn.style.opacity = "1";
    move_right_btn.disabled = false;
  }
}

scroll_section.addEventListener('scroll', checkScrollButtons);
window.addEventListener('resize', checkScrollButtons);

// Use a MutationObserver to wait for the job cards to be loaded
const observer = new MutationObserver((mutationsList, observer) => {
    for(const mutation of mutationsList) {
        if (mutation.type === 'childList') {
            checkScrollButtons();
            // once the job cards are loaded, we don't need to observe anymore
            observer.disconnect();
        }
    }
});

observer.observe(scroll_section, { childList: true });

checkScrollButtons();

var searchInput = document.getElementById("search-input");

searchInput.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    document.getElementById("user-search-btn").click();
  }
});