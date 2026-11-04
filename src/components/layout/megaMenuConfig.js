import {
  Users, Building2, BookOpen, HeartHandshake, Briefcase, Building, Layers,
  Activity, ShoppingBag, Landmark, GraduationCap, Home, Factory, Truck,
  Sun, Scissors, ShoppingCart, Award, Globe, Smartphone, Sparkles, Boxes,
  MessageSquare, Calculator, Calendar, Headphones, Laptop, PhoneCall,
  Mail, Phone, MapPin, Bot, Cpu, Database, Network, Mic, Monitor,
  Share2, LayoutGrid, Code2, Palette, Megaphone, CheckSquare, TrendingUp, FolderGit2
} from 'lucide-react';

/**
 * Centralized Mega Menu Configuration
 * Edit any text, link, icon, or card easily here.
 */
export const megaMenuConfig = {
  about: {
    id: 'about',
    label: 'About',
    cards: [
      {
        type: 'links',
        headerIcon: Users,
        title: 'About Us',
        description: 'Meet the people, principles, and engineering mindset behind the enterprise software we design, build, and scale.',
        viewMoreText: 'View More',
        viewMoreHref: '#about',
        buttonStyle: 'pill',
        items: [
          { label: 'Our Story & Mission', icon: BookOpen, href: '#story-mission' },
          { label: 'Leadership & Team', icon: Users, href: '#leadership-team' },
          { label: 'Core Engineering Values', icon: HeartHandshake, href: '#about' },
          { label: 'Careers & Open Roles', icon: Briefcase, href: '#contact' },
        ],
      },
      {
        type: 'preview',
        headerIcon: Building2,
        title: 'About InfoDrill',
        description: 'See how our agile delivery, domain expertise, and AI focus shape every enterprise solution.',
        previewTitle: 'Engineering Tomorrow',
        previewSubtitle: 'Team, process, and architectural excellence.',
        previewBadge: 'InfoDrill Preview',
        previewHref: '#about',
      },
      {
        type: 'purple-quote',
        purpleTagline: 'Built by engineers. Shaped by purpose.',
        purpleSubtext: 'CLEAR. COMMITTED. CAPABLE.',
        purpleButtonText: 'Learn More',
        purpleButtonHref: '#about',
        quote: '“Great products do not come from templates. They come from teams that understand real operational challenges.”',
        quoteAuthor: 'INFODRILL AI SOLUTIONS',
      },
    ],
  },

  services: {
    id: 'services',
    label: 'Services',
    cards: [
      {
        type: 'links',
        headerIcon: Bot,
        title: 'AI Services',
        description: 'Build intelligent, autonomous AI systems — from custom agents and LLM integrations to RAG pipelines and voice AI.',
        viewMoreText: 'View More',
        viewMoreHref: '#services',
        items: [
          { label: 'Custom AI Agent Development', icon: Bot, href: '#services' },
          { label: 'LLM Integration', icon: Cpu, href: '#services' },
          { label: 'RAG System Development', icon: Database, href: '#services' },
          { label: 'Multi-Agent Architecture', icon: Network, href: '#services' },
          { label: 'AI Voice Development', icon: Mic, href: '#services' },
        ],
      },
      {
        type: 'links',
        headerIcon: Monitor,
        title: 'AI Agents',
        description: 'Our AI agents automate tasks, improve efficiency, and help businesses scale faster with intelligent, data-driven solutions.',
        viewMoreText: 'View More',
        viewMoreHref: '#services',
        hasMascot: true,
        items: [
          { label: 'HR Agent Automation', icon: Briefcase, href: '#services' },
          { label: 'Marketing Agent Automation', icon: Bot, href: '#services' },
          { label: 'Social Media Automation', icon: Share2, href: '#services' },
          { label: 'Employee Reporting Automation', icon: Monitor, href: '#services' },
          { label: 'Lead Extractor Automation', icon: LayoutGrid, href: '#services' },
        ],
      },
      {
        type: 'links',
        headerIcon: Code2,
        title: 'Software Development',
        description: 'We build scalable and high-performance digital products that help businesses grow, automate processes, and deliver exceptional user experiences.',
        viewMoreText: 'View More',
        viewMoreHref: '#services',
        items: [
          { label: 'Web Development', icon: Monitor, href: '#services' },
          { label: 'App Development', icon: Smartphone, href: '#services' },
          { label: 'UI/UX Design', icon: Palette, href: '#services' },
          { label: 'Digital Marketing', icon: Megaphone, href: '#services' },
          { label: 'NoCode Development', icon: Layers, href: '#services' },
        ],
      },
    ],
  },

  industries: {
    id: 'industries',
    label: 'Industries',
    cards: [
      {
        type: 'links',
        headerIcon: Building,
        title: 'Core Industries',
        description: 'Custom ERP and AI platforms engineered to match specific compliance and workflow demands.',
        viewMoreText: 'View More',
        viewMoreHref: '#industries',
        items: [
          { label: 'Healthcare IT Solutions', icon: Activity, href: '#healthcare' },
          { label: 'Retail & Multi-Channel POS', icon: ShoppingBag, href: '#industries' },
          { label: 'Finance & Accounting', icon: Landmark, href: '#industries' },
          { label: 'Education & Campus LMS', icon: GraduationCap, href: '#industries' },
          { label: 'Real Estate & Property', icon: Home, href: '#industries' },
        ],
      },
      {
        type: 'links',
        headerIcon: Layers,
        title: 'Manufacturing & Tech',
        description: 'Real-time production monitoring, supply chain sync, and industrial automation.',
        viewMoreText: 'View More',
        viewMoreHref: '#industries',
        items: [
          { label: 'Manufacturing & Production', icon: Factory, href: '#industries' },
          { label: 'Logistics & Fleet Dispatch', icon: Truck, href: '#industries' },
          { label: 'Solar & Renewable Energy', icon: Sun, href: '#industries' },
          { label: 'Textile & Garment Mills', icon: Scissors, href: '#industries' },
          { label: 'E-Commerce Platforms', icon: ShoppingCart, href: '#industries' },
        ],
      },
      {
        type: 'purple-quote',
        purpleTagline: 'Engineered for Industry-Specific Scale',
        purpleSubtext: 'Purpose-built architectures for complex operations.',
        purpleButtonText: 'Explore Solutions',
        purpleButtonHref: '#industries',
        quote: '“Tailored software is not a luxury — it is the single biggest operational multiplier for modern businesses.”',
        quoteAuthor: 'INFODRILL AI SOLUTIONS',
      },
    ],
  },

  portfolio: {
    id: 'portfolio',
    label: 'Portfolio',
    cards: [
      {
        type: 'links',
        headerIcon: Award,
        title: 'Portfolio',
        description: 'Explore verified deployments that delivered measurable ROI and streamlined operations.',
        viewMoreText: 'View More',
        viewMoreHref: '#portfolio',
        items: [
          { label: 'All Projects', icon: LayoutGrid, href: '#portfolio' },
          { label: 'Web Projects', icon: Globe, href: '#portfolio' },
          { label: 'Mobile App Projects', icon: Smartphone, href: '#portfolio' },
          { label: 'AI & ML Implementations', icon: Sparkles, href: '#portfolio' },
          { label: 'Enterprise ERP Systems', icon: Boxes, href: '#portfolio' },
        ],
      },
      {
        type: 'our-projects',
        headerIcon: Award,
        title: 'Our Projects',
        description: 'Explore our flagship software platforms and solutions.',
        projects: [
          {
            title: 'Call Info',
            icon: PhoneCall,
            summary: 'Automated call recording analysis, sentiment tracking, and CRM sync.',
            href: '/projects/call-info',
          },
          {
            title: 'Task Manager',
            icon: CheckSquare,
            summary: 'Smart task allocation, team capacity planning, and milestone tracking.',
            href: '/projects/task-manager',
          },
          {
            title: 'Optimize',
            icon: TrendingUp,
            summary: 'Predictive inventory forecasting, route planning, and cost reduction.',
            href: '/projects/optimize',
          },
        ],
      },
      {
        type: 'purple-quote',
        purpleTagline: '44+ Enterprise Projects Delivered',
        purpleSubtext: '99% CLIENT SATISFACTION ACROSS 5+ YEARS',
        purpleButtonText: 'View Case Studies',
        purpleButtonHref: '#portfolio',
        quote: '“INFODRILL delivered our ERP system on time. The inventory module saved us 20+ hours of manual work every week.”',
        quoteAuthor: 'Rajesh Patel, Operations Director',
      },
    ],
  },

  contact: {
    id: 'contact',
    label: 'Contact',
    cards: [
      {
        type: 'links',
        headerIcon: MessageSquare,
        title: 'Contact Us',
        description: 'Consult with our principal architects for project scoping and rapid technical feasibility.',
        viewMoreText: 'View More',
        viewMoreHref: '#contact',
        items: [
          { label: 'Get a Project Estimate', icon: Calculator, href: '#contact' },
          { label: 'Book a Technical Consultation', icon: Calendar, href: '#contact' },
          { label: 'Dedicated Customer Support', icon: Headphones, href: '#contact' },
          { label: 'Request a Live System Demo', icon: Laptop, href: '#contact' },
        ],
      },
      {
        type: 'contact-details',
        headerIcon: PhoneCall,
        title: 'Direct Channels',
        description: 'Reach our team directly across email, phone, or in person at our Ahmedabad office.',
        email: 'infodrillaisolutions@gmail.com',
        phone: '+91 92135 32517',
        address: '307, Silver Radiance One, Thaltej, Ahmedabad, Gujarat – 380054',
        timing: 'Mon - Sat, 9:30 AM - 7:00 PM IST',
      },
      {
        type: 'purple-quote',
        purpleTagline: "Let's build something together",
        purpleSubtext: 'Transform your operations with next-gen AI and custom enterprise software.',
        purpleButtonText: 'Get Started',
        purpleButtonHref: '#contact',
        quote: '“NDA & Confidentiality guaranteed for all client intellectual property from day one.”',
        quoteAuthor: 'INFODRILL AI SOLUTIONS',
      },
    ],
  },
};
