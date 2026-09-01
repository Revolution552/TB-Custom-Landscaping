import React from 'react';
import { ShieldCheck, Sparkles, Phone, ArrowRight, Droplets, Star, CheckCircle2, ChevronRight, Layers } from 'lucide-react';
import { COMPANY_INFO } from '../data/landscapingData';

interface HeroProps {
  onOpenQuoteModal: () => void;
  onScrollToVuba: () => void;
  onScrollToEstimator: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenQuoteModal, onScrollToVuba, onScrollToEstimator }) => {
  return (
    <section id="hero-section" className="relative bg-gradient-to-br from-[#0d1210] via-[#121a17] to-[#1a2421] text-[#f2f4f3] overflow-hidden pt-10 pb-16 lg:pt-16 lg:pb-24 border-b border-white/10">
      {/* Background Graphic Accents */}
      <div className="absolute inset-0 bg-dark-slate-pattern opacity-40 pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#a3907c]/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-[#a3907c]/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Core Value Proposition & Primary Conversion Triggers */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* High-Contrast Certified Badge */}
            <div className="inline-flex items-center space-x-2 bg-[#a3907c]/10 border border-[#a3907c]/30 rounded-full py-1.5 px-3.5 shadow-sm">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#a3907c] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#a3907c]"></span>
              </span>
              <span className="text-[10px] sm:text-xs font-bold text-[#a3907c] uppercase tracking-widest flex items-center">
                <Sparkles className="w-3.5 h-3.5 mr-1.5 text-[#a3907c]" />
                Certified Vuba Stone Installers | Gloucester & Tidewater, VA
              </span>
            </div>

            {/* Main Headline with Serif Italic Accent */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-light tracking-tight text-white leading-[1.1]">
              Architectural <br />
              <span className="italic font-serif text-[#a3907c]">Outdoor Living</span> & Resin-Bound Stone
            </h1>

            {/* Subtitle / Positioning */}
            <p className="text-base sm:text-lg text-white/60 leading-relaxed max-w-2xl font-normal">
              Eliminate muddy yards, cracked asphalt, and standing puddles permanently. We engineer resort-grade custom paver patios, structural retaining walls, and 100% permeable <strong className="text-white font-semibold">Vuba Stone</strong> driveways built for coastal Virginia’s high water table.
            </p>

            {/* Primary Action Button Cluster */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <button
                id="hero-request-quote-btn"
                onClick={onOpenQuoteModal}
                className="w-full sm:w-auto min-h-[48px] px-6 py-3.5 rounded-sm bg-[#a3907c] hover:bg-white text-[#0d1210] text-xs font-bold uppercase tracking-wider shadow-xl transition flex items-center justify-center space-x-2 group active:scale-[0.98]"
              >
                <span>Request Free Estimate</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                id="hero-explore-vuba-btn"
                onClick={onScrollToVuba}
                className="w-full sm:w-auto min-h-[48px] px-5 py-3.5 rounded-sm bg-white/5 hover:bg-white/10 text-white text-xs font-bold uppercase tracking-wider border border-white/10 transition flex items-center justify-center space-x-2 active:scale-[0.98]"
              >
                <Sparkles className="w-4 h-4 text-[#a3907c]" />
                <span>Explore Vuba Stone</span>
              </button>

              <a
                id="hero-call-direct-btn"
                href={`tel:${COMPANY_INFO.phoneRaw}`}
                className="w-full sm:w-auto min-h-[48px] px-4 py-3.5 rounded-sm bg-transparent hover:bg-white/5 text-white/80 hover:text-white text-xs font-bold uppercase tracking-wider border border-white/10 transition flex items-center justify-center space-x-2 active:scale-[0.98]"
              >
                <Phone className="w-4 h-4 text-[#a3907c]" />
                <span>(804) 555-0192</span>
              </a>
            </div>

            {/* Quick Trust Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3 pt-4 border-t border-white/10">
              <div className="flex items-center space-x-3 bg-white/5 p-3 rounded-sm border border-white/10">
                <div className="p-1.5 rounded-sm bg-[#a3907c]/20 text-[#a3907c] shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-white">Class A Licensed</p>
                  <p className="text-[10px] text-white/40 mt-0.5">$2M Insured Contractor</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 bg-white/5 p-3 rounded-sm border border-white/10">
                <div className="p-1.5 rounded-sm bg-[#a3907c]/20 text-[#a3907c] shrink-0">
                  <Droplets className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-white">100% Permeable</p>
                  <p className="text-[10px] text-white/40 mt-0.5">Puddle-Free SUDS Matrix</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 bg-white/5 p-3 rounded-sm border border-white/10">
                <div className="p-1.5 rounded-sm bg-[#a3907c]/20 text-[#a3907c] shrink-0">
                  <Star className="w-4 h-4 fill-[#a3907c]" />
                </div>
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-white">5-Year Warranty</p>
                  <p className="text-[10px] text-white/40 mt-0.5">Structural Workmanship</p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Visual Showcase & Interactive Feature Cards */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Main Featured Visual Card */}
            <div className="relative rounded-sm overflow-hidden border border-white/10 shadow-2xl bg-[#121816] group">
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80"
                alt="TB Custom Landscaping luxury hardscape and resin stone patio in Gloucester VA"
                className="w-full h-72 sm:h-80 object-cover object-center group-hover:scale-105 transition-transform duration-700 opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d1210] via-[#0d1210]/40 to-transparent"></div>

              {/* Top Floating Badge */}
              <div className="absolute top-4 left-4 bg-[#0d1210]/90 backdrop-blur-md px-3 py-1.5 rounded-sm border border-white/15 flex items-center space-x-2 shadow-lg">
                <span className="w-2 h-2 rounded-full bg-[#a3907c]"></span>
                <span className="text-[11px] font-bold uppercase tracking-wider text-white">Ware Neck, VA • Estate Transformation</span>
              </div>

              {/* Bottom Card Content */}
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-sm bg-[#121816]/95 backdrop-blur-md border border-white/10 shadow-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-[#a3907c]">
                      Resin Stone + Engineered Pavers
                    </span>
                    <p className="text-sm font-bold text-white mt-0.5">
                      1,850 Sq.Ft. Permeable Driveway & Terrace
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center justify-end text-[#a3907c]">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-[#a3907c]" />
                      ))}
                    </div>
                    <span className="text-[10px] text-white/40 uppercase tracking-widest font-medium">Verified Homeowner</span>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-white/70">
                  <span className="flex items-center text-[11px]">
                    <CheckCircle2 className="w-3.5 h-3.5 mr-1 text-[#a3907c]" />
                    Zero Standing Water
                  </span>
                  <span className="flex items-center text-[11px]">
                    <CheckCircle2 className="w-3.5 h-3.5 mr-1 text-[#a3907c]" />
                    UV Stable Aliphatic Resin
                  </span>
                  <button 
                    onClick={onScrollToVuba}
                    className="text-[#a3907c] hover:underline font-bold text-xs uppercase tracking-wider flex items-center"
                  >
                    Details <ChevronRight className="w-3 h-3 ml-0.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Estimator Teaser Pill */}
            <div 
              onClick={onScrollToEstimator}
              className="p-4 rounded-sm bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#a3907c]/50 cursor-pointer transition-all flex items-center justify-between group shadow-md"
            >
              <div className="flex items-center space-x-3">
                <div className="p-2.5 rounded-sm bg-[#a3907c]/20 text-[#a3907c]">
                  <Layers className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <p className="text-xs font-bold uppercase tracking-wider text-white group-hover:text-[#a3907c] transition-colors">
                    Instant Project Cost & Material Calculator
                  </p>
                  <p className="text-[11px] text-white/50">
                    Estimate your Paver Patio or Vuba Stone project in 30 seconds
                  </p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-white/40 group-hover:text-[#a3907c] group-hover:translate-x-1 transition-all" />
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
