import Link from 'next/link';
import { ArrowUpRight, Mail, MapPin } from 'lucide-react';
import { Footer } from "@/components/Footer";

export default function ContactPage() {
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
            <Link href="/about" className="hover:text-white transition-colors">About</Link>
            <Link href="/contact" className="text-white relative">
              Contact
              <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-blue-500 rounded-full"></span>
            </Link>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 py-24 flex-grow flex flex-col justify-center max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
           <div className="space-y-8">
             <div>
               <h1 className="text-5xl font-extrabold text-white tracking-tight mb-4">Let's Talk</h1>
               <p className="text-lg text-slate-400">
                 Ready to start your next project? Get in touch with us on social media or send us an email.
               </p>
             </div>
             
             <div className="space-y-6">
                <a href="https://www.instagram.com/web_hub.eg" target="_blank" className="flex items-center p-4 rounded-xl border border-slate-800 bg-slate-900/50 hover:bg-slate-800 transition-colors group">
                   <div className="w-12 h-12 rounded-lg bg-blue-600/20 text-blue-500 flex items-center justify-center mr-4">
                      <ArrowUpRight className="w-6 h-6 group-hover:scale-110 transition-transform" />
                   </div>
                   <div>
                     <div className="font-semibold text-white">Instagram</div>
                     <div className="text-sm text-slate-400">@web_hub.eg</div>
                   </div>
                </a>
                
                <a href="mailto:hello@webhub.eg" className="flex items-center p-4 rounded-xl border border-slate-800 bg-slate-900/50 hover:bg-slate-800 transition-colors group">
                   <div className="w-12 h-12 rounded-lg bg-purple-600/20 text-purple-500 flex items-center justify-center mr-4">
                      <Mail className="w-6 h-6 group-hover:scale-110 transition-transform" />
                   </div>
                   <div>
                     <div className="font-semibold text-white">Email</div>
                     <div className="text-sm text-slate-400">hello@webhub.eg</div>
                   </div>
                </a>
             </div>
           </div>

           <div className="p-8 rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl relative overflow-hidden">
             <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-[80px] pointer-events-none"></div>
             
             <h3 className="text-2xl font-bold text-white mb-6">Send a quick message</h3>
             <form className="space-y-4 relative z-10" onSubmit={(e) => e.preventDefault()}>
                <div>
                   <label className="block text-sm font-medium text-slate-300 mb-2">Name</label>
                   <input type="text" className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white focus:border-blue-500 focus:outline-none" />
                </div>
                <div>
                   <label className="block text-sm font-medium text-slate-300 mb-2">Email</label>
                   <input type="email" className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white focus:border-blue-500 focus:outline-none" />
                </div>
                <div>
                   <label className="block text-sm font-medium text-slate-300 mb-2">Message</label>
                   <textarea rows={4} className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white focus:border-blue-500 focus:outline-none"></textarea>
                </div>
                <button type="button" className="w-full rounded-lg bg-blue-600 px-4 py-3 font-medium text-white transition-colors hover:bg-blue-700">
                   Send Message
                </button>
             </form>
           </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
