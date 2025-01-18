import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ProjectService } from '../project/services/project.service';
import { ProjectResolver } from './resolvers/project.resolver';
import { ProjectRepository } from './repositories/project.repository';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET, 
    }),
  ],
  providers: [ProjectResolver, ProjectService, ProjectRepository],
})
export class ProjectModule {}