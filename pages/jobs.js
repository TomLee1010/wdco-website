class Job {
  constructor(id, company, jobTitle, salary, classification, date, responsibilities, requirements, location) {
    this.id = id;
    this.company = company;
    this.jobTitle = jobTitle;
    this.salary = salary;
    this.classification = classification;
    this.date = date;
    this.responsibilities = responsibilities;
    this.requirements = requirements;
    this.location = location;
  }
}

function sortByDate(jobList){
  jobList.sort((a, b) => new Date(b.date) - new Date(a.date));
}

function filterAndSortJobs(jobList) {
  const searchBar = document.getElementById("search-input");
  const searchTerm = searchBar ? searchBar.value.toLowerCase() : "";
  const searchWords = searchTerm.split(" ").filter(w => w);

  const fromSalaryElement = document.getElementById("from-amount");
  const toSalaryElement = document.getElementById("to-amount");

  const fromSalaryValue = fromSalaryElement ? parseInt(fromSalaryElement.value.replace(/\$|k/g, '')) * 1000 : 0;
  const toSalaryValue = toSalaryElement ? parseInt(toSalaryElement.value.replace(/\$|k/g, '')) * 1000 : Infinity;

  let filteredJobs = jobList.filter(job => {
    let keywordMatch = true;
    if (searchTerm) {
      keywordMatch = job.jobTitle.toLowerCase().includes(searchTerm) || job.company.toLowerCase().includes(searchTerm);
    }
    if (!keywordMatch) return false;

    if (fromSalaryElement && toSalaryElement && job.salary) {
        let minSalary = 0;
        const salaryText = job.salary.split('-')[0];
        const match = salaryText.match(/(\d+)/);
        if (match) {
            minSalary = parseInt(match[0]);
            if (job.salary.toLowerCase().includes('k')) {
                minSalary *= 1000;
            }
        } else {
            return true; 
        }
        if (minSalary < fromSalaryValue || minSalary > toSalaryValue) {
            return false;
        }
    }
    return true;
  });

  const sortMethodElement = document.getElementById("sort-method");
  if (sortMethodElement && sortMethodElement.value === 'sort by date') {
    sortByDate(filteredJobs);
  } else if (searchTerm) {
    filteredJobs.sort((a, b) => {
      let scoreA = 0;
      let scoreB = 0;
      const jobTitleA = a.jobTitle.toLowerCase();
      const jobTitleB = b.jobTitle.toLowerCase();
      const companyA = a.company.toLowerCase();
      const companyB = b.company.toLowerCase();

      searchWords.forEach(word => {
        if (jobTitleA.includes(word)) scoreA += 2;
        if (jobTitleB.includes(word)) scoreB += 2;
        if (companyA.includes(word)) scoreA += 1;
        if (companyB.includes(word)) scoreB += 1;
      });
      
      return scoreB - scoreA;
    });
  }

  const searchResult = document.getElementById("search-results");
  const searchResultSpan = document.getElementById("search-result-container");
  if(searchResult) searchResult.innerHTML = filteredJobs.length;
  if(searchResultSpan) searchResultSpan.style.opacity = searchTerm ? 1 : 0;

  return filteredJobs;
}

  


function notFoundPage(){
  const searchBarInput = document.getElementById("search-input");
  const notFoundNotice = document.getElementById("not-found-notice");
  notFoundNotice.innerHTML = "Opps! No matching search result for \"" + String(searchBarInput.value) + "\"." ;
}


