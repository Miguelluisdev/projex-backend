import { Module } from '@nestjs/common';
import { ProjectService } from '../project/services/project.service';
import { ProjectResolver } from './resolvers/project.resolver';
import { ProjectRepository } from './repositories/project.repository';

@Module({
  providers: [ProjectResolver, ProjectService , ProjectRepository],
})
export class ProjectModule {}
