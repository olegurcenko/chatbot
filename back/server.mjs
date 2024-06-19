//import express from 'express';
////import { OpenAI } from 'openai/src/index';
//import { OpenAI } from 'openai';

//import cors from 'cors';

//const app = express();
//const openai = new OpenAI({ apiKey: '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' });

//app.use(cors({
//  origin: 'http://localhost:3000', // Allow requests from this origin
//}));

//app.get('/api/chat', async (req, res) => {
//  try {
//    const result = await openai.createCompletion({
//      model: "text-davinci-003",
//      prompt: req.query.prompt,
//      temperature: 0.5,
//      max_tokens: 4000,
//    });
//    res.json(result.data);
//  } catch (error) {
//    console.error(error);
//    res.status(500).json({ error: 'Internal Server Error' });
//  }
//});

//app.listen(3001, () => {
//  console.log('Server is running on port 3001');
//});

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

const apiKey = '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';
const headers = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${apiKey}`
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
