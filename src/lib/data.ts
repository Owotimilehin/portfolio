export const personalInfo = {
  name: "Owoigbe Timilehin",
  initials: "OT",
  title: "Vibe Coder",
  subtitle: "Backend Engineer",
  location: "Lagos, Nigeria",
  email: "owotimilehin@gmail.com",
  phone: "+234 906 724 3320",
  bio: "Vibe Coder with deep backend hands-on experience. I ride the wave of AI-accelerated development while keeping my hands dirty in real production systems — Laravel APIs, payment integrations, SSO auth, queue-driven architectures. I don't just prompt and pray. I architect, I debug, I ship. The vibe is fast, the code is solid, the systems scale.",
  education: [
    {
      institution: "University of Lagos",
      degree: "B.Sc. Applied Physics (Electronics)",
      period: "2014 - 2018",
    },
    {
      institution: "Zyonel Academy, CITS UNILAG",
      degree: "Programming Certification (Backend)",
      period: "2020 - 2021",
    },
  ],
  experience: [
    {
      company: "Confidential",
      location: "Remote",
      role: "Remote Automation Engineer",
      period: "Mar 2026 - Present",
      highlights: [
        "Google Sheets automations and custom App Script workflows",
        "Workflow improvements and process optimization",
        "Administrative tooling and personal assistance systems",
      ],
    },
    {
      company: "Waystream",
      location: "Lagos, Nigeria",
      role: "Backend Vibe Coder",
      period: "2022 - Present",
      highlights: [
        "Scalable Laravel APIs using DTO-driven architecture and Prettus repository pattern",
        "Secure SSO authentication workflows across multiple platforms",
        "Stripe payments with custom flows including unregistered user handling",
        "RSS 2.0/iTunes feed ingestion pipelines with token-based verification",
        "Redis-backed asynchronous job processing for high-performance workflows",
        "Dockerized deployments on DigitalOcean with SSL configuration",
      ],
      projects: [
        {
          name: "Waypod — Podcast platform",
          links: {
            web: "https://app.waystream.io/",
            playStore: "https://play.google.com/store/apps/details?id=com.zyonel.waystream",
            appStore: "https://apps.apple.com/ng/app/waystream/id1624508440",
          },
        },
        {
          name: "Waystream Live — Streaming platform",
          links: {
            web: "https://app.waystream.io/",
            playStore: "https://play.google.com/store/apps/details?id=com.zyonel.waystream",
            appStore: "https://apps.apple.com/ng/app/waystream/id1624508440",
          },
        },
        {
          name: "Waystream SSO — Cross-platform auth",
          links: {
            web: "https://accounts.waystream.io/",
          },
        },
      ],
    },
  ],
  skills: [
    "Vibe Coding",
    "PHP & Laravel",
    "RESTful API Design",
    "PostgreSQL & MySQL",
    "Redis & Queue Systems",
    "Docker & DevOps",
    "TypeScript & Next.js",
    "Payment Integrations",
    "SSO & Authentication",
    "AI-Accelerated Dev",
    "System Architecture",
  ],
};

export interface ProjectFeature {
  icon: string;
  title: string;
  description: string;
}

export interface ProjectMetric {
  value: string;
  label: string;
}

export interface TechItem {
  name: string;
  category: string;
}

export interface Project {
  id: string;
  order: number;
  title: string;
  headline: string;
  subtitle: string;
  theme: "light" | "dark";
  accentColor: string;
  problems: string[];
  features: ProjectFeature[];
  techHighlights: string[];
  techStack: TechItem[];
  metrics: ProjectMetric[];
  architecturePoints: string[];
  liveUrl?: string;
  codeUrl?: string;
}

