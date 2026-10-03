import 'dotenv/config';
import { GoogleGenerativeAIEmbeddings } from '@langchain/google-genai';

async function run() {
  try {
    const embeddings = new GoogleGenerativeAIEmbeddings({
      modelName: "embedding-001",
      apiKey: process.env.GEMINI_API_KEY,
    });
    const res = await embeddings.embedQuery("Hello world");
    console.log("Success! Length:", res.length);
  } catch(e) {
    console.error("Error:", e.message);
  }
}
run();
