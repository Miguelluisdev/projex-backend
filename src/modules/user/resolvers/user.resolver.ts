import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { IsPublic } from 'src/aplication/decorator/is-public.decorator';
import { CreateUserInput, UpdateUserInput } from 'src/domain/dtos/index';
import { QueryParamsInput } from 'src/domain/dtos/shared/query-params.input';
import { UserEntity } from 'src/domain/entities/user/user.entity';
import { UserService } from '../services/user.service';

@Resolver(() => UserEntity)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @IsPublic()
  @Mutation(() => UserEntity)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.userService.create(createUserInput);
  }

  @Query(() => [UserEntity], { name: 'findAllUsers' })
  findAll(@Args({ name: 'queryParams' }) queryParams: QueryParamsInput) {
    return this.userService.findAll(queryParams);
  }

  @Query(() => UserEntity, { name: 'findUserById' })
  findById(@Args('id', { type: () => String }) id: string) {
    return this.userService.findById(id);
  }
''
  @Mutation(() => UserEntity)
  updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.userService.update(updateUserInput);
  }

  @Mutation(() => UserEntity)
  removeUser(@Args('uuid', { type: () => String }) uuid: string) {
    return this.userService.remove(uuid);
  }
}
