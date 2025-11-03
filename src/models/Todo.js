/**
 * Clase Todo - Representa una tarea pendiente
 */
export class Todo {
  constructor(title, description = '', dueDate = null, priority = 'medium', notes = '', checklist = []) {
    this.id = Date.now().toString(); // ID único basado en timestamp
    this.title = title;
    this.description = description;
    this.dueDate = dueDate; // Formato: '2025-12-31'
    this.priority = priority; // 'low', 'medium', 'high'
    this.notes = notes;
    this.checklist = checklist; // Array de items con {text, completed}
    this.completed = false;
    this.createdAt = new Date().toISOString();
    this.updatedAt = new Date().toISOString();
  }

  /**
   * Marca la tarea como completada
   */
  markComplete() {
    this.completed = true;
    this.updatedAt = new Date().toISOString();
  }

  /**
   * Marca la tarea como incompleta
   */
  markIncomplete() {
    this.completed = false;
    this.updatedAt = new Date().toISOString();
  }

  /**
   * Actualiza la prioridad
   */
  setPriority(priority) {
    if (['low', 'medium', 'high'].includes(priority)) {
      this.priority = priority;
      this.updatedAt = new Date().toISOString();
    }
  }

  /**
   * Actualiza los detalles de la tarea
   */
  update(updates) {
    Object.assign(this, updates);
    this.updatedAt = new Date().toISOString();
  }

  /**
   * Convierte a JSON para almacenamiento
   */
  toJSON() {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      dueDate: this.dueDate,
      priority: this.priority,
      notes: this.notes,
      checklist: this.checklist,
      completed: this.completed,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }

  /**
   * Crea una instancia desde datos JSON
   */
  static fromJSON(data) {
    const todo = new Todo(
      data.title,
      data.description,
      data.dueDate,
      data.priority,
      data.notes,
      data.checklist
    );
    todo.id = data.id;
    todo.completed = data.completed;
    todo.createdAt = data.createdAt;
    todo.updatedAt = data.updatedAt;
    return todo;
  }
}
