import { Injectable } from '@nestjs/common';
import { AuthInput } from 'src/domain/dtos/auth/auth.dto';
import { CreateAuthInput } from 'src/domain/dtos/auth/create-auth.input';
import { UpdateAuthInput } from 'src/domain/dtos/auth/update-auth.input';

@Injectable()
export class AuthService {
  create(authInput: AuthInput) {
    return 'This action adds a new auth';
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthInput: UpdateAuthInput) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
