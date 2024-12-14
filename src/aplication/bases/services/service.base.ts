import { QueryParamsInput } from 'src/domain/dtos/shared/query-params.input';

export abstract class ServiceBase<Entity, CreateDto = void, UpdateDto = void> {
  abstract create?(dto: CreateDto): Promise<Entity>;
  abstract findById(uuid: string): Promise<Entity>;
  abstract findAll(queryParams: QueryParamsInput): Promise<Entity[]>;
  abstract update?(dto: UpdateDto): Promise<Entity>;
  abstract remove?(uuid: string): Promise<boolean>;
}
