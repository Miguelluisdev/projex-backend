import { Module } from '@nestjs/common';
import { NotificationResolver } from './resolvers/notification.resolver';
import { NotificationService } from './services/notification.service';

@Module({
  providers: [NotificationResolver, NotificationService],
})
export class NotificationModule {}
