import { Project } from '../models/Project';
import { Todo } from '../models/Todo';
import { StorageManager } from './StorageManager';

/**
 * AppManager - Gestiona la lógica de la aplicación
 * Separado completamente de la lógica del DOM
 */
export class AppManager {
  constructor() {
    this.projects = [];
    this.currentProject = null;
    this.init();
  }

  /**
   * Inicializa la aplicación
   */
  init() {
    this.projects = StorageManager.loadProjects();
    this.currentProject = this.projects[0];
    console.log('✓ AppManager inicializado');
  }

  // ============ MÉTODOS DE PROYECTO ============

  /**
   * Crea un nuevo proyecto
   */
  createProject(name, color = '#DC2626') {
    const project = new Project(name, color);
    this.projects.push(project);
    this.currentProject = project;
    this.save();
    console.log(`✓ Proyecto creado: ${name}`);
    return project;
  }

  /**
   * Obtiene todos los proyectos
   */
  getProjects() {
    return this.projects;
  }

  /**
   * Obtiene un proyecto por ID
   */
  getProject(projectId) {
    return this.projects.find(p => p.id === projectId);
  }

  /**
   * Establece el proyecto actual
   */
  setCurrentProject(projectId) {
    const project = this.getProject(projectId);
    if (project) {
      this.currentProject = project;
      console.log(`✓ Proyecto actual cambiado a: ${project.name}`);
      return true;
    }
    return false;
  }

  /**
   * Elimina un proyecto
   */
  deleteProject(projectId) {
    const index = this.projects.findIndex(p => p.id === projectId);
    if (index !== -1) {
      const project = this.projects[index];
      this.projects.splice(index, 1);
      
      // Si era el proyecto actual, cambiar a otro
      if (this.currentProject.id === projectId) {
        this.currentProject = this.projects[0] || null;
      }
      
      this.save();
      console.log(`✓ Proyecto eliminado: ${project.name}`);
      return true;
    }
    return false;
  }

  /**
   * Actualiza un proyecto
   */
  updateProject(projectId, updates) {
    const project = this.getProject(projectId);
    if (project) {
      if (updates.name) project.setName(updates.name);
      if (updates.color) project.setColor(updates.color);
      this.save();
      console.log(`✓ Proyecto actualizado: ${project.name}`);
      return true;
    }
    return false;
  }

  // ============ MÉTODOS DE TAREA ============

  /**
   * Crea una nueva tarea en el proyecto actual
   */
  createTodo(title, description = '', dueDate = null, priority = 'medium', notes = '') {
    if (!this.currentProject) {
      console.error('✗ No hay proyecto actual');
      return null;
    }

    const todo = new Todo(title, description, dueDate, priority, notes);
    this.currentProject.addTodo(todo);
    this.save();
    console.log(`✓ Tarea creada: ${title}`);
    return todo;
  }

  /**
   * Obtiene todas las tareas del proyecto actual
   */
  getTodos() {
    if (!this.currentProject) return [];
    return this.currentProject.getAllTodos();
  }

  /**
   * Obtiene una tarea por ID
   */
  getTodo(todoId) {
    if (!this.currentProject) return null;
    return this.currentProject.getTodo(todoId);
  }

  /**
   * Marca una tarea como completada
   */
  completeTodo(todoId) {
    const todo = this.getTodo(todoId);
    if (todo) {
      todo.markComplete();
      this.save();
      console.log(`✓ Tarea completada: ${todo.title}`);
      return true;
    }
    return false;
  }

  /**
   * Marca una tarea como incompleta
   */
  incompleteTodo(todoId) {
    const todo = this.getTodo(todoId);
    if (todo) {
      todo.markIncomplete();
      this.save();
      console.log(`✓ Tarea marcada como incompleta: ${todo.title}`);
      return true;
    }
    return false;
  }

  /**
   * Elimina una tarea
   */
  deleteTodo(todoId) {
    if (this.currentProject && this.currentProject.removeTodo(todoId)) {
      this.save();
      console.log(`✓ Tarea eliminada`);
      return true;
    }
    return false;
  }

  /**
   * Actualiza una tarea
   */
  updateTodo(todoId, updates) {
    const todo = this.getTodo(todoId);
    if (todo) {
      todo.update(updates);
      this.save();
      console.log(`✓ Tarea actualizada: ${todo.title}`);
      return true;
    }
    return false;
  }

  /**
   * Establece la prioridad de una tarea
   */
  setTodoPriority(todoId, priority) {
    const todo = this.getTodo(todoId);
    if (todo) {
      todo.setPriority(priority);
      this.save();
      console.log(`✓ Prioridad de tarea actualizada a: ${priority}`);
      return true;
    }
    return false;
  }

  /**
   * Obtiene tareas pendientes
   */
  getPendingTodos() {
    if (!this.currentProject) return [];
    return this.currentProject.getPendingTodos();
  }

  /**
   * Obtiene tareas completadas
   */
  getCompletedTodos() {
    if (!this.currentProject) return [];
    return this.currentProject.getCompletedTodos();
  }

  /**
   * Obtiene tareas por prioridad
   */
  getTodosByPriority(priority) {
    if (!this.currentProject) return [];
    return this.currentProject.getTodosByPriority(priority);
  }

  // ============ MÉTODOS DE PERSISTENCIA ============

  /**
   * Guarda todos los cambios
   */
  save() {
    StorageManager.saveProjects(this.projects);
  }

  /**
   * Obtiene estadísticas
   */
  getStats() {
    if (!this.currentProject) {
      return {
        total: 0,
        completed: 0,
        pending: 0
      };
    }

    return {
      projectName: this.currentProject.name,
      total: this.currentProject.getTodoCount(),
      completed: this.currentProject.getCompletedCount(),
      pending: this.currentProject.getPendingTodos().length
    };
  }

  /**
   * Exporta datos (para debug)
   */
  exportData() {
    return {
      projects: this.projects.map(p => p.toJSON()),
      currentProject: this.currentProject ? this.currentProject.toJSON() : null,
      stats: this.getStats()
    };
  }
}
