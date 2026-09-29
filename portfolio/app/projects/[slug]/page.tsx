import { cookies } from 'next/headers';
import { createServerClient } from '@supabase/ssr';
import { notFound } from 'next/navigation';
import { Footer } from "@/components/Footer";
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight, Github } from 'lucide-react';
import Image from 'next/image';

export default async function ProjectDetailPage({ params }: { params: { slug: string } }) {
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

  const { data: project } = await supabase
    .from('projects')
    .select('*')
    .eq('slug', params.slug)
    .eq('published', true)
    .single();

  if (!project) {
    notFound();
  }

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
        </div>
      </header>

      <div className="container mx-auto px-4 py-12 flex-grow">
        <Link href="/projects" className="inline-flex items-center text-sm font-medium text-slate-400 hover:text-white transition-colors mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Projects
        </Link>

        <div className="mb-10 space-y-4">
          <div className="text-sm font-semibold tracking-wider text-blue-500 uppercase">{project.category}</div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight">{project.title}</h1>
        </div>

        <div className="relative w-full aspect-video md:aspect-[21/9] rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 mb-12 shadow-2xl">
          {project.media_type === 'video' ? (
            <video 
              src={project.media_url} 
              autoPlay 
              muted 
              loop 
              playsInline 
              controls
              className="w-full h-full object-cover"
            />
          ) : (
            <Image 
              src={project.media_url} 
              alt={project.title} 
              fill 
              className="object-cover"
              priority
            />
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
          <div className="lg:col-span-2 space-y-8 text-lg text-slate-300 leading-relaxed">
             <h2 className="text-2xl font-bold text-white mb-4">About the Project</h2>
             <div className="whitespace-pre-wrap">{project.full_description}</div>
          </div>
          
          <div className="space-y-8">
            <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/50 space-y-6">
               <h3 className="text-xl font-bold text-white">Project Details</h3>
               
               <div>
                  <h4 className="text-sm font-medium text-slate-500 mb-3">Technologies Used</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies?.map((tech: string) => (
                      <span key={tech} className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 text-slate-300 border border-slate-700">
                        {tech}
                      </span>
                    ))}
                  </div>
               </div>

               <div className="pt-6 border-t border-slate-800 space-y-3">
                  {project.live_url && (
                    <Link 
                      href={project.live_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-full rounded-lg bg-blue-600 px-4 py-3 font-medium text-white transition-colors hover:bg-blue-700"
                    >
                      Visit Website <ArrowUpRight className="ml-2 h-4 w-4" />
                    </Link>
                  )}
                  {project.github_url && (
                    <Link 
                      href={project.github_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 font-medium text-white transition-colors hover:bg-slate-700"
                    >
                      <Github className="mr-2 h-4 w-4" /> View Source
                    </Link>
                  )}
               </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
