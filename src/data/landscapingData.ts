import {
  VubaSwatch,
  BeforeAfterProject,
  HardscapingFeature,
  SecondaryService,
  Testimonial,
  ServiceArea,
  FaqItem
} from '../types';

export const COMPANY_INFO = {
  name: 'TB Custom Landscaping',
  tagline: 'Architectural Hardscaping & Certified Vuba Stone Surfacing',
  phone: '(804) 555-0192',
  phoneRaw: '+18045550192',
  email: 'estimates@tbcustomlandscapingva.com',
  address: 'Gloucester County, Virginia',
  serviceRegion: 'Gloucester, Mathews, Yorktown, Williamsburg & Tidewater VA',
  license: 'Virginia Class A Contractor #2705-189342 | Fully Insured ($2M Agg)',
  warranty: '5-Year Structural Workmanship Guarantee & Lifetime Vuba UV Warranty',
  hours: 'Mon – Sat: 7:00 AM – 6:00 PM | Sun: Closed (Emergency Quotes Online)',
  jobberUrl: 'https://clienthub.getjobber.com/client_hubs/tb-custom-landscaping/public/work_request/new',
};

export const VUBA_SWATCHES: VubaSwatch[] = [
  {
    id: 'chesapeake-sand',
    name: 'Chesapeake Sand',
    category: 'Coastal',
    description: 'Warm golden quartz with natural amber undertones and river pearl flecks. Inspired by Tidewater Virginia shorelines.',
    hexPrimary: '#D8C3A5',
    hexSecondary: '#BFA07A',
    hexTertiary: '#8D7B68',
    grainSize: '2mm - 5mm Smooth Aggregate',
    popularFor: 'Pool Decks, Patios & Screened Porch Entrances',
    permeabilityRate: 'Over 850 gal/hr per sq yard',
    tag: 'Most Popular Coastal',
    imageUrl: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'gloucester-slate',
    name: 'Gloucester Slate & Basalt',
    category: 'Modern',
    description: 'High-contrast charcoal granite blended with cool silver slate chips. Contemporary, sophisticated, and masks tire marks flawlessly.',
    hexPrimary: '#4A5551',
    hexSecondary: '#2C3531',
    hexTertiary: '#1A211E',
    grainSize: '3mm - 6mm Crushed Marble & Basalt',
    popularFor: 'Luxury Driveways, Modern Walkways & Architectural Borders',
    permeabilityRate: 'Over 900 gal/hr per sq yard',
    tag: 'High Traffic Best Seller',
    imageUrl: 'https://images.unsplash.com/photo-1584463699026-60802c03cb47?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'rivah-oyster',
    name: 'Rivah Oyster Pearl',
    category: 'Coastal',
    description: 'Bright off-white and soft cream river pebbles with subtle grey mineral veining. Stays up to 20°F cooler under direct summer sun.',
    hexPrimary: '#ECE8DF',
    hexSecondary: '#D7D1C5',
    hexTertiary: '#B3AC9F',
    grainSize: '2mm - 4mm Rounded Pea Gravel',
    popularFor: 'Pool Coping Surrounds, Sunrooms & Waterfront Terraces',
    permeabilityRate: 'Over 920 gal/hr per sq yard',
    tag: 'Cool-Touch Pool Favorite',
    imageUrl: 'https://images.unsplash.com/photo-1544984243-ec57ea16fe25?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'shenandoah-gold',
    name: 'Shenandoah Honey Gold',
    category: 'Earth',
    description: 'Rich harvest amber, warm terracotta quartz, and buff stone. Blends naturally with colonial Virginia brick and cedar sidings.',
    hexPrimary: '#C99E64',
    hexSecondary: '#A77B43',
    hexTertiary: '#6B4E2B',
    grainSize: '3mm - 5mm Angular Quartz',
    popularFor: 'Country Club Driveways & Rustic Courtyards',
    permeabilityRate: 'Over 820 gal/hr per sq yard',
    tag: 'Heritage Colonial Fit',
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'tidewater-granite',
    name: 'Tidewater Granite Mist',
    category: 'Classic',
    description: 'A harmonious blend of salt-and-pepper granite with subtle ice blue marble flecks. Timeless architectural pairing for any home style.',
    hexPrimary: '#9E9E9E',
    hexSecondary: '#707070',
    hexTertiary: '#424242',
    grainSize: '3mm - 6mm Crushed Quartzite',
    popularFor: 'Front Porch Steps, Walkways & Carports',
    permeabilityRate: 'Over 880 gal/hr per sq yard',
    tag: 'All-Weather Classic',
    imageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'colonial-amber',
    name: 'Colonial Amber Blend',
    category: 'Earth',
    description: 'Warm chestnut aggregates mixed with subtle cream stones. Specially curated for traditional Williamsburg & Yorktown historic home renovations.',
    hexPrimary: '#8E5A3C',
    hexSecondary: '#5C3822',
    hexTertiary: '#3A2012',
    grainSize: '2mm - 5mm Tumbled River Stone',
    popularFor: 'Historic Brick Transition Paths & Garden Patios',
    permeabilityRate: 'Over 860 gal/hr per sq yard',
    tag: 'Williamsburg Historic Match',
    imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80'
  }
];

