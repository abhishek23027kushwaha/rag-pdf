import 'dotenv/config';

async function listModels() {
  const apiKey = process.env.GEMINI_API_KEY;
  const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
  const data = await res.json();
  const chatModels = data.models.filter(m => m.supportedGenerationMethods.includes('generateContent'));
  console.log("Chat Models:", chatModels.map(m => m.name));
}
listModels();
