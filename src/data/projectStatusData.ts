export interface ProjectStage {
  stageNumber: number;
  name: string;
  description: string;
  status: 'completed' | 'current' | 'upcoming';
  dateCompleted?: string;
  targetDate?: string;
  signoffNotes?: string;
}

export interface FieldLogEntry {
  id: string;
  timestamp: string;
  author: string;
  role: string;
  message: string;
  weatherSnapshot?: {
    temp: string;
    humidity: string;
    conditions: string;
    substrateMoisture?: string;
  };
  photoUrl?: string;
  photoCaption?: string;
}

export interface ProjectPhoto {
  id: string;
  phase: 'Before Site Prep' | 'Excavation & Sub-Base' | 'Active Installation' | 'Finishing & Curing' | 'Completed';
  title: string;
  timestamp: string;
  caption: string;
  imageUrl: string;
  tags: string[];
  isHighlight?: boolean;
}

export interface ClientProject {
  referenceNumber: string; // e.g. "TB-8421"
  clientName: string;
  propertyAddress: string;
  projectTitle: string;
  serviceType: 'Certified Vuba Stone™' | 'Paver Patio & Outdoor Living' | 'Terraced Retaining Wall' | 'Permeable Driveway';
  status: 'Site Excavation' | 'Base Compaction' | 'Resin Application' | 'Final Inspection' | 'Completed & Handed Over';
  statusCode: 'planning' | 'in-progress' | 'curing' | 'final-walkthrough' | 'completed';
  progressPercent: number;
  startDate: string;
  estimatedCompletion: string;
  squareFootage: number;
  foreman: {
    name: string;
    title: string;
    phone: string;
    email: string;
  };
  materialsSummary: {
    primaryBlend: string;
    grainOrSize: string;
    baseFoundation: string;
    edgingDetail: string;
  };
  weatherCuringAdvisory: {
    status: 'Optimal' | 'Watching Moisture' | 'Curing Secured' | 'Complete';
    ambientTemp: string;
    relativeHumidity: string;
    dewPointSpread: string;
    foremanAdvisory: string;
  };
  stages: ProjectStage[];
  fieldLogs: FieldLogEntry[];
  photos: ProjectPhoto[];
  documents: {
    title: string;
    type: string;
    date: string;
    size: string;
  }[];
}

