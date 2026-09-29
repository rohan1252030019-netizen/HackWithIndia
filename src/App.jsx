import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView, useReducedMotion } from 'framer-motion';
import {
  Menu, X, ChevronDown, ArrowRight, Trophy, Users, Code2, Mail, Calendar,
  Check, Rocket, Briefcase, GraduationCap, Building2, CheckCircle2, Layers,
  Compass, GitPullRequest, TerminalSquare, ExternalLink, ChevronRight,
  Network, Globe, BookOpen, Quote
} from 'lucide-react';

/* ─────────────────────────────────────────────────────────────
   ANIMATED LIVE COUNTER HOOK (ACCESSIBILITY & REDUCED MOTION SAFE)
───────────────────────────────────────────────────────────── */
function Counter({ target, suffix = '', duration = 1.6 }) {
  const shouldReduceMotion = useReducedMotion();
  const end = parseInt(target.replace(/[^0-9]/g, ''), 10) || 0;
  const [count, setCount] = useState(shouldReduceMotion ? end : 0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });

  useEffect(() => {
    if (shouldReduceMotion) {
      setCount(end);
      return;
    }
    if (!isInView || end === 0) return;

    let start = 0;
    const increment = Math.ceil(end / 40);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 30);

    return () => clearInterval(timer);
  }, [isInView, end, shouldReduceMotion]);

  return (
    <span ref={ref} className="tabular-nums font-display">
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

/* ─────────────────────────────────────────────────────────────
   PROPOSAL DATA & REFINED STRUCTURE
───────────────────────────────────────────────────────────── */

const HERO_STATS = [
  { rawVal: '50000', suffix: '+', label: 'Pan-India Builders', tag: 'COMMUNITY' },
  { rawVal: '50', suffix: '+', label: 'Campus Chapters', tag: 'NETWORK' },
  { rawVal: '15', suffix: '+', label: 'Industry Partners', tag: 'ECOSYSTEM' },
  { rawVal: '10', suffix: 'L+', label: '₹ Annual Hack Bounties', tag: 'GRANTS' },
];

const CORE_OBJECTIVES = [
  {
    featured: true,
    tag: 'CORE FOCUS',
    icon: <Code2 size={26} className="text-[#ff003c]" />,
    title: 'Hands-On Technical Mastery',
    desc: 'Moving beyond theoretical classroom coursework into deep systems architecture, generative AI workflows, scalable backend engineering, and decentralized protocols with industry-standard tooling.',
    points: ['Live production deployments', 'Modern microservices & cloud architectures', 'GPU cluster access & AI inference']
  },
  {
    featured: true,
    tag: 'COMPETITION',
    icon: <Trophy size={26} className="text-[#ff003c]" />,
    title: 'National Hackathon Excellence',
    desc: 'Structured preparation pipeline designed to take student teams from early ideation to top podium finishes at national and global building competitions.',
    points: ['Curated team formation matchmaking', 'Pitch deck & architecture reviews', 'Direct mentorship from past champions']
  },
  {
    featured: false,
    tag: 'ECOSYSTEM',
    icon: <Rocket size={22} className="text-[#ff003c]" />,
    title: 'Product & MVP Incubation',
    desc: 'Guiding student projects from prototype stage into validated open-source tools, commercial MVPs, and venture grants.'
  },
  {
    featured: false,
    tag: 'COMMUNITY',
    icon: <Users size={22} className="text-[#ff003c]" />,
    title: 'Student Leadership & Governance',
    desc: 'Fostering cross-disciplinary collaboration where developers, designers, and organizers lead campus-wide initiatives.'
  },
  {
    featured: false,
    tag: 'CAREERS',
    icon: <Briefcase size={22} className="text-[#ff003c]" />,
    title: 'Direct Industry Linkages',
    desc: 'Exclusive recruitment pipelines, mock technical rounds, and resume referrals with top partner tech companies.'
  },
  {
    featured: false,
    tag: 'OPEN SOURCE',
    icon: <GitPullRequest size={22} className="text-[#ff003c]" />,
    title: 'Global Open-Source Culture',
    desc: 'Dedicated contribution sprints helping students ship reviewed pull requests to high-impact worldwide open repositories.'
  },
];

const ECOSYSTEM_MOSAIC = [
  {
    span: 'col-span-1 md:col-span-2 lg:col-span-2',
    type: 'FLAGSHIP',
    tag: 'ANNUAL SPRINT',
    title: '48-Hour National Hackathons',
    desc: 'Signature multi-track hackathons bringing 1,000+ top hackers to build non-stop prototypes across AI, Web3, FinTech, and CleanTech with institutional jury evaluation and ₹10L+ in cash rewards.',
    meta: 'OCTOBER 2026 · IN-PERSON & HYBRID'
  },
  {
    span: 'col-span-1 md:col-span-1 lg:col-span-1',
    type: 'LEARNING',
    tag: 'SKILL ACCELERATOR',
    title: 'Deep-Dive Masterclasses & Bootcamps',
    desc: 'Intensive code-along weekend bootcamps on Autonomous Agents, Next.js, Smart Contracts, Rust, and Cloud Infrastructure.',
    meta: 'MONTHLY COHORTS'
  },
  {
    span: 'col-span-1 md:col-span-1 lg:col-span-1',
    type: 'ACCESS',
    tag: '1-ON-1 SESSIONS',
    title: 'Industry Architect Office Hours',
    desc: 'Book private 30-minute review sessions with senior engineers from Microsoft, GitHub, and Postman to audit code and design.',
    meta: 'BI-WEEKLY SLOTS'
  },
  {
    span: 'col-span-1 md:col-span-1 lg:col-span-1',
    type: 'BOUNTIES',
    tag: 'REAL CHALLENGES',
    title: 'Enterprise Problem Bounties',
    desc: 'Solve technical problem statements submitted directly by partner companies for direct cash grants and fast-track interviews.',
    meta: 'ROLLING CYCLES'
  },
  {
    span: 'col-span-1 md:col-span-2 lg:col-span-1',
    type: 'COMMUNITY',
    tag: 'PAN-INDIA',
    title: 'Cross-Campus Chapter Sprints',
    desc: 'Collaborate and compete with 50+ official HWI student chapters across IITs, NITs, and premier state universities in India.',
    meta: '50+ AFFILIATED HUBS'
  }
];

const ROADMAP_TIMELINE = [
  {
    quarter: 'Q1',
    term: 'AUG – OCT 2026',
    phase: 'Chapter Inception & Orientation',
    items: [
      'Official Chapter Onboarding & Committee Formation at VIT Pune',
      'Campus-wide Launch Keynote & Introductory Open-Source Workshop',
      'Intra-College Hackathon Preparation Bootcamp',
      'Registration drive for the Signature National Hackathon 2026'
    ]
  },
  {
    quarter: 'Q2',
    term: 'NOV – DEC 2026',
    phase: 'AI Systems & Cloud Masterclasses',
    items: [
      'Hands-on Masterclass: Autonomous Multi-Agent Workflows & Fine-Tuning',
      'Cloud Architecture & Microservices Deployment with Azure & Docker',
      'Bi-Weekly Algorithmic Sprint & Competitive Coding Contest',
      'Industry Mentorship Office Hours for Semester Projects'
    ]
  },
  {
    quarter: 'Q3',
    term: 'JAN – FEB 2027',
    phase: 'Web3, Security & Open-Source Month',
    items: [
      'Decentralized Protocols, Smart Contract Auditing & ZK-Proofs Series',
      'Annual Open-Source Contribution Sprint with Verified GitHub Badges',
      'Career Guidance & Technical Resume Review with Partner Tech Leads',
      'Internal Demo Day & Prototype Showcase with Cash Bounties'
    ]
  },
  {
    quarter: 'Q4',
    term: 'MAR – APR 2027',
    phase: 'Flagship Annual Hackathon & Awards',
    items: [
      'HackWithIndia VIT National Hackathon 2027 (48-Hour Signature Event)',
      'Enterprise Partner Bounty Judgement & Direct Internship Rollout',
      'Annual Innovation Awards & Committee Handover Ceremony',
      'Publication of Annual Chapter Impact Report'
    ]
  }
];

/* Row 1 Partners (Scrolling Left) with rich, explicit value propositions */
const PARTNERS_ROW_1 = [
  { name: 'Microsoft', category: 'CLOUD & AI', offer: 'Azure credits, Founders Hub access & AI mentorship' },
  { name: 'GitHub', category: 'DEV TOOLS', offer: 'Student Dev Pack & verified open-source sprint badges' },
  { name: 'Postman', category: 'API ECOSYSTEM', offer: 'API design challenge bounties & student certification' },
  { name: 'Polygon', category: 'WEB3 PROTOCOL', offer: 'Web3 protocol bounty tracks & dApp developer grants' },
  { name: 'Solana', category: 'HIGH-SPEED CHAIN', offer: 'Rust smart contract hackathon bounties & prize pool' },
  { name: 'Filecoin', category: 'STORAGE', offer: 'Decentralized IPFS developer storage credits' },
  { name: 'Aptos', category: 'MOVE PROTOCOL', offer: 'Move smart contract workshops & hack tracks' },
  { name: 'GeeksforGeeks', category: 'CODING PREP', offer: 'DSA test suite & technical interview prep pass' },
];

/* Row 2 Partners (Scrolling Right) with rich, explicit value propositions */
const PARTNERS_ROW_2 = [
  { name: 'Microsoft Azure', category: 'CLOUD INFRA', offer: '$10,000 cloud compute & OpenAI inference credits' },
  { name: 'Physics Wallah', category: 'EDTECH LABS', offer: 'EdTech scale problem statements & technical fellowship' },
  { name: 'Unstop', category: 'COMPETITIONS', offer: 'National hackathon arena & student leaderboard hosting' },
  { name: 'HP', category: 'HARDWARE', offer: 'Workstation hardware support & IoT maker track prizes' },
  { name: 'Logitech', category: 'DEV GEAR', offer: 'Ergonomic developer setups & hardware hack prizes' },
  { name: 'Ola Electric', category: 'EV / EMBEDDED', offer: 'Autonomous mobility & embedded telemetry challenge' },
  { name: 'Red Bull', category: 'ENERGY PARTNER', offer: 'Official hackathon energy sponsor & 48h midnight fuel' },
  { name: 'Devnovate', category: 'INCUBATOR', offer: 'Early-stage prototype incubator & seed capital intro' },
];

const FAQS = [
  {
    q: 'What is the HackWithIndia (HWI) VIT Pune Student Chapter?',
    a: 'It is the official faculty-supported, student-led technical innovation community at Vishwakarma Institute of Technology, Pune. Unlike an isolated annual event, HWI operates as a year-round ecosystem connecting VIT Pune students directly to national hackathons, workshops, industry mentors, and partner engineering labs.'
  },
  {
    q: 'Who is eligible to participate and join?',
    a: 'All enrolled students of VIT Pune across all years (First Year through Final Year) and from all branches (Computer Engineering, IT, AI&DS, Electronics, Mechanical, Chemical, Instrumentation, etc.) are welcome. Cross-disciplinary collaboration is core to our mission.'
  },
  {
    q: 'Are there any registration or membership fees?',
    a: 'No. Membership in the HWI VIT Pune Student Chapter is 100% free. All regular technical workshops, mentorship office hours, coding sprints, and community mixers are organized with zero cost to students.'
  },
  {
    q: 'How does the chapter help students win national hackathons?',
    a: 'We run dedicated preparation tracks: team-formation matchmaking to pair developers with designers and domain leads, technical architecture reviews before submissions, and 1-on-1 pitch practice with past national champions.'
  },
  {
    q: 'What leadership and committee roles can students apply for?',
    a: 'Students can apply for roles including Technical Lead, Event Operations Lead, Open-Source Lead, PR & Outreach Coordinator, UI/UX Design Lead, and Domain Mentors under the guidance of Faculty Advisors.'
  },
  {
    q: 'How does this help with campus placements and internships?',
    a: 'Through verified partnerships with companies like Microsoft, GitHub, Postman, and Polygon, active builders get direct access to sponsor challenge bounties, referrals from mentors, and hands-on production code for their technical portfolios.'
  }
];

/* ─────────────────────────────────────────────────────────────
   HERO LETTER-BY-LETTER CASCADE COMPONENT (REDUCED-MOTION SAFE)
───────────────────────────────────────────────────────────── */
function HeroLetterCascade() {
  const shouldReduceMotion = useReducedMotion();

  const words = [
    { text: 'HACK', letters: ['H', 'A', 'C', 'K'] },
    { text: 'WITH', letters: ['W', 'I', 'T', 'H'] },
    { text: 'INDIA', letters: ['I', 'N', 'D', 'I', 'A'] },
  ];

  if (shouldReduceMotion) {
    return (
      <div className="select-none inline-block">
        <div className="flex flex-wrap items-center justify-center gap-x-3.5 sm:gap-x-7 font-extrabold text-5xl sm:text-7xl md:text-8xl tracking-tight font-display text-white drop-shadow-[0_0_35px_rgba(255,0,60,0.3)]">
          <span>HACK</span>
          <span>WITH</span>
          <span>INDIA</span>
        </div>
      </div>
    );
  }

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.065, delayChildren: 0.1 },
    },
  };

  const letter = {
    hidden: { opacity: 0, y: 36, scale: 0.45, filter: 'blur(8px)', color: '#ff003c' },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: 'blur(0px)',
      color: '#ffffff',
      transition: { type: 'spring', damping: 14, stiffness: 180 },
    },
  };

  return (
    <div className="select-none inline-block">
      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="flex flex-wrap items-center justify-center gap-x-3.5 sm:gap-x-7"
      >
        {words.map((w, wIdx) => (
          <div key={wIdx} className="inline-flex">
            {w.letters.map((char, lIdx) => (
              <motion.span
                key={lIdx}
                variants={letter}
                whileHover={{
                  scale: 1.15,
                  y: -6,
                  color: '#ff003c',
                  textShadow: '0 0 25px rgba(255,0,60,0.9)',
                  transition: { duration: 0.12 },
                }}
                className="font-extrabold text-5xl sm:text-7xl md:text-8xl tracking-tight font-display inline-block drop-shadow-[0_0_35px_rgba(255,0,60,0.3)] cursor-default"
              >
                {char}
              </motion.span>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   1. STICKY GLASS NAVBAR
───────────────────────────────────────────────────────────── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' });
    setMobileOpen(false);
  };

  const navItems = [
    { label: 'Overview', id: 'overview' },
    { label: 'Objectives', id: 'objectives' },
    { label: 'Ecosystem', id: 'ecosystem' },
    { label: 'Benefits', id: 'benefits' },
    { label: 'Roadmap', id: 'roadmap' },
    { label: 'Partners', id: 'partners' },
    { label: 'Team', id: 'team' },
    { label: 'FAQ', id: 'faq' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass-header py-3' : 'bg-transparent py-4 border-b border-white/[0.06]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between">
        {/* Brand Logo & Title */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-3 text-left group focus-visible:outline-none"
        >
          <div className="relative flex-shrink-0 flex items-center justify-center">
            <img
              src="/hwi-vit-logo.png"
              alt="HackWithIndia VIT Logo"
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-full object-contain drop-shadow-[0_0_12px_rgba(255,0,60,0.55)] group-hover:scale-105 transition-transform duration-200"
            />
          </div>

          <div>
            <div className="font-extrabold text-sm sm:text-base tracking-tight text-white flex items-center gap-2 font-display">
              <span>HACK WITH INDIA</span>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-[#ff003c]/20 text-[#ff4d6d] border border-[#ff003c]/40">
                VIT PUNE
              </span>
            </div>
            <div className="text-[11px] text-zinc-300 font-mono tracking-tight flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ff003c]" />
              <span>Student Chapter</span>
            </div>
          </div>
        </button>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-6">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className="text-xs font-medium text-zinc-200 hover:text-white transition-colors tracking-wide focus-visible:outline-none"
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Header Action CTA */}
        <div className="flex items-center gap-3">
          <a
            href="https://devnovate.co/"
            target="_blank"
            rel="noreferrer"
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-lg btn-crimson text-xs font-bold tracking-wide active:scale-95 focus-visible:outline-none"
          >
            <span>Register Now</span>
            <ExternalLink size={13} />
          </a>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 text-zinc-200 hover:text-white transition-colors focus-visible:outline-none"
            aria-label="Toggle Navigation"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden border-b border-white/10 bg-[#09090d]/98 backdrop-blur-2xl px-6 py-5 shadow-2xl"
          >
            <div className="flex flex-col gap-2.5">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className="text-left text-sm font-medium text-zinc-200 hover:text-white py-2 border-b border-white/[0.05] transition-colors focus-visible:outline-none"
                >
                  {item.label}
                </button>
              ))}
              <a
                href="https://devnovate.co/"
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-flex items-center justify-center gap-2 w-full py-2.5 rounded-lg btn-crimson text-xs font-bold focus-visible:outline-none"
              >
                Register for Hackathon
                <ExternalLink size={14} />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

/* ─────────────────────────────────────────────────────────────
   2. HERO SECTION
───────────────────────────────────────────────────────────── */
function Hero() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative min-h-[92vh] flex flex-col justify-center items-center pt-32 pb-16 px-4 sm:px-6 overflow-hidden bg-builder-grid">
      {/* Deep Ambient Atmospheric Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] bg-[#ff003c]/12 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/3 left-1/4 w-[400px] h-[300px] bg-[#660018]/20 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto text-center z-10 w-full">
        {/* Terminal Command Status Pill */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/10 bg-[#0d0d14]/80 text-zinc-200 text-xs font-mono mb-8 backdrop-blur-md"
        >
          <span className="w-2 h-2 rounded-full bg-[#ff003c] animate-ping" />
          <span className="text-[#ff4d6d] font-bold">git checkout</span>
          <span className="text-zinc-300">vit-pune-chapter</span>
          <span className="text-zinc-500">·</span>
          <span className="text-zinc-300">Vishwakarma Institute of Technology</span>
        </motion.div>

        {/* Signature Cascading Title */}
        <div className="mb-4">
          <HeroLetterCascade />
        </div>

        {/* Chapter Sub-title with Monospace Tag */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: shouldReduceMotion ? 0 : 0.9 }}
          className="mb-6"
        >
          <div className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white font-display">
            VIT Pune Student Chapter
          </div>
          <div className="text-xs sm:text-sm font-mono text-zinc-300 mt-1">
            Faculty-Supported · Student-Led · Year-Round Innovation Ecosystem
          </div>
        </motion.div>

        {/* Purpose Statement */}
        <motion.p
          initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: shouldReduceMotion ? 0 : 1.05 }}
          className="text-sm sm:text-lg text-zinc-200 max-w-2xl mx-auto mb-10 leading-relaxed font-normal px-2"
        >
          Transforming learners into builders through national hackathons, production workshops, open-source sprints, and direct 1-on-1 industry mentorship.
        </motion.p>

        {/* Primary Action Row */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: shouldReduceMotion ? 0 : 1.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mb-16 px-4"
        >
          <a
            href="https://devnovate.co/"
            target="_blank"
            rel="noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-lg btn-crimson text-sm font-bold shadow-xl active:scale-95 focus-visible:outline-none"
          >
            <span>Register for Hackathon</span>
            <ArrowRight size={16} />
          </a>
          <button
            onClick={() => document.getElementById('roadmap')?.scrollIntoView({ behavior: 'smooth' })}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-lg btn-secondary text-sm font-semibold transition-all focus-visible:outline-none"
          >
            <Calendar size={16} className="text-[#ff4d6d]" />
            <span>Explore 2026–27 Roadmap</span>
          </button>
        </motion.div>

        {/* Animated Counting Metric Strip */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: shouldReduceMotion ? 0 : 1.35 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-3.5 max-w-4xl mx-auto pt-6 border-t border-white/[0.08]"
        >
          {HERO_STATS.map((stat) => (
            <div key={stat.label} className="p-3.5 sm:p-4 rounded-xl surface-terminal text-left">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-mono text-[#ff4d6d] font-semibold tracking-wider">
                  [{stat.tag}]
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#ff003c]/60" />
              </div>
              <div className="text-2xl sm:text-3xl font-black text-white tracking-tight font-display">
                <Counter target={stat.rawVal} suffix={stat.suffix} />
              </div>
              <div className="text-xs text-zinc-300 mt-0.5 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   3. CHAPTER OVERVIEW (DISTINCT EDITORIAL PULL-QUOTE & PROSE)
───────────────────────────────────────────────────────────── */
function Overview() {
  return (
    <section id="overview" className="py-24 px-4 sm:px-6 border-t border-white/[0.08] bg-[#07070a] relative">
      <div className="max-w-5xl mx-auto">
        {/* Section Label */}
        <div className="flex items-center gap-2 mb-6">
          <TerminalSquare size={16} className="text-[#ff003c]" />
          <span className="font-mono text-xs text-zinc-300 uppercase tracking-wider font-semibold">
            Chapter Philosophy &amp; Model
          </span>
        </div>

        {/* Editorial Headline */}
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-display leading-[1.15] mb-8">
          A year-round building ecosystem, <br className="hidden sm:block" />
          not an annual weekend sprint.
        </h2>

        {/* Distinct Standout Editorial Pull-Quote */}
        <div className="relative p-6 sm:p-10 rounded-2xl bg-gradient-to-r from-[#170a10] via-[#0e0e16] to-[#0a0a0f] border-l-4 border-l-[#ff003c] border border-white/[0.08] shadow-[0_12px_40px_-15px_rgba(255,0,60,0.22)] mb-12">
          <div className="flex items-center gap-2 mb-3 text-[#ff003c]">
            <Quote size={20} className="fill-[#ff003c]/20" />
            <span className="font-mono text-xs uppercase tracking-widest font-bold text-[#ff4d6d]">
              VIT Pune Chapter Charter // Mission Statement
            </span>
          </div>
          <blockquote className="text-xl sm:text-2xl md:text-3xl text-white font-display font-bold leading-snug tracking-tight">
            &ldquo;A year-round ecosystem connecting builders, startups, and mentors — not an annual weekend sprint.&rdquo;
          </blockquote>
          <p className="mt-4 text-xs sm:text-sm text-zinc-300 font-mono leading-relaxed">
            Establishing permanent technical infrastructure, continuous open-source contribution sprints, and institutional industry pipelines across Vishwakarma Institute of Technology.
          </p>
        </div>

        {/* 2-Column Prose Narrative */}
        <div className="grid md:grid-cols-2 gap-8 text-sm sm:text-base text-zinc-200 leading-relaxed mb-12">
          <p>
            <strong className="text-white">HackWithIndia (HWI)</strong> is a nationwide innovation community connecting 50,000+ student developers across India. Rather than operating merely as a competition host, HWI establishes permanent technical hubs inside premier institutions.
          </p>
          <p>
            The <strong className="text-white">VIT Pune Student Chapter</strong> provides faculty-supported, student-led governance. It provides a formal pipeline where students get access to computing resources, hackathon travel assistance, enterprise challenge bounties, and senior mentorship throughout the academic calendar.
          </p>
        </div>

        {/* Ecosystem Connectivity Schematic */}
        <div className="p-5 sm:p-6 rounded-xl surface-terminal">
          <div className="text-xs font-mono text-[#ff4d6d] font-semibold mb-4 flex items-center justify-between">
            <span>[COMMUNITY_ARCHITECTURE_FLOW]</span>
            <span className="text-zinc-400">v2026.09</span>
          </div>

          <div className="grid sm:grid-cols-3 gap-4 text-center">
            <div className="p-4 rounded-lg bg-[#14141d] border border-white/[0.05]">
              <GraduationCap className="mx-auto text-zinc-300 mb-2" size={22} />
              <div className="font-bold text-white text-sm font-display">VIT Pune Students</div>
              <div className="text-xs text-zinc-300 mt-1">Cross-branch developers, designers &amp; researchers</div>
            </div>

            <div className="p-4 rounded-lg bg-[#1a1318] border border-[#ff003c]/40 relative">
              <Network className="mx-auto text-[#ff003c] mb-2" size={22} />
              <div className="font-bold text-white text-sm font-display">HWI Student Chapter</div>
              <div className="text-xs text-zinc-200 mt-1">Core committee, mentorship &amp; hackathon hub</div>
            </div>

            <div className="p-4 rounded-lg bg-[#14141d] border border-white/[0.05]">
              <Building2 className="mx-auto text-zinc-300 mb-2" size={22} />
              <div className="font-bold text-white text-sm font-display">Global Industry Labs</div>
              <div className="text-xs text-zinc-300 mt-1">Microsoft, GitHub, Postman, Polygon &amp; Solana</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   4. CORE OBJECTIVES (ASYMMETRIC BENTO GRID - MOBILE POLISHED)
───────────────────────────────────────────────────────────── */
function Objectives() {
  return (
    <section id="objectives" className="py-24 px-4 sm:px-6 border-t border-white/[0.08] bg-[#050507] relative">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-2xl mb-14">
          <div className="flex items-center gap-2 mb-3">
            <TerminalSquare size={16} className="text-[#ff003c]" />
            <span className="font-mono text-xs text-zinc-300 uppercase tracking-wider font-semibold">
              Strategic Pillars
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-display mb-4">
            Core Chapter Objectives
          </h2>
          <p className="text-sm text-zinc-300 leading-relaxed">
            Six foundational focus areas structured to bridge the divide between theoretical classroom syllabus and real-world software engineering.
          </p>
        </div>

        {/* Asymmetric Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
          {/* Primary Flagship Card 1 */}
          <div className="col-span-1 md:col-span-12 lg:col-span-7 p-6 sm:p-7 rounded-2xl surface-terminal border-[#ff003c]/40 flex flex-col justify-between shadow-[0_8px_30px_rgba(255,0,60,0.15)]">
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="w-12 h-12 rounded-xl bg-[#1b1216] border border-[#ff003c]/40 flex items-center justify-center">
                  <Code2 size={24} className="text-[#ff003c]" />
                </div>
                <span className="px-2.5 py-1 rounded text-[10px] font-mono font-bold bg-[#ff003c]/20 text-[#ff4d6d] border border-[#ff003c]/40">
                  FLAGSHIP PILLAR // 01
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2.5 font-display">
                Technical Skill &amp; Production Engineering
              </h3>
              <p className="text-sm text-zinc-200 leading-relaxed mb-6">
                Hands-on training in scalable backend architectures, multi-agent AI systems, decentralized protocols, and continuous integration—shipping real software rather than toy assignments.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-4 border-t border-white/[0.06]">
              {['Live deployments', 'Modern microservices', 'GPU & LLM pipelines'].map((item) => (
                <div key={item} className="flex items-center gap-2 text-xs text-zinc-200 font-mono">
                  <Check size={13} className="text-[#ff003c] flex-shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Primary Flagship Card 2 */}
          <div className="col-span-1 md:col-span-12 lg:col-span-5 p-6 sm:p-7 rounded-2xl surface-terminal border-white/15 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="w-12 h-12 rounded-xl bg-[#14141c] border border-white/15 flex items-center justify-center">
                  <Trophy size={24} className="text-white" />
                </div>
                <span className="px-2.5 py-1 rounded text-[10px] font-mono font-bold bg-white/10 text-zinc-200 border border-white/20">
                  FLAGSHIP PILLAR // 02
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2.5 font-display">
                National Hackathon Excellence
              </h3>
              <p className="text-sm text-zinc-200 leading-relaxed mb-6">
                A structured preparation pipeline taking student teams through ideation, technical architecture vetting, prototype polish, and live jury pitching.
              </p>
            </div>
            <div className="flex items-center justify-between text-xs text-zinc-300 pt-4 border-t border-white/[0.06] font-mono">
              <span>Matchmaking &amp; Mentorship</span>
              <ArrowRight size={14} className="text-[#ff003c]" />
            </div>
          </div>

          {/* Complementary Pillar Cards */}
          {[
            {
              icon: <Rocket size={20} className="text-[#ff4d6d]" />,
              title: 'Product & MVP Incubation',
              desc: 'Transforming winning prototypes into sustainable open-source tools and student-founded startup ventures.'
            },
            {
              icon: <Briefcase size={20} className="text-[#ff4d6d]" />,
              title: 'Direct Industry Referrals',
              desc: 'Direct hiring pipelines, challenge bounty evaluations, and referral networks with enterprise tech leaders.'
            },
            {
              icon: <GitPullRequest size={20} className="text-[#ff4d6d]" />,
              title: 'Global Open-Source Culture',
              desc: 'Guiding students to contribute verified, reviewed pull requests to international developer repositories.'
            },
            {
              icon: <Users size={20} className="text-[#ff4d6d]" />,
              title: 'Student Leadership Governance',
              desc: 'Empowering cross-branch teams to organize national-scale technical events, hackathons, and community sprints.'
            },
          ].map((card, i) => (
            <div key={i} className="col-span-1 md:col-span-6 lg:col-span-3 p-5 rounded-xl surface-terminal flex flex-col justify-between">
              <div>
                <div className="w-9 h-9 rounded-lg bg-[#14141c] border border-white/10 flex items-center justify-center mb-4">
                  {card.icon}
                </div>
                <h3 className="font-bold text-white text-base mb-1.5 font-display">
                  {card.title}
                </h3>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  {card.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   5. ECOSYSTEM INITIATIVES (MOSAIC SPRINT CARDS)
───────────────────────────────────────────────────────────── */
function Ecosystem() {
  return (
    <section id="ecosystem" className="py-24 px-4 sm:px-6 border-t border-white/[0.08] bg-[#07070a] relative">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-2xl mb-14">
          <div className="flex items-center gap-2 mb-3">
            <Layers size={16} className="text-[#ff003c]" />
            <span className="font-mono text-xs text-zinc-300 uppercase tracking-wider font-semibold">
              Action Programs
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-display mb-4">
            Ecosystem Initiatives
          </h2>
          <p className="text-sm text-zinc-300 leading-relaxed">
            A diverse operational matrix running continuously through the academic semester.
          </p>
        </div>

        {/* Mosaic Bento Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {ECOSYSTEM_MOSAIC.map((item, i) => (
            <div
              key={i}
              className={`${item.span} p-6 sm:p-7 rounded-2xl surface-terminal flex flex-col justify-between`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-white/10 text-zinc-200 border border-white/10">
                    {item.tag}
                  </span>
                  <span className="text-xs font-mono text-zinc-400">PROGRAM // 0{i + 1}</span>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-white mb-2.5 font-display">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-zinc-200 leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs text-zinc-300 font-mono">
                <span>{item.meta}</span>
                <ChevronRight size={14} className="text-[#ff003c]" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   6. MUTUAL VALUE & BENEFITS (SPLIT COMPARISON)
───────────────────────────────────────────────────────────── */
function Benefits() {
  return (
    <section id="benefits" className="py-24 px-4 sm:px-6 border-t border-white/[0.08] bg-[#050507] relative">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Compass size={16} className="text-[#ff003c]" />
            <span className="font-mono text-xs text-zinc-300 uppercase tracking-wider font-semibold">
              Value Proposition
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-display mb-4">
            Mutual Value &amp; Institutional Impact
          </h2>
          <p className="text-sm text-zinc-300">
            A sustainable framework delivering verified outcomes for both student careers and institutional prestige.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-7">
          {/* For Students Column */}
          <div className="p-6 sm:p-8 rounded-2xl surface-terminal border-[#ff003c]/30">
            <div className="flex items-center gap-3.5 mb-6">
              <div className="p-3 rounded-xl bg-[#1b1216] border border-[#ff003c]/50 text-[#ff4d6d]">
                <GraduationCap size={22} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white font-display">
                  For VIT Pune Students
                </h3>
                <p className="text-xs text-zinc-300 font-mono">Practical skills &amp; career acceleration</p>
              </div>
            </div>

            <div className="space-y-3.5">
              {[
                'Direct hands-on production code experience beyond textbooks',
                'Curated team matching and travel support for national hackathons',
                'Private 1-on-1 mentorship from principal architects & founders',
                'Strong GitHub project portfolios verified for tech resumes',
                'Direct referral pipelines for competitive internships & fellowships',
                'Free developer tooling perks, cloud credits, and hardware swag'
              ].map((point, idx) => (
                <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-zinc-200">
                  <CheckCircle2 size={16} className="text-[#ff003c] flex-shrink-0 mt-0.5" />
                  <span>{point}</span>
                </div>
              ))}
            </div>
          </div>

          {/* For VIT Pune Institution */}
          <div className="p-6 sm:p-8 rounded-2xl surface-terminal border-white/10">
            <div className="flex items-center gap-3.5 mb-6">
              <div className="p-3 rounded-xl bg-[#14141c] border border-white/15 text-white">
                <Building2 size={22} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white font-display">
                  For Vishwakarma Institute of Technology
                </h3>
                <p className="text-xs text-zinc-300 font-mono">Institutional visibility &amp; placement strength</p>
              </div>
            </div>

            <div className="space-y-3.5">
              {[
                'Strengthens campus-wide innovation, research, and patent culture',
                'Promotes interdisciplinary collaboration across engineering branches',
                'Elevates national standing on NIRF, NAAC, and tech community benchmarks',
                'Establishes formal partnerships with Microsoft, GitHub, Postman, and Polygon',
                'Increases top-tier product placement offers through industry challenge tracks',
                'Creates high-visibility student leadership with faculty-backed governance'
              ].map((point, idx) => (
                <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-zinc-200">
                  <CheckCircle2 size={16} className="text-zinc-400 flex-shrink-0 mt-0.5" />
                  <span>{point}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   7. ANNUAL ACTIVITY ROADMAP (NARROW MOBILE POLISHED)
───────────────────────────────────────────────────────────── */
function Roadmap() {
  return (
    <section id="roadmap" className="py-24 px-4 sm:px-6 border-t border-white/[0.08] bg-[#07070a] relative">
      <div className="max-w-4xl mx-auto">
        <div className="text-center max-w-xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Calendar size={16} className="text-[#ff003c]" />
            <span className="font-mono text-xs text-zinc-300 uppercase tracking-wider font-semibold">
              Annual Calendar
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-display mb-4">
            2026–27 Activity Roadmap
          </h2>
          <p className="text-sm text-zinc-300">
            A structured, continuous operational schedule executed across all four academic quarters.
          </p>
        </div>

        {/* Sequential Timeline Component with Glowing Vertical Spine */}
        <div className="relative border-l-2 border-[#ff003c]/40 ml-3 sm:ml-32 space-y-10 py-2">
          {ROADMAP_TIMELINE.map((stage) => (
            <div key={stage.quarter} className="relative pl-6 sm:pl-10 group">
              {/* Timeline Marker Node */}
              <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-[#050507] border-2 border-[#ff003c] flex items-center justify-center group-hover:scale-125 transition-transform shadow-[0_0_12px_rgba(255,0,60,0.85)]">
                <span className="w-1.5 h-1.5 rounded-full bg-white" />
              </div>

              {/* Desktop Quarter/Term Label */}
              <div className="hidden sm:block absolute -left-36 top-1 text-right w-28 font-mono">
                <div className="text-sm font-bold text-white font-display">{stage.quarter}</div>
                <div className="text-[10px] text-[#ff4d6d] font-semibold">{stage.term}</div>
              </div>

              {/* Phase Card */}
              <div className="p-5 sm:p-6 rounded-xl surface-terminal border-white/[0.08] group-hover:border-[#ff003c]/40 transition-colors">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <h3 className="text-base sm:text-lg font-bold text-white font-display">
                    {stage.phase}
                  </h3>
                  <span className="sm:hidden text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#ff003c]/20 text-[#ff4d6d] border border-[#ff003c]/30">
                    {stage.quarter} · {stage.term}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                  {stage.items.map((item, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-zinc-200">
                      <span className="text-[#ff003c] font-mono mt-0.5">▸</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   8. INDUSTRY PARTNERS (INTERACTIVE HOVER MICROCOPY REVEAL)
───────────────────────────────────────────────────────────── */
function Partners() {
  return (
    <section id="partners" className="py-24 px-4 sm:px-6 border-t border-white/[0.08] bg-[#050507] relative overflow-hidden">
      <div className="max-w-6xl mx-auto text-center mb-14">
        <div className="flex items-center justify-center gap-2 mb-3">
          <Globe size={16} className="text-[#ff003c]" />
          <span className="font-mono text-xs text-zinc-300 uppercase tracking-wider font-semibold">
            Associated Network
          </span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-display mb-4">
          Industry Partners &amp; Ecosystem
        </h2>
        <p className="text-sm text-zinc-300 max-w-2xl mx-auto">
          Associated with premier technology platforms, cloud infrastructures, and developer networks. Hover or tap any partner to view explicit chapter offerings.
        </p>
      </div>

      {/* Row 1: Scrolling Left (Speed: 32s) */}
      <div className="relative w-full overflow-hidden py-3 select-none">
        <div className="absolute inset-y-0 left-0 w-16 sm:w-28 bg-gradient-to-r from-[#050507] to-transparent pointer-events-none z-10" />
        <div className="absolute inset-y-0 right-0 w-16 sm:w-28 bg-gradient-to-l from-[#050507] to-transparent pointer-events-none z-10" />

        <div className="animate-ticker-left">
          {[...PARTNERS_ROW_1, ...PARTNERS_ROW_1, ...PARTNERS_ROW_1].map((p, idx) => (
            <div
              key={idx}
              tabIndex={0}
              role="button"
              aria-label={`${p.name} - ${p.offer}`}
              className="partner-card mx-2.5 px-6 py-4 rounded-xl surface-terminal text-center whitespace-nowrap group cursor-pointer focus-visible:outline-none min-w-[210px] sm:min-w-[240px] flex flex-col items-center justify-center"
            >
              <div className="flex items-center gap-2 justify-center mb-1">
                <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-white/5 text-[#ff4d6d] border border-white/10">
                  {p.category}
                </span>
              </div>
              <div className="text-sm sm:text-base font-bold text-white group-hover:text-[#ff003c] transition-colors font-display">
                {p.name}
              </div>
              {/* Explicit hover microcopy reveal */}
              <div className="text-[11px] text-zinc-300 font-mono mt-1 transition-all duration-300 sm:opacity-80 group-hover:opacity-100 group-hover:text-white max-w-[220px] text-center whitespace-normal">
                {p.offer}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Row 2: Scrolling Right (Speed: 38s, Opposite Direction) */}
      <div className="relative w-full overflow-hidden py-3 mt-3 select-none">
        <div className="absolute inset-y-0 left-0 w-16 sm:w-28 bg-gradient-to-r from-[#050507] to-transparent pointer-events-none z-10" />
        <div className="absolute inset-y-0 right-0 w-16 sm:w-28 bg-gradient-to-l from-[#050507] to-transparent pointer-events-none z-10" />

        <div className="animate-ticker-right">
          {[...PARTNERS_ROW_2, ...PARTNERS_ROW_2, ...PARTNERS_ROW_2].map((p, idx) => (
            <div
              key={idx}
              tabIndex={0}
              role="button"
              aria-label={`${p.name} - ${p.offer}`}
              className="partner-card mx-2.5 px-6 py-4 rounded-xl surface-terminal text-center whitespace-nowrap group cursor-pointer focus-visible:outline-none min-w-[210px] sm:min-w-[240px] flex flex-col items-center justify-center"
            >
              <div className="flex items-center gap-2 justify-center mb-1">
                <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-white/5 text-[#ff4d6d] border border-white/10">
                  {p.category}
                </span>
              </div>
              <div className="text-sm sm:text-base font-bold text-white group-hover:text-[#ff003c] transition-colors font-display">
                {p.name}
              </div>
              {/* Explicit hover microcopy reveal */}
              <div className="text-[11px] text-zinc-300 font-mono mt-1 transition-all duration-300 sm:opacity-80 group-hover:opacity-100 group-hover:text-white max-w-[220px] text-center whitespace-normal">
                {p.offer}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Official References Bar */}
      <div className="mt-14 text-center text-xs text-zinc-400 font-mono flex flex-wrap items-center justify-center gap-4">
        <span>Official Platform References:</span>
        <a
          href="https://hackwithindia.in/"
          target="_blank"
          rel="noreferrer"
          className="text-zinc-300 hover:text-white underline decoration-zinc-500 transition-colors focus-visible:outline-none"
        >
          hackwithindia.in
        </a>
        <span>·</span>
        <a
          href="https://hackwithindia.in/chapters"
          target="_blank"
          rel="noreferrer"
          className="text-zinc-300 hover:text-white underline decoration-zinc-500 transition-colors focus-visible:outline-none"
        >
          hackwithindia.in/chapters
        </a>
        <span>·</span>
        <a
          href="https://devnovate.co/"
          target="_blank"
          rel="noreferrer"
          className="text-zinc-300 hover:text-white underline decoration-zinc-500 transition-colors focus-visible:outline-none"
        >
          devnovate.co
        </a>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   9. CORE TEAM
───────────────────────────────────────────────────────────── */
const CORE_TEAM = [
  {
    name: 'Atharv Rahate',
    designation: 'President',
    branch: 'AIML',
    year: 'TY-G',
    email: 'atharvdrahate@gmail.com',
    initials: 'AR',
    color: '#ff003c',
  },
  {
    name: 'Arya Bhaiya',
    designation: 'Vice-President',
    branch: 'IT',
    year: 'SY-A',
    email: 'aryabhaiya31@gmail.com',
    initials: 'AB',
    color: '#ff4d6d',
  },
  {
    name: 'Bramha Gulavani',
    designation: 'Secretary',
    branch: 'AIML',
    year: 'TY-G',
    email: null,
    initials: 'BG',
    color: '#ff003c',
  },
  {
    name: 'Harshvardhan Dhere',
    designation: 'Treasurer',
    branch: 'AIML',
    year: 'TY-G',
    email: 'harshvardhan.1252030014@vit.edu',
    initials: 'HD',
    color: '#ff4d6d',
  },
  {
    name: 'Chaitanya Rathod',
    designation: 'Event Coordinator',
    branch: 'IT',
    year: 'TY-G',
    email: 'chaitanya.1252130014@vit.edu',
    initials: 'CR',
    color: '#ff003c',
  },
  {
    name: 'Bhoomi Baghele',
    designation: 'Public Relations Officer',
    branch: 'CSE',
    year: 'SY-B',
    email: 'bhoomi.1251070313@vit.edu',
    initials: 'BB',
    color: '#ff4d6d',
  },
  {
    name: 'Piyush Dahatonde',
    designation: 'Social Media Head',
    branch: 'IC',
    year: 'SY-A',
    email: 'piyush.1251140071@vit.edu',
    initials: 'PD',
    color: '#ff003c',
  },
];

function CoreTeam() {
  return (
    <section id="team" className="py-24 px-4 sm:px-6 border-t border-white/[0.08] bg-[#0d0d12] relative overflow-hidden">
      {/* Background grid accent */}
      <div className="absolute inset-0 bg-builder-grid opacity-[0.03] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Users size={16} className="text-[#ff003c]" />
            <span className="font-mono text-xs text-zinc-300 uppercase tracking-wider font-semibold">
              Leadership
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-display mb-4">
            Meet the Core Team
          </h2>
          <p className="text-sm text-zinc-300 leading-relaxed">
            The founding leadership driving HackWithIndia's VIT Pune chapter — builders, organisers, and community architects.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {CORE_TEAM.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.45, delay: i * 0.07 }}
              className="group relative rounded-2xl surface-terminal border border-white/[0.07] hover:border-[#ff003c]/40 p-6 flex flex-col gap-4 transition-all duration-300 hover:shadow-[0_0_32px_rgba(255,0,60,0.12)]"
            >
              {/* Avatar */}
              <div className="flex items-center gap-4">
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center text-white font-display font-extrabold text-lg shrink-0 select-none"
                  style={{ background: `linear-gradient(135deg, ${member.color}33 0%, ${member.color}11 100%)`, border: `1.5px solid ${member.color}55` }}
                >
                  <span style={{ color: member.color }}>{member.initials}</span>
                </div>
                <div className="min-w-0">
                  <p className="font-display font-bold text-white text-sm leading-tight truncate">{member.name}</p>
                  <p className="text-[#ff003c] text-xs font-semibold font-mono mt-0.5 truncate">{member.designation}</p>
                </div>
              </div>

              {/* Meta */}
              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-white/[0.06] text-zinc-300 text-xs font-mono">
                  <Code2 size={10} className="text-zinc-400" /> {member.branch}
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-white/[0.06] text-zinc-300 text-xs font-mono">
                  <GraduationCap size={10} className="text-zinc-400" /> {member.year}
                </span>
              </div>

              {/* Email */}
              {member.email && (
                <a
                  href={`mailto:${member.email}`}
                  className="flex items-center gap-1.5 text-zinc-400 hover:text-[#ff4d6d] text-xs font-mono transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#ff003c] rounded truncate"
                  aria-label={`Email ${member.name}`}
                >
                  <Mail size={11} className="shrink-0" />
                  <span className="truncate">{member.email}</span>
                </a>
              )}

              {/* Hover top-right accent dot */}
              <div
                className="absolute top-4 right-4 w-2 h-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: member.color, boxShadow: `0 0 8px ${member.color}` }}
              />
            </motion.div>
          ))}
        </div>

        {/* Bottom note */}
        <p className="text-center text-xs text-zinc-500 font-mono mt-10">
          VIT Pune Chapter · Academic Year 2025–26
        </p>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   10. FAQ (INTERACTIVE ACCORDION WITH ACCESSIBLE CONTRAST)
───────────────────────────────────────────────────────────── */
function FAQ() {
  const [openIdx, setOpenIdx] = useState(null);

  const toggle = (idx) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-24 px-4 sm:px-6 border-t border-white/[0.08] bg-[#07070a] relative">
      <div className="max-w-3xl mx-auto">
        <div className="text-center max-w-xl mx-auto mb-14">
          <div className="flex items-center justify-center gap-2 mb-3">
            <BookOpen size={16} className="text-[#ff003c]" />
            <span className="font-mono text-xs text-zinc-300 uppercase tracking-wider font-semibold">
              Student Handbook
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-display mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-zinc-300">
            Key details about membership, committee involvement, branch eligibility, and hackathons.
          </p>
        </div>

        <div className="space-y-3">
          {FAQS.map((item, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="rounded-xl surface-terminal overflow-hidden transition-colors"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-semibold text-sm sm:text-base text-zinc-100 hover:text-white transition-colors focus-visible:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="font-display">{item.q}</span>
                  <ChevronDown
                    size={16}
                    className={`text-[#ff003c] flex-shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                    >
                      <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-zinc-200 leading-relaxed border-t border-white/[0.05]">
                        {item.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   10. FINAL CALL TO ACTION & KINETIC FOOTER MARQUEE
───────────────────────────────────────────────────────────── */
function FinalCTA() {
  return (
    <section className="py-24 px-4 sm:px-6 border-t border-white/[0.08] bg-gradient-to-b from-[#07070a] via-[#11050a] to-[#050507] text-center relative overflow-hidden">
      <div className="max-w-4xl mx-auto">
        <span className="text-xs font-mono font-bold text-[#ff4d6d] uppercase tracking-wider mb-4 inline-block px-3 py-1 rounded bg-[#ff003c]/15 border border-[#ff003c]/30">
          VIT PUNE · 2026–27 ACADEMIC YEAR
        </span>
        <h2 className="text-3xl sm:text-6xl font-black text-white tracking-tight mb-5 font-display">
          Ready to Ship Real Code?
        </h2>
        <p className="text-sm sm:text-base text-zinc-200 max-w-xl mx-auto mb-8 leading-relaxed px-2">
          Join the official community of student builders, hackers, and creators at Vishwakarma Institute of Technology.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5">
          <a
            href="https://devnovate.co/"
            target="_blank"
            rel="noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg btn-crimson text-sm font-bold shadow-xl active:scale-95 focus-visible:outline-none"
          >
            <span>Register for Hackathon</span>
            <ArrowRight size={16} />
          </a>
          <a
            href="mailto:chapters@hackwithindia.in"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-lg btn-secondary text-sm font-semibold focus-visible:outline-none"
          >
            <Mail size={16} className="text-[#ff4d6d]" />
            <span>Contact Chapter Leads</span>
          </a>
        </div>
      </div>
    </section>
  );
}

function BigBrandBanner() {
  const WORD = 'HACKWITHINDIA VIT PUNE';

  return (
    <section className="relative overflow-hidden bg-[#050507] border-t border-white/[0.08] select-none pt-12 pb-14">
      {/* Edge Vignette Fades */}
      <div className="absolute inset-y-0 left-0 w-28 bg-gradient-to-r from-[#050507] to-transparent pointer-events-none z-20" />
      <div className="absolute inset-y-0 right-0 w-28 bg-gradient-to-l from-[#050507] to-transparent pointer-events-none z-20" />

      {/* Main illuminated marquee row */}
      <div className="animate-ticker-left whitespace-nowrap flex items-center relative z-10">
        {Array.from({ length: 6 }).map((_, i) => (
          <span
            key={i}
            className="inline-block banner-text-metallic font-black tracking-[-0.04em] text-[13vw] leading-none px-8 uppercase font-display cursor-default"
          >
            {WORD}
          </span>
        ))}
      </div>

      {/* Inverted mirror floor reflection */}
      <div className="animate-ticker-left whitespace-nowrap flex items-center reflection-fade mt-1">
        {Array.from({ length: 6 }).map((_, i) => (
          <span
            key={i}
            className="inline-block text-[#ff003c] font-black tracking-[-0.04em] text-[13vw] leading-none px-8 uppercase font-display"
          >
            {WORD}
          </span>
        ))}
      </div>
    </section>
  );
}

function Footer() {
  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#050507] border-t border-white/[0.08] py-12 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-zinc-300">
        <div className="flex items-center gap-3">
          <img
            src="/hwi-vit-logo.png"
            alt="HWI VIT Logo"
            className="w-8 h-8 rounded-full object-contain drop-shadow-[0_0_8px_rgba(255,0,60,0.5)]"
          />
          <div>
            <span className="font-bold text-white font-display">HACK WITH INDIA</span>
            <span className="ml-2 text-zinc-300 font-mono">· VIT Pune Student Chapter</span>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-6 text-zinc-300 font-medium">
          {[
            { label: 'Overview', id: 'overview' },
            { label: 'Objectives', id: 'objectives' },
            { label: 'Ecosystem', id: 'ecosystem' },
            { label: 'Benefits', id: 'benefits' },
            { label: 'Roadmap', id: 'roadmap' },
            { label: 'Partners', id: 'partners' },
            { label: 'FAQ', id: 'faq' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className="hover:text-white transition-colors focus-visible:outline-none"
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-4 text-zinc-300 font-mono">
          <a href="mailto:chapters@hackwithindia.in" className="hover:text-white transition-colors focus-visible:outline-none">
            chapters@hackwithindia.in
          </a>
        </div>
      </div>
    </footer>
  );
}

/* ─────────────────────────────────────────────────────────────
   ROOT APPLICATION
───────────────────────────────────────────────────────────── */
export default function App() {
  return (
    <div className="min-h-screen bg-[#050507] text-[#f4f4f6] selection:bg-[#ff003c]/30 selection:text-white">
      <Navbar />
      <Hero />
      <Overview />
      <Objectives />
      <Ecosystem />
      <Benefits />
      <Roadmap />
      <Partners />
      <CoreTeam />
      <FAQ />
      <FinalCTA />
      <BigBrandBanner />
      <Footer />
    </div>
  );
}
