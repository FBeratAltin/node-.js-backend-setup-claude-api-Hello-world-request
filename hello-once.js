// Adım 3 — tek seferlik "Merhaba Dünya" isteği
require('dotenv').config();
const Anthropic = require('@anthropic-ai/sdk');

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

async function main() {
  const message = await client.messages.create({
    model: 'claude-sonnet-5', // güncel model adı — docs.claude.com'dan doğrulayın
    max_tokens: 200,
    messages: [
      { role: 'user', content: 'Merhaba! Kısaca kendini tanıt.' }
    ],
  });

  console.log(message.content[0].text);
}

main();
