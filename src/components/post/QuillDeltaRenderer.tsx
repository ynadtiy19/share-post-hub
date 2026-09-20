import { Fragment, type CSSProperties, type ReactNode } from "react";

type Attrs = Record<string, unknown>;

type Leaf =
  | { kind: "text"; text: string; attrs: Attrs }
  | { kind: "embed"; embedType: string; value: unknown; attrs: Attrs };

type Line = { leaves: Leaf[]; attrs: Attrs };

type DeltaOp = { insert?: unknown; attributes?: Attrs };

function parseOps(content: string): DeltaOp[] {
  try {
    const parsed = JSON.parse(content);
    if (Array.isArray(parsed)) return parsed as DeltaOp[];
    if (parsed && Array.isArray(parsed.ops)) return parsed.ops as DeltaOp[];
  } catch {
    /* not a delta document */
  }
  return [];
}

function buildLines(ops: DeltaOp[]): Line[] {
  const lines: Line[] = [];
  let current: Line = { leaves: [], attrs: {} };

  const push = (attrs: Attrs) => {
    lines.push({ leaves: current.leaves, attrs });
    current = { leaves: [], attrs: {} };
  };

  for (const op of ops) {
    const attrs = op.attributes ?? {};
    if (typeof op.insert === "string") {
      const segments = op.insert.split("\n");
      segments.forEach((segment, index) => {
        if (segment) current.leaves.push({ kind: "text", text: segment, attrs });
        if (index < segments.length - 1) push(attrs);
      });
    } else if (op.insert && typeof op.insert === "object") {
      const [embedType, value] = Object.entries(op.insert as Record<string, unknown>)[0] ?? [];
      if (embedType) current.leaves.push({ kind: "embed", embedType, value, attrs });
    }
  }

  if (current.leaves.length) push({});
  return lines;
}

function safeJson(value: unknown): Record<string, unknown> | null {
  if (value && typeof value === "object") return value as Record<string, unknown>;
  if (typeof value === "string") {
    const trimmed = value.trim();
    if (trimmed.startsWith("{")) {
      try {
        return JSON.parse(trimmed) as Record<string, unknown>;
      } catch {
        return null;
      }
    }
  }
  return null;
}

function mediaFrom(value: unknown): { url: string; caption: string; widthFactor: number } {
  const parsed = safeJson(value);
  if (parsed) {
    return {
      url: String(parsed["url"] ?? parsed["src"] ?? ""),
      caption: String(parsed["caption"] ?? parsed["title"] ?? ""),
      widthFactor: Number(parsed["width_factor"] ?? 1) || 1,
    };
  }
  return { url: typeof value === "string" ? value : "", caption: "", widthFactor: 1 };
}

const IMAGE_EMBEDS = new Set(["image", "custom_image", "custom-image"]);
const VIDEO_EMBEDS = new Set(["video", "custom_video", "custom-video", "custom_media"]);

function inlineStyle(attrs: Attrs): CSSProperties | undefined {
  const style: CSSProperties = {};
  if (typeof attrs["color"] === "string") style.color = attrs["color"];
  if (typeof attrs["background"] === "string") style.backgroundColor = attrs["background"];
  if (attrs["size"] === "large") style.fontSize = "1.15em";
  if (attrs["size"] === "huge") style.fontSize = "1.4em";
  if (attrs["size"] === "small") style.fontSize = "0.85em";
  return Object.keys(style).length ? style : undefined;
}

function renderText(leaf: Extract<Leaf, { kind: "text" }>, key: number): ReactNode {
  const { attrs } = leaf;
  let node: ReactNode = leaf.text;

  if (attrs["code"]) {
    node = (
      <code className="rounded bg-secondary/70 px-1.5 py-0.5 font-mono text-[0.86em]">{node}</code>
    );
  }
  if (attrs["bold"]) node = <strong className="font-semibold">{node}</strong>;
  if (attrs["italic"]) node = <em>{node}</em>;
  if (attrs["underline"]) node = <u className="decoration-sage-deep/60 underline-offset-4">{node}</u>;
  if (attrs["strike"]) node = <s className="opacity-70">{node}</s>;
  if (attrs["script"] === "super") node = <sup>{node}</sup>;
  if (attrs["script"] === "sub") node = <sub>{node}</sub>;

  const style = inlineStyle(attrs);
  if (style) node = <span style={style}>{node}</span>;

  if (typeof attrs["link"] === "string") {
    node = (
      <a
        href={attrs["link"]}
        target="_blank"
        rel="noopener noreferrer"
        className="text-sage-deep underline decoration-sage/70 underline-offset-4 transition-colors hover:text-foreground"
      >
        {node}
      </a>
    );
  }

  return <Fragment key={key}>{node}</Fragment>;
}

