export interface ProjectMilestone {
  title: string;
  status: 'completed' | 'in-progress' | 'upcoming';
  dateCompleted?: string;
  description: string;
}

export interface ProgressPhoto {
  id: string;
  url: string;
  caption: string;
  timestamp: string;
  phase: string;
}

export interface ActiveJob {
  referenceNumber: string;
  clientLastName: string;
  location: string;
  projectType: string;
  startDate: string;
  estimatedCompletion: string;
  overallProgress: number; // 0 - 100
  currentPhase: string;
  leadForeman: string;
  foremanPhone: string;
  siteWeatherStatus: string;
  surfaceSquareFeet: number;
  materialsUsed: string[];
  latestDailyLog: {
    timestamp: string;
    note: string;
    author: string;
  };
  milestones: ProjectMilestone[];
  progressPhotos: ProgressPhoto[];
}

export const SAMPLE_ACTIVE_JOBS: Record<string, ActiveJob> = {
  'TB-2024-8841': {
    referenceNumber: 'TB-2024-8841',
    clientLastName: 'Henderson',
    location: 'Ware Neck, Gloucester County, VA',
    projectType: 'Permeable Vuba Stone™ Driveway & Cobblestone Apron',
    startDate: 'Sep 29, 2024',
    estimatedCompletion: 'Oct 6, 2024',
    overallProgress: 85,
    currentPhase: 'Resin-Bound Hand Troweling & Polymer Curing',
    leadForeman: 'Travis B. (Lead Contractor)',
    foremanPhone: '(804) 555-0192',
    siteWeatherStatus: 'Optimal (68°F, 48% Humidity, 0% Rain Probability)',
    surfaceSquareFeet: 1850,
    materialsUsed: [
      'Gloucester Slate & Basalt Vuba Stone (18mm Overlay)',
      'High-Tensile Aliphatic Two-Part Polyurethane Resin',
      'Antiqued European Cobblestone Perimeter Border',
      'Open-Graded VubaMac Permeable Base Foundation'
    ],
    latestDailyLog: {
      timestamp: 'Today at 1:45 PM',
      note: 'Main 1,850 sq.ft driveway section hand-troweled and leveled to seamless precision. Anti-slip micro-grip glass applied. Curing tent deployed for evening dew protection. Light foot traffic safe by 8:00 AM tomorrow.',
      author: 'Travis B. (Foreman)'
    },
    milestones: [
      {
        title: 'Laser Grading & Sub-Base Excavation',
        status: 'completed',
        dateCompleted: 'Sep 30',
        description: 'Excavated 8 inches of organic soil; laser graded with 1.5% fall for secondary drainage.'
      },
      {
        title: 'Geotextile Grid & VubaMac Base Compaction',
        status: 'completed',
        dateCompleted: 'Oct 1',
        description: 'Installed 200g woven stabilization fabric and compacted open-graded crushed rock to 98% Proctor.'
      },
      {
        title: 'Cobblestone Perimeter Framing & Edge Restraints',
        status: 'completed',
        dateCompleted: 'Oct 2',
        description: 'Concrete-haunched edge restraint with antiqued cobblestones set along roadway apron.'
      },
      {
        title: 'Forced-Action Resin Batching & Hand Trowel',
        status: 'in-progress',
        description: 'Kiln-dried basalt & marble aggregate coated with UV-stable polyurethane and troweled to 18mm.'
      },
      {
        title: 'Final Curing, Site Cleanup & Warranty Sign-Off',
        status: 'upcoming',
        description: '48-hour vehicular cure test, final power sweep, and presentation of 5-year workmanship certificate.'
      }
    ],
    progressPhotos: [
      {
        id: 'p1',
        url: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80',
        caption: 'Hand-troweling the seamless Gloucester Slate Vuba Stone blend',
        timestamp: 'Today, 11:30 AM',
        phase: 'Troweling Phase'
      },
      {
        id: 'p2',
        url: 'https://images.unsplash.com/photo-1584463699026-60802c03cb47?auto=format&fit=crop&w=800&q=80',
        caption: 'Perimeter cobblestone haunching and permeable sub-base compaction',
        timestamp: 'Oct 2, 3:15 PM',
        phase: 'Edge Framing'
      },
      {
        id: 'p3',
        url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
        caption: 'Sub-grade laser verification before aggregate delivery',
        timestamp: 'Sep 30, 9:00 AM',
        phase: 'Excavation'
      }
    ]
  },

  'TB-2024-9102': {
    referenceNumber: 'TB-2024-9102',
    clientLastName: 'Gallagher',
    location: 'Yorktown Battlefield Area, VA',
    projectType: 'Multi-Level Paver Living Space, Seating Walls & Fire Pit',
    startDate: 'Oct 1, 2024',
    estimatedCompletion: 'Oct 9, 2024',
    overallProgress: 45,
    currentPhase: 'Retaining Seating Wall Construction & French Drain Tie-Ins',
    leadForeman: 'Marcus K. (Hardscape Specialist)',
    foremanPhone: '(804) 555-0192',
    siteWeatherStatus: 'Clear & Dry (71°F, Calm Winds)',
    surfaceSquareFeet: 1200,
    materialsUsed: [
      'Textured Dimensional Slate Concrete Pavers (60mm)',
      'Split-Face Engineered Retaining Wall Blocks',
      'Low-Voltage Integrated LED Under-Cap Lighting',
      'Double-Perforated 4" French Drain Pipe in Washed #57 Stone'
    ],
    latestDailyLog: {
      timestamp: 'Today at 10:15 AM',
      note: 'Retaining seating wall base course leveled on compacted gravel pad. French drain trenches backfilled with drainage stone. Polymeric joint sand prep scheduled for Thursday.',
      author: 'Marcus K. (Lead Mason)'
    },
    milestones: [
      {
        title: 'Yard Clearing & Tiered Slope Terracing',
        status: 'completed',
        dateCompleted: 'Oct 1',
        description: 'Excavated 1,200 sq.ft lawn; stepped grades to create dual entertainment zones.'
      },
      {
        title: 'Engineered French Drain Network',
        status: 'completed',
        dateCompleted: 'Oct 2',
        description: 'Installed 120 linear feet of non-clog French drain directing runoff to property swale.'
      },
      {
        title: 'Retaining Seating Walls & Gas Fire Pit Framing',
        status: 'in-progress',
        description: 'Laying structural split-face block with geogrid reinforcement every 2 vertical feet.'
      },
      {
        title: 'Screeding Bedding Sand & Laying Dimensional Pavers',
        status: 'upcoming',
        description: 'Laying 3-piece modular slate pattern with tight polymeric sand locking joints.'
      },
      {
        title: 'Vibratory Plate Compaction & LED Lighting Test',
        status: 'upcoming',
        description: 'Final mechanical compaction with rubber-padded plate and transformer low-voltage check.'
      }
    ],
    progressPhotos: [
      {
        id: 'p4',
        url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
        caption: 'First course of tiered retaining sitting wall leveled with laser transit',
        timestamp: 'Today, 9:30 AM',
        phase: 'Wall Masonry'
      },
      {
        id: 'p5',
        url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
        caption: 'Drainage pipe installation and sub-base aggregate compaction',
        timestamp: 'Oct 2, 1:00 PM',
        phase: 'Drainage Engineering'
      }
    ]
  },

  'TB-2024-7734': {
    referenceNumber: 'TB-2024-7734',
    clientLastName: 'Richardson',
    location: 'Mathews County Waterfront, VA',
    projectType: 'Cool-Touch Vuba Stone™ Pool Deck Overlay',
    startDate: 'Sep 22, 2024',
    estimatedCompletion: 'Sep 26, 2024',
    overallProgress: 100,
    currentPhase: 'Project Completed & 5-Year Warranty Active',
    leadForeman: 'Travis B. (Lead Contractor)',
    foremanPhone: '(804) 555-0192',
    siteWeatherStatus: 'Completed (Surface Fully Cured)',
    surfaceSquareFeet: 950,
    materialsUsed: [
      'Rivah Oyster Pearl Vuba Stone (2-4mm Quartz)',
      'Aliphatic Cool-Touch UV Polyurethane Resin',
      'Anti-Slip Micro-Glass Bead Grip Layer',
      'Cast Aluminum Pool Coping Transition Trims'
    ],
    latestDailyLog: {
      timestamp: 'Sep 26, 4:00 PM',
      note: 'Walkthrough completed with Mr. and Mrs. Richardson. Pool deck tested with water infiltration (100% immediate drainage, zero puddles). Lifetime UV and 5-Year Workmanship Warranty documentation handed over.',
      author: 'Travis B. (Lead Contractor)'
    },
    milestones: [
      {
        title: 'Diamond Grinding & Concrete Slab Priming',
        status: 'completed',
        dateCompleted: 'Sep 22',
        description: 'Surface profile prepared to CSP-3 standards; hairline cracks epoxy injected.'
      },
      {
        title: 'Expansion Relief Joint Isolation',
        status: 'completed',
        dateCompleted: 'Sep 23',
        description: 'Installed flexible neoprene expansion profiles mirroring pool foundation lines.'
      },
      {
        title: 'Hand Troweled Rivah Oyster Blend Overlay',
        status: 'completed',
        dateCompleted: 'Sep 24',
        description: 'Applied 18mm thickness around custom pool coping with non-abrasive traction beads.'
      },
      {
        title: '24-Hour Pedestrian Chemical Curing',
        status: 'completed',
        dateCompleted: 'Sep 25',
        description: 'Complete cross-linking achieved; water permeability rate verified at 920 gal/hr.'
      },
      {
        title: 'Client Walkthrough & Final Quality Sign-Off',
        status: 'completed',
        dateCompleted: 'Sep 26',
        description: 'Signed Jobber certificate of completion and delivered warranty package.'
      }
    ],
    progressPhotos: [
      {
        id: 'p6',
        url: 'https://images.unsplash.com/photo-1544984243-ec57ea16fe25?auto=format&fit=crop&w=800&q=80',
        caption: 'Finished cool-touch Rivah Oyster pool surround glowing in coastal afternoon light',
        timestamp: 'Sep 26, 3:30 PM',
        phase: 'Final Inspection'
      },
      {
        id: 'p7',
        url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
        caption: 'Coping edge detail and seamless non-slip texture',
        timestamp: 'Sep 24, 2:15 PM',
        phase: 'Finishing Touches'
      }
    ]
  }
};
