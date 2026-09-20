import { createFileRoute, Link, notFound } from "@tanstack/react-router";

import { PollCard } from "@/components/post/PollCard";
import { PostGallery } from "@/components/post/PostGallery";
import { PostHeader, PostStats } from "@/components/post/PostMeta";
import { QuillDeltaRenderer } from "@/components/post/QuillDeltaRenderer";
import { getSharedPost, type SharedPost } from "@/lib/post.functions";

const ID_PATTERN = /^[a-fA-F0-9]{24}$/;

export const Route = createFileRoute("/$postId")({
  loader: async ({ params }) => {
    if (!ID_PATTERN.test(params.postId)) throw notFound();
    const post = await getSharedPost({ data: { id: params.postId } });
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData }) => {
    const post = loaderData?.post;
    if (!post) {
      return {
        meta: [{ title: "内容不可用 · 青橙 Qorange" }, { name: "robots", content: "noindex" }],
      };
    }
    const title = `${post.title || post.content_min.slice(0, 30) || "青橙动态"} · 青橙 Qorange`;
    const description = post.content_min.slice(0, 120) || "来自青橙 Qorange 的分享";
    const image = post.thumbnail || post.images[0] || "";

    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
        ...(image.startsWith("https://")
          ? [
              { property: "og:image", content: image },
              { name: "twitter:image", content: image },
            ]
          : []),
      ],
    };
  },
  component: PostPage,
  pendingComponent: PostPending,
  notFoundComponent: PostNotFound,
  errorComponent: PostNotFound,
});

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-border/50 border-b">
        <div className="mx-auto flex max-w-[720px] items-baseline gap-3 px-6 py-5">
          <Link to="/" className="font-display text-xl">
            青橙
          </Link>
          <span className="text-[0.62rem] tracking-[0.34em] text-muted-foreground uppercase">
            Qorange
          </span>
        </div>
      </header>
      <main className="mx-auto max-w-[720px] px-6 pt-10 pb-24">{children}</main>
      <footer className="border-border/50 border-t">
        <div className="mx-auto max-w-[720px] px-6 py-10 text-[0.78rem] text-muted-foreground">
          在 青橙 Qorange App 内阅读更多内容与评论。
          <Link to="/" className="text-sage-deep ml-2 underline underline-offset-4">
            了解 青橙
          </Link>
        </div>
      </footer>
    </div>
  );
}

function PostPending() {
  return (
    <Shell>
      <div className="animate-pulse space-y-4">
        <div className="bg-secondary/70 h-4 w-24 rounded-sm" />
        <div className="bg-secondary/70 h-10 w-3/4 rounded-sm" />
        <div className="bg-secondary/60 h-64 w-full rounded-sm" />
      </div>
    </Shell>
  );
}

function PostNotFound() {
  return (
    <Shell>
      <div className="py-20 text-center">
        <h1 className="font-display text-3xl">这篇内容暂时看不到</h1>
        <p className="mt-3 text-[0.95rem] text-muted-foreground">
          它可能已被删除，或者链接不正确。
        </p>
        <Link
          to="/"
          className="border-border/70 mt-8 inline-flex rounded-sm border px-5 py-2.5 text-[0.85rem] transition-colors hover:bg-secondary/60"
        >
          回到首页
        </Link>
      </div>
    </Shell>
  );
}

function PostBody({ post }: { post: SharedPost }) {
  if (post.post_type === "poll" && post.poll) {
    return (
      <>
        {post.content ? (
          <p className="mt-7 leading-[1.95] text-foreground/90">{post.content}</p>
        ) : null}
        <PollCard question={post.poll.question} options={post.poll.options} />
      </>
    );
  }

  if (post.post_type === "short_post") {
    return (
      <>
        <p className="mt-7 text-[1.05rem] leading-[1.95] whitespace-pre-wrap text-foreground/90">
          {post.content}
        </p>
        <PostGallery
          images={post.images.length ? post.images : post.thumbnail ? [post.thumbnail] : []}
        />
      </>
    );
  }

  return (
    <div className="mt-7">
      <QuillDeltaRenderer content={post.content} />
    </div>
  );
}

function PostPage() {
  const { post } = Route.useLoaderData();

  return (
    <Shell>
      <article>
        <PostHeader post={post} />
        <PostBody post={post} />
        <PostStats post={post} />
      </article>
    </Shell>
  );
}
