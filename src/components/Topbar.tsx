import React from 'react';
import { Phone, MessageSquare, MapPin, Clock, ShieldCheck } from 'lucide-react';
import { COMPANY_INFO } from '../data/landscapingData';

interface TopbarProps {
  onOpenQuoteModal: () => void;
}

export const Topbar: React.FC<TopbarProps> = ({ onOpenQuoteModal }) => {
  return (
    <div id="top-announcement-bar" className="bg-[#a3907c] text-[#0d1210] text-xs py-1.5 px-4 hidden md:block font-medium tracking-wide">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
        {/* Left: Service Area & Status */}
        <div className="flex items-center space-x-4">
          <span className="flex items-center font-bold text-[#0d1210] text-[11px] uppercase tracking-wider">
            <MapPin className="w-3.5 h-3.5 mr-1 text-[#0d1210]" />
            Serving <span className="underline ml-1 font-extrabold">Gloucester County, VA</span> & Surrounding Areas
          </span>
          <span className="text-[#0d1210]/40">•</span>
          <span className="flex items-center text-[#0d1210]/90 text-[11px] font-semibold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5 mr-1 text-[#0d1210]" />
            Class A Licensed & Insured Contractor
          </span>
        </div>

        {/* Right: Quick Contacts & CTA */}
        <div className="flex items-center space-x-5">
          <span className="flex items-center text-[#0d1210]/80 text-[11px]">
            <Clock className="w-3.5 h-3.5 mr-1 text-[#0d1210]" />
            Mon–Sat: 7AM–6PM
          </span>
          
          <a
            id="topbar-sms-link"
            href={`sms:${COMPANY_INFO.phoneRaw}?body=Hi TB Custom Landscaping, I would like to request an estimate for a hardscaping/Vuba stone project.`}
            className="flex items-center text-[#0d1210] hover:text-white font-bold text-[11px] uppercase tracking-wider transition-colors"
          >
            <MessageSquare className="w-3.5 h-3.5 mr-1 text-[#0d1210]" />
            <span>Text Us</span>
          </a>

          <a
            id="topbar-phone-link"
            href={`tel:${COMPANY_INFO.phoneRaw}`}
            className="flex items-center font-extrabold text-[#0d1210] hover:text-white transition-colors text-[11px]"
          >
            <Phone className="w-3.5 h-3.5 mr-1 text-[#0d1210]" />
            <span>{COMPANY_INFO.phone}</span>
          </a>

          <button
            id="topbar-estimate-btn"
            onClick={onOpenQuoteModal}
            className="bg-[#0d1210] hover:bg-white hover:text-[#0d1210] text-[#f2f4f3] px-3 py-1 rounded text-[10px] font-bold uppercase tracking-wider transition shadow-sm"
          >
            Free On-Site Estimate
          </button>
        </div>
      </div>
    </div>
  );
};
