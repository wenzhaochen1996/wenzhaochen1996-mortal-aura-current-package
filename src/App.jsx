  Search,
  Package,
  Tag,
  Globe,
  CreditCard,
  ShieldCheck,
  Menu,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

const STORAGE_KEY = "mortalAuraJewelryCMS";
const CART_KEY = "mortalAuraCart";
const LANGUAGE_KEY = "mortalAuraLanguage";
const ADMIN_KEY = "mortalAuraAdminMode";
const FIXED_CATEGORIES = ["All", "Ring", "Pendant", "Bracelet", "Set"];

const memoryStore = new Map();

function storageAvailable() {
  if (typeof window === "undefined") return false;
  try {
    const testKey = "__mortal_aura_storage_test__";
    window.localStorage.setItem(testKey, "1");
    window.localStorage.removeItem(testKey);
    return true;
  } catch {
    return false;
  }
}

function safeStorageGet(key) {
  if (storageAvailable()) {
    try {
      const value = window.localStorage.getItem(key);
      if (value !== null) return value;
    } catch {}
  }
  return memoryStore.has(key) ? memoryStore.get(key) : null;
}

function safeStorageSet(key, value) {
  const safeValue = typeof value === "string" ? value : JSON.stringify(value ?? null);
  memoryStore.set(key, safeValue);
  if (storageAvailable()) {
    try {
      window.localStorage.setItem(key, safeValue);
      return true;
    } catch {
      return false;
    }
  }
  return false;
}

function detectAdminMode() {
  if (typeof window === "undefined") return false;
  try {
    const params = new URLSearchParams(window.location.search);
    const byQuery = params.get("admin") === "1";
    const byLocalhost =
      window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1";
    const byStored = safeStorageGet(ADMIN_KEY) === "1";
    return byQuery || byLocalhost || byStored;
  } catch {
    return false;
  }
}

const UI_TEXTS = {
  en: {
    navHome: "Home",
    navCollections: "Collections",
    navWorks: "Works",
    navOneOfAKind: "One of a Kind",
    navStories: "Stories",
    navAbout: "About",
    navInstagram: "Instagram",
    navShipping: "Shipping",
    navContact: "Contact",
    collections: "Collections",
    works: "Works",
    oneOfAKind: "One of a Kind",
    stories: "Stories",
    about: "About",
    shipping: "Shipping",
    contact: "Contact",
    cart: "Cart",
    itemsSuffix: "item(s)",
    searchPlaceholder: "Search by title, SKU, stone, collection...",
    featured: "Featured",
    addToCart: "Add to Cart",
    emptyCart: "Your cart is empty.",
    subtotal: "Subtotal",
    japanShipping: "Japan shipping",
    internationalShipping: "International shipping",
    clearCart: "Clear Cart",
    goToCheckout: "Go to Checkout",
    checkout: "Checkout",
    checkoutSub: "Order summary and customer details",
    customer: "Customer",
    fullName: "Full Name",
    email: "Email",
    country: "Country / Region",
    city: "City",
    address: "Address",
    orderNote: "Order Note",
    checkoutActions: "Checkout Actions",
    payWithPayPal: "Pay with PayPal",
    multiItemNotice:
      "Multi-item checkout is currently handled by manual confirmation or individual PayPal links.",
    sendOrderByEmail: "Send Order by Email",
    orderSummary: "Order Summary",
    purchase: "Purchase",
    buyWithPayPal: "Buy with PayPal",
    addPayPalNotice:
      "Add a PayPal payment link in the CMS to activate direct purchase for this item.",
    material: "Material",
    stone: "Stone",
    size: "Size",
    sku: "SKU",
    edition: "Edition",
    stock: "Stock",
    inStock: "In Stock",
    soldOut: "Sold Out",
    madeToOrder: "Made to Order",
    japan: "Japan",
    international: "International",
    currency: "Currency",
    region: "Region",
    ems2kg: "2kg EMS",
    viewDetails: "View Details",
    viewMore: "View More",
    viewLess: "Show Less",
    menu: "Menu",
    noOneOfAKind: "No One of a Kind works yet.",
    noMemoryWorks: "No works yet.",
  },
  ja: {
    navHome: "ホーム",
    navCollections: "系列",
    navWorks: "作品",
    navOneOfAKind: "一点物",
    navStories: "物語",
    navAbout: "ブランド",
    navInstagram: "Instagram",
    navShipping: "配送",
    navContact: "連絡先",
    collections: "系列",
    works: "作品",
    oneOfAKind: "一点物",
    stories: "物語",
    about: "ブランド",
    shipping: "配送",
    contact: "連絡先",
    cart: "カート",
    itemsSuffix: "点",
    searchPlaceholder: "作品名・SKU・宝石・系列で検索...",
    featured: "注目作品",
    addToCart: "カートに追加",
    emptyCart: "カートは空です。",
    subtotal: "小計",
    japanShipping: "国内送料",
    internationalShipping: "海外送料",
    clearCart: "カートを空にする",
    goToCheckout: "チェックアウトへ",
    checkout: "チェックアウト",
    checkoutSub: "注文内容とお客様情報",
    customer: "お客様情報",
    fullName: "氏名",
    email: "メールアドレス",
    country: "国・地域",
    city: "市区町村",
    address: "住所",
    orderNote: "備考",
    checkoutActions: "お支払い方法",
    payWithPayPal: "PayPalで支払う",
    multiItemNotice:
      "複数商品の同時決済は現在、個別PayPalリンクまたは手動確認で対応しています。",
    sendOrderByEmail: "メールで注文内容を送信",
    orderSummary: "注文概要",
    purchase: "購入",
    buyWithPayPal: "PayPalで購入",
    addPayPalNotice:
      "この商品の直接購入を有効にするには、CMSでPayPalリンクを追加してください。",
    material: "素材",
    stone: "宝石",
    size: "サイズ",
    sku: "SKU",
    edition: "仕様",
    stock: "在庫",
    inStock: "在庫あり",
    soldOut: "売り切れ",
    madeToOrder: "受注制作",
    japan: "日本国内",
    international: "海外",
    currency: "通貨",
    region: "地域",
    ems2kg: "EMS 2kg",
    viewDetails: "詳細を見る",
    viewMore: "もっと見る",
    viewLess: "折りたたむ",
    menu: "メニュー",
    noOneOfAKind: "一点物はまだありません。",
    noMemoryWorks: "作品はまだありません。",
  },
  zh: {
    navHome: "首页",
    navCollections: "系列",
    navWorks: "作品",
    navOneOfAKind: "孤品",
    navStories: "故事",
    navAbout: "关于",
    navInstagram: "Instagram",
    navShipping: "配送",
    navContact: "联系",
    collections: "系列",
    works: "作品",
    oneOfAKind: "孤品",
    stories: "故事",
    about: "关于",
    shipping: "配送",
    contact: "联系",
    cart: "购物车",
    itemsSuffix: "件",
    searchPlaceholder: "按作品名、SKU、宝石、系列搜索...",
    featured: "精选",
    addToCart: "加入购物车",
    emptyCart: "购物车为空。",
    subtotal: "小计",
    japanShipping: "日本国内运费",
    internationalShipping: "海外运费",
    clearCart: "清空购物车",
    goToCheckout: "前往结账",
    checkout: "结账",
    checkoutSub: "订单摘要与客户信息",
    customer: "客户信息",
    fullName: "姓名",
    email: "邮箱",
    country: "国家 / 地区",
    city: "城市",
    address: "地址",
    orderNote: "订单备注",
    checkoutActions: "结账方式",
    payWithPayPal: "使用 PayPal 支付",
    multiItemNotice: "多件商品目前通过人工确认或分别使用 PayPal 链接结算。",
    sendOrderByEmail: "通过邮件发送订单",
    orderSummary: "订单摘要",
    purchase: "购买",
    buyWithPayPal: "用 PayPal 购买",
    addPayPalNotice: "请在 CMS 中添加 PayPal 支付链接以启用此商品的直接购买。",
    material: "材质",
    stone: "宝石",
    size: "尺寸",
    sku: "SKU",
    edition: "版本",
    stock: "库存",
    inStock: "有货",
    soldOut: "售罄",
    madeToOrder: "接受定制",
    japan: "日本国内",
    international: "海外",
    currency: "货币",
    region: "地区",
    ems2kg: "EMS 2kg",
    viewDetails: "查看详情",
    viewMore: "查看更多",
    viewLess: "收起",
    menu: "菜单",
    noOneOfAKind: "暂时还没有孤品作品。",
    noMemoryWorks: "暂时还没有作品。",
  },
};

const initialContent = {
  sections: {
    hero: true,
    collections: true,
    works: true,
    oneOfAKind: true,
    stories: true,
    about: true,
    instagram: true,
    shipping: true,
    contact: true,
  },
  brandName: "Mortal Aura",
  hero: {
    eyebrow: "Dark Jewelry Brand",
    title: "Mortal Aura",
    subtitle: "Silver / Sin / Myth",
    ctaPrimary: "View Collection",
    ctaSecondary: "Shipping Policy",
    backgroundImage:
      "https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=1600&q=80",
  },
  store: {
    currency: "JPY",
    domesticFreeShippingThreshold: "20000",
    internationalFreeShippingThreshold: "100000",
    japanShippingNote: "Japan domestic shipping is free for orders over ¥20,000.",
    internationalShippingNote:
      "International shipping is free for orders over ¥100,000. Orders below the threshold are charged by destination based on Japan Post EMS 2kg rates.",
    checkoutNote:
      "Cart checkout is currently handled through direct PayPal links or manual confirmation for multiple-item orders.",
  },
  collectionsIntro: {
    sectionTitle: "Collections",
    sectionText:
      "Browse the world of Mortal Aura through distinct lines and narrative groupings.",
    items: [
      {
        title: "Sins of the Throne",
        subtitle: "Core Line",
        description: "The central sin series of Mortal Aura.",
        image:
          "https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=1200&q=80",
        targetCollection: "Sins of the Throne",
        enabled: true,
        shape: "long",
      },
      {
        title: "Interchangeable System",
        subtitle: "Modular",
        description: "Modules, structures, and replaceable forms.",
        image:
          "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1200&q=80",
        targetCollection: "Interchangeable System",
        enabled: true,
        shape: "round",
      },
      {
        title: "One of a Kind",
        subtitle: "Unique Works",
        description: "Singular pieces with individual presence.",
        image:
          "https://images.unsplash.com/photo-1543295204-8e6d9c3f2acb?auto=format&fit=crop&w=1200&q=80",
        targetCollection: "One of a Kind",
        enabled: true,
        shape: "long",
      },
      {
        title: "Ritual Objects",
        subtitle: "Symbolic",
        description: "Objects shaped by rite, sign, and memory.",
        image:
          "https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=1200&q=80",
        targetCollection: "Ritual Objects",
        enabled: false,
        shape: "round",
      },
      {
        title: "Heraldic Forms",
        subtitle: "Emblems",
        description: "Crests, silhouettes, and icon-like metal forms.",
        image:
          "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1200&q=80",
        targetCollection: "Heraldic Forms",
        enabled: false,
        shape: "long",
      },
      {
        title: "Archive",
        subtitle: "Past Releases",
        description: "Past drops, studies, and closed editions.",
        image:
          "https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=1200&q=80",
        targetCollection: "Archive",
        enabled: false,
        shape: "round",
      },
    ],
  },
  worksIntro: {
    sectionTitle: "Selected Works",
    sectionText:
      "A dark silver jewelry language shaped by mythology, sin, ritual, and human desire.",
  },
  oneOfAKindIntro: {
    sectionTitle: "One of a Kind",
    sectionText:
      "Singular works, individual editions, and pieces that stand apart from the main line.",
  },
  storiesIntro: {
    sectionTitle: "Small Stories",
    sectionText:
      "Two intimate lines placed side by side: keepsakes for memory, and pieces meant for someone beloved.",
    leftTitle: "My Memories",
    leftText: "Small keepsakes, traces, and intimate fragments of time.",
    rightTitle: "For Your Lover",
    rightText: "Objects prepared as gifts, tokens, and quiet confessions.",
  },
  visualSystem: {
    showWatermark: true,
    watermarkText: "M.A",
    watermarkOpacity: "18",
    instagramSectionTitle: "Instagram Grid Preview",
    instagramSectionText:
      "A unified image system for product main visuals, detail shots, and social media presentation.",
  },
  shipping: {
    sectionTitle: "Shipping Policy",
    description:
      "Free shipping within Japan on orders over ¥20,000. Free international shipping on orders over ¥100,000. For orders below the free-shipping threshold, EMS shipping is charged by region based on Japan Post 2kg rates.",
    rates: [
      { region: "China / South Korea / Taiwan", price: "¥3,400" },
      { region: "Asia (excluding CN/KR/TW)", price: "¥4,550" },
      { region: "Oceania / Canada / Mexico / Middle East / Europe", price: "¥6,700" },
      { region: "United States", price: "¥7,900" },
      { region: "Central & South America / Africa", price: "¥8,100" },
    ],
    note:
      "Shipping availability and delivery times may vary depending on destination and Japan Post service status.",
  },
  works: [
    {
      title: "Mammon",
      collection: "Sins of the Throne",
      subtitle: "Greed",
      category: "Pendant",
      sku: "MA-GREED-001",
      image:
        "https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=1200&q=80",
      images: [
        "https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=1200&q=80",
      ],
      description:
        "Lion-like avarice cast into silver. A piece about possession, fear, and glittering obsession.",
      homeExcerpt: "Lion-like avarice cast into silver.",
      material: "Silver 925",
      stone: "Citrine",
      size: "48 mm",
      edition: "One Piece",
      price: "¥58,000",
      stock: "1",
      status: "In Stock",
      featured: true,
      paypalPaymentUrl: "https://www.paypal.com/ncp/payment/C9Z2DYJ7PBZLQ",
    },
    {
      title: "Asmodeus",
      collection: "Sins of the Throne",
      subtitle: "Lust",
      category: "Pendant",
      sku: "MA-LUST-001",
      image:
        "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1200&q=80",
      images: [
        "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1200&q=80",
      ],
      description:
        "A refined silhouette hiding heat beneath elegance, lace, and floral temptation.",
      homeExcerpt: "Heat concealed beneath elegance, lace, and temptation.",
      material: "Silver 925",
      stone: "Morganite",
      size: "44 mm",
      edition: "One Piece",
      price: "¥62,000",
      stock: "1",
      status: "In Stock",
      featured: false,
      paypalPaymentUrl: "",
    },
    {
      title: "Belphegor",
      collection: "Sins of the Throne",
      subtitle: "Sloth",
      category: "Pendant",
      sku: "MA-SLOTH-001",
      image:
        "https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=1200&q=80",
      images: [
        "https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=1200&q=80",
      ],
      description:
        "A sleeping core beneath a brutal outer shell, where false menace protects endless rest.",
      homeExcerpt: "A sleeping core beneath a brutal outer shell.",
      material: "Silver 925",
      stone: "Tsavorite",
      size: "46 mm",
      edition: "One Piece",
      price: "¥61,000",
      stock: "0",
      status: "Sold Out",
      featured: false,
      paypalPaymentUrl: "",
    },
    {
      title: "Abaddon",
      collection: "Sins of the Throne",
      subtitle: "Cruelty",
      category: "Pendant",
      sku: "MA-CRUELTY-001",
      image:
        "https://images.unsplash.com/photo-1543295204-8e6d9c3f2acb?auto=format&fit=crop&w=1200&q=80",
      images: [
        "https://images.unsplash.com/photo-1543295204-8e6d9c3f2acb?auto=format&fit=crop&w=1200&q=80",
      ],
      description:
        "Sharp, devouring, relentless. A form built from erosion, wings, hunger, and execution.",
      homeExcerpt: "Sharp, devouring, relentless.",
      material: "Silver 925",
      stone: "Peridot",
      size: "50 mm",
      edition: "One Piece",
      price: "¥64,000",
      stock: "1",
      status: "In Stock",
      featured: true,
      paypalPaymentUrl: "",
    },
  ],
  oneOfAKindWorks: [
    {
      title: "Lilith Prototype",
      subtitle: "Rebellion",
      category: "Pendant",
      collection: "One of a Kind",
      sku: "MA-OOAK-001",
      image:
        "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1200&q=80",
      images: [
        "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1200&q=80",
      ],
      description:
        "A singular studio piece kept outside the main line, intended as a unique object with no second edition.",
      homeExcerpt: "A singular studio piece outside the main line.",
      material: "Silver 925",
      stone: "Garnet",
      size: "47 mm",
      edition: "One of a Kind",
      price: "¥78,000",
      stock: "1",
      status: "In Stock",
      featured: false,
      paypalPaymentUrl: "",
    },
    {
      title: "Archive Crown",
      subtitle: "Unique Study",
      category: "Pendant",
      collection: "One of a Kind",
      sku: "MA-OOAK-002",
      image:
        "https://images.unsplash.com/photo-1543295204-8e6d9c3f2acb?auto=format&fit=crop&w=1200&q=80",
      images: [
        "https://images.unsplash.com/photo-1543295204-8e6d9c3f2acb?auto=format&fit=crop&w=1200&q=80",
      ],
      description:
        "A one-off study piece preserved as an isolated object, separate from the regular line structure.",
      homeExcerpt: "An isolated one-off study piece.",
      material: "Silver 925",
      stone: "Smoky Quartz",
      size: "49 mm",
      edition: "One of a Kind",
      price: "¥82,000",
      stock: "1",
      status: "In Stock",
      featured: false,
      paypalPaymentUrl: "",
    },
  ],
  memoryWorks: [
    {
      title: "Ash Keepsake",
      subtitle: "Memory Fragment",
      category: "Pendant",
      collection: "My Memories",
      sku: "MA-MEM-001",
      image:
        "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1200&q=80",
      images: [
        "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1200&q=80",
      ],
      description:
        "A smaller keepsake-like piece made to feel personal, close, and held over time.",
      homeExcerpt: "A keepsake-like piece for memory.",
      material: "Silver 925",
      stone: "Smoky Quartz",
      size: "28 mm",
      edition: "One Piece",
      price: "¥32,000",
      stock: "1",
      status: "In Stock",
      featured: false,
      paypalPaymentUrl: "",
    },
    {
      title: "Trace Seal",
      subtitle: "Quiet Archive",
      category: "Pendant",
      collection: "My Memories",
      sku: "MA-MEM-002",
      image:
        "https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=1200&q=80",
      images: [
        "https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=1200&q=80",
      ],
      description:
        "A compact archive-like object for memory, trace, and personal attachment.",
      homeExcerpt: "A compact archive-like object.",
      material: "Silver 925",
      stone: "Moonstone",
      size: "26 mm",
      edition: "One Piece",
      price: "¥29,000",
      stock: "1",
      status: "In Stock",
      featured: false,
      paypalPaymentUrl: "",
    },
  ],
  loverWorks: [
    {
      title: "Velvet Vow",
      subtitle: "Gift Object",
      category: "Pendant",
      collection: "For Your Lover",
      sku: "MA-LOV-001",
      image:
        "https://images.unsplash.com/photo-1543295204-8e6d9c3f2acb?auto=format&fit=crop&w=1200&q=80",
      images: [
        "https://images.unsplash.com/photo-1543295204-8e6d9c3f2acb?auto=format&fit=crop&w=1200&q=80",
      ],
      description:
        "A compact gift-oriented piece shaped with a softer emotional tone while keeping the brand language intact.",
      homeExcerpt: "A compact gift-oriented piece.",
      material: "Silver 925",
      stone: "Rose Quartz",
      size: "27 mm",
      edition: "One Piece",
      price: "¥31,000",
      stock: "1",
      status: "In Stock",
      featured: false,
      paypalPaymentUrl: "",
    },
    {
      title: "Night Letter",
      subtitle: "Private Gift",
      category: "Pendant",
      collection: "For Your Lover",
      sku: "MA-LOV-002",
      image:
        "https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=1200&q=80",
      images: [
        "https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=1200&q=80",
      ],
      description:
        "A small intimate object meant to read like a private letter turned into metal.",
      homeExcerpt: "A private letter turned into metal.",
      material: "Silver 925",
      stone: "Garnet",
      size: "25 mm",
      edition: "One Piece",
      price: "¥30,000",
      stock: "1",
      status: "In Stock",
      featured: false,
      paypalPaymentUrl: "",
    },
  ],
  about: {
    sectionTitle: "About Mortal Aura",
    text1:
      "Mortal Aura is a dark jewelry brand that transforms mythology, demonology, and symbolic narrative into wearable silver forms.",
    text2:
      "Its core line explores sin as structure, ornament as ritual, and jewelry as a vessel for will, memory, and desire.",
    text3:
      "Black, silver, bone-like silhouettes, heraldic tension, and sculptural severity define the visual language of the brand.",
  },
  contact: {
    sectionTitle: "Contact",
    email: "your@email.com",
    instagramLabel: "Instagram",
    instagram: "@mortalaura",
    instagramUrl: "https://instagram.com/mortalaura",
    note: "For commissions, stock inquiries, collaborations, and exhibition opportunities.",
  },
  footer: {
    text: "© 2026 Mortal Aura. All rights reserved.",
  },
};

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function ensureRateShape(rate = {}) {
  return { region: rate.region ?? "Region", price: rate.price ?? "¥0" };
}

