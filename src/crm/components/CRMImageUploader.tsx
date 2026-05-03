// Local image uploader using FileReader → data URL.
//
// PROTOTYPE ONLY: data URLs are stored verbatim in localStorage. This is fine
// for a handful of images but will quickly hit the ~5 MB localStorage quota in
// any real-world use. In production this control should upload to S3 / Cloudflare
// R2 / Supabase Storage and persist only the resulting URL.

import { useRef, type ChangeEvent } from 'react';
import { ImagePlus, Star, StarOff, Trash2 } from 'lucide-react';

interface CRMImageUploaderProps {
  featuredImageUrl: string;
  galleryUrls: string[];
  onChange: (next: { featuredImageUrl: string; galleryUrls: string[] }) => void;
}

export default function CRMImageUploader({
  featuredImageUrl,
  galleryUrls,
  onChange,
}: CRMImageUploaderProps) {
  const fileInput = useRef<HTMLInputElement | null>(null);

  function handleFiles(e: ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const readers = Array.from(files).map(
      (file) =>
        new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(String(reader.result));
          reader.onerror = () => reject(reader.error);
          reader.readAsDataURL(file);
        })
    );

    Promise.all(readers).then((dataUrls) => {
      const dedup = Array.from(new Set([...galleryUrls, ...dataUrls]));
      onChange({
        featuredImageUrl: featuredImageUrl || dataUrls[0] || '',
        galleryUrls: dedup,
      });
      // Reset input so the same file can be re-selected if removed.
      if (fileInput.current) fileInput.current.value = '';
    });
  }

  function removeAt(idx: number) {
    const url = galleryUrls[idx];
    const nextGallery = galleryUrls.filter((_, i) => i !== idx);
    const nextFeatured =
      featuredImageUrl === url ? nextGallery[0] ?? '' : featuredImageUrl;
    onChange({ featuredImageUrl: nextFeatured, galleryUrls: nextGallery });
  }

  function setFeatured(url: string) {
    onChange({ featuredImageUrl: url, galleryUrls });
  }

  return (
    <div className="space-y-3">
      <div>
        <button
          type="button"
          onClick={() => fileInput.current?.click()}
          className="inline-flex items-center gap-2 border border-dashed border-slate-300 hover:border-teal-500 hover:bg-teal-50 px-4 py-3 rounded-md text-sm text-slate-600"
        >
          <ImagePlus className="w-4 h-4" />
          Upload images
        </button>
        <input
          ref={fileInput}
          type="file"
          accept="image/*"
          multiple
          onChange={handleFiles}
          className="hidden"
          aria-label="Upload property images"
        />
        <p className="text-[11px] text-slate-400 mt-1">
          Images are stored locally as data URLs (prototype) — keep file count small.
        </p>
      </div>

      {galleryUrls.length === 0 ? (
        <div className="text-sm text-slate-500 border border-dashed border-slate-200 rounded-md py-8 text-center">
          No images uploaded yet.
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {galleryUrls.map((url, idx) => {
            const isFeatured = url === featuredImageUrl;
            return (
              <div
                key={`${idx}-${url.slice(0, 20)}`}
                className={`relative group rounded-md overflow-hidden border ${
                  isFeatured ? 'border-amber-400 ring-2 ring-amber-200' : 'border-slate-200'
                }`}
              >
                <img src={url} alt="Property upload" className="w-full h-32 object-cover" />
                <div className="absolute top-1 right-1 flex flex-col gap-1 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity">
                  <button
                    type="button"
                    onClick={() => setFeatured(url)}
                    className="p-1 rounded bg-white/90 text-amber-600 hover:bg-white"
                    aria-label={isFeatured ? 'Featured image' : 'Set as featured image'}
                    title={isFeatured ? 'Featured' : 'Set as featured'}
                  >
                    {isFeatured ? <Star className="w-4 h-4 fill-amber-500" /> : <StarOff className="w-4 h-4" />}
                  </button>
                  <button
                    type="button"
                    onClick={() => removeAt(idx)}
                    className="p-1 rounded bg-white/90 text-rose-600 hover:bg-white"
                    aria-label="Remove image"
                    title="Remove"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                {isFeatured && (
                  <span className="absolute bottom-1 left-1 text-[10px] uppercase tracking-wider bg-amber-500 text-white px-1.5 py-0.5 rounded">
                    Featured
                  </span>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
