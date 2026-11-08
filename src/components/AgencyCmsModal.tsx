import React, { useState, useEffect } from 'react';
import { AgencySettings, ContactSubmission, TeamMember } from '../types';
import { ShieldCheck, Mail, Phone, DollarSign, Users, MessageSquare, BookOpen, Save, RefreshCw, X, CheckCircle2 } from 'lucide-react';

interface AgencyCmsModalProps {
  isOpen: boolean;
  onClose: () => void;
  agencySettings: AgencySettings;
  onSaveSettings: (settings: AgencySettings) => void;
  teamMembers: TeamMember[];
  onSaveTeamMembers: (members: TeamMember[]) => void;
}

export const AgencyCmsModal: React.FC<AgencyCmsModalProps> = ({
  isOpen,
  onClose,
  agencySettings,
  onSaveSettings,
  teamMembers,
  onSaveTeamMembers,
}) => {
  const [activeTab, setActiveTab] = useState<'inquiries' | 'pricing' | 'team' | 'settings' | 'handbook'>('inquiries');

  // Inquiries from backend
  const [inquiries, setInquiries] = useState<ContactSubmission[]>([]);
  const [loadingInquiries, setLoadingInquiries] = useState(false);

  // Editable settings copy
  const [localSettings, setLocalSettings] = useState<AgencySettings>(agencySettings);
  // Editable team members copy
  const [localTeam, setLocalTeam] = useState<TeamMember[]>(teamMembers);
  const [saveSuccess, setSaveSuccess] = useState<string | null>(null);

  // Fetch inquiries from server
  const loadInquiries = async () => {
    setLoadingInquiries(true);
    try {
      const res = await fetch('/api/inquiries');
      const data = await res.json();
      if (data.success && data.inquiries) {
        setInquiries(data.inquiries);
      }
    } catch (err) {
      console.error('Failed to load inquiries:', err);
    } finally {
      setLoadingInquiries(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      loadInquiries();
      setLocalSettings(agencySettings);
      setLocalTeam(teamMembers);
    }
  }, [isOpen, agencySettings, teamMembers]);

  const handleUpdateInquiryStatus = async (id: string, newStatus: any) => {
    try {
      const res = await fetch(`/api/inquiries/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setInquiries((prev) =>
          prev.map((inq) => (inq.id === id ? { ...inq, status: newStatus } : inq))
        );
      }
    } catch (err) {
      console.error('Failed to update status', err);
    }
  };

  const handleSaveSettings = async () => {
    try {
      const res = await fetch('/api/agency/config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(localSettings),
      });
      if (res.ok) {
        onSaveSettings(localSettings);
        setSaveSuccess('Agency configurations saved successfully!');
        setTimeout(() => setSaveSuccess(null), 3000);
      }
    } catch (err) {
      console.error('Failed to save settings', err);
    }
  };

  const handleSaveTeam = () => {
    onSaveTeamMembers(localTeam);
    setSaveSuccess('Team member details updated live across website!');
    setTimeout(() => setSaveSuccess(null), 3000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-md">
      <div className="bg-[#0B1220] border border-slate-700 rounded-2xl max-w-5xl w-full max-h-[92vh] overflow-y-auto shadow-2xl flex flex-col">
        {/* Top Header */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-950/80 border border-emerald-600/60 flex items-center justify-center text-emerald-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
                <span>NEXORA INTERNAL STUDIO CMS</span>
                <span aria-hidden="true">·</span>
                <span>Five-Member Administration</span>
              </div>
              <h3 className="text-xl font-bold text-white font-sans">
                Agency Operations & Content Management
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="bg-slate-900/80 px-6 py-2 border-b border-slate-800 flex flex-wrap gap-2 text-xs font-medium">
          <button
            onClick={() => setActiveTab('inquiries')}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors ${
              activeTab === 'inquiries'
                ? 'bg-emerald-600 text-white'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Client Inquiries ({inquiries.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('pricing')}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors ${
              activeTab === 'pricing'
                ? 'bg-emerald-600 text-white'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <DollarSign className="w-3.5 h-3.5" />
            <span>Package Pricing Editor</span>
          </button>

          <button
            onClick={() => setActiveTab('team')}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors ${
              activeTab === 'team'
                ? 'bg-emerald-600 text-white'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Five Member Profiles</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors ${
              activeTab === 'settings'
                ? 'bg-emerald-600 text-white'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Channels & WhatsApp</span>
          </button>

          <button
            onClick={() => setActiveTab('handbook')}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors ${
              activeTab === 'handbook'
                ? 'bg-emerald-600 text-white'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Team Operating Guide</span>
          </button>
        </div>

        {/* Feedback alert */}
        {saveSuccess && (
          <div className="mx-6 mt-4 p-3 rounded-lg bg-emerald-950/80 border border-emerald-800 text-emerald-300 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{saveSuccess}</span>
          </div>
        )}

        {/* Tab Content Body */}
        <div className="p-6 sm:p-8 flex-1">
          {/* TAB 1: INQUIRIES */}
          {activeTab === 'inquiries' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div>
                  <h4 className="text-base font-bold text-white">
                    Incoming Inquiries (Connected Database)
                  </h4>
                  <p className="text-xs text-slate-400">
                    Real submissions stored by the server API route `/api/inquiries`.
                  </p>
                </div>
                <button
                  onClick={loadInquiries}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs flex items-center gap-1.5"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${loadingInquiries ? 'animate-spin' : ''}`} />
                  <span>Refresh List</span>
                </button>
              </div>

              {inquiries.length === 0 ? (
                <div className="py-12 text-center text-xs text-slate-400">
                  No inquiries logged yet. Submissions from the contact form will appear here.
                </div>
              ) : (
                <div className="space-y-4">
                  {inquiries.map((inq) => (
                    <div
                      key={inq.id}
                      className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs space-y-3"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div>
                          <span className="font-mono text-emerald-400 font-bold mr-2">
                            #{inq.id}
                          </span>
                          <span className="text-white font-bold text-sm">
                            {inq.fullName}
                          </span>
                          <span className="text-slate-400 ml-2">
                            ({inq.companyName})
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-mono text-slate-500">
                            Status:
                          </span>
                          <select
                            value={inq.status}
                            onChange={(e) =>
                              handleUpdateInquiryStatus(inq.id, e.target.value)
                            }
                            className="bg-slate-950 border border-slate-700 text-white px-2 py-1 rounded text-xs focus:outline-none"
                          >
                            <option value="new">New Inquiry</option>
                            <option value="reviewed">Reviewed by Leads</option>
                            <option value="quoted">Quoted / In Discussion</option>
                            <option value="contacted">Closed / Active Project</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-slate-400 text-[11px] pt-2 border-t border-slate-800/80">
                        <div>
                          <span className="text-slate-500 block">Service:</span>
                          <span className="text-slate-200">{inq.websiteType}</span>
                        </div>
                        <div>
                          <span className="text-slate-500 block">Budget:</span>
                          <span className="text-slate-200">{inq.estimatedBudget}</span>
                        </div>
                        <div>
                          <span className="text-slate-500 block">Contact Method:</span>
                          <span className="text-slate-200">{inq.preferredContact} ({inq.email})</span>
                        </div>
                        <div>
                          <span className="text-slate-500 block">Phone:</span>
                          <span className="text-slate-200">{inq.phone}</span>
                        </div>
                      </div>

                      <div className="p-3 rounded-lg bg-slate-950 border border-slate-800/80 text-slate-300 text-xs">
                        <span className="text-[10px] font-mono text-slate-500 uppercase block mb-1">
                          Client Description:
                        </span>
                        {inq.projectDescription}
                      </div>

                      {inq.internalNotes && (
                        <div className="text-[11px] text-amber-300 font-mono">
                          Internal Note: {inq.internalNotes}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: PRICING EDITOR */}
          {activeTab === 'pricing' && (
            <div className="space-y-6 max-w-xl">
              <div>
                <h4 className="text-base font-bold text-white">
                  Dynamic Package Starting Rates
                </h4>
                <p className="text-xs text-slate-400">
                  Update these figures to reflect currency shifts or expansion into new markets.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">
                    Starter Package Starting Price
                  </label>
                  <input
                    type="text"
                    value={localSettings.starterStartingPrice}
                    onChange={(e) =>
                      setLocalSettings({ ...localSettings, starterStartingPrice: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded bg-slate-950 border border-slate-700 text-white text-xs font-mono focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">
                    Business Package Starting Price
                  </label>
                  <input
                    type="text"
                    value={localSettings.businessStartingPrice}
                    onChange={(e) =>
                      setLocalSettings({ ...localSettings, businessStartingPrice: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded bg-slate-950 border border-slate-700 text-white text-xs font-mono focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">
                    Enterprise Package Starting Price
                  </label>
                  <input
                    type="text"
                    value={localSettings.enterpriseStartingPrice}
                    onChange={(e) =>
                      setLocalSettings({ ...localSettings, enterpriseStartingPrice: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded bg-slate-950 border border-slate-700 text-white text-xs font-mono focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <button
                onClick={handleSaveSettings}
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Pricing Changes</span>
              </button>
            </div>
          )}

          {/* TAB 3: TEAM MEMBERS EDITOR */}
          {activeTab === 'team' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div>
                  <h4 className="text-base font-bold text-white">
                    Five Founding Member Profiles
                  </h4>
                  <p className="text-xs text-slate-400">
                    Edit names, titles, bios, and skills for the five core agency positions.
                  </p>
                </div>
                <button
                  onClick={handleSaveTeam}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Team Updates</span>
                </button>
              </div>

              <div className="space-y-6">
                {localTeam.map((member, index) => (
                  <div
                    key={member.id}
                    className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-3"
                  >
                    <span className="text-xs font-mono text-indigo-400 font-bold uppercase">
                      Member {index + 1} — {member.roleCode} Responsibility
                    </span>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-[11px] text-slate-400 mb-1">
                          Full Name
                        </label>
                        <input
                          type="text"
                          value={member.name}
                          onChange={(e) => {
                            const updated = [...localTeam];
                            updated[index].name = e.target.value;
                            setLocalTeam(updated);
                          }}
                          className="w-full px-2.5 py-1.5 rounded bg-slate-950 border border-slate-700 text-white text-xs"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] text-slate-400 mb-1">
                          Position / Title
                        </label>
                        <input
                          type="text"
                          value={member.position}
                          onChange={(e) => {
                            const updated = [...localTeam];
                            updated[index].position = e.target.value;
                            setLocalTeam(updated);
                          }}
                          className="w-full px-2.5 py-1.5 rounded bg-slate-950 border border-slate-700 text-white text-xs"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] text-slate-400 mb-1">
                          Email Address
                        </label>
                        <input
                          type="text"
                          value={member.email}
                          onChange={(e) => {
                            const updated = [...localTeam];
                            updated[index].email = e.target.value;
                            setLocalTeam(updated);
                          }}
                          className="w-full px-2.5 py-1.5 rounded bg-slate-950 border border-slate-700 text-white text-xs"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] text-slate-400 mb-1">
                        Short Biography
                      </label>
                      <textarea
                        rows={2}
                        value={member.shortBio}
                        onChange={(e) => {
                          const updated = [...localTeam];
                          updated[index].shortBio = e.target.value;
                          setLocalTeam(updated);
                        }}
                        className="w-full px-2.5 py-1.5 rounded bg-slate-950 border border-slate-700 text-white text-xs"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: CHANNELS & SETTINGS */}
          {activeTab === 'settings' && (
            <div className="space-y-6 max-w-xl">
              <div>
                <h4 className="text-base font-bold text-white">
                  Agency Communication Channels
                </h4>
                <p className="text-xs text-slate-400">
                  Configure WhatsApp direct number, official email, and phone display.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">
                    WhatsApp Clean Number (Digits only with country code)
                  </label>
                  <input
                    type="text"
                    value={localSettings.whatsappNumber}
                    onChange={(e) =>
                      setLocalSettings({ ...localSettings, whatsappNumber: e.target.value })
                    }
                    placeholder="18005550199"
                    className="w-full px-3 py-2 rounded bg-slate-950 border border-slate-700 text-white text-xs font-mono"
                  />
                  <span className="text-[10px] text-slate-500 font-mono mt-0.5 block">
                    Used to generate direct WhatsApp chat links.
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">
                    WhatsApp Display Text
                  </label>
                  <input
                    type="text"
                    value={localSettings.whatsappDisplay}
                    onChange={(e) =>
                      setLocalSettings({ ...localSettings, whatsappDisplay: e.target.value })
                    }
                    placeholder="+1 (800) 555-0199"
                    className="w-full px-3 py-2 rounded bg-slate-950 border border-slate-700 text-white text-xs font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">
                    Official Business Email
                  </label>
                  <input
                    type="email"
                    value={localSettings.businessEmail}
                    onChange={(e) =>
                      setLocalSettings({ ...localSettings, businessEmail: e.target.value })
                    }
                    placeholder="contact@nexoradigital.studio"
                    className="w-full px-3 py-2 rounded bg-slate-950 border border-slate-700 text-white text-xs font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">
                    Studio Location Hubs
                  </label>
                  <input
                    type="text"
                    value={localSettings.headquarters}
                    onChange={(e) =>
                      setLocalSettings({ ...localSettings, headquarters: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded bg-slate-950 border border-slate-700 text-white text-xs"
                  />
                </div>
              </div>

              <button
                onClick={handleSaveSettings}
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Communication Channels</span>
              </button>
            </div>
          )}

          {/* TAB 5: TEAM HANDBOOK & DOCUMENTATION */}
          {activeTab === 'handbook' && (
            <div className="space-y-6 text-sm text-slate-300 max-w-3xl leading-relaxed">
              <div className="pb-4 border-b border-slate-800">
                <span className="text-xs font-mono text-indigo-400 font-bold uppercase">
                  NEXORA FIVE-MEMBER TEAM OPERATIONAL MANUAL
                </span>
                <h4 className="text-xl font-bold text-white mt-1">
                  How Our Team Manages & Scales The Website
                </h4>
              </div>

              <div className="space-y-4 text-xs">
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                  <h5 className="font-bold text-white font-mono text-xs uppercase mb-1">
                    1. Role Allocation & Inbound Lead Workflow
                  </h5>
                  <p className="text-slate-300">
                    <strong>MEMBER 1 (CEO / Business Dev):</strong> Receives new notifications from the `/api/inquiries` endpoint. Contacts prospective client within 24 business hours to book the 60-min discovery session.
                  </p>
                  <p className="mt-1 text-slate-300">
                    <strong>MEMBER 2 (Lead UI/UX):</strong> Takes approved scope and begins Figma wireframes & interactive prototypes.
                  </p>
                  <p className="mt-1 text-slate-300">
                    <strong>MEMBER 3 (Frontend):</strong> Implements responsive components in React / TypeScript with zero layout shift.
                  </p>
                  <p className="mt-1 text-slate-300">
                    <strong>MEMBER 4 (Backend):</strong> Configures persistent databases, authentication, payment gateways, and APIs.
                  </p>
                  <p className="mt-1 text-slate-300">
                    <strong>MEMBER 5 (Marketing & Client Relations):</strong> Coordinates weekly milestone reviews and updates client in the Client Portal.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                  <h5 className="font-bold text-white font-mono text-xs uppercase mb-1">
                    2. Updating Content & Expanding Into New Markets
                  </h5>
                  <p className="text-slate-300">
                    Use this CMS modal anytime to adjust package price thresholds, update team bios, change contact details, or review inbound inquiries without touching raw server code.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                  <h5 className="font-bold text-white font-mono text-xs uppercase mb-1">
                    3. Production Deployment & Continuous Integration
                  </h5>
                  <p className="text-slate-300">
                    Build is verified using <code>npm run build</code>. The backend server runs via <code>server.ts</code> delivering both static assets and API endpoints with zero cold start latency.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
