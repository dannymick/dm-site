import { useState } from 'react';

type Props = {
  slug: string;
  label: string;
  className?: string;
  src?: string | null;
};

export default function Logo({ slug, label, className = '', src }: Props) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <span
        aria-label={`${label} logo`}
        className={`inline-flex h-7 w-7 items-center justify-center rounded bg-neutral-800 text-neutral-300 ring-1 ring-inset ring-neutral-700 ${className}`}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4">
          <path d="M9 6V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v1" />
          <path d="M3 10a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7Z" />
          <path d="M16 12H8" />
        </svg>
      </span>
    );
  }

  // If a resolved src is provided (from build-time detection), use it and fallback to icon on error.
  if (src) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={`${label} logo`}
        className={`h-7 w-7 rounded bg-neutral-900 object-contain ring-1 ring-inset ring-neutral-800 ${className}`}
        onError={() => setFailed(true)}
      />
    );
  }

  // No known logo source: show fallback immediately to avoid network 404s.
  return (
    <span
      aria-label={`${label} logo`}
      className={`inline-flex h-7 w-7 items-center justify-center rounded bg-neutral-800 text-neutral-300 ring-1 ring-inset ring-neutral-700 ${className}`}
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4">
        <path d="M9 6V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v1" />
        <path d="M3 10a 2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7Z" />
        <path d="M16 12H8" />
      </svg>
    </span>
  );
}
