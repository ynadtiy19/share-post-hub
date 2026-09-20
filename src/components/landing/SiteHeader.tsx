import { useEffect, useState } from "react";
import { useLocale } from "@/i18n/LocaleProvider";
import { locales, localeLabels } from "@/i18n/messages";

export function SiteHeader() {
  const { t, locale, setLocale } = useLocale();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "#features", label: t.nav.features },
    { href: "#product", label: t.product.eyebrow },
    { href: "#community", label: t.nav.community },
    { href: "#voices", label: t.nav.voices },
    { href: "#faq", label: t.nav.faq },
  ];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-background/85 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-[1240px] items-center gap-6 px-6 py-5 lg:px-10">
        <a href="#top" className="flex items-baseline gap-2">
          <span className="font-display text-2xl">{t.brand}</span>
          <span className="text-[0.62rem] uppercase tracking-[0.34em] text-muted-foreground">
            {t.brandTagline}
          </span>
        </a>

        <nav className="ml-auto hidden items-center gap-9 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[0.78rem] tracking-[0.14em] text-muted-foreground uppercase transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-4 md:ml-0">
          <div className="flex items-center gap-1 border border-border px-1 py-1">
            {locales.map((l) => (
              <button
                key={l}
                onClick={() => setLocale(l)}
                className={`px-2 py-1 text-[0.68rem] tracking-[0.12em] transition-colors ${
                  locale === l
                    ? "bg-secondary text-secondary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {localeLabels[l]}
              </button>
            ))}
          </div>
          <a
            href="#download"
            className="hidden bg-primary px-5 py-2.5 text-[0.72rem] uppercase tracking-[0.2em] text-primary-foreground transition-opacity hover:opacity-85 sm:inline-block"
          >
            {t.nav.download}
          </a>
        </div>
      </div>
    </header>
  );
}
