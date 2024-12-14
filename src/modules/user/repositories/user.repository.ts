import { CreateUserInput, UpdateUserInput } from '@dtos';
import { Injectable } from '@nestjs/common';
import { RepositoryFactory } from 'src/aplication/repositories/factories/repository.factory';
import { QueryBuilderEntity } from 'src/domain/entities/builder/query-builder.entity';
import { UserEntity } from 'src/domain/entities/user/user.entity';

@Injectable()
export class UserRepository extends RepositoryFactory<
  UserEntity,
  CreateUserInput,
  UpdateUserInput
> {
  constructor() {
    super('UserMain');
  }

  findAll(query: QueryBuilderEntity): Promise<UserEntity[]> {
    return this.prismaService.userMain.findMany(query);
  }

  findByEmail(email: string): Promise<UserEntity | null> {
    return this.prismaService.userMain.findFirst({
      where: { email, deleted_at: null },
    });
  }

  findById(uuid: string): Promise<UserEntity | null> {
    return this.prismaService.userMain.findFirst({
      where: {
        uuid,
        deleted_at: null,
      },
    });
  }

  // reset

  // forgot
}
