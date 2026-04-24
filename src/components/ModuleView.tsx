import { useState } from 'react';
import { ChevronLeft, ChevronRight, CheckCircle2, Circle, Play, BookOpen, Volume2, ImageIcon, Loader } from 'lucide-react';
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
      { id: 1, title: 'Clase 1: Introducción a los OVA, LMS y Automatización', type: 'video' as const },
      { id: 2, title: 'Clase 2: Los OVAs', type: 'video' as const },
      { id: 3, title: 'Clase 3: LMS', type: 'pdfAudio' as const },
      { id: 4, title: 'Clase 4: N8N', type: 'video' as const },
      { id: 5, title: 'Clase Extra: Mapa Comparativo de Herramientas', type: 'image' as const },
      { id: 6, title: 'Auto-Evaluación: Conceptos Clave', type: 'activity' as const },
    ],
    content: {
      1: {
        title: 'Clase 1: Introducción a los OVA, LMS y Automatización',
        video: 'https://www.enlacedigital.pedagogiavirtual.com/ovas/curso_ovas_n8n/content/module_1/class_1.mp4',
        notes: `
          <h3>Los Tres Pilares de la Educación Digital</h3>
          <p>En la era digital, la educación se cimienta sobre tres pilares esenciales que garantizan eficiencia y calidad:</p>
          
          <h3>1. Los OVA (Objetos Virtuales de Aprendizaje)</h3>
          <p>Son los recursos digitales fundamentales (videos, infografías, simuladores) diseñados para ser reutilizables y con una clara intención educativa. Son el contenido que consumes.</p>
          
          <h3>2. El LMS (Learning Management System)</h3>
          <p>Es la plataforma central (como Moodle o Canvas) que organiza, administra y distribuye esos OVAs. Es el aula virtual donde interactúas.</p>
          
          <h3>3. La Automatización</h3>
          <p>Es el motor invisible que optimiza procesos como la calificación, el seguimiento del progreso y las notificaciones. Permite que dediques menos tiempo a lo administrativo y más a lo pedagógico.</p>
        `,
      },
      2: {
        title: 'Clase 2: Los OVAs',
        video: 'https://www.enlacedigital.pedagogiavirtual.com/ovas/curso_ovas_n8n/content/module_1/class%202.mp4',
        notes: `
          <h3>Objetos Virtuales de Aprendizaje (OVAs)</h3>
          <p>Los OVAs son recursos educativos digitales reutilizables, diseñados con una clara intención pedagógica y un objetivo específico de aprendizaje.</p>
          
          <h3>Características Principales</h3>
          <ul>
            <li><strong>Reutilizables:</strong> Pueden ser utilizados en diferentes contextos y plataformas</li>
            <li><strong>Modular:</strong> Componentes independientes que se pueden combinar</li>
            <li><strong>Interactivos:</strong> Incluyen actividades y retroalimentación</li>
            <li><strong>Accesibles:</strong> Diseñados para diferentes tipos de aprendices</li>
          </ul>
          
          <h3>Tipos de OVAs</h3>
          <ul>
            <li>Videos educativos</li>
            <li>Infografías interactivas</li>
            <li>Simuladores</li>
            <li>Ejercicios prácticos</li>
            <li>Casos de estudio</li>
            <li>Recursos multimedia</li>
          </ul>
        `,
      },
      3: {
        title: 'Clase 3: LMS',
        pdfUrl: 'https://www.enlacedigital.pedagogiavirtual.com/ovas/curso_ovas_n8n/content/module_1/class_3.pdf#toolbar=0',
        audioUrl: 'https://www.enlacedigital.pedagogiavirtual.com/ovas/curso_ovas_n8n/content/module_1/class_3.ogg',
      },
      4: {
        title: 'Clase 4: N8N',
        video: 'https://www.enlacedigital.pedagogiavirtual.com/ovas/curso_ovas_n8n/content/module_1/class_4.mp4',
        notes: `
          <h3>¿Qué es N8N?</h3>
          <p>N8N (que proviene de "nodemation") es una poderosa herramienta de automatización de flujo de trabajo diseñada para conectar aplicaciones y servicios sin necesidad de codificación compleja. A diferencia de soluciones propietarias, su principal atractivo es ser de código abierto (open source), ofreciendo una gran flexibilidad y control.</p>
          
          <h3>Funcionamiento</h3>
          <p>La esencia de N8N radica en su enfoque visual:</p>
          
          <ul>
            <li><strong>Flujos de Trabajo Basados en Nodos:</strong> Permite construir automatizaciones arrastrando y conectando nodos en un lienzo. Cada nodo representa una aplicación, un servicio (como Slack, Google Sheets o un servicio de correo electrónico), o una función específica (como formatear datos, establecer condiciones o realizar bucles).</li>
            <li><strong>Activadores (Triggers):</strong> Cada flujo de trabajo comienza con un nodo de activación (trigger), que puede ser un evento específico (ej. "llegó un nuevo email", "se actualizó una fila en la base de datos") o un horario programado.</li>
            <li><strong>Transformación de Datos:</strong> Los datos fluyen de un nodo al siguiente, donde pueden ser modificados, filtrados o enriquecidos antes de pasar a la acción final.</li>
          </ul>
          
          <h3>Ventajas Clave</h3>
          <ul>
            <li><strong>Código Abierto y Autoalojamiento:</strong> Permite a los usuarios instalar y ejecutar N8N en sus propios servidores (self-hosted). Esto proporciona máximo control sobre los datos y reduce costos a largo plazo.</li>
            <li><strong>Amplia Conectividad:</strong> Ofrece cientos de integraciones prediseñadas con las aplicaciones más populares (CRM, bases de datos, redes sociales, etc.) y la capacidad de conectarse a cualquier API web.</li>
            <li><strong>Flexibilidad:</strong> Es ideal para escenarios complejos que requieren lógica condicional avanzada, manipulación de datos y bucles, funcionalidades que a menudo son limitadas en otras herramientas de automatización visual.</li>
          </ul>
        `,
      },
      5: {
        title: 'Clase Extra: Mapa Comparativo de Herramientas',
        imageUrl: 'https://www.enlacedigital.pedagogiavirtual.com/ovas/curso_ovas_n8n/content/module_1/extra_class.jpeg',
      },
    },
  },
  2: {
    title: 'N8N',
    activities: [
      { id: 1, title: 'Clase 1: Diseño Instruccional y Automatización con n8n', type: 'video' as const },
      { id: 2, title: 'Clase 2: Modelo ADDIE y Conceptos de n8n', type: 'video' as const },
      { id: 3, title: 'Clase 3: Comienzos con n8n', type: 'video' as const },
      { id: 4, title: 'Clase 4: Conexión de n8n con Moodle', type: 'video' as const },
      { id: 5, title: 'Auto-Evaluación: Nodos Clave de n8n', type: 'activity' as const },
    ],
    content: {
      1: {
        title: 'Clase 1: Diseño Instruccional y Automatización con n8n',
        video: 'https://www.enlacedigital.pedagogiavirtual.com/ovas/curso_ovas_n8n/content/module_2/class_1.mp4',
        notes: `
          <h3>Integración del Diseño Instruccional con Automatización</h3>
          <p>La combinación del diseño instruccional ADDIE con herramientas como n8n permite crear experiencias educativas automatizadas y eficientes.</p>
          
          <h3>Beneficios de la Automatización en Educación</h3>
          <ul>
            <li><strong>Eficiencia:</strong> Reduce tareas administrativas repetitivas</li>
            <li><strong>Escalabilidad:</strong> Permite atender más estudiantes sin aumentar recursos</li>
            <li><strong>Personalización:</strong> Adapta contenidos según el progreso del estudiante</li>
            <li><strong>Consistencia:</strong> Asegura procesos uniformes en todos los cursos</li>
            <li><strong>Datos en Tiempo Real:</strong> Monitoreo continuo del desempeño</li>
          </ul>
          
          <h3>Casos de Uso en LMS</h3>
          <ul>
            <li>Inscripción automática de estudiantes</li>
            <li>Envío de recordatorios de tareas</li>
            <li>Calificación automática de evaluaciones</li>
            <li>Generación de certificados</li>
            <li>Reportes de progreso automatizados</li>
          </ul>
        `,
      },
      2: {
        title: 'Clase 2: Modelo ADDIE y Conceptos de n8n',
        video: 'https://www.enlacedigital.pedagogiavirtual.com/ovas/curso_ovas_n8n/content/module_2/class_2.mp4',
        notes: `
          <h3>ADDIE + n8n: Una Combinación Poderosa</h3>
          <p>El modelo ADDIE proporciona la estructura pedagógica, mientras que n8n proporciona las herramientas técnicas para implementarla.</p>
          
          <h3>Análisis con n8n</h3>
          <ul>
            <li>Recopilación automatizada de datos de necesidades</li>
            <li>Análisis de encuestas con integraciones</li>
            <li>Mapeo de requisitos técnicos</li>
          </ul>
          
          <h3>Diseño con n8n</h3>
          <ul>
            <li>Flujos de aprobación de contenidos</li>
            <li>Gestión de versiones de materiales</li>
            <li>Sincronización de calendarios</li>
          </ul>
          
          <h3>Desarrollo y Entrega con n8n</h3>
          <ul>
            <li>Distribución automática de recursos</li>
            <li>Activación programada de contenidos</li>
            <li>Notificaciones de disponibilidad</li>
          </ul>
          
          <h3>Evaluación Continua</h3>
          <ul>
            <li>Recopilación automática de métricas</li>
            <li>Alertas de bajo desempeño</li>
            <li>Generación de reportes analíticos</li>
          </ul>
        `,
      },
      3: {
        title: 'Clase 3: Comienzos con n8n',
        video: 'https://www.enlacedigital.pedagogiavirtual.com/ovas/curso_ovas_n8n/content/module_2/class_3.mp4',
        notes: `
          <h3>Primeros Pasos en n8n</h3>
          <p>Aprende cómo crear tu primer flujo de trabajo en n8n, desde la configuración inicial hasta la activación.</p>
          
          <h3>Instalación y Configuración</h3>
          <ul>
            <li>Descarga e instalación de n8n</li>
            <li>Configuración inicial</li>
            <li>Acceso a la interfaz web</li>
            <li>Creación de cuenta y credenciales</li>
          </ul>
          
          <h3>Conceptos Básicos</h3>
          <ul>
            <li><strong>Workflow:</strong> Tu automatización completa</li>
            <li><strong>Nodes:</strong> Bloques de construcción</li>
            <li><strong>Triggers:</strong> Eventos que inician el flujo</li>
            <li><strong>Connections:</strong> Enlaces entre nodos</li>
          </ul>
          
          <h3>Tu Primer Flujo</h3>
          <ul>
            <li>Seleccionar un trigger simple (manual o schedule)</li>
            <li>Agregar un nodo de acción</li>
            <li>Configurar parámetros básicos</li>
            <li>Probar y activar</li>
          </ul>
          
          <h3>Mejores Prácticas</h3>
          <ul>
            <li>Documentar tus flujos</li>
            <li>Usar nombres descriptivos</li>
            <li>Probar antes de activar</li>
            <li>Monitorear ejecuciones</li>
          </ul>
        `,
      },
      4: {
        title: 'Clase 4: Conexión de n8n con Moodle',
        video: 'https://www.enlacedigital.pedagogiavirtual.com/ovas/curso_ovas_n8n/content/module_2/class_4.mp4',
        notes: `
          <h3>Integrando n8n con Moodle</h3>
          <p>Moodle proporciona APIs potentes que permiten la automatización a través de n8n.</p>
          
          <h3>Requisitos Previos</h3>
          <ul>
            <li>Acceso administrativo a tu instancia de Moodle</li>
            <li>Token de acceso API de Moodle</li>
            <li>URL de tu instancia Moodle</li>
            <li>Credenciales de n8n configuradas</li>
          </ul>
          
          <h3>Principales Integraciones</h3>
          <ul>
            <li><strong>Gestión de Usuarios:</strong> Crear, actualizar, eliminar usuarios</li>
            <li><strong>Cursos:</strong> Crear cursos, agregar estudiantes</li>
            <li><strong>Calificaciones:</strong> Obtener y actualizar calificaciones</li>
            <li><strong>Asignaciones:</strong> Crear tareas y acceder a envíos</li>
            <li><strong>Foros:</strong> Automatizar publicaciones y respuestas</li>
          </ul>
          
          <h3>Flujos Comunes Moodle + n8n</h3>
          <ul>
            <li>Inscribir usuarios automáticamente desde Google Forms</li>
            <li>Enviar recordatorios de tareas pendientes</li>
            <li>Generar reportes de progreso semanales</li>
            <li>Crear backup automático de datos</li>
            <li>Sincronizar calificaciones con sistemas externos</li>
          </ul>
          
          <h3>Seguridad y Buenas Prácticas</h3>
          <ul>
            <li>Usar tokens con permisos limitados</li>
            <li>Encriptar datos sensibles</li>
            <li>Auditar flujos regularmente</li>
            <li>Implementar manejo de errores</li>
            <li>Documentar cambios en flujos</li>
          </ul>
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
  const [isVideoLoading, setIsVideoLoading] = useState(true);
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
                    {act.type === 'pdf' && (
                      <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                        <BookOpen className="w-3 h-3" />
                        PDF
                      </div>
                    )}
                    {act.type === 'pdfAudio' && (
                      <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                        <BookOpen className="w-3 h-3" />
                        PDF + Audio
                      </div>
                    )}
                    {act.type === 'image' && (
                      <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                        <ImageIcon className="w-3 h-3" />
                        Imagen
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
                <div className={`aspect-video bg-black flex items-center justify-center relative video-container ${isVideoLoading ? 'loading' : ''}`}>
                  {isVideoLoading && (
                    <div className="video-spinner">
                      <div className="video-spinner-icon"></div>
                    </div>
                  )}
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
                      onLoad={() => setIsVideoLoading(false)}
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
              {contentData.notes && (
                <div className="bg-[#151B3D] rounded-2xl p-8 border border-gray-800">
                  <div 
                    className="prose prose-invert prose-lg max-w-none"
                    dangerouslySetInnerHTML={{ __html: contentData.notes }}
                  />
                </div>
              )}
            </div>
          )}

          {activity?.type === 'pdf' && contentData && (
            <div className="bg-[#151B3D] rounded-2xl overflow-hidden border border-gray-800">
              <div className="p-6 border-b border-gray-800">
                <h1 className="text-white mb-2">{contentData.title}</h1>
                <p className="text-gray-400 text-sm">Documento en formato PDF</p>
              </div>
              <div className="aspect-[4/5] bg-black flex items-center justify-center">
                {contentData.pdfUrl === 'URL_DE_TU_PDF_AQUI' ? (
                  <div className="text-center p-8">
                    <div className="text-gray-400 mb-2">
                      <BookOpen className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    </div>
                    <p className="text-gray-500 text-sm mb-2">PDF Placeholder</p>
                    <p className="text-gray-600 text-xs">
                      Reemplaza el URL en el código con tu documento PDF
                    </p>
                    <p className="text-gray-600 text-xs mt-2">
                      Ejemplo: https://tu-servidor.com/documento.pdf
                    </p>
                  </div>
                ) : (
                  <iframe
                    src={contentData.pdfUrl}
                    title={contentData.title}
                    className="w-full h-full"
                    frameBorder="0"
                  />
                )}
              </div>
              <div className="p-6 border-t border-gray-800">
                <button
                  onClick={handleActivityComplete}
                  className="bg-gradient-to-r from-[#98FF98] to-[#00D9FF] text-[#0A0E27] px-6 py-2 rounded-lg hover:opacity-90 transition-opacity"
                >
                  Marcar como Completado
                </button>
              </div>
            </div>
          )}

          {activity?.type === 'pdfAudio' && contentData && (
            <div className="space-y-6">
              {/* PDF Viewer */}
              <div className="bg-[#151B3D] rounded-2xl overflow-hidden border border-gray-800">
                <div className="p-6 border-b border-gray-800">
                  <h1 className="text-white mb-2">{contentData.title}</h1>
                  <p className="text-gray-400 text-sm">Documento PDF con audio complementario</p>
                </div>
                <div className="aspect-[4/5] bg-black flex items-center justify-center">
                  {contentData.pdfUrl === 'URL_DE_TU_PDF_AQUI' ? (
                    <div className="text-center p-8">
                      <div className="text-gray-400 mb-2">
                        <BookOpen className="w-16 h-16 mx-auto mb-4 opacity-50" />
                      </div>
                      <p className="text-gray-500 text-sm mb-2">PDF Placeholder</p>
                      <p className="text-gray-600 text-xs">
                        Reemplaza el URL en el código con tu documento PDF
                      </p>
                    </div>
                  ) : (
                    <iframe
                      src={contentData.pdfUrl}
                      title={contentData.title}
                      className="w-full h-full"
                      frameBorder="0"
                    />
                  )}
                </div>
              </div>

              {/* Audio Player */}
              <div className="bg-[#151B3D] rounded-2xl p-6 border border-gray-800">
                <div className="flex items-center gap-3 mb-4">
                  <Volume2 className="w-5 h-5 text-[#00D9FF]" />
                  <h3 className="text-white">Audio Complementario</h3>
                </div>
                {contentData.audioUrl === 'URL_DE_TU_AUDIO_AQUI' ? (
                  <div className="bg-[#0A0E27] rounded-lg p-6 text-center">
                    <p className="text-gray-500 text-sm mb-2">Audio Placeholder</p>
                    <p className="text-gray-600 text-xs">
                      Reemplaza el URL con tu archivo de audio (MP3, WAV, etc.)
                    </p>
                  </div>
                ) : (
                  <div className="bg-gradient-to-r from-[#00D9FF]/10 to-[#98FF98]/10 rounded-xl p-6 border border-gray-700">
                    <audio 
                      controls 
                      className="w-full accent-[#00D9FF]"
                    >
                      <source src={contentData.audioUrl} />
                      Tu navegador no soporta el elemento de audio.
                    </audio>
                  </div>
                )}
              </div>

              <div className="bg-[#151B3D] rounded-2xl p-6 border border-gray-800">
                <button
                  onClick={handleActivityComplete}
                  className="bg-gradient-to-r from-[#98FF98] to-[#00D9FF] text-[#0A0E27] px-6 py-2 rounded-lg hover:opacity-90 transition-opacity"
                >
                  Marcar como Completado
                </button>
              </div>
            </div>
          )}

          {activity?.type === 'image' && contentData && (
            <div className="bg-[#151B3D] rounded-2xl overflow-hidden border border-gray-800">
              <div className="p-6 border-b border-gray-800">
                <h1 className="text-white mb-2">{contentData.title}</h1>
                <p className="text-gray-400 text-sm">Infografía comparativa</p>
              </div>
              <div className="bg-black flex items-center justify-center min-h-[500px] p-8">
                {contentData.imageUrl === 'URL_DE_TU_IMAGEN_AQUI' ? (
                  <div className="text-center p-8">
                    <div className="text-gray-400 mb-2">
                      <ImageIcon className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    </div>
                    <p className="text-gray-500 text-sm mb-2">Imagen Placeholder</p>
                    <p className="text-gray-600 text-xs">
                      Reemplaza el URL en el código con tu imagen
                    </p>
                    <p className="text-gray-600 text-xs mt-2">
                      Formatos soportados: JPG, PNG, SVG
                    </p>
                  </div>
                ) : (
                  <img 
                    src={contentData.imageUrl} 
                    alt={contentData.title}
                    className="max-w-full h-auto rounded-lg"
                  />
                )}
              </div>
              <div className="p-6 border-t border-gray-800">
                <button
                  onClick={handleActivityComplete}
                  className="bg-gradient-to-r from-[#98FF98] to-[#00D9FF] text-[#0A0E27] px-6 py-2 rounded-lg hover:opacity-90 transition-opacity"
                >
                  Marcar como Completado
                </button>
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