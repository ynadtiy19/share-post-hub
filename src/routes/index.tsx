import { createFileRoute } from "@tanstack/react-router";
import { LocaleProvider } from "@/i18n/LocaleProvider";
import { LandingPage } from "@/components/landing/LandingPage";

const title = "青橙 Qorange · 创作与相遇的安静角落";
const description =
  "青橙 Qorange 是一款在线内容创作与社交互动 App：写下、拍下、画下你在意的瞬间，遇见同样在意的人。iOS 与 Android 均可使用。";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
       { property: "og:type", content: "website" },
       { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <LocaleProvider>
      <LandingPage />
    </LocaleProvider>
  );
}
