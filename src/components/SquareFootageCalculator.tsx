import React, { useState, useMemo } from 'react';
import { 
  Calculator, 
  Ruler, 
  Layers, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  RotateCcw, 
  Shapes, 
  HelpCircle,
  Truck,
  Box,
  Compass,
  CornerDownRight,
  Maximize2
} from 'lucide-react';

interface SquareFootageCalculatorProps {
  onTransferToForm: (data: { 
    service: string; 
    sqFt: string; 
    notes?: string;
  }) => void;
  onTransferToEstimator?: (sqFtNumber: number) => void;
  onOpenQuoteModal?: (serviceType?: string) => void;
}

type ShapeType = 'rectangle' | 'l-shape' | 'circle' | 'driveway-apron';
type ProjectType = 'patio' | 'driveway' | 'pool' | 'walkway';

export const SquareFootageCalculator: React.FC<SquareFootageCalculatorProps> = ({
  onTransferToForm,
  onTransferToEstimator,
  onOpenQuoteModal
}) => {
  // Shape & Project Type
  const [shape, setShape] = useState<ShapeType>('rectangle');
  const [projectCategory, setProjectCategory] = useState<ProjectType>('patio');
  
  // Dimensions for Standard Rectangle
  const [length, setLength] = useState<number>(24);
  const [width, setWidth] = useState<number>(16);

  // Dimensions for L-Shape (Zone A + Zone B)
  const [lZoneALength, setLZoneALength] = useState<number>(20);
  const [lZoneAWidth, setLZoneAWidth] = useState<number>(14);
  const [lZoneBLength, setLZoneBLength] = useState<number>(12);
  const [lZoneBWidth, setLZoneBWidth] = useState<number>(10);

  // Dimensions for Circle / Fire Pit
  const [diameter, setDiameter] = useState<number>(18);

  // Dimensions for Driveway with Apron Flare
  const [driveLength, setDriveLength] = useState<number>(45);
  const [driveWidth, setDriveWidth] = useState<number>(18);
  const [apronWidth, setApronWidth] = useState<number>(24);
  const [apronDepth, setApronDepth] = useState<number>(10);

  // Contractor 10% Cut & Waste Factor
  const [includeCutWaste, setIncludeCutWaste] = useState<boolean>(true);

  // Base depth selection for volume calculations (inches)
  const [baseDepthInches, setBaseDepthInches] = useState<number>(4);

  // Success Feedback
  const [transferredFeedback, setTransferredFeedback] = useState<boolean>(false);

  // Calculate Net Area and Perimeter based on shape
  const { netSqFt, perimeterFt, dimensionSummary } = useMemo(() => {
    let rawSqFt = 0;
    let rawPerimeter = 0;
    let summary = '';

    if (shape === 'rectangle') {
      rawSqFt = Math.max(1, length) * Math.max(1, width);
      rawPerimeter = 2 * (Math.max(1, length) + Math.max(1, width));
      summary = `${length} ft × ${width} ft Rectangle`;
    } else if (shape === 'l-shape') {
      const areaA = Math.max(1, lZoneALength) * Math.max(1, lZoneAWidth);
      const areaB = Math.max(1, lZoneBLength) * Math.max(1, lZoneBWidth);
      rawSqFt = areaA + areaB;
      // Perimeter of L-shape: 2 * (max length + max width) or outline sum
      rawPerimeter = 2 * (Math.max(lZoneALength, lZoneBLength) + (lZoneAWidth + lZoneBWidth));
      summary = `L-Shape (Main: ${lZoneALength}'×${lZoneAWidth}', Return: ${lZoneBLength}'×${lZoneBWidth}')`;
    } else if (shape === 'circle') {
      const radius = Math.max(1, diameter) / 2;
      rawSqFt = Math.round(Math.PI * radius * radius);
      rawPerimeter = Math.round(Math.PI * diameter);
      summary = `${diameter} ft Diameter Circular Space`;
    } else if (shape === 'driveway-apron') {
      const mainArea = Math.max(1, driveLength) * Math.max(1, driveWidth);
      const apronArea = Math.max(1, apronWidth) * Math.max(1, apronDepth);
      rawSqFt = mainArea + apronArea;
      rawPerimeter = 2 * (driveLength + Math.max(driveWidth, apronWidth)) + (apronDepth * 2);
      summary = `Driveway (${driveLength}'×${driveWidth}') + Flare Apron (${apronWidth}'×${apronDepth}')`;
    }

    return {
      netSqFt: Math.round(rawSqFt),
      perimeterFt: Math.round(rawPerimeter),
      dimensionSummary: summary
    };
  }, [
    shape, 
    length, 
    width, 
    lZoneALength, 
    lZoneAWidth, 
    lZoneBLength, 
    lZoneBWidth, 
    diameter, 
    driveLength, 
    driveWidth, 
    apronWidth, 
    apronDepth
  ]);

  // Total with or without contractor 10% allowance
  const totalSqFt = useMemo(() => {
    return includeCutWaste ? Math.round(netSqFt * 1.10) : netSqFt;
  }, [netSqFt, includeCutWaste]);

  // Estimations for materials
  const materialEstimates = useMemo(() => {
    // Cubic yards of crushed base aggregate = (sqFt * (depthInInches / 12)) / 27
    const cubicYardsBase = ((totalSqFt * (baseDepthInches / 12)) / 27).toFixed(1);
    // Base tonnage (approx 1.4 tons per cubic yard for compacted #57 blue granite)
    const baseTonnage = (parseFloat(cubicYardsBase) * 1.4).toFixed(1);
    // Vuba Stone units (1 unit per ~16.5 sq ft at 18mm standard thickness)
    const vubaUnits = Math.ceil(totalSqFt / 16.5);
    // Linear feet of aluminum edging / border pavers
    const borderFt = perimeterFt;

    return {
      cubicYardsBase,
      baseTonnage,
      vubaUnits,
      borderFt
    };
  }, [totalSqFt, perimeterFt, baseDepthInches]);

  // Quick Preset Handlers
  const handleApplyPreset = (presetName: string) => {
    if (presetName === 'dining-patio') {
      setShape('rectangle');
      setProjectCategory('patio');
      setLength(18);
      setWidth(14);
    } else if (presetName === 'suburban-driveway') {
      setShape('driveway-apron');
      setProjectCategory('driveway');
      setDriveLength(40);
      setDriveWidth(20);
      setApronWidth(26);
      setApronDepth(10);
    } else if (presetName === 'fire-pit-circle') {
      setShape('circle');
      setProjectCategory('patio');
      setDiameter(16);
    } else if (presetName === 'l-patio') {
      setShape('l-shape');
      setProjectCategory('patio');
      setLZoneALength(22);
      setLZoneAWidth(14);
      setLZoneBLength(14);
      setLZoneBWidth(10);
    } else if (presetName === 'walkway') {
      setShape('rectangle');
      setProjectCategory('walkway');
      setLength(32);
      setWidth(5);
    }
  };

  // Service title helper
  const getServiceTypeTitle = () => {
    switch (projectCategory) {
      case 'patio': return 'Custom Paver Patio & Outdoor Living';
      case 'driveway': return 'Certified Vuba Stone Resin Surfacing';
      case 'pool': return 'Vuba Stone Permeable Pool Surround';
      case 'walkway': return 'Permeable Paver Driveway / Walkway';
      default: return 'Custom Paver Patio & Outdoor Living';
    }
  };

  // Transfer dimensions directly into the lead capture form
  const handleApplyToForm = () => {
    const wasteText = includeCutWaste ? ' (+10% cut allowance)' : '';
    const formattedSqFt = `${totalSqFt} Sq.Ft. (${dimensionSummary}${wasteText})`;
    const technicalNotes = `[Calculated Dimensions]: ${dimensionSummary}. Total Surface Area: ${netSqFt} sq ft net (${totalSqFt} sq ft with 10% allowance). Perimeter: ${perimeterFt} linear ft. Estimated Base: ${materialEstimates.cubicYardsBase} cu.yds (#57 stone at ${baseDepthInches}" depth).`;

    onTransferToForm({
      service: getServiceTypeTitle(),
      sqFt: formattedSqFt,
      notes: technicalNotes
    });

    setTransferredFeedback(true);
    setTimeout(() => setTransferredFeedback(false), 3000);
  };

  // Send directly to the cost estimator
  const handleSendToEstimator = () => {
    if (onTransferToEstimator) {
      onTransferToEstimator(totalSqFt);
    }
    const el = document.getElementById('estimator');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="sqft-calculator" 
      aria-label="Square Footage and Dimension Calculator"
      className="py-16 sm:py-24 bg-[#0d1210] relative overflow-hidden text-white border-t border-white/10"
    >
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-1/4 w-96 h-96 bg-[#a3907c]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl"></div>
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(#a3907c 1px, transparent 1px), linear-gradient(90deg, #a3907c 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }}
        ></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#16201c] border border-[#a3907c]/30 text-[#a3907c] text-xs font-bold uppercase tracking-widest mb-4 shadow-sm">
            <Ruler className="w-3.5 h-3.5 text-[#a3907c]" />
            <span>Interactive Dimensional Planning Tool</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-white tracking-tight uppercase">
            Square Footage <span className="text-[#a3907c]">Calculator</span>
          </h2>

          <p className="mt-3 text-sm sm:text-base text-white/70 max-w-2xl mx-auto leading-relaxed">
            Estimate your patio, driveway, or walkway dimensions with precision. Instantly calculate net square footage, edge restraint linear footage, and base aggregate requirements.
          </p>

          {/* Quick Real-World Presets */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-xs">
            <span className="text-white/50 text-[11px] uppercase tracking-wider font-semibold mr-1">
              Common Presets:
            </span>
            <button
              type="button"
              onClick={() => handleApplyPreset('dining-patio')}
              className="px-3 py-1.5 rounded-md bg-[#16201c] hover:bg-[#a3907c] hover:text-[#0d1210] border border-white/10 hover:border-[#a3907c] text-white/80 transition-all font-medium text-xs"
            >
              18' × 14' Dining Patio (252 sq ft)
            </button>
            <button
              type="button"
              onClick={() => handleApplyPreset('suburban-driveway')}
              className="px-3 py-1.5 rounded-md bg-[#16201c] hover:bg-[#a3907c] hover:text-[#0d1210] border border-white/10 hover:border-[#a3907c] text-white/80 transition-all font-medium text-xs"
            >
              2-Car Driveway + Flare (1,040 sq ft)
            </button>
            <button
              type="button"
              onClick={() => handleApplyPreset('l-patio')}
              className="px-3 py-1.5 rounded-md bg-[#16201c] hover:bg-[#a3907c] hover:text-[#0d1210] border border-white/10 hover:border-[#a3907c] text-white/80 transition-all font-medium text-xs"
            >
              L-Shaped Living Area (448 sq ft)
            </button>
            <button
              type="button"
              onClick={() => handleApplyPreset('fire-pit-circle')}
              className="px-3 py-1.5 rounded-md bg-[#16201c] hover:bg-[#a3907c] hover:text-[#0d1210] border border-white/10 hover:border-[#a3907c] text-white/80 transition-all font-medium text-xs"
            >
              16' Fire Pit Circle (201 sq ft)
            </button>
          </div>
        </div>

        {/* Main Calculator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Shape Controls & Dimension Sliders (7 cols) */}
          <div className="lg:col-span-7 bg-[#121915]/95 border border-white/15 rounded-2xl p-6 sm:p-8 shadow-2xl backdrop-blur-sm space-y-6">
            
            {/* Shape Selector Bar */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#a3907c] mb-2.5">
                Step 1: Choose Layout Geometry
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {[
                  { id: 'rectangle', label: 'Rectangle / Square', icon: '■' },
                  { id: 'l-shape', label: 'L-Shaped (2-Zone)', icon: '┏' },
                  { id: 'circle', label: 'Circle / Fire Pit', icon: '●' },
                  { id: 'driveway-apron', label: 'Driveway + Apron', icon: '▲' },
                ].map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setShape(s.id as ShapeType)}
                    className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center justify-center min-h-[58px] ${
                      shape === s.id
                        ? 'bg-[#a3907c] text-[#0d1210] border-[#a3907c] font-bold shadow-md'
                        : 'bg-[#16201c] text-white/70 border-white/10 hover:border-white/30 hover:text-white'
                    }`}
                  >
                    <span className="text-base mb-0.5 leading-none">{s.icon}</span>
                    <span className="text-xs">{s.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Project Category Tag */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#a3907c] mb-2.5">
                Step 2: Project Classification
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                {[
                  { id: 'patio', label: 'Patio & Outdoor Living' },
                  { id: 'driveway', label: 'Permeable Driveway' },
                  { id: 'pool', label: 'Pool Deck Lanai' },
                  { id: 'walkway', label: 'Front Entry / Walkway' },
                ].map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setProjectCategory(c.id as ProjectType)}
                    className={`py-2 px-3 rounded-lg border text-center transition-all ${
                      projectCategory === c.id
                        ? 'bg-white/20 text-white border-white/40 font-bold'
                        : 'bg-white/5 text-white/60 border-white/10 hover:bg-white/10'
                    }`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Dimensional Controls (Dynamic based on selected shape) */}
            <div className="border-t border-white/10 pt-6 space-y-6">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-[#a3907c]">
                  Step 3: Enter Dimensions (Feet)
                </label>
                <span className="text-xs text-white/50">
                  Sliders or direct text entry
                </span>
              </div>

              {/* RECTANGLE CONTROLS */}
              {shape === 'rectangle' && (
                <div className="space-y-5">
                  {/* Length */}
                  <div>
                    <div className="flex justify-between items-center text-sm mb-2">
                      <span className="font-semibold text-white">Length (Longer Side)</span>
                      <div className="flex items-center space-x-1.5">
                        <input
                          type="number"
                          min="1"
                          max="200"
                          value={length}
                          onChange={(e) => setLength(Math.max(1, parseInt(e.target.value) || 1))}
                          className="w-20 px-2.5 py-1 bg-[#1a2521] border border-white/20 rounded text-right text-white font-mono text-sm focus:outline-none focus:border-[#a3907c]"
                        />
                        <span className="text-white/60 text-xs">ft</span>
                      </div>
                    </div>
                    <input
                      type="range"
                      min="6"
                      max="100"
                      value={length}
                      onChange={(e) => setLength(parseInt(e.target.value))}
                      className="w-full h-2 bg-[#1a2521] rounded-lg appearance-none cursor-pointer accent-[#a3907c]"
                    />
                    <div className="flex justify-between text-[10px] text-white/40 mt-1 font-mono">
                      <span>6 ft</span>
                      <span>50 ft</span>
                      <span>100 ft</span>
                    </div>
                  </div>

                  {/* Width */}
                  <div>
                    <div className="flex justify-between items-center text-sm mb-2">
                      <span className="font-semibold text-white">Width (Shorter Side)</span>
                      <div className="flex items-center space-x-1.5">
                        <input
                          type="number"
                          min="1"
                          max="200"
                          value={width}
                          onChange={(e) => setWidth(Math.max(1, parseInt(e.target.value) || 1))}
                          className="w-20 px-2.5 py-1 bg-[#1a2521] border border-white/20 rounded text-right text-white font-mono text-sm focus:outline-none focus:border-[#a3907c]"
                        />
                        <span className="text-white/60 text-xs">ft</span>
                      </div>
                    </div>
                    <input
                      type="range"
                      min="4"
                      max="80"
                      value={width}
                      onChange={(e) => setWidth(parseInt(e.target.value))}
                      className="w-full h-2 bg-[#1a2521] rounded-lg appearance-none cursor-pointer accent-[#a3907c]"
                    />
                    <div className="flex justify-between text-[10px] text-white/40 mt-1 font-mono">
                      <span>4 ft</span>
                      <span>40 ft</span>
                      <span>80 ft</span>
                    </div>
                  </div>
                </div>
              )}

              {/* L-SHAPE CONTROLS */}
              {shape === 'l-shape' && (
                <div className="space-y-6">
                  {/* Zone A */}
                  <div className="p-4 rounded-xl bg-[#16201c] border border-white/10 space-y-4">
                    <span className="text-xs font-bold text-[#a3907c] uppercase tracking-wider block">
                      Main Patio Section (Zone A)
                    </span>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] text-white/70 mb-1">Length (ft)</label>
                        <input
                          type="number"
                          min="4"
                          max="100"
                          value={lZoneALength}
                          onChange={(e) => setLZoneALength(Math.max(1, parseInt(e.target.value) || 1))}
                          className="w-full px-3 py-2 bg-[#121915] border border-white/20 rounded text-white font-mono text-sm focus:border-[#a3907c]"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] text-white/70 mb-1">Width (ft)</label>
                        <input
                          type="number"
                          min="4"
                          max="100"
                          value={lZoneAWidth}
                          onChange={(e) => setLZoneAWidth(Math.max(1, parseInt(e.target.value) || 1))}
                          className="w-full px-3 py-2 bg-[#121915] border border-white/20 rounded text-white font-mono text-sm focus:border-[#a3907c]"
                        />
                      </div>
                    </div>
                    <p className="text-[11px] text-white/50 text-right">
                      Zone A Subtotal: <strong>{lZoneALength * lZoneAWidth} sq ft</strong>
                    </p>
                  </div>

                  {/* Zone B */}
                  <div className="p-4 rounded-xl bg-[#16201c] border border-white/10 space-y-4">
                    <span className="text-xs font-bold text-[#a3907c] uppercase tracking-wider block">
                      Return / Side Extension (Zone B)
                    </span>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] text-white/70 mb-1">Length (ft)</label>
                        <input
                          type="number"
                          min="4"
                          max="100"
                          value={lZoneBLength}
                          onChange={(e) => setLZoneBLength(Math.max(1, parseInt(e.target.value) || 1))}
                          className="w-full px-3 py-2 bg-[#121915] border border-white/20 rounded text-white font-mono text-sm focus:border-[#a3907c]"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] text-white/70 mb-1">Width (ft)</label>
                        <input
                          type="number"
                          min="4"
                          max="100"
                          value={lZoneBWidth}
                          onChange={(e) => setLZoneBWidth(Math.max(1, parseInt(e.target.value) || 1))}
                          className="w-full px-3 py-2 bg-[#121915] border border-white/20 rounded text-white font-mono text-sm focus:border-[#a3907c]"
                        />
                      </div>
                    </div>
                    <p className="text-[11px] text-white/50 text-right">
                      Zone B Subtotal: <strong>{lZoneBLength * lZoneBWidth} sq ft</strong>
                    </p>
                  </div>
                </div>
              )}

              {/* CIRCLE CONTROLS */}
              {shape === 'circle' && (
                <div className="space-y-5">
                  <div>
                    <div className="flex justify-between items-center text-sm mb-2">
                      <span className="font-semibold text-white">Full Diameter Across Circle</span>
                      <div className="flex items-center space-x-1.5">
                        <input
                          type="number"
                          min="4"
                          max="80"
                          value={diameter}
                          onChange={(e) => setDiameter(Math.max(1, parseInt(e.target.value) || 1))}
                          className="w-20 px-2.5 py-1 bg-[#1a2521] border border-white/20 rounded text-right text-white font-mono text-sm focus:outline-none focus:border-[#a3907c]"
                        />
                        <span className="text-white/60 text-xs">ft</span>
                      </div>
                    </div>
                    <input
                      type="range"
                      min="6"
                      max="50"
                      value={diameter}
                      onChange={(e) => setDiameter(parseInt(e.target.value))}
                      className="w-full h-2 bg-[#1a2521] rounded-lg appearance-none cursor-pointer accent-[#a3907c]"
                    />
                    <div className="flex justify-between text-[10px] text-white/40 mt-1 font-mono">
                      <span>6 ft (Compact Fire Pit)</span>
                      <span>18 ft (Medium Lounge)</span>
                      <span>50 ft (Estate Courtyard)</span>
                    </div>
                  </div>
                </div>
              )}

              {/* DRIVEWAY + APRON CONTROLS */}
              {shape === 'driveway-apron' && (
                <div className="space-y-5">
                  <div className="p-4 rounded-xl bg-[#16201c] border border-white/10 space-y-4">
                    <span className="text-xs font-bold text-[#a3907c] uppercase tracking-wider block">
                      Main Driveway Run
                    </span>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] text-white/70 mb-1">Drive Length (ft)</label>
                        <input
                          type="number"
                          min="10"
                          max="200"
                          value={driveLength}
                          onChange={(e) => setDriveLength(Math.max(1, parseInt(e.target.value) || 1))}
                          className="w-full px-3 py-2 bg-[#121915] border border-white/20 rounded text-white font-mono text-sm focus:border-[#a3907c]"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] text-white/70 mb-1">Drive Width (ft)</label>
                        <input
                          type="number"
                          min="8"
                          max="60"
                          value={driveWidth}
                          onChange={(e) => setDriveWidth(Math.max(1, parseInt(e.target.value) || 1))}
                          className="w-full px-3 py-2 bg-[#121915] border border-white/20 rounded text-white font-mono text-sm focus:border-[#a3907c]"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-[#16201c] border border-white/10 space-y-4">
                    <span className="text-xs font-bold text-[#a3907c] uppercase tracking-wider block">
                      Road Transition / Turnaround Flare Apron
                    </span>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] text-white/70 mb-1">Flare Width (ft)</label>
                        <input
                          type="number"
                          min="8"
                          max="80"
                          value={apronWidth}
                          onChange={(e) => setApronWidth(Math.max(1, parseInt(e.target.value) || 1))}
                          className="w-full px-3 py-2 bg-[#121915] border border-white/20 rounded text-white font-mono text-sm focus:border-[#a3907c]"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] text-white/70 mb-1">Flare Depth (ft)</label>
                        <input
                          type="number"
                          min="4"
                          max="40"
                          value={apronDepth}
                          onChange={(e) => setApronDepth(Math.max(1, parseInt(e.target.value) || 1))}
                          className="w-full px-3 py-2 bg-[#121915] border border-white/20 rounded text-white font-mono text-sm focus:border-[#a3907c]"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Contractor Cut & Waste Factor Toggle */}
              <div className="p-4 rounded-xl bg-[#16201c] border border-white/10 flex items-center justify-between gap-4">
                <div className="flex items-start space-x-3">
                  <div className="p-2 rounded-lg bg-[#a3907c]/20 text-[#a3907c] shrink-0 mt-0.5">
                    <Layers className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs sm:text-sm font-bold text-white block">
                      Include +10% Contractor Cut & Border Waste
                    </span>
                    <p className="text-[11px] text-white/60">
                      Standard ICPI & Vuba recommendation for angle cuts, curved perimeters, and perimeter transitions.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIncludeCutWaste(!includeCutWaste)}
                  className={`w-12 h-6 rounded-full transition-colors relative shrink-0 ${
                    includeCutWaste ? 'bg-[#a3907c]' : 'bg-white/20'
                  }`}
                >
                  <span 
                    className={`absolute top-1 w-4 h-4 rounded-full bg-[#0d1210] transition-transform ${
                      includeCutWaste ? 'left-7' : 'left-1'
                    }`}
                  />
                </button>
              </div>

              {/* Sub-Base Depth Selection */}
              <div className="flex items-center justify-between text-xs text-white/70 pt-2">
                <span>Crushed Base Depth Specification:</span>
                <div className="flex space-x-2">
                  {[
                    { depth: 4, label: '4" (Pedestrian Patio)' },
                    { depth: 6, label: '6" (Standard Vehicular)' },
                    { depth: 8, label: '8" (Heavy Duty / Tidewater)' },
                  ].map((d) => (
                    <button
                      key={d.depth}
                      type="button"
                      onClick={() => setBaseDepthInches(d.depth)}
                      className={`px-2.5 py-1 rounded text-[11px] font-medium border transition-all ${
                        baseDepthInches === d.depth
                          ? 'bg-[#a3907c] text-[#0d1210] border-[#a3907c] font-bold'
                          : 'bg-white/5 border-white/10 text-white/60 hover:text-white'
                      }`}
                    >
                      {d.label}
                    </button>
                  ))}
                </div>
              </div>

            </div>

          </div>

          {/* Right Column: Dynamic Schematic, Results & Form Integration (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Architectural Blueprint Schematic Card */}
            <div className="bg-[#121915]/95 border border-white/15 rounded-2xl p-6 shadow-2xl backdrop-blur-sm">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-[#a3907c] flex items-center">
                  <Compass className="w-3.5 h-3.5 mr-1.5" />
                  Live Geometric Layout Blueprint
                </span>
                <span className="text-[10px] font-mono text-white/50 bg-[#16201c] px-2 py-0.5 rounded border border-white/10">
                  SCALE: RELATIVE
                </span>
              </div>

              {/* SVG Visualizer */}
              <div className="relative w-full h-48 bg-[#0a0e0c] rounded-xl border border-white/10 flex items-center justify-center overflow-hidden p-4">
                {/* Blueprint grid lines */}
                <div 
                  className="absolute inset-0 opacity-15"
                  style={{
                    backgroundImage: `linear-gradient(#a3907c 1px, transparent 1px), linear-gradient(90deg, #a3907c 1px, transparent 1px)`,
                    backgroundSize: '16px 16px'
                  }}
                ></div>

                {/* SVG Graphics based on shape */}
                {shape === 'rectangle' && (
                  <svg className="w-full h-full" viewBox="0 0 240 140">
                    <rect
                      x="40"
                      y="25"
                      width="160"
                      height="90"
                      fill="#a3907c"
                      fillOpacity="0.18"
                      stroke="#a3907c"
                      strokeWidth="2"
                      strokeDasharray="4 2"
                      rx="4"
                    />
                    {/* Dimension Arrows */}
                    <line x1="40" y1="15" x2="200" y2="15" stroke="#ffffff" strokeWidth="1" />
                    <text x="120" y="12" fill="#ffffff" fontSize="9" textAnchor="middle" fontFamily="monospace">
                      {length} FT LENGTH
                    </text>
                    <line x1="210" y1="25" x2="210" y2="115" stroke="#ffffff" strokeWidth="1" />
                    <text x="215" y="73" fill="#ffffff" fontSize="9" textAnchor="start" fontFamily="monospace">
                      {width} FT
                    </text>
                    {/* Center Area Badge */}
                    <rect x="80" y="55" width="80" height="28" fill="#121915" rx="4" stroke="#a3907c" strokeWidth="1" />
                    <text x="120" y="73" fill="#a3907c" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
                      {netSqFt} SQ. FT.
                    </text>
                  </svg>
                )}

                {shape === 'l-shape' && (
                  <svg className="w-full h-full" viewBox="0 0 240 140">
                    <polygon
                      points="40,20 180,20 180,75 110,75 110,120 40,120"
                      fill="#a3907c"
                      fillOpacity="0.2"
                      stroke="#a3907c"
                      strokeWidth="2"
                    />
                    <text x="110" y="15" fill="#ffffff" fontSize="8" textAnchor="middle" fontFamily="monospace">
                      Zone A: {lZoneALength}' × {lZoneAWidth}'
                    </text>
                    <text x="75" y="132" fill="#ffffff" fontSize="8" textAnchor="middle" fontFamily="monospace">
                      Zone B: {lZoneBLength}' × {lZoneBWidth}'
                    </text>
                    <rect x="65" y="45" width="80" height="24" fill="#121915" rx="4" stroke="#a3907c" strokeWidth="1" />
                    <text x="105" y="61" fill="#a3907c" fontSize="10" fontWeight="bold" textAnchor="middle">
                      {netSqFt} SQ FT TOTAL
                    </text>
                  </svg>
                )}

                {shape === 'circle' && (
                  <svg className="w-full h-full" viewBox="0 0 240 140">
                    <circle
                      cx="120"
                      cy="70"
                      r="50"
                      fill="#a3907c"
                      fillOpacity="0.2"
                      stroke="#a3907c"
                      strokeWidth="2"
                      strokeDasharray="4 2"
                    />
                    <line x1="70" y1="70" x2="170" y2="70" stroke="#ffffff" strokeWidth="1" strokeDasharray="2 2" />
                    <text x="120" y="65" fill="#ffffff" fontSize="9" textAnchor="middle" fontFamily="monospace">
                      DIAMETER: {diameter} FT
                    </text>
                    <rect x="85" y="80" width="70" height="22" fill="#121915" rx="4" stroke="#a3907c" strokeWidth="1" />
                    <text x="120" y="95" fill="#a3907c" fontSize="10" fontWeight="bold" textAnchor="middle">
                      {netSqFt} SQ FT
                    </text>
                  </svg>
                )}

                {shape === 'driveway-apron' && (
                  <svg className="w-full h-full" viewBox="0 0 240 140">
                    {/* Main Driveway */}
                    <polygon
                      points="80,15 160,15 175,90 200,125 40,125 65,90"
                      fill="#a3907c"
                      fillOpacity="0.2"
                      stroke="#a3907c"
                      strokeWidth="2"
                    />
                    <text x="120" y="12" fill="#ffffff" fontSize="8" textAnchor="middle" fontFamily="monospace">
                      Driveway: {driveLength}' × {driveWidth}'
                    </text>
                    <text x="120" y="134" fill="#ffffff" fontSize="8" textAnchor="middle" fontFamily="monospace">
                      Road Apron Flare: {apronWidth}' × {apronDepth}'
                    </text>
                    <rect x="80" y="55" width="80" height="24" fill="#121915" rx="4" stroke="#a3907c" strokeWidth="1" />
                    <text x="120" y="71" fill="#a3907c" fontSize="10" fontWeight="bold" textAnchor="middle">
                      {netSqFt} SQ FT
                    </text>
                  </svg>
                )}
              </div>

              {/* Key Results Numbers Card */}
              <div className="mt-5 p-4 rounded-xl bg-gradient-to-br from-[#16221c] to-[#121915] border border-[#a3907c]/30">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-semibold text-white/70">
                    {includeCutWaste ? 'Total Recommended Square Footage' : 'Net Exact Square Footage'}
                  </span>
                  {includeCutWaste && (
                    <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/30">
                      +10% Contractor Factor Included
                    </span>
                  )}
                </div>

                <div className="flex items-baseline space-x-2">
                  <span className="text-3xl sm:text-4xl font-display font-black text-white tracking-tight">
                    {totalSqFt.toLocaleString()}
                  </span>
                  <span className="text-sm font-bold text-[#a3907c] uppercase">
                    Square Feet
                  </span>
                </div>

                <p className="text-xs text-white/50 mt-1 font-mono">
                  {dimensionSummary} {includeCutWaste && `(Net: ${netSqFt} sq ft)`}
                </p>
              </div>

              {/* Material Quantification Grid */}
              <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-lg bg-[#0e1411] border border-white/10">
                  <div className="flex items-center space-x-1.5 text-white/50 text-[11px] mb-1">
                    <Ruler className="w-3.5 h-3.5 text-[#a3907c]" />
                    <span>Perimeter Border</span>
                  </div>
                  <p className="text-base font-bold text-white font-mono">
                    {perimeterFt} <span className="text-xs font-normal text-white/60">Linear Ft</span>
                  </p>
                  <span className="text-[10px] text-white/40 block mt-0.5">
                    For edge restraint & trims
                  </span>
                </div>

                <div className="p-3 rounded-lg bg-[#0e1411] border border-white/10">
                  <div className="flex items-center space-x-1.5 text-white/50 text-[11px] mb-1">
                    <Truck className="w-3.5 h-3.5 text-[#a3907c]" />
                    <span>Crushed Base (#57)</span>
                  </div>
                  <p className="text-base font-bold text-white font-mono">
                    {materialEstimates.cubicYardsBase} <span className="text-xs font-normal text-white/60">Cu. Yds</span>
                  </p>
                  <span className="text-[10px] text-white/40 block mt-0.5">
                    ~{materialEstimates.baseTonnage} tons at {baseDepthInches}" depth
                  </span>
                </div>

                <div className="p-3 rounded-lg bg-[#0e1411] border border-white/10 col-span-2 flex items-center justify-between">
                  <div>
                    <div className="flex items-center space-x-1.5 text-white/50 text-[11px] mb-0.5">
                      <Box className="w-3.5 h-3.5 text-[#a3907c]" />
                      <span>Certified Vuba Stone™ Kit Matrix</span>
                    </div>
                    <span className="text-xs text-white/80">
                      Approx. <strong className="text-white font-mono">{materialEstimates.vubaUnits} kits</strong> (aggregate + aliphatic resin)
                    </span>
                  </div>
                  <span className="text-[10px] bg-white/5 px-2 py-1 rounded text-[#a3907c] font-bold">
                    18mm Heavy Vehicular
                  </span>
                </div>
              </div>

              {/* INTEGRATION ACTION BUTTONS */}
              <div className="mt-6 space-y-3">
                {/* Primary Button: Apply directly to Lead Form */}
                <button
                  type="button"
                  onClick={handleApplyToForm}
                  className="w-full py-3.5 px-4 rounded-xl bg-[#a3907c] hover:bg-[#b5a38f] text-[#0d1210] font-bold text-xs sm:text-sm uppercase tracking-wider transition-all shadow-lg hover:shadow-[#a3907c]/20 flex items-center justify-center space-x-2"
                >
                  {transferredFeedback ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-[#0d1210]" />
                      <span>Applied to Quote Form Below!</span>
                    </>
                  ) : (
                    <>
                      <span>Apply Dimensions to Quote Form</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                {/* Secondary Button: Transfer to Cost Estimator */}
                <button
                  type="button"
                  onClick={handleSendToEstimator}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#16201c] hover:bg-[#1f2c26] text-white text-xs font-semibold border border-white/15 transition-all flex items-center justify-center space-x-2"
                >
                  <Calculator className="w-3.5 h-3.5 text-[#a3907c]" />
                  <span>Send {totalSqFt} Sq Ft to Cost Estimator</span>
                </button>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
