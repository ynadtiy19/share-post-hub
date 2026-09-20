export const locales = ["zh", "en", "ja"] as const;
export type Locale = (typeof locales)[number];

export const localeLabels: Record<Locale, string> = {
  zh: "中文",
  en: "EN",
  ja: "日本語",
};

export const localeHtmlLang: Record<Locale, string> = {
  zh: "zh-CN",
  en: "en",
  ja: "ja",
};

type Messages = {
  brand: string;
  brandTagline: string;
  nav: { features: string; community: string; voices: string; download: string; faq: string };
  cta: { download: string; ios: string; android: string };
  hero: {
    eyebrow: string;
    titleTop: string;
    titleAccent: string;
    subtitle: string;
    note: string;
    caption: string;
  };
  features: {
    eyebrow: string;
    title: string;
    intro: string;
    items: { title: string; body: string }[];
  };
  product: { eyebrow: string; title: string; intro: string; captions: string[] };
  community: {
    eyebrow: string;
    title: string;
    intro: string;
    tags: string[];
  };
  voices: {
    eyebrow: string;
    title: string;
    quotes: { text: string; name: string; role: string }[];
    stats: { value: string; label: string }[];
    statsNote: string;
  };
  download: {
    eyebrow: string;
    title: string;
    body: string;
    pending: string;
  };
  faq: { eyebrow: string; title: string; items: { q: string; a: string }[] };
  footer: { blurb: string; nav: string; rights: string };
};

