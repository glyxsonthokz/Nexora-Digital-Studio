export interface TeamMember {
  id: string;
  name: string;
  position: string;
  roleCode: 'CEO' | 'UIUX' | 'FRONTEND' | 'BACKEND' | 'MARKETING';
  photoUrl: string;
  shortBio: string;
  responsibilities: string[];
  skills: string[];
  email: string;
}

export interface ServiceItem {
  id: string;
  index: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  features: string[];
  benefits: string[];
  idealClients: string[];
  timeline: string;
  deliverables: string[];
  recommendedPackage: 'STARTER' | 'BUSINESS' | 'ENTERPRISE';
}

export type ProjectCategory =
  | 'All'
  | 'E-commerce'
  | 'Business'
  | 'Corporate'
  | 'Restaurant'
  | 'Portfolio'
  | 'Landing Pages';

export interface PortfolioProject {
  id: string;
  name: string;
  category: 'E-commerce' | 'Business' | 'Corporate' | 'Restaurant' | 'Portfolio' | 'Landing Pages';
  industry: string;
  description: string;
  impactHighlight: string;
  imageUrl: string;
  technologies: string[];
  liveUrl?: string;
  isDemonstration: boolean;
  deliverables: string[];
  clientTier: 'Local Store' | 'Growing Business' | 'Enterprise';
}

export interface ServicePackage {
  id: 'starter' | 'business' | 'enterprise';
  name: string;
  subtitle: string;
  targetAudience: string;
  investmentGuide: string;
  estimatedTimeline: string;
  isPopular?: boolean;
  features: string[];
  deliverables: string[];
  projectScope: string;
}

export interface ProcessStage {
  step: number;
  title: string;
  headline: string;
  description: string;
  duration: string;
  keyDeliverables: string[];
  clientInvolvement: string;
}

export interface ContactSubmission {
  id: string;
  createdAt: string;
  fullName: string;
  companyName: string;
  email: string;
  phone: string;
  businessType: string;
  websiteType: string;
  estimatedBudget: string;
  projectDescription: string;
  preferredContact: 'Email' | 'Phone' | 'WhatsApp';
  status: 'new' | 'reviewed' | 'quoted' | 'contacted';
  internalNotes?: string;
}

export interface ClientMilestone {
  title: string;
  stage: string;
  status: 'completed' | 'current' | 'upcoming';
  completionDate?: string;
  details: string;
}

export interface ClientDocument {
  id: string;
  title: string;
  category: string;
  fileSize: string;
  updatedAt: string;
}

export interface ClientFeedback {
  id: string;
  author: string;
  timestamp: string;
  subject: string;
  message: string;
  status: 'Received' | 'Under Review' | 'Implemented';
}

export interface ClientProjectAccount {
  projectCode: string;
  clientName: string;
  companyName: string;
  packageType: string;
  overallProgress: number;
  targetLaunch: string;
  leadArchitect: string;
  milestones: ClientMilestone[];
  documents: ClientDocument[];
  feedbackList: ClientFeedback[];
  invoices: {
    invoiceNo: string;
    amount: string;
    dueDate: string;
    status: 'Paid' | 'Processing' | 'Due';
  }[];
}

export interface AgencySettings {
  agencyName: string;
  tagline: string;
  brandStatement: string;
  whatsappNumber: string;
  whatsappDisplay: string;
  businessEmail: string;
  directPhone: string;
  headquarters: string;
  acceptingNewProjects: boolean;
  starterStartingPrice: string;
  businessStartingPrice: string;
  enterpriseStartingPrice: string;
  logoUrl: string;
}
