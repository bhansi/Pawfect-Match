function deleteApplication(applicationId) {
  fetch(`/api/employee/application/${applicationId}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  })
    .then((response) => {
      if (response.ok) {
        window.location.replace('/applications'); // Reload the page to update the list
      } else {
        alert('Failed to delete application.');
      }
    })
    .catch((error) => console.error('Error:', error));
}

// function updateApplication(applicationId) {
// }
