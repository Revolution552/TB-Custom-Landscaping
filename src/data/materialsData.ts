export interface MaterialItem {
  id: string;
  name: string;
  type: 'vuba-stone' | 'paver';
  category: 'Coastal' | 'Modern' | 'Earth' | 'Classic' | 'Historic' | 'Architectural';
  tagline: string;
  description: string;
  textureDescription: string;
  hexColors: string[];
  dimensionsOrGrain: string;
  permeability: string;
  slipResistance: string;
  loadRating: string;
  maintenanceLevel: 'Ultra Low' | 'Low' | 'Moderate';
  heatRetention: 'Cool Touch' | 'Moderate' | 'Warm';
  popularApplications: string[];
  imageUrl: string;
  tag?: string;
  keyFeatures: string[];
  virginiaSuitability: string;
}

export const MATERIALS_CATALOG: MaterialItem[] = [
  // --- VUBA STONE RESIN SURFACES ---
  {
    id: 'vuba-chesapeake-sand',
    name: 'Chesapeake Sand',
    type: 'vuba-stone',
    category: 'Coastal',
    tagline: 'Warm golden quartz with natural amber undertones and river pearl flecks.',
    description: 'Inspired by Virginia’s Tidewater shoreline, this blend pairs beautifully with coastal waterfront homes, river cottages, and brick foundations. Its natural rounded aggregates feel smooth and barefoot-friendly.',
    textureDescription: 'Hand-troweled smooth pebble texture with embedded micro-grip polymer beads for traction.',
    hexColors: ['#D8C3A5', '#BFA07A', '#8D7B68'],
    dimensionsOrGrain: '2mm - 5mm Kiln-Dried European Quartz',
    permeability: '850+ gal/hr per sq.yd (100% Permeable)',
    slipResistance: 'High Wet Traction (PTV 65+)',
    loadRating: 'Rated for Heavy Vehicular Traffic (40+ tons on VubaMac)',
    maintenanceLevel: 'Ultra Low',
    heatRetention: 'Cool Touch',
    popularApplications: ['Pool Decks', 'Covered Patios', 'Screened Porches', 'Waterfront Walkways'],
    imageUrl: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80',
    tag: 'Coastal Best Seller',
    keyFeatures: [
      'Puddle-free SUDS stormwater infiltration',
      'Naturally cool under bare feet',
      'Zero weed or moss infiltration'
    ],
    virginiaSuitability: 'Exceptional in coastal high-humidity zones; never traps moisture or breeds algae.'
  },
  {
    id: 'vuba-gloucester-slate',
    name: 'Gloucester Slate & Basalt',
    type: 'vuba-stone',
    category: 'Modern',
    tagline: 'High-contrast charcoal granite blended with cool silver slate chips.',
    description: 'Contemporary, architectural, and striking. The dark slate and basalt aggregate masks motor oil, tire turning marks, and leaf stains effortlessly while delivering an ultra-luxurious entrance.',
    textureDescription: 'Subtly textured angular crushed stone bound in 100% clear UV-stable resin.',
    hexColors: ['#4A5551', '#2C3531', '#1A211E'],
    dimensionsOrGrain: '3mm - 6mm Crushed Marble & Basalt',
    permeability: '900+ gal/hr per sq.yd (100% Permeable)',
    slipResistance: 'Maximum Grip (PTV 70+)',
    loadRating: 'Rated for Heavy Commercial & SUV Traffic',
    maintenanceLevel: 'Ultra Low',
    heatRetention: 'Moderate',
    popularApplications: ['Driveways', 'Modern Courtyards', 'Architectural Borders', 'Carports'],
    imageUrl: 'https://images.unsplash.com/photo-1584463699026-60802c03cb47?auto=format&fit=crop&w=800&q=80',
    tag: 'High-Traffic Driveway Pick',
    keyFeatures: [
      'Conceals tire scuffs and oil stains completely',
      'Sleek modern contrast against lighter home facades',
      'Resistant to road salt and winter chemicals'
    ],
    virginiaSuitability: 'Engineered for driveway torque; absorbs torrential summer cloudbursts without pooling.'
  },
  {
    id: 'vuba-rivah-oyster',
    name: 'Rivah Oyster Pearl',
    type: 'vuba-stone',
    category: 'Coastal',
    tagline: 'Bright off-white and soft cream river pebbles with subtle mineral veining.',
    description: 'The definitive resort-grade pool deck surface. Its high solar reflectance index (SRI) keeps the surface up to 20°F cooler than poured concrete in July heat, providing a luxury barefoot sanctuary.',
    textureDescription: 'Silky rounded river aggregate with non-abrasive anti-slip micro-beads.',
    hexColors: ['#ECE8DF', '#D7D1C5', '#B3AC9F'],
    dimensionsOrGrain: '2mm - 4mm Tumbled River Quartz',
    permeability: '920+ gal/hr per sq.yd (100% Permeable)',
    slipResistance: 'Anti-Slip Certified (Wet Barefoot Rated)',
    loadRating: 'Light-to-Medium Vehicular & Pedestrian',
    maintenanceLevel: 'Ultra Low',
    heatRetention: 'Cool Touch',
    popularApplications: ['Resort Pool Decks', 'Sunrooms', 'Garden Terraces', 'Cottage Walkways'],
    imageUrl: 'https://images.unsplash.com/photo-1544984243-ec57ea16fe25?auto=format&fit=crop&w=800&q=80',
    tag: 'Cool-Touch Pool Winner',
    keyFeatures: [
      'Stays up to 20°F cooler under direct midday sun',
      'Smooth non-abrasive finish safe for toddlers',
      'Water filters straight through into ground drainage'
    ],
    virginiaSuitability: 'Ideal around salt-water pools and Mobjack Bay waterfront moisture.'
  },
  {
    id: 'vuba-shenandoah-gold',
    name: 'Shenandoah Honey Gold',
    type: 'vuba-stone',
    category: 'Earth',
    tagline: 'Rich harvest amber, warm terracotta quartz, and buff mountain stone.',
    description: 'Brimming with organic warmth, Shenandoah Honey Gold harmonizes with traditional Virginia red clay brick, white siding, and natural wood cedar accents.',
    textureDescription: 'Warm angular quartz aggregate with comfortable micro-textured grip.',
    hexColors: ['#C99E64', '#A77B43', '#6B4E2B'],
    dimensionsOrGrain: '3mm - 5mm Angular Mountain Quartz',
    permeability: '820+ gal/hr per sq.yd (100% Permeable)',
    slipResistance: 'High Traction (PTV 64+)',
    loadRating: 'Heavy Vehicular Rated',
    maintenanceLevel: 'Ultra Low',
    heatRetention: 'Moderate',
    popularApplications: ['Estate Driveways', 'Historic Home Courtyards', 'Garden Terraces'],
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    tag: 'Colonial Heritage Match',
    keyFeatures: [
      'Complements red brick and colonial architecture',
      '100% UV-stable (will never discolor or yellow)',
      'Permeable base protects ancient mature tree roots'
    ],
    virginiaSuitability: 'Tolerates seasonal leaf tannins and pine needle drop without staining.'
  },
  {
    id: 'vuba-tidewater-granite',
    name: 'Tidewater Granite Mist',
    type: 'vuba-stone',
    category: 'Classic',
    tagline: 'Salt-and-pepper granite blended with cool ice-blue quartzite flecks.',
    description: 'A timeless architectural neutral that complements gray siding, bluestone steps, and modern aluminum railings. It delivers a crisp, tailored aesthetic that never goes out of style.',
    textureDescription: 'Clean crushed crystalline matrix with balanced traction profile.',
    hexColors: ['#9E9E9E', '#707070', '#424242'],
    dimensionsOrGrain: '3mm - 6mm Crushed Quartzite & Granite',
    permeability: '880+ gal/hr per sq.yd (100% Permeable)',
    slipResistance: 'Medium-High Wet Traction',
    loadRating: 'Rated for Heavy Vehicular & Commercial',
    maintenanceLevel: 'Ultra Low',
    heatRetention: 'Moderate',
    popularApplications: ['Front Entrances', 'Wraparound Porches', 'Modern Patios', 'Carports'],
    imageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
    tag: 'All-Weather Neutral',
    keyFeatures: [
      'Universal aesthetic matching both modern & colonial styles',
      'Never requires re-sealing or toxic stripping',
      'Resistant to coastal salt air and fog'
    ],
    virginiaSuitability: 'Excellent for shaded properties prone to moss on traditional concrete.'
  },
  {
    id: 'vuba-colonial-amber',
    name: 'Colonial Amber Blend',
    type: 'vuba-stone',
    category: 'Historic',
    tagline: 'Warm chestnut aggregates mixed with subtle cream and ironstone.',
    description: 'Specially created for historic restorations in Williamsburg, Yorktown, and Gloucester Courthouse. Provides the antique look of compacted gravel without the loose stones, dust, or rutting.',
    textureDescription: 'Tumbled smooth aggregate matrix with natural earthy variations.',
    hexColors: ['#8E5A3C', '#5C3822', '#3A2012'],
    dimensionsOrGrain: '2mm - 5mm Tumbled River & Field Stone',
    permeability: '860+ gal/hr per sq.yd (100% Permeable)',
    slipResistance: 'High Traction (PTV 66+)',
    loadRating: 'Vehicular & Pedestrian Rated',
    maintenanceLevel: 'Ultra Low',
    heatRetention: 'Warm',
    popularApplications: ['Historic Carriage Paths', 'Courtyard Patios', 'Garden Walkways'],
    imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
    tag: 'Williamsburg Heritage',
    keyFeatures: [
      'Meets historical district guidelines for aesthetic authenticity',
      'No gravel scattering into flower beds or lawns',
      'Hand-troweled seamless transition to brick borders'
    ],
    virginiaSuitability: 'Maintains authentic historical appearance while providing modern SUDS drainage.'
  },

  // --- ARCHITECTURAL PAVERS & SLABS ---
  {
    id: 'paver-dimensional-slate',
    name: 'Textured Dimensional Slate Pavers',
    type: 'paver',
    category: 'Modern',
    tagline: 'Multi-piece interlocking system with authentic cleft stone textures and clean micro-bevels.',
    description: 'Manufactured with high-density architectural concrete and iron oxide pigments. A 3-piece modular layout creates deep shadow lines and the look of quarried slate without the high cost or irregular heights.',
    textureDescription: 'Natural cleft surface with subtle embossed stone grain and chamfered edges.',
    hexColors: ['#3A3E3B', '#5A605C', '#8C9490'],
    dimensionsOrGrain: 'Multi-Size: 6"x12", 12"x12", 12"x18" (60mm Thickness)',
    permeability: 'Joint Infiltration (Polymeric Sand Locked)',
    slipResistance: 'Excellent (Textured Cleft Surface)',
    loadRating: 'ICPI Rated for Vehicular & Heavy Patio Use',
    maintenanceLevel: 'Low',
    heatRetention: 'Moderate',
    popularApplications: ['Outdoor Dining Patios', 'Multi-Level Terraces', 'Fire Pit Surroundings'],
    imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
    tag: 'Patio Modern Standard',
    keyFeatures: [
      'High-density surface resists chipping and scuffing',
      'Pre-aged color blends never fade under Virginia sun',
      'Integrated polymeric sand locking locks out weeds'
    ],
    virginiaSuitability: 'Installed on an 8" compacted stone base to prevent settling in Tidewater clay soils.'
  },
  {
    id: 'paver-european-cobblestone',
    name: 'Tumbled European Cobblestones',
    type: 'paver',
    category: 'Historic',
    tagline: 'Antiqued weathered edges and rustic textures evoking Old World cobblestone streets.',
    description: 'Heavy 80mm structural depth designed to withstand heavy truck torque, turning vehicles, and decades of use. Its tumbled finish lends timeless character to historic estates and country properties.',
    textureDescription: 'Distressed antiqued surface with irregular weathered perimeter edges.',
    hexColors: ['#4E4637', '#736B5E', '#9E9484'],
    dimensionsOrGrain: '6"x6" and 6"x9" Modular Cobbles (80mm Vehicular Thickness)',
    permeability: 'Narrow Joint Sand Interlock',
    slipResistance: 'Superior (Antiqued Relief Surface)',
    loadRating: 'Maximum Vehicular Rating (Heavy SUVs, Vans, Delivery Trucks)',
    maintenanceLevel: 'Low',
    heatRetention: 'Moderate',
    popularApplications: ['Estate Driveways', 'Carriage Entrances', 'Patio Soldier Courses & Borders'],
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    tag: 'Heavy-Duty Driveway Pick',
    keyFeatures: [
      'Extreme compressive strength exceeding 8,500 PSI',
      'Tumbled look naturally conceals minor wear or weathering',
      'Can be laid in herringbone, running bond, or fan patterns'
    ],
    virginiaSuitability: 'High base depth and edge restraints stop lateral shifting in wet river soils.'
  },
  {
    id: 'paver-porcelain-slabs',
    name: 'Modern Large-Format Porcelain Slabs',
    type: 'paver',
    category: 'Architectural',
    tagline: 'Ultra-dense 20mm Italian outdoor porcelain with zero porosity and stain immunity.',
    description: 'The pinnacle of minimalist luxury. Outdoor porcelain slabs absorb <0.1% moisture, making them 100% immune to red Virginia clay stains, barbecue grease, wine spills, and moss or algae growth.',
    textureDescription: 'Refined matte micro-texture with rectified precision straight edges.',
    hexColors: ['#C8C2BC', '#E2DED9', '#8C857E'],
    dimensionsOrGrain: '24" x 24" and 24" x 36" Large Format (20mm Exterior Rated)',
    permeability: 'Non-Porous Surface (Pitched to Drainage Channels)',
    slipResistance: 'Certified R11 Anti-Slip Exterior Surface',
    loadRating: 'Pedestrian & Light Patio Furniture',
    maintenanceLevel: 'Ultra Low',
    heatRetention: 'Cool Touch',
    popularApplications: ['Modern Luxury Patios', 'Poolside Lounges', 'Covered Loggias'],
    imageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
    tag: 'Ultra-Luxury Contemporary',
    keyFeatures: [
      '100% stain proof (impervious to red clay, BBQ grease, and wine)',
      'Never requires sealing or power washing detergents',
      'Frost proof with zero water absorption'
    ],
    virginiaSuitability: 'Zero water absorption means zero freeze/thaw cracking during winter temperature swings.'
  },
  {
    id: 'paver-pennsylvania-bluestone',
    name: 'Natural Pennsylvania Cleft Bluestone',
    type: 'paver',
    category: 'Classic',
    tagline: 'Quarried natural sedimentary flagstone with full-color earth and lilac tones.',
    description: 'True natural stone quarried from the Appalachian basin. Each slab is unique, featuring authentic cleft variations, fossil marks, and rich blues, grays, and rust veins.',
    textureDescription: 'Natural organic cleft texture with hand-chiseled or thermal saw-cut edges.',
    hexColors: ['#47525E', '#6B7A82', '#9AA69D'],
    dimensionsOrGrain: 'Pattern Cut (12"x12" up to 24"x36", 1.5" - 2" Natural Thickness)',
    permeability: 'Permeable Open-Grade Jointing Available',
    slipResistance: 'High Traction Natural Stone Grip',
    loadRating: 'Heavy Pedestrian & Terrace Rated',
    maintenanceLevel: 'Moderate',
    heatRetention: 'Warm',
    popularApplications: ['Estate Porches', 'Garden Walkways', 'Traditional Terraces', 'Pool Coping'],
    imageUrl: 'https://images.unsplash.com/photo-1584463699026-60802c03cb47?auto=format&fit=crop&w=800&q=80',
    tag: 'Authentic Natural Stone',
    keyFeatures: [
      'Genuine quarried American stone with unique organic character',
      'Thermal-treated option for smooth barefoot walking',
      'Timeless prestige that enhances property valuation'
    ],
    virginiaSuitability: 'Must be installed on open-grade crushed gravel to prevent efflorescence in Tidewater humidity.'
  },
  {
    id: 'paver-permeable-eco',
    name: 'Permeable Eco-Flow Interlocking Pavers',
    type: 'paver',
    category: 'Architectural',
    tagline: 'Engineered stormwater infiltration system with calibrated drainage joint voids.',
    description: 'Designed specifically to satisfy strict Chesapeake Bay Preservation Act (CBPA) stormwater compliance. Specially engineered spacer tabs create permeable joints that allow torrential rain to recharge into the stone reservoir below.',
    textureDescription: 'Smooth chamfered concrete surface with wide aggregate-filled joint channels.',
    hexColors: ['#615B52', '#8C8275', '#B8ADA0'],
    dimensionsOrGrain: '4"x8" and 5"x10" Permeable Profile (80mm Heavy Interlock)',
    permeability: '550+ gal/hr per sq.yd (SUDS Compliant Interlocking System)',
    slipResistance: 'High Traction Wet/Dry',
    loadRating: 'Rated for Heavy Vehicular & Permitted Driveways',
    maintenanceLevel: 'Low',
    heatRetention: 'Moderate',
    popularApplications: ['CBPA-Regulated Driveways', 'Commercial Parking', 'Waterfront Infiltration Patios'],
    imageUrl: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80',
    tag: 'Chesapeake Bay CBPA Compliant',
    keyFeatures: [
      'Approved for Chesapeake Bay Preservation Act lot coverage calculations',
      'Eliminates puddling and surface runoff into local rivers',
      'Heavy 80mm interlock holds up to delivery trucks'
    ],
    virginiaSuitability: 'Crucial for waterfront property owners facing strict impervious surface caps.'
  },
  {
    id: 'paver-colonial-clay-brick',
    name: 'Historic Colonial Wire-Cut Clay Brick',
    type: 'paver',
    category: 'Historic',
    tagline: 'Kiln-fired genuine Virginia shale clay pavers with rich deep red and flashed tones.',
    description: 'The iconic aesthetic of Williamsburg, Yorktown, and historic Virginia plantations. Made from high-temperature vitrified shale clay, these bricks will never lose their rich red color and age gracefully over centuries.',
    textureDescription: 'Classic wire-cut brick texture with crisp square architectural edges.',
    hexColors: ['#8A2D1F', '#B33E2B', '#591B13'],
    dimensionsOrGrain: 'Standard 4" x 8" Clay Pavers (2.25" Heavy Paving Thickness)',
    permeability: 'Sand-Set or Mortared Joint Infiltration',
    slipResistance: 'High Wet Traction (Vitrified Clay)',
    loadRating: 'Vehicular & Heavy Pedestrian Rated',
    maintenanceLevel: 'Low',
    heatRetention: 'Warm',
    popularApplications: ['Historic Driveways', 'Traditional Front Stoops', 'Herringbone Walkways', 'Garden Paths'],
    imageUrl: 'https://images.unsplash.com/photo-1544984243-ec57ea16fe25?auto=format&fit=crop&w=800&q=80',
    tag: 'Authentic Virginia Brick',
    keyFeatures: [
      '100% natural kiln-fired clay (color is baked through the entire brick)',
      'Classic herringbone, basketweave, or running bond layouts',
      'Timeless harmony with historic Virginia colonial architecture'
    ],
    virginiaSuitability: 'Vitrified high-fired formulation resists chipping and spalling during winter frost cycles.'
  }
];
