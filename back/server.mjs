

import express from 'express'
import bodyParser from 'body-parser';
import axios from 'axios';
import cors from 'cors'

const app = express();
const port = 3001;

app.use(cors({
  origin: 'http://localhost:3000', // Allow requests from this origin
}));

// Middleware to parse JSON bodies
app.use(bodyParser.json());

const api = 'key';
const headers = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${api}`
};
// POST endpoint to send messages to ChatGPT
// POST endpoint to send messages to ChatGPT
app.post('/send-message', async (req, res) => {
  try {
    const { messages, model } = req.body;

    // Check if messages and model are provided
    if (!messages || !model) {
      return res.status(400).json({ error: 'Messages and model are required.' });
    }

    // Send messages to ChatGPT server with authorization header
    const response = await axios.post('https://api.openai.com/v1/chat/completions', {
      messages,
      model
    }, {
      headers: headers
    });

    // Return the response from the ChatGPT server
    console.log(response.data)
    res.json(response.data);
  } catch (error) {
    if (error.response && error.response.data) {
      console.error('Error:', error.response.data);
    } else {
      console.error('Error:', error.message);
    }
    res.status(500).json({ error: 'Internal server error.' });
  }
});


// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
