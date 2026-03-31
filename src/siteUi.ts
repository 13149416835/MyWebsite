import type { SiteLang } from "./i18n";

export const LANG_SELECT_OPTIONS: { value: SiteLang; label: string }[] = [
  { value: "en", label: "English" },
  { value: "zh", label: "中文" },
  { value: "ja", label: "日本語" },
  { value: "ko", label: "한국어" },
];

export type HomeCopy = {
  lead: string;
  apiDocs: string;
  h1: string;
  h2: string;
  pricingTitle: string;
  pricingMuted: string;
  thPlan: string;
  thPrice: string;
  thQuota: string;
  thFor: string;
  trial: string;
  starter: string;
  developer: string;
  custom: string;
  trialQuota: string;
  starterQuota: string;
  devQuota: string;
  customPrice: string;
  customQuota: string;
  /** 定价表「付款」列按钮文字 */
  trialBuy: string;
  starterBuy: string;
  devBuy: string;
  customBuy: string;
  /** 保留兼容，不再用于表格 */
  customFor: string;
  trialFor: string;
  starterFor: string;
  devFor: string;
  noteStrong: string;
  noteText: string;
  payment: string;
  pay1: string;
  pay2Before: string;
  pay2Strong: string;
  pay2After: string;
  pay3Before: string;
  pay3After: string;
  pay4: string;
  faq: string;
  faq1q: string;
  faq1a: string;
  faq2q: string;
  faq2a: string;
  faq3q: string;
  faq3a: string;
  faq4q: string;
  faq4a: string;
  contact: string;
  contactMuted: string;
  email: string;
};

