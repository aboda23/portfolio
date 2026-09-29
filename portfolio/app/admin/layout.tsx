import { cookies } from 'next/headers';
import { createServerClient } from '@supabase/ssr';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
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

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/admin/login');
  }

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-200">
      <aside className="w-64 border-r border-slate-800 bg-slate-900/50 p-6 flex flex-col">
        <Link href="/admin" className="text-xl font-bold text-white mb-10 tracking-tighter">
          WEB HUB ADMIN
        </Link>
        <nav className="flex flex-col gap-2 flex-1">
          <Link href="/admin" className="px-4 py-2 rounded-lg hover:bg-slate-800 transition-colors">Dashboard</Link>
          <Link href="/admin/projects" className="px-4 py-2 rounded-lg hover:bg-slate-800 transition-colors">Projects</Link>
          <Link href="/admin/projects/new" className="px-4 py-2 rounded-lg hover:bg-slate-800 transition-colors">Add Project</Link>
        </nav>
        <div>
          <form action="/auth/signout" method="post">
            <button className="w-full px-4 py-2 text-left rounded-lg text-red-400 hover:bg-slate-800 transition-colors">
              Logout
            </button>
          </form>
        </div>
      </aside>
      <main className="flex-1 p-10">
        {children}
      </main>
    </div>
  )
}
