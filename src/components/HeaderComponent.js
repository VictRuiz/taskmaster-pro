/**
 * HeaderComponent - Componente del encabezado con diseño profesional
 */
export class HeaderComponent {
  constructor(appManager) {
    this.appManager = appManager;
  }

  render(element) {
    const stats = this.appManager.getStats();
    
    element.innerHTML = `
      <header class="app-header">
        <div class="max-w-7xl mx-auto">
          <div class="header-content">
            <div class="flex items-center gap-4">
              <div class="text-5xl">📋</div>
              <h1 class="app-title">TaskMaster Pro</h1>
            </div>
            
            <div class="flex items-center gap-6">
              ${stats.projectName ? `
                <div class="stats-container">
                  <div class="stat-item">
                    <div class="stat-value">${stats.completed}</div>
                    <div class="stat-label">Completadas</div>
                  </div>
                  <div class="w-px h-8 bg-primary-500"></div>
                  <div class="stat-item">
                    <div class="stat-value">${stats.pending}</div>
                    <div class="stat-label">Pendientes</div>
                  </div>
                </div>
              ` : ''}
              
              <button id="btn-new-project" class="btn btn-primary">
                ➕ Nuevo Proyecto
              </button>
            </div>
          </div>
        </div>
      </header>
    `;

    // Agregar event listener
    document.getElementById('btn-new-project')?.addEventListener('click', () => {
      this.showNewProjectForm();
    });
  }

  showNewProjectForm() {
    const dialog = document.createElement('div');
    dialog.className = 'modal-overlay';
    dialog.innerHTML = `
      <div class="modal-content">
        <h2 class="modal-title">📁 Crear Nuevo Proyecto</h2>
        <form id="project-form">
          <div class="form-group">
            <label class="form-label">Nombre del proyecto</label>
            <input type="text" id="project-name" class="form-input" placeholder="Ej: Proyecto Personal" required>
          </div>
          
          <div class="form-group">
            <label class="form-label">Color del proyecto</label>
            <div class="flex gap-3 mb-2">
              ${[
                { color: '#e63946', name: 'Rojo' },
                { color: '#1a1a1a', name: 'Negro' },
                { color: '#c69b63', name: 'Dorado' },
                { color: '#f5f5f5', name: 'Blanco' },
                { color: '#f59e0b', name: 'Ámbar' },
                { color: '#10b981', name: 'Verde' }
              ].map(({ color, name }) => `
                <button type="button" class="color-btn w-12 h-12 rounded-full border-4 border-transparent hover:border-accent-dark transition" 
                  style="background-color: ${color}" data-color="${color}" title="${name}"></button>
              `).join('')}
            </div>
          </div>
          
          <div class="flex justify-end gap-3 mt-6">
            <button type="button" class="btn btn-secondary">Cancelar</button>
            <button type="submit" class="btn btn-primary">Crear Proyecto</button>
          </div>
        </form>
      </div>
    `;

    document.body.appendChild(dialog);

    let selectedColor = '#e63946';
    dialog.querySelectorAll('.color-btn').forEach((btn, idx) => {
      if (idx === 0) btn.classList.add('border-accent-dark');
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        selectedColor = btn.dataset.color;
        dialog.querySelectorAll('.color-btn').forEach(b => b.classList.remove('border-accent-dark'));
        btn.classList.add('border-accent-dark');
      });
    });

    dialog.querySelector('form').addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('project-name').value;
      document.dispatchEvent(new CustomEvent('create-project', {
        detail: { name, color: selectedColor }
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