function formatToBullets(text) {
  if (!text) {
    return '';
  }
  const items = text.split('\n').map(item => {
    return item.trim().replace(/^[\s•-]+\s*/, '');
  }).filter(item => item);
  return '<ul>' + items.map(item => `<li>${item}</li>`).join('') + '</ul>';
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

      const salarySpan = document.createElement("span");
      salarySpan.className = "outer-span";
      salarySpan.innerHTML = "Salary:";
      paddingContainer.append(salarySpan);
      const salaryInnerSpan = document.createElement("span");
      salaryInnerSpan.innerHTML = jobList[i].salary;
      salarySpan.append(salaryInnerSpan);

      const classificationSpan = document.createElement("span");
      classificationSpan.className = "outer-span";
      classificationSpan.innerHTML = "Classification:";
      paddingContainer.append(classificationSpan);
      const classificationInnerSpan = document.createElement("span");
      classificationInnerSpan.innerHTML = jobList[i].classification;
      classificationSpan.append(classificationInnerSpan);

      const dateSpan = document.createElement("span");
      dateSpan.className = "outer-span";
      dateSpan.innerHTML = "Date:";
      paddingContainer.append(dateSpan);
      const dateInnerSpan = document.createElement("span");
      dateInnerSpan.innerHTML = jobList[i].date;
      dateSpan.append(dateInnerSpan);

      jobContainer.addEventListener("click", function(event) {
        const job = jobList[this.id];
        const index = parseInt(this.id);

        if (window.innerWidth < 1320) {
            // For mobile, use sessionStorage and open in a new tab
            sessionStorage.setItem('selectedJob', JSON.stringify(job));
            const jobUrl = new URL(`../job-details/job-details.html?jobId=${job.id}`, window.location.href).href;
            window.open(jobUrl, '_blank');
        } else {
            // For desktop, display on the right
            itemsNodeList.forEach(item => item.classList.remove("active"));
            this.classList.add("active");
            
            const emptyJobDetails = document.getElementById("empty-job-details");
            emptyJobDetails.style.display = "none";
            const jobDetailsDiv = document.getElementById("job-details-div");
            jobDetailsDiv.style.display = "flex";
            jobDetailsDiv.scrollTop = 0;
            
            const jobUrl = new URL(`../job-details/job-details.html?jobId=${job.id}`, window.location.href).href;

            // --- Corrected Button Logic ---
            const newTabButton = document.querySelector(".new-tab");
            newTabButton.href = jobUrl; // Set the href directly

            const shareButton = document.querySelector(".share-btn");
            shareButton.onclick = function() {
                if (navigator.share) {
                    navigator.share({
                        title: job.jobTitle,
                        text: `Check out this job: ${job.jobTitle}`,
                        url: jobUrl
                    }).then(() => console.log('Successful share'))
                      .catch((error) => console.log('Error sharing', error));
                } else {
                    navigator.clipboard.writeText(jobUrl).then(() => {
                        alert("Job link copied to clipboard!");
                    });
                }
            };

            const whatsappButton = document.querySelector(".whatsapp-link");
            whatsappButton.href = `https://api.whatsapp.com/send?text=${encodeURIComponent("Check out this job: " + job.jobTitle + " - " + jobUrl)}`;

            // Dynamically changes job details
            document.getElementById("item-company-name").innerHTML = job.company;
            document.getElementById("item-job-title").innerHTML = job.jobTitle;
            document.getElementById("item-salary").innerHTML = job.salary;
            document.getElementById("item-classification").innerHTML = job.classification;
            document.getElementById("item-location").innerHTML = job.location;
            document.getElementById("item-date").innerHTML = job.date;
            document.getElementById("duties").innerHTML = formatToBullets(job.responsibilities);
            document.getElementById("requirements").innerHTML = formatToBullets(job.requirements);

            const applyBtn = document.querySelector('#job-details-div .apply-btn');
            if (applyBtn) {
              applyBtn.onclick = () => {
                const jobTitle = job.jobTitle;
                const company = job.company;
                const url = `../contactUs/contactUs.html?jobTitle=${encodeURIComponent(jobTitle)}&company=${encodeURIComponent(company)}`;
                window.location.href = url;
              };
            }
        }
      });
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

function updateDisplay(jobList) {
    const jobsOuterContainer = document.getElementById("jobs-outer-div");
    const notFoundContainer = document.getElementById("not-found-container");
    const searchBar = document.getElementById("search-input");

    const filteredAndSortedJobs = filterAndSortJobs(jobList);

    if (filteredAndSortedJobs.length === 0 && searchBar && searchBar.value) {
        if(jobsOuterContainer) jobsOuterContainer.style.display = "none";
        if(notFoundContainer) notFoundContainer.style.display = "flex";
        notFoundPage();
        const pagesControls = document.getElementById("pages-controls");
        if(pagesControls) pagesControls.innerHTML = '';
    } else {
        if(jobsOuterContainer) jobsOuterContainer.style.display = "flex";
        if(notFoundContainer) notFoundContainer.style.display = "none";
        
        const totalJobs = filteredAndSortedJobs.length;
        const numberOfPages = Math.ceil(totalJobs / 10);
        const decimalPart = totalJobs % 10 || (totalJobs > 0 ? 10 : 0);

        createJobItems(0, Math.min(10, totalJobs), filteredAndSortedJobs);
        pagesBtns(0, 10, filteredAndSortedJobs, numberOfPages, decimalPart);
    }
}

var jobList = [];

fetch("/data/jobs.json")
  .then(response => {
    if (!response.ok) throw new Error("HTTP error " + response.status);
    return response.json();
  })
  .then(data => {
    const hotJobs = data.jobs.hotJobs || {};
    const regularJobs = data.jobs.regularJobs || {};

    for (const key in hotJobs) {
      const jobData = hotJobs[key].details;
      jobList.push(new Job(`hotJobs-${key}`, jobData.company, jobData.jobTitle, jobData.salary, jobData.classification, jobData.date, jobData.responsibilities, jobData.requirements, jobData.location));
    }
    for (const key in regularJobs) {
      const jobData = regularJobs[key].details;
      jobList.push(new Job(`regularJobs-${key}`, jobData.company, jobData.jobTitle, jobData.salary, jobData.classification, jobData.date, jobData.responsibilities, jobData.requirements, jobData.location));
    }

    updateDisplay(jobList); // Initial display

    // Centralized event listeners
    const setupEventListeners = () => {
        const controls = [
            document.getElementById("sort-method"),
            document.getElementById('user-search-btn'),
            document.getElementById('from-amount'),
            document.getElementById('to-amount')
        ];
        
        controls.forEach(control => {
            if (control) {
                const eventType = control.tagName === 'SELECT' ? 'change' : 'click';
                control.addEventListener(eventType, () => updateDisplay(jobList));
            }
        });

        const searchInput = document.getElementById('search-input');
        if (searchInput) {
            searchInput.addEventListener("keypress", function(event) {
              if (event.key === "Enter") {
                event.preventDefault();
                updateDisplay(jobList);
              }
            });
        }
    };
    
    setupEventListeners();
  })
  .catch(error => {
    console.error("Error fetching or processing JSON:", error);
    const jobsOuterContainer = document.getElementById("jobs-outer-div");
    if(jobsOuterContainer) jobsOuterContainer.innerHTML = "<p>Error loading jobs. Please try again later.</p>";
  });


















