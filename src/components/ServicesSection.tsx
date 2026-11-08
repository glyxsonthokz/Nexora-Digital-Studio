import React, { useState } from 'react';
import { ServiceItem } from '../types';
import { servicesData } from '../data/initialData';
import { ArrowUpRight, Check, Sparkles, Clock, Users, ShieldAlert, Layers } from 'lucide-react';

interface ServicesSectionProps {
  onRequestQuote: (serviceTitle: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onRequestQuote }) => {
  const [selectedService, setSelectedService] = useState<ServiceItem>(servicesData[0]);
  const [modalService, setModalService] = useState<ServiceItem | null>(null);

  return (
    <section id="services" className="py-24 bg-[#080E1A] border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-mono text-indigo-400 uppercase tracking-wider">
            <span>Specialized Capabilities</span>
            <span aria-hidden="true">·</span>
            <span>Ten Digital Solutions</span>
          </div>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight text-white font-sans">
            Engineered for Commercial Performance & Brand Prestige
          </h2>
          <p className="mt-4 text-base text-slate-300 leading-relaxed">
            Whether launching a boutique local shop, scaling a direct-to-consumer brand,
            or architecting corporate infrastructure, we deliver clean code and distinctive design.
          </p>
        </div>

        {/* 10 Services Interactive Tabbed Grid */}
        <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Service Selector List (Left Column) */}
          <div className="lg:col-span-5 space-y-2">
            {servicesData.map((service) => {
              const isSelected = selectedService.id === service.id;
              return (
                <button
                  key={service.id}
                  onClick={() => setSelectedService(service)}
                  className={`w-full text-left p-4 rounded-xl transition-all border ${
                    isSelected
                      ? 'bg-slate-900 border-indigo-500/60 shadow-lg shadow-indigo-950/40 text-white'
                      : 'bg-slate-900/40 border-slate-800/80 text-slate-300 hover:bg-slate-900/80 hover:text-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-indigo-400 font-semibold">
                      {service.index}
                    </span>
                    <span className="text-[11px] font-mono text-slate-400">
                      {service.timeline}
                    </span>
                  </div>
                  <h3 className="mt-1 text-base font-semibold text-slate-100 font-sans">
                    {service.title}
                  </h3>
                  <p className="mt-1 text-xs text-slate-400 line-clamp-1">
                    {service.shortDescription}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Active Service Showcase Card (Right Column) */}
          <div className="lg:col-span-7 bg-[#0B1220] border border-slate-800 rounded-2xl p-6 sm:p-8 sticky top-28 shadow-xl">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-800">
              <div>
                <span className="font-mono text-xs text-indigo-400 font-bold uppercase tracking-wider">
                  Service {selectedService.index}
                </span>
                <h3 className="text-2xl font-bold text-white mt-1">
                  {selectedService.title}
                </h3>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-slate-400 bg-slate-900 px-3 py-1.5 rounded border border-slate-800">
                  Timeline: {selectedService.timeline}
                </span>
                <button
                  onClick={() => onRequestQuote(selectedService.title)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg shadow-sm transition-all whitespace-nowrap"
                >
                  <span>Request a Quote</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Description */}
            <div className="mt-6">
              <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                Overview & Strategic Purpose
              </h4>
              <p className="mt-2 text-sm text-slate-200 leading-relaxed">
                {selectedService.fullDescription}
              </p>
            </div>

            {/* Features & Technical Inclusions */}
            <div className="mt-6">
              <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                Key Features Included
              </h4>
              <ul className="mt-3 space-y-2.5">
                {selectedService.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                    <div className="w-4 h-4 rounded bg-indigo-950/80 border border-indigo-700/60 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-2.5 h-2.5 text-indigo-300" />
                    </div>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Commercial Benefits */}
            <div className="mt-6 pt-6 border-t border-slate-800/80">
              <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                Business & Revenue Benefits
              </h4>
              <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-3">
                {selectedService.benefits.map((benefit, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 text-xs text-slate-300"
                  >
                    <span className="block font-medium text-slate-100">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Ideal Clients */}
            <div className="mt-6 pt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-4 text-xs">
              <div>
                <span className="text-slate-400 block font-mono">Ideal Clients:</span>
                <span className="text-slate-200 font-medium mt-0.5 block">
                  {selectedService.idealClients.join(' · ')}
                </span>
              </div>
              <button
                onClick={() => setModalService(selectedService)}
                className="text-xs text-indigo-400 hover:text-indigo-300 underline underline-offset-4"
              >
                View Full Technical Spec
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Deep-Dive Service Specification Modal */}
      {modalService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm">
          <div className="bg-[#0B1220] border border-slate-700 rounded-2xl max-w-2xl w-full p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div>
                <span className="font-mono text-xs text-indigo-400 font-bold uppercase">
                  Service {modalService.index} Specification
                </span>
                <h3 className="text-xl font-bold text-white mt-1">
                  {modalService.title}
                </h3>
              </div>
              <button
                onClick={() => setModalService(null)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
              >
                ✕
              </button>
            </div>

            <div className="mt-6 space-y-6 text-sm text-slate-300">
              <div>
                <h4 className="font-bold text-white text-xs font-mono uppercase tracking-wider mb-2">
                  Scope & Engineering Approach
                </h4>
                <p className="leading-relaxed text-xs text-slate-300">{modalService.fullDescription}</p>
              </div>

              <div>
                <h4 className="font-bold text-white text-xs font-mono uppercase tracking-wider mb-2">
                  Deliverables Checklist
                </h4>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {modalService.deliverables.map((item, i) => (
                    <div key={i} className="p-2.5 rounded bg-slate-900 border border-slate-800 flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 flex justify-between items-center">
                <span className="text-xs text-slate-400">
                  Recommended tier: <strong className="text-slate-200">{modalService.recommendedPackage}</strong>
                </span>
                <button
                  onClick={() => {
                    const title = modalService.title;
                    setModalService(null);
                    onRequestQuote(title);
                  }}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold"
                >
                  Request Quote for this Service
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
