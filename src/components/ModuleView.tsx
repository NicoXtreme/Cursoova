import { useState } from 'react';
import { ChevronLeft, ChevronRight, CheckCircle2, Circle, Play } from 'lucide-react';
import { Page } from '../App';
import { MatchingActivity } from './activities/MatchingActivity';
import { ADDIEActivity } from './activities/ADDIEActivity';
import { WordSearchActivity } from './activities/WordSearchActivity';

interface ModuleViewProps {
  moduleNumber: number;
  progress: number;
  updateProgress: (progress: number) => void;
  setCurrentPage: (page: Page) => void;
}

const moduleData = {
  1: {
    title: 'Fundamentos de OVA y LMS',
    activities: [
      { id: 1, title: 'Introducción a OVA', type: 'video' as const },
      { id: 2, title: 'Sistemas de Gestión LMS', type: 'video' as const },
      { id: 3, title: 'Metadatos y Estándares', type: 'video' as const },
      { id: 4, title: 'Auto-Evaluación: Conceptos Clave', type: 'activity' as const },
    ],
    content: {
      1: {
        title: 'Introducción a OVA',
        video: 'https://www.youtube.com/embed/VIDEO_ID_AQUI',
        notes: `
          <h3>¿Qué es un Objeto Virtual de Aprendizaje (OVA)?</h3>
          <p>Un OVA es un recurso digital diseñado para facilitar el aprendizaje de manera autónoma e interactiva. Sus características principales son:</p>
          <ul>
            <li><strong>Reutilizable:</strong> Puede usarse en diferentes contextos educativos</li>
            <li><strong>Interactivo:</strong> Permite la participación activa del estudiante</li>
            <li><strong>Autodidacta:</strong> Facilita el aprendizaje sin intervención directa del instructor</li>
            <li><strong>Modular:</strong> Puede combinarse con otros objetos de aprendizaje</li>
          </ul>
          
          <h3>Componentes de un OVA</h3>
          <ul>
            <li>Objetivo de aprendizaje claro</li>
            <li>Contenido multimedia (videos, animaciones, textos)</li>
            <li>Actividades interactivas</li>
            <li>Evaluación del aprendizaje</li>
            <li>Metadatos descriptivos</li>
          </ul>
        `,
      },
      2: {
        title: 'Sistemas de Gestión LMS',
        video: 'https://www.youtube.com/embed/VIDEO_ID_AQUI',
        notes: `
          <h3>Learning Management System (LMS)</h3>
          <p>Un LMS es una plataforma digital que facilita la gestión, distribución y seguimiento de actividades de formación. Ejemplos populares incluyen:</p>
          <ul>
            <li><strong>Moodle:</strong> Plataforma open-source líder en educación</li>
            <li><strong>Canvas:</strong> Sistema moderno enfocado en UX</li>
            <li><strong>Blackboard:</strong> Solución empresarial robusta</li>
            <li><strong>Google Classroom:</strong> Integrado con GSuite</li>
          </ul>
          
          <h3>Funciones Principales de un LMS</h3>
          <ul>
            <li>Gestión de usuarios y roles (estudiantes, instructores, administradores)</li>
            <li>Organización de contenidos por cursos y módulos</li>
            <li>Seguimiento del progreso y calificaciones</li>
            <li>Comunicación (foros, mensajería, anuncios)</li>
            <li>Generación de reportes y analíticas</li>
          </ul>
        `,
      },
      3: {
        title: 'Metadatos y Estándares',
        video: 'https://www.youtube.com/embed/VIDEO_ID_AQUI',
        notes: `
          <h3>Importancia de los Metadatos</h3>
          <p>Los metadatos son información estructurada que describe un OVA, facilitando su búsqueda, catalogación y reutilización.</p>
          
          <h3>Estándares de Metadatos</h3>
          <ul>
            <li><strong>SCORM (Sharable Content Object Reference Model):</strong> Estándar más utilizado para e-learning</li>
            <li><strong>LOM (Learning Object Metadata):</strong> Describe recursos educativos</li>
            <li><strong>xAPI (Experience API):</strong> Rastrea experiencias de aprendizaje en múltiples plataformas</li>
          </ul>
          
          <h3>Categorías de Metadatos</h3>
          <ul>
            <li><strong>General:</strong> Título, idioma, descripción, palabras clave</li>
            <li><strong>Ciclo de vida:</strong> Versión, estado, autores</li>
            <li><strong>Técnico:</strong> Formato, tamaño, requisitos</li>
            <li><strong>Educativo:</strong> Tipo de recurso, nivel, contexto</li>
            <li><strong>Derechos:</strong> Licencias, restricciones de uso</li>
          </ul>
        `,
      },
    },
  },
  2: {
    title: 'Diseño Instruccional con ADDIE',
    activities: [
      { id: 1, title: 'Fase 1: Análisis', type: 'video' as const },
      { id: 2, title: 'Fase 2: Diseño', type: 'video' as const },
      { id: 3, title: 'Fase 3: Desarrollo', type: 'video' as const },
      { id: 4, title: 'Fase 4: Implementación', type: 'video' as const },
      { id: 5, title: 'Fase 5: Evaluación', type: 'video' as const },
      { id: 6, title: 'Auto-Evaluación: Secuencia ADDIE', type: 'activity' as const },
    ],
    content: {
      1: {
        title: 'Fase 1: Análisis',
        video: 'https://www.youtube.com/embed/VIDEO_ID_AQUI',
        notes: `
          <h3>Análisis de Necesidades</h3>
          <p>La fase de análisis es fundamental para identificar las necesidades educativas y establecer objetivos claros.</p>
          
          <h3>Actividades Clave</h3>
          <ul>
            <li>Identificar el problema o necesidad educativa</li>
            <li>Definir el público objetivo (edad, nivel, conocimientos previos)</li>
            <li>Establecer objetivos de aprendizaje medibles</li>
            <li>Analizar restricciones (tiempo, recursos, tecnología)</li>
            <li>Identificar el contexto de aprendizaje</li>
          </ul>
          
          <h3>Preguntas Guía</h3>
          <ul>
            <li>¿Qué necesitan aprender los estudiantes?</li>
            <li>¿Por qué es importante este aprendizaje?</li>
            <li>¿Cuál es el nivel actual de conocimiento?</li>
            <li>¿Qué recursos están disponibles?</li>
          </ul>
        `,
      },
      2: {
        title: 'Fase 2: Diseño',
        video: 'https://www.youtube.com/embed/VIDEO_ID_AQUI',
        notes: `
          <h3>Diseño de la Experiencia Educativa</h3>
          <p>En esta fase se planifica cómo se estructurará el contenido y las actividades de aprendizaje.</p>
          
          <h3>Elementos a Diseñar</h3>
          <ul>
            <li><strong>Objetivos de Aprendizaje:</strong> Específicos, medibles, alcanzables</li>
            <li><strong>Secuencia de Contenidos:</strong> Orden lógico y progresivo</li>
            <li><strong>Estrategias Pedagógicas:</strong> Métodos de enseñanza apropiados</li>
            <li><strong>Actividades de Aprendizaje:</strong> Ejercicios, casos, simulaciones</li>
            <li><strong>Evaluaciones:</strong> Formativas y sumativas</li>
            <li><strong>Recursos Multimedia:</strong> Videos, infografías, interactivos</li>
          </ul>
          
          <h3>Storyboard y Wireframes</h3>
          <p>Se recomienda crear bocetos visuales que muestren la estructura y flujo del contenido.</p>
        `,
      },
      3: {
        title: 'Fase 3: Desarrollo',
        video: 'https://www.youtube.com/embed/VIDEO_ID_AQUI',
        notes: `
          <h3>Producción de Contenidos</h3>
          <p>En esta fase se crean y producen todos los materiales diseñados en la etapa anterior.</p>
          
          <h3>Actividades de Desarrollo</h3>
          <ul>
            <li>Producir contenidos multimedia (videos, animaciones, gráficos)</li>
            <li>Desarrollar actividades interactivas</li>
            <li>Crear evaluaciones y rúbricas</li>
            <li>Integrar contenidos en el LMS</li>
            <li>Configurar metadatos y estándares</li>
          </ul>
          
          <h3>Herramientas Recomendadas</h3>
          <ul>
            <li><strong>Genially / Canva:</strong> Para presentaciones interactivas</li>
            <li><strong>Articulate / Adobe Captivate:</strong> Para OVAs complejos</li>
            <li><strong>H5P:</strong> Contenido interactivo HTML5</li>
            <li><strong>OBS Studio:</strong> Grabación de videos educativos</li>
          </ul>
        `,
      },
      4: {
        title: 'Fase 4: Implementación',
        video: 'https://www.youtube.com/embed/VIDEO_ID_AQUI',
        notes: `
          <h3>Despliegue del Curso</h3>
          <p>Esta fase implica poner el contenido a disposición de los estudiantes en el LMS.</p>
          
          <h3>Pasos de Implementación</h3>
          <ul>
            <li>Cargar contenidos al LMS</li>
            <li>Configurar permisos y accesos</li>
            <li>Realizar pruebas técnicas (navegación, multimedia, compatibilidad)</li>
            <li>Capacitar a instructores y estudiantes</li>
            <li>Lanzar el curso oficialmente</li>
            <li>Brindar soporte técnico inicial</li>
          </ul>
          
          <h3>Checklist Pre-Lanzamiento</h3>
          <ul>
            <li>✓ Todos los enlaces funcionan correctamente</li>
            <li>✓ Videos y multimedia se reproducen sin problemas</li>
            <li>✓ Evaluaciones están configuradas correctamente</li>
            <li>✓ Fechas de entrega están programadas</li>
            <li>✓ Instrucciones son claras y completas</li>
          </ul>
        `,
      },
      5: {
        title: 'Fase 5: Evaluación',
        video: 'https://www.youtube.com/embed/VIDEO_ID_AQUI',
        notes: `
          <h3>Evaluación y Mejora Continua</h3>
          <p>La última fase evalúa la efectividad del curso y busca oportunidades de mejora.</p>
          
          <h3>Tipos de Evaluación</h3>
          <ul>
            <li><strong>Formativa:</strong> Durante el curso, para ajustes inmediatos</li>
            <li><strong>Sumativa:</strong> Al final, para medir logro de objetivos</li>
            <li><strong>De Reacción:</strong> Satisfacción de los estudiantes (encuestas)</li>
            <li><strong>De Aprendizaje:</strong> Conocimientos adquiridos (exámenes)</li>
            <li><strong>De Transferencia:</strong> Aplicación en contextos reales</li>
          </ul>
          
          <h3>Fuentes de Datos</h3>
          <ul>
            <li>Encuestas de satisfacción</li>
            <li>Resultados de evaluaciones</li>
            <li>Analíticas del LMS (tiempo, completación, interacciones)</li>
            <li>Retroalimentación cualitativa</li>
            <li>Observación directa</li>
          </ul>
          
          <h3>Ciclo de Mejora</h3>
          <p>Los resultados de la evaluación alimentan un nuevo ciclo ADDIE para optimizar continuamente el curso.</p>
        `,
      },
    },
  },
  3: {
    title: 'Automatización con n8n',
    activities: [
      { id: 1, title: 'Introducción a n8n', type: 'video' as const },
      { id: 2, title: 'Nodos y Flujos de Trabajo', type: 'video' as const },
      { id: 3, title: 'Integración con LMS', type: 'video' as const },
      { id: 4, title: 'Casos de Uso Educativos', type: 'video' as const },
      { id: 5, title: 'Auto-Evaluación: Nodos Clave', type: 'activity' as const },
    ],
    content: {
      1: {
        title: 'Introducción a n8n',
        video: 'https://www.youtube.com/embed/VIDEO_ID_AQUI',
        notes: `
          <h3>¿Qué es n8n?</h3>
          <p>n8n es una plataforma de automatización low-code que permite conectar diferentes aplicaciones y servicios para crear flujos de trabajo automatizados.</p>
          
          <h3>Ventajas de n8n en Educación</h3>
          <ul>
            <li><strong>Open Source:</strong> Gratuito y personalizable</li>
            <li><strong>Self-hosted:</strong> Control total sobre los datos</li>
            <li><strong>Visual:</strong> Interfaz de flujo intuitiva</li>
            <li><strong>Extensible:</strong> +300 integraciones disponibles</li>
            <li><strong>Sin código:</strong> No requiere programación avanzada</li>
          </ul>
          
          <h3>Conceptos Fundamentales</h3>
          <ul>
            <li><strong>Workflow (Flujo):</strong> Secuencia de acciones automatizadas</li>
            <li><strong>Node (Nodo):</strong> Cada paso o acción en el flujo</li>
            <li><strong>Trigger (Disparador):</strong> Evento que inicia el flujo</li>
            <li><strong>Connection (Conexión):</strong> Enlace entre nodos</li>
          </ul>
        `,
      },
      2: {
        title: 'Nodos y Flujos de Trabajo',
        video: 'https://www.youtube.com/embed/VIDEO_ID_AQUI',
        notes: `
          <h3>Tipos de Nodos</h3>
          <p>n8n ofrece diferentes categorías de nodos para construir flujos de trabajo:</p>
          
          <ul>
            <li><strong>Trigger Nodes:</strong> Inician el flujo (webhook, schedule, manual)</li>
            <li><strong>Action Nodes:</strong> Ejecutan acciones (HTTP Request, Google Sheets, Email)</li>
            <li><strong>Logic Nodes:</strong> Control de flujo (IF, Switch, Merge)</li>
            <li><strong>Data Nodes:</strong> Transforman datos (Set, Function, Code)</li>
          </ul>
          
          <h3>Nodos Clave para Educación</h3>
          <ul>
            <li><strong>Google Sheets:</strong> Gestión de listas, calificaciones</li>
            <li><strong>Email:</strong> Notificaciones automáticas</li>
            <li><strong>HTTP Request:</strong> Integración con APIs de LMS</li>
            <li><strong>Schedule:</strong> Tareas programadas (recordatorios, reportes)</li>
            <li><strong>Webhook:</strong> Recibir eventos de otras plataformas</li>
          </ul>
          
          <h3>Construcción de un Flujo</h3>
          <ol>
            <li>Definir el trigger (¿Qué inicia la automatización?)</li>
            <li>Agregar nodos de acción (¿Qué debe ocurrir?)</li>
            <li>Conectar nodos en el orden correcto</li>
            <li>Configurar cada nodo con sus parámetros</li>
            <li>Probar el flujo con datos de ejemplo</li>
            <li>Activar el workflow</li>
          </ol>
        `,
      },
      3: {
        title: 'Integración con LMS',
        video: 'https://www.youtube.com/embed/VIDEO_ID_AQUI',
        notes: `
          <h3>Conectando n8n con tu LMS</h3>
          <p>La mayoría de plataformas LMS ofrecen APIs que permiten la automatización mediante n8n.</p>
          
          <h3>Métodos de Integración</h3>
          <ul>
            <li><strong>API REST:</strong> Moodle, Canvas, Blackboard exponen endpoints REST</li>
            <li><strong>Webhooks:</strong> Notificaciones automáticas de eventos del LMS</li>
            <li><strong>CSV/Excel:</strong> Exportación e importación de datos</li>
            <li><strong>Email:</strong> Parseo de notificaciones por correo</li>
          </ul>
          
          <h3>Ejemplos de Automatización</h3>
          <ul>
            <li>Crear usuarios nuevos automáticamente desde Google Sheets</li>
            <li>Enviar recordatorios de tareas pendientes</li>
            <li>Generar reportes semanales de progreso</li>
            <li>Notificar a instructores sobre envíos de tareas</li>
            <li>Sincronizar calificaciones entre sistemas</li>
            <li>Crear certificados automáticamente al completar cursos</li>
          </ul>
          
          <h3>Configuración de Credenciales</h3>
          <p>n8n permite almacenar de forma segura las credenciales de acceso a APIs (tokens, API keys, OAuth).</p>
        `,
      },
      4: {
        title: 'Casos de Uso Educativos',
        video: 'https://www.youtube.com/embed/VIDEO_ID_AQUI',
        notes: `
          <h3>Caso 1: Inscripción Automática</h3>
          <p><strong>Flujo:</strong> Google Forms → n8n → LMS API → Email de Confirmación</p>
          <p>Cuando un estudiante se registra en un formulario, n8n crea automáticamente su cuenta en el LMS y envía credenciales por email.</p>
          
          <h3>Caso 2: Generación de Certificados</h3>
          <p><strong>Flujo:</strong> LMS Webhook (curso completado) → n8n → Canva API → PDF → Email</p>
          <p>Al completar un curso, se genera automáticamente un certificado personalizado y se envía al estudiante.</p>
          
          <h3>Caso 3: Recordatorios Inteligentes</h3>
          <p><strong>Flujo:</strong> Schedule (diario) → LMS API → Filter → Email</p>
          <p>Cada día, n8n consulta tareas pendientes y envía recordatorios solo a estudiantes que tienen entregas próximas.</p>
          
          <h3>Caso 4: Dashboard de Analíticas</h3>
          <p><strong>Flujo:</strong> Schedule (semanal) → LMS API → Google Sheets → Data Studio</p>
          <p>Extrae datos de progreso, los procesa y actualiza un dashboard visual para instructores.</p>
          
          <h3>Caso 5: Sincronización Multi-Plataforma</h3>
          <p><strong>Flujo:</strong> Moodle → n8n → Google Classroom + Slack</p>
          <p>Cuando se publica un anuncio en Moodle, se replica automáticamente en Google Classroom y se notifica en Slack.</p>
          
          <h3>Buenas Prácticas</h3>
          <ul>
            <li>Probar flujos con datos ficticios antes de producción</li>
            <li>Implementar manejo de errores (Error Trigger)</li>
            <li>Documentar cada flujo con notas explicativas</li>
            <li>Usar variables de entorno para credenciales</li>
            <li>Monitorear logs para detectar problemas</li>
          </ul>
        `,
      },
    },
  },
};

