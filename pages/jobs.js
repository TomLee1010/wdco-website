class Job {
  constructor(id, company, jobTitle, level, salary, workHours, location, classification, date, responsibilities, requirements, highlightsDuties, highlightsRequirements) {
    this.id = id;
    this.company = company;
    this.jobTitle = jobTitle;
    this.level = level;
    this.salary = salary;
    this.workHours = workHours;
    this.location = location;
    this.classification = classification;
    this.date = date;
    this.responsibilities = responsibilities;
    this.requirements = requirements;
    this.highlightsDuties = highlightsDuties;
    this.highlightsRequirements = highlightsRequirements;
  }
}





function sortByDate(jobList){
  jobList.sort((a, b) => new Date(b.date) - new Date(a.date));
}

function sortByRelevance(jobList) {
  const searchBar = document.getElementById("search-input");
  const searchResult = document.getElementById("search-results");
  const searchResultSpan = document.getElementById("search-result-container");
  const searchTerm = searchBar.value.toLowerCase();
  const searchWords = searchTerm.split(" ").filter(w => w); // Filter out empty strings

  const selectedLevel = document.getElementById("select-level").value;

  const fromAmountString = document.getElementById("from-amount").value;
  const fromAmountPart = fromAmountString.split("$")[1];
  const fromAmountNum = Number(fromAmountPart.split("k")[0]);

  const toAmountString = document.getElementById("to-amount").value;
  const toAmountPart = toAmountString.split("$")[1];
  const toAmountNum = Number(toAmountPart.split("k")[0]);

  const filteredJobs = jobList.filter(job => {
    // Level filter
    if (selectedLevel !== "All Levels" && job.level !== selectedLevel) {
      return false;
    }

    // Salary filter
    const salaryString = job.salary.replace(/k/g, '');
    const salaryParts = salaryString.split('-').map(s => parseInt(s.trim(), 10));
    const jobMinSalary = salaryParts[0];
    const jobMaxSalary = salaryParts.length > 1 ? salaryParts[1] : jobMinSalary;

    if (!isNaN(jobMinSalary) && !isNaN(fromAmountNum) && !isNaN(toAmountNum)) {
      if (jobMaxSalary < fromAmountNum || jobMinSalary > toAmountNum) {
        return false;
      }
    }

    // Keyword filter
    if (searchTerm) {
        const jobTitle = job.jobTitle.toLowerCase();
        const company = job.company.toLowerCase();
        const classification = job.classification.toLowerCase();
        
        // Return true if at least one search word is found in the relevant fields
        return searchWords.some(word => 
            jobTitle.includes(word) || 
            company.includes(word) || 
            classification.includes(word)
        );
    }

    return true; // Keep job if it passes all filters and there's no keyword search
  });

  // Sort by relevance (score) only if there was a search term
  if (searchTerm) {
    filteredJobs.sort((a, b) => {
      let scoreA = 0;
      let scoreB = 0;

      const jobTitleA = a.jobTitle.toLowerCase();
      const jobTitleB = b.jobTitle.toLowerCase();
      const companyA = a.company.toLowerCase();
      const companyB = b.company.toLowerCase();

      searchWords.forEach(word => {
          // Higher score for title matches
          if (jobTitleA.includes(word)) scoreA += 2;
          if (jobTitleB.includes(word)) scoreB += 2;
          // Lower score for company matches
          if (companyA.includes(word)) scoreA += 1;
          if (companyB.includes(word)) scoreB += 1;
      });
      
      return scoreB - scoreA; // Higher score first
    });
  }

  searchResult.innerHTML = filteredJobs.length;
  if (searchBar.value) {
    searchResultSpan.style.opacity = 100;
  } else {
    searchResultSpan.style.opacity = 0;
  }

  return filteredJobs;
}


function notFoundPage(){
  const searchBarInput = document.getElementById("search-input");
  const notFoundNotice = document.getElementById("not-found-notice");
  notFoundNotice.innerHTML = "Opps! No matching search result for \"" + String(searchBarInput.value) + "\"." ;
}