function ensureCollectionItemShape(item = {}, index = 0) {
  return {
    title: item.title ?? `Collection ${index + 1}`,
    subtitle: item.subtitle ?? "Series",
    description: item.description ?? "Collection description.",
    image:
      item.image ??
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1200&q=80",
    targetCollection: item.targetCollection ?? item.title ?? `Collection ${index + 1}`,
    enabled: item.enabled ?? index < 3,
    shape: item.shape === "round" ? "round" : "long",
  };
}

function ensureWorkShape(work = {}) {
  const rawImages = Array.isArray(work.images)
    ? work.images
    : work.image
      ? [work.image]
      : [];
  const imageList = rawImages
    .filter((img) => typeof img === "string" && img.trim())
    .slice(0, 10);
  const primaryImage =
    imageList[0] ||
    (typeof work.image === "string" && work.image.trim()) ||
    "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1200&q=80";

  return {
    title: work.title ?? "New Work",
    subtitle: work.subtitle ?? "Sin",
    category: work.category ?? "Pendant",
    collection: work.collection ?? "Main Collection",
    sku:
      work.sku ??
      `MA-NEW-${Math.random().toString(36).slice(2, 7).toUpperCase()}`,
    image: primaryImage,
    images: imageList.length > 0 ? imageList : [primaryImage],
    description: work.description ?? "Write a short description here.",
    homeExcerpt: work.homeExcerpt ?? "",
    material: work.material ?? "Silver 925",
    stone: work.stone ?? "Stone Name",
    size: work.size ?? "45 mm",
    edition: work.edition ?? "One Piece",
    price: work.price ?? "¥0",
    stock: work.stock ?? "1",
    status: work.status ?? "In Stock",
    featured: Boolean(work.featured),
    paypalPaymentUrl: work.paypalPaymentUrl ?? "",
  };
}

function normalizeSiteContent(raw) {
  const safe = raw && typeof raw === "object" ? raw : {};
  const base = clone(initialContent);
  return {
    ...base,
    ...safe,
    sections: { ...base.sections, ...(safe.sections || {}) },
    hero: { ...base.hero, ...(safe.hero || {}) },
    store: { ...base.store, ...(safe.store || {}) },
    collectionsIntro: {
      ...base.collectionsIntro,
      ...(safe.collectionsIntro || {}),
      items: Array.from({ length: 6 }, (_, index) =>
        ensureCollectionItemShape(
          safe.collectionsIntro?.items?.[index] ?? base.collectionsIntro.items[index],
          index
        )
      ),
    },
    worksIntro: { ...base.worksIntro, ...(safe.worksIntro || {}) },
    oneOfAKindIntro: {
      ...base.oneOfAKindIntro,
      ...(safe.oneOfAKindIntro || {}),
    },
    storiesIntro: { ...base.storiesIntro, ...(safe.storiesIntro || {}) },
    visualSystem: { ...base.visualSystem, ...(safe.visualSystem || {}) },
    shipping: {
      ...base.shipping,
      ...(safe.shipping || {}),
      rates: Array.isArray(safe.shipping?.rates)
        ? safe.shipping.rates.map(ensureRateShape)
        : base.shipping.rates.map(ensureRateShape),
    },
    about: { ...base.about, ...(safe.about || {}) },
    contact: { ...base.contact, ...(safe.contact || {}) },
    footer: { ...base.footer, ...(safe.footer || {}) },
    works: Array.isArray(safe.works)
      ? safe.works.map(ensureWorkShape)
      : base.works.map(ensureWorkShape),
    oneOfAKindWorks: Array.isArray(safe.oneOfAKindWorks)
      ? safe.oneOfAKindWorks.map(ensureWorkShape)
      : base.oneOfAKindWorks.map(ensureWorkShape),
    memoryWorks: Array.isArray(safe.memoryWorks)
      ? safe.memoryWorks.map(ensureWorkShape)
      : base.memoryWorks.map(ensureWorkShape),
    loverWorks: Array.isArray(safe.loverWorks)
      ? safe.loverWorks.map(ensureWorkShape)
      : base.loverWorks.map(ensureWorkShape),
  };
}

function normalizeCart(raw) {
  if (!Array.isArray(raw)) return [];
  return raw
    .filter((item) => item && typeof item === "object")
    .map((item) => ({
      sku: String(item.sku ?? ""),
      quantity: Math.max(1, Number(item.quantity ?? 1) || 1),
    }))
    .filter((item) => item.sku);
}

function parseYen(value) {
  return Number(String(value ?? "0").replace(/[^\d.-]/g, "")) || 0;
}

function formatYen(value) {
  return new Intl.NumberFormat("ja-JP", {
    style: "currency",
    currency: "JPY",
    maximumFractionDigits: 0,
  }).format(value || 0);
}

function getCartSummary(cart, works, store) {
  const items = cart
    .map((cartItem) => {
      const work = works.find((w) => w.sku === cartItem.sku);
      if (!work) return null;
      const unitPrice = parseYen(work.price);
      return {
        ...work,
        quantity: cartItem.quantity,
        unitPrice,
        lineTotal: unitPrice * cartItem.quantity,
      };
    })
    .filter(Boolean);
  const subtotal = items.reduce((sum, item) => sum + item.lineTotal, 0);
  const domesticFreeThreshold = parseYen(store.domesticFreeShippingThreshold);
  const internationalFreeThreshold = parseYen(
    store.internationalFreeShippingThreshold
  );
  return {
    items,
    subtotal,
    domesticFreeThreshold,
    internationalFreeThreshold,
    domesticFree: subtotal >= domesticFreeThreshold,
    internationalFree: subtotal >= internationalFreeThreshold,
  };
}

function Input({ label, value, onChange, placeholder = "" }) {
  return (
    <label className="block space-y-2">
      <span className="text-xs uppercase tracking-[0.25em] text-zinc-500">
        {label}
      </span>
      <input
        value={value ?? ""}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-2xl border border-white/10 bg-zinc-950 px-4 py-3 text-sm text-zinc-100 outline-none transition focus:border-white/30"
      />
    </label>
  );
}

function Textarea({ label, value, onChange, rows = 4 }) {
  return (
    <label className="block space-y-2">
      <span className="text-xs uppercase tracking-[0.25em] text-zinc-500">
        {label}
      </span>
      <textarea
        rows={rows}
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-2xl border border-white/10 bg-zinc-950 px-4 py-3 text-sm text-zinc-100 outline-none transition focus:border-white/30"
      />
    </label>
  );
}

function ImageUpload({ label, onChange }) {
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") onChange(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <label className="block space-y-2">
      <span className="text-xs uppercase tracking-[0.25em] text-zinc-500">
        {label}
      </span>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="block w-full cursor-pointer rounded-2xl border border-white/10 bg-zinc-950 px-4 py-3 text-sm text-zinc-300 file:mr-4 file:rounded-xl file:border-0 file:bg-zinc-800 file:px-3 file:py-2 file:text-sm file:text-zinc-100 hover:file:bg-zinc-700"
      />
    </label>
  );
}

