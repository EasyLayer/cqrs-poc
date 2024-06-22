import { IQueryHandler, QueryHandler } from '@cqrs/custom-cqrs-package';
import { DragonRepository } from '../../repository/dragon.repository';
import { GetDragonsQuery } from '../impl';

@QueryHandler(GetDragonsQuery)
export class GetDragonsHandler implements IQueryHandler<GetDragonsQuery> {
  constructor(private readonly repository: DragonRepository) {}

  async execute(query: GetDragonsQuery) {
    return this.repository.findAll();
  }
}
