import { Injectable } from '@nestjs/common';
import { UpdateTaskInput } from 'src/domain/dtos/tasks/update-task.input';
import { CreateTaskInput } from '../../../domain/dtos/tasks/create-task.input';

@Injectable()
export class TasksService {
  create(createTaskInput: CreateTaskInput) {
    return 'This action adds a new task';
  }

  findAll() {
    return `This action returns all tasks`;
  }

  findOne(id: number) {
    return `This action returns a #${id} task`;
  }

  update(id: number, updateTaskInput: UpdateTaskInput) {
    return `This action updates a #${id} task`;
  }

  remove(id: number) {
    return `This action removes a #${id} task`;
  }
}