export const BEFORE_AFTER_PROJECTS: BeforeAfterProject[] = [
  {
    id: 'project-gloucester-driveway',
    title: 'Cracked Asphalt to Seamless Vuba Stone Driveway',
    location: 'Ware Neck, Gloucester County, VA',
    serviceType: 'Vuba Stone Resin',
    description: 'Homeowner suffered from chronic standing water puddles and severe asphalt alligator cracking. We removed the deteriorated surface, laid an open-graded VubaMac permeable foundation, and hand-troweled our "Gloucester Slate" Vuba blend with a crisp cobblestone border.',
    details: {
      sqFt: 1850,
      completionTime: '3 Days',
      keyChallenge: 'High water table near Mobjack Bay causing regular frost heave.',
      solution: '100% permeable open-grade VubaMac base allowing instant natural water infiltration without puddles.'
    },
    beforeImage: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80',
    afterImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    beforeAlt: 'Worn, cracked asphalt driveway with puddle stains in Gloucester VA',
    afterAlt: 'Stunning permeable Vuba Stone resin-bound driveway in Gloucester Slate with border'
  },
  {
    id: 'project-yorktown-patio',
    title: 'Muddy Yard to Resort-Grade Paver Living Space',
    location: 'Yorktown Battlefield Area, VA',
    serviceType: 'Paver Patio',
    description: 'Transforming a sloped, unusable lawn into a tiered 1,200 sq.ft. multi-level paver patio featuring a custom gas fire pit, seating walls with LED under-cap lighting, and built-in landscape drainage.',
    details: {
      sqFt: 1200,
      completionTime: '6 Days',
      keyChallenge: 'Severe slope directing storm runoff directly against home foundation.',
      solution: 'Dual retaining sitting walls, engineered French drain network, and ICPI-grade compacted aggregate base.'
    },
    beforeImage: 'https://images.unsplash.com/photo-1584463699026-60802c03cb47?auto=format&fit=crop&w=1200&q=80',
    afterImage: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
    beforeAlt: 'Sloped muddy backyard before patio installation in Yorktown',
    afterAlt: 'Luxury multi-level paver patio with fire pit and sitting walls'
  },
  {
    id: 'project-mathews-pooldeck',
    title: 'Flaking Spalled Concrete to Cool-Touch Resin Pool Surround',
    location: 'Mathews County Waterfront, VA',
    serviceType: 'Vuba Stone Resin',
    description: 'Existing 25-year-old concrete pool deck was cracking, abrasive, and dangerously hot in the summer. We primed the existing slab, reinforced expansion relief joints, and installed our "Rivah Oyster" Vuba Stone blend with anti-slip glass micro-beads.',
    details: {
      sqFt: 950,
      completionTime: '2 Days',
      keyChallenge: 'Homeowners needed a barefoot-safe, cool-touch, non-slip surface without tearing out the concrete pool coping.',
      solution: 'Overlay application with aliphatic resin, 18mm thickness, and cast aluminum edge trims.'
    },
    beforeImage: 'https://images.unsplash.com/photo-1544984243-ec57ea16fe25?auto=format&fit=crop&w=1200&q=80',
    afterImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
    beforeAlt: 'Old stained concrete pool deck with cracks',
    afterAlt: 'Seamless, glowing cream Vuba Stone pool deck surround'
  }
];

