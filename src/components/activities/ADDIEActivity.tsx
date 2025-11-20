import { useState } from 'react';
import { GripVertical, CheckCircle2, XCircle, RotateCcw } from 'lucide-react';

interface ADDIEActivityProps {
  onComplete: () => void;
}

const correctOrder = ['Análisis', 'Diseño', 'Desarrollo', 'Implementación', 'Evaluación'];

const phases = [
  { id: 'analisis', name: 'Análisis', description: 'Identificar necesidades y objetivos de aprendizaje' },
  { id: 'diseno', name: 'Diseño', description: 'Planificar la estructura y estrategias pedagógicas' },
  { id: 'desarrollo', name: 'Desarrollo', description: 'Crear y producir los materiales educativos' },
  { id: 'implementacion', name: 'Implementación', description: 'Desplegar el curso en la plataforma LMS' },
  { id: 'evaluacion', name: 'Evaluación', description: 'Medir efectividad y realizar mejoras continuas' },
];

export function ADDIEActivity({ onComplete }: ADDIEActivityProps) {
  const [shuffledPhases] = useState(() => {
    return [...phases].sort(() => Math.random() - 0.5);
  });
  
  const [orderedPhases, setOrderedPhases] = useState<typeof phases>(shuffledPhases);
  const [draggedItem, setDraggedItem] = useState<number | null>(null);
  const [isChecked, setIsChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleDragStart = (index: number) => {
    setDraggedItem(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    
    if (draggedItem === null || draggedItem === index) return;

    const newPhases = [...orderedPhases];
    const draggedPhase = newPhases[draggedItem];
    
    newPhases.splice(draggedItem, 1);
    newPhases.splice(index, 0, draggedPhase);
    
    setOrderedPhases(newPhases);
    setDraggedItem(index);
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
  };

  const checkOrder = () => {
    const userOrder = orderedPhases.map(p => p.name);
    const correct = JSON.stringify(userOrder) === JSON.stringify(correctOrder);
    
    setIsChecked(true);
    setIsCorrect(correct);
    
    if (correct) {
      setTimeout(() => {
        onComplete();
      }, 500);
    }
  };

  const reset = () => {
    setOrderedPhases([...phases].sort(() => Math.random() - 0.5));
    setIsChecked(false);
    setIsCorrect(false);
  };

  const getPhaseStatus = (phase: typeof phases[0], index: number) => {
    if (!isChecked) return null;
    return phase.name === correctOrder[index];
  };

  return (
    <div className="bg-[#151B3D] rounded-2xl p-8 border border-gray-800">
      <div className="mb-8">
        <h2 className="text-white mb-3">Auto-Evaluación: Secuencia ADDIE</h2>
        <p className="text-gray-400">
          Ordena las fases del modelo ADDIE arrastrándolas a la secuencia correcta. El modelo ADDIE es un proceso sistemático de diseño instruccional.
        </p>
      </div>

      {isChecked && isCorrect && (
        <div className="mb-6 bg-[#98FF98]/10 border border-[#98FF98]/30 rounded-lg p-4 flex items-start gap-3">
          <CheckCircle2 className="w-5 h-5 text-[#98FF98] flex-shrink-0 mt-0.5" />
          <div>
            <div className="text-[#98FF98] mb-1">¡Perfecto!</div>
            <p className="text-gray-300 text-sm">
              Has ordenado correctamente las fases del modelo ADDIE. Este modelo es fundamental para el diseño instruccional efectivo.
            </p>
          </div>
        </div>
      )}

      {isChecked && !isCorrect && (
        <div className="mb-6 bg-red-500/10 border border-red-500/30 rounded-lg p-4 flex items-start gap-3">
          <XCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
          <div>
            <div className="text-red-400 mb-1">No es el orden correcto</div>
            <p className="text-gray-300 text-sm">
              Revisa el contenido del módulo e intenta nuevamente. Recuerda que ADDIE es un proceso secuencial.
            </p>
          </div>
        </div>
      )}

      <div className="space-y-3 mb-6">
        {orderedPhases.map((phase, index) => {
          const status = getPhaseStatus(phase, index);
          const isBeingDragged = draggedItem === index;
          
          return (
            <div
              key={phase.id}
              draggable
              onDragStart={() => handleDragStart(index)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDragEnd={handleDragEnd}
              className={`bg-[#0A0E27] border rounded-lg p-4 cursor-move transition-all ${
                isBeingDragged
                  ? 'opacity-50 scale-95'
                  : status === true
                  ? 'border-[#98FF98]/30 bg-[#98FF98]/5'
                  : status === false
                  ? 'border-red-500/30 bg-red-500/5'
                  : 'border-gray-700 hover:border-gray-600'
              }`}
            >
              <div className="flex items-start gap-4">
                <GripVertical className="w-5 h-5 text-gray-500 flex-shrink-0 mt-1" />
                
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#151B3D] flex items-center justify-center text-gray-400 text-sm">
                        {index + 1}
                      </div>
                      <h3 className="text-white">{phase.name}</h3>
                    </div>
                    
                    {status === true && <CheckCircle2 className="w-5 h-5 text-[#98FF98]" />}
                    {status === false && <XCircle className="w-5 h-5 text-red-400" />}
                  </div>
                  <p className="text-sm text-gray-400 ml-11">{phase.description}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex items-center justify-between pt-6 border-t border-gray-800">
        <div className="text-sm text-gray-400">
          {isChecked 
            ? isCorrect 
              ? 'Orden correcto ✓'
              : 'Intenta nuevamente'
            : 'Arrastra las fases para ordenarlas'
          }
        </div>
        
        <div className="flex items-center gap-3">
          {isChecked && (
            <button
              onClick={reset}
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              Reintentar
            </button>
          )}
          
          {!isChecked && (
            <button
              onClick={checkOrder}
              className="bg-gradient-to-r from-[#98FF98] to-[#00D9FF] text-[#0A0E27] px-6 py-2 rounded-lg hover:opacity-90 transition-opacity"
            >
              Verificar Orden
            </button>
          )}
        </div>
      </div>

      {/* Hint */}
      {!isCorrect && (
        <div className="mt-6 bg-[#00D9FF]/5 border border-[#00D9FF]/20 rounded-lg p-4">
          <div className="text-sm text-gray-400">
            <strong className="text-[#00D9FF]">Pista:</strong> El modelo ADDIE comienza identificando las necesidades educativas y termina evaluando la efectividad del programa.
          </div>
        </div>
      )}
    </div>
  );
}
