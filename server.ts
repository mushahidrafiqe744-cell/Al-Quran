import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Initialize Gemini AI Client
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY || '',
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });

  // API Health Check
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', service: 'Al-Quran - The Divine Guidance API' });
  });

  // AI Quran Assistant Endpoint
  app.post('/api/ai-assistant', async (req, res) => {
    try {
      const { question, language = 'English', topic } = req.body;

      if (!question || typeof question !== 'string') {
        res.status(400).json({ error: 'A valid question is required.' });
        return;
      }

      if (!process.env.GEMINI_API_KEY) {
        // Return a helpful fallback explanation if API Key isn't configured yet
        res.json({
          answer: `The Holy Quran provides profound guidance on this subject. In Surah Al-Baqarah (2:152), Allah says: "So remember Me; I will remember you." To receive personalized AI-assisted answers with full Tafsir context, please ensure your Gemini API key is configured in the project secrets.`,
          references: [
            { surah: 2, ayah: 152, name: 'Al-Baqarah', text: 'فَاذْكُرُونِي أَذْكُرْكُمْ' }
          ],
          topics: ['Dhikr', 'Remembrance of Allah', 'Patience']
        });
        return;
      }

      const systemPrompt = `You are an expert, respectful, and compassionate Quranic Scholar & AI Assistant for "Al-Quran - The Divine Guidance" app.
Your task is to answer questions about the Holy Quran with authenticity, warmth, wisdom, and clarity.
Always base your explanations directly on Quranic verses and classical authentic Tafsir (e.g. Ibn Kathir, Jalalayn, Al-Qurtubi).

Guidelines:
1. Provide a gentle, inspiring, and scholarly response in ${language}.
2. Whenever quoting or referencing the Quran, explicitly cite the Surah Name, Surah Number, and Ayah Number (e.g., [Surah Ash-Sharh 94:5-6]).
3. Provide the original Arabic text for key cited verses when possible, along with clear translation.
4. Keep the tone respectful, peaceful, and spiritually uplifting.
5. If the question asks for advice (e.g. for stress, gratitude, forgiveness), offer relevant Quranic Duas and verses.

Format your response nicely with clear markdown (bullet points, bold headings, verse quotes).`;

      const promptText = topic
        ? `Topic: ${topic}\nUser Question: ${question}`
        : `User Question: ${question}`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: promptText,
        config: {
          systemInstruction: systemPrompt,
          temperature: 0.7,
        },
      });

      const answerText = response.text || 'No response generated.';

      res.json({ answer: answerText });
    } catch (error: any) {
      console.error('Error in AI Quran Assistant:', error);
      res.status(500).json({
        error: 'Failed to generate answer.',
        details: error.message || 'An unexpected error occurred.',
      });
    }
  });

  // Serve Vite in Dev, Static files in Prod
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🕌 Al-Quran Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
