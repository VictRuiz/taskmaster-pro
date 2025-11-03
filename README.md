# 📋 TaskMaster Pro

Una aplicación web profesional de gestión de tareas y proyectos, construida con **Vanilla JavaScript ES6**, **Webpack** y **TailwindCSS**. 

Diseño moderno con paleta de colores premium (Negro, Oro y Rojo) y una arquitectura limpia basada en componentes reutilizables.

---

## 🎯 Características

### ✨ Funcionalidades Principales

- **Gestión de Proyectos**
  - ✅ Crear, editar y eliminar proyectos
  - ✅ Asignar colores personalizados a cada proyecto
  - ✅ Contador automático de tareas por proyecto
  - ✅ Selector de proyecto activo con interfaz intuitiva
  - ✅ Botones de eliminación con confirmación

- **Gestión de Tareas**
  - ✅ Crear tareas con título, descripción y fecha de vencimiento
  - ✅ Marcar tareas como completadas/incompletas
  - ✅ Establecer prioridades (Baja, Media, Alta)
  - ✅ Agregar notas y checklists personalizados
  - ✅ Eliminar tareas con confirmación
  - ✅ Visualizar tareas separadas por estado (pendientes/completadas)

- **Persistencia de Datos**
  - ✅ Guardado automático en `localStorage`
  - ✅ Restauración de datos al recargar la página
  - ✅ Sincronización en tiempo real sin servidor

