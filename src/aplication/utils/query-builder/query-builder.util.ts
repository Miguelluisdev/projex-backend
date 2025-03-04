import { QueryBuilderEntity } from "src/domain/entities/builder/query-builder.entity";
//  para facilitar as consultas query

export class QueryBuilder {
  public query: QueryBuilderEntity;

  constructor() {
    this.query = {
      where: {
        deleted_at: null,
      },
    };
  }

  pagination(page: number, pageSize: number) {
    const skip =
      (parseInt(page.toString()) - 1) * parseInt(pageSize.toString());

    this.query['skip'] = skip;
    this.query['take'] = Number(pageSize);

    return this;
  }

  condition(condition: Record<string, unknown>) {
    this.query.where = { ...this.query.where, ...condition };

    return this;
  }

  date(field: string, from?: string | Date, to?: string | Date) {
    if (!from && to)
      this.query.where[field] = {
        lte: new Date(to),
      };

    if (from && !to)
      this.query.where[field] = {
        gte: new Date(from),
      };

    if (from && to)
      this.query.where[field] = {
        lte: new Date(to),
        gte: new Date(from),
      };

    return this;
  }

  sort(orderBy: string) {
    try {
      const [field, value] = orderBy?.split('.');

      this.query.orderBy = {
        [field]: value,
      };

      return this;
    } catch (e) {
      return this;
    }
  }
}
