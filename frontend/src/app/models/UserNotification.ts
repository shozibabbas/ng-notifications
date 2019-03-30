import {Category} from './Category';


/**
 * This class is model for notifications
 */

export class UserNotification {
  public _id: string;
  public Header: string;
  public Body: string;
  public Category: Category;
  public IsClosed: boolean;
  public UserId: string;
  public Date: number;

  constructor(userId: string) {
    this.Header = '';
    this.Body = '';
    this.Category = Category.INFO;
    this.IsClosed = false;
    this.UserId = userId;
    this.Date = Date.now();
  }
}
