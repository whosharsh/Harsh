import React from 'react';
import { LeafIcon } from '../components/icons/LeafIcon';
import { GoogleIcon } from '../components/icons/GoogleIcon';
import { FacebookIcon } from '../components/icons/FacebookIcon';
import { AppleIcon } from '../components/icons/AppleIcon';

interface LoginPageProps {
  onLogin: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
    
  const socialButtonClasses = "w-full flex items-center justify-center py-2.5 px-4 border rounded-md shadow-sm text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";

  return (
    <div className="min-h-screen flex items-center justify-center bg-transparent px-4 py-12">
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
        
        <div className="space-y-4">
             <button
              type="button"
              onClick={onLogin}
              className={`${socialButtonClasses} border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-[#9ebf4f]`}
            >
              <GoogleIcon className="h-5 w-5 mr-3" />
              Continue with Google
            </button>
             <button
              type="button"
              onClick={onLogin}
              className={`${socialButtonClasses} border-transparent bg-[#1877F2] text-white hover:bg-[#166e_e1] focus:ring-[#1877F2]`}
            >
              <FacebookIcon className="h-5 w-5 mr-3" />
              Continue with Facebook
            </button>
             <button
              type="button"
              onClick={onLogin}
              className={`${socialButtonClasses} border-transparent bg-black text-white hover:bg-gray-800 focus:ring-black`}
            >
              <AppleIcon className="h-5 w-5 mr-3" />
              Continue with Apple
            </button>
        </div>
        
        <div className="relative">
            <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-[#FDFDFD] text-gray-500">
                OR
                </span>
            </div>
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
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-[#b9cc85] placeholder-[#9ebf4f] text-[#36451b] focus:outline-none focus:ring-[#9ebf4f] focus:border-[#9ebf4f] sm:text-sm"
                placeholder="Email address"
                defaultValue="demo@plant.ai"
              />
            </div>
             <div>
              <input
                id="mobile-number"
                name="mobile"
                type="tel"
                autoComplete="tel"
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-[#b9cc85] placeholder-[#9ebf4f] text-[#36451b] focus:outline-none focus:ring-[#9ebf4f] focus:border-[#9ebf4f] sm:text-sm"
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
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-[#b9cc85] placeholder-[#9ebf4f] text-[#36451b] focus:outline-none focus:ring-[#9ebf4f] focus:border-[#9ebf4f] sm:text-sm"
                placeholder="Password"
                defaultValue="password"
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
      </div>
    </div>
  );
};