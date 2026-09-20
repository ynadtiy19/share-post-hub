import { useState } from "react";
import { useLocale } from "@/i18n/LocaleProvider";
import { downloadLinks } from "@/lib/download-links";
import { SiteHeader } from "./SiteHeader";
import { Reveal } from "./Reveal";

import heroImg from "@/assets/hero.jpg";
import feature1 from "@/assets/feature-1.jpg";
import feature2 from "@/assets/feature-2.jpg";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery4 from "@/assets/gallery-4.jpg";
import gallery5 from "@/assets/gallery-5.jpg";
import productHomeCamping from "@/assets/product/home-camping.jpg";
import productArticle from "@/assets/product/article-detail.jpg";
import productStore from "@/assets/product/store.jpg";
import productCommunities from "@/assets/product/communities.jpg";
import productHomeFeed from "@/assets/product/home-feed.jpg";
import productProfile from "@/assets/product/profile.jpg";
import productChat from "@/assets/product/chat.jpg";
import productMessages from "@/assets/product/messages.jpg";

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[0.68rem] uppercase tracking-[0.36em] text-muted-foreground">{children}</p>
  );
}

function StoreButtons({ variant = "solid" }: { variant?: "solid" | "outline" }) {
  const { t } = useLocale();
  const base =
    "inline-flex items-center justify-center px-7 py-3.5 text-[0.74rem] uppercase tracking-[0.2em] transition-all duration-300";
  return (
    <div className="flex flex-wrap items-center gap-3">
      <span
        aria-disabled="true"
        className={`${base} cursor-not-allowed border border-foreground/15 text-muted-foreground opacity-65`}
      >
        {t.cta.ios}
      </span>
      <a
        href={downloadLinks.android}
        target="_blank"
        rel="noreferrer"
        className={`${base} ${
          variant === "solid"
            ? "bg-primary text-primary-foreground hover:opacity-85"
            : "border border-foreground/25 text-foreground hover:bg-foreground hover:text-background"
        }`}
      >
        {t.cta.android}
      </a>
    </div>
  );
}

function Hero() {
  const { t } = useLocale();
  return (
    <section id="top" className="relative">
      <div className="mx-auto max-w-[1240px] px-6 pt-36 pb-14 lg:px-10 lg:pt-44">
        <div className="max-w-3xl">
          <Reveal>
            <Eyebrow>{t.hero.eyebrow}</Eyebrow>
          </Reveal>
          <Reveal delay={90}>
            <h1 className="font-display mt-8 text-[2.9rem] leading-[1.06] sm:text-6xl lg:text-[4.6rem]">
              {t.hero.titleTop}{" "}
              <em className="text-sage-deep italic">{t.hero.titleAccent}</em>
              <span className="block text-muted-foreground/80">Qorange · 青橙</span>
            </h1>
          </Reveal>
          <Reveal delay={170}>
            <p className="mt-8 max-w-xl text-[0.98rem] leading-[1.9] text-muted-foreground">
              {t.hero.subtitle}
            </p>
          </Reveal>
          <Reveal delay={240}>
            <div className="mt-10 space-y-4">
              <StoreButtons />
              <p className="text-[0.72rem] tracking-[0.16em] text-muted-foreground uppercase">
                {t.hero.note}
              </p>
            </div>
          </Reveal>
        </div>
      </div>

      <Reveal>
        <figure className="grain relative mx-auto max-w-[1400px] overflow-hidden px-0">
          <img
            src={heroImg}
            alt=""
            width={1600}
            height={1104}
            className="h-[52vh] w-full object-cover sm:h-[68vh]"
          />
        </figure>
      </Reveal>
      <div className="mx-auto max-w-[1240px] px-6 pt-5 lg:px-10">
        <p className="font-display text-lg text-muted-foreground italic">{t.hero.caption}</p>
      </div>
    </section>
  );
}

