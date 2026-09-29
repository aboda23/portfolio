import { ProjectForm } from '@/components/admin/ProjectForm';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function NewProjectPage() {
  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <div className="flex items-center gap-4">
        <Link href="/admin/projects" className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors">
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-white">Add New Project</h1>
          <p className="text-slate-400">Create a new project for your portfolio.</p>
        </div>
      </div>
      
      <ProjectForm />
    </div>
  );
}
