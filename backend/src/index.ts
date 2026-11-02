import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import connectDB from './db';
import ChatLog from './models/ChatLog';
import { parseDeviceAndNetworkInfo } from './utils/deviceParser';

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Configure secure CORS allowed origins
const defaultAllowedOrigins = [
  'http://localhost:3000',
  'http://127.0.0.1:3000',
  'https://portfolio-nu-hazel-79.vercel.app',
  'https://www.anilsuva.com',
  'https://anilsuva.com',
];

const envFrontendUrls = (process.env.FRONTEND_URL || '')
  .split(',')
  .map((url) => url.trim().replace(/\/+$/, ''))
  .filter(Boolean);

const allowedOrigins = Array.from(new Set([...defaultAllowedOrigins, ...envFrontendUrls]));

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (e.g. mobile apps, curl, or server-to-server)
      if (!origin) return callback(null, true);

      // Check allowed list
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      // Allow Vercel preview deployments (e.g. https://portfolio-*-anilsuva.vercel.app)
      if (origin.endsWith('.vercel.app') || origin.endsWith('.anilsuva.com')) {
        return callback(null, true);
      }

      console.warn(`[CORS Security] Blocked unauthorized request from origin: ${origin}`);
      return callback(new Error(`CORS blocked unauthorized origin: ${origin}`));
    },
    credentials: true,
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

app.use(express.json());

// Initialize MongoDB connection
connectDB();

// System instruction to prime Gemini as Anil Suva's portfolio assistant
const PORTFOLIO_SYSTEM_INSTRUCTION = `
You are the interactive AI Assistant and digital clone for Anil Suva's personal developer portfolio website.
Your role is to represent Anil professionally, warmly, and accurately to recruiters, clients, and visitors.

About Anil Suva:
- Name: Anil Suva
- Gender: Male (straight)
- Headline: Full-Stack Developer & Software Engineer
- Education: B.E. / B.Tech. in Information Technology at Government Engineering College, Bhavnagar (2023 - 2027), focusing on software engineering, data structures, algorithms, and web technologies.
- Summary: Passionate about software development and modern web technologies. Specializes in building responsive, high-performance web applications using modern JavaScript/TypeScript, React, Next.js, Node.js, and modern databases.

Technical Skills:
- Languages: JavaScript (ES6+), TypeScript, C++, HTML5, CSS3
- Frontend: React 19, Next.js 16 (App Router, Turbopack), Tailwind CSS v4, Responsive Web Design
- Backend: Node.js, Express.js, RESTful APIs, Web Push API, Google OAuth, Bcrypt
- Databases & ORM: MongoDB, Mongoose, PostgreSQL, Prisma ORM
- DevOps & Cloud: Docker (containerization), Git, GitHub, VS Code, Postman, Vercel
- Currently Learning: Deepening DevOps knowledge (just wrapped up Docker), and actively learning Web3 technologies.

Hobbies, Personal Interests & Fun Facts:
- Video Editing: Creative side hobby! Skilled in editing tools like Adobe After Effects, DaVinci Resolve, and Adobe Premiere Pro. (Note: this is purely a creative side hobby, not his career path).
- Gaming: Enjoys playing Minecraft, Resident Evil Village, Rocket League, and Hollow Knight: Silksong.
- Favorite YouTube Creator: Beast Boy Shub (BBS).
- Personal Details: Gender is male, straight.
- Instagram: @anil_suva31

Key Projects:
1. "Paytm Dummy":
   - A digital wallet web app built with React, TypeScript, Express, MongoDB, Mongoose, and Tailwind CSS.
   - Features: Secure authentication, user search, wallet-to-wallet transfers, real-time balance updates, and transaction history.
2. "Omni Play":
   - Mobile-first web game platform designed for lightweight, responsive gameplay.
   - Features: Reusable game architecture, Minimax AI bot-powered play, and clean UI.
   - Stack: Next.js, React, TypeScript, Tailwind CSS, Minimax AI algorithm.
3. "Blood Finder":
   - Emergency real-time blood-matching platform connecting patients with compatible donors.
   - Features: Medical blood-group compatibility filtering, city-level matching, instant lock-screen mobile push notifications with device vibration via Web Push API, and one-tap emergency contact via Phone and WhatsApp.
   - Stack: Next.js, React, TypeScript, Node.js, Express, MongoDB, Web Push API, Tailwind CSS, Google OAuth.

Contact & Social Links:
- Email: suvaanil80@gmail.com
- GitHub: https://github.com/anilsuva
- LinkedIn: https://www.linkedin.com/in/anil-suva-441258290/
- Instagram: @anil_suva31 (https://instagram.com/anil_suva31)

Guidelines for Responses:
- Keep answers concise, clear, and engaging (1-3 short paragraphs max unless detailed project info is requested).
- Use Markdown formatting (bullet points, bold text, links) to make responses scannable.
- You can recommend portfolio sections like "#projects", "#skills", "#about", or "#contact" when relevant.
- If asked about hiring or contacting Anil, direct them to his email (suvaanil80@gmail.com) or the Contact section.
- If asked about his hobbies, interests, video editing, games, favorite creators, or personal facts, answer naturally and authentically using the details above!
- If asked questions completely unrelated to Anil, software engineering, or his interests, politely steer the conversation back to Anil's work, skills, and portfolio.
`.trim();

