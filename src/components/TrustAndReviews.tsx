import React, { useState } from 'react';
import { 
  Star, 
  ShieldCheck, 
  MapPin, 
  CheckCircle2, 
  Quote, 
  ArrowRight,
  Sparkles,
  Award
} from 'lucide-react';
import { TESTIMONIALS, SERVICE_AREAS, COMPANY_INFO } from '../data/landscapingData';

interface TrustAndReviewsProps {
  onOpenQuoteModal: () => void;
}

export const TrustAndReviews: React.FC<TrustAndReviewsProps> = ({ onOpenQuoteModal }) => {
  const [selectedAreaIndex, setSelectedAreaIndex] = useState<number>(0);

  return (
    <section id="reviews" className="py-16 lg:py-24 bg-[#0d1210] text-[#f2f4f3] relative overflow-hidden border-b border-white/10">
      
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 bg-dark-slate-pattern opacity-30 pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center space-x-2 bg-[#a3907c]/10 text-[#a3907c] px-3.5 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest mb-3 border border-[#a3907c]/30">
            <Award className="w-3.5 h-3.5" />
            <span>Gloucester County Verified Reviews</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white tracking-tight">
            Trusted by Tidewater <span className="italic font-serif text-[#a3907c]">Homeowners</span>
          </h2>
          <p className="text-sm sm:text-base text-white/60 mt-3">
            Read real feedback from property owners across Gloucester, Mathews, Yorktown, and Williamsburg who invested in permanent hardscaping and Vuba Stone.
          </p>
          
          {/* Overall 5.0 Star Summary Badge */}
          <div className="mt-5 inline-flex items-center space-x-3 bg-[#121816] px-4 py-2 rounded-sm border border-white/10 shadow-lg">
            <div className="flex text-[#a3907c]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-[#a3907c]" />
              ))}
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-white">5.0 Star Rated Contractor</span>
            <span className="text-white/20">•</span>
            <span className="text-xs text-white/60">100% On-Time Completion</span>
          </div>
        </div>

        {/* Customer Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-20">
          {TESTIMONIALS.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-[#121816] rounded-sm p-6 sm:p-7 border border-white/10 shadow-xl flex flex-col justify-between hover:border-[#a3907c]/40 transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex text-[#a3907c]">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#a3907c]" />
                    ))}
                  </div>
                  <span className="text-[10px] uppercase tracking-wider text-white/40 font-medium">{testimonial.date}</span>
                </div>

                <p className="text-xs sm:text-sm font-semibold text-[#a3907c] italic mb-2">
                  "{testimonial.featuredHighlight}"
                </p>

                <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
                  {testimonial.review}
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-white">{testimonial.author}</h4>
                  <p className="text-xs text-white/50 flex items-center mt-0.5">
                    <MapPin className="w-3 h-3 mr-1 text-[#a3907c]" />
                    {testimonial.location}
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-[9px] uppercase tracking-wider font-bold text-[#a3907c] bg-[#a3907c]/10 px-2 py-0.5 rounded-sm border border-[#a3907c]/30 flex items-center">
                    <CheckCircle2 className="w-3 h-3 mr-1" /> Verified Job
                  </span>
                  <p className="text-[10px] text-white/40 mt-1">{testimonial.projectType}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Service Area Coverage Map & List */}
        <div id="service-areas" className="bg-[#121816] rounded-sm p-6 sm:p-10 border border-white/10 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Info */}
            <div className="lg:col-span-6 space-y-4">
              <div className="inline-flex items-center space-x-1.5 text-[10px] font-bold text-[#a3907c] uppercase tracking-widest">
                <MapPin className="w-3.5 h-3.5 text-[#a3907c]" />
                <span>Regional Service Territory</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-light text-white">
                Serving Gloucester County & The <span className="italic font-serif text-[#a3907c]">Tidewater Region</span>
              </h3>
              <p className="text-xs sm:text-sm text-white/60 leading-relaxed">
                Our crews are dispatched daily across the Middle Peninsula and Historic Triangle. We provide free on-site consultations with full laser slope measurements and 3D design previews.
              </p>

              <div className="space-y-2.5 pt-2">
                {SERVICE_AREAS.map((area, idx) => (
                  <div
                    key={area.name}
                    onClick={() => setSelectedAreaIndex(idx)}
                    className={`p-3.5 rounded-sm cursor-pointer border transition text-left ${
                      selectedAreaIndex === idx
                        ? 'bg-white/10 border-[#a3907c] shadow-md ring-1 ring-[#a3907c]'
                        : 'bg-white/5 border-white/10 hover:bg-white/10'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-white flex items-center">
                        <MapPin className={`w-3.5 h-3.5 mr-1.5 ${selectedAreaIndex === idx ? 'text-[#a3907c]' : 'text-white/40'}`} />
                        {area.name}
                      </h4>
                      <span className="text-[9px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-sm bg-black/40 text-[#a3907c] border border-white/10">
                        {area.highlight}
                      </span>
                    </div>
                    <p className="text-xs text-white/60 mt-1">{area.county}</p>
                    <p className="text-[10px] uppercase tracking-wider text-white/40 mt-0.5">{area.radiusNote}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Visual Map Card */}
            <div className="lg:col-span-6 bg-[#0d1210] rounded-sm p-6 border border-white/10 text-center space-y-4">
              <div className="relative rounded-sm overflow-hidden border border-white/10 h-64 bg-white/5 flex items-center justify-center p-4">
                {/* Stylized Vector Territory Graphic */}
                <div className="space-y-3 max-w-sm">
                  <div className="w-12 h-12 rounded-sm bg-[#121816] border border-white/15 flex items-center justify-center mx-auto text-[#a3907c] shadow-lg">
                    <MapPin className="w-6 h-6 animate-bounce" />
                  </div>
                  <h4 className="text-sm font-bold uppercase tracking-wider text-white">
                    {SERVICE_AREAS[selectedAreaIndex].name} Service Hub
                  </h4>
                  <p className="text-xs text-white/60">
                    Same-week on-site visits, physical Vuba Stone sample kits, and comprehensive laser elevation checks available.
                  </p>
                  <div className="inline-block text-[10px] uppercase tracking-widest text-[#a3907c] font-bold bg-[#a3907c]/10 px-3 py-1 rounded-full border border-[#a3907c]/30">
                    Active Crew Radius: 45 Miles
                  </div>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="text-left text-xs text-white/60 w-full sm:w-auto">
                  <p className="font-bold uppercase tracking-wider text-white text-[11px]">Not sure if you're in our zone?</p>
                  <p className="text-[10px] text-white/40">We frequently service neighboring counties upon request.</p>
                </div>
                <button
                  onClick={onOpenQuoteModal}
                  className="w-full sm:w-auto min-h-[48px] px-5 py-3 rounded-sm bg-[#a3907c] hover:bg-white text-[#0d1210] text-xs font-bold uppercase tracking-wider transition shadow shrink-0 flex items-center justify-center space-x-1.5 active:scale-[0.98]"
                >
                  <span>Check Address</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
