/**
 * FooterComponent - Componente del pie de página
 */
export class FooterComponent {
  render(element) {
    const currentYear = new Date().getFullYear();
    
    element.innerHTML = `
      <footer class="app-footer bg-accent-black border-t-4 border-primary-500 py-6 px-6">
        <div class="max-w-7xl mx-auto">
          <div class="flex items-center justify-center gap-2">
            <span class="text-accent-light">✨ Codificado por</span>
            <span class="font-display font-bold text-primary-500 text-lg">Victor Ruiz</span>
            <span class="text-accent-light">©</span>
            <span class="text-accent-light text-sm">${currentYear}</span>
          </div>
          <div class="text-center mt-3 text-accent-light text-xs opacity-60">
            <p>TaskMaster Pro · Gestión eficiente de tareas y proyectos</p>
          </div>
        </div>
      </footer>
    `;
  }
}
