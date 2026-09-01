import React from 'react';
import { Phone, MessageSquare, Calculator } from 'lucide-react';
import { COMPANY_INFO } from '../data/landscapingData';

interface MobileStickyBarProps {
  onOpenQuoteModal: () => void;
}

export const MobileStickyBar: React.FC<MobileStickyBarProps> = ({ onOpenQuoteModal }) => {
  return (
    <aside
      id="mobile-sticky-bar"
      aria-label="Quick mobile contact actions"
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#0d1210]/95 backdrop-blur-md border-t border-white/15 p-2 sm:p-2.5 shadow-2xl safe-area-pb"
    >
      <div className="grid grid-cols-12 gap-2">
        {/* Call Button (48px height) */}
        <a
          id="sticky-call-btn"
          href={`tel:${COMPANY_INFO.phoneRaw}`}
          className="col-span-4 h-12 rounded-sm bg-[#121816] text-white border border-white/15 flex items-center justify-center space-x-1.5 active:scale-95 transition-transform"
          aria-label={`Call ${COMPANY_INFO.phone}`}
        >
          <Phone className="w-4 h-4 text-[#a3907c] shrink-0" />
          <span className="text-[11px] font-bold uppercase tracking-wider">Call</span>
        </a>

        {/* Text Button (48px height) */}
        <a
          id="sticky-text-btn"
          href={`sms:${COMPANY_INFO.phoneRaw}?body=Hi TB Custom Landscaping, I would like to request an estimate for a hardscaping or Vuba Stone project.`}
          className="col-span-3 h-12 rounded-sm bg-[#121816] text-white border border-white/15 flex items-center justify-center space-x-1.5 active:scale-95 transition-transform"
          aria-label="Send SMS message to TB Custom Landscaping"
        >
          <MessageSquare className="w-4 h-4 text-[#a3907c] shrink-0" />
          <span className="text-[11px] font-bold uppercase tracking-wider">Text</span>
        </a>

        {/* Estimate Button (48px height, High Contrast Gold/Sand) */}
        <button
          id="sticky-quote-btn"
          onClick={onOpenQuoteModal}
          className="col-span-5 h-12 rounded-sm bg-[#a3907c] hover:bg-white text-[#0d1210] font-extrabold flex items-center justify-center space-x-1.5 active:scale-95 transition-transform shadow-md"
          aria-label="Open project estimate request form"
        >
          <Calculator className="w-4 h-4 text-[#0d1210] shrink-0" />
          <span className="text-[11px] uppercase tracking-wider font-extrabold truncate">Get Estimate</span>
        </button>
      </div>
    </aside>
  );
};

