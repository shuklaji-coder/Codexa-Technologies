export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
  deliverables: string[];
  badge: string;
}

export interface StepItem {
  step: string;
  title: string;
  duration: string;
  description: string;
  deliverables: string[];
}

export interface PricingPlan {
  id: string;
  name: string;
  tagline: string;
  price: string;
  period: string;
  popular?: boolean;
  features: string[];
  deliveryTime: string;
  revisions: string;
  buttonText: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  rating: number;
  content: string;
  projectType: string;
}

export interface FaqItem {
  question: string;
  answer: string;
  category: string;
}

export const servicesData: ServiceItem[] = [
  {
    id: "web-dev",
    title: "Website Development",
    description: "Ultra-fast, responsive web experiences engineered with Next.js, React, and Tailwind CSS. Built for peak conversion and sub-second loading speeds.",
    iconName: "Globe",
    deliverables: ["Next.js & React 19", "Sub-second load speed", "SEO & Meta Optimization", "Responsive on all screens"],
    badge: "Core Expertise",
  },
  {
    id: "ecommerce",
    title: "E-Commerce Development",
    description: "High-converting online stores built on Shopify, WooCommerce, or headless architectures with seamless Razorpay, Stripe, and UPI integrations.",
    iconName: "ShoppingCart",
    deliverables: ["Shopify & Custom Headless", "UPI & Global Gateways", "Cart Abandonment Recovery", "Instant Checkout Flows"],
    badge: "High ROI",
  },
  {
    id: "web-apps",
    title: "Custom Web Applications",
    description: "Scalable SaaS platforms, internal business tooling, and customer portals architected with robust backend services, microservices, and clean APIs.",
    iconName: "Code2",
    deliverables: ["Full-Stack Architecture", "Role-Based Auth & RBAC", "Real-Time Telemetry", "PostgreSQL & Cloud DBs"],
    badge: "Enterprise Grade",
  },
  {
    id: "mobile-apps",
    title: "Android & iOS App Development",
    description: "Flawless cross-platform mobile apps built with Flutter and React Native. Native performance, 60fps animations, and App Store submission ready.",
    iconName: "Smartphone",
    deliverables: ["iOS & Android Build", "Offline-first Sync", "Push Notifications", "Store Launch Support"],
    badge: "Native Feel",
  },
  {
    id: "ui-ux",
    title: "UI/UX & Product Design",
    description: "Linear & Vercel-caliber design systems. We turn complex workflows into intuitive, hypnotic interfaces that users fall in love with.",
    iconName: "Palette",
    deliverables: ["Figma Design Systems", "Interactive Prototypes", "Micro-Interactions", "User Journey Audits"],
    badge: "Award-Winning",
  },
  {
    id: "maintenance",
    title: "Maintenance & Scale Support",
    description: "Proactive uptime monitoring, security patching, CI/CD automated deployments, and continuous performance tuning for mission-critical apps.",
    iconName: "ShieldCheck",
    deliverables: ["24/7 Uptime Monitoring", "Zero-Downtime Deployments", "Security & Speed Audits", "Dedicated Slack/WhatsApp"],
    badge: "SLA Guaranteed",
  },
];

export const whyChooseUsData = [
  {
    title: "Lightning-Fast Turnaround",
    description: "We work in rapid 1-2 week agile sprints. No bloated meetings or endless delays—just real working software shipped on schedule.",
    icon: "Zap",
  },
  {
    title: "Modern Tech Stack Only",
    description: "We build with Next.js, React, Node.js, Flutter, and Tailwind. No outdated legacy code, no fragile bloatware plugins.",
    icon: "Layers",
  },
  {
    title: "Obsessively Mobile-First",
    description: "Over 78% of your traffic comes from smartphones. We engineer touch gestures, mobile responsiveness, and smooth layouts first.",
    icon: "Smartphone",
  },
  {
    title: "Lighthouse 95+ & SEO Built-in",
    description: "We optimize Core Web Vitals, Open Graph meta tags, structured schema, and sitemaps so Google indexes and ranks you immediately.",
    icon: "TrendingUp",
  },
  {
    title: "100% Transparent Pricing",
    description: "Clear fixed milestone quotes without surprise billing or sneaky clauses. Every rupee is accounted for with clear deliverables.",
    icon: "BadgePercent",
  },
  {
    title: "Direct Engineer Support",
    description: "You talk directly with senior architects and developers who write your code, not junior account managers or sales middlemen.",
    icon: "Headphones",
  },
];

export const statsData = [
  { value: "50+", label: "Projects Delivered", helper: "Across 8 industries" },
  { value: "100%", label: "Client Satisfaction", helper: "Verified reviews" },
  { value: "5+", label: "Years Experience", helper: "Modern engineering" },
  { value: "24/7", label: "Technical Support", helper: "Instant engineer response" },
];

