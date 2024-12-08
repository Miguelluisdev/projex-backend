import { Injectable } from '@nestjs/common';
import { UserMain } from '@prisma/client';
import { PrismaService } from 'src/infra/database/prisma/prisma.service';

@Injectable()
export class UserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(): Promise<UserMain[]> {
    return await this.prismaService.userMain.findMany();
  }

  async findOneById(uuid: string): Promise<UserMain | null> {
    return await this.prismaService.userMain.findUnique({
      where: { uuid, deleted_at: null },
    });
  }

  async findById(uuid: string): Promise<UserMain | null> {
    return await this.prismaService.userMain.findFirst({
      where: { uuid, deleted_at: null },
    });
  }

  async findByEmail(email: string): Promise<UserMain | null> {
    return await this.prismaService.userMain.findFirst({
      where: { email, deleted_at: null },
    });
  }

  async create(data: UserMain): Promise<UserMain> {
    return await this.prismaService.userMain.create({ data });
  }

  async update(uuid: string, data: UserMain): Promise<UserMain> {
    return await this.prismaService.userMain.update({
      where: { uuid },
      data,
    });
  }
  async delete(uuid: string): Promise<UserMain> {
    return await this.prismaService.userMain.delete({
      where: { uuid, deleted_at: new Date() },
    });
  }
}
