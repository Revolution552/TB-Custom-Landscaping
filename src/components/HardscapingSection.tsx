import React, { useState } from 'react';
import { 
  Hammer, 
  ShieldCheck, 
  Droplets, 
  Sun, 
  MapPin, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight,
  Layers,
  Flame,
  Check
} from 'lucide-react';
import { HARDSCAPING_SERVICES, CRAFTSMANSHIP_STEPS } from '../data/landscapingData';

interface HardscapingSectionProps {
  onOpenQuoteModal: () => void;
  onSelectServiceForQuote?: (serviceTitle: string) => void;
}

export const HardscapingSection: React.FC<HardscapingSectionProps> = ({ 
  onOpenQuoteModal,
  onSelectServiceForQuote
}) => {
  const [selectedServiceId, setSelectedServiceId] = useState<string>('paver-patios');

  const getIcon = (name: string) => {
    switch (name) {
      case 'Hammer': return Hammer;
      case 'Sparkles': return Sparkles;
      case 'ShieldCheck': return ShieldCheck;
      case 'MapPin': return MapPin;
      case 'Droplets': return Droplets;
      case 'Sun': return Sun;
      default: return Hammer;
    }
  };

  return (
    <section id="hardscaping" className="py-16 lg:py-24 bg-[#0d1210] text-[#f2f4f3] relative overflow-hidden border-b border-white/10">
      
      {/* Background Subtle Overlay */}
      <div className="absolute inset-0 bg-dark-slate-pattern opacity-30 pointer-events-none"></div>
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-[#a3907c]/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
          <div>
            <div className="inline-flex items-center space-x-2 bg-[#a3907c]/10 text-[#a3907c] px-3.5 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest mb-3 border border-[#a3907c]/30">
              <Hammer className="w-3.5 h-3.5" />
              <span>Architectural Outdoor Construction</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white tracking-tight">
              Premium Hardscaping & <span className="italic font-serif text-[#a3907c]">Outdoor Living</span>
            </h2>
            <p className="text-base text-white/60 mt-3 max-w-2xl leading-relaxed font-normal">
              Engineered for generations. We design and construct custom paver patios, structural retaining walls, fire features, and drainage networks across Gloucester and Tidewater Virginia.
            </p>
          </div>

          <div className="shrink-0 w-full sm:w-auto">
            <button
              onClick={onOpenQuoteModal}
              className="w-full sm:w-auto min-h-[48px] px-6 py-3.5 rounded-sm bg-[#a3907c] hover:bg-white text-[#0d1210] font-bold text-xs uppercase tracking-wider transition shadow-lg flex items-center justify-center space-x-2 active:scale-[0.98]"
            >
              <span>Schedule Consultation</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Hardscaping Services Grid (6 Visual Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-20">
          {HARDSCAPING_SERVICES.map((service) => {
            const Icon = getIcon(service.iconName);
            return (
              <div
                key={service.id}
                className="bg-[#121816] rounded-sm overflow-hidden border border-white/10 hover:border-[#a3907c]/40 transition-all duration-300 shadow-xl flex flex-col group"
              >
                {/* Visual Image Header */}
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={service.imageUrl}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#121816] via-transparent to-black/30"></div>
                  
                  {/* Floating Icon */}
                  <div className="absolute top-4 left-4 w-9 h-9 rounded-sm bg-[#0d1210]/90 backdrop-blur-md text-[#a3907c] border border-white/15 flex items-center justify-center shadow-lg">
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                {/* Card Content Body */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="text-lg font-bold uppercase tracking-wider text-white group-hover:text-[#a3907c] transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-xs text-[#a3907c] font-semibold mt-0.5 uppercase tracking-wider">
                      {service.tagline}
                    </p>
                    <p className="text-xs text-white/60 mt-2.5 leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  {/* Bullet Benefits */}
                  <div className="space-y-1.5 pt-2 border-t border-white/10">
                    {service.benefits.map((benefit, i) => (
                      <div key={i} className="flex items-start text-xs text-white/80">
                        <CheckCircle2 className="w-3.5 h-3.5 mr-1.5 text-[#a3907c] shrink-0 mt-0.5" />
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>

                  {/* Specs & CTA */}
                  <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                    <div className="flex flex-wrap gap-1">
                      {service.specs.map((spec, i) => (
                        <span key={i} className="text-[9px] uppercase tracking-wider bg-white/5 text-white/60 px-2 py-0.5 rounded-sm border border-white/10">
                          {spec}
                        </span>
                      ))}
                    </div>
                    <button
                      onClick={() => {
                        if (onSelectServiceForQuote) onSelectServiceForQuote(service.title);
                        onOpenQuoteModal();
                      }}
                      className="text-xs font-bold uppercase tracking-wider text-[#a3907c] hover:text-white flex items-center ml-2 shrink-0 group-hover:translate-x-0.5 transition-transform"
                    >
                      Quote <ArrowRight className="w-3.5 h-3.5 ml-1" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* The 6-Point Engineered Base Craftsmanship Standard Section */}
        <div id="craftsmanship" className="bg-[#121816] rounded-sm p-6 sm:p-10 border border-white/10 shadow-2xl relative">
          <div className="max-w-3xl mb-10">
            <div className="inline-flex items-center space-x-2 bg-[#a3907c]/10 text-[#a3907c] px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-2 border border-[#a3907c]/30">
              <Layers className="w-3.5 h-3.5" />
              <span>The Gloucester Construction Standard</span>
            </div>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-light text-white">
              Why Our Hardscapes <span className="italic font-serif text-[#a3907c]">Never Sink</span> or Shift
            </h3>
            <p className="text-xs sm:text-sm text-white/60 mt-2 leading-relaxed">
              In coastal Virginia, sandy clay and high moisture will ruin amateur patios within two seasons. We build every project to strict ICPI-certified commercial excavation and compaction tolerances.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {CRAFTSMANSHIP_STEPS.map((step) => (
              <div 
                key={step.step}
                className="bg-white/5 p-5 rounded-sm border border-white/10 hover:border-[#a3907c]/40 transition-colors relative"
              >
                <span className="text-xl font-bold text-[#a3907c]/80">
                  {step.step}
                </span>
                <h4 className="text-sm font-bold uppercase tracking-wider text-white mt-1">
                  {step.title}
                </h4>
                <p className="text-xs text-white/60 mt-2 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>

          {/* Guarantee Footer Strip */}
          <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-3 text-xs text-white/70 text-left">
              <ShieldCheck className="w-5 h-5 text-[#a3907c] shrink-0" />
              <span>Backing every paver patio, driveway, and wall with our written <strong className="text-white">5-Year Structural Workmanship Warranty</strong>.</span>
            </div>
            <button
              onClick={onOpenQuoteModal}
              className="w-full sm:w-auto min-h-[48px] px-6 py-3 rounded-sm bg-[#a3907c] hover:bg-white text-[#0d1210] text-xs font-bold uppercase tracking-wider transition shadow flex items-center justify-center shrink-0 active:scale-[0.98]"
            >
              Get Free Site Evaluation
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
