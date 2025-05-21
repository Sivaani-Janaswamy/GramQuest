// backend/routes/gpt.js
const express = require('express');
const router = express.Router();
const { Configuration, OpenAIApi } = require('openai');
require('dotenv').config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

router.post('/suggest', async (req, res) => {
  try {
    const { prompt } = req.body;
    const response = await openai.createChatCompletion({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
    });
    res.json({ suggestion: response.data.choices[0].message.content });
  } catch (err) {
    res.status(500).json({ error: 'Something went wrong with GPT API.' });
  }
});

module.exports = router;
