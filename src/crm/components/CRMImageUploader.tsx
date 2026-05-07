/**
 * PROTOTYPE — images are stored as data URLs in localStorage.
 * In production replace with presigned-URL uploads and store only the URL string.
 */
import { useRef } from 'react';
import { Upload, Star, Trash2, Image as ImageIcon } from 'lucide-react';

interface UploaderValue {
  featuredImageUrl?: string;
  galleryUrls?: string[];
}

interface CRMImageUploaderProps {
  value: UploaderValue;
  onChange: (v: UploaderValue) => void;
}

export default function CRMImageUploader({ value, onChange }: CRMImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const { featuredImageUrl, galleryUrls = [] } = value;

  // All images (featured first, then gallery)
  const allImages = Array.from(new Set([
    ...(featuredImageUrl ? [featuredImageUrl] : []),
    ...galleryUrls,
  ]));

  const readFiles = (files: FileList) => {
    const promises = Array.from(files).map(
      f => new Promise<string>((res, rej) => {
        const reader = new FileReader();
        reader.onload = e => res(e.target!.result as string);
        reader.onerror = rej;
        reader.readAsDataURL(f);
      }),
    );
    Promise.all(promises).then(urls => {
      const next = Array.from(new Set([...allImages, ...urls]));
      const newFeatured = next[0];
      onChange({
        featuredImageUrl: newFeatured,
        galleryUrls: next.slice(1),
      });
    }).catch(console.error);
  };

  const setFeatured = (url: string) => {
    const rest = allImages.filter(u => u !== url);
    onChange({ featuredImageUrl: url, galleryUrls: rest });
  };

  const remove = (url: string) => {
    const next = allImages.filter(u => u !== url);
    onChange({ featuredImageUrl: next[0], galleryUrls: next.slice(1) });
  };

  return (
    <div className="space-y-4">
      {/* Drop zone */}
      <div
        className="border-2 border-dashed border-slate-200 dark:border-slate-600 rounded-lg p-5 text-center cursor-pointer hover:border-amber-400 transition-colors"
        onClick={() => { if (inputRef.current) { inputRef.current.value = ''; inputRef.current.click(); } }}
        onDragOver={e => e.preventDefault()}
        onDrop={e => { e.preventDefault(); if (e.dataTransfer.files.length) readFiles(e.dataTransfer.files); }}
      >
        <Upload className="w-6 h-6 text-slate-400 mx-auto mb-1.5" />
        <p className="text-sm text-slate-600 dark:text-slate-400">Upload images</p>
        <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">JPG, PNG, WebP — stored locally</p>
        <input
          ref={inputRef}
          type="file"
          multiple
          accept="image/*"
          className="sr-only"
          onChange={e => { if (e.target.files?.length) readFiles(e.target.files); }}
        />
      </div>

      {/* Grid */}
      {allImages.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {allImages.map(url => {
            const isFeatured = url === featuredImageUrl;
            return (
              <div key={url} className={`relative group rounded-lg overflow-hidden border-2 aspect-video ${
                isFeatured
                  ? 'border-amber-400'
                  : 'border-transparent hover:border-slate-300 dark:hover:border-slate-600'
              }`}>
                <img src={url} alt="" className="w-full h-full object-cover" />
                {isFeatured && (
                  <span className="absolute top-1 left-1 bg-amber-400 text-xs text-slate-900 font-bold px-1.5 py-0.5 rounded">
                    Featured
                  </span>
                )}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  {!isFeatured && (
                    <button
                      type="button"
                      onClick={() => setFeatured(url)}
                      title="Set as featured"
                      className="p-1.5 bg-amber-400 rounded-full text-slate-900 hover:bg-amber-300"
                    >
                      <Star className="w-3.5 h-3.5" />
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => remove(url)}
                    title="Remove"
                    className="p-1.5 bg-red-500 rounded-full text-white hover:bg-red-400"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {allImages.length === 0 && (
        <div className="flex flex-col items-center gap-2 py-4 text-slate-400 dark:text-slate-600">
          <ImageIcon className="w-8 h-8" />
          <p className="text-xs">No images yet</p>
        </div>
      )}
    </div>
  );
}
