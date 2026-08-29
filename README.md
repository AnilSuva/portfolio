# Anil Suva - Personal Portfolio

A modern, responsive, and SEO-optimized personal developer portfolio built with the Next.js App Router.

## 🚀 Live Demo
[View Live Portfolio](https://portfolio-nu-hazel-79.vercel.app/) *(Update with your actual Vercel/live URL when deployed)*

## ✨ Features
- **Modern Tech Stack**: Built with Next.js 15+, React 19, and TypeScript.
- **Premium Design**: Dark-themed UI with emerald green accents, glassmorphism, and subtle glow effects using Tailwind CSS v4.
- **Fully Responsive**: Flawless experience across mobile, tablet, and desktop screens.
- **Performance & SEO Optimized**: Pre-rendered static pages, custom metadata, and JSON-LD structured data for superior search engine ranking.
- **Working Contact Form**: Integrated with Web3Forms to receive emails directly without needing a backend server.
- **Smooth Navigation**: Native smooth scrolling and sticky glass navigation bar.

## 🛠️ Built With
- **[Next.js](https://nextjs.org/)** - React framework for production
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework (v4)
- **[TypeScript](https://www.typescriptlang.org/)** - Static typing for robust code
- **[Lucide React](https://lucide.dev/)** - Beautiful, consistent icons
- **[Web3Forms](https://web3forms.com/)** - Contact form backend

## 💻 Getting Started

To run this project locally, follow these steps:

1. **Clone the repository**
   ```bash
   git clone https://github.com/AnilSuva/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables (optional)**
   If you want to hide your Web3Forms access key, create a `.env.local` file in the root directory and add:
   ```env
   NEXT_PUBLIC_WEB3FORMS_KEY=your_access_key_here
   ```
   *(Note: You will need to update `Contact.tsx` to use this environment variable if you do this).*

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open the app**
   Navigate to [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## 📁 Project Structure
- `/app` - Next.js App Router (pages, layout, global styles, SEO config)
- `/components` - Reusable UI components (Hero, Navbar, Projects, Contact, etc.)
- `/data` - Centralized data file (`portfolio.ts`) containing all text, skills, and project data for easy updating.
- `/public` - Static assets like images and favicons.

## 🤝 Let's Connect
- **LinkedIn**: [Anil Suva](https://www.linkedin.com/in/anil-suva-cte-gecbvn-it-441258290/)
- **GitHub**: [@AnilSuva](https://github.com/AnilSuva)
- **Email**: suvaanil80@gmail.com
