/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { initialAgencySettings, initialTeamMembers } from './data/initialData';
import { AgencySettings, TeamMember } from './types';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { ServicesSection } from './components/ServicesSection';
import { PortfolioSection } from './components/PortfolioSection';
import { AboutSection } from './components/AboutSection';
import { ProcessTimeline } from './components/ProcessTimeline';
import { PricingSection } from './components/PricingSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ClientPortalModal } from './components/ClientPortalModal';
import { AgencyCmsModal } from './components/AgencyCmsModal';
import { BrandGuideModal } from './components/BrandGuideModal';
import { DocumentationModal } from './components/DocumentationModal';
import { EditMemberModal } from './components/EditMemberModal';

export default function App() {
  const [agencySettings, setAgencySettings] = useState<AgencySettings>(initialAgencySettings);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(initialTeamMembers);

  // Modals state
  const [isClientPortalOpen, setIsClientPortalOpen] = useState(false);
  const [isAgencyCmsOpen, setIsAgencyCmsOpen] = useState(false);
  const [isBrandGuideOpen, setIsBrandGuideOpen] = useState(false);
  const [isDocsOpen, setIsDocsOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);

  // Prefill state for Contact section
  const [contactPrefill, setContactPrefill] = useState<{
    service?: string;
    packageTier?: string;
  } | undefined>(undefined);

  const scrollToContact = (prefill?: { service?: string; packageTier?: string }) => {
    if (prefill) {
      setContactPrefill(prefill);
    }
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToPortfolio = () => {
    const el = document.getElementById('portfolio');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleUpdateMember = (updated: TeamMember) => {
    setTeamMembers((prev) =>
      prev.map((m) => (m.id === updated.id ? updated : m))
    );
  };

  return (
    <div className="min-h-screen bg-[#060B14] text-slate-100 flex flex-col font-sans selection:bg-indigo-600 selection:text-white">
      {/* Top Navigation Bar */}
      <Header
        logoUrl={agencySettings.logoUrl}
        onOpenContact={() => scrollToContact()}
        onOpenClientPortal={() => setIsClientPortalOpen(true)}
        onOpenAgencyCms={() => setIsAgencyCmsOpen(true)}
        onOpenBrandGuide={() => setIsBrandGuideOpen(true)}
        onOpenDocs={() => setIsDocsOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* A. Hero Section */}
        <HeroSection
          onStartProject={() => scrollToContact()}
          onExploreWork={scrollToPortfolio}
        />

        {/* C. Dedicated 10 Services */}
        <ServicesSection
          onRequestQuote={(serviceTitle) => scrollToContact({ service: serviceTitle })}
        />

        {/* D. Portfolio Demonstration Architecture */}
        <PortfolioSection
          onRequestQuote={(project) =>
            scrollToContact({ service: `Inquiry similar to ${project}` })
          }
        />

        {/* B. About Us: Five Founding Specialists */}
        <AboutSection
          teamMembers={teamMembers}
          onEditMember={(member) => setEditingMember(member)}
          onOpenAgencyCms={() => setIsAgencyCmsOpen(true)}
        />

        {/* F. 7-Stage Working Process */}
        <ProcessTimeline />

        {/* E. 3 Professional Pricing Packages */}
        <PricingSection
          agencySettings={agencySettings}
          onSelectPackage={(pkgName) => scrollToContact({ packageTier: pkgName })}
          onOpenAgencyCms={() => setIsAgencyCmsOpen(true)}
        />

        {/* Ethical Transparency & Founding Partner Cohort */}
        <TestimonialsSection onStartProject={() => scrollToContact()} />

        {/* G. Contact Us with Validated Form & Real Backend */}
        <ContactSection
          agencySettings={agencySettings}
          prefillData={contactPrefill}
        />
      </main>

      {/* Professional Agency Footer */}
      <Footer
        agencySettings={agencySettings}
        onOpenClientPortal={() => setIsClientPortalOpen(true)}
        onOpenAgencyCms={() => setIsAgencyCmsOpen(true)}
        onOpenBrandGuide={() => setIsBrandGuideOpen(true)}
        onStartProject={() => scrollToContact()}
      />

      {/* Interactive Modal Portals */}
      <ClientPortalModal
        isOpen={isClientPortalOpen}
        onClose={() => setIsClientPortalOpen(false)}
      />

      <AgencyCmsModal
        isOpen={isAgencyCmsOpen}
        onClose={() => setIsAgencyCmsOpen(false)}
        agencySettings={agencySettings}
        onSaveSettings={(newSettings) => setAgencySettings(newSettings)}
        teamMembers={teamMembers}
        onSaveTeamMembers={(newMembers) => setTeamMembers(newMembers)}
      />

      <BrandGuideModal
        isOpen={isBrandGuideOpen}
        onClose={() => setIsBrandGuideOpen(false)}
      />

      <DocumentationModal
        isOpen={isDocsOpen}
        onClose={() => setIsDocsOpen(false)}
      />

      <EditMemberModal
        member={editingMember}
        onClose={() => setEditingMember(null)}
        onSave={handleUpdateMember}
      />
    </div>
  );
}
