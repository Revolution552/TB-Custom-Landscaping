import React, { useState, useEffect, useMemo } from 'react';
import { 
  ChevronDown, 
  HelpCircle, 
  ArrowRight, 
  Search, 
  Code, 
  Check, 
  Copy, 
  Globe, 
  Phone, 
  Thermometer, 
  ShieldCheck,
  Sparkles,
  ExternalLink,
  Info
} from 'lucide-react';
import { FAQS, COMPANY_INFO } from '../data/landscapingData';

interface FAQSectionProps {
  onOpenQuoteModal: () => void;
}

export const FAQSection: React.FC<FAQSectionProps> = ({ onOpenQuoteModal }) => {
  const [openIndices, setOpenIndices] = useState<number[]>([0, 1]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showSchemaInspector, setShowSchemaInspector] = useState<boolean>(false);
  const [copiedSchema, setCopiedSchema] = useState<boolean>(false);
  const [previewQuery, setPreviewQuery] = useState<string>('vuba stone permeable driveway gloucester va');

  const categories = ['All', 'Vuba Stone', 'Hardscaping', 'Process & Pricing', 'Maintenance'];

  // Filter FAQs by category and search query
  const filteredFaqs = useMemo(() => {
    return FAQS.filter(faq => {
      const matchesCategory = selectedCategory === 'All' || faq.category === selectedCategory;
      const matchesSearch = searchQuery === '' || 
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Generate Schema.org FAQPage JSON-LD object for local SEO
  const faqSchema = useMemo(() => {
    return {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "@id": "https://tbcustomlandscapingva.com/#faq",
      "mainEntity": FAQS.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    };
  }, []);

  const jsonLdString = useMemo(() => JSON.stringify(faqSchema, null, 2), [faqSchema]);

  // Inject into document.head for automated crawlers and validation tools
  useEffect(() => {
    const existingScript = document.getElementById('schema-faq-jsonld');
    if (existingScript) {
      existingScript.textContent = jsonLdString;
    } else {
      const script = document.createElement('script');
      script.id = 'schema-faq-jsonld';
      script.type = 'application/ld+json';
      script.textContent = jsonLdString;
      document.head.appendChild(script);
    }

    return () => {
      const scriptToRemove = document.getElementById('schema-faq-jsonld');
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, [jsonLdString]);

  const toggleAccordion = (idx: number) => {
    if (openIndices.includes(idx)) {
      setOpenIndices(openIndices.filter(i => i !== idx));
    } else {
      setOpenIndices([...openIndices, idx]);
    }
  };

  const handleCopySchema = () => {
    navigator.clipboard.writeText(jsonLdString);
    setCopiedSchema(true);
    setTimeout(() => setCopiedSchema(false), 2500);
  };

  return (
    <section id="faq" className="py-16 lg:py-24 bg-[#0d1210] text-[#f2f4f3] border-b border-white/10 relative">
      {/* Client-side JSON-LD script element in DOM */}
      <script 
        type="application/ld+json" 
        dangerouslySetInnerHTML={{ __html: jsonLdString }} 
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center space-x-2 bg-[#a3907c]/10 text-[#a3907c] px-3.5 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest mb-3 border border-[#a3907c]/30">
            <HelpCircle className="w-3.5 h-3.5 text-[#a3907c]" />
            <span>Got Questions? We Have Answers</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-light text-white tracking-tight">
            Frequently Asked <span className="italic font-serif text-[#a3907c]">Questions</span>
          </h2>
          <p className="text-xs sm:text-sm text-white/60 mt-2">
            Everything you need to know about certified Vuba Stone resin, Chesapeake Bay drainage rules, paver compaction standards, and our Gloucester County estimate workflow.
          </p>

          {/* JSON-LD Schema Status & Google SERP Preview Pill */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
            <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#1b2722] text-[#6ee7b7] text-[11px] font-medium border border-[#6ee7b7]/30 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#6ee7b7] animate-pulse"></span>
              <span>Schema.org FAQPage (JSON-LD) Active</span>
            </span>
            <button
              onClick={() => setShowSchemaInspector(!showSchemaInspector)}
              className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-white/5 hover:bg-white/10 text-white/80 hover:text-white text-[11px] font-medium border border-white/10 transition active:scale-95"
            >
              <Globe className="w-3.5 h-3.5 text-[#a3907c]" />
              <span>{showSchemaInspector ? 'Hide SERP Preview & Schema' : 'Preview Google SERP Rich Snippet'}</span>
            </button>
          </div>
        </div>

        {/* Google SERP Rich Snippet Interactive Inspector */}
        {showSchemaInspector && (
          <div className="mb-12 p-6 rounded-sm bg-[#121816] border border-[#a3907c]/40 shadow-2xl transition-all">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-4 border-b border-white/10 gap-3">
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-sm bg-[#a3907c]/20 text-[#a3907c] flex items-center justify-center border border-[#a3907c]/30">
                  <Globe className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                    <span>Google Search Rich Snippet Simulator</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-400 border border-emerald-500/30 normal-case font-normal">
                      Valid Schema
                    </span>
                  </h4>
                  <p className="text-[11px] text-white/60">
                    Live preview of how local Tidewater search queries render your questions as rich expandable snippets in Google SERPs.
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleCopySchema}
                  className="px-3 py-1.5 rounded-sm bg-white/10 hover:bg-white/20 text-white text-xs font-medium flex items-center space-x-1.5 transition active:scale-95"
                >
                  {copiedSchema ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-[#a3907c]" />}
                  <span>{copiedSchema ? 'Copied JSON-LD!' : 'Copy Schema'}</span>
                </button>
              </div>
            </div>

            {/* Quick Query Selector */}
            <div className="mb-4">
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#a3907c] mb-1.5">
                Simulated Local Search Queries:
              </div>
              <div className="flex flex-wrap gap-1.5">
                {[
                  'vuba stone permeable driveway gloucester va',
                  'resin bound paving cost tidewater virginia',
                  'chesapeake bay preservation act permeable patio mathews va',
                  'paver patio base preparation contractors yorktown va'
                ].map((q) => (
                  <button
                    key={q}
                    onClick={() => setPreviewQuery(q)}
                    className={`text-[11px] px-2.5 py-1 rounded-sm transition ${
                      previewQuery === q 
                        ? 'bg-[#a3907c] text-[#0d1210] font-bold' 
                        : 'bg-white/5 text-white/60 hover:text-white border border-white/10'
                    }`}
                  >
                    "{q}"
                  </button>
                ))}
              </div>
            </div>

            {/* Simulated Google SERP Card */}
            <div className="bg-[#1f2421] p-4 sm:p-5 rounded-md border border-white/10 shadow-inner">
              <div className="flex items-center space-x-2 text-xs text-emerald-400 mb-1">
                <span className="font-mono text-[11px] text-white/50">https://tbcustomlandscapingva.com › faq</span>
              </div>
              <div className="text-base sm:text-lg font-normal text-[#8ab4f8] hover:underline cursor-pointer mb-1 leading-snug">
                Certified Vuba Stone & Permeable Hardscaping FAQ | Gloucester, VA
              </div>
              <div className="flex items-center space-x-2 text-xs text-[#fbbc04] mb-2 font-medium">
                <span>Rating: 5.0 ★★★★★</span>
                <span className="text-white/40">•</span>
                <span className="text-white/60">120+ verified coastal projects</span>
                <span className="text-white/40">•</span>
                <span className="text-white/60">Gloucester & Middle Peninsula</span>
              </div>
              <p className="text-xs text-white/80 leading-relaxed mb-3">
                Gloucester County premier certified Vuba Stone resin-bound surfacing and permeable paver contractor. 15-year warranty, zero weed penetration, and CBPA-compliant coastal drainage solutions.
              </p>

              {/* SERP Rich Snippet FAQ Accordions (simulating Google's mobile/desktop rich results) */}
              <div className="mt-3 border-t border-white/10 pt-3 space-y-2">
                <div className="text-[10px] font-bold uppercase tracking-wider text-white/40 mb-1 flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3 text-[#a3907c]" />
                  <span>Google Rich Results: People Also Ask / FAQ Snippet (Schema.org)</span>
                </div>
                {FAQS.slice(0, 3).map((faq) => (
                  <details key={faq.question} className="group bg-[#161c19] rounded p-2.5 text-xs text-white border border-white/5">
                    <summary className="font-medium text-[#c4b5fd] cursor-pointer list-none flex items-center justify-between">
                      <span>{faq.question}</span>
                      <ChevronDown className="w-3.5 h-3.5 text-white/40 group-open:rotate-180 transition-transform" />
                    </summary>
                    <p className="mt-2 text-white/70 text-[11px] leading-relaxed border-t border-white/5 pt-2">
                      {faq.answer}
                    </p>
                  </details>
                ))}
              </div>
            </div>

            {/* Technical JSON-LD Details Accordion */}
            <details className="mt-4 group">
              <summary className="cursor-pointer text-[11px] font-mono text-[#a3907c] hover:text-white flex items-center space-x-1.5 select-none">
                <Code className="w-3.5 h-3.5" />
                <span>View Raw Schema.org JSON-LD Payload ({FAQS.length} Structured Entities)</span>
                <ChevronDown className="w-3 h-3 group-open:rotate-180 transition-transform" />
              </summary>
              <div className="mt-2 relative">
                <pre className="p-3 bg-black/60 rounded text-[10px] font-mono text-emerald-400 overflow-x-auto max-h-48 border border-white/10">
                  {jsonLdString}
                </pre>
              </div>
            </details>
          </div>
        )}

        {/* Weather & Curing Interactive Callout */}
        <div className="mb-10 p-5 rounded-sm bg-[#16201c] border border-[#a3907c]/30 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
          <div className="flex items-center space-x-3.5 text-left">
            <div className="w-10 h-10 rounded-sm bg-[#a3907c]/20 text-[#a3907c] flex items-center justify-center shrink-0 border border-[#a3907c]/40">
              <Thermometer className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-[#a3907c]">
                Virginia Climate & Curing Guide
              </div>
              <h4 className="text-sm font-bold text-white mt-0.5">
                How Weather Impacts Resin-Bound Curing & Installation
              </h4>
              <p className="text-xs text-white/60 mt-0.5">
                Simulate temperature effects on foot traffic readiness, vehicular load times, and our rain rescheduling warranty.
              </p>
            </div>
          </div>
          <a
            href="#weather-curing"
            className="w-full sm:w-auto min-h-[44px] px-5 py-2.5 rounded-sm bg-[#a3907c] hover:bg-white text-[#0d1210] text-xs font-bold uppercase tracking-wider transition shrink-0 flex items-center justify-center space-x-1.5 shadow active:scale-[0.98]"
          >
            <span>Launch Curing Simulator</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Search Bar & Category Filter */}
        <div className="mb-8 space-y-4">
          {/* Search Input */}
          <div className="relative max-w-md mx-auto">
            <Search className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search questions (e.g., permits, resin curing, cost, CBPA)..."
              className="w-full bg-[#121816] text-white text-xs pl-10 pr-4 py-3 rounded-sm border border-white/10 focus:outline-none focus:border-[#a3907c] placeholder:text-white/40 transition"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white text-xs font-bold px-1.5 py-0.5"
              >
                ✕
              </button>
            )}
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap justify-center gap-2 w-full">
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
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-12 bg-[#121816] rounded-sm border border-white/10">
              <p className="text-sm text-white/60">No questions matched your search query "{searchQuery}".</p>
              <button
                onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
                className="mt-3 text-xs text-[#a3907c] font-bold hover:underline uppercase tracking-wider"
              >
                Reset Search Filters
              </button>
            </div>
          ) : (
            filteredFaqs.map((faq, idx) => {
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
            })
          )}
        </div>

        {/* Local SEO Note */}
        <div className="mt-6 flex items-center justify-between text-[11px] text-white/40 px-2">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#a3907c]" />
            Structured data synced via Schema.org/FAQPage for local Gloucester, Mathews & Yorktown queries.
          </span>
          <span className="font-mono text-[10px] text-white/30 hidden sm:inline">
            JSON-LD Validated
          </span>
        </div>

        {/* Still have questions CTA */}
        <div className="mt-10 p-5 sm:p-6 rounded-sm bg-[#121816] text-[#f2f4f3] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
          <div className="text-left space-y-1 w-full sm:w-auto">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">Have a specific project question or custom site plan?</h4>
            <p className="text-xs text-white/60">Talk directly to our lead master builder in Gloucester Courthouse.</p>
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