function createJobItems(start, end, jobList){
  var element = document.getElementById("create-job-items"); 
  while (element.firstChild) { 
      element.firstChild.remove(); 
  }
  const itemsNodeList = [];
  if (jobList.length != 0){
    for (i=start; i < end; i++){
      const jobCreateList = document.getElementById("create-job-items");
      const jobContainer = document.createElement("div");
      jobContainer.className = "job-container";
      jobContainer.id = i;
      itemsNodeList.push(jobContainer);
      jobCreateList.append(jobContainer);
      const paddingContainer = document.createElement("div");
      paddingContainer.className = "padding-container";
      jobContainer.append(paddingContainer);
      const companySpan = document.createElement("span");
      companySpan.className = "company";
      companySpan.innerHTML = jobList[i].company;
      paddingContainer.append(companySpan);
      const jobTitleH3 = document.createElement("h3");
      jobTitleH3.innerHTML = jobList[i].jobTitle;
      paddingContainer.append(jobTitleH3);

      const levelspan = document.createElement("span");
      levelspan.className = "level-span";
      levelspan.innerHTML = jobList[i].level;
      if (jobList[i].level == "Easy"){
        levelspan.style.backgroundColor = "#7AFF7C";
      } else if (jobList[i].level == "Regular"){
        levelspan.style.backgroundColor = "#F8E354";
      } else {
        levelspan.style.backgroundColor = "#FF6565";
      }
      paddingContainer.append(levelspan);

      const salarySpan = document.createElement("span");
      salarySpan.className = "outer-span";
      salarySpan.innerHTML = "Salary:";
      paddingContainer.append(salarySpan);
      const salaryInnerSpan = document.createElement("span");
      salaryInnerSpan.innerHTML = jobList[i].salary;
      salarySpan.append(salaryInnerSpan);
      salarySpan.innerHTML += "HKD";
      /*
      const salaryImg = document.createElement("img");
      salaryImg.setAttribute("src", "hotJobsImg/salary.webp");
      salarySpan.append(salaryImg);
      */
  
      const workHoursSpan = document.createElement("span");
      workHoursSpan.className = "outer-span";
      workHoursSpan.innerHTML = "Work hours:";
      paddingContainer.append(workHoursSpan);
      const workHoursInnerSpan = document.createElement("span");
      workHoursInnerSpan.innerHTML = jobList[i].workHours;
      workHoursSpan.append(workHoursInnerSpan);
      /*
      const workHoursImg = document.createElement("img");
      workHoursImg.setAttribute("src", "hotJobsImg/workHours.webp");
      workHoursSpan.append(workHoursImg);
      */
  
      const locationSpan = document.createElement("span");
      locationSpan.className = "outer-span";
      locationSpan.innerHTML = "Location:";
      paddingContainer.append(locationSpan);
      const locationInnerSpan = document.createElement("span");
      locationInnerSpan.innerHTML = jobList[i].location;
      locationSpan.append(locationInnerSpan);
      /*
      const locationImg = document.createElement("img");
      locationImg.setAttribute("src", "hotJobsImg/location.webp");
      locationSpan.append(locationImg);
      */
  
      const outerContainer = document.createElement("div");
      outerContainer.className = "outer-highlights-container";
      paddingContainer.append(outerContainer);
  
      const highlights = document.createElement("div");
      highlights.className = "highlights";
      outerContainer.append(highlights);
  
      const highlightsH4 = document.createElement("h4");
      highlightsH4.innerHTML = "Job Highlights";
      highlights.append(highlightsH4);
  
      const highlightsSpan = document.createElement("span");
      highlights.append(highlightsSpan);
  
      const dateOuterSpan = document.createElement("span");
      dateOuterSpan.innerHTML = "Posted on ";
      dateOuterSpan.className = "date";
      paddingContainer.append(dateOuterSpan);
  
      const dateInnerSpan = document.createElement("span");
      dateInnerSpan.innerHTML = jobList[i].date;
      dateOuterSpan.append(dateInnerSpan);

      jobContainer.addEventListener("click", function(event) {
        const job = jobList[this.id];
        const index = parseInt(this.id)
        if (window.innerWidth < 1320) {
            // For mobile, use sessionStorage and open in a new tab
            sessionStorage.setItem('selectedJob', JSON.stringify(job));
            window.open(`../job-details/job-details.html`, '_blank');
        } else {
            // For desktop, display on the right
            itemsNodeList.forEach(item => item.classList.remove("active"));
            this.classList.add("active");
            
            const emptyJobDetails = document.getElementById("empty-job-details");
            emptyJobDetails.style.display = "none";
            const jobDetailsDiv = document.getElementById("job-details-div");
            jobDetailsDiv.style.display = "flex";
            
            const newTabButton = document.querySelector(".new-tab");
            newTabButton.dataset.index = index;
            newTabButton.onclick = function() {
                const index = this.dataset.index;
                if (index !== undefined) {
                    const job = jobList[parseInt(index)];
                    sessionStorage.setItem('selectedJob', JSON.stringify(job));
                    window.open(`../job-details/job-details.html`, '_blank');
                }
            };

            const shareButton = document.querySelector(".share-btn");
            const jobUrl = new URL(`../job-details/job-details.html?jobId=${job.id}`, window.location.href).href;
            shareButton.dataset.url = jobUrl;
            shareButton.dataset.title = job.jobTitle;

            // Dynamically changes job details
            document.getElementById("item-company-name").innerHTML = job.company;
            document.getElementById("item-job-title").innerHTML = job.jobTitle;
            document.getElementById("item-level").innerHTML = job.level;
            document.getElementById("item-salary").innerHTML = job.salary;
            document.getElementById("item-workhours").innerHTML = job.workHours;
            document.getElementById("item-location").innerHTML = job.location;
            document.getElementById("item-classification").innerHTML = job.classification;
            document.getElementById("item-date").innerHTML = job.date;
            document.getElementById("duties").innerHTML = job.responsibilities;
            document.getElementById("requirements").innerHTML = job.requirements;

            const applyBtn = document.querySelector(".apply-btn");
            applyBtn.onclick = function() {
                const jobTitle = job.jobTitle;
                const company = job.company;
                const url = `../contactUs/contactUs.html?jobTitle=${encodeURIComponent(jobTitle)}&company=${encodeURIComponent(company)}`;
                window.location.href = url;
            };
        }
      })
    }
  }
}

