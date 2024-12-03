import { Injectable } from '@nestjs/common';
import { CreateProjectInput } from 'src/domain/dtos/project/create-project.input';
import { UpdateProjectInput } from 'src/domain/dtos/project/update-project.input';

@Injectable()
export class ProjectService {
  create(createProjectInput: CreateProjectInput) {
    return 'This action adds a new project';
  }

  findAll() {
    return `This action returns all project`;
  }

  findOne(id: number) {
    return `This action returns a #${id} project`;
  }

  update(id: number, updateProjectInput: UpdateProjectInput) {
    return `This action updates a #${id} project`;
  }

  remove(id: number) {
    return `This action removes a #${id} project`;
  }
}