function Figure({
  url,
  caption,
  widthFactor,
  video,
}: {
  url: string;
  caption: string;
  widthFactor: number;
  video?: boolean;
}) {
  if (!url) return null;
  const width = `${Math.min(Math.max(widthFactor, 0.2), 1) * 100}%`;
  const isEmbedFrame = /youtube\.com|youtu\.be|bilibili\.com|vimeo\.com|player\./i.test(url);

  return (
    <figure className="my-9 flex flex-col items-center">
      <div className="w-full overflow-hidden rounded-sm bg-secondary/40" style={{ width }}>
        {video ? (
          isEmbedFrame ? (
            <iframe
              src={url}
              title={caption || "视频"}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; picture-in-picture"
              allowFullScreen
              className="aspect-video w-full border-0"
            />
          ) : (
            <video src={url} controls playsInline className="w-full" />
          )
        ) : (
          <img src={url} alt={caption} loading="lazy" className="w-full object-cover" />
        )}
      </div>
      {caption ? (
        <figcaption className="mt-3 text-center text-[0.78rem] tracking-wide text-muted-foreground">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

function renderLeaves(line: Line): ReactNode[] {
  return line.leaves.map((leaf, index) =>
    leaf.kind === "text" ? (
      renderText(leaf, index)
    ) : (
      <Fragment key={index}>{renderInlineEmbed(leaf)}</Fragment>
    ),
  );
}

function renderInlineEmbed(leaf: Extract<Leaf, { kind: "embed" }>): ReactNode {
  const media = mediaFrom(leaf.value);
  if (IMAGE_EMBEDS.has(leaf.embedType)) return <Figure {...media} />;
  if (VIDEO_EMBEDS.has(leaf.embedType)) return <Figure {...media} video />;
  if (media.url) {
    return (
      <a
        href={media.url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-sage-deep underline underline-offset-4"
      >
        {media.caption || media.url}
      </a>
    );
  }
  return null;
}

function alignClass(attrs: Attrs): string {
  switch (attrs["align"]) {
    case "center":
      return "text-center";
    case "right":
      return "text-right";
    case "justify":
      return "text-justify";
    default:
      return "";
  }
}

function indentStyle(attrs: Attrs): CSSProperties | undefined {
  const indent = Number(attrs["indent"] ?? 0);
  return indent > 0 ? { paddingInlineStart: `${indent * 1.5}rem` } : undefined;
}

function isBlockEmbedLine(line: Line): boolean {
  return (
    line.leaves.length > 0 &&
    line.leaves.every(
      (leaf) =>
        leaf.kind === "embed" &&
        (IMAGE_EMBEDS.has(leaf.embedType) || VIDEO_EMBEDS.has(leaf.embedType)),
    )
  );
}

function renderLine(line: Line, key: string): ReactNode {
  if (!line.leaves.length) return null;

  if (isBlockEmbedLine(line)) {
    return <div key={key}>{renderLeaves(line)}</div>;
  }

  const className = alignClass(line.attrs);
  const style = indentStyle(line.attrs);
  const children = renderLeaves(line);
  const header = Number(line.attrs["header"] ?? 0);

  if (header === 1) {
    return (
      <h2
        key={key}
        className={`font-display mt-12 mb-4 text-3xl leading-tight sm:text-4xl ${className}`}
        style={style}
      >
        {children}
      </h2>
    );
  }
  if (header === 2) {
    return (
      <h3
        key={key}
        className={`font-display mt-10 mb-3 text-2xl leading-snug sm:text-3xl ${className}`}
        style={style}
      >
        {children}
      </h3>
    );
  }
  if (header >= 3) {
    return (
      <h4
        key={key}
        className={`mt-8 mb-3 text-[1.05rem] font-semibold tracking-wide ${className}`}
        style={style}
      >
        {children}
      </h4>
    );
  }

  if (line.attrs["blockquote"]) {
    return (
      <blockquote
        key={key}
        className={`border-sage my-6 border-l-2 pl-5 text-[1.02rem] leading-[1.9] text-muted-foreground italic ${className}`}
        style={style}
      >
        {children}
      </blockquote>
    );
  }

  if (line.attrs["code-block"]) {
    return (
      <pre
        key={key}
        className="my-4 overflow-x-auto rounded-sm bg-secondary/60 px-4 py-3 font-mono text-[0.85rem] leading-relaxed"
      >
        <code>{children}</code>
      </pre>
    );
  }

  return (
    <p key={key} className={`my-4 leading-[1.95] ${className}`} style={style}>
      {children}
    </p>
  );
}

export function QuillDeltaRenderer({ content }: { content: string }) {
  const ops = parseOps(content);

  if (!ops.length) {
    return (
      <div className="space-y-4">
        {content
          .split(/\n+/)
          .filter(Boolean)
          .map((paragraph, index) => (
            <p key={index} className="my-4 leading-[1.95]">
              {paragraph}
            </p>
          ))}
      </div>
    );
  }

  const lines = buildLines(ops);
  const blocks: ReactNode[] = [];
  let index = 0;

  while (index < lines.length) {
    const line = lines[index]!;
    const listType = line.attrs["list"];

    if (listType === "bullet" || listType === "ordered") {
      const items: ReactNode[] = [];
      while (index < lines.length && lines[index]!.attrs["list"] === listType) {
        const item = lines[index]!;
        items.push(
          <li key={index} className="my-1.5 leading-[1.9]" style={indentStyle(item.attrs)}>
            {renderLeaves(item)}
          </li>,
        );
        index += 1;
      }
      blocks.push(
        listType === "ordered" ? (
          <ol key={`list-${index}`} className="my-4 list-decimal space-y-1 pl-6">
            {items}
          </ol>
        ) : (
          <ul key={`list-${index}`} className="my-4 list-disc space-y-1 pl-6">
            {items}
          </ul>
        ),
      );
      continue;
    }

    blocks.push(renderLine(line, `line-${index}`));
    index += 1;
  }

  return <div className="text-[1.03rem] text-foreground/90">{blocks}</div>;
}
