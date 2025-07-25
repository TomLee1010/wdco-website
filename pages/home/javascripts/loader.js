// Wait for the DOM to be fully loaded
document.getElementById("loader-container-div").style.display = "flex";
document.addEventListener("DOMContentLoaded", function() {
  var jobsOuterDiv = document.getElementById("jobs-outer-div");

  // Hide the loader when everything is ready
  jobsOuterDiv.style.display = "flex";
  document.getElementById("loader-container-div").style.display = "none";
});