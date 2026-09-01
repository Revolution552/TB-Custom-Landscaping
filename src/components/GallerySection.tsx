import React, { useState } from 'react';
import { 
  Sparkles, 
  MapPin, 
  X, 
  ArrowRight,
  Maximize2,
  CheckCircle2
} from 'lucide-react';

interface GalleryItem {
  id: string;
  title: string;
  category: 'Vuba Stone' | 'Paver Patio' | 'Retaining Wall' | 'Driveways' | 'Drainage';
  location: string;
  sqFt: string;
  imageUrl: string;
  description: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'g1',
    title: 'Seamless Vuba Stone Driveway & Cobble Border',
    category: 'Vuba Stone',
    location: 'Ware Neck, Gloucester County, VA',
    sqFt: '1,850 sq.ft.',
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80',
    description: 'Permeable resin-bound aggregate in Gloucester Slate blend with dark charcoal Belgian block edge restraint.'
  },
  {
    id: 'g2',
    title: 'Multi-Level Paver Terrace with Fire Pit & LED Walls',
    category: 'Paver Patio',
    location: 'Yorktown Battlefield, VA',
    sqFt: '1,200 sq.ft.',
    imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1000&q=80',
    description: 'Ashlar pattern pavers with integrated natural gas fire table and double-sided seating walls.'
  },
  {
    id: 'g3',
    title: 'Cool-Touch Resin Stone Pool Surround',
    category: 'Vuba Stone',
    location: 'Mathews County Waterfront, VA',
    sqFt: '950 sq.ft.',
    imageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1000&q=80',
    description: 'Rivah Oyster blend installed over existing spalled concrete pool deck with non-slip glass micro-beads.'
  },
  {
    id: 'g4',
    title: 'Engineered Tiered Retaining Wall & Walkway',
    category: 'Retaining Wall',
    location: 'Kingsmill, Williamsburg, VA',
    sqFt: '450 face ft.',
    imageUrl: 'https://images.unsplash.com/photo-1584463699026-60802c03cb47?auto=format&fit=crop&w=1000&q=80',
    description: 'Segmental block retaining wall with buried footer and 4" perforated drainage backfill.'
  },
  {
    id: 'g5',
    title: 'Permeable Paver Motor Court Driveway',
    category: 'Driveways',
    location: 'Gloucester Courthouse Corridor, VA',
    sqFt: '2,400 sq.ft.',
    imageUrl: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1000&q=80',
    description: 'High-compaction permeable vehicular pavers over open-graded aggregate base.'
  },
  {
    id: 'g6',
    title: 'French Drainage Network & Foundation Swale',
    category: 'Drainage',
    location: 'Ordinary, Gloucester County, VA',
    sqFt: '180 linear ft.',
    imageUrl: 'https://images.unsplash.com/photo-1544984243-ec57ea16fe25?auto=format&fit=crop&w=1000&q=80',
    description: 'Laser-graded slope correction with smooth-wall PVC discharge lines and decorative river rock swale.'
  }
];

interface GallerySectionProps {
  onOpenQuoteModal: () => void;
}

