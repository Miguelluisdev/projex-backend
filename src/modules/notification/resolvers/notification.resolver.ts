import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateNotificationInput } from 'src/domain/dtos/notification/create-notification.input';
import { UpdateNotificationInput } from 'src/domain/dtos/notification/update-notification.input';
import { NotificationEntity } from 'src/domain/entities/notification/notification.entity';
import { NotificationService } from '../services/notification.service';

@Resolver(() => NotificationEntity)
export class NotificationResolver {
  constructor(private readonly notificationService: NotificationService) {}

  @Mutation(() => NotificationEntity)
  createNotification(
    @Args('createNotificationInput')
    createNotificationInput: CreateNotificationInput,
  ) {
    return this.notificationService.create(createNotificationInput);
  }

  @Query(() => [NotificationEntity], { name: 'notification' })
  findAll() {
    return this.notificationService.findAll();
  }

  @Query(() => NotificationEntity, { name: 'notification' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.notificationService.findOne(id);
  }

  @Mutation(() => NotificationEntity)
  updateNotification(
    @Args('updateNotificationInput')
    updateNotificationInput: UpdateNotificationInput,
  ) {
    return this.notificationService.update(
      updateNotificationInput.id,
      updateNotificationInput,
    );
  }

  @Mutation(() => NotificationEntity)
  removeNotification(@Args('id', { type: () => Int }) id: number) {
    return this.notificationService.remove(id);
  }
}
