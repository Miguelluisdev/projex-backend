import { Injectable } from '@nestjs/common';
import { CreateNotificationInput } from 'src/domain/dtos/notification/create-notification.input';
import { UpdateNotificationInput } from 'src/domain/dtos/notification/update-notification.input';

@Injectable()
export class NotificationService {
  create(createNotificationInput: CreateNotificationInput) {
    return 'This action adds a new notification';
  }

  findAll() {
    return `This action returns all notification`;
  }

  findOne(id: number) {
    return `This action returns a #${id} notification`;
  }

  update(id: number, updateNotificationInput: UpdateNotificationInput) {
    return `This action updates a #${id} notification`;
  }

  remove(id: number) {
    return `This action removes a #${id} notification`;
  }
}
