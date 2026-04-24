
  # 📚 Cursoova - OVA de Automatización con n8n

Plataforma educativa interactiva para aprender automatización de procesos con **n8n**.

## 🚀 Inicio Rápido

```bash
npm i              # Instalar dependencias
npm run dev        # Iniciar desarrollo
npm run build      # Build para producción
```

## 📁 Estructura

```
src/
├── components/       → Componentes principales
├── activities/       → Actividades interactivas (Word Search, Matching, etc)
├── pages/            → Páginas con herramientas específicas
├── ui/               → Componentes reutilizables (Radix UI)
└── styles/           → Estilos globales (Tailwind CSS)
```

## 🛠️ Stack

- **React 18** + **TypeScript**
- **Vite** (build tool)
- **Tailwind CSS** (tema oscuro)
- **Radix UI** (componentes accesibles)

## 📝 Para Desarrolladores

- Componentes en **PascalCase**: `WordSearchActivity.tsx`
- Colores principales: `#0A0E27` (bg), `#98FF98` (verde), `#00D9FF` (cian)
- Usar Tailwind classes para estilos
- Props con interfaz: `ComponentProps`

## ✏️ Cómo Hacer Cambios

```bash
# 1. Crear rama para tu cambio (opcional)
git checkout -b mi-cambio

# 2. Hacer cambios en los archivos
# (Edita los archivos en src/)

# 3. Verificar cambios en desarrollo
npm run dev

# 4. Hacer commit
git add .
git commit -m "Descripción breve del cambio"

# 5. Enviar a GitHub
git push origin main
```

**Tipos de cambios comunes:**
- **Nueva actividad**: Crear archivo en `src/components/activities/`
- **Nueva página**: Crear archivo en `src/components/pages/`
- **Cambios de estilos**: Editar clases Tailwind en el componente
- **Cambios de colores**: Buscar y reemplazar el código de color

## 🚢 Deploy a cPanel

```bash
npm run build    # Genera /build/
# Comprimir /build/ → Subir ZIP a cPanel → Extraer en public_html
```

## 📖 Referencia Figma

[Dark-Themed Content Dashboard](https://www.figma.com/design/nAvdnpTt6QoLoiGvklD0FT/Dark-Themed-Content-Dashboard--Copy-)
  