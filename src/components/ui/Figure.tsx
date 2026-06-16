import Image from "next/image";

/**
 * Framed screenshot/figure. The GSC captures have light backgrounds, so the
 * image sits on white with a dark caption bar underneath.
 */
export function Figure({
  src,
  alt,
  width,
  height,
  caption,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
}) {
  return (
    <figure className="overflow-hidden rounded-xl border border-border bg-white">
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes="(max-width: 1024px) 100vw, 1000px"
        className="h-auto w-full"
      />
      {caption ? (
        <figcaption className="border-t border-border bg-surface px-4 py-2.5 text-xs leading-relaxed text-muted">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
