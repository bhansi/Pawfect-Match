async function logout() {
  const response = await fetch('/api/user/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    document.location.replace('/'); // Redirect to home page
  } else {
    alert(response.statusText);
  }
}

// Adding event listener to the logout button if it exists
const logoutButton = document.querySelector('#logout');
if (logoutButton) {
  logoutButton.addEventListener('click', logout);
}
