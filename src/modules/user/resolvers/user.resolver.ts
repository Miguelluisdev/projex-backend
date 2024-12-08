import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateUserInput, UpdateUserInput } from 'src/domain/dtos/index';
import { UserEntity } from 'src/domain/entities/user/user.entity';
import { UserService } from '../services/user.service';

@Resolver(() => UserEntity)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => UserEntity)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.userService.create(createUserInput);
  }

  @Query(() => [UserEntity], { name: 'findAllUsers' })
  findAll() {
    return this.userService.findAll();
  }

  @Query(() => UserEntity, { name: 'findUserById' })
  findOne(@Args('uuid', { type: () => String }) uuid: string) {
    return this.userService.findOne(uuid);
  }

  @Mutation(() => UserEntity)
  updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.userService.update(updateUserInput.id, updateUserInput);
  }

  @Mutation(() => UserEntity)
  removeUser(@Args('uuid', { type: () => String }) uuid: string) {
    return this.userService.remove(uuid);
  }
}
