
import React, { useState } from 'react';
import { getLoggedInUser, updateUser } from '../utils/auth';
import type { Page } from '../App';
import { UserIcon } from '../components/icons/UserIcon';
import { TrashIcon } from '../components/icons/TrashIcon';
import { SettingsIcon } from '../components/icons/SettingsIcon';
import { CheckCircleIcon } from '../components/icons/CheckCircleIcon';
import { HistoryIcon } from '../components/icons/HistoryIcon';

interface SettingsPageProps {
  onLogout: () => void;
  onClearHistory: () => void;
  onNavigate: (page: Page) => void;
}

export const SettingsPage: React.FC<SettingsPageProps> = ({ onLogout, onClearHistory, onNavigate }) => {
  const user = getLoggedInUser();

  const [name, setName] = useState(user?.name || '');
  const [mobile, setMobile] = useState(user?.mobile || '');
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saved'>('idle');


  const handleClearHistory = () => {
    if (window.confirm('Are you sure you want to clear all analysis history? This action cannot be undone.')) {
      onClearHistory();
    }
  };

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser({ name, mobile });
    setSaveStatus('saved');
    setTimeout(() => {
        setSaveStatus('idle');
    }, 2000);
  };

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="max-w-2xl mx-auto space-y-10">
        <div className="text-center">
            <SettingsIcon className="mx-auto h-12 w-auto text-[#80a040]" />
            <h1 className="mt-4 text-4xl font-bold text-[#36451b]">Settings</h1>
        </div>

        {/* Profile Settings */}
        <div className="bg-white/80 backdrop-blur-md p-6 rounded-xl shadow-lg border border-[#dce8b9]/50">
            <h2 className="text-xl font-bold text-[#36451b] mb-4">Profile Information</h2>
            <form onSubmit={handleProfileUpdate} className="space-y-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-[#4d6426]">Name</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="mt-1 block w-full p-2 border border-gray-300 bg-white rounded-md text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#80a040] focus:border-[#80a040]"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="mobile" className="block text-sm font-medium text-[#4d6426]">Mobile Number (Optional)</label>
                    <input
                        type="tel"
                        id="mobile"
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                        className="mt-1 block w-full p-2 border border-gray-300 bg-white rounded-md text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#80a040] focus:border-[#80a040]"
                        placeholder="e.g., 555-123-4567"
                    />
                </div>
                <div className="flex justify-end items-center pt-2">
                    {saveStatus === 'saved' && (
                        <div className="flex items-center text-green-600 mr-4 transition-opacity duration-300">
                            <CheckCircleIcon className="w-5 h-5 mr-1"/>
                            <span className="text-sm font-semibold">Saved!</span>
                        </div>
                    )}
                    <button
                        type="submit"
                        className="px-4 py-2 text-sm font-medium text-white bg-[#80a040] rounded-md hover:bg-[#648232] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-[#9ebf4f] transition-all"
                    >
                        Save Changes
                    </button>
                </div>
            </form>
        </div>

        {/* Account Settings */}
        <div className="bg-white/80 backdrop-blur-md p-6 rounded-xl shadow-lg border border-[#dce8b9]/50">
            <h2 className="text-xl font-bold text-[#36451b] mb-4">Account</h2>
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <UserIcon className="w-8 h-8 mr-4 text-[#80a040]" />
                    <div>
                        <p className="font-semibold text-[#4d6426]">Logged in as</p>
                        <p className="text-sm text-[#4d6426]">{user?.email}</p>
                    </div>
                </div>
                <button
                    onClick={onLogout}
                    className="px-4 py-2 text-sm font-medium text-white bg-[#80a040] rounded-md hover:bg-[#648232] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-[#9ebf4f] transition-colors"
                >
                    Logout
                </button>
            </div>
        </div>

        {/* Data Management */}
        <div className="bg-white/80 backdrop-blur-md p-6 rounded-xl shadow-lg border border-[#dce8b9]/50">
            <h2 className="text-xl font-bold text-[#36451b] mb-4">Data Management</h2>
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="font-semibold text-[#4d6426]">View History</p>
                        <p className="text-sm text-[#4d6426]">Browse your past analysis results.</p>
                    </div>
                    <button
                        onClick={() => onNavigate('history')}
                        className="flex items-center px-4 py-2 bg-gray-200 text-[#36451b] text-sm font-semibold rounded-lg shadow-sm hover:bg-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#9ebf4f]"
                    >
                        <HistoryIcon className="w-4 h-4 mr-2" />
                        View
                    </button>
                </div>
                <div className="flex items-center justify-between">
                    <div>
                        <p className="font-semibold text-[#4d6426]">Clear History</p>
                        <p className="text-sm text-[#4d6426]">Permanently delete your analysis history.</p>
                    </div>
                    <button
                        onClick={handleClearHistory}
                        className="flex items-center px-4 py-2 bg-rose-600 text-white text-sm font-semibold rounded-lg shadow-sm hover:bg-rose-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-rose-500"
                    >
                        <TrashIcon className="w-4 h-4 mr-2" />
                        Clear
                    </button>
                </div>
            </div>
        </div>

      </div>
    </div>
  );
};