export const processSteps: StepItem[] = [
  {
    step: "01",
    title: "Discover & Strategy",
    duration: "Days 1 - 2",
    description: "We deep-dive into your business goals, target audience, competitive moat, and feature requirements to map out an unshakeable product blueprint.",
    deliverables: ["Product Specification Document", "Architecture Diagram", "Milestone Roadmap"],
  },
  {
    step: "02",
    title: "Design & Prototyping",
    duration: "Days 3 - 6",
    description: "We craft high-fidelity Figma screens with Linear-style polish, dark/light contrast systems, fluid interactions, and user testing reviews.",
    deliverables: ["Full Interactive Figma Prototype", "Design System & UI Components", "Client Sign-off Session"],
  },
  {
    step: "03",
    title: "Engineering & Code",
    duration: "Days 7 - 14",
    description: "We transform approved designs into bulletproof, type-safe code using Next.js, React, Node.js, and Tailwind CSS with micro-interaction animations.",
    deliverables: ["Clean Modular Repository", "Database Schema & APIs", "Weekly Staging Preview Links"],
  },
  {
    step: "04",
    title: "Testing & Deploy",
    duration: "Days 15 - 18",
    description: "Rigorous cross-browser, cross-device QA, Core Web Vitals speed tuning, SSL configuration, security review, and zero-downtime production deployment.",
    deliverables: ["Lighthouse 95+ Audit Report", "Domain & Cloud Edge DNS Setup", "Production Go-Live"],
  },
  {
    step: "05",
    title: "Scale & Ongoing Care",
    duration: "Ongoing",
    description: "Our partnership doesn't end at launch. We provide 30-day post-launch warranty, ongoing feature rollouts, and 24/7 dedicated engineering support.",
    deliverables: ["30 Days Free Maintenance", "Direct WhatsApp/Slack Access", "Traffic & Conversion Insights"],
  },
];

export const techMarquee = [
  { name: "Next.js 14", category: "Framework", icon: "Triangle" },
  { name: "React 19", category: "Frontend", icon: "Atom" },
  { name: "Java 21", category: "Backend", icon: "Coffee" },
  { name: "Spring Boot", category: "Framework", icon: "Cpu" },
  { name: "Node.js", category: "Backend", icon: "Server" },
  { name: "Express.js", category: "Backend", icon: "Server" },
  { name: "MongoDB", category: "Database", icon: "HardDrive" },
  { name: "Hibernate / JPA", category: "Backend", icon: "Database" },
  { name: "TypeScript", category: "Language", icon: "FileCode2" },
  { name: "Tailwind CSS", category: "Styling", icon: "Palette" },
  { name: "Three.js 3D", category: "Frontend", icon: "Boxes" },
  { name: "Flutter", category: "Mobile", icon: "Smartphone" },
  { name: "MySQL", category: "Database", icon: "Database" },
  { name: "PostgreSQL", category: "Database", icon: "Database" },
  { name: "Redis", category: "Cache", icon: "Zap" },
  { name: "Docker", category: "DevOps", icon: "Box" },
  { name: "AWS Cloud", category: "Cloud", icon: "Cloud" },
  { name: "Vercel", category: "Hosting", icon: "Terminal" },
];

export const pricingPlans: PricingPlan[] = [
  {
    id: "starter",
    name: "Starter Package",
    tagline: "Perfect for emerging startups and focused high-converting landing pages.",
    price: "₹6,000",
    period: "one-time",
    popular: false,
    deliveryTime: "5 - 7 Business Days",
    revisions: "3 Rounds Included",
    features: [
      "Custom 3 to 5 page modern responsive website",
      "Tailwind CSS + Next.js / Clean HTML stack",
      "Mobile & tablet responsive perfection",
      "Essential SEO meta tags & sitemap setup",
      "Lead capture contact form + WhatsApp integration",
      "Fast 60fps micro-animations",
      "15 days post-launch bug warranty",
    ],
    buttonText: "Choose Starter",
  },
  {
    id: "standard",
    name: "Standard Package",
    tagline: "Our most popular package for businesses demanding premium market dominance.",
    price: "₹10,000",
    period: "one-time",
    popular: true,
    deliveryTime: "10 - 14 Business Days",
    revisions: "Unlimited Revisions",
    features: [
      "Up to 10 custom pages with premium UI/UX design",
      "Engineered with Next.js 14 & Framer Motion",
      "Dynamic CMS or blog setup (WordPress / Headless)",
      "Lighthouse 95+ speed & Core Web Vitals optimization",
      "Custom lead generation forms with email & DB routing",
      "Social media previews, Open Graph & Schema tags",
      "Advanced glassmorphism & metallic gradient styling",
      "30 days dedicated support & warranty",
    ],
    buttonText: "Get Standard Plan",
  },
  {
    id: "pro",
    name: "Pro Scale Package",
    tagline: "Comprehensive solution for high-growth brands and e-commerce leaders.",
    price: "₹15,000",
    period: "one-time",
    popular: false,
    deliveryTime: "14 - 21 Business Days",
    revisions: "Unlimited Revisions",
    features: [
      "Full corporate or e-commerce website (up to 20 pages/catalog)",
      "Razorpay, Stripe & UPI payment gateway integration",
      "Custom product filter, search & inventory interface",
      "Automated customer notifications & analytics dashboard",
      "Comprehensive SEO audit & competitor keyword strategy",
      "Vercel / AWS enterprise deployment configuration",
      "60 days priority VIP support via direct WhatsApp/Slack",
    ],
    buttonText: "Choose Pro Scale",
  },
];

