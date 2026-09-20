import type { PollOption } from "@/lib/post.functions";

export function PollCard({
  question,
  options,
}: {
  question: string;
  options: PollOption[];
}) {
  const total = options.reduce((sum, option) => sum + option.votes, 0);

  return (
    <section className="border-border/70 bg-card/70 mt-8 rounded-sm border p-6 sm:p-8">
      <p className="text-[0.68rem] tracking-[0.3em] text-muted-foreground uppercase">投票</p>
      <h2 className="font-display mt-3 text-2xl leading-snug sm:text-[1.8rem]">{question}</h2>

      <ul className="mt-6 space-y-3">
        {options.map((option) => {
          const percent = total ? Math.round((option.votes / total) * 100) : 0;
          return (
            <li
              key={option.option_id}
              className="border-border/60 relative overflow-hidden rounded-sm border"
            >
              <div
                className="bg-sage/35 absolute inset-y-0 left-0 transition-all duration-700"
                style={{ width: `${percent}%` }}
                aria-hidden
              />
              <div className="relative flex items-center justify-between gap-4 px-4 py-3">
                <span className="text-[0.95rem]">{option.text}</span>
                <span className="text-[0.78rem] whitespace-nowrap text-muted-foreground">
                  {option.votes} 票 · {percent}%
                </span>
              </div>
            </li>
          );
        })}
      </ul>

      <p className="mt-5 text-[0.78rem] text-muted-foreground">
        共 {total} 人参与 · 在 青橙 App 内可参与投票
      </p>
    </section>
  );
}
