export interface Project {
  id: string;
  title: string;
  category: 'Mobile' | 'Web' | 'AI & Cloud' | 'Full-Stack';
  tagline: string;
  description: string;
  metrics: string;
  badge: string;
  featured: boolean;
  imageColor: string;
  gradientColors: [string, string];
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
  features: string[];
  architecture: string;
}

export interface Skill {
  name: string;
  category: 'Frontend' | 'Mobile' | 'Backend' | 'DevOps & Tools' | 'AI & Data';
  level: number; // 0 - 100
  experience: string;
  icon: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  location: string;
  type: 'Full-time' | 'Contract' | 'Remote';
  description: string;
  achievements: string[];
  technologies: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatarText: string;
  avatarColor: string;
  quote: string;
  rating: number;
}

export const PORTFOLIO_DATA = {
  profile: {
    name: 'Tayyab Frank',
    title: 'Full-Stack & Native Mobile Developer • AI Systems',
    headline: 'Engineering cross-platform mobile apps (React Native/Expo) & intelligent full-stack systems.',
    status: 'Available for high-impact projects & opportunities',
    isAvailable: true,
    location: 'NCAI • Open to Global Remote',
    experienceYears: '4+',
    shippedProjects: '24+',
    codeCommits: '3,200+',
    appDownloads: '120K+',
    bio: 'Specializing in React Native, Expo, TypeScript, and modern AI pipelines. With a strong foundation at the National Center of Artificial Intelligence (NCAI), I build ultra-smooth native mobile applications and intelligent web architectures that combine performance, elegant UX, and machine intelligence.',
    email: 'tayyabfrank@gmail.com',
    github: 'https://github.com/TayyabFrank',
    linkedin: 'https://linkedin.com/in/tayyabfrank',
    twitter: 'https://x.com/tayyabfrank',
    calendly: 'https://calendly.com/tayyabfrank',
  },

  skills: [
    { name: 'React Native & Expo', category: 'Mobile', level: 95, experience: '4 yrs', icon: 'smartphone' },
    { name: 'TypeScript & JavaScript', category: 'Frontend', level: 96, experience: '4 yrs', icon: 'code' },
    { name: 'React & Next.js', category: 'Frontend', level: 92, experience: '4 yrs', icon: 'globe' },
    { name: 'AI & Vision Model Integration', category: 'AI & Data', level: 88, experience: '3 yrs', icon: 'cpu' },
    { name: 'Python & FastAPI', category: 'Backend', level: 90, experience: '3 yrs', icon: 'server' },
    { name: 'Node.js & REST / GraphQL', category: 'Backend', level: 89, experience: '4 yrs', icon: 'share-2' },
    { name: 'Reanimated & Native Gestures', category: 'Mobile', level: 92, experience: '3 yrs', icon: 'activity' },
    { name: 'Tailwind CSS & Mobile Styling', category: 'Frontend', level: 94, experience: '4 yrs', icon: 'palette' },
    { name: 'PostgreSQL & Supabase / Firebase', category: 'Backend', level: 87, experience: '3 yrs', icon: 'database' },
    { name: 'PyTorch & Edge Inference', category: 'AI & Data', level: 82, experience: '2 yrs', icon: 'layers' },
    { name: 'Docker & Cloud Deployment', category: 'DevOps & Tools', level: 84, experience: '3 yrs', icon: 'box' },
    { name: 'Git & CI/CD Pipelines', category: 'DevOps & Tools', level: 90, experience: '4 yrs', icon: 'git-commit' },
  ] as Skill[],

  projects: [
    {
      id: 'ncai-vision',
      title: 'NCAI VisionEdge Mobile',
      category: 'AI & Cloud',
      tagline: 'On-device computer vision and real-time inference pipeline built with Expo & PyTorch Edge.',
      description: 'A cutting-edge mobile application developed in collaboration with NCAI research labs that runs local object classification, real-time image segmentation, and edge AI diagnostics on mobile hardware with zero cloud latency.',
      metrics: '45fps On-Device Inference • Sub-20ms Latency',
      badge: 'NCAI AI Lab • Flagship',
      featured: true,
      imageColor: '#6366F1',
      gradientColors: ['#6366F1', '#4338CA'],
      tags: ['React Native', 'Expo', 'PyTorch Mobile', 'FastAPI', 'TypeScript', 'Computer Vision'],
      liveUrl: 'https://github.com/TayyabFrank/ncai-visionedge',
      githubUrl: 'https://github.com/TayyabFrank/ncai-visionedge',
      features: [
        'Real-time edge model quantization running at 45fps on smartphone GPUs',
        'Camera frame processor with gesture-driven bounding box annotations',
        'Offline capability with local SQLite database for test history and metrics',
        'Secure telemetry sync with NCAI cloud clusters when network is available',
      ],
      architecture: 'Native C++ bridge for PyTorch Lite integration with React Native VisionCamera and Zustand state management.',
    },
    {
      id: 'paynative',
      title: 'PayNative Cross-Border Wallet',
      category: 'Mobile',
      tagline: 'FinTech multi-currency mobile payment wallet with biometric security.',
      description: 'A production-grade mobile finance application with bank-grade biometric authentication, instant QR transactions, real-time exchange rates, and interactive spending analytics.',
      metrics: '75K+ Downloads • 4.9★ Rating',
      badge: 'FinTech • Production',
      featured: true,
      imageColor: '#06B6D4',
      gradientColors: ['#06B6D4', '#2563EB'],
      tags: ['React Native', 'Expo', 'TypeScript', 'Reanimated', 'Biometrics', 'Node.js'],
      liveUrl: 'https://github.com/TayyabFrank/paynative-wallet',
      githubUrl: 'https://github.com/TayyabFrank/paynative-wallet',
      features: [
        'Biometric authentication with FaceID / TouchID hardware key store',
        'Interactive smooth financial charts with Reanimated gesture scrubbing',
        'QR code scanner and generator for instant merchant payments',
        'Full offline fallback with optimistic queue updates',
      ],
      architecture: 'Expo Router with TypeScript, Zustand for reactive store, Node.js GraphQL microservices, and PostgreSQL database.',
    },
    {
      id: 'neuropulse',
      title: 'NeuroPulse AI Copilot',
      category: 'AI & Cloud',
      tagline: 'Multimodal AI assistant with real-time speech processing and document reasoning.',
      description: 'An AI productivity workspace integrating LLM audio transcription, smart visual reasoning over technical diagrams, and document summarization.',
      metrics: '30K+ Active Users • 99.9% Uptime',
      badge: 'AI / LLM • Production',
      featured: true,
      imageColor: '#10B981',
      gradientColors: ['#10B981', '#047857'],
      tags: ['Next.js', 'FastAPI', 'OpenAI', 'WebSockets', 'TailwindCSS', 'Redis'],
      liveUrl: 'https://github.com/TayyabFrank/neuropulse-ai',
      githubUrl: 'https://github.com/TayyabFrank/neuropulse-ai',
      features: [
        'Streaming low-latency audio transcription via WebSockets',
        'Vector embeddings search pipeline indexing PDFs and codebases',
        'Interactive chat interface with code syntax highlighting and copy shortcuts',
        'Dark/Light theme support with responsive mobile and web views',
      ],
      architecture: 'FastAPI backend with LangChain, Redis vector cache, and a Next.js / Tailwind interactive web client.',
    },
    {
      id: 'omnisync',
      title: 'OmniSync Collaborative Kanban',
      category: 'Web',
      tagline: 'Real-time project workflow management for engineering and AI research teams.',
      description: 'High-speed Kanban and sprint planner featuring live multi-user collaboration, automated Git commit hooks, and drag-and-drop roadmap scheduling.',
      metrics: 'Sub-30ms sync • 15+ Active Teams',
      badge: 'SaaS • Full-Stack',
      featured: false,
      imageColor: '#F59E0B',
      gradientColors: ['#F59E0B', '#D97706'],
      tags: ['React', 'TypeScript', 'WebSockets', 'PostgreSQL', 'Tailwind', 'Docker'],
      liveUrl: 'https://github.com/TayyabFrank/omnisync-flow',
      githubUrl: 'https://github.com/TayyabFrank/omnisync-flow',
      features: [
        'Real-time multi-cursor collaboration with optimistic locking',
        'Deep bi-directional sync with GitHub issues and Pull Requests',
        'Gantt chart timelines and sprint velocity calculation dashboards',
        'Granular role-based permissions and team workspace management',
      ],
      architecture: 'Node.js clustered WebSocket engine with PostgreSQL and React client using TanStack Query.',
    },
    {
      id: 'fittrack',
      title: 'PulseFit Telemetry & Health Tracker',
      category: 'Mobile',
      tagline: 'Cross-platform health & biometric workout companion with Apple HealthKit & Google Fit.',
      description: 'Mobile fitness app tracking heart rate variability, workout routines, nutrition plans, and habit streaks with haptic feedback.',
      metrics: '45K Downloads • 4.8★ App Store',
      badge: 'Mobile Health',
      featured: false,
      imageColor: '#EC4899',
      gradientColors: ['#EC4899', '#BE185D'],
      tags: ['React Native', 'HealthKit', 'Google Fit', 'Reanimated', 'SQLite'],
      liveUrl: 'https://github.com/TayyabFrank/pulsefit-tracker',
      githubUrl: 'https://github.com/TayyabFrank/pulsefit-tracker',
      features: [
        'Biometric wearable synchronization for heart rate and steps',
        'Custom audio/haptic interval timer for workout circuits',
        '100% offline-first architecture with encrypted local SQLite',
        'Interactive streak badges and motivational milestone notifications',
      ],
      architecture: 'Native bridge integrations with HealthKit and Google Fit, SQLite offline database, and React Native UI.',
    },
    {
      id: 'nativekit',
      title: 'NativeKit Universal UI',
      category: 'Full-Stack',
      tagline: 'Accessible cross-platform UI component library for React and React Native.',
      description: 'Open-source design system empowering developers to build universal applications for Web, iOS, and Android with unified token architecture.',
      metrics: '1.4K GitHub Stars • 25K Downloads',
      badge: 'Open Source',
      featured: false,
      imageColor: '#8B5CF6',
      gradientColors: ['#8B5CF6', '#6D28D9'],
      tags: ['React Native', 'React', 'Design System', 'Accessibility', 'TypeScript'],
      liveUrl: 'https://github.com/TayyabFrank/nativekit-ui',
      githubUrl: 'https://github.com/TayyabFrank/nativekit-ui',
      features: [
        'Zero-dependency headless UI primitives compatible with web and mobile',
        'Theme token manager supporting custom color schemes and typography',
        'Comprehensive unit tests with Jest and React Native Testing Library',
        'Full interactive documentation with code examples and live preview',
      ],
      architecture: 'Turborepo monorepo with Metro and Rollup bundling pipelines.',
    },
  ] as Project[],

  experience: [
    {
      id: 'ncai',
      role: 'AI & Mobile Systems Engineer',
      company: 'National Center of Artificial Intelligence (NCAI)',
      period: '2023 - Present',
      location: 'Islamabad, PK / Hybrid',
      type: 'Full-time',
      description: 'Building mobile interfaces and scalable client applications for computer vision and intelligent AI models developed within the center.',
      achievements: [
        'Architected cross-platform React Native / Expo apps with edge AI capabilities, reducing inference latency by 45%.',
        'Built modern full-stack web dashboards connecting FastAPI microservices with real-time model telemetry.',
        'Collaborated with research scientists to deploy deep learning models onto iOS and Android edge devices.',
      ],
      technologies: ['React Native', 'Expo', 'Python', 'FastAPI', 'PyTorch Mobile', 'TypeScript'],
    },
    {
      id: 'techscale',
      role: 'Full-Stack & Mobile Developer',
      company: 'TechScale Innovations',
      period: '2021 - 2023',
      location: 'Remote',
      type: 'Full-time',
      description: 'Engineered performant cross-platform mobile apps and modern web platforms for international clients in FinTech and healthcare.',
      achievements: [
        'Shipped 6+ production mobile apps to the Apple App Store and Google Play Store with 99.8% crash-free rates.',
        'Implemented real-time WebSocket communications and optimistic UI updates for high-concurrency users.',
        'Optimized bundle size and render cycles, achieving smooth 60fps animations across low-end Android hardware.',
      ],
      technologies: ['React Native', 'React', 'Node.js', 'PostgreSQL', 'Tailwind', 'Docker'],
    },
    {
      id: 'studio',
      role: 'Frontend UI/UX Developer',
      company: 'Creative Studio',
      period: '2020 - 2021',
      location: 'Remote',
      type: 'Contract',
      description: 'Designed and implemented high-conversion web interfaces, responsive landing pages, and interactive component libraries.',
      achievements: [
        'Built 15+ custom web applications with pixel-perfect responsive layouts and micro-interactions.',
        'Achieved 95+ Google Lighthouse scores across performance, accessibility, and SEO on all client projects.',
      ],
      technologies: ['JavaScript', 'TypeScript', 'React', 'CSS3', 'REST APIs'],
    },
  ] as ExperienceItem[],

  testimonials: [
    {
      id: 't1',
      name: 'Dr. Zeeshan K.',
      role: 'Principal AI Researcher',
      company: 'NCAI Lab',
      avatarText: 'ZK',
      avatarColor: '#6366F1',
      quote: 'Tayyab has an exceptional ability to bridge high-level AI research with clean, consumer-ready mobile applications. His React Native and full-stack work is always structured, fast, and remarkably polished.',
      rating: 5,
    },
    {
      id: 't2',
      name: 'Haris Ahmad',
      role: 'Engineering Lead',
      company: 'TechScale Solutions',
      avatarText: 'HA',
      avatarColor: '#059669',
      quote: 'One of the most dependable developers I have worked with. Tayyab delivers cross-platform apps with top-tier UI fidelity and attention to detail. Any team would be lucky to have him.',
      rating: 5,
    },
    {
      id: 't3',
      name: 'Sofia Martinez',
      role: 'Product Director',
      company: 'Global FinTech',
      avatarText: 'SM',
      avatarColor: '#D97706',
      quote: 'The wallet UI and biometric flow Tayyab built exceeded our expectations. The animations are buttery smooth and our users constantly praise the intuitive design.',
      rating: 5,
    },
  ] as Testimonial[],

  services: [
    {
      title: 'Native Mobile Apps (iOS & Android)',
      desc: 'High-performance apps built with React Native & Expo. 60fps animations, biometric authentication, offline persistence, and seamless store deployment.',
      icon: 'smartphone',
      badge: 'Specialty',
    },
    {
      title: 'AI & Edge Model Integration',
      desc: 'Embedding computer vision, speech recognition, and LLM capabilities directly into mobile and web client workflows.',
      icon: 'zap',
      badge: 'NCAI Research',
    },
    {
      title: 'Full-Stack Web Platforms',
      desc: 'Scalable Next.js and React frontends backed by robust Python FastAPI or Node.js services with real-time WebSockets.',
      icon: 'monitor',
      badge: 'Production Ready',
    },
    {
      title: 'Design Systems & UI Engineering',
      desc: 'Modular, accessible UI component kits tailored for cross-platform consistency between mobile and desktop web.',
      icon: 'layers',
      badge: 'Clean Code',
    },
  ],
};
