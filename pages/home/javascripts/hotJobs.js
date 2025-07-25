class Job {
  constructor(company, jobTitle, level, salary, workHours, location, classification, date, responsibilities, requirements, highlightsDuties, highlightsRequirements) {
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

var jobList = [];

fetch("../../../data/jobs.json")
  .then(response => response.json())
  .then(data => {
    const hotJobs = data.jobs.hotJobs;
    const hotJobsKeyCount = Object.keys(hotJobs).length;
    for (let i = 0; i < hotJobsKeyCount; i++) {
      const jobDetails = hotJobs[i].details;
      const jobHighlights = hotJobs[i].highLights;
      
      const job = new Job(
        jobDetails.company,
        jobDetails.jobTitle,
        jobDetails.level,
        jobDetails.salary,
        jobDetails.workHours,
        jobDetails.location,
        jobDetails.classification,
        jobDetails.date,
        jobDetails.responsibilities,
        jobDetails.requirements,
        jobHighlights.responsibilities,
        jobHighlights.requirements
      );
      jobList.push(job);
    }

    for (let i = 0; i < hotJobsKeyCount; i++){
      const jobScroll = document.getElementById("job-scroll");
      const jobContainer = document.createElement("div");
      jobContainer.className = "job-container";
      jobScroll.append(jobContainer);
      const jobHeading = document.createElement("div");
      jobHeading.className = "job-heading";
      jobContainer.append(jobHeading);
      const h3 = document.createElement("h3");
      h3.innerHTML = jobList[i].company;
      jobHeading.append(h3);
      //const questionButton = document.createElement("button");
      //jobHeading.append(questionButton);
      //const questionButtonImg = document.createElement("img");
      //questionButtonImg.setAttribute("src", "pages/home/images/question.png");
      //questionButton.append(questionButtonImg);
      const jobTitle = document.createElement("div");
      jobTitle.className = "job-title";
      jobContainer.append(jobTitle);
      const h4 = document.createElement("h4");
      h4.innerHTML = jobList[i].jobTitle;
      jobTitle.append(h4);
      const jobDescContainer = document.createElement("div");
      jobDescContainer.className = "job-desc-container";
      jobContainer.append(jobDescContainer);
      const jobDesc = document.createElement("div");
      jobDesc.className = "job-desc";
      jobDescContainer.append(jobDesc);
      const salaryOuterSpan = document.createElement("span");
      salaryOuterSpan.innerHTML = "Salary: ";
      jobDesc.append(salaryOuterSpan);
      const salaryInnerSpan = document.createElement("span");
      salaryInnerSpan.innerHTML = jobList[i].salary;
      salaryOuterSpan.append(salaryInnerSpan);
      const locationOuterSpan = document.createElement("span");
      locationOuterSpan.innerHTML = "Location: ";
      jobDesc.append(locationOuterSpan);
      const locationInnerSpan = document.createElement("span");
      locationInnerSpan.innerHTML = jobList[i].location;
      locationOuterSpan.append(locationInnerSpan);
      const br = document.createElement("br");
      jobDesc.append(br);
      const date = document.createElement("span");
      date.className = "date-of-post";
      date.innerHTML = "Posted on ";
      jobDesc.append(date);
      const dateInnerSpan = document.createElement("span");
      dateInnerSpan.innerHTML = jobList[i].date;
      date.append(dateInnerSpan);
      const detailBtns = document.createElement("div");
      detailBtns.className = "detail-btns";
      jobDescContainer.append(detailBtns);
      const detailButton = document.createElement("button");
      detailButton.className = "detail";
      detailButton.innerHTML = "Details";
      detailBtns.append(detailButton);

      detailButton.addEventListener('click', () => {
        sessionStorage.setItem('selectedJob', JSON.stringify(jobList[i]));
        window.location.href = 'pages/job-details/job-details.html';
      });
      
      //const shareButton = document.createElement("button");
      //shareButton.className = "share";
      //detailBtns.append(shareButton);
      //const shareButtonImg = document.createElement("img");
      //shareButtonImg.setAttribute("src", "pages/home/images/share-btn.png");
      //shareButton.append(shareButtonImg);
    }
    
  })
  .catch(error => {
    console.error("Error fetching JSON:", error);
  });

  var searchInput = document.getElementById('search-input'); 
  searchInput.value = "";