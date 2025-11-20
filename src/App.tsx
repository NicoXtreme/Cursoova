import { useState } from 'react';
import { Navigation } from './components/Navigation';
import { LandingPage } from './components/LandingPage';
import { ModuleView } from './components/ModuleView';

export type Page = 'landing' | 'module1' | 'module2' | 'module3';

export interface ModuleProgress {
  module1: number;
  module2: number;
  module3: number;
}

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('landing');
  const [moduleProgress, setModuleProgress] = useState<ModuleProgress>({
    module1: 0,
    module2: 0,
    module3: 0,
  });

  const calculateOverallProgress = () => {
    return Math.round((moduleProgress.module1 + moduleProgress.module2 + moduleProgress.module3) / 3);
  };

  const updateModuleProgress = (module: keyof ModuleProgress, progress: number) => {
    setModuleProgress(prev => ({
      ...prev,
      [module]: progress,
    }));
  };

  return (
    <div className="min-h-screen bg-[#0A0E27]">
      <Navigation 
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        overallProgress={calculateOverallProgress()}
      />
      
      <main className="pt-20">
        {currentPage === 'landing' && (
          <LandingPage 
            setCurrentPage={setCurrentPage}
            moduleProgress={moduleProgress}
          />
        )}
        
        {currentPage === 'module1' && (
          <ModuleView 
            moduleNumber={1}
            progress={moduleProgress.module1}
            updateProgress={(progress) => updateModuleProgress('module1', progress)}
            setCurrentPage={setCurrentPage}
          />
        )}
        
        {currentPage === 'module2' && (
          <ModuleView 
            moduleNumber={2}
            progress={moduleProgress.module2}
            updateProgress={(progress) => updateModuleProgress('module2', progress)}
            setCurrentPage={setCurrentPage}
          />
        )}
        
        {currentPage === 'module3' && (
          <ModuleView 
            moduleNumber={3}
            progress={moduleProgress.module3}
            updateProgress={(progress) => updateModuleProgress('module3', progress)}
            setCurrentPage={setCurrentPage}
          />
        )}
      </main>
    </div>
  );
}

export default App;