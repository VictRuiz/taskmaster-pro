import { Todo } from './Todo';

/**
 * Clase Project - Representa un proyecto que contiene tareas
 */
export class Project {
  constructor(name, color = '#DC2626') {
    this.id = Date.now().toString();
    this.name = name;
    this.color = color;
    this.todos = []; // Array de tareas
    this.createdAt = new Date().toISOString();
    this.updatedAt = new Date().toISOString();
  }

  /**
   * Añade una tarea al proyecto
   */
  addTodo(todo) {
    this.todos.push(todo);
    this.updatedAt = new Date().toISOString();
    return todo;
  }

  /**
   * Elimina una tarea por ID
   */
  removeTodo(todoId) {
    const index = this.todos.findIndex(t => t.id === todoId);
    if (index !== -1) {
      this.todos.splice(index, 1);
      this.updatedAt = new Date().toISOString();
      return true;
    }
    return false;
  }

  /**
   * Obtiene una tarea por ID
   */
  getTodo(todoId) {
    return this.todos.find(t => t.id === todoId);
  }

  /**
   * Obtiene todas las tareas
   */
  getAllTodos() {
    return this.todos;
  }

  /**
   * Obtiene tareas completadas
   */
  getCompletedTodos() {
    return this.todos.filter(t => t.completed);
  }

  /**
   * Obtiene tareas pendientes
   */
  getPendingTodos() {
    return this.todos.filter(t => !t.completed);
  }

  /**
   * Obtiene tareas por prioridad
   */
  getTodosByPriority(priority) {
    return this.todos.filter(t => t.priority === priority);
  }

  /**
   * Cuenta de tareas
   */
  getTodoCount() {
    return this.todos.length;
  }

  /**
   * Cuenta de tareas completadas
   */
  getCompletedCount() {
    return this.getCompletedTodos().length;
  }

  /**
   * Actualiza el nombre del proyecto
   */
  setName(name) {
    this.name = name;
    this.updatedAt = new Date().toISOString();
  }

  /**
   * Actualiza el color del proyecto
   */
  setColor(color) {
    this.color = color;
    this.updatedAt = new Date().toISOString();
  }

  /**
   * Convierte a JSON para almacenamiento
   */
  toJSON() {
    return {
      id: this.id,
      name: this.name,
      color: this.color,
      todos: this.todos.map(t => t.toJSON()),
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }

  /**
   * Crea una instancia desde datos JSON
   */
  static fromJSON(data) {
    const project = new Project(data.name, data.color);
    project.id = data.id;
    project.createdAt = data.createdAt;
    project.updatedAt = data.updatedAt;
    project.todos = (data.todos || []).map(t => Todo.fromJSON(t));
    return project;
  }

  /**
   * Crea un proyecto por defecto
   */
  static createDefault() {
    return new Project('Mi Primer Proyecto', '#DC2626');
  }
}
