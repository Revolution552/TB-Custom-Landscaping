import React, { useState } from 'react';
import { 
  Calculator, 
  Sparkles, 
  ArrowRight, 
  Layers, 
  CheckCircle2, 
  Clock, 
  DollarSign, 
  ShieldCheck 
} from 'lucide-react';

interface InteractiveEstimatorProps {
  onTransferToForm: (data: { service: string; sqFt: string; budget: string }) => void;
  externalSqFt?: number;
}

export const InteractiveEstimator: React.FC<InteractiveEstimatorProps> = ({ 
  onTransferToForm,
  externalSqFt 
}) => {
  const [projectType, setProjectType] = useState<'vuba-overlay' | 'vuba-new-base' | 'paver-patio' | 'retaining-wall' | 'drainage'>('vuba-new-base');
  const [sqFt, setSqFt] = useState<number>(externalSqFt || 650);
  const [includeLighting, setIncludeLighting] = useState<boolean>(true);
  const [includeExcavation, setIncludeExcavation] = useState<boolean>(true);

  React.useEffect(() => {
    if (externalSqFt && externalSqFt > 0) {
      setSqFt(externalSqFt);
    }
  }, [externalSqFt]);

  // Calculate realistic Gloucester County pricing ranges
  const calculateEstimate = () => {
    let baseRateMin = 14;
    let baseRateMax = 20;
    let daysEstimate = '2 - 3 Days';

    switch (projectType) {
      case 'vuba-overlay':
        baseRateMin = 14;
        baseRateMax = 19;
        daysEstimate = '1 - 2 Days';
        break;
      case 'vuba-new-base':
        baseRateMin = 22;
        baseRateMax = 29;
        daysEstimate = '3 - 4 Days';
        break;
      case 'paver-patio':
        baseRateMin = 24;
        baseRateMax = 34;
        daysEstimate = '4 - 6 Days';
        break;
      case 'retaining-wall':
        baseRateMin = 35;
        baseRateMax = 55;
        daysEstimate = '3 - 5 Days';
        break;
      case 'drainage':
        baseRateMin = 12;
        baseRateMax = 18;
        daysEstimate = '1 - 2 Days';
        break;
    }

    let minTotal = sqFt * baseRateMin;
    let maxTotal = sqFt * baseRateMax;

    if (includeLighting) {
      minTotal += 950;
      maxTotal += 1600;
    }

    if (includeExcavation && (projectType === 'paver-patio' || projectType === 'retaining-wall')) {
      minTotal += 750;
      maxTotal += 1400;
    }

    return {
      minTotal: Math.round(minTotal),
      maxTotal: Math.round(maxTotal),
      daysEstimate
    };
  };

  const estimate = calculateEstimate();

  const getServiceName = () => {
    switch (projectType) {
      case 'vuba-overlay': return 'Vuba Stone (Resurface Over Existing Concrete)';
      case 'vuba-new-base': return 'Vuba Stone (New Permeable VubaMac Base)';
      case 'paver-patio': return 'Architectural Paver Patio & Outdoor Living';
      case 'retaining-wall': return 'Structural Retaining / Sitting Wall';
      case 'drainage': return 'French Drain & Grading Water Mitigation';
    }
  };

  const handleApplyToQuote = () => {
    onTransferToForm({
      service: getServiceName(),
      sqFt: `${sqFt} Sq.Ft.`,
      budget: `$${estimate.minTotal.toLocaleString()} – $${estimate.maxTotal.toLocaleString()}`
    });
  };

  return (
    <section id="estimator" className="py-16 lg:py-24 bg-[#0d1210] text-[#f2f4f3] border-b border-white/10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-1.5 bg-[#a3907c]/10 text-[#a3907c] px-3.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-2 border border-[#a3907c]/30">
            <Calculator className="w-3.5 h-3.5" />
            <span>Instant Project Planner</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light text-white">
            Instant Project <span className="italic font-serif text-[#a3907c]">Investment Estimator</span>
          </h2>
          <p className="text-xs sm:text-sm text-white/60 mt-2">
            Get an instant transparent estimate for your Gloucester County property based on square footage and material requirements.
          </p>
        </div>

        <div className="bg-[#121816] rounded-sm p-6 sm:p-10 border border-white/10 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Controls */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Service Selection */}
              <div>
                <label className="block text-[11px] font-bold text-[#a3907c] uppercase tracking-wider mb-2">
                  1. Select System or Service:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {[
                    { id: 'vuba-new-base', title: 'Vuba Stone (New Permeable Base)', tag: 'Most Popular' },
                    { id: 'vuba-overlay', title: 'Vuba Stone (Overlay on Concrete)', tag: 'Fast Resurface' },
                    { id: 'paver-patio', title: 'Architectural Paver Patio', tag: 'High-End' },
                    { id: 'retaining-wall', title: 'Structural Retaining Wall', tag: 'Engineered' },
                    { id: 'drainage', title: 'French Drainage & Grading', tag: 'Water Fix' }
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setProjectType(item.id as any)}
                      className={`min-h-[48px] p-3 rounded-sm text-left border transition text-xs font-medium flex items-center justify-between active:scale-[0.99] ${
                        projectType === item.id
                          ? 'bg-white/10 text-white border-[#a3907c] ring-1 ring-[#a3907c]'
                          : 'bg-white/5 text-white/70 border-white/10 hover:bg-white/10'
                      }`}
                    >
                      <span className="truncate pr-2">{item.title}</span>
                      <span className="text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded-sm bg-black/40 text-[#a3907c] shrink-0 border border-white/5">
                        {item.tag}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Square Footage Slider */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <label className="text-[11px] font-bold text-[#a3907c] uppercase tracking-wider">
                    2. Estimated Area Size:
                  </label>
                  <span className="text-base font-bold text-white bg-white/5 px-3 py-1 rounded-sm border border-white/15">
                    {sqFt} Sq. Ft.
                  </span>
                </div>
                
                <div className="py-2">
                  <input
                    type="range"
                    min="150"
                    max="3500"
                    step="50"
                    value={sqFt}
                    onChange={(e) => setSqFt(Number(e.target.value))}
                    className="w-full h-3 bg-white/10 rounded-sm appearance-none cursor-pointer accent-[#a3907c]"
                  />
                </div>

                <div className="flex justify-between text-[10px] uppercase tracking-wider text-white/40">
                  <span>Small Walkway (150 sq ft)</span>
                  <span>Standard Patio (650 sq ft)</span>
                  <span>Large Driveway (2,500+ sq ft)</span>
                </div>
              </div>

              {/* Addons */}
              <div className="pt-2 border-t border-white/10 space-y-2">
                <label className="block text-[11px] font-bold text-[#a3907c] uppercase tracking-wider">
                  3. Optional Enhancements:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <label className="min-h-[48px] flex items-center space-x-2.5 p-3 rounded-sm bg-white/5 border border-white/10 cursor-pointer text-xs active:bg-white/10 transition">
                    <input
                      type="checkbox"
                      checked={includeLighting}
                      onChange={(e) => setIncludeLighting(e.target.checked)}
                      className="w-4 h-4 rounded-sm text-[#a3907c] focus:ring-0 accent-[#a3907c]"
                    />
                    <span className="text-white/80">Integrated LED Low-Voltage Lighting</span>
                  </label>

                  <label className="min-h-[48px] flex items-center space-x-2.5 p-3 rounded-sm bg-white/5 border border-white/10 cursor-pointer text-xs active:bg-white/10 transition">
                    <input
                      type="checkbox"
                      checked={includeExcavation}
                      onChange={(e) => setIncludeExcavation(e.target.checked)}
                      className="w-4 h-4 rounded-sm text-[#a3907c] focus:ring-0 accent-[#a3907c]"
                    />
                    <span className="text-white/80">Heavy Clay Deep Excavation Prep</span>
                  </label>
                </div>
              </div>

            </div>

            {/* Right Output Panel */}
            <div className="lg:col-span-5">
              <div className="bg-[#0d1210] rounded-sm p-5 sm:p-7 border border-white/15 shadow-xl text-center space-y-4 relative">
                
                <span className="text-[10px] font-bold text-[#a3907c] uppercase tracking-widest px-3 py-1 rounded-full bg-[#a3907c]/10 border border-[#a3907c]/30 inline-block">
                  Estimated Investment Range
                </span>

                <div className="pt-2">
                  <div className="text-2xl sm:text-4xl font-light text-white">
                    ${estimate.minTotal.toLocaleString()} – ${estimate.maxTotal.toLocaleString()}
                  </div>
                  <p className="text-xs text-white/50 mt-1">
                    Includes materials, excavation, compaction & 5-year warranty.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-3 border-t border-white/10 text-left text-xs">
                  <div className="p-2.5 rounded-sm bg-white/5 border border-white/5">
                    <span className="text-[10px] text-white/50 uppercase font-bold flex items-center">
                      <Clock className="w-3 h-3 mr-1 text-[#a3907c]" /> Est. Time
                    </span>
                    <p className="font-bold text-white mt-0.5">{estimate.daysEstimate}</p>
                  </div>
                  <div className="p-2.5 rounded-sm bg-white/5 border border-white/5">
                    <span className="text-[10px] text-white/50 uppercase font-bold flex items-center">
                      <ShieldCheck className="w-3 h-3 mr-1 text-[#a3907c]" /> Warranty
                    </span>
                    <p className="font-bold text-white mt-0.5">5-Yr Full Coverage</p>
                  </div>
                </div>

                <button
                  onClick={handleApplyToQuote}
                  className="w-full min-h-[48px] py-3.5 rounded-sm bg-[#a3907c] hover:bg-white text-[#0d1210] text-xs font-bold uppercase tracking-wider transition shadow-lg flex items-center justify-center space-x-2 active:scale-[0.98]"
                >
                  <span>Lock In Estimate & Request Visit</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <p className="text-[10px] text-white/40">
                  *Estimates are preliminary and confirmed during your free on-site laser level consultation.
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
