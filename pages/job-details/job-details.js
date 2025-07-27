document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  let jobId = urlParams.get('jobId');

  if (jobId) {
    loadJobFromUrl(jobId);
  } else {
    try {
      const selectedJobJSON = sessionStorage.getItem('selectedJob');
      if (selectedJobJSON) {
        const selectedJob = JSON.parse(selectedJobJSON);
        jobId = selectedJob.id;
        
        // Add the job ID to the URL without reloading the page
        const newUrl = `${window.location.pathname}?jobId=${jobId}`;
        history.replaceState(null, '', newUrl);
        
        populateJobDetails(selectedJob);
      } else {
        displayError('No job data found. Please select a job from the list.');
      }
    } catch (error) {
      displayError('An error occurred while loading job details.');
      console.error(error);
    }
  }
});

function loadJobFromUrl(jobId) {
  // Construct a path relative to the current HTML page's location
  const jobsPath = new URL('/data/jobs.json', window.location.href).href;
  fetch(jobsPath)
    .then(res => {
      if (!res.ok) throw new Error(`Failed to fetch jobs.json at ${jobsPath}`);
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

  updateMetaTags(job);
  document.title = `${job.jobTitle} | WDC`;

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

  const shareButton = document.querySelector(".share-btn");
  if (shareButton) {
    shareButton.addEventListener("click", (event) => {
      const url = window.location.href;
      const title = job.jobTitle;
      const shareText = `Check out this job: ${job.jobTitle}\nCompany: ${job.company}\nLocation: ${job.location}`;

      if (navigator.share) {
        navigator.share({
          title: title,
          text: shareText,
          url: url,
        })
        .then(() => console.log('Successful share'))
        .catch((error) => console.log('Error sharing', error));
      } else {
        navigator.clipboard.writeText(`${shareText}\n${url}`);
        alert("Job details and link copied to clipboard!");
      }
    });
  }
}

function updateMetaTags(job) {
    // Remove old meta tags to prevent duplicates
    document.querySelectorAll('meta[name="description"]').forEach(tag => tag.remove());
    document.querySelectorAll('meta[property^="og:"]').forEach(tag => tag.remove());

    const descriptionContent = `Apply for the role of ${job.jobTitle} at ${job.company}. Location: ${job.location}. Salary: ${job.salary}.`;

    // Standard Meta Description
    const metaDesc = document.createElement('meta');
    metaDesc.name = 'description';
    metaDesc.content = descriptionContent;
    document.head.appendChild(metaDesc);

    // Open Graph (og) Meta Tags for social sharing
    const metaInfo = {
        'og:title': job.jobTitle,
        'og:description': descriptionContent,
        'og:url': window.location.href,
        'og:image': new URL('/pages/home/images/WdcLogo.webp', window.location.href).href,
        'og:type': 'website'
    };

    for (const property in metaInfo) {
        const metaTag = document.createElement('meta');
        metaTag.setAttribute('property', property);
        metaTag.setAttribute('content', metaInfo[property]);
        document.head.appendChild(metaTag);
    }
}

function displayError(message) {
  console.error(message);
  const container = document.querySelector('.job-details-container');
  if (container) {
    container.innerHTML = `<h1>${message}</h1>`;
  }
}

