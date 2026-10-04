import React, { useState, useMemo } from 'react';
import { 
  Sparkles, 
  Layers, 
  Droplets, 
  ShieldCheck, 
  Car, 
  Footprints, 
  Sun, 
  CheckCircle2, 
  X, 
  Scale, 
  Search, 
  Filter, 
  ArrowRight, 
  Info, 
  SlidersHorizontal,
  Plus,
  Check,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import { MATERIALS_CATALOG, MaterialItem } from '../data/materialsData';

interface MaterialSelectorProps {
  onOpenQuoteModal: (serviceName?: string) => void;
}

export const MaterialSelector: React.FC<MaterialSelectorProps> = ({ onOpenQuoteModal }) => {
  const [selectedType, setSelectedType] = useState<'all' | 'vuba-stone' | 'paver'>('all');
  const [selectedApplication, setSelectedApplication] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [comparisonList, setComparisonList] = useState<string[]>([]);
  const [isComparisonOpen, setIsComparisonOpen] = useState<boolean>(false);
  const [inspectingMaterial, setInspectingMaterial] = useState<MaterialItem | null>(null);

  // Filtered materials calculation
  const filteredMaterials = useMemo(() => {
    return MATERIALS_CATALOG.filter((mat) => {
      // Type Filter
      if (selectedType !== 'all' && mat.type !== selectedType) {
        return false;
      }
      // Application Filter
      if (selectedApplication !== 'all') {
        const matchesApp = mat.popularApplications.some((app) => 
          app.toLowerCase().includes(selectedApplication.toLowerCase())
        );
        if (!matchesApp) return false;
      }
      // Search Query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = mat.name.toLowerCase().includes(query);
        const matchesDesc = mat.description.toLowerCase().includes(query);
        const matchesTag = mat.tag?.toLowerCase().includes(query);
        const matchesCategory = mat.category.toLowerCase().includes(query);
        if (!matchesName && !matchesDesc && !matchesTag && !matchesCategory) {
          return false;
        }
      }
      return true;
    });
  }, [selectedType, selectedApplication, searchQuery]);

  // Comparison toggle handler (Max 3 materials)
  const toggleComparison = (id: string) => {
    if (comparisonList.includes(id)) {
      setComparisonList(comparisonList.filter((item) => item !== id));
    } else {
      if (comparisonList.length >= 3) {
        alert('You can compare up to 3 materials side-by-side. Please remove one to add another.');
        return;
      }
      setComparisonList([...comparisonList, id]);
    }
  };

  const comparedMaterials = useMemo(() => {
    return MATERIALS_CATALOG.filter((m) => comparisonList.includes(m.id));
  }, [comparisonList]);

  return (
    <section 
      id="material-selector" 
      className="py-16 sm:py-24 bg-[#0d1210] text-[#f2f4f3] border-b border-white/10 relative overflow-hidden"
    >
      {/* Ambient background glow */}
      <div className="absolute top-10 right-1/4 w-96 h-96 bg-[#a3907c]/5 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center space-x-1.5 bg-[#a3907c]/10 text-[#a3907c] px-3.5 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest mb-3 border border-[#a3907c]/30">
            <Layers className="w-3.5 h-3.5 text-[#a3907c]" />
            <span>Interactive Material Studio</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-5xl font-light text-white leading-tight">
            Explore & Compare <br className="hidden sm:inline" />
            <span className="italic font-serif text-[#a3907c]">Vuba Stone Textures & Paver Styles</span>
          </h2>
          <p className="text-xs sm:text-sm text-white/65 mt-3 max-w-2xl mx-auto leading-relaxed">
            From seamless resin-bound quartz aggregates to heavy-duty architectural concrete and natural Pennsylvania bluestone, select and compare specifications tailored for Virginia homes.
          </p>
        </div>

        {/* Filter Toolbar */}
        <div className="bg-[#121816] p-4 sm:p-6 rounded-sm border border-white/10 mb-8 shadow-xl space-y-4">
          
          {/* Top Row: Primary Type Tabs & Search */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            
            {/* Type Filter Buttons */}
            <div className="inline-flex p-1 bg-black/40 border border-white/10 rounded-sm overflow-x-auto max-w-full">
              <button
                onClick={() => setSelectedType('all')}
                className={`min-h-[44px] px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-sm transition whitespace-nowrap ${
                  selectedType === 'all'
                    ? 'bg-[#a3907c] text-[#0d1210] shadow'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                All Surfaces ({MATERIALS_CATALOG.length})
              </button>
              <button
                onClick={() => setSelectedType('vuba-stone')}
                className={`min-h-[44px] px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-sm transition whitespace-nowrap flex items-center space-x-1.5 ${
                  selectedType === 'vuba-stone'
                    ? 'bg-[#a3907c] text-[#0d1210] shadow'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Vuba Stone™ Resin (6)</span>
              </button>
              <button
                onClick={() => setSelectedType('paver')}
                className={`min-h-[44px] px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-sm transition whitespace-nowrap flex items-center space-x-1.5 ${
                  selectedType === 'paver'
                    ? 'bg-[#a3907c] text-[#0d1210] shadow'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Architectural Pavers (6)</span>
              </button>
            </div>

            {/* Live Search Input */}
            <div className="relative w-full md:w-72">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search material, stone, color..."
                className="w-full min-h-[44px] pl-9 pr-8 py-2 rounded-sm bg-white/5 border border-white/15 text-white placeholder-white/40 text-xs focus:outline-none focus:border-[#a3907c] transition"
              />
              <Search className="w-4 h-4 text-white/40 absolute left-3 top-1/2 -translate-y-1/2" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

          </div>

          {/* Bottom Row: Quick Application Tag Filters */}
          <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-white/10 text-xs">
            <span className="text-[10px] font-bold uppercase tracking-wider text-white/40 mr-2 flex items-center">
              <Filter className="w-3 h-3 mr-1" />
              Application:
            </span>
            {[
              { id: 'all', label: 'All Projects' },
              { id: 'driveway', label: 'Driveways & Vehicular' },
              { id: 'pool', label: 'Pool Decks & Cool-Touch' },
              { id: 'patio', label: 'Patios & Entertaining' },
              { id: 'porch', label: 'Porches & Walkways' }
            ].map((tag) => (
              <button
                key={tag.id}
                onClick={() => setSelectedApplication(tag.id)}
                className={`min-h-[36px] px-3 py-1 rounded-sm text-[11px] font-semibold transition active:scale-95 ${
                  selectedApplication === tag.id
                    ? 'bg-white/20 text-white border border-white/30 font-bold'
                    : 'bg-white/5 text-white/60 hover:text-white border border-transparent'
                }`}
              >
                {tag.label}
              </button>
            ))}

            {/* Active Comparison Status & Open Button */}
            {comparisonList.length > 0 && (
              <div className="ml-auto flex items-center gap-2">
                <span className="text-[11px] text-[#a3907c] font-semibold">
                  {comparisonList.length} selected for comparison
                </span>
                <button
                  onClick={() => setIsComparisonOpen(true)}
                  className="min-h-[36px] px-3.5 py-1 bg-[#a3907c] hover:bg-white text-[#0d1210] font-bold text-[11px] uppercase tracking-wider rounded-sm transition shadow flex items-center space-x-1"
                >
                  <Scale className="w-3.5 h-3.5 mr-1" />
                  <span>Compare Now</span>
                </button>
              </div>
            )}
          </div>

        </div>

        {/* Materials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMaterials.map((mat) => {
            const isCompared = comparisonList.includes(mat.id);

            return (
              <div
                key={mat.id}
                className="bg-[#121816] rounded-sm border border-white/10 overflow-hidden shadow-lg hover:border-[#a3907c]/50 transition-all flex flex-col justify-between group"
              >
                {/* Visual Swatch Header */}
                <div className="relative h-48 sm:h-52 bg-[#1a2420] overflow-hidden">
                  {/* Photo Preview */}
                  <img
                    src={mat.imageUrl}
                    alt={mat.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                  />
                  {/* Dark Vignette Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#121816] via-black/40 to-transparent" />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-sm bg-black/70 backdrop-blur-md text-[#a3907c] border border-white/10">
                      {mat.type === 'vuba-stone' ? 'Vuba Stone™ Resin' : 'Architectural Paver'}
                    </span>
                    {mat.tag && (
                      <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-sm bg-[#a3907c] text-[#0d1210] shadow">
                        {mat.tag}
                      </span>
                    )}
                  </div>

                  {/* Tactile Palette Color Chips */}
                  <div className="absolute bottom-3 left-3 flex items-center space-x-1.5">
                    {mat.hexColors.map((hex, i) => (
                      <div 
                        key={i} 
                        className="w-5 h-5 rounded-full border border-white/40 shadow-sm"
                        style={{ backgroundColor: hex }}
                        title={`Color Tone: ${hex}`}
                      />
                    ))}
                    <span className="text-[10px] text-white/80 font-medium ml-1 bg-black/60 px-1.5 py-0.5 rounded">
                      {mat.category}
                    </span>
                  </div>
                </div>

                {/* Card Content Body */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-[#a3907c] transition-colors">
                      {mat.name}
                    </h3>
                    <p className="text-xs text-white/60 mt-1 line-clamp-2 leading-relaxed">
                      {mat.tagline}
                    </p>
                  </div>

                  {/* Key Specs Breakdown */}
                  <div className="grid grid-cols-2 gap-2 text-[10px] pt-2 border-t border-white/10">
                    <div className="p-2 bg-white/5 rounded-sm">
                      <span className="text-white/40 uppercase block font-semibold">Grain / Thickness</span>
                      <span className="text-white font-medium truncate block">{mat.dimensionsOrGrain}</span>
                    </div>
                    <div className="p-2 bg-white/5 rounded-sm">
                      <span className="text-white/40 uppercase block font-semibold">Permeability</span>
                      <span className="text-emerald-400 font-medium truncate block">{mat.permeability.split('(')[0]}</span>
                    </div>
                    <div className="p-2 bg-white/5 rounded-sm">
                      <span className="text-white/40 uppercase block font-semibold">Slip Rating</span>
                      <span className="text-white font-medium truncate block">{mat.slipResistance}</span>
                    </div>
                    <div className="p-2 bg-white/5 rounded-sm">
                      <span className="text-white/40 uppercase block font-semibold">Heat Profile</span>
                      <span className="text-[#a3907c] font-medium truncate block">{mat.heatRetention}</span>
                    </div>
                  </div>

                  {/* Card Action Buttons */}
                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/10">
                    <button
                      onClick={() => setInspectingMaterial(mat)}
                      className="min-h-[44px] px-3 py-2 rounded-sm bg-white/5 hover:bg-white/10 text-white text-xs font-bold uppercase tracking-wider border border-white/10 transition flex items-center justify-center space-x-1 active:scale-[0.98]"
                    >
                      <Info className="w-3.5 h-3.5 mr-1 text-[#a3907c]" />
                      <span>Inspect</span>
                    </button>

                    <button
                      onClick={() => toggleComparison(mat.id)}
                      className={`min-h-[44px] px-3 py-2 rounded-sm text-xs font-bold uppercase tracking-wider transition flex items-center justify-center space-x-1 active:scale-[0.98] ${
                        isCompared
                          ? 'bg-[#a3907c] text-[#0d1210] shadow'
                          : 'bg-white/10 hover:bg-white/20 text-white border border-white/15'
                      }`}
                    >
                      {isCompared ? (
                        <>
                          <Check className="w-3.5 h-3.5 mr-1" />
                          <span>Added</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5 mr-1" />
                          <span>Compare</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Empty state if search filters match nothing */}
        {filteredMaterials.length === 0 && (
          <div className="p-12 text-center bg-[#121816] rounded-sm border border-white/10 space-y-3">
            <Search className="w-8 h-8 text-white/30 mx-auto" />
            <h4 className="text-base font-bold text-white">No materials matched your filter</h4>
            <p className="text-xs text-white/50 max-w-sm mx-auto">
              Try adjusting your search query or selecting "All Surfaces" to see the complete material collection.
            </p>
            <button
              onClick={() => {
                setSelectedType('all');
                setSelectedApplication('all');
                setSearchQuery('');
              }}
              className="min-h-[40px] px-4 py-2 rounded-sm bg-[#a3907c] text-[#0d1210] text-xs font-bold uppercase tracking-wider transition"
            >
              Reset All Filters
            </button>
          </div>
        )}

      </div>

      {/* FLOATING COMPARISON DRAWER BAR */}
      {comparisonList.length > 0 && !isComparisonOpen && (
        <div className="fixed bottom-20 sm:bottom-6 left-1/2 -translate-x-1/2 z-40 bg-[#16201c]/95 backdrop-blur-md border border-[#a3907c]/50 p-3 sm:p-4 rounded-sm shadow-2xl flex items-center gap-3 sm:gap-6 w-[95%] sm:w-auto animate-in slide-in-from-bottom-5">
          <div className="flex items-center space-x-2">
            <Scale className="w-4 h-4 text-[#a3907c]" />
            <span className="text-xs font-bold text-white whitespace-nowrap">
              {comparisonList.length} Material{comparisonList.length > 1 ? 's' : ''} Ready to Compare
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsComparisonOpen(true)}
              className="min-h-[40px] px-4 py-2 rounded-sm bg-[#a3907c] hover:bg-white text-[#0d1210] font-bold text-xs uppercase tracking-wider transition shadow"
            >
              View Side-by-Side
            </button>
            <button
              onClick={() => setComparisonList([])}
              className="min-h-[40px] px-3 py-2 text-white/50 hover:text-white text-xs underline"
            >
              Clear
            </button>
          </div>
        </div>
      )}

      {/* COMPARISON MODAL */}
      {isComparisonOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-200">
          <div className="bg-[#121816] border border-white/20 rounded-sm w-full max-w-6xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
            
            {/* Modal Header */}
            <div className="p-4 sm:p-6 border-b border-white/10 flex items-center justify-between bg-[#16201c]">
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-white flex items-center space-x-2">
                  <Scale className="w-5 h-5 text-[#a3907c]" />
                  <span>Side-by-Side Material Comparison</span>
                </h3>
                <p className="text-xs text-white/50 mt-0.5">
                  Detailed technical metrics to help select the perfect surface for your Tidewater property.
                </p>
              </div>
              <button
                onClick={() => setIsComparisonOpen(false)}
                className="w-10 h-10 rounded-sm bg-white/5 text-white/70 hover:text-white flex items-center justify-center border border-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Comparison Table */}
            <div className="p-4 sm:p-6 overflow-x-auto flex-1">
              <table className="w-full text-left text-xs min-w-[650px]">
                <thead>
                  <tr className="border-b border-white/15">
                    <th className="p-3 text-[10px] font-bold uppercase tracking-wider text-white/40 w-1/4">Specification</th>
                    {comparedMaterials.map((m) => (
                      <th key={m.id} className="p-3 text-sm font-bold text-white w-1/4 align-top">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[9px] uppercase px-1.5 py-0.5 bg-[#a3907c]/20 text-[#a3907c] rounded border border-[#a3907c]/30">
                            {m.type === 'vuba-stone' ? 'Vuba Resin' : 'Paver Stone'}
                          </span>
                          <button
                            onClick={() => toggleComparison(m.id)}
                            className="text-white/40 hover:text-red-400"
                            title="Remove"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <div className="text-base text-white font-bold">{m.name}</div>
                        <div className="text-[10px] text-white/60 font-normal mt-0.5">{m.tagline}</div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-white/80">
                  <tr>
                    <td className="p-3 font-semibold text-white/60 uppercase text-[10px]">Surface Texture</td>
                    {comparedMaterials.map((m) => (
                      <td key={m.id} className="p-3">{m.textureDescription}</td>
                    ))}
                  </tr>
                  <tr className="bg-white/5">
                    <td className="p-3 font-semibold text-white/60 uppercase text-[10px]">Dimensions / Grain</td>
                    {comparedMaterials.map((m) => (
                      <td key={m.id} className="p-3 font-mono font-medium">{m.dimensionsOrGrain}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-white/60 uppercase text-[10px]">Stormwater Drainage</td>
                    {comparedMaterials.map((m) => (
                      <td key={m.id} className="p-3 text-emerald-400 font-semibold">{m.permeability}</td>
                    ))}
                  </tr>
                  <tr className="bg-white/5">
                    <td className="p-3 font-semibold text-white/60 uppercase text-[10px]">Slip Resistance</td>
                    {comparedMaterials.map((m) => (
                      <td key={m.id} className="p-3">{m.slipResistance}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-white/60 uppercase text-[10px]">Load & Traffic Rating</td>
                    {comparedMaterials.map((m) => (
                      <td key={m.id} className="p-3">{m.loadRating}</td>
                    ))}
                  </tr>
                  <tr className="bg-white/5">
                    <td className="p-3 font-semibold text-white/60 uppercase text-[10px]">Summer Heat Profile</td>
                    {comparedMaterials.map((m) => (
                      <td key={m.id} className="p-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                          m.heatRetention === 'Cool Touch' ? 'bg-cyan-500/20 text-cyan-300' : 'bg-white/10 text-white'
                        }`}>
                          {m.heatRetention}
                        </span>
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-white/60 uppercase text-[10px]">Maintenance Needs</td>
                    {comparedMaterials.map((m) => (
                      <td key={m.id} className="p-3">{m.maintenanceLevel}</td>
                    ))}
                  </tr>
                  <tr className="bg-white/5">
                    <td className="p-3 font-semibold text-white/60 uppercase text-[10px]">Virginia Climate Fit</td>
                    {comparedMaterials.map((m) => (
                      <td key={m.id} className="p-3 text-xs text-white/70 leading-relaxed">{m.virginiaSuitability}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-white/60 uppercase text-[10px]">Project Action</td>
                    {comparedMaterials.map((m) => (
                      <td key={m.id} className="p-3">
                        <button
                          onClick={() => {
                            setIsComparisonOpen(false);
                            onOpenQuoteModal(m.name);
                          }}
                          className="w-full min-h-[44px] px-3 py-2 rounded-sm bg-[#a3907c] hover:bg-white text-[#0d1210] font-bold text-xs uppercase tracking-wider transition shadow flex items-center justify-center"
                        >
                          Estimate {m.name}
                        </button>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-white/10 bg-[#16201c] flex items-center justify-between">
              <span className="text-xs text-white/50">
                Need samples brought to your home? We bring physical aggregate and paver samples to all free on-site consultations.
              </span>
              <button
                onClick={() => setIsComparisonOpen(false)}
                className="min-h-[40px] px-4 py-2 rounded-sm bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase"
              >
                Close Comparison
              </button>
            </div>

          </div>
        </div>
      )}

      {/* MATERIAL DETAIL INSPECTOR MODAL */}
      {inspectingMaterial && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-200">
          <div className="bg-[#121816] border border-white/20 rounded-sm w-full max-w-2xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
            
            {/* Header with image */}
            <div className="relative h-56 sm:h-64 bg-[#1a2420]">
              <img
                src={inspectingMaterial.imageUrl}
                alt={inspectingMaterial.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#121816] via-black/40 to-transparent" />
              
              <button
                onClick={() => setInspectingMaterial(null)}
                className="absolute top-3 right-3 w-10 h-10 rounded-sm bg-black/60 text-white/70 hover:text-white flex items-center justify-center border border-white/10"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute bottom-4 left-4 right-4">
                <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-sm bg-[#a3907c] text-[#0d1210]">
                  {inspectingMaterial.type === 'vuba-stone' ? 'Certified Vuba Stone™' : 'Architectural Hardscape'}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">
                  {inspectingMaterial.name}
                </h3>
                <p className="text-xs text-white/70">
                  {inspectingMaterial.tagline}
                </p>
              </div>
            </div>

            {/* Detail Body */}
            <div className="p-5 sm:p-6 space-y-4 overflow-y-auto flex-1 text-xs">
              <div>
                <h4 className="text-[10px] font-bold uppercase tracking-wider text-white/50 mb-1">
                  Comprehensive Description
                </h4>
                <p className="text-white/80 leading-relaxed">
                  {inspectingMaterial.description}
                </p>
              </div>

              {/* Color Swatch Breakdown */}
              <div className="p-3 bg-white/5 rounded-sm border border-white/10">
                <h4 className="text-[10px] font-bold uppercase tracking-wider text-white/60 mb-2">
                  Color Formula & Aggregate Blends
                </h4>
                <div className="flex items-center space-x-3">
                  {inspectingMaterial.hexColors.map((hex, i) => (
                    <div key={i} className="flex items-center space-x-1.5">
                      <div className="w-6 h-6 rounded-full border border-white/40" style={{ backgroundColor: hex }} />
                      <span className="font-mono text-[10px] text-white/70 uppercase">{hex}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technical Matrix */}
              <div className="grid grid-cols-2 gap-2.5 text-[11px]">
                <div className="p-2.5 bg-white/5 rounded-sm">
                  <span className="text-white/40 uppercase text-[9px] block font-bold">Dimensions / Aggregate</span>
                  <span className="text-white font-medium">{inspectingMaterial.dimensionsOrGrain}</span>
                </div>
                <div className="p-2.5 bg-white/5 rounded-sm">
                  <span className="text-white/40 uppercase text-[9px] block font-bold">Drainage Rate</span>
                  <span className="text-emerald-400 font-semibold">{inspectingMaterial.permeability}</span>
                </div>
                <div className="p-2.5 bg-white/5 rounded-sm">
                  <span className="text-white/40 uppercase text-[9px] block font-bold">Slip Resistance</span>
                  <span className="text-white font-medium">{inspectingMaterial.slipResistance}</span>
                </div>
                <div className="p-2.5 bg-white/5 rounded-sm">
                  <span className="text-white/40 uppercase text-[9px] block font-bold">Load Rating</span>
                  <span className="text-white font-medium">{inspectingMaterial.loadRating}</span>
                </div>
              </div>

              {/* Key Features */}
              <div>
                <h4 className="text-[10px] font-bold uppercase tracking-wider text-white/50 mb-2">
                  Performance Advantages
                </h4>
                <ul className="space-y-1 text-white/75">
                  {inspectingMaterial.keyFeatures.map((feat, i) => (
                    <li key={i} className="flex items-center space-x-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#a3907c] shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Virginia Suitability */}
              <div className="p-3 bg-[#16201c] rounded-sm border border-[#a3907c]/30">
                <h4 className="text-[10px] font-bold uppercase tracking-wider text-[#a3907c] mb-1">
                  Gloucester & Tidewater Climate Suitability
                </h4>
                <p className="text-white/75 leading-relaxed">
                  {inspectingMaterial.virginiaSuitability}
                </p>
              </div>
            </div>

            {/* Modal CTA */}
            <div className="p-4 border-t border-white/10 bg-[#16201c] flex flex-col sm:flex-row items-center justify-between gap-3">
              <button
                onClick={() => {
                  toggleComparison(inspectingMaterial.id);
                  setInspectingMaterial(null);
                }}
                className="w-full sm:w-auto min-h-[44px] px-4 py-2 rounded-sm bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase"
              >
                {comparisonList.includes(inspectingMaterial.id) ? 'Remove from Comparison' : '+ Add to Comparison'}
              </button>

              <button
                onClick={() => {
                  const matName = inspectingMaterial.name;
                  setInspectingMaterial(null);
                  onOpenQuoteModal(matName);
                }}
                className="w-full sm:w-auto min-h-[44px] px-6 py-2 rounded-sm bg-[#a3907c] hover:bg-white text-[#0d1210] font-bold text-xs uppercase tracking-wider transition shadow flex items-center justify-center space-x-1.5"
              >
                <span>Request Estimate with {inspectingMaterial.name}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