export const GallerySection: React.FC<GallerySectionProps> = ({ onOpenQuoteModal }) => {
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

  const filters = ['All', 'Vuba Stone', 'Paver Patio', 'Retaining Wall', 'Driveways', 'Drainage'];

  const filteredItems = activeFilter === 'All'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter(item => item.category === activeFilter);

  return (
    <section id="gallery" className="py-16 lg:py-24 bg-[#0d1210] text-[#f2f4f3] border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <span className="text-[10px] font-bold text-[#a3907c] uppercase tracking-widest px-3 py-1 rounded-full bg-[#a3907c]/10 border border-[#a3907c]/30 inline-block mb-3">
              Craftsmanship Portfolio
            </span>
            <h2 className="text-3xl sm:text-4xl font-light text-white mt-1">
              Recent Transformations Across <span className="italic font-serif text-[#a3907c]">Gloucester, VA</span>
            </h2>
            <p className="text-xs sm:text-sm text-white/60 mt-2 max-w-2xl">
              Explore real installations completed by our master in-house crew. Click any project to inspect details.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2 self-start md:self-auto w-full sm:w-auto">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`min-h-[40px] px-3.5 py-2 rounded-sm text-xs font-bold uppercase tracking-wider transition active:scale-95 ${
                  activeFilter === f
                    ? 'bg-[#a3907c] text-[#0d1210] shadow-sm'
                    : 'bg-white/5 text-white/60 hover:text-white border border-white/10'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedImage(item)}
              className="group cursor-pointer bg-[#121816] rounded-sm overflow-hidden border border-white/10 hover:border-[#a3907c]/40 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
            >
              <div className="relative h-60 overflow-hidden">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity"></div>
                
                {/* Floating Tags */}
                <div className="absolute top-3 left-3 flex items-center space-x-1.5">
                  <span className="text-[9px] font-bold uppercase tracking-wider bg-black/80 text-[#a3907c] px-2.5 py-1 rounded-sm backdrop-blur-sm border border-white/10">
                    {item.category}
                  </span>
                </div>

                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <h3 className="text-sm font-bold uppercase tracking-wider drop-shadow">
                    {item.title}
                  </h3>
                  <p className="text-xs text-white/70 flex items-center mt-1">
                    <MapPin className="w-3 h-3 mr-1 text-[#a3907c]" />
                    {item.location}
                  </p>
                </div>

                <div className="absolute top-3 right-3 w-8 h-8 rounded-sm bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm border border-white/10">
                  <Maximize2 className="w-4 h-4 text-[#a3907c]" />
                </div>
              </div>

              <div className="p-4 bg-[#121816] flex-1 flex flex-col justify-between">
                <p className="text-xs text-white/60 leading-relaxed">
                  {item.description}
                </p>
                <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center justify-between text-[11px] font-semibold text-white/80">
                  <span className="text-white/40 uppercase tracking-wider text-[10px]">Size: {item.sqFt}</span>
                  <span className="text-[#a3907c] group-hover:text-white uppercase tracking-wider text-[10px] flex items-center transition-colors">
                    Inspect <ArrowRight className="w-3 h-3 ml-0.5" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal Lightbox */}
        {selectedImage && (
          <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-in fade-in duration-200">
            <div className="bg-[#121816] text-[#f2f4f3] rounded-sm max-w-3xl w-full overflow-hidden border border-white/15 shadow-2xl relative my-auto max-h-[92vh] overflow-y-auto">
              
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-3.5 right-3.5 z-10 w-10 h-10 rounded-sm bg-black/80 text-white flex items-center justify-center hover:bg-[#a3907c] hover:text-[#0d1210] transition border border-white/10 active:scale-95"
                aria-label="Close image preview"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative h-64 sm:h-96">
                <img
                  src={selectedImage.imageUrl}
                  alt={selectedImage.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-5 sm:p-8 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-bold text-[#a3907c] uppercase tracking-widest">
                      {selectedImage.category} • {selectedImage.sqFt}
                    </span>
                    <h3 className="text-lg sm:text-2xl font-light text-white mt-1">
                      {selectedImage.title}
                    </h3>
                    <p className="text-xs text-white/60 flex items-center mt-1">
                      <MapPin className="w-3.5 h-3.5 mr-1 text-[#a3907c]" />
                      {selectedImage.location}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedImage(null);
                      onOpenQuoteModal();
                    }}
                    className="w-full sm:w-auto min-h-[48px] px-5 py-3 rounded-sm bg-[#a3907c] hover:bg-white text-[#0d1210] text-xs font-bold uppercase tracking-wider transition shadow flex items-center justify-center active:scale-[0.98]"
                  >
                    Request Similar Build
                  </button>
                </div>

                <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
                  {selectedImage.description}
                </p>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};