- **Diseño & UX**
  - ✅ Interfaz moderna y responsiva
  - ✅ Paleta de colores profesional (Negro #1a1a1a, Oro #c69b63, Rojo #e63946)
  - ✅ Animaciones suaves y transiciones
  - ✅ Modo oscuro por defecto
  - ✅ Iconografía clara y consistente
  - ✅ Footer con atribución

- **Fechas & Localización**
  - ✅ Integración con `date-fns` para manipulación de fechas
  - ✅ Formato de fechas en español
  - ✅ Cálculo automático de días pendientes/vencidos

---

## 🛠️ Stack Tecnológico

| Tecnología | Versión | Propósito |
|-----------|---------|----------|
| **JavaScript ES6** | - | Lenguaje base (clases, módulos) |
| **Webpack** | 5.x | Empaquetador de módulos |
| **Babel** | 7.x | Transpilación a ES5 compatible |
| **TailwindCSS** | 3.x | Framework CSS utility-first |
| **PostCSS** | 8.x | Procesamiento de CSS |
| **date-fns** | 2.30.0 | Manipulación y formato de fechas |
| **uuid** | 9.0.0 | Generación de IDs únicos |
| **webpack-dev-server** | 4.x | Servidor de desarrollo con HMR |

---

## 📁 Estructura del Proyecto

```
taskmaster-pro/
├── src/
│   ├── components/              # Componentes de interfaz
│   │   ├── App.js               # Componente principal orquestador
│   │   ├── HeaderComponent.js    # Encabezado con título y stats
│   │   ├── ProjectListComponent.js  # Sidebar con lista de proyectos
│   │   ├── TodoListComponent.js     # Lista de tareas
│   │   ├── ProjectFormComponent.js  # Formulario para crear proyectos
│   │   ├── TodoFormComponent.js     # Formulario para crear tareas
│   │   └── FooterComponent.js       # Pie de página
│   ├── models/                  # Modelos de datos (ES6 Classes)
│   │   ├── Project.js           # Clase para gestionar Proyectos
│   │   └── Todo.js              # Clase para gestionar Tareas
│   ├── services/                # Servicios de negocio
│   │   ├── AppManager.js        # Orquestador de lógica (CRUD)
│   │   └── StorageManager.js    # Gestor de persistencia en localStorage
│   ├── styles/                  # Estilos CSS
│   │   └── index.css            # Estilos principales con TailwindCSS (~400 líneas)
│   └── utils/                   # Utilidades
│       └── dateUtils.js         # Funciones para manejo de fechas
├── public/
│   └── index.html               # HTML principal (punto de inicio)
├── dist/                        # Salida compilada (generada en build)
├── index.js                     # Punto de entrada de la aplicación
├── webpack.config.js            # Configuración de Webpack
├── tailwind.config.js           # Configuración de TailwindCSS con colores personalizados
├── postcss.config.js            # Configuración de PostCSS
├── package.json                 # Dependencias y scripts del proyecto
└── README.md                    # Este archivo
```

---

## 🚀 Instalación y Uso

### Requisitos
- **Node.js** >= 14.0.0
- **npm** >= 6.0.0

### Instalación

```bash
# Instalar dependencias
npm install
```

### Desarrollo

```bash
# Iniciar servidor de desarrollo (http://localhost:3000)
npm start

# O en modo watch sin servidor
npm run dev
```

### Producción

```bash
# Compilar para producción
npm run build

# Los archivos compilados estarán en la carpeta 'dist/'
```

---

## 📖 Guía de Uso

### Crear un Proyecto
1. Haz clic en "+ Nuevo Proyecto" en "Mis Proyectos"
2. Ingresa el nombre del proyecto
3. Selecciona un color
4. Haz clic en "Crear"

### Crear una Tarea
1. Selecciona un proyecto
2. Haz clic en "+ Nueva Tarea"
3. Completa los detalles (título, descripción, fecha, prioridad)
4. Haz clic en "Crear Tarea"

### Gestionar Tareas
- ✅ **Completar**: Marca el checkbox
- 🗑️ **Eliminar**: Haz clic en el botón de basura
- 🏷️ **Prioridad**: Cambia desde el selector

### Gestionar Proyectos
- 🖱️ **Seleccionar**: Haz clic para ver las tareas
- 🗑️ **Eliminar**: Pasa el mouse y haz clic en el icono de basura

---

## 🏗️ Arquitectura

### Patrón MVC (Model-View-Controller)

```
Usuario → Componente → App.js → AppManager → StorageManager
                        ↓
                      Modelos (Project, Todo)
                        ↓
                    localStorage
```

### Flujo de Datos
1. Usuario interactúa con un componente
2. Componente dispara un evento CustomEvent
3. App.js escucha el evento y llama a AppManager
4. AppManager actualiza los modelos y StorageManager
5. StorageManager guarda en localStorage
6. App.js renderiza todos los componentes
7. Componentes se actualizan automáticamente

### Modelos de Datos

#### Clase `Todo`
```javascript
{
  id: string (UUID),
  title: string,
  description: string,
  dueDate: Date | null,
  priority: 'low' | 'medium' | 'high',
  notes: string,
  checklist: Array<{ id, text, completed }>,
  completed: boolean,
  createdAt: Date,
  updatedAt: Date
}
```

#### Clase `Project`
```javascript
{
  id: string (UUID),
  name: string,
  color: string (hex),
  todos: Array<Todo>,
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🎨 Paleta de Colores

| Color | Hex | Uso |
|-------|-----|-----|
| **Primario (Oro)** | `#c69b63` | Bordes, acentos |
| **Secundario (Rojo)** | `#e63946` | Botones, alertas |
| **Terciario (Rojo Oscuro)** | `#a4161a` | Hover |
| **Fondo (Negro)** | `#1a1a1a` | Fondo principal |
| **Texto** | `#f5f5f5` | Texto predeterminado |

---

## 📦 Scripts NPM

```bash
npm start          # Inicia servidor de desarrollo con HMR
npm run build      # Compila para producción
npm run dev        # Modo watch sin servidor
```

---

## 💾 Almacenamiento

Los datos se guardan automáticamente en `localStorage` bajo la clave `taskmaster-pro-data`:

```javascript
{
  projects: [
    {
      id: "uuid...",
      name: "Mi Proyecto",
      color: "#c69b63",
      todos: [...]
    }
  ]
}
```

**Nota**: `localStorage` tiene un límite de ~5-10MB por dominio.

---

## ✨ Características Destacadas

- **Interfaz Intuitiva**: Diseño limpio y fácil de usar
- **Responsive**: Funciona en desktop, tablet y móvil
- **Sin Backend**: Todo funciona localmente en el navegador
- **Datos Persistentes**: Los cambios se guardan automáticamente
- **Rendimiento Optimizado**: Bundle minificado (~718 KiB)
- **Código Limpio**: Arquitectura modular y bien organizada

---

## 🔧 Configuración

### webpack.config.js
- Modo development/production
- Hot Module Replacement (HMR) habilitado
- Minificación en producción
- Tree-shaking automático

### tailwind.config.js
- Colores personalizados
- Fuentes: Inter, Poppins, Fira Code
- Shadows personalizados

### postcss.config.js
- Tailwind plugin integrado
- Autoprefixer habilitado

---

## 📊 Estadísticas

| Métrica | Valor |
|---------|-------|
| **Componentes** | 7 |
| **Modelos** | 2 |
| **Servicios** | 2 |
| **Líneas de Código JS** | ~1,500+ |
| **Líneas de CSS** | ~400+ |
| **Tamaño Bundle** | ~718 KiB (minificado) |
| **Dependencias** | 3 |
| **DevDependencies** | 16 |

---

## 🎓 Tecnologías Aprendidas

Este proyecto es un ejercicio práctico que implementa:

✅ Vanilla JavaScript ES6 (clases, módulos, arrow functions)
✅ Programación Orientada a Objetos
✅ Webpack y Babel para transpilación
✅ TailwindCSS para diseño responsive
✅ localStorage para persistencia de datos
✅ CustomEvents para comunicación entre componentes
✅ Patrón MVC
✅ Manejo de fechas con date-fns
✅ Genración de UUIDs

---

## ⚖️ Licencia

MIT

---

**Proyecto completado**: Noviembre 2025
