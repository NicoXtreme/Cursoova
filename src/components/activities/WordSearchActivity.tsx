import { useState, useEffect } from 'react';
import { CheckCircle2, Lightbulb } from 'lucide-react';

interface WordSearchActivityProps {
  onComplete: () => void;
}

const words = [
  { word: 'WEBHOOK', hint: 'Recibe eventos de otras plataformas en tiempo real' },
  { word: 'TRIGGER', hint: 'Inicia la ejecución de un flujo de trabajo' },
  { word: 'WORKFLOW', hint: 'Secuencia de acciones automatizadas' },
  { word: 'NODE', hint: 'Cada paso o acción en un flujo de n8n' },
  { word: 'API', hint: 'Interfaz para comunicación entre aplicaciones' },
  { word: 'SHEETS', hint: 'Herramienta de Google para gestión de datos tabulares' },
];

const gridSize = 12;

export function WordSearchActivity({ onComplete }: WordSearchActivityProps) {
  const [grid, setGrid] = useState<string[][]>([]);
  const [foundWords, setFoundWords] = useState<string[]>([]);
  const [selectedCells, setSelectedCells] = useState<Set<string>>(new Set());
  const [isSelecting, setIsSelecting] = useState(false);
  const [currentSelection, setCurrentSelection] = useState<string[]>([]);
  const [showHints, setShowHints] = useState(false);

  // Generate word search grid
  useEffect(() => {
    const newGrid: string[][] = Array(gridSize).fill(null).map(() => Array(gridSize).fill(''));
    
    // Place words (simplified - horizontal only for this example)
    const placedWords = [
      { word: 'WEBHOOK', row: 2, col: 1, dir: 'horizontal' },
      { word: 'TRIGGER', row: 4, col: 5, dir: 'horizontal' },
      { word: 'WORKFLOW', row: 6, col: 2, dir: 'horizontal' },
      { word: 'NODE', row: 8, col: 7, dir: 'horizontal' },
      { word: 'API', row: 1, col: 8, dir: 'vertical' },
      { word: 'SHEETS', row: 9, col: 3, dir: 'horizontal' },
    ];

    placedWords.forEach(({ word, row, col, dir }) => {
      for (let i = 0; i < word.length; i++) {
        if (dir === 'horizontal') {
          newGrid[row][col + i] = word[i];
        } else {
          newGrid[row + i][col] = word[i];
        }
      }
    });

    // Fill empty cells with random letters
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        if (newGrid[i][j] === '') {
          newGrid[i][j] = letters[Math.floor(Math.random() * letters.length)];
        }
      }
    }

    setGrid(newGrid);
  }, []);

  const cellKey = (row: number, col: number) => `${row}-${col}`;

  const handleMouseDown = (row: number, col: number) => {
    setIsSelecting(true);
    setCurrentSelection([cellKey(row, col)]);
  };

  const handleMouseEnter = (row: number, col: number) => {
    if (isSelecting) {
      setCurrentSelection(prev => [...prev, cellKey(row, col)]);
    }
  };

  const handleMouseUp = () => {
    setIsSelecting(false);
    
    // Check if selection forms a word
    const selectedWord = currentSelection.map(key => {
      const [row, col] = key.split('-').map(Number);
      return grid[row][col];
    }).join('');

    const foundWord = words.find(w => 
      w.word === selectedWord || w.word === selectedWord.split('').reverse().join('')
    );

    if (foundWord && !foundWords.includes(foundWord.word)) {
      setFoundWords([...foundWords, foundWord.word]);
      setSelectedCells(new Set([...selectedCells, ...currentSelection]));
      
      if (foundWords.length + 1 === words.length) {
        setTimeout(() => {
          onComplete();
        }, 500);
      }
    }
    
    setCurrentSelection([]);
  };

  if (grid.length === 0) {
    return <div className="text-white">Cargando actividad...</div>;
  }

  return (
    <div className="bg-[#151B3D] rounded-2xl p-8 border border-gray-800">
      <div className="mb-8">
        <h2 className="text-white mb-3">Auto-Evaluación: Nodos Clave de n8n</h2>
        <p className="text-gray-400 mb-4">
          Encuentra las palabras relacionadas con n8n y automatización en la sopa de letras. Las palabras pueden estar en horizontal o vertical.
        </p>
        
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-400">
            Palabras encontradas: <span className="text-[#98FF98]">{foundWords.length}</span> de {words.length}
          </div>
          
          <button
            onClick={() => setShowHints(!showHints)}
            className="flex items-center gap-2 text-sm text-gray-400 hover:text-[#00D9FF] transition-colors"
          >
            <Lightbulb className="w-4 h-4" />
            {showHints ? 'Ocultar' : 'Mostrar'} Pistas
          </button>
        </div>
      </div>

      {foundWords.length === words.length && (
        <div className="mb-6 bg-[#98FF98]/10 border border-[#98FF98]/30 rounded-lg p-4 flex items-start gap-3">
          <CheckCircle2 className="w-5 h-5 text-[#98FF98] flex-shrink-0 mt-0.5" />
          <div>
            <div className="text-[#98FF98] mb-1">¡Excelente!</div>
            <p className="text-gray-300 text-sm">
              Has encontrado todas las palabras clave de n8n. Ahora estás listo para implementar automatizaciones educativas.
            </p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Word Search Grid */}
        <div className="lg:col-span-2">
          <div 
            className="inline-grid gap-1 bg-[#0A0E27] p-4 rounded-lg select-none"
            onMouseLeave={() => {
              if (isSelecting) {
                setIsSelecting(false);
                setCurrentSelection([]);
              }
            }}
            style={{ 
              gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))`,
            }}
          >
            {grid.map((row, rowIndex) => (
              row.map((letter, colIndex) => {
                const key = cellKey(rowIndex, colIndex);
                const isFound = selectedCells.has(key);
                const isCurrent = currentSelection.includes(key);
                
                return (
                  <div
                    key={key}
                    onMouseDown={() => handleMouseDown(rowIndex, colIndex)}
                    onMouseEnter={() => handleMouseEnter(rowIndex, colIndex)}
                    onMouseUp={handleMouseUp}
                    className={`w-8 h-8 flex items-center justify-center text-sm cursor-pointer transition-all ${
                      isFound
                        ? 'bg-[#98FF98] text-[#0A0E27]'
                        : isCurrent
                        ? 'bg-[#00D9FF] text-white'
                        : 'bg-[#151B3D] text-gray-300 hover:bg-[#1A2044]'
                    }`}
                  >
                    {letter}
                  </div>
                );
              })
            ))}
          </div>
        </div>

        {/* Words List */}
        <div>
          <h3 className="text-white text-sm mb-4">Palabras a Encontrar</h3>
          <div className="space-y-2">
            {words.map((item) => {
              const isFound = foundWords.includes(item.word);
              
              return (
                <div
                  key={item.word}
                  className={`p-3 rounded-lg transition-all ${
                    isFound
                      ? 'bg-[#98FF98]/10 border border-[#98FF98]/30'
                      : 'bg-[#0A0E27] border border-gray-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className={`${isFound ? 'text-[#98FF98] line-through' : 'text-white'}`}>
                      {item.word}
                    </span>
                    {isFound && <CheckCircle2 className="w-4 h-4 text-[#98FF98]" />}
                  </div>
                  
                  {showHints && !isFound && (
                    <p className="text-xs text-gray-500 mt-1">{item.hint}</p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mt-6 bg-[#00D9FF]/5 border border-[#00D9FF]/20 rounded-lg p-4">
        <div className="text-sm text-gray-400">
          <strong className="text-[#00D9FF]">Instrucciones:</strong> Haz clic y arrastra sobre las letras para seleccionar una palabra. Las palabras pueden estar en horizontal o vertical (izquierda a derecha, o arriba hacia abajo).
        </div>
      </div>
    </div>
  );
}
