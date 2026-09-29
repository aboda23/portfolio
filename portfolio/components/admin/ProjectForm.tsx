'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createBrowserClient } from '@supabase/ssr';
import { MediaUploader } from './MediaUploader';
import toast from 'react-hot-toast';

export function ProjectForm({ initialData = null }: { initialData?: any }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    category: initialData?.category || '',
    short_description: initialData?.short_description || '',
    full_description: initialData?.full_description || '',
    live_url: initialData?.live_url || '',
    github_url: initialData?.github_url || '',
    technologies: initialData?.technologies ? initialData.technologies.join(', ') : '',
    featured: initialData?.featured || false,
    published: initialData?.published || false,
    display_order: initialData?.display_order || 0,
    media_url: initialData?.media_url || '',
    media_type: initialData?.media_type || 'image',
    thumbnail_url: initialData?.thumbnail_url || ''
  });

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const generateSlug = (title: string) => {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
  };

  const handleSubmit = async (e: React.FormEvent, isDraft: boolean = false) => {
    e.preventDefault();
    
    if (!formData.media_url) {
      toast.error('Please upload media for the project.');
      return;
    }

    setLoading(true);

    try {
      const slug = generateSlug(formData.title);
      const technologiesArray = formData.technologies.split(',').map((t: string) => t.trim()).filter(Boolean);

      const payload = {
        title: formData.title,
        slug,
        category: formData.category,
        short_description: formData.short_description,
        full_description: formData.full_description,
        live_url: formData.live_url || null,
        github_url: formData.github_url || null,
        technologies: technologiesArray,
        featured: formData.featured,
        published: !isDraft && formData.published, // If save draft, force published=false
        display_order: parseInt(formData.display_order.toString()),
        media_url: formData.media_url,
        media_type: formData.media_type,
        thumbnail_url: formData.thumbnail_url || formData.media_url // fallback to media_url if image
      };

      let error;

      if (initialData?.id) {
        const { error: updateError } = await supabase
          .from('projects')
          .update(payload)
          .eq('id', initialData.id);
        error = updateError;
      } else {
        const { error: insertError } = await supabase
          .from('projects')
          .insert([payload]);
        error = insertError;
      }

      if (error) throw error;

      toast.success(initialData ? 'Project updated successfully.' : 'Project created successfully.');
      router.push('/admin/projects');
      router.refresh();

    } catch (err: any) {
      toast.error(err.message || 'Error saving project');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="space-y-8" onSubmit={(e) => handleSubmit(e)}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="p-6 rounded-xl border border-slate-800 bg-slate-900/50 space-y-4">
            <h2 className="text-xl font-bold text-white mb-4">Project Details</h2>
            
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Project Title</label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-2 text-white focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Category</label>
              <input
                type="text"
                required
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-2 text-white focus:border-blue-500 focus:outline-none"
                placeholder="e.g. Travel & Tourism"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Short Description</label>
              <textarea
                required
                rows={2}
                value={formData.short_description}
                onChange={(e) => setFormData({...formData, short_description: e.target.value})}
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-2 text-white focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Full Description</label>
              <textarea
                required
                rows={5}
                value={formData.full_description}
                onChange={(e) => setFormData({...formData, full_description: e.target.value})}
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-2 text-white focus:border-blue-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="p-6 rounded-xl border border-slate-800 bg-slate-900/50 space-y-4">
            <h2 className="text-xl font-bold text-white mb-4">Media</h2>
            <MediaUploader 
              currentMediaUrl={formData.media_url}
              currentMediaType={formData.media_type as any}
              onUploadSuccess={(url, type) => {
                setFormData({
                  ...formData,
                  media_url: url,
                  media_type: type,
                  thumbnail_url: type === 'image' ? url : formData.thumbnail_url
                });
              }}
              onClear={() => setFormData({...formData, media_url: '', media_type: 'image'})}
            />
          </div>
        </div>

        <div className="space-y-6">
          <div className="p-6 rounded-xl border border-slate-800 bg-slate-900/50 space-y-4">
            <h2 className="text-xl font-bold text-white mb-4">Publishing</h2>
            
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-slate-300">Published</label>
              <input
                type="checkbox"
                checked={formData.published}
                onChange={(e) => setFormData({...formData, published: e.target.checked})}
                className="rounded border-slate-700 bg-slate-950 text-blue-600 focus:ring-blue-500 w-5 h-5"
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-slate-300">Featured</label>
              <input
                type="checkbox"
                checked={formData.featured}
                onChange={(e) => setFormData({...formData, featured: e.target.checked})}
                className="rounded border-slate-700 bg-slate-950 text-blue-600 focus:ring-blue-500 w-5 h-5"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Display Order</label>
              <input
                type="number"
                value={formData.display_order}
                onChange={(e) => setFormData({...formData, display_order: parseInt(e.target.value) || 0})}
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-2 text-white focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div className="pt-4 border-t border-slate-800 space-y-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-700 disabled:opacity-50"
              >
                {loading ? 'Publishing...' : 'Publish Project'}
              </button>
              <button
                type="button"
                onClick={(e) => handleSubmit(e, true)}
                disabled={loading}
                className="w-full rounded-lg bg-slate-800 px-4 py-2 font-medium text-white transition-colors hover:bg-slate-700 disabled:opacity-50"
              >
                Save Draft
              </button>
            </div>
          </div>

          <div className="p-6 rounded-xl border border-slate-800 bg-slate-900/50 space-y-4">
            <h2 className="text-xl font-bold text-white mb-4">Metadata & Links</h2>
            
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Technologies (comma separated)</label>
              <input
                type="text"
                value={formData.technologies}
                onChange={(e) => setFormData({...formData, technologies: e.target.value})}
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-2 text-white focus:border-blue-500 focus:outline-none"
                placeholder="Next.js, Tailwind, Supabase"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Live Website URL</label>
              <input
                type="url"
                value={formData.live_url}
                onChange={(e) => setFormData({...formData, live_url: e.target.value})}
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-2 text-white focus:border-blue-500 focus:outline-none"
                placeholder="https://..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">GitHub URL</label>
              <input
                type="url"
                value={formData.github_url}
                onChange={(e) => setFormData({...formData, github_url: e.target.value})}
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-2 text-white focus:border-blue-500 focus:outline-none"
                placeholder="https://github.com/..."
              />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
