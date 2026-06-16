import Image from "next/image";

/**
 * SeoLab logo on a light chip — the wordmark is dark, so it needs a light
 * background to stay legible on the dark UI.
 */
export function SeoLabMark({ height = 26 }: { height?: number }) {
  return (
    <span className="inline-flex items-center rounded-lg bg-white px-2.5 py-1.5 shadow-sm ring-1 ring-black/5">
      <Image
        src="/seolab-logo.png"
        alt="SeoLab"
        width={500}
        height={250}
        priority
        style={{ height, width: "auto" }}
      />
    </span>
  );
}