export const HARDSCAPING_SERVICES: HardscapingFeature[] = [
  {
    id: 'paver-patios',
    title: 'Custom Paver Patios & Outdoor Living',
    tagline: 'Architectural outdoor extensions designed for entertaining and longevity.',
    description: 'From modern large-format slabs to classic European cobbles, we design and install custom paver patios with precision grading, polymeric sand locking, and engineered edge restraints.',
    benefits: [
      'Engineered open-grade stone base prevents settling & heaving',
      'Integrated fire pits, outdoor kitchens, and seating walls',
      'Endless pattern options (Herringbone, Ashlar Slate, Random 3-Piece)'
    ],
    specs: ['6-8" Compacted Base', 'Geo-Textile Subgrade Fabric', 'Polymeric Locking Sand'],
    imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
    iconName: 'Hammer'
  },
  {
    id: 'vuba-resin-stone',
    title: 'Certified Vuba Stone Resin-Bound Surfacing',
    tagline: 'The world’s most advanced permeable architectural surfacing system.',
    description: 'A seamless blend of natural dried marble/quartz aggregate bound with 100% UV-stable polyurethane resin. Puddle-free, weed-free, crack-resistant, and visually breathtaking.',
    benefits: [
      '100% Permeable (SUDS compliant, handles Virginia stormwater)',
      'No loose gravel, weed growth, or freeze/thaw cracking',
      'Can be laid over existing concrete or new permeable VubaMac bases'
    ],
    specs: ['18-22mm Wearing Course', 'UV-Stable Polyurethane', '1000+ Gal/Hr Permeability'],
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    iconName: 'Sparkles'
  },
  {
    id: 'retaining-walls',
    title: 'Structural Retaining & Seating Walls',
    tagline: 'Engineered earth retention that transforms unusable slopes into functional terraced living.',
    description: 'Heavy-duty segmental retaining walls, garden planters, and integrated sitting walls built with buried footer courses, geogrid reinforcement, and perforated drainage pipes.',
    benefits: [
      'Resolves severe yard slope and erosion issues permanently',
      'Built-in perimeter seating for outdoor entertaining',
      'Hidden 4" PVC perforated rear drainage with clean #57 stone backfill'
    ],
    specs: ['Buried Base Course', 'Geogrid Reinforcement', 'Integrated Filter Fabric'],
    imageUrl: 'https://images.unsplash.com/photo-1584463699026-60802c03cb47?auto=format&fit=crop&w=800&q=80',
    iconName: 'ShieldCheck'
  },
  {
    id: 'driveways-walkways',
    title: 'Custom Permeable Driveways & Walkways',
    tagline: 'Make an unforgettable first impression with architectural curb appeal.',
    description: 'Transform tired concrete or muddy gravel with vehicular-rated pavers or heavy-duty Vuba Stone surfacing engineered to withstand daily vehicle turning and heavy loads.',
    benefits: [
      'Rated for heavy truck and SUV vehicular traffic',
      'No standing water or unsightly puddle formation',
      'Crisp aluminum or heavy-duty concrete edge restraints'
    ],
    specs: ['10-12" Vehicular Base', 'Sub-Base Geotextile Grid', 'High-Load Interlock'],
    imageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
    iconName: 'MapPin'
  },
  {
    id: 'grading-drainage',
    title: 'Site Grading & French Drainage Systems',
    tagline: 'Tidewater Virginia water management engineered to protect your foundation.',
    description: 'Coastal Virginia flat topography and high clay content require expert water mitigation. We install laser-graded slope corrections, catch basins, downspout bury lines, and dry wells.',
    benefits: [
      'Eliminates standing water in lawns and under crawlspaces',
      'Discharges stormwater cleanly away from foundations and hardscapes',
      'Laser-level precision grading prevents pooling before hardscape installation'
    ],
    specs: ['Solid & Perforated PVC', 'Clean #57 Washed Gravel', 'Non-Woven Geotextile Sock'],
    imageUrl: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80',
    iconName: 'Droplets'
  },
  {
    id: 'outdoor-living-fire',
    title: 'Fire Pits, Lighting & Outdoor Kitchens',
    tagline: 'Complete backyard sanctuaries crafted for year-round Virginia evenings.',
    description: 'Custom wood-burning and gas fire pits, built-in BBQ islands, bar counters, and low-voltage architectural LED lighting for steps, walls, and specimen trees.',
    benefits: [
      'Low-voltage brass & copper LED fixtures with smart timers',
      'Commercial-grade stainless steel kitchen inserts and granite counters',
      'Heavy-duty fire-brick lined fire features'
    ],
    specs: ['Firebrick Interior', 'Low Voltage 12V LED', 'Marine-Grade Stainless'],
    imageUrl: 'https://images.unsplash.com/photo-1544984243-ec57ea16fe25?auto=format&fit=crop&w=800&q=80',
    iconName: 'Sun'
  }
];

