(function() {
  // Initialize EmailJS
  emailjs.init({
    publicKey: "10wW3uZJYNLumZS5H",
  });

  // Function to parse URL parameters
  const urlParams = new URLSearchParams(window.location.search);
  const jobTitle = urlParams.get('jobTitle');
  const company = urlParams.get('company');

  // Pre-fill the form if parameters are present
  if (jobTitle && company) {
    const messageTextarea = document.getElementById('message');
    if (messageTextarea) {
      messageTextarea.value = `I'm interested in the ${jobTitle} role and would love to learn more about the opportunity.`;
    }
  }
})();

document.getElementById('contact-form').addEventListener('submit', function(event) {
  event.preventDefault();
  
  const formResult = document.getElementById('form-result');
  formResult.textContent = 'Sending...';

  // Fetch form values
  const params = {
    from_name: document.getElementById('user-name').value,
    from_email: document.getElementById('user-email').value,
    from_phone: document.getElementById('user-phone-num').value,
    subject: document.getElementById('subject').value,
    company: document.getElementById('company-name').value,
    message: document.getElementById('message').value,
  };

  // Service ID and Template ID from your EmailJS account
  const serviceID = 'service_s59mxv6';
  const templateID = 'template_j445h7n';

  emailjs.send(serviceID, templateID, params)
    .then(res => {
      console.log('EmailJS response:', res);
      document.getElementById('contact-form').reset();
      formResult.textContent = 'Message sent successfully!';
      formResult.style.color = 'green';
    })
    .catch(err => {
      console.error('EmailJS error:', err);
      formResult.textContent = 'Failed to send message. Please try again later.';
      formResult.style.color = 'red';
    });
});
