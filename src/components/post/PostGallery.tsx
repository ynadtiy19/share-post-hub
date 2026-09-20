import { useState } from "react";

export function PostGallery({ images }: { images: string[] }) {
  const [active, setActive] = useState<string | null>(null);

  if (!images.length) return null;

  const gridClass =
    images.length === 1
      ? "grid-cols-1"
      : images.length === 2 || images.length === 4
        ? "grid-cols-2"
        : "grid-cols-2 sm:grid-cols-3";

  return (
    <>
      <div className={`mt-7 grid gap-3 ${gridClass}`}>
        {images.map((src, index) => (
          <button
            key={`${src}-${index}`}
            type="button"
            onClick={() => setActive(src)}
            className="group overflow-hidden rounded-sm bg-secondary/40"
          >
            <img
              src={src}
              alt={`配图 ${index + 1}`}
              loading="lazy"
              className={`w-full object-cover transition-transform duration-700 group-hover:scale-[1.03] ${
                images.length === 1 ? "max-h-[70vh]" : "aspect-square"
              }`}
            />
          </button>
        ))}
      </div>

      {active ? (
        <div
          role="presentation"
          onClick={() => setActive(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/80 p-6 backdrop-blur-sm"
        >
          <img src={active} alt="" className="max-h-full max-w-full rounded-sm object-contain" />
        </div>
      ) : null}
    </>
  );
}
