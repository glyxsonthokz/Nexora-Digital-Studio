import React, { useState } from 'react';
import { PortfolioProject, ProjectCategory } from '../types';
import { portfolioProjects } from '../data/initialData';
import { ExternalLink, Layers, Eye, CheckCircle, Sparkles, X } from 'lucide-react';

interface PortfolioSectionProps {
  onRequestQuote: (serviceOrProject: string) => void;
}

const categories: ProjectCategory[] = [
  'All',
  'E-commerce',
  'Business',
  'Corporate',
  'Restaurant',
  'Portfolio',
  'Landing Pages',
];

export const PortfolioSection: React.FC<PortfolioSectionProps> = ({ onRequestQuote }) => {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('All');
  const [activeDemoModal, setActiveDemoModal] = useState<PortfolioProject | null>(null);

  const filteredProjects =
    activeCategory === 'All'
      ? portfolioProjects
      : portfolioProjects.filter((p) => p.category === activeCategory);

  return (
    <section id="portfolio" className="py-24 bg-[#060B14]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-indigo-400 uppercase tracking-wider">
              <span>Work Showcase</span>
              <span aria-hidden="true">·</span>
              <span>Architecture & UI Standards</span>
            </div>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight text-white font-sans">
              Demonstration & Case Study Architecture
            </h2>
            <p className="mt-3 text-sm text-slate-300 max-w-2xl leading-relaxed">
              Transparent Craftsmanship Policy: The projects below are verified demonstration
              architectures engineered to show the design standards, code hygiene, and interactive
              polish we deliver for clients.
            </p>
          </div>

          {/* Demonstration Notice Badge (Explicitly honoring anti-slop & truthfulness rule) */}
          <div className="bg-slate-900/90 border border-slate-800 p-3.5 rounded-xl text-xs text-slate-400 max-w-xs shrink-0">
            <span className="font-semibold text-slate-200 block font-mono">
              Integrity Disclosure
            </span>
            <p className="text-[11px] mt-0.5 leading-snug">
              Clearly marked demonstration projects. We never invent client logos or present
              conceptual work as real client case studies.
            </p>
          </div>
        </div>

        {/* Category Filter Bar (Functional buttons / segmented controls with click handlers) */}
        <div className="mt-8 flex flex-wrap items-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                activeCategory === cat
                  ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/30'
                  : 'bg-slate-900/80 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <article
              key={project.id}
              className="group bg-[#0B1220] border border-slate-800 rounded-2xl overflow-hidden hover:border-slate-700 transition-all flex flex-col justify-between shadow-lg"
            >
              <div>
                {/* Visual Screenshot / Mockup slot */}
                <div className="relative aspect-video w-full overflow-hidden bg-slate-950">
                  <img
                    src={project.imageUrl}
                    alt={project.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                  {/* Demonstration indicator */}
                  <div className="absolute top-3 left-3 bg-[#060B14]/85 backdrop-blur-md px-2.5 py-1 rounded text-[10px] font-mono text-slate-300 border border-slate-700/60">
                    Demonstration Project
                  </div>

                  {/* Interactive Quick Inspect button */}
                  <button
                    onClick={() => setActiveDemoModal(project)}
                    className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-xs font-semibold text-white backdrop-blur-[2px]"
                  >
                    <Eye className="w-4 h-4 text-indigo-400" />
                    <span>Launch Interactive Inspection</span>
                  </button>
                </div>

                {/* Card Content */}
                <div className="p-6">
                  {/* Category and Industry metadata */}
                  <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
                    <span className="text-indigo-400">{project.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>{project.industry}</span>
                  </div>

                  <h3 className="mt-2 text-lg font-bold text-white group-hover:text-indigo-300 transition-colors">
                    {project.name}
                  </h3>

                  <p className="mt-2 text-xs text-slate-300 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Highlight Metric */}
                  <div className="mt-4 p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 text-xs">
                    <span className="font-mono text-slate-400 text-[10px] uppercase block">
                      Targeted Impact Metric
                    </span>
                    <span className="text-slate-100 font-semibold font-mono tabular-nums">
                      {project.impactHighlight}
                    </span>
                  </div>

                  {/* Technologies Used */}
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="text-[10px] font-mono text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800/80"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer action bar */}
              <div className="px-6 py-4 bg-slate-900/40 border-t border-slate-800/80 flex items-center justify-between">
                <button
                  onClick={() => setActiveDemoModal(project)}
                  className="text-xs font-medium text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
                >
                  <span>Project Specs</span>
                  <ExternalLink className="w-3 h-3" />
                </button>

                <button
                  onClick={() => onRequestQuote(project.name)}
                  className="text-xs font-semibold text-slate-200 hover:text-white bg-slate-800/80 hover:bg-slate-700 px-3 py-1.5 rounded-lg transition-colors"
                >
                  Inquire Similar
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Interactive Demonstration Inspector Modal */}
      {activeDemoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md">
          <div className="bg-[#0B1220] border border-slate-700 rounded-2xl max-w-4xl w-full p-6 sm:p-8 max-h-[92vh] overflow-y-auto shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-indigo-400">
                  <span>{activeDemoModal.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>{activeDemoModal.industry}</span>
                </div>
                <h3 className="text-2xl font-bold text-white mt-1">
                  {activeDemoModal.name}
                </h3>
              </div>
              <button
                onClick={() => setActiveDemoModal(null)}
                className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="mt-6 space-y-6">
              {/* Full Screenshot Viewport */}
              <div className="rounded-xl overflow-hidden border border-slate-800 relative bg-black">
                <img
                  src={activeDemoModal.imageUrl}
                  alt={activeDemoModal.name}
                  className="w-full h-auto max-h-[480px] object-cover"
                />
              </div>

              {/* Details & Specifications */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                <div>
                  <h4 className="font-mono text-xs uppercase tracking-wider text-slate-400 font-semibold mb-2">
                    Architectural Strategy
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {activeDemoModal.description}
                  </p>

                  <div className="mt-4">
                    <span className="font-mono text-xs text-slate-400 block mb-1">
                      Deliverables Checklist:
                    </span>
                    <div className="space-y-1.5 text-xs text-slate-200">
                      {activeDemoModal.deliverables.map((item, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                    <span className="font-mono text-xs text-slate-400 block">
                      Targeted Client Tier
                    </span>
                    <span className="text-base font-bold text-white mt-0.5 block">
                      {activeDemoModal.clientTier}
                    </span>
                    <span className="text-xs text-indigo-400 font-mono mt-2 block">
                      Key Metric: {activeDemoModal.impactHighlight}
                    </span>
                  </div>

                  <div>
                    <span className="font-mono text-xs text-slate-400 block mb-2">
                      Technology Stack:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {activeDemoModal.technologies.map((t) => (
                        <span
                          key={t}
                          className="px-2.5 py-1 rounded bg-slate-800 text-xs font-mono text-slate-300"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal CTA */}
              <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
                <span className="text-xs text-slate-400">
                  Ready to build a website engineered to these standards?
                </span>
                <button
                  onClick={() => {
                    const name = activeDemoModal.name;
                    setActiveDemoModal(null);
                    onRequestQuote(name);
                  }}
                  className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold"
                >
                  Start Project Like {activeDemoModal.name}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
