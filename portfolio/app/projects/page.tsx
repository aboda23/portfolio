import { cookies } from 'next/headers';
import { createServerClient } from '@supabase/ssr';
import { ProjectCard } from "@/components/ProjectCard";
import { Footer } from "@/components/Footer";
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

export default async function ProjectsPage() {
  const cookieStore = cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
      },
    }
  )

  const { data: projects } = await supabase
    .from('projects')
    .select('*')
    .eq('published', true)
    .order('display_order', { ascending: true })
    .order('created_at', { ascending: false });

  return (
    <main className="flex-grow flex flex-col bg-slate-950 text-slate-200">
      <header className="sticky top-0 z-50 w-full border-b border-slate-800 bg-slate-950/80 backdrop-blur">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold tracking-tighter text-white">WEB HUB</span>
          </Link>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <Link href="/projects" className="text-white relative">
              Projects
              <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-blue-500 rounded-full"></span>
            </Link>
            <Link href="/about" className="hover:text-white transition-colors">About</Link>
            <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link 
              href="https://www.instagram.com/web_hub.eg" 
              target="_blank"
              className="inline-flex items-center justify-center rounded-full border border-slate-700 bg-slate-800 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-slate-700"
            >
              Let's Talk <ArrowUpRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-16 flex-grow">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">Our Work</h1>
          <p className="text-lg text-slate-400 max-w-2xl">
            Explore our portfolio of websites, web applications, and digital platforms.
          </p>
        </div>

        {projects && projects.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <div className="py-24 text-center border border-slate-800 border-dashed rounded-2xl bg-slate-900/50">
            <h3 className="text-xl font-medium text-white mb-2">Check back soon</h3>
            <p className="text-slate-400">We are currently updating our portfolio projects.</p>
          </div>
        )}
      </div>
      <Footer />
    </main>
  );
}
