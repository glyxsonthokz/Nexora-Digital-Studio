import React, { useState } from 'react';
import { TeamMember } from '../types';
import { ShieldCheck, Target, Eye, Compass, HeartHandshake, Award, Edit3, Mail } from 'lucide-react';

interface AboutSectionProps {
  teamMembers: TeamMember[];
  onEditMember: (member: TeamMember) => void;
  onOpenAgencyCms: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  teamMembers,
  onEditMember,
  onOpenAgencyCms,
}) => {
  return (
    <section id="about" className="py-24 bg-[#080E1A] border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-mono text-indigo-400 uppercase tracking-wider">
            <span>About Nexora</span>
            <span aria-hidden="true">·</span>
            <span>Five Founding Specialists</span>
          </div>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight text-white font-sans">
            Built on Craftsmanship, Technical Precision & Commercial Focus
          </h2>
          <p className="mt-4 text-base text-slate-300 leading-relaxed">
            We are not a bloated agency where accounts are sold by seniors and handed off to
            untested interns. Nexora is a disciplined five-member collective of dedicated
            specialists working directly with founders and marketing leaders.
          </p>
        </div>

        {/* Narrative Grid: Vision, Mission, Values, Why We Started, Approach, Quality */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Vision */}
          <div className="p-6 rounded-2xl bg-[#0B1220] border border-slate-800">
            <div className="w-10 h-10 rounded-lg bg-indigo-950/80 border border-indigo-700/60 flex items-center justify-center text-indigo-400 mb-4">
              <Eye className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white font-sans">Our Vision</h3>
            <p className="mt-2 text-xs text-slate-300 leading-relaxed">
              To be the digital engineering studio that ambitious companies trust to transform
              complex business ideas into frictionless, high-converting digital flagships.
            </p>
          </div>

          {/* Mission */}
          <div className="p-6 rounded-2xl bg-[#0B1220] border border-slate-800">
            <div className="w-10 h-10 rounded-lg bg-blue-950/80 border border-blue-700/60 flex items-center justify-center text-blue-400 mb-4">
              <Target className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white font-sans">Our Mission</h3>
            <p className="mt-2 text-xs text-slate-300 leading-relaxed">
              We design and build bespoke web platforms that eliminate template bloat, command
              customer trust, rank reliably on search engines, and convert visitors into loyal clients.
            </p>
          </div>

          {/* Values */}
          <div className="p-6 rounded-2xl bg-[#0B1220] border border-slate-800">
            <div className="w-10 h-10 rounded-lg bg-cyan-950/80 border border-cyan-700/60 flex items-center justify-center text-cyan-400 mb-4">
              <Compass className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white font-sans">Core Values</h3>
            <p className="mt-2 text-xs text-slate-300 leading-relaxed">
              Ruthless code hygiene, transparent communication, pixel-level visual discipline,
              and measurable commercial impact over decorative vanity metrics.
            </p>
          </div>

          {/* Why We Started */}
          <div className="p-6 rounded-2xl bg-[#0B1220] border border-slate-800">
            <div className="w-10 h-10 rounded-lg bg-emerald-950/80 border border-emerald-700/60 flex items-center justify-center text-emerald-400 mb-4">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white font-sans">Why We Started</h3>
            <p className="mt-2 text-xs text-slate-300 leading-relaxed">
              We grew tired of seeing businesses spend thousands on fragile, slow-loading templates
              that broke with every update. Nexora was created to provide enterprise-grade web
              craft at transparent, predictable pricing.
            </p>
          </div>

          {/* Approach to Business */}
          <div className="p-6 rounded-2xl bg-[#0B1220] border border-slate-800">
            <div className="w-10 h-10 rounded-lg bg-violet-950/80 border border-violet-700/60 flex items-center justify-center text-violet-400 mb-4">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white font-sans">Our Approach</h3>
            <p className="mt-2 text-xs text-slate-300 leading-relaxed">
              Direct access to the five specialists who actually design and build your code.
              No layers of middle management. Fast iterations, honest feedback, and milestone clarity.
            </p>
          </div>

          {/* Commitment to Quality */}
          <div className="p-6 rounded-2xl bg-[#0B1220] border border-slate-800">
            <div className="w-10 h-10 rounded-lg bg-amber-950/80 border border-amber-700/60 flex items-center justify-center text-amber-400 mb-4">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white font-sans">Commitment to Quality</h3>
            <p className="mt-2 text-xs text-slate-300 leading-relaxed">
              Every build undergoes multi-device testing, WCAG AA accessibility audits, and Core Web
              Vitals optimization, backed by our 30-to-60-day post-launch warranty.
            </p>
          </div>
        </div>

        {/* Five Founding Team Profiles */}
        <div className="mt-20">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-8 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-indigo-400 uppercase tracking-wider">
                <span>Core Organization</span>
                <span aria-hidden="true">·</span>
                <span>Five Accountable Disciplines</span>
              </div>
              <h3 className="mt-2 text-2xl sm:text-3xl font-bold text-white font-sans">
                The Five Founding Members
              </h3>
              <p className="mt-1 text-xs text-slate-400">
                Senior practitioners covering every aspect of modern digital agency execution.
              </p>
            </div>

            <button
              onClick={onOpenAgencyCms}
              className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-slate-300 bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-lg transition-colors shrink-0"
            >
              <Edit3 className="w-3.5 h-3.5 text-indigo-400" />
              <span>Edit Team Profiles in CMS</span>
            </button>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teamMembers.map((member) => (
              <div
                key={member.id}
                className="bg-[#0B1220] border border-slate-800 rounded-2xl p-6 flex flex-col justify-between hover:border-slate-700 transition-colors"
              >
                <div>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={member.photoUrl}
                        alt={member.name}
                        className="w-14 h-14 rounded-xl object-cover border border-slate-700 bg-slate-900 shrink-0"
                        loading="lazy"
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <h4 className="text-base font-bold text-white">{member.name}</h4>
                        <span className="text-xs text-indigo-400 font-mono block">
                          {member.position}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => onEditMember(member)}
                      title="Edit this profile"
                      className="p-1.5 text-slate-500 hover:text-slate-200 rounded-md hover:bg-slate-800"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <p className="mt-4 text-xs text-slate-300 leading-relaxed">
                    {member.shortBio}
                  </p>

                  <div className="mt-4">
                    <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block mb-1.5">
                      Core Responsibilities
                    </span>
                    <ul className="space-y-1 text-xs text-slate-300">
                      {member.responsibilities.map((resp, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <span className="w-1 h-1 rounded-full bg-indigo-400 shrink-0" />
                          <span>{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800/80">
                  <span className="text-[10px] font-mono text-slate-400 block mb-1.5">
                    Skills:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {member.skills.map((skill) => (
                      <span
                        key={skill}
                        className="text-[10px] font-mono text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  <div className="mt-3 text-[11px] text-slate-400 flex items-center gap-1.5">
                    <Mail className="w-3 h-3 text-slate-500" />
                    <span>{member.email}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