export const CRAFTSMANSHIP_STEPS = [
  {
    step: '01',
    title: 'Laser Grading & Deep Subgrade Excavation',
    description: 'We excavate 8" to 12" below finish grade, removing all organic matter and establishing a mandatory 1-2% pitch away from home foundations.'
  },
  {
    step: '02',
    title: 'Industrial Heavy-Duty Geotextile Fabric',
    description: 'We install commercial non-woven geotextile membrane to physically isolate the native clay subgrade from your stone aggregate, stopping base sinking forever.'
  },
  {
    step: '03',
    title: 'Multi-Lift Mechanical Base Compaction',
    description: 'We install high-compaction #21A or open-grade #57 crushed stone in 2-3" lifts, compacted with 5,000+ lb force vibratory plate compactors to 98% Proctor density.'
  },
  {
    step: '04',
    title: 'Continuous Heavy-Duty Edge Restraints',
    description: 'Concrete toe bounds or structural spiked edging are fastened every 12 inches to guarantee pavers and Vuba surfacing will never shift laterally under tire or foot traffic.'
  },
  {
    step: '05',
    title: 'Hand-Troweled Vuba Resin or Precision Paver Interlock',
    description: 'Surfaces are screeded to laser-tight tolerances. Vuba stone is mixed with dual-component polyurethane and hand-troweled for a seamless, mirror-smooth finish.'
  },
  {
    step: '06',
    title: 'Polymeric Sand Lock & Sealant / Anti-Slip Glass',
    description: 'Joints are locked with moisture-activated polymeric sand that repels weeds and ants. Vuba surfaces receive an optional slip-resistant microscopic bead coating.'
  }
];