export function ModuleView({ moduleNumber, progress, updateProgress, setCurrentPage }: ModuleViewProps) {
  const [currentActivity, setCurrentActivity] = useState(1);
  const module = moduleData[moduleNumber as keyof typeof moduleData];
  const activity = module.activities.find(a => a.id === currentActivity);
  const contentData = module.content[currentActivity as keyof typeof module.content];
  
  const completedActivities = Math.floor((progress / 100) * module.activities.length);

  const handleActivityComplete = () => {
    const newCompletedCount = Math.max(completedActivities, currentActivity);
    const newProgress = Math.round((newCompletedCount / module.activities.length) * 100);
    updateProgress(newProgress);
  };

  const goToNext = () => {
    if (currentActivity < module.activities.length) {
      setCurrentActivity(currentActivity + 1);
    }
  };

  const goToPrevious = () => {
    if (currentActivity > 1) {
      setCurrentActivity(currentActivity - 1);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-5rem)]">
      {/* Left Sidebar - Activity List */}
      <div className="w-80 bg-[#151B3D] border-r border-gray-800 p-6 overflow-y-auto">
        <div className="mb-6">
          <div className="text-gray-400 text-sm mb-2">Módulo {moduleNumber}</div>
          <h2 className="text-white mb-4">{module.title}</h2>
          
          {/* Module Progress */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-gray-400">Progreso del Módulo</span>
              <span className="text-xs text-[#98FF98]">{progress}%</span>
            </div>
            <div className="h-1.5 bg-[#0A0E27] rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-[#98FF98] to-[#00D9FF] transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>

        {/* Activity List */}
        <div className="space-y-2">
          {module.activities.map((act, index) => {
            const isCompleted = index < completedActivities;
            const isCurrent = act.id === currentActivity;
            
            return (
              <button
                key={act.id}
                onClick={() => setCurrentActivity(act.id)}
                className={`w-full text-left p-3 rounded-lg transition-all ${
                  isCurrent
                    ? 'bg-[#98FF98]/10 border border-[#98FF98]/30'
                    : 'hover:bg-[#0A0E27]'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="mt-0.5">
                    {isCompleted ? (
                      <CheckCircle2 className="w-5 h-5 text-[#98FF98]" />
                    ) : (
                      <Circle className="w-5 h-5 text-gray-600" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className={`text-sm ${isCurrent ? 'text-white' : 'text-gray-400'}`}>
                      {act.title}
                    </div>
                    {act.type === 'video' && (
                      <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                        <Play className="w-3 h-3" />
                        Video
                      </div>
                    )}
                    {act.type === 'activity' && (
                      <div className="text-xs text-[#00D9FF] mt-1">
                        Actividad Interactiva
                      </div>
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Right Content Area */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto p-8">
          {activity?.type === 'video' && contentData && (
            <div className="space-y-8">
              {/* Video Player */}
              <div className="bg-[#151B3D] rounded-2xl overflow-hidden border border-gray-800">
                <div className="aspect-video bg-black flex items-center justify-center">
                  {contentData.video.includes('VIDEO_ID_AQUI') ? (
                    <div className="text-center p-8">
                      <div className="text-gray-400 mb-2">
                        <Play className="w-16 h-16 mx-auto mb-4 opacity-50" />
                      </div>
                      <p className="text-gray-500 text-sm mb-2">Video Placeholder</p>
                      <p className="text-gray-600 text-xs">
                        Reemplaza el URL en el código con tu video de YouTube, Genially o Canva
                      </p>
                      <p className="text-gray-600 text-xs mt-2">
                        Ejemplo: https://www.youtube.com/embed/TU_VIDEO_ID
                      </p>
                    </div>
                  ) : (
                    <iframe
                      width="100%"
                      height="100%"
                      src={contentData.video}
                      title={contentData.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full"
                    />
                  )}
                </div>
                <div className="p-6">
                  <h1 className="text-white mb-4">{contentData.title}</h1>
                  <button
                    onClick={handleActivityComplete}
                    className="bg-gradient-to-r from-[#98FF98] to-[#00D9FF] text-[#0A0E27] px-6 py-2 rounded-lg hover:opacity-90 transition-opacity"
                  >
                    Marcar como Completado
                  </button>
                </div>
              </div>

              {/* Notes Content */}
              <div className="bg-[#151B3D] rounded-2xl p-8 border border-gray-800">
                <div 
                  className="prose prose-invert prose-lg max-w-none"
                  dangerouslySetInnerHTML={{ __html: contentData.notes }}
                />
              </div>
            </div>
          )}

          {activity?.type === 'activity' && (
            <div>
              {moduleNumber === 1 && (
                <MatchingActivity onComplete={handleActivityComplete} />
              )}
              {moduleNumber === 2 && (
                <ADDIEActivity onComplete={handleActivityComplete} />
              )}
              {moduleNumber === 3 && (
                <WordSearchActivity onComplete={handleActivityComplete} />
              )}
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between mt-8 pt-8 border-t border-gray-800">
            <button
              onClick={goToPrevious}
              disabled={currentActivity === 1}
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-5 h-5" />
              Actividad Anterior
            </button>

            <button
              onClick={goToNext}
              disabled={currentActivity === module.activities.length}
              className="flex items-center gap-2 bg-gradient-to-r from-[#98FF98] to-[#00D9FF] text-[#0A0E27] px-6 py-2 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-30 disabled:cursor-not-allowed"
            >
              Siguiente Actividad
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}