import React from 'react';
import { 
  Sparkles, 
  Droplets, 
  Clock, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { SECONDARY_SERVICES } from '../data/landscapingData';

interface SecondaryServicesProps {
  onOpenQuoteModal: () => void;
  onSelectServiceForQuote?: (serviceTitle: string) => void;
}

export const SecondaryServices: React.FC<SecondaryServicesProps> = ({ 
  onOpenQuoteModal,
  onSelectServiceForQuote 
}) => {
  const getIcon = (name: string) => {
    switch (name) {
      case 'Sparkles': return Sparkles;
      case 'Droplets': return Droplets;
      case 'Clock': return Clock;
      case 'CheckCircle2': return CheckCircle2;
      default: return Sparkles;
    }
  };

  return (
    <section id="secondary-services" className="py-16 lg:py-24 bg-[#0d1210] text-[#f2f4f3] border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <span className="text-[10px] font-bold text-[#a3907c] uppercase tracking-widest px-3 py-1 rounded-full bg-[#a3907c]/10 border border-[#a3907c]/30 inline-block mb-3">
              Estate Care & Property Enhancement
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light text-white mt-1">
              Lawn Maintenance & <span className="italic font-serif text-[#a3907c]">Property Care</span>
            </h2>
            <p className="text-xs sm:text-sm text-white/60 mt-2 max-w-2xl">
              Clean, reliable maintenance solutions tailored for Gloucester County and Mathews residential estates, keeping your curb appeal pristine year-round.
            </p>
          </div>

          <div className="text-xs font-medium text-white/70 bg-white/5 px-3.5 py-2 rounded-sm border border-white/10 self-start md:self-auto">
            Available for recurring contracts & seasonal refreshes
          </div>
        </div>

        {/* Compact Grid of 5 Secondary Services */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {SECONDARY_SERVICES.map((service) => {
            const Icon = getIcon(service.iconName);
            return (
              <div
                key={service.id}
                className="bg-[#121816] p-5 rounded-sm border border-white/10 hover:border-[#a3907c]/40 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-9 h-9 rounded-sm bg-white/5 text-[#a3907c] flex items-center justify-center border border-white/10">
                      <Icon className="w-4 h-4" />
                    </div>
                    {service.badge && (
                      <span className="text-[9px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-sm bg-[#a3907c]/10 text-[#a3907c] border border-[#a3907c]/30">
                        {service.badge}
                      </span>
                    )}
                  </div>

                  <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                    {service.title}
                  </h3>
                  <p className="text-xs text-white/60 mt-1.5 leading-relaxed">
                    {service.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-white/10 space-y-2">
                  <div className="flex justify-between items-center text-[11px]">
                    <span className="text-white/40 uppercase tracking-wider">Schedule:</span>
                    <strong className="text-white font-medium">{service.frequency}</strong>
                  </div>
                  
                  <button
                    onClick={() => {
                      if (onSelectServiceForQuote) onSelectServiceForQuote(service.title);
                      onOpenQuoteModal();
                    }}
                    className="w-full mt-2 min-h-[48px] py-2.5 rounded-sm bg-white/5 hover:bg-[#a3907c] hover:text-[#0d1210] text-white text-xs font-bold uppercase tracking-wider transition flex items-center justify-center space-x-1.5 border border-white/10 active:scale-[0.98]"
                  >
                    <span>Request Service Quote</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bundle Note Banner */}
        <div className="p-4 rounded-sm bg-[#121816] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/70">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-4 h-4 text-[#a3907c] shrink-0" />
            <span><strong className="text-white">Hardscape Client Bundle:</strong> All hardscape & Vuba Stone projects qualify for discounted first-year seasonal maintenance packages.</span>
          </div>
          <button
            onClick={onOpenQuoteModal}
            className="text-[#a3907c] hover:text-white font-bold text-xs uppercase tracking-wider shrink-0 flex items-center transition-colors"
          >
            Ask About Bundles <ArrowRight className="w-3 h-3 ml-1" />
          </button>
        </div>

      </div>
    </section>
  );
};
