const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
require('dotenv').config();

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.post('/subscribe', async (req, res) => {
  const email = req.body.email;
  const apiKey = process.env.MAILCHIMP_API_KEY;
  const listId = process.env.MAILCHIMP_LIST_ID;

  const data = {
    email_address: email,
    status: 'subscribed',
  };

  try {
    await axios.post(
      `https://us13.api.mailchimp.com/3.0/lists/${listId}/members/`,
      data,
      {
        headers: {
          Authorization: `apikey ${apiKey}`,
          'Content-Type': 'application/json',
        },
      }
    );
    res.send('Subscription successful!');
  } catch (error) {
    console.error(error);
    res.status(500).send('Subscription failed!');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
