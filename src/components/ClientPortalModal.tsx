import React, { useState, useEffect } from 'react';
import { ClientProjectAccount, ClientFeedback } from '../types';
import { Lock, CheckCircle2, Clock, FileText, Send, DollarSign, MessageSquare, AlertCircle, X } from 'lucide-react';

interface ClientPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ClientPortalModal: React.FC<ClientPortalModalProps> = ({ isOpen, onClose }) => {
  const [projectCodeInput, setProjectCodeInput] = useState('NEX-AURELIA');
  const [clientProject, setClientProject] = useState<ClientProjectAccount | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // New feedback state
  const [feedbackSubject, setFeedbackSubject] = useState('');
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [feedbackSuccess, setFeedbackSuccess] = useState(false);

  // Load project by code
  const fetchProject = async (code: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/client/project/${encodeURIComponent(code.trim())}`);
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Project not found. Please verify your client code.');
      }
      setClientProject(data.project);
    } catch (err: any) {
      setError(err.message || 'Unable to connect to client portal server.');
      setClientProject(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchProject('NEX-AURELIA');
    }
  }, [isOpen]);

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedbackMessage.trim() || !clientProject) return;

    const newFeedback: ClientFeedback = {
      id: `fb-${Date.now()}`,
      author: clientProject.clientName,
      timestamp: 'Just now',
      subject: feedbackSubject.trim() || 'General Feedback',
      message: feedbackMessage.trim(),
      status: 'Received',
    };

    setClientProject({
      ...clientProject,
      feedbackList: [newFeedback, ...clientProject.feedbackList],
    });

    setFeedbackSubject('');
    setFeedbackMessage('');
    setFeedbackSuccess(true);
    setTimeout(() => setFeedbackSuccess(false), 4000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-md">
      <div className="bg-[#0B1220] border border-slate-700 rounded-2xl max-w-5xl w-full max-h-[92vh] overflow-y-auto shadow-2xl flex flex-col">
        {/* Top Header */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-indigo-950/80 border border-indigo-600/60 flex items-center justify-center text-indigo-400">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-indigo-400">
                <span>NEXORA CLIENT PORTAL</span>
                <span aria-hidden="true">·</span>
                <span>Active Engagement Dashboard</span>
              </div>
              <h3 className="text-xl font-bold text-white font-sans">
                Real-Time Project Governance
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

        {/* Project Code Switcher / Login Bar */}
        <div className="bg-slate-900/80 px-6 py-3 border-b border-slate-800 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-slate-400">Project Code:</span>
            <input
              type="text"
              value={projectCodeInput}
              onChange={(e) => setProjectCodeInput(e.target.value)}
              placeholder="e.g. NEX-AURELIA"
              className="px-3 py-1 text-xs rounded bg-slate-950 border border-slate-700 text-white font-mono uppercase focus:outline-none focus:border-indigo-500"
            />
            <button
              onClick={() => fetchProject(projectCodeInput)}
              className="px-3 py-1 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium rounded"
            >
              Verify Code
            </button>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
            <span>Quick Sample Projects:</span>
            <button
              onClick={() => {
                setProjectCodeInput('NEX-AURELIA');
                fetchProject('NEX-AURELIA');
              }}
              className="text-indigo-400 hover:underline"
            >
              NEX-AURELIA (E-Comm)
            </button>
            <span aria-hidden="true">·</span>
            <button
              onClick={() => {
                setProjectCodeInput('NEX-DEMO');
                fetchProject('NEX-DEMO');
              }}
              className="text-indigo-400 hover:underline"
            >
              NEX-DEMO (Starter)
            </button>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-6 sm:p-8 space-y-8 flex-1">
          {error && (
            <div className="p-4 rounded-xl bg-rose-950/80 border border-rose-800 text-rose-300 text-xs flex items-center gap-3">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {loading ? (
            <div className="py-20 text-center text-xs text-slate-400 font-mono">
              Loading client workspace parameters...
            </div>
          ) : clientProject ? (
            <>
              {/* Project Overview Card */}
              <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <span className="text-xs font-mono text-indigo-400 font-semibold block">
                      {clientProject.packageType}
                    </span>
                    <h4 className="text-2xl font-bold text-white mt-1">
                      {clientProject.companyName}
                    </h4>
                    <span className="text-xs text-slate-400">
                      Client Contact: <strong className="text-slate-200">{clientProject.clientName}</strong> · Lead Architects: <strong className="text-slate-200">{clientProject.leadArchitect}</strong>
                    </span>
                  </div>

                  <div className="text-left md:text-right">
                    <span className="text-xs font-mono text-slate-400 block">
                      Target Launch Window
                    </span>
                    <span className="text-base font-bold text-white font-mono mt-0.5 block">
                      {clientProject.targetLaunch}
                    </span>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="mt-6 pt-6 border-t border-slate-800">
                  <div className="flex items-center justify-between text-xs font-mono mb-2">
                    <span className="text-slate-400">Overall Milestone Progression:</span>
                    <span className="text-white font-bold">{clientProject.overallProgress}% Complete</span>
                  </div>
                  <div className="w-full h-3 rounded-full bg-slate-950 overflow-hidden border border-slate-800">
                    <div
                      className="h-full bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-400 transition-all duration-500"
                      style={{ width: `${clientProject.overallProgress}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* 2-Column: Milestones vs Documents & Invoices */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Milestones Timeline */}
                <div className="lg:col-span-7 bg-slate-900/40 border border-slate-800 rounded-xl p-6">
                  <h5 className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-4 font-semibold">
                    Project Milestones & Deliverable Schedule
                  </h5>

