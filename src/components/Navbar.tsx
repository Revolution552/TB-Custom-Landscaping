import React, { useState, useEffect } from 'react';
import { Phone, Menu, X, Sparkles, ArrowRight, ShieldCheck, Hammer, MessageSquare } from 'lucide-react';
import { COMPANY_INFO } from '../data/landscapingData';

interface NavbarProps {
  onOpenQuoteModal: () => void;
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenQuoteModal, activeSection }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent background scrolling when mobile menu drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: 'Hardscaping', href: '#hardscaping' },
    { label: 'Vuba Stone (Resin)', href: '#vuba-stone', isSpecial: true },
    { label: 'Craftsmanship', href: '#craftsmanship' },
    { label: 'Secondary Services', href: '#secondary-services' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Service Areas', href: '#service-areas' },
    { label: 'Reviews', href: '#reviews' },
  ];

  return (
    <header
      id="main-header"
      className={`sticky top-0 z-40 transition-all duration-200 border-b w-full max-w-full ${
        isScrolled
          ? 'bg-[#0d1210]/95 backdrop-blur-md shadow-2xl border-white/10 py-2.5 sm:py-3.5'
          : 'bg-[#0d1210]/90 backdrop-blur-sm border-white/10 py-3 sm:py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo & Tagline */}
        <a href="#" className="flex items-center space-x-2.5 sm:space-x-3 group text-left min-h-[48px] py-1">
          <div className="w-10 h-10 rounded-sm bg-[#a3907c] flex items-center justify-center shadow-md group-hover:bg-white transition-colors shrink-0">
            <span className="font-display font-extrabold text-[#0d1210] text-lg tracking-wider">TB</span>
          </div>
          <div>
            <div className="flex items-center space-x-1.5 sm:space-x-2">
              <span className="font-display font-bold text-base sm:text-xl text-white tracking-tight leading-none uppercase">
                TB CUSTOM
              </span>
              <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.18em] font-bold text-[#a3907c]">
                LANDSCAPING
              </span>
            </div>
            <p className="text-[9px] sm:text-[10px] text-white/50 tracking-wider uppercase mt-1 flex items-center">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#a3907c] mr-1.5"></span>
              Hardscaping & Vuba Stone • Gloucester, VA
            </p>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-6 text-[11px] uppercase tracking-widest font-semibold text-white/70">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={`transition-colors py-2 relative min-h-[48px] flex items-center ${
                link.isSpecial
                  ? 'text-[#a3907c] font-bold hover:text-white'
                  : 'hover:text-[#a3907c]'
              }`}
            >
              {link.isSpecial && <Sparkles className="w-3.5 h-3.5 mr-1 text-[#a3907c]" />}
              {link.label}
              {link.isSpecial && (
                <span className="ml-1 text-[9px] uppercase px-1.5 py-0.5 bg-[#a3907c]/20 text-[#a3907c] rounded border border-[#a3907c]/40 font-bold">
                  Certified
                </span>
              )}
            </a>
          ))}
        </nav>

        {/* Right CTA Actions (Desktop) */}
        <div className="hidden md:flex items-center space-x-4">
          <a
            id="nav-direct-call-btn"
            href={`tel:${COMPANY_INFO.phoneRaw}`}
            className="flex items-center text-xs font-bold text-white/90 hover:text-[#a3907c] border-b border-[#a3907c]/60 pb-0.5 transition-colors min-h-[48px] px-2"
          >
            <Phone className="w-3.5 h-3.5 mr-1.5 text-[#a3907c]" />
            <span>{COMPANY_INFO.phone}</span>
          </a>

          <button
            id="nav-request-estimate-btn"
            onClick={onOpenQuoteModal}
            className="flex items-center px-4 py-2.5 bg-[#a3907c] hover:bg-white text-[#0d1210] text-[11px] font-bold uppercase tracking-wider rounded-sm transition shadow min-h-[48px]"
          >
            <span>Get Free Estimate</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
          </button>
        </div>

        {/* Mobile Action Cluster: 48px min touch targets */}
        <div className="flex md:hidden items-center space-x-2">
          <a
            id="mobile-nav-call-btn"
            href={`tel:${COMPANY_INFO.phoneRaw}`}
            className="w-12 h-12 rounded-sm bg-white/5 text-[#a3907c] border border-white/10 flex items-center justify-center active:scale-95 transition"
            aria-label="Call Direct"
          >
            <Phone className="w-5 h-5" />
          </a>
          <button
            id="mobile-menu-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="w-12 h-12 rounded-sm bg-white/5 text-white border border-white/10 flex items-center justify-center focus:outline-none active:scale-95 transition"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6 text-[#a3907c]" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer (Smooth overlay) */}
      {mobileMenuOpen && (
        <div className="fixed inset-x-0 top-[60px] sm:top-[68px] bottom-0 z-50 bg-[#0d1210]/98 backdrop-blur-xl border-b border-white/10 px-4 pt-3 pb-24 overflow-y-auto space-y-3 animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="p-3 bg-white/5 rounded-sm border border-white/10">
            <p className="text-[10px] text-white/50 uppercase tracking-widest font-semibold">Gloucester & Middle Peninsula Local Crew</p>
            <p className="text-xs font-bold text-white mt-0.5">Free On-Site Consultations & 3D Project Quotes</p>
          </div>

          <div className="space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`w-full min-h-[48px] px-3.5 py-3 rounded-sm text-xs uppercase tracking-wider font-bold transition flex items-center justify-between ${
                  link.isSpecial
                    ? 'bg-[#a3907c]/15 text-[#a3907c] border border-[#a3907c]/30'
                    : 'text-white/80 hover:bg-white/5 hover:text-white border border-transparent'
                }`}
              >
                <span className="flex items-center">
                  {link.isSpecial ? <Sparkles className="w-4 h-4 mr-2.5 text-[#a3907c]" /> : <Hammer className="w-4 h-4 mr-2.5 text-white/40" />}
                  {link.label}
                </span>
                {link.isSpecial && (
                  <span className="text-[9px] uppercase font-bold px-2 py-0.5 bg-[#a3907c] text-[#0d1210] rounded-sm">
                    Certified Vuba
                  </span>
                )}
              </a>
            ))}
          </div>

          <div className="pt-4 border-t border-white/10 space-y-2.5">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenQuoteModal();
              }}
              className="w-full h-12 rounded-sm bg-[#a3907c] hover:bg-white text-[#0d1210] font-bold text-xs uppercase tracking-wider text-center flex items-center justify-center space-x-2 shadow-md transition active:scale-[0.99]"
            >
              <span>Request Free On-Site Estimate</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <div className="grid grid-cols-2 gap-2 pt-1">
              <a
                href={`tel:${COMPANY_INFO.phoneRaw}`}
                className="h-12 px-3 rounded-sm bg-white/5 text-white text-[11px] uppercase tracking-wider font-semibold text-center border border-white/10 flex items-center justify-center space-x-1.5 active:scale-95 transition"
              >
                <Phone className="w-4 h-4 text-[#a3907c]" />
                <span>Call Us</span>
              </a>
              <a
                href={`sms:${COMPANY_INFO.phoneRaw}?body=Hi TB Custom Landscaping, I would like an estimate.`}
                className="h-12 px-3 rounded-sm bg-white/5 text-white text-[11px] uppercase tracking-wider font-semibold text-center border border-white/10 flex items-center justify-center space-x-1.5 active:scale-95 transition"
              >
                <MessageSquare className="w-4 h-4 text-[#a3907c]" />
                <span>Text Us</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

