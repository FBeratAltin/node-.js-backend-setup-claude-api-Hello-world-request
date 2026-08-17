// Adım 4 — basit HTTP sunucusu (Faz 3'teki agentic loop için hazırlık)
require('dotenv').config();
const express = require('express');
const Anthropic = require('@anthropic-ai/sdk');

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const app = express();
app.use(express.json());

app.get('/hello', async (req, res) => {
  try {
    const message = await client.messages.create({
      model: 'claude-sonnet-5', // güncel model adı — docs.claude.com'dan doğrulayın
      max_tokens: 200,
      messages: [
        { role: 'user', content: 'Merhaba! Kısaca kendini tanıt.' }
      ],
    });
    res.json({ reply: message.content[0].text });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Bir şeyler ters gitti.' });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Sunucu çalışıyor: http://localhost:${PORT}`);
});
