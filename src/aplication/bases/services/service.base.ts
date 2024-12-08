import { Prisma } from '@prisma/client';

export abstract class ServiceBase<Entity, CreateDto = void, UpdateDto = void> {
  abstract create?(dto: CreateDto): Promise<Entity>;
  abstract findById(uuid: string): Promise<Entity>;
  abstract findAll(): Promise<Entity>;
  abstract update?(dto: UpdateDto): Promise<Entity>;
  abstract remove?(id: string): Promise<boolean>;
}