function pagesBtns(start, end, jobList, numberOfPages, decimalPart) {
  var btnElement = document.getElementById("pages-controls"); 
  while (btnElement.firstChild) { 
    btnElement.firstChild.remove(); 
  }
  let first = 1;
  let last = 5;
  let numOf4Pages = Math.round(numberOfPages/4);
  if (last > numberOfPages){
    last = numberOfPages+1;
  }
  // numberOfPages/4 round up if last > numberOfPages use numberOfPages
  const pagesControls = document.getElementById("pages-controls");
  const moveLeft = document.createElement("button");
  pagesControls.append(moveLeft);
  const moveLeftImg = document.createElement("img");
  moveLeftImg.setAttribute("src", "hotJobsImg/previousPage.webp");
  moveLeft.append(moveLeftImg);
  const nodeList = [];
  for (i=first; i < last; i++){
    const pageBtn = document.createElement("button");
    pageBtn.className = "page-btns";
    pageBtn.innerHTML = i;
    pagesControls.append(pageBtn);
    nodeList.push(pageBtn);
    pageBtn.addEventListener("click", function(event) {
      moveLeft.style.visibility = "visible";
      if (Number(this.innerHTML) == numberOfPages){
        moveRight.style.visibility = "hidden";
      } else {
        moveRight.style.visibility = "visible";
      }; 
      nodeList.forEach(btn => btn.classList.remove("active"));
      this.classList.add("active");
      if (nodeList[0].classList.contains("active") && nodeList[0].innerHTML == 1){
        moveLeft.style.visibility = "hidden";
      }
      let pageNum = this.innerHTML;
      let endNum = numberOfPages*10 + decimalPart;
      if (endNum-pageNum*10 >= 10 || endNum-pageNum*10 == 0){
        createJobItems(pageNum*10-10, pageNum*10, jobList);
      } else {
        createJobItems(pageNum*10-10, pageNum*10-10+decimalPart, jobList);
      }
      if (nodeList[nodeList.length-1].classList.contains("active") && Number(nodeList[nodeList.length-1].innerHTML) < numberOfPages){
        nodeList.forEach(btn => btn.classList.remove("active"));
        nodeList.forEach(btn => btn.innerHTML = Number(btn.innerHTML) + 1);
        nodeList[nodeList.length-2].classList.add("active");
      };
      if (nodeList[0].classList.contains("active") && Number(nodeList[0].innerHTML) > 1){
        nodeList.forEach(btn => btn.classList.remove("active"));
        nodeList.forEach(btn => btn.innerHTML = Number(btn.innerHTML) - 1);
        nodeList[1].classList.add("active");
      };
      topFunction()
    });
    if (pageBtn.innerHTML == 1){
      pageBtn.classList.add("active");
    }
  }
  const moveRight = document.createElement("button");
  pagesControls.append(moveRight);
  const moveRightImg = document.createElement("img");
  moveRightImg.setAttribute("src", "hotJobsImg/nextPage.webp");
  moveRight.append(moveRightImg);
  if (nodeList[0].classList.contains("active") && nodeList[0].innerHTML == 1){
    moveLeft.style.visibility = "hidden";
  };
  if (nodeList[nodeList.length-1].classList.contains("active")){
    moveRight.style.visibility = "hidden";
  };
  moveRight.addEventListener("click", function(event) {
    if (nodeList[nodeList.length-2].classList.contains("active")){
      moveRight.style.visibility = "hidden";
    } else {
      moveRight.style.visibility = "visible";
    }; 
    moveLeft.style.visibility = "visible";
    let i = 0;
    while (!nodeList[i].classList.contains("active")){
      i++;
    }
    if (nodeList[i].classList.contains("active")){
      nodeList.forEach(btn => btn.classList.remove("active"));
      nodeList[i+1].classList.add("active");
      let pageNum = nodeList[i+1].innerHTML;
      let endNum = numberOfPages*10 + decimalPart;
      if (endNum-pageNum*10 >= 10 || endNum-pageNum*10 == 0){
        createJobItems(pageNum*10-10, pageNum*10, jobList);
      } else {
        createJobItems(pageNum*10-10, pageNum*10-10+decimalPart, jobList);
      }
    }
    if (nodeList[nodeList.length-1].classList.contains("active") && Number(nodeList[nodeList.length-1].innerHTML) < numberOfPages){
      nodeList.forEach(btn => btn.classList.remove("active"));
      nodeList.forEach(btn => btn.innerHTML = Number(btn.innerHTML) + 1);
      nodeList[nodeList.length-2].classList.add("active");
    };
    topFunction()
  });

  moveLeft.addEventListener("click", function(event) {
    moveLeft.style.visibility = "visible";
    let i = 0;
    while (!nodeList[i].classList.contains("active")){
      i++;
    }
    if (nodeList[i].classList.contains("active")){
      nodeList.forEach(btn => btn.classList.remove("active"));
      nodeList[i-1].classList.add("active");
      let pageNum = nodeList[i-1].innerHTML;
      let endNum = numberOfPages*10 + decimalPart;
      if (endNum-pageNum*10 >= 10 || endNum-pageNum*10 == 0){
        createJobItems(pageNum*10-10, pageNum*10, jobList);
      } else {
        createJobItems(pageNum*10-10, pageNum*10-10+decimalPart, jobList);
      }
    }
    if (nodeList[0].classList.contains("active") && nodeList[0].innerHTML == 1){
      moveLeft.style.visibility = "hidden";
    }
    if (nodeList[0].classList.contains("active") && Number(nodeList[0].innerHTML) > 1){
      nodeList.forEach(btn => btn.classList.remove("active"));
      nodeList.forEach(btn => btn.innerHTML = Number(btn.innerHTML) - 1);
      nodeList[1].classList.add("active");
    };
    topFunction()
  });
}

