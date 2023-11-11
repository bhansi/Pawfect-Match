document
  .querySelector('.signup-form')
  .addEventListener('submit', async (event) => {
    event.preventDefault();

    const username = document.querySelector('#username-signup').value.trim();
    const address = document.querySelector('#address-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();

    if (username && email && password) {
      const response = await fetch('/signup', {
        method: 'POST',
        body: JSON.stringify({
          first_name,
          address,
          email,
          password,
        }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        document.location.replace('/'); // Redirect to the main page or dashboard
      } else {
        alert('Failed to sign up.');
      }
    } else {
      alert('Please fill out all the required fields.');
    }
  });
