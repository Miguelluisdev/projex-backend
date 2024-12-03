import { Test, TestingModule } from '@nestjs/testing';
import { ProjectService } from '../services/project.service';
import { ProjectResolver } from '../resolvers/project.resolver';

describe('ProjectResolver', () => {
  let resolver: ProjectResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProjectResolver, ProjectService],
    }).compile();

    resolver = module.get<ProjectResolver>(ProjectResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
