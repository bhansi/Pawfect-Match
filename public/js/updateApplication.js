function showUpdateMenu(applicationId) {
  const updateContainer = document.getElementById(
    `status-update-container-${applicationId}`
  );
  updateContainer.style.display = 'block'; // Show the dropdown and submit button
}

function submitUpdate(applicationId) {
  const selectedStatus = document.getElementById(
    `adoption-status-dropdown-${applicationId}`
  ).value;

  fetch(`/api/employee/application/${applicationId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ adoption_status: selectedStatus }),
  })
    .then((response) => {
      console.log('Response:', response);
      window.location.reload();
    })
    .catch((error) => {
      console.error('Error:', error);
      // Optionally, refresh even if there's a network error
      window.location.reload();
    });
}
