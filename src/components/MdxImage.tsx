import { useState } from 'react';
import Image from 'next/image';

type MdxImageProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  /** Optional aspect ratio like 16/9 or 4/3; defaults to 16/10 */
  aspectRatio?: `${number}/${number}`;
};

/**
 * MDX <img> replacement using next/image with a skeleton placeholder and
 * a stable aspect-ratio box to prevent layout shift before the image loads.
 */
export default function MdxImage({ src = '', alt = '', aspectRatio, className = '', ...rest }: MdxImageProps) {
  const [loaded, setLoaded] = useState(false);

  // Default to a laptop-ish ratio to avoid big jumps before load.
  const ratio = aspectRatio ?? '16/10';

  // Allow authors to override ratio via title="ar:16/9" or data-ar
  const title = (rest as any).title as string | undefined;
  const hinted = title?.startsWith('ar:') ? (title.slice(3) as `${number}/${number}`) : undefined;

  const finalRatio = hinted ?? ratio;

  return (
    <div
      className={`mdx-image relative my-4 w-full overflow-hidden rounded-md ring-1 ring-inset ring-neutral-800 shadow-sm ${className}`}
      style={{ aspectRatio: finalRatio as any }}
    >
      {/* Skeleton placeholder */}
      <div
        aria-hidden
        className={`absolute inset-0 bg-neutral-900/60 [background-image:linear-gradient(90deg,rgba(255,255,255,.06)_0%,rgba(255,255,255,.12)_50%,rgba(255,255,255,.06)_100%)] bg-[length:200%_100%] animate-[pulse_1.2s_ease-in-out_infinite] transition-opacity ${
          loaded ? 'opacity-0' : 'opacity-100'
        }`}
      />

      {/* The image fills the box; object-contain to avoid cropping for mismatched ratios */}
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(min-width: 768px) 800px, 100vw"
        className="object-contain"
        onLoadingComplete={() => setLoaded(true)}
        priority={false}
      />
    </div>
  );
}