// Basic health check endpoint
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok', uptime: process.uptime(), timestamp: new Date().toISOString() });
});

app.get('/', (_req: Request, res: Response) => {
  res.json({ message: 'Portfolio API Backend is running.' });
});

interface ChatHistoryItem {
  role: 'user' | 'model';
  text: string;
}

// Resilient model fallback candidates
const FALLBACK_MODELS = [
  process.env.GEMINI_MODEL,
  'gemini-3.5-flash',
  'gemini-flash-lite-latest',
  'gemini-3.8-flash',
  'gemini-3.5-flash-lite',
].filter(Boolean) as string[];

// Chat endpoint to securely communicate with Google Gemini API & save logs to MongoDB
app.post('/api/chat', async (req: Request, res: Response): Promise<void> => {
  const startTime = Date.now();
  const { deviceInfo, networkInfo } = parseDeviceAndNetworkInfo(req);

  try {
    const { message, history } = req.body;

    if (!message || typeof message !== 'string' || !message.trim()) {
      res.status(400).json({
        error: 'Invalid request: "message" field is required and must be a non-empty string.',
      });
      return;
    }

    const rawApiKey = process.env.GEMINI_API_KEY;
    const apiKey = rawApiKey ? rawApiKey.trim() : '';

    if (!apiKey) {
      res.status(500).json({
        error: 'GEMINI_API_KEY is not configured on backend. Please set GEMINI_API_KEY in backend/.env',
      });
      return;
    }

    const ai = new GoogleGenAI({ apiKey });

    // Build multi-turn contents if history is provided
    let contentsPayload: any = message.trim();
    if (Array.isArray(history) && history.length > 0) {
      const sanitizedHistory = history
        .filter((item: any) => item && typeof item.text === 'string' && (item.role === 'user' || item.role === 'model'))
        .map((item: ChatHistoryItem) => ({
          role: item.role === 'model' ? 'model' : 'user',
          parts: [{ text: item.text.trim() }],
        }));

      contentsPayload = [
        ...sanitizedHistory,
        {
          role: 'user',
          parts: [{ text: message.trim() }],
        },
      ];
    }

    const isStream = req.body?.stream !== false;

    if (isStream) {
      res.setHeader('Content-Type', 'text/event-stream');
      res.setHeader('Cache-Control', 'no-cache, no-transform');
      res.setHeader('Connection', 'keep-alive');
      res.flushHeaders?.();

      let streamSucceeded = false;
      let fullReply = '';
      let modelSuccessfullyUsed = '';
      let streamError: any = null;

      for (const modelName of FALLBACK_MODELS) {
        try {
          const responseStream = await ai.models.generateContentStream({
            model: modelName,
            contents: contentsPayload,
            config: {
              systemInstruction: PORTFOLIO_SYSTEM_INSTRUCTION,
              temperature: 0.7,
            },
          });

          for await (const chunk of responseStream) {
            const text = chunk.text;
            if (text) {
              fullReply += text;
              res.write(`data: ${JSON.stringify({ text })}\n\n`);
            }
          }

          modelSuccessfullyUsed = modelName;
          streamSucceeded = true;
          res.write(`data: ${JSON.stringify({ done: true, model: modelSuccessfullyUsed })}\n\n`);
          res.end();
          break;
        } catch (err: any) {
          console.warn(`[Gemini Stream] Model "${modelName}" failed, trying next fallback... Reason: ${err?.message || err}`);
          streamError = err;
        }
      }

      const durationMs = Date.now() - startTime;

      if (!streamSucceeded) {
        res.write(`data: ${JSON.stringify({ error: streamError?.message || 'Failed to generate response' })}\n\n`);
        res.end();
      }

      // Save question, answer, and device details to MongoDB
      try {
        await ChatLog.create({
          question: message.trim(),
          answer: fullReply,
          model: modelSuccessfullyUsed || 'failed',
          deviceInfo,
          networkInfo,
          durationMs,
          status: streamSucceeded ? 'success' : 'error',
          errorMessage: streamSucceeded ? '' : (streamError?.message || 'Stream failed'),
        });
        if (streamSucceeded) {
          console.log(`💾 [MongoDB] Saved streamed question from ${deviceInfo.deviceType} (${deviceInfo.mobileModel}) [${durationMs}ms]`);
        }
      } catch (dbErr: any) {
        console.error('⚠️ [MongoDB] Failed to save chat log to database:', dbErr?.message || dbErr);
      }

      return;
    }

    // Non-streaming fallback
    let generatedReply: string | null = null;
    let modelSuccessfullyUsed = '';
    let lastError: any = null;

    for (const modelName of FALLBACK_MODELS) {
      try {
        const response = await ai.models.generateContent({
          model: modelName,
          contents: contentsPayload,
          config: {
            systemInstruction: PORTFOLIO_SYSTEM_INSTRUCTION,
            temperature: 0.7,
          },
        });

        if (response && response.text) {
          generatedReply = response.text;
          modelSuccessfullyUsed = modelName;
          break;
        }
      } catch (err: any) {
        console.warn(`[Gemini API] Model "${modelName}" failed, trying next fallback... Reason: ${err?.message || err}`);
        lastError = err;
      }
    }

    if (!generatedReply) {
      throw lastError || new Error('No response generated by available Gemini models.');
    }

    const durationMs = Date.now() - startTime;

    // Save question, answer, and device details to MongoDB
    try {
      await ChatLog.create({
        question: message.trim(),
        answer: generatedReply,
        model: modelSuccessfullyUsed,
        deviceInfo,
        networkInfo,
        durationMs,
        status: 'success',
      });
      console.log(`💾 [MongoDB] Saved question from ${deviceInfo.deviceType} (${deviceInfo.mobileModel}) [${durationMs}ms]`);
    } catch (dbErr: any) {
      console.error('⚠️ [MongoDB] Failed to save chat log to database:', dbErr?.message || dbErr);
    }

    res.json({
      reply: generatedReply,
      model: modelSuccessfullyUsed,
    });
  } catch (error: any) {
    const durationMs = Date.now() - startTime;
    console.error('Error generating response from Gemini:', error);

    // Record failed attempt in MongoDB for diagnostic analytics
    try {
      await ChatLog.create({
        question: typeof req.body?.message === 'string' ? req.body.message.trim() : 'Invalid message',
        answer: '',
        model: 'failed',
        deviceInfo,
        networkInfo,
        durationMs,
        status: 'error',
        errorMessage: error?.message || 'Unknown error',
      });
    } catch {
      // Ignore secondary DB errors
    }

    res.status(500).json({
      error: 'Failed to process chat request.',
      details: error?.message || 'Unknown error',
    });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Backend server running on http://localhost:${PORT}`);
});