function Features() {
  const { t } = useLocale();
  const firstPair = t.features.items.slice(0, 2);
  const secondPair = t.features.items.slice(2);
  return (
    <section id="features" className="scroll-mt-24 mx-auto max-w-[1240px] px-6 py-28 lg:px-10 lg:py-36">

      <div className="grid gap-12 lg:grid-cols-[0.85fr_1fr] lg:items-end">
        <Reveal>
          <div>
            <Eyebrow>{t.features.eyebrow}</Eyebrow>
            <h2 className="font-display mt-6 text-4xl leading-[1.14] lg:text-5xl">
              {t.features.title}
            </h2>
          </div>
        </Reveal>
        <Reveal delay={100}>
          <p className="max-w-xl text-[0.95rem] leading-[1.95] text-muted-foreground lg:pb-2">
            {t.features.intro}
          </p>
        </Reveal>
      </div>

      <div className="mt-20 grid gap-x-14 gap-y-16 lg:grid-cols-2">
        <Reveal>
          <div className="space-y-10">
            <img
              src={feature1}
              alt=""
              loading="lazy"
              width={1200}
              height={1408}
              className="aspect-[5/6] w-full object-cover"
            />
            {firstPair.map((item) => (
              <div key={item.title} className="border-t border-border pt-6">
                <h3 className="font-display text-2xl">{item.title}</h3>
                <p className="mt-3 text-[0.9rem] leading-[1.9] text-muted-foreground">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
        <Reveal delay={120}>
          <div className="space-y-10 lg:pt-24">
            {secondPair.map((item) => (
              <div key={item.title} className="border-t border-border pt-6">
                <h3 className="font-display text-2xl">{item.title}</h3>
                <p className="mt-3 text-[0.9rem] leading-[1.9] text-muted-foreground">
                  {item.body}
                </p>
              </div>
            ))}
            <img
              src={feature2}
              alt=""
              loading="lazy"
              width={1200}
              height={1408}
              className="aspect-[5/6] w-full object-cover"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

const productScreens = [
  productHomeCamping,
  productArticle,
  productStore,
  productCommunities,
  productHomeFeed,
  productProfile,
  productChat,
  productMessages,
];

function ProductShowcase() {
  const { t } = useLocale();
  return (
    <section id="product" className="scroll-mt-24 overflow-hidden bg-secondary/45 py-28 lg:py-36">
      <div className="mx-auto max-w-[1240px] px-6 lg:px-10">
        <Reveal>
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1fr] lg:items-end">
            <div>
              <Eyebrow>{t.product.eyebrow}</Eyebrow>
              <h2 className="font-display mt-6 text-4xl leading-[1.14] lg:text-5xl">
                {t.product.title}
              </h2>
            </div>
            <p className="max-w-xl text-[0.95rem] leading-[1.95] text-muted-foreground lg:justify-self-end">
              {t.product.intro}
            </p>
          </div>
        </Reveal>
      </div>

      <div className="mx-auto mt-16 flex max-w-[1600px] snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-8 lg:gap-8 lg:px-10">
        {productScreens.map((screen, index) => (
          <Reveal key={screen} delay={(index % 4) * 70} className="shrink-0 snap-center">
            <figure className="w-[255px] sm:w-[292px]">
              <div className="overflow-hidden rounded-[2rem] border-[6px] border-foreground/90 bg-card shadow-xl shadow-foreground/10">
                <img
                  src={screen}
                  alt={t.product.captions[index]}
                  loading="lazy"
                  width={767}
                  height={1663}
                  className="aspect-[767/1663] w-full object-cover"
                />
              </div>
              <figcaption className="mt-5 flex items-center gap-3 text-[0.72rem] uppercase tracking-[0.18em] text-muted-foreground">
                <span className="font-display text-lg text-foreground">0{index + 1}</span>
                {t.product.captions[index]}
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Community() {
  const { t } = useLocale();
  return (
    <section id="community" className="scroll-mt-24 bg-secondary/45 py-28 lg:py-36">
      <div className="mx-auto max-w-[1240px] px-6 lg:px-10">
        <Reveal>
          <div className="max-w-2xl">
            <Eyebrow>{t.community.eyebrow}</Eyebrow>
            <h2 className="font-display mt-6 text-4xl leading-[1.14] lg:text-5xl">
              {t.community.title}
            </h2>
            <p className="mt-6 text-[0.95rem] leading-[1.95] text-muted-foreground">
              {t.community.intro}
            </p>
          </div>
        </Reveal>

        <div className="mt-16 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          <Reveal className="lg:pt-14">
            <img
              src={gallery1}
              alt=""
              loading="lazy"
              width={1008}
              height={1312}
              className="aspect-[3/4] w-full object-cover"
            />
          </Reveal>
          <Reveal delay={90}>
            <img
              src={gallery2}
              alt=""
              loading="lazy"
              width={1008}
              height={1008}
              className="aspect-square w-full object-cover"
            />
          </Reveal>
          <Reveal delay={180} className="lg:pt-20">
            <img
              src={gallery3}
              alt=""
              loading="lazy"
              width={1008}
              height={1312}
              className="aspect-[3/4] w-full object-cover"
            />
          </Reveal>
          <Reveal delay={270}>
            <img
              src={gallery4}
              alt=""
              loading="lazy"
              width={1008}
              height={1008}
              className="aspect-square w-full object-cover"
            />
          </Reveal>
        </div>

        <Reveal delay={120}>
          <div className="mt-16 grid gap-10 lg:grid-cols-[1fr_0.6fr] lg:items-center">
            <ul className="flex flex-wrap gap-x-8 gap-y-3">
              {t.community.tags.map((tag) => (
                <li
                  key={tag}
                  className="font-display text-xl text-muted-foreground italic lg:text-2xl"
                >
                  {tag}
                </li>
              ))}
            </ul>
            <img
              src={gallery5}
              alt=""
              loading="lazy"
              width={1008}
              height={1312}
              className="aspect-[4/5] w-full object-cover"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Voices() {
  const { t } = useLocale();
  return (
    <section id="voices" className="scroll-mt-24 mx-auto max-w-[1240px] px-6 py-28 lg:px-10 lg:py-36">
      <Reveal>
        <div className="max-w-xl">
          <Eyebrow>{t.voices.eyebrow}</Eyebrow>
          <h2 className="font-display mt-6 text-4xl leading-[1.14] lg:text-5xl">
            {t.voices.title}
          </h2>
        </div>
      </Reveal>

      <div className="mt-16 grid gap-10 md:grid-cols-3">
        {t.voices.quotes.map((q, i) => (
          <Reveal key={q.name} delay={i * 110}>
            <figure className="flex h-full flex-col justify-between border-t border-border pt-7">
              <blockquote className="font-display text-xl leading-[1.6] lg:text-2xl">
                “{q.text}”
              </blockquote>
              <figcaption className="mt-8 text-[0.72rem] uppercase tracking-[0.2em] text-muted-foreground">
                {q.name} · {q.role}
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>

      <Reveal delay={100}>
        <div className="mt-24 grid grid-cols-2 gap-y-12 border-y border-border py-14 lg:grid-cols-4">
          {t.voices.stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="font-display text-4xl lg:text-5xl">{s.value}</p>
              <p className="mt-3 text-[0.7rem] uppercase tracking-[0.22em] text-muted-foreground">
                {s.label}
              </p>
            </div>
          ))}
        </div>
        <p className="mt-4 text-center text-[0.72rem] text-muted-foreground">
          {t.voices.statsNote}
        </p>
      </Reveal>
    </section>
  );
}

function DownloadCta() {
  const { t } = useLocale();
  return (
    <section id="download" className="scroll-mt-24 bg-primary text-primary-foreground">
      <div className="mx-auto grid max-w-[1240px] gap-12 px-6 py-28 lg:grid-cols-[1fr_0.8fr] lg:items-center lg:px-10 lg:py-36">
        <Reveal>
          <div>
            <p className="text-[0.68rem] uppercase tracking-[0.36em] opacity-70">
              {t.download.eyebrow}
            </p>
            <h2 className="font-display mt-6 text-4xl leading-[1.14] lg:text-5xl">
              {t.download.title}
            </h2>
            <p className="mt-6 max-w-lg text-[0.95rem] leading-[1.95] opacity-80">
              {t.download.body}
            </p>
          </div>
        </Reveal>
        <Reveal delay={110}>
          <div className="space-y-5">
            <div className="flex flex-wrap gap-3">
              <span
                aria-disabled="true"
                className="inline-flex cursor-not-allowed items-center justify-center border border-primary-foreground/25 px-7 py-3.5 text-[0.74rem] uppercase tracking-[0.2em] opacity-60"
              >
                {t.cta.ios}
              </span>
              <a
                href={downloadLinks.android}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center bg-primary-foreground px-7 py-3.5 text-[0.74rem] uppercase tracking-[0.2em] text-primary transition-opacity hover:opacity-85"
              >
                {t.cta.android}
              </a>
            </div>
            {!downloadLinks.iosReady && (
              <p className="text-[0.75rem] leading-relaxed opacity-70">{t.download.pending}</p>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Faq() {
  const { t } = useLocale();
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="scroll-mt-24 mx-auto max-w-[1240px] px-6 py-28 lg:px-10 lg:py-36">
      <div className="grid gap-12 lg:grid-cols-[0.7fr_1fr]">
        <Reveal>
          <div>
            <Eyebrow>{t.faq.eyebrow}</Eyebrow>
            <h2 className="font-display mt-6 text-4xl leading-[1.14] lg:text-5xl">{t.faq.title}</h2>
          </div>
        </Reveal>
        <Reveal delay={100}>
          <div className="border-t border-border">
            {t.faq.items.map((item, i) => (
              <div key={item.q} className="border-b border-border">
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="flex w-full items-center justify-between gap-6 py-6 text-left"
                >
                  <span className="font-display text-xl lg:text-2xl">{item.q}</span>
                  <span className="text-muted-foreground">{open === i ? "—" : "+"}</span>
                </button>
                <div
                  className={`grid transition-all duration-500 ${
                    open === i ? "grid-rows-[1fr] pb-7 opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <p className="overflow-hidden text-[0.9rem] leading-[1.95] text-muted-foreground">
                    {item.a}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function SiteFooter() {
  const { t } = useLocale();
  const links = [
    { href: "#features", label: t.nav.features },
    { href: "#community", label: t.nav.community },
    { href: "#voices", label: t.nav.voices },
    { href: "#download", label: t.nav.download },
    { href: "#faq", label: t.nav.faq },
  ];
  return (
    <footer className="bg-secondary/50">
      <div className="mx-auto max-w-[1240px] px-6 py-16 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-[1fr_auto]">
          <div>
            <p className="font-display text-3xl">
              {t.brand} <span className="text-muted-foreground">{t.brandTagline}</span>
            </p>
            <p className="mt-4 max-w-md text-[0.88rem] leading-[1.9] text-muted-foreground">
              {t.footer.blurb}
            </p>
          </div>
          <nav className="flex flex-wrap gap-x-8 gap-y-3 lg:justify-end">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-[0.74rem] uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-foreground"
              >
                {l.label}
              </a>
            ))}
          </nav>
        </div>
        <p className="mt-14 text-[0.7rem] uppercase tracking-[0.2em] text-muted-foreground">
          © {new Date().getFullYear()} Qorange · {t.footer.rights}
        </p>
      </div>
    </footer>
  );
}

export function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        <Hero />
        <Features />
        <ProductShowcase />
        <Community />
        <Voices />
        <DownloadCta />
        <Faq />
      </main>
      <SiteFooter />
    </div>
  );
}
