import React, { useState, useRef, useEffect, useCallback } from 'react';
import { 
  Camera, 
  Upload, 
  Sparkles, 
  Layers, 
  RotateCcw, 
  Download, 
  ArrowRight, 
  Sliders, 
  Check, 
  Sun, 
  SlidersHorizontal, 
  Maximize2, 
  Eye, 
  RefreshCw, 
  ShieldCheck, 
  HelpCircle,
  X,
  Droplets,
  Move
} from 'lucide-react';
import { VUBA_SWATCHES, COMPANY_INFO } from '../data/landscapingData';
import { VubaSwatch } from '../types';

interface AugmentedRealityPreviewProps {
  onOpenQuoteModal?: (serviceType?: string) => void;
  onSelectServiceForQuote?: (title: string) => void;
}

// Preset demo property photos for rapid testing
const DEMO_SCENES = [
  {
    id: 'pool-deck',
    name: 'Cracked Concrete Pool Surround',
    location: 'Gloucester Point, VA',
    imageUrl: 'https://images.unsplash.com/photo-1584463699026-60802c03cb47?auto=format&fit=crop&w=1200&q=80',
    defaultOverlay: { top: 45, left: 10, width: 80, height: 45, perspectiveTilt: 28 }
  },
  {
    id: 'asphalt-driveway',
    name: 'Aging Asphalt Driveway',
    location: 'Ware Neck Estate, VA',
    imageUrl: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80',
    defaultOverlay: { top: 38, left: 15, width: 70, height: 55, perspectiveTilt: 35 }
  },
  {
    id: 'backyard-patio',
    name: 'Sloped Grass & Concrete Pad',
    location: 'Yorktown Battlefield Area, VA',
    imageUrl: 'https://images.unsplash.com/photo-1544984243-ec57ea16fe25?auto=format&fit=crop&w=1200&q=80',
    defaultOverlay: { top: 48, left: 12, width: 76, height: 44, perspectiveTilt: 22 }
  },
  {
    id: 'front-walkway',
    name: 'Tired Brick & Concrete Walkway',
    location: 'Williamsburg / Kingsmill, VA',
    imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
    defaultOverlay: { top: 52, left: 20, width: 60, height: 42, perspectiveTilt: 30 }
  }
];

