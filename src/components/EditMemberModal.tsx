import React, { useState, useEffect } from 'react';
import { TeamMember } from '../types';
import { X, Save, Edit3 } from 'lucide-react';

interface EditMemberModalProps {
  member: TeamMember | null;
  onClose: () => void;
  onSave: (updated: TeamMember) => void;
}

export const EditMemberModal: React.FC<EditMemberModalProps> = ({
  member,
  onClose,
  onSave,
}) => {
  const [name, setName] = useState('');
  const [position, setPosition] = useState('');
  const [shortBio, setShortBio] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const [skillsStr, setSkillsStr] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (member) {
      setName(member.name);
      setPosition(member.position);
      setShortBio(member.shortBio);
      setPhotoUrl(member.photoUrl);
      setSkillsStr(member.skills.join(', '));
      setEmail(member.email);
    }
  }, [member]);

  if (!member) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedMember: TeamMember = {
      ...member,
      name: name.trim(),
      position: position.trim(),
      shortBio: shortBio.trim(),
      photoUrl: photoUrl.trim(),
      email: email.trim(),
      skills: skillsStr.split(',').map((s) => s.trim()).filter(Boolean),
    };
    onSave(updatedMember);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
      <div className="bg-[#0B1220] border border-slate-700 rounded-2xl max-w-lg w-full p-6 shadow-2xl">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Edit3 className="w-4 h-4 text-indigo-400" />
            <h3 className="text-base font-bold text-white">
              Edit Team Member Profile ({member.roleCode})
            </h3>
          </div>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4 text-xs">
          <div>
            <label className="block text-slate-300 font-medium mb-1">Full Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 rounded bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-medium mb-1">Position / Role</label>
            <input
              type="text"
              required
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              className="w-full px-3 py-2 rounded bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-medium mb-1">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 rounded bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-medium mb-1">Photo Image URL</label>
            <input
              type="url"
              required
              value={photoUrl}
              onChange={(e) => setPhotoUrl(e.target.value)}
              className="w-full px-3 py-2 rounded bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-medium mb-1">Short Biography</label>
            <textarea
              rows={3}
              required
              value={shortBio}
              onChange={(e) => setShortBio(e.target.value)}
              className="w-full px-3 py-2 rounded bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-medium mb-1">
              Skills (Comma separated)
            </label>
            <input
              type="text"
              value={skillsStr}
              onChange={(e) => setSkillsStr(e.target.value)}
              placeholder="e.g. React, TypeScript, Figma, UI/UX"
              className="w-full px-3 py-2 rounded bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded bg-slate-800 text-slate-300 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-indigo-600 hover:bg-indigo-500 text-white font-semibold flex items-center gap-1.5"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Profile Changes</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
