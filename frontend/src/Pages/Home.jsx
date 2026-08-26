import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MessageCircle, Calendar, Hospital, Pill, Box, Map,
  ArrowRight, Shield, Clock, Users, Star, ChevronDown,
  HeartPulse, BrainCircuit, Stethoscope, Activity,
  BadgeCheck, Zap, Globe, TrendingUp
} from 'lucide-react';

/* ─── Animated counter hook ─────────────────────────────── */
function useCounter(end, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [end, duration, start]);
  return count;
}

/* ─── Stats section with animated counters ──────────────── */
function StatsSection() {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const patients = useCounter(50000, 2000, visible);
  const doctors  = useCounter(1200,  2000, visible);
  const hospitals= useCounter(350,   2000, visible);
  const rating   = useCounter(98,    2000, visible);

  const stats = [
    { value: patients, suffix: '+', label: 'Patients Served', icon: <Users className="w-7 h-7" />, color: 'from-violet-500 to-purple-600' },
    { value: doctors,  suffix: '+', label: 'Expert Doctors',  icon: <Stethoscope className="w-7 h-7" />, color: 'from-blue-500 to-cyan-600' },
    { value: hospitals,suffix: '+', label: 'Partner Hospitals',icon: <Hospital className="w-7 h-7" />, color: 'from-emerald-500 to-teal-600' },
    { value: rating,   suffix: '%', label: 'Satisfaction Rate',icon: <Star className="w-7 h-7" />, color: 'from-amber-500 to-orange-500' },
  ];

  return (
    <div ref={ref} className="home-stats-section">
      {stats.map((s, i) => (
        <div key={i} className="home-stat-card">
          <div className={`home-stat-icon bg-gradient-to-br ${s.color}`}>
            {s.icon}
          </div>
          <div className="home-stat-number">
            {s.value.toLocaleString()}{s.suffix}
          </div>
          <div className="home-stat-label">{s.label}</div>
        </div>
      ))}
    </div>
  );
}