export const SECONDARY_SERVICES: SecondaryService[] = [
  {
    id: 'lawn-maintenance',
    title: 'Routine Turf Maintenance & Mowing',
    description: 'Scheduled precision mowing, weed-eating, string trimming, and clean-line hard edge blowing for residential estates and commercial grounds.',
    frequency: 'Weekly or Bi-Weekly Plans',
    idealFor: 'Gloucester & Mathews Homeowners',
    iconName: 'Sparkles',
    badge: 'Seasonal Contract'
  },
  {
    id: 'mulching-edging',
    title: 'Premium Hardwood Mulching & Trench Edging',
    description: 'Deep mechanical spade trench edging, weed barrier prep, and installation of double-shredded dark brown, black, or natural cedar mulch.',
    frequency: 'Spring / Fall Refresh',
    idealFor: 'Ornamental Beds & Foundation Lines',
    iconName: 'Droplets',
    badge: 'Curb Appeal Boost'
  },
  {
    id: 'pruning-sculpting',
    title: 'Hedge Sculpting & Ornamental Shrub Pruning',
    description: 'Horticultural pruning to enhance plant vitality, directional growth shaping, deadwood removal, and tidy hedge lines.',
    frequency: 'Spring, Mid-Summer, Autumn',
    idealFor: 'Boxwoods, Crepe Myrtles, Hydrangeas',
    iconName: 'CheckCircle2'
  },
  {
    id: 'cleanups-aeration',
    title: 'Seasonal Cleanups & Core Aeration',
    description: 'Fall leaf vacuuming, spring bed debris removal, core plug aeration, and broadcast overseeding with premium Tidewater Virginia fescue blends.',
    frequency: 'Seasonal (Spring & Fall)',
    idealFor: 'Reviving Thin, Compacted Turf',
    iconName: 'Clock'
  },
  {
    id: 'pressure-washing',
    title: 'Driveway, Siding & Hardscape Soft Washing',
    description: 'Low-pressure detergent soft washing and high-flow surface scrubbing to eliminate mold, algae, lichen, and red Virginia clay staining safely.',
    frequency: 'Annual or As-Needed',
    idealFor: 'Pavers, Concrete, Vinyl Siding & Decks',
    iconName: 'Droplets',
    badge: 'Surface Restoration'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    author: 'Mark & Sarah Thornton',
    location: 'Ware Neck, Gloucester County, VA',
    projectType: 'Vuba Stone Driveway & Front Walkway',
    rating: 5,
    date: '3 weeks ago',
    featuredHighlight: 'No more standing water or muddy tire tracks after heavy coastal rains!',
    review: 'TB Custom Landscaping completely transformed our home entrance. We had an asphalt driveway that looked awful and held giant puddles whenever it rained. The Vuba Stone in Gloucester Slate is nothing short of incredible—water drains right through it instantly, and neighbors stop on their walks every day to ask what material it is. True craftsmen from start to finish.',
    verified: true
  },
  {
    id: '2',
    author: 'David R. Hendricks',
    location: 'Yorktown Battlefield Estates, VA',
    projectType: '1,100 Sq.Ft. Paver Patio & Built-In Fire Pit',
    rating: 5,
    date: '1 month ago',
    featuredHighlight: 'Their base preparation is on another level compared to other contractors.',
    review: 'I am a retired structural engineer and watched their crew every day. Their attention to compaction, laser slope lines, and edge restraints exceeded my standards. They integrated a beautiful seating wall and gas fire pit that has become our favorite spot in the house. Great communication via their Jobber system with transparent quotes and milestone updates.',
    verified: true
  },
  {
    id: '3',
    author: 'Elena & Craig Vance',
    location: 'Mathews County (Piankatank Riverfront), VA',
    projectType: 'Resin-Bound Pool Surround & Retaining Wall',
    rating: 5,
    date: '2 months ago',
    featuredHighlight: 'The Rivah Oyster blend stays comfortable on bare feet even in 95-degree heat.',
    review: 'Our waterfront pool deck was flaking and blistering hot in summer. TB Custom Landscaping resurfaced the whole deck with Vuba Stone resin. It is barefoot-safe, has zero loose stones, and doesn’t get slippery when wet. If you want high-end craftsmanship in the Middle Peninsula, call TB.',
    verified: true
  },
  {
    id: '4',
    author: 'Greg & Lisa Miller',
    location: 'Williamsburg / Kingsmill, VA',
    projectType: 'Tiered Retaining Wall & French Drainage System',
    rating: 5,
    date: '3 months ago',
    featuredHighlight: 'Solved our 5-year water intrusion and yard erosion headache permanently.',
    review: 'Every heavy downpour used to wash clay mud toward our basement walkout. TB engineered a dual retaining wall and buried PVC French drain network that handled last month’s torrential storms without a drop of pooling. Exceptional work ethic and clean job site every evening.',
    verified: true
  }
];

