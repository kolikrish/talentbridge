# TalentBridge 🚀

TalentBridge is a modern job portal application built with React, combining a seamless user experience with powerful job searching and posting capabilities. It allows users to browse job listings, save their favorite jobs, and easily apply, while also providing employers with a comprehensive flow to post and manage job openings. 

## Features

- **User Authentication**: Secure sign-up and login utilizing [Clerk](https://clerk.com/).
- **Job Discovery & Listing**: Browse available jobs, filter through categories, and explore job details.
- **Candidate Onboarding**: Custom onboarding flow tailored for both recruiters and job seekers.
- **Save & Apply**: Save favorite jobs and apply seamlessly.
- **Post Jobs**: Dedicated portals for recruiters to post and manage jobs.
- **Protected Routes**: Secure navigation ensuring privacy and controlled access.
- **Modern UI/UX**: Designed using Tailwind CSS with immersive animations using Framer Motion.

## Tech Stack

- **Frontend**: React (v19) via Vite
- **Routing**: React Router DOM (v7)
- **Styling**: Tailwind CSS
- **Authentication**: Clerk
- **Backend/Database**: Supabase
- **Forms & Validation**: React Hook Form, Zod
- **Icons & Animations**: Lucide React, Framer Motion

## Getting Started

### Prerequisites

Ensure you have Node.js installed.

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd talentbridge
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Setup Environment Variables:
   Create a `.env.local` file in the root directory and configure your essential keys:
   ```env
   VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:5173](http://localhost:5173) to view the app in the browser.

## Scripts

- `npm run dev` - Starts the Vite development server.
- `npm run build` - Builds the application for production.
- `npm run lint` - Lints the codebase utilizing ESLint.
- `npm run preview` - Previews the production build locally.
