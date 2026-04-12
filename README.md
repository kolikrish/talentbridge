# TalentBridge 🚀

TalentBridge is a premium, high-end job portal application designed with a minimalist aesthetic and a focus on visual excellence. Built with React and powered by Supabase, it offers a sophisticated platform for global talent and world-class companies to connect through intelligent matching and a seamless, performant user experience.

## ✨ Premium UI/UX
- **High-End Aesthetic**: Pure white theme with a sophisticated dark palette and subtle elevation.
- **Modern Typography**: Custom **Gilroy** font hierarchy (Bold & Light) for a professional, editorial feel.
- **Glassmorphism & Motion**: Immersive animations using Framer Motion and sleek, rounded-edge components (`2.5rem` radius).
- **Responsive Mastery**: Fully optimized for every device, from mobile to ultra-wide displays.

## 🚀 Features
- **Intelligent Matching**: AI-driven job searching and candidate filtering.
- **Secure Authentication**: Robust user management integrated with [Clerk](https://clerk.com/).
- **Dual-Mode Onboarding**: Specialized onboarding flows for both **Recruiters** and **Candidates**.
- **Job Lifecycle Management**: Post, manage, save, and apply for roles with real-time status tracking.
- **Rich Interaction**: Real-time feedback and dynamic form handling for seamless recruitment.

## 📦 Getting Started

### Prerequisites
- Node.js (v20+)
- Docker (optional, for containerized development)

### Local Development (Standard)

1. **Clone & Install**:
   ```bash
   git clone https://github.com/kolikrish/Talentbridge
   cd talentbridge
   npm install
   ```

2. **Environment Setup**:
   Create a `.env.local` file and add your keys:
   ```env
   VITE_CLERK_PUBLISHABLE_KEY=your_clerk_key
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

3. **Launch**:
   ```bash
   npm run dev
   ```

### Local Development (Docker)
Ensure your `.env.local` is configured as shown above.
```bash
docker-compose up --build
```
The app will be accessible at [http://localhost:5173](http://localhost:5173).

## 🌍 Deployment
TalentBridge is optimized for deployment on **Vercel**. 
1. Connect your GitHub repository to Vercel.
2. Add your `.env.local` variables to the Vercel Project Settings.
3. Deploy!

## 📜 Scripts
- `npm run dev` - Start development server.
- `npm run build` - Create production bundle.
- `npm run lint` - Run ESLint checks.
- `npm run preview` - Preview production build.

---