export const SERVICE_AREAS: ServiceArea[] = [
  {
    name: 'Gloucester County',
    county: 'Primary Hub (Gloucester Courthouse, Hayes, Ordinary, Ware Neck, Achilles, Bena, Wicomico)',
    radiusNote: 'Immediate dispatch & same-week free site consultations',
    highlight: 'Home Base'
  },
  {
    name: 'Mathews County',
    county: 'Mathews, Gwynn’s Island, Bavon, Cobbs Creek, Hudgins',
    radiusNote: 'Full hardscaping, waterfront retaining walls & Vuba Stone surfacing',
    highlight: 'Waterfront Specialists'
  },
  {
    name: 'Yorktown & York County',
    county: 'Yorktown, Grafton, Tabb, Seaford, Dare',
    radiusNote: 'Serving Historic Yorktown & surrounding subdivisions',
    highlight: 'Daily Service'
  },
  {
    name: 'Williamsburg & James City',
    county: 'Williamsburg, Kingsmill, Ford’s Colony, Toano',
    radiusNote: 'Estate hardscaping, custom paver terraces & luxury driveways',
    highlight: 'Luxury Estates'
  },
  {
    name: 'Newport News & Poquoson',
    county: 'Denbigh, Kiln Creek, Poquoson waterfront',
    radiusNote: 'Permeable resin driveways, patio installations & French drainage',
    highlight: 'Rapid Response'
  }
];

export const FAQS: FaqItem[] = [
  {
    category: 'Vuba Stone',
    question: 'What is Vuba Stone resin-bound surfacing and how does it work?',
    answer: 'Vuba Stone is an engineered surfacing solution where 100% natural, kiln-dried marble and quartz aggregates are coated with an ultra-strong, two-part UV-stable aliphatic polyurethane resin. The mixture is hand-troweled onto a prepared base (or existing concrete) to form a seamless, decorative, and 100% water-permeable surface with no loose gravel.'
  },
  {
    category: 'Vuba Stone',
    question: 'How does Virginia weather, temperature, and humidity affect resin curing time?',
    answer: 'Resin-bound polyurethane cures via exothermic cross-linking governed by ambient and surface temperatures. In optimal conditions (60°F–80°F), light foot traffic is safe in 12–16 hours and vehicles in 24–48 hours. In hot summer weather (>85°F), cure time accelerates to 4–6 hours (we pour at dawn with shade canopies). In cooler weather (45°F–60°F), we dose with manufacturer-approved catalyst accelerators to maintain reliable cure times. Installations are paused if temperatures drop below 40°F.'
  },
  {
    category: 'Vuba Stone',
    question: 'What happens if it rains unexpectedly while or right after resin is poured?',
    answer: 'Uncured polyurethane is vulnerable to liquid moisture during the first 3–5 hours before initial gelation. If exposed to rain before set, the resin can foam or turn milky. TB Custom continuously monitors live Doppler radar and guarantees zero-risk weather rescheduling. If sudden pop-up coastal rain develops, our crew deploys heavy-duty pole-elevated rain canopies. Once cured (after 12–24 hours), the surface becomes 100% water-permeable and immune to rain.'
  },
  {
    category: 'Vuba Stone',
    question: 'Will Vuba Stone crack during Virginia winter freeze/thaw cycles?',
    answer: 'No. Unlike rigid concrete or brittle asphalt, resin-bound stone possesses inherent tensile flexibility. Because it is porous, water passes straight through into the base rather than trapping beneath the surface, eliminating the hydraulic pressure that causes frost heave and surface spalling.'
  },
  {
    category: 'Vuba Stone',
    question: 'Can Vuba Stone be installed over my old concrete or asphalt?',
    answer: 'Yes! If your existing concrete or asphalt foundation is structurally sound without major subsidence, we can patch hairline flaws, prime the surface, and install an 18mm Vuba Stone overlay directly on top. If a completely new installation is required, we construct an open-graded permeable VubaMac stone base.'
  },
  {
    category: 'Hardscaping',
    question: 'Why is base preparation the most important part of a paver patio or driveway?',
    answer: '90% of paver failures (sinking, rutting, and shifting) happen due to poor base depth and inadequate compaction. In coastal Virginia clay soils, we excavate 8–12 inches, line the trench with commercial geotextile fabric, and mechanically compact angular crushed stone in strict 2-inch lifts to ensure your patio never settles.'
  },
  {
    category: 'Process & Pricing',
    question: 'How do I request a quote and how does Jobber integration work?',
    answer: 'You can submit our quick quote form or click the "Jobber Request" button. Your project details, photos, and address immediately feed into our Jobber client management system. We contact you within 24 business hours to schedule an on-site consultation and provide a detailed, itemized estimate with 3D project visualizations.'
  },
  {
    category: 'Vuba Stone',
    question: 'Does Vuba Stone permeable paving comply with Chesapeake Bay Preservation Act (CBPA) impervious surface limits in Tidewater VA?',
    answer: 'Yes. In waterfront buffer and Resource Protection Areas (RPAs) throughout Gloucester County, Mathews, and Tidewater Virginia, local zoning often strictly caps impervious ground cover. Because Vuba Stone installed over an open-graded aggregate base provides an infiltration rate exceeding 850 gallons/hour per square yard, it qualifies as 100% permeable surfacing, helping homeowners secure county zoning approvals while preventing polluted runoff into Chesapeake Bay tributaries.'
  },
  {
    category: 'Process & Pricing',
    question: 'What is the typical cost per square foot for Vuba Stone resin vs pavers in Gloucester County, VA?',
    answer: 'A certified Vuba Stone overlay installed over an existing sound concrete or asphalt base typically ranges from $12 to $19 per square foot. Full new installations with deep excavation, geotextile sub-base, and open-graded permeable stone base typically range from $22 to $34 per square foot. This is comparable to high-end interlocking pavers while providing superior tensile flexibility, zero weed penetration, and a 15-year certified manufacturer warranty.'
  },
  {
    category: 'Hardscaping',
    question: 'Which areas in Tidewater and Coastal Virginia do you service for hardscaping and Vuba Stone?',
    answer: 'TB Custom Landscaping is based in Gloucester, VA and provides daily service across Gloucester County (Gloucester Courthouse, Hayes, Ordinary, Ware Neck, Achilles, Bena), Mathews County, Historic Yorktown, Williamsburg, James City County, and Newport News / Poquoson.'
  },
  {
    category: 'Maintenance',
    question: 'How do you clean and maintain resin-bound stone and paver surfaces?',
    answer: 'Resin-bound surfaces are exceptionally low maintenance. Regular blowing of leaves and an occasional light power wash (under 1,500 PSI) keeps the surface looking brand new. Because the stones are fully encapsulated in polyurethane resin, weeds cannot root inside the matrix.'
  }
];

