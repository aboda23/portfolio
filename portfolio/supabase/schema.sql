-- Enable pgcrypto for UUID generation
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Create projects table
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  category TEXT NOT NULL,
  short_description TEXT NOT NULL,
  full_description TEXT NOT NULL,
  media_type TEXT NOT NULL CHECK (media_type IN ('image', 'video')),
  media_url TEXT NOT NULL,
  thumbnail_url TEXT,
  live_url TEXT,
  github_url TEXT,
  technologies TEXT[] NOT NULL DEFAULT '{}',
  featured BOOLEAN NOT NULL DEFAULT false,
  published BOOLEAN NOT NULL DEFAULT false,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Create policy for public to read published projects
CREATE POLICY "Public can view published projects"
  ON projects
  FOR SELECT
  USING (published = true);

-- Create policy for authenticated users (admins) to manage all projects
CREATE POLICY "Admins can manage all projects"
  ON projects
  FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- Create storage bucket for project media
INSERT INTO storage.buckets (id, name, public) VALUES ('project-media', 'project-media', true);

-- Storage policies
CREATE POLICY "Public Access"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'project-media');

CREATE POLICY "Admin Upload Access"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'project-media' AND auth.role() = 'authenticated');

CREATE POLICY "Admin Update Access"
  ON storage.objects FOR UPDATE
  USING (bucket_id = 'project-media' AND auth.role() = 'authenticated');

CREATE POLICY "Admin Delete Access"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'project-media' AND auth.role() = 'authenticated');
