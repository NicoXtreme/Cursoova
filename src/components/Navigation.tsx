import { BookOpen, GraduationCap } from 'lucide-react';
import { Page } from '../App';

interface NavigationProps {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
  overallProgress: number;
}

export function Navigation({ currentPage, setCurrentPage, overallProgress }: NavigationProps) {
  return (
    <nav className="fixed top-0 left-0 right-0 bg-[#151B3D] border-b border-gray-800 z-50">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo/Brand */}
          <button 
            onClick={() => setCurrentPage('landing')}
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          >
            <div className="bg-gradient-to-br from-[#98FF98] to-[#00D9FF] p-2 rounded-lg">
              <GraduationCap className="w-6 h-6 text-[#0A0E27]" />
            </div>
            <div className="text-left">
              <div className="text-white">OVA & n8n</div>
              <div className="text-xs text-gray-400">Automatización Educativa</div>
            </div>
          </button>

          {/* Navigation Links */}
          <div className="flex items-center gap-8">
            <button
              onClick={() => setCurrentPage('landing')}
              className={`flex items-center gap-2 transition-colors ${
                currentPage === 'landing' || currentPage.startsWith('module')
                  ? 'text-[#98FF98]'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <BookOpen className="w-5 h-5" />
              <span>Módulos</span>
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="pb-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-gray-400">Progreso del Curso</span>
            <span className="text-xs text-[#98FF98]">{overallProgress}%</span>
          </div>
          <div className="h-1.5 bg-[#0A0E27] rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-[#98FF98] to-[#00D9FF] transition-all duration-500"
              style={{ width: `${overallProgress}%` }}
            />
          </div>
        </div>
      </div>
    </nav>
  );
}