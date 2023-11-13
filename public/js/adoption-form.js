document
  .querySelector('.adoption-form')
  .addEventListener('submit', async (event) => {
    event.preventDefault();

    const firstName = document.querySelector('#first-name').value;
    const animalId = document.querySelector('#animal-id').value;
    const clientId = document.querySelector('#client-id').value;
    const address = document.querySelector('#address').value;
    const email = document.querySelector('#email').value;
    const reason = document.querySelector('#adoption-reason').value;

    const response = await fetch('/api/user/adoption-form', {
      method: 'POST',
      body: JSON.stringify({
        firstName,
        animalId,
        clientId,
        address,
        email,
        reason,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      //\successful submission
      window.location.href = '/success-page';
    } else {
      // Handle errors
      alert('Failed to submit adoption form.');
    }
  });