export const VUBA_VS_TRADITIONAL_COMPARISON = [
  {
    feature: 'Water Permeability & Drainage',
    vuba: '100% Permeable (850+ gal/hr/sq.yd) — Zero Puddles',
    concrete: '0% Impermeable — Creates runoff & pooling',
    asphalt: '0% Impermeable — Degrades under standing water',
    looseGravel: 'Permeable but scatters & creates ruts'
  },
  {
    feature: 'Freeze / Thaw Flexibility',
    vuba: 'High Tensile Flex — Resists cracking completely',
    concrete: 'Rigid & brittle — Cracks easily with soil shifts',
    asphalt: 'Softens in summer heat, cracks in winter',
    looseGravel: 'Shifts constantly under tire torque'
  },
  {
    feature: 'UV Stability & Color Fastness',
    vuba: '100% Aliphatic Resin — Never yellows or fades',
    concrete: 'Stains from oil, leaves, and red clay',
    asphalt: 'Oxidizes from black to faded gray',
    looseGravel: 'Dusty and loses color over time'
  },
  {
    feature: 'Maintenance & Weeds',
    vuba: 'No loose stone, weed-resistant, quick spray clean',
    concrete: 'Requires joint sealing, cracks collect dirt',
    asphalt: 'Requires messy resealing every 2-3 years',
    looseGravel: 'Constant raking, weeding & gravel replenishment'
  },
  {
    feature: 'Barefoot & Slip Safety',
    vuba: 'Smooth hand-troweled aggregate with micro-grip glass',
    concrete: 'Can become slick when wet; hot in summer',
    asphalt: 'Extremely hot and sticky in Virginia summer sun',
    looseGravel: 'Painful to walk on barefoot'
  }
];
