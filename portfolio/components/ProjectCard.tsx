import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';

export function ProjectCard({ project }: { project: any }) {
  return (
    <div className="group rounded-2xl border border-slate-800 bg-slate-900/50 overflow-hidden hover:border-slate-700 transition-colors">
      <Link href={`/projects/${project.slug}`} className="block relative aspect-video overflow-hidden bg-slate-950">
        {project.media_type === 'video' ? (
          <video 
            src={project.media_url} 
            autoPlay 
            muted 
            loop 
            playsInline 
            className="w-full h-full object-cover group-hover:scale-105 group-hover:brightness-110 transition-all duration-500"
          />
        ) : (
          <Image 
            src={project.media_url} 
            alt={project.title} 
            fill 
            className="object-cover group-hover:scale-105 group-hover:brightness-110 transition-all duration-500"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </Link>
      
      <div className="p-6">
        <div className="text-xs font-semibold tracking-wider text-slate-500 uppercase mb-2">
          {project.category}
        </div>
        <h3 className="text-xl font-bold text-white mb-3">
          <Link href={`/projects/${project.slug}`} className="hover:text-blue-400 transition-colors">
            {project.title}
          </Link>
        </h3>
        <p className="text-sm text-slate-400 mb-6 line-clamp-2">
          {project.short_description}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-6">
          {project.technologies?.slice(0, 3).map((tech: string) => (
            <span key={tech} className="px-3 py-1 rounded-full text-xs font-medium bg-slate-800/80 text-slate-300 border border-slate-700/50">
              {tech}
            </span>
          ))}
          {project.technologies?.length > 3 && (
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-slate-800/80 text-slate-300 border border-slate-700/50">
              +{project.technologies.length - 3}
            </span>
          )}
        </div>
        
        <Link 
          href={`/projects/${project.slug}`}
          className="inline-flex items-center text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors group/link"
        >
          View Project <ArrowUpRight className="ml-1 h-4 w-4 transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
