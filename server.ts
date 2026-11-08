import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());

// In-memory persistent data store with pre-seeded sample data
interface StoredInquiry {
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
  preferredContact: string;
  status: 'new' | 'reviewed' | 'quoted' | 'contacted';
  internalNotes?: string;
}

let storedInquiries: StoredInquiry[] = [
  {
    id: 'INQ-101',
    createdAt: new Date(Date.now() - 3600000 * 26).toISOString(),
    fullName: 'Sophia Bennett',
    companyName: 'Bennett & Cole Bespoke Tailoring',
    email: 'sophia@bennettcole.co.uk',
    phone: '+44 20 7946 0912',
    businessType: 'Clothing and fashion brand',
    websiteType: 'E-commerce Website Development',
    estimatedBudget: '$4,000 – $7,000',
    projectDescription: 'We need an editorial e-commerce platform to showcase our bespoke suit cuts, fabric swatch requests, and appointment booking system for our Mayfair studio.',
    preferredContact: 'Email',
    status: 'reviewed',
    internalNotes: 'Elena sent wireframe moodboard. Discovery call booked for Thursday.',
  },
  {
    id: 'INQ-102',
    createdAt: new Date(Date.now() - 3600000 * 6).toISOString(),
    fullName: 'David K. O’Connor',
    companyName: 'The Highland Bistro & Cellar',
    email: 'david@highlandbistro.com',
    phone: '+1 617 555 0184',
    businessType: 'Restaurant, café, hotel',
    websiteType: 'Restaurant and Café Websites',
    estimatedBudget: '$2,000 – $4,000',
    projectDescription: 'Looking to overhaul our website. Need a digital seasonal menu, online table reservations without third-party fees, and private dining party inquiries.',
    preferredContact: 'WhatsApp',
    status: 'new',
    internalNotes: 'Julian following up via WhatsApp.',
  },
];

let agencyConfig = {
  agencyName: 'NEXORA DIGITAL STUDIO',
  tagline: 'We Build Digital Businesses.',
  brandStatement: 'We transform business ideas into powerful digital experiences.',
  whatsappNumber: '18005550199',
  whatsappDisplay: '+1 (800) 555-0199',
  businessEmail: 'contact@nexoradigital.studio',
  directPhone: '+1 (800) 555-0199',
  headquarters: 'Singapore & London (Distributed Global Studio)',
  acceptingNewProjects: true,
  starterStartingPrice: '$1,850',
  businessStartingPrice: '$4,200',
  enterpriseStartingPrice: 'Custom Quote',
  logoUrl: '/assets/aistudio/WhatsApp_Image_2026-11-08_at_14.14.15_e2f0f05e.jpeg',
};

// API Routes

// 1. Submit Project Inquiry (Form submission with full validation)
app.post('/api/inquiries', (req, res) => {
  const {
    fullName,
    companyName,
    email,
    phone,
    businessType,
    websiteType,
    estimatedBudget,
    projectDescription,
    preferredContact,
  } = req.body;

  if (!fullName || !email || !projectDescription) {
    return res.status(400).json({
      success: false,
      error: 'Please provide your full name, email address, and project description.',
    });
  }

  // Basic email format check
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      error: 'Please enter a valid email address.',
    });
  }

  const newInquiry: StoredInquiry = {
    id: `INQ-${Math.floor(100 + Math.random() * 900)}`,
    createdAt: new Date().toISOString(),
    fullName: String(fullName).trim(),
    companyName: companyName ? String(companyName).trim() : 'Independent Venture',
    email: String(email).trim().toLowerCase(),
    phone: phone ? String(phone).trim() : 'Not provided',
    businessType: businessType || 'Small and medium business',
    websiteType: websiteType || 'Business Website Development',
    estimatedBudget: estimatedBudget || 'Undecided / Need Consultation',
    projectDescription: String(projectDescription).trim(),
    preferredContact: preferredContact || 'Email',
    status: 'new',
  };

  storedInquiries.unshift(newInquiry);

  return res.status(201).json({
    success: true,
    message: 'Your project inquiry has been securely received by the NEXORA team.',
    inquiry: newInquiry,
    consultationGuide: {
      nextStep: 'A founding partner will review your technical requirements within 24 business hours.',
      whatsappDirectLink: `https://wa.me/${agencyConfig.whatsappNumber}?text=${encodeURIComponent(
        `Hello Nexora Studio, I just submitted an inquiry for ${newInquiry.companyName} (Ref: ${newInquiry.id}).`
      )}`,
    },
  });
});

// 2. Fetch Inquiries (For Agency Admin / Team CMS)
app.get('/api/inquiries', (_req, res) => {
  res.json({
    success: true,
    count: storedInquiries.length,
    inquiries: storedInquiries,
  });
});

// 3. Update Inquiry Status or Notes
app.patch('/api/inquiries/:id', (req, res) => {
  const { id } = req.params;
  const { status, internalNotes } = req.body;

  const inquiry = storedInquiries.find((i) => i.id === id);
  if (!inquiry) {
    return res.status(404).json({ success: false, error: 'Inquiry not found' });
  }

  if (status) inquiry.status = status;
  if (internalNotes !== undefined) inquiry.internalNotes = internalNotes;

  res.json({ success: true, inquiry });
});

// 4. Agency Configuration
app.get('/api/agency/config', (_req, res) => {
  res.json({ success: true, config: agencyConfig });
});

app.post('/api/agency/config', (req, res) => {
  agencyConfig = {
    ...agencyConfig,
    ...req.body,
  };
  res.json({ success: true, config: agencyConfig });
});

