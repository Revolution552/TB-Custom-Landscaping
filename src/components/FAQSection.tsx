import React, { useState } from 'react';
import { ChevronDown, HelpCircle, ArrowRight, MessageSquare, Phone } from 'lucide-react';
import { FAQS, COMPANY_INFO } from '../data/landscapingData';

interface FAQSectionProps {
  onOpenQuoteModal: () => void;
}

export const FAQSection: React.FC<FAQSectionProps> = ({ onOpenQuoteModal }) => {
  const [openIndices, setOpenIndices] = useState<number[]>([0, 1]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Vuba Stone', 'Hardscaping', 'Process & Pricing', 'Maintenance'];

  const filteredFaqs = selectedCategory === 'All'
    ? FAQS
    : FAQS.filter(f => f.category === selectedCategory);

  const toggleAccordion = (idx: number) => {
    if (openIndices.includes(idx)) {
      setOpenIndices(openIndices.filter(i => i !== idx));
    } else {
      setOpenIndices([...openIndices, idx]);
    }
  };

  return (
    <section id="faq" className="py-16 lg:py-24 bg-[#0d1210] text-[#f2f4f3] border-b border-white/10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-1.5 bg-[#a3907c]/10 text-[#a3907c] px-3.5 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest mb-3 border border-[#a3907c]/30">
            <HelpCircle className="w-3.5 h-3.5 text-[#a3907c]" />
            <span>Got Questions? We Have Answers</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-light text-white">
            Frequently Asked <span className="italic font-serif text-[#a3907c]">Questions</span>
          </h2>
          <p className="text-xs sm:text-sm text-white/60 mt-2">
            Everything you need to know about Vuba Stone resin, paver foundation engineering, and the Jobber estimate process in Gloucester County.
          </p>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap justify-center gap-2 mb-10 w-full">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`min-h-[40px] px-4 py-2 rounded-sm text-xs font-bold uppercase tracking-wider transition active:scale-95 ${
                selectedCategory === cat
                  ? 'bg-[#a3907c] text-[#0d1210] shadow-sm'
                  : 'bg-white/5 text-white/60 hover:text-white border border-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {filteredFaqs.map((faq, idx) => {
            const isOpen = openIndices.includes(idx);
            return (
              <div
                key={faq.question}
                className="bg-[#121816] rounded-sm border border-white/10 overflow-hidden shadow-sm transition-all"
              >
                <button
                  onClick={() => toggleAccordion(idx)}
                  className="w-full min-h-[52px] p-4 sm:p-6 text-left flex items-center justify-between gap-3 focus:outline-none active:bg-white/5"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:space-x-3">
                    <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-sm bg-black/40 text-[#a3907c] border border-white/10 self-start">
                      {faq.category}
                    </span>
                    <h3 className="text-sm sm:text-base font-medium text-white">
                      {faq.question}
                    </h3>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-white/40 shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 text-[#a3907c]' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-4 sm:px-6 pb-5 pt-1 text-xs sm:text-sm text-white/70 leading-relaxed border-t border-white/10">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still have questions CTA */}
        <div className="mt-12 p-5 sm:p-6 rounded-sm bg-[#121816] text-[#f2f4f3] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
          <div className="text-left space-y-1 w-full sm:w-auto">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">Have a specific project question or custom site plan?</h4>
            <p className="text-xs text-white/60">Talk directly to our lead master builder in Gloucester.</p>
          </div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 w-full sm:w-auto shrink-0">
            <a
              href={`tel:${COMPANY_INFO.phoneRaw}`}
              className="min-h-[48px] px-4 py-2.5 rounded-sm bg-white/5 text-[#a3907c] hover:bg-white/10 hover:text-white text-xs font-bold uppercase tracking-wider border border-white/10 transition flex items-center justify-center space-x-1.5 active:scale-[0.98]"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call (804) 555-0192</span>
            </a>
            <button
              onClick={onOpenQuoteModal}
              className="min-h-[48px] px-5 py-2.5 rounded-sm bg-[#a3907c] hover:bg-white text-[#0d1210] text-xs font-bold uppercase tracking-wider transition shadow flex items-center justify-center active:scale-[0.98]"
            >
              Request Free Estimate
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