export const projects: Project[] = [
  {
    id: "compassio",
    order: 1,
    title: "Compassio Health Hub",
    headline: "Medical Case Review Platform",
    subtitle:
      "Enterprise-grade digital workflow system for structured medical evaluations with AI-powered insights, multi-channel notifications, and complete audit compliance.",
    theme: "light",
    accentColor: "#10B981",
    problems: [
      "Manual case review processes with no structured workflow",
      "No audit trail for compliance and accountability",
      "Inconsistent data across medical evaluations",
      "Poor visibility into reviewer performance and case status",
    ],
    features: [
      {
        icon: "Shield",
        title: "11-Stage Case Workflow",
        description:
          "From creation through first-level review, QA validation, client submission, and closure — every transition logged.",
      },
      {
        icon: "Users",
        title: "Multi-Role Authorization",
        description:
          "Super Admin, Admin, FLR, QA with 16 granular permissions. Dual-role support with session-based context switching.",
      },
      {
        icon: "Brain",
        title: "AI-Powered Insights",
        description:
          "8 AI provider fallback chain (Gemini, Groq, OpenAI, Cerebras) with circuit breaker pattern for resilient analytics.",
      },
      {
        icon: "Bell",
        title: "5-Channel Notifications",
        description:
          "Email, Telegram, WhatsApp, Google Chat, and SMS. Queue-driven, non-blocking delivery with complete logging.",
      },
      {
        icon: "FileText",
        title: "Invoice & Payslip Engine",
        description:
          "Automated billing with per-case rates, PDF generation, approval workflows, and bank payment tracking.",
      },
      {
        icon: "BarChart3",
        title: "Analytics & Reporting",
        description:
          "Role-specific dashboards, trend analysis, PDF/Excel export, and pre-aggregated data for performance.",
      },
    ],
    techHighlights: [
      "Service-oriented architecture with 38 business logic services",
      "Policy-based authorization with Spatie Permissions",
      "Queue-driven notification engine with delivery tracking",
      "Circuit breaker pattern for AI provider resilience",
      "Comprehensive audit trail on every case action",
    ],
    techStack: [
      { name: "Laravel 12", category: "Backend" },
      { name: "PostgreSQL 16", category: "Database" },
      { name: "Blade + Alpine.js", category: "Frontend" },
      { name: "Tailwind CSS", category: "Styling" },
      { name: "AWS S3", category: "Storage" },
      { name: "Docker", category: "Infrastructure" },
      { name: "DomPDF", category: "Documents" },
      { name: "Brevo SMTP", category: "Email" },
    ],
    metrics: [
      { value: "47", label: "Controllers" },
      { value: "38", label: "Services" },
      { value: "290+", label: "Routes" },
      { value: "11", label: "Case Stages" },
    ],
    architecturePoints: [
      "Thin controllers, fat services — business logic fully abstracted",
      "Type-safe enums — no magic strings for status or type fields",
      "Event-driven architecture with listeners for side effects",
      "Database queue driver for reliable background processing",
    ],
    liveUrl: undefined,
    codeUrl: undefined,
  },
  {
    id: "runacos",
    order: 2,
    title: "RUNACOS Portal",
    headline: "Digital Membership & Dues Management",
    subtitle:
      "Full-stack membership portal with automated dues collection, content management, fault reporting, and alumni directory for a university computer science association.",
    theme: "dark",
    accentColor: "#3B82F6",
    problems: [
      "No centralized system for member registration and tracking",
      "Manual dues collection with no payment verification",
      "Disconnected communication channels across members",
      "No structured fault reporting or issue resolution tracking",
    ],
    features: [
      {
        icon: "CreditCard",
        title: "Paystack Payment Integration",
        description:
          "Per-session dues with HMAC-SHA512 webhook verification, automatic status updates, and downloadable receipts.",
      },
      {
        icon: "IdCard",
        title: "Smart Member ID System",
        description:
          "Auto-generated IDs (RUN-CS-YYYY-XXXX), downloadable membership cards via html2canvas, and alumni auto-detection.",
      },
      {
        icon: "Newspaper",
        title: "Content Management",
        description:
          "News, events, and articles with TipTap rich text editor, draft-to-published workflows, and auto-email notifications.",
      },
      {
        icon: "AlertTriangle",
        title: "Fault Reporting (FRMS)",
        description:
          "Structured issue submissions with unique reference IDs, staff assignment, status tracking, and full audit trails.",
      },
      {
        icon: "GraduationCap",
        title: "Alumni Directory",
        description:
          "Automatic alumni detection based on admission year, searchable directory, and former executive badges.",
      },
      {
        icon: "Settings",
        title: "Admin Dashboard",
        description:
          "Complete CMS with 42 API endpoints, member management, payment verification, and configurable site settings.",
      },
    ],
    techHighlights: [
      "Zod validation at API layer as single source of truth",
      "SWR for client-side caching with real-time data freshness",
      "Dual email strategy: Resend (transactional) + Brevo (bulk, batched 50/send)",
      "JWT-based auth with NextAuth v5 and role-based middleware protection",
      "File storage abstraction (local/S3) via environment toggle",
    ],
    techStack: [
      { name: "Next.js 14", category: "Framework" },
      { name: "TypeScript", category: "Language" },
      { name: "Prisma + MySQL", category: "Database" },
      { name: "NextAuth v5", category: "Auth" },
      { name: "Paystack", category: "Payments" },
      { name: "Tailwind CSS", category: "Styling" },
      { name: "Framer Motion", category: "Animation" },
      { name: "Vercel Blob", category: "Storage" },
    ],
    metrics: [
      { value: "18", label: "Database Models" },
      { value: "42", label: "API Endpoints" },
      { value: "3-Step", label: "Registration Flow" },
      { value: "11", label: "Editable Pages" },
    ],
    architecturePoints: [
      "Monolithic full-stack — optimal for team size and feature scope",
      "CSR with SWR for dynamic content and real-time updates",
      "Composite validation: Client hints → Zod API → Prisma constraints",
      "Payment webhook with signature verification for tamper-proof transactions",
    ],
    liveUrl: undefined,
    codeUrl: undefined,
  },
  {
    id: "n9ja",
    order: 3,
    title: "N9JA Wholesale",
    headline: "Luxury Wholesale Furniture Platform",
    subtitle:
      "Premium B2B/B2C e-commerce with dual pricing engines, custom furniture ordering, interior design consultations, and a dark-themed luxury brand experience.",
    theme: "light",
    accentColor: "#C5A253",
    problems: [
      "No unified platform for both retail and wholesale customers",
      "Manual pricing management across different buyer tiers",
      "No digital channel for custom furniture commissions",
      "Fragmented order tracking and inventory management",
    ],
    features: [
      {
        icon: "DollarSign",
        title: "Dual Pricing Engine",
        description:
          "Dynamic retail vs. wholesale pricing with quantity-based tier discounts (5-15%) that stack on wholesale base prices.",
      },
      {
        icon: "Palette",
        title: "Custom Furniture Module",
        description:
          "Multi-step commission form with file uploads, quote generation, deposit/final payment workflow, and production tracking.",
      },
      {
        icon: "ShoppingBag",
        title: "Full Commerce Engine",
        description:
          "Cart, multi-step checkout, address management, standard/white-glove delivery options, and coupon system.",
      },
      {
        icon: "Building",
        title: "Wholesale Application System",
        description:
          "Business verification workflow with document upload, admin approval queue, and automatic role elevation.",
      },
      {
        icon: "Sparkles",
        title: "Interior Design Consultations",
        description:
          "Booking system with free virtual and paid session types, room image uploads, and calendar scheduling.",
      },
      {
        icon: "BarChart3",
        title: "Admin Dashboard & Analytics",
        description:
          "Revenue analytics, inventory management, order pipeline, customer management, and CSV report exports.",
      },
    ],
    techHighlights: [
      "Separated frontend (Next.js) and backend (Laravel) for independent scaling",
      "Zustand for lightweight client state + React Query for server state",
      "Dual payment gateways: Paystack + Flutterwave with webhook verification",
      "Meilisearch integration for fast full-text product search",
      "360-degree product viewer with sequential image rendering",
    ],
    techStack: [
      { name: "Laravel 11", category: "Backend" },
      { name: "Next.js + React", category: "Frontend" },
      { name: "MySQL / PostgreSQL", category: "Database" },
      { name: "Redis", category: "Cache & Queues" },
      { name: "Meilisearch", category: "Search" },
      { name: "Paystack + Flutterwave", category: "Payments" },
      { name: "GSAP + Framer Motion", category: "Animation" },
      { name: "AWS S3", category: "Storage" },
    ],
    metrics: [
      { value: "37", label: "Database Models" },
      { value: "100+", label: "API Endpoints" },
      { value: "4-Tier", label: "Pricing Engine" },
      { value: "8-Stage", label: "Custom Order Flow" },
    ],
    architecturePoints: [
      "Decoupled API-first architecture — backend serves frontend via REST",
      "Token-based auth via Laravel Sanctum for SPA and mobile readiness",
      "PCI-DSS compliant — zero raw card data storage",
      "Phase 2-ready schema with nullable vendor_id for marketplace expansion",
    ],
    liveUrl: undefined,
    codeUrl: undefined,
  },
  {
    id: "zyonel",
    order: 4,
    title: "Zyonel Academy",
    headline: "Online Learning Platform",
    subtitle:
      "Full-featured learning management system with course delivery, progress tracking, and interactive content designed to train the next generation of developers.",
    theme: "dark",
    accentColor: "#8B5CF6",
    problems: [
      "Limited access to structured backend engineering education in Nigeria",
      "No platform combining curriculum, progress tracking, and certification",
      "Traditional learning lacking hands-on project-based approach",
      "No community or mentorship channel for learners",
    ],
    features: [
      {
        icon: "BookOpen",
        title: "Course Management",
        description:
          "Structured curriculum with modules, lessons, and assessments for progressive skill development.",
      },
      {
        icon: "Play",
        title: "Interactive Content Delivery",
        description:
          "Video lessons, code exercises, and project-based assignments with real-world backend scenarios.",
      },
      {
        icon: "Award",
        title: "Progress & Certification",
        description:
          "Track learner progress, module completion, and generate certificates upon course completion.",
      },
      {
        icon: "Users",
        title: "Student Management",
        description:
          "Enrollment workflows, cohort management, and admin dashboard for tracking platform-wide metrics.",
      },
      {
        icon: "MessageSquare",
        title: "Community Features",
        description:
          "Discussion forums, Q&A sections, and direct messaging between students and instructors.",
      },
      {
        icon: "CreditCard",
        title: "Payment Integration",
        description:
          "Course enrollment with payment processing, subscription management, and access control.",
      },
    ],
    techHighlights: [
      "Server-side rendered pages for SEO and fast initial loads",
      "Content versioning for curriculum updates without disrupting enrolled students",
      "Role-based access: Admin, Instructor, Student with permission layers",
      "Responsive design optimized for mobile learning",
      "API-driven architecture for future mobile app integration",
    ],
    techStack: [
      { name: "Laravel", category: "Backend" },
      { name: "PHP 8.2+", category: "Language" },
      { name: "MySQL", category: "Database" },
      { name: "Blade Templates", category: "Frontend" },
      { name: "Tailwind CSS", category: "Styling" },
      { name: "Alpine.js", category: "Interactivity" },
      { name: "Paystack", category: "Payments" },
      { name: "DigitalOcean", category: "Hosting" },
    ],
    metrics: [
      { value: "LMS", label: "Platform Type" },
      { value: "100+", label: "Students Trained" },
      { value: "Backend", label: "Focus Area" },
      { value: "Full", label: "Certification Path" },
    ],
    architecturePoints: [
      "MVC architecture with clean separation of concerns",
      "Middleware-based access control for course content protection",
      "Queued emails for enrollment confirmations and notifications",
      "Optimized database queries with eager loading for course content",
    ],
    liveUrl: "https://academy.zyonel.com",
    codeUrl: undefined,
  },
];