export const testimonialsData: TestimonialItem[] = [
  {
    id: "t-chaloji",
    name: "Founding Team",
    role: "Leadership & Operations",
    company: "ChaloJi Mobility (chalojii.in)",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
    rating: 5,
    content: "Codexa Technologies architected and built ChaloJi's web platform and mobile ecosystem flawlessly. From instant cab bookings, zero-surge pricing logic, to seamless live tracking and driver onboarding, their engineering standard is exceptional.",
    projectType: "Mobility & Ride-Booking Platform",
  },
  {
    id: "t-mits",
    name: "Platform Leadership",
    role: "Founding Member",
    company: "MITS Sadhana (mitssadhana.in)",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
    rating: 5,
    content: "Codexa Technologies architected our entire spiritual ecosystem with remarkable skill. From verified Pandit booking workflows and sacred Samagri delivery to our 24/7 AI Spiritual Guide, the platform is lightning-fast, dependable, and deeply revered by our devotees.",
    projectType: "Vedic Spiritual & AI Platform",
  },
  {
    id: "t0",
    name: "Founder & Product Lead",
    role: "Leadership Team",
    company: "Cafewala (India)",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
    rating: 5,
    content: "Codexa Technologies architected Cafewala with exceptional precision and velocity. From the buttery-smooth QR ordering flows to real-time order sync and instant UPI checkouts, their engineering standard is undeniably top-tier. Customer engagement jumped 3.4x within weeks.",
    projectType: "Full-Stack Cafe Ordering Platform",
  },
  {
    id: "t1",
    name: "Vikram Malhotra",
    role: "Founder & CEO",
    company: "FinEdge Wealth (Mumbai)",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
    rating: 5,
    content: "Codexa Technologies transformed our outdated web presence into a hyper-polished, Vercel-grade masterpiece. In the first month after launch, our inbound client inquiries jumped by 240%. Their speed and aesthetic sense are world-class.",
    projectType: "Next.js Web Portal",
  },
  {
    id: "t2",
    name: "Ananya Deshmukh",
    role: "Director of Product",
    company: "AuraVogue India (Bengaluru)",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop",
    rating: 5,
    content: "We hired Codexa for our custom e-commerce rollout. The attention to detail—from smooth micro-interactions to sub-second page loads—exceeded all expectations. Working with their team felt like having an elite Silicon Valley dev unit on speed dial.",
    projectType: "Headless E-Commerce",
  },
  {
    id: "t3",
    name: "Rajesh Kannan",
    role: "Co-Founder & CTO",
    company: "LogixFleet Networks (Chennai)",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop",
    rating: 5,
    content: "Their Flutter and backend engineers built our cross-platform telemetry app in record time. Zero crashes in production, smooth 60fps animations, and outstanding post-launch dedication. Codexa is our permanent technology partner now.",
    projectType: "Mobile & IoT Platform",
  },
];

export const faqData: FaqItem[] = [
  {
    question: "What is your typical project timeline?",
    answer: "Landing pages and Starter websites are delivered in 5 to 7 business days. Standard websites take 10 to 14 days, while full e-commerce stores or custom SaaS web apps take 2 to 4 weeks depending on scope. We provide a milestone schedule on Day 1.",
    category: "Timeline",
  },
  {
    question: "How many revisions are included in the packages?",
    answer: "The Starter plan includes 3 full rounds of revisions. Our Standard and Pro plans include unlimited revisions during the design and staging phases until you are 100% delighted with the product.",
    category: "Process",
  },
  {
    question: "What are your payment terms and milestones?",
    answer: "We operate on transparent milestone billing: typically 40% upfront advance to initiate discovery & design, 30% upon staging demo approval, and the final 30% upon production deployment and domain handover. We accept Bank Transfer, UPI, Credit Cards, and International Wire.",
    category: "Billing",
  },
  {
    question: "What if I need custom mobile apps or complex SaaS software like ChaloJi or MITS Sadhana?",
    answer: "Our listed pricing covers high-performance websites and e-commerce setups. For custom Android & iOS mobile applications, ride-booking ecosystems, or full-stack platforms (similar to our ChaloJi, MITS Sadhana, and Cafewala builds), we conduct a quick 20-minute scope discovery and provide a tailored, transparent quote.",
    category: "Services",
  },
  {
    question: "Do you provide hosting, domain, and post-launch maintenance?",
    answer: "Yes! We configure your domain, SSL certificates, and cloud hosting on Vercel, AWS, or your preferred server. Every project comes with 15 to 60 days of free post-launch warranty and bug fixes. We also offer affordable monthly SLA maintenance plans.",
    category: "Support",
  },
  {
    question: "Will my website be fast and optimized for Google SEO?",
    answer: "Every single line of code we write is optimized for Google Core Web Vitals. We guarantee 90+ Lighthouse performance scores, semantic HTML5 structure, schema markup, Open Graph social share cards, and mobile responsiveness.",
    category: "Technical",
  },
];
