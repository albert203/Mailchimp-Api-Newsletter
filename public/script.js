document
  .getElementById('subscribeForm')
  .addEventListener('submit', async function (event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const messageElement = document.getElementById('message');

    try {
      const response = await fetch('/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const result = await response.text();
      messageElement.textContent = result;
    } catch (error) {
      messageElement.textContent = 'Subscription failed!';
    }
  });


  
