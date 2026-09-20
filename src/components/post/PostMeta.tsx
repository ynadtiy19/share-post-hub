import type { SharedPost } from "@/lib/post.functions";

function formatDate(value: string): string {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat("zh-CN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

export function PostHeader({ post }: { post: SharedPost }) {
  const date = formatDate(post.created_at);

  return (
    <header className="border-border/60 border-b pb-8">
      {post.category ? (
        <p className="text-[0.68rem] tracking-[0.3em] text-muted-foreground uppercase">
          {post.category}
        </p>
      ) : null}

      {post.title ? (
        <h1 className="font-display mt-4 text-[2.1rem] leading-[1.2] sm:text-[2.7rem]">
          {post.title}
        </h1>
      ) : null}

      <div className="mt-6 flex items-center gap-3">
        {post.author.avatar ? (
          <img
            src={post.author.avatar}
            alt={post.author.nickname}
            className="h-11 w-11 rounded-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="bg-sage/40 flex h-11 w-11 items-center justify-center rounded-full text-sm">
            {post.author.nickname.slice(0, 1)}
          </div>
        )}
        <div className="min-w-0">
          <p className="text-[0.95rem]">{post.author.nickname}</p>
          <p className="truncate text-[0.78rem] text-muted-foreground">
            {[post.author.bio, date].filter(Boolean).join(" · ")}
          </p>
        </div>
      </div>
    </header>
  );
}

export function PostStats({ post }: { post: SharedPost }) {
  const stats = [
    { label: "浏览", value: post.views_count },
    { label: "喜欢", value: post.likes_count },
    { label: "收藏", value: post.collects_count },
    { label: "转发", value: post.reposts_count },
    { label: "评论", value: post.comments_count },
  ];

  return (
    <div className="border-border/60 mt-12 flex flex-wrap gap-x-8 gap-y-3 border-t pt-6">
      {stats.map((stat) => (
        <div key={stat.label} className="flex items-baseline gap-2">
          <span className="font-display text-xl">{stat.value}</span>
          <span className="text-[0.72rem] tracking-[0.18em] text-muted-foreground uppercase">
            {stat.label}
          </span>
        </div>
      ))}
    </div>
  );
}
