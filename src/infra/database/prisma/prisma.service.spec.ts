import { Test, TestingModule } from '@nestjs/testing';
import { prismaModuleMock } from './prisma.module';
import { PrismaService } from './prisma.service';

describe('PrismaService', () => {
  let service: PrismaService;

  beforeEach(async () => {
    const module: TestingModule =
      await Test.createTestingModule(prismaModuleMock).compile();

    service = module.get<PrismaService>(PrismaService);
  });

  it('Should be defined', () => {
    expect(service).toBeDefined();
  });
});
