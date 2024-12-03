import { Test, TestingModule } from '@nestjs/testing';
import { UserTypeResolver } from '../resolvers/user-type.resolver';
import { UserTypeService } from '../services/user-type.service';

describe('UserTypeResolver', () => {
  let resolver: UserTypeResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserTypeResolver, UserTypeService],
    }).compile();

    resolver = module.get<UserTypeResolver>(UserTypeResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
