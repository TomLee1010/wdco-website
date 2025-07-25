class Job {
  constructor(company, jobTitle, salary, workHours, location, date, responsibilities, requirements, highlightsDuties, highlightsRequirements) {
    this.company = company;
    this.jobTitle = jobTitle;
    this.salary = salary;
    this.workHours = workHours;
    this.location = location;
    this.date = date;
    this.responsibilities = responsibilities;
    this.requirements = requirements;
    this.highlightsDuties = highlightsDuties;
    this.highlightsRequirements = highlightsRequirements;
  }
}

function pagesBtns() {
  let start = 1;
  let end = 5;
  const pagesControls = document.getElementById("pages-controls");
  const moveLeft = document.createElement("button");
  pagesControls.append(moveLeft);
  const moveLeftImg = document.createElement("img");
  moveLeftImg.setAttribute("src", "hotJobsImg/previousPage.png");
  moveLeft.append(moveLeftImg);
  const nodeList = [];
  for (i=start; i < end; i++){
    const pageBtn = document.createElement("button");
    pageBtn.className = "page-btns";
    pageBtn.innerHTML = i;
    pagesControls.append(pageBtn);
    nodeList.push(pageBtn);
    pageBtn.addEventListener("click", function(event) {
      console.log("Button clicked!");
      nodeList.forEach(btn => btn.classList.remove("active"));
      this.classList.add("active");
      console.log("Active class added:", this.classList.contains("active"));
    });
  }
  const moveRight = document.createElement("button");
  pagesControls.append(moveRight);
  const moveRightImg = document.createElement("img");
  moveRightImg.setAttribute("src", "hotJobsImg/nextPage.png");
  moveRight.append(moveRightImg);
  return nodeList;
}

var jobList = [];
var jobDayDiff = [];

fetch("/data/jobs.json")
  .then(response => response.json())
  .then(data => {
    console.log(data);
    const hotJobsKeyCount = Object.keys(data.jobs.hotJobs).length;
    const regularJobsKeyCount = Object.keys(data.jobs.regularJobs).length;
    for (i=0; i < hotJobsKeyCount; i++){
      const company = data["jobs"]["hotJobs"][i]["details"]["company"];
      const jobTitle = data["jobs"]["hotJobs"][i]["details"]["jobTitle"];
      const salary = data["jobs"]["hotJobs"][i]["details"]["salary"];
      const workHours = data["jobs"]["hotJobs"][i]["details"]["workHours"];
      const location = data["jobs"]["hotJobs"][i]["details"]["location"];
      const date = data["jobs"]["hotJobs"][i]["details"]["date"];
      const responsibilities = data["jobs"]["hotJobs"][i]["details"]["responsibilities"];
      const requirements = data["jobs"]["hotJobs"][i]["details"]["requirements"];
      const highlightsDuties = data["jobs"]["hotJobs"][i]["highLights"]["responsibilities"];
      const highlightsRequirements = data["jobs"]["hotJobs"][i]["highLights"]["requirements"];

      const hotJob = new Job(company, jobTitle, salary, workHours, location, date, responsibilities, requirements, highlightsDuties, highlightsRequirements);
      jobList.push(hotJob);
    }
    for (i=0; i < regularJobsKeyCount; i++){
      const company = data["jobs"]["regularJobs"][i]["details"]["company"];
      const jobTitle = data["jobs"]["regularJobs"][i]["details"]["jobTitle"];
      const salary = data["jobs"]["regularJobs"][i]["details"]["salary"];
      const workHours = data["jobs"]["regularJobs"][i]["details"]["workHours"];
      const location = data["jobs"]["regularJobs"][i]["details"]["location"];
      const date = data["jobs"]["regularJobs"][i]["details"]["date"];
      const responsibilities = data["jobs"]["regularJobs"][i]["details"]["responsibilities"];
      const requirements = data["jobs"]["regularJobs"][i]["details"]["requirements"];
      const highlightsDuties = data["jobs"]["regularJobs"][i]["highLights"]["responsibilities"];
      const highlightsRequirements = data["jobs"]["regularJobs"][i]["highLights"]["requirements"];

      const job = new Job(company, jobTitle, salary, workHours, location, date, responsibilities, requirements, highlightsDuties, highlightsRequirements);
      jobList.push(job);
    }

    var presentDate = new Date();
    for (i=0; i < jobList.length; i++){
      var jobDate = jobList[i].date;
      var dateObject = new Date(jobDate)
      var differenceInTime = presentDate.getTime() - dateObject.getTime();
      var differenceInDays = Math.round(differenceInTime / (1000 * 3600 * 24));
      jobDayDiff.push(differenceInDays);
    }

    var start = 0;
    var end = 10;
    
    var isdecimal = false;
    var numberOfPages = Number(jobList.length/10);
    if (Number.isInteger(numberOfPages) == false){ // Check if numberOfPages is a decimal value
      const integerPart = Math.floor(numberOfPages);
      const decimalArray = numberOfPages.toString().split('.');
      const decimalPart = Number(decimalArray[1]);
      isdecimal = true;
      numberOfPages = integerPart + 1;
    }
    
    pagesBtns();
    
  }) 
  
  .catch(error => {
    console.error("Error fetching JSON:", error);
  });