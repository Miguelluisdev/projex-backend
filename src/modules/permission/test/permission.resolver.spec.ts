import { Test, TestingModule } from '@nestjs/testing';
import { PermissionResolver } from '../resolvers/permission.resolver';
import { PermissionService } from '../services/permission.service';

describe('PermissionResolver', () => {
  let resolver: PermissionResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PermissionResolver, PermissionService],
    }).compile();

    resolver = module.get<PermissionResolver>(PermissionResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
