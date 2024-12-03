import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UpdatePermissionInput } from 'src/domain/dtos/permission/update-permission.input';
import { PermissionEntity } from 'src/domain/entities/permission/permission.enitty';
import { CreatePermissionInput } from '../../../domain/dtos/permission/create-permission.input';
import { PermissionService } from '../services/permission.service';

@Resolver(() => PermissionEntity)
export class PermissionResolver {
  constructor(private readonly permissionService: PermissionService) {}

  @Mutation(() => PermissionEntity)
  createPermission(
    @Args('createPermissionInput') createPermissionInput: CreatePermissionInput,
  ) {
    return this.permissionService.create(createPermissionInput);
  }

  @Query(() => [PermissionEntity], { name: 'permission' })
  findAll() {
    return this.permissionService.findAll();
  }

  @Query(() => PermissionEntity, { name: 'permission' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.permissionService.findOne(id);
  }

  @Mutation(() => PermissionEntity)
  updatePermission(
    @Args('updatePermissionInput') updatePermissionInput: UpdatePermissionInput,
  ) {
    return this.permissionService.update(
      updatePermissionInput.id,
      updatePermissionInput,
    );
  }

  @Mutation(() => PermissionEntity)
  removePermission(@Args('id', { type: () => Int }) id: number) {
    return this.permissionService.remove(id);
  }
}
