import { useState } from 'react';
import { GripVertical, CheckCircle2, XCircle, RotateCcw } from 'lucide-react';

interface ADDIEActivityProps {
  onComplete: () => void;
}

const correctOrder = ['Trigger', 'HTTP Request', 'Set', 'Email', 'Webhook'];

const nodes = [
  { id: 'trigger', name: 'Trigger', description: 'Inicia el flujo de trabajo (ej: Schedule, Manual, Webhook)' },
  { id: 'httprequest', name: 'HTTP Request', description: 'Realiza una solicitud a una API (ej: Moodle)' },
  { id: 'set', name: 'Set', description: 'Establece variables y transforma datos' },
  { id: 'email', name: 'Email', description: 'Envía notificaciones por correo electrónico' },
  { id: 'webhook', name: 'Webhook', description: 'Retorna datos o dispara eventos externos' },
];

export function ADDIEActivity({ onComplete }: ADDIEActivityProps) {
  const [shuffledNodes] = useState(() => {
    return [...nodes].sort(() => Math.random() - 0.5);
  });
  
  const [orderedNodes, setOrderedNodes] = useState<typeof nodes>(shuffledNodes);
  const [draggedItem, setDraggedItem] = useState<number | null>(null);
  const [isChecked, setIsChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleDragStart = (index: number) => {
    setDraggedItem(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    
    if (draggedItem === null || draggedItem === index) return;

    const newNodes = [...orderedNodes];
    const draggedNode = newNodes[draggedItem];
    
    newNodes.splice(draggedItem, 1);
    newNodes.splice(index, 0, draggedNode);
    
    setOrderedNodes(newNodes);
    setDraggedItem(index);
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
  };

  const checkOrder = () => {
    const userOrder = orderedNodes.map(n => n.name);
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
    setOrderedNodes([...nodes].sort(() => Math.random() - 0.5));
    setIsChecked(false);
    setIsCorrect(false);
  };

  const getNodeStatus = (node: typeof nodes[0], index: number) => {
    if (!isChecked) return null;
    return node.name === correctOrder[index];
  };

  return (
    <div className="bg-[#151B3D] rounded-2xl p-8 border border-gray-800">
      <div className="mb-8">
        <h2 className="text-white mb-3">Auto-Evaluación: Nodos Clave de n8n</h2>
        <p className="text-gray-400">
          Ordena los nodos de n8n en la secuencia correcta para crear un flujo de trabajo. Arrastra los elementos para organizarlos de forma lógica.
        </p>
      </div>

      {isChecked && isCorrect && (
        <div className="mb-6 bg-[#98FF98]/10 border border-[#98FF98]/30 rounded-lg p-4 flex items-start gap-3">
          <CheckCircle2 className="w-5 h-5 text-[#98FF98] flex-shrink-0 mt-0.5" />
          <div>
            <div className="text-[#98FF98] mb-1">¡Excelente!</div>
            <p className="text-gray-300 text-sm">
              Has ordenado correctamente los nodos de n8n. Esta es una estructura típica para automatizaciones en sistemas educativos.
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
              Revisa el contenido del módulo. Recuerda que siempre comienza con un Trigger y los datos fluyen de un nodo al siguiente.
            </p>
          </div>
        </div>
      )}

      <div className="space-y-3 mb-6">
        {orderedNodes.map((node, index) => {
          const status = getNodeStatus(node, index);
          const isBeingDragged = draggedItem === index;
          
          return (
            <div
              key={node.id}
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
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#00D9FF] to-[#98FF98] flex items-center justify-center text-[#0A0E27] text-sm font-bold">
                        {index + 1}
                      </div>
                      <h3 className="text-white">{node.name}</h3>
                    </div>
                    
                    {status === true && <CheckCircle2 className="w-5 h-5 text-[#98FF98]" />}
                    {status === false && <XCircle className="w-5 h-5 text-red-400" />}
                  </div>
                  <p className="text-sm text-gray-400 ml-11">{node.description}</p>
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
            : 'Arrastra los nodos para ordenarlos'
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
            <strong className="text-[#00D9FF]">Pista:</strong> Un flujo de trabajo típico comienza con un evento (Trigger), obtiene datos de una API, los procesa, envía notificaciones y finalmente retorna resultados.
          </div>
        </div>
      )}
    </div>
  );
}
