/**
 * ProjectListComponent - Muestra la lista de proyectos con diseño profesional
 */
export class ProjectListComponent {
  constructor(appManager, onSelectProject) {
    this.appManager = appManager;
    this.onSelectProject = onSelectProject;
  }

  render(element) {
    const projects = this.appManager.getProjects();
    const currentProject = this.appManager.currentProject;

    element.innerHTML = `
      <div class="sidebar-card">
        <div class="card-header">
          <div class="sidebar-title">📁 Mis Proyectos</div>
        </div>
        <div class="card-body">
          ${projects.length === 0 ? `
            <div class="empty-projects">
              <div class="text-gray-400 text-center py-8">
                <p class="text-sm">Mis Proyectos</p>
              </div>
            </div>
          ` : `
            <div class="project-list">
              ${projects.map(project => `
                <div class="project-item ${currentProject?.id === project.id ? 'active' : ''}" data-project-id="${project.id}">
                  <div class="project-color" style="background-color: ${project.color}"></div>
                  <div class="project-info">
                    <div class="project-name">${project.name}</div>
                    <div class="project-count">${project.getTodoCount()} ${project.getTodoCount() === 1 ? 'tarea' : 'tareas'}</div>
                  </div>
                  <button class="project-delete" title="Eliminar proyecto">🗑️</button>
                </div>
              `).join('')}
            </div>
          `}
        </div>
      </div>
    `;

    // Agregar event listeners
    element.querySelectorAll('.project-item').forEach((item) => {
      // Click para seleccionar proyecto
      item.addEventListener('click', (e) => {
        if (!e.target.closest('.project-delete')) {
          const projectId = item.dataset.projectId;
          this.onSelectProject(projectId);
        }
      });

      // Click en botón eliminar
      const deleteBtn = item.querySelector('.project-delete');
      if (deleteBtn) {
        deleteBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          e.preventDefault();
          const projectId = item.dataset.projectId;
          
          // Confirmar antes de eliminar
          if (confirm('¿Estás seguro de que deseas eliminar este proyecto?')) {
            document.dispatchEvent(new CustomEvent('delete-project', {
              detail: { projectId }
            }));
          }
        });
      }
    });
  }
}
