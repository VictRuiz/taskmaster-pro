import { DateUtils } from '../utils/dateUtils';

/**
 * TodoListComponent - Muestra la lista de tareas
 */
export class TodoListComponent {
  constructor(appManager, app) {
    this.appManager = appManager;
    this.app = app;
    this.expandedTodoId = null;
  }

  render(element) {
    const todos = this.appManager.getTodos();
    const currentProject = this.appManager.currentProject;

    if (!currentProject) {
      element.innerHTML = `
        <div class="empty-state">
          <div class="empty-state-icon">📭</div>
          <p class="empty-state-text">No hay proyecto seleccionado</p>
        </div>
      `;
      return;
    }

    if (todos.length === 0) {
      element.innerHTML = `
        <div class="empty-state">
          <div class="empty-state-icon">📭</div>
          <p class="empty-state-text">No hay tareas en este proyecto</p>
          <button id="btn-add-first-todo" class="btn btn-primary">
            ➕ Agregar primera tarea
          </button>
        </div>
      `;
      document.getElementById('btn-add-first-todo')?.addEventListener('click', () => {
        this.showNewTodoForm();
      });
      return;
    }

    // Agrupar tareas por estado
    const pendingTodos = todos.filter(t => !t.completed);
    const completedTodos = todos.filter(t => t.completed);

    element.innerHTML = `
      <div class="todos-container">
        <button id="btn-new-todo" class="w-full mb-6 btn btn-primary text-lg">
          ➕ Nueva Tarea
        </button>

        ${pendingTodos.length > 0 ? `
          <div class="mb-8">
            <h3 class="text-xl font-display font-bold text-accent-dark mb-4">
              🎯 Tareas Pendientes <span class="text-accent-red">(${pendingTodos.length})</span>
            </h3>
            <div class="space-y-3">
              ${pendingTodos.map(todo => this.renderTodoItem(todo)).join('')}
            </div>
          </div>
        ` : ''}

        ${completedTodos.length > 0 ? `
          <div class="mb-8">
            <h3 class="text-xl font-display font-bold text-accent-dark opacity-60 mb-4">
              ✅ Completadas <span class="text-green-600">(${completedTodos.length})</span>
            </h3>
            <div class="space-y-3 opacity-60">
              ${completedTodos.map(todo => this.renderTodoItem(todo, true)).join('')}
            </div>
          </div>
        ` : ''}
      </div>
    `;

    // Agregar event listeners
    this.attachEventListeners(element);
  }

  renderTodoItem(todo, isCompleted = false) {
    const daysUntil = DateUtils.getDaysUntil(todo.dueDate);
    const dueDateDisplay = todo.dueDate ? DateUtils.format(todo.dueDate) : '';
    const dueDateClass = todo.dueDate ? `todo-date ${DateUtils.getDateStatusClass(todo.dueDate)}` : '';

    return `
      <div class="todo-item ${isCompleted ? 'completed' : ''} border-l-accent-red" data-todo-id="${todo.id}">
        <div class="todo-header">
          <input type="checkbox" class="todo-checkbox" ${isCompleted ? 'checked' : ''} data-todo-id="${todo.id}">
          <div class="flex-1">
            <h4 class="todo-title ${isCompleted ? 'completed' : ''}">
              ${todo.title}
            </h4>
            ${todo.description ? `<p class="todo-description">${todo.description}</p>` : ''}
          </div>
          <span class="todo-priority priority-${todo.priority}">
            ${todo.priority === 'high' ? '🔴' : todo.priority === 'medium' ? '🟡' : '🟢'}
            ${todo.priority}
          </span>
        </div>
        
        <div class="todo-footer">
          ${todo.dueDate ? `
            <span class="${dueDateClass}">
              📅 ${dueDateDisplay}
              ${daysUntil !== null && daysUntil < 0 ? ` (${Math.abs(daysUntil)}d atrás)` : 
                daysUntil === 0 ? ' (hoy)' : 
                daysUntil === 1 ? ' (mañana)' : 
                daysUntil > 1 ? ` (en ${daysUntil}d)` : ''}
            </span>
          ` : '<span class="text-gray-400">Sin fecha</span>'}
          <button class="btn-icon todo-delete text-accent-red hover:text-accent-darkred" title="Eliminar">🗑️</button>
        </div>
      </div>
    `;
  }

  attachEventListeners(element) {
    // Botón nueva tarea
    const btnNewTodo = element.querySelector('#btn-new-todo');
    if (btnNewTodo) {
      btnNewTodo.addEventListener('click', () => {
        this.showNewTodoForm();
      });
    }

    // Checkbox de completar
    element.querySelectorAll('.todo-checkbox').forEach(checkbox => {
      checkbox.addEventListener('change', (e) => {
        const todoId = e.target.dataset.todoId;
        document.dispatchEvent(new CustomEvent('toggle-todo', {
          detail: { todoId, completed: e.target.checked }
        }));
      });
    });

    // Botón eliminar
    element.querySelectorAll('.todo-delete').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const todoId = e.target.closest('.todo-item').dataset.todoId;
        document.dispatchEvent(new CustomEvent('delete-todo', {
          detail: { todoId }
        }));
      });
    });
  }

  showNewTodoForm() {
    const dialog = document.createElement('div');
    dialog.className = 'modal-overlay';
    dialog.innerHTML = `
      <div class="modal-content">
        <h2 class="modal-title">✨ Nueva Tarea</h2>
        <form id="todo-form">
          <div class="form-group">
            <label class="form-label">Título de la tarea *</label>
            <input type="text" id="todo-title" class="form-input" placeholder="Ej: Completar proyecto" required>
          </div>
          
          <div class="form-group">
            <label class="form-label">Descripción</label>
            <textarea id="todo-description" class="form-textarea" placeholder="Detalles adicionales..." rows="3"></textarea>
          </div>
          
          <div class="form-group">
            <label class="form-label">Fecha de vencimiento</label>
            <input type="date" id="todo-duedate" class="form-input">
          </div>
          
          <div class="form-group">
            <label class="form-label">Prioridad</label>
            <select id="todo-priority" class="form-select">
              <option value="low">🟢 Baja</option>
              <option value="medium" selected>🟡 Media</option>
              <option value="high">🔴 Alta</option>
            </select>
          </div>
          
          <div class="flex justify-end gap-3 mt-6">
            <button type="button" class="btn btn-secondary">Cancelar</button>
            <button type="submit" class="btn btn-primary">Crear Tarea</button>
          </div>
        </form>
      </div>
    `;

    document.body.appendChild(dialog);

    dialog.querySelector('form').addEventListener('submit', (e) => {
      e.preventDefault();
      const title = document.getElementById('todo-title').value;
      const description = document.getElementById('todo-description').value;
      const dueDate = document.getElementById('todo-duedate').value;
      const priority = document.getElementById('todo-priority').value;

      document.dispatchEvent(new CustomEvent('create-todo', {
        detail: { title, description, dueDate, priority, notes: '' }
      }));
      dialog.remove();
    });

    dialog.querySelector('button[type="button"]').addEventListener('click', () => {
      dialog.remove();
    });

    // Cerrar al hacer click fuera
    dialog.addEventListener('click', (e) => {
      if (e.target === dialog) dialog.remove();
    });
  }
}