export const SAMPLE_PROJECTS: Record<string, ClientProject> = {
  'TB-8421': {
    referenceNumber: 'TB-8421',
    clientName: 'The Miller Residence',
    propertyAddress: 'Gloucester Point / York River Waterfront, VA 23062',
    projectTitle: 'Certified Vuba Stone™ Permeable Pool Deck & Outdoor Lanai',
    serviceType: 'Certified Vuba Stone™',
    status: 'Resin Application',
    statusCode: 'in-progress',
    progressPercent: 78,
    startDate: 'September 28, 2026',
    estimatedCompletion: 'October 8, 2026',
    squareFootage: 1450,
    foreman: {
      name: 'Travis B.',
      title: 'Founder & Certified Vuba Master Installer',
      phone: '(804) 815-1815',
      email: 'travis@tbcustomlandscaping.com'
    },
    materialsSummary: {
      primaryBlend: 'Rivah Oyster Blend (Natural Cream Marble & Tumbled Quartz)',
      grainOrSize: '3mm - 6mm kiln-dried angular aggregates',
      baseFoundation: 'Class A Concrete Slab Primer & Vuba Elastic Crack Isolation Membrane',
      edgingDetail: 'Charcoal Anodized Marine-Grade Aluminum Bullnose Edge Trims'
    },
    weatherCuringAdvisory: {
      status: 'Optimal',
      ambientTemp: '68°F',
      relativeHumidity: '48%',
      dewPointSpread: '+16°F above dew point',
      foremanAdvisory: 'Ideal coastal curing window. Substrate surface temperature is 72°F. Zero rain risk within the next 48 hours.'
    },
    stages: [
      {
        stageNumber: 1,
        name: 'Site Survey, Laser Elevation & Concrete Preparation',
        description: 'Diamond cup wheel grinding of existing concrete pool deck, expansion joint cleanout, crack repair, and moisture vapor barrier priming.',
        status: 'completed',
        dateCompleted: 'Sep 29, 2026',
        signoffNotes: 'Surface tensile pull test passed at 2.4 MPa. Moisture barrier coat cured tack-free with zero pinholing.'
      },
      {
        stageNumber: 2,
        name: 'Perimeter Edging & Drainage Channel Integration',
        description: 'Installation of high-profile aluminum perimeter edge trims and invisible trench drain transitions flush with coping line.',
        status: 'completed',
        dateCompleted: 'Oct 1, 2026',
        signoffNotes: 'All transitions mechanically anchored with 316 stainless steel fasteners at 12" centers.'
      },
      {
        stageNumber: 3,
        name: 'Vuba Stone Hand-Troweled Matrix Application',
        description: 'Forced action pan-mixing of 100% UV-stable aliphatic polyurethane resin with Rivah Oyster kiln-dried aggregate, hand-screeding and troweling to 18mm thickness.',
        status: 'current',
        targetDate: 'Oct 4, 2026',
        signoffNotes: 'Sections A & B hand-troweled and compacted. Section C around deep-end coping underway today with anti-slip micro-glass scatter.'
      },
      {
        stageNumber: 4,
        name: 'Curing Watch, Anti-Slip Verification & Final Walkthrough',
        description: 'Controlled cure period (24 hours foot traffic, 72 hours full load), surface friction testing, edge detailing, and homeowner handover packet.',
        status: 'upcoming',
        targetDate: 'Oct 7, 2026',
        signoffNotes: 'Scheduled client walkthrough with Travis to review 15-year warranty certificate and care kit.'
      }
    ],
    fieldLogs: [
      {
        id: 'log-8421-4',
        timestamp: 'Today at 9:45 AM',
        author: 'Travis B.',
        role: 'Field Supervisor',
        message: 'On site with forced-action mixer. Morning substrate moisture tested at 2.4% (well below the 4.0% maximum threshold). We have completed 600 sq ft of the shallow-end pool surround in Rivah Oyster blend. Micro-glass beads broadcast uniformly for slip resistance.',
        weatherSnapshot: {
          temp: '68°F',
          humidity: '48%',
          conditions: 'Partly Sunny / Crisp Coastal Breeze',
          substrateMoisture: '2.4% (Dry & Safe)'
        },
        photoUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80',
        photoCaption: 'Troweled Section A showing seamless resin-bound bond against the pool border.'
      },
      {
        id: 'log-8421-3',
        timestamp: 'Yesterday at 3:15 PM',
        author: 'Marcus V.',
        role: 'Lead Trowel Specialist',
        message: 'Completed perimeter aluminum edging installation around curved pool perimeter. Sealed expansion relief transitions and prepared pan-mixer station.',
        weatherSnapshot: {
          temp: '72°F',
          humidity: '52%',
          conditions: 'Clear Skies',
          substrateMoisture: '2.6%'
        }
      },
      {
        id: 'log-8421-2',
        timestamp: 'Oct 1, 2026 at 4:30 PM',
        author: 'Travis B.',
        role: 'Field Supervisor',
        message: 'Diamond grinding on old concrete complete. Eliminated all spalled layers and surface contaminants. Applied polyurethane penetrating bonding primer.',
        photoUrl: 'https://images.unsplash.com/photo-1544984243-ec57ea16fe25?auto=format&fit=crop&w=1000&q=80',
        photoCaption: 'Base concrete prepped and ground with diamond grinders.'
      },
      {
        id: 'log-8421-1',
        timestamp: 'Sep 28, 2026 at 8:00 AM',
        author: 'Travis B.',
        role: 'Field Supervisor',
        message: 'Job mobilization, staging materials, setting up dust containment, and reviewing elevation benchmarks with Mr. Miller.',
        weatherSnapshot: {
          temp: '65°F',
          humidity: '60%',
          conditions: 'Overcast'
        }
      }
    ],
    photos: [
      {
        id: 'photo-8421-1',
        phase: 'Active Installation',
        title: 'Shallow-End Surfacing Complete',
        timestamp: 'Oct 4, 2026 • 9:30 AM',
        caption: 'Hand-troweled Rivah Oyster resin-bound aggregate meeting flush with pool coping. Zero puddling permeability verified.',
        imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
        tags: ['Resin Matrix', 'Hand Troweled', 'Pool Deck'],
        isHighlight: true
      },
      {
        id: 'photo-8421-2',
        phase: 'Excavation & Sub-Base',
        title: 'Edge Profile & Expansion Trim Alignment',
        timestamp: 'Oct 2, 2026 • 2:15 PM',
        caption: 'Anodized aluminum edge profiles anchored along the landscape bed border to guarantee a clean, crisp transition.',
        imageUrl: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80',
        tags: ['Edge Restraints', 'Expansion Joint', 'Base Prep']
      },
      {
        id: 'photo-8421-3',
        phase: 'Excavation & Sub-Base',
        title: 'Concrete Substrate Diamond Abrasion',
        timestamp: 'Sep 30, 2026 • 11:00 AM',
        caption: 'Industrial dustless planetary grinding open the pores of the 20-year concrete foundation for maximum chemical adhesion.',
        imageUrl: 'https://images.unsplash.com/photo-1544984243-ec57ea16fe25?auto=format&fit=crop&w=1200&q=80',
        tags: ['Diamond Grinding', 'Surface Prep', 'Dustless']
      },
      {
        id: 'photo-8421-4',
        phase: 'Before Site Prep',
        title: 'Original Flaking & Cracked Concrete',
        timestamp: 'Sep 28, 2026 • 8:15 AM',
        caption: 'Existing pool deck prior to demolition and surface restoration. Cracking along stress joints and hot barefoot surface.',
        imageUrl: 'https://images.unsplash.com/photo-1584463699026-60802c03cb47?auto=format&fit=crop&w=1200&q=80',
        tags: ['Before Condition', 'Site Survey', 'Initial State']
      }
    ],
    documents: [
      {
        title: 'Approved Vuba Stone Architectural Proposal',
        type: 'PDF Document',
        date: 'Sep 22, 2026',
        size: '1.8 MB'
      },
      {
        title: 'Gloucester County Permit & Utility Miss Utility Ticket',
        type: 'Permit Verification',
        date: 'Sep 25, 2026',
        size: '840 KB'
      },
      {
        title: 'Vuba 15-Year Manufacturer Warranty Registration (Draft)',
        type: 'Warranty Certificate',
        date: 'Oct 3, 2026',
        size: '450 KB'
      }
    ]
  },

  'TB-9104': {
    referenceNumber: 'TB-9104',
    clientName: 'Drs. Marcus & Elena Vance',
    propertyAddress: 'Battlefield Historic District, Yorktown, VA 23690',
    projectTitle: 'Belgard Mega-Arbel 3-Tier Paver Patio, Natural Stone Fire Pit & Low-Voltage Lighting',
    serviceType: 'Paver Patio & Outdoor Living',
    status: 'Final Inspection',
    statusCode: 'final-walkthrough',
    progressPercent: 94,
    startDate: 'September 20, 2026',
    estimatedCompletion: 'October 5, 2026',
    squareFootage: 1200,
    foreman: {
      name: 'Marcus V.',
      title: 'Senior Hardscape Foreman & ICPI Specialist',
      phone: '(804) 815-1815',
      email: 'marcus@tbcustomlandscaping.com'
    },
    materialsSummary: {
      primaryBlend: 'Belgard Mega-Arbel Textured Slabs (Tuscan Earth Blend)',
      grainOrSize: '80mm heavy-duty vehicular/patio thickness',
      baseFoundation: '8" Open-Graded #57 Granite Base over 6oz Woven Geotextile Fabric',
      edgingDetail: 'PermaEdge Concrete Engineered Edge Restraint & Natural Granite Fire Pit Coping'
    },
    weatherCuringAdvisory: {
      status: 'Curing Secured',
      ambientTemp: '66°F',
      relativeHumidity: '50%',
      dewPointSpread: '+14°F',
      foremanAdvisory: 'Polymeric joint sand has completed its 24-hour hydration lock. Completely safe for furniture placement and light entertaining.'
    },
    stages: [
      {
        stageNumber: 1,
        name: 'Laser Survey, Utility Markout & Foundation Excavation',
        description: 'Excavation of 1,400 sq ft footprint to 10" depth, ensuring 1.5% positive slope away from home foundation wall.',
        status: 'completed',
        dateCompleted: 'Sep 22, 2026',
        signoffNotes: 'Subgrade compacted to 98% Standard Proctor density with 1,000-lb plate compactor.'
      },
      {
        stageNumber: 2,
        name: 'Open-Graded Aggregate Base & Geo-Textile Membrane',
        description: 'Laying 6oz commercial filtration fabric and 8" #57 crushed blue granite in 3" compacted lifts.',
        status: 'completed',
        dateCompleted: 'Sep 25, 2026',
        signoffNotes: 'Nuclear density gauge verified optimal compaction. Zero deflection under loaded tandem dump.'
      },
      {
        stageNumber: 3,
        name: 'Belgard Paver Laying, Fire Pit Construction & Sitting Walls',
        description: 'Hand-laying natural flagstone-look slabs, constructing dual curved sitting walls, and gas fire pit masonry.',
        status: 'completed',
        dateCompleted: 'Oct 2, 2026',
        signoffNotes: 'Joint lines inspected for alignment. Integrated 8 warm-white LED hardscape riser fixtures.'
      },
      {
        stageNumber: 4,
        name: 'G2 Polymeric Sand Infiltration & Final Detail Clean',
        description: 'Dual-pass plate compaction with rubber protective pad, mechanical sand sweeping, mist activation, and perimeter grading.',
        status: 'current',
        targetDate: 'Oct 5, 2026',
        signoffNotes: 'Final punchlist walkthrough scheduled for Monday afternoon at 2:00 PM.'
      }
    ],
    fieldLogs: [
      {
        id: 'log-9104-3',
        timestamp: 'Yesterday at 4:00 PM',
        author: 'Marcus V.',
        role: 'Foreman',
        message: 'Polymeric sand sweep and mist activation complete. Integrated low-voltage LED transformer tested; warm 2700K ambient illumination on steps and sitting wall bench is functioning flawlessly.',
        photoUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1000&q=80',
        photoCaption: 'Final paver layout with natural gas stone fire pit and warm low-voltage LED wall lighting.'
      },
      {
        id: 'log-9104-2',
        timestamp: 'Sep 27, 2026 at 1:30 PM',
        author: 'Travis B.',
        role: 'Supervisor',
        message: 'Stone mason built fire pit inner firebrick core. Gas lines pressure-tested to 50 PSI with zero drops.',
        photoUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1000&q=80',
        photoCaption: 'Fire pit masonry and radial paver cuts around seating area.'
      },
      {
        id: 'log-9104-1',
        timestamp: 'Sep 21, 2026 at 9:00 AM',
        author: 'Marcus V.',
        role: 'Foreman',
        message: 'Broke ground on Yorktown patio. Excavator operator completed rough grade and slope verification.',
        photoUrl: 'https://images.unsplash.com/photo-1584463699026-60802c03cb47?auto=format&fit=crop&w=1000&q=80',
        photoCaption: 'Subgrade excavation down to virgin clay with positive pitch.'
      }
    ],
    photos: [
      {
        id: 'photo-9104-1',
        phase: 'Finishing & Curing',
        title: 'Completed Paver Terrace & Fire Pit Glow',
        timestamp: 'Oct 3, 2026 • 7:15 PM',
        caption: 'Nighttime illumination test. Low-voltage brass LED fixtures cast gentle grazing light across textured Belgard paver faces.',
        imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
        tags: ['Belgard Paver', 'Fire Pit', 'LED Lighting'],
        isHighlight: true
      },
      {
        id: 'photo-9104-2',
        phase: 'Active Installation',
        title: 'Precision Scribe Cuts Around Gas Burner',
        timestamp: 'Sep 30, 2026 • 3:30 PM',
        caption: 'Radial diamond wet saw cuts around circular fire pit coping to eliminate unsightly wide mortar gaps.',
        imageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
        tags: ['Masonry', 'Fire Pit', 'Custom Cut']
      },
      {
        id: 'photo-9104-3',
        phase: 'Before Site Prep',
        title: 'Slope Runoff & Muddy Lawn Before Work',
        timestamp: 'Sep 20, 2026 • 10:00 AM',
        caption: 'Steep grade in backyard directing rainwater toward the sunroom foundation.',
        imageUrl: 'https://images.unsplash.com/photo-1584463699026-60802c03cb47?auto=format&fit=crop&w=1200&q=80',
        tags: ['Before Condition', 'Severe Slope', 'Initial Inspection']
      }
    ],
    documents: [
      {
        title: 'ICPI Base Compaction Certification Signoff',
        type: 'Engineering Report',
        date: 'Sep 26, 2026',
        size: '1.2 MB'
      },
      {
        title: 'Low-Voltage Lighting Plan & Transformer Schematics',
        type: 'Electrical Diagram',
        date: 'Sep 23, 2026',
        size: '950 KB'
      }
    ]
  },

  'TB-7732': {
    referenceNumber: 'TB-7732',
    clientName: 'Harrison Family Waterfront Estate',
    propertyAddress: 'Ware Neck / Mobjack Bay, Gloucester County, VA 23072',
    projectTitle: 'Terraced Fieldstone Retaining Walls & Engineered French Drainage System',
    serviceType: 'Terraced Retaining Wall',
    status: 'Base Compaction',
    statusCode: 'in-progress',
    progressPercent: 38,
    startDate: 'October 1, 2026',
    estimatedCompletion: 'October 16, 2026',
    squareFootage: 850,
    foreman: {
      name: 'Travis B.',
      title: 'Founder & Hardscaping Director',
      phone: '(804) 815-1815',
      email: 'travis@tbcustomlandscaping.com'
    },
    materialsSummary: {
      primaryBlend: 'Virginia Natural Blue Ridge Fieldstone & Keystone Structural Blocks',
      grainOrSize: '8" x 18" heavy-duty split-face modular units',
      baseFoundation: '12" Compacted 21A Crushed Aggregate Trench with Geogrid Tie-Backs',
      edgingDetail: 'Perforated 4" Schedule 40 PVC French Drain with Sock & #57 Clean Gravel Wrap'
    },
    weatherCuringAdvisory: {
      status: 'Optimal',
      ambientTemp: '69°F',
      relativeHumidity: '55%',
      dewPointSpread: '+15°F',
      foremanAdvisory: 'Sub-base soil compaction complete. Weather conditions dry and stable for structural wall block stacking.'
    },
    stages: [
      {
        stageNumber: 1,
        name: 'Site Clearing, Topsoil Segregation & Trench Excavation',
        description: 'Clearing shoreline slope vegetation, trenching 24" deep footing, and installing dual catch basins.',
        status: 'completed',
        dateCompleted: 'Oct 2, 2026',
        signoffNotes: 'All organic materials removed down to solid Tidewater clay strata.'
      },
      {
        stageNumber: 2,
        name: 'Structural Leveling Pad & Geo-grid Anchors',
        description: 'Laser-level compaction of base aggregate, setting first course 6" below finished grade for hydrostatic resistance.',
        status: 'current',
        targetDate: 'Oct 6, 2026',
        signoffNotes: 'First course 100% level along 95-foot wall perimeter. Drainage gravel backfill started.'
      },
      {
        stageNumber: 3,
        name: 'Modular Wall Erection & Geogrid Reinforcement Lifts',
        description: 'Stacking block courses with pins, backfilling #57 clean stone, and rolling Miragrid geogrid every 16 vertical inches.',
        status: 'upcoming',
        targetDate: 'Oct 11, 2026',
        signoffNotes: 'Scheduled to begin Wednesday morning.'
      },
      {
        stageNumber: 4,
        name: 'Cap Stone Adhesive Lock, Hydroseed Turf Repair & Cleanup',
        description: 'Polyurethane masonry adhesive on architectural coping caps, restoring disturbed lawn with custom sun/shade hydroseed blend.',
        status: 'upcoming',
        targetDate: 'Oct 16, 2026',
        signoffNotes: 'Final site grading and hydroseed application.'
      }
    ],
    fieldLogs: [
      {
        id: 'log-7732-2',
        timestamp: 'Today at 8:15 AM',
        author: 'Travis B.',
        role: 'Supervisor',
        message: 'Delivery of 18 pallets of Keystone structural blocks received at the Ware Neck driveway. Laser elevation verified across the 95-foot shoreline run. Began installing first buried base course with torpedo levels.',
        weatherSnapshot: {
          temp: '64°F',
          humidity: '56%',
          conditions: 'Crisp & Clear'
        },
        photoUrl: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1000&q=80',
        photoCaption: 'Excavated footing trench with laser elevation rod checking subgrade depth.'
      },
      {
        id: 'log-7732-1',
        timestamp: 'Oct 1, 2026 at 9:30 AM',
        author: 'Marcus V.',
        role: 'Foreman',
        message: 'Excavated 12 yards of eroded shoreline soil. Installed geotextile underlayment and perforated dual French drain system connecting to lower bay outlet.',
        photoUrl: 'https://images.unsplash.com/photo-1584463699026-60802c03cb47?auto=format&fit=crop&w=1000&q=80',
        photoCaption: 'Drainage pipe installation and drainage gravel envelope.'
      }
    ],
    photos: [
      {
        id: 'photo-7732-1',
        phase: 'Excavation & Sub-Base',
        title: 'Drainage Trench & Footing Laser Leveling',
        timestamp: 'Oct 3, 2026 • 11:30 AM',
        caption: 'Setting buried foundation course block on laser-calibrated crushed granite footing to prevent future settlement.',
        imageUrl: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80',
        tags: ['Retaining Wall', 'Drainage Trench', 'Laser Level'],
        isHighlight: true
      },
      {
        id: 'photo-7732-2',
        phase: 'Before Site Prep',
        title: 'Severe Shoreline Slope Erosion Prior to Project',
        timestamp: 'Oct 1, 2026 • 8:30 AM',
        caption: 'Storm surges and rainfall caused 3 feet of bank collapse threatening mature oak trees and upper driveway.',
        imageUrl: 'https://images.unsplash.com/photo-1584463699026-60802c03cb47?auto=format&fit=crop&w=1200&q=80',
        tags: ['Before Condition', 'Erosion', 'Bank Collapse']
      }
    ],
    documents: [
      {
        title: 'Gloucester County Soil Erosion & Sediment Control Permit',
        type: 'Environmental Clearance',
        date: 'Sep 28, 2026',
        size: '1.4 MB'
      },
      {
        title: 'Mobjack Bay Shoreline Engineering Specs',
        type: 'Hydrology Analysis',
        date: 'Sep 24, 2026',
        size: '2.1 MB'
      }
    ]
  },

  'TB-6519': {
    referenceNumber: 'TB-6519',
    clientName: 'Captain Robert Sterling',
    propertyAddress: 'Horn Harbor Road, Mathews County, VA 23109',
    projectTitle: 'Permeable Vuba Stone™ Driveway & Cobblestone Apron Transformation',
    serviceType: 'Permeable Driveway',
    status: 'Completed & Handed Over',
    statusCode: 'completed',
    progressPercent: 100,
    startDate: 'September 12, 2026',
    estimatedCompletion: 'September 19, 2026',
    squareFootage: 2150,
    foreman: {
      name: 'Travis B.',
      title: 'Founder & Lead Installer',
      phone: '(804) 815-1815',
      email: 'travis@tbcustomlandscaping.com'
    },
    materialsSummary: {
      primaryBlend: 'Gloucester Slate Matrix (Quartzite, Basalt & Silver Granite)',
      grainOrSize: '3mm - 6mm heavy vehicular aggregate grade',
      baseFoundation: 'Open-Graded VubaMac Permeable Asphalt Sub-base with Geotextile Membrane',
      edgingDetail: 'Charcoal Interlocking Concrete Cobble Border with Concrete Haunching'
    },
    weatherCuringAdvisory: {
      status: 'Complete',
      ambientTemp: '70°F',
      relativeHumidity: '45%',
      dewPointSpread: 'Full cure achieved',
      foremanAdvisory: 'Project is 100% complete and fully cured. Heavy vehicular parking and power-washing cleared under full 15-year warranty.'
    },
    stages: [
      {
        stageNumber: 1,
        name: 'Asphalt Removal, Subgrade Soil Remediation',
        description: 'Saw cutting and recycling 2,150 sq ft of failed alligator asphalt, regrading subgrade with 2% crown for runoff.',
        status: 'completed',
        dateCompleted: 'Sep 13, 2026',
        signoffNotes: 'All fractured asphalt trucked to Gloucester recycling depot.'
      },
      {
        stageNumber: 2,
        name: 'VubaMac Open-Graded Permeable Asphalt Base',
        description: 'Laying 2.5" porous asphalt open-grade foundation allowing 1,000+ gal/hr stormwater percolation directly into water table.',
        status: 'completed',
        dateCompleted: 'Sep 15, 2026',
        signoffNotes: 'Porous base compaction verified with zero surface pooling.'
      },
      {
        stageNumber: 3,
        name: 'Cobblestone Apron & Decorative Retaining Edging',
        description: 'Hand-installing charcoal cobblestone apron at road transition with commercial concrete haunching.',
        status: 'completed',
        dateCompleted: 'Sep 16, 2026',
        signoffNotes: 'Edge haunching cured for 48 hours to secure vehicular turning loads.'
      },
      {
        stageNumber: 4,
        name: 'Vuba Stone 20mm Trowel Application & Homeowner Signoff',
        description: 'Heavy-vehicular 20mm screed and trowel of Gloucester Slate blend with anti-skid broadcast, final walkthrough and warranty packet.',
        status: 'completed',
        dateCompleted: 'Sep 19, 2026',
        signoffNotes: 'Passed final inspection with 5-star customer review. Zero puddling verified during post-install rainfall.'
      }
    ],
    fieldLogs: [
      {
        id: 'log-6519-3',
        timestamp: 'Sep 19, 2026 at 4:30 PM',
        author: 'Travis B.',
        role: 'Founder',
        message: 'Final walkthrough conducted with Captain Sterling. Handed over care kit and 15-year certificate. Water pour test confirmed 100% instant drainage through the stone surface.',
        photoUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80',
        photoCaption: 'Completed Gloucester Slate driveway with crisp dark cobblestone border.'
      },
      {
        id: 'log-6519-2',
        timestamp: 'Sep 17, 2026 at 2:00 PM',
        author: 'Marcus V.',
        role: 'Foreman',
        message: 'Resin screeding and power-troweling in progress across main turnaround apron. Aggregate compaction exceeds 98%.',
        photoUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1000&q=80',
        photoCaption: 'Screeding 20mm Gloucester Slate blend across the wide garage apron.'
      },
      {
        id: 'log-6519-1',
        timestamp: 'Sep 12, 2026 at 8:00 AM',
        author: 'Travis B.',
        role: 'Founder',
        message: 'Old asphalt removed with bobcat. Subsoil inspected for soft spots and backfilled with crushed stone.',
        photoUrl: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1000&q=80',
        photoCaption: 'Original cracked and pitted driveway surface prior to excavation.'
      }
    ],
    photos: [
      {
        id: 'photo-6519-1',
        phase: 'Completed',
        title: 'Finished Permeable Estate Driveway',
        timestamp: 'Sep 19, 2026 • 5:00 PM',
        caption: 'Seamless, modern resin-bound driveway featuring Gloucester Slate aggregate blend and charcoal border.',
        imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
        tags: ['Driveway', 'Gloucester Slate', 'Permeable'],
        isHighlight: true
      },
      {
        id: 'photo-6519-2',
        phase: 'Active Installation',
        title: 'Troweled Aggregate Surface Texture Close-up',
        timestamp: 'Sep 17, 2026 • 11:30 AM',
        caption: 'Precision hand-trowel finish ensuring all stone aggregate facets lock tightly together without loose pebbles.',
        imageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
        tags: ['Texture Close-up', 'Hand Trowel', 'Vuba Stone']
      },
      {
        id: 'photo-6519-3',
        phase: 'Before Site Prep',
        title: 'Cracked Puddled Asphalt Prior to Replacement',
        timestamp: 'Sep 12, 2026 • 7:45 AM',
        caption: 'Old failing driveway with severe frost heave cracking and stagnant water puddling in Mathews County.',
        imageUrl: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80',
        tags: ['Before Condition', 'Failed Asphalt', 'Puddles']
      }
    ],
    documents: [
      {
        title: 'Vuba Stone 15-Year Manufacturer Warranty Certificate #VB-VA-2026-6519',
        type: 'Warranty Certificate',
        date: 'Sep 19, 2026',
        size: '1.6 MB'
      },
      {
        title: 'Care & Seasonal Power Washing Guide for Resin Surfaces',
        type: 'Maintenance Manual',
        date: 'Sep 19, 2026',
        size: '720 KB'
      },
      {
        title: 'Final Paid Invoice & Jobber Receipt',
        type: 'Financial Receipt',
        date: 'Sep 19, 2026',
        size: '340 KB'
      }
    ]
  }
};