function topFunction() {
  document.body.scrollTop = 150; // For Safari
  document.documentElement.scrollTop = 150; // For Chrome, Firefox, IE and Opera
}

var select = document.getElementById("sort-method");

function sortMethod(start, end, jobList, numberOfPages, decimalPart){
  var searchBar = document.getElementById("search-input");
  var jobsOuterContainer = document.getElementById("jobs-outer-div");
  var notFoundContainer = document.getElementById("not-found-container");

  // 1. Get filtered and relevance-sorted jobs
  let filteredJobs = sortByRelevance(jobList);

  // 2. If user selected "sort by date", re-sort the filtered list
  if (select.value == "sort by date"){
    sortByDate(filteredJobs);
  }

  // 3. Handle "not found" case
  if (filteredJobs.length === 0 && searchBar.value !== "") {
      jobsOuterContainer.style.display = "none";
      notFoundContainer.style.display = "flex";
      notFoundPage();
      // Clear pagination if no results
      var btnElement = document.getElementById("pages-controls"); 
      while (btnElement.firstChild) { 
        btnElement.firstChild.remove(); 
      }
      return; // Stop further execution
  }
  
  // Ensure main view is visible if there are results
  jobsOuterContainer.style.display = "flex";
  notFoundContainer.style.display = "none";

  // 4. Calculate pagination for the filtered list
  var resultPages = Math.ceil(filteredJobs.length / 10);
  var newDecimalPart = filteredJobs.length % 10;
  if (newDecimalPart === 0 && filteredJobs.length > 0) {
    newDecimalPart = 10;
  }


  // 5. Display the first page of results
  const displayEnd = Math.min(end, filteredJobs.length);
  createJobItems(start, displayEnd, filteredJobs);

  // 6. Set up pagination controls
  pagesBtns(start, end, filteredJobs, resultPages, newDecimalPart);
}