function Select({ label, value, onChange, options }) {
  return (
    <label className="block space-y-2">
      <span className="text-xs uppercase tracking-[0.25em] text-zinc-500">
        {label}
      </span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-2xl border border-white/10 bg-zinc-950 px-4 py-3 text-sm text-zinc-100 outline-none transition focus:border-white/30"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

function Toggle({ label, checked, onChange }) {
  return (
    <label className="flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-zinc-950 px-4 py-3">
      <span className="text-sm text-zinc-200">{label}</span>
      <button
        type="button"
        onClick={() => onChange(!checked)}
        className={`relative h-7 w-12 rounded-full transition ${
          checked ? "bg-zinc-100" : "bg-zinc-800"
        }`}
      >
        <span
          className={`absolute top-1 h-5 w-5 rounded-full transition ${
            checked ? "left-6 bg-black" : "left-1 bg-zinc-300"
          }`}
        />
      </button>
    </label>
  );
}

function SectionCard({ title, children, actions = null }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-black/40 p-5">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h3 className="text-sm font-medium uppercase tracking-[0.25em] text-white">
          {title}
        </h3>
        {actions}
      </div>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

function CollapsiblePanel({
  title,
  open,
  onToggle,
  right = null,
  children,
  defaultOpen = true,
}) {
  const isOpen = open ?? defaultOpen;
  return (
    <div className="rounded-2xl border border-white/10 bg-zinc-950 p-4">
      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={onToggle}
          className="flex min-w-0 flex-1 items-center gap-3 text-left"
        >
          <span className="text-sm font-medium text-white">{title}</span>
          <span className="text-zinc-500">
            {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </span>
        </button>
        {right}
      </div>
      {isOpen ? <div className="mt-4 space-y-3">{children}</div> : null}
    </div>
  );
}

function SmallButton({ children, onClick, type = "button", danger = false }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`inline-flex items-center gap-2 rounded-2xl border px-3 py-2 text-xs transition ${
        danger
          ? "border-red-500/20 bg-red-500/10 text-red-300 hover:border-red-500/40"
          : "border-white/10 bg-zinc-900 text-zinc-200 hover:border-white/30 hover:text-white"
      }`}
    >
      {children}
    </button>
  );
}

function MetaPill({ icon, label, value }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/40 p-4">
      <div className="mb-2 flex items-center gap-2 text-zinc-500">
        {icon}
        <span className="text-[10px] uppercase tracking-[0.3em]">{label}</span>
      </div>
      <div className="text-sm text-zinc-100">{value}</div>
    </div>
  );
}

function ImageFieldsEditor({
  title = "作品图片",
  images = [],
  onChange,
  uploadLabel = "上传图片",
}) {
  const [open, setOpen] = useState(false);
  const safeImages = (Array.isArray(images) ? images : [])
    .filter((img) => typeof img === "string" && img.trim())
    .slice(0, 10);

  const updateImageAt = (index, value) => {
    const next = [...safeImages];
    const trimmed = typeof value === "string" ? value.trim() : "";
    if (trimmed) next[index] = trimmed;
    else next.splice(index, 1);
    onChange(next.slice(0, 10));
  };

  const addSlot = () => {
    if (safeImages.length >= 10) return;
    onChange([...safeImages, "https://"].slice(0, 10));
    setOpen(true);
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-sm text-white">{title}</p>
          <p className="mt-1 text-xs text-zinc-500">
            已上传 {safeImages.length} / 10
          </p>
        </div>
        <div className="flex items-center gap-2">
          <SmallButton onClick={addSlot}>
            <Plus size={14} /> 添加图片
          </SmallButton>
          <SmallButton onClick={() => setOpen((v) => !v)}>
            {open ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            {open ? "收起" : "展开"}
          </SmallButton>
        </div>
      </div>
      {safeImages[0] ? (
        <div className="mt-4 flex h-24 w-24 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-zinc-950">
          <img src={safeImages[0]} alt="preview" className="h-full w-full object-cover" />
        </div>
      ) : null}
      {open ? (
        <div className="mt-4 space-y-3">
          {safeImages.map((img, index) => (
            <div
              key={`${title}-${index}`}
              className="rounded-2xl border border-white/10 bg-zinc-950 p-3"
            >
              <div className="space-y-3">
                <Input
                  label={`图片链接 ${index + 1}`}
                  value={img}
                  onChange={(v) => updateImageAt(index, v)}
                />
                <ImageUpload
                  label={`${uploadLabel} ${index + 1}`}
                  onChange={(v) => updateImageAt(index, v)}
                />
                <button
                  onClick={() => updateImageAt(index, "")}
                  className="inline-flex items-center gap-1 text-xs text-zinc-400 transition hover:text-red-400"
                >
                  <Trash2 size={14} /> 删除此图
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}

function ScrollRevealSection({ id, className = "", children }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof window === "undefined") return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.18, rootMargin: "0px 0px -8% 0px" }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id={id}
      ref={ref}
      className={`${className} transition-all duration-700 ease-out will-change-transform ${
        visible ? "translate-y-0 scale-100 opacity-100" : "translate-y-10 scale-[0.985] opacity-0"
      }`}
    >
      {typeof children === "function" ? children(visible) : children}
    </section>
  );
}

function SplitReveal({
  visible,
  imageSide = "right",
  imageClassName = "",
  textClassName = "",
  image,
  text,
}) {
  const imageHidden =
    imageSide === "right"
      ? "translate-x-10 scale-[1.04] opacity-0"
      : "-translate-x-10 scale-[1.04] opacity-0";
  const textHidden =
    imageSide === "right" ? "-translate-x-8 opacity-0" : "translate-x-8 opacity-0";

  return (
    <>
      <div
        className={`${textClassName} transition-all duration-700 ease-out ${
          visible ? "translate-x-0 opacity-100 delay-75" : textHidden
        }`}
      >
        {text}
      </div>
      <div
        className={`${imageClassName} transition-all duration-900 ease-out ${
          visible ? "translate-x-0 scale-100 opacity-100 delay-150" : imageHidden
        }`}
      >
        {image}
      </div>
    </>
  );
}

function WorkCard({
  work,
  ui,
  visualSystem,
  onOpen,
  onAddToCart,
  localizedStatus,
  largeTitle = false,
  compact = false,
}) {
  const coverImage =
    (Array.isArray(work.images) && work.images.find(Boolean)) || work.image;
  const soldOut = work.status === "Sold Out" || Number(work.stock || 0) <= 0;

  return (
    <article
      className={`group overflow-hidden rounded-3xl border border-white/10 bg-zinc-950 transition duration-500 hover:-translate-y-1 hover:border-white/20 ${
        compact ? "max-w-[360px]" : ""
      }`}
    >
      <div onClick={onOpen} className="cursor-pointer">
        <div
          className={`relative flex items-center justify-center overflow-hidden border-b border-white/10 bg-black ${
            compact ? "aspect-square" : "aspect-[3/4]"
          }`}
        >
          <img
            src={coverImage}
            alt={work.title}
            className="max-h-full max-w-full object-contain grayscale transition duration-700 group-hover:scale-[1.03] group-hover:grayscale-0"
          />
          <div
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100"
            style={{
              background:
                "radial-gradient(circle at center, rgba(0,0,0,0) 34%, rgba(0,0,0,0.12) 58%, rgba(0,0,0,0.34) 82%, rgba(0,0,0,0.52) 100%)",
            }}
          />
          {visualSystem.showWatermark ? (
            <div
              className="pointer-events-none absolute bottom-4 right-4 text-xs font-semibold uppercase tracking-[0.35em] text-white"
              style={{ opacity: Number(visualSystem.watermarkOpacity || 18) / 100 }}
            >
              {visualSystem.watermarkText}
            </div>
          ) : null}
          <div className="absolute left-4 top-4 flex flex-wrap gap-2">
            {work.featured ? (
              <span className="rounded-full border border-white/10 bg-black/60 px-3 py-1 text-[10px] uppercase tracking-[0.3em] text-zinc-100">
                {ui.featured}
              </span>
            ) : null}
            <span
              className={`rounded-full border px-3 py-1 text-[10px] uppercase tracking-[0.3em] ${
                work.status === "Sold Out"
                  ? "border-red-500/30 bg-red-500/10 text-red-300"
                  : "border-emerald-500/30 bg-emerald-500/10 text-emerald-300"
              }`}
            >
              {localizedStatus(work.status)}
            </span>
          </div>
        </div>
        <div className={compact ? "p-4 sm:p-5" : "p-5 sm:p-6 md:p-7"}>
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3
                className={`${
                  compact
                    ? "text-lg sm:text-xl"
                    : largeTitle
                      ? "text-2xl sm:text-3xl"
                      : "text-xl sm:text-2xl"
                } font-medium uppercase tracking-[0.08em] text-white`}
              >
                {work.title}
              </h3>
              <p className="mt-2 text-xs uppercase tracking-[0.35em] text-zinc-500">
                {work.subtitle} / {work.category}
              </p>
              <p className="mt-2 inline-flex rounded-full border border-white/10 px-3 py-1 text-[10px] uppercase tracking-[0.3em] text-zinc-300">
                {work.collection}
              </p>
            </div>
            <div className="rounded-full border border-white/10 px-3 py-1 text-xs text-zinc-200">
              {work.price}
            </div>
          </div>
          {work.homeExcerpt ? (
            <p
              className={
                compact
                  ? "mt-4 text-sm leading-6 text-zinc-400"
                  : "mt-5 text-sm leading-7 text-zinc-400"
              }
            >
              {work.homeExcerpt}
            </p>
          ) : null}
          <div className="mt-6 flex flex-wrap gap-2 text-[11px] uppercase tracking-[0.28em] text-zinc-500">
            <span>{work.material}</span>
            <span>•</span>
            <span>{work.stone}</span>
            <span>•</span>
            <span>{work.size}</span>
            <span>•</span>
            <span>SKU {work.sku}</span>
          </div>
        </div>
      </div>
      <div
        className={
          compact
            ? "border-t border-white/10 px-4 pb-4 pt-3 sm:px-5"
            : "border-t border-white/10 px-6 pb-6 pt-4 md:px-7"
        }
      >
        <div className="flex flex-wrap gap-3">
          <button
            onClick={onOpen}
            className={`inline-flex items-center gap-2 rounded-2xl border border-white/10 text-zinc-100 transition hover:border-white/30 hover:text-white ${
              compact ? "px-3 py-2 text-xs" : "px-4 py-3 text-sm"
            }`}
          >
            <Eye size={16} /> {ui.viewDetails}
          </button>
          <button
            onClick={onAddToCart}
            disabled={soldOut}
            className={`inline-flex items-center gap-2 rounded-2xl border transition ${
              compact ? "px-3 py-2 text-xs" : "px-4 py-3 text-sm"
            } ${
              soldOut
                ? "cursor-not-allowed border-white/10 text-zinc-500"
                : "border-white/10 text-zinc-100 hover:border-white/30 hover:text-white"
            }`}
          >
            <ShoppingBag size={16} /> {ui.addToCart}
          </button>
        </div>
      </div>
    </article>
  );
}

function runNormalizationExamples() {
  const cases = [
    {},
    { store: { currency: "USD" } },
    { shipping: { rates: [{ region: "Test" }] } },
    { works: [{ title: "Only Title" }] },
    { works: [{ title: "With Images", images: ["a", "", "b"] }] },
    { sections: { stories: false } },
    { storiesIntro: { leftTitle: "My Memories" } },
    { memoryWorks: [{ title: "Memory Only Title" }] },
    { loverWorks: [{ title: "Lover Only Title" }] },
    { oneOfAKindWorks: [{ title: "OOAK Only Title" }] },
  ];

  return cases.every((item) => {
    const normalized = normalizeSiteContent(item);
    const cart = normalizeCart([{ sku: "A", quantity: 2 }, { bad: true }, null]);
    return (
      normalized &&
      normalized.visualSystem &&
      normalized.store &&
      normalized.collectionsIntro &&
      normalized.storiesIntro &&
      Array.isArray(normalized.collectionsIntro.items) &&
      normalized.collectionsIntro.items.length === 6 &&
      Array.isArray(normalized.shipping.rates) &&
      Array.isArray(normalized.works) &&
      Array.isArray(normalized.oneOfAKindWorks) &&
      Array.isArray(normalized.memoryWorks) &&
      Array.isArray(normalized.loverWorks) &&
      cart.length === 1
    );
  });
}

const NORMALIZATION_OK = runNormalizationExamples();

function renderSectionBody(isOpen, body) {
  return isOpen ? <>{body}</> : null;
}

function filterWorks(list, category, searchTerm) {
  const q = searchTerm.trim().toLowerCase();
  return list.filter((work) => {
    const matchesCategory = category === "All" || work.category === category;
    const matchesSearch =
      !q ||
      work.title.toLowerCase().includes(q) ||
      work.subtitle.toLowerCase().includes(q) ||
      work.sku.toLowerCase().includes(q) ||
      work.stone.toLowerCase().includes(q) ||
      work.collection.toLowerCase().includes(q);
    return matchesCategory && matchesSearch;
  });
}

export default function MortalAuraSite() {
  const [siteContent, setSiteContent] = useState(() => {
    if (typeof window === "undefined")
      return normalizeSiteContent(initialContent);
    try {
      const saved = safeStorageGet(STORAGE_KEY);
      return saved
        ? normalizeSiteContent(JSON.parse(saved))
        : normalizeSiteContent(initialContent);
    } catch {
      return normalizeSiteContent(initialContent);
    }
  });

  const [cart, setCart] = useState(() => {
    if (typeof window === "undefined") return [];
    try {
      const saved = safeStorageGet(CART_KEY);
      return saved ? normalizeCart(JSON.parse(saved)) : [];
    } catch {
      return [];
    }
  });

  const [isAdminMode, setIsAdminMode] = useState(() => detectAdminMode());
  const [editorOpen, setEditorOpen] = useState(() => detectAdminMode());
  const [currentLanguage, setCurrentLanguage] = useState(() => {
    if (typeof window === "undefined") return "en";
    return safeStorageGet(LANGUAGE_KEY) || "en";
  });
  const [saveState, setSaveState] = useState(
    NORMALIZATION_OK ? (storageAvailable() ? "已加载" : "预览模式") : "配置检查失败"
  );
  const [selectedWorkIndex, setSelectedWorkIndex] = useState(null);
  const [selectedWorkSource, setSelectedWorkSource] = useState("works");
  const [selectedDetailImageIndex, setSelectedDetailImageIndex] = useState(0);
  const [detailImageVisible, setDetailImageVisible] = useState(true);
  const [headerSearchTerm, setHeaderSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [oneOfAKindCategory, setOneOfAKindCategory] = useState("All");
  const [memoryCategory, setMemoryCategory] = useState("All");
  const [loverCategory, setLoverCategory] = useState("All");
  const [showAllWorks, setShowAllWorks] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [checkoutForm, setCheckoutForm] = useState({
    name: "",
    email: "",
    country: "Japan",
    city: "",
    address: "",
    note: "",
  });
  const [sectionOpenMap, setSectionOpenMap] = useState({
    site: true,
    store: false,
    hero: false,
    collectionsTitle: false,
    collectionsSlots: false,
    worksTitle: false,
    oneOfAKindTitle: false,
    oneOfAKindEditor: true,
    storiesTitle: false,
    memoryEditor: false,
    loverEditor: false,
    visual: false,
    works: true,
    shipping: false,
    about: false,
    contact: false,
    footer: false,
  });
  const [worksPanelOpen, setWorksPanelOpen] = useState(true);
  const [workItemOpenMap, setWorkItemOpenMap] = useState({});
  const [storyItemOpenMap, setStoryItemOpenMap] = useState({});
  const fileInputRef = useRef(null);

  const normalizedContent = normalizeSiteContent(siteContent);
  const ui = UI_TEXTS[currentLanguage] || UI_TEXTS.en;
  const visualSystem = normalizedContent.visualSystem;

  const navItems = [
    normalizedContent.sections.hero ? { id: "home", label: ui.navHome } : null,
    normalizedContent.sections.collections
      ? { id: "collections", label: ui.navCollections }
      : null,
    normalizedContent.sections.works ? { id: "works", label: ui.navWorks } : null,
    normalizedContent.sections.oneOfAKind
      ? { id: "one-of-a-kind", label: ui.navOneOfAKind }
      : null,
    normalizedContent.sections.stories
      ? { id: "stories", label: ui.navStories }
      : null,
    normalizedContent.sections.about ? { id: "about", label: ui.navAbout } : null,
    normalizedContent.sections.instagram
      ? { id: "instagram", label: ui.navInstagram }
      : null,
    normalizedContent.sections.shipping
      ? { id: "shipping", label: ui.navShipping }
      : null,
    normalizedContent.sections.contact
      ? { id: "contact", label: ui.navContact }
      : null,
  ].filter(Boolean);

  const localizedStatus = (status) => {
    if (status === "Sold Out") return ui.soldOut;
    if (status === "Made to Order") return ui.madeToOrder;
    return ui.inStock;
  };

  const collectionGroups = normalizedContent.collectionsIntro.items.filter(
    (item) => item.enabled
  );
  const filteredWorks = filterWorks(
    normalizedContent.works,
    activeCategory,
    headerSearchTerm
  );
  const filteredOneOfAKindWorks = filterWorks(
    normalizedContent.oneOfAKindWorks,
    oneOfAKindCategory,
    headerSearchTerm
  );
  const filteredMemoryWorks = filterWorks(
    normalizedContent.memoryWorks,
    memoryCategory,
    headerSearchTerm
  );
  const filteredLoverWorks = filterWorks(
    normalizedContent.loverWorks,
    loverCategory,
    headerSearchTerm
  );

  const worksPreviewLimit = 8;
  const visibleWorks = showAllWorks
    ? filteredWorks
    : filteredWorks.slice(0, worksPreviewLimit);
  const firstRowWorks = visibleWorks.slice(0, 2);
  const remainingWorks = visibleWorks.slice(2);
  const cartSummary = getCartSummary(
    cart,
    normalizedContent.works.concat(
      normalizedContent.oneOfAKindWorks,
      normalizedContent.memoryWorks,
      normalizedContent.loverWorks
    ),
    normalizedContent.store
  );
  const cartCount = cartSummary.items.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const selectedWork =
    selectedWorkIndex !== null
      ? (selectedWorkSource === "oneOfAKind"
          ? normalizedContent.oneOfAKindWorks[selectedWorkIndex]
          : selectedWorkSource === "memory"
            ? normalizedContent.memoryWorks[selectedWorkIndex]
            : selectedWorkSource === "lover"
              ? normalizedContent.loverWorks[selectedWorkIndex]
              : normalizedContent.works[selectedWorkIndex]) ?? null
      : null;

  const singlePayPalCheckoutUrl =
    cartSummary.items.length === 1 ? cartSummary.items[0]?.paypalPaymentUrl || "" : "";

  useEffect(() => {
    const normalized = normalizeSiteContent(siteContent);
    if (JSON.stringify(normalized) !== JSON.stringify(siteContent)) {
      setSiteContent(normalized);
      return;
    }
    const saved = safeStorageSet(STORAGE_KEY, JSON.stringify(normalized));
    setSaveState(saved ? "已保存" : "预览模式");
    const timer = setTimeout(
      () => setSaveState(saved ? "编辑中" : "预览模式"),
      1200
    );
    return () => clearTimeout(timer);
  }, [siteContent]);

  useEffect(() => {
    safeStorageSet(CART_KEY, JSON.stringify(normalizeCart(cart)));
  }, [cart]);

  useEffect(() => {
    safeStorageSet(LANGUAGE_KEY, currentLanguage);
  }, [currentLanguage]);

  useEffect(() => {
    const admin = detectAdminMode();
    setIsAdminMode(admin);
    if (!admin) setEditorOpen(false);
  }, []);

  useEffect(() => {
    setShowAllWorks(false);
  }, [headerSearchTerm, activeCategory]);

  useEffect(() => {
    setSelectedDetailImageIndex(0);
    setDetailImageVisible(true);
  }, [selectedWorkIndex, selectedWorkSource]);

  useEffect(() => {
    setDetailImageVisible(false);
    const timer = setTimeout(() => setDetailImageVisible(true), 80);
    return () => clearTimeout(timer);
  }, [selectedDetailImageIndex]);

  const orderSummaryText = [
    `Customer: ${checkoutForm.name || "-"}`,
    `Email: ${checkoutForm.email || "-"}`,
    `Country/Region: ${checkoutForm.country || "-"}`,
    `City: ${checkoutForm.city || "-"}`,
    `Address: ${checkoutForm.address || "-"}`,
    `Note: ${checkoutForm.note || "-"}`,
    "",
    "Items:",
    ...cartSummary.items.map(
      (item) =>
        `${item.title} (${item.sku}) × ${item.quantity} = ${formatYen(
          item.lineTotal
        )}`
    ),
    "",
    `Subtotal: ${formatYen(cartSummary.subtotal)}`,
  ].join("\n");

  const scrollToId = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    setMobileMenuOpen(false);
  };

  const updateNested = (path, value) => {
    setSiteContent((prev) => {
      const next = normalizeSiteContent(prev);
      let cur = next;
      for (let i = 0; i < path.length - 1; i += 1) {
        const key = path[i];
        const nextKey = path[i + 1];
        if (typeof nextKey === "number") {
          if (!Array.isArray(cur[key])) cur[key] = [];
        } else if (!cur[key] || typeof cur[key] !== "object") {
          cur[key] = {};
        }
        cur = cur[key];
      }
      cur[path[path.length - 1]] = value;
      return normalizeSiteContent(next);
    });
  };

  const updateListField = (listKey, index, field, value, forcedCollection) => {
    setSiteContent((prev) =>
      normalizeSiteContent({
        ...prev,
        [listKey]: prev[listKey].map((item, i) =>
          i === index
            ? ensureWorkShape({
                ...item,
                [field]: value,
                ...(forcedCollection ? { collection: forcedCollection } : {}),
              })
            : ensureWorkShape(item)
        ),
      })
    );
  };

  const addToList = (listKey, seed = {}) => {
    setSiteContent((prev) =>
      normalizeSiteContent({
        ...prev,
        [listKey]: [...prev[listKey], ensureWorkShape(seed)],
      })
    );
  };

  const removeFromList = (listKey, index, sourceName) => {
    const removedSku = normalizedContent[listKey][index]?.sku;
    setSiteContent((prev) =>
      normalizeSiteContent({
        ...prev,
        [listKey]: prev[listKey].filter((_, i) => i !== index),
      })
    );
    if (removedSku) setCart((prev) => prev.filter((item) => item.sku !== removedSku));
    setSelectedWorkIndex((prev) => {
      if (selectedWorkSource !== sourceName) return prev;
      if (prev === null) return null;
      if (prev === index) return null;
      if (prev > index) return prev - 1;
      return prev;
    });
  };

  const moveInList = (listKey, index, direction) => {
    setSiteContent((prev) => {
      const nextItems = [...prev[listKey]];
      const target = direction === "up" ? index - 1 : index + 1;
      if (target < 0 || target >= nextItems.length) return prev;
      [nextItems[index], nextItems[target]] = [nextItems[target], nextItems[index]];
      return normalizeSiteContent({ ...prev, [listKey]: nextItems });
    });
  };

  const addShippingRate = () => {
    setSiteContent((prev) => {
      const next = normalizeSiteContent(prev);
      next.shipping.rates = [...next.shipping.rates, ensureRateShape()];
      return next;
    });
  };

  const updateShippingRate = (index, field, value) => {
    setSiteContent((prev) => {
      const next = normalizeSiteContent(prev);
      next.shipping.rates = next.shipping.rates.map((rate, i) =>
        i === index ? ensureRateShape({ ...rate, [field]: value }) : ensureRateShape(rate)
      );
      return next;
    });
  };

  const removeShippingRate = (index) => {
    setSiteContent((prev) => {
      const next = normalizeSiteContent(prev);
      next.shipping.rates = next.shipping.rates.filter((_, i) => i !== index);
      return next;
    });
  };

  const addToCart = (work) => {
    if (!work || work.status === "Sold Out" || Number(work.stock || 0) <= 0) return;
    setCart((prev) => {
      const existing = prev.find((item) => item.sku === work.sku);
      if (existing) {
        return prev.map((item) =>
          item.sku === work.sku ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { sku: work.sku, quantity: 1 }];
    });
    setCartOpen(true);
  };

  const updateCartQuantity = (sku, delta) => {
    setCart((prev) =>
      normalizeCart(
        prev
          .map((item) =>
            item.sku === sku
              ? { ...item, quantity: Math.max(0, item.quantity + delta) }
              : item
          )
          .filter((item) => item.quantity > 0)
      )
    );
  };

  const removeFromCart = (sku) => setCart((prev) => prev.filter((item) => item.sku !== sku));

  const clearCart = () => {
    setCart([]);
    setCheckoutOpen(false);
    setCheckoutForm({
      name: "",
      email: "",
      country: "Japan",
      city: "",
      address: "",
      note: "",
    });
  };

  const exportData = () => {
    const blob = new Blob(
      [JSON.stringify(normalizeSiteContent(siteContent), null, 2)],
      { type: "application/json" }
    );
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "mortal-aura-jewelry-config.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const importData = (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        setSiteContent(normalizeSiteContent(JSON.parse(String(reader.result))));
        setSaveState("已导入");
      } catch {
        setSaveState("导入失败");
      }
    };
    reader.readAsText(file);
  };

  const resetData = () => {
    setSiteContent(normalizeSiteContent(initialContent));
    setSaveState("已重置");
    setSelectedWorkIndex(null);
    setSelectedWorkSource("works");
    setHeaderSearchTerm("");
    setActiveCategory("All");
    setOneOfAKindCategory("All");
    setMemoryCategory("All");
    setLoverCategory("All");
    clearCart();
  };

  const preview = useMemo(() => {
    return (
      <div className="min-h-screen bg-black text-zinc-200 selection:bg-zinc-200 selection:text-black">
        <header className="sticky top-0 z-30 border-b border-white/10 bg-black/70 backdrop-blur-xl">
          <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 md:px-8">
            <div className="rounded-[1.75rem] border border-white/10 bg-black/45 px-4 py-3 shadow-[0_12px_40px_rgba(0,0,0,0.22)] sm:px-5 md:px-6">
              <div className="flex items-center justify-between gap-4">
                <button
                  onClick={() => scrollToId("home")}
                  className="shrink-0 text-left text-base font-semibold uppercase tracking-[0.28em] text-zinc-100 sm:text-lg md:text-xl md:tracking-[0.35em]"
                >
                  {normalizedContent.brandName}
                </button>

                <div className="flex min-w-0 items-center gap-2 sm:gap-3">
                  <div className="hidden xl:flex items-center rounded-2xl border border-white/10 bg-zinc-950/80 px-3 py-2">
                    <Search size={15} className="mr-2 shrink-0 text-zinc-500" />
                    <input
                      value={headerSearchTerm}
                      onChange={(e) => setHeaderSearchTerm(e.target.value)}
                      placeholder={ui.searchPlaceholder}
                      className="w-[170px] bg-transparent text-sm text-zinc-100 outline-none placeholder:text-zinc-500 2xl:w-[220px]"
                    />
                  </div>

                  <div className="hidden md:flex items-center gap-1 rounded-2xl border border-white/10 bg-zinc-950 p-1">
                    {[{ code: "en", label: "EN" }, { code: "ja", label: "JP" }, { code: "zh", label: "中文" }].map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => setCurrentLanguage(lang.code)}
                        className={`rounded-xl px-3 py-1.5 text-xs transition ${
                          currentLanguage === lang.code
                            ? "bg-zinc-100 text-black"
                            : "text-zinc-300 hover:text-white"
                        }`}
                      >
                        {lang.label}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => setCartOpen(true)}
                    className="relative inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-zinc-950 px-3 py-2 text-sm text-zinc-200 transition hover:border-white/30 hover:text-white sm:px-4"
                  >
                    <ShoppingBag size={16} />
                    <span className="hidden sm:inline">{ui.cart}</span>
                    {cartCount > 0 ? (
                      <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-[10px] font-semibold text-black">
                        {cartCount}
                      </span>
                    ) : null}
                  </button>

                  <button
                    onClick={() => setMobileMenuOpen((v) => !v)}
                    className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-zinc-950 px-3 py-2 text-sm text-zinc-200 transition hover:border-white/30 hover:text-white xl:hidden"
                  >
                    <Menu size={16} />
                    <span className="hidden sm:inline">{ui.menu}</span>
                  </button>
                </div>
              </div>

              <div className="mt-3 hidden xl:flex items-center justify-center border-t border-white/10 pt-3">
                <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 2xl:gap-x-8">
                  {navItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => scrollToId(item.id)}
                      className="text-xs uppercase tracking-[0.26em] text-zinc-400 transition hover:text-white 2xl:text-sm"
                    >
                      {item.label}
                    </button>
                  ))}
                </nav>
              </div>
            </div>
          </div>
          {mobileMenuOpen ? (
            <div className="border-t border-white/10 bg-black/90 px-4 py-4 backdrop-blur sm:px-6 xl:hidden">
              <div className="mb-3 flex items-center rounded-2xl border border-white/10 bg-zinc-950/80 px-3 py-2">
                <Search size={15} className="mr-2 shrink-0 text-zinc-500" />
                <input
                  value={headerSearchTerm}
                  onChange={(e) => setHeaderSearchTerm(e.target.value)}
                  placeholder={ui.searchPlaceholder}
                  className="w-full bg-transparent text-sm text-zinc-100 outline-none placeholder:text-zinc-500"
                />
              </div>
              <div className="mb-3 flex items-center gap-1 rounded-2xl border border-white/10 bg-zinc-950 p-1 md:hidden">
                {[{ code: "en", label: "EN" }, { code: "ja", label: "JP" }, { code: "zh", label: "中文" }].map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => setCurrentLanguage(lang.code)}
                    className={`rounded-xl px-3 py-1.5 text-xs transition ${
                      currentLanguage === lang.code
                        ? "bg-zinc-100 text-black"
                        : "text-zinc-300 hover:text-white"
                    }`}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>
              <div className="grid gap-2">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToId(item.id)}
                    className="flex items-center justify-between rounded-2xl border border-white/10 bg-zinc-950 px-4 py-3 text-left text-sm uppercase tracking-[0.22em] text-zinc-200 transition hover:border-white/30 hover:text-white"
                  >
                    <span>{item.label}</span>
                    <ChevronDown size={14} className="rotate-[-90deg]" />
                  </button>
                ))}
              </div>
            </div>
          ) : null}
        </header>

        <main>
          {normalizedContent.sections.hero ? (
            <ScrollRevealSection id="home" className="relative isolate overflow-hidden border-b border-white/10">
              <div className="absolute inset-0 bg-cover bg-center opacity-30" style={{ backgroundImage: `url(${normalizedContent.hero.backgroundImage})` }} />
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black" />
              <div className="relative mx-auto flex min-h-[82vh] max-w-7xl items-center px-4 py-16 sm:px-6 sm:py-20 md:min-h-[92vh] md:px-8 md:py-24">
                <div className="max-w-4xl">
                  <p className="mb-5 text-xs uppercase tracking-[0.45em] text-zinc-400 md:text-sm">{normalizedContent.hero.eyebrow}</p>
                  <h1 className="mb-6 text-4xl font-semibold uppercase leading-none tracking-[0.06em] text-white sm:text-5xl md:text-7xl lg:text-8xl">{normalizedContent.hero.title}</h1>
                  <p className="max-w-2xl text-sm tracking-[0.14em] text-zinc-300 sm:text-base md:text-lg md:tracking-[0.18em] uppercase">{normalizedContent.hero.subtitle}</p>
                  <div className="mt-10 flex flex-wrap gap-4">
                    {normalizedContent.sections.collections ? (
                      <button onClick={() => scrollToId("collections")} className="rounded-2xl border border-zinc-200 px-6 py-3 text-sm uppercase tracking-[0.22em] text-zinc-100 transition hover:bg-zinc-100 hover:text-black">
                        {normalizedContent.hero.ctaPrimary}
                      </button>
                    ) : null}
                    {normalizedContent.sections.shipping ? (
                      <button onClick={() => scrollToId("shipping")} className="rounded-2xl border border-white/15 px-6 py-3 text-sm uppercase tracking-[0.22em] text-zinc-300 transition hover:border-white/40 hover:text-white">
                        {normalizedContent.hero.ctaSecondary}
                      </button>
                    ) : null}
                  </div>
                </div>
              </div>
            </ScrollRevealSection>
          ) : null}

          {normalizedContent.sections.collections ? (
            <ScrollRevealSection id="collections" className="border-b border-white/10 px-6 py-20 md:px-8 md:py-24">
              {(visible) => (
                <div className="mx-auto grid max-w-7xl gap-8 md:gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-start lg:gap-12">
                  <SplitReveal
                    visible={visible}
                    imageSide="right"
                    textClassName="max-w-3xl"
                    imageClassName="min-w-0"
                    text={<div><p className="mb-3 text-xs uppercase tracking-[0.45em] text-zinc-500">{ui.collections}</p><h2 className="text-3xl font-semibold uppercase tracking-[0.08em] text-white md:text-4xl">{normalizedContent.collectionsIntro.sectionTitle}</h2><p className="mt-4 text-sm leading-7 text-zinc-400 md:text-base">{normalizedContent.collectionsIntro.sectionText}</p></div>}
                    image={<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{collectionGroups.map((item, index) => { const count = normalizedContent.works.filter((work) => work.collection === item.targetCollection).length; const isRound = item.shape === "round"; return <button key={`${item.title}-${index}`} onClick={() => { setHeaderSearchTerm(item.targetCollection); scrollToId("works"); }} className={`group relative overflow-hidden border border-white/10 bg-zinc-950 text-left shadow-[0_10px_30px_rgba(0,0,0,0.18)] transition duration-500 hover:-translate-y-1 hover:border-white/25 hover:shadow-[0_24px_60px_rgba(0,0,0,0.34),0_8px_24px_rgba(255,255,255,0.06)] ${isRound ? "rounded-full" : "rounded-[2rem]"}`}><div className={`relative overflow-hidden bg-black ${isRound ? "aspect-square" : "aspect-[4/3]"}`}>{item.image ? <img src={item.image} alt={item.title} className="h-full w-full object-cover grayscale transition duration-700 group-hover:scale-105 group-hover:grayscale-0" /> : null}<div className="absolute inset-0 bg-gradient-to-t from-black/82 via-black/12 to-transparent" /><div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3"><div><p className="text-[10px] uppercase tracking-[0.35em] text-zinc-500">{item.subtitle}</p><p className="mt-1 text-xl font-medium uppercase tracking-[0.08em] text-white">{item.title}</p></div><div className="rounded-full border border-white/10 bg-black/50 px-3 py-1 text-xs text-zinc-200">{count}</div></div></div><div className={`relative px-5 pb-6 pt-3 text-sm leading-7 text-zinc-400 ${isRound ? "text-center" : ""}`}><p className="text-balance text-zinc-400/95">{item.description}</p></div></button>; })}</div>}
                  />
                </div>
              )}
            </ScrollRevealSection>
          ) : null}

          {normalizedContent.sections.works ? (
            <ScrollRevealSection id="works" className="border-b border-white/10 px-6 py-20 md:px-8 md:py-24">
              {(visible) => (
                <div className="mx-auto max-w-7xl">
                  <div className={`mb-12 max-w-3xl transition-all duration-700 ease-out ${visible ? "translate-x-0 opacity-100" : "-translate-x-8 opacity-0"}`}>
                    <p className="mb-3 text-xs uppercase tracking-[0.45em] text-zinc-500">{ui.works}</p>
                    <h2 className="text-3xl font-semibold uppercase tracking-[0.08em] text-white md:text-4xl">{normalizedContent.worksIntro.sectionTitle}</h2>
                    <p className="mt-4 text-sm leading-7 text-zinc-400 md:text-base">{normalizedContent.worksIntro.sectionText}</p>
                  </div>
                  <div className="mb-8 flex flex-wrap gap-2">{FIXED_CATEGORIES.map((category) => <button key={category} onClick={() => setActiveCategory(category)} className={`rounded-full border px-4 py-2 text-xs uppercase tracking-[0.22em] transition ${activeCategory === category ? "border-zinc-100 bg-zinc-100 text-black" : "border-white/10 text-zinc-300 hover:border-white/30 hover:text-white"}`}>{category}</button>)}</div>
                  <div className={`grid gap-4 sm:gap-6 lg:grid-cols-12 transition-all duration-900 ease-out ${visible ? "translate-x-0 scale-100 opacity-100" : "translate-x-10 scale-[1.02] opacity-0"}`}>
                    {firstRowWorks.map((work, displayIndex) => { const realIndex = normalizedContent.works.findIndex((item) => item.sku === work.sku); return <div key={`${work.sku}-${displayIndex}`} className="lg:col-span-4"><WorkCard work={work} ui={ui} visualSystem={visualSystem} localizedStatus={localizedStatus} largeTitle onOpen={() => { setSelectedWorkSource("works"); setSelectedWorkIndex(realIndex); }} onAddToCart={() => addToCart(work)} /></div>; })}
                    {remainingWorks.map((work, displayIndex) => { const realIndex = normalizedContent.works.findIndex((item) => item.sku === work.sku); return <div key={`${work.sku}-rest-${displayIndex}`} className="lg:col-span-4"><WorkCard work={work} ui={ui} visualSystem={visualSystem} localizedStatus={localizedStatus} onOpen={() => { setSelectedWorkSource("works"); setSelectedWorkIndex(realIndex); }} onAddToCart={() => addToCart(work)} /></div>; })}
                  </div>
                  {filteredWorks.length > worksPreviewLimit ? <div className="mt-8 flex justify-center"><button onClick={() => setShowAllWorks((prev) => !prev)} className="rounded-2xl border border-white/10 px-6 py-3 text-sm uppercase tracking-[0.22em] text-zinc-100 transition hover:border-white/30 hover:text-white">{showAllWorks ? ui.viewLess : ui.viewMore}</button></div> : null}
                </div>
              )}
            </ScrollRevealSection>
          ) : null}

          {normalizedContent.sections.oneOfAKind ? (
            <ScrollRevealSection id="one-of-a-kind" className="border-b border-white/10 px-6 py-20 md:px-8 md:py-24">
              {(visible) => (
                <div className="mx-auto max-w-7xl">
                  <div className={`mb-12 max-w-3xl transition-all duration-700 ease-out ${visible ? "translate-x-0 opacity-100" : "-translate-x-8 opacity-0"}`}>
                    <p className="mb-3 text-xs uppercase tracking-[0.45em] text-zinc-500">{ui.oneOfAKind}</p>
                    <h2 className="text-3xl font-semibold uppercase tracking-[0.08em] text-white md:text-4xl">{normalizedContent.oneOfAKindIntro.sectionTitle}</h2>
                    <p className="mt-4 text-sm leading-7 text-zinc-400 md:text-base">{normalizedContent.oneOfAKindIntro.sectionText}</p>
                  </div>
                  <div className="mb-8 flex flex-wrap gap-2">{FIXED_CATEGORIES.map((category) => <button key={category} onClick={() => setOneOfAKindCategory(category)} className={`rounded-full border px-4 py-2 text-xs uppercase tracking-[0.22em] transition ${oneOfAKindCategory === category ? "border-zinc-100 bg-zinc-100 text-black" : "border-white/10 text-zinc-300 hover:border-white/30 hover:text-white"}`}>{category}</button>)}</div>
                  <div className={`grid gap-4 sm:gap-6 lg:grid-cols-12 transition-all duration-900 ease-out ${visible ? "translate-x-0 scale-100 opacity-100" : "translate-x-10 scale-[1.02] opacity-0"}`}>
                    {filteredOneOfAKindWorks.length > 0 ? filteredOneOfAKindWorks.map((work, displayIndex) => { const realIndex = normalizedContent.oneOfAKindWorks.findIndex((item) => item.sku === work.sku); return <div key={`${work.sku}-ooak-${displayIndex}`} className="lg:col-span-4"><WorkCard work={work} ui={ui} visualSystem={visualSystem} localizedStatus={localizedStatus} onOpen={() => { setSelectedWorkSource("oneOfAKind"); setSelectedWorkIndex(realIndex); }} onAddToCart={() => addToCart(work)} /></div>; }) : <div className="rounded-3xl border border-dashed border-white/10 p-8 text-center text-sm text-zinc-500 lg:col-span-8">{ui.noOneOfAKind}</div>}
                  </div>
                </div>
              )}
            </ScrollRevealSection>
          ) : null}

          {normalizedContent.sections.stories ? (
            <ScrollRevealSection id="stories" className="border-b border-white/10 px-6 py-20 md:px-8 md:py-24">
              {(visible) => (
                <div className="mx-auto max-w-7xl">
                  <div className={`mb-10 max-w-3xl transition-all duration-700 ease-out ${visible ? "translate-x-0 opacity-100" : "-translate-x-8 opacity-0"}`}>
                    <p className="mb-3 text-xs uppercase tracking-[0.45em] text-zinc-500">{ui.stories}</p>
                    <h2 className="text-3xl font-semibold uppercase tracking-[0.08em] text-white md:text-4xl">{normalizedContent.storiesIntro.sectionTitle}</h2>
                    <p className="mt-4 text-sm leading-7 text-zinc-400 md:text-base">{normalizedContent.storiesIntro.sectionText}</p>
                  </div>
                  <div className="mb-8 grid gap-4 lg:grid-cols-2">
                    <div className="flex flex-wrap gap-2">{FIXED_CATEGORIES.map((category) => <button key={`memory-${category}`} onClick={() => setMemoryCategory(category)} className={`rounded-full border px-4 py-2 text-xs uppercase tracking-[0.22em] transition ${memoryCategory === category ? "border-zinc-100 bg-zinc-100 text-black" : "border-white/10 text-zinc-300 hover:border-white/30 hover:text-white"}`}>{category}</button>)}</div>
                    <div className="flex flex-wrap gap-2 lg:justify-end">{FIXED_CATEGORIES.map((category) => <button key={`lover-${category}`} onClick={() => setLoverCategory(category)} className={`rounded-full border px-4 py-2 text-xs uppercase tracking-[0.22em] transition ${loverCategory === category ? "border-zinc-100 bg-zinc-100 text-black" : "border-white/10 text-zinc-300 hover:border-white/30 hover:text-white"}`}>{category}</button>)}</div>
                  </div>
                  <div className={`grid gap-8 md:grid-cols-[1fr_auto_1fr] md:items-start transition-all duration-900 ease-out ${visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}>
                    <div>
                      <div className="mb-6"><p className="text-xs uppercase tracking-[0.35em] text-zinc-500">Left Story</p><h3 className="mt-2 text-2xl font-medium uppercase tracking-[0.08em] text-white">{normalizedContent.storiesIntro.leftTitle}</h3><p className="mt-3 text-sm leading-7 text-zinc-400">{normalizedContent.storiesIntro.leftText}</p></div>
                      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-2">{filteredMemoryWorks.length > 0 ? filteredMemoryWorks.map((work, displayIndex) => { const realIndex = normalizedContent.memoryWorks.findIndex((item) => item.sku === work.sku); return <div key={`${work.sku}-memory-${displayIndex}`}><WorkCard work={work} ui={ui} visualSystem={visualSystem} localizedStatus={localizedStatus} compact onOpen={() => { setSelectedWorkSource("memory"); setSelectedWorkIndex(realIndex); }} onAddToCart={() => addToCart(work)} /></div>; }) : <div className="rounded-3xl border border-dashed border-white/10 p-8 text-center text-sm text-zinc-500 sm:col-span-2">{ui.noMemoryWorks}</div>}</div>
                    </div>
                    <div className="hidden md:flex h-full min-h-[360px] items-stretch justify-center"><div className="h-full w-px border-l border-dashed border-white/20" /></div>
                    <div>
                      <div className="mb-6"><p className="text-xs uppercase tracking-[0.35em] text-zinc-500">Right Story</p><h3 className="mt-2 text-2xl font-medium uppercase tracking-[0.08em] text-white">{normalizedContent.storiesIntro.rightTitle}</h3><p className="mt-3 text-sm leading-7 text-zinc-400">{normalizedContent.storiesIntro.rightText}</p></div>
                      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-2">{filteredLoverWorks.length > 0 ? filteredLoverWorks.map((work, displayIndex) => { const realIndex = normalizedContent.loverWorks.findIndex((item) => item.sku === work.sku); return <div key={`${work.sku}-lover-${displayIndex}`}><WorkCard work={work} ui={ui} visualSystem={visualSystem} localizedStatus={localizedStatus} compact onOpen={() => { setSelectedWorkSource("lover"); setSelectedWorkIndex(realIndex); }} onAddToCart={() => addToCart(work)} /></div>; }) : <div className="rounded-3xl border border-dashed border-white/10 p-8 text-center text-sm text-zinc-500 sm:col-span-2">{ui.noMemoryWorks}</div>}</div>
                    </div>
                  </div>
                </div>
              )}
            </ScrollRevealSection>
          ) : null}

          {normalizedContent.sections.about ? (
            <ScrollRevealSection id="about" className="border-b border-white/10 px-6 py-20 md:px-8 md:py-24">
              {(visible) => (
                <div className="mx-auto max-w-7xl">
                  <SplitReveal visible={visible} imageSide="left" textClassName="max-w-2xl" imageClassName="max-w-xl" text={<div className="space-y-6 text-sm leading-8 text-zinc-400 md:text-base"><p className="mb-3 text-xs uppercase tracking-[0.45em] text-zinc-500">{ui.about}</p><h2 className="text-3xl font-semibold uppercase tracking-[0.08em] text-white md:text-4xl">{normalizedContent.about.sectionTitle}</h2><p>{normalizedContent.about.text1}</p><p>{normalizedContent.about.text2}</p><p>{normalizedContent.about.text3}</p></div>} image={<div className="rounded-[2rem] border border-white/10 bg-zinc-950 p-5 sm:p-8"><div className="aspect-[4/5] overflow-hidden rounded-[1.75rem] border border-white/10 bg-black"><img src={normalizedContent.hero.backgroundImage} alt={normalizedContent.about.sectionTitle} className="h-full w-full object-cover grayscale transition duration-700 hover:scale-105 hover:grayscale-0" /></div></div>} />
                </div>
              )}
            </ScrollRevealSection>
          ) : null}

          {normalizedContent.sections.instagram ? (
            <ScrollRevealSection id="instagram" className="border-b border-white/10 px-6 py-20 md:px-8 md:py-24">
              <div className="mx-auto max-w-7xl">
                <div className="mb-12 max-w-3xl"><p className="mb-3 text-xs uppercase tracking-[0.45em] text-zinc-500">Instagram</p><h2 className="text-3xl font-semibold uppercase tracking-[0.08em] text-white md:text-4xl">{normalizedContent.visualSystem.instagramSectionTitle}</h2><p className="mt-4 text-sm leading-7 text-zinc-400 md:text-base">{normalizedContent.visualSystem.instagramSectionText}</p></div>
                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">{normalizedContent.works.slice(0, 4).map((work) => <div key={work.sku} className="group relative aspect-square overflow-hidden rounded-3xl border border-white/10 bg-black transition hover:-translate-y-1"><img src={work.image} alt={work.title} className="h-full w-full object-cover grayscale transition duration-500 group-hover:scale-105 group-hover:grayscale-0" /><div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" /><div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-2"><div><p className="text-[10px] uppercase tracking-[0.35em] text-zinc-500">{work.subtitle}</p><p className="mt-1 text-[10px] uppercase tracking-[0.35em] text-zinc-400">{work.collection}</p><p className="mt-1 text-sm text-white">{work.title}</p></div><Instagram size={16} className="text-zinc-300" /></div></div>)}</div>
              </div>
            </ScrollRevealSection>
          ) : null}

          {normalizedContent.sections.shipping ? (
            <ScrollRevealSection id="shipping" className="border-b border-white/10 px-6 py-20 md:px-8 md:py-24">
              <div className="mx-auto max-w-7xl">
                <div className="mb-12 max-w-3xl"><p className="mb-3 text-xs uppercase tracking-[0.45em] text-zinc-500">{ui.shipping}</p><h2 className="text-3xl font-semibold uppercase tracking-[0.08em] text-white md:text-4xl">{normalizedContent.shipping.sectionTitle}</h2><p className="mt-4 text-sm leading-7 text-zinc-400 md:text-base">{normalizedContent.shipping.description}</p></div>
                <div className="grid gap-6 md:grid-cols-[0.9fr_1.1fr]"><div className="space-y-4 rounded-[2rem] border border-white/10 bg-zinc-950 p-6"><MetaPill icon={<Package size={14} />} label={ui.japan} value={`Free over ¥${normalizedContent.store.domesticFreeShippingThreshold}`} /><MetaPill icon={<Globe size={14} />} label={ui.international} value={`Free over ¥${normalizedContent.store.internationalFreeShippingThreshold}`} /><MetaPill icon={<ShieldCheck size={14} />} label={ui.currency} value={normalizedContent.store.currency} /><div className="rounded-2xl border border-white/10 bg-black/40 p-4 text-sm leading-7 text-zinc-400">{normalizedContent.store.japanShippingNote}<br />{normalizedContent.store.internationalShippingNote}</div></div><div className="overflow-hidden rounded-[2rem] border border-white/10 bg-zinc-950"><div className="grid grid-cols-[1fr_auto] border-b border-white/10 px-6 py-4 text-xs uppercase tracking-[0.3em] text-zinc-500"><div>{ui.region}</div><div>{ui.ems2kg}</div></div>{normalizedContent.shipping.rates.map((rate, index) => <div key={`${rate.region}-${index}`} className="grid grid-cols-[1fr_auto] border-b border-white/10 px-6 py-4 text-sm text-zinc-300 last:border-b-0"><div>{rate.region}</div><div>{rate.price}</div></div>)}</div></div>
                <p className="mt-6 text-sm text-zinc-500">{normalizedContent.shipping.note}</p>
              </div>
            </ScrollRevealSection>
          ) : null}

          {normalizedContent.sections.contact ? (
            <ScrollRevealSection id="contact" className="px-6 py-20 md:px-8 md:py-24">
              <div className="mx-auto max-w-7xl rounded-[2rem] border border-white/10 bg-zinc-950 p-8 md:p-12">
                <p className="mb-3 text-xs uppercase tracking-[0.45em] text-zinc-500">{ui.contact}</p>
                <h2 className="text-3xl font-semibold uppercase tracking-[0.08em] text-white md:text-4xl">{normalizedContent.contact.sectionTitle}</h2>
                <p className="mt-5 max-w-2xl text-sm leading-7 text-zinc-400 md:text-base">{normalizedContent.contact.note}</p>
                <div className="mt-10 grid gap-6 md:grid-cols-2"><div className="rounded-3xl border border-white/10 bg-black/40 p-6 transition hover:-translate-y-1"><p className="text-xs uppercase tracking-[0.35em] text-zinc-500">Email</p><a href={`mailto:${normalizedContent.contact.email}`} className="mt-3 block text-lg text-zinc-100 transition hover:text-white">{normalizedContent.contact.email}</a></div><div className="rounded-3xl border border-white/10 bg-black/40 p-6 transition hover:-translate-y-1"><p className="text-xs uppercase tracking-[0.35em] text-zinc-500">{normalizedContent.contact.instagramLabel}</p><a href={normalizedContent.contact.instagramUrl} target="_blank" rel="noreferrer" className="mt-3 block text-lg text-zinc-100 transition hover:text-white">{normalizedContent.contact.instagram}</a></div></div>
              </div>
            </ScrollRevealSection>
          ) : null}
        </main>

        <footer className="border-t border-white/10 px-6 py-6 md:px-8">
          <div className="mx-auto max-w-7xl text-xs uppercase tracking-[0.28em] text-zinc-500">{normalizedContent.footer.text}</div>
        </footer>

        {selectedWork ? (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm" onClick={() => setSelectedWorkIndex(null)}>
            <div className="relative max-h-[94vh] w-full max-w-6xl overflow-auto rounded-[2rem] border border-white/10 bg-zinc-950" onClick={(e) => e.stopPropagation()}>
              <button onClick={() => setSelectedWorkIndex(null)} className="absolute right-4 top-4 z-10 rounded-full border border-white/10 bg-black/50 p-2 text-zinc-300 transition hover:text-white"><X size={18} /></button>
              <div className="grid md:grid-cols-[0.95fr_1.05fr]"><div className="relative flex min-h-[320px] items-center justify-center border-b border-white/10 bg-black p-4 sm:p-6 md:min-h-[520px] md:border-b-0 md:border-r md:p-8"><img key={`${selectedWork.sku}-${selectedDetailImageIndex}`} src={((Array.isArray(selectedWork.images) && selectedWork.images[selectedDetailImageIndex]) || selectedWork.image)} alt={selectedWork.title} className={`max-h-[78vh] max-w-full object-contain transition-all duration-500 ease-out ${detailImageVisible ? "scale-100 opacity-100 blur-0" : "scale-[0.985] opacity-0 blur-[2px]"}`} />{visualSystem.showWatermark ? <div className="pointer-events-none absolute bottom-6 right-6 text-sm font-semibold uppercase tracking-[0.45em] text-white" style={{ opacity: Number(visualSystem.watermarkOpacity || 18) / 100 }}>{visualSystem.watermarkText}</div> : null}{Array.isArray(selectedWork.images) && selectedWork.images.filter(Boolean).length > 1 ? <div className="absolute bottom-4 left-4 right-4 flex gap-2 overflow-x-auto">{selectedWork.images.filter(Boolean).map((img, index) => <button key={`${selectedWork.sku}-thumb-${index}`} onClick={() => setSelectedDetailImageIndex(index)} className={`h-16 w-16 shrink-0 overflow-hidden rounded-2xl border ${selectedDetailImageIndex === index ? "border-white/60" : "border-white/10"}`}><img src={img} alt={`${selectedWork.title}-${index + 1}`} className="h-full w-full object-cover" /></button>)}</div> : null}</div><div className="p-5 sm:p-6 md:p-10"><div className="flex flex-wrap gap-2"><span className="rounded-full border border-white/10 px-3 py-1 text-[10px] uppercase tracking-[0.3em] text-zinc-300">{selectedWork.category}</span><span className={`rounded-full border px-3 py-1 text-[10px] uppercase tracking-[0.3em] ${selectedWork.status === "Sold Out" ? "border-red-500/30 bg-red-500/10 text-red-300" : "border-emerald-500/30 bg-emerald-500/10 text-emerald-300"}`}>{localizedStatus(selectedWork.status)}</span>{selectedWork.featured ? <span className="rounded-full border border-white/10 px-3 py-1 text-[10px] uppercase tracking-[0.3em] text-zinc-300">{ui.featured}</span> : null}</div><p className="mt-4 text-xs uppercase tracking-[0.35em] text-zinc-500">{selectedWork.subtitle}</p><p className="mt-3 inline-flex rounded-full border border-white/10 px-3 py-1 text-[10px] uppercase tracking-[0.3em] text-zinc-300">{selectedWork.collection}</p><div className="mt-3 flex items-start justify-between gap-4"><div><h3 className="text-3xl font-semibold uppercase tracking-[0.08em] text-white sm:text-4xl">{selectedWork.title}</h3><p className="mt-4 max-w-2xl text-sm leading-8 text-zinc-400">{selectedWork.description}</p></div><div className="rounded-full border border-white/10 px-4 py-2 text-sm text-zinc-100">{selectedWork.price}</div></div><div className="mt-8 grid gap-4 sm:grid-cols-2"><MetaPill icon={<Layers3 size={14} />} label={ui.material} value={selectedWork.material} /><MetaPill icon={<Gem size={14} />} label={ui.stone} value={selectedWork.stone} /><MetaPill icon={<Ruler size={14} />} label={ui.size} value={selectedWork.size} /><MetaPill icon={<Tag size={14} />} label={ui.sku} value={selectedWork.sku} /><MetaPill icon={<Package size={14} />} label={ui.edition} value={selectedWork.edition} /><MetaPill icon={<ShoppingBag size={14} />} label={ui.stock} value={selectedWork.stock} /></div><div className="mt-8 flex flex-wrap gap-3"><button onClick={() => addToCart(selectedWork)} disabled={selectedWork.status === "Sold Out" || Number(selectedWork.stock || 0) <= 0} className={`inline-flex items-center gap-2 rounded-2xl border px-5 py-3 text-sm transition ${selectedWork.status === "Sold Out" || Number(selectedWork.stock || 0) <= 0 ? "cursor-not-allowed border-white/10 text-zinc-500" : "border-white/10 text-zinc-100 hover:border-white/30 hover:text-white"}`}><ShoppingBag size={16} /> {ui.addToCart}</button></div><div className="mt-8 rounded-3xl border border-white/10 bg-black/30 p-6"><div className="mb-4 flex items-center gap-2 text-zinc-300"><CreditCard size={16} /><p className="text-xs uppercase tracking-[0.35em] text-zinc-500">{ui.purchase}</p></div>{selectedWork.paypalPaymentUrl ? <a href={selectedWork.paypalPaymentUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-2xl border border-white/10 px-5 py-3 text-sm text-zinc-100 transition hover:border-white/30 hover:text-white"><CreditCard size={16} /> {ui.buyWithPayPal}</a> : <div className="rounded-2xl border border-dashed border-white/10 p-4 text-sm text-zinc-400">{ui.addPayPalNotice}</div>}</div></div></div>
            </div>
          </div>
        ) : null}

        {cartOpen ? (
          <div className="fixed inset-0 z-[60] flex items-end justify-center bg-black/50 backdrop-blur-sm md:items-center md:justify-end" onClick={() => setCartOpen(false)}>
            <div className="h-[88vh] w-full max-w-xl overflow-auto rounded-t-[2rem] border border-white/10 bg-zinc-950 p-4 sm:p-6 md:h-full md:rounded-none md:border-l md:border-t-0" onClick={(e) => e.stopPropagation()}>
              <div className="mb-6 flex items-center justify-between"><div><p className="text-sm font-medium uppercase tracking-[0.3em] text-white">{ui.cart}</p><p className="text-xs text-zinc-500">{cartCount} {ui.itemsSuffix}</p></div><button onClick={() => setCartOpen(false)} className="rounded-full border border-white/10 p-2 text-zinc-300 transition hover:text-white"><X size={18} /></button></div>
              {cartSummary.items.length === 0 ? <div className="rounded-3xl border border-dashed border-white/10 p-8 text-center text-sm text-zinc-500">{ui.emptyCart}</div> : <div className="space-y-4">{cartSummary.items.map((item) => <div key={item.sku} className="rounded-3xl border border-white/10 bg-black/40 p-4"><div className="flex gap-4"><div className="flex h-24 w-20 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-black"><img src={((Array.isArray(item.images) && item.images.find(Boolean)) || item.image)} alt={item.title} className="max-h-full max-w-full object-contain" /></div><div className="min-w-0 flex-1"><div className="flex items-start justify-between gap-3"><div><p className="text-sm font-medium text-white">{item.title}</p><p className="mt-1 text-xs uppercase tracking-[0.28em] text-zinc-500">{item.subtitle}</p><p className="mt-2 text-xs text-zinc-500">SKU {item.sku}</p></div><button onClick={() => removeFromCart(item.sku)} className="text-zinc-500 transition hover:text-red-400"><Trash2 size={14} /></button></div><div className="mt-4 flex items-center justify-between gap-3"><div className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-zinc-950 px-2 py-2"><button onClick={() => updateCartQuantity(item.sku, -1)} className="rounded-xl p-1 text-zinc-300 transition hover:text-white"><Minus size={14} /></button><span className="min-w-8 text-center text-sm text-zinc-100">{item.quantity}</span><button onClick={() => updateCartQuantity(item.sku, 1)} className="rounded-xl p-1 text-zinc-300 transition hover:text-white"><Plus size={14} /></button></div><div className="text-sm text-zinc-100">{formatYen(item.lineTotal)}</div></div></div></div></div>)}<div className="rounded-3xl border border-white/10 bg-black/30 p-5"><div className="flex items-center justify-between text-sm text-zinc-300"><span>{ui.subtotal}</span><span>{formatYen(cartSummary.subtotal)}</span></div><div className="mt-4 rounded-2xl border border-white/10 bg-zinc-950 p-4 text-sm leading-7 text-zinc-400">{normalizedContent.store.checkoutNote}</div></div><div className="flex flex-wrap gap-3"><SmallButton onClick={clearCart} danger><Trash2 size={14} /> {ui.clearCart}</SmallButton><SmallButton onClick={() => { setCartOpen(false); setCheckoutOpen(true); }}><CreditCard size={14} /> {ui.goToCheckout}</SmallButton></div></div>}
            </div>
          </div>
        ) : null}

        {checkoutOpen ? (
          <div className="fixed inset-0 z-[70] flex items-end justify-center bg-black/65 p-2 sm:p-4 backdrop-blur-sm md:items-center" onClick={() => setCheckoutOpen(false)}>
            <div className="max-h-[94vh] w-full max-w-5xl overflow-auto rounded-[2rem] border border-white/10 bg-zinc-950" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between border-b border-white/10 px-6 py-5 md:px-8"><div><p className="text-sm font-medium uppercase tracking-[0.3em] text-white">{ui.checkout}</p><p className="text-xs text-zinc-500">{ui.checkoutSub}</p></div><button onClick={() => setCheckoutOpen(false)} className="rounded-full border border-white/10 p-2 text-zinc-300 transition hover:text-white"><X size={18} /></button></div>
              <div className="grid gap-6 p-4 sm:p-6 md:grid-cols-[0.95fr_1.05fr] md:gap-8 md:p-8"><div className="space-y-6"><div className="rounded-3xl border border-white/10 bg-black/30 p-5"><p className="mb-4 text-xs uppercase tracking-[0.35em] text-zinc-500">{ui.customer}</p><div className="grid gap-4 md:grid-cols-2"><Input label={ui.fullName} value={checkoutForm.name} onChange={(v) => setCheckoutForm((prev) => ({ ...prev, name: v }))} /><Input label={ui.email} value={checkoutForm.email} onChange={(v) => setCheckoutForm((prev) => ({ ...prev, email: v }))} /><Input label={ui.country} value={checkoutForm.country} onChange={(v) => setCheckoutForm((prev) => ({ ...prev, country: v }))} /><Input label={ui.city} value={checkoutForm.city} onChange={(v) => setCheckoutForm((prev) => ({ ...prev, city: v }))} /></div><div className="mt-4"><Textarea label={ui.address} value={checkoutForm.address} onChange={(v) => setCheckoutForm((prev) => ({ ...prev, address: v }))} rows={3} /></div><div className="mt-4"><Textarea label={ui.orderNote} value={checkoutForm.note} onChange={(v) => setCheckoutForm((prev) => ({ ...prev, note: v }))} rows={4} /></div></div><div className="rounded-3xl border border-white/10 bg-black/30 p-5"><p className="mb-4 text-xs uppercase tracking-[0.35em] text-zinc-500">{ui.checkoutActions}</p><div className="flex flex-wrap gap-3">{singlePayPalCheckoutUrl ? <a href={singlePayPalCheckoutUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-2xl border border-white/10 px-5 py-3 text-sm text-zinc-100 transition hover:border-white/30 hover:text-white"><CreditCard size={16} /> {ui.payWithPayPal}</a> : <div className="rounded-2xl border border-dashed border-white/10 px-4 py-3 text-sm text-zinc-400">{ui.multiItemNotice}</div>}<a href={`mailto:${normalizedContent.contact.email}?subject=${encodeURIComponent(`${normalizedContent.brandName} Order Inquiry`)}&body=${encodeURIComponent(orderSummaryText)}`} className="inline-flex items-center gap-2 rounded-2xl border border-white/10 px-5 py-3 text-sm text-zinc-100 transition hover:border-white/30 hover:text-white"><Package size={16} /> {ui.sendOrderByEmail}</a></div></div></div><div className="space-y-4"><div className="rounded-3xl border border-white/10 bg-black/30 p-5"><p className="mb-4 text-xs uppercase tracking-[0.35em] text-zinc-500">{ui.orderSummary}</p><div className="space-y-4">{cartSummary.items.length === 0 ? <div className="rounded-2xl border border-dashed border-white/10 p-6 text-sm text-zinc-500">{ui.emptyCart}</div> : cartSummary.items.map((item) => <div key={item.sku} className="flex gap-4 rounded-2xl border border-white/10 bg-zinc-950 p-4"><div className="flex h-20 w-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-black"><img src={((Array.isArray(item.images) && item.images.find(Boolean)) || item.image)} alt={item.title} className="max-h-full max-w-full object-contain" /></div><div className="min-w-0 flex-1"><div className="flex items-start justify-between gap-3"><div><p className="text-sm font-medium text-white">{item.title}</p><p className="mt-1 text-xs uppercase tracking-[0.28em] text-zinc-500">{item.subtitle}</p><p className="mt-2 text-xs text-zinc-500">{item.quantity} × {formatYen(item.unitPrice)}</p></div><div className="text-sm text-zinc-100">{formatYen(item.lineTotal)}</div></div></div></div>)}</div></div><div className="rounded-3xl border border-white/10 bg-black/30 p-5"><div className="flex items-center justify-between text-sm text-zinc-300"><span>{ui.subtotal}</span><span>{formatYen(cartSummary.subtotal)}</span></div><div className="mt-4 rounded-2xl border border-white/10 bg-zinc-950 p-4 text-sm leading-7 text-zinc-400">{normalizedContent.store.checkoutNote}</div></div></div></div>
            </div>
          </div>
        ) : null}
      </div>
    );
  }, [
    normalizedContent,
    ui,
    visualSystem,
    currentLanguage,
    selectedWork,
    filteredWorks,
    firstRowWorks,
    remainingWorks,
    activeCategory,
    oneOfAKindCategory,
    memoryCategory,
    loverCategory,
    headerSearchTerm,
    cartSummary,
    cartCount,
    mobileMenuOpen,
    showAllWorks,
    checkoutOpen,
    checkoutForm,
    cartOpen,
    navItems,
    filteredOneOfAKindWorks,
    filteredMemoryWorks,
    filteredLoverWorks,
    selectedDetailImageIndex,
    detailImageVisible,
  ]);

  const editorSectionToggle = (key) => (
    <button
      type="button"
      onClick={() => setSectionOpenMap((prev) => ({ ...prev, [key]: !prev[key] }))}
      className="text-zinc-500"
    >
      {sectionOpenMap[key] ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
    </button>
  );

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      {isAdminMode ? (
        <div className="sticky top-0 z-40 flex items-center justify-between border-b border-white/10 bg-black/80 px-4 py-3 backdrop-blur md:px-6">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-white">
            Mortal Aura Jewelry CMS / Admin
          </p>
          <p className="text-xs text-zinc-500">
            仅管理员可见：自动保存 / 导入导出 / 分类筛选 / 系列标签 / 库存SKU / PayPal 链接 / 配送政策 / 三语切换
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-zinc-900 px-3 py-2 text-xs text-zinc-300">
            <Check size={14} /> {saveState}
          </span>
          <button
            onClick={() => setEditorOpen((v) => !v)}
            className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-zinc-900 px-4 py-2 text-sm text-zinc-200 transition hover:border-white/30 hover:text-white"
          >
            {editorOpen ? <Eye size={16} /> : <Pencil size={16} />}
            {editorOpen ? "隐藏编辑器" : "打开编辑器"}
          </button>
        </div>
      </div>
      ) : null}

      <div className={`grid min-h-[calc(100vh-61px)] ${isAdminMode ? "lg:grid-cols-[minmax(0,1.15fr)_380px] xl:grid-cols-[minmax(0,1.15fr)_440px]" : "grid-cols-1"}`}>
        <div className="min-w-0">{preview}</div>
        {isAdminMode && editorOpen ? (
          <aside className="border-t border-white/10 bg-black/70 p-4 md:p-5 lg:sticky lg:top-[61px] lg:h-[calc(100vh-61px)] lg:overflow-y-auto lg:border-l lg:border-t-0">
            <div className="space-y-5">
              <SectionCard title="站点管理" actions={<div className="flex items-center gap-2">{editorSectionToggle("site")}<LayoutPanelTop size={16} className="text-zinc-500" /></div>}>
                {renderSectionBody(sectionOpenMap.site, <>
                  <div className="flex flex-wrap gap-2"><SmallButton onClick={exportData}><Download size={14} />导出配置</SmallButton><SmallButton onClick={() => fileInputRef.current?.click()}><Upload size={14} />导入配置</SmallButton><SmallButton onClick={resetData}><RotateCcw size={14} />恢复默认</SmallButton><input ref={fileInputRef} type="file" accept="application/json" className="hidden" onChange={(e) => importData(e.target.files?.[0])} /></div>
                  <Toggle label="显示首页 Hero" checked={normalizedContent.sections.hero} onChange={(v) => updateNested(["sections", "hero"], v)} />
                  <Toggle label="显示 Collections 区" checked={normalizedContent.sections.collections} onChange={(v) => updateNested(["sections", "collections"], v)} />
                  <Toggle label="显示作品区" checked={normalizedContent.sections.works} onChange={(v) => updateNested(["sections", "works"], v)} />
                  <Toggle label="显示 One of a Kind 区" checked={normalizedContent.sections.oneOfAKind} onChange={(v) => updateNested(["sections", "oneOfAKind"], v)} />
                  <Toggle label="显示 Stories 区" checked={normalizedContent.sections.stories} onChange={(v) => updateNested(["sections", "stories"], v)} />
                  <Toggle label="显示关于页" checked={normalizedContent.sections.about} onChange={(v) => updateNested(["sections", "about"], v)} />
                  <Toggle label="显示 Instagram 区" checked={normalizedContent.sections.instagram} onChange={(v) => updateNested(["sections", "instagram"], v)} />
                  <Toggle label="显示配送政策" checked={normalizedContent.sections.shipping} onChange={(v) => updateNested(["sections", "shipping"], v)} />
                  <Toggle label="显示联系页" checked={normalizedContent.sections.contact} onChange={(v) => updateNested(["sections", "contact"], v)} />
                </>)}
              </SectionCard>

              <SectionCard title="店铺设置" actions={editorSectionToggle("store")}>
                {renderSectionBody(sectionOpenMap.store, <>
                  <Input label="品牌名" value={normalizedContent.brandName} onChange={(v) => updateNested(["brandName"], v)} />
                  <Input label="货币" value={normalizedContent.store.currency} onChange={(v) => updateNested(["store", "currency"], v)} />
                  <Input label="国内免邮门槛" value={normalizedContent.store.domesticFreeShippingThreshold} onChange={(v) => updateNested(["store", "domesticFreeShippingThreshold"], v)} />
                  <Input label="海外免邮门槛" value={normalizedContent.store.internationalFreeShippingThreshold} onChange={(v) => updateNested(["store", "internationalFreeShippingThreshold"], v)} />
                  <Textarea label="国内配送说明" value={normalizedContent.store.japanShippingNote} onChange={(v) => updateNested(["store", "japanShippingNote"], v)} rows={3} />
                  <Textarea label="海外配送说明" value={normalizedContent.store.internationalShippingNote} onChange={(v) => updateNested(["store", "internationalShippingNote"], v)} rows={3} />
                </>)}
              </SectionCard>

              <SectionCard title="首页 Hero" actions={editorSectionToggle("hero")}>
                {renderSectionBody(sectionOpenMap.hero, <>
                  <Input label="上方小标题" value={normalizedContent.hero.eyebrow} onChange={(v) => updateNested(["hero", "eyebrow"], v)} />
                  <Input label="主标题" value={normalizedContent.hero.title} onChange={(v) => updateNested(["hero", "title"], v)} />
                  <Input label="副标题" value={normalizedContent.hero.subtitle} onChange={(v) => updateNested(["hero", "subtitle"], v)} />
                  <Input label="主按钮文字" value={normalizedContent.hero.ctaPrimary} onChange={(v) => updateNested(["hero", "ctaPrimary"], v)} />
                  <Input label="次按钮文字" value={normalizedContent.hero.ctaSecondary} onChange={(v) => updateNested(["hero", "ctaSecondary"], v)} />
                  <Input label="首页背景图链接" value={normalizedContent.hero.backgroundImage} onChange={(v) => updateNested(["hero", "backgroundImage"], v)} />
                  <ImageUpload label="上传首页背景图" onChange={(v) => updateNested(["hero", "backgroundImage"], v)} />
                </>)}
              </SectionCard>

              <SectionCard title="Collections 区标题" actions={editorSectionToggle("collectionsTitle")}>
                {renderSectionBody(sectionOpenMap.collectionsTitle, <>
                  <Input label="Collections 区标题" value={normalizedContent.collectionsIntro.sectionTitle} onChange={(v) => updateNested(["collectionsIntro", "sectionTitle"], v)} />
                  <Textarea label="Collections 区说明" value={normalizedContent.collectionsIntro.sectionText} onChange={(v) => updateNested(["collectionsIntro", "sectionText"], v)} rows={3} />
                </>)}
              </SectionCard>

              <SectionCard title="Collections 卡位（固定 6 个）" actions={editorSectionToggle("collectionsSlots")}>
                {renderSectionBody(sectionOpenMap.collectionsSlots, <div className="space-y-4">{normalizedContent.collectionsIntro.items.map((item, index) => <div key={`collection-slot-${index}`} className="rounded-2xl border border-white/10 bg-zinc-950 p-4"><div className="mb-3 flex items-center justify-between gap-2"><p className="text-sm font-medium text-white">卡位 {index + 1}</p><Toggle label="启用" checked={item.enabled} onChange={(v) => updateNested(["collectionsIntro", "items", index, "enabled"], v)} /></div><div className="space-y-3"><Input label="标题" value={item.title} onChange={(v) => updateNested(["collectionsIntro", "items", index, "title"], v)} /><Input label="副标题" value={item.subtitle} onChange={(v) => updateNested(["collectionsIntro", "items", index, "subtitle"], v)} /><Input label="关联 Collection 名" value={item.targetCollection} onChange={(v) => updateNested(["collectionsIntro", "items", index, "targetCollection"], v)} /><Input label="图片链接" value={item.image} onChange={(v) => updateNested(["collectionsIntro", "items", index, "image"], v)} /><ImageUpload label="上传 Collections 图片" onChange={(v) => updateNested(["collectionsIntro", "items", index, "image"], v)} /><Textarea label="说明" value={item.description} onChange={(v) => updateNested(["collectionsIntro", "items", index, "description"], v)} rows={3} /><Select label="边框形状" value={item.shape} onChange={(v) => updateNested(["collectionsIntro", "items", index, "shape"], v)} options={["long", "round"]} /></div></div>)}</div>)}
              </SectionCard>

              <SectionCard title="作品区标题" actions={editorSectionToggle("worksTitle")}>
                {renderSectionBody(sectionOpenMap.worksTitle, <><Input label="作品区标题" value={normalizedContent.worksIntro.sectionTitle} onChange={(v) => updateNested(["worksIntro", "sectionTitle"], v)} /><Textarea label="作品区说明" value={normalizedContent.worksIntro.sectionText} onChange={(v) => updateNested(["worksIntro", "sectionText"], v)} rows={3} /></>)}
              </SectionCard>

              <SectionCard title="One of a Kind 区标题" actions={editorSectionToggle("oneOfAKindTitle")}>
                {renderSectionBody(sectionOpenMap.oneOfAKindTitle, <><Input label="One of a Kind 区标题" value={normalizedContent.oneOfAKindIntro.sectionTitle} onChange={(v) => updateNested(["oneOfAKindIntro", "sectionTitle"], v)} /><Textarea label="One of a Kind 区说明" value={normalizedContent.oneOfAKindIntro.sectionText} onChange={(v) => updateNested(["oneOfAKindIntro", "sectionText"], v)} rows={3} /></>)}
              </SectionCard>

              <SectionCard title="Stories 区标题" actions={editorSectionToggle("storiesTitle")}>
                {renderSectionBody(sectionOpenMap.storiesTitle, <><Input label="Stories 区标题" value={normalizedContent.storiesIntro.sectionTitle} onChange={(v) => updateNested(["storiesIntro", "sectionTitle"], v)} /><Textarea label="Stories 区说明" value={normalizedContent.storiesIntro.sectionText} onChange={(v) => updateNested(["storiesIntro", "sectionText"], v)} rows={3} /><Input label="左侧标题" value={normalizedContent.storiesIntro.leftTitle} onChange={(v) => updateNested(["storiesIntro", "leftTitle"], v)} /><Textarea label="左侧说明" value={normalizedContent.storiesIntro.leftText} onChange={(v) => updateNested(["storiesIntro", "leftText"], v)} rows={3} /><Input label="右侧标题" value={normalizedContent.storiesIntro.rightTitle} onChange={(v) => updateNested(["storiesIntro", "rightTitle"], v)} /><Textarea label="右侧说明" value={normalizedContent.storiesIntro.rightText} onChange={(v) => updateNested(["storiesIntro", "rightText"], v)} rows={3} /></>)}
              </SectionCard>

              <SectionCard title="孤品作品板块" actions={<div className="flex items-center gap-2">{editorSectionToggle("oneOfAKindEditor")}<SmallButton onClick={() => addToList("oneOfAKindWorks", { collection: "One of a Kind", edition: "One of a Kind" })}><Plus size={16} /> 新增孤品</SmallButton></div>}>
                {renderSectionBody(sectionOpenMap.oneOfAKindEditor, <div className="space-y-4">{normalizedContent.oneOfAKindWorks.map((work, index) => { const itemOpen = storyItemOpenMap[`ooak-${index}`] ?? false; return <CollapsiblePanel key={`${work.sku}-ooak-${index}`} title={`孤品 ${index + 1} · ${work.title || "未命名"}`} open={itemOpen} onToggle={() => setStoryItemOpenMap((prev) => ({ ...prev, [`ooak-${index}`]: !itemOpen }))} right={<div className="flex items-center gap-2"><SmallButton onClick={() => moveInList("oneOfAKindWorks", index, "up")}><ArrowUp size={14} /></SmallButton><SmallButton onClick={() => moveInList("oneOfAKindWorks", index, "down")}><ArrowDown size={14} /></SmallButton><button onClick={() => removeFromList("oneOfAKindWorks", index, "oneOfAKind")} className="inline-flex items-center gap-1 text-xs text-zinc-400 transition hover:text-red-400"><Trash2 size={14} /> 删除</button></div>}><Input label="标题" value={work.title} onChange={(v) => updateListField("oneOfAKindWorks", index, "title", v, "One of a Kind")} /><Input label="副标题" value={work.subtitle} onChange={(v) => updateListField("oneOfAKindWorks", index, "subtitle", v, "One of a Kind")} /><Input label="分类" value={work.category} onChange={(v) => updateListField("oneOfAKindWorks", index, "category", v, "One of a Kind")} /><Input label="SKU" value={work.sku} onChange={(v) => updateListField("oneOfAKindWorks", index, "sku", v, "One of a Kind")} /><ImageFieldsEditor title="孤品图片" images={work.images} onChange={(imgs) => updateListField("oneOfAKindWorks", index, "images", imgs, "One of a Kind")} uploadLabel="上传孤品图片" /><Input label="主页短介绍" value={work.homeExcerpt || ""} onChange={(v) => updateListField("oneOfAKindWorks", index, "homeExcerpt", v, "One of a Kind")} /><Textarea label="详情长介绍" value={work.description} onChange={(v) => updateListField("oneOfAKindWorks", index, "description", v, "One of a Kind")} rows={5} /><Input label="材质" value={work.material} onChange={(v) => updateListField("oneOfAKindWorks", index, "material", v, "One of a Kind")} /><Input label="宝石" value={work.stone} onChange={(v) => updateListField("oneOfAKindWorks", index, "stone", v, "One of a Kind")} /><Input label="尺寸" value={work.size} onChange={(v) => updateListField("oneOfAKindWorks", index, "size", v, "One of a Kind")} /><Input label="版本" value={work.edition} onChange={(v) => updateListField("oneOfAKindWorks", index, "edition", v, "One of a Kind")} /><Input label="价格" value={work.price} onChange={(v) => updateListField("oneOfAKindWorks", index, "price", v, "One of a Kind")} /><Input label="库存" value={work.stock} onChange={(v) => updateListField("oneOfAKindWorks", index, "stock", v, "One of a Kind")} /><Select label="状态" value={work.status} onChange={(v) => updateListField("oneOfAKindWorks", index, "status", v, "One of a Kind")} options={["In Stock", "Sold Out", "Made to Order"]} /><Toggle label="设为 Featured" checked={work.featured} onChange={(v) => updateListField("oneOfAKindWorks", index, "featured", v, "One of a Kind")} /><Input label="PayPal Payment Link" value={work.paypalPaymentUrl} onChange={(v) => updateListField("oneOfAKindWorks", index, "paypalPaymentUrl", v, "One of a Kind")} /></CollapsiblePanel>; })}</div>)}
              </SectionCard>

              <SectionCard title="My Memories 作品" actions={<div className="flex items-center gap-2">{editorSectionToggle("memoryEditor")}<SmallButton onClick={() => addToList("memoryWorks", { collection: "My Memories", size: "28 mm" })}><Plus size={16} /> 新增</SmallButton></div>}>
                {renderSectionBody(sectionOpenMap.memoryEditor, <div className="space-y-4">{normalizedContent.memoryWorks.map((work, index) => { const itemOpen = storyItemOpenMap[`memory-${index}`] ?? false; return <CollapsiblePanel key={`${work.sku}-memory-${index}`} title={`记忆 ${index + 1} · ${work.title || "未命名"}`} open={itemOpen} onToggle={() => setStoryItemOpenMap((prev) => ({ ...prev, [`memory-${index}`]: !itemOpen }))} right={<div className="flex items-center gap-2"><SmallButton onClick={() => moveInList("memoryWorks", index, "up")}><ArrowUp size={14} /></SmallButton><SmallButton onClick={() => moveInList("memoryWorks", index, "down")}><ArrowDown size={14} /></SmallButton><button onClick={() => removeFromList("memoryWorks", index, "memory")} className="inline-flex items-center gap-1 text-xs text-zinc-400 transition hover:text-red-400"><Trash2 size={14} /> 删除</button></div>}><Input label="标题" value={work.title} onChange={(v) => updateListField("memoryWorks", index, "title", v, "My Memories")} /><Input label="副标题" value={work.subtitle} onChange={(v) => updateListField("memoryWorks", index, "subtitle", v, "My Memories")} /><Input label="分类" value={work.category} onChange={(v) => updateListField("memoryWorks", index, "category", v, "My Memories")} /><Input label="SKU" value={work.sku} onChange={(v) => updateListField("memoryWorks", index, "sku", v, "My Memories")} /><ImageFieldsEditor title="记忆作品图片" images={work.images} onChange={(imgs) => updateListField("memoryWorks", index, "images", imgs, "My Memories")} uploadLabel="上传记忆作品图片" /><Input label="主页短介绍" value={work.homeExcerpt || ""} onChange={(v) => updateListField("memoryWorks", index, "homeExcerpt", v, "My Memories")} /><Textarea label="详情长介绍" value={work.description} onChange={(v) => updateListField("memoryWorks", index, "description", v, "My Memories")} rows={5} /><Input label="材质" value={work.material} onChange={(v) => updateListField("memoryWorks", index, "material", v, "My Memories")} /><Input label="宝石" value={work.stone} onChange={(v) => updateListField("memoryWorks", index, "stone", v, "My Memories")} /><Input label="尺寸" value={work.size} onChange={(v) => updateListField("memoryWorks", index, "size", v, "My Memories")} /><Input label="版本" value={work.edition} onChange={(v) => updateListField("memoryWorks", index, "edition", v, "My Memories")} /><Input label="价格" value={work.price} onChange={(v) => updateListField("memoryWorks", index, "price", v, "My Memories")} /><Input label="库存" value={work.stock} onChange={(v) => updateListField("memoryWorks", index, "stock", v, "My Memories")} /><Select label="状态" value={work.status} onChange={(v) => updateListField("memoryWorks", index, "status", v, "My Memories")} options={["In Stock", "Sold Out", "Made to Order"]} /><Toggle label="设为 Featured" checked={work.featured} onChange={(v) => updateListField("memoryWorks", index, "featured", v, "My Memories")} /><Input label="PayPal Payment Link" value={work.paypalPaymentUrl} onChange={(v) => updateListField("memoryWorks", index, "paypalPaymentUrl", v, "My Memories")} /></CollapsiblePanel>; })}</div>)}
              </SectionCard>

              <SectionCard title="For Your Lover 作品" actions={<div className="flex items-center gap-2">{editorSectionToggle("loverEditor")}<SmallButton onClick={() => addToList("loverWorks", { collection: "For Your Lover", size: "28 mm" })}><Plus size={16} /> 新增</SmallButton></div>}>
                {renderSectionBody(sectionOpenMap.loverEditor, <div className="space-y-4">{normalizedContent.loverWorks.map((work, index) => { const itemOpen = storyItemOpenMap[`lover-${index}`] ?? false; return <CollapsiblePanel key={`${work.sku}-lover-${index}`} title={`爱人 ${index + 1} · ${work.title || "未命名"}`} open={itemOpen} onToggle={() => setStoryItemOpenMap((prev) => ({ ...prev, [`lover-${index}`]: !itemOpen }))} right={<div className="flex items-center gap-2"><SmallButton onClick={() => moveInList("loverWorks", index, "up")}><ArrowUp size={14} /></SmallButton><SmallButton onClick={() => moveInList("loverWorks", index, "down")}><ArrowDown size={14} /></SmallButton><button onClick={() => removeFromList("loverWorks", index, "lover")} className="inline-flex items-center gap-1 text-xs text-zinc-400 transition hover:text-red-400"><Trash2 size={14} /> 删除</button></div>}><Input label="标题" value={work.title} onChange={(v) => updateListField("loverWorks", index, "title", v, "For Your Lover")} /><Input label="副标题" value={work.subtitle} onChange={(v) => updateListField("loverWorks", index, "subtitle", v, "For Your Lover")} /><Input label="分类" value={work.category} onChange={(v) => updateListField("loverWorks", index, "category", v, "For Your Lover")} /><Input label="SKU" value={work.sku} onChange={(v) => updateListField("loverWorks", index, "sku", v, "For Your Lover")} /><ImageFieldsEditor title="爱人作品图片" images={work.images} onChange={(imgs) => updateListField("loverWorks", index, "images", imgs, "For Your Lover")} uploadLabel="上传爱人作品图片" /><Input label="主页短介绍" value={work.homeExcerpt || ""} onChange={(v) => updateListField("loverWorks", index, "homeExcerpt", v, "For Your Lover")} /><Textarea label="详情长介绍" value={work.description} onChange={(v) => updateListField("loverWorks", index, "description", v, "For Your Lover")} rows={5} /><Input label="材质" value={work.material} onChange={(v) => updateListField("loverWorks", index, "material", v, "For Your Lover")} /><Input label="宝石" value={work.stone} onChange={(v) => updateListField("loverWorks", index, "stone", v, "For Your Lover")} /><Input label="尺寸" value={work.size} onChange={(v) => updateListField("loverWorks", index, "size", v, "For Your Lover")} /><Input label="版本" value={work.edition} onChange={(v) => updateListField("loverWorks", index, "edition", v, "For Your Lover")} /><Input label="价格" value={work.price} onChange={(v) => updateListField("loverWorks", index, "price", v, "For Your Lover")} /><Input label="库存" value={work.stock} onChange={(v) => updateListField("loverWorks", index, "stock", v, "For Your Lover")} /><Select label="状态" value={work.status} onChange={(v) => updateListField("loverWorks", index, "status", v, "For Your Lover")} options={["In Stock", "Sold Out", "Made to Order"]} /><Toggle label="设为 Featured" checked={work.featured} onChange={(v) => updateListField("loverWorks", index, "featured", v, "For Your Lover")} /><Input label="PayPal Payment Link" value={work.paypalPaymentUrl} onChange={(v) => updateListField("loverWorks", index, "paypalPaymentUrl", v, "For Your Lover")} /></CollapsiblePanel>; })}</div>)}
              </SectionCard>

              <SectionCard title="Logo / 视觉系统" actions={editorSectionToggle("visual")}>
                {renderSectionBody(sectionOpenMap.visual, <><Toggle label="显示 Logo 水印" checked={visualSystem.showWatermark} onChange={(v) => updateNested(["visualSystem", "showWatermark"], v)} /><Input label="水印文字" value={visualSystem.watermarkText} onChange={(v) => updateNested(["visualSystem", "watermarkText"], v)} /><Input label="水印透明度（0-100）" value={visualSystem.watermarkOpacity} onChange={(v) => updateNested(["visualSystem", "watermarkOpacity"], v)} /><Input label="Instagram 区标题" value={visualSystem.instagramSectionTitle} onChange={(v) => updateNested(["visualSystem", "instagramSectionTitle"], v)} /><Textarea label="Instagram 区说明" value={visualSystem.instagramSectionText} onChange={(v) => updateNested(["visualSystem", "instagramSectionText"], v)} rows={3} /></>)}
              </SectionCard>

              <SectionCard title="作品板块" actions={<div className="flex items-center gap-2">{editorSectionToggle("works")}<SmallButton onClick={() => addToList("works", {})}><Plus size={16} /> 新增作品</SmallButton></div>}>
                {renderSectionBody(sectionOpenMap.works, <><div className="mb-4 flex justify-end"><SmallButton onClick={() => setWorksPanelOpen((v) => !v)}>{worksPanelOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}{worksPanelOpen ? "收起全部作品" : "展开全部作品"}</SmallButton></div>{worksPanelOpen ? <div className="space-y-4">{normalizedContent.works.map((work, index) => { const itemOpen = workItemOpenMap[index] ?? false; return <CollapsiblePanel key={`${work.sku}-${index}`} title={`作品 ${index + 1} · ${work.title || "未命名"}`} open={itemOpen} onToggle={() => setWorkItemOpenMap((prev) => ({ ...prev, [index]: !itemOpen }))} right={<div className="flex items-center gap-2"><SmallButton onClick={() => moveInList("works", index, "up")}><ArrowUp size={14} /></SmallButton><SmallButton onClick={() => moveInList("works", index, "down")}><ArrowDown size={14} /></SmallButton><button onClick={() => removeFromList("works", index, "works")} className="inline-flex items-center gap-1 text-xs text-zinc-400 transition hover:text-red-400"><Trash2 size={14} /> 删除</button></div>}><Input label="标题" value={work.title} onChange={(v) => updateListField("works", index, "title", v)} /><Input label="副标题" value={work.subtitle} onChange={(v) => updateListField("works", index, "subtitle", v)} /><Input label="分类" value={work.category} onChange={(v) => updateListField("works", index, "category", v)} /><Input label="Collection 所属" value={work.collection || ""} onChange={(v) => updateListField("works", index, "collection", v)} /><Input label="SKU" value={work.sku} onChange={(v) => updateListField("works", index, "sku", v)} /><ImageFieldsEditor title="作品图片" images={work.images} onChange={(imgs) => updateListField("works", index, "images", imgs)} uploadLabel="上传作品图片" /><Input label="主页短介绍（可留空）" value={work.homeExcerpt || ""} onChange={(v) => updateListField("works", index, "homeExcerpt", v)} /><Textarea label="详情长介绍" value={work.description} onChange={(v) => updateListField("works", index, "description", v)} rows={5} /><Input label="材质" value={work.material} onChange={(v) => updateListField("works", index, "material", v)} /><Input label="宝石" value={work.stone} onChange={(v) => updateListField("works", index, "stone", v)} /><Input label="尺寸" value={work.size} onChange={(v) => updateListField("works", index, "size", v)} /><Input label="版本" value={work.edition} onChange={(v) => updateListField("works", index, "edition", v)} /><Input label="价格" value={work.price} onChange={(v) => updateListField("works", index, "price", v)} /><Input label="库存" value={work.stock} onChange={(v) => updateListField("works", index, "stock", v)} /><Select label="状态" value={work.status} onChange={(v) => updateListField("works", index, "status", v)} options={["In Stock", "Sold Out", "Made to Order"]} /><Toggle label="设为 Featured" checked={work.featured} onChange={(v) => updateListField("works", index, "featured", v)} /><Input label="PayPal Payment Link" value={work.paypalPaymentUrl} onChange={(v) => updateListField("works", index, "paypalPaymentUrl", v)} /></CollapsiblePanel>; })}</div> : null}</>)}
              </SectionCard>

              <SectionCard title="配送政策" actions={editorSectionToggle("shipping")}>
                {renderSectionBody(sectionOpenMap.shipping, <><Input label="配送区标题" value={normalizedContent.shipping.sectionTitle} onChange={(v) => updateNested(["shipping", "sectionTitle"], v)} /><Textarea label="配送区说明" value={normalizedContent.shipping.description} onChange={(v) => updateNested(["shipping", "description"], v)} rows={4} /><SmallButton onClick={addShippingRate}><Plus size={16} /> 新增分区</SmallButton><div className="space-y-3">{normalizedContent.shipping.rates.map((rate, index) => <div key={`${rate.region}-${index}`} className="rounded-2xl border border-white/10 bg-zinc-950 p-4"><Input label="分区名" value={rate.region} onChange={(v) => updateShippingRate(index, "region", v)} /><div className="mt-3" /><Input label="价格" value={rate.price} onChange={(v) => updateShippingRate(index, "price", v)} /><button onClick={() => removeShippingRate(index)} className="mt-3 inline-flex items-center gap-1 text-xs text-zinc-400 transition hover:text-red-400"><Trash2 size={14} /> 删除分区</button></div>)}</div><Textarea label="配送备注" value={normalizedContent.shipping.note} onChange={(v) => updateNested(["shipping", "note"], v)} rows={3} /></>)}
              </SectionCard>

              <SectionCard title="关于页" actions={editorSectionToggle("about")}>
                {renderSectionBody(sectionOpenMap.about, <><Input label="关于区标题" value={normalizedContent.about.sectionTitle} onChange={(v) => updateNested(["about", "sectionTitle"], v)} /><Textarea label="段落 1" value={normalizedContent.about.text1} onChange={(v) => updateNested(["about", "text1"], v)} rows={3} /><Textarea label="段落 2" value={normalizedContent.about.text2} onChange={(v) => updateNested(["about", "text2"], v)} rows={3} /><Textarea label="段落 3" value={normalizedContent.about.text3} onChange={(v) => updateNested(["about", "text3"], v)} rows={3} /></>)}
              </SectionCard>

              <SectionCard title="联系页" actions={editorSectionToggle("contact")}>
                {renderSectionBody(sectionOpenMap.contact, <><Input label="联系区标题" value={normalizedContent.contact.sectionTitle} onChange={(v) => updateNested(["contact", "sectionTitle"], v)} /><Input label="邮箱" value={normalizedContent.contact.email} onChange={(v) => updateNested(["contact", "email"], v)} /><Input label="Instagram 标题" value={normalizedContent.contact.instagramLabel} onChange={(v) => updateNested(["contact", "instagramLabel"], v)} /><Input label="Instagram 文字" value={normalizedContent.contact.instagram} onChange={(v) => updateNested(["contact", "instagram"], v)} /><Input label="Instagram 链接" value={normalizedContent.contact.instagramUrl} onChange={(v) => updateNested(["contact", "instagramUrl"], v)} /><Textarea label="联系说明" value={normalizedContent.contact.note} onChange={(v) => updateNested(["contact", "note"], v)} rows={3} /></>)}
              </SectionCard>

              <SectionCard title="页脚" actions={editorSectionToggle("footer")}>
                {renderSectionBody(sectionOpenMap.footer, <Input label="页脚文字" value={normalizedContent.footer.text} onChange={(v) => updateNested(["footer", "text"], v)} />)}
              </SectionCard>
            </div>
          </aside>
        ) : null}
      </div>
    </div>
  );
}
