import React, { useState } from 'react';
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
  ExternalLink,
  CheckCircle2,
  Calendar,
  Send,
  Droplets,
  Leaf,
  Sun,
  Snowflake
} from 'lucide-react';
import { COMPANY_INFO, SERVICE_AREAS } from '../data/landscapingData';

interface FooterProps {
  onOpenQuoteModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenQuoteModal }) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterInterest, setNewsletterInterest] = useState('All Outdoor Care');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@') || !newsletterEmail.includes('.')) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }
    setErrorMessage('');
    setIsSubscribed(true);
  };

  return (
    <footer className="bg-[#0a0e0c] text-white/60 border-t border-white/10 text-xs pt-16 pb-28 md:pb-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Seasonal Maintenance Tips Newsletter Section */}
        <div id="newsletter-signup" className="mb-14 p-6 sm:p-8 lg:p-10 rounded-sm bg-[#121816] border border-[#a3907c]/30 shadow-2xl relative overflow-hidden">
          {/* Subtle decorative aura */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#a3907c]/5 rounded-full blur-3xl pointer-events-none -z-10" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Content Column (7 cols) */}
            <div className="lg:col-span-7 space-y-3.5 text-left">
              <div className="inline-flex items-center space-x-1.5 bg-[#a3907c]/10 text-[#a3907c] px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border border-[#a3907c]/30">
                <Calendar className="w-3.5 h-3.5 text-[#a3907c]" />
                <span>Quarterly Virginia Property Care</span>
              </div>
              
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-light text-white leading-tight">
                Seasonal Maintenance <span className="italic font-serif text-[#a3907c]">Tips & Care Dispatch</span>
              </h3>
              
              <p className="text-xs sm:text-sm text-white/70 max-w-xl leading-relaxed">
                Protect your outdoor investment long after project completion. Receive timely, quarter-by-quarter advice tailored to coastal Virginia’s unique soils and climate—delivered right at each seasonal changeover.
              </p>

              {/* 4 Quarterly Perks */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 text-[11px] text-white/80">
                <div className="flex items-center space-x-1.5 p-2 bg-white/5 rounded-sm border border-white/10">
                  <Leaf className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Spring Pre-Emergent</span>
                </div>
                <div className="flex items-center space-x-1.5 p-2 bg-white/5 rounded-sm border border-white/10">
                  <Sun className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>Summer Joint Care</span>
                </div>
                <div className="flex items-center space-x-1.5 p-2 bg-white/5 rounded-sm border border-white/10">
                  <Droplets className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span>Fall Drainage Prep</span>
                </div>
                <div className="flex items-center space-x-1.5 p-2 bg-white/5 rounded-sm border border-white/10">
                  <Snowflake className="w-3.5 h-3.5 text-blue-300 shrink-0" />
                  <span>Winter Safe De-Icing</span>
                </div>
              </div>
            </div>

            {/* Right Signup Form Column (5 cols) */}
            <div className="lg:col-span-5 bg-[#0d1210] p-5 sm:p-6 rounded-sm border border-white/10 shadow-xl">
              {isSubscribed ? (
                <div className="text-center py-4 space-y-3 animate-in fade-in duration-300">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-bold text-white">You're on the Dispatch List!</h4>
                  <p className="text-xs text-white/70 max-w-sm mx-auto leading-relaxed">
                    Thank you! We've registered <strong className="text-white">{newsletterEmail}</strong> for our seasonal maintenance guides and care calendar.
                  </p>
                  <div className="pt-2">
                    <button
                      onClick={() => {
                        setIsSubscribed(false);
                        setNewsletterEmail('');
                      }}
                      className="text-[11px] text-[#a3907c] hover:text-white underline transition"
                    >
                      Subscribe another address
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="space-y-3 text-left">
                  <div>
                    <label htmlFor="newsletter-email" className="block text-[10px] font-bold uppercase tracking-wider text-white/70 mb-1">
                      Email Address
                    </label>
                    <div className="relative">
                      <input
                        id="newsletter-email"
                        type="email"
                        value={newsletterEmail}
                        onChange={(e) => {
                          setNewsletterEmail(e.target.value);
                          if (errorMessage) setErrorMessage('');
                        }}
                        placeholder="you@domain.com"
                        className="w-full min-h-[48px] px-3.5 py-3 rounded-sm bg-white/5 border border-white/15 text-white placeholder-white/40 text-base sm:text-xs focus:outline-none focus:border-[#a3907c] focus:ring-1 focus:ring-[#a3907c] transition"
                        autoComplete="email"
                      />
                      <Mail className="w-4 h-4 text-white/30 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                    {errorMessage && (
                      <p className="text-[11px] text-amber-400 mt-1 font-medium">{errorMessage}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="newsletter-interest" className="block text-[10px] font-bold uppercase tracking-wider text-white/70 mb-1">
                      Primary Property Interest
                    </label>
                    <select
                      id="newsletter-interest"
                      value={newsletterInterest}
                      onChange={(e) => setNewsletterInterest(e.target.value)}
                      className="w-full min-h-[48px] px-3.5 py-2.5 rounded-sm bg-[#121816] border border-white/15 text-white text-xs focus:outline-none focus:border-[#a3907c] transition"
                    >
                      <option value="All Outdoor Care">All Outdoor Care (Turf, Hardscaping & Trees)</option>
                      <option value="Vuba Stone & Resin Surfacing">Vuba Stone & Resin Surfacing Care</option>
                      <option value="Paver Patios & Retaining Walls">Paver Patios, Joints & Retaining Walls</option>
                      <option value="Site Drainage & Grading">Site Drainage & French Drain Maintenance</option>
                      <option value="Estate Turf Care & Mulch">Routine Estate Turf Mowing & Mulch Services</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full min-h-[48px] px-4 py-3 rounded-sm bg-[#a3907c] hover:bg-white text-[#0d1210] font-bold text-xs uppercase tracking-wider transition shadow flex items-center justify-center space-x-2 active:scale-[0.98]"
                  >
                    <span>Subscribe for Free Seasonal Tips</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>

                  <p className="text-[10px] text-white/40 text-center leading-tight pt-1">
                    Zero spam. 4 curated issues/year + seasonal subscriber discounts. Unsubscribe anytime.
                  </p>
                </form>
              )}
            </div>

          </div>
        </div>

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
                <a href="#ar-visualizer" className="hover:text-white transition flex items-center text-[#a3907c] font-semibold">
                  <span className="w-1 h-1 bg-[#a3907c] rounded-full mr-2"></span>
                  AR Property Visualizer (Camera / Photo Overlay)
                </a>
              </li>
              <li>
                <a href="#drainage-health" className="hover:text-white transition flex items-center text-white/80 font-medium">
                  <span className="w-1 h-1 bg-[#a3907c] rounded-full mr-2"></span>
                  Soil & Drainage Health (Tidewater Hydrology)
                </a>
              </li>
              <li>
                <a href="#sqft-calculator" className="hover:text-white transition flex items-center text-white/80 font-medium">
                  <span className="w-1 h-1 bg-[#a3907c] rounded-full mr-2"></span>
                  Square Footage & Material Calculator
                </a>
              </li>
              <li>
                <a href="#project-status" className="hover:text-white transition flex items-center text-white/80 font-medium">
                  <span className="w-1 h-1 bg-[#a3907c] rounded-full mr-2"></span>
                  Active Job Status Tracker (Client Portal)
                </a>
              </li>
              <li>
                <a href="#material-selector" className="hover:text-white transition flex items-center text-[#a3907c] font-semibold">
                  <span className="w-1 h-1 bg-[#a3907c] rounded-full mr-2"></span>
                  Material Studio: Vuba & Paver Swatches
                </a>
              </li>
              <li>
                <a href="#virtual-consultation" className="hover:text-white transition flex items-center text-[#a3907c] font-semibold">
                  <span className="w-1 h-1 bg-[#a3907c] rounded-full mr-2"></span>
                  Book 15-Min Virtual Video Call
                </a>
              </li>
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
