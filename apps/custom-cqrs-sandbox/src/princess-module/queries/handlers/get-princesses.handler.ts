import { IQueryHandler, QueryHandler } from '@cqrs/custom-cqrs-package';
import { PrincessRepository } from '../../repository/princess.repository';
import { GetPrincessesQuery } from '../impl';

@QueryHandler(GetPrincessesQuery)
export class GetPrincessesHandler implements IQueryHandler<GetPrincessesQuery> {
  constructor(private readonly repository: PrincessRepository) {}

  async execute(query: GetPrincessesQuery) {
    return this.repository.findAll();
  }
}
