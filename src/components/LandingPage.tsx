import { BookOpen, Lightbulb, Workflow, Clock, Monitor } from 'lucide-react';
import { Page, ModuleProgress } from '../App';

interface LandingPageProps {
  setCurrentPage: (page: Page) => void;
  moduleProgress: ModuleProgress;
}

const modules = [
  {
    id: 'module1' as const,
    number: 1,
    title: 'Fundamentos de OVA y LMS',
    outcome: 'Comprender los conceptos fundamentales de Objetos Virtuales de Aprendizaje (OVA), sistemas de gestión del aprendizaje (LMS) y la importancia de los metadatos en el diseño instruccional.',
    icon: BookOpen,
    color: 'from-[#98FF98] to-[#7AE582]',
  },
  {
    id: 'module2' as const,
    number: 2,
    title: 'N8N',
    outcome: 'Implementar flujos de automatización educativa utilizando n8n para optimizar procesos en plataformas LMS y mejorar la gestión de contenidos.',
    icon: Lightbulb,
    color: 'from-[#00D9FF] to-[#0099CC]',
  },
  {
    id: 'module3' as const,
    number: 3,
    title: 'Automatización con n8n',
    outcome: 'Implementar flujos de automatización educativa utilizando n8n para optimizar procesos en plataformas LMS y mejorar la gestión de contenidos.',
    icon: Workflow,
    color: 'from-[#A78BFA] to-[#8B5CF6]',
  },
];

export function LandingPage({ setCurrentPage, moduleProgress }: LandingPageProps) {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-[#151B3D] to-[#0A0E27] pt-12 pb-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-[#98FF98]/10 border border-[#98FF98]/20 rounded-full px-6 py-2 mb-8">
              <div className="w-2 h-2 bg-[#98FF98] rounded-full animate-pulse"></div>
              <span className="text-[#98FF98] text-sm">Curso de Autoaprendizaje</span>
            </div>
            
            <h1 className="text-white mb-6">
              Diseño de OVA y Automatización Educativa con n8n en LMS
            </h1>
            
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Diseña, implementa y automatiza procesos educativos en plataformas LMS utilizando OVA y flujos low-code con n8n.
            </p>

            {/* Metadata Pills */}
            <div className="flex flex-wrap items-center justify-center gap-4 text-gray-400">
              <div className="flex items-center gap-2 bg-[#1A2044] rounded-lg px-4 py-2">
                <Clock className="w-4 h-4 text-[#98FF98]" />
                <span>Duración: 10 horas</span>
              </div>
              <div className="flex items-center gap-2 bg-[#1A2044] rounded-lg px-4 py-2">
                <Monitor className="w-4 h-4 text-[#00D9FF]" />
                <span>Modalidad: Virtual</span>
              </div>
              <div className="flex items-center gap-2 bg-[#1A2044] rounded-lg px-4 py-2">
                <Lightbulb className="w-4 h-4 text-[#A78BFA]" />
                <span>Metodología: ADDIE</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modules Grid */}
      <div className="container mx-auto px-6 -mt-12">
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {modules.map((module) => {
            const Icon = module.icon;
            const progress = moduleProgress[module.id];
            const isCompleted = progress === 100;
            
            return (
              <button
                key={module.id}
                onClick={() => setCurrentPage(module.id)}
                className="bg-[#151B3D] rounded-2xl p-6 border border-gray-800 hover:border-gray-700 transition-all hover:transform hover:scale-105 text-left group"
              >
                {/* Module Icon */}
                <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${module.color} mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>

                {/* Module Number */}
                <div className="text-gray-500 text-sm mb-2">
                  Módulo {module.number}
                </div>

                {/* Module Title */}
                <h3 className="text-white mb-3">
                  {module.title}
                </h3>

                {/* Module Outcome */}
                <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                  {module.outcome}
                </p>

                {/* Progress Bar */}
                <div className="mb-2">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-gray-500">Progreso</span>
                    <span className={`text-xs ${isCompleted ? 'text-[#98FF98]' : 'text-gray-400'}`}>
                      {progress}%
                    </span>
                  </div>
                  <div className="h-1.5 bg-[#0A0E27] rounded-full overflow-hidden">
                    <div 
                      className={`h-full bg-gradient-to-r ${module.color} transition-all duration-500`}
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>

                {/* Status Badge */}
                {isCompleted && (
                  <div className="mt-4 inline-flex items-center gap-2 text-xs text-[#98FF98]">
                    <div className="w-1.5 h-1.5 bg-[#98FF98] rounded-full"></div>
                    Completado
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="bg-[#151B3D] rounded-2xl overflow-hidden border border-gray-800">
            {/* Header */}
            <div className="bg-gradient-to-r from-[#98FF98]/10 to-[#00D9FF]/10 border-b border-gray-800 p-6">
              <h2 className="text-white mb-2">
                Introducción al Curso
              </h2>
              <p className="text-gray-400">
                Revisa la guía de introducción antes de comenzar con los módulos
              </p>
            </div>

            {/* PDF Viewer */}
            <div className="aspect-[4/5] bg-black flex items-center justify-center">
              <iframe
                src="https://www.enlacedigital.pedagogiavirtual.com/ovas/curso_ovas_n8n/content/introduction.pdf#toolbar=0"
                title="Introducción al Curso"
                className="w-full h-full"
                frameBorder="0"
              />
            </div>

            {/* CTA Button */}
            <div className="p-6 bg-gradient-to-r from-[#98FF98]/5 to-[#00D9FF]/5 border-t border-gray-800 text-center">
              <button
                onClick={() => setCurrentPage('module1')}
                className="bg-gradient-to-r from-[#98FF98] to-[#00D9FF] text-[#0A0E27] px-8 py-3 rounded-lg hover:opacity-90 transition-opacity"
              >
                Comenzar Módulo 1
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}