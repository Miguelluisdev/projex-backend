import { Injectable } from '@nestjs/common';
import { AuthEntity } from 'src/domain/entities/auth/auth.entity';
import { QueryBuilderEntity } from 'src/domain/entities/builder/query-builder.entity';
import { PrismaService } from 'src/infra/database/prisma/prisma.service';

@Injectable()
export class AuthRepository {
  constructor(private readonly prismaService: PrismaService) {}

  findAll(query: QueryBuilderEntity): Promise<AuthEntity[]> {
    return this.prismaService.auth.findMany(query);
  }

  findById(id: string): Promise<AuthEntity | null> {
    return this.prismaService.auth.findFirst({
      where: { id, deleted_at: null },
    });
  }
}
