import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UpdateUserTypeInput } from 'src/domain/dtos/user-type/update-user-type.input';
import { UserTypeEntity } from 'src/domain/entities/user-type/user-type.entity';
import { CreateUserTypeInput } from '../../../domain/dtos/user-type/create-user-type.input';
import { UserTypeService } from '../services/user-type.service';

@Resolver(() => UserTypeEntity)
export class UserTypeResolver {
  constructor(private readonly userTypeService: UserTypeService) {}

  @Mutation(() => UserTypeEntity)
  createUserType(
    @Args('createUserTypeInput') createUserTypeInput: CreateUserTypeInput,
  ) {
    return this.userTypeService.create(createUserTypeInput);
  }

  @Query(() => [UserTypeEntity], { name: 'userType' })
  findAll() {
    return this.userTypeService.findAll();
  }

  @Query(() => UserTypeEntity, { name: 'userType' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.userTypeService.findOne(id);
  }

  @Mutation(() => UserTypeEntity)
  updateUserType(
    @Args('updateUserTypeInput') updateUserTypeInput: UpdateUserTypeInput,
  ) {
    return this.userTypeService.update(
      updateUserTypeInput.id,
      updateUserTypeInput,
    );
  }

  @Mutation(() => UserTypeEntity)
  removeUserType(@Args('id', { type: () => Int }) id: number) {
    return this.userTypeService.remove(id);
  }
}
