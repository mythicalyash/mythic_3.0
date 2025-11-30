# Mythics Campus Hub

Mythics Campus Hub is a comprehensive Next.js application designed to serve as a digital platform for university students and administrators. It features a robust student dashboard with AI-powered tools, campus navigation, community engagement, and study resources, alongside a dedicated admin panel for management.

## Features

### Student Dashboard
- **AI Tools**: Access to a suite of AI-powered utilities including:
  - **AI Writer**: Generate content for essays and reports.
  - **Code Assistant**: Get help with programming tasks.
  - **Image Generator**: Create images from text descriptions.
  - **Document Analyzer**: Upload and analyze PDF/text documents.
  - **Notes Summarizer**: Summarize long notes or documents.
- **Campus Map**: Interactive map with key locations, descriptions, and directions.
- **Clubs & Community**: Browse and join student clubs, view ratings, and visit club websites.
- **Lost & Found**: Report lost items or claim found items with a tracking system.
- **Nearby Places**: Discover restaurants, cafes, ATMs, and more around the campus.
- **Study Hub**: Access study materials and resources categorized by subject and department.
- **Query Forum**: Q&A platform for students to ask questions and share knowledge.
- **Feedback Center**: Submit feedback, report issues, or suggest features.
- **Profile**: View personal stats, achievements, badges, and activity history.

### Admin Panel
- **Dashboard**: Overview of student applicants and quick stats.
- **Announcements**: Create, edit, and delete campus-wide announcements.
- **Lost & Found Management**: Review and approve claims for found items.
- **Study Hub Management**: Add new subjects and upload study resources.
- **Feedback Review**: Review and manage student feedback.
- **Leaderboard**: View top-performing students based on points and badges.

## Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [Shadcn UI](https://ui.shadcn.com/) / Radix UI
- **Icons**: [Lucide React](https://lucide.dev/)
- **AI Integration**: [Google Gemini API](https://ai.google.dev/)
- **PDF Processing**: `pdf2json`
- **Theming**: `next-themes` (Light/Dark mode)

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or pnpm

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/your-username/mythics-campus-hub.git
    cd mythics-campus-hub
    ```

2.  Install dependencies:
    ```bash
    npm install
    # or
    pnpm install
    ```

3.  Set up environment variables:
    Create a `.env.local` file in the root directory and add your Gemini API key:
    ```env
    GEMINI_API_KEY=your_google_gemini_api_key
    ```

4.  Run the development server:
    ```bash
    npm run dev
    ```

5.  Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

- `app/`: Next.js App Router pages and API routes.
  - `(dashboard)/`: Student-facing pages.
  - `admin/`: Admin-facing pages.
  - `api/`: Backend API routes.
- `components/`: Reusable UI components.
- `data/`: Mock JSON data files.
- `lib/`: Utility functions and configurations (e.g., AI config).
- `public/`: Static assets and uploads.

## Note

This project currently uses mock data stored in JSON files for demonstration purposes. In a production environment, this should be replaced with a real database (e.g., PostgreSQL, MongoDB) and a proper authentication system.
