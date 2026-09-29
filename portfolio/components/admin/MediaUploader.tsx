'use client';

import { useState } from 'react';
import { createBrowserClient } from '@supabase/ssr';
import { Upload, X, FileImage, FileVideo } from 'lucide-react';
import toast from 'react-hot-toast';

interface MediaUploaderProps {
  onUploadSuccess: (url: string, type: 'image' | 'video') => void;
  currentMediaUrl?: string;
  currentMediaType?: 'image' | 'video';
  onClear?: () => void;
}

export function MediaUploader({ onUploadSuccess, currentMediaUrl, currentMediaType, onClear }: MediaUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [preview, setPreview] = useState<string | null>(currentMediaUrl || null);
  const [mediaType, setMediaType] = useState<'image' | 'video' | null>(currentMediaType || null);

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = e.target.files?.[0];
      if (!file) return;

      const isImage = file.type.startsWith('image/');
      const isVideo = file.type.startsWith('video/');

      if (!isImage && !isVideo) {
        toast.error('Only images (PNG, JPG, WEBP) or videos (MP4, WEBM) are supported.');
        return;
      }

      if (isImage && file.size > 10 * 1024 * 1024) {
        toast.error('Image must be less than 10MB.');
        return;
      }

      if (isVideo && file.size > 50 * 1024 * 1024) {
        toast.error('Video must be less than 50MB.');
        return;
      }

      setUploading(true);
      setMediaType(isImage ? 'image' : 'video');
      
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `projects/${fileName}`;

      const { error: uploadError, data } = await supabase.storage
        .from('project-media')
        .upload(filePath, file, {
          upsert: false
        });

      if (uploadError) {
        throw uploadError;
      }

      const { data: { publicUrl } } = supabase.storage
        .from('project-media')
        .getPublicUrl(filePath);

      setPreview(publicUrl);
      onUploadSuccess(publicUrl, isImage ? 'image' : 'video');
      toast.success('Media uploaded successfully');

    } catch (error: any) {
      toast.error(error.message || 'Error uploading file');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="w-full">
      {preview ? (
        <div className="relative rounded-lg border border-slate-700 overflow-hidden bg-slate-900 group">
          {mediaType === 'image' ? (
            <img src={preview} alt="Preview" className="w-full h-64 object-cover" />
          ) : (
            <video src={preview} className="w-full h-64 object-cover" controls muted />
          )}
          
          <button
            type="button"
            onClick={() => {
              setPreview(null);
              setMediaType(null);
              onClear?.();
            }}
            className="absolute top-2 right-2 p-2 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <X size={16} />
          </button>
        </div>
      ) : (
        <div className="flex items-center justify-center w-full">
          <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-slate-700 border-dashed rounded-lg cursor-pointer bg-slate-900 hover:bg-slate-800 transition-colors">
            <div className="flex flex-col items-center justify-center pt-5 pb-6 text-slate-400">
              {uploading ? (
                <div className="text-sm">Uploading...</div>
              ) : (
                <>
                  <Upload className="w-8 h-8 mb-4 text-slate-500" />
                  <p className="mb-2 text-sm"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                  <p className="text-xs text-slate-500">PNG, JPG, WEBP (Max 10MB) or MP4, WEBM (Max 50MB)</p>
                </>
              )}
            </div>
            <input 
              type="file" 
              className="hidden" 
              accept="image/png, image/jpeg, image/webp, video/mp4, video/webm"
              onChange={handleFileChange}
              disabled={uploading}
            />
          </label>
        </div>
      )}
    </div>
  );
}
