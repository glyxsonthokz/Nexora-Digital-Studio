import React, { useState, useEffect } from 'react';
import { AgencySettings, ContactSubmission } from '../types';
import { MessageSquare, Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle, ArrowUpRight } from 'lucide-react';

interface ContactSectionProps {
  agencySettings: AgencySettings;
  prefillData?: {
    service?: string;
    packageTier?: string;
  };
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  agencySettings,
  prefillData,
}) => {
  const [fullName, setFullName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [businessType, setBusinessType] = useState('Small and medium business');
  const [websiteType, setWebsiteType] = useState('Business Website Development');
  const [estimatedBudget, setEstimatedBudget] = useState('$2,000 – $5,000');
  const [projectDescription, setProjectDescription] = useState('');
  const [preferredContact, setPreferredContact] = useState<'Email' | 'Phone' | 'WhatsApp'>('Email');

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [submittedInquiry, setSubmittedInquiry] = useState<ContactSubmission | null>(null);

  // Apply pre-fill when triggered from services or pricing cards
  useEffect(() => {
    if (prefillData?.service) {
      setWebsiteType(prefillData.service);
      setProjectDescription((prev) =>
        prev
          ? prev
          : `We are interested in discussing the ${prefillData.service} service for our brand.`
      );
    }
    if (prefillData?.packageTier) {
      setProjectDescription((prev) =>
        prev
          ? prev
          : `We would like to explore the ${prefillData.packageTier} package for our upcoming project.`
      );
    }
  }, [prefillData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Validation
    if (!fullName.trim()) {
      setErrorMessage('Please provide your full name.');
      return;
    }
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErrorMessage('Please provide a valid business email address.');
      return;
    }
    if (!projectDescription.trim() || projectDescription.trim().length < 15) {
      setErrorMessage('Please provide a brief description of your project goals (at least 15 characters).');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName,
          companyName,
          email,
          phone,
          businessType,
          websiteType,
          estimatedBudget,
          projectDescription,
          preferredContact,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to submit inquiry. Please try again.');
      }

      setSubmittedInquiry(data.inquiry);
    } catch (err: any) {
      setErrorMessage(err.message || 'An error occurred while connecting to the backend server.');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setSubmittedInquiry(null);
    setFullName('');
    setCompanyName('');
    setEmail('');
    setPhone('');
    setProjectDescription('');
  };

  const whatsappUrl = `https://wa.me/${agencySettings.whatsappNumber}?text=${encodeURIComponent(
    `Hello Nexora Studio, I would like to schedule a discovery conversation regarding a new website project.`
  )}`;

  return (
    <section id="contact" className="py-24 bg-[#060B14]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Agency Contact Information & Channels */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-indigo-400 uppercase tracking-wider">
                <span>Start Your Project</span>
                <span aria-hidden="true">·</span>
                <span>Direct Founding Partner Consultation</span>
              </div>
              <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight text-white font-sans">
                Let’s Build Something Exceptional Together.
              </h2>
              <p className="mt-4 text-sm text-slate-300 leading-relaxed">
                Submit your project parameters below. Julian (CEO) and our technical leads
                will examine your requirements and respond within 24 business hours with
                a structured technical evaluation and scheduling options.
              </p>
            </div>

            {/* Direct Contact Channels */}
            <div className="space-y-4 pt-4 border-t border-slate-800">
              {/* WhatsApp Quick Direct Message */}
              <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-emerald-600/50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-emerald-950/80 border border-emerald-600/60 flex items-center justify-center text-emerald-400 shrink-0">
                      <MessageSquare className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs font-mono text-slate-400 block">
                        Direct WhatsApp Channel
                      </span>
                      <span className="text-sm font-bold text-white font-mono">
                        {agencySettings.whatsappDisplay}
                      </span>
                    </div>
                  </div>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-medium flex items-center gap-1 transition-colors"
                  >
                    <span>Chat</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-indigo-950/80 border border-indigo-700/60 flex items-center justify-center text-indigo-400 shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-mono text-slate-400 block">Official Inquiries</span>
                  <a
                    href={`mailto:${agencySettings.businessEmail}`}
                    className="text-sm font-semibold text-slate-100 hover:text-white"
                  >
                    {agencySettings.businessEmail}
                  </a>
                </div>
              </div>

              {/* Direct Phone */}
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-950/80 border border-blue-700/60 flex items-center justify-center text-blue-400 shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-mono text-slate-400 block">Direct Line</span>
                  <span className="text-sm font-semibold text-slate-100 font-mono">
                    {agencySettings.directPhone}
                  </span>
                </div>
              </div>

              {/* Studio Locations */}
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-mono text-slate-400 block">Operating Hubs</span>
                  <span className="text-xs text-slate-200">
                    {agencySettings.headquarters}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Functional Inquiry Form */}
          <div className="lg:col-span-7 bg-[#0B1220] border border-slate-800 rounded-2xl p-6 sm:p-10 shadow-2xl">
            {submittedInquiry ? (
              /* Submission Confirmation State */
              <div className="space-y-6 text-center py-6">
                <div className="w-16 h-16 rounded-full bg-emerald-950/80 border-2 border-emerald-500/80 flex items-center justify-center text-emerald-400 mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-white font-sans">
                    Project Inquiry Successfully Logged
                  </h3>
                  <p className="mt-2 text-xs font-mono text-indigo-400">
                    Reference ID: #{submittedInquiry.id}
                  </p>
                  <p className="mt-3 text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                    Thank you, {submittedInquiry.fullName}. Your request for{' '}
                    <strong className="text-white">{submittedInquiry.companyName}</strong> has
                    been securely recorded in our studio database.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-left text-xs text-slate-300 max-w-md mx-auto space-y-2">
                  <div className="flex justify-between border-b border-slate-800 pb-1.5">
                    <span className="text-slate-400">Website Type:</span>
                    <span className="text-white font-medium">{submittedInquiry.websiteType}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800 pb-1.5">
                    <span className="text-slate-400">Budget Range:</span>
                    <span className="text-white font-medium">{submittedInquiry.estimatedBudget}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800 pb-1.5">
                    <span className="text-slate-400">Preferred Channel:</span>
                    <span className="text-white font-medium">{submittedInquiry.preferredContact}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Next Step:</span>
                    <span className="text-emerald-400 font-medium">Founding Partner Review</span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                  <a
                    href={`https://wa.me/${agencySettings.whatsappNumber}?text=${encodeURIComponent(
                      `Hello Nexora Studio, I just submitted project inquiry #${submittedInquiry.id} for ${submittedInquiry.companyName}.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Open in WhatsApp</span>
                  </a>

                  <button
                    onClick={resetForm}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-medium"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              </div>
            ) : (
              /* Active Form */
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <h3 className="text-xl font-bold text-white font-sans">
                    Project Parameters Form
                  </h3>
                  <p className="mt-1 text-xs text-slate-400">
                    Complete the details below to receive a bespoke technical proposal.
                  </p>
                </div>

                {errorMessage && (
                  <div className="p-3.5 rounded-lg bg-rose-950/80 border border-rose-800 text-rose-300 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* 2-Column Name & Company */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Full Name <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Eleanor Vance"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-indigo-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Company / Organization Name
                    </label>
                    <input
                      type="text"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      placeholder="e.g. Vance & Partners"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-indigo-500 transition-colors"
                    />
                  </div>
                </div>

                {/* 2-Column Email & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Work Email Address <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="eleanor@vancepartners.com"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-indigo-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Phone Number (with Country Code)
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+1 (555) 012-3456"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-indigo-500 transition-colors"
                    />
                  </div>
                </div>

                {/* Business Type & Website Type Required */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Business Type / Industry
                    </label>
                    <select
                      value={businessType}
                      onChange={(e) => setBusinessType(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-indigo-500"
                    >
                      <option value="Retail shop or local store">Retail shop / Local store</option>
                      <option value="Restaurant, café or hotel">Restaurant, café or hotel</option>
                      <option value="Clothing and fashion brand">Clothing & fashion brand</option>
                      <option value="Small and medium business">Small & medium business (SMB)</option>
                      <option value="Startup or entrepreneur">Startup / Entrepreneur</option>
                      <option value="Corporate company">Corporate company</option>
                      <option value="Large enterprise">Large business / Enterprise</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Website Type Required
                    </label>
                    <select
                      value={websiteType}
                      onChange={(e) => setWebsiteType(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-indigo-500"
                    >
                      <option value="Business Website Development">Business Website Development</option>
                      <option value="E-commerce Website Development">E-commerce Website Development</option>
                      <option value="Restaurant and Café Websites">Restaurant & Café Websites</option>
                      <option value="Portfolio and Personal Websites">Portfolio & Personal Websites</option>
                      <option value="Corporate Websites">Corporate Websites</option>
                      <option value="Landing Page Development">Landing Page Development</option>
                      <option value="Website Redesign">Website Redesign</option>
                      <option value="Website Maintenance">Website Maintenance</option>
                      <option value="Website Optimization">Website Optimization & Speed</option>
                      <option value="Custom Web Applications">Custom Web Applications</option>
                    </select>
                  </div>
                </div>

                {/* Estimated Budget & Preferred Contact Method */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Estimated Project Budget
                    </label>
                    <select
                      value={estimatedBudget}
                      onChange={(e) => setEstimatedBudget(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-indigo-500"
                    >
                      <option value="Under $2,000 (Starter scope)">Under $2,000 (Starter Scope)</option>
                      <option value="$2,000 – $5,000 (Business foundation)">$2,000 – $5,000 (Business Foundation)</option>
                      <option value="$5,000 – $10,000 (Comprehensive web app / e-comm)">$5,000 – $10,000 (Full-Stack / Store)</option>
                      <option value="$10,000+ (Custom Enterprise)">$10,000+ (Enterprise Architecture)</option>
                      <option value="Need Consultation to Determine">Need Consultation to Determine</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Preferred Contact Channel
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {(['Email', 'Phone', 'WhatsApp'] as const).map((method) => (
                        <button
                          key={method}
                          type="button"
                          onClick={() => setPreferredContact(method)}
                          className={`py-2 px-2 text-xs font-medium rounded-lg border text-center transition-colors ${
                            preferredContact === method
                              ? 'bg-indigo-600 text-white border-indigo-500'
                              : 'bg-slate-900 text-slate-400 border-slate-700 hover:text-white'
                          }`}
                        >
                          {method}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Project Description */}
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    Project Description & Goals <span className="text-rose-400">*</span>
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={projectDescription}
                    onChange={(e) => setProjectDescription(e.target.value)}
                    placeholder="Tell us about your brand, what your current website lacks, specific features you require (e.g. online booking, payment gateway, CMS), and your desired launch timeline."
                    className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-indigo-500 transition-colors"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 px-6 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30 transition-all disabled:opacity-50"
                >
                  {loading ? (
                    <span>Submitting Inquiry to Studio Database...</span>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>Transmit Project Parameters to Studio</span>
                    </>
                  )}
                </button>

                <p className="text-[11px] text-slate-500 text-center font-mono">
                  Guaranteed confidentiality · No obligation · 24hr response
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