// 5. Client Portal Lookup
app.get('/api/client/project/:code', (req, res) => {
  const code = req.params.code.toUpperCase();
  if (code === 'NEX-AURELIA' || code === 'AURELIA') {
    return res.json({
      success: true,
      project: {
        projectCode: 'NEX-AURELIA',
        clientName: 'Victoria Hastings',
        companyName: 'Aurelia & Co. Luxury Goods',
        packageType: 'BUSINESS PACKAGE (E-commerce)',
        overallProgress: 78,
        targetLaunch: 'November 28, 2026',
        leadArchitect: 'Elena Rostova (UI/UX) & David Zhang (Backend)',
        milestones: [
          { title: 'Discovery & Product Taxonomy', stage: 'Stage 1', status: 'completed', completionDate: 'Oct 12', details: 'Completed 60-min discovery. Finalized 120 SKU category structure.' },
          { title: 'Information Architecture & Wireframes', stage: 'Stage 2', status: 'completed', completionDate: 'Oct 20', details: 'Approved sitemap and mobile checkout wireframes.' },
          { title: 'Bespoke Visual Design in Figma', stage: 'Stage 3', status: 'completed', completionDate: 'Nov 02', details: 'Approved luxury dark palette and typography.' },
          { title: 'Full-Stack Development & Stripe API', stage: 'Stage 4', status: 'current', details: 'Cart engine, inventory webhooks, and responsive components 85% built.' },
          { title: 'Quality Assurance & Load Testing', stage: 'Stage 5', status: 'upcoming', details: 'Scheduled for Nov 20 across iOS and Android.' },
          { title: 'Production Domain DNS Launch', stage: 'Stage 6', status: 'upcoming', details: 'Targeting November 28 live cutover.' },
        ],
        documents: [
          { id: 'doc-1', title: 'Aurelia_Project_Charter_v1.pdf', category: 'Contract & Scope', fileSize: '1.4 MB', updatedAt: 'Oct 10, 2026' },
          { id: 'doc-2', title: 'Figma_Design_Tokens_System.pdf', category: 'Design System', fileSize: '4.8 MB', updatedAt: 'Nov 02, 2026' },
          { id: 'doc-3', title: 'Stripe_Payment_Gateway_Architecture.pdf', category: 'Technical Architecture', fileSize: '820 KB', updatedAt: 'Nov 04, 2026' },
        ],
        feedbackList: [
          { id: 'fb-1', author: 'Victoria Hastings', timestamp: 'Nov 03, 2026', subject: 'Gold Ring Zoom Preview', message: 'Can we add 2x macro zoom on the diamond product detail page?', status: 'Implemented' },
          { id: 'fb-2', author: 'Victoria Hastings', timestamp: 'Nov 06, 2026', subject: 'Cart Drawer Animation', message: 'Love the slide-over cart! Let us make the checkout button stay sticky on mobile.', status: 'Implemented' },
        ],
        invoices: [
          { invoiceNo: 'INV-2026-081', amount: '$2,400.00', dueDate: 'Paid Oct 10', status: 'Paid' },
          { invoiceNo: 'INV-2026-094', amount: '$2,400.00', dueDate: 'Nov 20, 2026', status: 'Processing' },
        ],
      },
    });
  }

  if (code === 'NEX-DEMO' || code === 'DEMO') {
    return res.json({
      success: true,
      project: {
        projectCode: 'NEX-DEMO',
        clientName: 'Arthur Pendelton',
        companyName: 'Pendelton Financial Advisors',
        packageType: 'STARTER PACKAGE',
        overallProgress: 42,
        targetLaunch: 'December 12, 2026',
        leadArchitect: 'Julian Vance & Marcus K. Sterling',
        milestones: [
          { title: 'Discovery Workshop', stage: 'Stage 1', status: 'completed', completionDate: 'Oct 28', details: 'Outlined advisor profiles and consultation booking funnel.' },
          { title: 'Sitemap & Content Blueprint', stage: 'Stage 2', status: 'completed', completionDate: 'Nov 04', details: 'Client approved page architecture.' },
          { title: 'Figma Visual Design', stage: 'Stage 3', status: 'current', details: 'Crafting modern navy visual system with financial trust badges.' },
          { title: 'Frontend Coding', stage: 'Stage 4', status: 'upcoming', details: 'Starting next week.' },
          { title: 'UAT & Compliance Check', stage: 'Stage 5', status: 'upcoming', details: 'Financial disclaimer review.' },
          { title: 'Official Launch', stage: 'Stage 6', status: 'upcoming', details: 'Scheduled December 12.' },
        ],
        documents: [
          { id: 'doc-10', title: 'Pendelton_Scope_Agreement.pdf', category: 'Scope Agreement', fileSize: '1.1 MB', updatedAt: 'Oct 28, 2026' },
          { id: 'doc-11', title: 'Content_Copy_Brief.docx', category: 'Content Copy', fileSize: '450 KB', updatedAt: 'Nov 04, 2026' },
        ],
        feedbackList: [
          { id: 'fb-10', author: 'Arthur Pendelton', timestamp: 'Nov 05, 2026', subject: 'Consultation Calendar', message: 'Please ensure Calendly embeds directly into the contact page.', status: 'Received' },
        ],
        invoices: [
          { invoiceNo: 'INV-2026-102', amount: '$1,850.00', dueDate: 'Paid Oct 28', status: 'Paid' },
        ],
      },
    });
  }

  return res.status(404).json({
    success: false,
    error: 'Project code not found. Please try "NEX-AURELIA" or "NEX-DEMO" to preview the live client portal experience.',
  });
});

// Vite Dev Server middleware or static file serving
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Nexora Digital Studio server running on port ${PORT}`);
  });
}

startServer();
