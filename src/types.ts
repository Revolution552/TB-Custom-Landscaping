export interface VubaSwatch {
  id: string;
  name: string;
  category: 'Coastal' | 'Classic' | 'Modern' | 'Earth';
  description: string;
  hexPrimary: string;
  hexSecondary: string;
  hexTertiary: string;
  grainSize: string;
  popularFor: string;
  permeabilityRate: string;
  tag?: string;
  imageUrl: string;
}

export interface BeforeAfterProject {
  id: string;
  title: string;
  location: string;
  serviceType: 'Vuba Stone Resin' | 'Paver Patio' | 'Retaining Wall' | 'Driveway Transformation';
  description: string;
  details: {
    sqFt: number;
    completionTime: string;
    keyChallenge: string;
    solution: string;
  };
  beforeImage: string;
  afterImage: string;
  beforeAlt: string;
  afterAlt: string;
}

export interface HardscapingFeature {
  id: string;
  title: string;
  tagline: string;
  description: string;
  benefits: string[];
  specs: string[];
  imageUrl: string;
  iconName: string;
}

export interface SecondaryService {
  id: string;
  title: string;
  description: string;
  frequency: string;
  idealFor: string;
  iconName: string;
  badge?: string;
}

export interface Testimonial {
  id: string;
  author: string;
  location: string;
  projectType: string;
  rating: number;
  date: string;
  review: string;
  verified: boolean;
  featuredHighlight: string;
}

export interface ServiceArea {
  name: string;
  county: string;
  radiusNote: string;
  highlight: string;
}

export interface FaqItem {
  question: string;
  answer: string;
  category: 'Vuba Stone' | 'Hardscaping' | 'Process & Pricing' | 'Maintenance';
}

export interface LeadFormData {
  fullName: string;
  phone: string;
  email: string;
  address: string;
  cityOrArea: string;
  serviceType: string;
  estimatedSqFt: string;
  projectTimeline: string;
  budgetRange: string;
  projectNotes: string;
  preferredContactMethod: 'phone' | 'text' | 'email';
  hasPhotos: boolean;
}
