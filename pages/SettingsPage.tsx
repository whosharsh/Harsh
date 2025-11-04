
import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { getLoggedInUser, updateUser } from '../utils/auth';
import type { Page } from '../App';
import { UserIcon } from '../components/icons/UserIcon';
import { TrashIcon } from '../components/icons/TrashIcon';
import { SunIcon } from '../components/icons/SunIcon';
import { MoonIcon } from '../components/icons/MoonIcon';
import { SettingsIcon } from '../components/icons/SettingsIcon';
import { CheckCircleIcon } from '../components/icons/CheckCircleIcon';
import { HistoryIcon } from '../components/icons/HistoryIcon';

interface SettingsPageProps {
  onLogout: () => void;
  onClearHistory: () => void;
  onNavigate: (page: Page) => void;
}

export const SettingsPage: React.FC<SettingsPageProps> = ({ onLogout, onClearHistory, onNavigate }) => {
  const { themePreference, setThemePreference } = useTheme();
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

  const themeOptionClasses = (isActive: boolean) =>
    `flex-1 flex flex-col items-center justify-center p-4 rounded-lg border-2 cursor-pointer transition-all ${
      isActive
        ? 'bg-[#eef3d9] border-[#9ebf4f] dark:bg-gray-700 dark:border-lime-400'
        : 'bg-transparent border-gray-300 dark:border-gray-600 hover:border-[#b9cc85] dark:hover:border-gray-500'
    }`;

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="max-w-2xl mx-auto space-y-10">
        <div className="text-center">
            <SettingsIcon className="mx-auto h-12 w-auto text-[#80a040] dark:text-lime-400" />
            <h1 className="mt-4 text-4xl font-bold text-[#36451b] dark:text-white">Settings</h1>
        </div>

        {/* Appearance Settings */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md p-6 rounded-xl shadow-lg border border-[#dce8b9]/50 dark:border-gray-700">
          <h2 className="text-xl font-bold text-[#36451b] dark:text-white mb-4">Appearance</h2>
          <p className="text-[#4d6426] dark:text-gray-400 mb-6 text-sm">Choose how Plant AI looks. Select "System" to match your device's settings.</p>
          <div className="flex items-center justify-center gap-4">
            <button onClick={() => setThemePreference('light')} className={themeOptionClasses(themePreference === 'light')}>
              <SunIcon className="w-6 h-6 mb-2 text-[#80a040] dark:text-lime-400" />
              <span className="font-semibold text-[#4d6426] dark:text-gray-200">Light</span>
            </button>
            <button onClick={() => setThemePreference('dark')} className={themeOptionClasses(themePreference === 'dark')}>
              <MoonIcon className="w-6 h-6 mb-2 text-[#80a040] dark:text-lime-400" />
              <span className="font-semibold text-[#4d6426] dark:text-gray-200">Dark</span>
            </button>
            <button onClick={() => setThemePreference('system')} className={themeOptionClasses(themePreference === 'system')}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 mb-2 text-[#80a040] dark:text-lime-400">
                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                    <line x1="8" y1="21" x2="16" y2="21"></line>
                    <line x1="12" y1="17" x2="12" y2="21"></line>
                </svg>
              <span className="font-semibold text-[#4d6426] dark:text-gray-200">System</span>
            </button>
          </div>
        </div>

        {/* Profile Settings */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md p-6 rounded-xl shadow-lg border border-[#dce8b9]/50 dark:border-gray-700">
            <h2 className="text-xl font-bold text-[#36451b] dark:text-white mb-4">Profile Information</h2>
            <form onSubmit={handleProfileUpdate} className="space-y-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-[#4d6426] dark:text-gray-300">Name</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="mt-1 block w-full p-2 border border-gray-300 bg-white rounded-md text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#80a040] focus:border-[#80a040] dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 dark:focus:ring-lime-400 dark:focus:border-lime-400"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="mobile" className="block text-sm font-medium text-[#4d6426] dark:text-gray-300">Mobile Number (Optional)</label>
                    <input
                        type="tel"
                        id="mobile"
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                        className="mt-1 block w-full p-2 border border-gray-300 bg-white rounded-md text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#80a040] focus:border-[#80a040] dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 dark:focus:ring-lime-400 dark:focus:border-lime-400"
                        placeholder="e.g., 555-123-4567"
                    />
                </div>
                <div className="flex justify-end items-center pt-2">
                    {saveStatus === 'saved' && (
                        <div className="flex items-center text-green-600 dark:text-green-400 mr-4 transition-opacity duration-300">
                            <CheckCircleIcon className="w-5 h-5 mr-1"/>
                            <span className="text-sm font-semibold">Saved!</span>
                        </div>
                    )}
                    <button
                        type="submit"
                        className="px-4 py-2 text-sm font-medium text-white bg-[#80a040] dark:bg-[#9ebf4f] dark:text-[#36451b] rounded-md hover:bg-[#648232] dark:hover:bg-lime-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-800 focus:ring-[#9ebf4f] transition-all"
                    >
                        Save Changes
                    </button>
                </div>
            </form>
        </div>

        {/* Account Settings */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md p-6 rounded-xl shadow-lg border border-[#dce8b9]/50 dark:border-gray-700">
            <h2 className="text-xl font-bold text-[#36451b] dark:text-white mb-4">Account</h2>
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <UserIcon className="w-8 h-8 mr-4 text-[#80a040] dark:text-lime-400" />
                    <div>
                        <p className="font-semibold text-[#4d6426] dark:text-gray-200">Logged in as</p>
                        <p className="text-sm text-[#4d6426] dark:text-gray-400">{user?.email}</p>
                    </div>
                </div>
                <button
                    onClick={onLogout}
                    className="px-4 py-2 text-sm font-medium text-white bg-[#80a040] dark:bg-[#9ebf4f] dark:text-[#36451b] rounded-md hover:bg-[#648232] dark:hover:bg-lime-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-800 focus:ring-[#9ebf4f] transition-colors"
                >
                    Logout
                </button>
            </div>
        </div>

        {/* Data Management */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md p-6 rounded-xl shadow-lg border border-[#dce8b9]/50 dark:border-gray-700">
            <h2 className="text-xl font-bold text-[#36451b] dark:text-white mb-4">Data Management</h2>
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="font-semibold text-[#4d6426] dark:text-gray-200">View History</p>
                        <p className="text-sm text-[#4d6426] dark:text-gray-400">Browse your past analysis results.</p>
                    </div>
                    <button
                        onClick={() => onNavigate('history')}
                        className="flex items-center px-4 py-2 bg-gray-200 text-[#36451b] text-sm font-semibold rounded-lg shadow-sm hover:bg-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#9ebf4f] dark:bg-gray-600 dark:text-white dark:hover:bg-gray-500"
                    >
                        <HistoryIcon className="w-4 h-4 mr-2" />
                        View
                    </button>
                </div>
                <div className="flex items-center justify-between">
                    <div>
                        <p className="font-semibold text-[#4d6426] dark:text-gray-200">Clear History</p>
                        <p className="text-sm text-[#4d6426] dark:text-gray-400">Permanently delete your analysis history.</p>
                    </div>
                    <button
                        onClick={handleClearHistory}
                        className="flex items-center px-4 py-2 bg-rose-600 text-white text-sm font-semibold rounded-lg shadow-sm hover:bg-rose-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-800 focus:ring-rose-500"
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
