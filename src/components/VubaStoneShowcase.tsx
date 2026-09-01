import React, { useState } from 'react';
import { 
  Sparkles, 
  Droplets, 
  ShieldCheck, 
  Sun, 
  Layers, 
  CheckCircle2, 
  ArrowRight, 
  Car, 
  Waves, 
  Footprints, 
  Building2, 
  SlidersHorizontal,
  Info,
  ExternalLink
} from 'lucide-react';
import { 
  VUBA_SWATCHES, 
  BEFORE_AFTER_PROJECTS, 
  VUBA_VS_TRADITIONAL_COMPARISON,
  COMPANY_INFO
} from '../data/landscapingData';
import { VubaSwatch } from '../types';

interface VubaStoneShowcaseProps {
  onOpenQuoteModal: () => void;
}

export const VubaStoneShowcase: React.FC<VubaStoneShowcaseProps> = ({ onOpenQuoteModal }) => {
  // Swatch Selector State
  const [selectedSwatch, setSelectedSwatch] = useState<VubaSwatch>(VUBA_SWATCHES[0]);
  const [swatchCategory, setSwatchCategory] = useState<string>('All');

  // Before/After State
  const [selectedProjectIndex, setSelectedProjectIndex] = useState<number>(0);
  const [sliderPosition, setSliderPosition] = useState<number>(50);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  // Technical Layer Breakdown Tab State
  const [activeLayer, setActiveLayer] = useState<number>(0);

  const filteredSwatches = swatchCategory === 'All'
    ? VUBA_SWATCHES
    : VUBA_SWATCHES.filter(s => s.category === swatchCategory);

  const currentProject = BEFORE_AFTER_PROJECTS[selectedProjectIndex];

  const handleSliderMove = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const offset = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (offset / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const layers = [
    {
      id: 0,
      title: 'Top Layer: 18mm UV-Stable Resin Bound Wearing Course',
      subtitle: 'Kiln-Dried European & Domestic Aggregates + 100% Aliphatic Resin',
      thickness: '18mm - 22mm thickness',
      description: 'Hand-troweled natural marble and quartz stones thoroughly coated with clear, two-part polyurethane resin. Produces a completely flat, non-slip, barefoot-safe, and crack-resistant walking and driving surface.',
      benefits: ['100% UV-stable (never discolors to yellow)', 'Resistant to motor oils, gasoline & salt', 'Micro-grip glass beads added for enhanced wet traction']
    },
    {
      id: 1,
      title: 'Middle Base: VubaMac Permeable High-Strength Course',
      subtitle: 'Engineered Hybrid Base System',
      thickness: '50mm - 70mm open-grade structural matrix',
      description: 'The revolutionary VubaMac base replaces standard impermeable asphalt or thick concrete slabs. It provides heavy vehicular structural load bearing while permitting high-volume water filtration directly into the ground.',
      benefits: ['Eliminates need for concrete slab curing times', 'Direct vehicular load rating up to 40+ tons', 'Zero hydraulic pressure buildup during freeze/thaw cycles']
    },
    {
      id: 2,
      title: 'Sub-Base: Open-Graded Stone & Heavy Geotextile Subgrade',
      subtitle: 'Laser-Graded Tidewater Foundation',
      thickness: '150mm - 200mm #57 Crushed Granite',
      description: 'Compacted clean open-graded crushed granite wrapped in heavy-duty non-woven geotextile membrane. Keeps native Virginia clay separated from the stone base and serves as a natural underground retention reservoir.',
      benefits: ['Absorbs torrential coastal rain runoff', 'Stops clay pumping and lateral foundation shifting', '5-Year Structural Integrity Guarantee']
    }
  ];

  const applications = [
    {
      title: 'Resin-Bound Driveways',
      icon: Car,
      description: 'Heavy vehicular load rated with zero oil staining, tire tracking, or loose gravel scatter.',
      popularBlend: 'Gloucester Slate & Basalt'
    },
    {
      title: 'Patios & Courtyards',
      icon: Footprints,
      description: 'Seamless outdoor living with zero weeds, effortless power washing, and barefoot comfort.',
      popularBlend: 'Chesapeake Sand'
    },
    {
      title: 'Cool-Touch Pool Decks',
      icon: Waves,
      description: 'Porous water infiltration prevents slippery puddles. Stays significantly cooler than concrete.',
      popularBlend: 'Rivah Oyster Pearl'
    },
    {
      title: 'Commercial Entrances',
      icon: Building2,
      description: 'ADA-compliant seamless transitions, custom brand aggregate logos, and immense curb appeal.',
      popularBlend: 'Tidewater Granite'
    }
  ];

  return (
    <section id="vuba-stone" className="py-16 lg:py-24 bg-[#0d1210] text-[#f2f4f3] relative overflow-hidden border-b border-white/10">
      
      {/* Decorative background aura */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#a3907c]/5 rounded-full blur-3xl pointer-events-none -z-10"></div>
      <div className="absolute bottom-10 left-0 w-[400px] h-[400px] bg-white/5 rounded-full blur-3xl pointer-events-none -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center space-x-2 bg-[#a3907c]/10 text-[#a3907c] px-3.5 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest mb-3 border border-[#a3907c]/30">
            <Sparkles className="w-3.5 h-3.5 text-[#a3907c]" />
            <span>The Premier Resin Surfacing Technology</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white tracking-tight">
            Certified <span className="italic font-serif text-[#a3907c]">Vuba Stone™</span> <br className="hidden sm:inline" />
            Resin-Bound Architectural Surfacing
          </h2>
          <p className="text-base sm:text-lg text-white/60 mt-4 leading-relaxed font-normal">
            TB Custom Landscaping is Gloucester County’s certified installer of genuine Vuba Stone resin surfacing. Discover the 100% permeable, anti-crack, and puddle-free alternative to cracked concrete and messy asphalt.
          </p>
        </div>

        {/* 4 Core Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          <div className="bg-[#121816] p-6 rounded-sm border border-white/10 shadow-sm hover:border-[#a3907c]/40 transition-all">
            <div className="w-10 h-10 rounded-sm bg-[#a3907c]/15 text-[#a3907c] flex items-center justify-center mb-4 border border-[#a3907c]/20">
              <Droplets className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold uppercase tracking-wider text-white">100% Permeable (SUDS)</h3>
            <p className="text-xs text-white/60 mt-2 leading-relaxed">
              Drains up to <strong className="text-white">850+ gallons of water per hour</strong> per square yard. Eliminates standing puddles, hydroplaning, and coastal storm runoff issues.
            </p>
          </div>

          <div className="bg-[#121816] p-6 rounded-sm border border-white/10 shadow-sm hover:border-[#a3907c]/40 transition-all">
            <div className="w-10 h-10 rounded-sm bg-[#a3907c]/15 text-[#a3907c] flex items-center justify-center mb-4 border border-[#a3907c]/20">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold uppercase tracking-wider text-white">Freeze/Thaw & Crack Resilient</h3>
            <p className="text-xs text-white/60 mt-2 leading-relaxed">
              High-tensile polyurethane resin flexes naturally with Virginia soil shifts, completely resisting the hydraulic cracking that destroys rigid concrete.
            </p>
          </div>

          <div className="bg-[#121816] p-6 rounded-sm border border-white/10 shadow-sm hover:border-[#a3907c]/40 transition-all">
            <div className="w-10 h-10 rounded-sm bg-[#a3907c]/15 text-[#a3907c] flex items-center justify-center mb-4 border border-[#a3907c]/20">
              <Sun className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold uppercase tracking-wider text-white">100% UV-Stable Polyurethane</h3>
            <p className="text-xs text-white/60 mt-2 leading-relaxed">
              Formulated with non-yellowing aliphatic resins that stay crystal clear under intense Tidewater sunlight, maintaining true aggregate colors for decades.
            </p>
          </div>

          <div className="bg-[#121816] p-6 rounded-sm border border-white/10 shadow-sm hover:border-[#a3907c]/40 transition-all">
            <div className="w-10 h-10 rounded-sm bg-[#a3907c]/15 text-[#a3907c] flex items-center justify-center mb-4 border border-[#a3907c]/20">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold uppercase tracking-wider text-white">Weed-Free & Low Maintenance</h3>
            <p className="text-xs text-white/60 mt-2 leading-relaxed">
              Natural stone aggregate is fully locked in place. No loose stones scattering into your grass, no weed growth inside the matrix, and simple hose/blow cleanup.
            </p>
          </div>
        </div>

        {/* Interactive Before & After Transformation Slider */}
        <div className="bg-[#121816] rounded-sm border border-white/10 shadow-2xl p-6 sm:p-8 mb-16">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6 border-b border-white/10 pb-6">
            <div>
              <span className="text-[10px] font-bold text-[#a3907c] uppercase tracking-widest">Interactive Proof of Craftsmanship</span>
              <h3 className="text-2xl sm:text-3xl font-light text-white mt-0.5">
                Before & <span className="italic font-serif text-[#a3907c]">After</span> Transformations
              </h3>
              <p className="text-xs text-white/60 mt-1">
                Drag the interactive slider horizontally to reveal the real transformation.
              </p>
            </div>

            {/* Project Selector Tabs */}
            <div className="flex flex-wrap gap-2">
              {BEFORE_AFTER_PROJECTS.map((proj, idx) => (
                <button
                  key={proj.id}
                  onClick={() => {
                    setSelectedProjectIndex(idx);
                    setSliderPosition(50);
                  }}
                  className={`px-3.5 py-2 rounded-sm text-xs uppercase tracking-wider font-bold transition flex items-center space-x-1.5 ${
                    selectedProjectIndex === idx
                      ? 'bg-[#a3907c] text-[#0d1210] shadow-md'
                      : 'bg-white/5 hover:bg-white/10 text-white/70 border border-white/10'
                  }`}
                >
                  <span>{proj.serviceType}</span>
                  <span className="text-[10px] opacity-75">({proj.location.split(',')[0]})</span>
                </button>
              ))}
            </div>
          </div>

          {/* Draggable Slider Container */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
            
            {/* Visual Interactive Viewport */}
            <div className="lg:col-span-8 space-y-3">
              <div 
                className="relative h-[280px] sm:h-[380px] lg:h-[420px] rounded-sm overflow-hidden shadow-inner cursor-ew-resize select-none border border-white/10 touch-none"
                onMouseMove={(e) => isDragging && handleSliderMove(e)}
                onMouseDown={() => setIsDragging(true)}
                onMouseUp={() => setIsDragging(false)}
                onMouseLeave={() => setIsDragging(false)}
                onTouchMove={(e) => handleSliderMove(e)}
                onClick={(e) => handleSliderMove(e)}
              >
                {/* After Image (Full Base) */}
                <img
                  src={currentProject.afterImage}
                  alt={currentProject.afterAlt}
                  className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                />
                
                {/* Before Image (Clipped by slider position) */}
                <div
                  className="absolute inset-0 overflow-hidden pointer-events-none"
                  style={{ width: `${sliderPosition}%` }}
                >
                  <img
                    src={currentProject.beforeImage}
                    alt={currentProject.beforeAlt}
                    className="absolute inset-0 w-full h-full object-cover max-w-none"
                    style={{ width: '100%', minWidth: '100%', height: '100%' }}
                  />
                  <div className="absolute top-3 sm:top-4 left-3 sm:left-4 bg-[#0d1210]/90 text-white px-2.5 sm:px-3 py-1 rounded-sm text-[9px] sm:text-[10px] font-bold uppercase tracking-wider backdrop-blur-sm border border-white/20">
                    BEFORE: Deteriorated Surface
                  </div>
                </div>

                {/* Right "AFTER" Badge */}
                <div className="absolute top-3 sm:top-4 right-3 sm:right-4 bg-[#0d1210]/90 text-[#a3907c] px-2.5 sm:px-3 py-1 rounded-sm text-[9px] sm:text-[10px] font-bold uppercase tracking-wider backdrop-blur-sm border border-[#a3907c]/40">
                  AFTER: Certified Vuba / Pavers
                </div>

                {/* Slider Handle Divider Line */}
                <div
                  className="absolute top-0 bottom-0 w-0.5 bg-white shadow-2xl pointer-events-none flex items-center justify-center"
                  style={{ left: `${sliderPosition}%` }}
                >
                  <div className="w-9 h-9 sm:w-8 sm:h-8 rounded-full bg-[#a3907c] text-[#0d1210] border-2 border-white flex items-center justify-center shadow-2xl">
                    <SlidersHorizontal className="w-4 h-4 sm:w-3.5 sm:h-3.5" />
                  </div>
                </div>

                {/* Drag Hint at Bottom */}
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-[#0d1210]/85 backdrop-blur-md text-white/90 text-[10px] uppercase tracking-wider px-3 py-1 rounded-full pointer-events-none border border-white/10 whitespace-nowrap">
                  Drag slider to inspect
                </div>
              </div>

              {/* Mobile Rapid Toggle Presets for effortless thumb interaction */}
              <div className="flex items-center justify-between gap-1.5 pt-1">
                <button
                  onClick={() => setSliderPosition(100)}
                  className={`flex-1 min-h-[44px] py-2 px-2 text-[10px] sm:text-xs font-bold uppercase tracking-wider rounded-sm border transition ${
                    sliderPosition > 80
                      ? 'bg-white/15 text-white border-white/30'
                      : 'bg-white/5 text-white/60 border-white/10 hover:text-white'
                  }`}
                >
                  Show Before
                </button>
                <button
                  onClick={() => setSliderPosition(50)}
                  className={`flex-1 min-h-[44px] py-2 px-2 text-[10px] sm:text-xs font-bold uppercase tracking-wider rounded-sm border transition ${
                    sliderPosition >= 30 && sliderPosition <= 70
                      ? 'bg-[#a3907c]/20 text-[#a3907c] border-[#a3907c]/40'
                      : 'bg-white/5 text-white/60 border-white/10 hover:text-white'
                  }`}
                >
                  50/50 Split
                </button>
                <button
                  onClick={() => setSliderPosition(0)}
                  className={`flex-1 min-h-[44px] py-2 px-2 text-[10px] sm:text-xs font-bold uppercase tracking-wider rounded-sm border transition ${
                    sliderPosition < 20
                      ? 'bg-white/15 text-[#a3907c] border-[#a3907c]/40'
                      : 'bg-white/5 text-white/60 border-white/10 hover:text-white'
                  }`}
                >
                  Show After
                </button>
              </div>
            </div>

            {/* Project Details Sidebar */}
            <div className="lg:col-span-4 space-y-4">
              <div className="p-4 sm:p-5 rounded-sm bg-white/5 border border-white/10">
                <span className="text-[10px] font-bold uppercase text-[#a3907c] tracking-widest">
                  Case Study: {currentProject.location}
                </span>
                <h4 className="text-lg sm:text-xl font-light text-white mt-1">
                  {currentProject.title}
                </h4>
                <p className="text-xs text-white/60 mt-2 leading-relaxed">
                  {currentProject.description}
                </p>

                <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-white/10">
                  <div>
                    <span className="text-[10px] text-white/40 font-bold uppercase tracking-wider">Area Size</span>
                    <p className="text-sm font-bold text-white">{currentProject.details.sqFt} Sq.Ft.</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-white/40 font-bold uppercase tracking-wider">Timeline</span>
                    <p className="text-sm font-bold text-white">{currentProject.details.completionTime}</p>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-white/5 rounded-sm border border-white/10 space-y-1.5">
                  <p className="text-[11px] font-bold text-[#a3907c] flex items-center uppercase tracking-wider">
                    <CheckCircle2 className="w-3.5 h-3.5 mr-1 text-[#a3907c]" />
                    Engineered Solution:
                  </p>
                  <p className="text-xs text-white/70">
                    {currentProject.details.solution}
                  </p>
                </div>

                <button
                  onClick={onOpenQuoteModal}
                  className="w-full min-h-[48px] mt-4 py-3 rounded-sm bg-[#a3907c] hover:bg-white text-[#0d1210] text-xs font-bold tracking-wider uppercase transition shadow flex items-center justify-center space-x-1.5 active:scale-[0.98]"
                >
                  <span>Request Similar Transformation</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Interactive Color Swatch & Stone Blend Selector */}
        <div className="bg-[#121816] text-white rounded-sm p-6 sm:p-10 mb-16 border border-white/10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#a3907c]/5 rounded-full blur-3xl pointer-events-none"></div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-[10px] font-bold text-[#a3907c] uppercase tracking-widest flex items-center">
                <Sparkles className="w-3.5 h-3.5 mr-1 text-[#a3907c]" />
                Exclusive Aggregate Blend Collection
              </span>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-light text-white mt-1">
                Interactive <span className="italic font-serif text-[#a3907c]">Vuba Stone</span> Swatch Selector
              </h3>
              <p className="text-xs sm:text-sm text-white/60 mt-2 max-w-2xl">
                Choose from our specially curated Virginian and European natural stone blends. Click any swatch below to preview aggregate grain structure and project recommendations.
              </p>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-2">
              {['All', 'Coastal', 'Modern', 'Classic', 'Earth'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSwatchCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-sm text-xs uppercase tracking-wider font-bold transition ${
                    swatchCategory === cat
                      ? 'bg-[#a3907c] text-[#0d1210] shadow-md'
                      : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white border border-white/10'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Swatch Selection Grid */}
            <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-3.5">
              {filteredSwatches.map((swatch) => {
                const isSelected = selectedSwatch.id === swatch.id;
                return (
                  <div
                    key={swatch.id}
                    onClick={() => setSelectedSwatch(swatch)}
                    className={`cursor-pointer rounded-sm p-3 border transition-all text-left group ${
                      isSelected
                        ? 'bg-[#1a2421] border-[#a3907c] shadow-lg ring-1 ring-[#a3907c]'
                        : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-[#a3907c]/50'
                    }`}
                  >
                    {/* Simulated Stone Texture Swatch Preview */}
                    <div className="relative h-20 rounded-sm overflow-hidden mb-2.5 shadow-inner border border-white/10">
                      <img
                        src={swatch.imageUrl}
                        alt={swatch.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div 
                        className="absolute inset-0 opacity-40 mix-blend-overlay"
                        style={{
                          background: `linear-gradient(135deg, ${swatch.hexPrimary} 0%, ${swatch.hexSecondary} 50%, ${swatch.hexTertiary} 100%)`
                        }}
                      ></div>
                      {swatch.tag && (
                        <span className="absolute bottom-1 right-1 bg-[#0d1210]/90 text-[#a3907c] text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-sm backdrop-blur-sm border border-white/10">
                          {swatch.tag}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center space-x-1.5 mb-1">
                      <span
                        className="w-2.5 h-2.5 rounded-full border border-white/30 shrink-0"
                        style={{ backgroundColor: swatch.hexPrimary }}
                      ></span>
                      <p className="text-xs font-bold text-white truncate group-hover:text-[#a3907c] transition-colors">
                        {swatch.name}
                      </p>
                    </div>

                    <p className="text-[10px] text-white/40 truncate">
                      {swatch.grainSize}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Selected Swatch Detailed Inspector Panel */}
            <div className="lg:col-span-5">
              <div className="bg-[#16201c] rounded-sm p-6 border border-white/10 shadow-xl space-y-4">
                
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#a3907c] tracking-widest px-2 py-0.5 bg-[#a3907c]/10 rounded-sm border border-[#a3907c]/30">
                      {selectedSwatch.category} Aggregate Blend
                    </span>
                    <h4 className="text-2xl font-light text-white mt-1">
                      {selectedSwatch.name}
                    </h4>
                  </div>
                  <div className="flex -space-x-1">
                    <span className="w-5 h-5 rounded-full border border-black" style={{ backgroundColor: selectedSwatch.hexPrimary }}></span>
                    <span className="w-5 h-5 rounded-full border border-black" style={{ backgroundColor: selectedSwatch.hexSecondary }}></span>
                    <span className="w-5 h-5 rounded-full border border-black" style={{ backgroundColor: selectedSwatch.hexTertiary }}></span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-white/70 leading-relaxed font-normal">
                  {selectedSwatch.description}
                </p>

                <div className="space-y-2 pt-2 border-t border-white/10 text-xs">
                  <div className="flex justify-between py-1 border-b border-white/5">
                    <span className="text-white/40">Grain Composition:</span>
                    <strong className="text-white">{selectedSwatch.grainSize}</strong>
                  </div>
                  <div className="flex justify-between py-1 border-b border-white/5">
                    <span className="text-white/40">Permeability Flow:</span>
                    <strong className="text-[#a3907c]">{selectedSwatch.permeabilityRate}</strong>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-white/40">Best Recommended For:</span>
                    <strong className="text-[#a3907c] text-right max-w-[200px]">{selectedSwatch.popularFor}</strong>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={onOpenQuoteModal}
                    className="w-full py-3 rounded-sm bg-[#a3907c] hover:bg-white text-[#0d1210] text-xs font-bold uppercase tracking-wider transition shadow-md flex items-center justify-center space-x-2"
                  >
                    <span>Request Sample of {selectedSwatch.name}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <p className="text-[10px] text-center text-white/40 mt-2 uppercase tracking-wider">
                    Free physical sample kit brought to your on-site consultation in Gloucester.
                  </p>
                </div>

              </div>
            </div>

          </div>
        </div>

        {/* Technical Layer Breakdown */}
        <div className="bg-[#121816] rounded-sm border border-white/10 p-6 sm:p-10 mb-16 shadow-xl">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-[10px] font-bold text-[#a3907c] uppercase tracking-widest">Engineered Structural Anatomy</span>
            <h3 className="text-2xl sm:text-3xl font-light text-white mt-1">
              The 3-Layer <span className="italic font-serif text-[#a3907c]">Vuba Engineering</span> System
            </h3>
            <p className="text-xs text-white/60 mt-2">
              Why Vuba Stone outperforms traditional flat concrete: Click any layer below to inspect the engineering specifications.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Visual Layered Cross Section Diagram */}
            <div className="lg:col-span-5 space-y-3">
              {layers.map((layer, idx) => (
                <div
                  key={layer.id}
                  onClick={() => setActiveLayer(idx)}
                  className={`p-4 rounded-sm cursor-pointer border transition-all text-left ${
                    activeLayer === idx
                      ? 'bg-[#1a2421] text-white border-[#a3907c] shadow-lg translate-x-1'
                      : 'bg-white/5 text-white/80 border-white/10 hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                        activeLayer === idx ? 'bg-[#a3907c] text-[#0d1210]' : 'bg-white/10 text-white'
                      }`}>
                        {idx + 1}
                      </span>
                      <h4 className="text-xs font-bold uppercase tracking-wider truncate max-w-[240px]">
                        {layer.title.split(':')[0]}
                      </h4>
                    </div>
                    <span className={`text-[10px] font-semibold ${activeLayer === idx ? 'text-[#a3907c]' : 'text-white/40'}`}>
                      {layer.thickness}
                    </span>
                  </div>
                  <p className={`text-xs mt-1 truncate ${activeLayer === idx ? 'text-white/70' : 'text-white/40'}`}>
                    {layer.subtitle}
                  </p>
                </div>
              ))}
            </div>

            {/* Layer Detail Inspector */}
            <div className="lg:col-span-7 bg-[#16201c] p-6 rounded-sm border border-white/10">
              <div className="flex items-center space-x-2 text-[10px] font-bold text-[#a3907c] uppercase tracking-widest mb-2">
                <Layers className="w-4 h-4" />
                <span>Layer {activeLayer + 1} Technical Spec</span>
              </div>
              <h4 className="text-xl sm:text-2xl font-light text-white">
                {layers[activeLayer].title}
              </h4>
              <p className="text-xs font-medium text-[#a3907c] mt-1 uppercase tracking-wider">
                {layers[activeLayer].subtitle} • <span>{layers[activeLayer].thickness}</span>
              </p>
              <p className="text-xs sm:text-sm text-white/70 mt-3 leading-relaxed">
                {layers[activeLayer].description}
              </p>

              <div className="mt-4 pt-4 border-t border-white/10 space-y-2">
                <p className="text-[10px] font-bold text-white uppercase tracking-widest">Engineering Benefits:</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {layers[activeLayer].benefits.map((b, i) => (
                    <div key={i} className="flex items-start text-xs text-white/80">
                      <CheckCircle2 className="w-3.5 h-3.5 mr-1.5 text-[#a3907c] shrink-0 mt-0.5" />
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Applications Grid: Driveways, Patios, Pool Decks, Commercial */}
        <div className="mb-16">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-[10px] font-bold text-[#a3907c] uppercase tracking-widest">Versatile Architectural Installations</span>
            <h3 className="text-2xl sm:text-3xl font-light text-white mt-1">
              Engineered for <span className="italic font-serif text-[#a3907c]">Every Property</span> Surface
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {applications.map((app) => {
              const Icon = app.icon;
              return (
                <div key={app.title} className="bg-[#121816] p-6 rounded-sm border border-white/10 shadow-sm hover:border-[#a3907c]/40 transition-all flex flex-col justify-between">
                  <div>
                    <div className="w-10 h-10 rounded-sm bg-[#a3907c]/15 text-[#a3907c] flex items-center justify-center mb-4 border border-[#a3907c]/20">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h4 className="text-base font-bold uppercase tracking-wider text-white">{app.title}</h4>
                    <p className="text-xs text-white/60 mt-2 leading-relaxed">
                      {app.description}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-white/10 text-[10px] text-white/50 uppercase tracking-wider">
                    <span className="font-semibold text-[#a3907c]">Popular Blend:</span> {app.popularBlend}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Comparison Matrix: Vuba Stone vs Concrete vs Asphalt vs Gravel */}
        <div className="bg-[#121816] rounded-sm border border-white/10 overflow-hidden shadow-2xl">
          <div className="p-6 sm:p-8 bg-[#16201c] text-white border-b border-white/10">
            <h3 className="text-xl sm:text-2xl font-light">
              Technical Comparison: <span className="italic font-serif text-[#a3907c]">Vuba Stone</span> vs Traditional Pavement
            </h3>
            <p className="text-xs text-white/60 mt-1">
              Why coastal Virginia homeowners choose resin-bound stone over traditional materials.
            </p>
          </div>

          {/* Mobile Comparison View (Cards for mobile smartphones) */}
          <div className="block md:hidden p-4 space-y-3">
            {VUBA_VS_TRADITIONAL_COMPARISON.map((row, idx) => (
              <div key={idx} className="p-3.5 bg-[#0d1210] rounded-sm border border-white/10 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-white uppercase tracking-wider">{row.feature}</span>
                  <span className="text-[9px] font-bold uppercase px-2 py-0.5 rounded-sm bg-[#a3907c]/20 text-[#a3907c] border border-[#a3907c]/30">
                    Vuba Winner
                  </span>
                </div>
                <div className="p-2.5 bg-[#a3907c]/10 rounded-sm border border-[#a3907c]/30 text-xs text-white font-medium flex items-center">
                  <CheckCircle2 className="w-4 h-4 mr-1.5 text-[#a3907c] shrink-0" />
                  <span><strong>Vuba Stone:</strong> {row.vuba}</span>
                </div>
                <div className="grid grid-cols-3 gap-1.5 text-[10px] text-white/50 pt-1">
                  <div className="p-1.5 bg-white/5 rounded-sm"><strong className="text-white/70 block">Concrete:</strong> {row.concrete}</div>
                  <div className="p-1.5 bg-white/5 rounded-sm"><strong className="text-white/70 block">Asphalt:</strong> {row.asphalt}</div>
                  <div className="p-1.5 bg-white/5 rounded-sm"><strong className="text-white/70 block">Gravel:</strong> {row.looseGravel}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop/Tablet Table View */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#0d1210] text-white/70 uppercase text-[10px] font-bold tracking-wider border-b border-white/10">
                <tr>
                  <th className="p-4 sm:p-5">Performance Metric</th>
                  <th className="p-4 sm:p-5 bg-[#a3907c]/10 text-[#a3907c] font-extrabold border-x border-[#a3907c]/30">
                    Certified Vuba Stone™
                  </th>
                  <th className="p-4 sm:p-5">Poured Concrete</th>
                  <th className="p-4 sm:p-5">Asphalt</th>
                  <th className="p-4 sm:p-5">Loose Gravel</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-white/70">
                {VUBA_VS_TRADITIONAL_COMPARISON.map((row, idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? 'bg-[#121816]' : 'bg-[#0f1513]'}>
                    <td className="p-4 sm:p-5 font-bold uppercase tracking-wider text-white text-[11px]">{row.feature}</td>
                    <td className="p-4 sm:p-5 bg-[#a3907c]/10 text-white font-semibold border-x border-[#a3907c]/30">
                      <div className="flex items-center">
                        <CheckCircle2 className="w-4 h-4 mr-1.5 text-[#a3907c] shrink-0" />
                        <span>{row.vuba}</span>
                      </div>
                    </td>
                    <td className="p-4 sm:p-5 text-white/50">{row.concrete}</td>
                    <td className="p-4 sm:p-5 text-white/50">{row.asphalt}</td>
                    <td className="p-4 sm:p-5 text-white/50">{row.looseGravel}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-4 sm:p-6 bg-[#16201c] border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-2 text-xs text-white/60 text-left">
              <Info className="w-4 h-4 text-[#a3907c] shrink-0" />
              <span>All TB Custom Landscaping Vuba installations include our 5-Year Workmanship Warranty & Lifetime UV Guarantee.</span>
            </div>
            <button
              onClick={onOpenQuoteModal}
              className="w-full sm:w-auto min-h-[48px] px-6 py-3 rounded-sm bg-[#a3907c] hover:bg-white text-[#0d1210] text-xs font-bold uppercase tracking-wider transition shadow flex items-center justify-center active:scale-[0.98]"
            >
              Get Vuba Stone Estimate
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
