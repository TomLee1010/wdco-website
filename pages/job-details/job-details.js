document.addEventListener('DOMContentLoaded', () => {
  try {
    const selectedJobJSON = sessionStorage.getItem('selectedJob');

    if (selectedJobJSON) {
      const selectedJob = JSON.parse(selectedJobJSON);
      populateJobDetails(selectedJob);
    } else {
      // Fallback: try to get job index from URL
      const urlParams = new URLSearchParams(window.location.search);
      const jobIndex = parseInt(urlParams.get('job'));

      if (!isNaN(jobIndex)) {
        fetch('../../jobs.json') // adjust path if needed
          .then(res => {
            if (!res.ok) throw new Error("Failed to fetch jobs.json");
            return res.json();
          })
          .then(jobs => {
            const job = jobs[jobIndex];
            if (job) {
              populateJobDetails(job);
            } else {
              displayError(`No job found at index ${jobIndex}.`);
            }
          })
          .catch(err => {
            displayError('Error loading job data from jobs.json.');
            console.error(err);
          });
      } else {
        displayError('No job data found in session storage or URL.');
      }
    }
  } catch (error) {
    displayError('An error occurred while loading job details.');
    console.error(error);
  }
});

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
