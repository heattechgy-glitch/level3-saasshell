# level3-saasshell

**BOSS-built SaaS shell** — React + Vite + Tailwind (frontend), Supabase (backend), Deno/TypeScript (edge functions), Python (Modal)

---

## 🚀 Quick Start

### 1. Environment Variables

Create `.env` in the project root:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

Get these values from your [Supabase project dashboard](https://app.supabase.com) → Settings → API.

---

## 🗄️ Supabase Setup

### Required Tables

Run these SQL commands in your Supabase SQL Editor:

#### 1. Profiles Table
```sql
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  display_name TEXT,
  role TEXT DEFAULT 'user',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Users can read their own profile
CREATE POLICY "Users can read own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

-- Users can update their own profile
CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, display_name)
  VALUES (NEW.id, NEW.email, NEW.email);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```

#### 2. Activity Log Table
```sql
CREATE TABLE activity_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  action TEXT NOT NULL,
  details JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE activity_log ENABLE ROW LEVEL SECURITY;

-- Users can read their own activity
CREATE POLICY "Users can read own activity"
  ON activity_log FOR SELECT
  USING (auth.uid() = user_id);

-- Admins can read all activity
CREATE POLICY "Admins can read all activity"
  ON activity_log FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );
```

---

## 🔐 Set Admin Role

After signing up your first user, run this SQL command with your user ID:

```sql
UPDATE profiles
SET role = 'admin'
WHERE email = 'your-email@example.com';
```

Or use the user's UUID directly:

```sql
UPDATE profiles
SET role = 'admin'
WHERE id = 'user-uuid-here';
```

---

## 📦 Installation

```bash
npm install
npm run dev
```

Visit [http://localhost:5173](http://localhost:5173)

---

## 🎨 Tech Stack

- **Frontend**: React 18 + Vite + Tailwind CSS
- **Backend**: Supabase (PostgreSQL + Auth + Realtime)
- **Edge Functions**: Deno/TypeScript (Supabase)
- **Serverless**: Python (Modal)
- **Icons**: Lucide React
- **Charts**: Recharts
- **Routing**: React Router v6

---

## 📂 Project Structure

```
level3-saasshell/
├── src/
│   ├── components/       # Reusable UI components
│   ├── pages/            # Route pages (Home, Dashboard, Settings, Admin)
│   ├── lib/              # Supabase client, utilities
│   ├── App.jsx           # Main app with routing
│   └── main.jsx          # Entry point
├── public/               # Static assets
├── .env                  # Environment variables (create this)
└── README.md
```

---

## 🔑 Key Features

- ✅ **Authentication**: Email/password via Supabase Auth
- ✅ **Protected Routes**: Admin-only pages with role-based access
- ✅ **User Profiles**: Display name, email, role management
- ✅ **Activity Logging**: Track user actions with timestamps
- ✅ **Dark Theme**: Electric blue (#0ea5e9) branding
- ✅ **Responsive**: Mobile-first Tailwind design

---

## 🛠️ Common Commands

```bash
npm run dev          # Start dev server
npm run build        # Production build
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

---

## 📖 Usage

1. **Sign Up**: Create an account at `/signup`
2. **Set Admin**: Run SQL command to promote your account
3. **Dashboard**: View analytics at `/dashboard`
4. **Settings**: Update profile at `/settings`
5. **Admin Panel**: Manage users at `/admin` (admin role required)

---

## 🐛 Troubleshooting

**"Invalid API key" error**
- Check `.env` file exists and has correct `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`
- Restart dev server after changing `.env`

**"Row level security policy violation"**
- Confirm tables have RLS policies enabled (see SQL commands above)
- Check user is authenticated via `supabase.auth.getUser()`

**"Table does not exist"**
- Run all SQL commands in Supabase SQL Editor
- Verify table names match exactly: `profiles`, `activity_log`

---

Built with ⚡ by BOSS