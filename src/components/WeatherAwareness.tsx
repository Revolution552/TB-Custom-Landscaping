import React, { useState } from 'react';
import { 
  Sun, 
  CloudRain, 
  Thermometer, 
  Droplets, 
  Clock, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  Footprints, 
  Car, 
  Umbrella, 
  Wind,
  Info,
  Calendar,
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface WeatherAwarenessProps {
  onOpenQuoteModal: () => void;
}

interface SeasonPreset {
  id: string;
  name: string;
  temp: number;
  humidity: number;
  label: string;
  seasonDesc: string;
}

const PRESETS: SeasonPreset[] = [
  {
    id: 'spring',
    name: 'Prime Tidewater Spring',
    temp: 70,
    humidity: 60,
    label: '70°F · Benchmark Ideal',
    seasonDesc: 'Optimal resin cross-linking speed and comfortable working times.'
  },
  {
    id: 'summer',
    name: 'Midsummer Coastal Heat',
    temp: 88,
    humidity: 78,
    label: '88°F · High Heat',
    seasonDesc: 'Rapid curing; TB Custom utilizes morning pours and shade canopies.'
  },
  {
    id: 'autumn',
    name: 'Crisp Virginia Autumn',
    temp: 55,
    humidity: 50,
    label: '55°F · Moderate Cool',
    seasonDesc: 'Gentle curing; manufacturer-certified accelerators keep timelines on schedule.'
  },
  {
    id: 'winter',
    name: 'Winter Threshold Window',
    temp: 42,
    humidity: 45,
    label: '42°F · Cold Minimum',
    seasonDesc: 'Low thermal baseline; requires daytime thermal window confirmation.'
  }
];

export const WeatherAwareness: React.FC<WeatherAwarenessProps> = ({ onOpenQuoteModal }) => {
  const [temperature, setTemperature] = useState<number>(70);
  const [humidity, setHumidity] = useState<number>(60);
  const [isWetSurface, setIsWetSurface] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'calculator' | 'lifecycle' | 'protocols'>('calculator');

  // Calculate curing dynamics based on temperature & humidity
  const getCuringCalculations = (temp: number, humid: number, wet: boolean) => {
    if (wet) {
      return {
        status: 'Hazardous / Postponed',
        statusColor: 'text-amber-400 bg-amber-400/10 border-amber-400/30',
        potLife: 'N/A',
        rainSafeHours: 'Substrate must be 100% dry',
        footTrafficHours: 'Installation Paused',
        vehicleHours: 'Installation Paused',
        protocolBadge: 'Substrate Moisture Exceeds Safe Limit',
        explanation: 'Resin cannot be troweled over wet foundations. Moisture traps can cause polyurethane clouding or foaming. TB Custom reschedules free of charge until the substrate is thoroughly dry.',
        tbProtocol: 'We conduct pre-pour electronic calcium carbide or digital pin moisture testing. Moisture must be <5% before batching aggregates.'
      };
    }

    if (temp < 40) {
      return {
        status: 'Below Thermal Threshold',
        statusColor: 'text-sky-300 bg-sky-300/10 border-sky-300/30',
        potLife: 'Paused (<40°F)',
        rainSafeHours: 'Thermal Lockout',
        footTrafficHours: 'Installation Paused',
        vehicleHours: 'Installation Paused',
        protocolBadge: 'Postponed for Temperature Protection',
        explanation: 'Polyurethane resins cannot properly cross-link below 40°F (4°C). Attempting to lay resin in near-freezing temperatures compromises long-term tensile strength.',
        tbProtocol: 'TB Custom holds installations until ambient day temperatures climb above 45°F to preserve our 5-Year Workmanship Warranty.'
      };
    }

    if (temp >= 85) {
      return {
        status: 'Fast Cure / High Thermal Activity',
        statusColor: 'text-amber-300 bg-amber-400/10 border-amber-400/30',
        potLife: '15 - 20 minutes',
        rainSafeHours: '2 - 3 hours',
        footTrafficHours: '4 - 6 hours',
        vehicleHours: '24 hours',
        protocolBadge: 'Summer Morning Pour Protocol Active',
        explanation: 'High temperatures accelerate the chemical polymerization rate. The aggregate mix remains workable for a shorter window, but achieves initial foot-traffic readiness in just a few hours.',
        tbProtocol: 'Our crews start mixing at 6:30 AM to finish before peak afternoon heat. We erect mobile UV shade shelters and store resin containers in climate-controlled trailers.'
      };
    }

    if (temp >= 62 && temp < 85) {
      return {
        status: 'Optimal Goldilocks Zone',
        statusColor: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/30',
        potLife: '30 - 45 minutes',
        rainSafeHours: '4 - 5 hours',
        footTrafficHours: '12 - 16 hours',
        vehicleHours: '24 - 48 hours',
        protocolBadge: 'Standard Manufacturer Specification',
        explanation: 'Perfect balance of hand-troweling workable time and steady molecular cross-linking. Yields the highest compressive bond strength and flawless finish.',
        tbProtocol: 'Standard batching protocols. Full quality logging of aggregate moisture, dew-point margins, and aggregate ratios.'
      };
    }

    // 40°F to 61°F
    return {
      status: 'Extended Cure / Controlled Cool',
      statusColor: 'text-cyan-300 bg-cyan-400/10 border-cyan-400/30',
      potLife: '45 - 60 minutes',
      rainSafeHours: '6 - 8 hours',
      footTrafficHours: '24 - 36 hours',
      vehicleHours: '48 - 72 hours',
      protocolBadge: 'Vuba Accelerator Dosing Activated',
      explanation: 'Cooler temperatures slow down molecular reaction rates. The surface takes longer to reach full hardness, requiring patience before driving vehicles onto the matrix.',
      tbProtocol: 'Our certified installers meter in precise drops of Vuba-approved catalyst accelerator to maintain a reliable 24-hour foot-traffic turnaround.'
    };
  };

  const currentCalc = getCuringCalculations(temperature, humidity, isWetSurface);

  const applyPreset = (preset: SeasonPreset) => {
    setTemperature(preset.temp);
    setHumidity(preset.humidity);
    setIsWetSurface(false);
  };

  return (
    <section 
      id="weather-curing" 
      className="py-16 sm:py-20 bg-[#121816] text-[#f2f4f3] border-b border-white/10 relative overflow-hidden"
    >
      {/* Ambient background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-[#a3907c]/5 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center space-x-1.5 bg-[#a3907c]/10 text-[#a3907c] px-3.5 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest mb-3 border border-[#a3907c]/30">
            <Thermometer className="w-3.5 h-3.5 text-[#a3907c]" />
            <span>Science of Resin Curing</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-5xl font-light text-white leading-tight">
            How Virginia Weather Governs <br className="hidden sm:inline" />
            <span className="italic font-serif text-[#a3907c]">Resin-Bound Curing & Installation</span>
          </h2>
          <p className="text-xs sm:text-sm text-white/65 mt-3 max-w-2xl mx-auto leading-relaxed">
            Resin-bound surfacing is a catalyzed two-component aliphatic polymer. Temperature, dew point, and ambient moisture dictate the exact chemical reaction rate. Learn how TB Custom manages Gloucester’s coastal weather to guarantee lifelong surface integrity.
          </p>

          {/* Interactive Mode Navigation */}
          <div className="flex justify-center mt-6">
            <div className="inline-flex p-1 bg-black/40 border border-white/10 rounded-sm">
              <button
                onClick={() => setActiveTab('calculator')}
                className={`min-h-[40px] px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-sm transition ${
                  activeTab === 'calculator'
                    ? 'bg-[#a3907c] text-[#0d1210] shadow'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                Weather Simulator
              </button>
              <button
                onClick={() => setActiveTab('lifecycle')}
                className={`min-h-[40px] px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-sm transition ${
                  activeTab === 'lifecycle'
                    ? 'bg-[#a3907c] text-[#0d1210] shadow'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                4-Stage Timeline
              </button>
              <button
                onClick={() => setActiveTab('protocols')}
                className={`min-h-[40px] px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-sm transition ${
                  activeTab === 'protocols'
                    ? 'bg-[#a3907c] text-[#0d1210] shadow'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                Coastal Weather Protocols
              </button>
            </div>
          </div>
        </div>

        {/* TAB 1: INTERACTIVE SIMULATOR */}
        {activeTab === 'calculator' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
            
            {/* Left Controls Column (5 cols) */}
            <div className="lg:col-span-5 bg-[#0d1210] p-5 sm:p-7 rounded-sm border border-white/10 space-y-6 shadow-xl">
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-white flex items-center justify-between">
                  <span>Weather Conditions</span>
                  <span className="text-[10px] text-[#a3907c] font-normal normal-case">Adjust to test your forecast</span>
                </h3>
                <p className="text-xs text-white/50 mt-1">
                  Select a local seasonal preset or fine-tune temperature and humidity sliders below.
                </p>
              </div>

              {/* Season Presets */}
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-wider text-white/70 block">
                  Gloucester Regional Presets
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {PRESETS.map((preset) => {
                    const isSelected = temperature === preset.temp && humidity === preset.humidity && !isWetSurface;
                    return (
                      <button
                        key={preset.id}
                        onClick={() => applyPreset(preset)}
                        className={`min-h-[48px] p-2.5 text-left rounded-sm border text-xs transition active:scale-[0.98] ${
                          isSelected
                            ? 'bg-[#a3907c]/20 border-[#a3907c] text-white shadow-sm'
                            : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10'
                        }`}
                      >
                        <div className="font-bold text-[11px] truncate">{preset.name}</div>
                        <div className="text-[10px] text-[#a3907c] mt-0.5">{preset.label}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Temperature Slider */}
              <div className="space-y-2 pt-2 border-t border-white/10">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-white/80 flex items-center">
                    <Thermometer className="w-3.5 h-3.5 mr-1.5 text-[#a3907c]" />
                    Ambient Temperature
                  </span>
                  <span className="font-mono font-bold text-base text-[#a3907c] tabular-nums">
                    {temperature}°F <span className="text-xs text-white/40">({Math.round(((temperature - 32) * 5) / 9)}°C)</span>
                  </span>
                </div>
                <input 
                  type="range"
                  min={35}
                  max={98}
                  step={1}
                  value={temperature}
                  onChange={(e) => setTemperature(parseInt(e.target.value, 10))}
                  className="w-full accent-[#a3907c] bg-white/10 rounded-lg cursor-pointer h-2"
                />
                <div className="flex justify-between text-[10px] text-white/40 font-mono">
                  <span>35°F (Cold pause)</span>
                  <span>65°F (Ideal)</span>
                  <span>98°F (High heat)</span>
                </div>
              </div>

              {/* Humidity Slider */}
              <div className="space-y-2 pt-2 border-t border-white/10">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-white/80 flex items-center">
                    <Droplets className="w-3.5 h-3.5 mr-1.5 text-cyan-400" />
                    Relative Humidity
                  </span>
                  <span className="font-mono font-bold text-base text-cyan-300 tabular-nums">
                    {humidity}%
                  </span>
                </div>
                <input 
                  type="range"
                  min={30}
                  max={95}
                  step={5}
                  value={humidity}
                  onChange={(e) => setHumidity(parseInt(e.target.value, 10))}
                  className="w-full accent-cyan-400 bg-white/10 rounded-lg cursor-pointer h-2"
                />
                <div className="flex justify-between text-[10px] text-white/40 font-mono">
                  <span>30% (Dry)</span>
                  <span>65% (Typical Virginia)</span>
                  <span>95% (Dense Coastal Dew)</span>
                </div>
              </div>

              {/* Wet Substrate Hazard Toggle */}
              <div className="p-3 bg-white/5 rounded-sm border border-white/10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <CloudRain className={`w-4 h-4 ${isWetSurface ? 'text-amber-400' : 'text-white/40'}`} />
                    <span className="text-xs font-semibold text-white">Simulate Rain / Damp Base</span>
                  </div>
                  <button
                    onClick={() => setIsWetSurface(!isWetSurface)}
                    className={`min-h-[36px] px-3 py-1 rounded text-[11px] font-bold uppercase transition ${
                      isWetSurface
                        ? 'bg-amber-500 text-black'
                        : 'bg-white/10 text-white/60 hover:text-white'
                    }`}
                  >
                    {isWetSurface ? 'Rain Active' : 'Dry Base'}
                  </button>
                </div>
                <p className="text-[10px] text-white/40 mt-1.5 leading-relaxed">
                  Toggle to observe how uncured resin must never be exposed to rainfall or standing water during troweling.
                </p>
              </div>

            </div>

            {/* Right Output Dynamics (7 cols) */}
            <div className="lg:col-span-7 space-y-5">
              
              {/* Status Header Banner */}
              <div className="p-5 sm:p-6 bg-[#0d1210] rounded-sm border border-white/10 shadow-xl space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-4">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-white/50 block">Current Curing State</span>
                    <h4 className="text-lg sm:text-xl font-bold text-white mt-0.5">{currentCalc.status}</h4>
                  </div>
                  <div className={`inline-flex items-center px-3 py-1 rounded-sm text-xs font-bold uppercase tracking-wider border self-start sm:self-center ${currentCalc.statusColor}`}>
                    <Sparkles className="w-3.5 h-3.5 mr-1.5" />
                    <span>{currentCalc.protocolBadge}</span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-white/75 leading-relaxed">
                  {currentCalc.explanation}
                </p>

                {/* 4 Key Real-Time Metrics */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                  
                  {/* Metric 1 */}
                  <div className="p-3 bg-white/5 rounded-sm border border-white/10">
                    <div className="flex items-center text-white/50 text-[10px] uppercase font-bold tracking-wider mb-1">
                      <Clock className="w-3 h-3 mr-1 text-[#a3907c]" />
                      <span>Pot Life Window</span>
                    </div>
                    <div className="text-sm sm:text-base font-bold text-white tabular-nums">
                      {currentCalc.potLife}
                    </div>
                    <p className="text-[9px] text-white/40 mt-0.5">Trowel workability</p>
                  </div>

                  {/* Metric 2 */}
                  <div className="p-3 bg-white/5 rounded-sm border border-white/10">
                    <div className="flex items-center text-white/50 text-[10px] uppercase font-bold tracking-wider mb-1">
                      <Umbrella className="w-3 h-3 mr-1 text-cyan-400" />
                      <span>Rain-Proof Lock</span>
                    </div>
                    <div className="text-sm sm:text-base font-bold text-white tabular-nums">
                      {currentCalc.rainSafeHours}
                    </div>
                    <p className="text-[9px] text-white/40 mt-0.5">Safe from showers</p>
                  </div>

                  {/* Metric 3 */}
                  <div className="p-3 bg-white/5 rounded-sm border border-white/10">
                    <div className="flex items-center text-white/50 text-[10px] uppercase font-bold tracking-wider mb-1">
                      <Footprints className="w-3 h-3 mr-1 text-emerald-400" />
                      <span>Foot Traffic</span>
                    </div>
                    <div className="text-sm sm:text-base font-bold text-emerald-300 tabular-nums">
                      {currentCalc.footTrafficHours}
                    </div>
                    <p className="text-[9px] text-white/40 mt-0.5">Light pedestrian walk</p>
                  </div>

                  {/* Metric 4 */}
                  <div className="p-3 bg-white/5 rounded-sm border border-white/10">
                    <div className="flex items-center text-white/50 text-[10px] uppercase font-bold tracking-wider mb-1">
                      <Car className="w-3 h-3 mr-1 text-purple-400" />
                      <span>Vehicular Load</span>
                    </div>
                    <div className="text-sm sm:text-base font-bold text-purple-300 tabular-nums">
                      {currentCalc.vehicleHours}
                    </div>
                    <p className="text-[9px] text-white/40 mt-0.5">Cars, trucks, SUVs</p>
                  </div>

                </div>
              </div>

              {/* TB Custom Crew Field Action Box */}
              <div className="p-5 bg-[#16201c] rounded-sm border border-[#a3907c]/30 shadow-md">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-sm bg-[#a3907c]/20 text-[#a3907c] flex items-center justify-center shrink-0 mt-0.5 border border-[#a3907c]/30">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold uppercase tracking-wider text-white">
                      TB Custom Gloucester Standard Operating Procedure
                    </h5>
                    <p className="text-xs text-white/70 mt-1 leading-relaxed">
                      {currentCalc.tbProtocol}
                    </p>
                  </div>
                </div>
              </div>

              {/* Weather Guarantee Strip */}
              <div className="p-4 bg-white/5 rounded-sm border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                <div className="flex items-center space-x-2 text-white/70">
                  <CheckCircle2 className="w-4 h-4 text-[#a3907c] shrink-0" />
                  <span>
                    <strong>Zero-Risk Weather Rescheduling:</strong> If rain chance exceeds 20% or temperatures fall outside manufacturer bounds, we reschedule automatically at no cost to you.
                  </span>
                </div>
                <button
                  onClick={onOpenQuoteModal}
                  className="w-full sm:w-auto shrink-0 min-h-[44px] px-4 py-2 rounded-sm bg-[#a3907c] hover:bg-white text-[#0d1210] font-bold text-xs uppercase tracking-wider transition"
                >
                  Schedule Weather-Safe Quote
                </button>
              </div>

            </div>

          </div>
        )}

        {/* TAB 2: 4-STAGE LIFECYCLE TIMELINE */}
        {activeTab === 'lifecycle' && (
          <div className="space-y-6">
            <div className="text-center max-w-2xl mx-auto mb-8">
              <h3 className="text-lg sm:text-xl font-bold text-white">The 4-Stage Chemical Polymerization Journey</h3>
              <p className="text-xs text-white/60 mt-1">
                How two-part aliphatic polyurethane turns natural kiln-dried aggregate into an ultra-tough stone matrix.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              
              {/* Stage 1 */}
              <div className="p-5 bg-[#0d1210] rounded-sm border border-white/10 space-y-3 relative">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold uppercase text-[#a3907c] bg-[#a3907c]/10 px-2 py-0.5 rounded border border-[#a3907c]/30">
                    STAGE 01
                  </span>
                  <span className="text-xs font-mono text-white/40">0 – 45 MIN</span>
                </div>
                <h4 className="text-sm font-bold text-white">Forced-Action Batching & Hand Trowel</h4>
                <p className="text-xs text-white/60 leading-relaxed">
                  Resin parts A and B are mixed with a mechanical paddle, then poured into the Baron forced-action mixer with 100kg of kiln-dried stones. Hand-troweled smooth with micro-grip glass beads.
                </p>
                <div className="pt-2 border-t border-white/10 text-[10px] text-amber-300 font-semibold flex items-center">
                  <AlertTriangle className="w-3.5 h-3.5 mr-1 shrink-0" />
                  <span>Extreme moisture vulnerability</span>
                </div>
              </div>

              {/* Stage 2 */}
              <div className="p-5 bg-[#0d1210] rounded-sm border border-white/10 space-y-3 relative">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold uppercase text-cyan-300 bg-cyan-400/10 px-2 py-0.5 rounded border border-cyan-400/30">
                    STAGE 02
                  </span>
                  <span className="text-xs font-mono text-white/40">3 – 6 HOURS</span>
                </div>
                <h4 className="text-sm font-bold text-white">Cross-Link Gel & Rain Immunity</h4>
                <p className="text-xs text-white/60 leading-relaxed">
                  The liquid resin transitions into an elastic gel matrix. At this milestone, passing rain showers will no longer wash away resin or cause milky blooming.
                </p>
                <div className="pt-2 border-t border-white/10 text-[10px] text-cyan-300 font-semibold flex items-center">
                  <Umbrella className="w-3.5 h-3.5 mr-1 shrink-0" />
                  <span>Rain impervious achieved</span>
                </div>
              </div>

              {/* Stage 3 */}
              <div className="p-5 bg-[#0d1210] rounded-sm border border-white/10 space-y-3 relative">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold uppercase text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded border border-emerald-400/30">
                    STAGE 03
                  </span>
                  <span className="text-xs font-mono text-white/40">12 – 24 HOURS</span>
                </div>
                <h4 className="text-sm font-bold text-white">Pedestrian & Pet Walk Safe</h4>
                <p className="text-xs text-white/60 leading-relaxed">
                  The surface reaches 70% compressive strength. Homeowners, children, and dogs can freely walk and place lightweight patio furniture without indenting stone.
                </p>
                <div className="pt-2 border-t border-white/10 text-[10px] text-emerald-300 font-semibold flex items-center">
                  <Footprints className="w-3.5 h-3.5 mr-1 shrink-0" />
                  <span>Safe for foot traffic</span>
                </div>
              </div>

              {/* Stage 4 */}
              <div className="p-5 bg-[#0d1210] rounded-sm border border-white/10 space-y-3 relative">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold uppercase text-purple-400 bg-purple-400/10 px-2 py-0.5 rounded border border-purple-400/30">
                    STAGE 04
                  </span>
                  <span className="text-xs font-mono text-white/40">24 – 72 HOURS</span>
                </div>
                <h4 className="text-sm font-bold text-white">Full Vehicular Load & Tensile Lock</h4>
                <p className="text-xs text-white/60 leading-relaxed">
                  The resin completes 100% cure, reaching high compressive ratings suitable for heavy SUVs, delivery vans, and power steering turning torque without stone loss.
                </p>
                <div className="pt-2 border-t border-white/10 text-[10px] text-purple-300 font-semibold flex items-center">
                  <Car className="w-3.5 h-3.5 mr-1 shrink-0" />
                  <span>Rated for vehicular traffic</span>
                </div>
              </div>

            </div>

            <div className="p-5 bg-[#0d1210] rounded-sm border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-white/70">
                <strong className="text-white">Note on Commercial & Driveway Projects:</strong> TB Custom leaves safety perimeter tape and high-visibility cone barriers around your new surface during the entire 24–48 hour curing duration.
              </div>
              <button
                onClick={onOpenQuoteModal}
                className="shrink-0 min-h-[44px] px-5 py-2 rounded-sm bg-[#a3907c] hover:bg-white text-[#0d1210] font-bold text-xs uppercase tracking-wider transition"
              >
                Inquire for Your Property
              </button>
            </div>
          </div>
        )}

        {/* TAB 3: COASTAL WEATHER PROTOCOLS */}
        {activeTab === 'protocols' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Protocol 1: Dew Point & Humidity */}
              <div className="p-6 bg-[#0d1210] rounded-sm border border-white/10 space-y-3">
                <div className="w-9 h-9 rounded-sm bg-[#a3907c]/20 text-[#a3907c] flex items-center justify-center border border-[#a3907c]/30">
                  <Droplets className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-white">The Virginia Coastal Dew-Point Rule</h4>
                <p className="text-xs text-white/65 leading-relaxed">
                  Gloucester County and the Middle Peninsula experience high relative humidity from the York, Ware, and Rappahannock Rivers. Before every pour, TB Custom checks that the ground surface temperature is <strong>at least 5°F (3°C) above the dew point</strong>. This prevents invisible microscopic condensation from interfering with stone adhesion.
                </p>
                <div className="text-[11px] text-[#a3907c] font-semibold">
                  ✓ Digital surface hygrometer verified on site
                </div>
              </div>

              {/* Protocol 2: Summer Heat & Shading */}
              <div className="p-6 bg-[#0d1210] rounded-sm border border-white/10 space-y-3">
                <div className="w-9 h-9 rounded-sm bg-amber-400/20 text-amber-300 flex items-center justify-center border border-amber-400/30">
                  <Sun className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-white">Summer Heat Management (85°F+)</h4>
                <p className="text-xs text-white/65 leading-relaxed">
                  In direct Virginia sunshine, concrete and base stone temperatures can exceed 115°F, which makes resin cure too fast for trowel workers. TB Custom deploys <strong>mobile shade canopies</strong> over the working lane and starts mixes at dawn (6:30 AM) so trowel artisans have comfortable time to create seamless feather joints.
                </p>
                <div className="text-[11px] text-amber-300 font-semibold">
                  ✓ Cold-chain resin storage in insulated mobile trailers
                </div>
              </div>

              {/* Protocol 3: Autumn / Cool Weather Catalysts */}
              <div className="p-6 bg-[#0d1210] rounded-sm border border-white/10 space-y-3">
                <div className="w-9 h-9 rounded-sm bg-cyan-400/20 text-cyan-300 flex items-center justify-center border border-cyan-400/30">
                  <Wind className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-white">Autumn Dosing with Approved Accelerators</h4>
                <p className="text-xs text-white/65 leading-relaxed">
                  When daytime temperatures hover between 45°F and 58°F in November or March, curing without an accelerator could take 48+ hours. TB Custom is certified by Vuba to add calibrated milliliters of rapid-cure catalyst, bringing cure times safely back to a predictable 16-to-24 hour window.
                </p>
                <div className="text-[11px] text-cyan-300 font-semibold">
                  ✓ 100% manufacturer warranty compliant accelerator dosing
                </div>
              </div>

              {/* Protocol 4: Heavy Rain Guarantee */}
              <div className="p-6 bg-[#0d1210] rounded-sm border border-white/10 space-y-3">
                <div className="w-9 h-9 rounded-sm bg-emerald-400/20 text-emerald-300 flex items-center justify-center border border-emerald-400/30">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-white">Gloucester Rain Shield & Rescheduling Policy</h4>
                <p className="text-xs text-white/65 leading-relaxed">
                  We maintain live Doppler radar tracking on our iPads at every job site. If unforecast pop-up summer showers approach, we immediately deploy heavy-gauge waterproof tarps raised on tent poles above the fresh surface. If the morning forecast shows &gt;20% rain probability, we proactively reschedule.
                </p>
                <div className="text-[11px] text-emerald-300 font-semibold">
                  ✓ Zero deposit loss or penalty for weather rescheduling
                </div>
              </div>

            </div>

            {/* Bottom Callout */}
            <div className="p-6 bg-[#16201c] rounded-sm border border-[#a3907c]/30 flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <h4 className="text-sm font-bold uppercase tracking-wider text-white">
                  Want us to assess your property's ground conditions?
                </h4>
                <p className="text-xs text-white/60 mt-1">
                  We check slope, sun exposure, and base drainage during your free on-site consultation.
                </p>
              </div>
              <button
                onClick={onOpenQuoteModal}
                className="w-full md:w-auto min-h-[48px] px-6 py-2.5 rounded-sm bg-[#a3907c] hover:bg-white text-[#0d1210] text-xs font-bold uppercase tracking-wider transition shadow flex items-center justify-center"
              >
                <span>Book On-Site Evaluation</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
