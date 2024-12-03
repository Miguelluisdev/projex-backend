import { Module } from '@nestjs/common';
import { ProjectService } from '../project/services/project.service';
import { ProjectResolver } from './resolvers/project.resolver';

@Module({
  providers: [ProjectResolver, ProjectService],
})
export class ProjectModule {}
