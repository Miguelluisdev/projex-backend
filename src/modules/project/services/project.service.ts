import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { JwtService } from '@nestjs/jwt';
import { ENUM_PROJECTA } from 'src/aplication/events/events.enum';
import { QueryBuilder } from 'src/aplication/utils/query-builder/query-builder.util';
import { CreateProjectInput } from 'src/domain/dtos/project/create-project.input';
import { UpdateProjectInput } from 'src/domain/dtos/project/update-project.input';
import { QueryParamsInput } from 'src/domain/dtos/shared/query-params.input';
import { ProjectEntity } from 'src/domain/entities/project/project.entity';
import { ProjectRepository } from '../repositories/project.repository';

@Injectable()
export class ProjectService {
  constructor(
    private readonly projectRepository: ProjectRepository,
    private readonly jwtService: JwtService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async create(
    dto: CreateProjectInput,
    access: { uuid: string },
  ): Promise<ProjectEntity> {
    if (!access || !access.uuid) {
      throw new UnauthorizedException('Access token is invalid or missing');
    }

    const projectData = {
      ...dto,
      creator_id: access.uuid,
      status: 'Pendente',
    };

    const createdProject = await this.projectRepository.create(projectData);

    this.eventEmitter.emit(ENUM_PROJECTA.project.created, {
      project_tittle: projectData.title,
    });

    return createdProject;
  }

  async findById(uuid: string): Promise<ProjectEntity | null> {
    const project = await this.projectRepository.findById(uuid);

    if (!project) {
      throw new NotFoundException(`Project with UUID ${uuid} not found`);
    }

    return project;
  }

  async findAll(queryParams: QueryParamsInput): Promise<ProjectEntity[]> {
    const { query } = new QueryBuilder()
      .sort(queryParams.orderBy)
      .date('createdAt', queryParams.from, queryParams.to)
      .pagination(queryParams.page, queryParams.pageSize);

    const data = await this.projectRepository.findAll(query);

    return data;
  }

  async findByCreator(uuid: string): Promise<ProjectEntity | null> {
    const creator = await this.projectRepository.findByCreator(uuid);

    if (!creator) {
      throw new NotFoundException(`Usuario não encontrado do ${uuid}`);
    }

    return creator;
  }

  async update(dto: UpdateProjectInput): Promise<ProjectEntity> {
    const project = await this.findById(dto.uuid);

    const update = await this.projectRepository.update({
      ...dto,
      uuid: project.uuid,
    });

    if (!update) {
      throw new HttpException(
        'falha ao atualizar os dados do projeto',
        HttpStatus.NOT_ACCEPTABLE,
      );
    }

    this.eventEmitter.emit(ENUM_PROJECTA.project.updated, {
      project_title: update.uuid,
    });

    return update;
  }

  async remove(uuid: string): Promise<boolean> {
    const project = await this.findById(uuid);

    const remove = await this.projectRepository.softDelete(project.uuid);

    if (!remove) {
      throw new HttpException(
        'falha ao remover o projeto',
        HttpStatus.NOT_ACCEPTABLE,
      );
    }

    this.eventEmitter.emit(ENUM_PROJECTA.project.deleted, {
      project_id: project.uuid,
    });

    return true;
  }
}
