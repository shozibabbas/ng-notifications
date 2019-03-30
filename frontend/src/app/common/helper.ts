/**
 * This class is for any helper functions that might be needed during execution
 */
export class Helper {

  /**
   * get type of display for elements
   * @param category name of category
   */
  getDisplayType(category: string): string {
    switch (category) {
      case 'INFO':
        return 'info';
      case 'WARNING':
        return 'warning';
      case 'ERROR':
        return 'danger';
    }
  }
}
