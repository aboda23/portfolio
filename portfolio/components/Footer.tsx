import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950/80 mt-24">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm font-semibold tracking-tighter text-white">
            WEB HUB
          </div>
          <div className="text-xs text-slate-500">
            © 2026 Web Hub. All rights reserved.
          </div>
          <div className="flex items-center gap-4 text-sm text-slate-400">
            <Link href="https://www.instagram.com/web_hub.eg" target="_blank" className="hover:text-white transition-colors">
              Instagram
            </Link>
            <Link href="#" className="hover:text-white transition-colors">LinkedIn</Link>
            <Link href="#" className="hover:text-white transition-colors">GitHub</Link>
            <Link href="mailto:contact@webhub.eg" className="hover:text-white transition-colors">Email</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
