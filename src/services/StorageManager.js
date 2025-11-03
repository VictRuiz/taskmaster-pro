import { Project } from '../models/Project';

/**
 * StorageManager - Gestiona la persistencia de datos en localStorage
 */
export class StorageManager {
  static STORAGE_KEY = 'taskmaster_projects';
  static DEFAULT_PROJECT_NAME = 'Mi Primer Proyecto';

  /**
   * Guarda los proyectos en localStorage
   */
  static saveProjects(projects) {
    try {
      const data = projects.map(p => p.toJSON());
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
      console.log('✓ Proyectos guardados en localStorage');
      return true;
    } catch (error) {
      console.error('✗ Error al guardar proyectos:', error);
      return false;
    }
  }

  /**
   * Carga los proyectos desde localStorage
   */
  static loadProjects() {
    try {
      const data = localStorage.getItem(this.STORAGE_KEY);
      
      // Si no hay datos, retornar un proyecto por defecto
      if (!data) {
        console.log('No hay datos en localStorage, creando proyecto por defecto');
        const defaultProject = Project.createDefault();
        this.saveProjects([defaultProject]);
        return [defaultProject];
      }

      // Parsear y reconstruir proyectos
      const parsedData = JSON.parse(data);
      const projects = parsedData.map(p => Project.fromJSON(p));
      console.log(`✓ ${projects.length} proyecto(s) cargado(s) desde localStorage`);
      return projects;
    } catch (error) {
      console.error('✗ Error al cargar proyectos:', error);
      // Retornar proyecto por defecto en caso de error
      const defaultProject = Project.createDefault();
      return [defaultProject];
    }
  }

  /**
   * Limpia todos los datos de localStorage
   */
  static clearAll() {
    try {
      localStorage.removeItem(this.STORAGE_KEY);
      console.log('✓ localStorage vaciado');
      return true;
    } catch (error) {
      console.error('✗ Error al limpiar localStorage:', error);
      return false;
    }
  }

  /**
   * Obtiene información de almacenamiento
   */
  static getStorageInfo() {
    try {
      const data = localStorage.getItem(this.STORAGE_KEY);
      if (!data) {
        return { projects: 0, size: 0 };
      }
      return {
        projects: JSON.parse(data).length,
        size: new Blob([data]).size,
        sizeKB: (new Blob([data]).size / 1024).toFixed(2)
      };
    } catch (error) {
      console.error('✗ Error al obtener info de almacenamiento:', error);
      return { projects: 0, size: 0 };
    }
  }
}