/* ─── Main component ─────────────────────────────────────── */
const HomePage = () => {
  const navigate = useNavigate();
  const [heroVisible, setHeroVisible] = useState(false);
  const [activeRole, setActiveRole] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  /* Auto-rotate roles */
  useEffect(() => {
    const t = setInterval(() => setActiveRole(r => (r + 1) % 4), 3000);
    return () => clearInterval(t);
  }, []);

  const roles = ['Patients', 'Doctors', 'Hospitals', 'Admins'];
  const roleColors = ['text-violet-300', 'text-cyan-300', 'text-emerald-300', 'text-amber-300'];

  const features = [
    {
      title: 'Book Doctor Appointment',
      description: 'Search & schedule appointments with specialized healthcare professionals in seconds.',
      icon: <Calendar className="w-7 h-7" />,
      gradient: 'from-violet-500 to-purple-700',
      bg: 'bg-violet-50',
      badge: 'Patients',
    },
    {
      title: 'Hospital Bed Booking',
      description: 'Reserve hospital beds in real-time across our nationwide network of partner hospitals.',
      icon: <Hospital className="w-7 h-7" />,
      gradient: 'from-blue-500 to-cyan-600',
      bg: 'bg-blue-50',
      badge: 'Patients',
    },
    {
      title: 'AI Chat Support',
      description: 'Get instant answers to health queries with our Gemini-powered medical AI assistant.',
      icon: <BrainCircuit className="w-7 h-7" />,
      gradient: 'from-fuchsia-500 to-pink-600',
      bg: 'bg-fuchsia-50',
      badge: 'AI-Powered',
    },
    {
      title: 'Medicine Analyzer',
      description: 'Analyze medicines with real patient reviews, ratings, and safety warnings from drugs.com.',
      icon: <Pill className="w-7 h-7" />,
      gradient: 'from-emerald-500 to-teal-600',
      bg: 'bg-emerald-50',
      badge: 'Doctors',
    },
    {
      title: 'Inventory Management',
      description: 'Track and manage hospital medical inventory, stock levels, and equipment with ease.',
      icon: <Box className="w-7 h-7" />,
      gradient: 'from-amber-500 to-orange-500',
      bg: 'bg-amber-50',
      badge: 'Hospitals',
    },
    {
      title: 'Medicine Guidelines',
      description: 'Look up medicine usage, side effects, active ingredients, and safe alternatives instantly.',
      icon: <HeartPulse className="w-7 h-7" />,
      gradient: 'from-rose-500 to-red-600',
      bg: 'bg-rose-50',
      badge: 'Everyone',
    },
  ];

  const steps = [
    { step: '01', title: 'Create Account', desc: 'Sign up as a Patient, Doctor, Hospital, or Admin in under 60 seconds.', icon: <Users className="w-6 h-6" /> },
    { step: '02', title: 'Complete Profile', desc: 'Fill in your details and get verified to unlock all platform features.', icon: <BadgeCheck className="w-6 h-6" /> },
    { step: '03', title: 'Use Services', desc: 'Book appointments, manage inventory, chat with doctors, and more.', icon: <Zap className="w-6 h-6" /> },
    { step: '04', title: 'Stay Healthy', desc: 'Track your medical history, prescriptions, and health records — all in one place.', icon: <Activity className="w-6 h-6" /> },
  ];

  const testimonials = [
    {
      name: 'Priya Sharma',
      role: 'Patient',
      text: 'CareSpaceX made booking a hospital bed during an emergency so easy. I found an available bed within minutes. Truly life-saving!',
      rating: 5,
      avatar: 'PS',
      color: 'from-violet-500 to-purple-600',
    },
    {
      name: 'Dr. Rajesh Kumar',
      role: 'Cardiologist',
      text: 'The appointment management dashboard is incredibly intuitive. I can manage all my patients and prescriptions from a single screen.',
      rating: 5,
      avatar: 'RK',
      color: 'from-blue-500 to-cyan-600',
    },
    {
      name: 'City Medical Center',
      role: 'Hospital Admin',
      text: 'The inventory management system has reduced our medicine wastage by 40%. The real-time tracking is a game changer.',
      rating: 5,
      avatar: 'CM',
      color: 'from-emerald-500 to-teal-600',
    },
  ];

  return (
    <div className="home-wrapper">

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="home-hero">
        {/* Animated background blobs */}
        <div className="home-blob home-blob-1" />
        <div className="home-blob home-blob-2" />
        <div className="home-blob home-blob-3" />

        {/* Grid overlay */}
        <div className="home-grid-overlay" />

        <div className={`home-hero-content ${heroVisible ? 'home-hero-visible' : 'home-hero-hidden'}`}>
          {/* Badge */}
          <div className="home-hero-badge">
            <Shield className="w-4 h-4 text-violet-300" />
            <span>Trusted by 50,000+ patients across India</span>
          </div>

          {/* Headline */}
          <h1 className="home-hero-title">
            Healthcare{' '}
            <span className="home-hero-gradient">Reimagined</span>
            <br />
            for{' '}
            <span className={`home-hero-role ${roleColors[activeRole]}`}>
              {roles[activeRole]}
            </span>
          </h1>

          <p className="home-hero-sub">
            CareSpaceX is your all-in-one platform — book appointments, manage beds,
            track inventory, get AI-powered health support, and more.
          </p>

          {/* CTA Buttons */}
          <div className="home-hero-buttons">
            <button onClick={() => navigate('/signup')} className="home-btn-primary">
              Get Started Free
              <ArrowRight className="w-5 h-5" />
            </button>
            <button onClick={() => navigate('/login')} className="home-btn-secondary">
              Sign In
            </button>
          </div>

          {/* Trust badges */}
          <div className="home-trust-badges">
            {['HIPAA Compliant', 'AI-Powered', 'Razorpay Secured', '24/7 Support'].map((b, i) => (
              <span key={i} className="home-trust-badge">
                <BadgeCheck className="w-3.5 h-3.5 text-emerald-400" />
                {b}
              </span>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="home-scroll-indicator">
          <ChevronDown className="w-5 h-5 animate-bounce text-white/60" />
        </div>
      </section>

      {/* ── Stats ────────────────────────────────────────────── */}
      <section className="home-section home-section-stats">
        <StatsSection />
      </section>

      {/* ── Features ─────────────────────────────────────────── */}
      <section className="home-section">
        <div className="home-section-header">
          <span className="home-section-tag">Our Services</span>
          <h2 className="home-section-title">Everything You Need,<br />All in One Place</h2>
          <p className="home-section-sub">
            From booking appointments to AI-powered health assistance — CareSpaceX covers every aspect of modern healthcare.
          </p>
        </div>

        <div className="home-features-grid">
          {features.map((f, i) => (
            <div key={i} className="home-feature-card" onClick={() => navigate('/signup')}>
              <div className={`home-feature-icon bg-gradient-to-br ${f.gradient}`}>
                {f.icon}
              </div>
              <span className="home-feature-badge">{f.badge}</span>
              <h3 className="home-feature-title">{f.title}</h3>
              <p className="home-feature-desc">{f.description}</p>
              <div className="home-feature-link">
                Get Started <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── How It Works ─────────────────────────────────────── */}
      <section className="home-section home-hiw-section">
        <div className="home-hiw-bg" />
        <div className="home-section-header">
          <span className="home-section-tag" style={{ background: 'rgba(255,255,255,0.15)', color: '#fff' }}>How It Works</span>
          <h2 className="home-section-title" style={{ color: '#fff' }}>Up and Running<br />in 4 Simple Steps</h2>
          <p className="home-section-sub" style={{ color: 'rgba(255,255,255,0.75)' }}>
            Join thousands of healthcare professionals and patients already using CareSpaceX.
          </p>
        </div>

        <div className="home-steps-grid">
          {steps.map((s, i) => (
            <div key={i} className="home-step-card">
              <div className="home-step-number">{s.step}</div>
              <div className="home-step-icon">{s.icon}</div>
              <h3 className="home-step-title">{s.title}</h3>
              <p className="home-step-desc">{s.desc}</p>
              {i < steps.length - 1 && <div className="home-step-connector" />}
            </div>
          ))}
        </div>
      </section>

      {/* ── Testimonials ─────────────────────────────────────── */}
      <section className="home-section">
        <div className="home-section-header">
          <span className="home-section-tag">Testimonials</span>
          <h2 className="home-section-title">Loved by Patients,<br />Trusted by Doctors</h2>
        </div>

        <div className="home-testimonials-grid">
          {testimonials.map((t, i) => (
            <div key={i} className="home-testimonial-card">
              <div className="home-testimonial-stars">
                {[...Array(t.rating)].map((_, si) => (
                  <Star key={si} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="home-testimonial-text">"{t.text}"</p>
              <div className="home-testimonial-author">
                <div className={`home-testimonial-avatar bg-gradient-to-br ${t.color}`}>
                  {t.avatar}
                </div>
                <div>
                  <div className="home-testimonial-name">{t.name}</div>
                  <div className="home-testimonial-role">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className="home-cta-section">
        <div className="home-cta-blob-1" />
        <div className="home-cta-blob-2" />
        <div className="home-cta-content">
          <div className="home-cta-icon">
            <Globe className="w-10 h-10 text-violet-300" />
          </div>
          <h2 className="home-cta-title">Ready to Transform<br />Your Healthcare Experience?</h2>
          <p className="home-cta-sub">
            Join 50,000+ users already benefiting from CareSpaceX's intelligent healthcare platform.
          </p>
          <div className="home-hero-buttons">
            <button onClick={() => navigate('/signup')} className="home-btn-primary">
              Create Free Account
              <ArrowRight className="w-5 h-5" />
            </button>
            <button onClick={() => navigate('/login')} className="home-btn-outline">
              Already have an account? Sign In
            </button>
          </div>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────────── */}
      <footer className="home-footer">
        <div className="home-footer-inner">
          <div className="home-footer-brand">
            <img src="/image.png" alt="CareSpaceX" className="w-10 h-10 object-contain" />
            <span className="home-footer-name">CareSpaceX</span>
          </div>
          <p className="home-footer-copy">
            © 2025 CareSpaceX. Built with ❤️ by Adarsh Raj · All rights reserved.
          </p>
          <div className="home-footer-links">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Contact Us</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;