export const AugmentedRealityPreview: React.FC<AugmentedRealityPreviewProps> = ({
  onOpenQuoteModal,
  onSelectServiceForQuote
}) => {
  // Active background scene photo
  const [currentImage, setCurrentImage] = useState<string>(DEMO_SCENES[0].imageUrl);
  const [sceneTitle, setSceneTitle] = useState<string>(DEMO_SCENES[0].name);
  const [isCustomUpload, setIsCustomUpload] = useState<boolean>(false);

  // Selected Vuba Stone Swatch
  const [selectedSwatch, setSelectedSwatch] = useState<VubaSwatch>(VUBA_SWATCHES[1]); // Gloucester Slate by default

  // Overlay Geometry & Visual Properties
  const [overlayTop, setOverlayTop] = useState<number>(DEMO_SCENES[0].defaultOverlay.top);
  const [overlayLeft, setOverlayLeft] = useState<number>(DEMO_SCENES[0].defaultOverlay.left);
  const [overlayWidth, setOverlayWidth] = useState<number>(DEMO_SCENES[0].defaultOverlay.width);
  const [overlayHeight, setOverlayHeight] = useState<number>(DEMO_SCENES[0].defaultOverlay.height);
  const [perspectiveTilt, setPerspectiveTilt] = useState<number>(DEMO_SCENES[0].defaultOverlay.perspectiveTilt);
  const [textureScale, setTextureScale] = useState<number>(100);
  const [overlayOpacity, setOverlayOpacity] = useState<number>(90);
  const [finishSheen, setFinishSheen] = useState<'satin' | 'gloss'>('satin');
  const [sunlightFilter, setSunlightFilter] = useState<'noon' | 'sunset' | 'overcast'>('noon');

  // Before / After Comparison Split Slider
  const [showSplitView, setShowSplitView] = useState<boolean>(false);
  const [splitPosition, setSplitPosition] = useState<number>(50); // percentage 0 - 100

  // Dragging overlay state
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Switch demo scene
  const handleSelectDemoScene = (scene: typeof DEMO_SCENES[0]) => {
    setCurrentImage(scene.imageUrl);
    setSceneTitle(scene.name);
    setIsCustomUpload(false);
    setOverlayTop(scene.defaultOverlay.top);
    setOverlayLeft(scene.defaultOverlay.left);
    setOverlayWidth(scene.defaultOverlay.width);
    setOverlayHeight(scene.defaultOverlay.height);
    setPerspectiveTilt(scene.defaultOverlay.perspectiveTilt);
  };

  // Handle file or camera upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setCurrentImage(event.target.result as string);
          setSceneTitle('My Uploaded Property Photo');
          setIsCustomUpload(true);
          // Default center overlay for custom photos
          setOverlayTop(48);
          setOverlayLeft(15);
          setOverlayWidth(70);
          setOverlayHeight(45);
          setPerspectiveTilt(25);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Reset overlay positioning
  const handleResetAlignment = () => {
    setOverlayTop(45);
    setOverlayLeft(15);
    setOverlayWidth(70);
    setOverlayHeight(45);
    setPerspectiveTilt(25);
    setTextureScale(100);
    setOverlayOpacity(90);
  };

  // Mouse / Touch Dragging for Overlay Box
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const deltaX = ((e.clientX - dragStart.x) / rect.width) * 100;
    const deltaY = ((e.clientY - dragStart.y) / rect.height) * 100;

    setOverlayLeft(prev => Math.min(Math.max(prev + deltaX, 0), 100 - overlayWidth));
    setOverlayTop(prev => Math.min(Math.max(prev + deltaY, 0), 100 - overlayHeight));
    setDragStart({ x: e.clientX, y: e.clientY });
  }, [isDragging, dragStart, overlayWidth, overlayHeight]);

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove]);

  // Download high-resolution composite simulation
  const handleDownloadSnapshot = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 1200;
    canvas.height = 800;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = currentImage;
    img.onload = () => {
      ctx.drawImage(img, 0, 0, 1200, 800);

      // Render overlay area
      const x = (overlayLeft / 100) * 1200;
      const y = (overlayTop / 100) * 800;
      const w = (overlayWidth / 100) * 1200;
      const h = (overlayHeight / 100) * 800;

      ctx.save();
      ctx.globalAlpha = overlayOpacity / 100;
      ctx.fillStyle = selectedSwatch.hexPrimary;
      ctx.fillRect(x, y, w, h);

      // Add watermark badge
      ctx.restore();
      ctx.fillStyle = '#0d1210';
      ctx.fillRect(30, 720, 480, 55);
      ctx.fillStyle = '#a3907c';
      ctx.font = 'bold 16px sans-serif';
      ctx.fillText(`TB CUSTOM LANDSCAPING • VUBA STONE™ PREVIEW`, 45, 745);
      ctx.fillStyle = '#ffffff';
      ctx.font = '13px sans-serif';
      ctx.fillText(`Selected Blend: ${selectedSwatch.name} | Gloucester, VA`, 45, 765);

      const a = document.createElement('a');
      a.download = `tb-custom-vuba-stone-simulation-${selectedSwatch.id}.png`;
      a.href = canvas.toDataURL('image/png');
      a.click();
    };
  };

  // Transfer selected swatch to quote modal
  const handleRequestEstimateForSwatch = () => {
    const serviceTitle = `Certified Vuba Stone (${selectedSwatch.name} Blend)`;
    if (onSelectServiceForQuote) {
      onSelectServiceForQuote(serviceTitle);
    }
    if (onOpenQuoteModal) {
      onOpenQuoteModal(serviceTitle);
    }
  };

  return (
    <section 
      id="ar-visualizer" 
      aria-label="Augmented Reality Vuba Stone Property Visualizer"
      className="py-16 sm:py-24 bg-[#0a0e0c] relative overflow-hidden text-white border-t border-white/10"
    >
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 right-1/4 w-96 h-96 bg-[#a3907c]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#16201c] border border-[#a3907c]/30 text-[#a3907c] text-xs font-bold uppercase tracking-widest mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#a3907c]" />
            <span>Augmented Reality & Surface Visualizer</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-white tracking-tight uppercase">
            AR Property <span className="text-[#a3907c]">Visualizer</span>
          </h2>

          <p className="mt-3 text-sm sm:text-base text-white/70 max-w-2xl mx-auto leading-relaxed">
            Upload a photo of your driveway, patio, or pool surround directly from your camera, and preview our 100% permeable Vuba Stone™ resin aggregate blends in your exact outdoor space.
          </p>
        </div>

        {/* Visualizer Main Interactive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: Live Interactive AR Canvas Viewport (8 cols) */}
          <div className="lg:col-span-8 bg-[#121915]/95 border border-white/15 rounded-2xl p-4 sm:p-6 shadow-2xl backdrop-blur-sm space-y-4">
            
            {/* Viewport Action Top Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-white/10 text-xs">
              <div className="flex items-center space-x-2">
                <span className="font-bold text-white flex items-center">
                  <Camera className="w-4 h-4 mr-1.5 text-[#a3907c]" />
                  {sceneTitle}
                </span>
                {isCustomUpload && (
                  <span className="text-[10px] bg-emerald-950 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded font-bold uppercase">
                    Your Photo
                  </span>
                )}
              </div>

              {/* View Modes & Reset */}
              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={() => setShowSplitView(!showSplitView)}
                  className={`px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all flex items-center space-x-1.5 ${
                    showSplitView 
                      ? 'bg-[#a3907c] text-[#0d1210] border-[#a3907c] font-bold'
                      : 'bg-white/5 border-white/10 text-white/70 hover:text-white'
                  }`}
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>{showSplitView ? 'Full Overlay' : 'Split Before/After'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleResetAlignment}
                  className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 text-xs transition flex items-center space-x-1"
                  title="Reset overlay alignment"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Reset</span>
                </button>

                <button
                  type="button"
                  onClick={handleDownloadSnapshot}
                  className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-[#a3907c] hover:text-[#0d1210] border border-white/10 text-white text-xs font-semibold transition flex items-center space-x-1"
                  title="Save simulation screenshot"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Save Image</span>
                </button>
              </div>
            </div>

            {/* THE VISUALIZER CANVAS CONTAINER */}
            <div 
              ref={containerRef}
              className="relative w-full aspect-[4/3] sm:aspect-video rounded-xl overflow-hidden bg-black select-none border border-white/10 shadow-inner"
            >
              {/* Background Photo */}
              <img 
                src={currentImage} 
                alt="Property scene"
                className="w-full h-full object-cover pointer-events-none"
              />

              {/* Standard Full Overlay Mode */}
              {!showSplitView && (
                <div
                  onMouseDown={handleMouseDown}
                  className="absolute cursor-move transition-transform duration-75"
                  style={{
                    top: `${overlayTop}%`,
                    left: `${overlayLeft}%`,
                    width: `${overlayWidth}%`,
                    height: `${overlayHeight}%`,
                    transform: `perspective(600px) rotateX(${perspectiveTilt}deg)`,
                    transformOrigin: 'bottom center',
                  }}
                >
                  {/* Textured Vuba Stone Surface Plate */}
                  <div 
                    className="w-full h-full rounded-md shadow-2xl relative overflow-hidden transition-all"
                    style={{
                      backgroundColor: selectedSwatch.hexPrimary,
                      opacity: overlayOpacity / 100,
                      boxShadow: finishSheen === 'gloss' 
                        ? 'inset 0 1px 3px rgba(255,255,255,0.4), 0 10px 25px rgba(0,0,0,0.6)'
                        : '0 8px 20px rgba(0,0,0,0.5)',
                      border: '1px dashed rgba(255,255,255,0.3)'
                    }}
                  >
                    {/* Realistic Aggregate Grain & Marble Fleck Pattern */}
                    <div 
                      className="absolute inset-0 opacity-80 mix-blend-multiply"
                      style={{
                        backgroundImage: `radial-gradient(${selectedSwatch.hexSecondary} 1px, transparent 1px), radial-gradient(${selectedSwatch.hexTertiary} 1px, transparent 1px)`,
                        backgroundSize: `${textureScale * 0.12}px ${textureScale * 0.12}px, ${textureScale * 0.20}px ${textureScale * 0.20}px`,
                        backgroundPosition: '0 0, 8px 8px'
                      }}
                    />

                    {/* Sunlight & Coastal Lighting Filter */}
                    {sunlightFilter === 'noon' && (
                      <div className="absolute inset-0 bg-gradient-to-tr from-black/25 via-transparent to-amber-100/25 pointer-events-none" />
                    )}
                    {sunlightFilter === 'sunset' && (
                      <div className="absolute inset-0 bg-gradient-to-t from-orange-950/40 via-amber-500/20 to-rose-400/20 pointer-events-none" />
                    )}
                    {sunlightFilter === 'overcast' && (
                      <div className="absolute inset-0 bg-slate-900/25 pointer-events-none" />
                    )}

                    {/* Gloss Sheen Reflection */}
                    {finishSheen === 'gloss' && (
                      <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-transparent opacity-60 pointer-events-none" />
                    )}

                    {/* Central Move & Drag Handle */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="px-3 py-1 rounded bg-black/75 backdrop-blur-md text-white text-[11px] font-mono tracking-wider border border-white/20 flex items-center space-x-1.5 shadow-lg">
                        <Move className="w-3.5 h-3.5 text-[#a3907c]" />
                        <span>Drag to Position Surface</span>
                      </div>
                    </div>

                    {/* Active Swatch Badge in Corner */}
                    <div className="absolute bottom-2 left-2 bg-black/80 backdrop-blur-md px-2.5 py-1 rounded text-[10px] text-white font-bold flex items-center space-x-1.5 border border-white/20">
                      <span 
                        className="w-2 h-2 rounded-full" 
                        style={{ backgroundColor: selectedSwatch.hexPrimary }}
                      />
                      <span>{selectedSwatch.name}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Split Before / After Slider Mode */}
              {showSplitView && (
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  {/* Left Side (Before - Original Surface) is uncovered */}
                  
                  {/* Right Side (After - Vuba Stone Overlay) with clip-path */}
                  <div 
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      clipPath: `polygon(${splitPosition}% 0, 100% 0, 100% 100%, ${splitPosition}% 100%)`
                    }}
                  >
                    {/* Simulated Full Surface Plate */}
                    <div 
                      className="absolute inset-0"
                      style={{
                        backgroundColor: selectedSwatch.hexPrimary,
                        opacity: 0.88,
                        backgroundImage: `radial-gradient(${selectedSwatch.hexSecondary} 1.5px, transparent 1.5px), radial-gradient(${selectedSwatch.hexTertiary} 1.5px, transparent 1.5px)`,
                        backgroundSize: '16px 16px, 24px 24px',
                        backgroundPosition: '0 0, 10px 10px'
                      }}
                    />
                    <div className="absolute top-4 right-4 bg-emerald-950/90 text-emerald-300 border border-emerald-500/40 px-3 py-1 rounded text-xs font-bold uppercase tracking-wider shadow-lg">
                      After: {selectedSwatch.name}
                    </div>
                  </div>

                  {/* Before Label on Left */}
                  <div className="absolute top-4 left-4 bg-black/80 text-white/90 border border-white/20 px-3 py-1 rounded text-xs font-bold uppercase tracking-wider shadow-lg">
                    Before: Existing Surface
                  </div>

                  {/* Draggable Divider Line */}
                  <div 
                    className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize pointer-events-auto shadow-2xl flex items-center justify-center"
                    style={{ left: `${splitPosition}%` }}
                  >
                    <div className="w-7 h-7 rounded-full bg-[#a3907c] text-[#0d1210] flex items-center justify-center shadow-xl border-2 border-white text-[10px] font-bold">
                      ↔
                    </div>
                  </div>
                </div>
              )}

              {/* Interactive Split Position Range Slider when Split View is Active */}
              {showSplitView && (
                <div className="absolute bottom-4 inset-x-8 z-10">
                  <input
                    type="range"
                    min="5"
                    max="95"
                    value={splitPosition}
                    onChange={(e) => setSplitPosition(parseInt(e.target.value))}
                    className="w-full h-2 bg-black/80 rounded-lg appearance-none cursor-pointer accent-[#a3907c]"
                  />
                  <div className="flex justify-between text-[10px] text-white/70 font-mono mt-1 px-1">
                    <span>← Original Condition</span>
                    <span>Slide to Compare</span>
                    <span>Vuba Stone™ →</span>
                  </div>
                </div>
              )}
            </div>

            {/* Photo Capture & Upload Controls Bar */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              
              <div className="flex items-center space-x-2">
                {/* Take Photo with Device Camera */}
                <button
                  type="button"
                  onClick={() => cameraInputRef.current?.click()}
                  className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-[#a3907c] hover:bg-[#b5a38f] text-[#0d1210] font-bold text-xs uppercase tracking-wider transition-all shadow flex items-center justify-center space-x-1.5"
                >
                  <Camera className="w-4 h-4" />
                  <span>Snap Photo</span>
                </button>
                <input
                  ref={cameraInputRef}
                  type="file"
                  accept="image/*"
                  capture="environment"
                  className="hidden"
                  onChange={handleFileChange}
                />

                {/* Upload from Gallery / Computer */}
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-[#16201c] hover:bg-[#1f2c25] border border-white/20 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center space-x-1.5"
                >
                  <Upload className="w-4 h-4 text-[#a3907c]" />
                  <span>Upload Image</span>
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </div>

              {/* Sample Scene Quick Selector */}
              <div className="flex items-center space-x-1.5 overflow-x-auto scrollbar-none py-1">
                <span className="text-[11px] text-white/50 whitespace-nowrap mr-1 font-semibold uppercase">
                  Try Sample:
                </span>
                {DEMO_SCENES.map((scene) => (
                  <button
                    key={scene.id}
                    type="button"
                    onClick={() => handleSelectDemoScene(scene)}
                    className={`px-2.5 py-1 rounded text-[11px] whitespace-nowrap transition-all border ${
                      currentImage === scene.imageUrl
                        ? 'bg-[#a3907c] text-[#0d1210] border-[#a3907c] font-bold'
                        : 'bg-white/5 text-white/60 border-white/10 hover:text-white'
                    }`}
                  >
                    {scene.name.split(' ')[0]} {scene.name.split(' ')[1]}
                  </button>
                ))}
              </div>

            </div>

          </div>

          {/* RIGHT: Swatch Selection & Texture Controls (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Swatch Selection Card */}
            <div className="bg-[#121915]/95 border border-white/15 rounded-2xl p-5 sm:p-6 shadow-2xl backdrop-blur-sm space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[#a3907c] flex items-center">
                  <Layers className="w-3.5 h-3.5 mr-1.5" />
                  Select Vuba Stone Blend
                </span>
                <span className="text-[10px] text-white/40 uppercase font-mono">
                  6 Formulations
                </span>
              </div>

              {/* Swatch Grid */}
              <div className="grid grid-cols-2 gap-2.5">
                {VUBA_SWATCHES.map((swatch) => {
                  const isSelected = selectedSwatch.id === swatch.id;
                  return (
                    <button
                      key={swatch.id}
                      type="button"
                      onClick={() => setSelectedSwatch(swatch)}
                      className={`p-2.5 rounded-xl border text-left transition-all relative overflow-hidden group flex flex-col justify-between min-h-[78px] ${
                        isSelected
                          ? 'bg-[#1a2521] border-[#a3907c] shadow-lg ring-1 ring-[#a3907c]'
                          : 'bg-[#0e1411] border-white/10 hover:border-white/30'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <div 
                          className="w-5 h-5 rounded-full border border-white/30 shadow-sm shrink-0"
                          style={{ backgroundColor: swatch.hexPrimary }}
                        />
                        {isSelected && (
                          <span className="w-4 h-4 rounded-full bg-[#a3907c] text-[#0d1210] flex items-center justify-center text-[9px] font-bold">
                            <Check className="w-3 h-3 stroke-[3]" />
                          </span>
                        )}
                      </div>

                      <div>
                        <h4 className="text-xs font-bold text-white leading-tight group-hover:text-[#a3907c] transition-colors line-clamp-1">
                          {swatch.name}
                        </h4>
                        <span className="text-[10px] text-white/50 block font-mono">
                          {swatch.category}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Selected Swatch Details Card */}
              <div className="p-3.5 rounded-xl bg-[#0e1411] border border-white/10 text-xs space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white text-sm">
                    {selectedSwatch.name}
                  </span>
                  <span className="text-[10px] text-[#a3907c] font-bold px-2 py-0.5 rounded bg-white/5 uppercase">
                    {selectedSwatch.grainSize}
                  </span>
                </div>
                <p className="text-white/70 text-[11px] leading-relaxed">
                  {selectedSwatch.description}
                </p>
                <div className="pt-1.5 border-t border-white/5 flex items-center justify-between text-[10px] text-emerald-400 font-semibold">
                  <span>Permeability: {selectedSwatch.permeabilityRate}</span>
                  <span className="text-white/50">{selectedSwatch.popularFor}</span>
                </div>
              </div>

            </div>

            {/* Surface Fine-Tuning Controls */}
            <div className="bg-[#121915]/95 border border-white/15 rounded-2xl p-5 sm:p-6 shadow-2xl backdrop-blur-sm space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[#a3907c] flex items-center">
                <SlidersHorizontal className="w-3.5 h-3.5 mr-1.5" />
                Perspective & Environmental Tuning
              </span>

              {/* Perspective Tilt */}
              <div>
                <div className="flex justify-between text-xs text-white/70 mb-1">
                  <span>Ground Perspective Angle</span>
                  <span className="font-mono text-white">{perspectiveTilt}°</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="60"
                  value={perspectiveTilt}
                  onChange={(e) => setPerspectiveTilt(parseInt(e.target.value))}
                  className="w-full h-1.5 bg-[#1a2521] rounded appearance-none cursor-pointer accent-[#a3907c]"
                />
              </div>

              {/* Surface Coverage Width & Height */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <div className="flex justify-between text-xs text-white/70 mb-1">
                    <span>Width</span>
                    <span className="font-mono text-white">{overlayWidth}%</span>
                  </div>
                  <input
                    type="range"
                    min="20"
                    max="95"
                    value={overlayWidth}
                    onChange={(e) => setOverlayWidth(parseInt(e.target.value))}
                    className="w-full h-1.5 bg-[#1a2521] rounded appearance-none cursor-pointer accent-[#a3907c]"
                  />
                </div>
                <div>
                  <div className="flex justify-between text-xs text-white/70 mb-1">
                    <span>Length</span>
                    <span className="font-mono text-white">{overlayHeight}%</span>
                  </div>
                  <input
                    type="range"
                    min="15"
                    max="80"
                    value={overlayHeight}
                    onChange={(e) => setOverlayHeight(parseInt(e.target.value))}
                    className="w-full h-1.5 bg-[#1a2521] rounded appearance-none cursor-pointer accent-[#a3907c]"
                  />
                </div>
              </div>

              {/* Lighting Conditions */}
              <div>
                <span className="block text-[11px] text-white/70 mb-1.5">Sunlight Simulation:</span>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  {[
                    { id: 'noon', label: 'Midday Sun' },
                    { id: 'sunset', label: 'Golden Hour' },
                    { id: 'overcast', label: 'Overcast' },
                  ].map((filter) => (
                    <button
                      key={filter.id}
                      type="button"
                      onClick={() => setSunlightFilter(filter.id as typeof sunlightFilter)}
                      className={`py-1.5 px-2 rounded-lg border text-center text-[11px] transition ${
                        sunlightFilter === filter.id
                          ? 'bg-white/20 text-white border-white/40 font-bold'
                          : 'bg-white/5 border-white/10 text-white/60 hover:text-white'
                      }`}
                    >
                      {filter.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Surface Sheen */}
              <div className="flex items-center justify-between text-xs pt-1">
                <span className="text-white/70">Topcoat Finish:</span>
                <div className="flex space-x-1.5">
                  <button
                    type="button"
                    onClick={() => setFinishSheen('satin')}
                    className={`px-3 py-1 rounded text-xs font-medium border transition ${
                      finishSheen === 'satin'
                        ? 'bg-[#a3907c] text-[#0d1210] border-[#a3907c] font-bold'
                        : 'bg-white/5 border-white/10 text-white/60 hover:text-white'
                    }`}
                  >
                    Natural Satin
                  </button>
                  <button
                    type="button"
                    onClick={() => setFinishSheen('gloss')}
                    className={`px-3 py-1 rounded text-xs font-medium border transition ${
                      finishSheen === 'gloss'
                        ? 'bg-[#a3907c] text-[#0d1210] border-[#a3907c] font-bold'
                        : 'bg-white/5 border-white/10 text-white/60 hover:text-white'
                    }`}
                  >
                    Wet-Look Gloss
                  </button>
                </div>
              </div>

            </div>

            {/* Direct Action Trigger: Request Estimate with this Visualized Blend */}
            <div className="space-y-2.5">
              <button
                type="button"
                onClick={handleRequestEstimateForSwatch}
                className="w-full py-3.5 px-4 rounded-xl bg-[#a3907c] hover:bg-[#b5a38f] text-[#0d1210] font-bold text-xs sm:text-sm uppercase tracking-wider transition-all shadow-lg flex items-center justify-center space-x-2"
              >
                <span>Request Estimate with {selectedSwatch.name}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <p className="text-[11px] text-white/50 text-center">
                Includes free on-site physical sample kit review by Travis in Gloucester County.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
