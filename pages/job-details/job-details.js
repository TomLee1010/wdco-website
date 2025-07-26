document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const jobId = urlParams.get('jobId');

  if (jobId) {
    // If a jobId is present in the URL, fetch the specific job
    loadJobFromUrl(jobId);
  } else {
    // Fallback to sessionStorage for direct navigation from the jobs list
    try {
      const selectedJobJSON = sessionStorage.getItem('selectedJob');
      if (selectedJobJSON) {
        const selectedJob = JSON.parse(selectedJobJSON);
        populateJobDetails(selectedJob);
      } else {
        displayError('No job data found. Please select a job from the list.');
      }
    } catch (error) {
      displayError('An error occurred while loading job details from session storage.');
      console.error(error);
    }
  }
});

function loadJobFromUrl(jobId) {
  fetch('../../data/jobs.json') // Use relative path for GitHub Pages
    .then(res => {
      if (!res.ok) throw new Error("Failed to fetch jobs.json");
      return res.json();
    })
    .then(data => {
      const [category, index] = jobId.split('-');
      
      if (data.jobs && data.jobs[category] && data.jobs[category][index]) {
        const jobData = data.jobs[category][index];
        // Re-construct a Job object to include all necessary details
        const job = {
            id: jobId,
            company: jobData.details.company,
            jobTitle: jobData.details.jobTitle,
            level: jobData.details.level,
            salary: jobData.details.salary,
            workHours: jobData.details.workHours,
            location: jobData.details.location,
            classification: jobData.details.classification,
            date: jobData.details.date,
            responsibilities: jobData.details.responsibilities,
            requirements: jobData.details.requirements
        };
        populateJobDetails(job);
      } else {
        displayError(`Job with ID "${jobId}" not found.`);
      }
    })
    .catch(err => {
      displayError('Error loading job data.');
      console.error(err);
    });
}

function populateJobDetails(job) {
  if (!job) {
    displayError('Invalid job data provided.');
    return;
  }

  const setText = (id, text) => {
    const element = document.getElementById(id);
    if (element) {
      element.textContent = text || '';
    }
  };

  const populateList = (elementId, data) => {
    const element = document.getElementById(elementId);
    if (!element) return;
    element.innerHTML = '';

    if (typeof data === 'string') {
      element.innerHTML = data;
    } else if (Array.isArray(data)) {
      data.forEach(itemText => {
        const dt = document.createElement('dt');
        const dd = document.createElement('dd');
        const ul = document.createElement('ul');
        const li = document.createElement('li');
        li.textContent = itemText;
        ul.appendChild(li);
        dd.appendChild(ul);
        dt.appendChild(dd);
        element.appendChild(dt);
      });
    }
  };

  setText('item-company-name', job.company);
  setText('item-job-title', job.jobTitle);
  setText('item-level', job.level || 'N/A');
  setText('item-salary', job.salary);
  setText('item-workhours', job.workHours);
  setText('item-location', job.location);
  setText('item-classification', job.classification || 'N/A');
  setText('item-date', job.date);

  populateList('duties', job.responsibilities);
  populateList('requirements', job.requirements);

  const applyBtn = document.querySelector('.apply-btn');
  if (applyBtn) {
    applyBtn.onclick = () => {
      const jobTitle = job.jobTitle;
      const company = job.company;
      const url = `../contactUs/contactUs.html?jobTitle=${encodeURIComponent(jobTitle)}&company=${encodeURIComponent(company)}`;
      window.location.href = url;
    };
  }
}

function displayError(message) {
  console.error(message);
  const container = document.querySelector('.job-details-container');
  if (container) {
    container.innerHTML = `<h1>${message}</h1>`;
  }
}
