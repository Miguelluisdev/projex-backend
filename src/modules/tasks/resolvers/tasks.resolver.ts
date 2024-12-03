import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UpdateTaskInput } from 'src/domain/dtos/tasks/update-task.input';
import { CreateTaskInput } from '../../../domain/dtos/tasks/create-task.input';
import { TaskEntity } from '../../../domain/entities/tasks/task.entity';
import { TasksService } from '../services/tasks.service';

@Resolver(() => TaskEntity)
export class TasksResolver {
  constructor(private readonly tasksService: TasksService) {}

  @Mutation(() => TaskEntity)
  createTask(@Args('createTaskInput') createTaskInput: CreateTaskInput) {
    return this.tasksService.create(createTaskInput);
  }

  @Query(() => [TaskEntity], { name: 'tasks' })
  findAll() {
    return this.tasksService.findAll();
  }

  @Query(() => TaskEntity, { name: 'task' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.tasksService.findOne(id);
  }

  @Mutation(() => TaskEntity)
  updateTask(@Args('updateTaskInput') updateTaskInput: UpdateTaskInput) {
    return this.tasksService.update(updateTaskInput.id, updateTaskInput);
  }

  @Mutation(() => TaskEntity)
  removeTask(@Args('id', { type: () => Int }) id: number) {
    return this.tasksService.remove(id);
  }
}
