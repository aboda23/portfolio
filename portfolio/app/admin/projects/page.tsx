import { cookies } from 'next/headers';
import { createServerClient } from '@supabase/ssr';
import Link from 'next/link';
import Image from 'next/image';

export default async function AdminProjectsPage() {
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

  const { data: projects, error } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Projects</h1>
          <p className="text-slate-400">Manage your portfolio projects.</p>
        </div>
        <Link 
          href="/admin/projects/new" 
          className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-700"
        >
          + Add New Project
        </Link>
      </div>

      <div className="rounded-xl border border-slate-800 bg-slate-900/50 overflow-hidden">
        <table className="w-full text-left text-sm text-slate-400">
          <thead className="bg-slate-800/50 text-xs uppercase text-slate-300 border-b border-slate-800">
            <tr>
              <th className="px-6 py-4 font-medium">Project</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium">Featured</th>
              <th className="px-6 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {!projects || projects.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-12 text-center">
                  Your portfolio is waiting for its first project.
                  <br />
                  <Link href="/admin/projects/new" className="text-blue-500 hover:underline mt-2 inline-block">
                    Add Your First Project
                  </Link>
                </td>
              </tr>
            ) : (
              projects.map((project) => (
                <tr key={project.id} className="hover:bg-slate-800/20 transition-colors">
                  <td className="px-6 py-4 flex items-center gap-4">
                    <div className="h-12 w-16 bg-slate-800 rounded flex-shrink-0 overflow-hidden relative">
                      {project.thumbnail_url ? (
                        <Image src={project.thumbnail_url} alt={project.title} fill className="object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-xs text-slate-600">No Img</div>
                      )}
                    </div>
                    <div>
                      <div className="font-medium text-slate-200">{project.title}</div>
                      <div className="text-xs text-slate-500">{project.category}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${project.published ? 'bg-green-900/30 text-green-400 border border-green-800/50' : 'bg-slate-800 text-slate-400'}`}>
                      {project.published ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {project.featured ? (
                      <span className="text-yellow-500">★ Yes</span>
                    ) : (
                      <span>-</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link href={`/admin/projects/${project.id}/edit`} className="text-blue-500 hover:text-blue-400 font-medium mr-4">
                      Edit
                    </Link>
                    <button className="text-red-500 hover:text-red-400 font-medium">
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
