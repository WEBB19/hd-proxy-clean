const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

const API_KEY = process.env.API_KEY;
const HD_API_URL = 'https://app.humandesign.ai/api/v1/chart';

const fetchChart = async (body) => {
  const response = await axios.post(HD_API_URL, body, {
    headers: {
      'Authorization': `Bearer ${API_KEY}`,
      'Content-Type': 'application/json'
    }
  });
  return response.data;
};

app.get('/', (req, res) => {
  res.send('HD Proxy API él!');
});

app.post('/type', async (req, res) => {
  try {
    const data = await fetchChart(req.body);
    res.json({ type: data.type });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Nem sikerült lekérni a típust.' });
  }
});

app.listen(PORT, () => {
  console.log(`HD proxy API listening on port ${PORT}`);
});
