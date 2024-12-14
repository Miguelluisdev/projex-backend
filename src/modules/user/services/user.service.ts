import { CreateUserInput, UpdateUserInput } from '@dtos';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ServiceBase } from 'src/aplication/bases/services/service.base';
import { ENUM_EVENTS } from 'src/aplication/events/events.enum';
import { hash } from 'src/aplication/utils/bycrpt/hash';
import { QueryBuilder } from 'src/aplication/utils/query-builder/query-builder.util';
import { QueryParamsInput } from 'src/domain/dtos/shared/query-params.input';
import { UserEntity } from 'src/domain/entities/user/user.entity';
import { AuthService } from 'src/modules/auth/services/auth.service';
import { UserRepository } from '../repositories/user.repository';

@Injectable()
export class UserService
  implements ServiceBase<UserEntity, CreateUserInput, UpdateUserInput>
{
  constructor(
    private readonly userRepository: UserRepository,
    private readonly authService: AuthService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async create(dto: CreateUserInput): Promise<UserEntity> {
    const emailExists = await this.userRepository.findByEmail(dto.email);

    if (emailExists) {
      throw new HttpException(
        'o Email já existe no banco de dados',
        HttpStatus.BAD_REQUEST,
      );
    }

    dto.password = await hash(dto.password);

    const user = await this.userRepository.create(dto);

    this.eventEmitter.emit(ENUM_EVENTS.user.created, {
      userId: user.uuid,
    });

    //  adicionar o token depois

    return {
      ...user,
    };
  }
  async findAll(queryParams: QueryParamsInput): Promise<UserEntity[]> {
    //  adicionar cache no futuro
    const { query } = new QueryBuilder()
      .sort(queryParams.orderBy)
      .date('createdAt', queryParams.from, queryParams.to)
      .pagination(queryParams.page, queryParams.pageSize);

    const data = await this.userRepository.findAll(query);

    return data;
  }

  async findById(uuid: string): Promise<UserEntity> {
    const user = await this.userRepository.findById(uuid);

    if (!user) {
      throw new HttpException('Usuario não encontrado', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  async findByEmail(email: string): Promise<UserEntity> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new HttpException('Usuario não encontrado', HttpStatus.NOT_FOUND);
    }

    return user;
  }

  async update(dto: UpdateUserInput): Promise<UserEntity> {
    const user = await this.findById(dto.uuid);

    const update = await this.userRepository.update({
      ...dto,
      uuid: user.uuid,
    });

    if (!update) {
      throw new HttpException(
        'Falha ao atualizar os dados do usuario',
        HttpStatus.NOT_ACCEPTABLE,
      );
    }

    this.eventEmitter.emit(ENUM_EVENTS.user.updated, {
      userid: update.uuid,
    });

    return update;
  }

  async remove?(uuid: string): Promise<boolean> {
    const user = await this.findById(uuid);

    const remove = await this.userRepository.softDelete(user.uuid);

    if (!remove) {
      throw new HttpException(
        'Falha ao remover Usuario',
        HttpStatus.NOT_ACCEPTABLE,
      );
    }

    this.eventEmitter.emit(ENUM_EVENTS.user.deleted, {
      userId: user.uuid,
    });

    return true;
  }
}
