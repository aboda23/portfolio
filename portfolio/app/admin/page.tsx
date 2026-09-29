import { cookies } from 'next/headers';
import { createServerClient } from '@supabase/ssr';
import { redirect } from 'next/navigation';

export default async function AdminDashboardPage() {
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

  const { count: totalProjects } = await supabase.from('projects').select('*', { count: 'exact', head: true });
  const { count: publishedProjects } = await supabase.from('projects').select('*', { count: 'exact', head: true }).eq('published', true);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Welcome back</h1>
        <p className="text-slate-400">Manage your portfolio and projects.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="p-6 rounded-xl border border-slate-800 bg-slate-900/50">
          <h3 className="text-sm font-medium text-slate-400 mb-2">Total Projects</h3>
          <p className="text-3xl font-bold text-white">{totalProjects || 0}</p>
        </div>
        <div className="p-6 rounded-xl border border-slate-800 bg-slate-900/50">
          <h3 className="text-sm font-medium text-slate-400 mb-2">Published</h3>
          <p className="text-3xl font-bold text-white">{publishedProjects || 0}</p>
        </div>
        <div className="p-6 rounded-xl border border-slate-800 bg-slate-900/50">
          <h3 className="text-sm font-medium text-slate-400 mb-2">Drafts</h3>
          <p className="text-3xl font-bold text-white">{(totalProjects || 0) - (publishedProjects || 0)}</p>
        </div>
      </div>
    </div>
  )
}
