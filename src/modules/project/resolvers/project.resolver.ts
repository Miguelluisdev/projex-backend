import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CurrentAccess } from 'src/aplication/decorator/current-acess.decorator';
import { QueryParamsInput } from 'src/domain/dtos/shared/query-params.input';
import { CreateProjectInput } from '../../../domain/dtos/project/create-project.input';
import { UpdateProjectInput } from '../../../domain/dtos/project/update-project.input';
import { ProjectEntity } from '../../../domain/entities/project/project.entity';
import { ProjectService } from '../services/project.service';

@Resolver(() => ProjectEntity)
export class ProjectResolver {
  constructor(private readonly projectService: ProjectService) {}

  @Mutation(() => ProjectEntity)
  async createProject(
    @Args('createProjectInput') createProjectInput: CreateProjectInput,
    @CurrentAccess() acess: { uuid: string },
  ) {
    return this.projectService.create(createProjectInput, acess);
  }

  @Query(() => [ProjectEntity], { name: 'findAllProject' })
  findAll(@Args('queryParams') queryParams: QueryParamsInput) {
    return this.projectService.findAll(queryParams);
  }

  @Query(() => ProjectEntity, { name: 'findProjectById' })
  findById(@Args('uuid', { type: () => String }) uuid: string) {
    return this.projectService.findById(uuid);
  }

  @Query(() => ProjectEntity, { name: 'findProjectById' })
  findCreator(@Args('uuid', { type: () => String }) uuid: string) {
    return this.projectService.findByCreator(uuid);
  }

  @Mutation(() => ProjectEntity)
  updateProject(
    @Args('updateProjectInput') updateProjectInput: UpdateProjectInput,
  ) {
    return this.projectService.update(updateProjectInput);
  }

  @Mutation(() => ProjectEntity)
  removeProject(@Args('uuid', { type: () => String }) uuid: string) {
    return this.projectService.remove(uuid);
  }
}
