import type { LandingContent } from '@/types/landing';

const lineUrl = process.env.NEXT_PUBLIC_LINE_OA_URL ?? 'https://lin.ee/mGVIRmw';

export const landingContent: LandingContent = {
  siteMeta: {
    title: 'Vibe Coding 工作術｜跟享哥一起用 AI 做出你的第一個銷售頁',
    description:
      '零程式基礎也能在 3 小時內做出可部署、可追蹤、可拿去賣的 MVP 銷售頁，報名流程導向 LINE，自動銜接後續名單與收款系統。',
    siteName: 'Vibe Coding 工作術',
    keywords: [
      'Vibe Coding',
      'AI 銷售頁',
      '課程銷售頁',
      'Next.js',
      'Tailwind CSS',
      'LINE 報名流程',
      '享哥',
    ],
  },
  hero: {
    eyebrow: '3 小時實作工作坊',
    title: '用 AI 跟享哥一起做出你的第一個銷售頁',
    subtitle:
      '零程式基礎、快速上手、可部署上線。你不只學概念，而是帶著一個真的能拿去用的 MVP 銷售頁離開教室。',
    countdownLabel: '早鳥截止 2026/12/31',
    deadlineLabel: '限時優惠保留位',
    seatsLabel: '剩餘 20 席',
  },
  trustMetrics: [
    { value: '3 小時', label: '實作交付節奏' },
    { value: '零基礎', label: '也能順著做完' },
    { value: '可上線', label: '帶走你的 MVP 銷售頁' },
  ],
  outcomes: [
    {
      id: 'results',
      title: '銷售頁樣板',
      summary: '完成一個可直接替換內容、立刻上線的課程或服務型 landing page。',
      bullets: ['Hero 區 + CTA 結構', '高轉換內容排序', '手機版與桌機版同步完成'],
    },
    {
      id: 'tracking',
      title: '名單與追蹤設定',
      summary: '知道怎麼埋 GA4、GTM 與像素事件，讓行銷不是只看感覺。',
      bullets: ['CTA 點擊追蹤', '頁面滾動深度事件', '後續廣告再行銷基礎'],
    },
    {
      id: 'deployment',
      title: '部署與版本控管',
      summary: '從 GitHub 到靜態部署流程完整走一遍，理解怎麼穩定發版。',
      bullets: ['GitHub Pages 上線', '版本回滾思路', '可複製到下次活動與專案'],
    },
  ],
  painPoints: [
    {
      title: '想做可上線的銷售頁，但技術門檻太高',
      description: '工具一堆、教學很多，但很少有人陪你真正把東西做完。',
    },
    {
      title: '跟工程師協作常常講不清楚',
      description: '需求卡在抽象描述，最後不是延期，就是做出來不是你要的。',
    },
    {
      title: '上過很多課，卻沒有可用的作品',
      description: '你需要的是能上線、能追蹤、能拿去賣的成果，不是更多空泛概念。',
    },
  ],
  solutionStatement:
    'Vibe Coding 用「感覺派程式素養」帶你把抽象需求拆成可執行頁面與流程，直接產出成果，同時提升與工程、設計、行銷之間的協作效率。',
  instructor: {
    name: '享哥',
    role: '生成式 AI 應用規劃師',
    bio: '擁有多年行銷實戰與 AI 應用經驗，擅長把抽象技術轉成可落地的成果流程，讓不懂程式的人也能跟著做、看得懂、做得出。',
    highlights: [
      '超過 10 年數位行銷與自動化整合經驗',
      'AI 實作與跨團隊溝通實戰者',
      '多場企業與院校講師經歷',
      '擅長把複雜流程拆成可直接複製的步驟',
    ],
    metrics: [
      { value: '10+ 年', label: '數位行銷與整合經驗' },
      { value: '跨部門', label: 'AI 導入與協作實戰' },
      { value: '企業 / 院校', label: '授課與工作坊經歷' },
    ],
    image: {
      src: '/seanhsu.jpg',
      alt: '講師享哥的形象示意圖',
    },
  },
  curriculum: [
    {
      step: '01',
      title: 'Vibe Coding 核心概念',
      detail: '建立你對 AI 寫站流程、提示設計與需求拆解的基本框架。',
      outcome: '知道如何把想法轉成可執行頁面規格',
    },
    {
      step: '02',
      title: '實作你的第一個銷售頁',
      detail: '從 Hero、CTA、成果展示到 FAQ，一次完成高轉換單頁架構。',
      outcome: '得到可立即替換內容的銷售頁骨架',
    },
    {
      step: '03',
      title: 'Next.js / TailwindCSS 快速入門',
      detail: '理解常見檔案結構、元件拆法與樣式系統，不靠死背語法。',
      outcome: '看得懂專案結構，敢自己改內容與樣式',
    },
    {
      step: '04',
      title: '設置追蹤與像素',
      detail: '把 CTA、滾動深度與再行銷所需事件埋好，資料才會留下來。',
      outcome: '具備 GA4 / GTM / Pixel 的基本追蹤能力',
    },
    {
      step: '05',
      title: '部署上線與版本管理',
      detail: '從 GitHub 到 GitHub Pages，完成實際發版與回滾概念。',
      outcome: '帶走一個真的可以上線的公開網址',
    },
  ],
  schedule: {
    courseDate: '2026/12/31',
    courseTime: '早上九點到下午五點',
    format: '實體工作坊 / 小班互動',
    venue: '雲端會議室',
    tools: ['筆電', 'Chrome 瀏覽器', 'GitHub 帳號', 'LINE 帳號'],
  },
  testimonials: [
    {
      quote: '跟享哥一起做完的銷售頁真的上線了！',
      author: '學員回饋 A',
      tag: '從想法到上線',
    },
    {
      quote: '不懂程式也能部署 + 追蹤設定，整個流程第一次真的看懂。',
      author: '學員回饋 B',
      tag: '零基礎也能完成',
    },
    {
      quote: '實際可用、可複製的流程太實在，回去馬上能套到自己的專案。',
      author: '學員回饋 C',
      tag: '流程可複製',
    },
  ],
  pricing: {
    plans: [
      {
        name: '單人票',
        price: '4800元',
        note: '適合想自己完成第一個可上線作品的個人學員。',
      },
      {
        name: '早鳥優惠',
        price: '2400元',
        note: '限時保留優惠名額，優先卡位本梯次工作坊。',
        featured: true,
      },
      {
        name: '雙人團報',
        price: '另洽',
        note: '適合共同學習與公司夥伴一起導入實作流程。',
      },
    ],
    urgency: ['早鳥截止 2026/12/12', '本梯次剩餘 20 席', '所有報名統一由 LINE 完成'],
  },
  signupFlow: [
    {
      title: '加入 LINE 官方帳號',
      description: '從任一 CTA 進入 LINE，先收到課程簡介與報名指引。',
    },
    {
      title: '點擊報名課程',
      description: '查看當前優惠價格、匯款資訊與報名步驟說明。',
    },
    {
      title: '完成匯款',
      description: '依指示匯款後，於 LINE 輸入「我已完成匯款」。',
    },
    {
      title: '輸入帳號後五碼',
      description: '系統送往 GAS 與 Google Sheet，等待人工對帳確認。',
    },
  ],
  faq: [
    {
      id: 'need-code',
      question: '是否需要會寫程式才能參加？',
      answer:
        '不用。課程設計就是為零基礎學員準備，你需要的是願意操作、願意跟著拆解步驟，課程會從理解結構與改內容開始帶。',
    },
    {
      id: 'tools',
      question: '上課前需要準備哪些工具？',
      answer:
        '請先準備筆電、穩定網路、GitHub 帳號、LINE 帳號與 Chrome 瀏覽器。若有常用 AI 工具帳號也可一起帶著使用。',
    },
    {
      id: 'materials',
      question: '上課後是否有教材或課後資源？',
      answer:
        '有。你會取得實作骨架、流程筆記與後續可複製的上線步驟，方便課後把自己的內容套進去繼續優化。',
    },
    {
      id: 'refund',
      question: '退款或改期政策怎麼安排？',
      answer:
        '目前先以 placeholder 呈現，建議正式內容補上改期、名額保留與退款時程。實作時已預留此區塊，之後可直接替換。',
    },
  ],
  finalCta: {
    title: '把這次學習變成你下一個可上線的成果',
    description:
      '如果你要的不是再看一門課，而是確實做出一個可部署、可追蹤、可複製的銷售頁，現在就先加入 LINE 卡位。',
  },
  footer: {
    contactEmail: 'seanhsu1313@gmail.com',
    privacyNote: '本頁面將使用 GA4 與 Meta Pixel 追蹤 CTA 與瀏覽行為，正式上線前請補齊隱私說明與聯絡資訊。',
  },
  line: {
    oaUrl: lineUrl,
  },
};
