import { format, isToday, isTomorrow, isPast, isFuture, differenceInDays } from 'date-fns';
import { es } from 'date-fns/locale';

/**
 * DateUtils - Utilidades para manejo de fechas con date-fns
 */
export class DateUtils {
  /**
   * Formatea una fecha para mostrar en la UI
   */
  static format(dateString) {
    if (!dateString) return '';
    
    try {
      const date = new Date(dateString);
      
      if (isToday(date)) {
        return 'Hoy';
      }
      if (isTomorrow(date)) {
        return 'Mañana';
      }
      
      return format(date, 'dd MMM yyyy', { locale: es });
    } catch (error) {
      console.error('Error formateando fecha:', error);
      return dateString;
    }
  }

  /**
   * Formatea una fecha con hora
   */
  static formatWithTime(dateString) {
    if (!dateString) return '';
    
    try {
      const date = new Date(dateString);
      return format(date, 'dd MMM yyyy HH:mm', { locale: es });
    } catch (error) {
      console.error('Error formateando fecha con hora:', error);
      return dateString;
    }
  }

  /**
   * Obtiene el estado de la fecha (hoy, mañana, pasada, futura)
   */
  static getDateStatus(dateString) {
    if (!dateString) return 'pending';
    
    try {
      const date = new Date(dateString);
      
      if (isToday(date)) return 'today';
      if (isTomorrow(date)) return 'tomorrow';
      if (isPast(date)) return 'overdue';
      if (isFuture(date)) return 'future';
      
      return 'pending';
    } catch (error) {
      return 'pending';
    }
  }

  /**
   * Obtiene los días restantes hasta la fecha
   */
  static getDaysUntil(dateString) {
    if (!dateString) return null;
    
    try {
      const date = new Date(dateString);
      const days = differenceInDays(date, new Date());
      return days;
    } catch (error) {
      return null;
    }
  }

  /**
   * Crea una fecha en formato YYYY-MM-DD
   */
  static toDateString(date) {
    if (!date) return '';
    if (typeof date === 'string') return date;
    return format(new Date(date), 'yyyy-MM-dd');
  }

  /**
   * Valida si una cadena es una fecha válida
   */
  static isValidDate(dateString) {
    if (!dateString) return false;
    const date = new Date(dateString);
    return date instanceof Date && !isNaN(date);
  }

  /**
   * Obtiene la clase CSS según la prioridad y estado de fecha
   */
  static getPriorityClass(priority) {
    const classes = {
      high: 'priority-high',
      medium: 'priority-medium',
      low: 'priority-low'
    };
    return classes[priority] || 'priority-medium';
  }

  /**
   * Obtiene la clase CSS según el estado de la fecha
   */
  static getDateStatusClass(dateString) {
    const status = this.getDateStatus(dateString);
    const classes = {
      today: 'date-today',
      tomorrow: 'date-tomorrow',
      overdue: 'date-overdue',
      future: 'date-future',
      pending: 'date-pending'
    };
    return classes[status] || 'date-pending';
  }
}
