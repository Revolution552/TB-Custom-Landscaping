import React from 'react';
import { 
  Phone, 
  MessageSquare, 
  MapPin, 
  Mail, 
  ShieldCheck, 
  Sparkles, 
  Hammer, 
  Clock, 
  ArrowUp,
  ExternalLink
} from 'lucide-react';
import { COMPANY_INFO, SERVICE_AREAS } from '../data/landscapingData';

interface FooterProps {
  onOpenQuoteModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenQuoteModal }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0a0e0c] text-white/60 border-t border-white/10 text-xs pt-16 pb-28 md:pb-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand Col */}
          <div className="lg:col-span-4 space-y-4 text-left">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-sm bg-[#121816] border border-white/15 flex items-center justify-center text-[#a3907c] font-bold text-base tracking-widest">
                TB
              </div>
              <div>
                <span className="font-light text-base text-white tracking-widest uppercase">
                  TB CUSTOM <span className="italic font-serif text-[#a3907c]">LANDSCAPING</span>
                </span>
                <p className="text-[10px] text-[#a3907c] uppercase tracking-wider font-semibold">
                  Certified Vuba Stone & Architectural Hardscaping
                </p>
              </div>
            </div>

            <p className="text-xs text-white/60 leading-relaxed">
              Gloucester County’s premier landscape construction firm specializing in certified resin-bound stone surfacing, structural paver living spaces, and stormwater grading.
            </p>

            <div className="space-y-1.5 pt-1 text-[11px]">
              <p className="text-white font-medium flex items-center">
                <ShieldCheck className="w-3.5 h-3.5 mr-1.5 text-[#a3907c]" />
                {COMPANY_INFO.license}
              </p>
              <p className="text-white/60 flex items-center">
                <Sparkles className="w-3.5 h-3.5 mr-1.5 text-[#a3907c]" />
                {COMPANY_INFO.warranty}
              </p>
            </div>
          </div>

          {/* Quick Service Links */}
          <div className="lg:col-span-3 space-y-3 text-left">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white">
              Primary Construction
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#vuba-stone" className="hover:text-white transition flex items-center">
                  <span className="w-1 h-1 bg-[#a3907c] rounded-full mr-2"></span>
                  Certified Vuba Stone™ Driveways
                </a>
              </li>
              <li>
                <a href="#vuba-stone" className="hover:text-white transition flex items-center">
                  <span className="w-1 h-1 bg-[#a3907c] rounded-full mr-2"></span>
                  Resin Stone Pool Decks & Patios
                </a>
              </li>
              <li>
                <a href="#hardscaping" className="hover:text-white transition flex items-center">
                  <span className="w-1 h-1 bg-[#a3907c] rounded-full mr-2"></span>
                  Custom Paver Patios & Fire Pits
                </a>
              </li>
              <li>
                <a href="#hardscaping" className="hover:text-white transition flex items-center">
                  <span className="w-1 h-1 bg-[#a3907c] rounded-full mr-2"></span>
                  Structural Retaining Walls
                </a>
              </li>
              <li>
                <a href="#hardscaping" className="hover:text-white transition flex items-center">
                  <span className="w-1 h-1 bg-[#a3907c] rounded-full mr-2"></span>
                  French Drains & Tidewater Grading
                </a>
              </li>
              <li>
                <a href="#secondary-services" className="hover:text-white transition flex items-center">
                  <span className="w-1 h-1 bg-white/40 rounded-full mr-2"></span>
                  Estate Turf & Seasonal Mulching
                </a>
              </li>
            </ul>
          </div>

          {/* Service Areas */}
          <div className="lg:col-span-2 space-y-3 text-left">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white">
              Service Areas
            </h4>
            <ul className="space-y-1.5 text-xs text-white/50">
              <li>Gloucester Courthouse, VA</li>
              <li>Ware Neck & Ordinary, VA</li>
              <li>Hayes & Gloucester Point</li>
              <li>Mathews County & Islands</li>
              <li>Historic Yorktown, VA</li>
              <li>Williamsburg & Kingsmill</li>
              <li>Newport News & Poquoson</li>
            </ul>
          </div>

          {/* Contact & Hours */}
          <div className="lg:col-span-3 space-y-3 text-left">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white">
              Direct Contact & Dispatch
            </h4>
            
            <div className="space-y-2 text-xs">
              <a
                href={`tel:${COMPANY_INFO.phoneRaw}`}
                className="flex items-center text-white hover:text-[#a3907c] transition font-bold"
              >
                <Phone className="w-3.5 h-3.5 mr-2 text-[#a3907c]" />
                <span>{COMPANY_INFO.phone}</span>
              </a>

              <a
                href={`sms:${COMPANY_INFO.phoneRaw}?body=Hi TB Custom Landscaping, I would like to request an estimate.`}
                className="flex items-center text-white/60 hover:text-white transition"
              >
                <MessageSquare className="w-3.5 h-3.5 mr-2 text-[#a3907c]" />
                <span>Text for Quick Response</span>
              </a>

              <p className="flex items-center text-white/50">
                <MapPin className="w-3.5 h-3.5 mr-2 text-[#a3907c]" />
                <span>{COMPANY_INFO.address}</span>
              </p>

              <p className="flex items-center text-white/50">
                <Clock className="w-3.5 h-3.5 mr-2 text-white/40" />
                <span>{COMPANY_INFO.hours}</span>
              </p>
            </div>

            <div className="pt-2">
              <button
                onClick={onOpenQuoteModal}
                className="w-full min-h-[48px] py-3 rounded-sm bg-[#a3907c] hover:bg-white text-[#0d1210] font-bold text-xs uppercase tracking-wider transition shadow flex items-center justify-center active:scale-[0.98]"
              >
                Request Free Estimate
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Strip */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-white/40">
          <p>© {new Date().getFullYear()} TB Custom Landscaping LLC. All rights reserved. Gloucester County, Virginia.</p>
          
          <div className="flex items-center space-x-4">
            <a href="#vuba-stone" className="hover:text-white transition">Vuba Stone Technology</a>
            <span>•</span>
            <a href="#hardscaping" className="hover:text-white transition">Hardscape Specs</a>
            <span>•</span>
            <button
              onClick={scrollToTop}
              className="flex items-center hover:text-white transition"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3.5 h-3.5 ml-1" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
