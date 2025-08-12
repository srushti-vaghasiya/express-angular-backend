import { ObjectLiteral, SelectQueryBuilder } from "typeorm";

export interface PaginationResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

export async function paginate<T extends ObjectLiteral>(
  queryBuilder: SelectQueryBuilder<T>,
  page: number = 1,
  limit: number = 10
): Promise<PaginationResult<T>> {
  const skip = (page - 1) * limit;

  const [data, total] = await queryBuilder
    .skip(skip)
    .take(limit)
    .getManyAndCount();

  const hasNext = page * limit < total;
  const hasPrevious = page > 1;

  return {
    data,
    total,
    page,
    limit,
    hasNext,
    hasPrevious,
  };
}
