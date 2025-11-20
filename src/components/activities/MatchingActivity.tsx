import { useState } from 'react';
import { CheckCircle2, XCircle, RotateCcw } from 'lucide-react';

interface MatchingActivityProps {
  onComplete: () => void;
}

const terms = [
  { id: 1, term: 'OVA', definition: 'Recurso digital diseñado para facilitar el aprendizaje de manera autónoma e interactiva' },
  { id: 2, term: 'LMS', definition: 'Plataforma digital que facilita la gestión, distribución y seguimiento de actividades de formación' },
  { id: 3, term: 'n8n', definition: 'Plataforma de automatización low-code para conectar aplicaciones y crear flujos de trabajo' },
  { id: 4, term: 'Metadatos', definition: 'Información estructurada que describe un recurso educativo facilitando su catalogación' },
  { id: 5, term: 'SCORM', definition: 'Estándar más utilizado para e-learning que permite compartir contenido entre plataformas' },
];

export function MatchingActivity({ onComplete }: MatchingActivityProps) {
  const [selectedTerm, setSelectedTerm] = useState<number | null>(null);
  const [matches, setMatches] = useState<Record<number, number>>({});
  const [attempts, setAttempts] = useState<Array<{ termId: number; defId: number; correct: boolean }>>([]);
  const [isComplete, setIsComplete] = useState(false);

  // Shuffle definitions
  const [shuffledDefs] = useState(() => {
    return [...terms].sort(() => Math.random() - 0.5);
  });

  const handleTermClick = (termId: number) => {
    if (matches[termId] !== undefined) return;
    setSelectedTerm(termId);
  };

  const handleDefinitionClick = (defId: number) => {
    if (!selectedTerm) return;
    if (Object.values(matches).includes(defId)) return;

    const isCorrect = selectedTerm === defId;
    
    setAttempts([...attempts, { termId: selectedTerm, defId, correct: isCorrect }]);

    if (isCorrect) {
      const newMatches = { ...matches, [selectedTerm]: defId };
      setMatches(newMatches);
      setSelectedTerm(null);

      if (Object.keys(newMatches).length === terms.length) {
        setIsComplete(true);
        setTimeout(() => {
          onComplete();
        }, 500);
      }
    } else {
      setTimeout(() => {
        setSelectedTerm(null);
      }, 1000);
    }
  };

  const reset = () => {
    setSelectedTerm(null);
    setMatches({});
    setAttempts([]);
    setIsComplete(false);
  };

  const getLastAttempt = (termId: number, defId: number) => {
    const lastAttempts = attempts.filter(a => a.termId === termId && a.defId === defId);
    return lastAttempts[lastAttempts.length - 1];
  };

  return (
    <div className="bg-[#151B3D] rounded-2xl p-8 border border-gray-800">
      <div className="mb-8">
        <h2 className="text-white mb-3">Auto-Evaluación: Conceptos Clave</h2>
        <p className="text-gray-400">
          Empareja cada término con su definición correcta. Haz clic en un término y luego en su definición correspondiente.
        </p>
      </div>

      {isComplete && (
        <div className="mb-6 bg-[#98FF98]/10 border border-[#98FF98]/30 rounded-lg p-4 flex items-start gap-3">
          <CheckCircle2 className="w-5 h-5 text-[#98FF98] flex-shrink-0 mt-0.5" />
          <div>
            <div className="text-[#98FF98] mb-1">¡Excelente trabajo!</div>
            <p className="text-gray-300 text-sm">
              Has completado correctamente la actividad de emparejamiento. Ahora comprendes los conceptos fundamentales de OVA, LMS y n8n.
            </p>
          </div>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-8 mb-6">
        {/* Terms Column */}
        <div>
          <h3 className="text-white text-sm mb-4">Términos</h3>
          <div className="space-y-3">
            {terms.map((item) => {
              const isMatched = matches[item.id] !== undefined;
              const isSelected = selectedTerm === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => handleTermClick(item.id)}
                  disabled={isMatched}
                  className={`w-full text-left p-4 rounded-lg transition-all ${
                    isMatched
                      ? 'bg-[#98FF98]/10 border border-[#98FF98]/30 text-[#98FF98]'
                      : isSelected
                      ? 'bg-[#00D9FF]/20 border-2 border-[#00D9FF] text-white'
                      : 'bg-[#0A0E27] border border-gray-700 text-white hover:border-gray-600'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{item.term}</span>
                    {isMatched && <CheckCircle2 className="w-5 h-5 text-[#98FF98]" />}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Definitions Column */}
        <div>
          <h3 className="text-white text-sm mb-4">Definiciones</h3>
          <div className="space-y-3">
            {shuffledDefs.map((item) => {
              const isMatched = Object.values(matches).includes(item.id);
              const lastAttempt = selectedTerm ? getLastAttempt(selectedTerm, item.id) : null;
              const showError = lastAttempt && !lastAttempt.correct;
              
              return (
                <button
                  key={item.id}
                  onClick={() => handleDefinitionClick(item.id)}
                  disabled={isMatched || !selectedTerm}
                  className={`w-full text-left p-4 rounded-lg transition-all ${
                    isMatched
                      ? 'bg-[#98FF98]/10 border border-[#98FF98]/30 text-gray-500 cursor-not-allowed'
                      : showError
                      ? 'bg-red-500/10 border border-red-500/30 text-white animate-shake'
                      : selectedTerm
                      ? 'bg-[#0A0E27] border border-gray-700 text-white hover:border-[#00D9FF] hover:bg-[#00D9FF]/10'
                      : 'bg-[#0A0E27] border border-gray-800 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <span className="text-sm">{item.definition}</span>
                    {showError && <XCircle className="w-5 h-5 text-red-400 flex-shrink-0" />}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="flex items-center justify-between pt-6 border-t border-gray-800">
        <div className="text-sm text-gray-400">
          {selectedTerm ? (
            <span className="text-[#00D9FF]">Ahora selecciona la definición correcta</span>
          ) : Object.keys(matches).length > 0 ? (
            <span>{Object.keys(matches).length} de {terms.length} emparejados</span>
          ) : (
            <span>Selecciona un término para comenzar</span>
          )}
        </div>
        
        {attempts.length > 0 && !isComplete && (
          <button
            onClick={reset}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm"
          >
            <RotateCcw className="w-4 h-4" />
            Reintentar
          </button>
        )}
      </div>
    </div>
  );
}
