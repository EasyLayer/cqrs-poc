import { IQueryHandler, QueryHandler } from '@cqrs/custom-cqrs-package';
import { DragonRepository } from '../../repository/dragon.repository';
import { GetDragonQuery } from '../impl';

@QueryHandler(GetDragonQuery)
export class GetDragonHandler implements IQueryHandler<GetDragonQuery> {
  constructor(private readonly repository: DragonRepository) {}

  async execute(query: GetDragonQuery) {
    const { uuid } = query;
    return this.repository.findOneById(uuid);
  }
}