export const techCategories = [
  {
    category: "Backend",
    items: ["PHP 8.2+", "Laravel 11/12", "RESTful APIs", "Repository Pattern"],
  },
  {
    category: "Frontend",
    items: ["TypeScript", "Next.js", "React", "Alpine.js"],
  },
  {
    category: "Database",
    items: ["PostgreSQL", "MySQL", "Prisma ORM", "Redis"],
  },
  {
    category: "Infrastructure",
    items: ["Docker", "DigitalOcean", "AWS S3", "Nginx"],
  },
  {
    category: "Payments",
    items: ["Stripe", "Paystack", "Flutterwave", "Webhook Verification"],
  },
  {
    category: "Architecture",
    items: ["Service Layer", "DTO Pattern", "Event-Driven", "Queue Systems"],
  },
];

export interface Skill {
  name: string;
  description: string;
  icon: string;
  level: number; // 0-100
}

export interface SkillCategory {
  category: string;
  color: string;
  skills: Skill[];
}

export const skillCategories: SkillCategory[] = [
  {
    category: "Vibe Coding & AI",
    color: "#8B5CF6",
    skills: [
      { name: "Vibe Coding", description: "AI-accelerated full-cycle development — from architecture to deployment, shipping production code at 10x speed.", icon: "Sparkles", level: 95 },
      { name: "AI-Assisted Automation", description: "Strategic use of ChatGPT, Claude, and Copilot for code generation, refactoring, debugging, and architecture design.", icon: "Brain", level: 90 },
      { name: "Prompt Engineering", description: "Crafting precise prompts for code generation while critically evaluating AI outputs to prevent over-engineering.", icon: "MessageSquare", level: 90 },
    ],
  },
  {
    category: "Backend Engineering",
    color: "#2563EB",
    skills: [
      { name: "PHP & Laravel", description: "Laravel 11/12, Eloquent ORM, service containers, middleware, Blade, Artisan — the full ecosystem.", icon: "Code2", level: 95 },
      { name: "RESTful API Design", description: "Resource-based endpoints, proper HTTP semantics, versioning, pagination, rate limiting, and comprehensive documentation.", icon: "Globe", level: 95 },
      { name: "SSO & Authentication", description: "Laravel Sanctum, NextAuth v5, JWT tokens, OAuth2 flows, and cross-platform single sign-on implementations.", icon: "Shield", level: 90 },
      { name: "Payment Integrations", description: "Stripe, Paystack, Flutterwave with webhook verification (HMAC-SHA512), custom flows for unregistered users.", icon: "CreditCard", level: 90 },
      { name: "Queue & Job Processing", description: "Redis-backed async job processing, database queues, failed job handling, and high-performance background workflows.", icon: "Zap", level: 85 },
    ],
  },
  {
    category: "Frontend & Scripting",
    color: "#10B981",
    skills: [
      { name: "HTML, CSS, JavaScript", description: "Semantic markup, responsive layouts, modern CSS, vanilla JS, and DOM manipulation fundamentals.", icon: "FileCode", level: 85 },
      { name: "TypeScript & Next.js", description: "Type-safe React with App Router, SSR/SSG, API routes, server components, and Prisma integration.", icon: "Monitor", level: 80 },
      { name: "Excel, Google Sheets & App Script", description: "Advanced spreadsheet automation, custom functions, data pipelines, and Google Workspace integrations.", icon: "Table", level: 85 },
    ],
  },
  {
    category: "Data & Architecture",
    color: "#C5A253",
    skills: [
      { name: "PostgreSQL & MySQL", description: "Schema design, indexing strategies, query optimization, migrations, and database-level constraints.", icon: "Database", level: 90 },
      { name: "Data Cleaning & Normalization", description: "ETL pipelines, validation rules, data transformation, CSV/JSON parsing, and integrity enforcement.", icon: "Filter", level: 85 },
      { name: "JSON & CSV Formatting", description: "API response structuring, data export pipelines, feed parsing (RSS 2.0/iTunes), and format transformations.", icon: "FileText", level: 90 },
      { name: "DTO-Driven Architecture", description: "Prettus repository pattern, thin controllers, fat services, type-safe enums, and event-driven design.", icon: "Layers", level: 90 },
    ],
  },
  {
    category: "DevOps & Infrastructure",
    color: "#EF4444",
    skills: [
      { name: "Docker", description: "Containerized development and production environments, multi-stage builds, and docker-compose orchestration.", icon: "Container", level: 80 },
      { name: "DigitalOcean & AWS", description: "Droplet provisioning, S3 storage, SSL configuration, environment optimization, and deployment automation.", icon: "Cloud", level: 80 },
      { name: "Redis", description: "Caching layer, session management, queue backend, and pub/sub for real-time features.", icon: "Cpu", level: 85 },
    ],
  },
];