export const homeUi: Record<SiteLang, HomeCopy> = {
  en: {
    lead: "Transparent token-based usage.",
    apiDocs: "API Docs",
    h1: "Unified gateway and independent customer API keys",
    h2: "Choose any supported model per request; gateway routes to the right provider automatically",
    pricingTitle: "Pricing",
    pricingMuted:
      "Click the button to pay via PayPal. After payment, contact us on Telegram with your email and order screenshot to receive your API key within 2 hours.",
    thPlan: "Plan",
    thPrice: "Price",
    thQuota: "Quota",
    thFor: "Purchase",
    trial: "Trial",
    starter: "Starter",
    developer: "Developer",
    custom: "Custom",
    trialQuota: "0.5M tokens",
    starterQuota: "2.5M tokens",
    devQuota: "7M tokens",
    customPrice: "From $10",
    customQuota: "$10 per 1M tokens",
    trialBuy: "Buy Now $5",
    starterBuy: "Buy Now $20",
    devBuy: "Buy Now $50",
    customBuy: "Custom Amount",
    customFor: "Flexible needs",
    trialFor: "Testing, students",
    starterFor: "Daily development",
    devFor: "Production projects",
    noteStrong: "Note:",
    noteText:
      "0.5M tokens are roughly equal to 500–1000 chats (assuming 500–1000 tokens per chat including input and output). Real usage varies by model and prompt style.",
    payment: "How to get your API key",
    pay1: "Click the purchase button above and complete the PayPal payment.",
    pay2Before: "Contact us on Telegram",
    pay2Strong: "@xiaoqiangapi",
    pay2After: " and send your payment screenshot + email address.",
    pay3Before: "We will issue your API key within",
    pay3After: " 2 hours after confirming payment.",
    pay4: "Your key is sent via Telegram or email.",
    faq: "FAQ",
    faq1q: "What if my quota runs out?",
    faq1a:
      "We notify you in advance by email / Telegram. After recharge, quota increases automatically and your API key stays the same.",
    faq2q: "Do you support streaming output?",
    faq2a: "Yes. Set stream: true in the request body to enable SSE streaming (see API docs).",
    faq3q: "How do I check remaining quota?",
    faq3a:
      "Call GET https://api.xiaoqiangonline.shop/v1/account/balance with header Authorization: Bearer <your API key>. The JSON field balance is your remaining tokens. You can also contact us via Telegram or email.",
    faq4q: "Is the gateway stable?",
    faq4a: "Built on Cloudflare global network, with 99.9%+ availability in recent months.",
    contact: "Contact",
    contactMuted: "Technical support and business inquiry",
    email: "Email",
  },
  zh: {
    lead: "按 Token 计量额度，用量透明。",
    apiDocs: "API 文档",
    h1: "统一网关接入与独立客户 Key",
    h2: "按需在请求中选择模型，网关自动匹配对应上游线路",
    pricingTitle: "定价",
    pricingMuted: "点击按钮通过 PayPal 付款，付款后联系 Telegram 并发送截图与邮箱，2 小时内发放 API Key。",
    thPlan: "套餐",
    thPrice: "价格",
    thQuota: "额度",
    thFor: "付款",
    trial: "体验包",
    starter: "入门包",
    developer: "开发包",
    custom: "自定义充值",
    trialQuota: "50 万 Token",
    starterQuota: "250 万 Token",
    devQuota: "700 万 Token",
    customPrice: "$10 起",
    customQuota: "按 $10 / 百万 Token 比例",
    trialBuy: "立即购买 $5",
    starterBuy: "立即购买 $20",
    devBuy: "立即购买 $50",
    customBuy: "自定义金额",
    customFor: "灵活需求",
    trialFor: "试用、学生",
    starterFor: "日常开发",
    devFor: "正式项目",
    noteStrong: "备注：",
    noteText:
      "50 万 Token 约相当于 500～1000 次对话（按每次对话平均消耗 500～1000 Token 估算，含输入与输出）。实际用量因模型与使用方式而异。",
    payment: "如何获得 API Key",
    pay1: "点击上方对应套餐的购买按钮，完成 PayPal 付款。",
    pay2Before: "通过 Telegram 联系",
    pay2Strong: "@xiaoqiangapi",
    pay2After: "，发送付款截图与您的邮箱。",
    pay3Before: "确认到账后",
    pay3After: " 2 小时内发放 API Key。",
    pay4: "Key 通过 Telegram 或邮件发送给您。",
    faq: "常见问题",
    faq1q: "额度用完了怎么办？",
    faq1a: "我们会通过邮件 / Telegram 提前通知。续费后额度自动增加，API Key 不变。",
    faq2q: "支持流式输出吗？",
    faq2a: "支持。在请求体中设置 stream: true 即可开启 SSE 流式（详见 API 文档）。",
    faq3q: "怎么查看剩余额度？",
    faq3a:
      "请按 API 文档自助查询：对 GET https://api.xiaoqiangonline.shop/v1/account/balance 发起请求，请求头携带 Authorization: Bearer <您的 API Key>，返回 JSON 中的 balance 即为剩余 Token 额度。也可通过 Telegram 或邮件联系我们查询。",
    faq4q: "网关稳定吗？",
    faq4a: "基于 Cloudflare 全球网络搭建，过去 3 个月可用性 99.9% 以上。",
    contact: "联系",
    contactMuted: "技术支持与商务",
    email: "邮箱",
  },
  ja: {
    lead: "トークンに基づく従量制で、利用量が分かりやすい構成です。",
    apiDocs: "API ドキュメント",
    h1: "統一ゲートウェイとお客様専用 API キー",
    h2: "リクエストごとに対応モデルを選べば、ゲートウェイが自動で適切なプロバイダへルーティングします",
    pricingTitle: "料金",
    pricingMuted:
      "ボタンをクリックして PayPal でお支払いください。支払い後、Telegram でスクリーンショットとメールアドレスをお送りいただくと、2 時間以内に API キーを発行します。",
    thPlan: "プラン",
    thPrice: "価格",
    thQuota: "枠",
    thFor: "購入",
    trial: "トライアル",
    starter: "スターター",
    developer: "開発者",
    custom: "カスタム",
    trialQuota: "50 万トークン",
    starterQuota: "250 万トークン",
    devQuota: "700 万トークン",
    customPrice: "$10 ～",
    customQuota: "100 万トークンあたり $10",
    trialBuy: "今すぐ購入 $5",
    starterBuy: "今すぐ購入 $20",
    devBuy: "今すぐ購入 $50",
    customBuy: "カスタム金額",
    customFor: "柔軟なニーズ向け",
    trialFor: "試用・学習向け",
    starterFor: "日常開発向け",
    devFor: "本番プロジェクト向け",
    noteStrong: "目安：",
    noteText:
      "50 万トークンは、1 回の会話あたり 500～1000 トークン（入出力含む）と仮定すると、おおよそ 500～1000 回の会話に相当します。実際の消費はモデルやプロンプトにより異なります。",
    payment: "API キーの取得方法",
    pay1: "上記の購入ボタンをクリックし、PayPal でお支払いを完了してください。",
    pay2Before: "Telegram",
    pay2Strong: "@xiaoqiangapi",
    pay2After: " にお支払いのスクリーンショットとメールアドレスをお送りください。",
    pay3Before: "入金確認後",
    pay3After: " 2 時間以内に API キーを発行します。",
    pay4: "キーは Telegram またはメールでお届けします。",
    faq: "よくある質問",
    faq1q: "枠を使い切ったら？",
    faq1a:
      "メール / Telegram で事前にお知らせします。再チャージ後は枠が自動で増え、API キーはそのままです。",
    faq2q: "ストリーミング出力は？",
    faq2a: "対応しています。リクエストボディで stream: true とすると SSE ストリーミングになります（API ドキュメント参照）。",
    faq3q: "残り枠の確認方法は？",
    faq3a:
      "GET https://api.xiaoqiangonline.shop/v1/account/balance に Authorization: Bearer <API キー> を付けて呼び出してください。JSON の balance が残トークンです。Telegram やメールでもお問い合わせいただけます。",
    faq4q: "ゲートウェイは安定していますか？",
    faq4a: "Cloudflare のグローバルネットワーク上に構築しており、直近の可用性は 99.9% 超です。",
    contact: "お問い合わせ",
    contactMuted: "技術サポート・ビジネス窓口",
    email: "メール",
  },
  ko: {
    lead: "토큰 기준 과금으로 사용량이 투명합니다.",
    apiDocs: "API 문서",
    h1: "통합 게이트웨이와 고객별 독립 API 키",
    h2: "요청마다 지원 모델을 선택하면 게이트웨이가 자동으로 해당 공급자로 라우팅합니다",
    pricingTitle: "요금",
    pricingMuted:
      "버튼을 클릭하여 PayPal로 결제하세요. 결제 후 Telegram으로 스크린샷과 이메일을 보내주시면 2시간 이내에 API 키를 발급합니다.",
    thPlan: "플랜",
    thPrice: "가격",
    thQuota: "쿼터",
    thFor: "구매",
    trial: "체험",
    starter: "스타터",
    developer: "개발자",
    custom: "맞춤",
    trialQuota: "50만 토큰",
    starterQuota: "250만 토큰",
    devQuota: "700만 토큰",
    customPrice: "$10 부터",
    customQuota: "백만 토큰당 $10",
    trialBuy: "지금 구매 $5",
    starterBuy: "지금 구매 $20",
    devBuy: "지금 구매 $50",
    customBuy: "맞춤 금액",
    customFor: "유연한 수요",
    trialFor: "시험·학생",
    starterFor: "일상 개발",
    devFor: "프로덕션",
    noteStrong: "참고:",
    noteText:
      "50만 토큰은 대화 1회당 500～1000토큰(입·출력 포함)을 가정하면 약 500～1000회 대화에 해당합니다. 실제 사용량은 모델과 프롬프트에 따라 다릅니다.",
    payment: "API 키 받는 방법",
    pay1: "위 구매 버튼을 클릭하여 PayPal 결제를 완료하세요.",
    pay2Before: "Telegram",
    pay2Strong: "@xiaoqiangapi",
    pay2After: " 으로 결제 스크린샷과 이메일 주소를 보내 주세요.",
    pay3Before: "입금 확인 후",
    pay3After: " 2시간 이내에 API 키를 발급합니다.",
    pay4: "키는 Telegram 또는 이메일로 전달됩니다.",
    faq: "자주 묻는 질문",
    faq1q: "쿼터가 다 쓰이면?",
    faq1a:
      "이메일 / Telegram으로 미리 알려 드립니다. 충전 후 쿼터가 자동으로 늘어나며 API 키는 동일합니다.",
    faq2q: "스트리밍 출력을 지원하나요?",
    faq2a: "네. 요청 본문에 stream: true를 설정하면 SSE 스트리밍이 됩니다(API 문서 참고).",
    faq3q: "남은 쿼터는 어떻게 확인하나요?",
    faq3a:
      "GET https://api.xiaoqiangonline.shop/v1/account/balance 에 Authorization: Bearer <API 키> 헤더를 붙여 호출하세요. JSON의 balance가 남은 토큰입니다. Telegram·이메일로도 문의 가능합니다.",
    faq4q: "게이트웨이는 안정적인가요?",
    faq4a: "Cloudflare 글로벌 네트워크 기반이며 최근 가용성 99.9% 이상입니다.",
    contact: "문의",
    contactMuted: "기술 지원·비즈니스",
    email: "이메일",
  },
};

export const navUi: Record<SiteLang, { home: string; docs: string }> = {
  en: { home: "Home", docs: "Docs" },
  zh: { home: "主页", docs: "文档" },
  ja: { home: "ホーム", docs: "ドキュメント" },
  ko: { home: "홈", docs: "문서" },
};
