# Database Setup Guide

## Creating the Todos Table in Supabase

Follow these steps to set up your database:

### 1. Navigate to SQL Editor
- Go to your Supabase project dashboard
- Click on "SQL Editor" in the left sidebar
- Click "New Query"

### 2. Run the Setup SQL

Copy and paste this SQL script:

```sql
-- Create todos table
CREATE TABLE IF NOT EXISTS todos (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Create index for performance
CREATE INDEX IF NOT EXISTS todos_created_at_idx ON todos(created_at DESC);

-- Enable Row Level Security
ALTER TABLE todos ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for public access
-- WARNING: These policies allow full public access. Use authentication for production!

CREATE POLICY "Allow public read" ON todos
  FOR SELECT USING (true);

CREATE POLICY "Allow public insert" ON todos
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public update" ON todos
  FOR UPDATE USING (true) WITH CHECK (true);

CREATE POLICY "Allow public delete" ON todos
  FOR DELETE USING (true);

-- Grant permissions
GRANT ALL ON todos TO public;
```

### 3. Execute the Query
- Click "Run" to execute the SQL
- You should see a success message

### 4. Verify the Table
- Click "Table Editor" in the left sidebar
- You should see the "todos" table in the list

## Environment Setup

1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Get your Supabase credentials:
   - Go to Settings > API
   - Copy your "Project URL" → `NEXT_PUBLIC_SUPABASE_URL`
   - Copy your "anon public" key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

3. Paste into `.env.local`:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
   ```

## Production Security Notes

Before deploying to production:

1. **Implement Authentication**: Replace public RLS policies with user-based authentication
   ```sql
   -- Example authenticated policy
   CREATE POLICY "Users can read own todos" ON todos
     FOR SELECT USING (auth.uid() = user_id);
   ```

2. **Add User ID Column**: 
   ```sql
   ALTER TABLE todos ADD COLUMN user_id UUID REFERENCES auth.users;
   ```

3. **Use Supabase Auth**: Implement email/OAuth authentication in your app

4. **Enable HTTPS**: Always use HTTPS in production

5. **Rotate Keys**: Regularly rotate your API keys

## Troubleshooting

### Connection Error
- Verify `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are correct
- Check that your Supabase project is active

### Permission Denied
- Make sure RLS policies are properly created
- Verify the public role has proper permissions

### Real-time Not Working
- Ensure the todos table exists and has data
- Check that real-time is enabled in Supabase settings

## Testing

Once set up, test the connection:

```bash
npm install
npm run dev
```

Visit `http://localhost:3000` and try creating a todo.
