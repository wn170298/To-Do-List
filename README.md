# To-Do List App

A full-stack to-do list application built with Next.js and Supabase, deployable on Vercel.

## Features

- ✅ Create, read, update, and delete todos
- ✅ Mark todos as complete/incomplete
- ✅ Real-time updates using Supabase
- ✅ Beautiful, responsive UI with Tailwind CSS
- ✅ TypeScript support
- ✅ Cloud database with Supabase
- ✅ Vercel deployment ready

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: Supabase (PostgreSQL)
- **Deployment**: Vercel

## Prerequisites

- Node.js 18+ and npm/yarn
- A Supabase account (https://supabase.com)
- A Vercel account (https://vercel.com)

## Setup Instructions

### 1. Clone the Repository

```bash
git clone <repository-url>
cd todo-list-app
npm install
```

### 2. Set Up Supabase

1. Create a new project on [Supabase](https://supabase.com)
2. In your Supabase project, go to **SQL Editor** and run this SQL to create the todos table:

```sql
CREATE TABLE todos (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Create an index for better performance
CREATE INDEX todos_created_at_idx ON todos(created_at DESC);

-- Enable RLS (Row Level Security) - for public access
ALTER TABLE todos ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (development only - secure before production)
CREATE POLICY "Allow public read" ON todos
  FOR SELECT USING (true);

CREATE POLICY "Allow public insert" ON todos
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public update" ON todos
  FOR UPDATE USING (true);

CREATE POLICY "Allow public delete" ON todos
  FOR DELETE USING (true);
```

3. Get your credentials:
   - Go to **Settings > API** in Supabase
   - Copy your `Project URL` and `anon public` key

### 3. Environment Variables

Create a `.env.local` file in the root directory:

```
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

### 4. Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment to Vercel

### 1. Push to GitHub

```bash
git add .
git commit -m "Initial commit"
git push origin main
```

### 2. Deploy on Vercel

1. Go to [Vercel](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
5. Click "Deploy"

Your app will be live on Vercel!

## Project Structure

```
/
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Home page with main logic
│   └── globals.css         # Global styles
├── components/
│   ├── TodoForm.tsx        # Add todo form component
│   └── TodoList.tsx        # Todo list display component
├── lib/
│   └── supabase.ts         # Supabase client initialization
├── package.json            # Dependencies
├── tsconfig.json           # TypeScript configuration
├── tailwind.config.ts      # Tailwind CSS configuration
├── next.config.js          # Next.js configuration
└── .env.local              # Environment variables (not in git)
```

## Security Notes

- The current setup uses public RLS policies for development purposes
- **Before production**, implement proper authentication and row-level security
- Never commit `.env.local` to version control (it's in `.gitignore`)
- Use Supabase authentication (Email, OAuth, etc.) for production

## Future Enhancements

- User authentication
- Categories/Projects for todos
- Priority levels
- Due dates and reminders
- Dark mode
- Share lists with others

## License

MIT

## Support

For issues or questions, please open an issue on GitHub.
Day to Day To Do List
