'use client';

import { useMemo, useState, useEffect, useRef, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, ShieldCheck, Star, Menu, X, Award, Clock, Check, ClipboardList, Hammer, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import NextImage from 'next/image';

import { ProjectCard } from './components/ProjectCard';

// Inline configuration for standalone usage
const config = {
  businessName: 'McMillian Junk Removal',
  businessOwner: 'Andre McMillian',
  city: 'Houston',
  address: 'Houston, TX - Serving Harris County & Surrounding Areas',
  phone: '(832) 721-6206',
  email: 'mcmillianjunkremoval@yahoo.com',
  primaryService: 'Junk Removal & Demolition',
  services: ['Demolition', 'Hoarder House Clean-Out', 'Storage Clean Out', 'Appliance Removal', 'Construction Site Clean Up'],
  rating: 5.0,
  reviewCount: 30,
  yearsInBusiness: 10,
  ctaPrimary: 'Call Now',

  // Theme: Bold & Clean Junk Removal (Red / Yellow / Black)
  theme: {
    isDark: false,
    colors: {
      pageBg: '#ffffff',
      cardBg: '#ffffff',
      surfaceBg: '#f3f4f6',
      textPrimary: '#111827',
      textSecondary: '#4b5563',
      textMuted: '#9ca3af',
      border: '#e5e7eb',
      borderLight: '#f9fafb',
      darkBg: '#111111',
      darkText: '#f9fafb',
      darkTextMuted: '#d1d5db',
    }
  },

  // Primary: Red (Power, Action, Urgency)
  accent: {
    name: 'Junk Red',
    hex: '#dc2626',
    hoverHex: '#b91c1c'
  },

  // Action: Yellow (Attention, CTA)
  action: {
    hex: '#eab308',
    hoverHex: '#ca8a04'
  },

  // Secondary Color for headers (Black)
  secondary: {
    hex: '#111111',
  },

  imagePlaceholders: [
    { label: 'Before Photo', hint: 'Cluttered space or junk pile' },
    { label: 'After Photo', hint: 'Clean, cleared-out space' },
    { label: 'Crew Photo', hint: 'McMillian Junk Removal team on the job' },
  ],

  testimonials: [
    {
      quote: "Great guys \u2014very polite and courteous. Did an excellent job at my site. Thorough professionals. Would recommend their services \u2014 quick, efficient, punctual and deliver to expectations. Thanks for an awesome job!!",
      name: "Kamil Noorani",
      highlight: "Great guys \u2014very polite and courteous.",
      reviewCount: 1,
      localGuide: false,
    },
    {
      quote: "If you want flexibility, accountability, professional and quickness you want McMillian. Called on a Tuesday and was able to service me on the very next day. What would have took me hours took him less than a hour. Definitely will be a repeat customer!",
      name: "Tre'Ana Buckner",
      highlight: "Flexibility, accountability, professional and quickness.",
      reviewCount: 23,
      localGuide: true,
      photos: 11,
    },
    {
      quote: "If you are in need of a cleanup this is the company to get. They are very detailed in the work they do and when they finish everything is clean. I mean clean.. there is nothing left behind. Everything is picked up cleaned and hauled off.",
      name: "Ms Areval",
      highlight: "Very detailed... when they finish everything is clean.",
      reviewCount: 2,
      localGuide: false,
    },
    {
      quote: "Really easy to work with, great customer service, he showed up when he said he would, and got the job done! I\u2019m a repeat customer, and I would recommend them to anyone!",
      name: "Augie C",
      highlight: "Really easy to work with, great customer service.",
      reviewCount: 16,
      localGuide: true,
      photos: 4,
    },
    {
      quote: "Very professional and dependable. Respectful with good attitude. Excellent work. Gets the job done. Fair pricing.",
      name: "Tanganoh Tanganoh",
      highlight: "Very professional and dependable... Fair pricing.",
      reviewCount: 2,
      localGuide: false,
    },
    {
      quote: "The hardest working people! I have used them several times and never failed to impress..Thank you",
      name: "Nhan Nguyen",
      highlight: "The hardest working people! Never failed to impress.",
      reviewCount: 3,
      localGuide: false,
    },
    {
      quote: "Very professional and reliable! Great prices! I definitely use this company again!!",
      name: "Lindsey Rhyne",
      highlight: "Very professional and reliable! Great prices!",
      reviewCount: 1,
      localGuide: false,
    },
    {
      quote: "Very timely and professional! I would definitely use him again if I need a job done",
      name: "Regina Dugan",
      highlight: "Very timely and professional!",
      reviewCount: 10,
      localGuide: false,
    },
    {
      quote: "Very reliable and professional work! Would definitely recommend!",
      name: "Jennifer Howard",
      highlight: "Very reliable and professional work!",
      reviewCount: 12,
      localGuide: false,
    },
    {
      quote: "Great service from the McMillian team. They showed up on time and cleared out everything quickly. I would definitely recommend them to a friend looking for junk removal.",
      name: "Brian Dunlap",
      highlight: "Great service from the McMillian team.",
      reviewCount: 3,
      localGuide: false,
    },
    {
      quote: "Easy to work with! They were able to get to my junk removal job quickly and handled it without any issues from start to finish.",
      name: "Jenn Sun",
      highlight: "Quickly and handled without any issues.",
      reviewCount: 14,
      localGuide: true,
      photos: 15,
    },
    {
      quote: "Awesome work! They arrived on time and the junk hauling was well done. Cleaned up the area nicely afterwards.",
      name: "Jose Luis Leal",
      highlight: "Arrived on time and junk hauling was well done.",
      reviewCount: 6,
      localGuide: false,
      photos: 1,
    },
    {
      quote: "The team was very professional & efficient in removing all our unwanted items. Highly recommend their services.",
      name: "Patricia Calegon",
      highlight: "Very professional & efficient.",
      reviewCount: 24,
      localGuide: true,
      photos: 19,
    },
    {
      quote: "Excellent customer service. The crew made the whole cleanout process effortless and stress-free.",
      name: "WTC HOMES INC",
      highlight: "Excellent customer service.",
      reviewCount: 2,
      localGuide: false,
    },
    {
      quote: "Quick and efficient junk removal. They gave a fair price and took care of everything without any hassle.",
      name: "Andrew Brim",
      highlight: "Quick and efficient junk removal.",
      reviewCount: 11,
      localGuide: false,
    },
  ],

  faqs: [
    {
      q: 'Do you offer free estimates?',
      a: 'Yes! We provide 100% free estimates for all junk removal, demolition, and cleanout services. No obligation and no hidden fees.',
    },
    {
      q: 'What areas do you serve?',
      a: 'We serve Harris County, Galveston County, Sugar Land, Fort Bend, Cypress, and the surrounding Greater Houston area.',
    },
    {
      q: 'Are you insured?',
      a: 'Absolutely. McMillian Junk Removal is fully insured for your protection and ours. Safety and quality are our top priorities on every job.',
    },
    {
      q: 'What kind of items do you haul away?',
      a: 'We remove furniture, appliances, electronics, yard waste, construction debris, mattresses, hot tubs, sheds, and much more. If you are unsure, just ask — we can likely handle it!',
    },
    {
      q: 'Do you handle hoarder house cleanouts?',
      a: 'Yes. We specialize in hoarder house cleanouts and approach every job with professionalism and compassion. We will work with you to clear the space safely and efficiently.',
    },
    {
      q: 'How quickly can you come out?',
      a: 'We offer 24/7 availability, Monday through Sunday. In many cases we can provide same-day or next-day service. Call us anytime!',
    },
  ],
};

const GoogleLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
  </svg>
);

const fadeInUp = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};
const fadeInSoft = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};
const staggerSoft = {
  animate: { transition: { staggerChildren: 0.08 } },
};
// Add types to config... or just assume for now.
// Extending config type implicitly for this file.

