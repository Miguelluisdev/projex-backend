import { Test, TestingModule } from '@nestjs/testing';
import { TasksResolver } from '../resolvers/tasks.resolver';
import { TasksService } from '../services/tasks.service';

describe('TasksResolver', () => {
  let resolver: TasksResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TasksResolver, TasksService],
    }).compile();

    resolver = module.get<TasksResolver>(TasksResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
