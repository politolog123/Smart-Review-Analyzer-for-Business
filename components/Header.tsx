import React from 'react';
import { Activity, Github } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-brand-600 text-white p-2 rounded-lg shadow-sm">
            <Activity size={24} />
          </div>
          <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-brand-700 to-brand-500">
            ReviewPulse
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <a 
            href="#" 
            className="text-slate-500 hover:text-brand-600 transition-colors flex items-center gap-2 text-sm font-medium"
          >
            <Github size={18} />
            <span>View Code</span>
          </a>
        </div>
      </div>
    </header>
  );
};
