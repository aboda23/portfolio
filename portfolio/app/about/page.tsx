import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Footer } from "@/components/Footer";

export default function AboutPage() {
  return (
    <main className="flex-grow flex flex-col bg-slate-950 text-slate-200">
      <header className="sticky top-0 z-50 w-full border-b border-slate-800 bg-slate-950/80 backdrop-blur">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold tracking-tighter text-white">WEB HUB</span>
          </Link>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <Link href="/projects" className="hover:text-white transition-colors">Projects</Link>
            <Link href="/about" className="text-white relative">
              About
              <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-blue-500 rounded-full"></span>
            </Link>
            <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 py-24 flex-grow flex flex-col items-center text-center">
        <div className="max-w-3xl space-y-8">
           <h1 className="text-5xl font-extrabold text-white tracking-tight">We Build Digital Experiences</h1>
           <p className="text-xl text-slate-400 leading-relaxed">
             Web Hub is a premium development team specializing in creating fast, scalable, and beautifully designed digital products. 
           </p>
           <p className="text-lg text-slate-400 leading-relaxed">
             From highly-converting landing pages to complex data-driven dashboards and full-stack web applications, we focus on writing clean code and delivering exceptional user experiences.
           </p>

           <div className="pt-12 grid grid-cols-1 sm:grid-cols-2 gap-8 text-left">
              <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800">
                 <h3 className="text-xl font-bold text-white mb-3">Our Focus</h3>
                 <ul className="space-y-2 text-slate-400">
                    <li>• Modern Websites</li>
                    <li>• Web Applications</li>
                    <li>• Business Dashboards</li>
                    <li>• E-commerce Platforms</li>
                 </ul>
              </div>
              <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800">
                 <h3 className="text-xl font-bold text-white mb-3">Core Stack</h3>
                 <ul className="space-y-2 text-slate-400">
                    <li>• Next.js & React</li>
                    <li>• TypeScript</li>
                    <li>• Tailwind CSS</li>
                    <li>• Supabase & Node.js</li>
                 </ul>
              </div>
           </div>

           <div className="pt-12">
             <Link 
               href="https://www.instagram.com/web_hub.eg" 
               target="_blank"
               className="inline-flex items-center justify-center rounded-full bg-blue-600 px-8 py-3.5 text-sm font-medium text-white transition-all hover:bg-blue-700"
             >
               Work With Us <ArrowUpRight className="ml-2 h-4 w-4" />
             </Link>
           </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
