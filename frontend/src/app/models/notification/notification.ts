import { NotificationType } from '../enums/notification-type';

export interface Notification {
  id: number;
  title: string;
  description: string;
  reference: number;
  isRead: boolean;
  createdAt: Date;
  type: NotificationType;
}
