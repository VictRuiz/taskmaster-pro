import { AppManager } from '../services/AppManager';
import { ProjectListComponent } from './ProjectListComponent';
import { TodoListComponent } from './TodoListComponent';
import { ProjectFormComponent } from './ProjectFormComponent';
import { TodoFormComponent } from './TodoFormComponent';
import { HeaderComponent } from './HeaderComponent';
import { FooterComponent } from './FooterComponent';

/**
 * App - Componente principal que orquesta la interfaz
 */
export class App {
  constructor() {
    this.appManager = new AppManager();
    this.components = {};
    this.init();
  }

  /**
   * Inicializa la aplicación
   */
  init() {
    console.log('🚀 Inicializando TaskMaster Pro');
    
    // Obtener elemento raíz
    const root = document.getElementById('root');
    if (!root) {
      console.error('✗ No se encontró elemento #root');
      return;
    }

    // Limpiar contenido anterior
    root.innerHTML = '';

    // Crear estructura principal
    this.createMainStructure(root);
    this.setupEventListeners();
    this.render();

    console.log('✓ Aplicación iniciada correctamente');
  }

  /**
   * Crea la estructura HTML principal
   */
  createMainStructure(root) {
    root.innerHTML = `
      <div class="app-container flex flex-col min-h-screen">
        <header id="app-header"></header>
        <div class="flex gap-6 p-6 max-w-7xl mx-auto flex-1 w-full">
          <aside id="sidebar" class="sidebar"></aside>
          <main id="main-content" class="flex-1"></main>
          <div id="modal-container"></div>
        </div>
        <footer id="app-footer"></footer>
      </div>
    `;
  }

  /**
   * Renderiza todos los componentes
   */
  render() {
    // Renderizar header
    const headerElement = document.getElementById('app-header');
    if (headerElement) {
      const headerComponent = new HeaderComponent(this.appManager);
      headerComponent.render(headerElement);
    }

    // Renderizar sidebar con proyectos
    const sidebarElement = document.getElementById('sidebar');
    if (sidebarElement) {
      const projectListComponent = new ProjectListComponent(this.appManager, (projectId) => {
        this.appManager.setCurrentProject(projectId);
        this.render();
      });
      projectListComponent.render(sidebarElement);
    }

    // Renderizar contenido principal con tareas
    const mainElement = document.getElementById('main-content');
    if (mainElement) {
      const todoListComponent = new TodoListComponent(this.appManager, this);
      todoListComponent.render(mainElement);
    }

    // Renderizar footer
    const footerElement = document.getElementById('app-footer');
    if (footerElement) {
      const footerComponent = new FooterComponent();
      footerComponent.render(footerElement);
    }
  }

  /**
   * Configura los event listeners
   */
  setupEventListeners() {
    // Escuchar eventos de crear proyecto
    document.addEventListener('create-project', (e) => {
      const { name, color } = e.detail;
      this.appManager.createProject(name, color);
      this.render();
    });

    // Escuchar eventos de crear tarea
    document.addEventListener('create-todo', (e) => {
      const { title, description, dueDate, priority, notes } = e.detail;
      this.appManager.createTodo(title, description, dueDate, priority, notes);
      this.render();
    });

    // Escuchar eventos de completar tarea
    document.addEventListener('toggle-todo', (e) => {
      const { todoId, completed } = e.detail;
      if (completed) {
        this.appManager.completeTodo(todoId);
      } else {
        this.appManager.incompleteTodo(todoId);
      }
      this.render();
    });

    // Escuchar eventos de eliminar tarea
    document.addEventListener('delete-todo', (e) => {
      const { todoId } = e.detail;
      if (confirm('¿Eliminar esta tarea?')) {
        this.appManager.deleteTodo(todoId);
        this.render();
      }
    });

    // Escuchar eventos de cambiar prioridad
    document.addEventListener('change-priority', (e) => {
      const { todoId, priority } = e.detail;
      this.appManager.setTodoPriority(todoId, priority);
      this.render();
    });

    // Escuchar eventos de eliminar proyecto
    document.addEventListener('delete-project', (e) => {
      const { projectId } = e.detail;
      this.appManager.deleteProject(projectId);
      this.render();
    });
  }

  /**
   * Muestra un modal
   */
  showModal(component) {
    const modalContainer = document.getElementById('modal-container');
    if (modalContainer) {
      modalContainer.innerHTML = `
        <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div id="modal-content" class="bg-white rounded-lg shadow-lg p-6 w-full max-w-md"></div>
        </div>
      `;
      const modalContent = document.getElementById('modal-content');
      component.render(modalContent);
    }
  }

  /**
   * Cierra el modal
   */
  closeModal() {
    const modalContainer = document.getElementById('modal-container');
    if (modalContainer) {
      modalContainer.innerHTML = '';
    }
  }
}
