# Anil Suva - Personal Portfolio & API Monorepo

A modern developer portfolio monorepo featuring a high-performance Next.js App Router frontend and an Express + Google Gemini API backend.

---

## 🏗️ Monorepo Architecture

```text
portfolio/
├── frontend/             # Next.js 16 (App Router, Tailwind CSS v4, TypeScript)
│   ├── app/              # App router pages, layout, and global styles
│   ├── components/       # UI components (Hero, Navbar, Projects, Skills, Contact)
│   ├── data/             # Portfolio content data (portfolio.ts)
│   ├── public/           # Static assets and icons
│   ├── package.json      # Frontend package configuration
│   └── tsconfig.json     # Frontend TypeScript config
│
├── backend/              # Node.js + Express API server with Google Gemini
│   ├── src/
│   │   └── index.ts      # Express server & POST /api/chat Gemini endpoint
│   ├── .env.example      # Sample backend environment variables
│   ├── package.json      # Backend dependencies and scripts
│   └── tsconfig.json     # Backend TypeScript config
│
├── package.json          # Root npm workspaces configuration
├── .gitignore            # Monorepo-wide gitignore rules
└── README.md             # Project documentation
```

---

## ✨ Features

- **Split Monorepo Architecture**: Clean separation between presentation layer (`frontend`) and API/AI services (`backend`) using npm workspaces.
- **Frontend (Next.js 16 + React 19)**:
  - Premium dark UI with emerald green accents and glassmorphism.
  - Tailored typography and Tailwind CSS v4.
  - Fully responsive across mobile, tablet, and desktop.
  - Pre-rendered static pages with JSON-LD structured data and SEO optimization.
  - Contact form integration.
- **Backend (Express + Google Gemini API)**:
  - Secure proxy for Gemini AI requests (`POST /api/chat`).
  - CORS enabled for frontend communication.
  - Health check endpoint (`GET /api/health`).
  - Strongly typed with TypeScript and `tsx` hot-reloading.

---

## 🚀 Getting Started

### 1. Prerequisites
- **Node.js**: v18+ (tested on Node v22)
- **npm**: v7+ (supports npm workspaces)

### 2. Clone the Repository
```bash
git clone https://github.com/AnilSuva/portfolio.git
cd portfolio
```

### 3. Install Dependencies
Run from the root directory to install dependencies for both `frontend` and `backend` workspaces simultaneously:
```bash
npm install
```

### 4. Configure Environment Variables
Create a `.env` file inside `backend/`:
```bash
cp backend/.env.example backend/.env
```
Open `backend/.env` and add your Google Gemini API key:
```env
PORT=5000
GEMINI_API_KEY=your_gemini_api_key_here
```
*(You can obtain a free API key at [Google AI Studio](https://aistudio.google.com/app/apikey).)*

If needed, create `frontend/.env.local` for frontend keys:
```env
NEXT_PUBLIC_WEB3FORMS_KEY=your_web3forms_key_optional
```

---

## 💻 Development Scripts

Run all commands from the **root** folder:

| Command | Action |
| --- | --- |
| `npm run dev` | Runs **both** frontend (port 3000) and backend (port 5000) concurrently |
| `npm run dev:frontend` | Runs only the Next.js frontend dev server |
| `npm run dev:backend` | Runs only the Express backend with hot reloading (`tsx watch`) |
| `npm run build` | Builds both frontend and backend for production |
| `npm run build:frontend`| Builds Next.js production bundle |
| `npm run build:backend` | Compiles backend TypeScript to `dist/` |
| `npm run start:frontend`| Starts Next.js production server |
| `npm run start:backend` | Runs compiled backend from `dist/index.js` |
| `npm run lint` | Runs ESLint on frontend code |

---

## 🌐 Deployment Guidelines

### Frontend (Vercel)
1. Go to your project on [Vercel Dashboard](https://vercel.com).
2. Go to **Settings** > **General**.
3. Under **Root Directory**, click **Edit** and set it to:
   ```text
   frontend
   ```
4. Save and redeploy. Vercel will automatically detect Next.js and build from `frontend/`.

### Backend (Render / Railway / Fly.io / VPS)
- **Root Directory**: `backend`
- **Build Command**: `npm install && npm run build`
- **Start Command**: `npm start`
- **Environment Variables**:
  - `PORT`: (provided automatically by Render/Railway or set to `5000`)
  - `GEMINI_API_KEY`: `your_gemini_api_key`

---

## 🤝 Contact & Profiles
- **LinkedIn**: [Anil Suva](https://www.linkedin.com/in/anil-suva-cte-gecbvn-it-441258290/)
- **GitHub**: [@AnilSuva](https://github.com/AnilSuva)
- **Email**: suvaanil80@gmail.com
