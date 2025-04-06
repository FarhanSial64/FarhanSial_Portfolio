window.onload = () => {
    const typingElement = document.getElementById("typing");
  
    const roles = [
      "Software Engineer",
      "Quality Engineer",
      "Business Professional",
      "Web Developer",
      "App Developer"
    ];
  
    let currentRole = 0;
    let currentChar = 0;
    let isDeleting = false;
  
    function typeEffect() {
      const currentText = roles[currentRole];
  
      if (isDeleting) {
        currentChar--;
      } else {
        currentChar++;
      }
  
      typingElement.textContent = currentText.substring(0, currentChar);
  
      if (!isDeleting && currentChar === currentText.length) {
        setTimeout(() => {
          isDeleting = true;
          typeEffect();
        }, 1500); // pause before deleting
        return;
      }
  
      if (isDeleting && currentChar === 0) {
        isDeleting = false;
        currentRole = (currentRole + 1) % roles.length;
      }
  
      const typingSpeed = isDeleting ? 50 : 100;
      setTimeout(typeEffect, typingSpeed);
    }
  
    typeEffect();
    
  };
  

  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("nav-links");
  
  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });


  function checkSlide() {
    const skillSection = document.getElementById('skills');
    const skillCards = document.querySelectorAll('.skill-card');

    if (!skillSection) return;

    const slideInAt = (window.scrollY + window.innerHeight) - skillSection.offsetTop + skillSection.offsetHeight * 0.2;
    const sectionBottom = skillSection.offsetTop + skillSection.offsetHeight;
    const isHalfShown = slideInAt > window.scrollY + window.innerHeight / 2;
    const isNotScrolledPast = window.scrollY < sectionBottom;

    if (isHalfShown && isNotScrolledPast) {
        skillCards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('animate');
            }, 100 * (index + 1));
        });
        window.removeEventListener('scroll', checkSlide);
    }
}

window.addEventListener('scroll', checkSlide);

document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form from submitting to server
  
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
  
    // Simple validation
    if (!name || !email || !message) {
      alert('Please fill in all fields.');
      return;
    }
  
    // Validate email format
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!email.match(emailPattern)) {
      alert('Please enter a valid email address.');
      return;
    }
  
    // If validation passes, send email via EmailJS
    sendEmail(name, email, message);
});


// Send form data using EmailJS
function sendEmail(name, email, message) {
    // Using EmailJS to send form data
    emailjs.sendForm('service_761ndk3', 'template_zbwty4i', '#contact-form', 'your_user_id')
        .then(function(response) {
            console.log('Sent successfully', response);
            // Show success message via alert
            alert('Thank you for your message! We will get back to you shortly.');
            // Clear the form fields after successful submission
            document.getElementById('contact-form').reset();
        }, function(error) {
            console.log('Error sending email', error);
            // Show error message via alert
            alert('There was an error sending your message. Please try again later.');
        });
}

  