function sendMail(contactForm) {
  emailjs
    .send("gmail", "rosie", {
      'from_name': contactForm.name.value,
      'from_email': contactForm.email.value,
      'project_request': contactForm.projectsummary.value,
    })
    .then(
      function (response) {
        console.log("SUCCESS", response);
        window.location.replace('contact.html'); // This will reload the page so the form is empty, 
                                                // change location to another page to bring there or to a thank you page
      },
      function (error) {
        console.log("ERROR", error);
      }
    );
    return false;
}
