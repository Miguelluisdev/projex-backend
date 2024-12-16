import { Injectable } from '@nestjs/common';
import { RepositoryFactory } from 'src/aplication/repositories/factories/repository.factory';
import { CreateAuthInput } from 'src/domain/dtos/auth/create-auth.input';
import { UpdateAuthInput } from 'src/domain/dtos/auth/update-auth.input';
import { AuthEntity } from 'src/domain/entities/auth/auth.entity';
import { QueryBuilderEntity } from 'src/domain/entities/builder/query-builder.entity';

@Injectable()
export class AuthRepository extends RepositoryFactory<
  AuthEntity,
  CreateAuthInput,
  UpdateAuthInput
> {
  constructor() {
    super('Auth');
  }

  findAll(query: QueryBuilderEntity): Promise<AuthEntity[]> {
    return this.prismaService.auth.findMany(query);
  }

  findByid(uuid: string): Promise<AuthEntity | null> {
    return this.prismaService.auth.findFirst({
      where: {
        uuid,
        deleted_at: null,
      },
    });
  }
}
