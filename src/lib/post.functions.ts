import { createServerFn } from "@tanstack/react-start";

export type PostAuthor = {
  nickname: string;
  avatar: string;
  bio: string;
};

export type PollOption = {
  option_id: string;
  text: string;
  votes: number;
};

export type SharedPost = {
  id: string;
  post_type: "quill" | "short_post" | "poll";
  title: string;
  content: string;
  content_min: string;
  thumbnail: string;
  images: string[];
  poll: { question: string; options: PollOption[] } | null;
  category: string;
  created_at: string;
  views_count: number;
  likes_count: number;
  collects_count: number;
  reposts_count: number;
  comments_count: number;
  author: PostAuthor;
};

const API_BASE = "https://googlechat.zeabur.app";

function countOf(value: unknown): number {
  if (typeof value === "number") return value;
  if (Array.isArray(value)) return value.length;
  return 0;
}

function plainTextFromContent(content: string, postType: string): string {
  if (postType !== "quill") return content;
  try {
    const ops = JSON.parse(content) as Array<{ insert?: unknown }>;
    return ops
      .map((op) => (typeof op.insert === "string" ? op.insert : ""))
      .join("")
      .replace(/\s+/g, " ")
      .trim();
  } catch {
    return "";
  }
}

function normalize(raw: Record<string, any>): SharedPost {
  const postType: SharedPost["post_type"] =
    raw["post_type"] === "short_post" || raw["post_type"] === "poll" ? raw["post_type"] : "quill";

  const content = typeof raw["content"] === "string" ? raw["content"] : "";
  const author = (raw["author"] ?? {}) as Record<string, unknown>;

  const rawPoll = raw["poll"] as Record<string, any> | null | undefined;
  const poll = rawPoll
    ? {
        question: String(rawPoll["question"] ?? raw["title"] ?? ""),
        options: Array.isArray(rawPoll["options"])
          ? rawPoll["options"].map((option: Record<string, any>, index: number) => ({
              option_id: String(option["option_id"] ?? index),
              text: String(option["text"] ?? ""),
              votes: countOf(option["votes"]),
            }))
          : [],
      }
    : null;

  const images = Array.isArray(raw["images"])
    ? (raw["images"] as unknown[]).filter((item): item is string => typeof item === "string")
    : [];

  return {
    id: String(raw["id"] ?? ""),
    post_type: postType,
    title: String(raw["title"] ?? ""),
    content,
    content_min: String(raw["content_min"] || plainTextFromContent(content, postType)),
    thumbnail: String(raw["thumbnail"] ?? ""),
    images,
    poll,
    category: String(raw["category"] ?? ""),
    created_at: String(raw["created_at"] ?? ""),
    views_count: countOf(raw["views_count"]),
    likes_count: countOf(raw["likes_count"] ?? raw["likes"]),
    collects_count: countOf(raw["collects_count"] ?? raw["collects"]),
    reposts_count: countOf(raw["reposts_count"] ?? raw["reposts"]),
    comments_count: countOf(raw["comments_count"] ?? raw["comments"]),
    author: {
      nickname: String(author["nickname"] ?? "青橙用户"),
      avatar: String(author["avatar"] ?? ""),
      bio: String(author["bio"] ?? ""),
    },
  };
}

/**
 * Fetch a shared post from the server side so the browser never has to deal
 * with the upstream CORS / referrer whitelist.
 */
export const getSharedPost = createServerFn({ method: "GET" })
  .inputValidator((input: { id: string }) => {
    if (!/^[a-fA-F0-9]{24}$/.test(input.id)) throw new Error("INVALID_ID");
    return { id: input.id };
  })
  .handler(async ({ data }): Promise<SharedPost | null> => {
    const endpoints = [
      `${API_BASE}/api-posts/${data.id}`,
      `${API_BASE}/admin/posts/${data.id}/share`,
    ];

    for (const url of endpoints) {
      try {
        const res = await fetch(url, {
          headers: {
            Accept: "application/json",
            Origin: "https://qorange.zeabur.app",
            Referer: "https://qorange.zeabur.app/",
          },
        });
        if (!res.ok) continue;
        const body = (await res.json()) as { resp_code?: number; datas?: unknown };
        if (body.resp_code === 0 && body.datas && typeof body.datas === "object") {
          return normalize(body.datas as Record<string, unknown>);
        }
      } catch (error) {
        console.error("Failed to load shared post", url, error);
      }
    }

    return null;
  });
