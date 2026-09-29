import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { ProjectCard } from "@/components/ProjectCard";
import { Footer } from "@/components/Footer";

export default async function Home() {
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

  const { data: featuredProjects } = await supabase
    .from('projects')
    .select('*')
    .eq('published', true)
    .eq('featured', true)
    .order('display_order', { ascending: true })
    .order('created_at', { ascending: false })
    .limit(4);

  return (
    <main className="flex-grow flex flex-col bg-slate-950 text-slate-200">
      {/* Navbar placeholder */}
      <header className="sticky top-0 z-50 w-full border-b border-slate-800 bg-slate-950/80 backdrop-blur">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold tracking-tighter text-white">WEB HUB</span>
          </Link>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <Link href="/" className="text-white hover:text-white transition-colors relative">
              Home
              <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-blue-500 rounded-full"></span>
            </Link>
            <Link href="/projects" className="hover:text-white transition-colors">Projects</Link>
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

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-24 md:py-32 lg:py-40 flex flex-col lg:flex-row items-center gap-12 relative">
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 translate-x-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="flex-1 space-y-8 z-10">
          <div className="inline-flex items-center rounded-full border border-slate-800 bg-slate-900/80 backdrop-blur px-3 py-1 text-sm font-medium text-slate-300">
            Hi, We're Web Hub 👋
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1]">
            WE BUILD MODERN <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500">
              WEB APPLICATIONS
            </span> <br />
            THAT MAKE AN IMPACT
          </h1>
          <p className="max-w-[600px] text-lg text-slate-400">
            We create fast, scalable and beautiful websites and web applications designed to help businesses grow.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Link 
              href="/projects" 
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-3.5 text-sm font-medium text-white shadow-lg shadow-blue-900/20 transition-all hover:opacity-90 hover:scale-[1.02]"
            >
              View Our Projects <ArrowUpRight className="ml-2 h-4 w-4" />
            </Link>
            <Link 
              href="https://www.instagram.com/web_hub.eg"
              target="_blank"
              className="inline-flex items-center justify-center rounded-full border border-slate-700 bg-slate-900/50 backdrop-blur px-8 py-3.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-slate-800"
            >
              Let's Talk
            </Link>
          </div>
        </div>
        <div className="flex-1 relative w-full aspect-video md:aspect-square lg:aspect-auto lg:h-[600px] rounded-2xl overflow-hidden border border-slate-800/50 bg-slate-900/50 backdrop-blur shadow-2xl flex items-center justify-center z-10">
          {/* Visual representing a modern web application */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-800/50 to-slate-950 flex items-center justify-center p-4 sm:p-8 overflow-hidden">
             {/* Abstract Laptop/Dashboard UI Mockup */}
             <div className="relative w-full max-w-xl aspect-[16/10] rounded-xl border border-slate-700/50 bg-[#0f172a] shadow-2xl overflow-hidden flex flex-col translate-x-4 sm:translate-x-8 translate-y-4 sm:translate-y-8 rotate-[-2deg] transform-gpu">
                <div className="h-10 border-b border-slate-800/80 flex items-center px-4 gap-2 bg-[#020617]">
                  <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                  <div className="mx-auto h-4 w-32 bg-slate-800 rounded-full"></div>
                </div>
                <div className="flex-1 flex bg-[#0f172a]">
                  <div className="w-48 border-r border-slate-800/50 p-4 space-y-4 hidden sm:block">
                     <div className="h-6 w-24 bg-slate-800/80 rounded"></div>
                     <div className="space-y-2 mt-8">
                        <div className="h-4 w-full bg-slate-800/60 rounded"></div>
                        <div className="h-4 w-5/6 bg-slate-800/60 rounded"></div>
                        <div className="h-4 w-full bg-slate-800/60 rounded"></div>
                        <div className="h-4 w-4/5 bg-slate-800/60 rounded"></div>
                     </div>
                  </div>
                  <div className="flex-1 p-6 flex flex-col gap-6">
                     <div className="h-8 w-1/3 bg-slate-800/80 rounded animate-pulse"></div>
                     <div className="grid grid-cols-3 gap-4">
                       <div className="h-24 bg-slate-800/40 border border-slate-700/30 rounded-lg p-3">
                          <div className="h-3 w-16 bg-slate-700/50 rounded mb-2"></div>
                          <div className="h-6 w-20 bg-blue-500/50 rounded"></div>
                       </div>
                       <div className="h-24 bg-slate-800/40 border border-slate-700/30 rounded-lg p-3">
                          <div className="h-3 w-16 bg-slate-700/50 rounded mb-2"></div>
                          <div className="h-6 w-24 bg-purple-500/50 rounded"></div>
                       </div>
                       <div className="h-24 bg-slate-800/40 border border-slate-700/30 rounded-lg p-3">
                          <div className="h-3 w-16 bg-slate-700/50 rounded mb-2"></div>
                          <div className="h-6 w-12 bg-green-500/50 rounded"></div>
                       </div>
                     </div>
                     <div className="flex-1 bg-slate-800/30 rounded-lg border border-slate-700/30 relative overflow-hidden">
                        {/* Fake chart line */}
                        <svg className="absolute bottom-0 w-full h-1/2 text-blue-500/30" preserveAspectRatio="none" viewBox="0 0 100 100">
                          <path d="M0 100 L 0 50 Q 15 20, 30 60 T 60 40 T 100 10 L 100 100 Z" fill="currentColor" />
                          <path d="M0 50 Q 15 20, 30 60 T 60 40 T 100 10" fill="none" stroke="#3b82f6" strokeWidth="2" />
                        </svg>
                     </div>
                  </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="container mx-auto px-4 py-24 relative z-10">
        <div className="mb-12">
          <p className="text-sm font-semibold tracking-wider text-slate-500 uppercase mb-2">MY PROJECTS</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">Featured Projects</h2>
          <p className="text-slate-400 max-w-2xl">A selection of websites and web applications we've built for businesses and brands.</p>
        </div>
        
        {featuredProjects && featuredProjects.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <div className="aspect-[21/9] rounded-2xl border border-slate-800 border-dashed flex items-center justify-center text-slate-500">
            No featured projects to display yet.
          </div>
        )}
      </section>

      {/* Tech Stack Section */}
      <section className="container mx-auto px-4 py-24 border-t border-slate-900 relative z-10">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold tracking-wider text-slate-500 uppercase mb-2">TECH STACK</p>
          <h2 className="text-3xl font-bold text-white tracking-tight">Technologies We Work With</h2>
        </div>
        
        <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
          {['Next.js', 'React', 'Tailwind CSS', 'TypeScript', 'Node.js', 'Supabase', 'MongoDB', 'Vercel'].map((tech) => (
            <div key={tech} className="flex flex-col items-center justify-center p-6 bg-slate-900/50 border border-slate-800 rounded-2xl w-32 h-32 hover:bg-slate-800 transition-colors">
              <div className="w-10 h-10 bg-slate-800 rounded-lg mb-4 flex items-center justify-center border border-slate-700">
                 {/* Placeholder for actual icons */}
                 <span className="text-lg font-bold text-slate-400">{tech.charAt(0)}</span>
              </div>
              <span className="text-xs font-medium text-slate-300">{tech}</span>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-24 border-t border-slate-900 relative z-10 text-center">
         <div className="max-w-2xl mx-auto flex flex-col items-center">
            <p className="text-sm font-semibold tracking-wider text-slate-500 uppercase mb-2">GET IN TOUCH</p>
            <h2 className="text-4xl font-bold text-white mb-4 tracking-tight">Let's Build Something Great</h2>
            <p className="text-slate-400 mb-8">Have a project in mind? We'd love to hear about it.</p>
            
            <Link 
              href="https://www.instagram.com/web_hub.eg" 
              target="_blank"
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-3.5 text-sm font-medium text-white shadow-lg shadow-blue-900/20 transition-all hover:opacity-90 hover:scale-[1.02]"
            >
              Contact Us <ArrowUpRight className="ml-2 h-4 w-4" />
            </Link>
         </div>
      </section>

      <Footer />
    </main>
  );
}