export const messages: Record<Locale, Messages> = {
  zh: {
    brand: "青橙",
    brandTagline: "Qorange",
    nav: {
      features: "核心功能",
      community: "社区",
      voices: "用户之声",
      download: "下载",
      faq: "常见问题",
    },
    cta: { download: "下载青橙", ios: "iPhone 敬请期待", android: "Android 下载" },
    hero: {
      eyebrow: "在线内容创作 · 社交互动",
      titleTop: "把日常里的",
      titleAccent: "微光",
      subtitle:
        "青橙 Qorange 是一处安静的创作角落：写下、拍下、画下你在意的瞬间，再遇见同样在意的人。",
      note: "Android 现已开放下载 · iPhone 版敬请期待",
      caption: "清晨的第一段灵感，也值得被认真对待。",
    },
    features: {
      eyebrow: "核心功能",
      title: "创作与被看见，都可以慢一点",
      intro:
        "从灵感落笔到收获回响，青橙把复杂的工序收起来，只留下你想表达的那部分。",
      items: [
        {
          title: "顺手的创作台",
          body: "长文、图集、短片、手绘，一个编辑器里都能完成，草稿随时随地续写。",
        },
        {
          title: "会呼吸的灵感流",
          body: "按兴趣而非热度推荐，翻到的每一条都更接近你真正想看的内容。",
        },
        {
          title: "真诚的互动",
          body: "评论、共创、接龙创作，让回应不止是一个赞。",
        },
        {
          title: "小而暖的圈子",
          body: "建立只对同好开放的空间，谁能看见、谁能参与，由你决定。",
        },
      ],
    },
    product: {
      eyebrow: "真实产品界面",
      title: "从发现灵感，到深入交流",
      intro: "浏览内容、阅读长文、加入社群、即时聊天——青橙把创作和人与人的连接放在同一段自然流畅的体验里。",
      captions: ["内容推荐", "沉浸阅读", "主题商店", "发现社群", "兴趣探索", "个人主页", "即时聊天", "消息列表"],
    },
    community: {
      eyebrow: "社区",
      title: "此刻，有人正在创作",
      intro: "摄影、陶艺、写作、音乐——不同的手艺，在青橙彼此照亮。",
      tags: ["胶片日记", "手作陶艺", "深夜写作", "城市漫步", "一首歌一段路"],
    },
    voices: {
      eyebrow: "用户之声",
      title: "他们在青橙留下的话",
      quotes: [
        {
          text: "第一次觉得发东西不用担心数据，只是想把喜欢的分享出去。",
          name: "阿宁",
          role: "插画师",
        },
        {
          text: "在这里认识了一起拍胶片的朋友，周末真的会约着出门。",
          name: "Lex",
          role: "摄影爱好者",
        },
        {
          text: "圈子功能救了我的写作习惯，有人在等更新的感觉很好。",
          name: "小满",
          role: "写作者",
        },
      ],
      stats: [
        { value: "120万+", label: "创作者" },
        { value: "3800万", label: "累计作品" },
        { value: "4.9", label: "应用商店评分" },
        { value: "160+", label: "覆盖国家与地区" },
      ],
      statsNote: "以上为示例数据，可替换为正式统计。",
    },
    download: {
      eyebrow: "开始使用",
      title: "带着你的灵感，来青橙住一段时间",
      body: "点击下方按钮下载 Android 版。iPhone 版正在准备中，敬请期待。",
      pending: "iPhone 版暂未推出，敬请期待。",
    },
    faq: {
      eyebrow: "常见问题",
      title: "关于青橙",
      items: [
        { q: "青橙是免费的吗？", a: "创作与浏览的核心功能完全免费，后续会有可选的进阶创作工具。" },
        { q: "支持哪些创作形式？", a: "长文、图集、短视频、音频与手绘都支持，可以在同一篇作品里混排。" },
        { q: "我的作品会被随意推荐吗？", a: "每篇作品都可单独设置可见范围，私密内容不会进入公开推荐。" },
        { q: "可以从别的平台搬运作品吗？", a: "支持批量导入图文与视频，保留原有的时间线与标签。" },
      ],
    },
    footer: {
      blurb: "青橙 Qorange · 让创作回到愿意分享的那一刻。",
      nav: "导航",
      rights: "保留所有权利。",
    },
  },
  en: {
    brand: "Qorange",
    brandTagline: "青橙",
    nav: {
      features: "Features",
      community: "Community",
      voices: "Voices",
      download: "Download",
      faq: "FAQ",
    },
    cta: { download: "Get Qorange", ios: "iPhone — Coming soon", android: "Download for Android" },
    hero: {
      eyebrow: "Create online · Connect gently",
      titleTop: "Keep the quiet",
      titleAccent: "light",
      subtitle:
        "Qorange is a calm corner for making things — write it, shoot it, draw it, then find the people who care about the same things.",
      note: "Available now on Android · iPhone coming soon",
      caption: "The first idea of the morning deserves care too.",
    },
    features: {
      eyebrow: "Features",
      title: "Making and being seen, at a slower pace",
      intro:
        "From first draft to first reply, Qorange hides the machinery and keeps only the part you wanted to say.",
      items: [
        {
          title: "One easy studio",
          body: "Essays, photo sets, short films and sketches live in a single editor, with drafts that follow you everywhere.",
        },
        {
          title: "A feed that breathes",
          body: "Sorted by what you care about instead of what is loudest, so every scroll lands closer to home.",
        },
        {
          title: "Real conversation",
          body: "Comments, co-creation and relay pieces — replies that go further than a like.",
        },
        {
          title: "Small warm circles",
          body: "Open a space just for your people, and decide who can see and who can join.",
        },
      ],
    },
    product: {
      eyebrow: "Inside the app",
      title: "From finding an idea to a real conversation",
      intro: "Browse, read, join communities and chat — Qorange brings making and connecting into one natural flow.",
      captions: ["Home feed", "Focused reading", "Theme store", "Discover groups", "Explore interests", "Your profile", "Live chat", "Messages"],
    },
    community: {
      eyebrow: "Community",
      title: "Someone is creating right now",
      intro: "Photography, ceramics, writing, music — different crafts, lighting each other up.",
      tags: ["Film diary", "Handmade clay", "Late-night writing", "City walks", "One song, one road"],
    },
    voices: {
      eyebrow: "Voices",
      title: "What people leave behind here",
      quotes: [
        {
          text: "The first time posting felt free of metrics — I just wanted to share something I loved.",
          name: "Ning",
          role: "Illustrator",
        },
        {
          text: "I met people who shoot film here, and we actually go out on weekends.",
          name: "Lex",
          role: "Photographer",
        },
        {
          text: "Circles saved my writing habit. Knowing someone waits for the next page helps.",
          name: "Man",
          role: "Writer",
        },
      ],
      stats: [
        { value: "1.2M+", label: "Creators" },
        { value: "38M", label: "Works shared" },
        { value: "4.9", label: "App store rating" },
        { value: "160+", label: "Countries & regions" },
      ],
      statsNote: "Sample figures — replace with your official numbers.",
    },
    download: {
      eyebrow: "Get started",
      title: "Bring your ideas and stay a while",
      body: "Tap below to download the Android version. The iPhone version is coming soon.",
      pending: "The iPhone version is not available yet. Stay tuned.",
    },
    faq: {
      eyebrow: "FAQ",
      title: "About Qorange",
      items: [
        { q: "Is Qorange free?", a: "Creating and browsing are entirely free. Optional advanced tools will come later." },
        { q: "What formats can I post?", a: "Long-form text, photo sets, short video, audio and sketches — mixed inside one piece if you like." },
        { q: "Will my work be pushed to strangers?", a: "Every piece has its own visibility setting; private work never enters public recommendations." },
        { q: "Can I bring work from another platform?", a: "Yes — bulk import keeps your original timeline and tags." },
      ],
    },
    footer: {
      blurb: "Qorange — creating for the moment you actually want to share.",
      nav: "Navigate",
      rights: "All rights reserved.",
    },
  },
  ja: {
    brand: "Qorange",
    brandTagline: "青橙",
    nav: {
      features: "特徴",
      community: "コミュニティ",
      voices: "声",
      download: "ダウンロード",
      faq: "よくある質問",
    },
    cta: { download: "Qorange を入手", ios: "iPhone 版・近日公開", android: "Android 版をダウンロード" },
    hero: {
      eyebrow: "オンライン創作 · やさしいつながり",
      titleTop: "日々の小さな",
      titleAccent: "灯り",
      subtitle:
        "Qorange は静かな創作の場所。書いて、撮って、描いて、同じものを大切にする人と出会う。",
      note: "Android 版を配信中・iPhone 版は近日公開",
      caption: "朝いちばんの思いつきも、ていねいに。",
    },
    features: {
      eyebrow: "特徴",
      title: "つくることも、届くことも、ゆっくりで",
      intro: "下書きから最初の返信まで、余計な手間を隠して、伝えたい部分だけを残します。",
      items: [
        {
          title: "使いやすい作業台",
          body: "文章、写真集、ショート動画、手描き。ひとつのエディタで完結し、下書きはどこでも続けられます。",
        },
        {
          title: "呼吸するフィード",
          body: "話題の大きさではなく好みで並ぶので、めくるたびに自分に近づきます。",
        },
        {
          title: "まっすぐな交流",
          body: "コメント、共作、リレー創作。いいねの先にある応答を。",
        },
        {
          title: "小さく温かい輪",
          body: "同じ趣味の人だけの場所をつくり、見える人と参加できる人を自分で決められます。",
        },
      ],
    },
    product: {
      eyebrow: "実際の画面",
      title: "ひらめきとの出会いから、会話まで",
      intro: "コンテンツを探し、読み、コミュニティに参加して話す。創作とつながりが自然に続く体験です。",
      captions: ["おすすめ", "記事を読む", "テーマストア", "コミュニティ発見", "興味を探す", "プロフィール", "チャット", "メッセージ"],
    },
    community: {
      eyebrow: "コミュニティ",
      title: "いま、誰かがつくっている",
      intro: "写真、陶芸、文章、音楽。異なる手仕事が互いを照らします。",
      tags: ["フィルム日記", "手づくり陶器", "深夜の執筆", "街歩き", "一曲と一本の道"],
    },
    voices: {
      eyebrow: "声",
      title: "ここに残された言葉",
      quotes: [
        { text: "数字を気にせず投稿できたのは初めてでした。", name: "アニン", role: "イラストレーター" },
        { text: "フィルム仲間ができて、週末に本当に出かけています。", name: "Lex", role: "写真好き" },
        { text: "サークル機能のおかげで書く習慣が戻りました。", name: "小満", role: "書き手" },
      ],
      stats: [
        { value: "120万+", label: "クリエイター" },
        { value: "3800万", label: "作品数" },
        { value: "4.9", label: "ストア評価" },
        { value: "160+", label: "対応国・地域" },
      ],
      statsNote: "参考値です。正式な数値に差し替えできます。",
    },
    download: {
      eyebrow: "はじめる",
      title: "あなたの発想と一緒に、しばらく住んでみて",
      body: "下のボタンから Android 版をダウンロードできます。iPhone 版は準備中です。",
      pending: "iPhone 版は現在準備中です。もうしばらくお待ちください。",
    },
    faq: {
      eyebrow: "よくある質問",
      title: "Qorange について",
      items: [
        { q: "無料ですか？", a: "創作と閲覧の基本機能は無料です。将来的に任意の上級ツールを追加予定です。" },
        { q: "どんな形式に対応？", a: "長文、写真集、ショート動画、音声、手描き。ひとつの作品に混在できます。" },
        { q: "作品は勝手に拡散されますか？", a: "作品ごとに公開範囲を設定でき、非公開の内容は推薦に載りません。" },
        { q: "他のサービスから移せますか？", a: "一括インポートに対応し、投稿日時とタグを保持します。" },
      ],
    },
    footer: {
      blurb: "Qorange — 分かち合いたくなる瞬間のための創作。",
      nav: "ナビゲーション",
      rights: "All rights reserved.",
    },
  },
};
