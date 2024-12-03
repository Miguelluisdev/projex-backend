import { Module } from '@nestjs/common';
import { TasksResolver } from './resolvers/tasks.resolver';
import { TasksService } from './services/tasks.service';

@Module({
  providers: [TasksResolver, TasksService],
})
export class TasksModule {}
