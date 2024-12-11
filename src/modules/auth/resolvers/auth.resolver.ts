import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { CurrentAccess } from 'src/aplication/decorator/current-acess.decorator';
import { IsPublic } from 'src/aplication/decorator/is-public.decorator';
import { AuthInput } from 'src/domain/dtos/auth/auth.dto';
import { AuthEntity } from 'src/domain/entities/auth/auth.entity';
import { UserEntity } from 'src/domain/entities/user/user.entity';
import { UserService } from 'src/modules/user/services/user.service';
import { AuthService } from '../services/auth.service';

@Resolver(() => AuthEntity)
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Mutation(() => AuthEntity)
  @IsPublic()
  createAuth(@Args('AuthInput') AuthInput: AuthInput) {
    return this.authService.create(AuthInput);
  }

  @Query(() => AuthEntity)
  whoAmI(@CurrentAccess() auth: AuthEntity) {
    return auth;
  }

  @ResolveField(() => UserEntity, { nullable: true })
  @IsPublic()
  async user(@Parent() auth: AuthEntity) {
    // fazer o findById do usuario para jogar aqui
    // return this.userService.findById(auth.user_id);
  }
}
