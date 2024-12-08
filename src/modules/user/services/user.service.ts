import { CreateUserInput, UpdateUserInput } from '@dtos';
import { Injectable } from '@nestjs/common';
import { ServiceBase } from 'src/aplication/bases/services/service.base';
import { UserEntity } from 'src/domain/entities/user/user.entity';

@Injectable()
export class UserService {
  create(createUserInput: CreateUserInput) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(uuid: string) {
    return `This action returns a #${uuid} user`;
  }

  update(uuid: string, updateUserInput: UpdateUserInput) {
    return `This action updates a #${uuid} user`;
  }

  remove(uuid: string) {
    return `This action removes a #${uuid} user`;
  }
}
