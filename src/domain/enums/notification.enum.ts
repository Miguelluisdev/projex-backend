import { registerEnumType } from '@nestjs/graphql';

export enum NotificationType {
  TASK_ASSIGNED = 'TASK_ASSIGNED',
  TASK_COMPLETED = 'TASK_COMPLETED',
  PROJECT_CREATED = 'PROJECT_CREATED',
  PROJECT_UPDATED = 'PROJECT_UPDATED',
  USER_INVITED = 'USER_INVITED',
  COMMENT_ADDED = 'COMMENT_ADDED',
  DEADLINE_APPROACH = 'DEADLINE_APPROACH',
  STATUS_CHANGED = 'STATUS_CHANGED',
  GENERAL = 'GENERAL',
}

registerEnumType(NotificationType, {
  name: 'NotificationType',
  description: 'Tipos de notificação disponíveis no sistema',
});
