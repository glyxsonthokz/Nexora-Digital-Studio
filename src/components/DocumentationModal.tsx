import React from 'react';
import { BookOpen, Terminal, Rocket, Users, ShieldCheck, CheckCircle2, X } from 'lucide-react';

interface DocumentationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DocumentationModal: React.FC<DocumentationModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-md">
      <div className="bg-[#0B1220] border border-slate-700 rounded-2xl max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl p-6 sm:p-8">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-amber-950/80 border border-amber-600/60 flex items-center justify-center text-amber-400">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-mono text-amber-400 font-bold uppercase">
                AGENCY OPERATIONAL HANDBOOK
              </span>
              <h3 className="text-xl font-bold text-white font-sans mt-0.5">
                Setup, Deployment & Five-Member Management Guide
              </h3>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-6 space-y-8 text-xs text-slate-300 leading-relaxed">
          {/* Section 1: Setup Instructions */}
          <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-white font-bold text-sm">
              <Terminal className="w-4 h-4 text-indigo-400" />
              <span>1. Local Development & Setup Instructions</span>
            </div>
            <p className="text-slate-300">
              Nexora Studio runs on a unified full-stack architecture using Vite and Express with TypeScript.
            </p>
            <div className="bg-[#060B14] p-3 rounded-lg font-mono text-[11px] text-indigo-300 border border-slate-800 space-y-1">
              <div># 1. Install all dependencies</div>
              <div>npm install</div>
              <div className="pt-1"># 2. Configure environment file (copy from .env.example)</div>
              <div>cp .env.example .env</div>
              <div className="pt-1"># 3. Start local development server on port 3000</div>
              <div>npm run dev</div>
            </div>
            <p className="text-slate-400 text-[11px]">
              The dev server mounts Vite middlewares on Express at port 3000, serving both frontend React components and backend <code>/api/*</code> endpoints simultaneously.
            </p>
          </div>

          {/* Section 2: Deployment Instructions */}
          <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-white font-bold text-sm">
              <Rocket className="w-4 h-4 text-emerald-400" />
              <span>2. Production Deployment Instructions</span>
            </div>
            <p className="text-slate-300">
              For production deployment to Google Cloud Run, AWS ECS, or any standard Linux/Docker container:
            </p>
            <div className="bg-[#060B14] p-3 rounded-lg font-mono text-[11px] text-emerald-300 border border-slate-800 space-y-1">
              <div># Compile static production bundle into /dist</div>
              <div>npm run build</div>
              <div className="pt-1"># Launch production server with Express static serving</div>
              <div>NODE_ENV=production npm start</div>
            </div>
            <p className="text-slate-400 text-[11px]">
              In production, <code>server.ts</code> serves compressed assets from <code>/dist</code>, provides 404 client-side SPA routing fallback, and handles all dynamic API traffic.
            </p>
          </div>

          {/* Section 3: Five-Member Team Operational Manual */}
          <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex items-center gap-2 text-white font-bold text-sm">
              <Users className="w-4 h-4 text-cyan-400" />
              <span>3. Five-Member Team Operational Management</span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                <strong className="text-indigo-400 block font-mono">
                  MEMBER 1 — CEO & Business Development:
                </strong>
                <p className="text-slate-300 mt-1">
                  Access the Team CMS anytime by clicking "Team CMS" in the top bar. Review incoming leads in the Inquiries tab, update lead statuses (New → Reviewed → Quoted), and adjust baseline package rates as the agency expands.
                </p>
              </div>

              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                <strong className="text-cyan-400 block font-mono">
                  MEMBER 2 — Lead UI/UX Designer:
                </strong>
                <p className="text-slate-300 mt-1">
                  Manage the brand design tokens and demonstration screenshots. Use the Brand Assets guide to ensure typography and colors adhere to the 60-30-10 palette.
                </p>
              </div>

              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                <strong className="text-emerald-400 block font-mono">
                  MEMBER 3 — Senior Frontend Developer:
                </strong>
                <p className="text-slate-300 mt-1">
                  Maintain the component library in <code>/src/components</code>. Ensure all new sections pass accessibility checks (contrast AA, focus rings, zero layout shift) and run <code>npm run lint</code> before commits.
                </p>
              </div>

              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                <strong className="text-amber-400 block font-mono">
                  MEMBER 4 — Backend & Full-Stack Developer:
                </strong>
                <p className="text-slate-300 mt-1">
                  Manage server APIs in <code>server.ts</code>. Handle data persistence, database connections (PostgreSQL or Firestore when provisioned), API security, CORS, and SSL certification.
                </p>
              </div>

              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                <strong className="text-violet-400 block font-mono">
                  MEMBER 5 — Marketing & Client Relations:
                </strong>
                <p className="text-slate-300 mt-1">
                  Update SEO meta tags in <code>index.html</code>, manage the WhatsApp direct contact number via CMS settings, and coordinate client milestones inside the Client Portal.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