                  <div className="space-y-4">
                    {clientProject.milestones.map((m, idx) => (
                      <div
                        key={idx}
                        className={`p-3.5 rounded-lg border text-xs ${
                          m.status === 'completed'
                            ? 'bg-slate-900/80 border-slate-800 text-slate-300'
                            : m.status === 'current'
                            ? 'bg-indigo-950/40 border-indigo-500/80 text-white shadow-sm'
                            : 'bg-slate-950/40 border-slate-800/60 text-slate-500'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            {m.status === 'completed' ? (
                              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                            ) : m.status === 'current' ? (
                              <Clock className="w-4 h-4 text-indigo-400 shrink-0 animate-pulse" />
                            ) : (
                              <span className="w-4 h-4 rounded-full border border-slate-600 shrink-0 flex items-center justify-center text-[10px]">
                                {idx + 1}
                              </span>
                            )}
                            <span className="font-semibold">{m.title}</span>
                          </div>
                          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
                            {m.status === 'completed'
                              ? `Completed ${m.completionDate}`
                              : m.status === 'current'
                              ? 'Active Stage'
                              : 'Pending'}
                          </span>
                        </div>
                        <p className="mt-1.5 pl-6 text-[11px] text-slate-400 leading-snug">
                          {m.details}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Documents & Invoices */}
                <div className="lg:col-span-5 space-y-6">
                  {/* Project Documents */}
                  <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-6">
                    <h5 className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-4 font-semibold flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5 text-indigo-400" />
                      <span>Project Assets & Documentation</span>
                    </h5>
                    <div className="space-y-2 text-xs">
                      {clientProject.documents.map((doc) => (
                        <div
                          key={doc.id}
                          className="p-2.5 rounded bg-slate-950 border border-slate-800 flex items-center justify-between"
                        >
                          <div>
                            <span className="font-medium text-slate-200 block truncate max-w-[180px]">
                              {doc.title}
                            </span>
                            <span className="text-[10px] font-mono text-slate-500">
                              {doc.fileSize} · {doc.updatedAt}
                            </span>
                          </div>
                          <button
                            onClick={() => alert(`Simulating secure download for ${doc.title}`)}
                            className="px-2 py-1 text-[11px] bg-slate-800 hover:bg-slate-700 text-indigo-300 rounded"
                          >
                            Download
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Invoices */}
                  <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-6">
                    <h5 className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-4 font-semibold flex items-center gap-1.5">
                      <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Milestone Invoices</span>
                    </h5>
                    <div className="space-y-2 text-xs">
                      {clientProject.invoices.map((inv) => (
                        <div
                          key={inv.invoiceNo}
                          className="p-2.5 rounded bg-slate-950 border border-slate-800 flex items-center justify-between"
                        >
                          <div>
                            <span className="font-mono text-white font-semibold">
                              {inv.invoiceNo}
                            </span>
                            <span className="text-[10px] text-slate-400 block font-mono">
                              {inv.amount} · {inv.dueDate}
                            </span>
                          </div>
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-mono ${
                              inv.status === 'Paid'
                                ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                                : 'bg-amber-950 text-amber-300 border border-amber-800'
                            }`}
                          >
                            {inv.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Feedback & Revision Request Form */}
              <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-6">
                <h5 className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2 font-semibold flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Submit Design Feedback or Revision Request</span>
                </h5>
                <p className="text-xs text-slate-400 mb-4">
                  Messages submitted here are routed directly to Elena (Lead UI/UX) and Marcus (Frontend Lead).
                </p>

                {feedbackSuccess && (
                  <div className="p-3 rounded-lg bg-emerald-950/80 border border-emerald-800 text-emerald-300 text-xs mb-4">
                    Feedback received! Our engineering leads will review this within 12 business hours.
                  </div>
                )}

                <form onSubmit={handleFeedbackSubmit} className="space-y-3">
                  <input
                    type="text"
                    value={feedbackSubject}
                    onChange={(e) => setFeedbackSubject(e.target.value)}
                    placeholder="Subject (e.g. Navigation bar hover transition or Mobile cart layout)"
                    className="w-full px-3 py-2 text-xs rounded bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-indigo-500"
                  />
                  <textarea
                    rows={3}
                    required
                    value={feedbackMessage}
                    onChange={(e) => setFeedbackMessage(e.target.value)}
                    placeholder="Describe specific changes or observations..."
                    className="w-full px-3 py-2 text-xs rounded bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-indigo-500"
                  />
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5"
                    >
                      <Send className="w-3 h-3" />
                      <span>Transmit Revision Request</span>
                    </button>
                  </div>
                </form>

                {/* Prior feedback items */}
                {clientProject.feedbackList.length > 0 && (
                  <div className="mt-6 pt-4 border-t border-slate-800/80 space-y-2">
                    <span className="text-[10px] font-mono text-slate-500 uppercase block">
                      Communication History
                    </span>
                    {clientProject.feedbackList.map((fb) => (
                      <div key={fb.id} className="p-2.5 rounded bg-slate-950/60 border border-slate-800/80 text-xs">
                        <div className="flex justify-between items-center text-[10px] text-slate-400">
                          <span className="font-semibold text-slate-200">{fb.subject}</span>
                          <span className="font-mono text-indigo-400">{fb.status}</span>
                        </div>
                        <p className="mt-1 text-slate-300 text-[11px]">{fb.message}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
};
