import React, { useState } from 'react';
import { 
  Droplets, 
  Layers, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  Compass, 
  Sparkles, 
  Waves, 
  ArrowRight, 
  Fish, 
  Info, 
  HelpCircle,
  Clock,
  ChevronDown,
  Sun,
  CloudRain,
  Flame,
  Check
} from 'lucide-react';
import { COMPANY_INFO } from '../data/landscapingData';

interface SoilAndDrainageHealthProps {
  onOpenQuoteModal?: (serviceType?: string) => void;
}

type RainfallIntensity = 'drizzle' | 'storm' | 'noreaster';

export const SoilAndDrainageHealth: React.FC<SoilAndDrainageHealthProps> = ({ 
  onOpenQuoteModal 
}) => {
  const [selectedLayer, setSelectedLayer] = useState<number>(0);
  const [rainfallIntensity, setRainfallIntensity] = useState<RainfallIntensity>('storm');
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Diagnostic Checklist State
  const [checkedIssues, setCheckedIssues] = useState<string[]>(['puddles']);

  const toggleIssue = (id: string) => {
    if (checkedIssues.includes(id)) {
      setCheckedIssues(checkedIssues.filter(i => i !== id));
    } else {
      setCheckedIssues([...checkedIssues, id]);
    }
  };

  // Layers in the permeable system
  const permeableLayers = [
    {
      id: 0,
      name: '18mm Vuba Stone™ Permeable Matrix',
      tag: 'Wearing Surface Course',
      porosity: 'Over 850–1,000 Gallons / Hr per Sq Yard',
      depth: '18mm – 22mm',
      description: 'Kiln-dried natural quartz and marble aggregates fully encapsulated in 100% aliphatic UV-stable polyurethane resin. Forms a smooth, puddle-free matrix with millions of microscopic interconnected pore channels.',
      tidewaterBenefit: 'Zero standing surface water eliminates algae slime, mosquito larvae breeding, and winter freeze-thaw surface spalling common in Tidewater.',
      color: '#a3907c',
    },
    {
      id: 1,
      name: 'VubaMac Open-Graded Permeable Asphalt / Bedding',
      tag: 'Structural Void Load Transfer',
      porosity: '100% Rapid Infiltration',
      depth: '2.0" – 2.5"',
      description: 'Porous asphalt or #8 washed granite bedding layer with all sand fines removed. Provides a uniform, interlocked planar foundation that transfers heavy vehicular loads directly down without choking water flow.',
      tidewaterBenefit: 'Prevents the reflective cracking and root intrusion that regularly ruptures solid concrete slabs along Gloucester’s riverbanks.',
      color: '#526159',
    },
    {
      id: 2,
      name: '#57 Clean Crushed Granite Reservoir Base',
      tag: 'Subterranean Stormwater Detention',
      porosity: '40% Internal Void Ratio (Detention Cell)',
      depth: '6.0" – 10.0" Compacted',
      description: 'Washed, double-screened angular blue granite stone (1/2" to 1" sizing). Lacks dust or sand, creating a subterranean rock reservoir that temporarily stores heavy storm surges while water slowly percolates into the ground.',
      tidewaterBenefit: 'Holds up to 3.5 inches of continuous torrential coastal rainfall underneath your driveway or patio, keeping water away from home foundations.',
      color: '#34433d',
    },
    {
      id: 3,
      name: 'Heavy-Duty 6oz Woven Geotextile Membrane',
      tag: 'Subgrade Clay Separation Barrier',
      porosity: 'Engineered Filtration (Water In, Clay Out)',
      depth: 'Industrial Spec',
      description: 'High-tensile non-rotting polypropylene separation fabric placed across the excavated subgrade before aggregate placement. Allows groundwater movement while preventing soil particles from pumping up.',
      tidewaterBenefit: 'Crucial for Tidewater Virginia: Stops dense marine gumbo clay from swallowing the clean gravel base over time, preventing rutting and sunken dips.',
      color: '#212c26',
    },
    {
      id: 4,
      name: 'Tidewater Marine Clay Subgrade (Laser Graded)',
      tag: 'Native Soil Bed with Positive Pitch',
      porosity: 'Low Native Permeability (<0.2 in/hr)',
      depth: 'Virgin Subgrade',
      description: 'Gloucester’s native high-plasticity marine clay. We shape this layer with precision laser levels to create a positive 1.5% pitch directing any subterranean overflow toward perimeter French drains or swales.',
      tidewaterBenefit: 'Eliminates hydrostatic buildup behind retaining walls and prevents water pooling under home crawlspaces.',
      color: '#16201b',
    }
  ];

  // Rainfall simulation statistics
  const rainfallStats = {
    drizzle: {
      rate: '0.5 in/hr',
      name: 'Tidewater Coastal Drizzle',
      permeableReaction: '100% Instant Disappearance (0.0 sec surface residence)',
      concreteReaction: 'Minor pooling and slippery sheen begins in 3 minutes',
      reservoirCapacity: 'Under 10% void reservoir capacity used'
    },
    storm: {
      rate: '2.0 in/hr',
      name: 'Summer Chesapeake Thunderstorm',
      permeableReaction: '100% Rapid Infiltration (No standing water or surface runoff)',
      concreteReaction: 'Sheet runoff directing 2,000+ gal against lawn & foundation',
      reservoirCapacity: 'Approx. 45% void reservoir capacity used'
    },
    noreaster: {
      rate: '4.5 in/hr',
      name: 'Tropical Coastal Nor’easter Deluge',
      permeableReaction: 'Porous matrix absorbs full volume; excess drains via base reservoir',
      concreteReaction: 'Severe puddles, yard flooding, mulch washouts & driveway pooling',
      reservoirCapacity: 'Approx. 85% void reservoir capacity safely detained'
    }
  };

  const currentRain = rainfallStats[rainfallIntensity];

  const faqs = [
    {
      q: 'Why does concrete and traditional paving crack so frequently in Gloucester County?',
      a: 'Gloucester County and the surrounding Tidewater region are built upon dense coastal marine clay ("gumbo clay") that expands when wet and contracts when dry. Coupled with high winter water tables and frequent freeze-thaw cycles, this creates massive hydrostatic pressure underneath rigid, impermeable slabs. Without a permeable escape route, traditional concrete cracks, settles, and develops standing puddles.'
    },
    {
      q: 'Does permeable Vuba Stone comply with Chesapeake Bay Preservation Act (CBPA) buffer rules?',
      a: 'Yes. In many Gloucester, Mathews, and York County shoreline buffer zones (Resource Protection Areas / RPAs), strict limits are placed on adding new impervious square footage. Because Vuba Stone with an open-graded base is certified permeable (allowing water to infiltrate directly into the water table rather than running off into rivers), it frequently qualifies for environmentally sensitive shoreline permits.'
    },
    {
      q: 'What prevents the gravel base from clogging with mud over 10 or 15 years?',
      a: 'We install commercial-grade 6oz non-woven geotextile separation fabric between the virgin Tidewater clay subgrade and our clean crushed stone reservoir. This barrier prevents clay fines from migrating upward into the stone while allowing water to pass through freely, preserving the 40% void reservoir capacity for decades.'
    },
    {
      q: 'Will permeable paving eliminate green slippery algae in shaded Gloucester yards?',
      a: 'Yes. Algae and moss require prolonged moisture to establish colonies. Because rainwater percolates straight through Vuba Stone in seconds, the surface dries rapidly in the sun and breeze. There are no standing puddles or moist films for algae or mosquito larvae to thrive.'
    }
  ];

  return (
    <section 
      id="drainage-health" 
      aria-label="Tidewater Soil and Drainage Health Guide"
      className="py-16 sm:py-24 bg-[#0a0e0c] relative overflow-hidden text-white border-t border-white/10"
    >
      {/* Ambient Lighting */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-[#a3907c]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl"></div>
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(#a3907c 1px, transparent 1px)`,
            backgroundSize: '28px 28px'
          }}
        ></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#16201c] border border-[#a3907c]/30 text-[#a3907c] text-xs font-bold uppercase tracking-widest mb-4 shadow-sm">
            <Droplets className="w-3.5 h-3.5 text-[#a3907c]" />
            <span>Tidewater Coastal Hydrology & Soil Engineering</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-white tracking-tight uppercase">
            Soil & Drainage <span className="text-[#a3907c]">Health Guide</span>
          </h2>

          <p className="mt-3 text-sm sm:text-base text-white/70 max-w-2xl mx-auto leading-relaxed">
            Understanding Gloucester County's heavy marine clay, high water tables, and how certified permeable resin-bound stone stops standing puddles and protects the Chesapeake Bay watershed.
          </p>
        </div>

        {/* 4 Tidewater Geotechnical Challenges vs TB Custom Solutions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-16">
          
          <div className="bg-[#121915] border border-white/10 rounded-xl p-5 hover:border-[#a3907c]/40 transition-all flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-lg bg-red-950/50 border border-red-500/30 flex items-center justify-center text-red-400 mb-3">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-1">
                Dense Marine Clay
              </h4>
              <p className="text-xs text-white/60 leading-relaxed">
                Tidewater’s gumbo clay has very low natural percolation (&lt;0.2"/hr), trapping rainwater at the surface for days and causing standard concrete to heave.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-white/10 text-xs text-[#a3907c] font-semibold flex items-center">
              <CheckCircle2 className="w-3.5 h-3.5 mr-1.5 shrink-0" />
              <span>Solved by 40% void stone detention base</span>
            </div>
          </div>

          <div className="bg-[#121915] border border-white/10 rounded-xl p-5 hover:border-[#a3907c]/40 transition-all flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-lg bg-sky-950/50 border border-sky-500/30 flex items-center justify-center text-sky-400 mb-3">
                <Waves className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-1">
                Shallow Water Table
              </h4>
              <p className="text-xs text-white/60 leading-relaxed">
                Gloucester Point & Mobjack Bay properties often have water tables only 2–4 feet below grade, worsening storm puddles and crawlspace humidity.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-white/10 text-xs text-[#a3907c] font-semibold flex items-center">
              <CheckCircle2 className="w-3.5 h-3.5 mr-1.5 shrink-0" />
              <span>Evenly distributed subgrade infiltration</span>
            </div>
          </div>

          <div className="bg-[#121915] border border-white/10 rounded-xl p-5 hover:border-[#a3907c]/40 transition-all flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-lg bg-emerald-950/50 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-3">
                <Fish className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-1">
                Chesapeake Bay Act (CBPA)
              </h4>
              <p className="text-xs text-white/60 leading-relaxed">
                Strict county caps on impermeable footprints in 100-ft Resource Protection Areas (RPAs) restrict homeowners from expanding outdoor living.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-white/10 text-xs text-[#a3907c] font-semibold flex items-center">
              <CheckCircle2 className="w-3.5 h-3.5 mr-1.5 shrink-0" />
              <span>Certified 100% pervious SUDS compliance</span>
            </div>
          </div>

          <div className="bg-[#121915] border border-white/10 rounded-xl p-5 hover:border-[#a3907c]/40 transition-all flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-lg bg-amber-950/50 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-3">
                <Droplets className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-1">
                Standing Water & Algae
              </h4>
              <p className="text-xs text-white/60 leading-relaxed">
                Stagnant puddles breed mosquitoes and coat shaded patios with slick green slime, creating slip-and-fall hazards for family and guests.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-white/10 text-xs text-[#a3907c] font-semibold flex items-center">
              <CheckCircle2 className="w-3.5 h-3.5 mr-1.5 shrink-0" />
              <span>Dry surface in seconds post-rainfall</span>
            </div>
          </div>

        </div>

        {/* SECTION 2: INTERACTIVE GEOTECHNICAL CROSS-SECTION EXPLORER */}
        <div className="bg-[#121915]/95 border border-white/15 rounded-2xl p-6 sm:p-8 shadow-2xl backdrop-blur-sm mb-16">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8 pb-6 border-b border-white/10">
            <div>
              <span className="text-xs font-bold text-[#a3907c] uppercase tracking-wider block mb-1">
                Interactive Engineering Diagram
              </span>
              <h3 className="text-xl sm:text-2xl font-display font-bold text-white">
                Anatomy of an Engineered Tidewater Permeable System
              </h3>
              <p className="text-xs sm:text-sm text-white/60 mt-1">
                Click any subterranean layer below to reveal its hydraulic specification and coastal Virginia performance advantage.
              </p>
            </div>

            <div className="flex items-center space-x-3 text-xs bg-[#16201c] px-3.5 py-2 rounded-xl border border-white/10">
              <ShieldCheck className="w-4 h-4 text-[#a3907c]" />
              <span className="text-white/80">ICPI & ASTM C1701 Standards</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left: Interactive Layer Cross-Section Visualizer (6 cols) */}
            <div className="lg:col-span-6 space-y-2.5">
              {permeableLayers.map((layer, idx) => {
                const isSelected = selectedLayer === idx;
                return (
                  <div
                    key={layer.id}
                    onClick={() => setSelectedLayer(idx)}
                    className={`p-4 rounded-xl border transition-all cursor-pointer relative overflow-hidden group ${
                      isSelected
                        ? 'bg-[#18231e] border-[#a3907c] shadow-lg ring-1 ring-[#a3907c]'
                        : 'bg-[#0e1411] border-white/10 hover:border-white/30'
                    }`}
                  >
                    {/* Visual Depth Bar Indicator */}
                    <div 
                      className="absolute left-0 top-0 bottom-0 w-1.5 transition-colors"
                      style={{ backgroundColor: isSelected ? '#a3907c' : 'rgba(255,255,255,0.1)' }}
                    />

                    <div className="flex items-center justify-between pl-2">
                      <div className="space-y-0.5">
                        <div className="flex items-center space-x-2">
                          <span className="text-[10px] font-mono font-bold text-[#a3907c] uppercase bg-black/40 px-2 py-0.5 rounded">
                            Layer {idx + 1}
                          </span>
                          <span className="text-xs font-semibold text-white/50">
                            {layer.depth}
                          </span>
                        </div>
                        <h4 className="text-sm sm:text-base font-bold text-white group-hover:text-[#a3907c] transition-colors">
                          {layer.name}
                        </h4>
                      </div>

                      <div className="text-right">
                        <span className="text-[11px] font-mono text-[#a3907c] font-bold block">
                          {layer.tag}
                        </span>
                        <span className="text-[10px] text-white/40">
                          {isSelected ? 'Inspecting' : 'Click to inspect'}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right: Technical Inspector Panel for Selected Layer (6 cols) */}
            <div className="lg:col-span-6 bg-[#0e1411] border border-[#a3907c]/30 rounded-2xl p-6 sm:p-7 shadow-xl">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
                <div>
                  <span className="text-[10px] font-mono text-[#a3907c] font-bold uppercase tracking-wider block">
                    Engineering Specification Sheet
                  </span>
                  <h4 className="text-lg font-bold text-white mt-0.5">
                    {permeableLayers[selectedLayer].name}
                  </h4>
                </div>
                <div className="px-2.5 py-1 rounded bg-[#16201c] border border-white/10 text-xs font-mono text-white/80">
                  {permeableLayers[selectedLayer].depth}
                </div>
              </div>

              {/* Porosity & Flow Rate Highlight */}
              <div className="mb-4 p-3.5 bg-black/40 rounded-xl border border-white/10 flex items-start space-x-3">
                <Droplets className="w-5 h-5 text-[#a3907c] shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] uppercase font-bold text-white/60 tracking-wider block">
                    Hydraulic Infiltration / Porosity
                  </span>
                  <p className="text-sm font-bold text-white font-mono mt-0.5">
                    {permeableLayers[selectedLayer].porosity}
                  </p>
                </div>
              </div>

              {/* Technical Description */}
              <div className="mb-4 space-y-1">
                <span className="text-[11px] uppercase font-bold text-[#a3907c] tracking-wider block">
                  Structural & Material Composition
                </span>
                <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
                  {permeableLayers[selectedLayer].description}
                </p>
              </div>

              {/* Tidewater Specific Advantage */}
              <div className="p-4 rounded-xl bg-gradient-to-br from-[#16201c] to-[#121915] border border-emerald-500/20">
                <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider flex items-center mb-1">
                  <ShieldCheck className="w-3.5 h-3.5 mr-1 text-emerald-400" />
                  Gloucester & Tidewater Geotechnical Impact
                </span>
                <p className="text-xs text-white/90 leading-relaxed">
                  {permeableLayers[selectedLayer].tidewaterBenefit}
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* SECTION 3: INTERACTIVE STORMWATER INFILTRATION SIMULATOR */}
        <div className="bg-[#121915]/95 border border-white/15 rounded-2xl p-6 sm:p-8 shadow-2xl backdrop-blur-sm mb-16">
          <div className="max-w-3xl mb-8">
            <span className="text-xs font-bold text-[#a3907c] uppercase tracking-wider block mb-1">
              Live Hydraulic Simulation
            </span>
            <h3 className="text-xl sm:text-2xl font-display font-bold text-white">
              Chesapeake Stormwater Infiltration Comparison
            </h3>
            <p className="text-xs sm:text-sm text-white/60 mt-1">
              Select a rainfall event below to see how permeable resin stone vs. conventional concrete behaves during intense coastal precipitation.
            </p>
          </div>

          {/* Rainfall Intensity Toggle Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
            {[
              { id: 'drizzle', label: 'Coastal Drizzle', rate: '0.5" / hour', icon: CloudRain },
              { id: 'storm', label: 'Summer Thunderstorm', rate: '2.0" / hour', icon: Waves },
              { id: 'noreaster', label: 'Nor’easter Deluge', rate: '4.5" / hour', icon: Droplets },
            ].map((btn) => {
              const Icon = btn.icon;
              const isSelected = rainfallIntensity === btn.id;
              return (
                <button
                  key={btn.id}
                  type="button"
                  onClick={() => setRainfallIntensity(btn.id as RainfallIntensity)}
                  className={`p-4 rounded-xl border text-left transition-all flex items-center justify-between ${
                    isSelected
                      ? 'bg-[#a3907c] text-[#0d1210] border-[#a3907c] shadow-lg'
                      : 'bg-[#0e1411] border-white/10 text-white/70 hover:border-white/30 hover:text-white'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className={`w-5 h-5 ${isSelected ? 'text-[#0d1210]' : 'text-[#a3907c]'}`} />
                    <div>
                      <p className="text-xs sm:text-sm font-bold">{btn.label}</p>
                      <p className={`text-[11px] font-mono ${isSelected ? 'text-[#0d1210]/70' : 'text-white/40'}`}>
                        {btn.rate}
                      </p>
                    </div>
                  </div>
                  <span className={`text-[10px] font-bold uppercase tracking-wider ${isSelected ? 'text-[#0d1210]' : 'text-white/40'}`}>
                    {isSelected ? 'Active' : 'Select'}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Side-by-Side Surface Comparison Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Permeable Vuba Stone Card */}
            <div className="p-5 sm:p-6 rounded-xl bg-gradient-to-b from-[#13221b] to-[#0e1713] border border-emerald-500/30 space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-950 text-emerald-300 border border-emerald-500/40 flex items-center">
                  <CheckCircle2 className="w-3 h-3 mr-1" />
                  TB Custom Permeable Resin System
                </span>
                <span className="text-xs font-mono text-emerald-400 font-bold">100% Infiltration</span>
              </div>

              <div>
                <h4 className="text-base font-bold text-white">
                  Zero Surface Pooling & Natural Percolation
                </h4>
                <p className="text-xs sm:text-sm text-white/80 mt-1 leading-relaxed">
                  {currentRain.permeableReaction}
                </p>
              </div>

              <div className="p-3 bg-black/40 rounded-lg border border-white/10 text-xs text-white/70 space-y-1">
                <span className="text-[10px] uppercase font-bold text-[#a3907c] block">Subterranean Base Status:</span>
                <p className="font-mono text-white/90">{currentRain.reservoirCapacity}</p>
              </div>

              <div className="flex flex-wrap gap-2 text-[10px]">
                <span className="px-2 py-0.5 rounded bg-emerald-950/60 text-emerald-300 border border-emerald-500/20">
                  ✓ Anti-Slip Glass Grip Safe
                </span>
                <span className="px-2 py-0.5 rounded bg-emerald-950/60 text-emerald-300 border border-emerald-500/20">
                  ✓ Protects Foundation Footings
                </span>
                <span className="px-2 py-0.5 rounded bg-emerald-950/60 text-emerald-300 border border-emerald-500/20">
                  ✓ CBPA Wetland Safe
                </span>
              </div>
            </div>

            {/* Traditional Concrete / Non-Permeable Card */}
            <div className="p-5 sm:p-6 rounded-xl bg-[#0e1411] border border-red-500/20 space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-red-950/60 text-red-300 border border-red-500/30 flex items-center">
                  <AlertTriangle className="w-3 h-3 mr-1" />
                  Standard Impermeable Concrete Slab
                </span>
                <span className="text-xs font-mono text-red-400 font-bold">0% Infiltration</span>
              </div>

              <div>
                <h4 className="text-base font-bold text-white">
                  Sheet Runoff, Puddle Accumulation & Settling
                </h4>
                <p className="text-xs sm:text-sm text-white/70 mt-1 leading-relaxed">
                  {currentRain.concreteReaction}
                </p>
              </div>

              <div className="p-3 bg-black/40 rounded-lg border border-white/5 text-xs text-white/60 space-y-1">
                <span className="text-[10px] uppercase font-bold text-red-400 block">Subterranean Base Status:</span>
                <p className="font-mono text-white/70">Dense sand/gravel saturates; trapped water heaves during frost</p>
              </div>

              <div className="flex flex-wrap gap-2 text-[10px]">
                <span className="px-2 py-0.5 rounded bg-red-950/40 text-red-300 border border-red-500/20">
                  ✗ High Hydrostatic Pressure
                </span>
                <span className="px-2 py-0.5 rounded bg-red-950/40 text-red-300 border border-red-500/20">
                  ✗ Breeds Green Algae Slime
                </span>
                <span className="px-2 py-0.5 rounded bg-red-950/40 text-red-300 border border-red-500/20">
                  ✗ Increases County Runoff Fees
                </span>
              </div>
            </div>

          </div>
        </div>

        {/* SECTION 4: GLOUCESTER DRAINAGE HEALTH DIAGNOSTIC & SELF-AUDIT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          
          <div className="lg:col-span-7 bg-[#121915]/95 border border-white/15 rounded-2xl p-6 sm:p-8 shadow-2xl backdrop-blur-sm space-y-6">
            <div>
              <span className="text-xs font-bold text-[#a3907c] uppercase tracking-wider block mb-1">
                Homeowner Property Self-Audit
              </span>
              <h3 className="text-xl sm:text-2xl font-display font-bold text-white">
                Does Your Tidewater Property Suffer from Drainage Stress?
              </h3>
              <p className="text-xs sm:text-sm text-white/60 mt-1">
                Check all conditions that currently affect your driveway, patio, or yard:
              </p>
            </div>

            <div className="space-y-3">
              {[
                {
                  id: 'puddles',
                  title: 'Standing water remains for > 24 hours after a rainfall',
                  desc: 'A clear indicator of dense Tidewater clay subsoil that is choked and unable to percolate surface water.'
                },
                {
                  id: 'algae',
                  title: 'Slippery green or black algae coats walkways & patio pavers',
                  desc: 'Prolonged dampness due to non-porous materials creates persistent biological film and slip risks.'
                },
                {
                  id: 'frost',
                  title: 'Concrete slabs or paver joints are heaving, shifting, or cracked',
                  desc: 'Trapped moisture beneath the surface freezes in winter, creating upward expansive pressure.'
                },
                {
                  id: 'rpa',
                  title: 'Property is located within 500 ft of tidal creek, river, or marsh',
                  desc: 'Subject to strict Chesapeake Bay Preservation Act (CBPA) impervious surface caps requiring permeable solutions.'
                },
                {
                  id: 'washout',
                  title: 'Gravel washouts, mulch ruts, or topsoil erosion along driveways',
                  desc: 'Excessive stormwater volume rushing across non-porous ground washes away landscaping materials.'
                }
              ].map((item) => {
                const isChecked = checkedIssues.includes(item.id);
                return (
                  <div
                    key={item.id}
                    onClick={() => toggleIssue(item.id)}
                    className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start space-x-3.5 ${
                      isChecked
                        ? 'bg-[#18231e] border-[#a3907c]/60 shadow-md'
                        : 'bg-[#0e1411] border-white/10 hover:border-white/20'
                    }`}
                  >
                    <div className={`w-5 h-5 rounded flex items-center justify-center shrink-0 mt-0.5 border transition-all ${
                      isChecked 
                        ? 'bg-[#a3907c] border-[#a3907c] text-[#0d1210]' 
                        : 'border-white/30 bg-transparent'
                    }`}>
                      {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>

                    <div className="flex-1">
                      <h4 className="text-xs sm:text-sm font-bold text-white">
                        {item.title}
                      </h4>
                      <p className="text-[11px] text-white/60 mt-0.5">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Diagnosis Recommendation Card (5 cols) */}
          <div className="lg:col-span-5 bg-gradient-to-br from-[#16201c] via-[#1a2521] to-[#121915] border border-[#a3907c]/40 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6">
            <div>
              <span className="text-[10px] font-mono font-bold text-[#a3907c] uppercase tracking-wider block">
                Engineering Assessment
              </span>
              <h4 className="text-xl font-bold text-white mt-1">
                {checkedIssues.length >= 3 
                  ? 'High Drainage Stress Detected' 
                  : checkedIssues.length >= 1 
                  ? 'Moderate Drainage Vulnerability' 
                  : 'Standard Property Assessment'}
              </h4>
              <p className="text-xs text-white/70 mt-1">
                Based on your {checkedIssues.length} selected conditions in the Tidewater Virginia climate.
              </p>
            </div>

            <div className="space-y-3 text-xs text-white/80">
              <div className="flex items-start space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Recommended Foundation:</strong> Minimum 6"–8" open-graded clean #57 stone base with 6oz non-woven geotextile wrap.
                </span>
              </div>
              <div className="flex items-start space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Recommended Surface:</strong> 18mm Certified Vuba Stone™ resin-bound permeable system to allow 100% natural infiltration.
                </span>
              </div>
              <div className="flex items-start space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Laser Elevation Audit:</strong> Positive 1.5% subgrade slope to divert subsurface water away from home foundation walls.
                </span>
              </div>
            </div>

            {/* Action Trigger */}
            <div className="pt-2 border-t border-white/10 space-y-3">
              <button
                type="button"
                onClick={() => onOpenQuoteModal && onOpenQuoteModal('On-Site Soil & Drainage Evaluation')}
                className="w-full py-3.5 px-4 rounded-xl bg-[#a3907c] hover:bg-[#b5a38f] text-[#0d1210] font-bold text-xs sm:text-sm uppercase tracking-wider transition-all shadow-md flex items-center justify-center space-x-2"
              >
                <span>Request On-Site Drainage Evaluation</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center space-x-2 text-[11px] text-white/50">
                <Clock className="w-3.5 h-3.5 text-[#a3907c]" />
                <span>Travis or our lead estimator will inspect your property laser slope</span>
              </div>
            </div>
          </div>

        </div>

        {/* SECTION 5: FREQUENTLY ASKED GEOTECHNICAL QUESTIONS */}
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h3 className="text-xl sm:text-2xl font-display font-bold text-white uppercase tracking-tight">
              Tidewater Drainage & Soil FAQs
            </h3>
            <p className="text-xs text-white/60 mt-1">
              Common geotechnical questions from Gloucester, Mathews, and York County homeowners.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div 
                  key={idx}
                  className="bg-[#121915] border border-white/10 rounded-xl overflow-hidden transition-all"
                >
                  <button
                    type="button"
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 hover:bg-white/5 transition"
                  >
                    <span className="text-xs sm:text-sm font-bold text-white">
                      {faq.q}
                    </span>
                    <ChevronDown className={`w-4 h-4 text-[#a3907c] shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {isOpen && (
                    <div className="p-4 sm:p-5 pt-0 text-xs sm:text-sm text-white/70 leading-relaxed border-t border-white/5">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
