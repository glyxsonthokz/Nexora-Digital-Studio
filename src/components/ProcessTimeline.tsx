import React, { useState } from 'react';
import { processStages } from '../data/initialData';
import { CheckCircle2, Clock, FileText, UserCheck, ChevronRight } from 'lucide-react';

export const ProcessTimeline: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(1);

  const currentStage = processStages.find((s) => s.step === activeStep) || processStages[0];

  return (
    <section id="process" className="py-24 bg-[#060B14]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-mono text-indigo-400 uppercase tracking-wider">
            <span>Engineering Discipline</span>
            <span aria-hidden="true">·</span>
            <span>Seven-Stage Roadmap</span>
          </div>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight text-white font-sans">
            Our Development Process
          </h2>
          <p className="mt-4 text-base text-slate-300 leading-relaxed">
            Every successful website follows a clear, predictable workflow. From first discovery
            to post-launch support, you always know what we are building, when it will be delivered,
            and how your feedback is incorporated.
          </p>
        </div>

        {/* Step Navigation Ribbon */}
        <div className="mt-12 overflow-x-auto pb-4">
          <div className="flex items-center min-w-[700px] border-b border-slate-800">
            {processStages.map((stage) => {
              const isActive = stage.step === activeStep;
              return (
                <button
                  key={stage.step}
                  onClick={() => setActiveStep(stage.step)}
                  className={`flex-1 py-4 px-3 text-left border-b-2 transition-all relative ${
                    isActive
                      ? 'border-indigo-500 text-white bg-slate-900/60'
                      : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/20'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-mono font-bold ${
                        isActive
                          ? 'bg-indigo-600 text-white'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {stage.step}
                    </span>
                    <span className="text-xs font-bold font-sans tracking-tight">
                      {stage.title}
                    </span>
                  </div>
                  <span className="block text-[10px] font-mono text-slate-400 mt-1 pl-8">
                    {stage.duration}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Stage Detailed Breakdown */}
        <div className="mt-8 bg-[#0B1220] border border-slate-800 rounded-2xl p-6 sm:p-10 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left overview */}
            <div className="lg:col-span-7">
              <div className="flex items-center gap-3">
                <span className="px-2.5 py-1 rounded bg-indigo-950/80 border border-indigo-700/60 text-indigo-300 font-mono text-xs font-semibold">
                  Stage 0{currentStage.step} of 07
                </span>
                <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-slate-500" />
                  {currentStage.duration}
                </span>
              </div>

              <h3 className="mt-4 text-2xl font-bold text-white font-sans">
                {currentStage.headline}
              </h3>

              <p className="mt-4 text-sm text-slate-300 leading-relaxed">
                {currentStage.description}
              </p>

              {/* Client Role & Involvement */}
              <div className="mt-6 p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex items-start gap-3">
                <div className="p-2 rounded-lg bg-indigo-950 text-indigo-400 shrink-0">
                  <UserCheck className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-mono text-slate-400 uppercase font-semibold block">
                    What We Need From You
                  </span>
                  <p className="text-xs text-slate-200 mt-0.5">
                    {currentStage.clientInvolvement}
                  </p>
                </div>
              </div>
            </div>

            {/* Right Deliverables list */}
            <div className="lg:col-span-5 bg-slate-900/60 border border-slate-800 p-6 rounded-xl">
              <div className="flex items-center gap-2 text-xs font-mono text-slate-400 uppercase tracking-wider mb-4">
                <FileText className="w-4 h-4 text-indigo-400" />
                <span>Tangible Deliverables</span>
              </div>

              <ul className="space-y-3">
                {currentStage.keyDeliverables.map((deliv, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-xs text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{deliv}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs">
                <button
                  onClick={() => setActiveStep(activeStep > 1 ? activeStep - 1 : 7)}
                  className="text-slate-400 hover:text-white"
                >
                  ← Previous Stage
                </button>
                <button
                  onClick={() => setActiveStep(activeStep < 7 ? activeStep + 1 : 1)}
                  className="text-indigo-400 hover:text-indigo-300 font-medium flex items-center gap-1"
                >
                  <span>Next Stage</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
