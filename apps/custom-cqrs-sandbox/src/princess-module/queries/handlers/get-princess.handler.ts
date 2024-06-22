import { IQueryHandler, QueryHandler } from '@cqrs/custom-cqrs-package';
import { PrincessRepository } from '../../repository/princess.repository';
import { GetPrincessQuery } from '../impl';

@QueryHandler(GetPrincessQuery)
export class GetPrincessHandler implements IQueryHandler<GetPrincessQuery> {
  constructor(private readonly repository: PrincessRepository) {}

  async execute(query: GetPrincessQuery) {
    const { uuid } = query;
    return this.repository.findOneById(uuid);
  }
}
