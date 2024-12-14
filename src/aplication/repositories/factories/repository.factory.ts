import { Inject } from '@nestjs/common';
import { PrismaService } from 'src/infra/database/prisma/prisma.service';

export class RepositoryFactory<K, T = void, J = void> {
  @Inject(PrismaService)
  protected readonly prismaService: PrismaService;

  constructor(public model: string) {}

  createMany(data: T[]) {
    return this.prismaService[this.model].createMany({
      data,
      skipDuplicates: true,
    });
  }

  create(data: T): Promise<K> {
    return this.prismaService[this.model].create({
      data: {
        ...data,
        deleted_at: null,
      },
    });
  }

  upsert({ uuid, ...data }: T & { uuid?: string }): Promise<K> {
    return this.prismaService[this.model].upsert({
      create: { ...data },
      update: { ...data },
      where: { uuid },
    });
  }

  update({ uuid, ...data }: J & { uuid: string }): Promise<K | null> {
    return this.prismaService[this.model].update({
      where: {
        uuid,
      },
      data: {
        ...data,
      },
    });
  }

  count(where: any): Promise<number> {
    return this.prismaService[this.model].count({ where });
  }

  softDelete(uuid: string): Promise<K | null> {
    return this.prismaService[this.model].update({
      where: {
        uuid,
      },
      data: {
        deleted_at: new Date(),
      },
    });
  }

  deleteMany() {
    return this.prismaService[this.model].deleteMany();
  }
}
