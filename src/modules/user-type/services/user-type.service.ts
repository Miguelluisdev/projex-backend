import { Injectable } from '@nestjs/common';
import { UpdateUserTypeInput } from 'src/domain/dtos/user-type/update-user-type.input';
import { CreateUserTypeInput } from '../../../domain/dtos/user-type/create-user-type.input';

@Injectable()
export class UserTypeService {
  create(createUserTypeInput: CreateUserTypeInput) {
    return 'This action adds a new userType';
  }

  findAll() {
    return `This action returns all userType`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userType`;
  }

  update(id: number, updateUserTypeInput: UpdateUserTypeInput) {
    return `This action updates a #${id} userType`;
  }

  remove(id: number) {
    return `This action removes a #${id} userType`;
  }
}
