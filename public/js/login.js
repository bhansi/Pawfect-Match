const loginFormHandler = async (event) => {
  event.preventDefault();

  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (email && password) {
    const response = await fetch('/api/user/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      // Redirect to the cats page after successful login
      document.location.replace('/cats');
    } else {
      alert('Failed to log in. ' + response.statusText);
    }
  } else {
    alert('Please enter both email and password to login.');
  }
};

document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);