export default function McMillianJunkRemovalPage() {
  const accent = config.accent.hex;
  const action = config.action.hex;
  const t = config.theme.colors;
  const isDark = config.theme.isDark;
  const cleanPhone = useMemo(() => config.phone.replace(/\D/g, ''), []);
  const services = config.services;
  const ratingText = config.rating ? config.rating.toFixed(1) : '5.0';
  const reviewCount = config.reviewCount ?? 50;
  const years = config.yearsInBusiness ?? 15;
  const shellClass = 'mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-10 xl:px-12 2xl:max-w-[1400px] 2xl:px-16';
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [reviewPage, setReviewPage] = useState(0);
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [formError, setFormError] = useState('');
  const [formTimestamp] = useState(() => Date.now().toString());
  const [phoneValue, setPhoneValue] = useState('');
  const galleryRef = useRef<HTMLDivElement>(null);
  const pageUrl = typeof window !== 'undefined' ? window.location.href : '';
  // Format phone as (XXX) XXX-XXXX
  const formatPhone = (value: string) => {
    const digits = value.replace(/\D/g, '').slice(0, 10);
    if (digits.length === 0) return '';
    if (digits.length <= 3) return `(${digits}`;
    if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  };

  const scrollGallery = (direction: 'left' | 'right') => {
    if (galleryRef.current) {
      const scrollAmount = galleryRef.current.clientWidth * 0.8;
      galleryRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  // Smooth scroll to the quote form in the hero section
  const scrollToQuote = () => {
    const quoteSection = document.getElementById('quote-form');
    if (quoteSection) {
      const yOffset = -100; // Offset to account for sticky header if needed, or just breathing room
      const y = quoteSection.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
    setMobileMenuOpen(false); // Close mobile menu if open
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLeadSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError('');
    setFormStatus('sending');

    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = String(formData.get('name') || '').trim();
    const phone = String(formData.get('phone') || '').trim();
    const address = String(formData.get('address') || '').trim();
    const zipCode = String(formData.get('zipCode') || '').trim();
    const service = String(formData.get('service') || '').trim();
    const message = String(formData.get('message') || '').trim();
    const honeypot = String(formData.get('website') || '').trim();

    if (honeypot) {
      form.reset();
      setPhoneValue('');
      setFormStatus('success');
      return;
    }

    if (!name || !phone || !address || !zipCode || !service) {
      setFormStatus('error');
      setFormError('Please provide your name, phone, address, zip code, and service needed.');
      return;
    }

    try {
      const response = await fetch('/api/lead', {
        method: 'POST',
        body: formData,
        headers: { Accept: 'application/json' },
      });
      const payload = await response.json().catch(() => null);
      if (!response.ok || !payload?.ok) {
        setFormStatus('error');
        setFormError(payload?.error || 'Something went wrong. Please try again.');
        return;
      }

      form.reset();
      setPhoneValue('');
      setFormStatus('success');
    } catch (error) {
      setFormStatus('error');
      setFormError('Something went wrong. Please try again.');
    }
  };

  const navLinks = [
    { label: 'Services', href: '#services' },
    { label: 'Why Us', href: '#why-us' },
    { label: 'Our Work', href: '#work' },
    { label: 'Reviews', href: '#proof' },
    { label: 'FAQ', href: '#faq' },
  ];

  const benefits = [
    '24/7 availability — open Monday through Sunday',
    'Free estimates — affordable options & fair pricing',
    'Residential and commercial junk removal experts',
    'Fully insured & hardworking crews',
  ];
  const recentJobs = [
    { title: 'Garage Cleanout (Before)', location: 'Houston, TX', beforeImage: '/mcmillian/before.jpeg', alt: 'Garage Cleanout Before' },
    { title: 'Garage Cleanout (After)', location: 'Houston, TX', beforeImage: '/mcmillian/after.jpeg', alt: 'Garage Cleanout After' },
    { title: 'Storage Unit (Before)', location: 'Sugar Land, TX', beforeImage: '/mcmillian/before_2.jpeg', alt: 'Storage Unit Before' },
    { title: 'Storage Unit (After)', location: 'Sugar Land, TX', beforeImage: '/mcmillian/after_2.jpeg', alt: 'Storage Unit After' },
    { title: 'Curbside Removal (Before)', location: 'Cypress, TX', beforeImage: '/mcmillian/why_us.jpeg', alt: 'Curbside Pick up Before' },
    { title: 'Curbside Removal (After)', location: 'Cypress, TX', beforeImage: '/mcmillian/junkers.jpeg', alt: 'Curbside Pick up After' },
    { title: 'Complete Transformation', location: 'Harris County, TX', beforeImage: '/mcmillian/hoarder.png', alt: 'Hoarder Cleanout Before and After' },
    { title: 'Warehouse Cleanup', location: 'Houston, TX', beforeImage: '/mcmillian/gallery beforeafter.png', alt: 'Commercial Cleanout Before and After' },
    { title: 'Heavy Debris Hauling', location: 'Fort Bend, TX', beforeImage: '/mcmillian/why_us2.jpeg', alt: 'Debris Hauling' },
    { title: 'Construction Prep', location: 'Galveston County', beforeImage: '/mcmillian/reviews.jpeg', alt: 'Construction Lot Cleanup' },
    { title: 'Professional Fleet', location: 'Katy, TX', beforeImage: '/mcmillian/why_us1.jpeg', alt: 'Commercial Fleet' }
  ];

  const allServices = [
    {
      name: 'Junk Removal',
      image: '/mcmillian/hero_background.jpeg',
      desc: 'Fast, affordable junk removal for homes and businesses. We haul away furniture, appliances, yard waste, and more so you don\'t have to.',
      bestFor: 'Old furniture, mattresses, appliances, yard debris, garage cleanouts, and estate cleanups.',
      bullets: [
        'Same-day and next-day pickup available',
        'We do all the heavy lifting for you',
        'Eco-friendly disposal and donation when possible',
      ],
      turnaround: 'Most jobs: same day',
      alt: 'Professional junk removal service in Houston TX',
    },
    {
      name: 'Demolition',
      image: '/mcmillian/why_background.jpeg',
      desc: 'Professional demolition services for sheds, decks, fences, interior walls, and more. We tear it down and haul it away — all in one visit.',
      bestFor: 'Sheds, decks, fencing, drywall, flooring removal, and small structure tear-downs.',
      bullets: [
        'Complete tear-down and debris removal',
        'Safe, professional demolition crews',
        'Residential and commercial projects',
      ],
      turnaround: 'Most projects: 1-2 days',
      alt: 'Demolition and debris removal service',
    },
    {
      name: 'Hoarder House Clean-Out',
      image: '/mcmillian/hoarder.png',
      desc: 'Compassionate and thorough hoarder house cleanout services. We work with you to clear the space safely, efficiently, and discreetly.',
      bestFor: 'Severe clutter, estate cleanouts, abandoned properties, and heavy-duty residential cleanups.',
      bullets: [
        'Handled with compassion and discretion',
        'Full property cleanout from top to bottom',
        'Sorting, hauling, and deep cleaning available',
      ],
      turnaround: 'Varies by scope: 1-3 days',
      alt: 'Hoarder house cleanout service',
    },
    {
      name: 'Appliance Removal',
      image: '/mcmillian/done_right.png',
      desc: 'We remove and haul away old appliances — refrigerators, washers, dryers, ovens, water heaters, and more. Fast, easy, and affordable.',
      bestFor: 'Old refrigerators, washers, dryers, dishwashers, AC units, and water heaters.',
      bullets: [
        'Safe disconnection and removal',
        'Responsible recycling and disposal',
        'No item too heavy or too bulky',
      ],
      turnaround: 'Same-day removal available',
      alt: 'Appliance removal and disposal service',
    },
  ];

  const steps = [
    { title: 'Quick Call or Text', body: 'Tell us what you need hauled away. Send photos if you can — we\'ll give you a fast, free estimate.' },
    { title: 'On-Site Estimate', body: 'We come to you, assess the job, and give you an honest, upfront price. No hidden fees, no surprises.' },
    { title: 'We Haul It All Away', body: 'Our crew loads everything up, sweeps the area clean, and hauls it all away. You don\'t lift a finger.' },
  ];

  const serviceAreaCities = [
    'Harris County',
    'Galveston County',
    'Sugar Land',
    'Fort Bend',
    'Cypress',
    'Houston',
  ];
  const businessPhoneE164 = '+18327216206';
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Affordable Junk Removal & Demolition Services Houston TX',
    serviceType: 'Junk removal, demolition, hoarder house cleanout, appliance removal, construction site cleanup, estate cleanout, furniture removal, yard waste removal',
    description: 'McMillian Junk Removal provides affordable junk removal, demolition, and cleanout services for residential and commercial clients in Houston TX and surrounding areas. Same-day service available. Free estimates.',
    provider: {
      '@type': 'LocalBusiness',
      name: config.businessName,
      telephone: businessPhoneE164,
      url: 'https://mcmillianjunkremoval.com',
    },
    areaServed: serviceAreaCities.map((city) => ({ '@type': 'City', name: city })),
    availableChannel: {
      '@type': 'ServiceChannel',
      servicePhone: {
        '@type': 'ContactPoint',
        telephone: businessPhoneE164,
        contactType: 'customer service',
        availableLanguage: ['English', 'Spanish'],
      },
    },
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      description: 'Free junk removal estimate',
    },
  };
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://mcmillianjunkremoval.com/',
      },
    ],
  };

  const reviewCardBg = isDark ? t.cardBg : 'rgba(255,255,255,0.95)';
  const reviewCardBorder = isDark ? t.border : 'rgba(255,255,255,0.3)';
  const promiseBg = isDark ? t.surfaceBg : t.cardBg;
  const promiseDivider = isDark ? t.borderLight : t.border;

  return (
    <div id="top" className="mcmillian-site relative" style={{ backgroundColor: t.pageBg, color: t.textPrimary }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {/* ═══════════════════════════════════════════════════════════════════════
          HEADER - Sticky Announcement Bar + Nav
      ═══════════════════════════════════════════════════════════════════════ */}
      <header className="fixed top-0 w-full z-50 flex flex-col font-sans transition-all duration-300">

        {/* Scrolling Announcement Bar */}
        <div className="relative overflow-hidden py-2" style={{ background: 'linear-gradient(90deg, #111111 0%, #dc2626 50%, #111111 100%)' }}>
          <div className="flex animate-marquee whitespace-nowrap">
            {/* Content Container 1 */}
            <div className="flex items-center gap-12 px-8">
              {[...Array(2)].flatMap(() => [
                `AFFORDABLE JUNK REMOVAL & DEMOLITION`,
                `FREE ESTIMATES ON ALL JOBS`,
                `CALL NOW: (832) 721-6206`,
                `FAIR PRICING — NO HIDDEN FEES`,
                `24/7 SERVICE — MONDAY THROUGH SUNDAY`
              ]).map((text, i) => (
                <div key={i} className="flex items-center gap-3 text-[12px] font-bold uppercase tracking-wider text-white/95">
                  <span className="w-1 h-1 rounded-full bg-white/60" />
                  <span>{text}</span>
                </div>
              ))}
            </div>
            {/* Content Container 2 (Duplicate for loop) */}
            <div className="flex items-center gap-12 px-8">
              {[...Array(2)].flatMap(() => [
                `AFFORDABLE JUNK REMOVAL & DEMOLITION`,
                `FREE ESTIMATES ON ALL JOBS`,
                `CALL NOW: (832) 721-6206`,
                `FAIR PRICING — NO HIDDEN FEES`,
                `24/7 SERVICE — MONDAY THROUGH SUNDAY`
              ]).map((text, i) => (
                <div key={`dup-${i}`} className="flex items-center gap-3 text-[12px] font-bold uppercase tracking-wider text-white/95">
                  <span className="w-1 h-1 rounded-full bg-white/60" />
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav
          className="w-full transition-all duration-300"
          style={{
            backgroundColor: scrolled ? `${t.cardBg}f8` : 'transparent',
            backdropFilter: scrolled ? 'blur(12px)' : 'none',
            borderBottom: scrolled ? `1px solid ${t.border}` : 'none',
          }}
        >
          <div className={`${shellClass} flex items-center justify-between py-2`}>
            <a href="#top" className="flex items-center gap-2 md:gap-3">
              <NextImage
                src="/mcmillian/mcmill-logo.png"
                alt="McMillian Junk Removal Logo"
                width={734}
                height={1068}
                priority
                unoptimized
                className="h-16 w-auto object-contain"
              />
              <div>
                <div className="brand-display text-lg font-black uppercase tracking-tight leading-none">
                  <span style={{ color: scrolled ? accent : 'white' }}>McMILLIAN</span>
                  <span className="ml-1.5" style={{ color: scrolled ? action : 'white' }}>JUNK REMOVAL</span>
                </div>
                <div className="text-[10px] font-bold uppercase tracking-widest mt-0.5" style={{ color: scrolled ? t.textMuted : 'rgba(255,255,255,0.7)' }}>24/7 Service — Residential & Commercial</div>
              </div>
            </a>

            <div className="hidden items-center gap-8 md:flex">
              {navLinks.map((link) => (
                <a key={link.href} href={link.href} className="text-sm font-semibold transition-colors" style={{ color: scrolled ? t.textSecondary : 'rgba(255,255,255,0.85)' }}>{link.label}</a>
              ))}
            </div>

            <div className="hidden items-center gap-4 md:flex">
              <a href={`tel:${cleanPhone}`} className="flex items-center gap-2 text-sm font-bold" style={{ color: scrolled ? t.textPrimary : 'white' }}><Phone className="h-4 w-4" />{config.phone}</a>
              <button onClick={scrollToQuote} className="px-5 py-2.5 text-sm font-bold text-white rounded transition-colors hover:shadow-[2px_2px_0_rgba(0,0,0,0.1)] hover:brightness-110" style={{ backgroundColor: action }}>{config.ctaPrimary}</button>
            </div>

            <button className="md:hidden" style={{ color: scrolled ? t.textPrimary : 'white' }} onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden border-t px-6 py-4" style={{ backgroundColor: t.cardBg, borderColor: t.border }}>
                <div className="flex flex-col gap-3">
                  {navLinks.map(l => <a key={l.href} href={l.href} className="py-2 font-semibold" style={{ color: t.textPrimary }} onClick={() => setMobileMenuOpen(false)}>{l.label}</a>)}
                  <button onClick={() => { scrollToQuote(); setMobileMenuOpen(false); }} className="mt-2 py-3 text-white font-bold rounded hover:brightness-110" style={{ backgroundColor: action }}>{config.ctaPrimary}</button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </header>

      {/* ═══════════════════════════════════════════════════════════════════════
          HERO - Full Background with Quote Form
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-[105vh] flex flex-col overflow-hidden -mt-[72px] pt-[120px]" style={{ minHeight: '108vh' }}>
        {/* Changed background to something more fence/construction related or generic structure */}
        <div className="absolute inset-0" aria-hidden="true">
          <NextImage
            src="/mcmillian/hero_background.jpeg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0" style={{ background: 'linear-gradient(90deg, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.85) 50%, rgba(0,0,0,0.75) 100%)' }} />
        <div className="absolute inset-0 bg-grid-white opacity-[0.03]" />

        <div className={`${shellClass} relative z-10 pt-32 pb-12 lg:py-0 flex-1 lg:flex lg:items-center`}>
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center w-full pb-20 lg:pb-0">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
              {/* Top Rated Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full" style={{ backgroundColor: accent }}>
                <div className="flex">{[1, 2, 3, 4, 5].map(n => <Star key={n} className="h-4 w-4 fill-amber-400 text-amber-400 drop-shadow-sm" />)}</div>
                <span className="text-[11px] font-bold uppercase tracking-widest font-mono text-white">Top Rated in {config.city}</span>
              </div>

              {/* Headline */}
              <div className="space-y-5">
                <h1 className="text-3xl font-black leading-[1.1] tracking-tight text-white md:text-4xl lg:text-6xl uppercase">
                  Houston&apos;s Affordable Junk Removal
                </h1>
                <p className="text-lg font-bold uppercase tracking-widest" style={{ color: action }}>
                  Fair Pricing. Fast Service. We Haul It All.
                </p>
                <p className="text-base leading-relaxed text-neutral-300 max-w-lg">
                  <span className="font-semibold text-white">{config.businessName}</span> provides affordable junk removal, demolition, and cleanout services for residential and commercial clients across Houston.
                </p>
                <p className="font-bold text-white uppercase tracking-wide text-sm">
                  Free estimates. We do the heavy lifting. Open 24/7.
                </p>
              </div>

              {/* Trust Stats */}
              <div className="flex flex-wrap gap-10 pt-2">
                <div><div className="text-3xl font-black text-white tracking-wide">24/7</div><div className="text-[11px] font-bold uppercase tracking-widest font-mono text-neutral-400">Always Available</div></div>
                <div><div className="text-3xl font-black tracking-wide" style={{ color: action }}>{ratingText}</div><div className="text-[11px] font-bold uppercase tracking-widest font-mono text-neutral-400">Star Rating</div></div>
                <div><div className="text-3xl font-black text-white tracking-wide">{reviewCount}+</div><div className="text-[11px] font-bold uppercase tracking-widest font-mono text-neutral-400">Happy Clients</div></div>
              </div>
            </motion.div>

            {/* Quote Form */}
            <motion.div id="quote-form" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="rounded-sm p-8 shadow-[2px_2px_0_rgba(0,0,0,0.1)] bg-white border-t-4" style={{ borderColor: action }}>
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl font-bold text-neutral-900">Get Your Free Estimate</h2>
                <ShieldCheck className="h-5 w-5 text-emerald-500" />
              </div>
              <p className="text-sm text-neutral-500 mb-6 font-medium">No obligation. 100% Secure.</p>
              <form className="space-y-4" action="/api/lead" method="POST" onSubmit={handleLeadSubmit}>
                {/* Honeypot fields - invisible to users, bots fill these */}
                <input type="text" name="website" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" aria-hidden="true" />
                <input type="text" name="company_url" style={{ position: 'absolute', left: '-9999px', top: '-9999px' }} tabIndex={-1} autoComplete="off" aria-hidden="true" />
                <input type="text" name="fax" style={{ opacity: 0, height: 0, width: 0, position: 'absolute' }} tabIndex={-1} autoComplete="off" aria-hidden="true" />
                <input type="text" name="address2" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />
                {/* Time-based validation - timestamp when form rendered */}
                <input type="hidden" name="_ts" value={formTimestamp} />
                <input type="hidden" name="page" value={pageUrl} />
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">Name *</label>
                    <input
                      required
                      name="name"
                      type="text"
                      placeholder="Your Name"
                      pattern="[A-Za-z\s\-']{2,50}"
                      title="Letters, spaces, and hyphens only (2-50 characters)"
                      className="w-full rounded-sm border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-900 invalid:border-red-300 focus:invalid:border-red-400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">Phone *</label>
                    <input
                      required
                      name="phone"
                      type="tel"
                      placeholder="(832) 555-0123"
                      value={phoneValue}
                      onChange={(e) => setPhoneValue(formatPhone(e.target.value))}
                      pattern="\(\d{3}\) \d{3}-\d{4}"
                      title="Please enter a valid 10-digit phone number"
                      className="w-full rounded-sm border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-900 invalid:border-red-300 focus:invalid:border-red-400"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">Address *</label>
                    <input
                      required
                      name="address"
                      type="text"
                      placeholder="Street Address"
                      className="w-full rounded-sm border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-900 invalid:border-red-300 focus:invalid:border-red-400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">Zip Code *</label>
                    <input
                      required
                      name="zipCode"
                      type="text"
                      placeholder="e.g. 77502"
                      pattern="\d{5}"
                      title="Please enter a valid 5-digit zip code"
                      className="w-full rounded-sm border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-900 invalid:border-red-300 focus:invalid:border-red-400"
                    />
                  </div>
                </div>
                <div><label className="block text-xs font-semibold text-neutral-700 mb-1">Service Needed *</label><select required name="service" className="w-full rounded-sm border border-neutral-200 px-4 py-3 text-sm bg-white text-neutral-900"><option value="">Select a service...</option>{[config.primaryService, ...services].map(s => <option key={s} value={s}>{s}</option>)}</select></div>
                <div><label className="block text-xs font-semibold text-neutral-700 mb-1">Project Details</label><textarea name="message" rows={3} placeholder="Describe what you need removed (e.g. old furniture, appliances, construction debris...)" className="w-full rounded-sm border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-900 resize-none" /></div>
                <button type="submit" disabled={formStatus === 'sending'} className="w-full rounded-sm py-4 text-base font-bold text-white shadow-[2px_2px_0_rgba(0,0,0,0.1)] disabled:opacity-70 transition-all hover:scale-[1.02] hover:shadow-orange-500/20" style={{ backgroundColor: action }}>
                  {formStatus === 'sending' ? 'Sending...' : 'Request Free Estimate'}
                </button>
                {formStatus === 'success' && (
                  <div role="status" className="rounded-sm border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700">
                    Thanks! We received your request and will reach out shortly.
                  </div>
                )}
                {formStatus === 'error' && (
                  <div role="alert" className="rounded-sm border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
                    {formError || 'Something went wrong. Please try again.'}
                  </div>
                )}
              </form>
              <div className="mt-6 flex items-center justify-center gap-3 pt-4 border-t border-neutral-100">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" /><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" /><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" /><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" /></svg>
                <div className="flex">{[1, 2, 3, 4, 5].map(n => <Star key={n} className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />)}</div>
                <span className="text-sm font-bold text-neutral-900">{ratingText}</span><span className="text-neutral-300">|</span><span className="text-sm font-medium text-neutral-500">{reviewCount}+ Google Reviews</span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scrolling Reviews Ticker - Liquid Glass Effect */}
        <div className="absolute bottom-0 left-0 right-0 z-20 w-full py-3 overflow-hidden" style={{ backgroundColor: '#111111' }}>

          <div className="flex animate-marquee whitespace-nowrap relative z-10">
            {config.testimonials.concat(config.testimonials).map((review, i) => (
              <div key={i} className="mx-8 flex items-center gap-3">
                <div className="flex">{[1, 2, 3, 4, 5].map(n => <Star key={n} className="h-3 w-3 fill-yellow-400 text-yellow-400" />)}</div>
                <span className="text-sm font-medium text-white">&ldquo;{review.highlight || review.quote}&rdquo;</span>
                <span className="text-sm font-medium" style={{ color: action }}>- {review.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* marquee animation defined in globals.css */}

      {/* ═══════════════════════════════════════════════════════════════════════
          ORIGINAL SECTIONS BELOW (Stats, Why Us, Services, etc.)
      ═══════════════════════════════════════════════════════════════════════ */}

      {/* Quick Info / At a Glance — compact SEO-rich info strip */}
      <section className="py-12 border-t border-b" style={{ backgroundColor: t.surfaceBg, borderColor: t.border }}>
        <div className={shellClass}>
          {/* Premium Quick Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-14">
            {[
              { label: 'Always Available', value: '24/7', sub: 'Call us anytime', icon: <Clock className="h-6 w-6" style={{ color: accent }} /> },
              { label: 'Free Estimates', value: '$0', sub: 'No hidden fees', icon: <ClipboardList className="h-6 w-6" style={{ color: accent }} /> },
              { label: 'Top Rated', value: ratingText, sub: `${reviewCount}+ 5-star reviews`, icon: <Star className="h-6 w-6" style={{ color: accent }} fill={accent} /> },
              { label: 'Fair Pricing', value: '100%', sub: 'Guaranteed satisfaction', icon: <Award className="h-6 w-6" style={{ color: accent }} /> },
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center md:items-start text-center md:text-left">
                <div className="flex items-center justify-center h-12 w-12 rounded-full mb-4" style={{ backgroundColor: `${action}15` }}>
                  {stat.icon}
                </div>
                <div className="text-3xl font-black tracking-tight leading-none mb-1.5" style={{ color: t.textPrimary }}>
                  {stat.value}
                </div>
                <div className="text-xs font-black uppercase tracking-widest mb-1.5" style={{ color: t.textPrimary }}>
                  {stat.label}
                </div>
                <div className="text-sm font-medium" style={{ color: t.textSecondary }}>
                  {stat.sub}
                </div>
              </div>
            ))}
          </div>

          {/* High-End Accepted Payments Trust Badge */}
          <div className="mb-12 w-full px-6 py-5 rounded-sm border border-neutral-200 bg-white shadow-sm flex flex-col md:flex-row items-center justify-between gap-6" style={{ borderTop: `4px solid ${action}` }}>
            <div className="flex items-center gap-3">
              <ShieldCheck className="h-6 w-6 text-emerald-600" />
              <div>
                <div className="text-sm font-black uppercase tracking-widest text-neutral-900 leading-none mb-1">
                  100% Secure Payments
                </div>
                <div className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">
                  Flexible options accepted
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
              {[
                { name: 'Credit Card', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></svg> },
                { name: 'Zelle', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="M17 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2z"></path><line x1="12" y1="7" x2="12" y2="17"></line><polyline points="9 10 12 7 15 10"></polyline></svg> },
                { name: 'Cash App', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg> },
                { name: 'Venmo', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg> },
                { name: 'Cash', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><rect x="2" y="6" width="20" height="12" rx="2"></rect><circle cx="12" cy="12" r="2"></circle><path d="M6 12h.01M18 12h.01"></path></svg> }
              ].map(method => (
                <div key={method.name} className="flex items-center gap-2 font-bold text-[13px] text-neutral-800 uppercase tracking-widest">
                  <span className="text-neutral-400">{method.icon}</span>
                  {method.name}
                </div>
              ))}
            </div>
          </div>

          {/* New Info Row - Clean Typography & Bullet Points */}
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center lg:items-start w-full">
            {/* Left — SEO-rich description and lists */}
            <div className="flex-1 w-full">
              <h2 className="text-2xl md:text-3xl font-black tracking-tight uppercase mb-5" style={{ color: t.textPrimary }}>
                Houston's Trusted Junk Removal
              </h2>
              <p className="text-base leading-relaxed mb-10 max-w-2xl" style={{ color: t.textSecondary }}>
                McMillian Junk Removal is your local, top-rated team for affordable junk removal, demolition, and comprehensive cleanouts. From single appliance pickups to full property hoarder cleanouts, our professional crews handle the heavy lifting safely and responsibly with clear, transparent pricing and no hidden fees.
              </p>

              <div className="grid md:grid-cols-2 gap-8 md:gap-12">
                {/* Services Column */}
                <div>
                  <h3 className="text-sm font-black uppercase tracking-widest mb-4 flex items-center gap-2 pb-3 border-b" style={{ color: t.textPrimary, borderColor: t.border }}>
                    <Hammer className="h-4 w-4" style={{ color: accent }} /> Core Services
                  </h3>
                  <ul className="space-y-3.5">
                    {['Junk Removal', ...services].map(svc => (
                      <li key={svc} className="flex items-center gap-3 text-sm font-bold text-neutral-700">
                        <ArrowRight className="h-3.5 w-3.5 shrink-0" style={{ color: action }} />
                        {svc}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Areas Column */}
                <div>
                  <h3 className="text-sm font-black uppercase tracking-widest mb-4 flex items-center gap-2 pb-3 border-b" style={{ color: t.textPrimary, borderColor: t.border }}>
                    <ShieldCheck className="h-4 w-4" style={{ color: accent }} /> Areas Served
                  </h3>
                  <ul className="grid grid-cols-2 gap-y-3.5 gap-x-4">
                    {serviceAreaCities.map(city => (
                      <li key={city} className="flex items-center gap-2.5 text-sm font-semibold text-neutral-600">
                        <div className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: action }} />
                        {city}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Right — Impactful CTA Module */}
            <div className="w-full lg:w-[380px] shrink-0">
              <div className="rounded-xl overflow-hidden relative shadow-[0_8px_30px_rgb(0,0,0,0.08)] bg-white border" style={{ borderColor: t.border }}>
                <div className="h-1.5 w-full" style={{ backgroundColor: accent }} />
                <div className="p-8 pb-6 flex flex-col items-center text-center">
                  <div className="h-14 w-14 rounded-full flex items-center justify-center mb-5" style={{ backgroundColor: `${action}15` }}>
                    <Phone className="h-6 w-6" style={{ color: accent }} />
                  </div>
                  <h3 className="text-xl font-black uppercase tracking-tight text-neutral-900 mb-3">Need Service Now?</h3>
                  <p className="text-sm text-neutral-500 font-medium mb-8">Call directly for an instant, free estimate. Same-day service available in most areas.</p>

                  <a href={`tel:${cleanPhone}`} className="w-full relative group overflow-hidden rounded-sm text-white font-black text-lg py-4 px-6 flex items-center justify-center gap-3 transition-transform hover:scale-[1.02] shadow-[2px_2px_0_rgba(0,0,0,0.1)] active:scale-95" style={{ backgroundColor: accent }}>
                    <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
                    <Phone className="h-5 w-5 fill-white" />
                    {config.phone}
                  </a>
                </div>
                <div className="bg-neutral-50 border-t px-6 py-4 flex items-center justify-center gap-2" style={{ borderColor: t.border }}>
                  <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                  <span className="text-xs font-bold text-neutral-700 uppercase tracking-wider">{ratingText} Average on Google</span>
                </div>
              </div>
            </div>
          </div>

          {/* SEO keyword footer */}
          <p className="mt-6 text-[9px] leading-relaxed font-mono uppercase tracking-wider" style={{ color: t.textMuted, opacity: 0.5 }}>
            Junk Removal Houston TX • Affordable Junk Hauling Near Me • Demolition Services Houston • Hoarder House Cleanout Houston TX • Appliance Removal Houston • Construction Debris Removal • Junk Removal Harris County • Junk Removal Sugar Land TX • Junk Removal Cypress TX • Junk Removal Fort Bend County • Same Day Junk Removal • Estate Cleanout Houston • Furniture Removal Houston • Garage Cleanout Houston TX
          </p>
        </div>
      </section>
      {/* Services */}
      <section id="services" className="relative pt-20 pb-28 scroll-mt-20 overflow-hidden" style={{ backgroundColor: '#fafafa' }}>
        {/* Faint Wrench/Pipe Decorative Background */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] opacity-[0.03] pointer-events-none translate-x-1/3 -translate-y-1/4" aria-hidden="true">
          <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: '#dc2626' }}>
            <circle cx="50" cy="50" r="45" />
            <circle cx="50" cy="50" r="30" />
            <circle cx="50" cy="50" r="15" />
            <line x1="5" y1="50" x2="95" y2="50" />
            <line x1="50" y1="5" x2="50" y2="95" />
          </svg>
        </div>

        {/* Floating Pipe Shapes */}
        <div className="absolute top-20 left-10 w-16 h-16 opacity-[0.04] rotate-45 pointer-events-none" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" style={{ color: accent }}><path d="M6 12h12M12 6v12M3 12a9 9 0 0 1 18 0" /></svg>
        </div>
        <div className="absolute bottom-40 right-20 w-24 h-24 opacity-[0.03] -rotate-12 pointer-events-none" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" style={{ color: '#dc2626' }}><rect x="2" y="6" width="20" height="4" rx="1" /><rect x="6" y="10" width="4" height="8" rx="1" /><rect x="14" y="10" width="4" height="8" rx="1" /></svg>
        </div>

        <div className={`${shellClass} relative z-10`}>
          <div className="text-center mb-10">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] font-mono mb-4" style={{ color: accent }}>Our Expertise</p>
            <h2 className="text-3xl font-black md:text-4xl lg:text-5xl tracking-tight" style={{ color: t.textPrimary }}>Professional Junk Removal Services</h2>
            <p className="mt-4 text-base md:text-lg max-w-3xl mx-auto" style={{ color: t.textSecondary }}>
              Trusted experts serving {config.city} and surrounding areas. Same-day service available. Free estimates on every job.
            </p>
          </div>

          <motion.div variants={staggerSoft} initial="initial" whileInView="animate" viewport={{ once: true, amount: 0.15 }} className="grid gap-8 lg:grid-cols-2">
            {allServices.map((service) => (
              <motion.article key={service.name} variants={fadeInUp} className="group flex flex-col overflow-hidden rounded-sm bg-white shadow-none hover:shadow-[2px_2px_0_rgba(0,0,0,0.1)] transition-all duration-300 hover:-translate-y-1" style={{ borderTop: `4px solid ${accent}` }}>
                <div className="aspect-[16/10] w-full relative overflow-hidden flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #111111 0%, #1a1a1a 100%)' }}>
                  {service.image === '?' ? (
                    <div className="text-[120px] font-black text-neutral-800/80 drop-shadow-sm select-none transition-transform duration-500 group-hover:scale-110">?</div>
                  ) : (
                    <NextImage
                      src={service.image}
                      alt={service.alt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
                  <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3">
                    <h3 className="text-xl md:text-2xl font-black leading-tight text-white drop-shadow-none">{service.name}</h3>
                    <span className="shrink-0 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-white bg-black/45 border border-white/25">
                      {service.turnaround}
                    </span>
                  </div>
                </div>
                <div className="p-6 md:p-7 flex flex-col gap-4 flex-1">
                  <p className="text-base leading-relaxed" style={{ color: t.textSecondary }}>{service.desc}</p>
                  <p className="text-sm leading-relaxed" style={{ color: t.textMuted }}>
                    <span className="font-bold" style={{ color: t.textPrimary }}>Best for:</span> {service.bestFor}
                  </p>
                  <ul className="space-y-2">
                    {service.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-start gap-2 text-sm" style={{ color: t.textSecondary }}>
                        <Check className="h-4 w-4 mt-0.5 shrink-0" style={{ color: accent }} />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto pt-3 border-t" style={{ borderColor: t.border }}>
                    <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: t.textMuted }}>
                      Professional on-site assessment included
                    </p>
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>

          {/* Need Help Choosing - Accent Section */}
          <div className="mt-10 rounded-sm p-8 md:p-10 relative overflow-hidden" style={{ backgroundColor: '#111111' }}>
            {/* Construction stripe accents */}
            <div className="absolute top-0 left-0 right-0 h-1" style={{ backgroundColor: action }} />
            <div className="absolute bottom-0 left-0 right-0 h-1" style={{ backgroundColor: action }} />

            <div className="relative z-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm font-black uppercase tracking-widest mb-2" style={{ color: accent }}>Not Sure What Service You Need?</p>
                <p className="text-lg font-medium text-white max-w-xl leading-relaxed">Tell us what you need gone and we will recommend the fastest, most affordable approach.</p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center shrink-0">
                <button type="button" className="px-8 py-4 rounded-sm text-sm font-black uppercase tracking-wide flex items-center justify-center gap-2 transition-all hover:scale-105" style={{ backgroundColor: accent, color: 'white' }} onClick={scrollToQuote}>
                  Request Estimate
                  <ArrowRight className="h-4 w-4" />
                </button>
                <a
                  href={`tel:${cleanPhone}`}
                  className="px-8 py-4 rounded-sm text-sm font-black uppercase tracking-wide flex items-center justify-center gap-2 transition-all border-2 border-white/30 hover:bg-white/10 text-white"
                >
                  <Phone className="h-4 w-4" />
                  {config.phone}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="why-us" className="relative scroll-mt-20 py-28 overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0" aria-hidden="true">
          <NextImage src="/mcmillian/why_background.jpeg" alt="" fill sizes="100vw" className="object-cover" />
        </div>
        <div className="absolute inset-0 bg-black/85" />
        <div className="absolute inset-0 bg-grid-white opacity-[0.03]" />

        <div className={`${shellClass} relative z-10`}>
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Left - Image */}
            <div className="relative">
              <div className="rounded-sm overflow-hidden shadow-[4px_4px_0_rgba(0,0,0,0.1)]">
                <div className="aspect-[4/3] relative">
                  <NextImage
                    src="/mcmillian/why_us.jpeg"
                    alt="McMillian Junk Removal crew working"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
                {/* Stats overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
                  <div className="flex gap-8">
                    <div>
                      <div className="text-3xl font-black text-white">30+</div>
                      <div className="text-xs text-gray-300 font-medium line-clamp-2">5-Star<br />Google Reviews</div>
                    </div>
                    <div>
                      <div className="text-3xl font-black text-white">24/7</div>
                      <div className="text-xs text-gray-300 font-medium">Available Daily</div>
                    </div>
                    <div>
                      <div className="text-3xl font-black text-white">{config.rating}</div>
                      <div className="text-xs text-gray-300 font-medium flex items-center gap-1">
                        <Star className="h-3 w-3 fill-orange-400 text-orange-400" /> Google Rating
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Decorative accent behind image */}
              <div className="absolute -bottom-4 -right-4 w-full h-full rounded-sm -z-10" style={{ border: `2px solid ${action}`, opacity: 0.2 }} />
            </div>

            {/* Right - Content */}
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] font-mono mb-4" style={{ color: action }}>Why McMillian Junk Removal</p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight mb-4 text-white">
                Affordable. Reliable.
              </h2>
              <h3 className="text-2xl md:text-3xl font-black tracking-tight mb-6 text-neutral-400 uppercase">
                Fair Pricing Always.
              </h3>
              <div className="text-base mb-10 leading-relaxed max-w-lg text-neutral-300 border-l-4 border-red-500 pl-5 py-3 bg-red-500/10 rounded-sm">
                <p className="italic font-medium mb-3 text-neutral-200">
                  {"\"I believe everyone deserves a fair price. I've seen too many companies take advantage of people. That's not how I do business. We give you an honest quote and do the job right.\""}
                </p>
                <div className="font-bold text-white uppercase tracking-widest text-[11px] font-mono">
                  — Andre McMillian, Owner
                </div>
              </div>

              <div className="space-y-3">
                {benefits.map((benefit) => (
                  <div key={benefit} className="flex items-center gap-4 p-4 rounded-sm backdrop-blur-sm transition-all hover:bg-white/15" style={{ backgroundColor: 'rgba(255,255,255,0.08)', borderLeft: `4px solid ${action}` }}>
                    <Check className="h-5 w-5 shrink-0" style={{ color: accent }} />
                    <span className="text-sm font-semibold text-white">{benefit}</span>
                  </div>
                ))}
              </div>

              <div className="mt-10 flex flex-col sm:flex-row gap-4 items-start">
                <button type="button" onClick={scrollToQuote} className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-sm text-black font-black uppercase tracking-wide text-sm transition-all hover:-translate-y-0.5 shadow-[2px_2px_0_rgba(0,0,0,0.1)] hover:shadow-yellow-500/30 w-full sm:w-auto" style={{ backgroundColor: action }}>
                  Request Free Estimate
                  <ArrowRight className="h-4 w-4" />
                </button>
                <a href={`tel:${cleanPhone}`} className="inline-flex items-center justify-center gap-2 rounded-sm px-8 py-4 text-sm font-black uppercase tracking-wide text-white border-2 border-neutral-600 hover:border-red-500 hover:text-red-500 transition-all w-full sm:w-auto">
                  <Phone className="h-4 w-4" />
                  {config.phone}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Promise Bar - Construction Zone */}
      <section className="py-10 relative z-20" style={{ backgroundColor: '#111111' }}>
        <div className="absolute top-0 left-0 right-0 h-1" style={{ backgroundColor: action }} />
        <div className="absolute bottom-0 left-0 right-0 h-1" style={{ backgroundColor: action }} />
        <div className={shellClass}>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 text-center">
            <ShieldCheck className="h-10 w-10 shrink-0" style={{ color: accent }} />
            <p className="text-xl md:text-2xl font-black text-white uppercase tracking-tight leading-none">
              We never overcharge. You get honest, <span style={{ color: accent }}>upfront pricing</span> before we start any job.
            </p>
          </div>
        </div>
      </section>

      {/* Process - Professional Steps */}
      <section className="relative overflow-hidden pt-24 pb-28" style={{ backgroundColor: '#ffffff' }}>
        <div className="absolute inset-x-0 top-0 h-16" style={{ background: 'linear-gradient(180deg, rgba(17,17,17,0.06) 0%, rgba(255,255,255,0) 100%)' }} />
        <div className="absolute top-0 left-0 w-[520px] h-[520px] opacity-[0.18] pointer-events-none -translate-x-1/2 -translate-y-1/2" aria-hidden="true">
          <svg viewBox="0 0 400 400" fill="none" stroke="#cbd5e1" strokeWidth="1">
            <circle cx="200" cy="200" r="45" /><circle cx="200" cy="200" r="85" /><circle cx="200" cy="200" r="130" /><circle cx="200" cy="200" r="180" />
          </svg>
        </div>

        <div className={`${shellClass} relative z-10`}>
          <div className="mb-14 text-center">
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.2em] font-mono" style={{ color: accent }}>How It Works</p>
            <h2 className="text-4xl font-black md:text-5xl tracking-tight" style={{ color: t.textPrimary }}>Simple Process. Clean Results.</h2>
            <p className="mt-4 text-base md:text-lg font-medium max-w-2xl mx-auto leading-relaxed" style={{ color: t.textSecondary }}>
              From first call to final haul, every step is designed to keep your property clean and the process hassle-free.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {steps.map((step, index) => {
              const Icon = [ClipboardList, Hammer, Check][index];
              return (
                <article key={step.title} className="group rounded-sm border bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[2px_2px_0_rgba(0,0,0,0.1)]" style={{ borderColor: t.border }}>
                  <div className="mb-5 flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-sm border transition-colors" style={{ borderColor: `${accent}44`, backgroundColor: `${accent}12`, color: accent }}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: t.textMuted }}>Step 0{index + 1}</span>
                  </div>
                  <h3 className="text-xl font-black tracking-tight" style={{ color: t.textPrimary }}>{step.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed" style={{ color: t.textSecondary }}>{step.body}</p>
                </article>
              );
            })}
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none" aria-hidden="true">
          <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="h-full w-full">
            <path d="M0,70 C180,120 360,10 540,52 C720,94 900,14 1080,52 C1260,90 1360,65 1440,78 L1440,120 L0,120 Z" fill="#faf8f5" />
          </svg>
        </div>
      </section>



      {/* Project Showcase */}
      <section id="work" className="pb-24 pt-16 overflow-hidden relative" style={{ backgroundColor: '#ffffff' }}>
        <div className="absolute inset-0 bg-grid-neutral-900 opacity-[0.02]" />
        <div className={`${shellClass} relative z-10`}>
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] font-mono mb-2" style={{ color: accent }}>Our Portfolio</p>
              <h2 className="text-4xl font-black md:text-5xl uppercase tracking-tight" style={{ color: t.textPrimary }}>Recent Projects</h2>
            </div>
            {/* Gallery Buttons */}
            <div className="hidden md:flex gap-3">
              <button
                onClick={() => scrollGallery('left')}
                className="h-10 w-10 flex items-center justify-center rounded-full border border-neutral-200 bg-white shadow-sm hover:bg-neutral-50 transition-colors"
                aria-label="Scroll left"
              >
                <ChevronLeft className="h-5 w-5 text-neutral-600" />
              </button>
              <button
                onClick={() => scrollGallery('right')}
                className="h-10 w-10 flex items-center justify-center rounded-full border border-neutral-200 bg-white shadow-sm hover:bg-neutral-50 transition-colors"
                aria-label="Scroll right"
              >
                <ChevronRight className="h-5 w-5 text-neutral-600" />
              </button>
            </div>
          </div>

          {/* Gallery Carousel Window */}
          <div
            ref={galleryRef}
            className="flex overflow-x-auto pb-8 -mx-4 px-4 gap-6 snap-x snap-mandatory hide-scrollbar sm:mx-0 sm:px-0"
            style={{
              scrollbarWidth: 'none', /* Firefox */
              msOverflowStyle: 'none'  /* IE and Edge */
            }}
          >
            {recentJobs.map((job, i) => (
              <div
                key={`${job.title}-${i}`}
                className="min-w-[85%] sm:min-w-[calc(50%-12px)] lg:min-w-[calc(33.333%-16px)] snap-start flex-none"
              >
                <ProjectCard
                  {...job}
                  accentColor={accent}
                  actionColor={action}
                />
              </div>
            ))}
          </div>
          <style dangerouslySetInnerHTML={{
            __html: `
            .hide-scrollbar::-webkit-scrollbar {
              display: none;
            }
          `}} />
        </div>
      </section>

      {/* Reviews Section */}
      <section id="proof" className="relative py-24 overflow-hidden" style={{ borderTop: 'none', borderBottom: 'none' }}>
        <div className="absolute top-0 left-0 right-0 h-1.5 z-20" style={{ backgroundColor: action }} />
        <div className="absolute bottom-0 left-0 right-0 h-1.5 z-20" style={{ backgroundColor: action }} />
        <div className="absolute inset-0" aria-hidden="true">
          <NextImage
            src="/mcmillian/reviews.jpeg"
            alt="Customer Reviews Background"
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-black/85" />
        <div className="absolute inset-0 bg-grid-white opacity-[0.03]" />

        <div className={`${shellClass} relative z-10`}>
          <div className="flex flex-col items-center justify-center text-center mb-16">
            <div className="flex items-center gap-3 mb-4 bg-white/10 backdrop-blur-md px-6 py-3 rounded-full border border-white/10">
              <GoogleLogo className="h-5 w-5" />
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map(n => <Star key={n} className="h-5 w-5 fill-yellow-400 text-yellow-400" />)}
              </div>
              <span className="text-white font-bold ml-1.5 pt-0.5">5.0</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4">Customer Reviews</h2>
            <p className="text-neutral-400 text-lg max-w-2xl">See what residential and commercial clients in {config.city} and nearby areas are saying about our affordable pricing and reliable service.</p>
          </div>

          <div className="relative">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {(() => {
                const currentReviews = config.testimonials.slice(reviewPage * 6, (reviewPage + 1) * 6);
                const paddedReviews: (typeof currentReviews[0] | null)[] = [...currentReviews];
                while (paddedReviews.length < 6) {
                  paddedReviews.push(null);
                }
                return paddedReviews.map((testimonial, idx) => {
                  if (!testimonial) {
                    return <div key={`empty-${idx}`} className="hidden md:block opacity-0 pointer-events-none min-h-[220px] invisible" />;
                  }
                  return (
                    <div key={`${testimonial.name}-${idx}`} className="flex flex-col h-full bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md p-6 rounded-sm shadow-[4px_4px_0_rgba(0,0,0,0.1)] border-t-4 hover:-translate-y-1 transition-transform duration-300 border-x border-b border-white/5 relative group" style={{ borderTopColor: ['#4285F4', '#34A853', '#FBBC05', '#EA4335'][idx % 4] }}>
                      <div className="absolute inset-0 bg-gradient-to-br from-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-sm pointer-events-none" />
                      <div className="flex items-start justify-between mb-4 relative z-10">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full flex items-center justify-center font-bold text-white text-lg shadow-[2px_2px_0_rgba(0,0,0,0.1)]" style={{ backgroundColor: ['#EF4444', '#F59E0B', '#10B981', '#3B82F6', '#8B5CF6'][idx % 5] }}>
                            {testimonial.name.charAt(0)}
                          </div>
                          <div>
                            <div className="font-bold text-white text-sm">{testimonial.name}</div>
                            <div className="text-xs text-white/60">
                              {testimonial.localGuide && 'Local Guide \u00B7 '}
                              {testimonial.reviewCount || 1} {testimonial.reviewCount === 1 ? 'review' : 'reviews'}
                            </div>
                          </div>
                        </div>
                        <GoogleLogo className="h-5 w-5 opacity-80" />
                      </div>
                      <div className="flex gap-1 mb-3 relative z-10">
                        {[0, 1, 2, 3, 4].map(i => (
                          <Star key={i} className="h-4 w-4 drop-shadow-sm text-[#FBBC05] fill-[#FBBC05]" />
                        ))}
                      </div>
                      <p className="text-sm text-neutral-200 leading-relaxed font-medium relative z-10">
                        &ldquo;{testimonial.quote}&rdquo;
                      </p>
                    </div>
                  );
                });
              })()}
            </div>

            {config.testimonials.length > 6 && (
              <div className="flex items-center justify-center gap-6 mt-14">
                <button
                  onClick={() => setReviewPage(p => Math.max(0, p - 1))}
                  disabled={reviewPage === 0}
                  className="p-3 rounded-full bg-white/10 text-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/20 transition-all focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  aria-label="Previous Reviews"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <div className="flex gap-2">
                  {Array.from({ length: Math.ceil(config.testimonials.length / 6) }).map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setReviewPage(i)}
                      className={`h-2.5 rounded-full transition-all duration-300 ${i === reviewPage ? 'w-8 bg-yellow-400' : 'w-2.5 bg-white/30 hover:bg-white/50'}`}
                      aria-label={`Go to review page ${i + 1}`}
                    />
                  ))}
                </div>
                <button
                  onClick={() => setReviewPage(p => Math.min(Math.ceil(config.testimonials.length / 6) - 1, p + 1))}
                  disabled={reviewPage === Math.ceil(config.testimonials.length / 6) - 1}
                  className="p-3 rounded-full bg-white/10 text-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/20 transition-all focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  aria-label="Next Reviews"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-16 scroll-mt-20" style={{ borderTop: `3px solid ${t.border}`, backgroundColor: '#fff' }}>
        <div className={shellClass}>
          <div className="grid gap-10 md:grid-cols-[0.4fr_0.6fr] md:items-start">
            <div className="md:sticky md:top-24">
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] mb-3" style={{ color: accent }}>FAQ</p>
              <h2 className="text-2xl font-bold md:text-3xl" style={{ color: t.textPrimary }}>Common Questions</h2>
              <p className="mt-3 text-sm leading-relaxed" style={{ color: t.textMuted }}>Still have questions? Call us directly.</p>
              <a href={`tel:${cleanPhone}`} className="mt-5 inline-flex items-center gap-2 rounded-sm px-5 py-2.5 text-sm font-semibold text-white shadow-none transition-all hover:shadow-[2px_2px_0_rgba(0,0,0,0.1)] hover:scale-[1.02]" style={{ backgroundColor: action, boxShadow: `0 4px 12px ${action}30` }}><Phone className="h-4 w-4" />{config.phone}</a>
            </div>
            <div className="space-y-3">
              {config.faqs.map((faq, i) => (
                <details key={faq.q} className="group rounded-sm transition-all open:shadow-none" style={{ backgroundColor: '#f8fafc', border: `1px solid ${t.border}` }} open={i === 0}>
                  <summary className="flex cursor-pointer list-none items-center justify-between p-5 text-sm font-semibold transition-colors" style={{ color: t.textPrimary }}>
                    {faq.q}
                    <span className="ml-3 flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-all duration-200 group-open:rotate-45" style={{ backgroundColor: `${accent}15`, color: accent }}><span className="text-base leading-none font-medium">+</span></span>
                  </summary>
                  <div className="px-5 pb-5 text-sm leading-relaxed" style={{ color: t.textSecondary }}>{faq.a}</div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Construction Zone */}
      <section id="home-cta" className="py-16 relative" style={{ backgroundColor: '#111111' }}>
        <div className="absolute top-0 left-0 right-0 h-1.5" style={{ backgroundColor: action }} />
        <div className={`${shellClass} flex flex-col gap-6 md:flex-row md:items-center md:justify-between`}>
          <div>
            <h2 className="text-3xl font-black tracking-tight text-white md:text-5xl uppercase">
              Get Your <span style={{ color: accent }}>Free</span> Junk Removal Estimate
            </h2>
            <p className="mt-3 text-lg font-semibold text-white/95">
              Junk removal, demolition, hoarder cleanouts, and more — done right and priced fair.
            </p>
            <p className="mt-2 text-sm font-mono tracking-widest uppercase text-white/70">
              Serving Harris County, Galveston County, Sugar Land, Fort Bend, and Cypress 24/7.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-shrink-0">
            <button
              type="button"
              className="rounded-sm px-8 py-4 text-base font-black uppercase tracking-wide transition-all hover:scale-[1.02]"
              style={{ backgroundColor: accent, color: 'white' }}
              onClick={scrollToQuote}
            >
              {config.ctaPrimary}
            </button>
            <a
              href={`tel:${cleanPhone}`}
              className="inline-flex items-center justify-center gap-2 rounded-sm px-8 py-4 text-base font-black uppercase tracking-wide text-white transition-all hover:bg-white/10"
              style={{ border: '2px solid white' }}
            >
              <Phone className="h-5 w-5" />
              {config.phone}
            </a>
          </div>
        </div>
      </section>

      <footer className="relative z-10 font-sans text-neutral-300" style={{ backgroundColor: '#111111' }}>
        {/* Top accent stripe */}
        <div className="h-1" style={{ backgroundColor: action }} />

        {/* Main footer content */}
        <div className={`${shellClass} py-16`}>
          <div className="grid gap-14 lg:grid-cols-[1.3fr_1fr_1fr]">

            {/* LEFT: Brand & Description */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <NextImage
                  src="/mcmillian/mcmill-logo.png"
                  alt="McMillian Junk Removal Logo"
                  width={734}
                  height={1068}
                  unoptimized
                  className="h-14 w-auto object-contain"
                />
                <div>
                  <div className="text-lg font-black uppercase tracking-tight leading-none text-white">McMILLIAN</div>
                  <div className="text-lg font-black uppercase tracking-tight leading-none" style={{ color: action }}>JUNK REMOVAL</div>
                </div>
              </div>
              <p className="max-w-sm text-sm leading-relaxed text-neutral-400">
                Houston&apos;s trusted junk removal company. Affordable pricing, reliable crews, and a commitment to leaving your space clean and clutter-free.
              </p>
              <div className="flex items-center gap-5 pt-1">
                <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-neutral-500">
                  <ShieldCheck className="h-4 w-4 text-red-500" />
                  <span>Licensed &amp; Insured</span>
                </div>
                <span className="h-3 w-px bg-neutral-700" />
                <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-neutral-500">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span>Top Rated</span>
                </div>
              </div>
            </div>

            {/* MIDDLE: Services & Areas side by side */}
            <div className="grid grid-cols-2 gap-8 lg:gap-10">
              {/* Services */}
              <div>
                <h4 className="mb-5 text-[11px] font-black uppercase tracking-[0.15em] text-white">Services</h4>
                <ul className="space-y-3 text-sm text-neutral-400">
                  {[
                    'Junk Removal',
                    'Demolition',
                    'Hoarder Cleanouts',
                    'Storage Clean Out',
                    'Appliance Removal',
                    'Construction Cleanup',
                  ].map(item => (
                    <li key={item}>
                      <a href="#services" className="transition-colors hover:text-white">{item}</a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Service Areas */}
              <div>
                <h4 className="mb-5 text-[11px] font-black uppercase tracking-[0.15em] text-white">Areas We Serve</h4>
                <ul className="space-y-3 text-sm text-neutral-400">
                  {[
                    'Harris County',
                    'Galveston County',
                    'Sugar Land',
                    'Fort Bend',
                    'Cypress',
                    'Greater Houston',
                  ].map(area => (
                    <li key={area} className="transition-colors hover:text-white">{area}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* RIGHT: Contact */}
            <div className="space-y-5">
              <h4 className="text-[11px] font-black uppercase tracking-[0.15em] text-white">Get In Touch</h4>

              <a href={`tel:${cleanPhone}`} className="flex items-center gap-3 group">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-600 shrink-0">
                  <Phone className="h-4 w-4 text-white" />
                </div>
                <div>
                  <div className="text-xl font-black text-white group-hover:text-red-400 transition-colors">{config.phone}</div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">Available 24/7</div>
                </div>
              </a>

              <a href={`mailto:${config.email}`} className="flex items-center gap-3 group">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 border border-white/10 shrink-0">
                  <svg className="h-4 w-4 text-neutral-400 group-hover:text-white transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
                </div>
                <div>
                  <div className="text-sm font-semibold text-neutral-300 group-hover:text-white transition-colors">{config.email}</div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">Email us anytime</div>
                </div>
              </a>

              <button
                onClick={scrollToQuote}
                className="group mt-2 w-full flex items-center justify-center gap-2 rounded py-3.5 text-xs font-black uppercase tracking-widest text-black transition-all hover:brightness-110"
                style={{ backgroundColor: action }}
              >
                Request Free Estimate
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </button>
            </div>

          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5">
          <div className={`${shellClass} py-5 flex flex-col items-center justify-between gap-3 text-[11px] text-neutral-600 md:flex-row`}>
            <p>&copy; {new Date().getFullYear()} {config.businessName}. All rights reserved.</p>
            <span className="flex items-center gap-1.5">
              Website by <a href="https://quicklaunchweb.us" target="_blank" rel="noopener noreferrer" className="text-neutral-500 hover:text-yellow-400 transition-colors font-semibold">QuickLaunchWeb</a>
            </span>
          </div>
        </div>
      </footer>

      <div className="fixed bottom-4 left-0 right-0 z-40 px-4 md:hidden">
        <div className="mx-auto flex max-w-md gap-3 rounded-sm p-3 shadow-[4px_4px_0_rgba(0,0,0,0.1)] backdrop-blur-md" style={{ backgroundColor: '#111111', border: `1px solid ${accent}` }}>
          <a href={`tel:${cleanPhone}`} className="flex flex-1 items-center justify-center gap-2 rounded px-3 py-3 text-sm font-black uppercase tracking-wide transition-all hover:bg-white/5 text-white"><Phone className="h-4 w-4 text-red-500" />Call</a>
          <button type="button" className="flex-1 rounded px-3 py-3 text-sm font-black text-white uppercase tracking-wide shadow-[2px_2px_0_rgba(0,0,0,0.1)] transition-all" style={{ backgroundColor: accent }} onClick={scrollToQuote}>Get Quote</button>
        </div>
      </div>

      {/* Lightbox Modal - Optimized */}


    </div>
  );
}



