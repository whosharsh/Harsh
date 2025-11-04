import React from 'react';
import { LeafIcon } from '../components/icons/LeafIcon';
import { GoogleIcon } from '../components/icons/GoogleIcon';
import { FacebookIcon } from '../components/icons/FacebookIcon';

interface LoginPageProps {
  onLogin: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
    
  const socialIconClasses = "p-3 rounded-full border border-gray-300 bg-gray-100 hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-[#80a040]";

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <LeafIcon className="mx-auto h-16 w-auto text-[#80a040]" />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-[#36451b]">
            Create your account
          </h2>
          <p className="mt-2 text-center text-md text-[#648232]">
            Your personal assistant for a greener world.
          </p>
        </div>
        
        <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); onLogin(); }}>
          <div className="space-y-3">
             <div>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 bg-white placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#80a040] focus:border-[#80a040] sm:text-sm"
                placeholder="Email address"
              />
            </div>
             <div>
              <input
                id="mobile-number"
                name="mobile"
                type="tel"
                autoComplete="tel"
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 bg-white placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#80a040] focus:border-[#80a040] sm:text-sm"
                placeholder="Mobile number (optional)"
              />
            </div>
            <div>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 bg-white placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#80a040] focus:border-[#80a040] sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-[#9ebf4f] to-[#80a040] hover:from-[#80a040] hover:to-[#648232] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#9ebf4f] transition-all"
            >
              Continue with Email
            </button>
          </div>
        </form>

        <div className="relative">
            <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-[#FDFDFD] text-gray-500">
                  Or continue with
                </span>
            </div>
        </div>

        <div className="flex items-center justify-center space-x-4">
             <button
              type="button"
              onClick={onLogin}
              className={socialIconClasses}
              aria-label="Continue with Google"
            >
              <GoogleIcon className="h-6 w-6" />
            </button>
             <button
              type="button"
              onClick={onLogin}
              className={socialIconClasses}
              aria-label="Continue with Facebook"
            >
              <FacebookIcon className="h-6 w-6 text-[#1877F2]" />
            </button>
        </div>
        
      </div>
    </div>
  );
};
