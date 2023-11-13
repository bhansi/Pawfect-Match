const loginFormHandler = async (event) => {
  event.preventDefault();

  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();
  const isEmployee = document.querySelector('#is-employee-checkbox').checked;

  if (email && password) {
    const response = await fetch('/api/user/login', {
      method: 'POST',
      body: JSON.stringify({ email, password, is_employee: isEmployee }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      const responseData = await response.json();
      if (responseData.isEmployee) {
        document.location.replace('/applications'); // Redirect to the applications page for employees
      } else {
        document.location.replace('/'); // Redirect to the main page for regular users
      }
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