var jobList = [];

fetch("/data/jobs.json")
  .then(response => response.json())
  .then(data => {
    console.log(data);
    const hotJobsKeyCount = Object.keys(data.jobs.hotJobs).length;
    const regularJobsKeyCount = Object.keys(data.jobs.regularJobs).length;
    for (i=0; i < hotJobsKeyCount; i++){
      const company = data["jobs"]["hotJobs"][i]["details"]["company"];
      const jobTitle = data["jobs"]["hotJobs"][i]["details"]["jobTitle"];
      const level = data["jobs"]["hotJobs"][i]["details"]["level"];
      const salary = data["jobs"]["hotJobs"][i]["details"]["salary"];
      const workHours = data["jobs"]["hotJobs"][i]["details"]["workHours"];
      const location = data["jobs"]["hotJobs"][i]["details"]["location"];
      const classification = data["jobs"]["hotJobs"][i]["details"]["classification"];
      const date = data["jobs"]["hotJobs"][i]["details"]["date"];
      const responsibilities = data["jobs"]["hotJobs"][i]["details"]["responsibilities"];
      const requirements = data["jobs"]["hotJobs"][i]["details"]["requirements"];
      const highlightsDuties = data["jobs"]["hotJobs"][i]["highLights"]["responsibilities"];
      const highlightsRequirements = data["jobs"]["hotJobs"][i]["highLights"]["requirements"];

      const hotJob = new Job(`hotJobs-${i}`, company, jobTitle, level, salary, workHours, location, classification, date, responsibilities, requirements, highlightsDuties, highlightsRequirements);
      jobList.push(hotJob);
    }
    for (i=0; i < regularJobsKeyCount; i++){
      const company = data["jobs"]["regularJobs"][i]["details"]["company"];
      const jobTitle = data["jobs"]["regularJobs"][i]["details"]["jobTitle"];
      const level = data["jobs"]["regularJobs"][i]["details"]["level"];
      const salary = data["jobs"]["regularJobs"][i]["details"]["salary"];
      const workHours = data["jobs"]["regularJobs"][i]["details"]["workHours"];
      const location = data["jobs"]["regularJobs"][i]["details"]["location"];
      const classification = data["jobs"]["regularJobs"][i]["details"]["classification"];
      const date = data["jobs"]["regularJobs"][i]["details"]["date"];
      const responsibilities = data["jobs"]["regularJobs"][i]["details"]["responsibilities"];
      const requirements = data["jobs"]["regularJobs"][i]["details"]["requirements"];
      const highlightsDuties = data["jobs"]["regularJobs"][i]["highLights"]["responsibilities"];
      const highlightsRequirements = data["jobs"]["regularJobs"][i]["highLights"]["requirements"];

      const job = new Job(`regularJobs-${i}`, company, jobTitle, level, salary, workHours, location, classification, date, responsibilities, requirements, highlightsDuties, highlightsRequirements);
      jobList.push(job);
    }

    const searchInput = document.getElementById('search-input');
    const initialSearchTerm = localStorage.getItem('userSearch');
    if (initialSearchTerm) {
      searchInput.value = initialSearchTerm;
      localStorage.removeItem('userSearch'); // Clear after use
    }

    var start = 0;
    var end = 10;
    
    var isdecimal = false;
    var decimalPart = 0;
    var numberOfPages = Number(jobList.length/10);
    if (Number.isInteger(numberOfPages) == false){ // Check if numberOfPages is a decimal value
      const integerPart = Math.floor(numberOfPages);
      const decimalArray = numberOfPages.toString().split('.');
      decimalPart = Number(decimalArray[1]);
      isdecimal = true;
      numberOfPages = integerPart + 1;
    }

      /*
      if (count < integerPart*10-10){
        count = count2;
      }
      if (count2 < integerPart*10){
        count2 += 10;
      } else if (count2 == integerPart*10){
          if (isdecimal){
            count = count2;
            count2 += decimalPart;
          }
      }
      */
    const jobDetailsDiv = document.getElementById("job-details-div");
    jobDetailsDiv.style.display = "none";
    createJobItems(start, end, jobList);
    pagesBtns(start, end, jobList, numberOfPages, decimalPart);
    sortMethod(start, end, jobList, numberOfPages, decimalPart);
    var select = document.getElementById("sort-method");
    select.onchange = function() {
      sortMethod(start, end, jobList, numberOfPages, decimalPart);
      const jobDetailsDiv = document.getElementById("job-details-div");
      jobDetailsDiv.style.display = none;
    };
    searchInput.addEventListener("keypress", function(event) {
      // If the user presses the "Enter" key on the keyboard
      if (event.key === "Enter") {
        // Cancel the default action, if needed
        event.preventDefault();
        // Trigger the button element with a click
        document.getElementById("user-search-btn").click();
      }
    });
    var userSearchBtn = document.getElementById('user-search-btn');
    userSearchBtn.addEventListener('click', function() {
      sortMethod(start, end, jobList, numberOfPages, decimalPart);
      const jobDetailsDiv = document.getElementById("job-details-div");
      jobDetailsDiv.style.display = "none";
      if (window.innerWidth > 1320){
        const emptyJobDetails = document.getElementById("empty-job-details");
        emptyJobDetails.style.display = "flex";
      }
    });

    const shareButton = document.querySelector(".share-btn");
    if (shareButton) {
      shareButton.addEventListener("click", (event) => {
        const url = event.currentTarget.dataset.url;
        const title = event.currentTarget.dataset.title;

        if (!url) {
          alert("Please select a job to share first.");
          return;
        }

        if (navigator.share) {
          navigator.share({
            title: title,
            text: `Check out this job: ${title}`,
            url: url,
          })
          .then(() => console.log('Successful share'))
          .catch((error) => console.log('Error sharing', error));
        } else {
          navigator.clipboard.writeText(url);
          alert("Job link copied to clipboard!");
        }
      });
    }
  }) 
  
  .catch(error => {
    console.error("Error fetching JSON:", error);
  });





















